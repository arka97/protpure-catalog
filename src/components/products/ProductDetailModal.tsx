import { Product } from "@/data/products";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRFQ } from "@/context/RFQContext";
import { useEffect, useState } from "react";
import { Clock, Plus } from "lucide-react";

interface Props {
  product: Product | null;
  onClose: () => void;
}

export function ProductDetailModal({ product, onClose }: Props) {
  const { addItem } = useRFQ();
  const [selectedPack, setSelectedPack] = useState<string | null>(null);

  useEffect(() => {
    if (product) setSelectedPack(product.packSizes[0]?.catNo ?? null);
  }, [product]);

  if (!product) return null;

  const pack = product.packSizes.find((p) => p.catNo === selectedPack) ?? product.packSizes[0];

  const specs: { label: string; value: string | null }[] = [
    { label: "Ligand", value: product.ligand },
    { label: "Matrix", value: product.matrix },
    { label: "Particle Size Range", value: product.particleSizeRange },
    { label: "Mean Particle Size (D₅₀ᵥ)", value: product.particleSizeD50V },
    { label: "Ionic Capacity", value: product.ionicCapacity },
    { label: "Dynamic Binding Capacity", value: `${product.dbc} ${product.dbcUnit}` },
    { label: "Flow Specification", value: product.flowSpec },
    { label: "Max Flow Velocity", value: product.maxFlowVelocity },
    { label: "pH Stability (CIP)", value: product.phCIP },
    { label: "pH Stability (Operational)", value: product.phOperational },
    { label: "Chemical Stability", value: product.chemicalStability },
    { label: "Storage", value: product.storage },
  ];

  return (
    <Dialog open={!!product} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        <DialogHeader className="px-7 pt-7 pb-5 border-b border-border">
          <DialogTitle className="font-serif text-2xl text-navy">{product.name}</DialogTitle>
          <p className="text-sm text-slate font-medium">{product.subtitle}</p>
          <div className="flex flex-wrap gap-1.5 pt-2">
            {product.tags.map((t) => (
              <span key={t} className="text-[11px] px-2 py-0.5 rounded bg-teal-pale text-teal font-medium">
                {t}
              </span>
            ))}
          </div>
        </DialogHeader>

        <div className="px-7 py-6 space-y-7">
          <section>
            <h4 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-slate mb-3">
              Specifications
            </h4>
            <table className="w-full text-sm">
              <tbody>
                {specs
                  .filter((s) => s.value)
                  .map((s) => (
                    <tr key={s.label} className="border-b border-border last:border-0">
                      <td className="py-2.5 pr-4 text-slate w-2/5">{s.label}</td>
                      <td className="py-2.5 text-navy font-mono text-[13px]">{s.value}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </section>

          <section>
            <h4 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-slate mb-3">
              Pack sizes
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {product.packSizes.map((p) => (
                <button
                  key={p.catNo}
                  onClick={() => setSelectedPack(p.catNo)}
                  className={`text-left p-3 rounded-lg border transition-all ${
                    selectedPack === p.catNo
                      ? "border-teal bg-teal-pale"
                      : "border-border bg-white hover:border-teal-pale"
                  }`}
                >
                  <div className="font-mono text-[10px] text-slate-light">{p.catNo}</div>
                  <div className="text-sm font-semibold text-navy">{p.size}</div>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h4 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-slate mb-3">
              Applications
            </h4>
            <ul className="space-y-2">
              {product.applications.map((a) => (
                <li key={a} className="flex gap-2 text-sm text-slate">
                  <span className="text-teal mt-1">•</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="border-t border-border px-7 py-5 bg-secondary/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky bottom-0">
          <div className="flex items-center gap-2 text-xs text-slate">
            <Clock className="w-3.5 h-3.5" />
            Delivery: <span className="font-semibold text-navy">{product.deliveryTime}</span>
          </div>
          <Button
            onClick={() => {
              addItem(product, pack);
              onClose();
            }}
            className="bg-teal hover:bg-teal-light text-white"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add {pack.size} ({pack.catNo}) to RFQ
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}