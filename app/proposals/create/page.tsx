"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const categories = [
  "Computer Science",
  "Biology",
  "Engineering",
  "Environmental Science",
  "Astronomy",
  "Chemistry",
  "Mathematics",
  "Physics",
  "Social Sciences",
  "Humanities"
];

export default function CreateProposalPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    fundingGoal: "",
    longDescription: "",
    imageUrl: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Proposal Submitted",
        description: "Your proposal has been submitted successfully and is pending review.",
      });
      setIsSubmitting(false);
      router.push("/proposals");
    }, 1500);
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <div className="bg-muted/50 py-12">
          <div className="container px-4 md:px-6">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Create a Proposal</h1>
            <p className="text-xl text-muted-foreground">
              Submit your educational experiment or research topic for community funding
            </p>
          </div>
        </div>
        
        <div className="container py-12 px-4 md:px-6">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Proposal Details</CardTitle>
              <CardDescription>
                Fill out the form below to submit your proposal. Be as detailed as possible to increase your chances of receiving funding.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Proposal Title</Label>
                  <Input 
                    id="title" 
                    name="title"
                    placeholder="Enter a clear, descriptive title" 
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea 
                    id="description" 
                    name="description"
                    placeholder="Provide a brief summary of your proposal (100-150 words)" 
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => handleSelectChange("category", value)}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fundingGoal">Funding Goal (USD)</Label>
                    <Input 
                      id="fundingGoal" 
                      name="fundingGoal"
                      type="number" 
                      placeholder="e.g., 5000" 
                      value={formData.fundingGoal}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="longDescription">Detailed Description</Label>
                  <Textarea 
                    id="longDescription" 
                    name="longDescription"
                    placeholder="Provide a comprehensive description of your proposal, including objectives, methodology, expected outcomes, and timeline" 
                    className="min-h-[200px]"
                    value={formData.longDescription}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Cover Image URL</Label>
                  <Input 
                    id="imageUrl" 
                    name="imageUrl"
                    placeholder="Enter a URL for your proposal's cover image" 
                    value={formData.imageUrl}
                    onChange={handleChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    Provide a URL to an image that represents your proposal. For best results, use a 16:9 aspect ratio.
                  </p>
                </div>
                
                <div className="pt-4">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Proposal"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </main>
  );
}