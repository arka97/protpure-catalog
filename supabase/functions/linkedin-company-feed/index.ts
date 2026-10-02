import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const VANITY = "protpure-tech-pvt-ltd";
const LINKEDIN_URL = `https://www.linkedin.com/company/${VANITY}/`;
const GATEWAY = "https://connector-gateway.lovable.dev/linkedin";
const CACHE_TTL_MS = 30 * 60 * 1000;

type FeedPost = {
  id: string;
  url: string;
  text: string;
  publishedAt: string;
  thumbnailUrl?: string;
  tag?: string;
};

let cache: { at: number; payload: { source: "live" | "fallback"; posts: FeedPost[] } } | null = null;

// When LinkedIn cannot be reached the function returns no posts, and the site links to the company
// profile instead. Invented placeholder posts must never be shown as company news.
const FALLBACK_POSTS: FeedPost[] = [];

function fallback(): { source: "fallback"; posts: FeedPost[] } {
  return { source: "fallback", posts: FALLBACK_POSTS };
}

async function fetchLive(): Promise<{ source: "live"; posts: FeedPost[] } | null> {
  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  const liKey = Deno.env.get("LINKEDIN_API_KEY");
  if (!lovableKey || !liKey) return null;

  const headers = {
    Authorization: `Bearer ${lovableKey}`,
    "X-Connection-Api-Key": liKey,
    "LinkedIn-Version": "202405",
    "X-Restli-Protocol-Version": "2.0.0",
  };

  // Resolve organization URN by vanity name
  const orgRes = await fetch(
    `${GATEWAY}/v2/organizations?q=vanityName&vanityName=${encodeURIComponent(VANITY)}`,
    { headers },
  );
  if (!orgRes.ok) {
    console.warn("LinkedIn org lookup failed", orgRes.status, await orgRes.text().catch(() => ""));
    return null;
  }
  const orgJson = await orgRes.json();
  const orgId = orgJson?.elements?.[0]?.id;
  if (!orgId) return null;

  const authorUrn = `urn:li:organization:${orgId}`;
  const postsRes = await fetch(
    `${GATEWAY}/rest/posts?q=author&author=${encodeURIComponent(authorUrn)}&count=5&sortBy=LAST_MODIFIED`,
    { headers },
  );
  if (!postsRes.ok) {
    console.warn("LinkedIn posts fetch failed", postsRes.status, await postsRes.text().catch(() => ""));
    return null;
  }
  const postsJson = await postsRes.json();
  const elements: any[] = postsJson?.elements ?? [];
  if (!elements.length) return null;

  const posts: FeedPost[] = elements.slice(0, 5).map((p: any) => {
    const id = p?.id ?? crypto.randomUUID();
    const text = p?.commentary ?? p?.specificContent?.["com.linkedin.ugc.ShareContent"]?.shareCommentary?.text ?? "";
    const publishedAt = new Date(p?.publishedAt ?? p?.createdAt ?? Date.now()).toISOString();
    const thumb =
      p?.content?.media?.thumbnails?.[0]?.url ??
      p?.content?.article?.thumbnail ??
      undefined;
    const postId = String(id).split(":").pop();
    return {
      id: String(id),
      url: postId ? `https://www.linkedin.com/feed/update/${id}` : LINKEDIN_URL,
      text: String(text).slice(0, 360),
      publishedAt,
      thumbnailUrl: thumb,
    };
  });

  return { source: "live", posts };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    if (cache && Date.now() - cache.at < CACHE_TTL_MS) {
      return new Response(JSON.stringify(cache.payload), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let payload: { source: "live" | "fallback"; posts: FeedPost[] };
    try {
      const live = await fetchLive();
      payload = live ?? fallback();
    } catch (err) {
      console.error("linkedin-company-feed live fetch error", err);
      payload = fallback();
    }

    cache = { at: Date.now(), payload };
    return new Response(JSON.stringify(payload), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("linkedin-company-feed error", err);
    return new Response(JSON.stringify(fallback()), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});