import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const rows = [
  ["Location", "Anand, Gujarat, India"],
  ["Established", "May 2023"],
  ["Facility Type", "Semi-automated manufacturing + R&D"],
  ["Current Capacity", "600 L/month — agarose-based resins"],
  ["Product Validation", "Used in GMP facilities; repeat orders"],
  ["Expansion Plans", "Large-scale production plant (active)"],
  ["Team Strength", "8–10 employees; founder-led"],
  ["Funding Status", "Bootstrapped"],
];

export function FacilitySnapshot() {
  return (
    <section className="bg-background py-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="mb-12 max-w-2xl">
          <div className="text-[11px] font-semibold tracking-[0.15em] text-teal uppercase mb-3">
            Facility
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-navy mb-3">
            Built for scale, grounded in science
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Table */}
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <tbody>
                {rows.map(([k, v]) => (
                  <tr key={k} className="border-b border-border last:border-0">
                    <td className="px-6 py-3.5 text-[13px] text-slate w-2/5">{k}</td>
                    <td className="px-6 py-3.5 text-[13px] text-navy font-semibold">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quote box — from HTML demo facility-visual */}
          <div className="bg-navy rounded-2xl p-10 min-h-[340px] flex flex-col justify-end relative overflow-hidden hex-pattern">
            {/* Glow */}
            <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-[radial-gradient(circle,hsl(var(--teal)/0.2),transparent_70%)]" />

            <blockquote className="font-serif text-xl text-white leading-[1.45] mb-5 relative italic">
              "We are a humble start-up in the niche technology of protein
              purification. With proven academic research backed by our kilo lab
              success, we are entering the market to provide a wide range of resins
              and{" "}
              <em className="not-italic text-[hsl(170,42%,65%)]">
                nanoparticle-based purification solutions.
              </em>
              "
            </blockquote>
            <div className="text-[13px] text-on-navy-muted relative">
              <strong className="text-teal-bright font-semibold">Dr. Rucha P Desai</strong>
              <span className="mx-2">—</span>
              Founding Director, Protpure Tech Pvt. Ltd.
            </div>
            <div className="flex gap-3 mt-6 relative">
              <Button asChild size="sm" className="bg-white hover:bg-teal-pale text-teal">
                <Link to="/about">About us <ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="border-white/20 text-on-navy bg-transparent hover:bg-white/10 hover:text-white">
                <Link to="/technology">Technology</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
