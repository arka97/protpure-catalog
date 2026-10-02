import { useId } from "react";
import type { IllustrationId } from "@/data/product-visuals";
import { cn } from "@/lib/utils";

/*
  Drawings for the product lines the client has no picture of yet. They show the principle, not the product:
  the bead surface at the bottom, its ligands or pores, and what they hold or let pass. No scale, no structure data.
  On a product page the caption under the drawing starts with "Illustration" (see src/data/product-visuals.ts).

  The bead scenes share one geometry: a large bead whose surface arcs across the bottom of the frame.
  `detail` shows a close-up of the same drawing, for small sizes.

  The drawings always stand on the white plate, so they use only colours that a dark section does not re-map:
  ink, plate, paper-2, signal and the family colours.
*/

const W = 320;
const H = 220;

/* The bead: a circle far larger than the frame, so only its top shows. */
const BEAD = { cx: 160, cy: 510, r: 340 };

const rad = (deg: number) => (deg * Math.PI) / 180;

/** A point `lift` above the bead surface, `deg` degrees from the top of the bead. */
function above(deg: number, lift: number) {
  const t = rad(deg);
  return { x: BEAD.cx + (BEAD.r + lift) * Math.sin(t), y: BEAD.cy - (BEAD.r + lift) * Math.cos(t) };
}

const LIGANDS = [-20, -12, -4, 4, 12, 20];
const STALK = 28;
/** Height of whatever sits in the cup at the end of a ligand. */
const SEAT = STALK + 9.5;

type Tint = "iex" | "mrc" | "imac" | "sec";

const BEAD_STYLE: Record<Tint, { fill: string; stroke: string; pore: string }> = {
  iex: { fill: "fill-iex-tint", stroke: "stroke-iex", pore: "fill-iex/25" },
  mrc: { fill: "fill-mrc-tint", stroke: "stroke-mrc", pore: "fill-mrc/25" },
  imac: { fill: "fill-imac-tint", stroke: "stroke-imac", pore: "fill-imac/25" },
  sec: { fill: "fill-sec-tint", stroke: "stroke-sec", pore: "fill-sec/25" },
};

/** The bead. `texture` adds rows of dots that follow the curve of the surface. */
function Bead({ tint, texture = true }: { tint: Tint; texture?: boolean }) {
  const s = BEAD_STYLE[tint];
  const dots = texture
    ? [-13, -28, -43].flatMap((lift, rowIndex) =>
        Array.from({ length: 14 }, (_, i) => above(-28 + i * 4.3 + (rowIndex % 2 ? 2.15 : 0), lift)),
      )
    : [];
  return (
    <g>
      <circle cx={BEAD.cx} cy={BEAD.cy} r={BEAD.r} className={cn(s.fill, s.stroke)} strokeWidth="1.6" />
      {dots.map((p, i) => (
        <circle key={i} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r="2.6" className={s.pore} />
      ))}
    </g>
  );
}

function Stalk({ deg }: { deg: number }) {
  const a = above(deg, 0);
  const b = above(deg, STALK);
  return (
    <line
      x1={a.x.toFixed(1)}
      y1={a.y.toFixed(1)}
      x2={b.x.toFixed(1)}
      y2={b.y.toFixed(1)}
      className="stroke-ink"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  );
}

/** A cup at the end of a ligand, open away from the bead: the chelating group. */
function Cup({ deg, className }: { deg: number; className: string }) {
  const c = above(deg, STALK + 7);
  return (
    <path
      d="M-7.5 -1 A7.5 7.5 0 0 0 7.5 -1"
      transform={`translate(${c.x.toFixed(1)} ${c.y.toFixed(1)}) rotate(${deg})`}
      fill="none"
      className={className}
      strokeWidth="2.6"
      strokeLinecap="round"
    />
  );
}

/** Seven close-packed dots: a globular protein. */
function Globule({ x, y, r, className }: { x: number; y: number; r: number; className: string }) {
  return (
    <g className={className}>
      <circle cx={x.toFixed(1)} cy={y.toFixed(1)} r={r} />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const t = rad(30 + i * 60);
        return (
          <circle key={i} cx={(x + 2 * r * Math.cos(t)).toFixed(1)} cy={(y + 2 * r * Math.sin(t)).toFixed(1)} r={r} />
        );
      })}
    </g>
  );
}

/* ------------------------------------------------------------------ Hy-Ionic DP: two ligands on one bead */

function MixedMode() {
  const deae = above(-12, STALK + 8);
  const phenyl = above(12, STALK + 8);
  return (
    <>
      <Bead tint="iex" />
      {LIGANDS.map((deg, i) => {
        const tip = above(deg, STALK + 8);
        return (
          <g key={deg}>
            <Stalk deg={deg} />
            {i % 2 ? (
              <g transform={`translate(${tip.x.toFixed(1)} ${tip.y.toFixed(1)})`}>
                <circle r="8.5" className="fill-iex" />
                <path d="M-4 0H4M0 -4V4" className="stroke-plate" strokeWidth="2" strokeLinecap="round" />
              </g>
            ) : (
              <g transform={`translate(${tip.x.toFixed(1)} ${tip.y.toFixed(1)}) rotate(${deg})`}>
                <path
                  d="M0 -9.5 L8.2 -4.75 L8.2 4.75 L0 9.5 L-8.2 4.75 L-8.2 -4.75 Z"
                  className="fill-plate stroke-hic"
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                />
                <circle r="3.6" fill="none" className="stroke-hic" strokeWidth="1.6" />
              </g>
            )}
          </g>
        );
      })}
      {/* A negatively charged protein over a DEAE group */}
      <Globule x={deae.x - 4} y={deae.y - 44} r={8.6} className="fill-ink/20" />
      <path
        d={`M${(deae.x - 22).toFixed(1)} ${(deae.y - 53).toFixed(1)}h7m8 -8h7m4 30h7`}
        className="stroke-ink"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* A protein with a hydrophobic patch over a phenyl group */}
      <Globule x={phenyl.x + 4} y={phenyl.y - 44} r={8.6} className="fill-ink/20" />
      <circle cx={(phenyl.x + 4).toFixed(1)} cy={(phenyl.y - 26.8).toFixed(1)} r="8.6" className="fill-hic/55" />
      <circle cx={(phenyl.x - 10.9).toFixed(1)} cy={(phenyl.y - 35.4).toFixed(1)} r="8.6" className="fill-hic/55" />
    </>
  );
}

/* ------------------------------------------------------------------ MR Agarose: metal held, product passes */

function MetalRemoval() {
  const held = [0, 1, 3, 4];
  const free = [above(-4.8, SEAT + 27), above(18.7, SEAT + 22)];
  const peptide = [0, 1, 2, 3, 4, 5, 6].map((i) => ({ x: 46 + i * 13.5, y: 62 + (i % 2 ? 7 : -7) }));
  return (
    <>
      <Bead tint="mrc" />
      {LIGANDS.map((deg, i) => {
        const ion = above(deg, SEAT);
        return (
          <g key={deg}>
            <Stalk deg={deg} />
            <Cup deg={deg} className="stroke-mrc" />
            {held.includes(i) && <circle cx={ion.x.toFixed(1)} cy={ion.y.toFixed(1)} r="5.8" className="fill-signal" />}
          </g>
        );
      })}
      {/* Ions still in solution */}
      {free.map((p, i) => (
        <circle key={i} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r="5.8" className="fill-signal" />
      ))}
      {/* The product: a peptide the resin does not hold, moving on */}
      <polyline
        points={peptide.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        className="stroke-ink/40"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {peptide.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="6" className="fill-ink" />
      ))}
      <path
        d="M152 62H284M275 54l9 8l-9 8"
        fill="none"
        className="stroke-ink/60"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

/* ------------------------------------------------------------------ Ni-NTA: a His-tag held by nickel */

function HisTag() {
  // Two residues of the tag sit on the nickel ions at 4 and 12 degrees; three arch between them and one leads back
  // to the protein.
  const first = above(4, SEAT + 10.8);
  const second = above(12, SEAT + 10.8);
  const lead = { x: first.x - 12, y: first.y - 8.5 };
  const arch = [0.25, 0.5, 0.75].map((t) => ({
    x: first.x + (second.x - first.x) * t,
    y: first.y + (second.y - first.y) * t - 13 * Math.sin(t * Math.PI),
  }));
  return (
    <>
      <Bead tint="imac" />
      {LIGANDS.map((deg) => {
        const ion = above(deg, SEAT);
        return (
          <g key={deg}>
            <Stalk deg={deg} />
            <Cup deg={deg} className="stroke-ink" />
            <circle cx={ion.x.toFixed(1)} cy={ion.y.toFixed(1)} r="5.8" className="fill-imac" />
          </g>
        );
      })}
      <Globule x={lead.x - 29} y={lead.y - 20.5} r={10.2} className="fill-ink/20" />
      {[lead, first, ...arch, second].map((p, i) => (
        <circle key={i} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r="4.6" className="fill-signal" />
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ Size exclusion and desalting: what fits the pores */

/* Pores: where they open on the bead surface, how deep they run, and the small molecules inside (x across, y inwards). */
const PORES: { deg: number; depth: number; inside: [number, number][] }[] = [
  {
    deg: -17,
    depth: 40,
    inside: [
      [-2, 13],
      [2.5, 27],
    ],
  },
  {
    deg: -6,
    depth: 52,
    inside: [
      [2, 10],
      [-2.5, 24],
      [2, 38],
    ],
  },
  {
    deg: 5,
    depth: 46,
    inside: [
      [-2, 20],
      [2.5, 33],
    ],
  },
  {
    deg: 16,
    depth: 42,
    inside: [
      [1.5, 12],
      [-2, 28],
    ],
  },
];

const PORE_HALF = 9.5;

/** Small molecules still above the bead: degrees from the top, height above the surface. */
const DRIFTING: [number, number][] = [
  [-12, 13],
  [-1, 21],
  [10.5, 11],
  [21, 17],
];

/** `salt`: the small molecules are salt (desalting). Otherwise they are small proteins (size exclusion). */
function SizeExclusion({ salt }: { salt?: boolean }) {
  const small = salt ? { r: 3.7, fill: "fill-signal" } : { r: 4.6, fill: "fill-ink" };
  const blocked = above(5, 33);
  return (
    <>
      <Bead tint="sec" texture={false} />
      {PORES.map((pore) => {
        const mouth = above(pore.deg, 0);
        const d = pore.depth - PORE_HALF;
        return (
          <g key={pore.deg} transform={`translate(${mouth.x.toFixed(1)} ${mouth.y.toFixed(1)}) rotate(${pore.deg})`}>
            {/* The channel is open at the surface: its fill covers the outline of the bead there. */}
            <path
              d={`M${-PORE_HALF} -1.2V${d}A${PORE_HALF} ${PORE_HALF} 0 0 0 ${PORE_HALF} ${d}V-1.2Z`}
              className="fill-plate"
            />
            <path
              d={`M${-PORE_HALF} -0.4V${d}A${PORE_HALF} ${PORE_HALF} 0 0 0 ${PORE_HALF} ${d}V-0.4`}
              fill="none"
              className="stroke-sec"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            {pore.inside.map(([x, y]) => (
              <circle key={y} cx={x} cy={y} r={small.r} className={small.fill} />
            ))}
          </g>
        );
      })}
      {DRIFTING.map(([deg, lift]) => {
        const p = above(deg, lift);
        return <circle key={deg} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r={small.r} className={small.fill} />;
      })}
      {/* A large protein over a pore it cannot enter, and one that has already moved on */}
      <Globule x={blocked.x} y={blocked.y} r={7} className="fill-ink/20" />
      <Globule x={84} y={72} r={7} className="fill-ink/20" />
      <path
        d="M152 72H284M275 64l9 8l-9 8"
        fill="none"
        className="stroke-ink/60"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

const SizeExclusionScene = () => <SizeExclusion />;
const DesaltingScene = () => <SizeExclusion salt />;

/* ------------------------------------------------------------------ Empty columns: one end or both ends adjustable */

function Column({ cx, both }: { cx: number; both: boolean }) {
  const half = 26; // inner half-width of the glass tube
  const top = both ? 62 : 70; // lower face of the upper adaptor
  const bottom = both ? 150 : 180; // upper face of the lower support
  // Unique per instance: the same drawing can be on a page twice (page header and product card).
  const clip = `bed-${useId().replace(/:/g, "")}`;
  const beads: { x: number; y: number }[] = [];
  for (let y = top + 4, r = 0; y < bottom + 4; y += 8.4, r++) {
    for (let x = cx - half + (r % 2 ? 4.8 : 0); x < cx + half + 4; x += 9.6) beads.push({ x, y });
  }
  const arrow = (y: number) => (
    <path
      d={`M${cx + 46} ${y - 13}V${y + 13}M${cx + 41} ${y - 8}l5 -5l5 5M${cx + 41} ${y + 8}l5 5l5 -5`}
      fill="none"
      className="stroke-signal"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
  return (
    <g>
      <defs>
        <clipPath id={clip}>
          <rect x={cx - half} y={top} width={half * 2} height={bottom - top} />
        </clipPath>
      </defs>
      {/* Inlet and outlet */}
      <rect x={cx - 3} y="2" width="6" height="22" className="fill-ink/20" />
      <rect x={cx - 3} y="198" width="6" height="22" className="fill-ink/20" />
      {/* Glass tube */}
      <rect
        x={cx - half - 1.6}
        y="28"
        width={half * 2 + 3.2}
        height="162"
        rx="5"
        className="fill-plate stroke-ink"
        strokeWidth="1.6"
      />
      {/* Packed bed */}
      <g clipPath={`url(#${clip})`}>
        <rect x={cx - half} y={top} width={half * 2} height={bottom - top} className="fill-paper-2" />
        {beads.map((b, i) => (
          <circle
            key={i}
            cx={b.x.toFixed(1)}
            cy={b.y.toFixed(1)}
            r="3.9"
            className="fill-plate stroke-ink/25"
            strokeWidth="0.6"
          />
        ))}
      </g>
      {/* Upper adaptor: movable on every column */}
      <rect x={cx - 2.5} y="30" width="5" height={top - 40} className="fill-ink" />
      <rect x={cx - half} y={top - 10} width={half * 2} height="10" rx="2" className="fill-signal" />
      {/* Lower end: a second adaptor, or the fixed bed support */}
      {both ? (
        <>
          <rect x={cx - half} y={bottom} width={half * 2} height="10" rx="2" className="fill-signal" />
          <rect x={cx - 2.5} y={bottom + 10} width="5" height={180 - bottom} className="fill-ink" />
        </>
      ) : (
        <rect x={cx - half} y={bottom} width={half * 2} height="5" className="fill-ink" />
      )}
      {/* End pieces */}
      <rect x={cx - 35} y="18" width="70" height="15" rx="4" className="fill-ink" />
      <rect x={cx - 35} y="187" width="70" height="15" rx="4" className="fill-ink" />
      {arrow(top - 5)}
      {both && arrow(bottom + 5)}
    </g>
  );
}

function EmptyColumns() {
  return (
    <>
      <Column cx={92} both={false} />
      <Column cx={218} both />
    </>
  );
}

type Box = [x: number, y: number, width: number, height: number];

interface Scene {
  label: string;
  /** The whole drawing. */
  frame: Box;
  /** Close-up shown at small sizes. */
  detail: Box;
  draw: () => JSX.Element;
}

/* The bead scenes leave the top of the frame empty. The pore scenes reach further into the bead. */
const BEAD_FRAME: Box = [0, 36, W, H - 36];
const PORE_FRAME: Box = [0, 46, W, H - 28];

const SCENES: Record<IllustrationId, Scene> = {
  "mixed-mode": {
    label:
      "Drawing of a resin bead carrying two kinds of ligand: charged DEAE groups and phenyl rings. One protein sits over a DEAE group, another over a phenyl ring.",
    frame: BEAD_FRAME,
    detail: [112, 92, 96, 128],
    draw: MixedMode,
  },
  "metal-removal": {
    label:
      "Drawing of a resin bead whose ligands hold metal ions, while a peptide passes above the bead without being held.",
    frame: BEAD_FRAME,
    detail: [164, 92, 96, 128],
    draw: MetalRemoval,
  },
  "his-tag": {
    label: "Drawing of a resin bead whose ligands carry nickel ions. The tag of a protein is held by two of them.",
    frame: BEAD_FRAME,
    detail: [162, 88, 96, 128],
    draw: HisTag,
  },
  "size-exclusion": {
    label:
      "Drawing of a porous resin bead. Small molecules have entered its pores; a large protein, too big for the pores, stays outside and moves on.",
    frame: PORE_FRAME,
    detail: [146, 110, 96, 128],
    draw: SizeExclusionScene,
  },
  desalting: {
    label:
      "Drawing of a porous resin bead. Salt has entered its pores; the protein, too big for the pores, stays outside and moves on.",
    frame: PORE_FRAME,
    detail: [146, 110, 96, 128],
    draw: DesaltingScene,
  },
  "empty-columns": {
    label:
      "Drawing of two glass columns with a packed bed. The left column has one movable adaptor, at the top. The right column has a movable adaptor at each end.",
    frame: [0, 0, W, H],
    detail: [44, 6, 108, 144],
    draw: EmptyColumns,
  },
};

interface ProductIllustrationProps {
  id: IllustrationId;
  /** Show a close-up, for thumbnails. */
  detail?: boolean;
  /** Hide it from assistive technology, e.g. on a card where the product name is right beside it. */
  decorative?: boolean;
  className?: string;
}

export function ProductIllustration({ id, detail, decorative, className }: ProductIllustrationProps) {
  const scene = SCENES[id];
  const Draw = scene.draw;
  return (
    <svg
      viewBox={(detail ? scene.detail : scene.frame).join(" ")}
      className={cn("block h-auto w-full", className)}
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": scene.label })}
    >
      <Draw />
    </svg>
  );
}
