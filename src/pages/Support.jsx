import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/marketing/PageHero";
import OwnerDetails from "@/components/marketing/OwnerDetails";
import { company } from "@/lib/company";

const checks = [
  "HTTPSNAP is ticked in Safari → Settings → Extensions.",
  "Its site access is set to Allow on every website, or you have approved the site you are testing.",
  "You are on Safari 16.4 or later — the toolbar switch and the rule controls need that version.",
  "You have tried the other mode in the toolbar popup, since a host that only serves HTTP behaves differently in each.",
];

const reportItems = [
  "Your macOS and Safari version, from Safari → About Safari.",
  "The address you were on when it went wrong, and which mode was active.",
  "What you expected to happen and what actually happened.",
  "For an install problem, the exact message Xcode or Safari showed, copied rather than retyped.",
];

export default function Support() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title="Get help with HTTPSNAP"
        description="Email is the fastest route for extension questions. Including the details below means most issues can be answered in one reply."
      />

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-xl border border-border bg-card p-6 sm:p-7">
            <Mail className="h-5 w-5 text-secure" />
            <h2 className="mt-4 font-heading text-lg font-semibold">Contact us</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Support is handled by {company.name}, the owner and operator of this website.
            </p>
            <OwnerDetails className="mt-5" />
            <Button asChild className="mt-6 w-full gap-2">
              <a href={company.emailHref}>
                Email support
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6 sm:p-7">
              <h2 className="font-heading text-lg font-semibold">Check these first</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                These four cover most "it isn't doing anything" reports.
              </p>
              <ul className="mt-5 space-y-3">
                {checks.map((check, index) => (
                  <li key={check} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="font-mono text-xs text-foreground">{index + 1}</span>
                    <span className="leading-relaxed">{check}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/setup"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline underline-offset-4"
              >
                Open the setup guide
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-xl border border-border bg-muted/30 p-6 sm:p-7">
              <h2 className="font-heading text-lg font-semibold">What to include</h2>
              <ul className="mt-4 space-y-3">
                {reportItems.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}