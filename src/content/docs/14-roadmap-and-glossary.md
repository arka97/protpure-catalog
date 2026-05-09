# Roadmap & Glossary (Internal)

Where we're going and what the words mean. Roadmap items are directional, not committed delivery dates.

## H1 2026

- Commission the second reactor line; double pilot capacity.
- Land at least three anchor accounts under formal supply agreements.
- Ship Protein A affinity grade as evaluation samples to two flagship accounts.
- Migrate RFQ submissions to backend persistence (`rfq_submissions` table + `rfq-submit` Edge Function).
- Stand up basic analytics on the public site.

## H2 2026

- Catalog launch of Protein A affinity grade.
- Open EU distribution channel via one validated partner.
- File two process patents on the agarose cross-linking method.
- Customer portal v1 (account view, order history, CoA downloads) — gated behind anchor-account demand.
- Hire VP Sales (US).

## Mid-horizon (FY27)

- SEC and HIC families to evaluation status.
- GMP-graded SKU line for a subset of the catalog.
- Distributor reseller program.
- Public spec sheet generator (PDF on demand from product data).

## Far horizon (FY28+)

- Magnetic bead family.
- Multi-region warehousing (US, EU).
- Pre-packed column offerings for academic segment.

## Explicitly deferred

- Public e-commerce checkout.
- Self-serve account signup on the marketing site.
- Real-time inventory display.
- Multi-language site.

## Risks tracked

| Risk | Mitigation |
|---|---|
| Raw agarose supply disruption | Dual-source within 12 months |
| Regulatory drift (EU GMP guidance) | Quarterly reg watch; flexible documentation pipeline |
| Anchor account concentration | Diversify across at least three segments |
| Key-person dependence | Documented runbooks + this docs hub |

## Glossary

| Term | Meaning |
|---|---|
| **Agarose** | Polysaccharide forming the cross-linked bead matrix used as the resin backbone. |
| **CDMO** | Contract Development and Manufacturing Organization — third-party biopharma producer. |
| **CIP** | Clean-In-Place — the cleaning protocol a resin must survive between batches. |
| **CM** | Carboxymethyl — weak cation exchange ligand. |
| **CoA** | Certificate of Analysis — per-batch QC document shipped with each lot. |
| **DBC** | Dynamic Binding Capacity — how much target protein the resin captures under flow. |
| **DEAE** | Diethylaminoethyl — weak anion exchange ligand. |
| **GMP** | Good Manufacturing Practice — regulated production standard. |
| **HIC** | Hydrophobic Interaction Chromatography. |
| **IEC** | Ion Exchange Chromatography. |
| **Ligand** | The functional chemistry attached to the bead surface that does the actual binding. |
| **mAb** | Monoclonal antibody — a major class of biopharmaceutical product. |
| **MoQ** | Minimum Order Quantity. |
| **MSDS** | Material Safety Data Sheet. |
| **Q** | Quaternary ammonium — strong anion exchange ligand. |
| **RFQ** | Request For Quote — the lead-capture flow on protpure.com. |
| **RLS** | Row-Level Security — Postgres policy layer for per-row access control. |
| **SEC** | Size Exclusion Chromatography. |
| **SKU** | Stock-Keeping Unit — a uniquely identifiable product variant. |
| **SP** | Sulfopropyl — strong cation exchange ligand. |