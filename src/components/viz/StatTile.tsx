import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatTileProps {
  value: ReactNode;
  unit?: string;
  label: string;
  /** Where the number comes from, or the condition it was measured under. */
  note?: string;
  className?: string;
  size?: "md" | "lg";
}

/** A single measured figure with its unit, what it is, and its condition or source. */
export function StatTile({ value, unit, label, note, className, size = "md" }: StatTileProps) {
  return (
    <div className={cn("border-t border-rule pt-5", className)}>
      <p className="flex flex-wrap items-baseline gap-x-2">
        <span
          className={cn(
            "numeral",
            size === "lg" ? "text-[clamp(3rem,6vw,4.75rem)]" : "text-[clamp(2.25rem,4vw,3.25rem)]",
          )}
        >
          {value}
        </span>
        {unit && <span className="text-[0.9375rem] font-medium text-ink-2">{unit}</span>}
      </p>
      <p className="mt-2 font-medium leading-snug">{label}</p>
      {note && <p className="mt-1 text-[0.8125rem] leading-snug text-ink-3">{note}</p>}
    </div>
  );
}
