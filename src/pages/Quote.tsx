import { useState } from "react";
import { Link } from "react-router-dom";
import { EnquiryForm } from "@/components/rfq/EnquiryForm";
import { QuoteList } from "@/components/rfq/QuoteList";
import { PageHeader } from "@/components/site/PageHeader";
import { Em } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { useRFQ } from "@/context/RFQContext";
import { SITE, whatsappUrl } from "@/data/site";
import { enquiryToText } from "@/lib/enquiry";
import { useSeo } from "@/lib/seo";

/** The quote list as a full page: easier on a phone, and a stable address to come back to. */
export default function Quote() {
  const { items, count, clear, contact } = useRFQ();
  const [done, setDone] = useState(false);

  useSeo({
    title: "Request a quote",
    description: "Review your list of ProtPure resins, columns and services and send it to our sales team.",
    noindex: true,
  });

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Request a quote" }]}
        eyebrow="Request a quote"
        title={
          <>
            Your quote <Em>list.</Em>
          </>
        }
        lede="Check the items and quantities, add your details and send. Prices and availability come back by email."
      />

      <section className="shell grid gap-x-12 gap-y-12 py-12 md:py-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 className="label text-ink-3">
            {done ? "Sent" : count ? `${count} ${count === 1 ? "item" : "items"}` : "No items yet"}
          </h2>

          {!done && count > 0 && (
            <>
              <QuoteList className="mt-4 border-t-ink" />
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[0.8125rem]">
                <button
                  type="button"
                  onClick={clear}
                  className="font-medium text-ink-2 underline underline-offset-4 hover:text-foreground"
                >
                  Clear the list
                </button>
                <Link
                  to="/products?view=codes"
                  className="font-medium text-ink-2 underline underline-offset-4 hover:text-foreground"
                >
                  Add more from the catalogue
                </Link>
              </div>
            </>
          )}

          {!done && count === 0 && (
            <div className="mt-4 rounded-panel border border-rule bg-card p-6 sm:p-8">
              <p className="heading-4">Nothing on the list yet.</p>
              <p className="mt-2 text-ink-2">
                Add pack sizes from any product page, pick catalogue numbers from the full list, or simply describe what
                you need in the form.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/products">Browse products</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/products?view=codes">Catalogue numbers</Link>
                </Button>
              </div>
            </div>
          )}

          {done && (
            <p className="mt-4 text-ink-2">Your list has been sent and cleared. You can start a new one at any time.</p>
          )}

          <div className="mt-10 rounded-lg bg-paper-2 p-5 text-[0.9375rem]">
            <p className="font-semibold">Prefer to send it yourself?</p>
            <p className="mt-1.5 text-ink-2">
              Email{" "}
              <a href={`mailto:${SITE.email}`} className="font-medium text-foreground underline underline-offset-4">
                {SITE.email}
              </a>
              , call{" "}
              <a href={SITE.phoneHref} className="font-medium text-foreground underline underline-offset-4">
                {SITE.phone}
              </a>{" "}
              or{" "}
              <a
                href={whatsappUrl(
                  count ? enquiryToText(contact, items) : "Hello ProtPure, I would like a quotation for ",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline underline-offset-4"
              >
                send {count ? "this list" : "a message"} on WhatsApp
              </a>
              .
            </p>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="rounded-panel border border-rule bg-paper-2 p-6 sm:p-8 lg:sticky lg:top-28">
            <h2 className="heading-4">{count ? "Where should we send the quotation?" : "Tell us what you need"}</h2>
            <EnquiryForm
              className="mt-6"
              items={items}
              onSent={() => {
                setDone(true);
                clear();
              }}
              doneAction={
                <Button variant="outline" asChild>
                  <Link to="/products">Back to products</Link>
                </Button>
              }
            />
          </div>
        </div>
      </section>
    </>
  );
}
