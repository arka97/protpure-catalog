import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

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
              <li><span className="text-on-navy-muted">About (coming soon)</span></li>
              <li><span className="text-on-navy-muted">Technology (coming soon)</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-on-navy-muted mb-4 font-sans">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-on-navy">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-teal-bright flex-shrink-0" />
                <div className="space-y-0.5">
                  <div>protpure@gmail.com</div>
                  <div>info@protpure.com</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-teal-bright flex-shrink-0" />
                <div>+91 94265 96644</div>
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
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-xs text-center text-on-navy-muted">
          © {new Date().getFullYear()} ProtPure Tech Pvt. Ltd. · Manufactured in India
        </div>
      </div>
    </footer>
  );
}