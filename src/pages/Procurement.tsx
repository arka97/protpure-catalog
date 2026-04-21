import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { CTABand } from "@/components/home/CTABand";
import { Button } from "@/components/ui/button";
import { useRFQ } from "@/context/RFQContext";
import {
  ShieldCheck,
  FileText,
  Building2,
  Clock,
  BadgeIndianRupee,
  Truck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

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

export default function Procurement() {
  const { setOpen } = useRFQ();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Procurement"
          title="Vendor qualification & onboarding"
          description="Everything your procurement team needs to evaluate, qualify, and onboard Protpure as an approved vendor for chromatography resins."
          breadcrumbs={[{ label: "Home", to: "/" }, { label: "Procurement" }]}
        />

        {/* Capabilities */}
        <section className="bg-white py-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <div className="mb-12 max-w-2xl">
              <div className="text-[11px] font-semibold tracking-[0.15em] text-teal uppercase mb-3">
                Supplier profile
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-navy mb-3">
                Built for enterprise procurement
              </h2>
              <p className="text-base text-slate leading-relaxed">
                Protpure is structured to meet the vendor qualification requirements of
                Indian pharmaceutical companies, CDMOs, and research institutions.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {capabilities.map((c) => (
                <div
                  key={c.title}
                  className="bg-white border border-border rounded-xl p-7 hover:border-teal-pale transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-teal-pale flex items-center justify-center mb-4">
                    <c.icon className="w-5 h-5 text-teal" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-navy mb-2">
                    {c.title}
                  </h3>
                  <p className="text-[13px] text-slate leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vendor Documentation Checklist */}
        <section className="bg-background py-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <div className="text-[11px] font-semibold tracking-[0.15em] text-teal uppercase mb-3">
                  Documentation
                </div>
                <h2 className="font-serif text-3xl text-navy mb-5">
                  Vendor qualification documents
                </h2>
                <p className="text-[15px] text-slate leading-relaxed mb-6">
                  The following documents are available on request to support your vendor
                  onboarding process. Contact our team with your specific compliance
                  requirements and we'll provide the complete package.
                </p>
                <Button
                  onClick={() => setOpen(true)}
                  className="bg-teal hover:bg-teal-light text-white"
                >
                  Request vendor pack <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              <div className="bg-white rounded-xl border border-border p-7">
                <h3 className="text-sm font-semibold text-navy mb-5">
                  Available documents
                </h3>
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
          </div>
        </section>

        {/* Capacity Statement */}
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
