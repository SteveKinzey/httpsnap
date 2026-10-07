import React from "react";
import ShotStage from "@/components/screenshots/ShotStage";
import ShotImage from "@/components/screenshots/ShotImage";
import { brand } from "@/lib/brand";

export default function ShotHero() {
  return (
    <ShotStage className="bg-brand-gradient text-primary-foreground">
      <div className="flex h-full w-full items-center gap-16 px-24">
        <div className="w-[672px] shrink-0">
          <div className="flex items-center gap-5">
            <ShotImage
              src={brand.icon}
              alt="HTTPSNAP app icon"
              className="h-[104px] w-[104px] rounded-[24px] shadow-lg"
            />
            <span className="font-heading text-[44px] font-semibold">HTTPSNAP</span>
          </div>

          <h1 className="mt-14 font-heading text-[88px] font-semibold leading-[1.04] tracking-[-0.02em]">
            Every site,
            <br />
            over HTTPS.
          </h1>

          <p className="mt-10 text-[29px] leading-[1.45] text-primary-foreground/85">
            A Safari extension that rewrites the requests Safari still allows over plain HTTP, so
            bookmarks, typed addresses and mixed page assets load encrypted.
          </p>

          <p className="mt-14 text-[24px] font-medium text-primary-foreground/75">
            macOS with Safari 16.4 or later
          </p>
        </div>

        <div className="min-w-0 flex-1">
          <ShotImage
            src={brand.popupShot}
            alt="HTTPSNAP's toolbar popup in Safari, with Upgrade selected"
            className="w-full rounded-[18px] shadow-2xl"
          />
        </div>
      </div>
    </ShotStage>
  );
}