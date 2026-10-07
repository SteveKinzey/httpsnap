import React from "react";
import Hero from "@/components/marketing/Hero";
import ValueCards from "@/components/marketing/ValueCards";
import HowItWorks from "@/components/marketing/HowItWorks";
import ModeCards from "@/components/marketing/ModeCards";
import TechnicalBand from "@/components/marketing/TechnicalBand";
import FaqSection from "@/components/marketing/FaqSection";
import CtaBand from "@/components/marketing/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <ValueCards />
      <HowItWorks />
      <ModeCards />
      <TechnicalBand />
      <FaqSection />
      <CtaBand />
    </>
  );
}