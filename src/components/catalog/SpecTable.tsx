import { GradeBadge } from "./Badges";
import { Sci } from "@/lib/sci";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/catalog";

interface SpecTableProps {
  product: Product;
  /** Variant to emphasise (e.g. the grade a visitor arrived for). */
  activeId?: string;
  className?: string;
}

/**
 * Specifications of a product line. Grade-specific values sit side by side; values shared by every
 * grade follow underneath. On small screens the grades stack.
 */
export function SpecTable({ product, activeId, className }: SpecTableProps) {
  const variants = product.variants.filter((v) => v.specs.length > 0);
  const labels = Array.from(new Set(variants.flatMap((v) => v.specs.map((s) => s.label))));
  const value = (variantIndex: number, label: string) =>
    variants[variantIndex].specs.find((s) => s.label === label)?.value;
  const sideBySide = variants.length > 1;

  return (
    <div className={className}>
      {sideBySide && (
        <>
          {/* Wide screens: one column per grade */}
          <table className="hidden w-full table-fixed border-collapse text-left md:table">
            <caption className="sr-only">{product.name}: specifications by grade</caption>
            <thead>
              <tr className="border-b border-ink">
                <th scope="col" className="label w-[26%] py-3 pr-4 align-bottom font-medium text-ink-3">
                  By grade
                </th>
                {variants.map((v) => (
                  <th
                    key={v.id}
                    scope="col"
                    className={cn("px-4 py-3 align-bottom", v.id === activeId && "rounded-t-lg bg-paper-2")}
                  >
                    {v.grade && product.kind === "resin" ? (
                      <GradeBadge grade={v.grade} active={v.id === activeId} />
                    ) : (
                      <span className="text-[0.9375rem] font-semibold">{v.label}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {labels.map((label) => (
                <tr key={label} className="border-b border-rule">
                  <th scope="row" className="py-3.5 pr-4 align-top text-[0.875rem] font-medium text-ink-2">
                    {label}
                  </th>
                  {variants.map((v, i) => (
                    <td
                      key={v.id}
                      className={cn(
                        "px-4 py-3.5 align-top text-[0.9375rem] font-semibold",
                        v.id === activeId && "bg-paper-2",
                      )}
                    >
                      {value(i, label) ? (
                        <Sci>{value(i, label)!}</Sci>
                      ) : (
                        <span className="font-normal text-ink-3">
                          <span aria-hidden>–</span>
                          <span className="sr-only">Not specified</span>
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Small screens: one block per grade */}
          <div className="space-y-6 md:hidden">
            {variants.map((v) => (
              <div key={v.id} className={cn("rounded-lg border border-rule p-4", v.id === activeId && "border-ink")}>
                {v.grade && product.kind === "resin" ? (
                  <GradeBadge grade={v.grade} active={v.id === activeId} />
                ) : (
                  <p className="text-[0.9375rem] font-semibold">{v.label}</p>
                )}
                <dl className="mt-3 divide-y divide-rule">
                  {v.specs.map((s) => (
                    <div key={s.label} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-3 py-2.5">
                      <dt className="text-[0.8125rem] text-ink-2">{s.label}</dt>
                      <dd className="text-[0.875rem] font-semibold">
                        <Sci>{s.value}</Sci>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </>
      )}

      {(product.commonSpecs.length > 0 || !sideBySide) && (
        <table className={cn("w-full border-collapse text-left", sideBySide && "mt-10")}>
          <caption className={cn("label pb-3 text-left text-ink-3", !sideBySide && "sr-only")}>
            {sideBySide ? "All grades" : `${product.name}: specifications`}
          </caption>
          <tbody className="border-t border-ink">
            {[...(!sideBySide ? (variants[0]?.specs ?? []) : []), ...product.commonSpecs].map((s) => (
              <tr key={s.label} className="border-b border-rule">
                <th
                  scope="row"
                  className="w-[38%] py-3.5 pr-4 align-top text-[0.875rem] font-medium text-ink-2 md:w-[26%]"
                >
                  {s.label}
                </th>
                <td className="py-3.5 align-top text-[0.9375rem] font-semibold md:px-4">
                  <Sci>{s.value}</Sci>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {product.notes && product.notes.length > 0 && (
        <ul className="mt-5 space-y-1 text-[0.8125rem] text-ink-3">
          {product.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
