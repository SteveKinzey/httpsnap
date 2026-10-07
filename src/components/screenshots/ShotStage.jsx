import React from "react";
import { cn } from "@/lib/utils";

// One App Store screenshot canvas, at the size App Store Connect asks for on
// the Mac (1440x900 is the smallest of the four accepted sizes, so it is the
// one exported).
export const SHOT_WIDTH = 1440;
export const SHOT_HEIGHT = 900;

export default function ShotStage({ className, children }) {
  return (
    <div
      className={cn(
        "relative h-[900px] w-[1440px] shrink-0 overflow-hidden text-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}