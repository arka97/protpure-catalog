import { useCompare } from "@/context/CompareContext";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { X, GitCompare } from "lucide-react";

export function CompareBar() {
  const { ids, setOpen, remove, clear } = useCompare();
  if (ids.length === 0) return null;
  const items = ids.map((id) => products.find((p) => p.id === id)).filter(Boolean) as typeof products;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-[calc(100%-32px)] max-w-2xl">
      <div className="bg-navy text-white rounded-xl shadow-2xl border border-white/10 px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2 flex-shrink-0">
          <GitCompare className="w-4 h-4 text-teal-bright" />
          <span className="text-sm font-medium">Compare</span>
          <span className="text-[11px] text-on-navy-muted font-mono">({ids.length}/3)</span>
        </div>
        <div className="flex-1 flex items-center gap-1.5 overflow-x-auto">
          {items.map((p) => (
            <span
              key={p.id}
              className="flex items-center gap-1 bg-white/10 rounded-md px-2 py-1 text-[11px] whitespace-nowrap"
            >
              {p.name}
              <button
                onClick={() => remove(p.id)}
                className="text-on-navy-muted hover:text-white"
                aria-label="Remove from compare"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={clear}
            className="text-[11px] text-on-navy-muted hover:text-white"
          >
            Clear
          </button>
          <Button
            size="sm"
            onClick={() => setOpen(true)}
            disabled={ids.length < 2}
            className="bg-teal hover:bg-teal-light text-white"
          >
            Compare ({ids.length})
          </Button>
        </div>
      </div>
    </div>
  );
}