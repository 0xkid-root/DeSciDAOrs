"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useRBAC } from "@/lib/rbac";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function ReviewerDashboard() {
  const { hasPermission, loading } = useRBAC("user_id"); // Replace with actual user ID
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !hasPermission('review_proposal')) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive"
      });
      router.push('/dashboard');
    }
  }, [loading, hasPermission, router, toast]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <div className="bg-muted/50 py-12">
          <div className="container px-4 md:px-6">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Reviewer Dashboard</h1>
            <p className="text-xl text-muted-foreground">
              Review and evaluate research proposals
            </p>
          </div>
        </div>
        
        <div className="container py-12 px-4 md:px-6">
          <Tabs defaultValue="pending" className="space-y-8">
            <TabsList>
              <TabsTrigger value="pending">Pending Reviews</TabsTrigger>
              <TabsTrigger value="completed">Completed Reviews</TabsTrigger>
              <TabsTrigger value="analytics">Review Analytics</TabsTrigger>
            </TabsList>
            
            {/* Pending Reviews Tab */}
            <TabsContent value="pending">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Pending reviews list */}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Completed Reviews Tab */}
            <TabsContent value="completed">
              <Card>
                <CardHeader>
                  <CardTitle>Completed Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Completed reviews list */}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Review Analytics Tab */}
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Review Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Review analytics and statistics */}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </main>
  );
}