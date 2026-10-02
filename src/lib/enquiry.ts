import { SITE } from "@/data/site";
import { DEMO } from "./env";

/*
  The enquiry (RFQ) pipeline, client side.

  Every enquiry on the site ends here: the quote list, the service form and the contact form all call
  `submitEnquiry`, which posts to the existing `send-transactional-email` edge function. The payload shapes
  are the ones the deployed `rfq-submission` and `contact-submission` email templates already expect, so
  no backend change is needed.
*/

export type RFQItemKind = "product" | "hardware" | "service" | "document";

export interface RFQItem {
  /** Unique key: the catalogue number where there is one. */
  id: string;
  kind: RFQItemKind;
  /** Name as it should appear on the quotation, e.g. "SP Agarose Fast Flow". */
  name: string;
  catNo?: string;
  pack?: string;
  /** Page the item was added from. */
  href?: string;
  /** Variant id, so the pack can be changed inside the list. */
  variantId?: string;
  quantity: number;
  notes: string;
}

export interface Contact {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof Contact, string>>;

export type ContactValidation = { ok: true; data: Contact } | { ok: false; errors: ContactErrors };

const LIMITS: Record<keyof Contact, number> = {
  name: 100,
  company: 120,
  email: 255,
  phone: 40,
  country: 80,
  message: 2000,
};

/* Deliberately simple: something@domain.tld, no spaces. The server validates the address again. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validation for the enquiry form. A quote request needs a name, an email address and a company or
 * institute; a general question needs a name, an email address and a message.
 * Returns the trimmed values, or one message per invalid field.
 */
export function validateContact(contact: Contact, options: { hasItems: boolean }): ContactValidation {
  const data = Object.fromEntries(
    (Object.keys(LIMITS) as (keyof Contact)[]).map((key) => [key, String(contact[key] ?? "").trim()]),
  ) as unknown as Contact;
  const errors: ContactErrors = {};

  if (!data.name) errors.name = "Enter your name";
  if (options.hasItems && !data.company) errors.company = "Enter your company or institute";
  if (!EMAIL.test(data.email)) errors.email = "Enter a valid email address";
  if (!options.hasItems && !data.message) errors.message = "Tell us what you need";
  for (const key of Object.keys(LIMITS) as (keyof Contact)[]) {
    if (!errors[key] && data[key].length > LIMITS[key]) errors[key] = `Keep this under ${LIMITS[key]} characters`;
  }

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}

export const EMPTY_CONTACT: Contact = { name: "", company: "", email: "", phone: "", country: "India", message: "" };

const KIND_LABEL: Record<RFQItemKind, string> = {
  product: "",
  hardware: "",
  service: "Service: ",
  document: "Document request: ",
};

/** One line per item, used in the email fallback and the WhatsApp message. */
export function itemToLine(item: RFQItem) {
  const parts = [`${KIND_LABEL[item.kind]}${item.name}`];
  if (item.pack) parts.push(item.pack);
  if (item.catNo) parts.push(`Cat. no. ${item.catNo}`);
  if (item.kind === "product" || item.kind === "hardware") parts.push(`Qty ${item.quantity}`);
  const line = parts.join(" · ");
  return item.notes ? `${line}\n  Note: ${item.notes}` : line;
}

/** Plain-text version of an enquiry: the body of the email fallback and of the contact template. */
export function enquiryToText(contact: Partial<Contact>, items: RFQItem[]) {
  const lines: string[] = [];
  if (items.length) {
    lines.push("Requested items:", ...items.map((item, i) => `${i + 1}. ${itemToLine(item)}`), "");
  }
  if (contact.message) lines.push(contact.message, "");
  const who = [
    contact.name && `Name: ${contact.name}`,
    contact.company && `Company: ${contact.company}`,
    contact.email && `Email: ${contact.email}`,
    contact.phone && `Phone: ${contact.phone}`,
    contact.country && `Country: ${contact.country}`,
  ].filter(Boolean) as string[];
  lines.push(...who);
  return lines.join("\n").trim();
}

export function enquirySubject(contact: Partial<Contact>, items: RFQItem[]) {
  const from = contact.company || contact.name;
  const what = items.length ? `Quote request (${items.length} item${items.length === 1 ? "" : "s"})` : "Enquiry";
  return from ? `${what} from ${from}` : what;
}

export type SubmitResult = { ok: true; demo?: boolean } | { ok: false; reason: "network" | "rejected" };

/**
 * Sends an enquiry to the sales inbox. With items it uses the `rfq-submission` template,
 * without items the `contact-submission` template. Resolves with `ok: false` instead of throwing,
 * so callers can always offer the email fallback.
 */
export async function submitEnquiry(contact: Contact, items: RFQItem[]): Promise<SubmitResult> {
  if (DEMO) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { ok: true, demo: true };
  }

  const id = crypto.randomUUID();
  const body = items.length
    ? {
        templateName: "rfq-submission",
        idempotencyKey: `rfq-${id}`,
        replyTo: contact.email,
        templateData: {
          name: contact.name,
          company: contact.company,
          email: contact.email,
          phone: contact.phone,
          country: contact.country,
          requirements: contact.message,
          items: items.map((item) => ({
            productName: `${KIND_LABEL[item.kind]}${item.name}`,
            packSize: item.pack,
            catNo: item.catNo,
            quantity: item.quantity,
            notes: item.notes,
          })),
        },
      }
    : {
        templateName: "contact-submission",
        idempotencyKey: `contact-${id}`,
        replyTo: contact.email,
        templateData: {
          name: contact.name,
          company: contact.company,
          email: contact.email,
          message: enquiryToText({ message: contact.message, phone: contact.phone, country: contact.country }, []),
        },
      };

  try {
    const { supabase } = await import("@/integrations/supabase/client");
    const { data, error } = await supabase.functions.invoke("send-transactional-email", { body });
    if (error) return { ok: false, reason: "rejected" };
    if (data && typeof data === "object" && "success" in data && data.success === false) {
      return { ok: false, reason: "rejected" };
    }
    return { ok: true };
  } catch (err) {
    console.error("Enquiry could not be sent", err);
    return { ok: false, reason: "network" };
  }
}

/** mailto: link carrying the whole enquiry, for when the form cannot be delivered. */
export function enquiryMailto(contact: Partial<Contact>, items: RFQItem[]) {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(enquirySubject(contact, items))}&body=${encodeURIComponent(
    enquiryToText(contact, items),
  )}`;
}
