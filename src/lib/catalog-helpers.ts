import type { Pack, Product, Variant } from "@/types/catalog";
import type { RFQItem } from "@/lib/enquiry";

/** "5 mL – 1 L" for a list of packs; both sizes when there are only two. */
export function packRange(packs: Pack[]) {
  if (!packs.length) return "";
  // Column packs ("1 × 5 mL", "5 × 5 mL") read better as "1 or 5 × 5 mL".
  const multiples = packs.map((p) => /^(\d+) × (.+)$/.exec(p.size));
  if (packs.length > 1 && multiples.every((m) => m && m[2] === multiples[0]![2])) {
    return `${multiples.map((m) => m![1]).join(" or ")} × ${multiples[0]![2]}`;
  }
  if (packs.length <= 2) return packs.map((p) => p.size).join(" / ");
  return `${packs[0].size} – ${packs[packs.length - 1].size}`;
}

/** The one figure worth showing next to a grade in a list: binding capacity, else bead size. */
export function variantHeadline(variant: Variant) {
  const capacities = variant.specs.filter((s) => s.label.startsWith("Binding capacity"));
  if (capacities.length) {
    return capacities
      .map((s) => {
        const mode = s.label.split(", ")[1];
        return mode ? `${s.value} in ${mode}` : `${s.value} capacity`;
      })
      .join(" · ");
  }
  const diameter = variant.specs.find((s) => s.label === "Mean bead diameter");
  return diameter ? `${diameter.value} mean bead diameter` : undefined;
}

/** Quote-list entry for one pack of a variant. */
export function packToItem(product: Product, variant: Variant, pack: Pack): Omit<RFQItem, "quantity" | "notes"> {
  return {
    id: pack.catNo,
    kind: "product",
    name: variant.name,
    catNo: pack.catNo,
    pack: pack.size,
    href: `/products/${product.slug}`,
    variantId: variant.id,
  };
}
