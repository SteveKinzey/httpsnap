import React from "react";
import SectionHeading from "@/components/marketing/SectionHeading";
import PanelFrame from "@/components/marketing/gallery/PanelFrame";
import SafariSettingsShot from "@/components/marketing/gallery/SafariSettingsShot";
import SafariPopupShot from "@/components/marketing/gallery/SafariPopupShot";
import AddressBarPanel from "@/components/marketing/gallery/AddressBarPanel";
import PhonePanel from "@/components/marketing/gallery/PhonePanel";

const panels = [
  {
    title: "Switched on in Safari",
    caption:
      "The real settings pane: HTTPSNAP ticked and set to Allow on every website. Safari's permission line is its own wording for the host access a declarative rule needs, so no page content is ever read.",
    Panel: SafariSettingsShot,
    className: "sm:col-span-2",
  },
  {
    title: "Upgrade or Force",
    caption:
      "The real toolbar popup. Upgrade asks Safari to load the HTTPS version of each request; Force rewrites every http:// URL outright, including hosts that never offered HTTPS.",
    Panel: SafariPopupShot,
    className: "sm:col-span-2",
  },
  {
    title: "Typed addresses land secure",
    caption: "Type an address with no scheme at all and the request still leaves over https://, because the rule matches the request rather than the page.",
    Panel: AddressBarPanel,
  },
  {
    title: "The same rules on iPhone and iPad",
    caption: "The identical declarative rule set runs in Safari on iOS, so the padlock follows you off the Mac.",
    Panel: PhonePanel,
  },
];

export default function Gallery() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <SectionHeading
          eyebrow="Gallery"
          title="What it looks like at each step"
          description="Real captures from Safari, plus the two views that explain what the extension does with a request once it is switched on."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {panels.map(({ title, caption, Panel, className }) => (
            <PanelFrame key={title} title={title} caption={caption} className={className}>
              <Panel />
            </PanelFrame>
          ))}
        </div>
      </div>
    </section>
  );
}