

## Phase 3: Navigation, Contact, RFQ & Engagement Polish

### 1. Header — restructured nav with dropdown
Update `src/components/layout/Header.tsx`:
- Top-level nav: **Home · Products · About · Resources ▾ · Contact**
- "Resources ▾" becomes a dropdown (shadcn `NavigationMenu` or `DropdownMenu`) containing: **Applications**, **Technology**, **Resources** (downloads).
- Mobile sheet: render the same items as a flat group with subitems indented under "Resources".
- Remove standalone Procurement / Applications / Technology links.

### 2. Routes
Update `src/App.tsx`:
- Add `/contact` → new `Contact` page.
- Keep `/applications`, `/technology`, `/resources` routes (just regrouped in nav).
- Remove `/procurement` route (content merges into About). Redirect `/procurement` → `/about`.

### 3. About page — absorb Procurement
Update `src/pages/About.tsx`:
- Add **founder name "Dr. Rucha Desai"** to the founder card (replace "Founder & CEO" placeholder header content; keep scientist-led tone).
- Append a new "Procurement & vendor qualification" section reusing the capabilities grid + vendor docs checklist + capacity statement from `Procurement.tsx`.
- Delete `src/pages/Procurement.tsx`.

### 4. Contact page (new)
Create `src/pages/Contact.tsx`:
- PageHero: "Talk to our scientists".
- Two-column layout:
  - **Left:** contact methods as large clickable cards — Email (`info@protpure.com`, `mailto:`), Phone (`tel:+919426596644`), WhatsApp (`https://wa.me/919426596644`), LinkedIn (company URL placeholder), Address with embedded Google Maps iframe.
  - **Right:** short contact form (Name, Company, Email, Message) → on submit, toast success ("We'll respond within 24–48 hours at info@protpure.com").
- Below: **LinkedIn feed embed**. Note: LinkedIn doesn't offer a true free embed widget; we'll render a styled "LinkedIn" card section with a link-out and a 3rd-party embed iframe slot (LinkedIn company page via `https://www.linkedin.com/embed/feed/...`) with graceful fallback (recent updates as static cards + "Follow on LinkedIn" CTA). Will use `<iframe>` pointing to LinkedIn company page; if blocked, fallback card stays visible.

### 5. Footer — clickable contact + socials
Update `src/components/layout/Footer.tsx`:
- Remove `protpure@gmail.com`. Keep `info@protpure.com` only, as `mailto:` link.
- Phone → `tel:` link.
- Add **social icon row** under contact: Email, Phone, WhatsApp, LinkedIn — all clickable with hover teal-bright.
- Add a "Contact" link in Company column.

### 6. WhatsApp floating button
Create `src/components/layout/WhatsAppFAB.tsx`:
- Fixed bottom-right (bottom-6 right-6), z-50, green circle (#25D366) with WhatsApp icon (lucide `MessageCircle` or inline SVG of WA logo for authenticity), subtle pulse ring.
- Links to `https://wa.me/919426596644?text=Hi%20ProtPure%2C%20I%27d%20like%20to%20enquire%20about...`.
- Mounted in `App.tsx` so it persists across all routes.

### 7. RFQ Drawer — pack size selectable per line
Update `src/components/rfq/RFQDrawer.tsx` and `src/context/RFQContext.tsx`:
- Add reducer action `UPDATE_PACK` that swaps the `pack` on an item (and re-keys the item id to `${productId}__${newCatNo}`, merging if duplicate already exists).
- In drawer line item, replace the static "catNo · size" line with a shadcn `Select` listing all `product.packSizes` (label: `${size} · ${catNo}`).
- Update form recipient copy to reference `info@protpure.com`.

### 8. Products page — add Resin Selector + Bead Size Selector
Update `src/pages/Products.tsx`:
- Above the product grid (right column), add a **collapsible "Find your resin" panel** with two tabs:
  - **Tab 1 — Resin Selector wizard:** reuse `ResinSelector` from home (already exists). On recommendation, auto-apply filter via URL `ids=...`.
  - **Tab 2 — Bead Size Selector:** extracted shared component from Technology's bead picker. Selecting a variant filters products by `flowVariant` (existing field on `Product`). Add `flowVariant` to the filter URL params and to `FilterSidebar`'s filter logic.
- Refactor: extract `BeadSizeSelector.tsx` into `src/components/products/` so both Technology page and Products page consume the same component.

### 9. Filter logic
Update `src/components/products/FilterSidebar.tsx` and `Products.tsx` to support a `flow` param mapping to `flowVariant` (`faster | standard | precise | hr`).

### Technical notes
- All `mailto:` / `tel:` / `wa.me` links use `target` defaults appropriate (mailto/tel no target, wa.me `target="_blank" rel="noopener"`).
- LinkedIn placeholder URL: `https://www.linkedin.com/company/protpure` (user can correct later).
- Google Maps embed URL built from address query string — no API key needed for the basic `https://www.google.com/maps?q=...&output=embed` iframe.
- WhatsApp number formatting: international `919426596644`.
- Form success copy across site standardized to mention `info@protpure.com`.

### Files
**Create:** `src/pages/Contact.tsx`, `src/components/layout/WhatsAppFAB.tsx`, `src/components/products/BeadSizeSelector.tsx`, `src/components/products/FindYourResinPanel.tsx`
**Edit:** `src/App.tsx`, `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`, `src/pages/About.tsx`, `src/pages/Products.tsx`, `src/pages/Technology.tsx` (use shared bead selector), `src/components/products/FilterSidebar.tsx`, `src/components/rfq/RFQDrawer.tsx`, `src/context/RFQContext.tsx`
**Delete:** `src/pages/Procurement.tsx`

