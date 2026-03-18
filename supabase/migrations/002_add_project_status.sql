ALTER TABLE projects
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'active'
CHECK (status IN ('active', 'in_development', 'planned'));
