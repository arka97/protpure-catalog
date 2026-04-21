import { Sparkles, Repeat, Zap, Clock, MapPin, BadgeIndianRupee } from "lucide-react";

const usps = [
  {
    num: "01",
    icon: Sparkles,
    title: "High Purity & Superior Yield",
    desc: "Engineered for exceptional purity and high protein recovery across research and production workflows.",
  },
  {
    num: "02",
    icon: Repeat,
    title: "Reproducible Batch Quality",
    desc: "Reliable batch-to-batch consistency with minimal optimisation effort — validated for GMP environments.",
  },
  {
    num: "03",
    icon: Zap,
    title: "Optimised High Flow Rate",
    desc: "Up to 1000 cm/hr flow velocity. Faster purification and increased throughput without sacrificing resolution.",
  },
  {
    num: "04",
    icon: Clock,
    title: "2–3 Week Delivery",
    desc: "Compared to 8–12 weeks for imported alternatives. Faster R&D iterations and reduced production delays.",
  },
  {
    num: "05",
    icon: MapPin,
    title: "Manufactured in India",
    desc: "GIDC facility in Anand, Gujarat. Reduced dependency on imports, foreign exchange outflow, and global supply risk.",
  },
  {
    num: "06",
    icon: BadgeIndianRupee,
    title: "Cost-Effective Innovation",
    desc: "Industry-competitive specifications at pricing accessible to Indian biotech companies and research institutions.",
  },
];

export function USPGrid() {
  return (
    <section className="bg-background py-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="mb-12 max-w-2xl">
          <div className="text-[11px] font-semibold tracking-[0.15em] text-teal uppercase mb-3">
            Why Protpure
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-navy mb-3">
            The smart choice for Indian biopharma
          </h2>
          <p className="text-base text-slate leading-relaxed">
            Six reasons scientists and procurement teams choose Protpure resins
            over imported alternatives.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {usps.map((u) => (
            <div
              key={u.num}
              className="bg-white border border-border rounded-xl p-7 hover:border-teal-pale hover:shadow-[0_4px_16px_-8px_hsl(var(--teal)/0.12)] transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-teal-pale flex items-center justify-center group-hover:bg-teal/10 transition-colors">
                  <u.icon className="w-4 h-4 text-teal" />
                </div>
                <span className="font-mono text-[11px] text-teal font-semibold tracking-wider">
                  {u.num}
                </span>
              </div>
              <h3 className="text-[15px] font-semibold text-navy mb-2">
                {u.title}
              </h3>
              <p className="text-[13.5px] text-slate leading-relaxed">
                {u.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
