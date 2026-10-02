import type { FamilyId, GradeId, StageId } from "@/types/catalog";
import { familyById, gradeById, STAGES } from "@/data/families";
import { FAMILY_STYLE } from "@/lib/family-style";
import { cn } from "@/lib/utils";

/** Family marker: coloured dot plus the family name. The colour never appears without the label. */
export function FamilyBadge({ family, short, className }: { family: FamilyId; short?: boolean; className?: string }) {
  const f = familyById(family);
  const style = FAMILY_STYLE[f.color];
  return (
    <span className={cn("label inline-flex items-center gap-2 text-ink-2", className)}>
      {f.twoTone ? (
        <span aria-hidden className="flex h-2 w-2 overflow-hidden rounded-full">
          <span className="h-full w-1/2 bg-iex" />
          <span className="h-full w-1/2 bg-hic" />
        </span>
      ) : (
        <span aria-hidden className={cn("h-2 w-2 rounded-full", style.dot)} />
      )}
      {short ? f.abbr : f.name}
    </span>
  );
}

/* Bead dot drawn in proportion to the grade's mean diameter (90 / 70 / 35 µm). */
const BEAD: Record<GradeId, string> = {
  ff: "h-[11px] w-[11px]",
  precise: "h-[8.5px] w-[8.5px]",
  hr: "h-[4.5px] w-[4.5px]",
};

interface GradeBadgeProps {
  grade: GradeId;
  /** "short" shows FF / PR / HR, "full" the grade name. */
  label?: "short" | "full";
  active?: boolean;
  className?: string;
}

export function GradeBadge({ grade, label = "full", active, className }: GradeBadgeProps) {
  const g = gradeById(grade);
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-full border px-2 text-[0.75rem] font-semibold leading-none",
        active ? "border-ink bg-ink text-paper" : "border-rule bg-card text-foreground",
        className,
      )}
      title={label === "short" ? g.name : undefined}
    >
      <span aria-hidden className="grid h-3 w-3 place-items-center">
        <span className={cn("rounded-full bg-current", BEAD[grade])} />
      </span>
      {label === "short" ? (
        <abbr title={g.name} className="no-underline">
          {g.short}
        </abbr>
      ) : (
        g.name
      )}
    </span>
  );
}

/** The purification stages a product is typically used in. */
export function StageBadges({ stages, className }: { stages: StageId[]; className?: string }) {
  if (!stages.length) return null;
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Purification stages">
      {STAGES.filter((s) => stages.includes(s.id)).map((s) => (
        <li key={s.id} className="label rounded-full border border-rule px-2.5 py-1 text-ink-2">
          {s.name}
        </li>
      ))}
    </ul>
  );
}

export function NewTag({ className }: { className?: string }) {
  return (
    <span className={cn("label inline-flex h-5 items-center rounded-full bg-signal px-2 text-ink", className)}>
      New
    </span>
  );
}
