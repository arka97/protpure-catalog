import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Section";

export interface Crumb {
  label: string;
  to?: string;
}

interface PageHeaderProps {
  crumbs?: Crumb[];
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  /** Buttons under the lede. */
  actions?: ReactNode;
  /** Illustration or facts shown beside the headline on large screens. */
  aside?: ReactNode;
  className?: string;
}

export function Breadcrumbs({ crumbs, className }: { crumbs: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[0.8125rem] text-ink-3">
        <li>
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
        </li>
        {crumbs.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1.5">
            <ChevronRight aria-hidden className="h-3 w-3 opacity-60" />
            {c.to && i < crumbs.length - 1 ? (
              <Link to={c.to} className="hover:text-foreground">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink-2">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Top of every inner page: breadcrumb, headline, lede and an optional aside. */
export function PageHeader({ crumbs, eyebrow, title, lede, actions, aside, className }: PageHeaderProps) {
  return (
    <header className={cn("border-b border-rule", className)}>
      <div className="shell pb-12 pt-8 md:pb-16 md:pt-10">
        {crumbs && <Breadcrumbs crumbs={crumbs} className="mb-10 md:mb-14" />}
        <div className={cn("grid gap-x-12 gap-y-10", aside && "lg:grid-cols-12 lg:items-end")}>
          <div className={aside ? "lg:col-span-7" : undefined}>
            {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
            <h1 className="display-2 max-w-[18ch]">{title}</h1>
            {lede && <p className="lede mt-6 max-w-2xl">{lede}</p>}
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
          </div>
          {aside && <div className="lg:col-span-5">{aside}</div>}
        </div>
      </div>
    </header>
  );
}
