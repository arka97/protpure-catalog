import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ResinFinder } from "@/components/catalog/ResinFinder";
import { CTASection } from "@/components/site/CTASection";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { Em, SectionHeader } from "@/components/site/Section";
import { APPLICATIONS } from "@/data/applications";
import { STAGES } from "@/data/families";
import { useSeo } from "@/lib/seo";
import { cn } from "@/lib/utils";

const WORKFLOWS = APPLICATIONS.reduce((n, a) => n + a.subs.length, 0);
const LEVEL = { Low: 1, Moderate: 2, High: 3 } as const;

export default function Applications() {
  useSeo({
    title: "Applications: find a chromatography resin by application",
    description: `${APPLICATIONS.length} application areas and ${WORKFLOWS} purification workflows, each mapped to ProtPure resins for capture, intermediate purification and polishing.`,
  });

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Applications" }]}
        eyebrow="Applications"
        title={
          <>
            Find the resin for your <Em>molecule.</Em>
          </>
        }
        lede={`${APPLICATIONS.length} application areas and ${WORKFLOWS} workflows, each mapped to ProtPure resins for capture, intermediate purification and polishing.`}
      />

      <section id="finder" className="py-14 md:py-20" aria-labelledby="finder-heading">
        <div className="shell">
          <h2 id="finder-heading" className="sr-only">
            Resin finder
          </h2>
          <ResinFinder />
        </div>
      </section>

      <section className="border-y border-rule bg-paper-2 py-20 md:py-28" aria-labelledby="stages-heading">
        <div className="shell">
          <SectionHeader
            eyebrow="Purification stages"
            title={
              <span id="stages-heading">
                Three stages, three <Em>jobs.</Em>
              </span>
            }
            lede="A purification process usually runs in three steps. Each asks something different of the resin, which is why most ProtPure chemistries come in more than one grade."
          />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-panel border border-rule bg-rule md:grid-cols-3">
            {STAGES.map((s, i) => (
              <li key={s.id} className="flex flex-col bg-card p-6 sm:p-8">
                <p className="label text-signal-ink">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="heading-4 mt-3">{s.name}</h3>
                <p className="mt-2 text-ink-2 md:min-h-[3.4rem]">{s.purpose}</p>
                <dl className="mt-auto space-y-3 pt-8 text-[0.9375rem]">
                  <div className="flex items-center justify-between gap-4 border-t border-rule pt-3">
                    <dt className="label text-ink-3">Resolution</dt>
                    <dd className="flex items-center gap-2.5 font-semibold">
                      <span aria-hidden className="flex gap-1">
                        {[1, 2, 3].map((n) => (
                          <span
                            key={n}
                            className={cn(
                              "h-3.5 w-1.5 rounded-full",
                              n <= LEVEL[s.resolution] ? "bg-foreground" : "bg-paper-2",
                            )}
                          />
                        ))}
                      </span>
                      {s.resolution}
                    </dd>
                  </div>
                  <div className="border-t border-rule pt-3">
                    <dt className="label text-ink-3">Typical use</dt>
                    <dd className="mt-1.5 md:min-h-[3rem]">{s.useCase}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 md:py-28" aria-labelledby="areas-heading">
        <div className="shell">
          <SectionHeader
            eyebrow="Application areas"
            title={
              <span id="areas-heading">
                {APPLICATIONS.length} areas, in <Em>detail.</Em>
              </span>
            }
          />
          <ol className="mt-12 border-t border-ink">
            {APPLICATIONS.map((a, i) => (
              <Reveal as="li" key={a.slug} className="group relative border-b border-rule">
                <div className="grid gap-x-10 gap-y-3 py-7 md:grid-cols-12 md:py-9">
                  <p className="label pt-2 text-ink-3 md:col-span-1">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="heading-4 md:col-span-4">
                    <Link to={`/applications/${a.slug}`} className="after:absolute after:inset-0 after:content-['']">
                      {a.title}
                    </Link>
                  </h3>
                  <div className="md:col-span-6">
                    <p className="text-ink-2">{a.description}</p>
                    <p className="mt-4 text-[0.8125rem] text-ink-3">{a.subs.map((s) => s.title).join(" · ")}</p>
                  </div>
                  <ArrowRight
                    aria-hidden
                    className="hidden h-6 w-6 justify-self-end text-ink-3 transition-transform group-hover:translate-x-1 group-hover:text-foreground md:col-span-1 md:block"
                  />
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CTASection title="Not on the list? Tell us about your molecule." />
    </>
  );
}
