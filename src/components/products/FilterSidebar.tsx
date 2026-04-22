import {
  Product,
  ChromatographyType,
  CHROMATOGRAPHY_LABELS,
  EXCHANGER_LABELS,
  FlowVariant,
} from "@/data/products";

const typeColors: Record<ChromatographyType, string> = {
  iec: "hsl(var(--teal))",
  affinity: "#7c3aed",
  sec: "#1d4ed8",
  hic: "#b45309",
  magnetic: "#0891b2",
};

interface Props {
  products: Product[];
  type: string | null;
  exchanger: string | null;
  status: string | null;
  flow: string | null;
  onChange: (key: "type" | "exchanger" | "status" | "flow", value: string | null) => void;
  onClear: () => void;
}

const FLOW_LABELS: Record<FlowVariant, string> = {
  hr: "HR · 40 µm",
  precise: "Precise · 60 µm",
  standard: "Standard · 90 µm",
  faster: "Faster · 150 µm",
};

export function FilterSidebar({ products, type, exchanger, status, flow, onChange, onClear }: Props) {
  const typeCounts = (Object.keys(CHROMATOGRAPHY_LABELS) as ChromatographyType[]).map((t) => ({
    value: t,
    label: CHROMATOGRAPHY_LABELS[t],
    count: products.filter((p) => p.chromatographyType === t).length,
    color: typeColors[t],
  }));
  const exchangerCounts = (Object.keys(EXCHANGER_LABELS) as (keyof typeof EXCHANGER_LABELS)[]).map(
    (e) => ({
      value: e,
      label: EXCHANGER_LABELS[e],
      count: products.filter((p) => p.exchangerType === e).length,
    })
  );

  const activeCount = [type, exchanger, status, flow].filter(Boolean).length;

  const Item = ({
    active,
    onClick,
    color,
    label,
    count,
  }: {
    active: boolean;
    onClick: () => void;
    color?: string;
    label: string;
    count: number;
  }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-[13px] transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal ${
        active ? "bg-teal-pale text-teal font-medium" : "text-foreground hover:bg-secondary"
      }`}
    >
      {color && <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />}
      <span className="flex-1">{label}</span>
      <span className="text-[11px] text-slate-light font-mono">{count}</span>
    </button>
  );

  return (
    <aside className="space-y-7">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-slate font-sans">
          Filters {activeCount > 0 && <span className="text-teal">({activeCount})</span>}
        </h3>
        {activeCount > 0 && (
          <button onClick={onClear} className="text-[11px] text-teal hover:underline">
            Clear all
          </button>
        )}
      </div>

      <div>
        <h4 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-slate mb-3 font-sans">
          Chromatography Type
        </h4>
        <div className="space-y-0.5">
          <Item
            active={!type}
            onClick={() => onChange("type", null)}
            label="All"
            count={products.length}
          />
          {typeCounts.map((t) => (
            <Item
              key={t.value}
              active={type === t.value}
              onClick={() => onChange("type", t.value)}
              color={t.color}
              label={t.label}
              count={t.count}
            />
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-slate mb-3 font-sans">
          Exchanger Type
        </h4>
        <div className="space-y-0.5">
          {exchangerCounts.map((e) => (
            <Item
              key={e.value}
              active={exchanger === e.value}
              onClick={() => onChange("exchanger", exchanger === e.value ? null : e.value)}
              label={e.label}
              count={e.count}
            />
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-slate mb-3 font-sans">
          Status
        </h4>
        <div className="space-y-0.5">
          <Item
            active={status === "available"}
            onClick={() => onChange("status", status === "available" ? null : "available")}
            color="#16a34a"
            label="Available now"
            count={products.filter((p) => p.status === "available").length}
          />
          <Item
            active={status === "pipeline"}
            onClick={() => onChange("status", status === "pipeline" ? null : "pipeline")}
            color="#7c3aed"
            label="Pipeline"
            count={products.filter((p) => p.status === "pipeline").length}
          />
        </div>
      </div>

      <div>
        <h4 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-slate mb-3 font-sans">
          Flow profile
        </h4>
        <div className="space-y-0.5">
          {(Object.keys(FLOW_LABELS) as FlowVariant[]).map((f) => (
            <Item
              key={f}
              active={flow === f}
              onClick={() => onChange("flow", flow === f ? null : f)}
              label={FLOW_LABELS[f]}
              count={products.filter((p) => p.flowVariant === f).length}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}