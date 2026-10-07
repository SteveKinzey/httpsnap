import React from "react";
import { Code, EyeOff, Layers, Lock, MousePointerClick, Zap } from "lucide-react";

const features = [
  {
    icon: Code,
    title: "Declarative rewriting",
    body: "Safari's networking layer applies the rules itself, so the extension never reads a page, a form or a request body.",
  },
  {
    icon: Layers,
    title: "Every request type",
    body: "Main pages, sub-frames, scripts, stylesheets, images, fonts, media, XHR and WebSockets are all covered by the same rule.",
  },
  {
    icon: Lock,
    title: "Upgrade mode",
    body: "The default: ask Safari to load the HTTPS version of each request. Purpose-built for exactly this job.",
  },
  {
    icon: Zap,
    title: "Force mode",
    body: "An opt-in rule that rewrites http:// to https:// outright, for sites you want pinned to the secure version.",
  },
  {
    icon: MousePointerClick,
    title: "Switched from the toolbar",
    body: "One click in Safari's toolbar moves between the two rule sets, and Safari applies the change immediately.",
  },
  {
    icon: EyeOff,
    title: "Nothing collected",
    body: "No accounts, no analytics, no servers of ours in the request path, and a privacy manifest that declares no data collection.",
  },
];

export default function FeatureGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {features.map(({ icon: Icon, title, body }) => (
        <div key={title} className="rounded-xl border border-border bg-card p-6">
          <Icon className="h-5 w-5 text-secure" />
          <h3 className="mt-4 font-heading text-base font-semibold">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
        </div>
      ))}
    </div>
  );
}