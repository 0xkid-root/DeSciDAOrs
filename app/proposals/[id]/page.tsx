import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProposalDetails } from "@/components/proposal-details";

export default function ProposalPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <ProposalDetails id={params.id} />
      </div>
      <Footer />
    </main>
  );
}