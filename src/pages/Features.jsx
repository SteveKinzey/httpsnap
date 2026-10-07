import React from "react";
import PageHero from "@/components/marketing/PageHero";
import SectionHeading from "@/components/marketing/SectionHeading";
import FeatureGrid from "@/components/marketing/FeatureGrid";
import ModeComparison from "@/components/marketing/ModeComparison";
import LimitList from "@/components/marketing/LimitList";
import CtaBand from "@/components/marketing/CtaBand";

export default function Features() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title="One job, done in Safari's own networking layer"
        description="HTTPSNAP exists to close the http:// gap: the requests Safari does not upgrade on its own, whatever kind of request they are."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionHeading
            eyebrow="What you get"
            title="Coverage without page access"
            description="Everything the extension does is declared up front in a rule set, and Safari does the work."
          />
          <div className="mt-10">
            <FeatureGrid />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionHeading
            eyebrow="Modes"
            title="Upgrade or Force, side by side"
            description="Both modes are one rule set each. The toolbar popup decides which one Safari has active."
          />
          <div className="mt-10">
            <ModeComparison />
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionHeading
            eyebrow="Honest limits"
            title="What HTTPSNAP cannot do"
            description="These are boundaries of browsers and extensions, not gaps we plan to close later. Better to know them before you install."
          />
          <div className="mt-10">
            <LimitList />
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to try it?"
        description="The setup guide walks through the Mac install step by step, and covers signing and distribution when you are ready for those."
      />
    </>
  );
}