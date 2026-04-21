# Protpure Website — Merge Instructions
## How to apply these updates to protpure-catalog-main

### OVERVIEW
These files merge the best of three sources:
- **Lovable project** (architecture, RFQ cart, compare, filters, shadcn)
- **HTML demo** (USP grid, facility quote box, benchmarking tables, workflow cards, bead panels)
- **Strategy doc** (Procurement page, Why Protpure comparison, enhanced copy)

---

### FILES TO REPLACE (drop-in, overwrite existing)

| File | What changed |
|------|-------------|
| `src/App.tsx` | Added `/applications` and `/procurement` routes |
| `src/pages/Home.tsx` | Added USPGrid, WhyProtpure, FacilitySnapshot sections |
| `src/components/layout/Header.tsx` | Added Applications, Procurement nav items; fixed breakpoint to `lg:` for 7 items |
| `src/components/products/ProductDetailModal.tsx` | Added benchmarking tables (Q Agarose, SP Agarose, Ni-NTA vs industry standard) |

### FILES TO ADD (new files, place in these exact paths)

| File | What it is |
|------|-----------|
| `src/components/home/USPGrid.tsx` | 6-card "Why Protpure" grid (High Purity, Reproducible, Flow Rate, Delivery, Made in India, Cost-Effective) |
| `src/components/home/WhyProtpure.tsx` | Imported vs Protpure comparison table (8 rows: lead time, support, MOQs, etc.) |
| `src/components/home/FacilitySnapshot.tsx` | Facility table + founder quote box (dark navy visual with Dr. Desai quote) |
| `src/pages/Applications.tsx` | Full Applications page: resin selector + 6 workflow cards + bead-size guide table |
| `src/pages/Procurement.tsx` | Full Procurement page: vendor qualification, GST/compliance, capacity statement |

### FILES TO KEEP AS-IS (no changes needed)

These Lovable-generated files are already excellent:
- `src/context/RFQContext.tsx` — RFQ cart state management
- `src/context/CompareContext.tsx` — Compare feature state
- `src/components/rfq/RFQDrawer.tsx` — RFQ slide-out drawer
- `src/components/products/FilterSidebar.tsx` — Filter sidebar
- `src/components/products/ProductCard.tsx` — Product cards
- `src/components/products/CompareBar.tsx` — Floating compare bar
- `src/components/products/CompareModal.tsx` — Side-by-side comparison modal
- `src/components/layout/Footer.tsx` — Footer
- `src/components/layout/PageHero.tsx` — Reusable page hero
- `src/components/home/HeroSection.tsx` — Hero section
- `src/components/home/TrustStrip.tsx` — Trust strip
- `src/components/home/CategoryGrid.tsx` — Category cards
- `src/components/home/ResinSelector.tsx` — 3-step wizard
- `src/components/home/FlowVelocitySection.tsx` — Flow velocity bars
- `src/components/home/CTABand.tsx` — CTA band
- `src/pages/Products.tsx` — Products catalog page
- `src/pages/About.tsx` — About page
- `src/pages/Technology.tsx` — Technology page
- `src/pages/Resources.tsx` — Resources page
- `src/index.css` — CSS variables and utilities
- `tailwind.config.ts` — Tailwind configuration
- `src/data/products.ts` — Product data (but see additions below)

### PRODUCT DATA ADDITIONS

Open `src/data/products.ts` and add these 3 products to the end of the `products[]` array
(add a comma after the last existing entry, then paste):

1. **Co-NTA Agarose** — cobalt IMAC alternative with lower non-specific binding
2. **4% Agarose Resin** — SEC / desalting / buffer exchange
3. **Protein A Agarose** — pipeline product for mAb capture (status: "pipeline")

See `PRODUCTS_ADDITIONS.ts` for the exact code to paste.

---

### WHAT WAS MERGED FROM EACH SOURCE

#### From HTML Demo → Lovable:
- **USP 6-card grid** (homepage) — the "Why Protpure" value propositions
- **Facility snapshot with founder quote** — dark navy visual with Dr. Desai blockquote
- **Benchmarking tables** — per-product comparison vs industry standard in detail modal
- **Workflow cards** — 6 purification workflow patterns with stage pills and recommended resins
- **Bead-size guide table** — capture/intermediate/polishing/final-polish mapped to bead variants
- **"Imported vs Protpure" comparison** — 8-row feature comparison table
- **Applications page structure** — complete page with configurator + workflow library + guide

#### From Strategy Doc → Lovable:
- **Procurement page** — vendor qualification, GST/compliance, capacity statement, document checklist
- **Copy improvements** — specific data points instead of generic language throughout
- **Conversion patterns** — every page connects to RFQ cart

#### From Lovable → Kept intact:
- **RFQ cart system** — Context + reducer + Sheet drawer (best-in-class implementation)
- **Compare feature** — Context + floating bar + side-by-side modal with industry benchmarks
- **Filter sidebar** — URL param-based filtering (shareable filtered views)
- **Product detail modal** — pack size selector, add-to-RFQ flow
- **shadcn/ui integration** — consistent components throughout
- **Design system** — HSL CSS variables, contrast-safe dark colors (#B8CFE0, #9AB8CC)
- **Responsive patterns** — mobile hamburger, filter sheet, responsive grids

---

### STEP-BY-STEP

1. Unzip `protpure-catalog-main.zip`
2. Copy all files from the `update-files/` folder into the project, overwriting existing files
3. Open `src/data/products.ts` and append the 3 new products from `PRODUCTS_ADDITIONS.ts`
4. Run `npm install` (or `bun install`)
5. Run `npm run dev` (or `bun dev`)
6. Test all routes: `/`, `/products`, `/applications`, `/technology`, `/procurement`, `/about`, `/resources`
