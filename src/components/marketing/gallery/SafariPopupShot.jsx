import React from "react";
import { Image } from "@/components/ui/image";
import { brand } from "@/lib/brand";

// Real capture of the toolbar popup, shown at its native size (997x378).
export default function SafariPopupShot() {
  return (
    <Image
      src={brand.popupShot}
      alt="HTTPSNAP's toolbar popup in Safari, with Upgrade selected, open over the HTTPSNAP site"
      fittingType="fit"
      originWidth={997}
      originHeight={378}
      className="mx-auto w-full max-w-[997px] rounded-lg border border-border"
    />
  );
}