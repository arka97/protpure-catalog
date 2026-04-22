import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRFQ } from "@/context/RFQContext";

const stats = [
  { val: "600", unit: "L", label: "Monthly production capacity" },
  { val: "20", unit: "+", label: "Products in catalog" },
  { val: "2–3", unit: "wk", label: "Standard delivery window" },
  { val: "≥140", unit: "mg/mL", label: "Q Agarose dynamic binding capacity" },
];

export function HeroSection() {
  const { setOpen } = useRFQ();
  return (
    <section className="relative hero-glow hex-pattern overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-20 md:py-28 grid md:grid-cols-[1fr_460px] gap-16 items-center relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 bg-teal/15 border border-teal/30 rounded-full px-3 py-1 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-bright animate-pulse" />
            <span className="text-xs text-teal-bright font-medium tracking-wide">
              Manufactured in India
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-[52px] leading-[1.07] text-white tracking-tight mb-6">
            Indigenous Agarose Resins for{" "}
            <em className="text-[hsl(170,42%,65%)] not-italic">Biopharmaceutical Purification</em>
          </h1>
          <p className="text-base text-on-navy leading-relaxed mb-9 max-w-xl">
            High-performance chromatography resins — ion exchange, affinity, SEC, HIC —
            manufactured in Gujarat, India. 600 L/month capacity, 2–3 week delivery,
            used in GMP facilities.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <Button asChild size="lg" className="bg-teal hover:bg-teal-light text-white">
              <Link to="/products">
                Browse Products <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setOpen(true)}
              className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              Request a Quote
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {["BioProcess grade", "GMP-compatible", "R&D to commercial"].map((b) => (
              <span
                key={b}
                className="text-[11px] px-3 py-1 rounded-full bg-white/8 border border-white/15 text-on-navy"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white/[0.04] hover:bg-white/[0.07] transition-colors p-7"
            >
              <div className="font-serif text-3xl md:text-[34px] text-white leading-none mb-2">
                {s.val}
                <span className="text-lg text-teal-bright ml-1">{s.unit}</span>
              </div>
              <div className="text-[12px] text-on-navy-muted leading-snug font-medium">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
