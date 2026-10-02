---
title: Content Sources
description: Where every fact on the site comes from, and what is waiting for the client's confirmation
phase: revamp 2026
last_updated: 2026-10-03
owner: Protpure engineering
---

# Content sources

Rule for this site: **a fact is published only if a client document supports it.** This file maps each
data file to its sources and lists the points where the client's documents disagree with each other.
Those points need a decision from ProtPure before launch (section 3).

## 1. Source documents

All in the client's `Protpure/` folder.

| Short name | File | Date |
| --- | --- | --- |
| Product list | `Protpure_Product_code_v1.xlsx` ("Product code for website") | Oct 2026 |
| Application matrix | `Application_Resin_Matrix.xlsx` (applications, stages, services, empty columns, featured items) | Oct 2026 |
| Product brochure | `brochures/2026-08_protpure-product-brochure.pdf` | Aug 2026 |
| Executive brochure | `brochures/2026-06_protpure-executive-brochure-v1.pdf` | Jun 2026 |
| Short brochure | `brochures/2026-06_protpure-short-brochure.pdf` | Jun 2026 |
| 2025 catalogue | `brochures/2025-07_protpure-product-catalog-r1.pdf` | Jul 2025 |
| IEX datasheets | `datasheets/2026-05_{sp,q,deae}-agarose_technical-datasheet-v1.pdf` | May 2026 |
| SP HR datasheet | `datasheets/2026-06_sp-agarose-hr_datasheet.pdf` | Jun 2026 |
| Intro deck | `technical-data/2026-02_indigenous-chromatography-resins_intro-deck.pdf` | Feb 2026 |
| DEAE study | `technical-data/2026-05_deae-agarose-precise_performance-data.pdf` | May 2026 |
| Packing case study | `technical-data/2026-05_iec-column-efficiency_case-study.pdf` | May 2026 |
| SEC poster | `technical-data/2026-04_sec-precise_calibration-poster.pdf` | Apr 2026 |
| Hy-Ionic poster | `posters-social/Hy-ionic DP poster v2.png` | Oct 2026 |
| MR kit overview | `posters-social/mr-agarose-kit_product-overview.png` | undated |
| Pack images | `images/products/*.jpg`: 16 bottles, 500 × 500 px, with the label used in the 2025 catalogue | undated |
| Photographs | `images/columns/`, `images/facility/` | undated |
| Services pictures | `Services/` (added to the folder on 1 October 2026) | Oct 2026 |

When two documents disagree, the site follows the newest one written for the website: the **product list**.

## 2. What each data file is built from

| File | Content | Source |
| --- | --- | --- |
| `src/data/packs.ts` | 190 catalogue numbers and pack sizes | Product list, transcribed row by row |
| `src/data/catalog.ts` | Product lines, grades, bead size, binding capacity | Product list |
| | Ion-exchange ionic capacity, particle range, flow, pH and chemical stability | IEX datasheets |
| | Phenyl ligand density, flow, stability; MR Agarose; kit contents | Product brochure |
| | Hy-Ionic DP modes, capacities, alkaline stability | Hy-Ionic poster |
| | Metal-affinity stability figures, Ni²⁺ capacity, pre-packed column dimensions | 2025 catalogue |
| `src/data/hardware.ts` | 64 empty columns | Application matrix, "Empty Column" sheet |
| `src/data/applications.ts` | 10 applications, 21 workflows, resins per stage | Application matrix |
| `src/data/families.ts` | Families, grades, stages | Product list, application matrix, product brochure, IEX datasheets |
| `src/data/services.ts` | Four services | Application matrix "Service" sheet, product brochure p. 8 |
| `src/data/evidence.ts` | Chart data | DEAE study, packing case study, SEC poster, intro deck, Hy-Ionic poster |
| `src/data/company.ts` | Facts, milestones, vision, mission, founder quote | Intro deck, executive and short brochures |
| `src/data/resources.ts` | Document list | The client's PDFs (titles, dates, page counts) |
| `src/data/site.ts` | Contact details and address | 2026 brochures and datasheets |

### Pictures

Every picture in `src/assets/img/` is the client's own: cropped, resized and compressed, and nothing else
(the pack images are 500 px originals, so a copy enlarged to twice the size is served to high-density screens).
`scripts/process-images.py` rebuilds the pictures added in October 2026 from the originals; it holds every crop box.

| Site image | Original | Shown on |
| --- | --- | --- |
| `columns-box`, `columns-upright`, `columns-fan` | `images/columns/24*_fplc-prepacked-1ml-columns.jpg` | `columns-box`: Home and the Co-, Cu- and Zn-NTA pre-packed column pages. `columns-fan`: Company. `columns-upright` is not placed at present |
| `columns-ni-pair` | `images/columns/23_ni-nta-agarose-1ml-columns.jpg` | Ni-NTA pre-packed columns |
| `packed-column` | `images/columns/ni-nta-agarose-packed-column_lab.jpg` | Home, Ni-NTA Agarose |
| `lab-fplc`, `lab-fplc-column` | `images/facility/fplc-system*.jpg` | Home, Services, Technology, Company |
| `bpg200-column` | `images/facility/bpg200-ni-nta-column_client-site.jpg` (camera watermark cropped out) | Home, Ni-NTA Agarose, Company |
| `pack-…` (8 lines) | `images/products/` 01, 03, 04, 10, 12, 14, 16, 19: the bottles whose label carries the name of a product line | Product pages, product cards, the catalogue header, Home |
| `kit-mr-agarose` | MR kit overview, the product picture in its upper left | MR Agarose evaluation kit, Home |
| `packed-columns-trio` | `Services/Pre-packed columns.png` | Services, column packing |
| `purification-run` | `Services/Linkedin Cover image -1.png`, the photograph inside it (669 px wide; no larger original in the folder) | Services, protein purification |
| `case-study-column` | The photograph on page 1 of the packing case study | Services, case study |
| `beads-ff`, `beads-precise`, `beads-hr` | Intro deck, slides 20, 19 and 18 | Technology, performance grades |
| `cover-…` (8 documents) | Page 1 of each PDF listed under Resources, 200 px wide | Resources |

Drawn for the site, not taken from a client picture:

- **Product illustrations** (`components/viz/ProductIllustration.tsx`) for the six lines without a usable picture:
  Hy-Ionic DP, MR Agarose, Plain Agarose, Activated Agarose, the Ni-NTA His-tag kit and the empty columns.
  Each shows the principle stated in that product's own text, and its caption says "Illustration".
- **Application pictograms** (`components/viz/MoleculeGlyph.tsx`): the kind of molecule each application area
  purifies. Decorative; no data.

Which picture a product line gets is set in `src/data/product-visuals.ts`. `src/test/images.test.tsx` fails if a
line has no picture, if a drawing is not captioned as one, or if a pack image is shown for a pack the line does not sell.

The logo in `src/components/brand/Logo.tsx` is traced from `brand/protpure-logo.svg`. Its shapes and its two
colours are unchanged.

## 3. For ProtPure to confirm

### 3.1 Numbers that differ between documents

**Binding capacity.** The site shows the product-list values.

| Resin | Site (product list) FF / Precise / HR | IEX datasheets (May 2026) | Elsewhere |
| --- | --- | --- | --- |
| SP Agarose, mg lysozyme/mL | 150 / 150 / 150 | ≈100 / ≈120 / ≈130 | SP HR datasheet ≈150; intro deck ≥150; IEC poster ≥100 |
| Q Agarose, mg BSA/mL | 100 / 120 / 140 | ≈80 / ≈100 / ≈120 | intro deck and IEC poster ≥140 |
| DEAE Agarose, mg BSA/mL | 80 / 100 / 120 | ≈90 / ≈110 / ≈120 | DEAE study: measured 128, specification ≥120 for Precise |
| Phenyl Agarose, mg BSA/mL | 25 / 25 / 30–35 | n/a | product brochure 25–30 |
| Ni-NTA Agarose, mg/mL | 40 / 50 / 60 | n/a | 2025 catalogue ~40 |
| Co-, Cu-, Zn-NTA Agarose, mg/mL | 40 (Cu Precise 50) | n/a | 2025 catalogue "up to 20" |

The DEAE page shows the catalogue value (100 mg BSA/mL for Precise) in the table and the measured
128 mg BSA/mL in the data section. The study's own "specification ≥ 120" is not shown, because it contradicts
the table. Please say which specification is current.

Other figures:

- **Precise bead size:** ~70 µm in the product list, ~65 µm in the datasheets and product brochure. Site: ~70 µm.
- **Hy-Ionic DP alkaline stability:** 30 days in the October poster, 10 days in the August brochure. Site: 30 days.
- **Hy-Ionic DP particle size:** "~60–150 µm" on the poster, Precise (~70 µm) in the product list. Site: ~70 µm.
- **Pack size "250 mL / 300 mL":** SPFF04, SPPR04, SPHR04, QAFF04, QAPR04, QAHR04 are shown exactly as in the sheet. Which is it?
- **Asymmetry acceptance range 0.8–1.8** comes from the intro deck and is drawn on the DEAE study chart.

### 3.2 Corrections made to the product list

- `NNPR01–08` and `CuPR01–08` are named "Fast Flow" in the sheet but carry Precise data (~70 µm, 50 mg/mL). Listed as **Precise**.
- `PHFF04`, `PHFF06`: "Phenyl Agarose HFast Flow" listed as **Fast Flow**.
- Q and DEAE are described as "cation exchange resin" in the master sheet. Listed as **anion exchangers**.
- The MR Agarose description is a copy of the Ni-NTA text. The site uses the brochure's description.
- `…PCF…` / `…PCH…` pre-packed columns are read as columns packed with **Fast Flow** / **High Resolution** resin
  (the sheet describes both with ~90 µm, 40 mg/mL).
- `P50700Plus-AA`: the bed-volume cell holds the bed-height range. Set to 1010–1305 mL, like the other 50 × 700 mm columns.

### 3.3 In the client's material but not on the site

- The **"Faster" grade**, CM Agarose, Protein A and magnetic beads (2025 catalogue, old site): not in the product list.
- **10 mL and 20 mL pre-packed columns** (product brochure): not in the product list.
- **Ion-exchange pre-packed columns** appear in the photographs (some labelled "Faster") but not in the product list.
  The photographs are used as general pictures of the columns.
- **Evaluation samples** (offered on the datasheets): not offered on the site, by instruction.
- **Delivery time "2–3 weeks"** (2025 catalogue), certificates of analysis, SDS: not stated on the site.
- **Benchmark tables against an "industry standard"** (2025): not published.
- **Pictures held back** (October 2026):
  - The range photograph with eight 10 L containers (`images/products/product-portfolio_white-background.jpg`):
    four containers are labelled "Faster", the packs are 10 L (the product list ends at 1 L), and the labels print
    a Gmail address and the web address protpuretech.com.
  - Pack images for products that are not in the product list: CM Agarose, CNBr-activated agarose, Ni-NTA magnetic
    agarose. For the 4% and 6% agarose and the 2%, 4% and 6% cross-linked agarose bottles, see 3.5.
  - The photograph of the manufacturing set-up in the intro deck (slide 5): 520 × 693 px, too small to show well.
  - The gel on slide 12 of the intro deck (Ni-NTA purification, nine lanes): the slide names neither the protein
    nor the conditions.
  - `posters-social/2026-05_high-performance-resins_ai-concept.png`: a concept image, not a photograph of a product.
  - The posters themselves, and the "metal binding / metal removal" strip in the MR kit LinkedIn poster (570 px wide).
  - `Services/IMG_20260131_152243.jpg`: the same view as `fplc-system_1l-column.jpg`, which is already on the site.
- **PDF downloads:** the documents are listed but sent on request. Several contain the conflicts above, and
  the product brochure has slips of its own (Q described for "basic" isoelectric points, "14 mmol",
  "1838.25 million plates"). Correct them, copy them to `public/downloads/`, then set `file` in `resources.ts`.

### 3.4 Names and wording

- **"Activated Agarose"** is the product-list name for the cross-linked SEC and desalting resin. In the trade,
  "activated" usually means a resin ready for ligand coupling. Keep the name?
- **SEC calibration:** which catalogue product does the poster's "Agarose Precise, 6% cross-linked SEC resin"
  correspond to? The site calls it "a ProtPure agarose SEC resin, Precise grade". The poster gives the flow as
  both 4.42 mL/min and 120 cm/h, which do not agree for a 50 mm column, and its fitted curve could not be
  reproduced from the tabulated points. The site shows the measured points only.
- **MR kit protocol:** the strip and regeneration steps are described without volumes.
- **Address:** "A2, Plot No. A2/440/2, Opp. Paragon Paints, GIDC V.U. Nagar, Anand – 388121" (2026 documents,
  without "PKY 425 Sq. Mtr."). The 2025 catalogue adds "Road No. B-18".
- **Founder's title:** "Founding Director" (intro deck).
- **Mailboxes:** quote requests are delivered to `sales@protpure.com`; the site prints `info@protpure.com`.
  Both must be read.
- Single-source statements: "First Indian manufacturer of Ni-NTA Agarose" (brochures); "used in GMP facilities,
  with repeat orders", "600 L per month", "team of 8–10", "bootstrapped" (intro deck).

### 3.5 Pictures

- **Pack images.** The eight bottles shown carry the label of the 2025 catalogue: the "Protfiltr" name and a
  wordmark with four dots. All are 500 mL bottles. Keep them, or send photographs of the current packs?
- **Plain Agarose and Activated Agarose** show a drawing, because no pack image carries those names. The folder has
  bottles labelled 4% and 6% agarose, and 2%, 4% and 6% cross-linked agarose. Which of them, if any, are the
  current Plain Agarose and Activated Agarose?
- **Hy-Ionic DP, MR Agarose, the Ni-NTA His-tag kit and the empty columns** have no picture in the folder and show
  a drawing.
- **MR Agarose evaluation kit.** The picture comes from the product overview poster. Does the kit that is shipped
  look like it (the box, the bottle labels, the logo on the box)?
- **Pre-packed columns.** The Co-, Cu- and Zn-NTA pages show the general photograph of the 1 mL columns and their
  box; the columns in it are labelled for other resins. On the Ni-NTA page one of the two columns is labelled
  "Ni-NTA Agarose Faster".
- **Bead micrographs.** In the February 2026 deck the three matrices are called "Agarose" (mean 96 µm,
  45–165 µm), "Agarose Precise" (60 µm, 25–110 µm) and "Agarose HR" (40 µm, 15–75 µm). The site shows them as
  Fast Flow, Precise and High Resolution, without the deck's figures, because the product list gives ~90, ~70 and
  ~35 µm. "Agarose" is read as Fast Flow because both have the particle range 45–165 µm. Confirm that the
  pictures still stand for the current grades.
- **Services.** "Packed columns at three scales": which column sizes are they? The photograph of the purification
  system with the chromatogram exists only inside the LinkedIn cover, 669 px wide: please send the original.

**Photographs wanted**, each on a plain light background, at least 2,000 px on the long side, unedited:

1. One pack of each resin line with its current label: Hy-Ionic DP, MR Agarose, Plain Agarose and Activated
   Agarose first, then the eight lines that now show the 2025 label.
2. The Ni-NTA His-tag kit and the MR Agarose kit as shipped: the closed box, and the contents laid out.
3. A 1 mL and a 5 mL pre-packed column side by side, and one column each of Co-, Cu- and Zn-NTA with its label readable.
4. Empty columns: one of each diameter (16, 26 and 50 mm), a one-end and a both-ends adjustable column side by
   side, and a close view of an adaptor.
5. The manufacturing area and the quality-control bench, tidy and without people's faces unless they agree.
6. The original files of pictures the site has only as small copies: the purification system with the
   chromatogram on screen, and the three packed columns.

## 4. Removed from the previous site

None of these could be traced to a client document:

"5,000 sq ft facility"; "20 / 50 / 200 L reactors"; "Founder & CEO, 20+ years"; free 5–25 mL samples;
pack sizes up to 100 L; "20+ products"; named customer segments; "HETP 0.021 cm, bed compression < 5%";
"8–12 weeks imported lead time"; office hours; file sizes on downloads that did not exist; and five
LinkedIn "posts" that were placeholders written into the feed function.
