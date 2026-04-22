import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { CTABand } from "@/components/home/CTABand";
import { BeadSizeSelector } from "@/components/products/BeadSizeSelector";
import { FlowVariant } from "@/data/products";

const steps = [
  {
    n: "01",
    title: "Bead formation",
    desc: "Aqueous agarose is emulsified into uniform spherical droplets using controlled-shear reactors. Bead size distribution is tuned for the target variant (HR through Faster).",
  },
  {
    n: "02",
    title: "Cross-linking",
    desc: "Beads are chemically cross-linked to deliver pH 2–14 CIP stability and rigidity for high-flow operation without bed compression.",
  },
  {
    n: "03",
    title: "Ligand coupling",
    desc: "Functional ligands (sulphopropyl, quaternary amine, Ni-NTA, phenyl, etc.) are covalently attached. Coupling chemistry is selected to maximise effective ligand density.",
  },
  {
    n: "04",
    title: "QC & release",
    desc: "Every lot is tested for particle size distribution, ionic capacity, DBC, HETP, and asymmetry on a packed column before release.",
  },
];

const efficiency = [
  { label: "Asymmetry (As)", value: "1.63", note: "Target ≤ 1.6 (passes)" },
  { label: "Reduced plate height (h)", value: "1.04", note: "Target ≤ 3.0 (well-packed)" },
  { label: "HETP", value: "0.021 cm", note: "Acetone, 30 cm/hr, 16/40" },
  { label: "Bed compression", value: "<5%", note: "At 700 cm/hr operational flow" },
];

export default function Technology() {
  const [active, setActive] = useState<FlowVariant>("standard");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Technology"
          title="6% cross-linked agarose, engineered four ways"
          description="One backbone chemistry, four particle-size variants. Same selectivity, different flow and resolution profiles — so you can scale without re-developing the method."
          breadcrumbs={[{ label: "Home", to: "/" }, { label: "Technology" }]}
        />

        <section className="bg-white py-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 items-start">
              <div>
                <div className="text-[11px] font-semibold tracking-[0.15em] text-teal uppercase mb-3">
                  Platform
                </div>
                <h2 className="font-serif text-3xl text-navy mb-5">The agarose backbone</h2>
                <div className="space-y-4 text-[15px] text-slate leading-relaxed">
                  <p>
                    All ProtPure resins are built on a 6% spherical cross-linked agarose matrix.
                    Agarose is chosen for its biocompatibility, low non-specific binding, and
                    open pore structure — letting large biomolecules diffuse to internal binding
                    sites at industrially relevant flow rates.
                  </p>
                  <p>
                    Cross-linking gives the matrix the mechanical rigidity to operate up to 1000
                    cm/hr with &lt;5% bed compression, plus chemical stability across pH 2–14 for
                    standard CIP and sanitisation regimes (1 M NaOH, 8 M urea, 6 M GuHCl).
                  </p>
                  <p>
                    Selectivity is then tuned by the ligand chemistry — strong/weak ion exchangers,
                    Ni-NTA for IMAC, phenyl for HIC, and magnetic variants for batch processing.
                  </p>
                </div>
              </div>

              <div className="bg-navy rounded-xl p-8 hex-pattern relative overflow-hidden">
                <div className="text-[11px] font-semibold tracking-[0.15em] text-teal-bright uppercase mb-2 relative">
                  Backbone
                </div>
                <h3 className="font-serif text-2xl text-white mb-6 relative">6% agarose</h3>
                <div className="space-y-3 relative">
                  {[
                    ["Pore size", "Optimised for >150 kDa proteins"],
                    ["Mechanical rigidity", "Stable to 1000 cm/hr"],
                    ["pH stability", "2–14 (CIP), 3–12 (operational)"],
                    ["Non-specific binding", "Minimal across all chemistries"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between items-baseline gap-4 border-b border-white/10 pb-2.5"
                    >
                      <span className="text-[12px] text-on-navy-muted">{k}</span>
                      <span className="text-[13px] text-white font-medium text-right">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background py-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <div className="mb-12 max-w-2xl">
              <div className="text-[11px] font-semibold tracking-[0.15em] text-teal uppercase mb-3">
                Bead size selector
              </div>
              <h2 className="font-serif text-3xl text-navy mb-3">Pick a particle, see the trade-off</h2>
              <p className="text-base text-slate leading-relaxed">
                Smaller beads = higher resolution, lower flow. Larger beads = higher throughput,
                lower back-pressure. Same chemistry, same selectivity.
              </p>
            </div>

            <BeadSizeSelector active={active} onChange={setActive} />
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <div className="mb-12 max-w-2xl">
              <div className="text-[11px] font-semibold tracking-[0.15em] text-teal uppercase mb-3">
                Manufacturing
              </div>
              <h2 className="font-serif text-3xl text-navy mb-3">From monomer to packed column</h2>
              <p className="text-base text-slate leading-relaxed">
                Four controlled steps from raw agarose to a release-tested resin lot.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {steps.map((s) => (
                <div
                  key={s.n}
                  className="bg-white border border-border rounded-xl p-6 hover:border-teal-pale transition-colors relative"
                >
                  <div className="font-mono text-[11px] text-teal font-semibold tracking-wider mb-3">
                    {s.n}
                  </div>
                  <h3 className="font-serif text-lg text-navy mb-2">{s.title}</h3>
                  <p className="text-[13px] text-slate leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-navy hex-pattern py-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <div className="mb-10 max-w-2xl">
              <div className="text-[11px] font-semibold tracking-[0.15em] text-teal-bright uppercase mb-3">
                Column efficiency
              </div>
              <h2 className="font-serif text-3xl text-white mb-3">Tested on every lot</h2>
              <p className="text-base text-on-navy leading-relaxed">
                Standard test: acetone tracer, 30 cm/hr, 16/40 column packed at 700 cm/hr.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {efficiency.map((e) => (
                <div key={e.label} className="bg-white/[0.05] border border-white/10 rounded-xl p-6">
                  <div className="text-[10px] uppercase tracking-wider text-on-navy-muted font-semibold mb-3">
                    {e.label}
                  </div>
                  <div className="font-serif text-3xl text-white mb-2">{e.value}</div>
                  <div className="text-[12px] text-on-navy">{e.note}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTABand />
      </main>
      <Footer />
    </div>
  );
}