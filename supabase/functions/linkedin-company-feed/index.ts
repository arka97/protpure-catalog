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

const FALLBACK_POSTS: FeedPost[] = [
  {
    id: "fb-1",
    url: LINKEDIN_URL,
    text: "Q Agarose Faster now shipping in 100 L industrial pack. Strong anion exchange optimised for capture at 700 cm/hr. CoA-released, 2-week lead time ex-works Anand.",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    tag: "Launch",
  },
  {
    id: "fb-2",
    url: LINKEDIN_URL,
    text: "mAb polishing on CM Agarose — case study. Aggregate clearance >99% with single-step elution. Method transferable from 1 mL screening to 50 L preparative.",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 11).toISOString(),
    tag: "Application note",
  },
  {
    id: "fb-3",
    url: LINKEDIN_URL,
    text: "600 L/month resin production capacity online. Three cross-linking reactors (20, 50, 200 L) running on staggered schedule for continuous supply assurance.",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 19).toISOString(),
    tag: "Facility",
  },
  {
    id: "fb-4",
    url: LINKEDIN_URL,
    text: "Protein A MabSelect alternative now in pilot — dynamic binding capacity >50 g/L at 4 min residence time. Sampling open for qualified mAb developers.",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 27).toISOString(),
    tag: "Pilot",
  },
  {
    id: "fb-5",
    url: LINKEDIN_URL,
    text: "ProtPure at BioProcess India 2026 — visit Booth 14 to discuss scale-up from screening to GMP supply with our applications team.",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 35).toISOString(),
    tag: "Event",
  },
];

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