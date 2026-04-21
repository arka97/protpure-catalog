import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { Download, FileText, Presentation, BookOpen, BarChart3, Sparkles } from "lucide-react";
import { toast } from "sonner";

type Doc = {
  title: string;
  type: string;
  desc: string;
  size: string;
  icon: typeof FileText;
};

const docs: Doc[] = [
  {
    title: "ProtPure Product Brochure",
    type: "Brochure",
    desc: "Full-line catalog overview — product families, particle variants, pack sizes, and contact details.",
    size: "PDF · 2.4 MB",
    icon: BookOpen,
  },
  {
    title: "Q Agarose Technical Datasheet",
    type: "Datasheet",
    desc: "Specifications, DBC curves, flow-pressure data, and CIP recommendations for Q Agarose & Faster.",
    size: "PDF · 680 KB",
    icon: FileText,
  },
  {
    title: "Ni-NTA Agarose Technical Datasheet",
    type: "Datasheet",
    desc: "His-tag binding capacity, regeneration protocol, and recommended buffer conditions.",
    size: "PDF · 720 KB",
    icon: FileText,
  },
  {
    title: "Flow Velocity & Bead-Size Guide",
    type: "Application guide",
    desc: "How to pick between Standard, Faster, Precise, and HR variants for capture, intermediate, and polishing steps.",
    size: "PDF · 1.1 MB",
    icon: BarChart3,
  },
  {
    title: "Indigenous Chromatography Resins",
    type: "Scientific presentation",
    desc: "Conference deck on the ProtPure agarose platform, column efficiency benchmarks, and Indian biopharma case studies.",
    size: "PDF · 4.2 MB",
    icon: Presentation,
  },
];

export default function Resources() {
  const handleDownload = (title: string) => {
    toast.success(`${title} — request received`, {
      description: "We'll email the document within 24 hours.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Resources"
          title="Datasheets, application guides, and technical references"
          description="Everything you need to evaluate, qualify, and scale ProtPure resins in your downstream process."
          breadcrumbs={[{ label: "Home", to: "/" }, { label: "Resources" }]}
        />

        <section className="bg-background py-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {docs.map((d) => (
                <article
                  key={d.title}
                  className="bg-white border border-border rounded-xl p-6 flex flex-col hover:border-teal-pale hover:shadow-[0_8px_24px_-12px_hsl(var(--teal)/0.18)] hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-lg bg-teal-pale flex items-center justify-center">
                      <d.icon className="w-5 h-5 text-teal" />
                    </div>
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-light bg-secondary px-2 py-1 rounded">
                      {d.type}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg text-navy leading-tight mb-2">{d.title}</h3>
                  <p className="text-[13px] text-slate leading-relaxed mb-5 flex-1">{d.desc}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-[11px] text-slate-light font-mono">{d.size}</span>
                    <Button
                      size="sm"
                      onClick={() => handleDownload(d.title)}
                      className="bg-teal hover:bg-teal-light text-white gap-1.5 h-8"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </Button>
                  </div>
                </article>
              ))}

              <article className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center text-center bg-white/40">
                <div className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5 text-slate-light" />
                </div>
                <h3 className="font-serif text-lg text-navy mb-2">Application Notes</h3>
                <p className="text-[13px] text-slate leading-relaxed mb-3">
                  Insulin capture, mAb polishing, and IMAC scale-up notes — in preparation.
                </p>
                <span className="text-[11px] font-mono uppercase tracking-wider text-teal font-semibold">
                  Coming soon
                </span>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}