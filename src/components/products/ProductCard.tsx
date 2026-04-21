import { Product, CHROMATOGRAPHY_LABELS } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Plus, Atom, Layers, Droplet, Magnet, FlaskConical } from "lucide-react";
import { useRFQ } from "@/context/RFQContext";

const iconMap = {
  iec: Atom,
  affinity: Layers,
  sec: Droplet,
  hic: FlaskConical,
  magnetic: Magnet,
};

interface Props {
  product: Product;
  onOpen: () => void;
}

export function ProductCard({ product, onOpen }: Props) {
  const { addItem } = useRFQ();
  const Icon = iconMap[product.chromatographyType];

  return (
    <article
      onClick={onOpen}
      className="group bg-white border border-border rounded-xl p-5 cursor-pointer transition-all hover:border-teal-pale hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-12px_hsl(var(--teal)/0.18)] flex flex-col"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-navy leading-tight mb-1">{product.name}</h3>
          <p className="text-[11px] text-slate-light font-medium leading-tight">{product.subtitle}</p>
        </div>
        <div className="w-9 h-9 rounded-lg bg-teal-pale flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-teal" />
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {product.tags.slice(0, 3).map((t) => (
          <span
            key={t}
            className="text-[10px] font-medium px-2 py-0.5 rounded bg-secondary text-slate"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4 pb-4 border-b border-border">
        <div>
          <div className="text-[9px] uppercase tracking-wider text-slate-light font-semibold mb-1">
            DBC
          </div>
          <div className="font-mono text-xs text-navy font-medium">
            {product.dbc} <span className="text-slate-light">{product.dbcUnit.split("/")[0]}</span>
          </div>
        </div>
        <div>
          <div className="text-[9px] uppercase tracking-wider text-slate-light font-semibold mb-1">
            Max flow
          </div>
          <div className="font-mono text-xs text-navy font-medium">{product.maxFlowVelocity}</div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1.5">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              product.status === "available" ? "bg-green-600" : "bg-purple-600"
            }`}
          />
          <span className="text-[11px] text-slate font-medium capitalize">
            {product.status === "available" ? "Available" : product.status}
          </span>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            addItem(product, product.packSizes[0]);
          }}
          className="text-teal hover:text-teal-light hover:bg-teal-pale gap-1 h-8 px-2.5"
        >
          <Plus className="w-3.5 h-3.5" /> RFQ
        </Button>
      </div>
    </article>
  );
}