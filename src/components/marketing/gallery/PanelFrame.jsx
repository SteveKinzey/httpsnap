import React from "react";

// One gallery item: a gradient hairline frame around a rendered panel, with a caption.
export default function PanelFrame({ title, caption, className, children }) {
  return (
    <figure className={`flex min-w-0 flex-col ${className || ""}`}>
      <div className="rounded-2xl bg-brand-gradient p-[2px] shadow-lg">
        <div className="flex min-h-[230px] flex-col justify-center overflow-hidden rounded-[14px] bg-background p-4">
          {children}
        </div>
      </div>
      <figcaption className="mt-3.5 max-w-2xl">
        <p className="font-heading text-sm font-semibold">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{caption}</p>
      </figcaption>
    </figure>
  );
}