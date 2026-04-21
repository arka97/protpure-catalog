import { Link } from "react-router-dom";
import { ArrowRight, Atom, Magnet, Layers, Droplet } from "lucide-react";

const cats = [
  {
    type: "iec",
    title: "Ion Exchange",
    desc: "SP, CM, Q, DEAE — strong & weak cation/anion exchangers for protein capture and polishing.",
    count: 8,
    icon: Atom,
  },
  {
    type: "affinity",
    title: "Affinity",
    desc: "Ni-NTA, Co-NTA, Zn-NTA, Cu-NTA — single-step capture of His-tagged recombinant proteins.",
    count: 7,
    icon: Layers,
  },
  {
    type: "sec",
    title: "Size Exclusion",
    desc: "Plain & cross-linked agarose for buffer exchange and gentle high-resolution separation.",
    count: 6,
    icon: Droplet,
  },
  {
    type: "hic",
    title: "HIC & Magnetic",
    desc: "Phenyl Agarose for hydrophobic separation; magnetic beads for batch screening.",
    count: 5,
    icon: Magnet,
  },
];

export function CategoryGrid() {
  return (
    <section className="bg-background py-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="mb-12">
          <div className="text-[11px] font-semibold tracking-[0.15em] text-teal uppercase mb-3">
            Catalog
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-navy mb-3">
            Resins for every purification stage
          </h2>
          <p className="text-base text-slate max-w-xl leading-relaxed">
            Browse by chromatography mode. Each family ships in pack sizes from 5 mL R&D
            samples to 100 L industrial volumes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cats.map((c) => (
            <Link
              key={c.type}
              to={`/products?type=${c.type}`}
              className="group bg-white border border-border rounded-xl p-7 transition-all hover:border-teal-pale hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-12px_hsl(var(--teal)/0.15)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-teal opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-11 h-11 rounded-lg bg-teal-pale flex items-center justify-center mb-4">
                <c.icon className="w-5 h-5 text-teal" />
              </div>
              <h3 className="font-serif text-lg text-navy mb-2">{c.title}</h3>
              <p className="text-[13px] text-slate leading-relaxed mb-4">{c.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-teal font-mono font-medium">
                  {c.count} products
                </span>
                <ArrowRight className="w-4 h-4 text-slate-light group-hover:text-teal group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}