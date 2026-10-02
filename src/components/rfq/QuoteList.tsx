import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";
import { useRFQ } from "@/context/RFQContext";
import { variantById } from "@/data/catalog";
import type { RFQItem } from "@/lib/enquiry";
import { cn } from "@/lib/utils";

const KIND_TAG: Partial<Record<RFQItem["kind"], string>> = { service: "Service", document: "Document" };

function Stepper({ item }: { item: RFQItem }) {
  const { updateQuantity } = useRFQ();
  const btn =
    "grid h-9 w-9 place-items-center text-ink-2 transition-colors hover:bg-paper-2 hover:text-foreground disabled:opacity-40";
  return (
    <div className="inline-flex items-center overflow-hidden rounded-full border border-input bg-card">
      <button
        type="button"
        className={btn}
        onClick={() => updateQuantity(item.id, item.quantity - 1)}
        disabled={item.quantity <= 1}
        aria-label={`Decrease quantity of ${item.name}`}
      >
        <Minus aria-hidden className="h-3.5 w-3.5" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={1}
        max={999}
        value={item.quantity}
        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
        aria-label={`Quantity of ${item.name}`}
        className="h-9 w-11 bg-transparent text-center text-sm font-semibold tabular-nums outline-none [appearance:textfield] focus-visible:bg-paper-2 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="button"
        className={btn}
        onClick={() => updateQuantity(item.id, item.quantity + 1)}
        disabled={item.quantity >= 999}
        aria-label={`Increase quantity of ${item.name}`}
      >
        <Plus aria-hidden className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function Row({ item }: { item: RFQItem }) {
  const { removeItem, updateNotes, replaceItem, setOpen } = useRFQ();
  const [noteOpen, setNoteOpen] = useState(Boolean(item.notes));
  const packs = item.variantId ? variantById(item.variantId)?.variant.packs : undefined;
  const countable = item.kind === "product" || item.kind === "hardware";
  const noteId = `note-${item.id}`;

  return (
    <li className="py-4">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          {KIND_TAG[item.kind] && <p className="label mb-1 text-signal-ink">{KIND_TAG[item.kind]}</p>}
          <p className="font-semibold leading-snug">
            {item.href ? (
              <Link to={item.href} onClick={() => setOpen(false)} className="hover:underline">
                {item.name}
              </Link>
            ) : (
              item.name
            )}
          </p>
          {(item.catNo || item.pack) && (
            <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem] text-ink-2">
              {item.catNo && <span className="code text-ink-2">{item.catNo}</span>}
              {packs && packs.length > 1 ? (
                <>
                  <label htmlFor={`pack-${item.id}`} className="sr-only">
                    Pack size for {item.name}
                  </label>
                  <select
                    id={`pack-${item.id}`}
                    value={item.catNo}
                    onChange={(e) => {
                      const pack = packs.find((p) => p.catNo === e.target.value);
                      if (pack) replaceItem(item.id, { ...item, id: pack.catNo, catNo: pack.catNo, pack: pack.size });
                    }}
                    className="h-8 rounded-md border border-input bg-card pl-2 pr-7 text-[0.8125rem] font-medium text-foreground"
                  >
                    {packs.map((p) => (
                      <option key={p.catNo} value={p.catNo}>
                        {p.size}
                      </option>
                    ))}
                  </select>
                </>
              ) : (
                item.pack && <span>{item.pack}</span>
              )}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => removeItem(item.id)}
          className="-mr-2 -mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink-3 transition-colors hover:bg-paper-2 hover:text-foreground"
          aria-label={`Remove ${item.name} from the list`}
        >
          <X aria-hidden className="h-4 w-4" />
        </button>
      </div>

      <div className={cn("mt-3 flex items-center gap-4", !countable && "mt-2")}>
        {countable && <Stepper item={item} />}
        {!noteOpen && (
          <button
            type="button"
            onClick={() => setNoteOpen(true)}
            className="text-[0.8125rem] font-medium text-ink-2 underline underline-offset-4 hover:text-foreground"
          >
            Add a note
          </button>
        )}
      </div>

      {noteOpen && (
        <div className="mt-3">
          <label htmlFor={noteId} className="sr-only">
            Note for {item.name}
          </label>
          <input
            id={noteId}
            value={item.notes}
            onChange={(e) => updateNotes(item.id, e.target.value)}
            maxLength={500}
            placeholder="Note for this item, e.g. required by date or grade"
            className="h-10 w-full rounded-md border border-input bg-card px-3 text-base placeholder:text-ink-3 md:text-sm"
          />
        </div>
      )}
    </li>
  );
}

/** The items on the quote list, editable in place. Renders nothing when the list is empty. */
export function QuoteList({ className }: { className?: string }) {
  const { items } = useRFQ();
  if (!items.length) return null;
  return (
    <ul className={cn("divide-y divide-rule border-y border-rule", className)}>
      {items.map((item) => (
        <Row key={item.id} item={item} />
      ))}
    </ul>
  );
}
