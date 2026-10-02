import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { linear, log, useWidth } from "./use-width";

/*
  Small, dependency-free SVG charts for the measured data in src/data/evidence.ts.

  Conventions (kept identical across charts):
  - one series per chart, drawn in the signal colour; no legend needed
  - 2 px line, markers r = 4.5 with a 2 px ring in the surface colour
  - every point is labelled directly, in the text colour (never in the series colour)
  - hairline solid grid, horizontal axis titles
  - every chart is followed by the same numbers as a table (see <DataTable>)
*/

const H = 280;
const M = { top: 34, right: 22, bottom: 46, left: 46 };

const tickText = "fill-ink-3 font-mono";
const TICK_SIZE = 10.5;
const fmt = (n: number) => n.toLocaleString("en-IN");

interface FrameProps {
  title: string;
  subtitle?: string;
  /** Screen-reader summary of what the chart shows. */
  summary: string;
  className?: string;
  children: (width: number) => ReactNode;
}

function Frame({ title, subtitle, summary, className, children }: FrameProps) {
  const [ref, width] = useWidth<HTMLDivElement>();
  return (
    <figure className={cn("min-w-0", className)}>
      <figcaption className="mb-3 min-h-[2.9rem]">
        <p className="font-semibold leading-snug">{title}</p>
        {subtitle && <p className="mt-0.5 text-[0.8125rem] text-ink-3">{subtitle}</p>}
      </figcaption>
      <div ref={ref}>
        <svg
          width={width}
          height={H}
          viewBox={`0 0 ${width} ${H}`}
          role="img"
          aria-label={summary}
          className="block max-w-full"
        >
          {children(width)}
        </svg>
      </div>
    </figure>
  );
}

interface Point {
  x: number;
  y: number;
  label: string;
  /** Where the label sits relative to the marker. */
  place?: "above" | "above-left" | "below" | "right" | "left";
}

function Markers({ points }: { points: (Point & { px: number; py: number })[] }) {
  return (
    <>
      {points.map((p) => {
        const place = p.place ?? "above";
        const dx = place === "right" ? 10 : place === "left" ? -10 : place === "above-left" ? -7 : 0;
        const dy = place === "above" ? -12 : place === "above-left" ? -9 : place === "below" ? 21 : 4;
        return (
          <g key={`${p.x}-${p.y}`}>
            <circle cx={p.px} cy={p.py} r="4.5" className="fill-signal stroke-background" strokeWidth="2" />
            <text
              x={p.px + dx}
              y={p.py + dy}
              textAnchor={place === "right" ? "start" : place === "left" || place === "above-left" ? "end" : "middle"}
              className="fill-foreground font-sans"
              fontSize="12.5"
              fontWeight="600"
            >
              {p.label}
            </text>
          </g>
        );
      })}
    </>
  );
}

interface LineChartProps {
  title: string;
  subtitle?: string;
  summary: string;
  points: Point[];
  xDomain: [number, number];
  xTicks: number[];
  xTitle: string;
  yDomain: [number, number];
  yTicks: number[];
  yTitle: string;
  yFormat?: (n: number) => string;
  /** Shaded acceptance range on the y axis. */
  band?: { from: number; to: number; label: string };
  /** Reference line on the y axis. */
  reference?: { at: number; label: string };
  xScale?: "linear" | "log";
  /** Join the points with a line (false for a scatter). */
  line?: boolean;
  className?: string;
}

export function LineChart({
  title,
  subtitle,
  summary,
  points,
  xDomain,
  xTicks,
  xTitle,
  yDomain,
  yTicks,
  yTitle,
  yFormat = fmt,
  band,
  reference,
  xScale = "linear",
  line = true,
  className,
}: LineChartProps) {
  return (
    <Frame title={title} subtitle={subtitle} summary={summary} className={className}>
      {(width) => {
        const x0 = M.left;
        const x1 = width - M.right;
        const y0 = H - M.bottom;
        const y1 = M.top;
        const sx = (xScale === "log" ? log : linear)(xDomain[0], xDomain[1], x0, x1);
        const sy = linear(yDomain[0], yDomain[1], y0, y1);
        const placed = points.map((p) => ({ ...p, px: sx(p.x), py: sy(p.y) }));
        return (
          <>
            {band && (
              <g>
                <rect
                  x={x0}
                  y={sy(band.to)}
                  width={x1 - x0}
                  height={sy(band.from) - sy(band.to)}
                  className="fill-foreground/[0.06]"
                />
                <text x={x1 - 6} y={sy(band.to) + 15} textAnchor="end" className={tickText} fontSize={TICK_SIZE}>
                  {band.label}
                </text>
              </g>
            )}
            {yTicks.map((t) => (
              <g key={t}>
                <line x1={x0} x2={x1} y1={sy(t)} y2={sy(t)} className="stroke-rule" strokeWidth="1" />
                <text x={x0 - 8} y={sy(t) + 3.5} textAnchor="end" className={tickText} fontSize={TICK_SIZE}>
                  {yFormat(t)}
                </text>
              </g>
            ))}
            {reference && (
              <g>
                <line
                  x1={x0}
                  x2={x1}
                  y1={sy(reference.at)}
                  y2={sy(reference.at)}
                  className="stroke-ink-2"
                  strokeWidth="1"
                />
                <text x={x0 + 6} y={sy(reference.at) - 6} className={tickText} fontSize={TICK_SIZE}>
                  {reference.label}
                </text>
              </g>
            )}
            <line x1={x0} x2={x1} y1={y0} y2={y0} className="stroke-foreground" strokeWidth="1.25" />
            {xTicks.map((t) => (
              <g key={t}>
                <line x1={sx(t)} x2={sx(t)} y1={y0} y2={y0 + 5} className="stroke-foreground" strokeWidth="1.25" />
                <text x={sx(t)} y={y0 + 19} textAnchor="middle" className={tickText} fontSize={TICK_SIZE}>
                  {fmt(t)}
                </text>
              </g>
            ))}
            <text x={x0 - 38} y={14} className={tickText} fontSize={TICK_SIZE}>
              {yTitle}
            </text>
            <text x={x1} y={H - 6} textAnchor="end" className={tickText} fontSize={TICK_SIZE}>
              {xTitle}
            </text>
            {line && (
              <path
                d={`M${placed.map((p) => `${p.px.toFixed(1)},${p.py.toFixed(1)}`).join(" L")}`}
                fill="none"
                className="stroke-signal"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            )}
            <Markers points={placed} />
          </>
        );
      }}
    </Frame>
  );
}

interface DataTableProps {
  caption: string;
  columns: string[];
  rows: (string | number)[][];
  /** Open by default. Charts keep theirs closed, as a twin of the picture. */
  open?: boolean;
  className?: string;
}

/** The numbers behind a chart, as a real table. Collapsed by default so the chart leads. */
export function DataTable({ caption, columns, rows, open, className }: DataTableProps) {
  return (
    <details className={cn("group border-t border-rule", className)} open={open}>
      <summary className="label flex cursor-pointer list-none items-center justify-between gap-4 py-3 text-ink-2 hover:text-foreground [&::-webkit-details-marker]:hidden">
        <span>Data table</span>
        <span aria-hidden className="text-base leading-none transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <div tabIndex={0} role="region" aria-label={caption} className="relative overflow-x-auto pb-4">
        <table className="w-full min-w-[26rem] border-collapse text-left text-[0.875rem]">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-foreground/70">
              {columns.map((c, i) => (
                <th key={c} scope="col" className={cn("label py-2 font-medium text-ink-3", i > 0 && "pl-4 text-right")}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={String(row[0])} className="border-b border-rule">
                {row.map((cell, i) =>
                  i === 0 ? (
                    <th key={i} scope="row" className="py-2 font-medium">
                      {cell}
                    </th>
                  ) : (
                    <td key={i} className="py-2 pl-4 text-right tabular-nums">
                      {typeof cell === "number" ? fmt(cell) : cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}
