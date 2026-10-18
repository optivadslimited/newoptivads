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
3. **Contact form** — required: name, company, work email, app/website, budget and at least one interest (Performance Media Buying and/or Creator & Content Marketing, each revealing its channels). It currently opens the visitor's email client with the details prefilled (no backend). To collect leads server-side, point the form at Formspree, HubSpot, Netlify Forms or your CRM and remove the mailto handler in `main.js`.
4. **Stats** — the four headline numbers (45M+ impressions, 5M+ installs, +45% ROAS lift, +23.4% daily install growth) and the hero dashboard figures (5M+ installs, 18.4x ROAS, <12% fraud rate) were supplied by Optivads in Oct 2026.
5. **Legal pages** — Privacy Policy, Cookie Policy and Terms of Use links in the footer point to `#`.
6. **Client logos** — app icons come from the App Store / Google Play (via AppKittie). Swap any of them for official brand assets in `assets/clients/`.

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
