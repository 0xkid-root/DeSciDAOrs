"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { ThumbsUp, ThumbsDown, MessageSquare, Share2, Users, Calendar, FileText, Award } from "lucide-react";

// Mock data for a single proposal
const proposalData = {
  "1": {
    id: 1,
    title: "Quantum Computing Educational Platform",
    description: "Building an interactive platform to teach quantum computing principles to high school students",
    longDescription: `
      This proposal aims to develop an interactive educational platform focused on teaching quantum computing principles to high school students. The platform will bridge the gap between complex quantum concepts and accessible learning materials.
      
      The project will include:
      
      1. Interactive simulations of quantum gates and circuits
      2. Gamified learning modules with increasing complexity
      3. Visual representations of quantum phenomena
      4. Practical exercises that connect to real-world applications
      5. Assessment tools to track student progress
      
      Our team consists of quantum computing researchers, educational technology specialists, and high school science teachers, ensuring that the content is both scientifically accurate and pedagogically sound.
      
      The funding will be used for platform development, content creation, testing in pilot schools, and refinement based on feedback.
    `,
    category: "Computer Science",
    fundingGoal: 5000,
    currentFunding: 3750,
    status: "active",
    votesFor: 87,
    votesAgainst: 12,
    createdAt: "2025-03-15",
    deadline: "2025-06-15",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    team: [
      {
        name: "Dr. Sarah Chen",
        role: "Lead Researcher",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      {
        name: "Prof. Michael Rodriguez",
        role: "Educational Advisor",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        name: "Alex Johnson",
        role: "Software Developer",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg"
      }
    ],
    milestones: [
      {
        title: "Platform Design",
        description: "Complete UI/UX design and technical architecture",
        status: "completed",
        date: "April 2025"
      },
      {
        title: "Content Development",
        description: "Create educational content and interactive simulations",
        status: "in-progress",
        date: "May 2025"
      },
      {
        title: "Beta Testing",
        description: "Test with select high schools and gather feedback",
        status: "upcoming",
        date: "June 2025"
      },
      {
        title: "Public Launch",
        description: "Official release of the platform",
        status: "upcoming",
        date: "July 2025"
      }
    ],
    comments: [
      {
        id: 1,
        user: "Elena Martinez",
        avatar: "https://randomuser.me/api/portraits/women/63.jpg",
        content: "This is exactly what we need in our high school physics curriculum. The interactive approach will make quantum concepts much more accessible.",
        timestamp: "2 days ago",
        likes: 12
      },
      {
        id: 2,
        user: "David Kim",
        avatar: "https://randomuser.me/api/portraits/men/11.jpg",
        content: "Have you considered adding VR components to the platform? It could enhance the visualization of quantum states.",
        timestamp: "1 day ago",
        likes: 8
      }
    ]
  },
  "2": {
    id: 2,
    title: "Biodiversity Mapping Initiative",
    description: "Developing a citizen science app for students to map local biodiversity",
    longDescription: `
      The Biodiversity Mapping Initiative aims to create a comprehensive citizen science application that enables students to document and map local biodiversity in their communities. This project will connect students directly with nature while contributing valuable data to scientific research.
      
      Key components of the project include:
      
      1. A mobile application for species identification and documentation
      2. GPS mapping functionality to create biodiversity heat maps
      3. Educational modules on local ecosystems and conservation
      4. Data visualization tools for analyzing collected information
      5. A community platform for sharing discoveries and collaborating
      
      Our interdisciplinary team includes biologists, app developers, and environmental educators who will ensure the scientific validity and educational value of the platform.
      
      The funding will support app development, creation of species identification guides, field testing with student groups, and data management infrastructure.
    `,
    category: "Biology",
    fundingGoal: 3000,
    currentFunding: 2100,
    status: "active",
    votesFor: 65,
    votesAgainst: 8,
    createdAt: "2025-02-28",
    deadline: "2025-05-30",
    image: "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    team: [
      {
        name: "Dr. Maya Patel",
        role: "Lead Biologist",
        avatar: "https://randomuser.me/api/portraits/women/22.jpg"
      },
      {
        name: "Carlos Mendez",
        role: "App Developer",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg"
      },
      {
        name: "Emma Wilson",
        role: "Environmental Educator",
        avatar: "https://randomuser.me/api/portraits/women/33.jpg"
      }
    ],
    milestones: [
      {
        title: "App Design",
        description: "Complete UI/UX design and database architecture",
        status: "completed",
        date: "March 2025"
      },
      {
        title: "Species Database",
        description: "Compile local species database with identification guides",
        status: "in-progress",
        date: "April 2025"
      },
      {
        title: "Field Testing",
        description: "Test with student groups in various ecosystems",
        status: "upcoming",
        date: "May 2025"
      },
      {
        title: "Public Launch",
        description: "Release app to schools and community groups",
        status: "upcoming",
        date: "June 2025"
      }
    ],
    comments: [
      {
        id: 1,
        user: "James Thompson",
        avatar: "https://randomuser.me/api/portraits/men/67.jpg",
        content: "As a biology teacher, I'm excited about the potential for this app to get my students engaged with local ecosystems. Will there be curriculum resources available?",
        timestamp: "3 days ago",
        likes: 15
      },
      {
        id: 2,
        user: "Sophia Lee",
        avatar: "https://randomuser.me/api/portraits/women/54.jpg",
        content: "This is a fantastic initiative! Have you considered partnering with local conservation organizations to expand the impact?",
        timestamp: "1 day ago",
        likes: 9
      }
    ]
  }
};

export function ProposalDetails({ id }: { id: string }) {
  const [voteValue, setVoteValue] = useState(50);
  const [commentText, setCommentText] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  
  // Get proposal data based on ID
  const proposal = proposalData[id as keyof typeof proposalData];
  
  if (!proposal) {
    return (
      <div className="container py-16 px-4 md:px-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Proposal Not Found</h1>
        <p className="text-muted-foreground mb-8">The proposal you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <a href="/proposals">Back to Proposals</a>
        </Button>
      </div>
    );
  }

  const handleVoteSubmit = () => {
    // In a real implementation, this would interact with a smart contract
    setHasVoted(true);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      // In a real implementation, this would add the comment to the database
      setCommentText("");
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div 
        className="relative h-80 bg-cover bg-center"
        style={{ backgroundImage: `url(${proposal.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="container relative h-full flex items-end pb-8 px-4 md:px-6">
          <div className="max-w-3xl">
            <Badge className="mb-4">{proposal.category}</Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-2">{proposal.title}</h1>
            <p className="text-xl text-muted-foreground">{proposal.description}</p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Proposal Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Proposal Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      {proposal.longDescription.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">{paragraph}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Team Tab */}
              <TabsContent value="team" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>Meet the team behind this proposal</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {proposal.team.map((member, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center space-x-4 p-4 rounded-lg border"
                        >
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{member.name}</h3>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Milestones Tab */}
              <TabsContent value="milestones" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Milestones</CardTitle>
                    <CardDescription>Timeline and progress of the project</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {proposal.milestones.map((milestone, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="relative pl-8 pb-8 border-l last:pb-0"
                        >
                          <div className={`absolute left-0 top-0 w-4 h-4 rounded-full -translate-x-2 ${
                            milestone.status === 'completed' 
                              ? 'bg-primary' 
                              : milestone.status === 'in-progress' 
                                ? 'bg-primary/50' 
                                : 'bg-muted'
                          }`} />
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{milestone.title}</h3>
                              <Badge variant={
                                milestone.status === 'completed' 
                                  ? 'default' 
                                  : milestone.status === 'in-progress' 
                                    ? 'secondary' 
                                    : 'outline'
                              }>
                                {milestone.status === 'completed' 
                                  ? 'Completed' 
                                  : milestone.status === 'in-progress' 
                                    ? 'In Progress' 
                                    : 'Upcoming'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{milestone.description}</p>
                            <p className="text-sm text-muted-foreground">{milestone.date}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Discussion Tab */}
              <TabsContent value="discussion" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Discussion</CardTitle>
                    <CardDescription>Join the conversation about this proposal</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Comment Input */}
                      <div className="space-y-4">
                        <Textarea
                          placeholder="Share your thoughts or questions..."
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          className="min-h-[100px]"
                        />
                        <Button onClick={handleCommentSubmit}>Post Comment</Button>
                      </div>
                      
                      <Separator />
                      
                      {/* Comments List */}
                      <div className="space-y-6">
                        {proposal.comments.map((comment) => (
                          <motion.div
                            key={comment.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={comment.avatar} alt={comment.user} />
                                <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium text-sm">{comment.user}</h4>
                                <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                              </div>
                            </div>
                            <p className="text-sm pl-10">{comment.content}</p>
                            <div className="flex items-center space-x-4 pl-10">
                              <button className="text-xs text-muted-foreground hover:text-foreground flex items-center space-x-1">
                                <ThumbsUp className="h-3 w-3" />
                                <span>{comment.likes}</span>
                              </button>
                              <button className="text-xs text-muted-foreground hover:text-foreground flex items-center space-x-1">
                                <MessageSquare className="h-3 w-3" />
                                <span>Reply</span>
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Column - Funding & Voting */}
          <div className="space-y-6">
            {/* Funding Card */}
            <Card>
              <CardHeader>
                <CardTitle>Funding Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Raised</span>
                    <span className="font-medium">
                      ${proposal.currentFunding} of ${proposal.fundingGoal}
                    </span>
                  </div>
                  <Progress 
                    value={(proposal.currentFunding / proposal.fundingGoal) * 100} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{Math.round((proposal.currentFunding / proposal.fundingGoal) * 100)}% Complete</span>
                  </div>
                </div>
                
                <Button className="w-full">Fund This Proposal</Button>
              </CardContent>
            </Card>
            
            {/* Voting Card */}
            <Card>
              <CardHeader>
                <CardTitle>Voting</CardTitle>
                <CardDescription>Cast your vote on this proposal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!hasVoted ? (
                  <>
                    <div className="space-y-4">
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
                        value={[voteValue]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => setVoteValue(value[0])}
                      />
                      <div className="text-center text-sm font-medium">
                        {voteValue < 50 ? "Against" : voteValue > 50 ? "For" : "Neutral"}
                      </div>
                    </div>
                    <Button onClick={handleVoteSubmit} className="w-full">
                      Submit Vote
                    </Button>
                  </>
                ) : (
                  <div className="text-center space-y-2">
                    <div className="text-xl font-medium">Thank you for voting!</div>
                    <p className="text-sm text-muted-foreground">Your vote has been recorded.</p>
                  </div>
                )}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1 text-primary" />
                      <span>For: {proposal.votesFor}</span>
                    </div>
                    <div className="flex items-center">
                      <ThumbsDown className="h-4 w-4 mr-1 text-destructive" />
                      <span>Against: {proposal.votesAgainst}</span>
                    </div>
                  </div>
                  <Progress 
                    value={(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100} 
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>Proposal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Created on</p>
                    <p className="text-sm text-muted-foreground">{proposal.createdAt}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Deadline</p>
                    <p className="text-sm text-muted-foreground">{proposal.deadline}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Team Size</p>
                    <p className="text-sm text-muted-foreground">{proposal.team.length} members</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Category</p>
                    <p className="text-sm text-muted-foreground">{proposal.category}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Status</p>
                    <p className="text-sm text-muted-foreground capitalize">{proposal.status}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Share Card */}
            <Card>
              <CardHeader>
                <CardTitle>Share</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full flex items-center">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Proposal
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}