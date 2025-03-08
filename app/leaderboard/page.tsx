"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText, Users } from "lucide-react";


import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Star, Award, TrendingUp } from "lucide-react";

// Mock data for leaderboard
const researchers = [
  {
    id: 1,
    name: "Dr. Elena Rodriguez",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    institution: "MIT",
    score: 2850,
    contributions: 45,
    proposals: 12,
    reputation: 95,
    badges: ["Top Contributor", "Innovation Leader", "Community Mentor"]
  },
  {
    id: 2,
    name: "Prof. James Wilson",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    institution: "Stanford University",
    score: 2650,
    contributions: 38,
    proposals: 8,
    reputation: 92,
    badges: ["Research Pioneer", "Grant Winner", "Peer Reviewer"]
  },
  // Add more researchers...
];

const institutions = [
  {
    id: 1,
    name: "MIT",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg",
    score: 12500,
    researchers: 45,
    proposals: 28,
    successRate: 85,
    topFields: ["Quantum Computing", "AI Ethics", "Biotechnology"]
  },
  {
    id: 2,
    name: "Stanford University",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Stanford_University_logo.svg",
    score: 11800,
    researchers: 42,
    proposals: 25,
    successRate: 82,
    topFields: ["Neuroscience", "Climate Science", "Robotics"]
  },
  // Add more institutions...
];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("researchers");

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <div className="bg-muted/50 py-12">
          <div className="container px-4 md:px-6">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Leaderboard</h1>
            <p className="text-xl text-muted-foreground">
              Celebrating top contributors and institutions in decentralized science
            </p>
          </div>
        </div>
        
        <div className="container py-12 px-4 md:px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
              <TabsTrigger value="researchers">Researchers</TabsTrigger>
              <TabsTrigger value="institutions">Institutions</TabsTrigger>
            </TabsList>
            
            {/* Researchers Tab */}
            <TabsContent value="researchers" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {researchers.map((researcher, index) => (
                  <motion.div
                    key={researcher.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="relative overflow-hidden">
                      {index < 3 && (
                        <div className={`absolute top-0 right-0 w-16 h-16 ${
                          index === 0 ? 'bg-yellow-500' : 
                          index === 1 ? 'bg-gray-300' : 
                          'bg-amber-600'
                        } transform rotate-45 translate-x-8 -translate-y-8`} />
                      )}
                      <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                          <Avatar className="h-20 w-20">
                            <AvatarImage src={researcher.avatar} alt={researcher.name} />
                            <AvatarFallback>{researcher.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </div>
                        <CardTitle className="text-xl">{researcher.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{researcher.institution}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Score</span>
                            <span className="text-2xl font-bold">{researcher.score}</span>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <p className="text-2xl font-bold">{researcher.contributions}</p>
                              <p className="text-xs text-muted-foreground">Contributions</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold">{researcher.proposals}</p>
                              <p className="text-xs text-muted-foreground">Proposals</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold">{researcher.reputation}</p>
                              <p className="text-xs text-muted-foreground">Reputation</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {researcher.badges.map((badge, badgeIndex) => (
                              <Badge key={badgeIndex} variant="secondary" className="text-xs">
                                {badge}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            {/* Institutions Tab */}
            <TabsContent value="institutions" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {institutions.map((institution, index) => (
                  <motion.div
                    key={institution.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <div className="flex items-center space-x-4">
                          <div className="h-16 w-16 relative">
                            <img 
                              src={institution.logo} 
                              alt={institution.name}
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <CardTitle>{institution.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              Rank #{index + 1}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <p className="text-sm text-muted-foreground">Total Score</p>
                              <p className="text-2xl font-bold">{institution.score}</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm text-muted-foreground">Success Rate</p>
                              <p className="text-2xl font-bold">{institution.successRate}%</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{institution.researchers} Researchers</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span>{institution.proposals} Proposals</span>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium mb-2">Top Research Fields</p>
                            <div className="flex flex-wrap gap-2">
                              {institution.topFields.map((field, fieldIndex) => (
                                <Badge key={fieldIndex} variant="outline">
                                  {field}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </main>
  );
}