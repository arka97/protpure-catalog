import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProductLineCard } from "@/components/catalog/ProductLineCard";
import { StageColumns } from "@/components/catalog/ResinFinder";
import { CTASection } from "@/components/site/CTASection";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { MoleculeGlyph } from "@/components/viz/MoleculeGlyph";
import { APPLICATIONS, applicationBySlug, type Application } from "@/data/applications";
import { PRODUCTS } from "@/data/catalog";
import { useSeo } from "@/lib/seo";
import NotFound from "./NotFound";

/** Product lines named in an application's recommendations, in catalogue order. */
function productsFor(app: Application) {
  const slugs = new Set<string>();
  for (const sub of app.subs) {
    for (const stage of Object.values(sub.stages)) {
      for (const ref of stage.refs) {
        const match = /^\/products\/([^?#]+)/.exec(ref.href);
        if (match) slugs.add(match[1]);
      }
    }
  }
  return PRODUCTS.filter((p) => slugs.has(p.slug));
}

function Detail({ app }: { app: Application }) {
  const index = APPLICATIONS.indexOf(app);
  const prev = APPLICATIONS[index - 1];
  const next = APPLICATIONS[index + 1];
  const products = productsFor(app);

  useSeo({
    title: `${app.title}: resins by stage`,
    description: app.description,
  });

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Applications", to: "/applications" }, { label: app.short }]}
        eyebrow={`Application ${String(index + 1).padStart(2, "0")} of ${APPLICATIONS.length}`}
        title={app.title}
        lede={app.description}
        actions={
          <>
            <Button size="lg" variant="signal" asChild>
              <Link to={`/contact?about=${encodeURIComponent(app.title)}`}>
                Discuss this application
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/services#resin-screening">Resin screening service</Link>
            </Button>
          </>
        }
        aside={
          <div className="dotgrid grid place-items-center rounded-panel border border-rule bg-card p-8 sm:p-10">
            <MoleculeGlyph slug={app.slug} className="h-44 w-44 sm:h-56 sm:w-56" />
          </div>
        }
      />

      <div className="shell">
        {app.subs.map((sub, i) => (
          <section
            key={sub.slug}
            id={sub.slug}
            aria-labelledby={`${sub.slug}-title`}
            className="border-b border-rule py-12 md:py-16"
          >
            <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="label text-ink-3">
                  Workflow {i + 1} of {app.subs.length}
                </p>
                <h2 id={`${sub.slug}-title`} className="heading-4 mt-2">
                  {sub.title}
                </h2>
                <p className="mt-3 text-ink-2">{sub.description}</p>
              </div>
              <div className="lg:col-span-8">
                <StageColumns sub={sub} />
              </div>
            </div>
          </section>
        ))}
      </div>

      {products.length > 0 && (
        <section className="py-16 md:py-24" aria-labelledby="resins-title">
          <div className="shell">
            <p className="label text-ink-3">Named above</p>
            <h2 id="resins-title" className="display-3 mt-3">
              The resins on this page
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {products.map((p) => (
                <ProductLineCard key={p.slug} product={p} as="h3" compact />
              ))}
            </div>
          </div>
        </section>
      )}

      <nav aria-label="Other applications" className="border-t border-rule">
        <div className="shell grid sm:grid-cols-2">
          {prev ? (
            <Link
              to={`/applications/${prev.slug}`}
              className="group flex items-center gap-4 border-rule py-7 sm:border-r sm:pr-8"
            >
              <ArrowLeft
                aria-hidden
                className="h-5 w-5 shrink-0 text-ink-3 transition-transform group-hover:-translate-x-1"
              />
              <span>
                <span className="label block text-ink-3">Previous</span>
                <span className="mt-1 block text-lg font-semibold tracking-tight">{prev.title}</span>
              </span>
            </Link>
          ) : (
            <span className="hidden border-rule sm:block sm:border-r" />
          )}
          {next && (
            <Link
              to={`/applications/${next.slug}`}
              className="group flex items-center justify-between gap-4 border-t border-rule py-7 sm:border-t-0 sm:pl-8 sm:text-right"
            >
              <span className="sm:ml-auto">
                <span className="label block text-ink-3">Next</span>
                <span className="mt-1 block text-lg font-semibold tracking-tight">{next.title}</span>
              </span>
              <ArrowRight
                aria-hidden
                className="h-5 w-5 shrink-0 text-ink-3 transition-transform group-hover:translate-x-1"
              />
            </Link>
          )}
        </div>
      </nav>

      <CTASection />
    </>
  );
}

export default function ApplicationDetail() {
  const { slug = "" } = useParams();
  const app = applicationBySlug(slug);
  if (!app) return <NotFound />;
  return <Detail key={app.slug} app={app} />;
}
