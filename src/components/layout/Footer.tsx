import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy text-on-navy">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                  <circle cx="12" cy="12" r="8" stroke="hsl(var(--teal-bright))" strokeWidth="1.5" />
                  <circle cx="12" cy="12" r="3" fill="hsl(var(--teal-bright))" />
                </svg>
              </div>
              <div className="leading-none">
                <div className="font-serif text-lg text-white">ProtPure</div>
                <div className="text-[9px] tracking-[0.1em] text-on-navy-muted uppercase mt-0.5">
                  Tech Pvt. Ltd.
                </div>
              </div>
            </div>
            <p className="text-sm text-on-navy-muted leading-relaxed max-w-xs">
              Indian manufacturer of agarose-based chromatography resins for
              biopharmaceutical purification. R&D to commercial scale.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-on-navy-muted mb-4 font-sans">
              Products
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/products?type=iec" className="text-on-navy hover:text-white transition-colors">Ion Exchange</Link></li>
              <li><Link to="/products?type=affinity" className="text-on-navy hover:text-white transition-colors">Affinity</Link></li>
              <li><Link to="/products?type=sec" className="text-on-navy hover:text-white transition-colors">Size Exclusion</Link></li>
              <li><Link to="/products?type=hic" className="text-on-navy hover:text-white transition-colors">HIC</Link></li>
              <li><Link to="/products?type=magnetic" className="text-on-navy hover:text-white transition-colors">Magnetic</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-on-navy-muted mb-4 font-sans">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="text-on-navy hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-on-navy hover:text-white transition-colors">Catalog</Link></li>
              <li><Link to="/about" className="text-on-navy hover:text-white transition-colors">About</Link></li>
              <li><Link to="/technology" className="text-on-navy hover:text-white transition-colors">Technology</Link></li>
              <li><Link to="/resources" className="text-on-navy hover:text-white transition-colors">Resources</Link></li>
              <li><Link to="/contact" className="text-on-navy hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-on-navy-muted mb-4 font-sans">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-on-navy">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-teal-bright flex-shrink-0" />
                <a href="mailto:info@protpure.com" className="hover:text-white transition-colors">
                  info@protpure.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-teal-bright flex-shrink-0" />
                <a href="tel:+919426596644" className="hover:text-white transition-colors">
                  +91 94265 96644
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-teal-bright flex-shrink-0" />
                <div className="leading-relaxed">
                  Plot A2/440/2, Road B-18, GIDC,<br />
                  Vitthal Udyog Nagar, Anand 388121,<br />
                  Gujarat, India
                </div>
              </li>
            </ul>

            <div className="flex items-center gap-2 mt-5">
              {[
                { href: "mailto:info@protpure.com", label: "Email", icon: Mail },
                { href: "tel:+919426596644", label: "Phone", icon: Phone },
                {
                  href: "https://wa.me/919426596644",
                  label: "WhatsApp",
                  icon: MessageCircle,
                  external: true,
                },
                {
                  href: "https://www.linkedin.com/company/protpure",
                  label: "LinkedIn",
                  icon: Linkedin,
                  external: true,
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.external ? "_blank" : undefined}
                  rel={s.external ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-on-navy hover:text-teal-bright hover:border-teal-bright/40 transition-colors"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-xs text-center text-on-navy-muted">
          © {new Date().getFullYear()} ProtPure Tech Pvt. Ltd. · Manufactured in India
        </div>
      </div>
    </footer>
  );
}