// Website → monday.com lead capture.
// Receives the contact form as JSON and creates an item on the "Website Leads Capture !" board.
// The monday token lives only in the MONDAY_API_TOKEN environment variable, never in the browser.

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const MONDAY_API = "https://api.monday.com/v2";
const API_VERSION = "2024-10";

const ALLOWED_ORIGINS = [
  "https://optivadslimited.github.io",
  "https://optivads.com",
  "https://www.optivads.com",
  "http://localhost:3000",
  "http://localhost:8765",
];

// Lower bound of each budget range, written to the numeric "Monthly Media Budget" column.
const BUDGET_FLOOR: Record<string, number> = {
  "Under $10k": 0,
  "$10k – $50k": 10000,
  "$50k – $150k": 50000,
  "$150k – $500k": 150000,
  "$500k+": 500000,
};

type Column = { id: string; title: string; type: string; settings_str: string };
type Group = { id: string; title: string };

function corsHeaders(req: NextRequest): Record<string, string> {
  const origin = req.headers.get("origin") || "";
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Cache-Control": "no-store",
  };
  const vercelHost = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";
  if (ALLOWED_ORIGINS.includes(origin) || (vercelHost && origin === vercelHost) || /^https:\/\/optivads-leads(-[a-z0-9-]+)?\.vercel\.app$/.test(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Vary"] = "Origin";
  }
  return headers;
}

async function gql<T>(token: string, query: string, variables?: Record<string, unknown>): Promise<T> {
  const r = await fetch(MONDAY_API, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token, "API-Version": API_VERSION },
    body: JSON.stringify({ query, variables }),
  });
  const json = await r.json();
  if (!r.ok || json.errors || json.error_message) {
    throw new Error("monday API: " + JSON.stringify(json.errors || json.error_message || json));
  }
  return json.data as T;
}

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const list = (v: unknown, max: number) =>
  Array.isArray(v) ? v.map((x) => clean(x, 120)).filter(Boolean).slice(0, max) : [];

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req) });
}

export async function POST(req: NextRequest) {
  const headers = corsHeaders(req);
  const reply = (status: number, body: Record<string, unknown>) => NextResponse.json(body, { status, headers });

  const token = process.env.MONDAY_API_TOKEN;
  const boardId = process.env.MONDAY_BOARD_ID || "5106268566";
  if (!token) return reply(500, { ok: false, error: "Server not configured" });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return reply(400, { ok: false, error: "Invalid JSON" });
  }
  if (!body || typeof body !== "object") return reply(400, { ok: false, error: "Invalid JSON" });

  // Honeypot: real visitors never fill this hidden field.
  if (clean(body.website, 10)) return reply(200, { ok: true });

  const lead = {
    name: clean(body.name, 120),
    company: clean(body.company, 120),
    email: clean(body.email, 160),
    app: clean(body.app, 300),
    budget: clean(body.budget, 40),
    interests: list(body.interests, 5),
    channels: list(body.channels, 12),
    message: clean(body.message, 4000),
    page: clean(body.page, 300),
  };
  if (!lead.name || !lead.company || !lead.email || !lead.app || !lead.budget || !lead.interests.length) {
    return reply(400, { ok: false, error: "Missing required fields" });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return reply(400, { ok: false, error: "Invalid email" });

  try {
    // Resolve columns by title so the board can be re-arranged without redeploying.
    const data = await gql<{ boards: { columns: Column[]; groups: Group[] }[] }>(
      token,
      `{ boards(ids: [${boardId}]) { columns { id title type settings_str } groups { id title } } }`,
    );
    const board = data.boards && data.boards[0];
    if (!board) throw new Error("Board not found");
    const byTitle: Record<string, Column> = {};
    board.columns.forEach((c) => {
      byTitle[c.title.trim().toLowerCase()] = c;
    });
    const col = (title: string) => byTitle[title.toLowerCase()];
    const values: Record<string, unknown> = {};
    const setText = (title: string, text: string) => {
      const c = col(title);
      if (c && text) values[c.id] = text;
    };

    setText("Full Name", lead.name);
    setText("Company", lead.company);
    setText("Work Email", lead.email);
    setText("App or Website", lead.app);
    setText("Budget Range", lead.budget);
    setText("Channels", lead.channels.join(", "));
    setText("Source", "Website contact form" + (lead.page ? " · " + lead.page : ""));

    const budgetCol = col("Monthly Media Budget");
    if (budgetCol && lead.budget in BUDGET_FLOOR) values[budgetCol.id] = String(BUDGET_FLOOR[lead.budget]);

    const msgCol = col("Goals / Message");
    if (msgCol && lead.message) values[msgCol.id] = { text: lead.message };

    const dateCol = col("Submitted");
    if (dateCol) values[dateCol.id] = { date: new Date().toISOString().slice(0, 10) };

    const interestCol = col("What Are You Interested In?");
    if (interestCol) {
      // Match the form's short pillar names to the board's longer dropdown labels.
      let labels: string[] = [];
      try {
        labels = (JSON.parse(interestCol.settings_str || "{}").labels || []).map((l: { name: string }) => l.name);
      } catch {
        labels = [];
      }
      const picked = lead.interests.map((i) => labels.find((l) => l.toLowerCase().startsWith(i.toLowerCase())) || i);
      values[interestCol.id] = { labels: picked };
    }

    const group = board.groups && board.groups[0];
    const created = await gql<{ create_item: { id: string } }>(
      token,
      `mutation ($board: ID!, $group: String, $name: String!, $values: JSON!) {
        create_item(board_id: $board, group_id: $group, item_name: $name, column_values: $values, create_labels_if_missing: true) { id }
      }`,
      { board: boardId, group: group ? group.id : null, name: `${lead.company} · ${lead.name}`, values: JSON.stringify(values) },
    );
    return reply(200, { ok: true, id: created.create_item.id });
  } catch (err) {
    console.error(err);
    return reply(502, { ok: false, error: "Could not save the lead" });
  }
}
