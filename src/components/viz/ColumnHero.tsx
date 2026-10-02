import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/*
  Hero illustration: a sample separating on a packed column, and the three resolved peaks it produces.
  Pure SVG + CSS keyframes (see "Hero column" in index.css). The animation pauses when scrolled out of view
  and is replaced by a still frame when the visitor prefers reduced motion.
*/

const W = 560;
const H = 600;

/* Column bed (inner) */
const BED = { x: 68, y: 84, w: 174, h: 424 };

/* Detector trace panel */
const TRACE = { x: 306, y: 250, w: 236, h: 176 };

/* Peak positions on the time axis are tied to the band exit times in the CSS keyframes. */
const PEAKS = [
  { at: 0.391, height: 0.44, sigma: 0.034, color: "fill-imac", label: "Impurities" },
  { at: 0.609, height: 1, sigma: 0.04, color: "fill-iex", label: "Target protein" },
  { at: 0.826, height: 0.36, sigma: 0.03, color: "fill-signal", label: "Aggregates" },
];

/* The three bands: impurities, target protein, aggregates. Each gradient takes its colour from its own class. */
const BANDS = [
  { id: "hero-band-a", color: "text-imac", height: 70 },
  { id: "hero-band-b", color: "text-iex", height: 78 },
  { id: "hero-band-c", color: "text-signal", height: 66 },
];

/** Small deterministic PRNG so the bead bed looks hand-packed but renders identically every time. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function useBeads() {
  return useMemo(() => {
    const rand = mulberry32(7);
    const r = 6.7;
    const dx = r * 2.04;
    const dy = r * 1.77;
    const beads: { cx: number; cy: number; r: number }[] = [];
    let row = 0;
    for (let y = BED.y + r + 1; y < BED.y + BED.h - r; y += dy, row++) {
      const offset = row % 2 ? r : 0;
      for (let x = BED.x + r + 2 + offset; x < BED.x + BED.w - r; x += dx) {
        beads.push({
          cx: x + (rand() - 0.5) * 1.1,
          cy: y + (rand() - 0.5) * 1.1,
          r: r * (0.9 + rand() * 0.14),
        });
      }
    }
    return beads;
  }, []);
}

function useTracePath() {
  return useMemo(() => {
    const pts: string[] = [];
    const base = TRACE.y + TRACE.h;
    for (let i = 0; i <= 118; i++) {
      const t = i / 118;
      let v = 0.012;
      for (const p of PEAKS) v += p.height * Math.exp(-((t - p.at) ** 2) / (2 * p.sigma ** 2));
      pts.push(`${(TRACE.x + t * TRACE.w).toFixed(1)},${(base - v * (TRACE.h - 26)).toFixed(1)}`);
    }
    const line = `M${pts.join(" L")}`;
    return { line, area: `${line} L${TRACE.x + TRACE.w},${base} L${TRACE.x},${base} Z` };
  }, []);
}

export function ColumnHero({ className }: { className?: string }) {
  const beads = useBeads();
  const trace = useTracePath();
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setPaused(!entry.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const base = TRACE.y + TRACE.h;

  return (
    <div ref={ref} className={cn("hero-column", className)} data-paused={paused}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Schematic: a sample separates into three bands as it travels down a packed chromatography column, and appears as three resolved peaks on the detector trace."
        className="block h-auto w-full"
      >
        <defs>
          <clipPath id="hero-bed">
            <rect x={BED.x} y={BED.y} width={BED.w} height={BED.h} rx="12" />
          </clipPath>
          {BANDS.map((b) => (
            <linearGradient key={b.id} id={b.id} x1="0" y1="0" x2="0" y2="1" className={b.color}>
              <stop offset="0" stopColor="currentColor" stopOpacity="0" />
              <stop offset="0.5" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          ))}
          <radialGradient id="hero-bead" cx="34%" cy="30%" r="80%">
            <stop offset="0" stopColor="hsl(var(--card))" stopOpacity="0.98" />
            <stop offset="1" stopColor="hsl(var(--card))" stopOpacity="0.5" />
          </radialGradient>
        </defs>

        {/* Inlet, end pieces and outlet */}
        <rect x="147" y="6" width="16" height="44" className="fill-rule" />
        <rect x="98" y="44" width="114" height="30" rx="7" className="fill-ink" />
        <rect x="98" y="518" width="114" height="30" rx="7" className="fill-ink" />
        <rect x="147" y="546" width="16" height="30" className="fill-rule" />

        {/* Flow path from the outlet to the detector */}
        <path
          d={`M155 576 V584 Q155 594 165 594 H${TRACE.x - 22} Q${TRACE.x - 10} 594 ${TRACE.x - 10} 582 V${base}`}
          fill="none"
          strokeDasharray="2 5"
          strokeLinecap="round"
          className="stroke-ink-3"
          strokeWidth="1.6"
        />
        <circle cx={TRACE.x - 10} cy={base} r="4.5" className="fill-ink" />

        {/* Packed bed */}
        <rect x="60" y="74" width="190" height="444" rx="18" className="fill-card" />
        <g clipPath="url(#hero-bed)">
          <rect x={BED.x} y={BED.y} width={BED.w} height={BED.h} className="fill-paper-2" />
          {BANDS.map((b, i) => (
            <rect
              key={b.id}
              x={BED.x - 4}
              y={BED.y + 4}
              width={BED.w + 8}
              height={b.height}
              fill={`url(#${b.id})`}
              className={`hero-band hero-band-${i + 1}`}
            />
          ))}
          <g fill="url(#hero-bead)" className="stroke-ink/15" strokeWidth="0.6">
            {beads.map((b, i) => (
              <circle key={i} cx={b.cx.toFixed(1)} cy={b.cy.toFixed(1)} r={b.r.toFixed(1)} />
            ))}
          </g>
        </g>
        <rect x="60" y="74" width="190" height="444" rx="18" fill="none" className="stroke-ink" strokeWidth="1.8" />
        <rect x="76" y="96" width="6" height="400" rx="3" className="fill-card" opacity="0.55" />

        {/* Detector trace */}
        <g className="hero-trace">
          {[0.25, 0.5, 0.75].map((f) => (
            <line
              key={f}
              x1={TRACE.x}
              x2={TRACE.x + TRACE.w}
              y1={base - f * (TRACE.h - 26)}
              y2={base - f * (TRACE.h - 26)}
              className="stroke-rule"
              strokeWidth="1"
            />
          ))}
          <path d={trace.area} className="fill-iex/10" />
          <path d={trace.line} fill="none" className="stroke-ink" strokeWidth="2" strokeLinejoin="round" />
          {/* Cover that slides away to draw the trace in time with the bands */}
          <rect
            x={TRACE.x - 2}
            y={TRACE.y - 6}
            width={TRACE.w + 6}
            height={TRACE.h + 5}
            className="hero-trace-cover fill-background"
          />
        </g>
        <line x1={TRACE.x} x2={TRACE.x + TRACE.w} y1={base} y2={base} className="stroke-ink" strokeWidth="1.6" />
        {PEAKS.map((p) => (
          <circle key={p.label} cx={TRACE.x + p.at * TRACE.w} cy={base + 12} r="4" className={p.color} />
        ))}
        <text x={TRACE.x} y={TRACE.y - 18} className="fill-ink-3 font-mono" fontSize="11" letterSpacing="0.6">
          UV 280 nm
        </text>
        <text
          x={TRACE.x + TRACE.w}
          y={base + 36}
          textAnchor="end"
          className="fill-ink-3 font-mono"
          fontSize="11"
          letterSpacing="0.6"
        >
          Elution volume
        </text>
      </svg>

      <ul className="mt-1 flex flex-wrap justify-end gap-x-5 gap-y-1 pr-1 text-[0.8125rem] text-ink-2" aria-hidden>
        {PEAKS.map((p) => (
          <li key={p.label} className="flex items-center gap-2">
            <svg viewBox="0 0 8 8" className="h-2 w-2">
              <circle cx="4" cy="4" r="4" className={p.color} />
            </svg>
            {p.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
