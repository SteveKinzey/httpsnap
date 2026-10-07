import React from "react";
import { Link } from "react-router-dom";
import { RefreshCw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/marketing/PageHero";
import SectionHeading from "@/components/marketing/SectionHeading";
import ServerUrl from "@/components/connect/ServerUrl";
import ClientTabs from "@/components/connect/ClientTabs";
import { mcpServerUrl } from "@/lib/mcpUrl";

export default function Connect() {
  const url = mcpServerUrl();

  return (
    <>
      <PageHero
        eyebrow="Agent access"
        title="Connect an AI assistant to HTTPSNAP"
        description="This app answers on a Model Context Protocol server, so an assistant like Claude, ChatGPT or Cursor can read it and act on it directly. Copy one address, add it to your client, and approve access once."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
          <SectionHeading
            eyebrow="Step one"
            title="Copy the server URL"
            description="Every client below uses this same address, and it is the only thing you have to copy. It resolves to whichever domain you are reading this page on."
          />
          <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <ServerUrl url={url} />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
          <SectionHeading
            eyebrow="Step two"
            title="Add it to your client"
            description="Pick your assistant and follow the steps. Every one of them finishes in the same place: the client opens this app's approval page."
          />
          <div className="mt-8">
            <ClientTabs url={url} />
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
          <SectionHeading
            eyebrow="What happens next"
            title="The last step, and the one people forget"
            description="Approval happens inside the app, not inside the assistant. That is what keeps the assistant limited to your own account."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-primary-foreground">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <h3 className="mt-4 font-heading text-base font-semibold">Approve access once</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The first time a client connects, it opens the app's approval page. Sign in with
                your own account and click Approve. From then on the assistant acts as you and sees
                only what your account can see, and you can revoke it by removing the connector in
                the client.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-brand">
                <RefreshCw className="h-4 w-4" />
              </span>
              <h3 className="mt-4 font-heading text-base font-semibold">
                Refresh the connector after the app changes
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                A client keeps the list of tools it was handed when you connected. When the app's
                tools change, reconnect or re-authorize the connector so the assistant sees the
                current list instead of offering something that is gone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="font-heading text-lg font-semibold">If a client will not connect</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              It is nearly always one of three things: the URL was typed by hand instead of copied,
              the connector is switched off inside the client, or the approval page was closed
              before it said Access granted. Re-copy the address above, check the connector is
              enabled, and start one call so the approval page can open again.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild variant="outline" className="gap-2">
                <Link to="/support">Get in touch</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/privacy">What this app collects</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}