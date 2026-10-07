import React from "react";
import ShotStage from "@/components/screenshots/ShotStage";
import ShotImage from "@/components/screenshots/ShotImage";
import { brand } from "@/lib/brand";

export default function ShotSettings() {
  return (
    <ShotStage className="bg-gradient-to-b from-muted/70 to-background">
      <div className="flex h-full w-full items-center gap-20 px-24">
        <div className="w-[520px] shrink-0">
          <p className="text-[22px] font-medium uppercase tracking-[0.18em] text-brand">
            Set up in Safari
          </p>
          <h2 className="mt-6 font-heading text-[66px] font-semibold leading-[1.06] tracking-[-0.02em]">
            Switched on in one place
          </h2>
          <p className="mt-7 text-[27px] leading-relaxed text-muted-foreground">
            Tick HTTPSNAP in Safari Settings, under Extensions, and set site access to Allow on
            every website. That is the whole setup.
          </p>
        </div>

        <ShotImage
          src={brand.settingsShot}
          alt="Safari's Extensions settings with HTTPSNAP switched on and allowed on every website"
          className="w-[760px] rounded-[16px] border border-border shadow-2xl"
        />
      </div>
    </ShotStage>
  );
}