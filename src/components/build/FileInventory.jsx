import React from "react";
import { FileCode2 } from "lucide-react";
import { iconAssets, scaffoldFiles } from "@/lib/safariExtensionScaffold";

export default function FileInventory() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <ul className="divide-y divide-border">
        {scaffoldFiles.map((file) => (
          <li
            key={file.id}
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-5 py-3.5"
          >
            <span className="flex items-center gap-2.5">
              <FileCode2 className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="text-sm font-medium">{file.name}</span>
            </span>
            <span className="font-mono text-xs text-muted-foreground">{file.path}</span>
          </li>
        ))}
      </ul>
      <p className="border-t border-border px-5 py-3.5 text-xs leading-relaxed text-muted-foreground">
        {iconAssets.length} icon sizes are exported alongside these files, from 48 to 3072 pixels.
      </p>
    </div>
  );
}