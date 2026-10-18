# Optivads — website rebrand

Static site (plain HTML, CSS and JavaScript, no build step). Open `index.html` in a browser or serve the folder with any static host (Vercel, Netlify, GitHub Pages, S3, cPanel).

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home: hero, client logos, stats, Performance Media Buying, Creator & Content Marketing, process, why Optivads, verticals, CTA |
| `performance-media-buying.html` | Programmatic (TikTok Ads & Snapchat Ads), On-device Traffic, In-app / In-game / CTV, OEM |
| `creator-content-marketing.html` | Influencer Marketing, Creative Studio, UGC |
| `contact.html` | Contact form and contact details |

Shared files: `assets/css/styles.css`, `assets/js/main.js` (both linked with a `?v=` query; bump it when you change them so browsers fetch the new version), `assets/img/mark.svg` (logo mark and favicon), `assets/clients/` (client logos).

## Brand

- Blue `#007bff` (primary), `#0056cc` (dark), `#003c8f` (deep, gradients). White backgrounds, navy `#0a1a33` text.
- All colours live as CSS variables at the top of `styles.css`.
- Font: Plus Jakarta Sans (Google Fonts).

## Things to update

1. **Rates** — the "Pricing models" panel on the home page (`#why`) lists CPI / CPA / CPL / CPM / Hybrid with "rates on request". Drop the actual rates in there, or add a pricing table, once available.
2. **Contact details** — `partnership@optivads.com` and `+44 7739 364474` are used in the footer, CTA bands, contact page and the form's `data-to` attribute. Offices: Global West (Optivads Limited, London WC2H 9JQ) and MENA (Veltadsap, sister agency, Casablanca) appear in the home page "Where we operate" section, the footer and the contact page.
3. **Contact form** — required: name, company, work email, app/website, budget and at least one interest (Performance Media Buying and/or Creator & Content Marketing, each revealing its channels). On submit the form POSTs JSON to the lead endpoint named in its `data-endpoint` attribute (`contact.html`), which creates an item on the monday.com board **Website Leads Capture !** (workspace CRM Optivads, board 5106268566). If the endpoint is unreachable the form falls back to opening the visitor's email client prefilled. See **Lead endpoint** below.
4. **Stats** — the four headline numbers (45M+ impressions, 5M+ installs, +45% ROAS lift, +23.4% daily install growth) and the hero dashboard figures (5M+ installs, 18.4x ROAS, <12% fraud rate) were supplied by Optivads in Oct 2026.
5. **Legal pages** — Privacy Policy, Cookie Policy and Terms of Use links in the footer point to `#`.
6. **Client logos** — app icons come from the App Store / Google Play (via AppKittie). Swap any of them for official brand assets in `assets/clients/`.

## Lead endpoint (monday.com)

`api/lead.js` is a Vercel serverless function; `vercel.json` configures it. It never ships the monday token to the browser: the token lives in the `MONDAY_API_TOKEN` environment variable of the Vercel project. The function resolves board columns by title at request time, so columns can be reordered or renamed on monday without redeploying (titles it fills: Full Name, Company, Work Email, App or Website, Monthly Media Budget, Budget Range, What Are You Interested In?, Channels, Goals / Message, Submitted, Source). It allows requests only from the site's origins (see `ALLOWED_ORIGINS`), validates required fields and ignores submissions that fill the hidden honeypot field.

Deploy:

1. In Vercel, **Add New → Project**, import `optivadslimited/newoptivads`, name it `optivads-leads` (the form expects `https://optivads-leads.vercel.app/api/lead`; if you use another name, update `data-endpoint` in `contact.html`). Framework preset: Other. No build command.
2. Environment variables (Production + Preview): `MONDAY_API_TOKEN` = a monday personal API token with write access, `MONDAY_BOARD_ID` = `5106268566`.
3. Deploy. Every push to `main` redeploys the function alongside GitHub Pages.

Test with:

```bash
curl -X POST https://optivads-leads.vercel.app/api/lead -H 'Content-Type: application/json' -H 'Origin: https://optivadslimited.github.io' \
  -d '{"name":"Test","company":"TEST delete me","email":"test@example.com","app":"https://example.com","budget":"Under $10k","interests":["Performance Media Buying"],"channels":["OEM"],"message":"hello"}'
```

## Hosting

The site is hosted with GitHub Pages from the `main` branch of
https://github.com/optivadslimited/newoptivads and is live at
https://optivadslimited.github.io/newoptivads/.

Every push to `main` redeploys automatically (allow one to two minutes). To use the
optivads.com domain later, add a `CNAME` file containing the domain to the repo root,
point the domain's DNS at GitHub Pages, and set the custom domain in the repo's
Settings → Pages.

## Local preview

```bash
python3 -m http.server 8765
```

Then open http://localhost:8765.
