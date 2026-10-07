import React from "react";
import { ArrowDown, Lock } from "lucide-react";

export default function AddressBarPanel() {
  return (
    <div className="w-full space-y-2">
      <div className="flex items-center gap-2 rounded-lg border border-dashed border-border bg-muted/40 px-3 py-2 font-mono text-xs text-muted-foreground">
        <span className="min-w-0 truncate">example.com/archive/2011</span>
        <span className="ml-auto shrink-0 text-[10px] font-medium uppercase tracking-wide">Typed</span>
      </div>

      <div className="flex justify-center">
        <ArrowDown className="h-3.5 w-3.5 text-muted-foreground" />
      </div>

      <div className="flex items-center gap-2 rounded-lg bg-brand-gradient px-3 py-2 font-mono text-xs text-primary-foreground shadow">
        <Lock className="h-3.5 w-3.5 shrink-0" />
        <span className="min-w-0 truncate">https://example.com/archive/2011</span>
        <span className="ml-auto shrink-0 rounded-full border border-primary-foreground/40 px-1.5 py-0.5 text-[10px] font-semibold">
          Upgraded
        </span>
      </div>
    </div>
  );
}