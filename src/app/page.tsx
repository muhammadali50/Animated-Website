import { ExteriorSection } from "@/components/exterior-section";
import { FinalCTASection } from "@/components/final-cta-section";
import { HeroSection } from "@/components/hero-section";
import { InteriorSection } from "@/components/interior-section";
import { PerformanceSection } from "@/components/performance-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <ExteriorSection />
        <PerformanceSection />
        <InteriorSection />
        <FinalCTASection />
      </main>
      <SiteFooter />
    </>
  );
}
