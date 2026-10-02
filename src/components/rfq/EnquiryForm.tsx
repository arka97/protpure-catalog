import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AlertTriangle, ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRFQ } from "@/context/RFQContext";
import { SITE, whatsappUrl } from "@/data/site";
import {
  enquiryMailto,
  enquiryToText,
  submitEnquiry,
  validateContact,
  type Contact,
  type ContactErrors,
  type RFQItem,
} from "@/lib/enquiry";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "failed";
type Errors = ContactErrors;

const FIELD_ORDER: (keyof Contact)[] = ["name", "company", "email", "phone", "country", "message"];

interface FieldProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

function Field({ id, label, hint, error, required, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between gap-3 text-[0.8125rem] font-semibold">
        <span>
          {label}
          {required && (
            <span aria-hidden className="ml-0.5 text-signal-ink">
              *
            </span>
          )}
        </span>
        {hint && <span className="font-normal text-ink-3">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[0.8125rem] font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

interface EnquiryFormProps {
  /** Items sent with the enquiry. Empty means a general question. */
  items: RFQItem[];
  /** Called once the enquiry has been accepted, e.g. to clear the quote list. */
  onSent?: () => void;
  /** Button shown on the confirmation panel. */
  doneAction?: ReactNode;
  className?: string;
}

/**
 * The one enquiry form on the site. It reports what actually happened: a confirmation only after the
 * request was accepted, and an email / WhatsApp fallback carrying the whole enquiry when it was not.
 */
export function EnquiryForm({ items, onSent, doneAction, className }: EnquiryFormProps) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const { contact, setContact } = useRFQ();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [trap, setTrap] = useState("");
  const [sent, setSent] = useState<{ email: string; count: number; demo: boolean } | null>(null);

  const hasItems = items.length > 0;
  const id = (name: keyof Contact) => `${uid}-${name}`;

  const set = (name: keyof Contact) => (e: { target: { value: string } }) => {
    setContact({ ...contact, [name]: e.target.value });
    if (errors[name]) setErrors({ ...errors, [name]: undefined });
  };

  const fieldProps = (name: keyof Contact) => ({
    id: id(name),
    name,
    value: contact[name],
    onChange: set(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id(name)}-error` : undefined,
  });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    const checked = validateContact(contact, { hasItems });
    if (checked.ok === false) {
      setErrors(checked.errors);
      const firstInvalid = FIELD_ORDER.find((k) => checked.errors[k]);
      if (firstInvalid) formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setErrors({});

    const data = checked.data;
    setStatus("sending");
    // A filled honeypot means an automated submission: accept it silently and send nothing.
    const result = trap ? ({ ok: true } as const) : await submitEnquiry(data, items);
    if (!result.ok) {
      setStatus("failed");
      return;
    }
    setSent({ email: data.email, count: items.length, demo: "demo" in result && Boolean(result.demo) });
    setStatus("sent");
    setContact({ ...contact, message: "" });
    onSent?.();
  };

  if (status === "sent" && sent) {
    return (
      <div
        className={cn("rounded-lg border border-rule bg-card p-6 sm:p-8", className)}
        role="status"
        aria-live="polite"
      >
        <span className="grid h-11 w-11 place-items-center rounded-full bg-sec-tint text-sec">
          <Check aria-hidden className="h-5 w-5" strokeWidth={2.5} />
        </span>
        <h3 className="heading-4 mt-5">{sent.count ? "Your quote request is with us." : "Your enquiry is with us."}</h3>
        <p className="mt-3 text-ink-2">
          {sent.count
            ? `We have your list of ${sent.count} ${sent.count === 1 ? "item" : "items"}. `
            : "Thank you for writing. "}
          Our team will reply to <span className="font-semibold text-foreground">{sent.email}</span>.
        </p>
        {sent.demo && (
          <p className="label mt-4 rounded-md bg-paper-2 px-3 py-2 text-ink-2">Preview mode: nothing was sent.</p>
        )}
        {doneAction && <div className="mt-6">{doneAction}</div>}
      </div>
    );
  }

  const fallbackText = enquiryToText(contact, items);

  return (
    <form ref={formRef} onSubmit={submit} noValidate className={className}>
      {status === "failed" && (
        <div role="alert" className="mb-6 rounded-lg border border-destructive/40 bg-card p-5">
          <p className="flex items-center gap-2 font-semibold text-destructive">
            <AlertTriangle aria-hidden className="h-4 w-4" />
            We could not send your request.
          </p>
          <p className="mt-2 text-[0.9375rem] text-ink-2">
            Nothing has been lost. Send the same request by email or WhatsApp, or try again in a moment.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" asChild>
              <a href={enquiryMailto(contact, items)}>Send by email</a>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <a href={whatsappUrl(fallbackText)} target="_blank" rel="noopener noreferrer">
                Send on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      )}

      <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
        <Field id={id("name")} label="Name" required error={errors.name}>
          <Input {...fieldProps("name")} autoComplete="name" required />
        </Field>
        <Field id={id("company")} label="Company or institute" required={hasItems} error={errors.company}>
          <Input {...fieldProps("company")} autoComplete="organization" required={hasItems} />
        </Field>
        <Field id={id("email")} label="Work email" required error={errors.email}>
          <Input {...fieldProps("email")} type="email" inputMode="email" autoComplete="email" required />
        </Field>
        <Field id={id("phone")} label="Phone" hint="Optional" error={errors.phone}>
          <Input {...fieldProps("phone")} type="tel" inputMode="tel" autoComplete="tel" />
        </Field>
        <Field id={id("country")} label="Country" error={errors.country} className="sm:col-span-2">
          <Input {...fieldProps("country")} autoComplete="country-name" />
        </Field>
        <Field
          id={id("message")}
          label={hasItems ? "Notes for our team" : "How can we help?"}
          hint={hasItems ? "Optional" : undefined}
          required={!hasItems}
          error={errors.message}
          className="sm:col-span-2"
        >
          <Textarea
            {...fieldProps("message")}
            rows={hasItems ? 3 : 5}
            maxLength={2000}
            required={!hasItems}
            placeholder={
              hasItems
                ? "Application, scale, delivery location or anything else that helps us quote."
                : "Tell us about the molecule, the purification step and the scale you are working at."
            }
          />
        </Field>
      </div>

      {/* Honeypot: hidden from people, tempting for bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            name="website"
            value={trap}
            onChange={(e) => setTrap(e.target.value)}
          />
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        <Button type="submit" size="lg" variant="signal" disabled={status === "sending"} className="min-w-[13rem]">
          {status === "sending" ? (
            <>
              <Loader2 aria-hidden className="animate-spin" />
              Sending
            </>
          ) : (
            <>
              {status === "failed" ? "Try again" : hasItems ? "Send quote request" : "Send enquiry"}
              <ArrowRight aria-hidden />
            </>
          )}
        </Button>
        <p className="text-[0.8125rem] text-ink-2">
          Goes straight to the ProtPure sales team.
          <br className="hidden sm:block" /> Or write to{" "}
          <a href={enquiryMailto(contact, items)} className="font-medium text-foreground underline underline-offset-4">
            {SITE.email}
          </a>
          .
        </p>
      </div>
    </form>
  );
}
