import { useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Download, LayoutGrid, List, Search, X } from "lucide-react";
import { AddToQuote } from "@/components/catalog/AddToQuote";
import { FamilyBadge, GradeBadge } from "@/components/catalog/Badges";
import { EmptyColumnsTable } from "@/components/catalog/EmptyColumnsTable";
import { ProductLineCard } from "@/components/catalog/ProductLineCard";
import { CTASection } from "@/components/site/CTASection";
import { PageHeader } from "@/components/site/PageHeader";
import { Em } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Halftone } from "@/components/viz/Halftone";
import { CATALOGUE_COUNT, PRODUCTS } from "@/data/catalog";
import { FAMILIES, GRADES, STAGES, familyById } from "@/data/families";
import { EMPTY_COLUMNS } from "@/data/hardware";
import { downloadCatalogueCsv } from "@/lib/catalog-export";
import { packToItem } from "@/lib/catalog-helpers";
import { PREVIEW } from "@/lib/env";
import { FAMILY_STYLE } from "@/lib/family-style";
import { useSeo } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { FamilyId, GradeId, Product, StageId } from "@/types/catalog";

/* Links from the previous site used ?type=…; keep them working. */
const LEGACY_TYPE: Record<string, FamilyId> = {
  iec: "iex",
  iex: "iex",
  affinity: "imac",
  imac: "imac",
  sec: "sec",
  hic: "hic",
};

const isFamily = (v: string | null): v is FamilyId => FAMILIES.some((f) => f.id === v);
const isGrade = (v: string | null): v is GradeId => GRADES.some((g) => g.id === v);
const isStage = (v: string | null): v is StageId => STAGES.some((s) => s.id === v);

const haystack = (p: Product) =>
  [
    p.name,
    p.descriptor,
    p.summary,
    familyById(p.family).name,
    familyById(p.family).abbr,
    ...p.applications,
    ...p.variants.flatMap((v) => [v.name, ...v.packs.map((k) => k.catNo)]),
  ]
    .join(" ")
    .toLowerCase();

const HAYSTACKS = new Map(PRODUCTS.map((p) => [p.slug, haystack(p)]));

const chip = (on: boolean) =>
  cn(
    "inline-flex h-9 shrink-0 items-center gap-2 rounded-full border px-3.5 text-[0.8125rem] font-medium transition-colors",
    on ? "border-ink bg-ink text-paper" : "border-rule bg-card text-foreground hover:border-ink",
  );

export default function Products() {
  const [params, setParams] = useSearchParams();

  // Translate legacy links once, then drop the old parameter.
  useEffect(() => {
    const legacy = params.get("type");
    if (!legacy) return;
    const next = new URLSearchParams(params);
    next.delete("type");
    next.delete("ids");
    const family = LEGACY_TYPE[legacy.toLowerCase()];
    if (family) next.set("family", family);
    setParams(next, { replace: true });
  }, [params, setParams]);

  const familyParam = params.get("family");
  const gradeParam = params.get("grade");
  const stageParam = params.get("stage");
  const family = isFamily(familyParam) ? familyParam : null;
  const grade = isGrade(gradeParam) ? gradeParam : null;
  const stage = isStage(stageParam) ? stageParam : null;
  const query = params.get("q") ?? "";
  const view = params.get("view") === "codes" ? "codes" : "lines";
  const filtered = Boolean(family || grade || stage || query);

  const set = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true, preventScrollReset: true });
  };

  const clear = () => setParams(view === "codes" ? { view } : {}, { replace: true, preventScrollReset: true });

  const products = useMemo(() => {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    return PRODUCTS.filter(
      (p) =>
        (!family || p.family === family) &&
        (!grade || p.variants.some((v) => v.grade === grade)) &&
        (!stage || p.stages.includes(stage)) &&
        tokens.every((t) => HAYSTACKS.get(p.slug)!.includes(t)),
    );
  }, [family, grade, stage, query]);

  const groups = FAMILIES.map((f) => ({ family: f, products: products.filter((p) => p.family === f.id) })).filter(
    (g) => g.products.length,
  );

  const skuCount = products.reduce(
    (n, p) => n + p.variants.filter((v) => !grade || v.grade === grade).reduce((m, v) => m + v.packs.length, 0),
    0,
  );
  const showHardwareTable = view === "codes" && products.some((p) => p.kind === "hardware");
  const activeFamily = family ? familyById(family) : null;

  useSeo({
    title: activeFamily ? `${activeFamily.title} | Products` : "Products: chromatography resins, columns and kits",
    description: activeFamily
      ? `${activeFamily.summary} ${activeFamily.principle}`
      : `The ProtPure catalogue: ${PRODUCTS.length} product lines and ${CATALOGUE_COUNT} catalogue items. Metal affinity, ion exchange, HIC, mixed-mode, metal removal and size exclusion resins, pre-packed columns, kits and empty columns.`,
  });

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Products" }]}
        eyebrow="Catalogue"
        title={
          <>
            Resins, columns and <Em>kits.</Em>
          </>
        }
        lede={`${PRODUCTS.length} product lines and ${CATALOGUE_COUNT} catalogue items, from 1 mL pre-packed columns to 1 L packs of resin. Add what you need to your quote list and send it in one request.`}
      />

      {/* Filters */}
      <div className="no-print border-b border-rule">
        <div className="shell py-4">
          <div
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 no-scrollbar sm:mx-0 sm:flex-wrap sm:px-0"
            role="group"
            aria-label="Technique or format"
          >
            <button type="button" aria-pressed={!family} onClick={() => set("family", null)} className={chip(!family)}>
              All
            </button>
            {FAMILIES.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={family === f.id}
                onClick={() => set("family", family === f.id ? null : f.id)}
                className={chip(family === f.id)}
              >
                {f.twoTone ? (
                  <span aria-hidden className="flex h-2 w-2 overflow-hidden rounded-full">
                    <span className="h-full w-1/2 bg-iex" />
                    <span className="h-full w-1/2 bg-hic" />
                  </span>
                ) : (
                  <span aria-hidden className={cn("h-2 w-2 rounded-full", FAMILY_STYLE[f.color].dot)} />
                )}
                {f.name}
              </button>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-3">
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Grade">
              <span className="label text-ink-3">Grade</span>
              {GRADES.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  aria-pressed={grade === g.id}
                  onClick={() => set("grade", grade === g.id ? null : g.id)}
                  className={chip(grade === g.id)}
                >
                  {g.name}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Purification stage">
              <span className="label text-ink-3">Stage</span>
              {STAGES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={stage === s.id}
                  onClick={() => set("stage", stage === s.id ? null : s.id)}
                  className={chip(stage === s.id)}
                >
                  {s.name}
                </button>
              ))}
            </div>

            <div className="flex w-full items-center gap-2 lg:ml-auto lg:w-auto">
              <div className="relative min-w-0 flex-1 lg:w-64 lg:flex-none">
                <Search
                  aria-hidden
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3"
                />
                <label htmlFor="catalogue-search" className="sr-only">
                  Search the catalogue by name or catalogue number
                </label>
                <input
                  id="catalogue-search"
                  type="search"
                  value={query}
                  onChange={(e) => set("q", e.target.value)}
                  placeholder="Name or catalogue number"
                  className="h-10 w-full rounded-full border border-input bg-card pl-10 pr-4 text-base placeholder:text-ink-3 md:text-sm"
                />
              </div>
              <div
                className="flex shrink-0 rounded-full border border-rule bg-card p-0.5"
                role="group"
                aria-label="View"
              >
                <button
                  type="button"
                  aria-pressed={view === "lines"}
                  onClick={() => set("view", null)}
                  className={cn(
                    "flex h-9 items-center gap-1.5 rounded-full px-3 text-[0.8125rem] font-medium",
                    view === "lines" && "bg-ink text-paper",
                  )}
                >
                  <LayoutGrid aria-hidden className="h-4 w-4" />
                  <span className="hidden sm:inline">Product lines</span>
                  <span className="sr-only sm:hidden">Product lines</span>
                </button>
                <button
                  type="button"
                  aria-pressed={view === "codes"}
                  onClick={() => set("view", "codes")}
                  className={cn(
                    "flex h-9 items-center gap-1.5 rounded-full px-3 text-[0.8125rem] font-medium",
                    view === "codes" && "bg-ink text-paper",
                  )}
                >
                  <List aria-hidden className="h-4 w-4" />
                  <span className="hidden sm:inline">Catalogue numbers</span>
                  <span className="sr-only sm:hidden">Catalogue numbers</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="shell pb-20 pt-8 md:pb-28" aria-label="Results">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="label text-ink-2" aria-live="polite">
            {products.length} {products.length === 1 ? "product line" : "product lines"}
            {view === "codes" && ` · ${skuCount + (showHardwareTable ? EMPTY_COLUMNS.length : 0)} catalogue numbers`}
          </p>
          <div className="flex items-center gap-4">
            {filtered && (
              <button
                type="button"
                onClick={clear}
                className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink-2 underline underline-offset-4 hover:text-foreground"
              >
                <X aria-hidden className="h-3.5 w-3.5" />
                Clear filters
              </button>
            )}
            {!PREVIEW && view === "codes" && (
              <Button size="sm" variant="outline" onClick={downloadCatalogueCsv}>
                <Download aria-hidden />
                Full list (CSV)
              </Button>
            )}
          </div>
        </div>

        {products.length === 0 && (
          <div className="mt-8 rounded-panel border border-rule bg-card p-8 text-center sm:p-12">
            <p className="heading-4">Nothing in the catalogue matches these filters.</p>
            <p className="mx-auto mt-3 max-w-md text-ink-2">Clear the filters, or tell us what you are looking for.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button onClick={clear}>Clear filters</Button>
              <Button variant="outline" asChild>
                <Link to="/contact">Ask a scientist</Link>
              </Button>
            </div>
          </div>
        )}

        {view === "lines" &&
          groups.map(({ family: f, products: list }) => (
            <section key={f.id} className="mt-10 first-of-type:mt-8" aria-labelledby={`family-${f.id}`}>
              <div className={cn("flex items-center gap-5 rounded-panel p-5 sm:p-6", FAMILY_STYLE[f.color].tint)}>
                <Halftone family={f.id} cells={9} className="hidden h-16 w-16 shrink-0 sm:block" />
                <div className="min-w-0">
                  <p className="label text-ink-2">{f.abbr}</p>
                  <h2 id={`family-${f.id}`} className="heading-4 mt-1">
                    {f.title}
                  </h2>
                  <p className="mt-1.5 max-w-3xl text-[0.9375rem] leading-snug text-ink-2">{f.principle}</p>
                </div>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {list.map((p) => (
                  <ProductLineCard key={p.slug} product={p} as="h3" />
                ))}
              </div>
            </section>
          ))}

        {view === "codes" && products.length > 0 && (
          <div className="mt-6">
            {products.some((p) => p.variants.length > 0) && (
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">Catalogue numbers and pack sizes</caption>
                <thead>
                  <tr className="label border-b border-ink text-ink-3">
                    <th scope="col" className="py-2.5 pr-3 font-medium">
                      Cat. no.
                    </th>
                    <th scope="col" className="py-2.5 pr-3 font-medium">
                      Grade or format
                    </th>
                    <th scope="col" className="py-2.5 pr-3 font-medium">
                      Pack
                    </th>
                    <th scope="col" className="py-2.5 text-right font-medium">
                      <span className="sr-only">Add to quote list</span>
                    </th>
                  </tr>
                </thead>
                {products
                  .filter((p) => p.variants.length > 0)
                  .map((p) => (
                    <tbody key={p.slug}>
                      <tr>
                        <th scope="rowgroup" colSpan={4} className="pb-2 pt-8">
                          <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                            <Link
                              to={`/products/${p.slug}`}
                              className="text-lg font-semibold tracking-tight hover:underline"
                            >
                              {p.name}
                            </Link>
                            <FamilyBadge family={p.family} short />
                          </span>
                        </th>
                      </tr>
                      {p.variants
                        .filter((v) => !grade || v.grade === grade)
                        .flatMap((v) =>
                          v.packs.map((pack) => (
                            <tr key={pack.catNo} className="border-t border-rule">
                              <td className="py-2.5 pr-3 font-mono text-[0.875rem] font-medium tracking-wide">
                                {pack.catNo}
                              </td>
                              <td className="py-2.5 pr-3 text-[0.9375rem]">
                                {v.grade && p.kind === "resin" ? <GradeBadge grade={v.grade} /> : v.label}
                              </td>
                              <td className="py-2.5 pr-3 text-[0.9375rem] font-semibold tabular-nums">{pack.size}</td>
                              <td className="py-1.5 text-right">
                                <AddToQuote item={packToItem(p, v, pack)} label="Add" compactOnMobile />
                              </td>
                            </tr>
                          )),
                        )}
                    </tbody>
                  ))}
              </table>
            )}

            {showHardwareTable && (
              <section className="mt-14" aria-labelledby="hardware-title">
                <h2 id="hardware-title" className="text-lg font-semibold tracking-tight">
                  <Link to="/products/empty-columns" className="hover:underline">
                    Empty Chromatography Columns
                  </Link>
                </h2>
                <EmptyColumnsTable className="mt-5" />
              </section>
            )}
          </div>
        )}
      </section>

      <CTASection />
    </>
  );
}
