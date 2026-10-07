import React from "react";
import Hero from "@/components/marketing/Hero";
import DownloadSection from "@/components/marketing/DownloadSection";
import ValueCards from "@/components/marketing/ValueCards";
import HowItWorks from "@/components/marketing/HowItWorks";
import Gallery from "@/components/marketing/Gallery";
import ModeCards from "@/components/marketing/ModeCards";
import TechnicalBand from "@/components/marketing/TechnicalBand";
import FaqSection from "@/components/marketing/FaqSection";
import CtaBand from "@/components/marketing/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <DownloadSection />
      <ValueCards />
      <HowItWorks />
      <Gallery />
      <ModeCards />
      <TechnicalBand />
      <FaqSection />
      <CtaBand />
    </>
  );
}