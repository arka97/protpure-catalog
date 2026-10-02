import { ArrowRight } from "lucide-react";
import { AddToQuote } from "@/components/catalog/AddToQuote";
import { CTASection } from "@/components/site/CTASection";
import { PageHeader } from "@/components/site/PageHeader";
import { Photo } from "@/components/site/Photo";
import { Reveal } from "@/components/site/Reveal";
import { Em, SectionHeader } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { useRFQ } from "@/context/RFQContext";
import { PACKING_CASE } from "@/data/evidence";
import { PHOTOS } from "@/data/photos";
import { PACKING_OPTIONS, SERVICES, SERVICE_AUDIENCES, SERVICE_WORKFLOW } from "@/data/services";
import { useSeo } from "@/lib/seo";

export default function Services() {
  const { setOpen } = useRFQ();

  useSeo({
    title: "Services: column packing, resin screening, method development and protein purification",
    description:
      "ProtPure downstream bioprocessing services: precision column packing, chromatography resin screening and selection, method development and protein purification.",
  });

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Services" }]}
        eyebrow="Downstream bioprocessing services"
        title={
          <>
            From clarified sample to purified <Em>protein.</Em>
          </>
        }
        lede="We don’t just purify your protein. We select the resin, develop the method, pack the column and demonstrate performance."
        actions={
          <Button size="lg" variant="signal" onClick={() => setOpen(true)}>
            Start an enquiry
            <ArrowRight aria-hidden />
          </Button>
        }
        aside={
          <Photo
            photo={PHOTOS.labFplcColumn}
            priority
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="[&>div]:aspect-[5/4]"
          />
        }
      />

      {/* Workflow */}
      <section aria-labelledby="workflow-title" className="border-b border-rule bg-paper-2">
        <div className="shell py-10 md:py-12">
          <h2 id="workflow-title" className="label text-ink-3">
            The workflow we cover
          </h2>
          <ol className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-3">
            {SERVICE_WORKFLOW.map((step, i) => (
              <li key={step} className="flex items-center gap-3">
                <span className="flex h-11 items-center gap-2.5 rounded-full border border-rule bg-card pl-3 pr-4 text-[0.9375rem] font-semibold">
                  <span className="label grid h-6 w-6 place-items-center rounded-full bg-ink text-paper">{i + 1}</span>
                  {step}
                </span>
                {i < SERVICE_WORKFLOW.length - 1 && <ArrowRight aria-hidden className="h-4 w-4 text-ink-3" />}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The four services */}
      <div className="shell">
        {SERVICES.map((s) => (
          <section
            key={s.slug}
            id={s.slug}
            aria-labelledby={`${s.slug}-title`}
            className="border-b border-rule py-14 md:py-20"
          >
            <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="label text-signal-ink">{s.code}</p>
                <h2 id={`${s.slug}-title`} className="display-3 mt-3">
                  {s.name}
                </h2>
                <p className="mt-4 text-xl font-medium tracking-tight text-ink-2">{s.tagline}</p>
                <div className="no-print mt-7">
                  <AddToQuote
                    size="default"
                    item={{
                      id: `svc-${s.code}`,
                      kind: "service",
                      name: s.name,
                      catNo: s.code,
                      href: `/services#${s.slug}`,
                    }}
                    label="Add to enquiry"
                  />
                </div>
              </div>
              <div className="lg:col-span-7">
                <p className="max-w-2xl text-[1.0625rem] leading-relaxed text-ink-2">{s.description}</p>
                <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                  <div>
                    <h3 className="label border-b border-ink pb-2.5 text-ink-3">{s.outputsLabel}</h3>
                    <ul>
                      {s.outputs.map((o) => (
                        <li key={o} className="border-b border-rule py-2.5 font-medium">
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="label border-b border-ink pb-2.5 text-ink-3">Typical work</h3>
                    <ul>
                      {s.examples.map((e) => (
                        <li key={e} className="border-b border-rule py-2.5 text-ink-2">
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {s.slug === "column-packing" && (
                  <dl className="mt-8 grid gap-4 rounded-lg bg-paper-2 p-5 sm:grid-cols-2">
                    <div>
                      <dt className="label text-ink-3">Column diameters</dt>
                      <dd className="mt-1.5 text-lg font-semibold tracking-tight">
                        {PACKING_OPTIONS.diameters.join(" · ")}
                      </dd>
                    </div>
                    <div>
                      <dt className="label text-ink-3">Packed volumes</dt>
                      <dd className="mt-1.5 text-lg font-semibold tracking-tight">{PACKING_OPTIONS.volumes}</dd>
                    </div>
                  </dl>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Case study */}
      <section className="theme-ink py-20 md:py-28" aria-labelledby="case-title">
        <div className="shell">
          <SectionHeader
            eyebrow="Case study · Column packing"
            title={
              <span id="case-title">
                Same resin. Same column. Same packing velocity. Different <Em>outcome.</Em>
              </span>
            }
            lede={PACKING_CASE.learning}
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-panel border border-rule bg-rule md:grid-cols-2">
            {PACKING_CASE.cases.map((c) => (
              <Reveal key={c.name} className="bg-card p-6 sm:p-8">
                <p className="label text-ink-3">{c.name}</p>
                <p className="numeral mt-3 text-[2.5rem]">{c.bed.split(" ").slice(0, 2).join(" ")}</p>
                <p className="mt-1 text-[0.9375rem] text-ink-2">{c.bed.split(" ").slice(2).join(" ")}</p>
                <p className="mt-5 border-t border-rule pt-5 text-lg font-medium leading-snug">{c.result}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
            <p className="max-w-2xl text-[0.9375rem] text-ink-2">
              {PACKING_CASE.column}. Buffer: {PACKING_CASE.buffer}. Tested with an acetone pulse.
            </p>
            <AddToQuote
              variant="outline"
              size="default"
              item={{
                id: "doc-cs-column-packing",
                kind: "document",
                name: "How packing protocol influences IEC column efficiency",
                href: "/resources",
              }}
              label="Request the case study"
            />
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="py-20 md:py-24" aria-labelledby="audience-title">
        <div className="shell grid gap-x-12 gap-y-8 lg:grid-cols-12">
          <h2 id="audience-title" className="display-3 lg:col-span-5">
            Who we work <Em>with.</Em>
          </h2>
          <div className="lg:col-span-7">
            <ul className="border-t border-ink">
              {SERVICE_AUDIENCES.map((a) => (
                <li key={a} className="border-b border-rule py-4 text-xl font-semibold tracking-tight">
                  {a}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-xl text-ink-2">
              Services cover affinity, ion exchange, hydrophobic interaction and size exclusion chromatography, and can
              be combined: screen the resin, develop the method, then have the column packed.
            </p>
          </div>
        </div>
      </section>

      <CTASection title="Describe the separation. We will propose the work." />
    </>
  );
}
