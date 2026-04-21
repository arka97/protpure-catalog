import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FilterSidebar } from "@/components/products/FilterSidebar";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductDetailModal } from "@/components/products/ProductDetailModal";
import { products, Product } from "@/data/products";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { CompareBar } from "@/components/products/CompareBar";
import { CompareModal } from "@/components/products/CompareModal";

export default function Products() {
  const [params, setParams] = useSearchParams();
  const [selected, setSelected] = useState<Product | null>(null);

  const type = params.get("type");
  const exchanger = params.get("exchanger");
  const status = params.get("status");
  const ids = params.get("ids");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (type && p.chromatographyType !== type) return false;
      if (exchanger && p.exchangerType !== exchanger) return false;
      if (status && p.status !== status) return false;
      if (ids && !ids.split(",").includes(p.id)) return false;
      return true;
    });
  }, [type, exchanger, status, ids]);

  const updateParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value === null) next.delete(key);
    else next.set(key, value);
    next.delete("ids");
    setParams(next);
  };

  const clearAll = () => setParams(new URLSearchParams());

  const sidebar = (
    <FilterSidebar
      products={products}
      type={type}
      exchanger={exchanger}
      status={status}
      onChange={updateParam}
      onClear={clearAll}
    />
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-navy hex-pattern relative">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-12 relative">
            <div className="text-[11px] font-semibold tracking-[0.15em] text-teal-bright uppercase mb-3">
              Catalog
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-white mb-2">Products</h1>
            <p className="text-sm text-on-navy max-w-2xl">
              {filtered.length} of {products.length} resins · agarose-based, BioProcess grade,
              shipped from Anand, Gujarat.
            </p>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-10">
          <div className="md:hidden mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 overflow-y-auto">
                <div className="mt-8">{sidebar}</div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="grid md:grid-cols-[220px_1fr] gap-8">
            <div className="hidden md:block sticky top-24 self-start">{sidebar}</div>

            <div>
              {filtered.length === 0 ? (
                <div className="bg-white border border-dashed border-border rounded-xl p-12 text-center">
                  <p className="text-slate mb-3">No products match these filters.</p>
                  <Button variant="outline" onClick={clearAll}>
                    Clear filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.map((p) => (
                    <ProductCard key={p.id} product={p} onOpen={() => setSelected(p)} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ProductDetailModal product={selected} onClose={() => setSelected(null)} />
      <CompareBar />
      <CompareModal />
    </div>
  );
}