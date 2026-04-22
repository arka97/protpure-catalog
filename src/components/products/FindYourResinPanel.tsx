import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Wand2, Circle } from "lucide-react";
import { ResinSelector } from "@/components/home/ResinSelector";
import { BeadSizeSelector } from "./BeadSizeSelector";
import { FlowVariant } from "@/data/products";

interface Props {
  flow: FlowVariant | null;
  onFlowChange: (v: FlowVariant | null) => void;
}

export function FindYourResinPanel({ flow, onFlowChange }: Props) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="mb-6 rounded-xl border border-border bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-secondary/40 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-teal-pale flex items-center justify-center">
            <Wand2 className="w-4 h-4 text-teal" />
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold text-navy">Find your resin</div>
            <div className="text-[12px] text-slate">
              Guided wizard, or pick by bead size and flow profile
            </div>
          </div>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-slate" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate" />
        )}
      </button>

      {open && (
        <div className="border-t border-border p-5 bg-secondary/30">
          <Tabs defaultValue="wizard">
            <TabsList className="mb-4">
              <TabsTrigger value="wizard" className="gap-2">
                <Wand2 className="w-3.5 h-3.5" /> Resin wizard
              </TabsTrigger>
              <TabsTrigger value="bead" className="gap-2">
                <Circle className="w-3.5 h-3.5" /> Bead size
              </TabsTrigger>
            </TabsList>

            <TabsContent value="wizard" className="mt-0">
              {/* Reuse the homepage wizard. It already navigates to /products?ids=... */}
              <div className="-mx-5 -my-5">
                <ResinSelector />
              </div>
            </TabsContent>

            <TabsContent value="bead" className="mt-0 space-y-4">
              <p className="text-sm text-slate">
                Pick a bead-size variant to filter the catalog by flow profile.
              </p>
              <BeadSizeSelector
                active={flow ?? "standard"}
                onChange={(v) => onFlowChange(v)}
              />
              <div className="flex gap-3">
                <Button
                  className="bg-teal hover:bg-teal-light text-white"
                  onClick={() => {
                    onFlowChange(flow ?? "standard");
                    setOpen(false);
                  }}
                >
                  Apply filter
                </Button>
                {flow && (
                  <Button variant="outline" onClick={() => onFlowChange(null)}>
                    Clear
                  </Button>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}