import { ArrowUpRight } from "lucide-react";
import { LINKEDIN_POSTS, type LinkedInPost } from "@/data/linkedin-posts";
import { SITE } from "@/data/site";

/**
 * The company's three newest LinkedIn posts, from the hand-kept list in `src/data/linkedin-posts.ts`.
 * With no posts in the list nothing is rendered: the page links to the company profile instead.
 */
export function LinkedInFeed({ posts = LINKEDIN_POSTS }: { posts?: LinkedInPost[] }) {
  const newest = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  if (!newest.length) return null;

  return (
    <section className="border-t border-rule py-16 md:py-20" aria-labelledby="linkedin-title">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label text-ink-3">LinkedIn</p>
            <h2 id="linkedin-title" className="heading-4 mt-2">
              From our LinkedIn page
            </h2>
          </div>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="link text-sm">
            Follow us on LinkedIn
          </a>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {newest.map((p) => (
            <li key={p.url}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-panel border border-rule bg-card p-6 transition-colors hover:border-ink/60"
              >
                <time dateTime={p.date} className="label text-ink-3">
                  {new Date(`${p.date}T00:00:00Z`).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "UTC",
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
