-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tech TEXT[] NOT NULL DEFAULT '{}',
  github_url TEXT,
  demo_url TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_created ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON contact_messages(created_at DESC);

-- Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Projects: Everyone can read, only authenticated can insert/update
CREATE POLICY "Public read access for projects"
  ON projects FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated insert for projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated update for projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated delete for projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

-- Contact messages: Everyone can insert, only authenticated can read
CREATE POLICY "Public insert for contact_messages"
  ON contact_messages FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated read for contact_messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (true);

-- Sample data
INSERT INTO projects (title, description, tech, github_url, featured) VALUES
  ('Tachikoma', 'OpenClaw orchestrator agent for multi-agent coordination and automation', ARRAY['TypeScript', 'Node.js', 'OpenClaw'], 'https://github.com/Mars375/Tachikoma', true),
  ('JobFlow Assistant', 'Job search automation tool with smart matching and auto-application', ARRAY['Next.js', 'TypeScript', 'Puppeteer'], 'https://github.com/Mars375/jobflow-assistant', true)
ON CONFLICT DO NOTHING;
