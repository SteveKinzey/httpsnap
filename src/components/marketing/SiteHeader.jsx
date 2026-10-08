import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Image } from "@/components/ui/image";
import { brand } from "@/lib/brand";

export const navItems = [
  { label: "Features", to: "/features" },
  { label: "Install", to: "/install" },
  { label: "Developer setup", to: "/setup" },
  { label: "Support", to: "/support" },
  { label: "Privacy", to: "/privacy" },
];

const linkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm transition-colors ${
    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
  }`;

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <Image src={brand.logo} alt={brand.name} className="h-8 w-8 rounded-lg" />
          <span className="font-heading text-base font-semibold tracking-tight">{brand.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/install">Install free</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="h-9 w-9 p-0 md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader className="text-left">
                <SheetTitle>{brand.name}</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `rounded-md px-3 py-2.5 text-sm ${isActive ? "bg-muted text-foreground" : "text-muted-foreground"}`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
              <Button asChild className="mt-6 w-full">
                <Link to="/install" onClick={() => setOpen(false)}>
                  Install free
                </Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}