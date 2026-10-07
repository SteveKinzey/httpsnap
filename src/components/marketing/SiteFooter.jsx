import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import OwnerDetails from "@/components/marketing/OwnerDetails";
import { brand } from "@/lib/brand";
import { company } from "@/lib/company";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", to: "/features" },
      { label: "Install guide", to: "/install" },
      { label: "Connect an AI assistant", to: "/connect" },
      { label: "Developer setup", to: "/setup" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Support", to: "/support" },
      { label: "Privacy", to: "/privacy" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.6fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Image src={brand.logo} alt={brand.name} className="h-8 w-8 rounded-lg" />
              <span className="font-heading text-base font-semibold tracking-tight">{brand.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A free Safari web extension that loads every site over HTTPS whenever HTTPS is
              available.
            </p>
            <a
              href={brand.url}
              className="mt-4 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {brand.site}
            </a>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {column.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <OwnerDetails />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p>Safari and macOS are trademarks of Apple Inc. Not affiliated with or endorsed by Apple Inc.</p>
        </div>
      </div>
    </footer>
  );
}