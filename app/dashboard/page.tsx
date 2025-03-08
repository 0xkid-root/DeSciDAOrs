"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUpRight, Wallet, Vote, FileText, Users, Bell } from "lucide-react";
import Link from "next/link";

// Mock data for user dashboard
const userStats = {
  tokenBalance: 120,
  proposalsVoted: 8,
  proposalsCreated: 2,
  reputation: 450
};

const userProposals = [
  {
    id: 10,
    title: "AI Ethics Curriculum for High Schools",
    description: "Developing a comprehensive curriculum on AI ethics for high school students",
    category: "Computer Science",
    fundingGoal: 4500,
    currentFunding: 2700,
    status: "active",
    votesFor: 45,
    votesAgainst: 5,
    createdAt: "2025-02-10"
  },
  {
    id: 11,
    title: "Sustainable Agriculture Workshop",
    description: "Creating hands-on workshops for students to learn sustainable farming practices",
    category: "Environmental Science",
    fundingGoal: 3000,
    currentFunding: 3000,
    status: "completed",
    votesFor: 62,
    votesAgainst: 3,
    createdAt: "2024-11-05"
  }
];

const votingHistory = [
  {
    id: 1,
    title: "Quantum Computing Educational Platform",
    voteType: "for",
    date: "2025-03-18"
  },
  {
    id: 3,
    title: "Renewable Energy Workshop Series",
    voteType: "for",
    date: "2025-03-15"
  },
  {
    id: 6,
    title: "Genetic Engineering Ethics Course",
    voteType: "against",
    date: "2025-03-10"
  },
  {
    id: 2,
    title: "Biodiversity Mapping Initiative",
    voteType: "for",
    date: "2025-03-05"
  },
  {
    id: 7,
    title: "Astronomy Observation Network",
    voteType: "for",
    date: "2025-02-28"
  }
];

const activityData = [
  { month: 'Jan', votes: 3, proposals: 0, reputation: 30 },
  { month: 'Feb', votes: 5, proposals: 1, reputation: 80 },
  { month: 'Mar', votes: 8, proposals: 2, reputation: 120 },
  { month: 'Apr', votes: 12, proposals: 2, reputation: 150 },
  { month: 'May', votes: 15, proposals: 3, reputation: 200 },
  { month: 'Jun', votes: 20, proposals: 3, reputation: 250 },
];

const notifications = [
  {
    id: 1,
    title: "Your proposal was funded!",
    description: "AI Ethics Curriculum for High Schools has reached 60% of its funding goal.",
    time: "2 hours ago",
    read: false
  },
  {
    id: 2,
    title: "New vote on your proposal",
    description: "Someone voted on your AI Ethics Curriculum proposal.",
    time: "5 hours ago",
    read: false
  },
  {
    id: 3,
    title: "Governance vote reminder",
    description: "Don't forget to vote on the treasury allocation proposal before it closes.",
    time: "1 day ago",
    read: true
  },
  {
    id: 4,
    title: "Proposal completed",
    description: "Sustainable Agriculture Workshop has been marked as completed.",
    time: "3 days ago",
    read: true
  }
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <div className="bg-muted/50 py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-4xl font-bold tracking-tight mb-2">Dashboard</h1>
                <p className="text-xl text-muted-foreground">
                  Manage your proposals, votes, and DAO participation
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="px-3 py-1 text-sm">
                  <Wallet className="h-3.5 w-3.5 mr-1" />
                  {userStats.tokenBalance} LEARN Tokens
                </Badge>
                <Button size="sm">
                  Get More Tokens
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container py-12 px-4 md:px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid grid-cols-4 md:w-[400px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="proposals">Proposals</TabsTrigger>
              <TabsTrigger value="voting">Voting</TabsTrigger>
              <TabsTrigger value="notifications">
                Notifications
                <Badge className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  2
                </Badge>
              </TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Token Balance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">{userStats.tokenBalance}</div>
                      <Wallet className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Available for voting and governance
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Proposals Voted</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">{userStats.proposalsVoted}</div>
                      <Vote className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Total votes cast on proposals
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Proposals Created</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">{userStats.proposalsCreated}</div>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Your submitted proposals
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Reputation Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">{userStats.reputation}</div>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Based on your DAO participation
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Activity Overview</CardTitle>
                    <CardDescription>
                      Your participation in the DAO over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={activityData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="votes" fill="hsl(var(--chart-1))" name="Votes Cast" />
                          <Bar dataKey="proposals" fill="hsl(var(--chart-2))" name="Proposals Created" />
                          <Bar dataKey="reputation" fill="hsl(var(--chart-3))" name="Reputation Gained" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Your latest actions in the DAO
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {votingHistory.slice(0, 3).map((vote) => (
                        <div key={vote.id} className="flex items-start space-x-3">
                          <div className={`mt-0.5 h-2 w-2 rounded-full ${vote.voteType === 'for' ? 'bg-primary' : 'bg-destructive'}`} />
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">
                              Voted {vote.voteType} {vote.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {vote.date}
                            </p>
                          </div>
                        </div>
                      ))}
                      
                      {userProposals.slice(0, 1).map((proposal) => (
                        <div key={proposal.id} className="flex items-start space-x-3">
                          <div className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">
                              Created proposal: {proposal.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {proposal.createdAt}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="link" className="mt-4 p-0 h-auto" asChild>
                      <Link href="#" className="flex items-center text-sm">
                        View all activity
                        <ArrowUpRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Proposals Tab */}
            <TabsContent value="proposals" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Your Proposals</h2>
                <Button asChild>
                  <Link href="/proposals/create">Create New Proposal</Link>
                </Button>
              </div>
              
              {userProposals.length > 0 ? (
                <div className="space-y-6">
                  {userProposals.map((proposal) => (
                    <Card key={proposal.id}>
                      <div className="md:flex">
                        <div className="md:w-2/3 p-6">
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{proposal.category}</Badge>
                              <Badge 
                                variant={proposal.status === "active" ? "default" : "secondary"}
                              >
                                {proposal.status === "active" ? "Active" : "Completed"}
                              </Badge>
                            </div>
                            
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
                              <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Raised: ${proposal.currentFunding}</span>
                                <span>Goal: ${proposal.fundingGoal}</span>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Votes</span>
                                <span className="font-medium">
                                  {proposal.votesFor} For / {proposal.votesAgainst} Against
                                </span>
                              </div>
                              <Progress 
                                value={(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100} 
                                className="h-2"
                              />
                            </div>
                            
                            <div className="flex space-x-4">
                              <Button variant="outline" asChild className="flex-1">
                                <Link href={`/proposals/${proposal.id}`}>View Details</Link>
                              </Button>
                              {proposal.status === "active" && (
                                <Button asChild className="flex-1">
                                  <Link href={`/proposals/${proposal.id}/edit`}>Edit Proposal</Link>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-medium mb-2">No proposals yet</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't created any proposals yet. Start by creating your first proposal.
                  </p>
                  <Button asChild>
                    <Link href="/proposals/create">Create Proposal</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            {/* Voting Tab */}
            <TabsContent value="voting" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Your Voting History</h2>
                <Button asChild>
                  <Link href="/voting">Go to Voting Dashboard</Link>
                </Button>
              </div>
              
              {votingHistory.length > 0 ? (
                <div className="space-y-4">
                  {votingHistory.map((vote) => (
                    <Card key={vote.id} className="flex items-center p-4">
                      <div className="flex-1">
                        <h3 className="font-medium">{vote.title}</h3>
                        <p className="text-sm text-muted-foreground">Voted on {vote.date}</p>
                      </div>
                      <Badge 
                        variant={vote.voteType === "for" ? "default" : "destructive"}
                        className="ml-4"
                      >
                        Voted {vote.voteType}
                      </Badge>
                      <Button variant="ghost" size="sm" asChild className="ml-4">
                        <Link href={`/proposals/${vote.id}`}>View</Link>
                      </Button>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-medium mb-2">No voting history</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't voted on any proposals yet.
                  </p>
                  <Button asChild>
                    <Link href="/voting">Start Voting</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Notifications</h2>
                <Button variant="outline" size="sm">
                  Mark all as read
                </Button>
              </div>
              
              {notifications.length > 0 ? (
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <Card 
                      key={notification.id} 
                      className={`p-4 ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}
                    >
                      <div className="flex items-start">
                        <div className="mr-4">
                          <Bell className={`h-5 w-5 ${!notification.read ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                          <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                        </div>
                        {!notification.read && (
                          <Button variant="ghost" size="sm">
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-medium mb-2">No notifications</h3>
                  <p className="text-muted-foreground">
                    You don't have any notifications at the moment.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </main>
  );
}