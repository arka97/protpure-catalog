import { packToItem } from "@/lib/catalog-helpers";
import { cn } from "@/lib/utils";
import type { Product, Variant } from "@/types/catalog";
import { AddToQuote } from "./AddToQuote";

/** A number never separates from its unit when a pack size wraps: "250 mL / 300 mL" breaks after the slash. */
const keepUnits = (size: string) => size.replace(/(\d) (?=[A-Za-zµ])/g, "$1\u00a0");

/** Catalogue numbers and pack sizes for one grade or format, each with an "add to quote" button. */
export function PackTable({ product, variant, className }: { product: Product; variant: Variant; className?: string }) {
  return (
    <table className={cn("w-full border-collapse text-left", className)}>
      <caption className="sr-only">Catalogue numbers and pack sizes for {variant.name}</caption>
      <thead>
        <tr className="label border-b border-ink text-ink-3">
          <th scope="col" className="whitespace-nowrap py-2.5 pr-4 font-medium">
            Cat. no.
          </th>
          <th scope="col" className="whitespace-nowrap py-2.5 pr-4 font-medium">
            Pack size
          </th>
          <th scope="col" className="py-2.5 text-right font-medium">
            <span className="sr-only">Add to quote list</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {variant.packs.map((pack) => (
          <tr key={pack.catNo} className="border-b border-rule">
            <td className="whitespace-nowrap py-3 pr-4 font-mono text-[0.875rem] font-medium tracking-wide">
              {pack.catNo}
            </td>
            <td className="py-3 pr-3 text-[0.9375rem] font-semibold tabular-nums">{keepUnits(pack.size)}</td>
            <td className="py-2 text-right">
              <AddToQuote item={packToItem(product, variant, pack)} label="Add" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
