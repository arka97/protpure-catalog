# ProtPure Documentation Hub — v1 Canonical Set

Replace the current 5 placeholder docs with **14 fully-drafted canonical docs** grounded in the actual ProtPure codebase (products in `src/data/products.ts`, pages, RFQ/Compare flows, design system, /documents auth via Edge Function).

## Scope

- **Delete** the 5 starter `.md` files (`01-vision` … `05-internal-financials`).
- **Create** 14 new `.md` files under `src/content/docs/` with real, shippable prose, tables, and mermaid diagrams.
- **Rewrite** `src/content/docs/_meta.ts` so the registry, slug map, and `getDoc()` reflect the new set.
- **No changes** to routing, PasswordGate, MarkdownRenderer, DocumentsHub, or DocPage — they already handle any number of docs and the `internal` flag drives section grouping.

## Document set

### Public Spec (6)

| # | Slug | Title | Read | Diagrams |
|---|---|---|---|---|
| 01 | `vision-and-pitch` | Vision & Pitch | 4 min | 1 |
| 02 | `business-and-scope` | Business & Scope | 5 min | 1 |
| 03 | `product-and-ux` | Product & UX | 6 min | 1 |
| 04 | `functional-spec` | Functional Spec | 7 min | 1 |
| 05 | `architecture-and-tech` | Architecture & Tech | 6 min | 2 |
| 06 | `build-and-operations` | Build & Operations | 5 min | 1 |

### Internal Reference (8, `internal: true`)

| # | Slug | Title | Read | Diagrams |
|---|---|---|---|---|
| 07 | `database-reference` | Database Reference | 4 min | 1 |
| 08 | `edge-functions-reference` | Edge Functions Reference | 4 min | 1 |
| 09 | `frontend-architecture` | Frontend Architecture | 6 min | 1 |
| 10 | `component-and-design` | Components & Design System | 5 min | 0 |
| 11 | `decisions-log` | Decisions Log | 4 min | 0 |
| 12 | `money-and-membership` | Money & Membership | 4 min | 0 |
| 13 | `operations-runbook` | Operations Runbook | 5 min | 1 |
| 14 | `roadmap-and-glossary` | Roadmap & Glossary | 4 min | 0 |

## Per-doc outlines

**01 Vision & Pitch** — Problem (95%+ resin import dependence), mission, 60-sec pitch, target customer archetypes, why-now, 3-year north star, founder note. Mermaid: market positioning quadrant.

**02 Business & Scope** — Revenue streams (catalog, custom ligand, method dev), TAM/SAM/SOM framing, segments (mAb, vaccines, academic, CDMO), pricing tiers, in-scope vs out-of-scope for v1, GTM motion. Mermaid: customer journey.

**03 Product & UX** — Site IA (Home, Products, Applications, Technology, About, Resources, Contact), key user journeys (Browse → Compare → RFQ; Find-Your-Resin → PDP → RFQ), interaction patterns (RFQ drawer, Compare bar, modals), accessibility commitments, mobile behavior. Mermaid: page map.

**04 Functional Spec** — Feature inventory: Product catalog (filters by chromatography type, exchanger, flow variant, status), ProductCard/PDP, FilterSidebar, BeadSizeSelector, FindYourResinPanel, CompareBar/CompareModal (max N items), RFQDrawer (line items, contact capture), WhatsApp FAB, Documents hub with password gate. Acceptance criteria per feature. Mermaid: RFQ state machine.

**05 Architecture & Tech** — Stack (React 18 + Vite 5 + TS 5 + Tailwind v3 + shadcn + react-router + TanStack Query), Lovable Cloud (Supabase) backend, Edge Function for password verification, content pipeline (`?raw` markdown imports), routing tree, state contexts (RFQ, Compare, DocAuth). Mermaid: system context diagram + request flow for password verify.

**06 Build & Operations** — Local dev, env vars (`VITE_SUPABASE_*`), build/deploy via Lovable, custom domains (protpure.com), SEO setup (sitemap, robots, meta), performance budget, monitoring touchpoints, release checklist.

**07 Database Reference** — Current state: no app tables yet (catalog is static in `src/data/products.ts`); auth used only by docs gate. Planned tables when RFQ persistence lands (rfq_submissions, rfq_line_items, contacts) with column sketches and RLS posture. Mermaid: planned ERD.

**08 Edge Functions Reference** — `verify-doc-password`: contract (POST { password } → { ok }), CORS posture, secret (`DOCS_PASSWORD`), failure modes, rate-limit recommendation, future functions (RFQ submit, lead notification). Mermaid: invoke flow.

**09 Frontend Architecture** — Folder layout, routing (App.tsx), provider stack ordering, component categories (layout/, home/, products/, rfq/, docs/, ui/), data flow patterns, lazy-loading strategy (mermaid dynamic import as exemplar), error boundaries gap. Mermaid: provider tree.

**10 Components & Design System** — Tailwind tokens in `index.css`/`tailwind.config.ts`, semantic color usage rule, typography (serif headings + sans body), shadcn variants, component inventory grouped by domain, naming conventions, dos/don'ts (no raw colors in components).

**11 Decisions Log** — ADR-style entries: (1) Lovable Cloud over self-hosted Supabase, (2) Static product catalog v1 vs DB-backed, (3) Password gate via Edge Function vs client hash, (4) Markdown docs via `?raw` vs CMS, (5) Mermaid lazy-loaded, (6) RFQ as drawer vs page. Each with context/decision/consequences.

**12 Money & Membership** — Pricing model (volume tiers, custom-quote default), RFQ-to-quote workflow, no public e-commerce in v1, future membership/portal sketch (account, order history, MoQ tracking), payment provider positioning (deferred).

**13 Operations Runbook** — Common tasks: rotate `DOCS_PASSWORD`, add a product, add a doc, update sitemap, redeploy Edge Function, troubleshoot CORS, restore from a regression. On-call expectations (solo founder reality), incident severity ladder. Mermaid: incident triage flow.

**14 Roadmap & Glossary** — H1 2026 / H2 2026 milestones, near/mid/far horizon, deferred items, glossary (DBC, IEC, SEC, mAb, CIP, Q/SP/DEAE/CM, agarose, ligand, RFQ, MoQ, CDMO, GMP).

## Implementation steps

1. Delete `src/content/docs/01-vision.md` … `05-internal-financials.md`.
2. Create the 14 new `.md` files using the per-doc outlines above as full prose drafts (each 400–900 words, with at least one table and the diagrams indicated).
3. Rewrite `src/content/docs/_meta.ts`:
   - Import the 14 new files via `?raw`.
   - Update `DOCS` array (number, slug, title, summary, readTime, diagramCount, internal flag for 07–14).
   - Update `SOURCES` map.
   - `getDoc()` is unchanged.
4. Sanity check: visit `/documents`, confirm 6 public + 8 internal cards render, open one of each, confirm TOC and mermaid render.

## Out of scope

- No routing or auth changes.
- No new components or styles.
- No backend tables (called out as "planned" in doc 07).
- Hub/viewer UI untouched — read-time and diagram counts come from registry metadata only.

## Risks

- **Numbers in internal docs.** Drafts will use clearly-labeled illustrative placeholders for any financial or roadmap figures; you'll want to overwrite before sharing externally.
- **Mermaid complexity.** Diagrams kept small to avoid render failures and bundle pressure (already lazy-loaded).
- **Slug change breaks old links.** Existing slugs (`vision`, `business`, etc.) disappear; if anything off-site links to them, those 404 to the hub via the existing `<Navigate>` fallback in `DocPage`.
