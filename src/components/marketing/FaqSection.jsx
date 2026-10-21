import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeading from "@/components/marketing/SectionHeading";

const faqs = [
  {
    q: "Is HTTPSNAP free?",
    a: "Yes. There is no account, no subscription and no paid tier. It does one thing, and every file it ships with is listed on the setup page so you can read it before you install it.",
  },
  {
    q: "Can the extension see what I browse?",
    a: "No. The rewriting is declarative: Safari's networking layer matches the rules and makes the change before a page loads. There is no content script, the extension never reads page content, and no request data is sent anywhere.",
  },
  {
    q: "What happens on a site that does not support HTTPS?",
    a: "A rule cannot say \"try HTTPS, and if that fails load the insecure page\", so there is no silent fallback. In Upgrade mode the upgraded request fails; in Force mode the http:// address is rewritten outright and the host stops loading. Switch modes from the toolbar when you hit one of those.",
  },
  {
    q: "Can it dismiss Safari's \"connection is not private\" warning?",
    a: "No. Certificate and not-secure warnings are a browser-level boundary, and an extension that could click through them would defeat the point of the warning. Only the person using the browser can accept an unsecure page.",
  },
  {
    q: "Do I need an Apple Developer account to install it?",
    a: "No. Download the disk image from this site, open the app once, and turn the extension on in Safari. The build is signed and notarized before it is published, so there is nothing for you to sign and no account to create.",
  },
  {
    q: "Does it work on iPhone and iPad?",
    a: "No. HTTPSNAP is a Mac app for Safari on macOS and is only distributed that way today.",
  },
];

export default function FaqSection() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
        <SectionHeading
          eyebrow="Questions"
          title="Straight answers, including the limits"
          align="center"
        />
        <Accordion type="single" collapsible className="mt-8">
          {faqs.map((item, index) => (
            <AccordionItem key={item.q} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-heading text-sm font-semibold hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}