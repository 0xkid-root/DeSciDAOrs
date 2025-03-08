"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AtomIcon, BookOpen, Users, Lightbulb, GraduationCap, FileText, Vote, Coins } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const teamMembers = [
  {
    name: "Dr. Elena Rodriguez",
    role: "Founder & Lead Scientist",
    bio: "Elena has a PhD in Quantum Physics and has been working on decentralized science initiatives for over 5 years.",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    name: "Michael Chen",
    role: "Education Director",
    bio: "Michael has 10+ years of experience in educational technology and curriculum development.",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    name: "Dr. Sarah Johnson",
    role: "Research Coordinator",
    bio: "Sarah specializes in coordinating interdisciplinary research projects and has published extensively on open science.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    name: "James Wilson",
    role: "Technology Lead",
    bio: "James is a blockchain developer with expertise in DAO governance systems and decentralized applications.",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg"
  }
];

const faqItems = [
  {
    question: "What is DeSci Learning DAO?",
    answer: "DeSci Learning DAO is a decentralized autonomous organization focused on funding and supporting educational experiments and research topics proposed by students and educators. We use blockchain technology to enable transparent governance and funding allocation."
  },
  {
    question: "How does the proposal process work?",
    answer: "Anyone can submit a proposal for an educational experiment or research project. Proposals are reviewed and voted on by DAO members using governance tokens. If approved, proposals receive funding from the DAO treasury to carry out their work."
  },
  {
    question: "How do I join the DAO?",
    answer: "To join the DAO, you need to connect your Web3 wallet and acquire governance tokens. These tokens give you voting rights on proposals and allow you to participate in the governance of the organization."
  },
  {
    question: "What types of proposals are eligible for funding?",
    answer: "We fund educational experiments and research topics across various disciplines, including but not limited to science, technology, engineering, mathematics, humanities, and social sciences. Proposals should have clear educational value and contribute to open knowledge."
  },
  {
    question: "How are funds distributed to approved proposals?",
    answer: "Funds are distributed through smart contracts based on predefined milestones. This ensures that projects make progress and deliver on their promises before receiving the full funding amount."
  },
  {
    question: "What happens after a funded project is completed?",
    answer: "Completed projects are required to publish their results, methodologies, and learning materials on our platform. This creates an open repository of educational resources that benefits the entire community."
  }
];

const governanceStructure = [
  {
    title: "Token-Based Voting",
    description: "Governance decisions are made through token-weighted voting. Each token represents one vote, allowing token holders to have a say proportional to their stake in the DAO.",
    icon: <Vote className="h-10 w-10 text-primary" />
  },
  {
    title: "Proposal System",
    description: "Any member can submit proposals for funding, governance changes, or new initiatives. Proposals go through a standardized review and voting process.",
    icon: <FileText className="h-10 w-10 text-primary" />
  },
  {
    title: "Treasury Management",
    description: "The DAO treasury is managed transparently on-chain, with all fund allocations requiring community approval through voting.",
    icon: <Coins className="h-10 w-10 text-primary" />
  },
  {
    title: "Working Groups",
    description: "Specialized working groups focus on different aspects of the DAO, including research review, education, outreach, and technical development.",
    icon: <Users className="h-10 w-10 text-primary" />
  }
];

export function AboutContent() {
  return (
    <div className="py-12">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">About DeSci Learning DAO</h1>
          <p className="text-xl text-muted-foreground">
            Revolutionizing education and research through decentralized governance
          </p>
        </div>
        
        <Tabs defaultValue="mission" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="mission">Mission</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="governance">Governance</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          
          {/* Mission Tab */}
          <TabsContent value="mission" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
                <CardDescription>
                  Empowering decentralized education and research
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose max-w-none">
                  <p>
                    DeSci Learning DAO is dedicated to revolutionizing how educational experiments and research are funded, conducted, and shared. We believe that by decentralizing these processes, we can create more inclusive, transparent, and innovative approaches to knowledge creation and dissemination.
                  </p>
                  
                  <p>
                    Our mission is to build a community-driven platform where students, educators, and researchers can propose, fund, and collaborate on educational experiments and research topics that might not find support through traditional channels.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center text-center p-6 bg-muted/50 rounded-lg"
                  >
                    <BookOpen className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-medium mb-2">Open Education</h3>
                    <p className="text-muted-foreground">
                      Making educational resources and methodologies accessible to all, regardless of institutional affiliation.
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-col items-center text-center p-6 bg-muted/50 rounded-lg"
                  >
                    <Lightbulb className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-medium mb-2">Innovation</h3>
                    <p className="text-muted-foreground">
                      Supporting novel approaches to education and research that challenge conventional wisdom.
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col items-center text-center p-6 bg-muted/50 rounded-lg"
                  >
                    <Users className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-medium mb-2">Community Governance</h3>
                    <p className="text-muted-foreground">
                      Ensuring that decisions about funding and priorities are made collectively by the community.
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col items-center text-center p-6 bg-muted/50 rounded-lg"
                  >
                    <GraduationCap className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-medium mb-2">Educational Impact</h3>
                    <p className="text-muted-foreground">
                      Focusing on projects that have meaningful educational outcomes and can scale to benefit many learners.
                    </p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Team Tab */}
          <TabsContent value="team" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Our Team</CardTitle>
                <CardDescription>
                  Meet the people behind DeSci Learning DAO
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {teamMembers.map((member, index) => (
                    <motion.div
                      key={member.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex flex-col items-center text-center p-6 bg-muted/50 rounded-lg"
                    >
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <h3 className="text-xl font-medium">{member.name}</h3>
                      <p className="text-primary font-medium mb-2">{member.role}</p>
                      <p className="text-muted-foreground">{member.bio}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Governance Tab */}
          <TabsContent value="governance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Governance Structure</CardTitle>
                <CardDescription>
                  How decisions are made in our decentralized organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose max-w-none">
                  <p>
                    DeSci Learning DAO operates on principles of transparent, decentralized governance. All major decisions, including funding allocations, protocol upgrades, and strategic initiatives, are decided through community voting.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  {governanceStructure.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex flex-col p-6 bg-muted/50 rounded-lg"
                    >
                      <div className="mb-4">{item.icon}</div>
                      <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
                
                <div className="bg-muted/30 p-6 rounded-lg mt-8">
                  <h3 className="text-xl font-medium mb-4">Governance Token</h3>
                  <p className="mb-4">
                    The LEARN token is the governance token of DeSci Learning DAO. Token holders can:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Vote on funding proposals</li>
                    <li>Submit new proposals</li>
                    <li>Participate in governance decisions</li>
                    <li>Earn rewards for active participation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* FAQ Tab */}
          <TabsContent value="faq" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Common questions about DeSci Learning DAO
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}