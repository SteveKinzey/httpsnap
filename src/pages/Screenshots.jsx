import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import html2canvas from "html2canvas";
import { cn } from "@/lib/utils";
import ShotCard from "@/components/screenshots/ShotCard";
import { SHOT_HEIGHT, SHOT_WIDTH } from "@/components/screenshots/ShotStage";
import { appStoreShots } from "@/lib/appStoreShots";

// Private working page: builds the Mac screenshot set and saves each one at
// exactly 1440x900. Needs a sign-in, and nothing on the public site links here.
export default function Screenshots() {
  const stageRefs = useRef([]);
  const [busyIndex, setBusyIndex] = useState(-1);
  const [status, setStatus] = useState(null);

  const save = async (index) => {
    setBusyIndex(index);
    setStatus(null);
    try {
      const canvas = await html2canvas(stageRefs.current[index], {
        width: SHOT_WIDTH,
        height: SHOT_HEIGHT,
        scale: 1,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) throw new Error("no PNG produced");

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = appStoreShots[index].filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 20000);

      setStatus({
        ok: true,
        text: `Saved ${appStoreShots[index].filename} · ${canvas.width} × ${canvas.height} · ${(
          blob.size / 1048576
        ).toFixed(2)} MB`,
      });
    } catch (error) {
      setStatus({ ok: false, text: `Could not build that PNG here: ${error.message}` });
    } finally {
      setBusyIndex(-1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-12">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              Mac screenshots
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground">
              <Lock className="h-3 w-3" />
              Private
            </span>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Five shots at 1440 × 900, one of the sizes App Store Connect accepts for the Mac. Save
            each one, then drag the five PNGs onto the Mac Screenshots row on the version page, in
            this order.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-6">
            <Link
              to="/submission"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand underline-offset-4 hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Submission copy
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-6 px-5 py-12 sm:px-8">
        {status && (
          <p className={cn("text-sm font-medium", status.ok ? "text-brand" : "text-destructive")}>
            {status.text}
          </p>
        )}

        {appStoreShots.map((shot, index) => (
          <ShotCard
            key={shot.id}
            index={index}
            shot={shot}
            busy={busyIndex === index}
            onDownload={save}
          />
        ))}
      </main>

      {/* Held off-screen at full size so each PNG saves at exactly 1440 × 900. */}
      <div aria-hidden="true" className="pointer-events-none fixed left-[-20000px] top-0">
        {appStoreShots.map((shot, index) => {
          const Shot = shot.Shot;
          return (
            <div
              key={shot.id}
              ref={(element) => {
                stageRefs.current[index] = element;
              }}
            >
              <Shot />
            </div>
          );
        })}
      </div>
    </div>
  );
}