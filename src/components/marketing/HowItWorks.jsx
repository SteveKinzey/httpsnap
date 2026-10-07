import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/marketing/SectionHeading";

const steps = [
  {
    title: "Add the extension to Safari",
    body: "Save the seven files to one folder, turn on Safari's developer features, and add the folder as a temporary extension. No signing, no Apple Developer account, no cost.",
  },
  {
    title: "Switch it on and allow site access",
    body: "In Safari → Settings → Extensions, tick HTTPSNAP and set site access to Allow on every website, or leave it on Ask and approve sites yourself.",
  },
  {
    title: "Browse as usual",
    body: "Open an http:// address and confirm you land on https://. Click the toolbar button to move between Upgrade and Force whenever a site needs the other mode.",
  },
];

export default function HowItWorks() {
  return (
    <section className="border-b border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps, about five minutes"
          description="The extension is declarative, so there is nothing to build and nothing to configure beyond switching it on."
        />

        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-xl border border-border bg-background p-6">
              <span className="font-mono text-xs text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-heading text-base font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>

        <Link
          to="/setup"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline underline-offset-4"
        >
          Open the setup guide
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}