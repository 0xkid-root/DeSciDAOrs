"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRBAC } from "@/lib/rbac";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { hasPermission, loading } = useRBAC("user_id"); // Replace with actual user ID
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !hasPermission('manage_users')) {
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
            <h1 className="text-4xl font-bold tracking-tight mb-4">Admin Dashboard</h1>
            <p className="text-xl text-muted-foreground">
              Manage users, roles, and system settings
            </p>
          </div>
        </div>
        
        <div className="container py-12 px-4 md:px-6">
          <Tabs defaultValue="users" className="space-y-8">
            <TabsList>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="roles">Roles</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            {/* Users Tab */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* User management interface */}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Roles Tab */}
            <TabsContent value="roles">
              <Card>
                <CardHeader>
                  <CardTitle>Role Management</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Role management interface */}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Permissions Tab */}
            <TabsContent value="permissions">
              <Card>
                <CardHeader>
                  <CardTitle>Permission Management</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Permission management interface */}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* System settings interface */}
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