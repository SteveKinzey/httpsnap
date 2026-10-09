import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/marketing/PageHero";
import SectionHeading from "@/components/marketing/SectionHeading";
import InstallSteps from "@/components/marketing/InstallSteps";
import InstallFaq from "@/components/marketing/InstallFaq";
import { brand } from "@/lib/brand";
import { requirements } from "@/lib/installGuide";
import { trackDownloadClick } from "@/lib/downloadTracking";

export default function Install() {
  return (
    <>
      <PageHero
        eyebrow="Install guide"
        title="Load HTTPSNAP in Safari, step by step"
        description="Six short steps, once. After that there is nothing to configure and nothing to keep an eye on: no account, no settings file, no dashboard."
      >
        <ul className="mt-8 grid gap-3 sm:grid-cols-3">
          {requirements.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secure" />
              {item}
            </li>
          ))}
        </ul>

        {brand.downloadUrl ? (
          <Button asChild size="lg" className="mt-8 gap-2">
            <a
              href={brand.downloadUrl}
              download
              onClick={() => trackDownloadClick("live")}
            >
              <Download className="h-4 w-4" />
              Download HTTPSNAP for Mac
            </a>
          </Button>
        ) : (
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            The signed Mac app is still being notarized, so step 1 begins on the day it is published
            here. Until then the{" "}
            <Link to="/setup" className="font-medium text-brand underline-offset-4 hover:underline">
              developer setup
            </Link>{" "}
            is the route that works today.
          </p>
        )}
      </PageHero>

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
          <SectionHeading
            eyebrow="The steps"
            title="From download to a secure Safari"
            description="Follow them in order. Steps one and two are the ones people skip, and they are exactly the two Safari needs: an app that has been opened, and site access that is allowed."
          />
          <div className="mt-10">
            <InstallSteps />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
          <SectionHeading
            eyebrow="If something is not right"
            title="The usual snags, and the fix"
            description="Nearly every report is one of these: the app was never opened, site access is still switched off, or the site itself only ever speaks HTTP."
          />
          <div className="mt-8">
            <InstallFaq />
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Still stuck?{" "}
            <Link to="/support" className="font-medium text-brand underline-offset-4 hover:underline">
              Get in touch
            </Link>{" "}
            and say what Safari shows you.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="font-heading text-lg font-semibold">Building it into your own project?</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              The whole extension is a declarative rule set with a small toolbar popup, so it also
              drops into an Xcode Safari Extension App project. The developer setup lists every file,
              both rule sets and the walk-through.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild variant="outline" className="gap-2">
                <Link to="/setup">
                  Open the developer setup
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/privacy">What it does and does not collect</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}