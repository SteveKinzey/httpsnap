import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import { Image } from "@/components/ui/image";
import { base44 } from "@/api/base44Client";
import StatusRow from "@/components/build/StatusRow";
import StatusSummary from "@/components/build/StatusSummary";
import FileInventory from "@/components/build/FileInventory";
import { brand } from "@/lib/brand";
import { buildStageCounts, buildStages, extensionVersion } from "@/lib/buildStatus";

// Private admin page: what the project files say about the extension's build and
// notarization status. Nothing on the public site links to it.
export default function BuildStatus() {
  const [role, setRole] = useState(null);
  const [checkedAt] = useState(() => new Date());

  useEffect(() => {
    base44.auth.me().then((me) => setRole(me?.role ?? "user"));
  }, []);

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
              Build and notarization status
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground">
              <Lock className="h-3 w-3" />
              Admins only
            </span>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Extension version {extensionVersion}, read from the project's own files when this page
            loaded at {checkedAt.toLocaleTimeString()}. The steps that happen in Xcode and at Apple
            are listed honestly as outside the app: no page can read a notarization result, so
            nothing here pretends to.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand underline-offset-4 hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to the site
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-6 px-5 py-12 sm:px-8">
        {role === null && (
          <p className="text-sm text-muted-foreground">Checking your access…</p>
        )}

        {role !== null && role !== "admin" && (
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-2.5">
              <Lock className="h-5 w-5 shrink-0 text-muted-foreground" />
              <h2 className="font-heading text-base font-semibold">Limited to app admins</h2>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              This page shows the extension's build status, so it opens for admin accounts only.
            </p>
          </div>
        )}

        {role === "admin" && (
          <>
            <StatusSummary counts={buildStageCounts} />

            <div className="space-y-4">
              {buildStages.map((stage) => (
                <StatusRow key={stage.id} stage={stage} />
              ))}
            </div>

            <section className="space-y-4 pt-4">
              <div>
                <h2 className="font-heading text-lg font-semibold">Extension files</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  The seven extension resources, the container app's files and the icons, each with
                  the path it takes inside the Xcode project.
                </p>
              </div>
              <FileInventory />
            </section>
          </>
        )}
      </main>
    </div>
  );
}