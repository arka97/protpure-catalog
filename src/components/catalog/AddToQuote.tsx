import { Check, Plus } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useRFQ } from "@/context/RFQContext";
import type { RFQItem } from "@/lib/enquiry";

interface AddToQuoteProps extends Omit<ButtonProps, "onClick"> {
  item: Omit<RFQItem, "quantity" | "notes">;
  /** Label before the item is on the list. */
  label?: string;
  /** Show only the icon on phones (the full label stays available to screen readers). */
  compactOnMobile?: boolean;
}

/** Adds one item to the quote list. Once listed it reads "Added"; pressing again raises the quantity. */
export function AddToQuote({
  item,
  label = "Add to quote",
  size = "sm",
  variant,
  compactOnMobile,
  ...props
}: AddToQuoteProps) {
  const { addItem, has } = useRFQ();
  const listed = has(item.id);
  return (
    <Button
      type="button"
      size={size}
      variant={variant ?? (listed ? "secondary" : "default")}
      onClick={() => addItem(item)}
      aria-label={`${listed ? "Added. Add another" : label}: ${item.name}${item.pack ? `, ${item.pack}` : ""}`}
      {...props}
    >
      {listed ? <Check aria-hidden /> : <Plus aria-hidden />}
      <span className={compactOnMobile ? "hidden sm:inline" : undefined}>{listed ? "Added" : label}</span>
    </Button>
  );
}
