import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AboutContent } from "@/components/about-content";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <AboutContent />
      </div>
      <Footer />
    </main>
  );
}