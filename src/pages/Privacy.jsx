import React from "react";
import PageHero from "@/components/marketing/PageHero";
import OwnerDetails from "@/components/marketing/OwnerDetails";
import { company } from "@/lib/company";

const sections = [
  {
    title: "The short version",
    paragraphs: [
      "HTTPSNAP is a Safari web extension that asks Safari to load the HTTPS version of the http:// requests it makes. It has no servers of ours in the request path, no account and no analytics, so there is nothing about your browsing for us to hold.",
    ],
  },
  {
    title: "What the extension can see",
    paragraphs: [
      "The extension ships as declarative rules. Safari's networking layer matches them and applies the upgrade itself, and the extension is never handed page content — there is no content script and no background script in the build.",
      "The only permission the extension requests is the one that lets it declare those rules, alongside host permissions scoped to http:// addresses so a rewrite can apply at all. Your addresses are not transmitted to us, because the extension has nowhere to transmit them.",
    ],
  },
  {
    title: "What this website collects",
    paragraphs: [
      "This site is a set of static pages. There is no login, no newsletter form and no account, and we do not add advertising or analytics trackers to it.",
      "If you email us, we hold your message and your address for as long as it takes to answer you and nothing else.",
    ],
  },
  {
    title: "The privacy manifest",
    paragraphs: [
      "The extension ships a privacy manifest with every category empty: no tracking, no tracking domains, no collected data types and no required-reason API usage. There is nothing to opt out of.",
    ],
  },
  {
    title: "App Store distribution",
    paragraphs: [
      "When the extension is installed from the App Store, Apple's own policies also apply to that download and listing. This policy describes what the extension itself does once it is running in your browser.",
    ],
  },
  {
    title: "Changes to this policy",
    paragraphs: [
      "If this policy changes, the date below changes with it. Because the extension collects nothing, we do not expect it to.",
    ],
  },
];

export default function Privacy() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="An extension that has no way to collect your data"
        description="HTTPSNAP is built so that the privacy answer is structural rather than a promise: there is no content script, no analytics and no server of ours involved in your browsing."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Last updated 7 October 2026
          </p>

          <div className="mt-8 space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-heading text-lg font-semibold">{section.title}</h2>
                <div className="mt-3 space-y-3">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-xl border border-border bg-muted/30 p-6">
            <h2 className="font-heading text-lg font-semibold">Privacy questions</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              This policy is published by {company.name}, the owner and operator of this website.
              Write to us with any question about it.
            </p>
            <OwnerDetails className="mt-5" />
          </div>
        </div>
      </section>
    </>
  );
}