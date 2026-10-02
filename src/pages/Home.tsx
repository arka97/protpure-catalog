import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FamilyBadge, NewTag } from "@/components/catalog/Badges";
import { ProductThumb } from "@/components/catalog/ProductFigure";
import { ResinFinder } from "@/components/catalog/ResinFinder";
import { CTASection } from "@/components/site/CTASection";
import { Photo } from "@/components/site/Photo";
import { Reveal } from "@/components/site/Reveal";
import { Em, Eyebrow, SectionHeader } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { ColumnHero } from "@/components/viz/ColumnHero";
import { EfficiencyChart, EfficiencyTable } from "@/components/viz/Evidence";
import { GradeScale } from "@/components/viz/GradeScale";
import { Halftone } from "@/components/viz/Halftone";
import { ProductIllustration } from "@/components/viz/ProductIllustration";
import { StatTile } from "@/components/viz/StatTile";
import { useRFQ } from "@/context/RFQContext";
import { APPLICATIONS } from "@/data/applications";
import { CATALOGUE_COUNT, FEATURED_SLUGS, productBySlug, productsByFamily } from "@/data/catalog";
import { FACILITY_FACTS, FOUNDER, INDUSTRIES } from "@/data/company";
import { DEAE_PRECISE } from "@/data/evidence";
import { familyById, RESIN_FAMILY_IDS } from "@/data/families";
import { EMPTY_COLUMNS } from "@/data/hardware";
import { PHOTOS } from "@/data/photos";
import { SERVICES } from "@/data/services";
import { SITE } from "@/data/site";
import { FAMILY_STYLE } from "@/lib/family-style";
import { useSeo } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { FamilyId, Product } from "@/types/catalog";

const section = "py-20 md:py-28";

/* ------------------------------------------------------------------ Hero */

function Hero() {
  const { setOpen } = useRFQ();
  const facts = [
    { value: "600 L", label: "monthly resin manufacturing capacity in Anand" },
    { value: String(RESIN_FAMILY_IDS.length), label: "separation chemistries on one agarose platform" },
    { value: String(CATALOGUE_COUNT), label: "catalogue items, from 1 mL columns to 1 L packs" },
  ];
  return (
    <section className="relative overflow-hidden border-b border-rule">
      <div
        aria-hidden
        className="dotgrid absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,transparent_70%)]"
      />
      <div className="shell relative grid gap-x-10 gap-y-10 pb-14 pt-10 lg:grid-cols-12 lg:pb-20 lg:pt-16">
        <div className="lg:col-span-7">
          <Eyebrow className="animate-fade-up">Agarose chromatography resins · Made in India</Eyebrow>
          <h1 className="display-1 mt-6 animate-fade-up [animation-delay:60ms]">
            Purity,
            <br />
            <Em>resolved.</Em>
          </h1>
          <p className="lede mt-7 max-w-[34rem] animate-fade-up [animation-delay:140ms]">
            Chromatography resins, pre-packed columns and purification services for proteins, peptides and nucleic
            acids. Six separation chemistries on one agarose platform, in grades that run from capture to polishing.
          </p>
          <div className="mt-9 flex flex-wrap gap-3 animate-fade-up [animation-delay:220ms]">
            <Button size="lg" variant="signal" onClick={() => setOpen(true)}>
              Request a quote
              <ArrowRight aria-hidden />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/products">Explore the catalogue</Link>
            </Button>
          </div>
          <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-x-6 border-t border-rule pt-6 animate-fade-up [animation-delay:300ms]">
            {facts.map((f) => (
              <div key={f.label} className="flex flex-col-reverse justify-end gap-2">
                <dt className="text-[0.8125rem] leading-snug text-ink-2">{f.label}</dt>
                <dd className="numeral text-[clamp(1.75rem,4.2vw,3rem)]">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mx-auto w-full max-w-[26rem] lg:col-span-5 lg:max-w-none lg:pl-4">
          <ColumnHero />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Proof strip */

const PROOF = [
  { title: "First Indian manufacturer of Ni-NTA Agarose", text: "Now in commercial supply." },
  { title: "In use at GMP facilities", text: "With repeat orders from Indian biopharma companies." },
  {
    title: "Made end to end in Anand, Gujarat",
    text: "Bead synthesis, ligand chemistry, packing and testing in-house.",
  },
  {
    title: "Scientists on the line",
    text: "Method development and evaluation support from the people who make the resin.",
  },
];

function ProofStrip() {
  return (
    <section aria-label="Why ProtPure" className="overflow-hidden border-b border-rule">
      <div className="shell">
        <ul className="grid gap-px bg-rule sm:-mx-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROOF.map((p, i) => (
            <li key={p.title} className="bg-background py-6 sm:px-6 lg:py-8">
              <p className="label text-signal-ink">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-3 font-semibold leading-snug">{p.title}</p>
              <p className="mt-1.5 text-[0.9375rem] leading-snug text-ink-2">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Portfolio */

/* The product line whose picture stands for each chemistry on the home page. */
const FAMILY_PICTURE: Partial<Record<FamilyId, string>> = {
  imac: "ni-nta-agarose",
  iex: "sp-agarose",
  hic: "phenyl-agarose",
  mixed: "hy-ionic-dp",
  mrc: "mr-agarose",
  sec: "plain-agarose",
};

function FamilyTile({ id, index }: { id: (typeof RESIN_FAMILY_IDS)[number]; index: number }) {
  const family = familyById(id);
  const style = FAMILY_STYLE[family.color];
  const products = productsByFamily(id);
  return (
    <Reveal
      as="article"
      delay={(index % 3) * 70}
      className={cn(
        "group relative isolate flex min-h-[24rem] flex-col overflow-hidden rounded-panel p-6 sm:p-7",
        style.tint,
      )}
    >
      <Halftone
        family={id}
        className="pointer-events-none absolute -right-8 -top-8 -z-10 h-52 w-52 origin-top-right transition-transform duration-700 group-hover:scale-105"
      />
      <p className="label text-ink-2">{family.abbr}</p>
      <ProductThumb slug={FAMILY_PICTURE[id] ?? ""} className="mt-5 w-[5.5rem]" />
      <h3 className="heading-4 mt-auto pt-8">
        <Link to={`/products?family=${id}`} className="after:absolute after:inset-0 after:content-['']">
          {family.name}
        </Link>
      </h3>
      <p className="mt-2 max-w-[38ch] text-[0.9375rem] leading-snug text-ink-2">{family.summary}</p>
      <ul className="relative z-10 mt-5 flex flex-wrap gap-1.5">
        {products.map((p) => (
          <li key={p.slug}>
            <Link
              to={`/products/${p.slug}`}
              className="inline-flex h-8 items-center gap-1.5 rounded-full bg-card/80 px-3 text-[0.8125rem] font-medium backdrop-blur-sm transition-colors hover:bg-card"
            >
              {p.name}
              {p.isNew && <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-label="New" role="img" />}
            </Link>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

function Portfolio() {
  return (
    <section className={section} aria-labelledby="portfolio-title">
      <div className="shell">
        <SectionHeader
          index="01"
          eyebrow="The portfolio"
          title={
            <span id="portfolio-title">
              Six chemistries. One agarose <Em>platform.</Em>
            </span>
          }
          lede="Every ProtPure resin starts from agarose beads made in our own facility. Choose by technique, or let the resin finder suggest a route for your molecule."
          action={
            <Link to="/products" className="link">
              See the full catalogue
            </Link>
          }
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {RESIN_FAMILY_IDS.map((id, i) => (
            <FamilyTile key={id} id={id} index={i} />
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-12">
          <Reveal
            as="article"
            className="group relative grid overflow-hidden rounded-panel border border-rule bg-card sm:grid-cols-2 lg:col-span-6"
          >
            <div className="flex flex-col p-6 sm:p-7">
              <FamilyBadge family="columns" />
              <h3 className="heading-4 mt-auto pt-10">
                <Link to="/products?family=columns" className="after:absolute after:inset-0 after:content-['']">
                  Pre-packed columns
                </Link>
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-snug text-ink-2">
                Ready-to-use 1 mL and 5 mL columns packed with Ni-, Co-, Cu- and Zn-NTA Agarose.
              </p>
            </div>
            <img
              src={PHOTOS.columnsBox.src}
              srcSet={PHOTOS.columnsBox.srcSet}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              width={PHOTOS.columnsBox.width}
              height={PHOTOS.columnsBox.height}
              alt={PHOTOS.columnsBox.alt}
              loading="lazy"
              decoding="async"
              className="h-full min-h-[12rem] w-full object-cover"
            />
          </Reveal>
          <Reveal
            as="article"
            delay={70}
            className="group relative flex flex-col overflow-hidden rounded-panel border border-rule bg-card lg:col-span-3"
          >
            <img
              src={PHOTOS.mrKit.src}
              srcSet={PHOTOS.mrKit.srcSet}
              sizes="(min-width: 1024px) 25vw, 100vw"
              width={PHOTOS.mrKit.width}
              height={PHOTOS.mrKit.height}
              alt={PHOTOS.mrKit.alt}
              loading="lazy"
              decoding="async"
              className="h-44 w-full object-cover object-[center_70%]"
            />
            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <FamilyBadge family="kits" />
              <h3 className="heading-4 mt-auto pt-6">
                <Link to="/products?family=kits" className="after:absolute after:inset-0 after:content-['']">
                  Kits
                </Link>
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-snug text-ink-2">
                His-tag purification and metal-removal evaluation kits, ten reactions each.
              </p>
            </div>
          </Reveal>
          <Reveal
            as="article"
            delay={140}
            className="group relative flex flex-col overflow-hidden rounded-panel border border-rule bg-card lg:col-span-3"
          >
            <div className="h-44 bg-paper-2 py-4">
              <ProductIllustration id="empty-columns" decorative className="mx-auto h-full w-auto" />
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <FamilyBadge family="hardware" />
              <h3 className="heading-4 mt-auto pt-6">
                <Link to="/products/empty-columns" className="after:absolute after:inset-0 after:content-['']">
                  Empty columns
                </Link>
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-snug text-ink-2">
                {EMPTY_COLUMNS.length} adjustable glass columns, 16 to 50 mm inner diameter.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Grades */

function Grades() {
  return (
    <section className={cn(section, "border-y border-rule bg-paper-2")} aria-labelledby="grades-title">
      <div className="shell">
        <SectionHeader
          index="02"
          eyebrow="Performance grades"
          title={
            <span id="grades-title">
              One ligand, three grades: capture to <Em>polishing.</Em>
            </span>
          }
          lede="Bead size sets the balance between flow and resolution. Most ProtPure resins come in three grades, so the same chemistry can follow your process from the first capture step to the final polish."
        />
        <Reveal className="mt-12 lg:mt-16">
          <GradeScale />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Resin finder */

function Finder() {
  return (
    <section className={section} aria-labelledby="finder-title">
      <div className="shell">
        <SectionHeader
          index="03"
          eyebrow="Resin finder"
          title={
            <span id="finder-title">
              What are you <Em>purifying?</Em>
            </span>
          }
          lede={`${APPLICATIONS.length} application areas, ${APPLICATIONS.reduce((n, a) => n + a.subs.length, 0)} workflows. Pick yours to see which resins we recommend for capture, intermediate purification and polishing.`}
        />
        <Reveal className="mt-12 lg:mt-16">
          <ResinFinder />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Evidence */

function Evidence() {
  const top = DEAE_PRECISE.efficiency[DEAE_PRECISE.efficiency.length - 1];
  const last = DEAE_PRECISE.pressureFlow[DEAE_PRECISE.pressureFlow.length - 1];
  return (
    <section className={cn(section, "theme-ink")} aria-labelledby="evidence-title">
      <div className="shell">
        <SectionHeader
          index="04"
          eyebrow="Performance data"
          title={
            <span id="evidence-title">
              Measured, not <Em>claimed.</Em>
            </span>
          }
          lede="We show the test behind the number. This is DEAE Agarose Precise in a 50 mm column: efficiency, peak shape, pressure and capacity, measured in May 2026."
        />
        <div className="mt-12 grid gap-x-12 gap-y-12 lg:mt-16 lg:grid-cols-12">
          <Reveal className="min-w-0 rounded-panel bg-card p-6 sm:p-8 lg:col-span-7">
            <EfficiencyChart />
            <EfficiencyTable className="mt-4" />
          </Reveal>
          <div className="grid content-start gap-x-8 gap-y-8 sm:grid-cols-2 lg:col-span-5">
            <StatTile
              value={top.platesPerMetre.toLocaleString("en-IN")}
              label="Theoretical plates per metre"
              note={`At ${top.velocity} cm/h, 18.2 cm packed bed`}
            />
            <StatTile
              value={DEAE_PRECISE.asymmetryRange}
              label="Asymmetry factor"
              note="Across 50 to 200 cm/h. Acceptance range 0.8 to 1.8"
            />
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
            <div className="sm:col-span-2">
              <Button variant="outline" asChild>
                <Link to="/technology#data">
                  See all performance data
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Featured */

function FeatureCard({ product, delay }: { product: Product; delay: number }) {
  return (
    <Reveal
      as="article"
      delay={delay}
      className="group relative flex flex-col rounded-panel border border-rule bg-card p-6 transition-colors hover:border-ink/60"
    >
      <div className="flex items-center justify-between gap-3">
        <FamilyBadge family={product.family} />
        {product.isNew && <NewTag />}
      </div>
      <div className="mt-6 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-xl font-semibold leading-tight tracking-tight">
            <Link
              to={`/products/${product.slug}`}
              className="after:absolute after:inset-0 after:rounded-panel after:content-['']"
            >
              {product.name}
            </Link>
          </h3>
          <p className="mt-1.5 text-[0.9375rem] text-ink-2">{product.descriptor}</p>
        </div>
        <ProductThumb slug={product.slug} className="w-16 border border-rule" />
      </div>
      <p className="mt-auto flex items-end justify-between gap-3 pt-6 text-[0.8125rem] text-ink-2">
        <span>{product.highlights[0]}</span>
        <ArrowUpRight
          aria-hidden
          className="h-5 w-5 shrink-0 text-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </p>
    </Reveal>
  );
}

function Featured() {
  const [lead, ...rest] = FEATURED_SLUGS.map((s) => productBySlug(s)).filter((p): p is Product => Boolean(p));
  return (
    <section className={section} aria-labelledby="featured-title">
      <div className="shell">
        <SectionHeader
          index="05"
          eyebrow="Featured"
          title={
            <span id="featured-title">
              New chemistry, and the core of the <Em>range.</Em>
            </span>
          }
        />
        <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-12">
          <Reveal
            as="article"
            className="theme-ink group relative isolate flex flex-col overflow-hidden rounded-panel p-7 [--hic:36_85%_58%] [--iex:245_70%_72%] sm:p-10 lg:col-span-6"
          >
            <Halftone
              family="mixed"
              cells={15}
              className="pointer-events-none absolute -right-16 -top-16 -z-10 h-80 w-80 opacity-80"
            />
            <div className="flex items-center gap-3">
              <NewTag />
              <span className="label text-on-ink-2">Mixed-mode</span>
            </div>
            <h3 className="display-3 mt-auto max-w-[12ch] pt-40">
              <Link to={`/products/${lead.slug}`} className="after:absolute after:inset-0 after:content-['']">
                {lead.name}
              </Link>
            </h3>
            <p className="mt-4 max-w-md text-[1.0625rem] leading-relaxed text-on-ink-2">
              One resin, two modes. DEAE and phenyl ligands on a single bead: run it as an anion exchanger, as a HIC
              resin, or switch between them on the same column.
            </p>
            <dl className="mt-8 grid max-w-md grid-cols-2 gap-6 border-t border-ink-line pt-6">
              <div>
                <dd className="numeral text-[2.5rem]">100</dd>
                <dt className="mt-1 text-[0.8125rem] text-on-ink-2">mg BSA/mL in DEAE mode</dt>
              </div>
              <div>
                <dd className="numeral text-[2.5rem]">30</dd>
                <dt className="mt-1 text-[0.8125rem] text-on-ink-2">mg BSA/mL in HIC mode</dt>
              </div>
            </dl>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
            {rest.map((p, i) => (
              <FeatureCard key={p.slug} product={p} delay={70 * (i + 1)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Services */

function ServicesBand() {
  return (
    <section className={cn(section, "border-y border-rule bg-paper-2")} aria-labelledby="services-title">
      <div className="shell grid gap-x-12 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Eyebrow index="06" className="mb-5">
            Services
          </Eyebrow>
          <h2 id="services-title" className="display-3">
            We select the resin, develop the method, pack the column and <Em>demonstrate</Em> performance.
          </h2>
          <Photo
            photo={PHOTOS.labFplc}
            sizes="(min-width: 1024px) 46vw, 100vw"
            caption="Applications laboratory, Anand"
            className="mt-10"
          />
        </div>
        <div className="lg:col-span-6 lg:pl-6">
          <ol className="border-t border-ink">
            {SERVICES.map((s) => (
              <Reveal as="li" key={s.slug} className="group relative border-b border-rule py-6">
                <div className="grid grid-cols-[3.5rem_1fr_auto] items-start gap-x-4">
                  <span className="label pt-1.5 text-ink-3">{s.code}</span>
                  <div>
                    <h3 className="text-xl font-semibold leading-tight tracking-tight">
                      <Link to={`/services#${s.slug}`} className="after:absolute after:inset-0 after:content-['']">
                        {s.name}
                      </Link>
                    </h3>
                    <p className="mt-1.5 text-[0.9375rem] text-ink-2">{s.tagline}</p>
                  </div>
                  <ArrowRight
                    aria-hidden
                    className="mt-1.5 h-5 w-5 text-ink-3 transition-transform group-hover:translate-x-1 group-hover:text-foreground"
                  />
                </div>
              </Reveal>
            ))}
          </ol>
          <p className="mt-8 max-w-lg text-ink-2">
            For academic and research laboratories, research centres, CROs, biotech start-ups and industry.
          </p>
          <Button className="mt-6" asChild>
            <Link to="/services">
              How the services work
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Company */

function Company() {
  const facts = FACILITY_FACTS.filter((f) => ["Location", "Established", "Capacity", "In use"].includes(f.label));
  return (
    <section className={section} aria-labelledby="company-title">
      <div className="shell">
        <SectionHeader
          index="07"
          eyebrow="The company"
          title={
            <span id="company-title">
              Developed in India. <Em>Manufactured</Em> in India.
            </span>
          }
          lede="A large share of the chromatography media used in India is imported. ProtPure was founded in 2023 to change that, with resins developed, made and tested in Anand, Gujarat."
        />

        <div className="mt-12 grid gap-x-12 gap-y-12 lg:mt-16 lg:grid-cols-12">
          <div className="grid grid-cols-5 content-start gap-4 lg:col-span-6">
            <Photo
              photo={PHOTOS.bpg200}
              sizes="(min-width: 1024px) 28vw, 60vw"
              className="col-span-3 [&>div]:aspect-[4/5]"
            />
            <Photo
              photo={PHOTOS.packedColumn}
              sizes="(min-width: 1024px) 18vw, 40vw"
              className="col-span-2 [&>div]:aspect-[8/15]"
            />
            <p className="col-span-5 text-[0.8125rem] text-ink-3">
              ProtPure Ni-NTA Agarose packed at process scale and in the laboratory
            </p>
          </div>

          <div className="lg:col-span-6 lg:pl-6">
            <figure>
              <blockquote className="text-[clamp(1.375rem,2.2vw,1.875rem)] font-medium leading-[1.25] tracking-tight">
                “{FOUNDER.quote}”
              </blockquote>
              <figcaption className="mt-5 text-[0.9375rem]">
                <span className="font-semibold">{FOUNDER.name}</span>
                <span className="text-ink-2">, {FOUNDER.role}</span>
              </figcaption>
            </figure>

            <dl className="mt-10 border-t border-ink">
              {facts.map((f) => (
                <div key={f.label} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-rule py-3.5">
                  <dt className="label pt-1 text-ink-3">{f.label}</dt>
                  <dd className="font-medium">{f.value}</dd>
                </div>
              ))}
            </dl>
            <Button variant="outline" className="mt-8" asChild>
              <Link to="/about">
                About {SITE.name}
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 border-t border-rule pt-8 lg:mt-24">
          <p className="label text-ink-3">Industries we supply</p>
          <ul className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind) => (
              <li key={ind.name}>
                <p className="text-lg font-semibold tracking-tight">{ind.name}</p>
                <p className="mt-1 text-[0.9375rem] text-ink-2">{ind.items.join(" · ")}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Page */

export default function Home() {
  useSeo({
    title: "ProtPure | Agarose chromatography resins, made in India",
    description: SITE.description,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE.name,
      legalName: SITE.legalName,
      url: SITE.url,
      email: SITE.email,
      telephone: SITE.phone,
      foundingDate: SITE.founded,
      description: SITE.description,
      sameAs: [SITE.linkedin],
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address.lines.slice(0, 2).join(", "),
        addressLocality: SITE.address.locality,
        addressRegion: SITE.address.region,
        postalCode: SITE.address.postalCode,
        addressCountry: SITE.address.country,
      },
    },
  });

  return (
    <>
      <Hero />
      <ProofStrip />
      <Portfolio />
      <Grades />
      <Finder />
      <Evidence />
      <Featured />
      <ServicesBand />
      <Company />
      <CTASection />
    </>
  );
}
