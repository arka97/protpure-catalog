import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/data/site";
import { QueryProvider } from "@/lib/query-client";

interface FeedPost {
  id: string;
  url: string;
  text: string;
  publishedAt: string;
}

const DEMO = import.meta.env.VITE_ENQUIRY_DEMO === "true";

/**
 * Recent company posts from the `linkedin-company-feed` edge function.
 * Only posts the function marks as live are shown: when LinkedIn cannot be reached, nothing is rendered
 * (the page links to the company profile instead). Placeholder posts are never displayed.
 */
export function LinkedInFeed() {
  return (
    <QueryProvider>
      <Feed />
    </QueryProvider>
  );
}

function Feed() {
  const { data } = useQuery({
    queryKey: ["linkedin-company-feed"],
    enabled: !DEMO,
    retry: false,
    staleTime: 30 * 60 * 1000,
    queryFn: async () => {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data, error } = await supabase.functions.invoke<{ source: string; posts: FeedPost[] }>(
        "linkedin-company-feed",
      );
      if (error) throw error;
      return data;
    },
  });

  const posts = data?.source === "live" ? data.posts.filter((p) => p.text?.trim()).slice(0, 3) : [];
  if (!posts.length) return null;

  return (
    <section className="border-t border-rule py-16 md:py-20" aria-labelledby="linkedin-title">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label text-ink-3">LinkedIn</p>
            <h2 id="linkedin-title" className="heading-4 mt-2">
              Latest from ProtPure
            </h2>
          </div>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="link text-sm">
            Follow us on LinkedIn
          </a>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {posts.map((p) => (
            <li key={p.id}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-panel border border-rule bg-card p-6 transition-colors hover:border-ink/60"
              >
                <time dateTime={p.publishedAt} className="label text-ink-3">
                  {new Date(p.publishedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <p className="mt-4 line-clamp-6 text-[0.9375rem] leading-relaxed text-ink-2">{p.text}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold">
                  Read on LinkedIn
                  <ArrowUpRight
                    aria-hidden
                    className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
