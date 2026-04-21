import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { CTABand } from "@/components/home/CTABand";
import { Building2, Target, Beaker, ShieldCheck, Globe2, TrendingUp } from "lucide-react";

const facility = [
  ["Location", "Anand, Gujarat, India"],
  ["Facility area", "5,000 sq ft dedicated manufacturing"],
  ["Production capacity", "600 L resin / month"],
  ["Reactor scale", "20 L, 50 L, 200 L cross-linking reactors"],
  ["QC capability", "Particle sizing, ionic capacity, DBC, HETP"],
  ["Standard delivery", "2–3 weeks ex-works"],
  ["Product range", "20+ resins · 5 mL R&D to 100 L industrial"],
];

const vision = [
  {
    icon: Globe2,
    title: "Reduce import dependency",
    desc: "Indigenous manufacturing of critical biopharma inputs, with domestic supply assurance.",
  },
  {
    icon: ShieldCheck,
    title: "Reproducible quality",
    desc: "Batch-to-batch consistency through tightly controlled bead synthesis and ligand coupling.",
  },
  {
    icon: TrendingUp,
    title: "Scale with the customer",
    desc: "From 5 mL R&D screening to 100 L commercial — same chemistry, same column behaviour.",
  },
  {
    icon: Beaker,
    title: "Application support",
    desc: "Hands-on technical support for method development, scale-up, and troubleshooting.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="About"
          title="Indigenous chromatography resins, manufactured in Anand"
          description="ProtPure Tech Pvt. Ltd. designs and manufactures agarose-based chromatography resins for the Indian and global biopharmaceutical industry."
          breadcrumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
        />

        <section className="bg-white py-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 grid md:grid-cols-[1fr_1.2fr] gap-12 items-start">
            <div>
              <div className="text-[11px] font-semibold tracking-[0.15em] text-teal uppercase mb-3">
                Story
              </div>
              <h2 className="font-serif text-3xl text-navy mb-5">Built for Indian biopharma</h2>
              <div className="space-y-4 text-[15px] text-slate leading-relaxed">
                <p>
                  ProtPure was founded to close a gap that Indian biopharma has lived with for
                  decades — reliance on imported chromatography media for downstream processing
                  of recombinant proteins, vaccines, and biologics.
                </p>
                <p>
                  Our 6% cross-linked agarose platform was developed in-house and validated against
                  benchmark imported resins on column efficiency (As = 1.63, h = 1.04), dynamic
                  binding capacity, and chemical stability at standard CIP conditions.
                </p>
                <p>
                  Customers include process development teams at Indian biopharma companies running
                  insulin, monoclonal antibody, and recombinant therapeutic programs from R&D
                  through GMP commercial manufacturing.
                </p>
              </div>
            </div>

            <div className="bg-secondary/40 rounded-xl border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border bg-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-teal" />
                <h3 className="text-sm font-semibold text-navy">Facility snapshot</h3>
              </div>
              <table className="w-full">
                <tbody>
                  {facility.map(([k, v]) => (
                    <tr key={k} className="border-b border-border last:border-0">
                      <td className="px-6 py-3.5 text-[13px] text-slate w-2/5">{k}</td>
                      <td className="px-6 py-3.5 text-[13px] text-navy font-medium">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="bg-background py-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-[1fr_1.5fr] gap-10 items-center bg-white rounded-2xl border border-border p-8 md:p-10">
              <div className="bg-navy hex-pattern rounded-xl p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--teal)/0.25),transparent_60%)]" />
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-teal/20 border-2 border-teal-bright/40 mx-auto flex items-center justify-center mb-4">
                    <Target className="w-9 h-9 text-teal-bright" />
                  </div>
                  <div className="font-serif text-xl text-white mb-1">Founder & CEO</div>
                  <div className="text-sm text-on-navy-muted">Polymer chemistry · 20+ yrs in bioseparations</div>
                </div>
              </div>
              <div>
                <div className="text-[11px] font-semibold tracking-[0.15em] text-teal uppercase mb-3">
                  Founder
                </div>
                <h3 className="font-serif text-2xl text-navy mb-4">A scientist-led company</h3>
                <p className="text-[15px] text-slate leading-relaxed mb-3">
                  ProtPure was founded by chemists with two decades of experience in bead
                  polymerisation, ligand coupling, and downstream process development for the
                  biopharma industry.
                </p>
                <p className="text-[15px] text-slate leading-relaxed">
                  Every product in the catalog is developed, characterised, and supported by
                  scientists — not resold. We talk to your process team in their language.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <div className="mb-12 max-w-2xl">
              <div className="text-[11px] font-semibold tracking-[0.15em] text-teal uppercase mb-3">
                Vision
              </div>
              <h2 className="font-serif text-3xl text-navy mb-3">What we're building toward</h2>
              <p className="text-base text-slate leading-relaxed">
                Self-reliant Indian biomanufacturing built on locally produced, scientifically
                rigorous chromatography media.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {vision.map((v) => (
                <div
                  key={v.title}
                  className="bg-white border border-border rounded-xl p-6 hover:border-teal-pale hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-teal-pale flex items-center justify-center mb-4">
                    <v.icon className="w-5 h-5 text-teal" />
                  </div>
                  <h3 className="font-semibold text-navy text-[15px] mb-2">{v.title}</h3>
                  <p className="text-[13px] text-slate leading-relaxed">{v.desc}</p>
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