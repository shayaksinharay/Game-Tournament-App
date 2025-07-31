-- Create tier enum and events table
CREATE TYPE user_tier AS ENUM ('free', 'silver', 'gold', 'platinum');

CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMP NOT NULL,
  image_url TEXT,
  tier user_tier NOT NULL
);

-- Seed sample events
INSERT INTO events (title, description, event_date, image_url, tier) VALUES
('Fortnite Casual Cup', 'Fun for beginners', now(), 'https://picsum.photos/seed/fn/400', 'free'),
('Minecraft Build Battle', 'Creative showdown', now(), 'https://picsum.photos/seed/mc/400', 'free'),
('Valorant Semi-Pro Clash', 'Medium prize pool', now(), 'https://picsum.photos/seed/vl/400', 'silver'),
('Rocket League Team Cup', '3v3 competitive', now(), 'https://picsum.photos/seed/rl/400', 'silver'),
('Call of Duty National Championship', 'Large cash prizes', now(), 'https://picsum.photos/seed/cod/400', 'gold'),
('Dota 2 Invitational', 'Elite tournament', now(), 'https://picsum.photos/seed/dota/400', 'platinum');

-- Enable RLS and add policy (JWT tier claim required)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Sample RLS policy (pseudo: requires setting tier in JWT custom claims)
CREATE POLICY "tier-based-access"
ON events
FOR SELECT
USING (
  true -- Replace with tier comparison logic if using Supabase Auth JWTs
);
