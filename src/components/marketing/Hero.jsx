import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import BrowserMock from "@/components/marketing/BrowserMock";

const facts = ["No page content read", "No account needed", "Nothing collected"];

export default function Hero() {
  return (
    <section className="bg-brand-gradient text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-3 py-1 text-xs font-medium text-primary-foreground/90">
            <ShieldCheck className="h-3.5 w-3.5" />
            Safari web extension · Free
          </span>

          <h1 className="mt-5 font-heading text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Every site, over HTTPS.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
            HTTPSNAP asks Safari to load the secure version of every request it can: the old
            bookmarks, the addresses you type yourself, and the scripts, images and fonts that are
            still being pulled over http://.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" variant="secondary" className="gap-2">
              <Link to="/setup">
                Install in Safari
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link to="/features">See what it covers</Link>
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
            {facts.map((fact) => (
              <li key={fact} className="text-sm text-primary-foreground/80">
                {fact}
              </li>
            ))}
          </ul>
        </div>

        <BrowserMock />
      </div>
    </section>
  );
}