# Money & Membership (Internal)

How revenue moves through the business and what a future customer-portal might look like. Numbers below are illustrative — replace before sharing externally.

## Pricing model

- **Tiered by volume.** Standard breaks at 1 L, 10 L, and 100 L; larger commits negotiated per account.
- **Custom-quote default.** No public price list. Every serious lead routes through RFQ → quote.
- **Annual supply agreements.** Anchor accounts get rebates against committed volume, paid quarterly.
- **Sample policy.** First 50 mL free for qualified evaluations; subsequent samples at cost.

## Quote-to-cash flow

| Step | Owner | SLA |
|---|---|---|
| RFQ received | Sales | Acknowledge < 4 business hours |
| Qualification call | Sales | Within 2 business days |
| Quote issued | Sales + Ops | Within 5 business days |
| PO received | Customer | — |
| Production / shipment | Ops | Per quote (typically 4–6 weeks) |
| Invoice + payment | Finance | Net 30 default |

## Revenue mix targets (FY26, illustrative)

| Stream | Share |
|---|---|
| Catalog resin sales | 70% |
| Custom ligand projects | 20% |
| Method development | 10% |

## Cost-of-sale levers

- Raw agarose sourcing — primary input cost; dual-source within 12 months.
- Cross-linking reagents — small bill-of-materials line; bulk procurement after volume crosses threshold.
- QC overhead — fixed per batch; spreads thinner as batch sizes grow.
- Logistics — temperature-controlled shipping for some SKUs; consolidate where possible.

## E-commerce — explicitly deferred

No public checkout in v1. Reasons:

- Per-customer pricing wouldn't survive a single SKU price.
- Compliance documentation (CoA, MSDS, regulatory letters) needs to ship with each order.
- Logistics (cold-chain for some SKUs) doesn't fit a one-click flow.

Revisit when (a) a substantial fraction of revenue comes from research-grade small packs and (b) standardized pricing is acceptable for that segment.

## Membership / portal — sketch

A future authenticated customer portal could expose:

- Account summary (committed volume, year-to-date usage, rebate accrual).
- Order history with downloadable CoA / MSDS per shipment.
- Reorder flow that pre-populates RFQ from prior lines.
- MoQ tracker for committed-volume accounts.
- Document library scoped to the account (regulatory letters, validation packages).

Build trigger: ≥ 10 anchor accounts where account managers are spending real time fielding the same status questions.

## Payments

- v1: invoice-based, bank transfer, Net 30.
- Card / online payment provider not enabled today.
- When membership ships, evaluate Stripe vs Razorpay based on the geographic mix at that point.