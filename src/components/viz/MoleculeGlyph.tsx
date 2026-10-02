import { cn } from "@/lib/utils";

/*
  Application pictograms: the kind of molecule each application area purifies, drawn in the dot language of the
  logo and of the halftone bead fields. They are schematic (no scale, no structure data) and decorative:
  the application's name always stands next to them.

  Three tones: `a` the molecule (logo indigo), `b` a lighter second chain or domain,
  `c` the part the chromatography acts on (coral): a tag, a binding site, a payload, the salt.
*/

type Tone = "a" | "b" | "c";
type ToneAt = Tone | ((i: number) => Tone);
type Link = [x1: number, y1: number, x2: number, y2: number];

interface Dot {
  x: number;
  y: number;
  r: number;
  tone: Tone;
}

interface Glyph {
  dots: Dot[];
  /** Thin connectors drawn under the dots. */
  links?: Link[];
  /** Outline drawn under everything, e.g. the droplet. */
  outline?: string;
}

const rad = (deg: number) => (deg * Math.PI) / 180;
const dot = (x: number, y: number, r: number, tone: Tone = "a"): Dot => ({ x, y, r, tone });
const toneAt = (tone: ToneAt, i: number) => (typeof tone === "function" ? tone(i) : tone);

/** `n` dots on an arc from `from` to `to` degrees (0 = right, 90 = down). A full turn leaves out the last, duplicate dot. */
function arc(cx: number, cy: number, radius: number, n: number, r: number, tone: ToneAt, from = -90, to = 270) {
  const closed = Math.abs(to - from) >= 360;
  return Array.from({ length: n }, (_, i) => {
    const t = rad(from + ((to - from) * i) / (closed ? n : n - 1));
    return dot(cx + radius * Math.cos(t), cy + radius * Math.sin(t), r, toneAt(tone, i));
  });
}

/** `n` dots from one point to another, both ends included. */
function row(x1: number, y1: number, x2: number, y2: number, n: number, r: number, tone: ToneAt) {
  return Array.from({ length: n }, (_, i) => {
    const t = n === 1 ? 0 : i / (n - 1);
    return dot(x1 + (x2 - x1) * t, y1 + (y2 - y1) * t, r, toneAt(tone, i));
  });
}

/** Seven close-packed dots: a globular protein. */
const globule = (cx: number, cy: number, r: number, centre: Tone = "b") => [
  ...arc(cx, cy, r * 2, 6, r, "a", -60, 300),
  dot(cx, cy, r, centre),
];

/** Lines between consecutive dots: a chain. */
const chain = (dots: Dot[]): Link[] => dots.slice(1).map((d, i) => [dots[i].x, dots[i].y, d.x, d.y]);

/** The Fc stem shared by antibodies and Fc-fusion proteins: two heavy chains side by side. */
const stem = (top: number) => [
  ...row(53.4, top, 53.4, top + 27, 3, 6.6, "a"),
  ...row(66.6, top, 66.6, top + 27, 3, 6.6, "a"),
];

/** One antibody arm: heavy chain, light chain beside it, binding site at the tip. `side` is -1 (left) or 1 (right). */
function arm(side: 1 | -1) {
  const [ux, uy] = [side * 0.66, -0.75]; // along the arm
  const [nx, ny] = [side * 0.75, 0.66]; // across it, outwards
  const at = (along: number, across: number) => ({
    x: 60 + side * 8 + ux * along + nx * across,
    y: 60 + uy * along + ny * across,
  });
  const heavy = [3, 16.5, 30].map((d) => ({ ...at(d, 0), r: 6.6, tone: "a" as Tone }));
  const light = [16.5, 30].map((d) => ({ ...at(d, 12.6), r: 5.8, tone: "b" as Tone }));
  return [...heavy, ...light, { ...at(41.5, 6.3), r: 4.6, tone: "c" as Tone }];
}

const PEPTIDE = Array.from({ length: 8 }, (_, i) =>
  dot(14.5 + i * 13, 60 + (i % 2 ? 8.5 : -8.5), 6.4, i === 7 ? "c" : "a"),
);
const CAPSID = arc(60, 60, 42, 6, 7.6, "a");

const GLYPHS: Record<string, Glyph> = {
  /* A globular protein with a six-residue tag. */
  "recombinant-proteins": {
    dots: [...globule(46, 46, 10.6), ...arc(70, 104, 38, 6, 4, "c", -88, -10)],
  },

  /* The Y of an antibody: two heavy chains, two light chains, two binding sites. */
  "monoclonal-antibodies": { dots: [...stem(72), ...arm(-1), ...arm(1)] },

  /* An enzyme with a substrate in its active site. */
  enzymes: {
    dots: [
      ...arc(54, 60, 25, 7, 11, (i) => (i % 2 ? "b" : "a"), 52, 308),
      dot(54, 60, 11.4, "a"),
      dot(83.5, 60, 8, "c"),
    ],
  },

  /* A particle presenting antigens on its surface. */
  vaccines: {
    dots: [dot(60, 60, 19, "b"), ...arc(60, 60, 39, 10, 6, (i) => (i % 5 === 0 ? "c" : "a"))],
    links: arc(60, 60, 33, 10, 0, "a").map((tip, i) => {
      const t = rad(-90 + i * 36);
      return [60 + 19 * Math.cos(t), 60 + 19 * Math.sin(t), tip.x, tip.y];
    }),
  },

  /* An Fc-fusion protein: the Fc stem of an antibody carrying two other domains. */
  "protein-therapeutics": {
    dots: [...stem(74), dot(46, 60, 3.6, "a"), dot(74, 60, 3.6, "a"), dot(34, 40, 12, "c"), dot(86, 40, 12, "c")],
  },

  /* A short chain of residues. */
  peptides: { dots: PEPTIDE, links: chain(PEPTIDE) },

  /* A drop of plasma holding proteins of different sizes. */
  "plasma-proteins": {
    outline: "M60 8 C52 26 25 54 25 78 a35 35 0 0 0 70 0 C95 54 68 26 60 8 Z",
    dots: [
      dot(50, 74, 12.4, "a"),
      dot(74, 87, 8.6, "a"),
      dot(71, 62, 5.8, "c"),
      dot(56, 98, 5, "a"),
      dot(60, 46, 4.2, "a"),
    ],
  },

  /* A capsid with its payload. */
  "viral-vectors": {
    dots: [...CAPSID, ...[0, 1, 2, 3, 4].map((i) => dot(46 + i * 7, 60 + Math.sin(rad(i * 90)) * 7.5, 3.8, "c"))],
    links: CAPSID.map((d, i) => {
      const next = CAPSID[(i + 1) % CAPSID.length];
      return [d.x, d.y, next.x, next.y];
    }),
  },

  /* A plasmid: a closed double strand, with the sequence of interest marked. */
  "nucleic-acids": {
    dots: [...arc(60, 60, 42, 24, 4, (i) => (i <= 2 || i >= 22 ? "c" : "a")), ...arc(60, 60, 31, 18, 3.5, "b")],
  },

  /* Desalting: the protein runs ahead, the salt follows. */
  desalting: {
    dots: [
      ...globule(86, 60, 8.4),
      ...[
        [12, 44],
        [25, 62],
        [14, 78],
        [36, 42],
        [40, 76],
        [27, 27],
        [29, 93],
        [49, 59],
      ].map(([x, y]) => dot(x, y, 3.9, "c")),
    ],
  },
};

const FILL: Record<Tone, string> = { a: "fill-brand", b: "fill-brand/30", c: "fill-signal" };

interface MoleculeGlyphProps {
  /** Application slug. */
  slug: string;
  className?: string;
}

/** Decorative pictogram for an application area. Renders nothing for an unknown slug. */
export function MoleculeGlyph({ slug, className }: MoleculeGlyphProps) {
  const glyph = GLYPHS[slug];
  if (!glyph) return null;
  return (
    <svg viewBox="0 0 120 120" aria-hidden className={cn("block", className)}>
      {glyph.outline && <path d={glyph.outline} className="fill-brand/10 stroke-brand/40" strokeWidth="1.5" />}
      {glyph.links?.map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1.toFixed(1)}
          y1={y1.toFixed(1)}
          x2={x2.toFixed(1)}
          y2={y2.toFixed(1)}
          className="stroke-brand/45"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      ))}
      {glyph.dots.map((d, i) => (
        <circle key={i} cx={d.x.toFixed(1)} cy={d.y.toFixed(1)} r={d.r} className={FILL[d.tone]} />
      ))}
    </svg>
  );
}
