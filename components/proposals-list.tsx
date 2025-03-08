"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { Search } from "lucide-react";

// Mock data for proposals
const allProposals = [
  {
    id: 1,
    title: "Quantum Computing Educational Platform",
    description: "Building an interactive platform to teach quantum computing principles to high school students",
    category: "Computer Science",
    fundingGoal: 5000,
    currentFunding: 3750,
    status: "active",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Biodiversity Mapping Initiative",
    description: "Developing a citizen science app for students to map local biodiversity",
    category: "Biology",
    fundingGoal: 3000,
    currentFunding: 2100,
    status: "active",
    image: "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Renewable Energy Workshop Series",
    description: "Creating hands-on workshops for students to build small-scale renewable energy projects",
    category: "Engineering",
    fundingGoal: 4500,
    currentFunding: 4050,
    status: "active",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Neural Network Visualization Tool",
    description: "Creating an interactive tool to help students understand how neural networks function",
    category: "Computer Science",
    fundingGoal: 6000,
    currentFunding: 2400,
    status: "active",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Climate Change Data Analysis Workshop",
    description: "Developing a workshop series teaching students to analyze climate data",
    category: "Environmental Science",
    fundingGoal: 3500,
    currentFunding: 3500,
    status: "completed",
    image: "https://images.unsplash.com/photo-1564038057903-1d48b852d612?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Genetic Engineering Ethics Course",
    description: "Creating a comprehensive course on the ethical implications of genetic engineering",
    category: "Biology",
    fundingGoal: 5500,
    currentFunding: 1200,
    status: "active",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    title: "Astronomy Observation Network",
    description: "Building a network of telescopes for students to conduct astronomical observations",
    category: "Astronomy",
    fundingGoal: 8000,
    currentFunding: 5600,
    status: "active",
    image: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    title: "Chemistry Lab Simulation",
    description: "Developing virtual reality simulations of chemistry experiments for remote learning",
    category: "Chemistry",
    fundingGoal: 7000,
    currentFunding: 4900,
    status: "active",
    image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
    title: "Mathematics Visualization Platform",
    description: "Creating interactive visualizations to help students understand complex mathematical concepts",
    category: "Mathematics",
    fundingGoal: 4000,
    currentFunding: 2800,
    status: "active",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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

const statuses = [
  { value: "all", label: "All Statuses" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" }
];

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "mostFunded", label: "Most Funded" },
  { value: "leastFunded", label: "Least Funded" },
  { value: "alphabetical", label: "Alphabetical" }
];

export function ProposalsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Filter proposals based on search, category, and status
  const filteredProposals = allProposals.filter(proposal => {
    const matchesSearch = proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          proposal.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || proposal.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || proposal.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sort proposals
  const sortedProposals = [...filteredProposals].sort((a, b) => {
    switch (sortBy) {
      case "mostFunded":
        return b.currentFunding - a.currentFunding;
      case "leastFunded":
        return a.currentFunding - b.currentFunding;
      case "alphabetical":
        return a.title.localeCompare(b.title);
      case "newest":
      default:
        return b.id - a.id;
    }
  });

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card rounded-lg border p-4 sticky top-20">
              <h3 className="font-medium text-lg mb-4">Filters</h3>
              
              <div className="space-y-6">
                {/* Search */}
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
                
                {/* Categories */}
                <div className="space-y-2">
                  <Label>Categories</Label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`category-${category}`} 
                          checked={selectedCategory === category}
                          onCheckedChange={() => setSelectedCategory(category)}
                        />
                        <label 
                          htmlFor={`category-${category}`}
                          className="text-sm cursor-pointer"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Status */}
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={selectedStatus} 
                    onValueChange={setSelectedStatus}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Sort By */}
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
              </div>
            </div>
          </div>
          
          {/* Proposals Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-muted-foreground">
                Showing {sortedProposals.length} proposals
              </p>
              <Button variant="outline" asChild>
                <Link href="/proposals/create">Create Proposal</Link>
              </Button>
            </div>
            
            {sortedProposals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedProposals.map((proposal, index) => (
                  <motion.div
                    key={proposal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <Card className="h-full flex flex-col overflow-hidden">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={proposal.image} 
                          alt={proposal.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <Badge 
                          className="absolute top-3 right-3" 
                          variant={proposal.status === "active" ? "default" : "secondary"}
                        >
                          {proposal.status === "active" ? "Active" : "Completed"}
                        </Badge>
                      </div>
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{proposal.category}</Badge>
                        </div>
                        <CardTitle>{proposal.title}</CardTitle>
                        <CardDescription>{proposal.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
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
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Raised: ${proposal.currentFunding}</span>
                            <span>Goal: ${proposal.fundingGoal}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full">
                          <Link href={`/proposals/${proposal.id}`}>View Details</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted/50 rounded-lg">
                <h3 className="text-xl font-medium mb-2">No proposals found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Categories");
                  setSelectedStatus("all");
                }}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}