import React from "react";
import { ArrowDown, Lock, Unlock } from "lucide-react";

export default function BrowserMock() {
  return (
    <div className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-3 shadow-2xl">
      <div className="flex items-center gap-1.5 px-1 pb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-primary-foreground/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary-foreground/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary-foreground/25" />
      </div>

      <div className="space-y-2 rounded-lg bg-background p-3">
        <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-2.5 py-2 font-mono text-xs text-destructive">
          <Unlock className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">http://example.com/archive/2011</span>
        </div>

        <div className="flex justify-center">
          <ArrowDown className="h-3.5 w-3.5 text-muted-foreground" />
        </div>

        <div className="flex items-center gap-2 rounded-md border border-secure/30 bg-secure/5 px-2.5 py-2 font-mono text-xs text-secure">
          <Lock className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">https://example.com/archive/2011</span>
        </div>
      </div>

      <p className="px-1 pt-3 text-xs leading-relaxed text-primary-foreground/60">
        Applied by Safari's own networking layer. The page is never handed to the extension.
      </p>
    </div>
  );
}