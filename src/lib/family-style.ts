import type { Family } from "@/types/catalog";

/*
  Static Tailwind class names for each family colour (Tailwind cannot see dynamically built class names).
*/
export const FAMILY_STYLE: Record<
  Family["color"],
  { dot: string; tint: string; fill: string; border: string; text: string }
> = {
  imac: { dot: "bg-imac", tint: "bg-imac-tint", fill: "fill-imac", border: "border-imac/50", text: "text-imac" },
  iex: { dot: "bg-iex", tint: "bg-iex-tint", fill: "fill-iex", border: "border-iex/50", text: "text-iex" },
  hic: { dot: "bg-hic", tint: "bg-hic-tint", fill: "fill-hic", border: "border-hic/50", text: "text-hic" },
  mrc: { dot: "bg-mrc", tint: "bg-mrc-tint", fill: "fill-mrc", border: "border-mrc/50", text: "text-mrc" },
  sec: { dot: "bg-sec", tint: "bg-sec-tint", fill: "fill-sec", border: "border-sec/50", text: "text-sec" },
  fmt: { dot: "bg-fmt", tint: "bg-fmt-tint", fill: "fill-fmt", border: "border-fmt/50", text: "text-fmt" },
};
