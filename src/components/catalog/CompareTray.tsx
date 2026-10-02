import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { COMPARE_MAX, useCompare } from "@/context/CompareContext";
import { productBySlug } from "@/data/catalog";
import { familyById, gradeById } from "@/data/families";
import { packRange } from "@/lib/catalog-helpers";
import { Sci } from "@/lib/sci";
import { useFocusReturn } from "@/lib/use-focus-return";
import type { Product } from "@/types/catalog";
import { FamilyBadge, StageBadges } from "./Badges";

/** One line per grade: "FF  100 mg BSA/mL". */
function perGrade(product: Product, pick: (specs: Product["variants"][number]["specs"]) => string | undefined) {
  const lines = product.variants
    .map((v) => ({ key: v.id, grade: v.grade ? gradeById(v.grade).short : v.label, value: pick(v.specs) }))
    .filter((l) => l.value);
  if (!lines.length) return null;
  return (
    <ul className="space-y-1">
      {lines.map((l) => (
        <li key={l.key} className="flex gap-2">
          {product.variants.length > 1 && <span className="label w-7 shrink-0 pt-0.5 text-ink-3">{l.grade}</span>}
          <span>
            <Sci>{l.value!}</Sci>
          </span>
        </li>
      ))}
    </ul>
  );
}

function CompareTable({ products }: { products: Product[] }) {
  const commonLabels = Array.from(new Set(products.flatMap((p) => p.commonSpecs.map((s) => s.label))));
  const rows: { label: string; cell: (p: Product) => React.ReactNode }[] = [
    { label: "Type", cell: (p) => p.descriptor },
    { label: "Technique", cell: (p) => familyById(p.family).title },
    { label: "Stages", cell: (p) => <StageBadges stages={p.stages} /> },
    {
      label: "Binding capacity",
      cell: (p) =>
        perGrade(p, (specs) =>
          specs
            .filter((s) => s.label.startsWith("Binding capacity"))
            .map((s) => (s.label.includes(", ") ? `${s.value} (${s.label.split(", ")[1]})` : s.value))
            .join("; "),
        ),
    },
    {
      label: "Mean bead diameter",
      cell: (p) => perGrade(p, (specs) => specs.find((s) => s.label === "Mean bead diameter")?.value),
    },
    ...commonLabels.map((label) => ({
      label,
      cell: (p: Product) => {
        const v = p.commonSpecs.find((s) => s.label === label)?.value;
        return v ? <Sci>{v}</Sci> : null;
      },
    })),
    {
      label: "Pack sizes",
      cell: (p) =>
        p.variants.length ? (
          <ul className="space-y-1">
            {p.variants.map((v) => (
              <li key={v.id} className="flex gap-2">
                {p.variants.length > 1 && (
                  <span className="label w-7 shrink-0 pt-0.5 text-ink-3">
                    {v.grade ? gradeById(v.grade).short : v.label}
                  </span>
                )}
                <span>{packRange(v.packs)}</span>
              </li>
            ))}
          </ul>
        ) : null,
    },
  ];

  return (
    <table className="w-full min-w-[40rem] table-fixed border-collapse text-left">
      <caption className="sr-only">Product comparison</caption>
      <thead>
        <tr className="border-b border-ink">
          <td className="w-[22%]" />
          {products.map((p) => (
            <th key={p.slug} scope="col" className="px-4 pb-4 align-bottom">
              <FamilyBadge family={p.family} short />
              <p className="mt-2 text-lg font-semibold leading-tight tracking-tight">{p.name}</p>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          const cells = products.map((p) => row.cell(p));
          if (cells.every((c) => !c)) return null;
          return (
            <tr key={row.label} className="border-b border-rule">
              <th scope="row" className="py-3.5 pr-4 align-top text-[0.8125rem] font-medium text-ink-2">
                {row.label}
              </th>
              {cells.map((cell, i) => (
                <td key={products[i].slug} className="px-4 py-3.5 align-top text-[0.875rem] font-medium">
                  {cell || (
                    <span className="text-ink-3">
                      <span aria-hidden>–</span>
                      <span className="sr-only">Not specified</span>
                    </span>
                  )}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

/** Bar that appears once a product is picked for comparison, and the side-by-side dialog it opens. */
export function CompareTray() {
  const { slugs, isOpen, setOpen, remove, clear } = useCompare();
  const { pathname } = useLocation();
  const products = slugs.map((s) => productBySlug(s)).filter((p): p is Product => Boolean(p));
  // The tray belongs to the catalogue; elsewhere it would only cover the page.
  const inCatalogue = pathname.startsWith("/products");
  const focus = useFocusReturn();

  return (
    <>
      {products.length > 0 && inCatalogue && (
        <section
          aria-label="Product comparison"
          className="no-print pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-5 pr-20 sm:pb-6 sm:pr-4"
        >
          <div className="pointer-events-auto flex max-w-full items-center gap-3 rounded-full border border-ink-line bg-ink py-2 pl-5 pr-2 text-paper shadow-[0_18px_40px_-16px_hsl(var(--ink)/0.7)] animate-fade-up">
            <p className="hidden text-[0.8125rem] text-on-ink-2 sm:block">
              Compare
              <span className="ml-1.5 tabular-nums">
                {products.length}/{COMPARE_MAX}
              </span>
            </p>
            <ul className="hidden items-center gap-1.5 md:flex">
              {products.map((p) => (
                <li
                  key={p.slug}
                  className="flex items-center gap-1 rounded-full bg-ink-raised py-1 pl-3 pr-1 text-[0.8125rem] font-medium"
                >
                  {p.name}
                  <button
                    type="button"
                    onClick={() => remove(p.slug)}
                    className="grid h-6 w-6 place-items-center rounded-full text-on-ink-2 hover:bg-ink-line hover:text-paper"
                    aria-label={`Remove ${p.name} from the comparison`}
                  >
                    <X aria-hidden className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
            <p className="text-[0.8125rem] font-medium md:hidden">
              {products.length} {products.length === 1 ? "product" : "products"}
            </p>
            <Button
              size="sm"
              variant="signal"
              onClick={() => {
                focus.remember();
                setOpen(true);
              }}
              disabled={products.length < 2}
            >
              {products.length < 2 ? "Pick one more" : "Compare"}
            </Button>
            <button
              type="button"
              onClick={clear}
              className="grid h-9 w-9 place-items-center rounded-full text-on-ink-2 hover:bg-ink-raised hover:text-paper"
              aria-label="Clear the comparison"
            >
              <X aria-hidden className="h-4 w-4" />
            </button>
          </div>
        </section>
      )}

      <Dialog open={isOpen && products.length > 0} onOpenChange={setOpen}>
        <DialogContent
          onCloseAutoFocus={focus.restore}
          className="max-h-[90vh] max-w-5xl gap-0 overflow-hidden rounded-lg border-rule bg-card p-0 sm:rounded-panel"
        >
          <div className="border-b border-rule px-6 pb-5 pt-6 sm:px-8">
            <p className="label text-ink-3">Compare</p>
            <DialogTitle className="heading-4 mt-2">Side by side</DialogTitle>
            <DialogDescription className="sr-only">
              Specifications of the selected product lines, shown next to each other.
            </DialogDescription>
          </div>
          {/* Scrollable regions must be reachable from the keyboard. */}
          <div
            tabIndex={0}
            role="region"
            aria-label="Comparison table"
            className="relative max-h-[calc(90vh-11rem)] overflow-auto px-6 py-6 sm:px-8"
          >
            <CompareTable products={products} />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-rule px-6 py-4 sm:px-8">
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
              {products.map((p) => (
                <Link key={p.slug} to={`/products/${p.slug}`} onClick={() => setOpen(false)} className="link">
                  {p.name}
                </Link>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={clear}>
              Clear comparison
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
