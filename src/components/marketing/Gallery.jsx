import React from "react";
import SectionHeading from "@/components/marketing/SectionHeading";
import PanelFrame from "@/components/marketing/gallery/PanelFrame";
import SafariSettingsPanel from "@/components/marketing/gallery/SafariSettingsPanel";
import AddressBarPanel from "@/components/marketing/gallery/AddressBarPanel";
import PopupPanel from "@/components/marketing/gallery/PopupPanel";
import PhonePanel from "@/components/marketing/gallery/PhonePanel";

const panels = [
  {
    title: "Switched on in Safari",
    caption: "Tick HTTPSNAP in Safari's extensions list and set website access to Allow on every website. There is nothing else to configure.",
    Panel: SafariSettingsPanel,
  },
  {
    title: "Typed addresses land secure",
    caption: "Type an address with no scheme at all and the request still leaves over https://, because the rule matches the request rather than the page.",
    Panel: AddressBarPanel,
  },
  {
    title: "Upgrade or Force",
    caption: "The toolbar popup swaps rule sets while you browse: upgrade each request, or rewrite every http:// URL outright.",
    Panel: PopupPanel,
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
          description="Four moments from the same flow: switching it on, the address that lands secure, choosing how strict to be, and the same protection on iOS."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {panels.map(({ title, caption, Panel }) => (
            <PanelFrame key={title} title={title} caption={caption}>
              <Panel />
            </PanelFrame>
          ))}
        </div>
      </div>
    </section>
  );
}