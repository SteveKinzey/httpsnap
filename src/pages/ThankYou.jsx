import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Download, LifeBuoy, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brand } from "@/lib/brand";
import { base44 } from "@/api/base44Client";
import { trackGaEvent } from "@/lib/googleAnalytics";

const nextSteps = [
  {
    title: "Open HTTPSNAP from Applications",
    body: "macOS asks you to confirm the first time. Opening the app once is what registers the extension with Safari.",
  },
  {
    title: "Tick it in Safari → Settings → Extensions",
    body: "Leave site access on Allow on every website. Without site access the rules have nothing to match and nothing changes.",
  },
  {
    title: "That is the whole install",
    body: "No account, no sign-in and no settings file. From then on every request goes over HTTPS whenever HTTPS is available.",
  },
];

// The page a visitor lands on right after the download button. Reaching it is
// what the install_started conversion counts: download_click records the intent,
// and arriving here means the download actually began.
export default function ThankYou() {
  const reported = useRef(false);

  useEffect(() => {
    if (reported.current) return;
    reported.current = true;
    base44.analytics.track({ eventName: "install_started" });
    trackGaEvent("install_started", { install_source: "website" });
  }, []);

  return (
    <>
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-secure/30 bg-secure/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-secure">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Download started
          </span>

          <h1 className="mt-5 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Thanks — HTTPSNAP is on its way to your Mac
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            The download has begun. Open the app once and Safari registers the extension: that is the
            whole install, with no account to create and nothing to configure.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="gap-2">
              <Link to="/install">
                Open the install guide
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            {brand.downloadUrl ? (
              <Button asChild variant="outline" size="lg" className="gap-2">
                <a href={brand.downloadUrl} download>
                  <Download className="h-4 w-4" />
                  Download again
                </a>
              </Button>
            ) : null}
          </div>

          <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-secure" />
            {brand.downloadUrl
              ? "Nothing happened? Use Download again above — the file is the same signed, notarized build."
              : "The signed Mac build is still being notarized, so the install guide points you to the route that works today."}
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
          <h2 className="font-heading text-xl font-semibold">What happens next</h2>

          <ol className="mt-8 space-y-6">
            {nextSteps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="mt-0.5 font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading text-base font-semibold">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-10 flex items-center gap-2 text-sm text-muted-foreground">
            <LifeBuoy className="h-4 w-4 shrink-0" />
            Stuck on a step?
            <Link to="/support" className="font-medium text-brand underline-offset-4 hover:underline">
              Get help
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}