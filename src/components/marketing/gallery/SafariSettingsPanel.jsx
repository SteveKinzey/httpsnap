import React from "react";
import { Image } from "@/components/ui/image";
import { brand } from "@/lib/brand";

export default function SafariSettingsPanel() {
  return (
    <div className="w-full rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="text-xs font-medium">Extensions</span>
        <span className="font-mono text-[10px] text-muted-foreground">Safari Settings</span>
      </div>

      <div className="flex items-center gap-2.5 px-3 py-3">
        <Image src={brand.icon} alt="" className="h-7 w-7 rounded-md" />
        <span className="text-xs font-medium">HTTPSNAP</span>
        <span className="ml-auto flex h-5 w-9 shrink-0 justify-end rounded-full bg-brand-gradient p-[2px]">
          <span className="h-4 w-4 rounded-full bg-primary-foreground" />
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border px-3 py-2.5">
        <span className="text-xs text-muted-foreground">Website access</span>
        <span className="rounded-full border border-secure/30 bg-secure/5 px-2 py-0.5 text-[10px] font-medium text-secure">
          Allow on every website
        </span>
      </div>
    </div>
  );
}