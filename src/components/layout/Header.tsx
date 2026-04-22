import { NavLink, Link } from "react-router-dom";
import { ShoppingCart, Menu, ChevronDown } from "lucide-react";
import { useRFQ } from "@/context/RFQContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
];

const resourceItems = [
  { to: "/applications", label: "Applications" },
  { to: "/technology", label: "Technology" },
  { to: "/resources", label: "Downloads" },
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
              <path d="M12 2L6 6V12C6 15.5 8.7 18.7 12 19.5C15.3 18.7 18 15.5 18 12V6L12 2Z" stroke="hsl(var(--teal-bright))" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="2.5" fill="hsl(var(--teal-bright))" />
              <circle cx="12" cy="12" r="1" fill="white" />
            </svg>
          </div>
          <div className="leading-none">
            <div className="font-serif text-lg text-navy">ProtPure</div>
            <div className="text-[9px] tracking-[0.1em] text-slate font-semibold uppercase mt-0.5">
              Tech Pvt. Ltd.
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-[13px] transition-colors ${
                  isActive
                    ? "text-teal font-medium bg-teal-pale"
                    : "text-slate hover:text-navy hover:bg-secondary"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger className="px-3 py-2 rounded-md text-[13px] text-slate hover:text-navy hover:bg-secondary inline-flex items-center gap-1 outline-none focus-visible:ring-2 focus-visible:ring-teal">
              Resources <ChevronDown className="w-3 h-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[180px]">
              {resourceItems.map((r) => (
                <DropdownMenuItem key={r.to} asChild>
                  <Link to={r.to} className="cursor-pointer">{r.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-[13px] transition-colors ${
                isActive
                  ? "text-teal font-medium bg-teal-pale"
                  : "text-slate hover:text-navy hover:bg-secondary"
              }`
            }
          >
            Contact
          </NavLink>
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
              <Button variant="ghost" size="icon" className="lg:hidden">
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
                <div className="px-4 pt-3 pb-1 text-[11px] font-semibold tracking-[0.1em] uppercase text-slate-light">
                  Resources
                </div>
                {resourceItems.map((r) => (
                  <NavLink
                    key={r.to}
                    to={r.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `px-6 py-2.5 rounded-md text-sm ${
                        isActive ? "text-teal font-medium bg-teal-pale" : "text-slate"
                      }`
                    }
                  >
                    {r.label}
                  </NavLink>
                ))}
                <NavLink
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-md text-sm mt-1 ${
                      isActive ? "text-teal font-medium bg-teal-pale" : "text-slate"
                    }`
                  }
                >
                  Contact
                </NavLink>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
