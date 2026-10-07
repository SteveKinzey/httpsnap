import React from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// One row on the export page: a scaled-down preview of the shot and its button.
const PREVIEW_SCALE = 0.4;

export default function ShotCard({ index, shot, busy, onDownload }) {
  const Shot = shot.Shot;

  return (
    <div className="flex flex-wrap items-start gap-6 rounded-xl border border-border bg-card p-4">
      <div className="h-[360px] w-[576px] max-w-full shrink-0 overflow-hidden rounded-lg border border-border">
        <div style={{ transform: `scale(${PREVIEW_SCALE})`, transformOrigin: "top left" }}>
          <Shot />
        </div>
      </div>

      <div className="min-w-[220px] flex-1">
        <p className="font-heading text-sm font-semibold">
          {index + 1}. {shot.title}
        </p>
        <p className="mt-1.5 font-mono text-xs text-muted-foreground">
          {shot.filename} · 1440 × 900 PNG
        </p>
        <Button className="mt-4" onClick={() => onDownload(index)} disabled={busy}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          Download PNG
        </Button>
      </div>
    </div>
  );
}