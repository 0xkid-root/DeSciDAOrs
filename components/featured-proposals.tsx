"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

// Mock data for featured proposals
const featuredProposals = [
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
  }
];

export function FeaturedProposals() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };
  
  const progressVariants = {
    hidden: { width: 0 },
    visible: (value: number) => ({
      width: `${value}%`,
      transition: { 
        duration: 1.5, 
        ease: "easeOut",
        delay: 0.5
      }
    })
  };

  return (
    <section ref={ref} className="py-16 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div 
          className="flex flex-col items-center justify-center text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4 relative">
            Featured Proposals
            <motion.span 
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: "50%" } : { width: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            />
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Discover the latest educational experiments and research topics proposed by our community
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {featuredProposals.map((proposal, index) => (
            <motion.div
              key={proposal.id}
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                transition: { duration: 0.3 },
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="h-full"
            >
              <Card className="h-full flex flex-col overflow-hidden border-2 hover:border-primary/50 transition-colors duration-300">
                <div className="relative h-48 overflow-hidden">
                  <motion.img 
                    src={proposal.image} 
                    alt={proposal.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <Badge 
                    className="absolute top-3 right-3" 
                    variant={proposal.status === "active" ? "default" : "secondary"}
                  >
                    {proposal.status === "active" ? "Active" : "Closed"}
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
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-primary rounded-full"
                        custom={(proposal.currentFunding / proposal.fundingGoal) * 100}
                        variants={progressVariants}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Raised: ${proposal.currentFunding}</span>
                      <span>Goal: ${proposal.fundingGoal}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full relative overflow-hidden group">
                    <Link href={`/proposals/${proposal.id}`}>
                      <span className="relative z-10">View Details</span>
                      <motion.span 
                        className="absolute inset-0 bg-primary-foreground/10"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <Button asChild variant="outline" size="lg" className="group">
            <Link href="/proposals" className="flex items-center">
              View All Proposals
              <motion.span 
                className="ml-2"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                →
              </motion.span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}