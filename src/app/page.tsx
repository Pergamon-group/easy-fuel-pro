import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Partners } from "@/components/sections/Partners";
import { ForecourtArchitecture } from "@/components/sections/ForecourtArchitecture";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { WhyEasyFuel } from "@/components/sections/WhyEasyFuel";
import { Scalability } from "@/components/sections/Scalability";
import { PricingStructure } from "@/components/sections/PricingStructure";
import { ComplianceSpotlight } from "@/components/sections/ComplianceSpotlight";
import { FaqSection } from "@/components/sections/FaqSection";
import { ValueProps } from "@/components/sections/ValueProps";
import { CtaBooking } from "@/components/sections/CtaBooking";

export default function Home() {
  return (
    <>
      <Header />
      <main className="w-full pt-24 sm:pt-20">
        <Hero />
        <Partners />
        <ForecourtArchitecture />
        <FeatureGrid />
        <WhyEasyFuel />
        <Scalability />
        <PricingStructure />
        <ComplianceSpotlight />
        <FaqSection />
        <ValueProps />
        <CtaBooking />
      </main>
      <Footer />
    </>
  );
}
