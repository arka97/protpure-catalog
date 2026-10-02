import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { APPLICATIONS, type SubApplication } from "@/data/applications";
import { STAGES } from "@/data/families";
import { cn } from "@/lib/utils";
import { ResinChip } from "./ResinChip";

/** Capture / intermediate / polishing recommendations for one sub-application. */
export function StageColumns({ sub, className }: { sub: SubApplication; className?: string }) {
  return (
    <div className={cn("grid gap-px overflow-hidden rounded-lg border border-rule bg-rule md:grid-cols-3", className)}>
      {STAGES.map((stage, i) => {
        const rec = sub.stages[stage.id];
        return (
          <div key={stage.id} className="flex flex-col bg-card p-5">
            <p className="label flex items-center gap-2 text-ink-3">
              <span className="text-signal-ink">{String(i + 1).padStart(2, "0")}</span>
              {stage.name}
            </p>
            <p className="mt-2 text-[0.8125rem] leading-snug text-ink-2">{stage.purpose}</p>
            {rec.refs.length ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {rec.refs.map((r) => (
                  <li key={r.href + r.label}>
                    <ResinChip resin={r} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-[0.875rem] text-ink-3">No resin step recommended at this stage.</p>
            )}
            {rec.note && <p className="label mt-auto pt-4 text-ink-3">{rec.note}</p>}
          </div>
        );
      })}
    </div>
  );
}

const pill = (on: boolean) =>
  cn(
    "rounded-full border px-3.5 py-2 text-left text-[0.875rem] font-medium leading-tight transition-colors",
    on ? "border-ink bg-ink text-paper" : "border-rule bg-card text-foreground hover:border-ink",
  );

/**
 * Resin finder: pick an application, then a workflow, and see the resins the application matrix
 * recommends at each purification stage.
 */
export function ResinFinder({ className }: { className?: string }) {
  const [appSlug, setAppSlug] = useState(APPLICATIONS[0].slug);
  const app = APPLICATIONS.find((a) => a.slug === appSlug) ?? APPLICATIONS[0];
  const [subSlug, setSubSlug] = useState(app.subs[0].slug);
  const sub = app.subs.find((s) => s.slug === subSlug) ?? app.subs[0];

  return (
    <div className={cn("rounded-panel border border-rule bg-paper-2 p-5 sm:p-8", className)}>
      <div className="grid gap-x-10 gap-y-8 lg:grid-cols-12">
        <fieldset className="lg:col-span-4">
          <legend className="label mb-4 text-ink-3">1 · What are you purifying?</legend>
          <div className="flex flex-wrap gap-2">
            {APPLICATIONS.map((a) => (
              <button
                key={a.slug}
                type="button"
                aria-pressed={a.slug === app.slug}
                onClick={() => {
                  setAppSlug(a.slug);
                  setSubSlug(a.subs[0].slug);
                }}
                className={pill(a.slug === app.slug)}
              >
                {a.short}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="lg:col-span-8">
          <fieldset>
            <legend className="label mb-4 text-ink-3">2 · Which workflow?</legend>
            <div className="flex flex-wrap gap-2">
              {app.subs.map((s) => (
                <button
                  key={s.slug}
                  type="button"
                  aria-pressed={s.slug === sub.slug}
                  onClick={() => setSubSlug(s.slug)}
                  className={pill(s.slug === sub.slug)}
                >
                  {s.title}
                </button>
              ))}
            </div>
          </fieldset>

          <div aria-live="polite" className="mt-7">
            <p className="label mb-4 text-ink-3">3 · Recommended resins, stage by stage</p>
            <p className="mb-4 max-w-2xl text-[0.9375rem] text-ink-2">{sub.description}</p>
            <StageColumns sub={sub} />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <Link
              to={`/applications/${app.slug}`}
              className="inline-flex items-center gap-1.5 font-semibold hover:underline"
            >
              {app.title}: all workflows
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
            <Link
              to="/services#resin-screening"
              className="text-ink-2 underline underline-offset-4 hover:text-foreground"
            >
              Not sure? We can screen resins for you
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
