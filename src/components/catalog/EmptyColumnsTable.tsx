import { useMemo, useState } from "react";
import { EMPTY_COLUMNS } from "@/data/hardware";
import { cn } from "@/lib/utils";
import type { EmptyColumn } from "@/types/catalog";
import { AddToQuote } from "./AddToQuote";

const describe = (c: EmptyColumn) =>
  `Empty column ${c.item}, ${c.innerDiameterMm} mm, ${c.adjust === "both-ends" ? "both ends adjustable" : "one end adjustable"}${c.plus ? ", Plus" : ""}`;

const DIAMETERS = [16, 26, 50];

const chip = (on: boolean) =>
  cn(
    "h-9 rounded-full border px-3.5 text-[0.8125rem] font-medium transition-colors",
    on ? "border-ink bg-ink text-paper" : "border-rule bg-card hover:border-ink",
  );

/** The 64 empty columns, filterable by diameter, adjustment and glass type. */
export function EmptyColumnsTable({ className }: { className?: string }) {
  const [diameter, setDiameter] = useState<number | null>(null);
  const [adjust, setAdjust] = useState<EmptyColumn["adjust"] | null>(null);
  const [plus, setPlus] = useState<boolean | null>(null);

  const rows = useMemo(
    () =>
      EMPTY_COLUMNS.filter(
        (c) =>
          (diameter === null || c.innerDiameterMm === diameter) &&
          (adjust === null || c.adjust === adjust) &&
          (plus === null || c.plus === plus),
      ),
    [diameter, adjust, plus],
  );

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-x-8 gap-y-4">
        <fieldset>
          <legend className="label mb-2 text-ink-3">Inner diameter</legend>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              aria-pressed={diameter === null}
              onClick={() => setDiameter(null)}
              className={chip(diameter === null)}
            >
              Any
            </button>
            {DIAMETERS.map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={diameter === d}
                onClick={() => setDiameter(d)}
                className={chip(diameter === d)}
              >
                {d} mm
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="label mb-2 text-ink-3">Adjustable</legend>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              aria-pressed={adjust === null}
              onClick={() => setAdjust(null)}
              className={chip(adjust === null)}
            >
              Any
            </button>
            <button
              type="button"
              aria-pressed={adjust === "one-end"}
              onClick={() => setAdjust("one-end")}
              className={chip(adjust === "one-end")}
            >
              One end
            </button>
            <button
              type="button"
              aria-pressed={adjust === "both-ends"}
              onClick={() => setAdjust("both-ends")}
              className={chip(adjust === "both-ends")}
            >
              Both ends
            </button>
          </div>
        </fieldset>
        <fieldset>
          <legend className="label mb-2 text-ink-3">Glass tube</legend>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              aria-pressed={plus === null}
              onClick={() => setPlus(null)}
              className={chip(plus === null)}
            >
              Any
            </button>
            <button
              type="button"
              aria-pressed={plus === false}
              onClick={() => setPlus(false)}
              className={chip(plus === false)}
            >
              Standard
            </button>
            <button
              type="button"
              aria-pressed={plus === true}
              onClick={() => setPlus(true)}
              className={chip(plus === true)}
            >
              Plus, high precision
            </button>
          </div>
        </fieldset>
      </div>

      <p className="label mt-6 text-ink-3" aria-live="polite">
        {rows.length} of {EMPTY_COLUMNS.length} columns
      </p>

      <div
        tabIndex={0}
        role="region"
        aria-label="Empty chromatography columns"
        className="relative mt-3 overflow-x-auto"
      >
        <table className="w-full min-w-[44rem] border-collapse text-left">
          <caption className="sr-only">Empty chromatography columns</caption>
          <thead>
            <tr className="label border-b border-ink text-ink-3">
              {["Item", "Inner diameter", "Adjustable", "Glass", "Bed volume", "Bed height", "Pressure"].map((h) => (
                <th key={h} scope="col" className="py-2.5 pr-4 font-medium">
                  {h}
                </th>
              ))}
              <th scope="col" className="py-2.5 text-right font-medium">
                <span className="sr-only">Add to quote list</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.item} className="border-b border-rule text-[0.9375rem]">
                <th scope="row" className="py-3 pr-4 font-mono text-[0.875rem] font-medium tracking-wide">
                  {c.item}
                </th>
                <td className="py-3 pr-4 tabular-nums">{c.innerDiameterMm} mm</td>
                <td className="py-3 pr-4">{c.adjust === "both-ends" ? "Both ends" : "One end"}</td>
                <td className="py-3 pr-4">{c.plus ? "Plus" : "Standard"}</td>
                <td className="py-3 pr-4 tabular-nums">{c.bedVolumeMl} mL</td>
                <td className="py-3 pr-4 tabular-nums">{c.bedHeightMm} mm</td>
                <td className="py-3 pr-4 tabular-nums">{c.pressureBar} bar</td>
                <td className="py-2 text-right">
                  <AddToQuote
                    item={{
                      id: c.item,
                      kind: "hardware",
                      name: describe(c),
                      catNo: c.item,
                      pack: `${c.bedVolumeMl} mL bed`,
                      href: "/products/empty-columns",
                    }}
                    label="Add"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
