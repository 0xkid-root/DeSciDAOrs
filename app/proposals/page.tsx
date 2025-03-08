import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProposalsList } from "@/components/proposals-list";

export default function ProposalsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <div className="bg-muted/50 py-12">
          <div className="container px-4 md:px-6">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Proposals</h1>
            <p className="text-xl text-muted-foreground">
              Browse and discover educational experiments and research topics
            </p>
          </div>
        </div>
        <ProposalsList />
      </div>
      <Footer />
    </main>
  );
}