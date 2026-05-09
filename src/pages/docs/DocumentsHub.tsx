import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Lock, FileText, CheckCircle2, ChevronRight } from "lucide-react";
import JSZip from "jszip";
import { Button } from "@/components/ui/button";
import { DOCS, SOURCES, type DocMeta } from "@/content/docs/_meta";

const READ_KEY = "protpure_docs_read";

function useReadSet() {
  const [read, setRead] = useState<Set<string>>(new Set());
  useEffect(() => {
    try {
      const raw = localStorage.getItem(READ_KEY);
      if (raw) setRead(new Set(JSON.parse(raw)));
    } catch {}
  }, []);
  return read;
}

function DocCard({ doc, isRead }: { doc: DocMeta; isRead: boolean }) {
  return (
    <Link
      to={`/documents/${doc.slug}`}
      className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:bg-card/80 transition-colors flex flex-col"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-xs text-muted-foreground tracking-wider">
          {doc.number}
        </span>
        {isRead && (
          <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-primary">
            <CheckCircle2 className="w-3 h-3" /> read
          </span>
        )}
      </div>
      <h3 className="font-serif text-lg text-foreground mb-2">{doc.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{doc.summary}</p>
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-border text-xs text-muted-foreground">
        <span>{doc.readTime} · {doc.diagramCount} diagram{doc.diagramCount === 1 ? "" : "s"}</span>
        <span className="flex items-center gap-1 text-foreground group-hover:text-primary transition-colors">
          Open <ChevronRight className="w-3 h-3" />
        </span>
      </div>
    </Link>
  );
}

export default function DocumentsHub() {
  const read = useReadSet();
  const publicDocs = DOCS.filter((d) => !d.internal);
  const internalDocs = DOCS.filter((d) => d.internal);

  const downloadAll = async () => {
    const zip = new JSZip();
    DOCS.forEach((d) => {
      zip.file(`${d.number}-${d.slug}.md`, SOURCES[d.slug]);
    });
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "protpure-docs.zip";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-3"
            >
              <ArrowLeft className="w-3 h-3" /> Home
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="font-serif text-3xl md:text-4xl">Documentation</h1>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded border border-border text-muted-foreground">
                v1.0
              </span>
            </div>
          </div>
          <Button onClick={downloadAll} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" /> Download all (.zip)
          </Button>
        </div>

        <section className="mb-14">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground mb-4">
            <FileText className="w-3 h-3" />
            <span>Public spec</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{publicDocs.length} documents</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {publicDocs.map((d) => (
              <DocCard key={d.slug} doc={d} isRead={read.has(d.slug)} />
            ))}
          </div>
        </section>

        {internalDocs.length > 0 && (
          <section>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground mb-4">
              <Lock className="w-3 h-3" />
              <span>Internal reference</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground">owner-only</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {internalDocs.map((d) => (
                <DocCard key={d.slug} doc={d} isRead={read.has(d.slug)} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}