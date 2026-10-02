import { DEAE_PRECISE, HY_IONIC_MODES, SEC_CALIBRATION } from "@/data/evidence";
import { cn } from "@/lib/utils";
import { DataTable, LineChart } from "./Charts";

/* Charts built from the client's studies (src/data/evidence.ts). */

const velocities = DEAE_PRECISE.efficiency.map((e) => e.velocity);

/** Plates per metre against linear velocity for DEAE Agarose Precise. */
export function EfficiencyChart({ className }: { className?: string }) {
  return (
    <LineChart
      className={className}
      title="Efficiency rises with velocity"
      subtitle="DEAE Agarose Precise, 18.2 cm bed, acetone pulse"
      summary={`Line chart of theoretical plates per metre against linear velocity for DEAE Agarose Precise: ${DEAE_PRECISE.efficiency
        .map((e) => `${e.platesPerMetre.toLocaleString("en-IN")} at ${e.velocity} cm/h`)
        .join(", ")}.`}
      points={DEAE_PRECISE.efficiency.map((e, i) => ({
        x: e.velocity,
        y: e.platesPerMetre,
        label: e.platesPerMetre.toLocaleString("en-IN"),
        place: i === 0 ? "above" : "above-left",
      }))}
      xDomain={[30, 215]}
      xTicks={velocities}
      xTitle="Linear velocity, cm/h"
      yDomain={[0, 16000]}
      yTicks={[0, 4000, 8000, 12000, 16000]}
      yFormat={(n) => (n === 0 ? "0" : `${n / 1000}k`)}
      yTitle="Plates per metre"
    />
  );
}

/** Peak asymmetry against linear velocity, inside the acceptance range. */
export function AsymmetryChart({ className }: { className?: string }) {
  return (
    <LineChart
      className={className}
      title="Peak asymmetry stays in range"
      subtitle="Same column and test. Acceptance 0.8 to 1.8"
      summary={`Line chart of peak asymmetry against linear velocity for DEAE Agarose Precise: ${DEAE_PRECISE.efficiency
        .map((e) => `${e.asymmetry.toFixed(2)} at ${e.velocity} cm/h`)
        .join(", ")}. All values lie within the acceptance range of 0.8 to 1.8.`}
      points={DEAE_PRECISE.efficiency.map((e) => ({ x: e.velocity, y: e.asymmetry, label: e.asymmetry.toFixed(2) }))}
      xDomain={[30, 215]}
      xTicks={velocities}
      xTitle="Linear velocity, cm/h"
      yDomain={[0.6, 2]}
      yTicks={[0.6, 1, 1.4, 1.8]}
      yFormat={(n) => n.toFixed(1)}
      yTitle="Asymmetry factor, As"
      band={{ from: 0.8, to: 1.8, label: "Acceptance range" }}
    />
  );
}

export function EfficiencyTable({ className, open }: { className?: string; open?: boolean }) {
  return (
    <DataTable
      className={className}
      open={open}
      caption="DEAE Agarose Precise: column efficiency by linear velocity"
      columns={["Velocity (cm/h)", "Plates per metre", "HETP (mm)", "Asymmetry"]}
      rows={DEAE_PRECISE.efficiency.map((e) => [
        e.velocity,
        e.platesPerMetre,
        e.hetpMm.toFixed(3),
        e.asymmetry.toFixed(2),
      ])}
    />
  );
}

const SEC_POINTS = SEC_CALIBRATION.standards.filter((s) => s.kav !== null);
const SEC_LABEL: Record<string, { short: string; place: "above" | "below" | "right" | "left" }> = {
  "Immunoglobulin G": { short: "IgG", place: "above" },
  BSA: { short: "BSA", place: "right" },
  Ovalbumin: { short: "Ovalbumin", place: "right" },
  "Proteinase K": { short: "Proteinase K", place: "right" },
  "Ribonuclease A": { short: "RNase A", place: "above" },
};

/** Partition coefficient against molecular weight for the SEC protein standards. */
export function KavChart({ className }: { className?: string }) {
  return (
    <LineChart
      className={className}
      line={false}
      xScale="log"
      title="Smaller proteins enter more of the bead"
      subtitle="Five protein standards, 45 cm bed"
      summary={`Scatter chart of the partition coefficient Kav against molecular weight on a logarithmic axis: ${SEC_POINTS.map(
        (s) => `${s.name} ${s.mw} kDa, Kav ${s.kav}`,
      ).join("; ")}.`}
      points={SEC_POINTS.map((s) => ({
        x: s.mw,
        y: s.kav as number,
        label: SEC_LABEL[s.name]?.short ?? s.name,
        place: SEC_LABEL[s.name]?.place,
      }))}
      xDomain={[9, 260]}
      xTicks={[10, 20, 50, 100, 200]}
      xTitle="Molecular weight, kDa (log scale)"
      yDomain={[0, 1]}
      yTicks={[0, 0.25, 0.5, 0.75, 1]}
      yFormat={(n) => String(n)}
      yTitle="Kav"
    />
  );
}

export function KavTable({ className, open }: { className?: string; open?: boolean }) {
  return (
    <DataTable
      className={className}
      open={open}
      caption="SEC calibration standards"
      columns={["Standard", "MW (kDa)", "Elution (CV)", "Kav"]}
      rows={SEC_CALIBRATION.standards.map((s) => [
        s.role ? `${s.name} (${s.role.toLowerCase()})` : s.name,
        s.name === "NaCl" ? "–" : s.mw,
        s.cv.toFixed(2),
        s.kav === null ? "–" : s.kav.toFixed(2),
      ])}
    />
  );
}

/**
 * Hy-Ionic DP: the two modes of one resin, with the binding capacity measured in each.
 * Two bars on a shared 0–100 mg/mL scale; each bar is labelled with its value and its mode.
 */
export function HyIonicModes({ className }: { className?: string }) {
  const max = Math.max(...HY_IONIC_MODES.map((m) => m.dbc));
  const tone = ["bg-iex", "bg-hic"];
  return (
    <div
      className={cn("grid gap-px overflow-hidden rounded-panel border border-rule bg-rule md:grid-cols-2", className)}
    >
      {HY_IONIC_MODES.map((m, i) => (
        <div key={m.mode} className="bg-card p-6 sm:p-8">
          <p className="label flex items-center gap-2 text-ink-2">
            <span aria-hidden className={cn("h-2 w-2 rounded-full", tone[i])} />
            {m.technique}
          </p>
          <h3 className="heading-4 mt-3">{m.mode}</h3>
          <p className="mt-1.5 text-[0.9375rem] text-ink-2">Binds: {m.binds.toLowerCase()}.</p>

          <div className="mt-6">
            <p className="flex items-baseline gap-2">
              <span className="numeral text-[2.75rem]">{m.dbc}</span>
              <span className="text-[0.9375rem] font-medium text-ink-2">mg BSA/mL</span>
            </p>
            <div className="mt-2 h-2 rounded-full bg-paper-2" aria-hidden>
              <div className={cn("h-full rounded-full", tone[i])} style={{ width: `${(m.dbc / max) * 100}%` }} />
            </div>
            <p className="label mt-2 text-ink-3">Dynamic binding capacity, 10% breakthrough</p>
          </div>

          <dl className="mt-6 divide-y divide-rule border-y border-rule text-[0.9375rem]">
            <div className="grid grid-cols-[4.5rem_1fr] gap-3 py-3">
              <dt className="label pt-0.5 text-ink-3">Bind</dt>
              <dd>{m.bind}</dd>
            </div>
            <div className="grid grid-cols-[4.5rem_1fr] gap-3 py-3">
              <dt className="label pt-0.5 text-ink-3">Elute</dt>
              <dd>{m.elute}</dd>
            </div>
          </dl>
        </div>
      ))}
    </div>
  );
}
