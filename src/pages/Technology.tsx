import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { CTABand } from "@/components/home/CTABand";

const beadVariants = [
  { id: "hr", label: "HR", bead: 40, flow: 120, use: "Gentle elution, high resolution polishing" },
  { id: "precise", label: "Precise", bead: 60, flow: 380, use: "High resolution preparative work" },
  { id: "standard", label: "Standard", bead: 90, flow: 700, use: "Balanced capture and intermediate purification" },
  { id: "faster", label: "Faster", bead: 150, flow: 1000, use: "Industrial-scale capture, high throughput" },
];

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
  const [active, setActive] = useState("standard");
  const current = beadVariants.find((b) => b.id === active)!;
  const maxBead = 200;
  const beadPx = 60 + (current.bead / maxBead) * 140;

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

            <div className="bg-white rounded-2xl border border-border overflow-hidden">
              <div className="flex border-b border-border bg-secondary/40">
                {beadVariants.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setActive(b.id)}
                    className={`flex-1 px-4 py-4 text-sm font-medium border-r border-border last:border-r-0 transition-colors ${
                      active === b.id
                        ? "bg-white text-teal border-b-2 -mb-px border-b-teal"
                        : "text-slate hover:text-navy hover:bg-white/60"
                    }`}
                  >
                    Agarose {b.label}
                  </button>
                ))}
              </div>
              <div className="grid md:grid-cols-[260px_1fr] gap-10 p-8 md:p-10 items-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-[220px] h-[220px] flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-teal/20 animate-pulse" />
                    <div
                      className="rounded-full bg-gradient-to-br from-teal-bright/30 to-teal/10 border-2 border-teal-bright/50 flex items-center justify-center transition-all duration-500"
                      style={{ width: beadPx, height: beadPx }}
                    >
                      <div className="text-center">
                        <div className="font-serif text-3xl text-navy">{current.bead}</div>
                        <div className="text-[10px] text-teal font-mono uppercase tracking-wider">µm</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-light text-center max-w-[200px]">
                    Mean particle (D₅₀ᵥ). Drawn proportionally.
                  </div>
                </div>

                <div>
                  <div className="font-serif text-2xl text-navy mb-2">Agarose {current.label}</div>
                  <p className="text-sm text-slate leading-relaxed mb-5">{current.use}</p>
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <div className="text-[10px] uppercase tracking-wider text-slate-light font-semibold mb-1">
                        Mean particle
                      </div>
                      <div className="font-mono text-base text-navy font-medium">~{current.bead} µm</div>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <div className="text-[10px] uppercase tracking-wider text-slate-light font-semibold mb-1">
                        Max flow velocity
                      </div>
                      <div className="font-mono text-base text-navy font-medium">{current.flow} cm/hr</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-light font-semibold mb-2">
                      Relative throughput
                    </div>
                    <div className="bg-secondary rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-teal to-teal-bright transition-all duration-500"
                        style={{ width: `${(current.flow / 1000) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
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