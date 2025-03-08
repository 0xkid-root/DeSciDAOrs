"use client";

import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Role = {
  id: string;
  name: string;
  description: string;
};

export type Permission = {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
};

// export async function getUserRoles(userId: string): Promise<Role[]> {
//   const { data, error } = await supabase
//     .from('user_roles')
//     .select(`
//       role_id,
//       roles (
//         id,
//         name,
//         description
//       )
//     `)
//     .eq('user_id', userId);

//   if (error) throw error;
//   return data?.map(item => item.roles) || [];
// }

export async function getUserRoles(userId: string): Promise<Role[]> {
  const { data, error } = await supabase
    .from('user_roles')
    .select(`
      role_id,
      roles (
        id,
        name,
        description
      )
    `)
    .eq('user_id', userId);

  if (error) throw error;
  
  return data?.map(item => item.roles).flat() || [];
}


export async function getUserPermissions(userId: string): Promise<Permission[]> {
  const { data: roles, error: rolesError } = await supabase
    .from('user_roles')
    .select('role_id')
    .eq('user_id', userId);

  if (rolesError) throw rolesError;
  if (!roles) return [];

  const roleIds = roles.map(r => r.role_id);

  const { data: permissions, error: permissionsError } = await supabase
    .from('role_permissions')
    .select(`
      permissions (
        id,
        name,
        description,
        resource,
        action
      )
    `)
    .in('role_id', roleIds);

  if (permissionsError) throw permissionsError;

  // Flatten the array before returning
  return permissions?.map(item => item.permissions).flat() || [];
}


// export async function getUserPermissions(userId: string): Promise<Permission[]> {
//   const { data: roles, error: rolesError } = await supabase
//     .from('user_roles')
//     .select('role_id')
//     .eq('user_id', userId);

//   if (rolesError) throw rolesError;
//   if (!roles) return [];

//   const roleIds = roles.map(r => r.role_id);

//   const { data: permissions, error: permissionsError } = await supabase
//     .from('role_permissions')
//     .select(`
//       permissions (
//         id,
//         name,
//         description,
//         resource,
//         action
//       )
//     `)
//     .in('role_id', roleIds);

//   if (permissionsError) throw permissionsError;
//   return permissions?.map(item => item.permissions) || [];
// }

export async function hasPermission(userId: string, permissionName: string): Promise<boolean> {
  try {
    const permissions = await getUserPermissions(userId);
    return permissions.some(p => p.name === permissionName);
  } catch (error) {
    console.error('Error checking permission:', error);
    return false;
  }
}

export function useRBAC(userId: string | null) {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadRBAC() {
      if (!userId) {
        setRoles([]);
        setPermissions([]);
        setLoading(false);
        return;
      }

      try {
        const [userRoles, userPermissions] = await Promise.all([
          getUserRoles(userId),
          getUserPermissions(userId)
        ]);
        setRoles(userRoles);
        setPermissions(userPermissions);
        setError(null);
      } catch (err) {
        console.error('Error loading RBAC:', err);
        setError(err instanceof Error ? err : new Error('Failed to load RBAC'));
      } finally {
        setLoading(false);
      }
    }

    loadRBAC();
  }, [userId]);

  return {
    roles,
    permissions,
    loading,
    error,
    hasPermission: (permissionName: string) => 
      permissions.some(p => p.name === permissionName)
  };
}