import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import { Image } from "@/components/ui/image";
import CopyGroup from "@/components/submission/CopyGroup";
import { brand } from "@/lib/brand";
import { submissionGroups } from "@/lib/submissionCopy";

// Private working page: the paste-ready App Store submission copy. It needs a
// sign-in to open and nothing on the public site links to it.
export default function Submission() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-12">
          <div className="flex items-center gap-2.5">
            <Image src={brand.logo} alt={brand.name} className="h-8 w-8 rounded-lg" />
            <span className="font-heading text-base font-semibold tracking-tight">{brand.name}</span>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              App Store submission copy
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground">
              <Lock className="h-3 w-3" />
              Private
            </span>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Every field App Store Connect asks for, written out so it can be pasted in one at a
            time. This page is not linked anywhere on the public site and only opens with a
            sign-in.
          </p>

          <Link
            to="/"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand underline-offset-4 hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to the site
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-12 px-5 py-12 sm:px-8 sm:py-16">
        {submissionGroups.map((group) => (
          <CopyGroup key={group.title} {...group} />
        ))}
      </main>
    </div>
  );
}