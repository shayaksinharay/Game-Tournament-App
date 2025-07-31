
-- Supabase SQL Setup

create type tier_enum as enum ('free', 'silver', 'gold', 'platinum');

create table events (
  id uuid primary key default gen_random_uuid(),
  title text,
  description text,
  event_date timestamp,
  image_url text,
  tier tier_enum
);

insert into events (title, description, event_date, image_url, tier) values
('Free Match 1', 'A fun free-for-all beginner match.', now() + interval '1 day', 'https://via.placeholder.com/300', 'free'),
('Free Match 2', 'Second free event to enjoy.', now() + interval '2 days', 'https://via.placeholder.com/300', 'free'),
('Silver Duel 1', 'Silver-tier team showdown.', now() + interval '3 days', 'https://via.placeholder.com/300', 'silver'),
('Silver Duel 2', 'Silver-level strategy test.', now() + interval '4 days', 'https://via.placeholder.com/300', 'silver'),
('Gold Arena 1', 'Competitive gold tournament.', now() + interval '5 days', 'https://via.placeholder.com/300', 'gold'),
('Gold Arena 2', 'Gold battle for glory.', now() + interval '6 days', 'https://via.placeholder.com/300', 'gold'),
('Platinum War 1', 'Elite platinum championship.', now() + interval '7 days', 'https://via.placeholder.com/300', 'platinum'),
('Platinum War 2', 'Only for top-tier players.', now() + interval '8 days', 'https://via.placeholder.com/300', 'platinum');

-- RLS policies (basic structure)
alter table events enable row level security;

create policy "Users can see events at or below their tier"
on events for select
using (
  auth.jwt() -> 'metadata' ->> 'tier' in ('free', 'silver', 'gold', 'platinum') and
  tier <= (auth.jwt() ->> 'metadata' ->> 'tier')::tier_enum
);
