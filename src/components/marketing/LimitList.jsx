import React from "react";
import { limitations } from "@/lib/safariExtensionScaffold";

export default function LimitList() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {limitations.map((item) => (
        <div key={item.title} className="rounded-xl border border-border bg-muted/30 p-6">
          <h3 className="font-heading text-base font-semibold">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
        </div>
      ))}
    </div>
  );
}