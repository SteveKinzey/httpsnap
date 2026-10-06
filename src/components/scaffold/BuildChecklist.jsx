import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildSteps } from "@/lib/safariExtensionScaffold";

export default function BuildChecklist() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Build and ship checklist</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {buildSteps.map((step, index) => (
          <div key={step.title} className="flex gap-4">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-xs font-medium">
              {index + 1}
            </span>
            <div className="space-y-1">
              <p className="font-medium leading-none">{step.title}</p>
              <p className="text-sm text-muted-foreground">{step.detail}</p>
              {step.code ? (
                <code className="inline-block rounded bg-muted px-2 py-1 font-mono text-xs">
                  {step.code}
                </code>
              ) : null}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}