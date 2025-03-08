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

export default function InstitutionDashboard() {
  const { hasPermission, loading } = useRBAC("user_id"); // Replace with actual user ID
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !hasPermission('manage_institution')) {
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
            <h1 className="text-4xl font-bold tracking-tight mb-4">Institution Dashboard</h1>
            <p className="text-xl text-muted-foreground">
              Manage your institution's profile and researchers
            </p>
          </div>
        </div>
        
        <div className="container py-12 px-4 md:px-6">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="researchers">Researchers</TabsTrigger>
              <TabsTrigger value="proposals">Proposals</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Institution Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Institution overview content */}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Researchers Tab */}
            <TabsContent value="researchers">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Researchers</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Researcher management interface */}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Proposals Tab */}
            <TabsContent value="proposals">
              <Card>
                <CardHeader>
                  <CardTitle>Institution Proposals</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Proposals list and management */}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Institution Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Institution settings interface */}
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