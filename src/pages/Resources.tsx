import { Link } from "react-router-dom";
import { Download, FileText } from "lucide-react";
import { AddToQuote } from "@/components/catalog/AddToQuote";
import { CTASection } from "@/components/site/CTASection";
import { PageHeader } from "@/components/site/PageHeader";
import { Em, SectionHeader } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { useRFQ } from "@/context/RFQContext";
import { CATALOGUE_COUNT } from "@/data/catalog";
import { GLOSSARY, RESOURCES, type ResourceType } from "@/data/resources";
import { downloadCatalogueCsv } from "@/lib/catalog-export";
import { PREVIEW } from "@/lib/env";
import { useSeo } from "@/lib/seo";

const TYPES: ResourceType[] = ["Datasheet", "Technical note", "Case study", "Brochure"];
const PLURAL: Record<ResourceType, string> = {
  Datasheet: "Datasheets",
  "Technical note": "Technical notes",
  "Case study": "Case studies",
  Brochure: "Brochures",
};

export default function Resources() {
  const { addItem, setOpen } = useRFQ();

  useSeo({
    title: "Resources: datasheets, technical notes and glossary",
    description:
      "ProtPure technical datasheets, performance data, case studies and brochures, the full list of catalogue numbers, and a short chromatography glossary.",
  });

  const requestAll = () => {
    RESOURCES.forEach((r) =>
      addItem({ id: `doc-${r.id}`, kind: "document", name: r.title, href: "/resources" }, { quiet: true }),
    );
    setOpen(true);
  };

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Resources" }]}
        eyebrow="Resources"
        title={
          <>
            Datasheets, data and <Em>definitions.</Em>
          </>
        }
        lede="Technical documents are sent by email on request, so you always receive the current revision. Add the ones you need to your list and send it with your details."
        actions={
          <Button size="lg" variant="signal" onClick={requestAll}>
            Request all {RESOURCES.length} documents
          </Button>
        }
      />

      <section className="py-16 md:py-24" aria-labelledby="documents-title">
        <div className="shell">
          <h2 id="documents-title" className="sr-only">
            Documents
          </h2>
          <div className="space-y-14">
            {TYPES.map((type) => {
              const docs = RESOURCES.filter((r) => r.type === type);
              if (!docs.length) return null;
              return (
                <div key={type} className="grid gap-x-12 gap-y-5 lg:grid-cols-12">
                  <h3 className="heading-4 lg:col-span-3">{PLURAL[type]}</h3>
                  <ul className="border-t border-ink lg:col-span-9">
                    {docs.map((d) => (
                      <li
                        key={d.id}
                        className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-rule py-5"
                      >
                        <div className="flex min-w-0 gap-4">
                          <FileText aria-hidden className="mt-1 hidden h-5 w-5 shrink-0 text-ink-3 sm:block" />
                          <div className="min-w-0">
                            <p className="text-lg font-semibold leading-snug tracking-tight">{d.title}</p>
                            <p className="mt-1 max-w-2xl text-[0.9375rem] text-ink-2">{d.description}</p>
                            <p className="label mt-2.5 text-ink-3">
                              {d.issued} · {d.pages} {d.pages === 1 ? "page" : "pages"} · PDF
                            </p>
                          </div>
                        </div>
                        {!PREVIEW && d.file ? (
                          <Button size="sm" variant="outline" asChild>
                            <a href={d.file} download>
                              <Download aria-hidden />
                              Download
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-rule bg-paper-2 py-16 md:py-20" aria-labelledby="codes-title">
        <div className="shell grid gap-x-12 gap-y-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="label text-ink-3">For purchasing teams</p>
            <h2 id="codes-title" className="display-3 mt-4">
              Every catalogue number, in one <Em>file.</Em>
            </h2>
            <p className="lede mt-5 max-w-xl">
              {CATALOGUE_COUNT} catalogue numbers with product, grade and pack size, ready for your ERP or vendor form.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            {!PREVIEW && (
              <Button size="lg" onClick={downloadCatalogueCsv}>
                <Download aria-hidden />
                Download CSV
              </Button>
            )}
            <Button size="lg" variant="outline" asChild>
              <Link to="/products?view=codes">Browse the list</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28" aria-labelledby="glossary-title">
        <div className="shell">
          <SectionHeader
            eyebrow="Glossary"
            title={
              <span id="glossary-title">
                The terms on our <Em>datasheets.</Em>
              </span>
            }
            lede={
              <>
                Short definitions of the measurements used across this site. For the numbers themselves, see{" "}
                <Link to="/technology#data" className="font-medium text-foreground underline underline-offset-4">
                  performance data
                </Link>
                .
              </>
            }
          />
          <dl className="mt-12 grid gap-x-12 md:grid-cols-2">
            {GLOSSARY.map((g) => (
              <div key={g.term} className="border-t border-rule py-6">
                <dt className="text-lg font-semibold tracking-tight">{g.term}</dt>
                <dd className="mt-2 text-ink-2">{g.definition}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CTASection />
    </>
  );
}
