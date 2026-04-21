const variants = [
  { name: "Agarose Faster", flow: 1000, bead: "~150 µm", use: "Industrial capture", pct: 100, badge: "Fastest", badgeClass: "bg-[#dcfce7] text-[#166534]" },
  { name: "Agarose", flow: 700, bead: "~90 µm", use: "Balanced performance", pct: 70, badge: "Standard", badgeClass: "bg-teal-pale text-teal" },
  { name: "Agarose Precise", flow: 380, bead: "~60 µm", use: "High resolution", pct: 38, badge: "Precise", badgeClass: "bg-blue-100 text-blue-700" },
  { name: "Agarose HR", flow: 120, bead: "~40 µm", use: "Gentle elution", pct: 12, badge: "HR", badgeClass: "bg-purple-100 text-purple-700" },
];

export function FlowVelocitySection() {
  const maxBead = 150;
  return (
    <section className="bg-navy hex-pattern relative">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-20 relative">
        <div className="mb-12 max-w-2xl">
          <div className="text-[11px] font-semibold tracking-[0.15em] text-teal-bright uppercase mb-3">
            Particle platform
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-3">
            Four bead sizes, one chemistry
          </h2>
          <p className="text-base text-on-navy leading-relaxed">
            The same 6% cross-linked agarose backbone tuned for different velocity and
            resolution profiles. Pick the variant that matches your column geometry and
            workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {variants.map((v) => {
            const beadPx = 18 + (parseFloat(v.bead.replace(/[^\d.]/g, "")) / maxBead) * 36;
            return (
              <div
                key={v.name}
                className="bg-white/[0.05] border border-white/10 rounded-xl p-5 grid grid-cols-12 gap-4 items-center hover:bg-white/[0.08] transition-colors"
              >
                <div className="col-span-12 md:col-span-3 flex items-center gap-3">
                  <div
                    className="rounded-full bg-gradient-to-br from-teal-bright/30 to-teal/20 border-2 border-teal-bright/40 flex-shrink-0"
                    style={{ width: beadPx, height: beadPx }}
                  />
                  <div>
                    <div className="font-serif text-lg text-white leading-tight">{v.name}</div>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full font-mono text-[10px] font-semibold ${v.badgeClass}`}>
                      {v.badge}
                    </span>
                  </div>
                </div>

                <div className="col-span-6 md:col-span-2">
                  <div className="text-[10px] text-on-navy-muted uppercase tracking-wider font-medium mb-1">Bead D₅₀ᵥ</div>
                  <div className="font-mono text-sm text-white">{v.bead}</div>
                </div>

                <div className="col-span-6 md:col-span-2">
                  <div className="text-[10px] text-on-navy-muted uppercase tracking-wider font-medium mb-1">Max flow</div>
                  <div className="font-mono text-sm text-white">{v.flow} cm/hr</div>
                </div>

                <div className="col-span-12 md:col-span-3">
                  <div className="bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-teal to-teal-bright"
                      style={{ width: `${v.pct}%` }}
                    />
                  </div>
                </div>

                <div className="col-span-12 md:col-span-2 text-right">
                  <div className="text-[12px] text-on-navy">{v.use}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}