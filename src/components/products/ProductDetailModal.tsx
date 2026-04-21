import { Product } from "@/data/products";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRFQ } from "@/context/RFQContext";
import { useEffect, useState } from "react";
import { Clock, Plus, ArrowRight } from "lucide-react";

interface Props {
  product: Product | null;
  onClose: () => void;
}

// Benchmarking data for products that have it
const benchmarks: Record<string, { label: string; protpure: string; industry: string; highlight?: boolean }[]> = {
  "q-agarose": [
    { label: "Ion Exchanger Type", protpure: "Strong anion", industry: "Strong anion" },
    { label: "Ionic Capacity", protpure: "0.18–0.25 mmol/mL", industry: "0.18–0.25 mmol/mL", highlight: true },
    { label: "DBC", protpure: "≥140 mg BSA/mL", industry: "40–70 mg (FF) / ≥160 mg (XL)", highlight: true },
    { label: "Max Flow Velocity", protpure: "700 cm/hr", industry: "300–600 cm/hr" },
    { label: "pH Stability (CIP)", protpure: "2–14", industry: "2–14" },
    { label: "Delivery", protpure: "2–3 weeks", industry: "8–12 weeks", highlight: true },
  ],
  "q-agarose-faster": [
    { label: "Ion Exchanger Type", protpure: "Strong anion", industry: "Strong anion" },
    { label: "Ionic Capacity", protpure: "0.18–0.25 mmol/mL", industry: "0.18–0.25 mmol/mL", highlight: true },
    { label: "DBC", protpure: "≥110 mg BSA/mL", industry: "40–70 mg (FF)", highlight: true },
    { label: "Max Flow Velocity", protpure: "800–1000 cm/hr", industry: "300–600 cm/hr", highlight: true },
    { label: "pH Stability (CIP)", protpure: "2–14", industry: "2–14" },
    { label: "Delivery", protpure: "2–3 weeks", industry: "8–12 weeks", highlight: true },
  ],
  "sp-agarose": [
    { label: "Ion Exchanger Type", protpure: "Strong cation", industry: "Strong cation" },
    { label: "Ionic Capacity", protpure: "0.18–0.25 mmol/mL", industry: "0.18–0.25 mmol/mL", highlight: true },
    { label: "DBC", protpure: "≥150 mg Lyz/mL", industry: "80–120 mg Lyz/mL (FF)", highlight: true },
    { label: "Max Flow Velocity", protpure: "700 cm/hr", industry: "300–600 cm/hr" },
    { label: "Delivery", protpure: "2–3 weeks", industry: "8–12 weeks", highlight: true },
  ],
  "ni-nta-agarose": [
    { label: "Ligand", protpure: "Ni-NTA", industry: "Ni-NTA" },
    { label: "DBC", protpure: "~40 mg His-tag/mL", industry: "20–50 mg His-tag/mL", highlight: true },
    { label: "Max Flow Velocity", protpure: "700 cm/hr", industry: "300–600 cm/hr" },
    { label: "Cycle Reusability", protpure: "Validated 3+ cycles", industry: "3–5 cycles" },
    { label: "Delivery", protpure: "2–3 weeks", industry: "8–12 weeks", highlight: true },
  ],
};

export function ProductDetailModal({ product, onClose }: Props) {
  const { addItem } = useRFQ();
  const [selectedPack, setSelectedPack] = useState<string | null>(null);

  useEffect(() => {
    if (product) setSelectedPack(product.packSizes[0]?.catNo ?? null);
  }, [product]);

  if (!product) return null;

  const pack = product.packSizes.find((p) => p.catNo === selectedPack) ?? product.packSizes[0];
  const bench = benchmarks[product.id];

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
          {/* Benchmark callout */}
          {bench && (
            <div className="bg-teal-pale/50 border-l-[3px] border-teal rounded-r-lg px-5 py-3.5">
              <span className="text-[13px] text-teal font-medium">
                {product.name} delivers{" "}
                <strong>{product.dbc} {product.dbcUnit}</strong> dynamic binding capacity
                — see benchmarking table below for comparison with industry standard.
              </span>
            </div>
          )}

          {/* Specifications */}
          <section>
            <h4 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-teal mb-3">
              Technical Specifications
            </h4>
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-navy text-white">
                    <th className="text-left px-4 py-2.5 text-[12px] font-medium w-2/5">Parameter</th>
                    <th className="text-left px-4 py-2.5 text-[12px] font-medium">Specification</th>
                  </tr>
                </thead>
                <tbody>
                  {specs
                    .filter((s) => s.value)
                    .map((s) => (
                      <tr key={s.label} className="border-b border-border last:border-0 hover:bg-secondary/30">
                        <td className="px-4 py-2.5 text-slate">{s.label}</td>
                        <td className="px-4 py-2.5 text-navy font-mono text-[13px]">{s.value}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Benchmarking Table */}
          {bench && (
            <section>
              <h4 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-amber-700 mb-3">
                Benchmarking vs Industry Standard
              </h4>
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-700 text-white text-[12px] font-medium">
                      <th className="text-left px-4 py-2.5 w-1/3">Parameter</th>
                      <th className="text-left px-4 py-2.5 bg-teal/10 text-teal-bright">{product.name}</th>
                      <th className="text-left px-4 py-2.5">Industry Standard</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bench.map((row) => (
                      <tr key={row.label} className="border-b border-border last:border-0 hover:bg-secondary/30">
                        <td className="px-4 py-2.5 text-slate text-[12.5px]">{row.label}</td>
                        <td className={`px-4 py-2.5 font-mono text-[12px] bg-teal/5 ${row.highlight ? "text-teal font-semibold" : "text-navy"}`}>
                          {row.protpure}
                        </td>
                        <td className="px-4 py-2.5 font-mono text-[12px] text-slate">{row.industry}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Pack sizes */}
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

          {/* Applications */}
          <section>
            <h4 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-slate mb-3">
              Applications
            </h4>
            <ul className="space-y-2">
              {product.applications.map((a) => (
                <li key={a} className="flex gap-2 text-sm text-slate">
                  <ArrowRight className="w-3.5 h-3.5 text-teal mt-0.5 flex-shrink-0" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sticky bottom bar */}
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
