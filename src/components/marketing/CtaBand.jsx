import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CtaBand({
  title = "Stop browsing the insecure web.",
  description = "Save the files, add the folder to Safari, switch it on. Five minutes, no account, no cost.",
}) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
            <p className="mt-3 text-base leading-relaxed text-primary-foreground/70">{description}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
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
              <Link to="/support">Ask a question</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}