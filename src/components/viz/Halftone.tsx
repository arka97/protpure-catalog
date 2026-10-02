import { useMemo } from "react";
import type { FamilyId } from "@/types/catalog";
import { cn } from "@/lib/utils";

/*
  Halftone "bead field": a square grid of dots whose size follows a pattern. Each chromatography family
  has its own pattern, so the illustration says something about the technique:

  imac   — dense at the centre, like ligands around a metal ion
  iex    — two poles, opposite charges
  hic    — a diagonal wave, the salt gradient
  mixed  — the ion-exchange and HIC patterns interleaved in two colours
  mrc    — a ring, the chelate that holds the metal
  sec    — large to small, separation by size
  others — an even field
*/

type Pattern = (x: number, y: number) => number;

const clamp = (v: number) => Math.max(0, Math.min(1, v));

const PATTERNS: Record<string, Pattern> = {
  imac: (x, y) => clamp(1.08 - Math.hypot(x, y) * 1.05),
  iex: (x, y) => clamp(Math.pow(Math.abs(y), 0.85) * (1.05 - Math.abs(x) * 0.25)),
  hic: (x, y) => clamp(0.5 + 0.5 * Math.sin((x + y) * 2.6 + 0.6)),
  mrc: (x, y) => clamp(Math.exp(-Math.pow((Math.hypot(x, y) - 0.62) / 0.2, 2)) * 1.05),
  sec: (x, y) => clamp(0.12 + 0.92 * (1 - (x + 1) / 2) * (1 - Math.abs(y) * 0.12)),
  flat: () => 0.42,
};

const FILL: Record<string, string> = {
  imac: "fill-imac",
  iex: "fill-iex",
  hic: "fill-hic",
  mrc: "fill-mrc",
  sec: "fill-sec",
  flat: "fill-fmt",
};

interface HalftoneProps {
  family: FamilyId;
  className?: string;
  /** Dots per side. */
  cells?: number;
}

export function Halftone({ family, className, cells = 13 }: HalftoneProps) {
  const dots = useMemo(() => {
    const pitch = 100 / cells;
    const max = pitch * 0.47;
    const out: { cx: number; cy: number; r: number; fill: string }[] = [];
    for (let row = 0; row < cells; row++) {
      for (let col = 0; col < cells; col++) {
        const x = ((col + 0.5) / cells) * 2 - 1;
        const y = ((row + 0.5) / cells) * 2 - 1;
        let key: string = family in PATTERNS ? family : "flat";
        if (family === "mixed") key = (row + col) % 2 === 0 ? "iex" : "hic";
        const size = PATTERNS[key](x, y);
        const r = max * size;
        if (r < 0.35) continue;
        out.push({ cx: (col + 0.5) * pitch, cy: (row + 0.5) * pitch, r, fill: FILL[key] });
      }
    }
    return out;
  }, [family, cells]);

  return (
    <svg viewBox="0 0 100 100" aria-hidden className={cn("block", className)}>
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx.toFixed(2)} cy={d.cy.toFixed(2)} r={d.r.toFixed(2)} className={d.fill} />
      ))}
    </svg>
  );
}
