import React from "react";
import { Check, Lock, Zap } from "lucide-react";
import SectionHeading from "@/components/marketing/SectionHeading";

const modes = [
  {
    icon: Lock,
    name: "Upgrade",
    tag: "On by default",
    body: "Asks Safari to load the HTTPS version of each request. This is the purpose-built upgrade action, and the sensible everyday choice.",
    points: [
      "Applies to every request type, not just page loads",
      "Hosts that serve only HTTP fail rather than fall back",
      "Nothing to configure",
    ],
  },
  {
    icon: Zap,
    name: "Force",
    tag: "You opt in",
    body: "Rewrites every http:// URL to https:// outright. Aggressive by design, for the sites you know are safe and want pinned to the secure version.",
    points: [
      "Rewrites the address before the request leaves",
      "Hosts without HTTPS stop loading entirely",
      "Switched on from the toolbar popup",
    ],
  },
];

export default function ModeCards() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <SectionHeading
          eyebrow="Two modes"
          title="Upgrade by default. Force when you want it."
          description="Both modes are declarative rule sets. The toolbar popup decides which one Safari has active."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {modes.map(({ icon: Icon, name, tag, body, points }) => (
            <div key={name} className="rounded-xl border border-border bg-card p-6 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-secure" />
                  <h3 className="font-heading text-lg font-semibold">{name}</h3>
                </div>
                <span className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
                  {tag}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{body}</p>
              <ul className="mt-5 space-y-2.5">
                {points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-secure" />
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          A rule cannot say "try HTTPS, and if that fails load the insecure page". That fallback
          logic lives inside Safari, not inside extensions, which is why a site that only speaks
          HTTP behaves differently from one that does not.
        </p>
      </div>
    </section>
  );
}