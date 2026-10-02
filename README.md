# ProtPure website

Marketing and catalogue site for **Protpure Tech Pvt. Ltd.** (protpure.com): agarose chromatography
resins, pre-packed columns, kits, empty columns and downstream bioprocessing services.
Every page leads to one action: a quote request that is emailed to the sales inbox.

- **Stack:** Vite 5, React 18, TypeScript, Tailwind CSS 3, shadcn/ui (Radix), React Router 6.
- **Backend:** Lovable Cloud (Supabase) edge functions for email, the LinkedIn feed and the
  password-protected documents portal. The catalogue itself is static data in `src/data`.
- **Docs:** start at [`docs/MASTER_INDEX.md`](docs/MASTER_INDEX.md).

## Run it

```bash
npm install
npm run dev        # http://localhost:8080
npm run build      # production build in dist/ (also writes sitemap.xml)
npm run preview    # serve the production build
npm test           # unit and page smoke tests (vitest)
npm run lint       # eslint
```

The enquiry form only sends from allowed origins (protpure.com and the Lovable preview domains).
On `localhost` a submission fails by design and the form offers the email / WhatsApp fallback.
To click through the whole flow locally without sending anything:

```bash
VITE_ENQUIRY_DEMO=true npm run dev
```

## Where things live

| Path | What it holds |
| --- | --- |
| `src/data/` | All content: catalogue, catalogue numbers, applications, services, company facts, measured data |
| `src/pages/` | One file per route |
| `src/components/site/` | Header, footer, page frame and shared page sections |
| `src/components/catalog/` | Product cards, specification and pack tables, resin finder, compare |
| `src/components/rfq/` | Quote list, enquiry form, quote drawer |
| `src/components/viz/` | Charts and illustrations (plain SVG, no chart library) |
| `src/lib/enquiry.ts` | The one place that sends an enquiry |
| `src/index.css`, `tailwind.config.ts` | Design tokens, see [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) |
| `supabase/functions/` | Edge functions (Deno) |

## Changing content

Content is plain TypeScript, checked by the tests.

- **A new pack size or catalogue number:** add it to `src/data/packs.ts`.
- **A new product line:** add it to `src/data/catalog.ts` (and its packs to `packs.ts`).
  The products page, search, sitemap, CSV export and the quote list pick it up automatically.
- **Application recommendations:** `src/data/applications.ts`.
- **A document to download:** copy the PDF to `public/downloads/` and set `file` on its entry in
  `src/data/resources.ts`. Without `file`, the document is offered "on request".
- Run `npm test` afterwards: it fails if a catalogue number is duplicated or a link points at a
  product that does not exist.

Where every number on the site comes from, and what is still waiting for the client's confirmation:
[`docs/CONTENT_SOURCES.md`](docs/CONTENT_SOURCES.md).

## Site rules

1. The quote request is the only conversion path. No prices, no checkout.
2. The site never offers samples (client instruction; a test enforces it).
3. Only publish what a client document supports. If it is not in a source, it is not on the site.
4. Units keep their case: `mL`, never `ML`. Use the `code` class, not `label`, for anything with a unit
   or a catalogue number.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID` | Backend (managed by Lovable Cloud, in `.env`) |
| `VITE_ENQUIRY_DEMO=true` | Forms confirm without sending; the LinkedIn feed is not requested. For previews. |
| `VITE_ROUTER=hash` | Hash-based URLs, for a static preview with no server-side routing |

## Hosting

Client-side routing needs every unknown path to serve `index.html` (Lovable does this already).
On your own server, add the usual single-page-app fallback, and add the new origin to
`ALLOWED_ORIGINS` in `supabase/functions/send-transactional-email/index.ts` or enquiries will be refused.
