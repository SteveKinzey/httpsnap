import React from "react";
import { Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { connectClients } from "@/lib/connectClients";

export default function ClientTabs({ url }) {
  return (
    <Tabs defaultValue={connectClients[0].id} className="w-full">
      <TabsList className="grid h-auto w-full grid-cols-2 gap-1 p-1 sm:grid-cols-4">
        {connectClients.map((client) => (
          <TabsTrigger key={client.id} value={client.id} className="py-2">
            {client.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {connectClients.map((client) => (
        <TabsContent key={client.id} value={client.id} className="mt-6">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {client.summary}
            </p>

            <ol className="mt-8 space-y-7">
              {client.steps.map((step, index) => (
                <li key={step.title} className="flex gap-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gradient font-mono text-xs font-medium text-primary-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 pt-1">
                    <h3 className="font-heading text-base font-semibold">{step.title}</h3>
                    {step.body ? (
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {step.body}
                      </p>
                    ) : null}
                    {step.code ? (
                      <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-muted/40 p-3 font-mono text-xs leading-relaxed">
                        <code>{step.code.replace(/%URL%/g, url)}</code>
                      </pre>
                    ) : null}
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
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}