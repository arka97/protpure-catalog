import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { FAMILIES } from "@/data/families";
import { NAV } from "@/data/nav";
import { MAPS_URL, SITE, whatsappUrl } from "@/data/site";

const linkClass = "text-on-ink-2 transition-colors hover:text-on-ink";

function External({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-1`}>
      {children}
      <ArrowUpRight aria-hidden className="h-3.5 w-3.5 opacity-70" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export function Footer() {
  return (
    <footer className="theme-ink no-print">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-10 border-b border-ink-line pb-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link to="/" aria-label="ProtPure home" className="inline-block">
              <Logo tone="mono" className="h-11 text-on-ink" />
            </Link>
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-on-ink-2">{SITE.description}</p>
          </div>
          <p className="display-3 self-end lg:col-span-7 lg:text-right">
            Purity that drives <span className="em">results.</span>
          </p>
        </div>

        <div className="grid gap-x-8 gap-y-10 pt-12 text-[0.9375rem] sm:grid-cols-2 lg:grid-cols-12">
          <nav aria-label="Products" className="lg:col-span-3">
            <h2 className="label text-on-ink-2">Products</h2>
            <ul className="mt-4 space-y-2.5">
              {FAMILIES.map((f) => (
                <li key={f.id}>
                  <Link to={`/products?family=${f.id}`} className={linkClass}>
                    {f.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Site" className="lg:col-span-3">
            <h2 className="label text-on-ink-2">Explore</h2>
            <ul className="mt-4 space-y-2.5">
              {NAV.filter((n) => n.to !== "/products").map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className={linkClass}>
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/contact" className={linkClass}>
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/quote" className={linkClass}>
                  Request a quote
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="label text-on-ink-2">Talk to us</h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={`mailto:${SITE.email}`} className={linkClass}>
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={SITE.phoneHref} className={linkClass}>
                  {SITE.phone}
                </a>
              </li>
              <li>
                <External href={whatsappUrl("Hello ProtPure, I would like to enquire about ")}>WhatsApp</External>
              </li>
              <li>
                <External href={SITE.linkedin}>LinkedIn</External>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="label text-on-ink-2">Find us</h2>
            <address className="mt-4 not-italic leading-relaxed text-on-ink-2">
              {SITE.legalName}
              {SITE.address.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="mt-3">
              <External href={MAPS_URL}>Open in Google Maps</External>
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ink-line pt-6 text-[0.8125rem] text-on-ink-2 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.legalName} All rights reserved.
          </p>
          <p className="label">Developed in India · Manufactured in India</p>
        </div>
      </div>
    </footer>
  );
}
