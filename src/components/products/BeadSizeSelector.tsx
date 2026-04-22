import { FlowVariant } from "@/data/products";

export interface BeadVariant {
  id: FlowVariant;
  label: string;
  bead: number;
  flow: number;
  use: string;
}

export const beadVariants: BeadVariant[] = [
  { id: "hr", label: "HR", bead: 40, flow: 120, use: "Gentle elution, high resolution polishing" },
  { id: "precise", label: "Precise", bead: 60, flow: 380, use: "High resolution preparative work" },
  { id: "standard", label: "Standard", bead: 90, flow: 700, use: "Balanced capture and intermediate purification" },
  { id: "faster", label: "Faster", bead: 150, flow: 1000, use: "Industrial-scale capture, high throughput" },
];

interface Props {
  active: FlowVariant;
  onChange: (id: FlowVariant) => void;
}

export function BeadSizeSelector({ active, onChange }: Props) {
  const current = beadVariants.find((b) => b.id === active) ?? beadVariants[2];
  const beadPx = 60 + (current.bead / 200) * 140;

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      <div className="flex border-b border-border bg-secondary/40">
        {beadVariants.map((b) => (
          <button
            key={b.id}
            onClick={() => onChange(b.id)}
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
  );
}