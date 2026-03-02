-- =============================================
-- Formation Access Tokens & Video Progress
-- =============================================

-- Tokens d'accès sécurisés générés après achat
CREATE TABLE IF NOT EXISTS formation_access_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  access_token TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  formation_id TEXT NOT NULL,
  stripe_session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '1 year',
  last_accessed_at TIMESTAMP WITH TIME ZONE
);

-- Index pour recherche rapide par token
CREATE INDEX IF NOT EXISTS idx_fat_access_token ON formation_access_tokens(access_token);
CREATE INDEX IF NOT EXISTS idx_fat_email ON formation_access_tokens(email);

-- Progression des vidéos par utilisateur
CREATE TABLE IF NOT EXISTS video_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  access_token_id UUID NOT NULL REFERENCES formation_access_tokens(id) ON DELETE CASCADE,
  video_filename TEXT NOT NULL,
  watched_seconds INTEGER DEFAULT 0,
  total_seconds INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  last_watched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(access_token_id, video_filename)
);

-- Index pour recherche rapide
CREATE INDEX IF NOT EXISTS idx_vp_access_token_id ON video_progress(access_token_id);

-- =============================================
-- Row Level Security (RLS)
-- =============================================

ALTER TABLE formation_access_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_progress ENABLE ROW LEVEL SECURITY;

-- Politique pour formation_access_tokens (lecture publique par token)
CREATE POLICY "Allow read by token" ON formation_access_tokens
  FOR SELECT USING (true);

CREATE POLICY "Allow insert from server" ON formation_access_tokens
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update from server" ON formation_access_tokens
  FOR UPDATE USING (true);

-- Politique pour video_progress
CREATE POLICY "Allow all for video_progress" ON video_progress
  FOR ALL USING (true);
