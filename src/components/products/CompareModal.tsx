import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCompare } from "@/context/CompareContext";
import { products, Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useRFQ } from "@/context/RFQContext";
import { Plus } from "lucide-react";

const rows: { label: string; get: (p: Product) => string | null; industry: string }[] = [
  { label: "Ligand", get: (p) => p.ligand, industry: "Varies by chemistry" },
  { label: "Matrix", get: (p) => p.matrix, industry: "4–6% agarose" },
  { label: "Particle size range", get: (p) => p.particleSizeRange, industry: "45–165 µm" },
  { label: "Mean particle (D₅₀ᵥ)", get: (p) => p.particleSizeD50V, industry: "~90 µm" },
  { label: "Ionic capacity", get: (p) => p.ionicCapacity, industry: "0.15–0.25 mmol/mL" },
  { label: "DBC", get: (p) => `${p.dbc} ${p.dbcUnit}`, industry: "100–160 mg/mL" },
  { label: "Flow specification", get: (p) => p.flowSpec, industry: "300–700 cm/h typical" },
  { label: "Max flow velocity", get: (p) => p.maxFlowVelocity, industry: "700 cm/hr" },
  { label: "pH (CIP)", get: (p) => p.phCIP, industry: "2–14" },
  { label: "pH (operational)", get: (p) => p.phOperational, industry: "3–12" },
  { label: "Chemical stability", get: (p) => p.chemicalStability, industry: "1 M NaOH, 6 M GuHCl" },
  { label: "Storage", get: (p) => p.storage, industry: "4–30 °C, 20% EtOH" },
  { label: "Delivery", get: (p) => p.deliveryTime, industry: "4–8 weeks (imported)" },
];

export function CompareModal() {
  const { ids, isOpen, setOpen, remove } = useCompare();
  const { addItem } = useRFQ();
  const items = ids.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[];

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="max-w-6xl max-h-[92vh] overflow-y-auto p-0 gap-0">
        <div className="px-7 pt-7 pb-5 border-b border-border sticky top-0 bg-white z-10">
          <div className="text-[11px] font-semibold tracking-[0.15em] text-teal uppercase mb-2">
            Side-by-side comparison
          </div>
          <h2 className="font-serif text-2xl text-navy">Compare {items.length} resins</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-[11px] font-semibold tracking-[0.1em] uppercase text-slate w-[180px] sticky left-0 bg-white">
                  Specification
                </th>
                {items.map((p) => (
                  <th key={p.id} className="text-left p-4 align-top">
                    <div className="font-serif text-base text-navy mb-1">{p.name}</div>
                    <div className="text-[11px] text-slate-light font-medium mb-3">{p.subtitle}</div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addItem(p, p.packSizes[0])}
                        className="h-7 text-[11px] gap-1"
                      >
                        <Plus className="w-3 h-3" /> RFQ
                      </Button>
                      <button
                        onClick={() => remove(p.id)}
                        className="text-[11px] text-slate-light hover:text-destructive"
                      >
                        Remove
                      </button>
                    </div>
                  </th>
                ))}
                <th className="text-left p-4 align-top bg-secondary/40">
                  <div className="text-[10px] font-semibold tracking-[0.1em] uppercase text-slate-light mb-1">
                    Benchmark
                  </div>
                  <div className="font-serif text-base text-navy">Industry Standard</div>
                  <div className="text-[11px] text-slate-light mt-1">Typical imported resin</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-border last:border-0 hover:bg-secondary/30">
                  <td className="p-4 text-slate text-[13px] sticky left-0 bg-white">{row.label}</td>
                  {items.map((p) => (
                    <td key={p.id} className="p-4 font-mono text-[12.5px] text-navy">
                      {row.get(p) ?? <span className="text-slate-light">—</span>}
                    </td>
                  ))}
                  <td className="p-4 font-mono text-[12.5px] text-slate bg-secondary/40">
                    {row.industry}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}