import React from "react";
import PageHero from "@/components/marketing/PageHero";
import SectionHeading from "@/components/marketing/SectionHeading";
import CopyField from "@/components/marketing/CopyField";
import {
  listingCopy,
  listingUrls,
  privacyAnswers,
  reviewNotes,
  submissionChecks,
} from "@/lib/appStoreSubmission";

export default function AppStorePack() {
  return (
    <>
      <PageHero
        eyebrow="App Store submission"
        title="Everything to paste into App Store Connect"
        description="Listing copy, review notes and privacy answers, in the order the submission forms ask for them. Nothing here is public marketing copy: the Support and Privacy pages are what visitors and reviewers see."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
          <SectionHeading eyebrow="Step 1" title="URLs" description="Pasted into App Information and App Privacy." />
          <div className="mt-8 space-y-4">
            {listingUrls.map((item) => (
              <CopyField key={item.label} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
          <SectionHeading
            eyebrow="Step 2"
            title="Listing copy"
            description="Character limits are Apple's own. App name and subtitle are the only two that get cut off, so they are kept short on purpose."
          />
          <div className="mt-8 space-y-4">
            {listingCopy.map((item) => (
              <CopyField key={item.label} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
          <SectionHeading
            eyebrow="Step 3"
            title="Notes for review"
            description="Pasted into the App Review Information box. Reviewers read this before they open the app, so it says plainly what the extension does and how to see it working."
          />
          <div className="mt-8 space-y-4">
            {reviewNotes.map((note) => (
              <div key={note.title} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-heading text-sm font-semibold">{note.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{note.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
          <SectionHeading
            eyebrow="Step 4"
            title="App Privacy answers"
            description="Four questions, four answers that all say the same thing: nothing is collected."
          />
          <div className="mt-8 space-y-4">
            {privacyAnswers.map((item) => (
              <div key={item.question} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-heading text-sm font-semibold">{item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
          <SectionHeading
            eyebrow="Step 5"
            title="Final package checks"
            description="The last walk-through of the package before you click Submit. Everything tagged Required is something Apple refuses the build over, or a step that is much cheaper to catch here than after an upload."
          />
          <div className="mt-8 space-y-4">
            {submissionChecks.map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {item.tag}
                  </span>
                  <h3 className="font-heading text-sm font-semibold">{item.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}