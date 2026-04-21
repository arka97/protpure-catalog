import { Check, X } from "lucide-react";

const rows = [
  { label: "Lead time", imported: "8–12 weeks (typical)", protpure: "2–3 weeks ex-works", highlight: true },
  { label: "Technical support", imported: "Via distributors, indirect", protpure: "Direct scientist-to-scientist", highlight: false },
  { label: "Evaluation packs", imported: "Rigid MOQs, formal sampling", protpure: "Free 5–25 mL samples on request", highlight: true },
  { label: "Supply chain", imported: "Global shipping, customs, delays", protpure: "Domestic dispatch from Gujarat", highlight: false },
  { label: "Currency exposure", imported: "USD/EUR invoicing", protpure: "INR billing, GST-compliant", highlight: false },
  { label: "Method development", imported: "Application notes only", protpure: "Hands-on collaboration with your team", highlight: true },
  { label: "Custom pack sizes", imported: "Standard catalogue only", protpure: "5 mL to 100 L, custom volumes", highlight: false },
  { label: "Vendor onboarding", imported: "Multi-month qualification", protpure: "India entity, direct documentation", highlight: false },
];

export function WhyProtpure() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="mb-12 max-w-2xl">
          <div className="text-[11px] font-semibold tracking-[0.15em] text-teal uppercase mb-3">
            Comparison
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-navy mb-3">
            Imported resins vs Protpure
          </h2>
          <p className="text-base text-slate leading-relaxed">
            A direct comparison of what changes when you source chromatography
            media from an Indian manufacturer with direct technical support.
          </p>
        </div>

        <div className="rounded-xl border border-border overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-3 bg-navy text-white text-[12px] font-semibold tracking-wide uppercase">
            <div className="p-4 border-r border-white/10">Parameter</div>
            <div className="p-4 border-r border-white/10 text-center">Imported Supplier</div>
            <div className="p-4 text-center text-teal-bright">Protpure</div>
          </div>
          {/* Rows */}
          {rows.map((r) => (
            <div
              key={r.label}
              className={`grid grid-cols-3 border-b border-border last:border-0 text-sm ${
                r.highlight ? "bg-teal-pale/30" : "bg-white"
              }`}
            >
              <div className="p-4 border-r border-border font-medium text-navy">
                {r.label}
              </div>
              <div className="p-4 border-r border-border text-slate text-center flex items-center justify-center gap-2">
                <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                <span>{r.imported}</span>
              </div>
              <div className="p-4 text-teal text-center font-medium flex items-center justify-center gap-2">
                <Check className="w-3.5 h-3.5 text-teal flex-shrink-0" />
                <span>{r.protpure}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
