import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AddToQuote } from "@/components/catalog/AddToQuote";
import { AnchorLink } from "@/components/site/AnchorLink";
import { CTASection } from "@/components/site/CTASection";
import { PageHeader } from "@/components/site/PageHeader";
import { Photo } from "@/components/site/Photo";
import { Reveal } from "@/components/site/Reveal";
import { Em, SectionHeader } from "@/components/site/Section";
import {
  AsymmetryChart,
  EfficiencyChart,
  EfficiencyTable,
  HyIonicModes,
  KavChart,
  KavTable,
} from "@/components/viz/Evidence";
import { GradeScale } from "@/components/viz/GradeScale";
import { Halftone } from "@/components/viz/Halftone";
import { StatTile } from "@/components/viz/StatTile";
import { productsByFamily } from "@/data/catalog";
import { CAPABILITIES } from "@/data/company";
import { DEAE_PRECISE, IEX_COLUMN_TEST, SEC_CALIBRATION } from "@/data/evidence";
import { familyById, RESIN_FAMILY_IDS } from "@/data/families";
import { PHOTOS } from "@/data/photos";
import { FAMILY_STYLE } from "@/lib/family-style";
import { useSeo } from "@/lib/seo";
import { cn } from "@/lib/utils";

const section = "py-20 md:py-28";

/* Heading for one data set inside the "Performance data" section. */
function Study({
  id,
  kicker,
  title,
  source,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  source: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-rule py-12 md:py-16">
      <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="label text-signal-ink">{kicker}</p>
          <h3 id={`${id}-title`} className="heading-4 mt-3">
            {title}
          </h3>
          <p className="mt-3 text-[0.9375rem] text-ink-2">{source}</p>
        </div>
        <div className="min-w-0 lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}

export default function Technology() {
  const last = DEAE_PRECISE.pressureFlow[DEAE_PRECISE.pressureFlow.length - 1];

  useSeo({
    title: "Technology and performance data",
    description:
      "How ProtPure resins are built: cross-linked agarose beads, in-house ligand chemistry and three performance grades. With measured column efficiency, binding capacity and SEC calibration data.",
  });

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Technology" }]}
        eyebrow="Technology and data"
        title={
          <>
            Agarose, engineered bead by <Em>bead.</Em>
          </>
        }
        lede="Every ProtPure resin is built on agarose beads made in our own facility. The bead, the ligand chemistry and the column testing are all done in-house, and we publish the measurements."
        aside={
          <nav aria-label="On this page">
            <ul className="border-t border-ink">
              {[
                ["platform", "The platform"],
                ["techniques", "Six separation techniques"],
                ["grades", "Three performance grades"],
                ["data", "Performance data"],
              ].map(([target, label], i) => (
                <li key={target} className="border-b border-rule">
                  <AnchorLink target={target} className="group flex items-center gap-4 py-3.5">
                    <span className="label text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-semibold">{label}</span>
                    <ArrowRight
                      aria-hidden
                      className="ml-auto h-4 w-4 text-ink-3 transition-transform group-hover:translate-x-1"
                    />
                  </AnchorLink>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      {/* Platform */}
      <section id="platform" className={section} aria-labelledby="platform-title">
        <div className="shell">
          <SectionHeader
            index="01"
            eyebrow="The platform"
            title={
              <span id="platform-title">
                Made here, start to <Em>finish.</Em>
              </span>
            }
            lede="Keeping every step in-house, from bead formation to the packed-column test, is how we control reproducibility."
          />
          <div className="mt-12 grid gap-x-12 gap-y-10 lg:mt-16 lg:grid-cols-12">
            <ol className="lg:col-span-7">
              {CAPABILITIES.map((c, i) => (
                <Reveal
                  as="li"
                  key={c.title}
                  className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-rule py-6 first:border-ink"
                >
                  <span className="label pt-1.5 text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{c.title}</h3>
                    <p className="mt-2 max-w-xl text-ink-2">{c.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
            <Photo
              photo={PHOTOS.labFplc}
              sizes="(min-width: 1024px) 38vw, 100vw"
              caption="Protein purification system in the applications laboratory"
              className="lg:col-span-5"
            />
          </div>
        </div>
      </section>

      {/* Techniques */}
      <section
        id="techniques"
        className={cn(section, "border-y border-rule bg-paper-2")}
        aria-labelledby="techniques-title"
      >
        <div className="shell">
          <SectionHeader
            index="02"
            eyebrow="Separation techniques"
            title={
              <span id="techniques-title">
                Six ways to separate a <Em>mixture.</Em>
              </span>
            }
            lede="Each technique separates on a different property of the molecule. Combining two or three of them in sequence is what takes a crude feed to a pure product."
          />
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-16">
            {RESIN_FAMILY_IDS.map((id) => {
              const f = familyById(id);
              return (
                <Reveal
                  as="li"
                  key={id}
                  className="group relative flex gap-5 rounded-panel border border-rule bg-card p-6"
                >
                  <span
                    className={cn("grid h-20 w-20 shrink-0 place-items-center rounded-lg", FAMILY_STYLE[f.color].tint)}
                  >
                    <Halftone family={id} cells={9} className="h-14 w-14" />
                  </span>
                  <div className="min-w-0">
                    <p className="label text-ink-3">{f.abbr}</p>
                    <h3 className="mt-1 text-xl font-semibold leading-tight tracking-tight">
                      <Link
                        to={`/products?family=${id}`}
                        className="after:absolute after:inset-0 after:rounded-panel after:content-['']"
                      >
                        {f.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-[0.9375rem] leading-snug text-ink-2">{f.principle}</p>
                    <p className="mt-3 text-[0.8125rem] font-medium text-foreground">
                      {productsByFamily(id)
                        .map((p) => p.name)
                        .join(" · ")}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Grades */}
      <section id="grades" className={section} aria-labelledby="grades-title">
        <div className="shell">
          <SectionHeader
            index="03"
            eyebrow="Performance grades"
            title={
              <span id="grades-title">
                Bead size decides flow and <Em>resolution.</Em>
              </span>
            }
            lede="Larger beads let liquid through faster at the same pressure. Smaller beads shorten diffusion paths and sharpen peaks. Three grades cover the range from capture to polishing."
          />
          <Reveal className="mt-12 lg:mt-16">
            <GradeScale />
          </Reveal>
        </div>
      </section>

      {/* Data */}
      <section id="data" className="border-t border-rule pt-20 md:pt-28" aria-labelledby="data-title">
        <div className="shell">
          <SectionHeader
            index="04"
            eyebrow="Performance data"
            title={
              <span id="data-title">
                Measured, not <Em>claimed.</Em>
              </span>
            }
            lede="These are results from our own column tests, with the conditions they were measured under. Ask for the full reports with your quotation."
            className="pb-12 md:pb-16"
          />

          <Study
            id="deae"
            kicker="Ion exchange"
            title="DEAE Agarose Precise: efficiency, pressure and capacity"
            source={`${DEAE_PRECISE.column} column. ${DEAE_PRECISE.test}. May 2026.`}
          >
            <div className="grid gap-x-10 gap-y-10 md:grid-cols-2">
              <EfficiencyChart />
              <AsymmetryChart />
            </div>
            <EfficiencyTable className="mt-6" />
            <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-3">
              <StatTile
                value={DEAE_PRECISE.dbc.measured}
                unit="mg BSA/mL"
                label="Dynamic binding capacity"
                note="Measured with BSA at 10% breakthrough"
              />
              <StatTile
                value={last.pressureMPa.toFixed(2)}
                unit="MPa"
                label="Pressure drop"
                note={`At ${last.velocity} cm/h over a 45 cm bed`}
              />
              <StatTile
                value={DEAE_PRECISE.packing.compression}
                label="Bed compression"
                note={`${DEAE_PRECISE.packing.settledBed} settled to ${DEAE_PRECISE.packing.packedBed} packed, at ${DEAE_PRECISE.packing.packingVelocity}`}
              />
            </div>
            <p className="mt-8 max-w-2xl text-[0.9375rem] text-ink-2">
              Pressure–flow curves at 18 cm and 45 cm bed heights overlap, and the column was run above 400 cm/h.
              Matching profiles at both bed heights support scale-up.
            </p>
          </Study>

          <Study
            id="column-test"
            kicker="Ion exchange"
            title="Packed-column acceptance test"
            source="Column efficiency test on a packed ion-exchange column, February 2026."
          >
            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              <StatTile
                size="lg"
                value={IEX_COLUMN_TEST.asymmetry.value}
                label="Asymmetry factor, As"
                note={`Acceptance: ${IEX_COLUMN_TEST.asymmetry.acceptance}`}
              />
              <StatTile
                size="lg"
                value={IEX_COLUMN_TEST.reducedPlateHeight.value}
                label="Reduced plate height, h"
                note={`Acceptance: ${IEX_COLUMN_TEST.reducedPlateHeight.acceptance}`}
              />
            </div>
          </Study>

          <Study
            id="sec"
            kicker="Size exclusion"
            title="Molecular weight calibration and column performance"
            source={`${SEC_CALIBRATION.resin}. Column: ${SEC_CALIBRATION.column}. April 2026.`}
          >
            <div className="grid gap-x-10 gap-y-10 md:grid-cols-5">
              <div className="min-w-0 md:col-span-3">
                <KavChart />
                <KavTable className="mt-4" />
              </div>
              <div className="space-y-8 md:col-span-2">
                <StatTile
                  value={SEC_CALIBRATION.suitability.platesPerMetre.toLocaleString("en-IN")}
                  label="Theoretical plates per metre"
                  note={`${SEC_CALIBRATION.suitability.peak} peak`}
                />
                <StatTile
                  value={SEC_CALIBRATION.suitability.asymmetry}
                  label="Asymmetry factor"
                  note={`HETP ${SEC_CALIBRATION.suitability.hetpCm} cm`}
                />
                <dl className="border-t border-ink">
                  <div className="grid grid-cols-2 gap-4 border-b border-rule py-3">
                    <dt className="text-[0.875rem] text-ink-2">Fractionation range</dt>
                    <dd className="text-[0.9375rem] font-semibold">{SEC_CALIBRATION.fractionationRange}</dd>
                  </div>
                  {SEC_CALIBRATION.specs.map((s) => (
                    <div key={s.label} className="grid grid-cols-2 gap-4 border-b border-rule py-3">
                      <dt className="text-[0.875rem] text-ink-2">{s.label}</dt>
                      <dd className="text-[0.9375rem] font-semibold">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Study>

          <Study
            id="hy-ionic"
            kicker="Mixed-mode"
            title="Hy-Ionic™ DP: capacity in each mode"
            source="Dynamic binding capacity at 10% breakthrough with BSA, 1 mL column, 40 cm/h (4 min residence time). October 2026."
          >
            <HyIonicModes />
            <p className="mt-6 max-w-2xl text-[0.9375rem] text-ink-2">
              The same packed column was then stored in 0.1 M NaOH for 30 days. When the binding experiments were
              repeated, the dynamic binding capacity was retained.{" "}
              <Link to="/products/hy-ionic-dp" className="font-medium text-foreground underline underline-offset-4">
                Hy-Ionic™ DP Agarose
              </Link>
            </p>
          </Study>
        </div>
      </section>

      <section className="shell pb-20 md:pb-28" aria-label="Request the reports">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-panel bg-paper-2 p-6 sm:p-8">
          <div>
            <p className="heading-4">Want the full reports?</p>
            <p className="mt-2 max-w-xl text-ink-2">
              The DEAE Agarose Precise performance data and the SEC calibration note are sent on request.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <AddToQuote
              size="default"
              item={{
                id: "doc-tn-deae-precise",
                kind: "document",
                name: "DEAE Agarose Precise: performance data",
                href: "/resources",
              }}
              label="DEAE performance data"
            />
            <AddToQuote
              size="default"
              variant="outline"
              item={{
                id: "doc-tn-sec-calibration",
                kind: "document",
                name: "SEC: molecular weight calibration and column performance",
                href: "/resources",
              }}
              label="SEC calibration note"
            />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
