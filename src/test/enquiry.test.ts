import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  enquiryMailto,
  enquirySubject,
  enquiryToText,
  itemToLine,
  submitEnquiry,
  validateContact,
  type Contact,
  type RFQItem,
} from "@/lib/enquiry";

const invoke = vi.fn();
vi.mock("@/integrations/supabase/client", () => ({
  supabase: { functions: { invoke: (...args: unknown[]) => invoke(...args) } },
}));

const contact: Contact = {
  name: "Asha Rao",
  company: "Example Biologics",
  email: "asha@example.com",
  phone: "+91 98765 43210",
  country: "India",
  message: "Needed by March.",
};

const resin: RFQItem = {
  id: "QAHR01",
  kind: "product",
  name: "Q Agarose High Resolution",
  catNo: "QAHR01",
  pack: "25 mL",
  variantId: "q-agarose-hr",
  quantity: 2,
  notes: "",
};

const service: RFQItem = {
  id: "svc-SC002",
  kind: "service",
  name: "Resin screening and selection",
  catNo: "SC002",
  quantity: 1,
  notes: "mAb fragment",
};

describe("validateContact", () => {
  it("requires name, email and company for a quote request", () => {
    const result = validateContact(
      { ...contact, name: " ", company: "", email: "nope", message: "" },
      { hasItems: true },
    );
    expect(result).toEqual({
      ok: false,
      errors: {
        name: "Enter your name",
        company: "Enter your company or institute",
        email: "Enter a valid email address",
      },
    });
  });

  it("requires a message, but not a company, for a general enquiry", () => {
    const missing = validateContact({ ...contact, company: "", message: "  " }, { hasItems: false });
    expect(missing).toEqual({ ok: false, errors: { message: "Tell us what you need" } });
    expect(validateContact({ ...contact, company: "" }, { hasItems: false }).ok).toBe(true);
  });

  it("returns the trimmed values", () => {
    const result = validateContact(
      { ...contact, name: "  Asha Rao  ", email: " asha@example.com " },
      { hasItems: true },
    );
    expect(result).toEqual({ ok: true, data: contact });
  });

  it("rejects addresses that could not receive a reply", () => {
    for (const email of ["", "asha", "asha@", "asha@example", "asha rao@example.com", "@example.com"]) {
      expect(validateContact({ ...contact, email }, { hasItems: true }).ok, email).toBe(false);
    }
  });

  it("limits field lengths", () => {
    const result = validateContact({ ...contact, message: "x".repeat(2001) }, { hasItems: true });
    expect(result).toEqual({ ok: false, errors: { message: "Keep this under 2000 characters" } });
  });
});

describe("plain-text enquiry", () => {
  it("writes one line per item, with catalogue number and quantity for products", () => {
    expect(itemToLine(resin)).toBe("Q Agarose High Resolution · 25 mL · Cat. no. QAHR01 · Qty 2");
    expect(itemToLine(service)).toBe("Service: Resin screening and selection · Cat. no. SC002\n  Note: mAb fragment");
  });

  it("lists items, message and contact details", () => {
    const text = enquiryToText(contact, [resin, service]);
    expect(text).toContain("1. Q Agarose High Resolution");
    expect(text).toContain("2. Service: Resin screening and selection");
    expect(text).toContain("Needed by March.");
    expect(text).toContain("Email: asha@example.com");
  });

  it("builds a subject and a mailto link to the sales address", () => {
    expect(enquirySubject(contact, [resin, service])).toBe("Quote request (2 items) from Example Biologics");
    expect(enquirySubject({ name: "Asha Rao" }, [])).toBe("Enquiry from Asha Rao");
    expect(enquiryMailto(contact, [resin])).toMatch(/^mailto:info@protpure\.com\?subject=Quote%20request/);
  });
});

describe("submitEnquiry", () => {
  beforeEach(() => invoke.mockReset());

  it("sends a quote list with the rfq-submission template", async () => {
    invoke.mockResolvedValue({ data: { success: true, queued: true }, error: null });
    await expect(submitEnquiry(contact, [resin, service])).resolves.toEqual({ ok: true });

    const [fn, { body }] = invoke.mock.calls[0];
    expect(fn).toBe("send-transactional-email");
    expect(body.templateName).toBe("rfq-submission");
    expect(body.replyTo).toBe("asha@example.com");
    expect(body.idempotencyKey).toMatch(/^rfq-/);
    expect(body.templateData).toMatchObject({
      name: "Asha Rao",
      company: "Example Biologics",
      requirements: "Needed by March.",
    });
    expect(body.templateData.items).toEqual([
      { productName: "Q Agarose High Resolution", packSize: "25 mL", catNo: "QAHR01", quantity: 2, notes: "" },
      {
        productName: "Service: Resin screening and selection",
        packSize: undefined,
        catNo: "SC002",
        quantity: 1,
        notes: "mAb fragment",
      },
    ]);
  });

  it("sends a general enquiry with the contact-submission template", async () => {
    invoke.mockResolvedValue({ data: { success: true }, error: null });
    await submitEnquiry(contact, []);
    const { body } = invoke.mock.calls[0][1];
    expect(body.templateName).toBe("contact-submission");
    expect(body.templateData.message).toContain("Needed by March.");
    expect(body.templateData.message).toContain("Phone: +91 98765 43210");
  });

  it("reports a failure instead of pretending the request was sent", async () => {
    invoke.mockResolvedValueOnce({ data: null, error: new Error("403") });
    await expect(submitEnquiry(contact, [resin])).resolves.toEqual({ ok: false, reason: "rejected" });

    invoke.mockResolvedValueOnce({ data: { success: false }, error: null });
    await expect(submitEnquiry(contact, [resin])).resolves.toEqual({ ok: false, reason: "rejected" });

    vi.spyOn(console, "error").mockImplementation(() => {});
    invoke.mockRejectedValueOnce(new TypeError("Failed to fetch"));
    await expect(submitEnquiry(contact, [resin])).resolves.toEqual({ ok: false, reason: "network" });
  });
});
