# Decisions Log (Internal)

Lightweight ADR-style record of choices that shaped v1. Each entry: context, decision, consequences.

## ADR-001 — Lovable Cloud over self-hosted Supabase

- **Context.** We need a backend for the docs gate today and RFQ persistence soon. Solo team; ops bandwidth is the scarce resource.
- **Decision.** Use Lovable Cloud (managed Supabase) instead of standing up our own Supabase project or rolling our own server.
- **Consequences.** Zero ops overhead; backend tracks the same publish lifecycle as the frontend; no separate billing relationship; some advanced Supabase dashboard features aren't directly exposed (acceptable trade-off).

## ADR-002 — Static product catalog in v1

- **Context.** Catalog has ~30 SKUs and changes weekly at most.
- **Decision.** Keep the catalog as a typed `src/data/products.ts` file rather than a database table.
- **Consequences.** Type safety, instant deploys, no admin UI to build, no RLS to design. Trigger to revisit: ≥ 50 SKUs, multiple non-engineer editors, or per-customer pricing.

## ADR-003 — Password gate via Edge Function

- **Context.** `/documents` needs friction, not Fort Knox. Hashed-on-client schemes still leak the hash and are guessable from devtools.
- **Decision.** Compare on the server via `verify-doc-password`; secret stored in Cloud secrets; client only stores a session flag.
- **Consequences.** Password rotates with a single secret update — no app deploy. The bundled markdown is still semi-public (anyone authenticated once can re-extract), so don't put true secrets in docs.

## ADR-004 — Markdown via `?raw` instead of a CMS

- **Context.** Docs are written by the founders. Editing in code is fine. Latency, cost, and yet-another-account were all undesirable.
- **Decision.** Use Vite `?raw` imports + a typed `_meta.ts` registry.
- **Consequences.** Atomic deploys, version control as the audit trail, no preview link for non-engineer authors. Acceptable for now; revisit if non-technical authors need to publish independently.

## ADR-005 — Mermaid lazy-loaded

- **Context.** Mermaid is large (>500 KB) and only used inside docs.
- **Decision.** Dynamic-import inside `MarkdownRenderer` only when a `mermaid` code fence is present.
- **Consequences.** Initial bundle stays small; first mermaid render has a one-time delay; the pattern becomes the template for any future heavy library.

## ADR-006 — RFQ as a drawer, not a page

- **Context.** Buyers compose RFQs while continuing to browse. A page-based flow forces them to lose catalog context.
- **Decision.** Right-side drawer, persistent across routes via `RFQContext`.
- **Consequences.** Better composition UX, slightly more state to manage, mobile gets a near-fullscreen variant. Drawer pattern matches the Compare bar/modal flow.

## ADR-007 — No public pricing in v1

- **Context.** Volume tiering and account-level negotiation make a single price misleading.
- **Decision.** All pricing routed through RFQ.
- **Consequences.** Higher conversion friction but better data on every serious buyer; aligns with how enterprise biopharma actually procures.

## How to add a new ADR

1. Append a new section under this doc (don't edit existing entries; supersede instead).
2. Use the same Context / Decision / Consequences shape.
3. If a decision is reversed, add a new ADR that explicitly says "Supersedes ADR-NNN" and link the original.