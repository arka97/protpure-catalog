## Goal

Replace the hard-coded "Latest updates" cards on `/contact` with a live feed of the 5 most recent posts from the ProtPure LinkedIn company page (`protpure-tech-pvt-ltd`), pulled through the Lovable LinkedIn connector.

## Important caveat about LinkedIn

LinkedIn's API restricts reading a company page's posts to apps with the `r_organization_social` (or Community Management) scope, which requires LinkedIn Marketing Developer Platform approval on the underlying OAuth app. The connector's standard scopes (`openid profile email w_member_social`) do not include this.

The plan handles both outcomes:
- If the linked LinkedIn connection has organization read access → real posts render live.
- If not → the edge function returns a curated fallback (the existing 3 cards extended to 5) so the UI is never broken, and we surface a small "Updated manually" note in dev console only.

## User-facing behavior

- New section state: shows 5 cards in a responsive 1/2/3-column grid (same visual style as today).
- Each card shows: post date, short text excerpt (~180 chars), optional thumbnail image, and a "Read on LinkedIn" link to the actual post URL.
- Loading state: 5 skeleton cards.
- Error/empty state: falls back to curated cards silently.
- Auto-refresh: cached server-side for 30 minutes (LinkedIn rate-limit friendly).

## Implementation steps

1. **Connect LinkedIn** — link the LinkedIn workspace connection to this project so `LINKEDIN_API_KEY` and `LOVABLE_API_KEY` are available to edge functions.

2. **New edge function `linkedin-company-feed`** (`supabase/functions/linkedin-company-feed/index.ts`, `verify_jwt = false`, public read):
   - Origin allowlist (same list used by `send-transactional-email`).
   - In-memory 30-minute cache keyed by org URN.
   - Calls the gateway:
     - `GET /linkedin/v2/userinfo` to confirm auth.
     - `GET /linkedin/rest/posts?q=author&author=urn:li:organization:{ORG_ID}&count=5&sortBy=LAST_MODIFIED` with `LinkedIn-Version: 202405` and `X-Restli-Protocol-Version: 2.0.0`.
     - Resolves the organization URN via `GET /linkedin/v2/organizations?q=vanityName&vanityName=protpure-tech-pvt-ltd` (cached).
   - Normalizes each post into `{ id, url, text, publishedAt, thumbnailUrl? }`.
   - On any non-2xx (e.g. 403 missing scope), returns `{ source: "fallback", posts: [...curated 5...] }` with HTTP 200 so the page still renders.

3. **Register function** in `supabase/config.toml` (`verify_jwt = false`).

4. **Frontend changes in `src/pages/Contact.tsx`**:
   - Replace the static array with a `useQuery` (`@tanstack/react-query`) hook calling `supabase.functions.invoke("linkedin-company-feed")`.
   - Render 5 cards mapped from the response. Keep current card styling (border, teal hover, LinkedIn badge, ExternalLink icon).
   - Show `<Skeleton />` cards while loading.
   - Format `publishedAt` as `MMM d, yyyy` using `date-fns` (already in deps).

5. **No design-token / business-logic changes** elsewhere. Curated fallback content lives in the edge function so it can be edited without redeploying the frontend.

## Files

- **New:** `supabase/functions/linkedin-company-feed/index.ts`, `supabase/functions/linkedin-company-feed/deno.json`
- **Edited:** `src/pages/Contact.tsx`, `supabase/config.toml`

## Open question I'll handle automatically

If LinkedIn returns 403 for organization access, I'll keep the curated fallback live and tell you what scope/app-review step is required to unlock real posts. No action needed from you until then.
