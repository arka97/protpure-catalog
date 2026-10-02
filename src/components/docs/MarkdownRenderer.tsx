import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const mod = await import("mermaid");
      const mermaid = mod.default;
      mermaid.initialize({ startOnLoad: false, theme: "neutral", securityLevel: "strict" });
      if (cancelled || !ref.current) return;
      try {
        const id = "m" + Math.random().toString(36).slice(2);
        const { svg } = await mermaid.render(id, chart);
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
          setRendered(true);
        }
      } catch {
        if (ref.current) ref.current.textContent = chart;
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chart]);

  return (
    <div
      ref={ref}
      className="my-6 flex justify-center overflow-x-auto rounded-lg border border-border bg-muted/30 p-4"
      data-rendered={rendered}
    />
  );
}

export function MarkdownRenderer({ source }: { source: string }) {
  return (
    <div className="prose prose-slate max-w-none prose-headings:font-sans prose-headings:tracking-tight prose-headings:scroll-mt-24 prose-a:text-primary prose-pre:bg-muted prose-pre:border prose-pre:border-border">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]]}
        components={{
          code(props: React.ComponentPropsWithoutRef<"code"> & { inline?: boolean }) {
            const { className, children, inline, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            const lang = match?.[1];
            if (!inline && lang === "mermaid") {
              return <Mermaid chart={String(children).trim()} />;
            }
            if (inline) {
              return (
                <code className="rounded bg-muted px-1.5 py-0.5 text-[0.85em] font-mono" {...rest}>
                  {children}
                </code>
              );
            }
            return (
              <code className={className} {...rest}>
                {children}
              </code>
            );
          },
          pre({ children }) {
            return (
              <pre className="overflow-x-auto rounded-lg border border-border bg-muted p-4 text-sm">
                {children}
              </pre>
            );
          },
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}