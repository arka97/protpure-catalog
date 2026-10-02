import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { APPLICATIONS } from "@/data/applications";
import { PRODUCTS, VARIANTS } from "@/data/catalog";
import { familyById } from "@/data/families";
import { EMPTY_COLUMNS } from "@/data/hardware";
import { SERVICES } from "@/data/services";
import { FAMILY_STYLE } from "@/lib/family-style";
import { cn } from "@/lib/utils";

interface Entry {
  group: "Products" | "Applications" | "Services" | "Pages";
  label: string;
  sub?: string;
  to: string;
  /** Lower-cased text the query is matched against. */
  haystack: string;
  dot?: string;
}

interface Sku {
  catNo: string;
  label: string;
  to: string;
}

const lower = (...parts: (string | undefined)[]) => parts.filter(Boolean).join(" ").toLowerCase();

const ENTRIES: Entry[] = [
  ...PRODUCTS.map((p): Entry => {
    const family = familyById(p.family);
    return {
      group: "Products",
      label: p.name,
      sub: p.descriptor,
      to: `/products/${p.slug}`,
      haystack: lower(p.name, p.descriptor, family.name, family.abbr, family.title, ...p.variants.map((v) => v.name)),
      dot: FAMILY_STYLE[family.color].dot,
    };
  }),
  ...APPLICATIONS.flatMap((a): Entry[] => [
    {
      group: "Applications",
      label: a.title,
      to: `/applications/${a.slug}`,
      haystack: lower(a.title, a.short, a.description),
    },
    ...a.subs.map((s): Entry => ({
      group: "Applications",
      label: s.title,
      sub: a.short,
      to: `/applications/${a.slug}#${s.slug}`,
      haystack: lower(s.title, s.description, a.short),
    })),
  ]),
  ...SERVICES.map((s): Entry => ({
    group: "Services",
    label: s.name,
    sub: s.tagline,
    to: `/services#${s.slug}`,
    haystack: lower(s.name, s.tagline, s.code, ...s.examples),
  })),
  {
    group: "Pages",
    label: "Resin finder",
    sub: "Resins by application and stage",
    to: "/applications#finder",
    haystack: "resin finder selector application stage",
  },
  {
    group: "Pages",
    label: "Catalogue numbers",
    sub: "Every pack size and code",
    to: "/products?view=codes",
    haystack: "catalogue numbers codes sku pack sizes price list",
  },
  {
    group: "Pages",
    label: "Technology and data",
    sub: "Grades, matrix and measured performance",
    to: "/technology",
    haystack: "technology data grades fast flow precise high resolution performance evidence hetp asymmetry",
  },
  {
    group: "Pages",
    label: "Company",
    sub: "Who we are, facility and milestones",
    to: "/about",
    haystack: "company about facility anand gujarat founder team",
  },
  {
    group: "Pages",
    label: "Resources",
    sub: "Datasheets, technical notes and glossary",
    to: "/resources",
    haystack: "resources datasheet brochure technical note case study glossary documents download",
  },
  {
    group: "Pages",
    label: "Contact",
    sub: "Email, phone, WhatsApp and address",
    to: "/contact",
    haystack: "contact email phone whatsapp address location enquiry",
  },
  {
    group: "Pages",
    label: "Request a quote",
    sub: "Send your list of items",
    to: "/quote",
    haystack: "request quote rfq quotation price order buy",
  },
];

const SKUS: Sku[] = [
  ...VARIANTS.flatMap(({ product, variant }) =>
    variant.packs.map((pack) => ({
      catNo: pack.catNo,
      label: `${variant.name} · ${pack.size}`,
      to: `/products/${product.slug}?variant=${variant.id}#order`,
    })),
  ),
  ...EMPTY_COLUMNS.map((c) => ({
    catNo: c.item,
    label: `Empty column, ${c.innerDiameterMm} mm · ${c.bedVolumeMl} mL bed`,
    to: "/products/empty-columns#order",
  })),
];

const GROUPS: Entry["group"][] = ["Products", "Applications", "Services", "Pages"];

function search(query: string) {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!tokens.length) {
    return { skus: [], entries: ENTRIES.filter((e) => e.group === "Products" || e.group === "Pages") };
  }
  const compact = query.replace(/\s+/g, "").toLowerCase();
  const skus = compact.length >= 2 ? SKUS.filter((s) => s.catNo.toLowerCase().startsWith(compact)).slice(0, 8) : [];
  const entries = ENTRIES.filter((e) => tokens.every((t) => e.haystack.includes(t))).sort((a, b) => {
    const first = tokens[0];
    return Number(b.label.toLowerCase().startsWith(first)) - Number(a.label.toLowerCase().startsWith(first));
  });
  return { skus, entries };
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Lets the opener take focus back when the dialog closes. */
  onCloseAutoFocus?: (event: Event) => void;
}

/** Site search: product lines, catalogue numbers, applications, services and pages. */
export function SearchDialog({ open, onOpenChange, onCloseAutoFocus }: SearchDialogProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { skus, entries } = useMemo(() => search(query), [query]);

  const go = (to: string) => {
    onOpenChange(false);
    setQuery("");
    navigate(to);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) setQuery("");
      }}
    >
      <DialogContent
        onCloseAutoFocus={onCloseAutoFocus}
        className="top-[9vh] max-h-[80vh] max-w-xl translate-y-0 gap-0 overflow-hidden rounded-lg border-rule bg-card p-0 data-[state=closed]:slide-out-to-top-[2%] data-[state=open]:slide-in-from-top-[2%] [&>button]:hidden"
      >
        <DialogTitle className="sr-only">Search</DialogTitle>
        <DialogDescription className="sr-only">
          Search products, catalogue numbers, applications and services. Use the arrow keys to move and Enter to open.
        </DialogDescription>
        <Command shouldFilter={false} className="bg-card">
          <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder="Search a resin, a catalogue number or an application"
            className="h-14 text-base"
          />
          <CommandList className="max-h-[min(60vh,30rem)] p-1.5">
            <CommandEmpty className="px-4 py-10 text-center text-sm text-ink-2">
              Nothing matches “{query}”. Try a resin name such as “Q Agarose” or a catalogue number such as “NNFF03”.
            </CommandEmpty>

            {skus.length > 0 && (
              <CommandGroup heading="Catalogue numbers">
                {skus.map((s) => (
                  <CommandItem
                    key={s.catNo}
                    value={`sku-${s.catNo}`}
                    onSelect={() => go(s.to)}
                    className="gap-3 rounded-md px-3 py-2.5"
                  >
                    <span className="code w-28 shrink-0 text-foreground">{s.catNo}</span>
                    <span className="truncate text-sm text-ink-2">{s.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {GROUPS.map((group) => {
              const items = entries.filter((e) => e.group === group);
              if (!items.length) return null;
              return (
                <CommandGroup key={group} heading={group}>
                  {items.map((e) => (
                    <CommandItem
                      key={e.to}
                      value={e.to}
                      onSelect={() => go(e.to)}
                      className="gap-3 rounded-md px-3 py-2.5"
                    >
                      {group === "Products" && (
                        <span aria-hidden className={cn("h-2 w-2 shrink-0 rounded-full", e.dot)} />
                      )}
                      <span className="text-[0.9375rem] font-medium">{e.label}</span>
                      {e.sub && (
                        <span className="ml-auto hidden truncate pl-4 text-[0.8125rem] text-ink-3 sm:block">
                          {e.sub}
                        </span>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              );
            })}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
