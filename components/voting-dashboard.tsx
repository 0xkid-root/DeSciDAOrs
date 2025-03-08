"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ThumbsUp, ThumbsDown, Search } from "lucide-react";
import Link from "next/link";

// Mock data for active proposals
const activeProposals = [
  {
    id: 1,
    title: "Quantum Computing Educational Platform",
    description: "Building an interactive platform to teach quantum computing principles to high school students",
    category: "Computer Science",
    fundingGoal: 5000,
    currentFunding: 3750,
    votesFor: 87,
    votesAgainst: 12,
    deadline: "2025-06-15",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Biodiversity Mapping Initiative",
    description: "Developing a citizen science app for students to map local biodiversity",
    category: "Biology",
    fundingGoal: 3000,
    currentFunding: 2100,
    votesFor: 65,
    votesAgainst: 8,
    deadline: "2025-05-30",
    image: "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Renewable Energy Workshop Series",
    description: "Creating hands-on workshops for students to build small-scale renewable energy projects",
    category: "Engineering",
    fundingGoal: 4500,
    currentFunding: 4050,
    votesFor: 92,
    votesAgainst: 15,
    deadline: "2025-07-10",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Neural Network Visualization Tool",
    description: "Creating an interactive tool to help students understand how neural networks function",
    category: "Computer Science",
    fundingGoal: 6000,
    currentFunding: 2400,
    votesFor: 45,
    votesAgainst: 7,
    deadline: "2025-08-05",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Genetic Engineering Ethics Course",
    description: "Creating a comprehensive course on the ethical implications of genetic engineering",
    category: "Biology",
    fundingGoal: 5500,
    currentFunding: 1200,
    votesFor: 32,
    votesAgainst: 18,
    deadline: "2025-09-15",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    title: "Astronomy Observation Network",
    description: "Building a network of telescopes for students to conduct astronomical observations",
    category: "Astronomy",
    fundingGoal: 8000,
    currentFunding: 5600,
    votesFor: 78,
    votesAgainst: 5,
    deadline: "2025-07-30",
    image: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const categories = [
  "All Categories",
  "Computer Science",
  "Biology",
  "Engineering",
  "Environmental Science",
  "Astronomy",
  "Chemistry",
  "Mathematics"
];

const sortOptions = [
  { value: "deadline", label: "Deadline (Soonest)" },
  { value: "mostVotes", label: "Most Votes" },
  { value: "leastVotes", label: "Least Votes" },
  { value: "mostFunded", label: "Most Funded" }
];

export function VotingDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("deadline");
  const [votedProposals, setVotedProposals] = useState<number[]>([]);
  const [voteValues, setVoteValues] = useState<Record<number, number>>({});
  const [tokenBalance, setTokenBalance] = useState(100);
  
  // Filter proposals based on search and category
  const filteredProposals = activeProposals.filter(proposal => {
    const matchesSearch = proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          proposal.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || proposal.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Sort proposals
  const sortedProposals = [...filteredProposals].sort((a, b) => {
    switch (sortBy) {
      case "deadline":
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      case "mostVotes":
        return (b.votesFor + b.votesAgainst) - (a.votesFor + a.votesAgainst);
      case "leastVotes":
        return (a.votesFor + a.votesAgainst) - (b.votesFor + b.votesAgainst);
      case "mostFunded":
        return (b.currentFunding / b.fundingGoal) - (a.currentFunding / a.fundingGoal);
      default:
        return 0;
    }
  });

  const handleVoteChange = (proposalId: number, value: number) => {
    setVoteValues({
      ...voteValues,
      [proposalId]: value
    });
  };

  const handleVoteSubmit = (proposalId: number) => {
    // In a real implementation, this would interact with a smart contract
    if (!votedProposals.includes(proposalId)) {
      setVotedProposals([...votedProposals, proposalId]);
      setTokenBalance(tokenBalance - 10); // Deduct tokens for voting
    }
  };

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Voting Power</CardTitle>
                <CardDescription>Your token balance and voting stats</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Token Balance</span>
                    <span className="text-xl font-bold">{tokenBalance}</span>
                  </div>
                  <Progress value={(tokenBalance / 100) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Each vote costs 10 tokens. You can vote on {Math.floor(tokenBalance / 10)} more proposals.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Voting Stats</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-muted p-3 rounded-md text-center">
                      <p className="text-2xl font-bold">{votedProposals.length}</p>
                      <p className="text-xs text-muted-foreground">Votes Cast</p>
                    </div>
                    <div className="bg-muted p-3 rounded-md text-center">
                      <p className="text-2xl font-bold">{activeProposals.length}</p>
                      <p className="text-xs text-muted-foreground">Active Proposals</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search proposals..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={selectedCategory} 
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
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
                  <Label htmlFor="sort">Sort By</Label>
                  <Select 
                    value={sortBy} 
                    onValueChange={setSortBy}
                  >
                    <SelectTrigger id="sort">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="active" className="space-y-8">
              <TabsList>
                <TabsTrigger value="active">Active Proposals</TabsTrigger>
                <TabsTrigger value="voted">Voted Proposals</TabsTrigger>
              </TabsList>
              
              {/* Active Proposals Tab */}
              <TabsContent value="active" className="space-y-6">
                {sortedProposals.filter(p => !votedProposals.includes(p.id)).length > 0 ? (
                  sortedProposals
                    .filter(p => !votedProposals.includes(p.id))
                    .map((proposal, index) => (
                      <motion.div
                        key={proposal.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card>
                          <div className="md:flex">
                            <div className="md:w-1/3 h-48 md:h-auto relative">
                              <img 
                                src={proposal.image} 
                                alt={proposal.title}
                                className="w-full h-full object-cover"
                              />
                              <Badge className="absolute top-3 right-3">
                                {proposal.category}
                              </Badge>
                            </div>
                            <div className="md:w-2/3 p-6">
                              <div className="space-y-4">
                                <div>
                                  <h3 className="text-xl font-bold">{proposal.title}</h3>
                                  <p className="text-muted-foreground mt-1">{proposal.description}</p>
                                </div>
                                
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span>Funding Progress</span>
                                    <span className="font-medium">
                                      {Math.round((proposal.currentFunding / proposal.fundingGoal) * 100)}%
                                    </span>
                                  </div>
                                  <Progress 
                                    value={(proposal.currentFunding / proposal.fundingGoal) * 100} 
                                    className="h-2"
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span>Current Votes</span>
                                    <span className="font-medium">
                                      {proposal.votesFor} For / {proposal.votesAgainst} Against
                                    </span>
                                  </div>
                                  <Progress 
                                    value={(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100} 
                                    className="h-2"
                                  />
                                </div>
                                
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <div className="flex items-center text-sm">
                                        <ThumbsDown className="h-4 w-4 mr-1 text-destructive" />
                                        <span>Against</span>
                                      </div>
                                      <div className="flex items-center text-sm">
                                        <span>For</span>
                                        <ThumbsUp className="h-4 w-4 ml-1 text-primary" />
                                      </div>
                                    </div>
                                    <Slider
                                      value={[voteValues[proposal.id] || 50]}
                                      min={0}
                                      max={100}
                                      step={1}
                                      onValueChange={(value) => handleVoteChange(proposal.id, value[0])}
                                    />
                                  </div>
                                  
                                  <div className="flex space-x-4">
                                    <Button 
                                      onClick={() => handleVoteSubmit(proposal.id)}
                                      disabled={tokenBalance < 10}
                                      className="flex-1"
                                    >
                                      Cast Vote (10 Tokens)
                                    </Button>
                                    <Button variant="outline" asChild className="flex-1">
                                      <Link href={`/proposals/${proposal.id}`}>View Details</Link>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))
                ) : (
                  <div className="text-center py-12 bg-muted/50 rounded-lg">
                    <h3 className="text-xl font-medium mb-2">No active proposals to vote on</h3>
                    <p className="text-muted-foreground mb-4">
                      You've voted on all available proposals or there are no proposals matching your filters.
                    </p>
                    <Button variant="outline" onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All Categories");
                    }}>
                      Reset Filters
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              {/* Voted Proposals Tab */}
              <TabsContent value="voted" className="space-y-6">
                {votedProposals.length > 0 ? (
                  sortedProposals
                    .filter(p => votedProposals.includes(p.id))
                    .map((proposal, index) => (
                      <motion.div
                        key={proposal.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card>
                          <div className="md:flex">
                            <div className="md:w-1/3 h-48 md:h-auto relative">
                              <img 
                                src={proposal.image} 
                                alt={proposal.title}
                                className="w-full h-full object-cover"
                              />
                              <Badge className="absolute top-3 right-3">
                                {proposal.category}
                              </Badge>
                            </div>
                            <div className="md:w-2/3 p-6">
                              <div className="space-y-4">
                                <div>
                                  <h3 className="text-xl font-bold">{proposal.title}</h3>
                                  <p className="text-muted-foreground mt-1">{proposal.description}</p>
                                </div>
                                
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span>Funding Progress</span>
                                    <span className="font-medium">
                                      {Math.round((proposal.currentFunding / proposal.fundingGoal) * 100)}%
                                    </span>
                                  </div>
                                  <Progress 
                                    value={(proposal.currentFunding / proposal.fundingGoal) * 100} 
                                    className="h-2"
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span>Current Votes</span>
                                    <span className="font-medium">
                                      {proposal.votesFor} For / {proposal.votesAgainst} Against
                                    </span>
                                  </div>
                                  <Progress 
                                    value={(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100} 
                                    className="h-2"
                                  />
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <Badge variant="outline" className="px-3 py-1">
                                    You voted: {(voteValues[proposal.id] || 50) > 50 ? "For" : (voteValues[proposal.id] || 50) < 50 ? "Against" : "Neutral"}
                                  </Badge>
                                  <Button variant="outline" asChild>
                                    <Link href={`/proposals/${proposal.id}`}>View Details</Link>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))
                ) : (
                  <div className="text-center py-12 bg-muted/50 rounded-lg">
                    <h3 className="text-xl font-medium mb-2">No voted proposals</h3>
                    <p className="text-muted-foreground mb-4">
                      You haven't voted on any proposals yet.
                    </p>
                    <Button asChild>
                      <a href="#active">Start Voting</a>
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}