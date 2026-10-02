import { Link } from "react-router-dom";
import { ArrowRight, Check, Scale } from "lucide-react";
import { useCompare } from "@/context/CompareContext";
import { EMPTY_COLUMNS } from "@/data/hardware";
import { packRange, variantHeadline } from "@/lib/catalog-helpers";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/catalog";
import { FamilyBadge, GradeBadge, NewTag } from "./Badges";

interface ProductLineCardProps {
  product: Product;
  /** Heading level, so the card fits the page outline. */
  as?: "h2" | "h3";
  /** Hide the compare control (e.g. inside "related products"). */
  compact?: boolean;
  className?: string;
}

/** A product line in the catalogue: what it is, its grades, the headline figure and the pack range. */
export function ProductLineCard({ product, as: H = "h3", compact, className }: ProductLineCardProps) {
  const compare = useCompare();
  const selected = compare.has(product.slug);
  const comparable = product.kind === "resin";

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-panel border border-rule bg-card p-6 transition-[border-color,box-shadow] duration-200 hover:border-ink/60 hover:shadow-[0_24px_50px_-32px_hsl(var(--ink)/0.45)] sm:p-7",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <FamilyBadge family={product.family} />
        {product.isNew && <NewTag />}
      </div>

      <H className="heading-4 mt-5">
        <Link
          to={`/products/${product.slug}`}
          className="after:absolute after:inset-0 after:rounded-panel after:content-['']"
        >
          {product.name}
        </Link>
      </H>
      <p className="mt-1.5 text-[0.9375rem] font-medium text-ink-2">{product.descriptor}</p>

      {!compact && <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-2">{product.summary}</p>}

      {product.variants.length > 0 ? (
        <ul className="mt-6 divide-y divide-rule border-y border-rule">
          {product.variants.map((v) => {
            const headline = variantHeadline(v);
            return (
              <li key={v.id} className="py-3">
                <div className="flex items-center justify-between gap-3">
                  {v.grade && product.kind === "resin" ? (
                    <GradeBadge grade={v.grade} />
                  ) : (
                    <span className="text-[0.875rem] font-semibold">{v.label}</span>
                  )}
                  <span className="code text-right text-ink-2">{packRange(v.packs)}</span>
                </div>
                {headline && <p className="mt-1.5 text-[0.8125rem] leading-snug text-ink-2">{headline}</p>}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="code mt-6 border-y border-rule py-3 text-ink-2">
          {EMPTY_COLUMNS.length} sizes · 16, 26 and 50 mm
        </p>
      )}

      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
        <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold">
          <span className="sm:hidden">Specs and packs</span>
          <span className="hidden sm:inline">Specifications and packs</span>
          <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
        {!compact && comparable && (
          <button
            type="button"
            onClick={() => compare.toggle(product.slug)}
            aria-pressed={selected}
            className={cn(
              "relative z-10 inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-[0.8125rem] font-medium transition-colors",
              selected
                ? "border-ink bg-ink text-paper"
                : "border-rule text-ink-2 hover:border-ink hover:text-foreground",
            )}
          >
            {selected ? <Check aria-hidden className="h-3.5 w-3.5" /> : <Scale aria-hidden className="h-3.5 w-3.5" />}
            Compare
            <span className="sr-only"> {product.name}</span>
          </button>
        )}
      </div>
    </article>
  );
}
