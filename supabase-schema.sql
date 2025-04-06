-- Create tables for the MCP content system

-- Content table to store all created content
CREATE TABLE content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  content_type TEXT NOT NULL,
  metadata JSONB,
  source_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content tags for categorization
CREATE TABLE content_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_id UUID REFERENCES content(id) ON DELETE CASCADE,
  tag TEXT NOT NULL,
  UNIQUE(content_id, tag)
);

-- Analytics table to track content performance
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_id UUID REFERENCES content(id) ON DELETE CASCADE,
  views INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  revenue DECIMAL(10,2) DEFAULT 0,
  date DATE NOT NULL,
  UNIQUE(content_id, date)
);

-- Create RLS (Row Level Security) policies
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to read all content
CREATE POLICY "Allow authenticated users to read content"
  ON content FOR SELECT
  USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to insert content
CREATE POLICY "Allow authenticated users to insert content"
  ON content FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update their own content
CREATE POLICY "Allow authenticated users to update their own content"
  ON content FOR UPDATE
  USING (auth.role() = 'authenticated');
