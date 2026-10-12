import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Partners } from "@/components/sections/Partners";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { WhyEasyFuel } from "@/components/sections/WhyEasyFuel";
import { Scalability } from "@/components/sections/Scalability";
import { ComplianceSpotlight } from "@/components/sections/ComplianceSpotlight";
import { ValueProps } from "@/components/sections/ValueProps";
import { CtaBooking } from "@/components/sections/CtaBooking";

export default function Home() {
  return (
    <>
      <Header />
      <main className="w-full pt-20">
        <Hero />
        <Partners />
        <FeatureGrid />
        <WhyEasyFuel />
        <Scalability />
        <ComplianceSpotlight />
        <ValueProps />
        <CtaBooking />
      </main>
      <Footer />
    </>
  );
}
