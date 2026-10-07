import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Download, ShieldCheck, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/marketing/SectionHeading";
import { brand } from "@/lib/brand";
import { base44 } from "@/api/base44Client";
import { trackGaEvent } from "@/lib/googleAnalytics";

const steps = [
  {
    title: "Download it and open it once",
    body: "Drag the HTTPSNAP app into Applications and open it. Safari registers the extension as soon as the app runs — nothing to build, no developer tools.",
  },
  {
    title: "Tick it in Safari",
    body: "In Safari → Settings → Extensions, tick HTTPSNAP and leave site access on Allow on every website.",
  },
  {
    title: "Nothing to configure",
    body: "No account and no settings file: the rules travel inside the app and start working the moment the extension is switched on.",
  },
];

// The direct-download route presented to visitors. Live as soon as brand.downloadUrl
// holds the hosted .dmg or .zip of the signed, notarized Mac app.
export default function DownloadSection() {
  const live = Boolean(brand.downloadUrl);

  // Counts every click on the section's button. Until the signed build lands the
  // button sends people to the setup guide, and the "state" property keeps those
  // early clicks apart from real downloads in the Analytics dashboard.
  const trackDownloadClick = () => {
    const state = live ? "live" : "pending";
    base44.analytics.track({ eventName: "download_click", properties: { state } });
    trackGaEvent("download_click", { state });
  };

  return (
    <section id="download" className="border-b border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="rounded-2xl bg-brand-gradient p-[2px] shadow-lg">
          <div className="grid gap-10 rounded-[14px] bg-background p-6 sm:p-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <SectionHeading
                eyebrow="Download"
                title="Download it — no Xcode involved"
                description="HTTPSNAP ships inside a signed Mac app. Download it, open it once and switch it on in Safari: none of this needs a developer account or developer tools on your side."
              />

              <div className="mt-8">
                {live ? (
                  <>
                    <Button asChild size="lg" className="gap-2">
                      <a href={brand.downloadUrl} download onClick={trackDownloadClick}>
                        <Download className="h-4 w-4" />
                        Download for Mac
                      </a>
                    </Button>
                    <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-secure" />
                      Signed and notarized by Apple, so macOS opens it without a security warning.
                      Needs macOS with Safari 16.4 or later.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                      <Timer className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      The signed, notarized Mac build is still in progress. Until it lands here, the
                      setup guide covers the route that works today.
                    </p>
                    <Button asChild size="lg" className="mt-4 gap-2">
                      <Link to="/setup" onClick={trackDownloadClick}>
                        Open the setup guide
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>

            <ol className="space-y-6 lg:border-l lg:border-border lg:pl-10">
              {steps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="mt-0.5 font-mono text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-semibold">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}