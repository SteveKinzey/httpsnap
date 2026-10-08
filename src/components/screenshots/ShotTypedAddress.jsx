import React from "react";
import { ArrowDown, Lock } from "lucide-react";
import ShotStage from "@/components/screenshots/ShotStage";

export default function ShotTypedAddress() {
  return (
    <ShotStage className="bg-linear-to-b from-muted/70 to-background">
      <div className="flex h-full w-full flex-col justify-center px-24">
        <h2 className="font-heading text-[68px] font-semibold tracking-[-0.02em]">
          Type an address, land on HTTPS
        </h2>
        <p className="mt-6 max-w-[1120px] text-[27px] leading-relaxed text-muted-foreground">
          The rule matches the request rather than the page, so an address typed with no scheme at
          all still leaves over https://.
        </p>

        <div className="mt-16">
          <div className="flex items-center gap-5 rounded-2xl border border-dashed border-border bg-muted/40 px-8 py-7 font-mono text-[30px] text-muted-foreground">
            <span className="truncate">example.com/blog</span>
            <span className="ml-auto shrink-0 text-[20px] font-medium uppercase tracking-[0.16em]">
              Typed
            </span>
          </div>

          <div className="flex justify-center py-5">
            <ArrowDown className="h-10 w-10 text-muted-foreground" />
          </div>

          <div className="flex items-center gap-6 rounded-2xl bg-brand-gradient px-8 py-7 font-mono text-[30px] text-primary-foreground shadow-xl">
            <Lock className="h-9 w-9 shrink-0" />
            <span className="truncate">https://example.com/blog</span>
            <span className="ml-auto shrink-0 rounded-full border border-primary-foreground/40 px-5 py-1.5 text-[20px] font-semibold">
              Upgraded
            </span>
          </div>
        </div>
      </div>
    </ShotStage>
  );
}