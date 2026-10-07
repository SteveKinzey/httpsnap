import React from "react";
import { Image } from "@/components/ui/image";
import { brand } from "@/lib/brand";

// Real capture of the toolbar popup, shown at its native size (1408x428).
export default function SafariPopupShot() {
  return (
    <Image
      src={brand.popupShot}
      alt="HTTPSNAP's toolbar popup in Safari, with Force selected, open over the page being browsed"
      fittingType="fit"
      originWidth={1408}
      originHeight={428}
      className="mx-auto w-full max-w-[1408px] rounded-lg border border-border"
    />
  );
}