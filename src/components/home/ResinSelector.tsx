import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, RotateCcw, CheckCircle2 } from "lucide-react";

type Target =
  | "his-tag"
  | "basic-protein"
  | "acidic-protein"
  | "hydrophobic"
  | "buffer-exchange";
type Stage = "capture" | "intermediate" | "polishing" | "rd";
type Throughput = "high" | "balanced" | "resolution";

const targetOptions: { value: Target; label: string }[] = [
  { value: "his-tag", label: "His-tagged protein" },
  { value: "basic-protein", label: "Basic protein (pI > 7)" },
  { value: "acidic-protein", label: "Acidic protein / nucleic acid" },
  { value: "hydrophobic", label: "Hydrophobic separation" },
  { value: "buffer-exchange", label: "Buffer exchange / SEC" },
];
const stageOptions: { value: Stage; label: string }[] = [
  { value: "capture", label: "Capture" },
  { value: "intermediate", label: "Intermediate" },
  { value: "polishing", label: "Polishing" },
  { value: "rd", label: "R&D screening" },
];
const throughputOptions: { value: Throughput; label: string }[] = [
  { value: "high", label: "High throughput / industrial" },
  { value: "balanced", label: "Balanced" },
  { value: "resolution", label: "High resolution / gentle" },
];

function recommend(target: Target, stage: Stage, throughput: Throughput) {
  const ids: string[] = [];
  if (target === "his-tag") {
    if (stage === "rd") ids.push("ni-nta-magnetic", "ni-nta-agarose");
    else if (throughput === "high") ids.push("ni-nta-agarose-faster");
    else ids.push("ni-nta-agarose");
  } else if (target === "basic-protein") {
    ids.push(throughput === "high" ? "sp-agarose-faster" : "sp-agarose");
    if (stage === "polishing") ids.push("cm-agarose");
  } else if (target === "acidic-protein") {
    ids.push(throughput === "high" ? "q-agarose-faster" : "q-agarose");
    if (stage === "polishing") ids.push("deae-agarose");
  } else if (target === "hydrophobic") {
    ids.push("phenyl-agarose");
  } else {
    ids.push("phenyl-agarose");
  }
  return ids;
}

const productNames: Record<string, string> = {
  "sp-agarose": "SP Agarose",
  "sp-agarose-faster": "SP Agarose Faster",
  "q-agarose": "Q Agarose",
  "q-agarose-faster": "Q Agarose Faster",
  "deae-agarose": "DEAE Agarose",
  "cm-agarose": "CM Agarose",
  "ni-nta-agarose": "Ni-NTA Agarose",
  "ni-nta-agarose-faster": "Ni-NTA Agarose Faster",
  "phenyl-agarose": "Phenyl Agarose",
  "ni-nta-magnetic": "Ni-NTA Magnetic Agarose",
};

export function ResinSelector() {
  const [target, setTarget] = useState<Target | null>(null);
  const [stage, setStage] = useState<Stage | null>(null);
  const [throughput, setThroughput] = useState<Throughput | null>(null);

  const reset = () => {
    setTarget(null);
    setStage(null);
    setThroughput(null);
  };

  const recs = target && stage && throughput ? recommend(target, stage, throughput) : [];

  const Step = ({
    n,
    title,
    active,
    done,
    children,
  }: {
    n: number;
    title: string;
    active: boolean;
    done: boolean;
    children: React.ReactNode;
  }) => (
    <div
      className={`rounded-xl border p-6 transition-all ${
        active ? "border-teal bg-white shadow-sm" : done ? "border-border bg-white" : "border-border bg-secondary/40 opacity-70"
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-semibold ${
            done
              ? "bg-teal text-white"
              : active
              ? "bg-teal-pale text-teal border border-teal"
              : "bg-secondary text-slate-light"
          }`}
        >
          {done ? <CheckCircle2 className="w-4 h-4" /> : n}
        </div>
        <h4 className="text-sm font-semibold text-navy font-sans">{title}</h4>
      </div>
      {children}
    </div>
  );

  const Pill = ({
    selected,
    onClick,
    children,
  }: {
    selected: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-[13px] border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal ${
        selected
          ? "bg-teal text-white border-teal"
          : "bg-white border-border text-slate hover:border-teal hover:text-teal"
      }`}
    >
      {children}
    </button>
  );

  return (
    <section className="bg-white py-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="mb-12 max-w-2xl">
          <div className="text-[11px] font-semibold tracking-[0.15em] text-teal uppercase mb-3">
            Resin selector
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-navy mb-3">
            Find the right chemistry in three steps
          </h2>
          <p className="text-base text-slate leading-relaxed">
            Tell us what you're purifying and we'll recommend the matching resin family.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Step n={1} title="What are you purifying?" active={!target} done={!!target}>
            <div className="flex flex-wrap gap-2">
              {targetOptions.map((o) => (
                <Pill key={o.value} selected={target === o.value} onClick={() => setTarget(o.value)}>
                  {o.label}
                </Pill>
              ))}
            </div>
          </Step>
          <Step n={2} title="Purification stage?" active={!!target && !stage} done={!!stage}>
            <div className="flex flex-wrap gap-2">
              {stageOptions.map((o) => (
                <Pill
                  key={o.value}
                  selected={stage === o.value}
                  onClick={() => target && setStage(o.value)}
                >
                  {o.label}
                </Pill>
              ))}
            </div>
          </Step>
          <Step n={3} title="Throughput need?" active={!!stage && !throughput} done={!!throughput}>
            <div className="flex flex-wrap gap-2">
              {throughputOptions.map((o) => (
                <Pill
                  key={o.value}
                  selected={throughput === o.value}
                  onClick={() => stage && setThroughput(o.value)}
                >
                  {o.label}
                </Pill>
              ))}
            </div>
          </Step>
        </div>

        {recs.length > 0 && (
          <div className="mt-6 rounded-xl border border-teal/30 bg-teal-pale/40 p-7 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="text-[11px] font-semibold tracking-[0.15em] text-teal uppercase mb-2">
                Recommended
              </div>
              <div className="font-serif text-xl text-navy mb-3">
                {recs.map((id) => productNames[id]).join(" · ")}
              </div>
              <p className="text-sm text-slate max-w-lg">
                Based on your selection. Add to your RFQ for a sample evaluation kit, or
                view full specs.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Button asChild className="bg-teal hover:bg-teal-light text-white">
                <Link to={`/products?ids=${recs.join(",")}`}>
                  View these <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button variant="outline" onClick={reset}>
                <RotateCcw className="w-4 h-4 mr-1" /> Reset
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}