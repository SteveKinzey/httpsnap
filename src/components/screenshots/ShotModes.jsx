import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import ShotStage from "@/components/screenshots/ShotStage";

function ModeCard({ title, body, selected }) {
  return (
    <div
      className={cn(
        "rounded-3xl border-2 bg-card p-12",
        selected ? "border-brand shadow-xl" : "border-border",
      )}
    >
      <div className="flex items-center gap-5">
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2",
            selected ? "border-brand bg-brand text-primary-foreground" : "border-border",
          )}
        >
          {selected && <Check className="h-6 w-6" />}
        </span>
        <p className="font-heading text-[42px] font-semibold">{title}</p>
      </div>
      <p className="mt-7 text-[26px] leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

export default function ShotModes() {
  return (
    <ShotStage className="bg-gradient-to-b from-muted/70 to-background">
      <div className="flex h-full w-full flex-col justify-center px-24">
        <h2 className="font-heading text-[68px] font-semibold tracking-[-0.02em]">
          Two modes, one switch
        </h2>
        <p className="mt-6 max-w-[1100px] text-[27px] leading-relaxed text-muted-foreground">
          Change how http:// requests are handled from the toolbar, without touching anything else.
        </p>

        <div className="mt-14 grid grid-cols-2 gap-10">
          <ModeCard
            selected
            title="Upgrade"
            body="Asks Safari to load the HTTPS version of each request. The default, and the one to leave on."
          />
          <ModeCard
            title="Force"
            body="Rewrites every http:// address outright, including hosts that never offered HTTPS."
          />
        </div>
      </div>
    </ShotStage>
  );
}