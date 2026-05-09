import { useEffect, useMemo } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDoc } from "@/content/docs/_meta";
import { MarkdownRenderer } from "@/components/docs/MarkdownRenderer";

const READ_KEY = "protpure_docs_read";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

function extractToc(source: string) {
  const lines = source.split("\n");
  const toc: { level: number; text: string; id: string }[] = [];
  let inFence = false;
  for (const line of lines) {
    if (line.startsWith("```")) inFence = !inFence;
    if (inFence) continue;
    const m = /^(#{2,3})\s+(.+)$/.exec(line);
    if (m) {
      const level = m[1].length;
      const text = m[2].replace(/[#*_`]/g, "").trim();
      toc.push({ level, text, id: slugify(text) });
    }
  }
  return toc;
}

export default function DocPage() {
  const { slug = "" } = useParams();
  const doc = getDoc(slug);

  useEffect(() => {
    if (!doc) return;
    try {
      const raw = localStorage.getItem(READ_KEY);
      const arr: string[] = raw ? JSON.parse(raw) : [];
      if (!arr.includes(doc.meta.slug)) {
        arr.push(doc.meta.slug);
        localStorage.setItem(READ_KEY, JSON.stringify(arr));
      }
    } catch {}
  }, [doc]);

  const toc = useMemo(() => (doc ? extractToc(doc.source) : []), [doc]);

  if (!doc) return <Navigate to="/documents" replace />;

  const downloadMd = () => {
    const blob = new Blob([doc.source], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${doc.meta.number}-${doc.meta.slug}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <Link
            to="/documents"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" /> All documents
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={downloadMd}>
              <Download className="w-4 h-4 mr-2" /> Download .md
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="w-4 h-4 mr-2" /> Print
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-10">
        <article>
          <div className="mb-8">
            <span className="font-mono text-xs text-muted-foreground tracking-wider">
              {doc.meta.number}
            </span>
            <h1 className="font-serif text-3xl md:text-4xl mt-2 mb-3">{doc.meta.title}</h1>
            <p className="text-muted-foreground">{doc.meta.summary}</p>
          </div>
          <MarkdownRenderer source={doc.source} />
        </article>

        {toc.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-20">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
                On this page
              </div>
              <ul className="space-y-2 text-sm border-l border-border">
                {toc.map((item, i) => (
                  <li key={i} style={{ paddingLeft: item.level === 3 ? 20 : 12 }}>
                    <a
                      href={`#${item.id}`}
                      className="block py-0.5 text-muted-foreground hover:text-foreground -ml-px border-l border-transparent hover:border-primary"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}