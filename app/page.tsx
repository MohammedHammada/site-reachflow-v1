import PageTransition from "@/components/animations/PageTransition";
import HeroSection from "@/components/sections/home/HeroSection";
import MarqueeSection from "@/components/sections/home/MarqueeSection";
import ServicesOverview from "@/components/sections/home/ServicesOverview";
import USPSection from "@/components/sections/home/USPSection";
import ProcessSection from "@/components/sections/home/ProcessSection";
import CTASection from "@/components/sections/home/CTASection";

export default function HomePage() {
  return (
    <PageTransition>
      <HeroSection />
      <MarqueeSection />
      <ServicesOverview />
      <USPSection />
      <ProcessSection />
      <CTASection />
    </PageTransition>
  );
}
