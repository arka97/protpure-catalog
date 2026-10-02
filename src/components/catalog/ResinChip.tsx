import { Link } from "react-router-dom";
import type { ResinRef } from "@/data/applications";
import { productBySlug } from "@/data/catalog";
import { familyById, gradeById } from "@/data/families";
import type { FamilyId } from "@/types/catalog";
import { FAMILY_STYLE } from "@/lib/family-style";
import { cn } from "@/lib/utils";

/** Family a recommendation points at: a product page or a filtered catalogue view. */
function familyOf(href: string): FamilyId | undefined {
  const product = /^\/products\/([^?#]+)/.exec(href);
  if (product) return productBySlug(product[1])?.family;
  const family = /[?&]family=([a-z]+)/.exec(href);
  return family ? (family[1] as FamilyId) : undefined;
}

/** A recommended resin, linking to its product page (or to the family when the sheet names a whole class). */
export function ResinChip({ resin, className }: { resin: ResinRef; className?: string }) {
  const familyId = familyOf(resin.href);
  const family = familyId ? familyById(familyId) : undefined;
  return (
    <Link
      to={resin.href}
      className={cn(
        "group inline-flex min-h-9 items-center gap-2 rounded-full border border-rule bg-card py-1 pl-3 pr-3 text-[0.875rem] font-medium leading-tight transition-colors hover:border-ink",
        className,
      )}
    >
      {family &&
        (family.twoTone ? (
          <span aria-hidden className="flex h-2 w-2 shrink-0 overflow-hidden rounded-full">
            <span className="h-full w-1/2 bg-iex" />
            <span className="h-full w-1/2 bg-hic" />
          </span>
        ) : (
          <span aria-hidden className={cn("h-2 w-2 shrink-0 rounded-full", FAMILY_STYLE[family.color].dot)} />
        ))}
      <span>{resin.label}</span>
      {resin.grade && (
        <abbr
          title={gradeById(resin.grade).name}
          className="label rounded bg-paper-2 px-1.5 py-0.5 text-ink-2 no-underline"
        >
          {gradeById(resin.grade).short}
        </abbr>
      )}
    </Link>
  );
}
