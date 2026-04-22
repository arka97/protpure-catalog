import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { CTABand } from "@/components/home/CTABand";
import { Button } from "@/components/ui/button";
import { useRFQ } from "@/context/RFQContext";
import {
  Building2,
  Target,
  Beaker,
  ShieldCheck,
  Globe2,
  TrendingUp,
  FileText,
  Truck,
  BadgeIndianRupee,
  Clock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

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

const capabilities = [
  {
    icon: Building2,
    title: "Registered Indian Entity",
    desc: "Protpure Tech Pvt. Ltd. — incorporated under MCA. GSTIN, PAN, and TAN documentation available on request.",
  },
  {
    icon: ShieldCheck,
    title: "Quality & Compliance",
    desc: "Batch-tested chromatography resins. CoA issued per lot. Ionic capacity, DBC, particle size, and column efficiency validated before release.",
  },
  {
    icon: Truck,
    title: "Delivery Commitments",
    desc: "Standard delivery: 2–3 weeks ex-works Anand, Gujarat. Domestic courier and freight forwarding for bulk orders.",
  },
  {
    icon: BadgeIndianRupee,
    title: "INR Invoicing & GST",
    desc: "All transactions in Indian Rupees. GST-compliant invoicing. No foreign exchange exposure or import duties.",
  },
  {
    icon: FileText,
    title: "Technical Documentation",
    desc: "Product datasheets, CoA, MSDS, and storage/handling guidelines provided with every shipment. Custom documentation on request.",
  },
  {
    icon: Clock,
    title: "Evaluation & Onboarding",
    desc: "Free 5–25 mL evaluation samples for qualified labs. Fast-track vendor qualification with direct India-entity documentation.",
  },
];

const vendorDocs = [
  "Certificate of Incorporation",
  "GST Registration Certificate",
  "PAN Card",
  "Product Technical Datasheets",
  "Certificate of Analysis (per lot)",
  "MSDS / SDS for all products",
  "Bank details for payment setup",
  "Authorized signatory declaration",
];

export default function About() {
  const { setOpen } = useRFQ();
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
                  <div className="font-serif text-xl text-white mb-1">Dr. Rucha Desai</div>
                  <div className="text-[11px] tracking-[0.1em] uppercase text-teal-bright font-semibold mb-2">
                    Founder &amp; CEO
                  </div>
                  <div className="text-sm text-on-navy-muted">
                    Polymer chemistry · 20+ yrs in bioseparations
                  </div>
                </div>
              </div>
              <div>
                <div className="text-[11px] font-semibold tracking-[0.15em] text-teal uppercase mb-3">
                  Founder
                </div>
                <h3 className="font-serif text-2xl text-navy mb-4">A scientist-led company</h3>
                <p className="text-[15px] text-slate leading-relaxed mb-3">
                  ProtPure was founded by Dr. Rucha Desai, a chemist with two decades of
                  experience in bead polymerisation, ligand coupling, and downstream process
                  development for the biopharma industry.
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

        {/* Procurement & vendor qualification (merged from /procurement) */}
        <section className="bg-background py-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <div className="mb-12 max-w-2xl">
              <div className="text-[11px] font-semibold tracking-[0.15em] text-teal uppercase mb-3">
                Procurement
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-navy mb-3">
                Vendor qualification &amp; onboarding
              </h2>
              <p className="text-base text-slate leading-relaxed">
                Built to meet the vendor qualification requirements of Indian pharma companies,
                CDMOs, and research institutions.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {capabilities.map((c) => (
                <div
                  key={c.title}
                  className="bg-white border border-border rounded-xl p-7 hover:border-teal-pale transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-teal-pale flex items-center justify-center mb-4">
                    <c.icon className="w-5 h-5 text-teal" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-navy mb-2">{c.title}</h3>
                  <p className="text-[13px] text-slate leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-start bg-white rounded-2xl border border-border p-8">
              <div>
                <div className="text-[11px] font-semibold tracking-[0.15em] text-teal uppercase mb-3">
                  Documentation
                </div>
                <h3 className="font-serif text-2xl text-navy mb-4">
                  Vendor qualification documents
                </h3>
                <p className="text-[14px] text-slate leading-relaxed mb-5">
                  Available on request to support your vendor onboarding. Reach our team with
                  your specific compliance requirements and we'll send the complete pack.
                </p>
                <Button
                  onClick={() => setOpen(true)}
                  className="bg-teal hover:bg-teal-light text-white"
                >
                  Request vendor pack <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <ul className="space-y-3">
                {vendorDocs.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-teal mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-navy hex-pattern py-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <div className="mb-10 max-w-2xl">
              <div className="text-[11px] font-semibold tracking-[0.15em] text-teal-bright uppercase mb-3">
                Capacity
              </div>
              <h2 className="font-serif text-3xl text-white mb-3">
                Manufacturing capacity statement
              </h2>
              <p className="text-base text-on-navy leading-relaxed">
                Current production data for procurement planning and supply assurance.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { val: "600 L", label: "Monthly resin production capacity" },
                { val: "20+", label: "Products in catalogue across 5 chromatography types" },
                { val: "5 mL–100 L", label: "Pack size range — R&D to commercial" },
                { val: "2–3 weeks", label: "Standard delivery ex-works Anand" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-white/[0.05] border border-white/10 rounded-xl p-6"
                >
                  <div className="font-serif text-2xl text-white mb-2">{s.val}</div>
                  <div className="text-[12px] text-on-navy leading-snug">{s.label}</div>
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