import { Button } from "@/components/ui/button";
import { useRFQ } from "@/context/RFQContext";

export function CTABand() {
  const { setOpen } = useRFQ();
  return (
    <section className="bg-teal">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="font-serif text-2xl md:text-3xl text-white mb-2">
            Ready to evaluate ProtPure resins in your lab?
          </h2>
          <p className="text-white/85 text-base">
            Free 5–25 mL evaluation samples shipped to qualified labs. 2–3 week turnaround.
          </p>
        </div>
        <Button
          size="lg"
          onClick={() => setOpen(true)}
          className="bg-white hover:bg-teal-pale text-teal font-semibold flex-shrink-0"
        >
          Request a Free Sample
        </Button>
      </div>
    </section>
  );
}