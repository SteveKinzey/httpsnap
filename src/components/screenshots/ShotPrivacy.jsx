import React from "react";
import { Check } from "lucide-react";
import ShotStage from "@/components/screenshots/ShotStage";
import ShotImage from "@/components/screenshots/ShotImage";
import { brand } from "@/lib/brand";

const points = [
  "Nothing to sign up for: switch it on in Safari and it works.",
  "No analytics of its own, and nothing about your browsing leaves the Mac.",
  "A local rule set that never reads the content of a page.",
];

export default function ShotPrivacy() {
  return (
    <ShotStage className="bg-brand-gradient text-primary-foreground">
      <div className="flex h-full w-full flex-col justify-center px-24">
        <div className="flex items-center gap-5">
          <ShotImage
            src={brand.icon}
            alt="HTTPSNAP app icon"
            className="h-[92px] w-[92px] rounded-[22px] shadow-lg"
          />
          <span className="font-heading text-[40px] font-semibold">HTTPSNAP</span>
        </div>

        <h2 className="mt-14 font-heading text-[86px] font-semibold leading-[1.05] tracking-[-0.02em]">
          No account.
          <br />
          No tracking.
        </h2>

        <div className="mt-14 space-y-6">
          {points.map((point) => (
            <div key={point} className="flex items-start gap-5">
              <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-foreground/20">
                <Check className="h-6 w-6" />
              </span>
              <p className="text-[28px] leading-snug text-primary-foreground/90">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </ShotStage>
  );
}