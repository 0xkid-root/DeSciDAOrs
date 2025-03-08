import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { VotingDashboard } from "@/components/voting-dashboard";

export default function VotingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <div className="bg-muted/50 py-12">
          <div className="container px-4 md:px-6">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Voting Dashboard</h1>
            <p className="text-xl text-muted-foreground">
              Vote on active proposals and help shape the future of decentralized education
            </p>
          </div>
        </div>
        <VotingDashboard />
      </div>
      <Footer />
    </main>
  );
}