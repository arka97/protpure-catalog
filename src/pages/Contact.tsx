import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowUpRight, Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/rfq/EnquiryForm";
import { LinkedInFeed } from "@/components/site/LinkedInFeed";
import { PageHeader } from "@/components/site/PageHeader";
import { Em } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { useRFQ } from "@/context/RFQContext";
import { MAPS_URL, SITE, whatsappUrl } from "@/data/site";
import { useSeo } from "@/lib/seo";

const NO_ITEMS: never[] = [];

export default function Contact() {
  const [params] = useSearchParams();
  const about = params.get("about");
  const { count, setOpen, contact, setContact } = useRFQ();

  useSeo({
    title: "Contact: talk to a ProtPure scientist",
    description: `Email ${SITE.email}, call ${SITE.phone} or send an enquiry. ${SITE.legalName}, GIDC V.U. Nagar, Anand, Gujarat, India.`,
  });

  // Arriving from a product or application page: start the message for the visitor.
  useEffect(() => {
    if (about && !contact.message)
      setContact({ ...contact, message: `I have a question about ${about.slice(0, 120)}.\n` });
    // Run once per arrival; the draft itself is edited by the form.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [about]);

  const channels = [
    { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: Phone, label: "Phone", value: SITE.phone, href: SITE.phoneHref },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Chat with us",
      href: whatsappUrl("Hello ProtPure, I would like to enquire about "),
      external: true,
    },
    { icon: Linkedin, label: "LinkedIn", value: "Protpure Tech Pvt. Ltd.", href: SITE.linkedin, external: true },
  ];

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Contact" }]}
        eyebrow="Contact"
        title={
          <>
            Talk to a <Em>scientist.</Em>
          </>
        }
        lede="Questions about a resin, a method or a quotation go to the same team that develops and tests the product."
      />

      <section className="shell grid gap-x-12 gap-y-14 py-14 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="label text-ink-3">Direct lines</h2>
          <ul className="mt-4 border-t border-ink">
            {channels.map(({ icon: Icon, label, value, href, external }) => (
              <li key={label} className="border-b border-rule">
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 py-4"
                >
                  <Icon aria-hidden className="h-5 w-5 shrink-0 text-ink-3" />
                  <span className="min-w-0">
                    <span className="label block text-ink-3">{label}</span>
                    <span className="mt-0.5 block truncate text-lg font-semibold tracking-tight group-hover:underline">
                      {value}
                    </span>
                  </span>
                  {external && (
                    <>
                      <ArrowUpRight aria-hidden className="ml-auto h-4 w-4 shrink-0 text-ink-3" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </>
                  )}
                </a>
              </li>
            ))}
          </ul>

          <h2 className="label mt-12 text-ink-3">Facility and office</h2>
          <div className="mt-4 flex gap-4 border-t border-ink pt-5">
            <MapPin aria-hidden className="mt-1 h-5 w-5 shrink-0 text-ink-3" />
            <div>
              <address className="text-lg font-medium not-italic leading-snug tracking-tight">
                {SITE.legalName}
                {SITE.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
              >
                Open in Google Maps
                <ArrowUpRight aria-hidden className="h-4 w-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-panel border border-rule bg-paper-2 p-6 sm:p-10">
            <h2 className="heading-4">Send an enquiry</h2>
            <p className="mt-2 text-ink-2">
              Tell us what you are working on. The more detail, the more useful our reply.
            </p>
            {count > 0 && (
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-rule bg-card p-4">
                <p className="text-[0.9375rem]">
                  You have <span className="font-semibold">{count}</span> {count === 1 ? "item" : "items"} on your quote
                  list.
                </p>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => setOpen(true)}>
                    Review and send
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/quote">Full page</Link>
                  </Button>
                </div>
              </div>
            )}
            <EnquiryForm
              className="mt-8"
              items={NO_ITEMS}
              doneAction={
                <Button variant="outline" asChild>
                  <Link to="/products">Browse products</Link>
                </Button>
              }
            />
          </div>
        </div>
      </section>

      <LinkedInFeed />
    </>
  );
}
