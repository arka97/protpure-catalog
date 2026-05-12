# Plan: Email admin on RFQ + Contact form submissions

When a user submits the **RFQ drawer** ("Submit RFQ") or the **Contact form** ("Send message"), an email will be sent to **sales@protpure.com** containing all submitted details. Emails come from **notify@protpure.com**.

## Step 1 — Set up sender email domain

The project already uses **protpure.com** as its custom domain. The first step is configuring email sending through that domain.

After approving this plan, you'll be prompted with a "Set up email domain" button. This will set up `notify.protpure.com` as the sender subdomain. Once DNS verification completes, emails start sending automatically.

## Step 2 — Backend email infrastructure

- Provision the email queue + send pipeline (durable, with retries and rate-limit handling).
- Create two branded email templates:
  1. **RFQ submission** — recipient details (name, company, email, phone, country), additional requirements, and a table of all line items (product name, pack size + cat no, quantity, notes).
  2. **Contact form submission** — name, company, email, message.
- Both emails sent **to `sales@protpure.com`**, with `Reply-To` set to the submitter's email so you can reply directly from your inbox.
- Emails come from `notify@protpure.com`, matching the project's domain.
- Styled to match the ProtPure brand (navy/teal, serif headings, white body background).

## Step 3 — Wire up the forms

- **`RFQDrawer.tsx`**: in `handleSubmit`, after Zod validation passes, invoke the send function with the form data + cart items, then show the existing success state.
- **`Contact.tsx`**: in `onSubmit`, after Zod validation passes, invoke the send function, then show the existing toast.
- Both calls fire-and-show-success (errors are toasted but don't block the UX — transient queue hiccups won't lose a submission).

## Out of scope

- No storage of submissions in the database (email-only). Say the word if you also want a record table for an admin dashboard.
- No auto-reply to the submitter (the existing on-screen confirmation covers that). Easy to add later if you want.

## Technical notes

- Uses Lovable's built-in email infrastructure (no third-party API keys).
- New edge function templates: `rfq-submission`, `contact-submission`.
- Idempotency keys derived from a per-submission UUID so retries never duplicate.