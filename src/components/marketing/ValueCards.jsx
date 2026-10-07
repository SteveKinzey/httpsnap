import React from "react";
import { Bookmark, Layers, Type } from "lucide-react";
import SectionHeading from "@/components/marketing/SectionHeading";

const gaps = [
  {
    icon: Bookmark,
    title: "Links that never got upgraded",
    body: "Bookmarks, old articles and forum posts still point at http:// addresses. Safari upgrades many of them on its own, but not all, and not consistently.",
  },
  {
    icon: Type,
    title: "Addresses you type yourself",
    body: "A typed address can still be fetched over http:// on hosts that continue to offer the insecure version alongside the secure one.",
  },
  {
    icon: Layers,
    title: "Mixed embedded content",
    body: "A page can be loaded over HTTPS and still pull a script, image or font over http://, which is exactly where the tampering happens.",
  },
];

export default function ValueCards() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <SectionHeading
          eyebrow="Why it still matters"
          title="Safari secures a lot on its own. This covers the rest."
          description="Modern Safari tries HTTPS first on many navigations, but the insecure path still exists for exactly the requests people forget about."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {gaps.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-6">
              <Icon className="h-5 w-5 text-secure" />
              <h3 className="mt-4 font-heading text-base font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}