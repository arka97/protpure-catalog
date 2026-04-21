import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { CTABand } from "@/components/home/CTABand";
import { ResinSelector } from "@/components/home/ResinSelector";
import { Link } from "react-router-dom";

const workflows = [
  {
    stages: [{ label: "Capture", cls: "bg-blue-100 text-blue-700 border-blue-200" }],
    title: "His-Tagged Protein Purification (IMAC)",
    desc: "One-step capture of histidine-tagged recombinant proteins from crude lysates. Typical purity >90% in a single step with ≥40 mg/mL DBC. Reusable across multiple cycles.",
    resins: ["Ni-NTA Agarose", "Ni-NTA Faster", "Co-NTA Agarose"],
  },
  {
    stages: [
      { label: "Capture", cls: "bg-blue-100 text-blue-700 border-blue-200" },
      { label: "Intermediate", cls: "bg-amber-100 text-amber-700 border-amber-200" },
    ],
    title: "Cation Exchange — Basic Proteins",
    desc: "Binding of basic proteins (pI > 7) at low salt. SP Agarose maintains charge across full pH range. CM Agarose preferred for milder binding conditions. Used for insulin, lysozyme, growth factors.",
    resins: ["SP Agarose", "SP Agarose Faster", "CM Agarose"],
  },
  {
    stages: [
      { label: "Intermediate", cls: "bg-amber-100 text-amber-700 border-amber-200" },
      { label: "Polishing", cls: "bg-green-100 text-green-700 border-green-200" },
    ],
    title: "Anion Exchange — HCP & DNA Removal",
    desc: "Q Agarose binds acidic proteins, HCPs, DNA, and endotoxin in both bind-elute and flow-through modes. DEAE Agarose offers gentler conditions for pH-sensitive proteins.",
    resins: ["Q Agarose", "Q Agarose Faster", "DEAE Agarose"],
  },
  {
    stages: [{ label: "Polishing", cls: "bg-green-100 text-green-700 border-green-200" }],
    title: "Hydrophobic Interaction — Aggregate Removal",
    desc: "Phenyl Agarose binds proteins at high salt and elutes with decreasing ammonium sulphate gradient. Effective for aggregates, misfolded variants, and residual process impurities.",
    resins: ["Phenyl Agarose"],
  },
  {
    stages: [{ label: "SEC / Desalting", cls: "bg-purple-100 text-purple-700 border-purple-200" }],
    title: "Size Exclusion Chromatography",
    desc: "Plain and activated agarose resins separate molecules by hydrodynamic radius. Larger molecules elute first. Cross-linked variants allow higher operating pressures.",
    resins: ["4% Agarose", "6% Agarose"],
  },
  {
    stages: [{ label: "R&D Screening", cls: "bg-blue-100 text-blue-700 border-blue-200" }],
    title: "Magnetic Bead Purification",
    desc: "Ni-NTA Magnetic Agarose enables batch purification without column packing. Beads collected by external magnet, washed and eluted with imidazole. Automation-amenable.",
    resins: ["Ni-NTA Magnetic"],
  },
];

const beadGuide = [
  { stage: "Capture", range: "100–300 µm", variant: "Agarose Faster", variantClass: "bg-[#dcfce7] text-[#166534]", bestFor: "Initial isolation from crude — mAbs, plasma proteins, vaccines" },
  { stage: "Intermediate", range: "45–165 µm", variant: "Agarose", variantClass: "bg-teal-pale text-teal", bestFor: "Remove bulk impurities — recombinant proteins, enzymes, hormones" },
  { stage: "Polishing", range: "20–100 µm", variant: "Agarose Precise", variantClass: "bg-blue-100 text-blue-700", bestFor: "High-resolution isoform separation, aggregate removal" },
  { stage: "Final polish", range: "15–75 µm", variant: "Agarose HR", variantClass: "bg-purple-100 text-purple-700", bestFor: "Fragile proteins, peptides — gentle elution, maximum resolution" },
];

export default function Applications() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Applications"
          title="Resin selection by workflow stage"
          description="Start with your application, find your resin. From capture to final polishing, every Protpure product is mapped to a purification objective."
          breadcrumbs={[{ label: "Home", to: "/" }, { label: "Applications" }]}
        />

        {/* Resin Selector */}
        <ResinSelector />

        {/* Workflow Library */}
        <section className="bg-background py-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <div className="mb-12 max-w-2xl">
              <div className="text-[11px] font-semibold tracking-[0.15em] text-teal uppercase mb-3">
                Workflow library
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-navy mb-3">
                Common purification workflows
              </h2>
              <p className="text-base text-slate leading-relaxed">
                Each workflow card shows the purification stage, recommended resins, and typical application context.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {workflows.map((w) => (
                <article
                  key={w.title}
                  className="bg-white border border-border rounded-xl p-7 hover:border-teal-pale hover:shadow-[0_4px_16px_-8px_hsl(var(--teal)/0.12)] transition-all"
                >
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {w.stages.map((s) => (
                      <span
                        key={s.label}
                        className={`text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border ${s.cls}`}
                      >
                        {s.label}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-serif text-lg text-navy mb-2">{w.title}</h3>
                  <p className="text-[13px] text-slate leading-relaxed mb-4">{w.desc}</p>
                  <div>
                    <div className="text-[10px] font-semibold tracking-wider uppercase text-slate mb-2">
                      Recommended resins
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {w.resins.map((r) => (
                        <Link
                          key={r}
                          to="/products"
                          className="text-[11px] font-mono px-2.5 py-1 bg-secondary border border-border rounded text-navy hover:border-teal-pale hover:bg-teal-pale/50 transition-colors"
                        >
                          {r}
                        </Link>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Bead Size Guide Table */}
        <section className="bg-white py-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <div className="mb-12 max-w-2xl">
              <div className="text-[11px] font-semibold tracking-[0.15em] text-teal uppercase mb-3">
                Selection guide
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-navy mb-3">
                Bead size vs purification stage
              </h2>
              <p className="text-base text-slate leading-relaxed">
                Larger beads for high-throughput capture, smaller beads for high-resolution polishing. Same 6% cross-linked agarose chemistry throughout.
              </p>
            </div>
            <div className="rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-navy text-white text-[12px] font-semibold tracking-wide">
                    <th className="text-left p-4">Stage</th>
                    <th className="text-left p-4">Bead size range</th>
                    <th className="text-left p-4">Protpure variant</th>
                    <th className="text-left p-4">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {beadGuide.map((b) => (
                    <tr key={b.stage} className="border-b border-border last:border-0 hover:bg-secondary/30">
                      <td className="p-4 font-semibold text-navy">{b.stage}</td>
                      <td className="p-4 font-mono text-slate">{b.range}</td>
                      <td className="p-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold ${b.variantClass}`}>
                          {b.variant}
                        </span>
                      </td>
                      <td className="p-4 text-slate">{b.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <CTABand />
      </main>
      <Footer />
    </div>
  );
}
