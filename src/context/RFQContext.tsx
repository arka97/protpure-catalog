import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { EMPTY_CONTACT, type Contact, type RFQItem } from "@/lib/enquiry";
import { useLocalState } from "@/lib/persisted-state";
import { useFocusReturn } from "@/lib/use-focus-return";

/*
  The quote list ("RFQ cart"). Items are resins, columns, kits, empty columns, services or document
  requests. The list is kept in localStorage so a buyer can come back to it. The contact details typed into an
  enquiry form are shared between the drawer, the quote page and the contact page while the site is open,
  but are never written to storage.
*/

type NewItem = Omit<RFQItem, "quantity" | "notes"> & { quantity?: number; notes?: string };

interface Ctx {
  items: RFQItem[];
  /** Number of lines in the list. */
  count: number;
  isOpen: boolean;
  setOpen: (v: boolean) => void;
  has: (id: string) => boolean;
  /** Adds an item, or increases its quantity if it is already listed. */
  addItem: (item: NewItem, options?: { quiet?: boolean }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateNotes: (id: string, notes: string) => void;
  /** Swap a listed item for another pack of the same product. */
  replaceItem: (id: string, next: NewItem) => void;
  clear: () => void;
  /** Passed to the drawer so focus returns to whatever opened it. */
  restoreFocus: (event: Event) => void;
  /** Contact details as typed so far (in memory only). */
  contact: Contact;
  setContact: (next: Contact) => void;
}

const RFQCtx = createContext<Ctx | null>(null);
const STORAGE_KEY = "protpure_quote_list_v2";
const MAX_QTY = 999;

const KINDS = ["product", "hardware", "service", "document"];

/** Stored data may be stale or edited by hand: keep only well-formed items. */
function sanitise(value: unknown): RFQItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (v): v is RFQItem =>
        !!v &&
        typeof v === "object" &&
        typeof v.id === "string" &&
        typeof v.name === "string" &&
        KINDS.includes(v.kind),
    )
    .map((v) => ({
      ...v,
      quantity: Math.min(MAX_QTY, Math.max(1, Math.round(Number(v.quantity)) || 1)),
      notes: typeof v.notes === "string" ? v.notes.slice(0, 500) : "",
    }))
    .slice(0, 100);
}

export function RFQProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalState<RFQItem[]>(STORAGE_KEY, [], sanitise);
  const [isOpen, setIsOpen] = useState(false);
  const { remember, restore } = useFocusReturn();
  const setOpen = useCallback(
    (open: boolean) => {
      if (open) remember();
      setIsOpen(open);
    },
    [remember],
  );
  const [contact, setContact] = useState<Contact>(EMPTY_CONTACT);

  const addItem = useCallback<Ctx["addItem"]>(
    (item, options) => {
      setItems((state) => {
        const existing = state.find((i) => i.id === item.id);
        if (existing) {
          const countable = existing.kind === "product" || existing.kind === "hardware";
          return countable
            ? state.map((i) =>
                i.id === item.id ? { ...i, quantity: Math.min(MAX_QTY, i.quantity + (item.quantity ?? 1)) } : i,
              )
            : state;
        }
        return [...state, { ...item, quantity: item.quantity ?? 1, notes: item.notes ?? "" }];
      });
      if (!options?.quiet) {
        toast(`Added to your quote list`, {
          description: [item.name, item.pack].filter(Boolean).join(" · "),
          action: { label: "View list", onClick: () => setOpen(true) },
        });
      }
    },
    [setItems, setOpen],
  );

  const value = useMemo<Ctx>(
    () => ({
      items,
      count: items.length,
      isOpen,
      setOpen,
      has: (id) => items.some((i) => i.id === id),
      addItem,
      removeItem: (id) => setItems((s) => s.filter((i) => i.id !== id)),
      updateQuantity: (id, quantity) =>
        setItems((s) =>
          s.map((i) =>
            i.id === id ? { ...i, quantity: Math.min(MAX_QTY, Math.max(1, Math.round(quantity) || 1)) } : i,
          ),
        ),
      updateNotes: (id, notes) =>
        setItems((s) => s.map((i) => (i.id === id ? { ...i, notes: notes.slice(0, 500) } : i))),
      replaceItem: (id, next) =>
        setItems((state) => {
          const current = state.find((i) => i.id === id);
          if (!current || next.id === id) return state;
          const target = state.find((i) => i.id === next.id);
          if (target) {
            // The other pack is already listed: merge the quantities.
            return state
              .filter((i) => i.id !== id)
              .map((i) =>
                i.id === next.id ? { ...i, quantity: Math.min(MAX_QTY, i.quantity + current.quantity) } : i,
              );
          }
          return state.map((i) =>
            i.id === id ? { ...current, ...next, quantity: current.quantity, notes: current.notes } : i,
          );
        }),
      clear: () => setItems([]),
      restoreFocus: restore,
      contact,
      setContact,
    }),
    [items, isOpen, setOpen, addItem, setItems, restore, contact],
  );

  return <RFQCtx.Provider value={value}>{children}</RFQCtx.Provider>;
}

export function useRFQ() {
  const ctx = useContext(RFQCtx);
  if (!ctx) throw new Error("useRFQ must be used within RFQProvider");
  return ctx;
}
