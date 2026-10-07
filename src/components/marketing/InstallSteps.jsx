import React from "react";
import { Info } from "lucide-react";
import { installSteps } from "@/lib/installGuide";

export default function InstallSteps() {
  return (
    <ol className="space-y-9">
      {installSteps.map((step, index) => (
        <li key={step.title} className="flex gap-5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gradient font-mono text-xs font-medium text-primary-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0 pt-1">
            <h3 className="font-heading text-base font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            {step.note ? (
              <p className="mt-3 flex items-start gap-2 rounded-lg border border-border bg-muted/40 p-3 text-sm leading-relaxed text-muted-foreground">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {step.note}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}