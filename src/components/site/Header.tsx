import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, ChevronDown, ClipboardList, Mail, Menu, Phone, Search } from "lucide-react";
import { Dots, Logo } from "@/components/brand/Logo";
import { Halftone } from "@/components/viz/Halftone";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { useRFQ } from "@/context/RFQContext";
import { APPLICATIONS } from "@/data/applications";
import { productsByFamily } from "@/data/catalog";
import { FAMILIES, FORMAT_FAMILY_IDS, RESIN_FAMILY_IDS, familyById } from "@/data/families";
import { NAV, type NavItem } from "@/data/nav";
import { SITE } from "@/data/site";
import { FAMILY_STYLE } from "@/lib/family-style";
import { useFocusReturn } from "@/lib/use-focus-return";
import { cn } from "@/lib/utils";

/* The search index and its dialog are only fetched when search is first opened. */
const SearchDialog = lazy(() => import("./SearchDialog").then((m) => ({ default: m.SearchDialog })));

type MenuId = NonNullable<NavItem["menu"]>;

/* ------------------------------------------------------------------ Flyouts (large screens) */

function ProductsMenu() {
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-8 grid grid-cols-3 gap-x-8 gap-y-8">
        {RESIN_FAMILY_IDS.map((id) => {
          const family = familyById(id);
          const style = FAMILY_STYLE[family.color];
          return (
            <div key={id}>
              <Link to={`/products?family=${id}`} className="group flex items-center gap-3">
                <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-md", style.tint)}>
                  <Halftone family={id} cells={7} className="h-7 w-7" />
                </span>
                <span>
                  <span className="label block text-ink-3">{family.abbr}</span>
                  <span className="block text-[0.9375rem] font-semibold leading-tight group-hover:underline">
                    {family.name}
                  </span>
                </span>
              </Link>
              <ul className="mt-3 space-y-1.5 border-l border-rule pl-4">
                {productsByFamily(id).map((p) => (
                  <li key={p.slug}>
                    <Link
                      to={`/products/${p.slug}`}
                      className="text-sm text-ink-2 hover:text-foreground hover:underline"
                    >
                      {p.name}
                      {p.isNew && <span className="label ml-2 text-signal-ink">New</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="col-span-4 flex flex-col rounded-lg bg-paper-2 p-6">
        <p className="label text-ink-3">Formats</p>
        <ul className="mt-3 divide-y divide-rule">
          {FORMAT_FAMILY_IDS.map((id) => {
            const family = familyById(id);
            return (
              <li key={id}>
                <Link to={`/products?family=${id}`} className="group flex items-start justify-between gap-4 py-3">
                  <span>
                    <span className="block text-[0.9375rem] font-semibold leading-tight group-hover:underline">
                      {family.name}
                    </span>
                    <span className="mt-1 block text-[0.8125rem] leading-snug text-ink-2">{family.summary}</span>
                  </span>
                  <ArrowRight
                    aria-hidden
                    className="mt-0.5 h-4 w-4 shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-5 text-sm">
          <Link to="/products" className="link">
            All products
          </Link>
          <Link to="/products?view=codes" className="link">
            Catalogue numbers
          </Link>
        </div>
      </div>
    </div>
  );
}

function ApplicationsMenu() {
  return (
    <div className="grid grid-cols-12 gap-8">
      <ul className="col-span-8 grid grid-cols-2 gap-x-8">
        {APPLICATIONS.map((a, i) => (
          <li key={a.slug} className="border-b border-rule">
            <Link to={`/applications/${a.slug}`} className="group flex items-baseline gap-4 py-3">
              <span className="label w-5 text-ink-3">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[0.9375rem] font-semibold leading-tight group-hover:underline">{a.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="col-span-4 flex flex-col rounded-lg bg-paper-2 p-6">
        <p className="label text-ink-3">Resin finder</p>
        <p className="mt-3 text-lg font-semibold leading-snug tracking-tight">
          Pick what you are purifying and see the resins for capture, intermediate purification and polishing.
        </p>
        <div className="mt-auto pt-5">
          <Link to="/applications#finder" className="link text-sm">
            Open the resin finder
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Header */

const linkBase =
  "relative flex h-full items-center gap-1 px-3 text-[0.9375rem] font-medium text-ink-2 transition-colors hover:text-foreground";
const activeBar =
  "after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:bg-signal after:content-['']";

export function Header() {
  const { count, setOpen: setQuoteOpen } = useRFQ();
  const location = useLocation();
  const [menu, setMenu] = useState<MenuId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchUsed, setSearchUsed] = useState(false);
  const menuFocus = useFocusReturn();
  const searchFocus = useFocusReturn();
  const barRef = useRef<HTMLDivElement>(null);
  const triggers = useRef<Partial<Record<MenuId, HTMLButtonElement | null>>>({});
  const closeTimer = useRef<number>();
  /** How the open flyout was opened. A click only closes a flyout that a click (or the keyboard) opened. */
  const openedBy = useRef<"hover" | "click">("click");

  const cancelClose = useCallback(() => window.clearTimeout(closeTimer.current), []);
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setMenu(null), 180);
  }, [cancelClose]);

  // Close everything when the route changes.
  useEffect(() => {
    setMenu(null);
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  // Escape and outside click close the flyout.
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      triggers.current[menu]?.focus();
      setMenu(null);
    };
    const onDown = (e: PointerEvent) => {
      if (!barRef.current?.contains(e.target as Node)) setMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [menu]);

  // Ctrl/⌘ + K opens search.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        searchFocus.remember();
        setSearchOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [searchFocus]);

  useEffect(() => cancelClose, [cancelClose]);

  useEffect(() => {
    if (searchOpen) setSearchUsed(true);
  }, [searchOpen]);

  const isActive = (to: string) => location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <>
      {/*
        One banner landmark holds both bars. It sticks with a negative offset on wide screens, so the
        utility bar scrolls away and only the main bar stays in view.
      */}
      <header className="no-print sticky top-0 z-40 md:-top-9">
        {/* Utility bar */}
        <div className="theme-ink hidden md:block">
          <div className="shell flex h-9 items-center justify-between text-[0.8125rem]">
            <p className="flex items-center gap-3 text-on-ink-2">
              <Dots className="text-[0.7rem] text-signal" count={3} />
              Agarose chromatography resins, developed and manufactured in India
            </p>
            <div className="flex items-center gap-6">
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 text-on-ink-2 hover:text-on-ink">
                <Mail aria-hidden className="h-3.5 w-3.5" />
                {SITE.email}
              </a>
              <a href={SITE.phoneHref} className="flex items-center gap-2 text-on-ink-2 hover:text-on-ink">
                <Phone aria-hidden className="h-3.5 w-3.5" />
                {SITE.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div
          ref={barRef}
          className="relative border-b border-rule bg-paper/95 backdrop-blur-md"
          onPointerEnter={(e) => e.pointerType === "mouse" && cancelClose()}
          onPointerLeave={(e) => e.pointerType === "mouse" && menu && scheduleClose()}
        >
          <div className="shell flex h-16 items-center gap-4 lg:h-[4.5rem] lg:gap-8">
            <Link to="/" aria-label="ProtPure home" className="shrink-0">
              <Logo className="h-8 lg:h-9" />
            </Link>

            <nav aria-label="Main" className="hidden h-full lg:block">
              <ul className="flex h-full items-stretch">
                {NAV.map((item) =>
                  item.menu ? (
                    <li key={item.to} className="h-full">
                      <button
                        ref={(el) => (triggers.current[item.menu!] = el)}
                        type="button"
                        aria-expanded={menu === item.menu}
                        aria-controls={`menu-${item.menu}`}
                        className={cn(
                          linkBase,
                          (isActive(item.to) || menu === item.menu) && "text-foreground",
                          isActive(item.to) && activeBar,
                        )}
                        onClick={() => {
                          const keepOpen = menu === item.menu && openedBy.current === "hover";
                          openedBy.current = "click";
                          setMenu(keepOpen || menu !== item.menu ? item.menu! : null);
                        }}
                        onPointerEnter={(e) => {
                          if (e.pointerType !== "mouse") return;
                          cancelClose();
                          if (menu !== item.menu) openedBy.current = "hover";
                          setMenu(item.menu!);
                        }}
                      >
                        {item.label}
                        <ChevronDown
                          aria-hidden
                          className={cn("h-3.5 w-3.5 transition-transform", menu === item.menu && "rotate-180")}
                        />
                      </button>
                      {menu === item.menu && (
                        <div
                          id={`menu-${item.menu}`}
                          className="absolute inset-x-0 top-full border-b border-rule bg-card shadow-[0_30px_60px_-30px_hsl(var(--ink)/0.35)] animate-in fade-in-0 slide-in-from-top-1 duration-200"
                        >
                          <div className="shell py-8">
                            {item.menu === "products" ? <ProductsMenu /> : <ApplicationsMenu />}
                          </div>
                        </div>
                      )}
                    </li>
                  ) : (
                    <li key={item.to} className="h-full">
                      <NavLink
                        to={item.to}
                        className={({ isActive: a }) => cn(linkBase, a && "text-foreground", a && activeBar)}
                        onPointerEnter={(e) => e.pointerType === "mouse" && setMenu(null)}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => {
                  searchFocus.remember();
                  setSearchOpen(true);
                }}
                className="flex h-10 items-center gap-2 rounded-full px-3 text-sm text-ink-2 transition-colors hover:bg-paper-2 hover:text-foreground xl:border xl:border-rule xl:pl-3.5 xl:pr-2"
                aria-label="Search products, catalogue numbers and applications"
              >
                <Search aria-hidden className="h-[1.125rem] w-[1.125rem]" />
                <span className="hidden xl:inline">Search</span>
                <kbd className="label hidden rounded bg-paper-2 px-1.5 py-0.5 text-ink-3 xl:inline">Ctrl K</kbd>
              </button>

              <Button
                variant="signal"
                onClick={() => setQuoteOpen(true)}
                className="px-4 sm:px-5"
                aria-label={
                  count ? `Open your quote list, ${count} ${count === 1 ? "item" : "items"}` : "Request a quote"
                }
              >
                <ClipboardList aria-hidden className="sm:hidden" />
                <span className="hidden sm:inline">{count ? "Quote list" : "Request a quote"}</span>
                <span className="sm:hidden">Quote</span>
                {count > 0 && (
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-ink px-1.5 text-[0.6875rem] font-semibold leading-none text-paper">
                    {count}
                  </span>
                )}
              </Button>

              <button
                type="button"
                onClick={() => {
                  menuFocus.remember();
                  setMobileOpen(true);
                }}
                className="grid h-10 w-10 place-items-center rounded-full text-foreground hover:bg-paper-2 lg:hidden"
                aria-label="Open menu"
              >
                <Menu aria-hidden className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="right"
          className="flex w-full flex-col gap-0 overflow-y-auto border-l-0 p-0 sm:max-w-md"
          onCloseAutoFocus={menuFocus.restore}
        >
          <div className="flex h-16 shrink-0 items-center border-b border-rule px-5">
            <Logo className="h-8" />
          </div>
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">Site navigation and contact details</SheetDescription>
          <nav aria-label="Mobile" className="flex-1 px-5 py-4">
            <ul>
              {NAV.map((item) => (
                <li key={item.to} className="border-b border-rule">
                  <Link
                    to={item.to}
                    className="flex items-center justify-between py-4 text-2xl font-semibold tracking-tight"
                  >
                    {item.label}
                    <ArrowRight aria-hidden className="h-5 w-5 text-ink-3" />
                  </Link>
                  {item.menu === "products" && (
                    <ul className="-mt-1 flex flex-wrap gap-2 pb-4">
                      {FAMILIES.map((f) => (
                        <li key={f.id}>
                          <Link
                            to={`/products?family=${f.id}`}
                            className="flex items-center gap-2 rounded-full border border-rule bg-card px-3 py-1.5 text-sm"
                          >
                            <span className={cn("h-2 w-2 rounded-full", FAMILY_STYLE[f.color].dot)} aria-hidden />
                            {f.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li className="border-b border-rule">
                <Link
                  to="/contact"
                  className="flex items-center justify-between py-4 text-2xl font-semibold tracking-tight"
                >
                  Contact
                  <ArrowRight aria-hidden className="h-5 w-5 text-ink-3" />
                </Link>
              </li>
            </ul>
          </nav>
          <div className="space-y-3 border-t border-rule bg-paper-2 px-5 py-5">
            <Button
              variant="signal"
              size="lg"
              className="w-full"
              onClick={() => {
                setMobileOpen(false);
                setQuoteOpen(true);
              }}
            >
              {count ? `Quote list (${count})` : "Request a quote"}
            </Button>
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-2">
              <a href={`mailto:${SITE.email}`} className="underline underline-offset-4">
                {SITE.email}
              </a>
              <a href={SITE.phoneHref} className="underline underline-offset-4">
                {SITE.phone}
              </a>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {searchUsed && (
        <Suspense fallback={null}>
          <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} onCloseAutoFocus={searchFocus.restore} />
        </Suspense>
      )}
    </>
  );
}
