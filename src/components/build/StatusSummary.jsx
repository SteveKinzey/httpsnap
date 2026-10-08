import React from "react";

const items = [
  { key: "ready", label: "Ready in the project" },
  { key: "outside", label: "Confirmed in Xcode or at Apple" },
  { key: "notYet", label: "Still to do" },
];

export default function StatusSummary({ counts }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map(({ key, label }) => (
        <div key={key} className="rounded-xl border border-border bg-muted/30 p-5">
          <p className="font-heading text-2xl font-semibold tracking-tight">{counts[key]}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{label}</p>
        </div>
      ))}
    </div>
  );
}