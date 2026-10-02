import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** The italic serif accent from the wordmark. Use once per headline. */
export function Em({ children }: { children: ReactNode }) {
  return <span className="em">{children}</span>;
}

interface EyebrowProps {
  children: ReactNode;
  /** Section number, e.g. "01". */
  index?: string;
  className?: string;
}

/** Mono label above a headline. */
export function Eyebrow({ children, index, className }: EyebrowProps) {
  return (
    <p className={cn("label flex items-center gap-3 text-ink-3", className)}>
      {index && <span className="text-signal-ink">{index}</span>}
      <span aria-hidden className="h-px w-7 bg-current opacity-60" />
      <span>{children}</span>
    </p>
  );
}

interface SectionHeaderProps {
  eyebrow?: ReactNode;
  index?: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Link or button aligned with the lede. */
  action?: ReactNode;
  size?: "lg" | "md";
  className?: string;
  as?: "h2" | "h3";
}

/** Headline on the left, supporting text on the right; stacks on small screens. */
export function SectionHeader({
  eyebrow,
  index,
  title,
  lede,
  action,
  size = "md",
  className,
  as: H = "h2",
}: SectionHeaderProps) {
  return (
    <div className={cn("grid gap-x-12 gap-y-6 lg:grid-cols-12 lg:items-end", className)}>
      <div className={lede || action ? "lg:col-span-7" : "lg:col-span-10"}>
        {eyebrow && (
          <Eyebrow index={index} className="mb-5">
            {eyebrow}
          </Eyebrow>
        )}
        <H className={size === "lg" ? "display-2" : "display-3"}>{title}</H>
      </div>
      {(lede || action) && (
        <div className="lg:col-span-5">
          {lede && <p className="lede max-w-xl">{lede}</p>}
          {action && <div className={lede ? "mt-5" : undefined}>{action}</div>}
        </div>
      )}
    </div>
  );
}
