# Optivads — website

Marketing site for Optivads (performance media buying + creator marketing for mobile apps), built with **Next.js 16** (App Router, TypeScript) and **Tailwind CSS 4**. The contact form writes leads to monday.com through a server-side API route.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run typecheck
```

## Structure

| Path | Purpose |
| --- | --- |
| `app/layout.tsx` | HTML shell: Google Fonts link, header, footer, metadata, scroll effects |
| `app/page.tsx` | Home: hero + dashboard, client marquee, stats, services, process, why Optivads, verticals, offices, CTA |
| `app/performance-media-buying/page.tsx` | Programmatic, On-device, In-app / In-game / CTV, OEM |
| `app/creator-content-marketing/page.tsx` | Influencer Marketing, Creative Studio, UGC |
| `app/contact/page.tsx` | Contact form and contact details |
| `app/api/lead/route.ts` | POST endpoint that creates a monday.com item from the form |
| `app/globals.css` | Tailwind import, `@theme` design tokens (colours, font, radii, shadows, breakpoints, keyframes) and the few component classes (`btn`, `card`, `chip`, `kicker`, hero/CTA overlays, reveal) |
| `components/` | `Header`, `Footer`, `Btn`, `Icon`, `SectionHead`, `ServiceCard`, `Feature`, `PageHero`, `SubNav`, `CtaBand`, `ContactForm`, `SiteEffects` |
| `lib/site.ts` | Contact details, nav, client list, base-path helper, lead endpoint |
| `public/` | Logo mark, favicon, client app icons |

## Brand

- Blue `#007bff` (primary), `#0056cc` (dark), `#003c8f` (deep, gradients). White backgrounds, navy `#0a1a33` text.
- All tokens live in the `@theme` block at the top of `app/globals.css` (`text-blue`, `bg-soft`, `border-line`, `shadow-float`, …).
- Breakpoints mirror the original design: `sm` ≥ 641px, `md` ≥ 901px, `lg` ≥ 1025px.
- Font: Plus Jakarta Sans (Google Fonts, loaded in the layout).

## Contact form → monday.com

The form (`components/ContactForm.tsx`) requires name, company, work email, app/website, budget and at least one interest (each interest reveals its channels). On submit it POSTs JSON to the lead endpoint (`/api/lead` on Vercel, or `NEXT_PUBLIC_LEAD_ENDPOINT` when set). If the endpoint is unreachable it falls back to opening the visitor's email client prefilled.

`app/api/lead/route.ts` creates an item on the board **Website Leads Capture !** (workspace CRM Optivads, board `5106268566`) in the "New Leads" group, named `Company · Full name`. It resolves columns by title at request time, so columns can be reordered or renamed on monday without a redeploy. Titles it fills: Full Name, Company, Work Email, App or Website, Monthly Media Budget (lower bound of the chosen range), Budget Range, What Are You Interested In?, Channels, Goals / Message, Submitted, Source. Requests are accepted only from the site's own origins, required fields and the email are validated, and submissions that fill the hidden honeypot field are ignored.

Environment variables (see `.env.example`):

| Variable | Where | Value |
| --- | --- | --- |
| `MONDAY_API_TOKEN` | Vercel (Production + Preview), server only | monday personal API token with write access |
| `MONDAY_BOARD_ID` | Vercel | `5106268566` |
| `NEXT_PUBLIC_LEAD_ENDPOINT` | GitHub Pages build only | `https://optivads-leads.vercel.app/api/lead` |

Test the endpoint:

```bash
curl -X POST https://optivads-leads.vercel.app/api/lead -H 'Content-Type: application/json' \
  -H 'Origin: https://optivadslimited.github.io' \
  -d '{"name":"Test","company":"TEST delete me","email":"test@example.com","app":"https://example.com","budget":"Under $10k","interests":["Performance Media Buying"],"channels":["OEM"],"message":"hello"}'
```

## Hosting

**Vercel (primary, serves the site and the API route).** Import `optivadslimited/newoptivads` as a project named `optivads-leads` (the GitHub Pages copy expects `https://optivads-leads.vercel.app/api/lead`; with a different name, change `NEXT_PUBLIC_LEAD_ENDPOINT` in `.github/workflows/pages.yml`). Framework preset: Next.js. Add the environment variables above. Every push to `main` redeploys. To use `optivads.com`, add the domain to the Vercel project.

**GitHub Pages (static copy at https://optivadslimited.github.io/newoptivads/).** `.github/workflows/pages.yml` builds a static export (`STATIC_EXPORT=1`, base path `/newoptivads`, API route excluded) and deploys it on every push to `main`. One-time repository setting: Settings → Pages → Source: **GitHub Actions**.

## Things to update

1. **Rates** — the "Pricing models" panel on the home page lists CPI / CPA / CPL / CPM / Hybrid with "rates on request".
2. **Contact details** — email, phone and both office addresses live in `lib/site.ts`.
3. **Stats** — the four headline numbers and the hero dashboard figures are in `app/page.tsx` (`STATS`, KPI tiles).
4. **Legal pages** — Privacy Policy, Cookie Policy and Terms of Use links in the footer point to `#`.
5. **Client logos** — `lib/site.ts` (`CLIENTS`) and `public/clients/`. App icons come from the App Store / Google Play.
