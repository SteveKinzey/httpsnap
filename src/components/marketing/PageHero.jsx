import React from "react";

export default function PageHero({ eyebrow, title, description, children }) {
  return (
    <section className="border-b border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        {eyebrow && (
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{eyebrow}</p>
        )}
        <h1 className="mt-3 max-w-3xl font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{description}</p>
        )}
        {children}
      </div>
    </section>
  );
}