import React from "react";
import { Lock } from "lucide-react";

export default function PhonePanel() {
  return (
    <div className="mx-auto w-[138px] rounded-[24px] border border-border bg-card p-2 shadow-lg">
      <div className="mx-auto mb-2 h-1 w-9 rounded-full bg-muted" />
      <div className="space-y-2 rounded-[16px] bg-muted/40 p-2">
        <div className="flex items-center gap-1.5 rounded-md bg-brand-gradient px-2 py-1.5 font-mono text-[9px] text-primary-foreground">
          <Lock className="h-2.5 w-2.5 shrink-0" />
          <span className="truncate">example.com</span>
        </div>
        <div className="space-y-1.5 rounded-md bg-background p-2">
          <div className="h-2 w-full rounded-full bg-muted-foreground/20" />
          <div className="h-2 w-4/5 rounded-full bg-muted-foreground/20" />
          <div className="h-2 w-3/5 rounded-full bg-muted-foreground/20" />
        </div>
        <div className="flex items-center justify-center gap-1 rounded-md border border-secure/30 bg-secure/5 py-1 text-[9px] font-medium text-secure">
          <Lock className="h-2.5 w-2.5" />
          Secure
        </div>
      </div>
    </div>
  );
}