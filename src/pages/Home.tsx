import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustStrip } from "@/components/home/TrustStrip";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ResinSelector } from "@/components/home/ResinSelector";
import { FlowVelocitySection } from "@/components/home/FlowVelocitySection";
import { USPGrid } from "@/components/home/USPGrid";
import { WhyProtpure } from "@/components/home/WhyProtpure";
import { FacilitySnapshot } from "@/components/home/FacilitySnapshot";
import { CTABand } from "@/components/home/CTABand";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <TrustStrip />
        <CategoryGrid />
        <FlowVelocitySection />
        <ResinSelector />
        <USPGrid />
        <WhyProtpure />
        <FacilitySnapshot />
        <CTABand />
      </main>
      <Footer />
    </div>
  );
}
