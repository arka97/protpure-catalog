import { CheckCircle2, FlaskConical, Repeat, ShieldCheck, Building2 } from "lucide-react";

const items = [
  { icon: FlaskConical, text: "BioProcess grade resins" },
  { icon: ShieldCheck, text: "Used in GMP facilities" },
  { icon: Repeat, text: "Repeat orders from Indian biopharma" },
  { icon: CheckCircle2, text: "Reproducible batch quality" },
  { icon: Building2, text: "R&D to commercial scale" },
];

export function TrustStrip() {
  return (
    <div className="bg-white border-b border-border">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-5 flex items-center justify-center gap-6 md:gap-11 flex-wrap">
        {items.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-teal flex-shrink-0" />
            <span className="text-[13px] text-slate font-medium">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}