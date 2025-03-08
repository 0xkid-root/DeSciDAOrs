/*
  # RBAC Schema Setup

  1. New Tables
    - `roles`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
      - `created_at` (timestamp)
    
    - `permissions`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
      - `resource` (text)
      - `action` (text)
      - `created_at` (timestamp)
    
    - `role_permissions`
      - `role_id` (uuid, foreign key)
      - `permission_id` (uuid, foreign key)
      - `created_at` (timestamp)
    
    - `user_roles`
      - `user_id` (uuid, foreign key)
      - `role_id` (uuid, foreign key)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policies for specific roles
*/

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create permissions table
CREATE TABLE IF NOT EXISTS permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  resource text NOT NULL,
  action text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create role_permissions junction table
CREATE TABLE IF NOT EXISTS role_permissions (
  role_id uuid REFERENCES roles(id) ON DELETE CASCADE,
  permission_id uuid REFERENCES permissions(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (role_id, permission_id)
);

-- Create user_roles junction table
CREATE TABLE IF NOT EXISTS user_roles (
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id uuid REFERENCES roles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, role_id)
);

-- Enable RLS
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access to authenticated users" ON roles
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow read access to authenticated users" ON permissions
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow read access to authenticated users" ON role_permissions
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow read access to authenticated users" ON user_roles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Insert default roles
INSERT INTO roles (name, description) VALUES
  ('admin', 'Full system access'),
  ('researcher', 'Can create and manage research proposals'),
  ('reviewer', 'Can review and vote on proposals'),
  ('institution_admin', 'Can manage institution profile and researchers'),
  ('member', 'Basic member access');

-- Insert default permissions
INSERT INTO permissions (name, description, resource, action) VALUES
  ('manage_users', 'Can manage all users', 'users', 'manage'),
  ('create_proposal', 'Can create research proposals', 'proposals', 'create'),
  ('review_proposal', 'Can review proposals', 'proposals', 'review'),
  ('vote_proposal', 'Can vote on proposals', 'proposals', 'vote'),
  ('manage_institution', 'Can manage institution profile', 'institutions', 'manage'),
  ('view_analytics', 'Can view analytics dashboard', 'analytics', 'view'),
  ('manage_roles', 'Can manage roles and permissions', 'roles', 'manage');

-- Assign permissions to roles
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.name = 'admin';

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.name = 'researcher'
  AND p.name IN ('create_proposal', 'vote_proposal', 'view_analytics');

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.name = 'reviewer'
  AND p.name IN ('review_proposal', 'vote_proposal', 'view_analytics');

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.name = 'institution_admin'
  AND p.name IN ('manage_institution', 'view_analytics');

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.name = 'member'
  AND p.name IN ('vote_proposal');