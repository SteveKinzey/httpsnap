import React from "react";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { company } from "@/lib/company";

const rows = [
  { icon: MapPin, label: company.address, href: null },
  { icon: Phone, label: company.phone, href: company.phoneHref },
  { icon: Mail, label: company.email, href: company.emailHref },
  { icon: Globe, label: company.websiteLabel, href: company.website },
];

export default function OwnerDetails({ className }) {
  return (
    <div className={className}>
      <p className="font-heading text-sm font-semibold text-foreground">{company.name}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{company.role}</p>
      <ul className="mt-3 space-y-2">
        {rows.map(({ icon: Icon, label, href }) => (
          <li key={label} className="flex items-start gap-2.5 text-sm text-muted-foreground">
            <Icon className="mt-0.5 h-4 w-4 shrink-0" />
            {href ? (
              <a
                href={href}
                className="transition-colors hover:text-foreground"
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
              >
                {label}
              </a>
            ) : (
              <span>{label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}