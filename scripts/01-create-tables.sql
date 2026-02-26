-- Create formations table
CREATE TABLE IF NOT EXISTS formations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  image_url TEXT,
  price INTEGER NOT NULL, -- in cents
  duration TEXT, -- e.g., "4 weeks", "8 hours"
  level TEXT, -- beginner, intermediate, advanced
  modules INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create access_codes table for Stripe checkout completion
CREATE TABLE IF NOT EXISTS access_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  formation_id UUID NOT NULL REFERENCES formations(id) ON DELETE CASCADE,
  used BOOLEAN DEFAULT FALSE,
  used_by_email TEXT,
  used_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP DEFAULT NOW() + INTERVAL '1 year'
);

-- Create user_formations table to track who has access
CREATE TABLE IF NOT EXISTS user_formations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  formation_id UUID NOT NULL REFERENCES formations(id) ON DELETE CASCADE,
  access_code_id UUID REFERENCES access_codes(id) ON DELETE SET NULL,
  stripe_payment_intent_id TEXT,
  activated_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(email, formation_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_access_codes_formation_id ON access_codes(formation_id);
CREATE INDEX IF NOT EXISTS idx_access_codes_code ON access_codes(code);
CREATE INDEX IF NOT EXISTS idx_access_codes_used ON access_codes(used);
CREATE INDEX IF NOT EXISTS idx_user_formations_email ON user_formations(email);
CREATE INDEX IF NOT EXISTS idx_user_formations_formation_id ON user_formations(formation_id);
CREATE INDEX IF NOT EXISTS idx_user_formations_access_code_id ON user_formations(access_code_id);

-- Insert sample formations
INSERT INTO formations (title, description, long_description, price, duration, level, modules) VALUES
('Lash Extension Fundamentals', 'Master the basics of professional lash extensions', 'Learn essential techniques, safety protocols, and client care. This foundational course teaches you everything needed to start your lash extension journey.', 29900, '4 weeks', 'beginner', 8),
('Advanced Volume Techniques', 'Perfect your volume and mega volume lash skills', 'Take your skills to the next level with advanced styling, precision placement, and advanced fan creation techniques.', 49900, '6 weeks', 'intermediate', 12),
('Business & Growth Mastery', 'Build and scale your lash business', 'Learn pricing strategies, client retention, marketing, and business operations to transform your lash business.', 39900, '5 weeks', 'intermediate', 10),
('Lash Artist Pro Certification', 'Complete professional certification program', 'Our most comprehensive program covering all aspects of professional lash artistry, business, and client management.', 79900, '12 weeks', 'advanced', 24)
ON CONFLICT DO NOTHING;
