import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Linkedin, MessageCircle, ExternalLink } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  company: z.string().trim().max(120).optional(),
  email: z.string().trim().email("Valid email required").max(255),
  message: z.string().trim().min(1, "Message required").max(2000),
});

const ADDRESS = "Plot A2/440/2, Road B-18, GIDC, Vitthal Udyog Nagar, Anand 388121, Gujarat, India";
const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`;
const LINKEDIN_URL = "https://www.linkedin.com/company/protpure-tech-pvt-ltd/";

const contactCards = [
  {
    icon: Mail,
    label: "Email",
    value: "info@protpure.com",
    href: "mailto:info@protpure.com",
    hint: "We respond within 24–48 hours",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 94265 96644",
    href: "tel:+919426596644",
    hint: "Mon–Sat · 10:00–18:00 IST",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 94265 96644",
    href: "https://wa.me/919426596644?text=Hi%20ProtPure%2C%20I%27d%20like%20to%20enquire%20about...",
    hint: "Quickest channel for technical questions",
    external: true,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "@protpure-tech-pvt-ltd",
    href: LINKEDIN_URL,
    hint: "Follow product launches and updates",
    external: true,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => i.path[0] && (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    toast.success("Message received", {
      description: "We'll respond within 24–48 hours at info@protpure.com",
    });
    setForm({ name: "", company: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Contact"
          title="Talk to our scientists"
          description="Sample requests, technical questions, vendor onboarding — reach the team directly. Most inquiries are answered within one working day."
          breadcrumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
        />

        <section className="bg-white py-16">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 grid lg:grid-cols-[1fr_1fr] gap-10">
            {/* Contact cards */}
            <div className="space-y-4">
              <div className="text-[11px] font-semibold tracking-[0.15em] text-teal uppercase mb-1">
                Reach us
              </div>
              <h2 className="font-serif text-2xl text-navy mb-5">Direct channels</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {contactCards.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className="group rounded-xl border border-border bg-white p-5 hover:border-teal hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-teal-pale flex items-center justify-center group-hover:bg-teal group-hover:text-white text-teal transition-colors">
                        <c.icon className="w-4 h-4" />
                      </div>
                      <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-slate-light">
                        {c.label}
                      </div>
                    </div>
                    <div className="text-[15px] font-semibold text-navy mb-1">{c.value}</div>
                    <div className="text-[12px] text-slate">{c.hint}</div>
                  </a>
                ))}
              </div>

              <div className="rounded-xl border border-border bg-white overflow-hidden">
                <div className="px-5 py-4 border-b border-border flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal" />
                  <h3 className="text-sm font-semibold text-navy">Manufacturing facility</h3>
                </div>
                <div className="p-5">
                  <p className="text-[13px] text-slate leading-relaxed mb-4">{ADDRESS}</p>
                  <div className="aspect-[16/9] rounded-lg overflow-hidden border border-border">
                    <iframe
                      src={MAPS_EMBED}
                      title="ProtPure facility map"
                      className="w-full h-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={onSubmit}
              className="rounded-xl border border-border bg-secondary/40 p-7 self-start space-y-4"
            >
              <div>
                <div className="text-[11px] font-semibold tracking-[0.15em] text-teal uppercase mb-1">
                  Send a message
                </div>
                <h2 className="font-serif text-2xl text-navy">We'll get back to you</h2>
              </div>
              <div>
                <Label htmlFor="c-name" className="text-xs">Name *</Label>
                <Input id="c-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 bg-white" />
                {errors.name && <p className="text-[11px] text-destructive mt-1">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="c-company" className="text-xs">Company</Label>
                <Input id="c-company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="mt-1 bg-white" />
              </div>
              <div>
                <Label htmlFor="c-email" className="text-xs">Email *</Label>
                <Input id="c-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 bg-white" />
                {errors.email && <p className="text-[11px] text-destructive mt-1">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="c-msg" className="text-xs">Message *</Label>
                <Textarea id="c-msg" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value.slice(0, 2000) })} className="mt-1 bg-white" />
                {errors.message && <p className="text-[11px] text-destructive mt-1">{errors.message}</p>}
              </div>
              <Button type="submit" className="w-full bg-teal hover:bg-teal-light text-white">
                Send message
              </Button>
              <p className="text-[11px] text-slate-light text-center">
                Replies sent from <span className="font-mono text-slate">info@protpure.com</span>
              </p>
            </form>
          </div>
        </section>

        {/* LinkedIn feed */}
        <section className="bg-background py-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
              <div className="max-w-2xl">
                <div className="text-[11px] font-semibold tracking-[0.15em] text-teal uppercase mb-3">
                  Latest updates
                </div>
                <h2 className="font-serif text-3xl text-navy mb-2">From our LinkedIn</h2>
                <p className="text-base text-slate leading-relaxed">
                  Product launches, application notes, and behind-the-scenes from our Anand facility.
                </p>
              </div>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-teal hover:text-teal-light"
              >
                <Linkedin className="w-4 h-4" /> Follow on LinkedIn <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  tag: "Launch",
                  title: "Q Agarose Faster now shipping in 100 L industrial pack",
                  body: "Strong anion exchange optimised for capture at 700 cm/hr. CoA-released, 2-week lead time ex-works Anand.",
                },
                {
                  tag: "Application note",
                  title: "mAb polishing on CM Agarose — case study",
                  body: "Aggregate clearance >99% with single-step elution. Method transferable from 1 mL screening to 50 L preparative.",
                },
                {
                  tag: "Facility",
                  title: "600 L/month resin production capacity online",
                  body: "Three cross-linking reactors (20, 50, 200 L) running on staggered schedule for continuous supply assurance.",
                },
              ].map((p) => (
                <a
                  key={p.title}
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-border bg-white p-6 hover:border-teal transition-colors flex flex-col"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-md bg-[#0A66C2] flex items-center justify-center">
                      <Linkedin className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-teal font-semibold">
                      {p.tag}
                    </div>
                  </div>
                  <h3 className="font-serif text-lg text-navy mb-2 group-hover:text-teal transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-[13px] text-slate leading-relaxed flex-1">{p.body}</p>
                  <div className="mt-4 text-[12px] text-slate-light flex items-center gap-1">
                    Read on LinkedIn <ExternalLink className="w-3 h-3" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}