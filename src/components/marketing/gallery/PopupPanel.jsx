import React from "react";

function Mode({ label, note, active }) {
  return (
    <div
      className={`flex items-start gap-2.5 rounded-lg px-2.5 py-2 ${
        active ? "bg-brand-gradient text-primary-foreground" : "text-muted-foreground"
      }`}
    >
      <span
        className={`mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border ${
          active ? "border-primary-foreground" : "border-muted-foreground/40"
        }`}
      >
        {active && <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />}
      </span>
      <span>
        <span className="block text-xs font-semibold">{label}</span>
        <span className={`block text-[10px] leading-relaxed ${active ? "text-primary-foreground/85" : ""}`}>
          {note}
        </span>
      </span>
    </div>
  );
}

export default function PopupPanel() {
  return (
    <div className="mx-auto w-full max-w-[260px] overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="border-b border-border px-3 py-2">
        <p className="font-heading text-xs font-semibold">HTTPSNAP</p>
        <p className="text-[10px] text-muted-foreground">How should http:// requests be handled?</p>
      </div>
      <div className="space-y-1 p-1.5">
        <Mode label="Upgrade" note="Load the HTTPS version of each request." active />
        <Mode label="Force" note="Rewrite every http:// URL to https://." />
      </div>
    </div>
  );
}