# Plan: Generate `docs/` handover pack

Create a new top-level `docs/` folder containing 7 Markdown files that fully document the Protpure app for production handover and future AI sessions. Each file gets YAML frontmatter (`title`, `description`, `phase`, `last_updated`, `owner`). No app code changes — documentation only.

## Files to create

### 1. `docs/MASTER_INDEX.md`
- YAML frontmatter
- One-paragraph project summary: Protpure marketing + lead-gen site (chromatography resins), RFQ-driven, no user accounts, Lovable Cloud backend
- Navigation table linking (relative) to the other 6 docs
- Current SDLC phase: **Production / Iterative enhancement** — active focus: RFQ conversion, LinkedIn feed, documents hub, transactional email reliability
- Mermaid `timeline` diagram: Foundations → Product catalog & RFQ → Docs hub & email system → LinkedIn integration → Handover docs

### 2. `docs/ARCHITECTURE.md`
- Goals, non-goals, tech stack rationale (React 18 + Vite + TS, Tailwind + shadcn, TanStack Query, Lovable Cloud/Supabase, Deno edge functions, React Email)
- Environment variables table (`VITE_SUPABASE_*`) + server-side secrets list (names only, no values): `DOCS_PASSWORD`, `LINKEDIN_API_KEY`, `LOVABLE_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, email queue key
- Full directory tree of `src/`, `supabase/functions/`, `public/`
- Mermaid `graph TD`: Browser → React app → (TanStack Query / Context) → Supabase JS → (Edge Functions / Postgres+RLS / pgmq queue / Resend)

### 3. `docs/COMPONENT_TREE.md`
- Route table from `src/App.tsx` (all 10 routes + guards)
- Providers stack: QueryClient → Tooltip → BrowserRouter → RFQProvider → CompareProvider (+ DocAuthProvider scoped to `/documents`)
- Global state: `RFQContext`, `CompareContext`, `DocAuthContext`, TanStack Query cache, persisted-state hook
- Layouts: `Header`, `Footer`, `PageHero`, floating `RFQDrawer` + `WhatsAppFAB`
- Feature component groupings (`home/`, `products/`, `docs/`, `rfq/`, `layout/`)
- Mermaid `graph LR`: App → Providers → Routes → Pages → Feature components → Contexts

### 4. `docs/DATA_MODEL.md`
- Data dictionary for each public table (`docs`, `products`, `email_send_log`, `email_send_state`, `email_unsubscribe_tokens`, `suppressed_emails`): columns, types, nullability, defaults, keys
- Enums: `chromatography_type`, `exchanger_type`, `flow_variant`, `product_status`
- RLS status + policies per table (queried live via `supabase--read_query` before writing) and GRANTs
- Database functions: `enqueue_email`, `read_email_batch`, `delete_email`, `move_to_dlq`, `email_queue_dispatch`, `email_queue_wake`, `update_updated_at_column`
- Mermaid `erDiagram`: tables + logical relationships (products is standalone; email tables share `email` string linkage; docs is standalone content store)

### 5. `docs/API_SPEC.md`
- One section per edge function (`verify-doc-password`, `docs-content`, `send-transactional-email`, `process-email-queue`, `preview-transactional-email`, `handle-email-unsubscribe`, `handle-email-suppression`, `linkedin-company-feed`): purpose, HTTP method, `verify_jwt` setting from `config.toml`, request payload, response shape, auth requirements, error modes
- External integrations: Resend (transactional email), LinkedIn API via connector, Lovable AI Gateway (if used)
- Mermaid `sequenceDiagram`: Client → `supabase.functions.invoke("send-transactional-email")` → enqueue via `enqueue_email` RPC → pgmq → cron `email_queue_dispatch` → `process-email-queue` → Resend → `email_send_log`

### 6. `docs/SECURITY_AND_OPS.md`
- Auth model: no end-user accounts; docs hub gated by shared password → JWT issued by `verify-doc-password` and stored in `sessionStorage`
- Edge function security matrix (which have `verify_jwt`, which are public, why)
- RLS enforcement summary + service-role usage boundaries
- Secret management via Lovable Cloud (never exposed client-side), connector-managed `LINKEDIN_API_KEY`
- Ops: pgmq email queue + cron dispatcher, retry/backoff via `email_send_state.retry_after_until`, suppression list, unsubscribe tokens
- Hosting/deploy: Lovable Cloud, custom domains `protpure.com` / `www.protpure.com`
- Export path: Lovable Cloud → Advanced settings → Export data
- Mermaid `sequenceDiagram` for docs password → JWT → gated content flow

### 7. `docs/AI_CONVENTIONS.md`
- Core rules: semantic HSL tokens only (no hardcoded colors), serif headings + sans body, shadcn variants, no dark-mode-breaking utilities
- Backend rules: every public table needs GRANTs + RLS + policies in same migration; roles in a separate table (N/A today — no auth); never edit `src/integrations/supabase/client.ts` / `types.ts` / `.env`
- Component rules: small focused files, RFQ is the single conversion path, keep UI changes out of business logic
- Anti-patterns: hardcoded Tailwind colors, storing roles on profile tables, secrets in client code, adding backend servers, adding user accounts without explicit ask
- Decision records: LinkedIn curated fallback, password-gated docs vs full auth, RFQ email idempotency, pgmq over external queue
- Mermaid `mindmap`: root "Protpure guardrails" → Design / Backend / Security / UX / Content branches

## Technical details

- All Mermaid blocks use fenced ` ```mermaid ` code blocks (already supported by `MarkdownRenderer`).
- Frontmatter shape:
  ```yaml
  ---
  title: Architecture
  description: System goals, stack, and data flow
  phase: production
  last_updated: 2026-07-09
  owner: Protpure engineering
  ---
  ```
- Before writing `DATA_MODEL.md` and `SECURITY_AND_OPS.md`, run `supabase--read_query` to pull live column definitions, RLS policies, and GRANTs from `information_schema` / `pg_policies` so the docs match reality rather than the types file.
- All internal links relative (e.g. `./ARCHITECTURE.md`).
- No changes to app source, config, or migrations.

## Out of scope

- No new routes, no `/docs` viewer for these files (they live on the filesystem for the repo, not the running app).
- No screenshots or generated images.
- No changes to existing `src/pages/docs/*` (that's the password-gated product documents hub, unrelated to this repo docs folder).
