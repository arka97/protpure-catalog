import { NavLink, Link } from "react-router-dom";
import { ShoppingCart, Menu } from "lucide-react";
import { useRFQ } from "@/context/RFQContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/products", label: "Products" },
];

export function Header() {
  const { count, setOpen } = useRFQ();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-border">
      <div className="max-w-[1280px] mx-auto h-16 px-6 md:px-10 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-navy rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
              <circle cx="12" cy="12" r="8" stroke="hsl(var(--teal-bright))" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="3" fill="hsl(var(--teal-bright))" />
            </svg>
          </div>
          <div className="leading-none">
            <div className="font-serif text-lg text-navy">ProtPure</div>
            <div className="text-[9px] tracking-[0.1em] text-slate-light font-medium uppercase mt-0.5">
              Tech Pvt. Ltd.
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-md text-sm transition-colors ${
                  isActive
                    ? "text-teal font-medium bg-teal-pale"
                    : "text-slate hover:text-navy hover:bg-secondary"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => setOpen(true)}
            className="bg-teal hover:bg-teal-light text-white gap-2 relative"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">RFQ Cart</span>
            {count > 0 && (
              <span className="bg-white text-teal text-xs font-semibold rounded-full px-2 py-0.5 min-w-[22px] inline-flex items-center justify-center">
                {count}
              </span>
            )}
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <nav className="flex flex-col gap-2 mt-8">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-md text-sm ${
                        isActive ? "text-teal font-medium bg-teal-pale" : "text-slate"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}