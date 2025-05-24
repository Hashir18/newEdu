/*
  # Authentication Setup

  1. Security
    - Enable RLS on auth.users table
    - Add policies for user profile access
*/

-- Enable RLS on auth.users
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read their own profile
CREATE POLICY "Users can read own profile"
  ON auth.users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);