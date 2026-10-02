import type { ReactNode } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowRight, Check, Printer } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { AddToQuote } from "@/components/catalog/AddToQuote";
import { FamilyBadge, GradeBadge, NewTag, StageBadges } from "@/components/catalog/Badges";
import { EmptyColumnsTable } from "@/components/catalog/EmptyColumnsTable";
import { PackTable } from "@/components/catalog/PackTable";
import { ProductLineCard } from "@/components/catalog/ProductLineCard";
import { SpecTable } from "@/components/catalog/SpecTable";
import { AnchorLink } from "@/components/site/AnchorLink";
import { CTASection } from "@/components/site/CTASection";
import { Breadcrumbs } from "@/components/site/PageHeader";
import { Photo } from "@/components/site/Photo";
import { Button } from "@/components/ui/button";
import { AsymmetryChart, EfficiencyChart, EfficiencyTable, HyIonicModes } from "@/components/viz/Evidence";
import { Halftone } from "@/components/viz/Halftone";
import { StatTile } from "@/components/viz/StatTile";
import { applicationsForProduct } from "@/data/applications";
import { productBySlug } from "@/data/catalog";
import { DEAE_PRECISE } from "@/data/evidence";
import { familyById } from "@/data/families";
import { PHOTOS } from "@/data/photos";
import { resourcesForProduct } from "@/data/resources";
import { SITE } from "@/data/site";
import { variantHeadline } from "@/lib/catalog-helpers";
import { FAMILY_STYLE } from "@/lib/family-style";
import { Sci, sciToText } from "@/lib/sci";
import { useSeo } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/catalog";
import NotFound from "./NotFound";

/* A page section: label and heading in the margin, content beside it. */
interface BlockProps {
  id: string;
  label: string;
  title: string;
  /** Leave the section out of the printed datasheet. */
  screenOnly?: boolean;
  children: ReactNode;
}

function Block({ id, label, title, screenOnly, children }: BlockProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("scroll-mt-28 border-t border-rule py-12 print:py-6 md:py-16", screenOnly && "no-print")}
    >
      <div className="shell grid gap-x-12 gap-y-6 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <p className="label text-ink-3">{label}</p>
          <h2 id={`${id}-title`} className="heading-4 mt-2">
            {title}
          </h2>
        </div>
        <div className="min-w-0 lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Product-specific evidence */

function DeaeEvidence() {
  const last = DEAE_PRECISE.pressureFlow[DEAE_PRECISE.pressureFlow.length - 1];
  return (
    <>
      <p className="max-w-3xl text-ink-2">
        DEAE Agarose Precise packed in a {DEAE_PRECISE.column} column and tested with an acetone pulse. Settled bed{" "}
        {DEAE_PRECISE.packing.settledBed}, packed bed {DEAE_PRECISE.packing.packedBed}, packing factor{" "}
        {DEAE_PRECISE.packing.packingFactor}.
      </p>
      <div className="mt-8 grid gap-x-10 gap-y-10 md:grid-cols-2">
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
          note={`At ${last.velocity} cm/h, 45 cm bed`}
        />
        <StatTile
          value={DEAE_PRECISE.packing.compression}
          label="Bed compression"
          note={`Packed at ${DEAE_PRECISE.packing.packingVelocity}`}
        />
      </div>
    </>
  );
}

const EVIDENCE: Record<string, { label: string; title: string; content: ReactNode }> = {
  "hy-ionic-dp": { label: "How it works", title: "Two modes on one bead", content: <HyIonicModes /> },
  "deae-agarose": { label: "Performance data", title: "Measured in May 2026", content: <DeaeEvidence /> },
  "ni-nta-agarose": {
    label: "In use",
    title: "From the bench to process scale",
    content: (
      <div className="grid gap-4 sm:grid-cols-5">
        <Photo
          photo={PHOTOS.bpg200}
          sizes="(min-width: 1024px) 40vw, 60vw"
          caption="Ni-NTA Agarose in a process-scale column at a customer site"
          className="sm:col-span-3 [&>div]:aspect-[11/10]"
        />
        <Photo
          photo={PHOTOS.packedColumn}
          sizes="(min-width: 1024px) 25vw, 40vw"
          caption="Packed laboratory column"
          className="sm:col-span-2 [&>div]:aspect-[22/31]"
        />
      </div>
    ),
  },
  "ni-nta-prepacked-columns": {
    label: "The columns",
    title: "Ready to connect",
    content: (
      <Photo
        photo={PHOTOS.columnsPair}
        sizes="(min-width: 1024px) 60vw, 100vw"
        caption="Ni-NTA Agarose 1 mL pre-packed columns"
      />
    ),
  },
};

/* ------------------------------------------------------------------ Page */

function Detail({ product }: { product: Product }) {
  const [params] = useSearchParams();
  const family = familyById(product.family);
  const style = FAMILY_STYLE[family.color];
  const gradeParam = params.get("grade");
  const active =
    product.variants.find((v) => v.id === params.get("variant")) ??
    product.variants.find((v) => gradeParam && v.grade === gradeParam);
  const usedIn = applicationsForProduct(product.slug);
  const documents = resourcesForProduct(product.slug);
  const related = product.related.map((s) => productBySlug(s)).filter((p): p is Product => Boolean(p));
  const evidence = EVIDENCE[product.slug];
  const glance = product.variants.map((v) => ({ variant: v, headline: variantHeadline(v) })).filter((g) => g.headline);
  const isHardware = product.kind === "hardware";
  const secData = product.family === "sec";

  // Browser tabs and search results cut long titles: fall back to "name | technique" when the descriptor is long.
  const fullTitle = `${sciToText(product.name)}: ${product.descriptor}`;
  useSeo({
    title: fullTitle.length <= 58 ? fullTitle : `${sciToText(product.name)} | ${family.title}`,
    description: product.summary,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.summary,
      category: family.title,
      brand: { "@type": "Brand", name: SITE.name },
      manufacturer: { "@type": "Organization", name: SITE.legalName },
      url: `${SITE.url}/products/${product.slug}`,
    },
  });

  return (
    <article>
      {/* Letterhead, on paper only */}
      <div className="shell hidden items-end justify-between gap-6 border-b border-ink pb-4 print:flex">
        <Logo className="h-10" />
        <p className="text-right text-[9pt] leading-snug">
          {SITE.legalName}
          <br />
          {SITE.email} · {SITE.phone}
          <br />
          {SITE.url.replace("https://", "")}/products/{product.slug}
        </p>
      </div>

      {/* Header */}
      <header className="shell pb-12 pt-8 md:pb-16 md:pt-10">
        <Breadcrumbs
          crumbs={[
            { label: "Products", to: "/products" },
            { label: family.name, to: `/products?family=${family.id}` },
            { label: product.name },
          ]}
          className="mb-10 md:mb-14"
        />
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <FamilyBadge family={product.family} />
              {product.isNew && <NewTag />}
            </div>
            <h1 className="display-2 mt-5">{product.name}</h1>
            <p className="mt-4 text-xl font-medium tracking-tight text-ink-2">{product.descriptor}</p>
            <p className="lede mt-6 max-w-2xl">{product.summary}</p>
            <StageBadges stages={product.stages} className="mt-6" />
            <div className="no-print mt-8 flex flex-wrap gap-3">
              <Button size="lg" variant="signal" asChild>
                <AnchorLink target="order">
                  {isHardware ? "Choose a column" : "Pack sizes and quote"}
                  <ArrowRight aria-hidden />
                </AnchorLink>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to={`/contact?about=${encodeURIComponent(product.name)}`}>Ask a scientist</Link>
              </Button>
              <Button size="lg" variant="ghost" onClick={() => window.print()} className="hidden md:inline-flex">
                <Printer aria-hidden />
                Print
              </Button>
            </div>
          </div>

          <aside
            className={cn(
              "relative isolate self-start overflow-hidden rounded-panel p-6 sm:p-8 lg:col-span-5",
              style.tint,
            )}
            aria-label="At a glance"
          >
            <Halftone
              family={product.family}
              cells={13}
              className="pointer-events-none absolute -right-8 -top-8 -z-10 h-56 w-56"
            />
            <p className="label text-ink-2">{family.abbr} · At a glance</p>
            <div className="mt-44">
              {glance.length > 0 ? (
                <ul className="divide-y divide-ink/15 border-y border-ink/15">
                  {glance.map(({ variant, headline }) => (
                    <li key={variant.id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 py-3">
                      {variant.grade && product.kind === "resin" ? (
                        <GradeBadge grade={variant.grade} />
                      ) : (
                        <span className="text-[0.875rem] font-semibold">{variant.label}</span>
                      )}
                      <span className="text-[0.9375rem] font-semibold">
                        <Sci>{headline!}</Sci>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-2.5">
                  {product.highlights.slice(0, 3).map((h) => (
                    <li key={h} className="flex gap-3 font-medium leading-snug">
                      <Check aria-hidden className="mt-1 h-4 w-4 shrink-0" strokeWidth={2.5} />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-4 text-[0.875rem] leading-snug text-ink-2">{family.principle}</p>
            </div>
          </aside>
        </div>
      </header>

      <Block id="overview" label="Overview" title="What it is">
        <div className="grid gap-x-12 gap-y-8 xl:grid-cols-5">
          <div className="copy max-w-2xl text-[1.0625rem] leading-relaxed xl:col-span-3">
            {product.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className="space-y-3 xl:col-span-2">
            {product.highlights.map((h) => (
              <li
                key={h}
                className="flex gap-3 border-t border-rule pt-3 font-medium leading-snug first:border-t-0 first:pt-0"
              >
                <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-signal-ink" strokeWidth={2.5} />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </Block>

      {evidence && (
        <Block id="data" label={evidence.label} title={evidence.title}>
          {evidence.content}
        </Block>
      )}

      {product.protocol && (
        <Block id="protocol" label="Protocol" title="Five steps">
          <ol className="grid gap-px overflow-hidden rounded-lg border border-rule bg-rule sm:grid-cols-2 xl:grid-cols-5">
            {product.protocol.map((step, i) => (
              <li key={step.title} className="bg-card p-5">
                <p className="label text-signal-ink">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-3 font-semibold leading-snug">{step.title}</p>
                <p className="mt-1.5 text-[0.875rem] leading-snug text-ink-2">{step.text}</p>
              </li>
            ))}
          </ol>
        </Block>
      )}

      {(product.commonSpecs.length > 0 || product.variants.some((v) => v.specs.length > 0)) && (
        <Block
          id="specifications"
          label="Specifications"
          title={product.kind === "kit" ? "What is in the box" : "Technical data"}
        >
          <SpecTable product={product} activeId={active?.id} />
          {secData && (
            <p className="mt-6 text-[0.9375rem] text-ink-2">
              For calibration data on a ProtPure agarose SEC resin, see{" "}
              <Link to="/technology#sec" className="font-medium text-foreground underline underline-offset-4">
                molecular weight calibration and column performance
              </Link>
              .
            </p>
          )}
        </Block>
      )}

      <Block
        id="order"
        label="Order"
        title={isHardware ? "Choose a column" : product.variants.length > 1 ? "Pack sizes by grade" : "Pack sizes"}
      >
        {isHardware ? (
          <EmptyColumnsTable />
        ) : (
          <div
            className={cn(
              "grid gap-x-10 gap-y-10",
              product.variants.length > 1 && "md:grid-cols-2",
              product.variants.length === 3 && "xl:grid-cols-3",
            )}
          >
            {product.variants.map((v) => (
              <div
                key={v.id}
                className={cn(
                  product.variants.length === 1 && "max-w-xl",
                  v.id === active?.id && "rounded-lg bg-paper-2 p-4 ring-1 ring-ink/70 sm:p-5",
                )}
              >
                {product.variants.length > 1 && (
                  <div className="mb-3 flex items-center justify-between gap-3">
                    {v.grade && product.kind === "resin" ? (
                      <GradeBadge grade={v.grade} active={v.id === active?.id} />
                    ) : (
                      <h3 className="text-[0.9375rem] font-semibold">{v.label}</h3>
                    )}
                    {v.id === active?.id && <span className="label text-ink-2">Selected</span>}
                  </div>
                )}
                <PackTable product={product} variant={v} />
              </div>
            ))}
          </div>
        )}
        <p className="no-print mt-8 max-w-2xl text-[0.9375rem] text-ink-2">
          Prices are quoted on request. Add the packs you need, then send the list from the quote panel. Our team
          replies by email.
        </p>
      </Block>

      {(product.applications.length > 0 || usedIn.length > 0) && (
        <Block id="applications" label="Applications" title="Where it is used">
          <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
            <ul className="space-y-0">
              {product.applications.map((a) => (
                <li key={a} className="border-b border-rule py-3 font-medium first:border-t first:border-t-ink">
                  {a}
                </li>
              ))}
            </ul>
            {usedIn.length > 0 && (
              <div>
                <p className="text-[0.9375rem] text-ink-2">
                  Recommended in the resin finder for these application areas. Each page shows the full route from
                  capture to polishing.
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {usedIn.map((a) => (
                    <li key={a.slug}>
                      <Link
                        to={`/applications/${a.slug}`}
                        className="inline-flex min-h-9 items-center rounded-full border border-rule bg-card px-3.5 py-1 text-[0.875rem] font-medium transition-colors hover:border-ink"
                      >
                        {a.short}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Block>
      )}

      {documents.length > 0 && (
        <Block id="documents" label="Documents" title="Datasheets and data" screenOnly>
          <ul className="border-t border-ink">
            {documents.map((d) => (
              <li
                key={d.id}
                className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-rule py-4"
              >
                <div className="min-w-0">
                  <p className="label text-ink-3">
                    {d.type} · {d.issued} · {d.pages} {d.pages === 1 ? "page" : "pages"}
                  </p>
                  <p className="mt-1.5 font-semibold">{d.title}</p>
                  <p className="mt-0.5 text-[0.9375rem] text-ink-2">{d.description}</p>
                </div>
                {d.file ? (
                  <Button size="sm" variant="outline" asChild>
                    <a href={d.file} download>
                      Download PDF
                    </a>
                  </Button>
                ) : (
                  <AddToQuote
                    item={{ id: `doc-${d.id}`, kind: "document", name: d.title, href: "/resources" }}
                    label="Request"
                    variant="outline"
                  />
                )}
              </li>
            ))}
          </ul>
        </Block>
      )}

      {related.length > 0 && (
        <Block id="related" label="Related" title="Often used with" screenOnly>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {related.slice(0, 6).map((p) => (
              <ProductLineCard key={p.slug} product={p} as="h3" compact />
            ))}
          </div>
        </Block>
      )}

      <CTASection title={product.kind === "resin" ? "Want this resin evaluated on your molecule?" : undefined} />
    </article>
  );
}

export default function ProductDetail() {
  const { slug = "" } = useParams();
  const product = productBySlug(slug);
  if (!product) return <NotFound />;
  // Remount per product so the page state never carries over between products.
  return <Detail key={product.slug} product={product} />;
}
