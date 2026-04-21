import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useRFQ } from "@/context/RFQContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X, Minus, Plus, MessageSquare, ShoppingCart, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  company: z.string().trim().min(1, "Company required").max(120),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().max(40).optional(),
  country: z.string().max(80),
  requirements: z.string().max(1000).optional(),
});

export function RFQDrawer() {
  const { isOpen, setOpen, items, removeItem, updateQuantity, updateNotes, clearCart } = useRFQ();
  const [submitted, setSubmitted] = useState(false);
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "India",
    requirements: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Add at least one product to your inquiry");
      return;
    }
    const result = formSchema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        if (i.path[0]) errs[i.path[0] as string] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const handleClose = (open: boolean) => {
    setOpen(open);
    if (!open && submitted) {
      // reset after closing success state
      setTimeout(() => {
        setSubmitted(false);
        clearCart();
        setForm({ name: "", company: "", email: "", phone: "", country: "India", requirements: "" });
      }, 300);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="px-6 py-5 border-b border-border">
          <SheetTitle className="font-serif text-xl text-navy flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-teal" />
            Inquiry list
          </SheetTitle>
          <p className="text-xs text-slate">
            Add products for evaluation, samples, or pricing.
          </p>
        </SheetHeader>

        {submitted ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-4">
            <div className="w-14 h-14 rounded-full bg-teal-pale flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-teal" />
            </div>
            <h3 className="font-serif text-xl text-navy">Thank you</h3>
            <p className="text-sm text-slate leading-relaxed">
              We'll respond within 24–48 hours with availability and pricing for your inquiry.
            </p>
            <Button onClick={() => handleClose(false)} variant="outline" className="mt-3">
              Close
            </Button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-4">
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-slate-light" />
            </div>
            <p className="text-sm text-slate leading-relaxed">
              Your inquiry list is empty. Browse products to add resins for evaluation.
            </p>
            <Button asChild onClick={() => setOpen(false)} className="bg-teal hover:bg-teal-light text-white">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
            <div className="px-6 py-4 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="border border-border rounded-lg p-4 bg-white">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-navy">{item.product.name}</div>
                      <div className="text-[11px] text-slate-light font-mono mt-0.5">
                        {item.pack.catNo} · {item.pack.size}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-slate-light hover:text-destructive p-1"
                      aria-label="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-border rounded-md">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-secondary text-slate"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-sm font-mono text-navy min-w-[32px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-secondary text-slate"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedNotes((s) => ({ ...s, [item.id]: !s[item.id] }))
                      }
                      className="text-xs text-teal hover:underline flex items-center gap-1"
                    >
                      <MessageSquare className="w-3 h-3" />
                      {expandedNotes[item.id] ? "Hide notes" : "Add notes"}
                    </button>
                  </div>
                  {expandedNotes[item.id] && (
                    <Textarea
                      placeholder="Application notes (optional)"
                      value={item.notes}
                      onChange={(e) => updateNotes(item.id, e.target.value.slice(0, 500))}
                      className="mt-3 text-sm"
                      rows={2}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="px-6 py-5 border-t border-border bg-secondary/40 space-y-3">
              <h4 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-slate font-sans">
                Your details
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="name" className="text-xs">Name *</Label>
                  <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" />
                  {errors.name && <p className="text-[11px] text-destructive mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="company" className="text-xs">Company *</Label>
                  <Input id="company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="mt-1" />
                  {errors.company && <p className="text-[11px] text-destructive mt-1">{errors.company}</p>}
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="text-xs">Email *</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1" />
                {errors.email && <p className="text-[11px] text-destructive mt-1">{errors.email}</p>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="phone" className="text-xs">Phone</Label>
                  <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="country" className="text-xs">Country</Label>
                  <Input id="country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="requirements" className="text-xs">Additional requirements</Label>
                <Textarea
                  id="requirements"
                  rows={3}
                  value={form.requirements}
                  onChange={(e) => setForm({ ...form, requirements: e.target.value.slice(0, 1000) })}
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="w-full bg-teal hover:bg-teal-light text-white">
                Submit RFQ
              </Button>
            </div>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}