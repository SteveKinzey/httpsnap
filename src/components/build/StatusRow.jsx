import React from "react";
import { CheckCircle2, CircleDashed, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const tones = {
  ready: {
    label: "Ready in the project",
    Icon: CheckCircle2,
    iconClass: "text-secure",
    badgeClass: "border-secure/40 bg-secure/10 text-secure",
  },
  outside: {
    label: "Outside the app",
    Icon: ExternalLink,
    iconClass: "text-muted-foreground",
    badgeClass: "border-border bg-muted text-muted-foreground",
  },
  notYet: {
    label: "Not yet live",
    Icon: CircleDashed,
    iconClass: "text-muted-foreground",
    badgeClass: "border-border bg-card text-muted-foreground",
  },
};

export default function StatusRow({ stage }) {
  const { label, Icon, iconClass, badgeClass } = tones[stage.tone];

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Icon className={cn("h-5 w-5 shrink-0", iconClass)} />
          <h3 className="font-heading text-base font-semibold">{stage.title}</h3>
        </div>
        <span
          className={cn(
            "rounded-full border px-2.5 py-1 text-xs font-medium",
            badgeClass
          )}
        >
          {label}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stage.detail}</p>
    </div>
  );
}