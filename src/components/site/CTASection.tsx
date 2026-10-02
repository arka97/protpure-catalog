import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRFQ } from "@/context/RFQContext";

interface CTASectionProps {
  title?: ReactNode;
  text?: string;
}

/** Closing band on every page: the two ways to start a conversation. */
export function CTASection({
  title = "Tell us what you are purifying.",
  text = "Send your list of resins, columns and pack sizes, or describe the separation. Our scientists reply with a quotation and the technical data you need to evaluate it.",
}: CTASectionProps) {
  const { setOpen } = useRFQ();
  return (
    <section className="no-print bg-signal text-ink">
      <div className="shell grid gap-10 py-16 md:py-24 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="label mb-5 flex items-center gap-3">
            <span aria-hidden className="h-px w-7 bg-current" />
            Request a quote
          </p>
          <h2 className="display-2 max-w-[16ch]">{title}</h2>
        </div>
        <div className="lg:col-span-4">
          <p className="max-w-md text-[1.0625rem] leading-relaxed">{text}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button size="lg" onClick={() => setOpen(true)}>
              Request a quote
              <ArrowRight />
            </Button>
            <Button size="lg" variant="outline" className="border-ink text-ink hover:bg-ink hover:text-paper" asChild>
              <Link to="/contact">Talk to a scientist</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
