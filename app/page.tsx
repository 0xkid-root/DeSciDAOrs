import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeaturedProposals } from "@/components/featured-proposals";
import { HowItWorks } from "@/components/how-it-works";
import { JoinDaoCta } from "@/components/join-dao-cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedProposals />
      <HowItWorks />
      <JoinDaoCta />
      <Footer />
    </main>
  );
}