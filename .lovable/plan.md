# Refactor Plan

Behavior and visible UI stay the same. Public URLs unchanged. Docs hub content untouched. Catalog data preserved (migrated, not rewritten).

## 1. Folder & file structure

Reorganize `src/` around features instead of mixed buckets.

```text
src/
  app/                    App.tsx, providers.tsx, router.tsx
  features/
    products/             card, filter-sidebar, detail-modal, find-your-resin, compare-bar, compare-modal
    rfq/                  drawer + sub-pieces (header, line-item, footer, submit-form)
    docs/                 password-gate, markdown-renderer, mermaid (split out)
    home/                 hero, usp-grid, category-grid, resin-selector, ...
    contact/              form, info-panel (extracted from Contact.tsx)
    about/                story, team, values (extracted from About.tsx)
  components/
    layout/               header, footer, page-hero, whatsapp-fab
    ui/                   shadcn primitives (untouched)
  hooks/                  useProducts, useFilteredProducts, useResinFinder, ...
  lib/                    utils, format, constants
  types/                  product.ts, rfq.ts, doc.ts (moved out of data/context files)
  data/                   queries.ts (TanStack Query hooks for products), seed.ts
  content/docs/           unchanged
  context/                rfq, compare, doc-auth (slim wrappers around hooks)
  pages/                  thin route components (Home, Products, About, ...)
  integrations/supabase/  unchanged (auto-generated)
```

- Delete stray `PRODUCTS_ADDITIONS.ts` (already merged or obsolete — verify first, archive contents into a migration if needed).
- Collapse `pages/Index.tsx` (2-line wrapper) into the route definition.

## 2. Component decomposition

Targets (currently large, mixing concerns):

| File | Lines | Split into |
|---|---|---|
| `pages/About.tsx` | 320 | `AboutHero`, `AboutStory`, `AboutValues`, `AboutTeam`, `AboutCTA` |
| `pages/Contact.tsx` | 250 | `ContactForm`, `ContactInfo`, `ContactMap`, `ContactFAQ` |
| `pages/Technology.tsx` | 180 | `TechHero`, `TechProcess`, `TechSpecs` sections |
| `components/rfq/RFQDrawer.tsx` | 249 | `RFQHeader`, `RFQLineItem`, `RFQFooter`, `RFQSubmitForm` |
| `components/products/ProductDetailModal.tsx` | 219 | `SpecTable`, `PackSizePicker`, `ApplicationsList` |
| `components/products/FilterSidebar.tsx` | 169 | `FilterGroup`, `FilterChips` + `useProductFilters` hook |
| `components/home/ResinSelector.tsx` | 218 | `ResinQuestionStep`, `ResinResultCard` + `useResinFinder` hook |
| `components/layout/Header.tsx` | 168 | `DesktopNav`, `MobileNav`, `HeaderCTAs` |
| `data/products.ts` | 394 | Move types to `types/product.ts`; keep data export only |

Rule: any component file > 150 lines or mixing 3+ responsibilities gets split.

## 3. State & data layer

- **Move `DocAuthProvider` up once** in `app/providers.tsx` instead of being mounted twice (per route in `App.tsx`). Scope stays effectively docs-only because nothing else reads it.
- **Extract reducer + types** from `RFQContext.tsx` into `features/rfq/state.ts`; context becomes a thin provider.
- **Persist RFQ cart and Compare set** to `sessionStorage` (no behavior change visible, just survives refresh — moderate-risk add, no UI shift).
- **Centralize types** under `src/types/` (`Product`, `PackSize`, `RFQItem`, `DocMeta`, ...). Existing files re-export for backwards compatibility during transition.
- **Introduce TanStack Query hooks** (`useProducts`, `useProduct(id)`) wrapping the data source — paves the way for the database move.

## 4. Design system cleanup

- Audit components for raw color usage. Replace ad-hoc classes (`text-white`, `bg-black`, hex literals if any) with semantic tokens.
- Keep brand tokens (`navy`, `teal`, ...) but normalize: any place using `text-navy` for foreground should use `text-foreground` when semantically generic. Brand tokens stay for explicitly branded surfaces (hero, CTA bands).
- Add missing semantic mappings in `index.css` if a token is repeatedly inlined.
- Standardize button/badge variants — pick ones that exist in shadcn variants instead of one-off Tailwind combos.
- Extract repeated class strings (e.g. card surfaces, focus rings) into small `cva` variants or `cn()` helpers in `lib/styles.ts`.
- No visible style changes; this is a token hygiene pass.

## 5. Database migration (catalog → Lovable Cloud)

Move the static catalog from `src/data/products.ts` into a database table so it can be edited without redeploying.

- New table `products` with columns mirroring the `Product` interface; arrays for `tags`, `applications`, `pack_sizes` (JSONB).
- RLS: `SELECT` allowed for everyone (anon + authenticated). No insert/update/delete policies (admin edits via SQL for now — admin UI is out of scope).
- Seed migration inserts current catalog rows from `products.ts` + the entries staged in `PRODUCTS_ADDITIONS.ts`.
- Replace direct `import { products }` with `useProducts()` (TanStack Query → Supabase). Loading + empty + error states added to consuming pages (skeletons matching existing card layout — no visual regression).
- Keep `src/data/products.ts` temporarily as a fallback constant for tests, then delete in a follow-up.

## 6. Verification

- Build passes.
- Manual click-through on `/`, `/products`, `/applications`, `/about`, `/technology`, `/contact`, `/resources`, `/documents`.
- RFQ add → drawer → submit still works.
- Compare flow still works.
- Docs password gate still works (single provider mount).
- No URL changes; `/procurement` still redirects to `/about`.

## What is NOT changing

- Public routes/URLs.
- Visible UI / styling output.
- The 14 docs and password gate behavior.
- shadcn `ui/*` primitives.
- Auto-generated Supabase client/types files.

## Risks

- Catalog DB move is the highest-risk piece (network call replaces sync import). Mitigation: TanStack Query with `staleTime: Infinity` + skeletons; keep the static file behind a feature flag for one release if needed.
- Folder moves can break editor bookmarks and any external links to specific files. Internal imports updated atomically.
- `DocAuthProvider` move is safe because the gate already reads from `sessionStorage`.
