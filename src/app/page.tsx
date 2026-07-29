import { FeatureCards } from "@/components/feature-cards";
import { FooterFeatures } from "@/components/footer-features";
import { Hero } from "@/components/hero";
import { LowerSection } from "@/components/lower-section";
import { SiteHeader } from "@/components/site-header";
import { Specialties } from "@/components/specialties";
import { StatisticsBar } from "@/components/statistics-bar";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <FeatureCards />
        <Specialties />
        <StatisticsBar />
        <LowerSection />
        <FooterFeatures />
      </main>
    </>
  );
}
