import React from "react";
import { Code, EyeOff, ShieldCheck, SlidersHorizontal } from "lucide-react";
import SectionHeading from "@/components/marketing/SectionHeading";

const points = [
  {
    icon: Code,
    title: "Matched in Safari's networking layer",
    body: "The extension declares a rule set and Safari applies it. The extension is never handed your page, and no request data leaves your Mac.",
  },
  {
    icon: EyeOff,
    title: "No content script, no background script",
    body: "There is nothing running inside the pages you visit and nothing running alongside them. That is the whole permissions story.",
  },
  {
    icon: ShieldCheck,
    title: "A privacy manifest with nothing in it",
    body: "No tracking domains, no collected data types, no required-reason APIs. Nothing to opt out of, because nothing is collected.",
  },
  {
    icon: SlidersHorizontal,
    title: "Two rule sets, one switch",
    body: "The everyday rule set ships enabled and the aggressive one ships off. The toolbar popup swaps which one is active at runtime.",
  },
];

const snippet = `{
  "id": 1,
  "priority": 1,
  "action": { "type": "upgradeScheme" },
  "condition": {
    "urlFilter": "|http://",
    "resourceTypes": ["main_frame", "sub_frame",
      "script", "stylesheet", "image", "font",
      "media", "xmlhttprequest", "websocket"]
  }
}`;

export default function TechnicalBand() {
  return (
    <section className="border-b border-border bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Under the hood"
            title="Declarative rules, not page access"
            description="Every request type is covered, and the extension never sees any of them."
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {points.map(({ icon: Icon, title, body }) => (
              <div key={title}>
                <Icon className="h-4 w-4 text-secure" />
                <h3 className="mt-3 font-heading text-sm font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <code className="font-mono text-xs text-muted-foreground">rules.json</code>
            <span className="rounded-full border border-secure/30 bg-secure/5 px-2.5 py-0.5 text-xs text-secure">
              Enabled
            </span>
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-foreground">
            <code>{snippet}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}