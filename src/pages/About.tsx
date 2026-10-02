import { ArrowUpRight } from "lucide-react";
import { CTASection } from "@/components/site/CTASection";
import { PageHeader } from "@/components/site/PageHeader";
import { Photo } from "@/components/site/Photo";
import { Reveal } from "@/components/site/Reveal";
import { Em, Eyebrow, SectionHeader } from "@/components/site/Section";
import {
  CAPABILITIES,
  EVALUATION_STEPS,
  FACILITY_FACTS,
  FOUNDER,
  INDUSTRIES,
  MILESTONES,
  MISSION,
  VISION,
  WHY_PROTPURE,
} from "@/data/company";
import { PHOTOS } from "@/data/photos";
import { MAPS_URL, SITE } from "@/data/site";
import { useSeo } from "@/lib/seo";

const section = "py-20 md:py-28";

export default function About() {
  useSeo({
    title: "Company: an Indian chromatography resin manufacturer",
    description:
      "Protpure Tech Pvt. Ltd. develops and manufactures agarose chromatography media in Anand, Gujarat. Established in 2023, founder-led, with 600 L of monthly resin capacity.",
  });

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Company" }]}
        eyebrow="Company"
        title={
          <>
            Building India’s chromatography resin <Em>platform.</Em>
          </>
        }
        lede="Protpure Tech Pvt. Ltd. develops and manufactures agarose chromatography media in Anand, Gujarat, for biotechnology, diagnostics, vaccine and research organisations."
        aside={
          <Photo
            photo={PHOTOS.labFplcColumn}
            priority
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="[&>div]:aspect-[5/4]"
          />
        }
      />

      {/* Founder */}
      <section className={section} aria-label="From the founder">
        <div className="shell grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <Eyebrow index="01" className="self-start lg:col-span-3 lg:pt-4">
            From the founder
          </Eyebrow>
          <figure className="lg:col-span-9">
            <blockquote className="text-[clamp(1.625rem,3.2vw,2.75rem)] font-medium leading-[1.16] tracking-tight">
              “{FOUNDER.quote}”
            </blockquote>
            <figcaption className="mt-7 flex items-center gap-4">
              <span aria-hidden className="h-px w-10 bg-ink" />
              <span>
                <span className="block font-semibold">{FOUNDER.name}</span>
                <span className="block text-[0.9375rem] text-ink-2">
                  {FOUNDER.role}, {SITE.legalName}
                </span>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Vision and mission */}
      <section className="border-y border-rule bg-paper-2" aria-label="Vision and mission">
        <div className="shell grid md:grid-cols-2">
          <div className="border-rule py-12 md:border-r md:py-16 md:pr-12">
            <h2 className="label text-ink-3">Vision</h2>
            <p className="mt-4 text-[clamp(1.25rem,1.9vw,1.625rem)] font-medium leading-snug tracking-tight">
              {VISION}
            </p>
          </div>
          <div className="border-t border-rule py-12 md:border-t-0 md:py-16 md:pl-12">
            <h2 className="label text-ink-3">Mission</h2>
            <p className="mt-4 text-[clamp(1.25rem,1.9vw,1.625rem)] font-medium leading-snug tracking-tight">
              {MISSION}
            </p>
          </div>
        </div>
      </section>

      {/* Facts and milestones */}
      <section className={section} aria-labelledby="facts-title">
        <div className="shell">
          <SectionHeader
            index="02"
            eyebrow="At a glance"
            title={
              <span id="facts-title">
                Founder-led, bootstrapped, and <Em>shipping.</Em>
              </span>
            }
            lede="A large share of the chromatography media used in India is imported. We are building the local alternative: reliable supply, technical support close at hand, and manufacturing that can scale."
          />
          <div className="mt-12 grid gap-x-12 gap-y-12 lg:mt-16 lg:grid-cols-12">
            <dl className="border-t border-ink lg:col-span-7">
              {FACILITY_FACTS.map((f) => (
                <div
                  key={f.label}
                  className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-rule py-4 sm:grid-cols-[10rem_1fr]"
                >
                  <dt className="label pt-1 text-ink-3">{f.label}</dt>
                  <dd className="text-lg font-medium leading-snug tracking-tight">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="lg:col-span-5">
              <h3 className="label border-b border-ink pb-4 text-ink-3">Milestones</h3>
              <ol>
                {MILESTONES.map((m, i) => (
                  <Reveal as="li" key={m} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-rule py-4">
                    <span className="label pt-1 text-signal-ink">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-medium leading-snug">{m}</span>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className={`${section} theme-ink`} aria-labelledby="capabilities-title">
        <div className="shell">
          <SectionHeader
            index="03"
            eyebrow="Capabilities"
            title={
              <span id="capabilities-title">
                From the bead to the packed <Em>column.</Em>
              </span>
            }
            lede="Media development, purification evaluation and customer deployment sit under one roof."
          />
          <div className="mt-12 grid gap-x-12 gap-y-10 lg:mt-16 lg:grid-cols-12">
            <div className="grid grid-cols-2 gap-4 self-start lg:col-span-6">
              <Photo photo={PHOTOS.labFplc} sizes="(min-width: 1024px) 46vw, 100vw" className="col-span-2" />
              <Photo photo={PHOTOS.bpg200} sizes="(min-width: 1024px) 23vw, 50vw" className="[&>div]:aspect-square" />
              <Photo
                photo={PHOTOS.columnsFan}
                sizes="(min-width: 1024px) 23vw, 50vw"
                className="[&>div]:aspect-square"
              />
              <p className="col-span-2 text-[0.8125rem] text-ink-3">
                Applications laboratory · Ni-NTA Agarose in a process column at a customer site · 1 mL pre-packed
                columns
              </p>
            </div>
            <ol className="lg:col-span-6">
              {CAPABILITIES.map((c, i) => (
                <li
                  key={c.title}
                  className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-rule py-6 first:border-foreground"
                >
                  <span className="label pt-1.5 text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{c.title}</h3>
                    <p className="mt-2 text-ink-2">{c.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Why ProtPure */}
      <section className={section} aria-labelledby="why-title">
        <div className="shell">
          <SectionHeader
            index="04"
            eyebrow="Why ProtPure"
            title={
              <span id="why-title">
                Four reasons to qualify a second <Em>source.</Em>
              </span>
            }
          />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-panel border border-rule bg-rule sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {WHY_PROTPURE.map((w, i) => (
              <li key={w.title} className="bg-card p-6 sm:p-7">
                <p className="label text-signal-ink">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-10 text-xl font-semibold leading-tight tracking-tight">{w.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-ink-2">{w.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Evaluation */}
      <section className={`${section} border-y border-rule bg-paper-2`} aria-labelledby="evaluation-title">
        <div className="shell">
          <SectionHeader
            index="05"
            eyebrow="Working with us"
            title={
              <span id="evaluation-title">
                Low-risk technical evolution, not supplier <Em>replacement.</Em>
              </span>
            }
            lede="You do not have to change your process to find out whether our resin works in it. This is the evaluation approach we recommend."
          />
          <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {EVALUATION_STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 70} className="border-t border-ink pt-5">
                <p className="numeral text-[2.5rem] text-ink-3">{i + 1}</p>
                <h3 className="mt-4 text-xl font-semibold leading-tight tracking-tight">{s.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-ink-2">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Industries and location */}
      <section className={section} aria-labelledby="industries-title">
        <div className="shell grid gap-x-12 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow index="06" className="mb-5">
              Industries
            </Eyebrow>
            <h2 id="industries-title" className="display-3">
              Industries we <Em>serve.</Em>
            </h2>
            <ul className="mt-10 grid gap-x-8 sm:grid-cols-2">
              {INDUSTRIES.map((ind) => (
                <li key={ind.name} className="border-t border-rule py-5">
                  <p className="text-lg font-semibold tracking-tight">{ind.name}</p>
                  <p className="mt-1 text-[0.9375rem] text-ink-2">{ind.items.join(" · ")}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5 lg:pl-6">
            <div className="rounded-panel border border-rule bg-card p-6 sm:p-8">
              <p className="label text-ink-3">Where we are</p>
              <address className="mt-4 text-lg font-medium not-italic leading-snug tracking-tight">
                {SITE.legalName}
                {SITE.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <dl className="mt-6 space-y-2 border-t border-rule pt-5 text-[0.9375rem]">
                <div className="flex gap-3">
                  <dt className="label w-14 pt-1 text-ink-3">Email</dt>
                  <dd>
                    <a href={`mailto:${SITE.email}`} className="font-medium underline underline-offset-4">
                      {SITE.email}
                    </a>
                  </dd>
                </div>
                <div className="flex gap-3">
                  <dt className="label w-14 pt-1 text-ink-3">Phone</dt>
                  <dd>
                    <a href={SITE.phoneHref} className="font-medium underline underline-offset-4">
                      {SITE.phone}
                    </a>
                  </dd>
                </div>
              </dl>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
              >
                Open in Google Maps
                <ArrowUpRight aria-hidden className="h-4 w-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTASection title="Let’s build India’s biotechnology future together." />
    </>
  );
}
