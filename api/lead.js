// Optivads website → monday.com lead capture.
// Vercel serverless function. Receives the contact form as JSON and creates an
// item on the "Website Leads Capture !" board. The monday token lives only in the
// MONDAY_API_TOKEN environment variable, never in the browser.

const MONDAY_API = 'https://api.monday.com/v2';
const API_VERSION = '2024-10';

const ALLOWED_ORIGINS = [
  'https://optivadslimited.github.io',
  'https://optivads.com',
  'https://www.optivads.com',
  'http://localhost:8765',
  'http://127.0.0.1:8765'
];

// Lower bound of each budget range, written to the numeric "Monthly Media Budget" column.
const BUDGET_FLOOR = {
  'Under $10k': 0,
  '$10k – $50k': 10000,
  '$50k – $150k': 50000,
  '$150k – $500k': 150000,
  '$500k+': 500000
};

function cors(req, res) {
  const origin = req.headers.origin || '';
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
}

async function gql(token, query, variables) {
  const r = await fetch(MONDAY_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: token, 'API-Version': API_VERSION },
    body: JSON.stringify({ query, variables })
  });
  const json = await r.json();
  if (!r.ok || json.errors || json.error_message) {
    throw new Error('monday API: ' + JSON.stringify(json.errors || json.error_message || json));
  }
  return json.data;
}

const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const list = (v, max) => (Array.isArray(v) ? v.map((x) => clean(x, 120)).filter(Boolean).slice(0, max) : []);

module.exports = async function handler(req, res) {
  cors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  const token = process.env.MONDAY_API_TOKEN;
  const boardId = process.env.MONDAY_BOARD_ID || '5106268566';
  if (!token) return res.status(500).json({ ok: false, error: 'Server not configured' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = null; } }
  if (!body || typeof body !== 'object') return res.status(400).json({ ok: false, error: 'Invalid JSON' });

  // Honeypot: real visitors never fill this hidden field.
  if (clean(body.website, 10)) return res.status(200).json({ ok: true });

  const lead = {
    name: clean(body.name, 120),
    company: clean(body.company, 120),
    email: clean(body.email, 160),
    app: clean(body.app, 300),
    budget: clean(body.budget, 40),
    interests: list(body.interests, 5),
    channels: list(body.channels, 12),
    message: clean(body.message, 4000),
    page: clean(body.page, 300)
  };
  if (!lead.name || !lead.company || !lead.email || !lead.app || !lead.budget || !lead.interests.length) {
    return res.status(400).json({ ok: false, error: 'Missing required fields' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email' });
  }

  try {
    // Resolve columns by title so the board can be re-arranged without redeploying.
    const data = await gql(token, '{ boards(ids: [' + boardId + ']) { columns { id title type settings_str } groups { id title } } }');
    const board = data.boards && data.boards[0];
    if (!board) throw new Error('Board not found');
    const byTitle = {};
    board.columns.forEach((c) => { byTitle[c.title.trim().toLowerCase()] = c; });
    const col = (title) => byTitle[title.toLowerCase()];
    const values = {};
    const setText = (title, text) => { const c = col(title); if (c && text) values[c.id] = text; };

    setText('Full Name', lead.name);
    setText('Company', lead.company);
    setText('Work Email', lead.email);
    setText('App or Website', lead.app);
    setText('Budget Range', lead.budget);
    setText('Channels', lead.channels.join(', '));
    setText('Source', 'Website contact form' + (lead.page ? ' · ' + lead.page : ''));

    const budgetCol = col('Monthly Media Budget');
    if (budgetCol && lead.budget in BUDGET_FLOOR) values[budgetCol.id] = String(BUDGET_FLOOR[lead.budget]);

    const msgCol = col('Goals / Message');
    if (msgCol && lead.message) values[msgCol.id] = { text: lead.message };

    const dateCol = col('Submitted');
    if (dateCol) values[dateCol.id] = { date: new Date().toISOString().slice(0, 10) };

    const interestCol = col('What Are You Interested In?');
    if (interestCol) {
      // Match the form's short pillar names to the board's longer dropdown labels.
      let labels = [];
      try { labels = (JSON.parse(interestCol.settings_str || '{}').labels || []).map((l) => l.name); } catch (e) { labels = []; }
      const picked = lead.interests.map((i) => labels.find((l) => l.toLowerCase().startsWith(i.toLowerCase())) || i);
      values[interestCol.id] = { labels: picked };
    }

    const group = board.groups && board.groups[0];
    const created = await gql(
      token,
      'mutation ($board: ID!, $group: String, $name: String!, $values: JSON!) {' +
        ' create_item(board_id: $board, group_id: $group, item_name: $name, column_values: $values, create_labels_if_missing: true) { id } }',
      { board: boardId, group: group ? group.id : null, name: lead.company + ' · ' + lead.name, values: JSON.stringify(values) }
    );
    return res.status(200).json({ ok: true, id: created.create_item.id });
  } catch (err) {
    console.error(err);
    return res.status(502).json({ ok: false, error: 'Could not save the lead' });
  }
};
