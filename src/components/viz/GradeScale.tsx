import { GRADES, stageById } from "@/data/families";
import { cn } from "@/lib/utils";

/*
  The three performance grades as small multiples.
  Each bead is drawn to the same scale: the solid disc is the mean diameter, the two rings are the
  smallest and largest particles in the range. Below it, the flow-velocity range sits on a shared 0–500 cm/h axis.
*/

const PX_PER_UM = 0.9;
const BOX = 164;
const FLOW_MAX = 500;

function range(text: string) {
  const [min, max] = text.replace(" µm", "").split("–").map(Number);
  return { min, max };
}

export function GradeScale({ className }: { className?: string }) {
  return (
    <figure className={className}>
      <div className="grid gap-px overflow-hidden rounded-panel border border-rule bg-rule md:grid-cols-3">
        {GRADES.map((g) => {
          const { min, max } = range(g.particleRange);
          const c = BOX / 2;
          return (
            <div key={g.id} className="flex flex-col bg-card p-6 sm:p-8">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="heading-4">{g.name}</h3>
                <span className="label text-ink-3">{g.short}</span>
              </div>
              <p className="mt-1.5 text-[0.9375rem] text-ink-2 md:min-h-[2.9rem]">{g.tagline}</p>

              <svg
                viewBox={`0 0 ${BOX} ${BOX}`}
                className="mx-auto mt-6 block h-auto w-full max-w-[164px]"
                role="img"
                aria-label={`${g.name} bead drawn to scale: mean diameter ${g.meanDiameter}, particle range ${g.particleRange}.`}
              >
                <circle cx={c} cy={c} r={(max * PX_PER_UM) / 2} className="fill-none stroke-rule" strokeWidth="1" />
                <circle cx={c} cy={c} r={(g.drawDiameter * PX_PER_UM) / 2} className="fill-foreground" />
                <circle
                  cx={c}
                  cy={c}
                  r={(min * PX_PER_UM) / 2}
                  className="fill-none stroke-background"
                  strokeWidth="1"
                  opacity="0.55"
                />
              </svg>

              <dl className="mt-6 border-t border-rule">
                <div className="flex items-baseline justify-between gap-4 border-b border-rule py-3">
                  <dt className="label text-ink-3">Mean bead</dt>
                  <dd className="numeral text-[1.5rem]">{g.meanDiameter}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-rule py-3">
                  <dt className="label text-ink-3">Particle range</dt>
                  <dd className="numeral text-[1.5rem]">{g.particleRange}</dd>
                </div>
                <div className="py-3">
                  <dt className="flex items-baseline justify-between gap-4">
                    <span className="label text-ink-3">Flow velocity</span>
                    <span className="numeral text-[1.5rem]">
                      {g.flow[0]}–{g.flow[1]}{" "}
                      <span className="text-[0.9375rem] font-medium tracking-normal text-ink-2">cm/h</span>
                    </span>
                  </dt>
                  <dd className="mt-3">
                    <div className="relative h-1.5 rounded-full bg-paper-2" aria-hidden>
                      <div
                        className="absolute inset-y-0 rounded-full bg-foreground"
                        style={{
                          left: `${(g.flow[0] / FLOW_MAX) * 100}%`,
                          width: `${((g.flow[1] - g.flow[0]) / FLOW_MAX) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="label mt-1.5 flex justify-between text-ink-3" aria-hidden>
                      <span>0</span>
                      <span>250</span>
                      <span>500</span>
                    </div>
                  </dd>
                </div>
              </dl>

              <p className="mt-5 text-[0.9375rem] text-ink-2 md:min-h-[2.9rem]">{g.bestFor}</p>
              <ul className="mt-auto flex flex-wrap gap-1.5 pt-5" aria-label="Typical stages">
                {g.stages.map((s) => (
                  <li key={s} className="label rounded-full border border-rule px-2.5 py-1 text-ink-2">
                    {stageById(s).name}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <figcaption className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.8125rem] text-ink-3">
        <span className="flex items-center gap-2.5">
          <svg width={100 * PX_PER_UM} height="8" aria-hidden className="shrink-0">
            <path
              d={`M0.5 0v8M0.5 4H${100 * PX_PER_UM - 0.5}M${100 * PX_PER_UM - 0.5} 0v8`}
              className="stroke-ink-3"
              fill="none"
            />
          </svg>
          100 µm. Beads drawn to scale: disc = mean diameter, rings = smallest and largest particles.
        </span>
        <span>Flow velocity at 0.1 MPa over a 15 cm bed, from the ion-exchange datasheets.</span>
      </figcaption>
    </figure>
  );
}
