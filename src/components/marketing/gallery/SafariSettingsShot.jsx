import React from "react";
import { Image } from "@/components/ui/image";
import { brand } from "@/lib/brand";

// Real capture of Safari's Extensions pane, shown at its native size (829x584).
export default function SafariSettingsShot() {
  return (
    <Image
      src={brand.settingsShot}
      alt="Safari's Extensions settings with HTTPSNAP switched on and allowed on every website"
      fittingType="fit"
      originWidth={829}
      originHeight={584}
      className="mx-auto w-full max-w-[829px] rounded-lg border border-border"
    />
  );
}