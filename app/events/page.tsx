'use client';
import { useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase';
import EventCard from '@/components/EventCard';

const tierOrder: Record<string, number> = {
  free: 1,
  silver: 2,
  gold: 3,
  platinum: 4,
};

const tiers = ['free', 'silver', 'gold', 'platinum'];

export default function EventsPage() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isSignedIn) return;
    const fetchEvents = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('events').select('*');
      if (error) setError('Error loading events');
      else setEvents(data || []);
      setLoading(false);
    };
    fetchEvents();
  }, [isSignedIn]);

  if (!isSignedIn) return <div className="p-6 text-center">Please sign in to view events.</div>;
  if (loading) return <div className="p-6 text-center">Loading events...</div>;
  if (error) return <div className="p-6 text-center text-red-400">{error}</div>;

  const userTier = (user?.publicMetadata?.tier as string) || 'free';
  const currentTierIndex = tiers.indexOf(userTier);

  const handleUpgrade = async () => {
    if (!user) return;
    const nextTier = tiers[Math.min(currentTierIndex + 1, tiers.length - 1)];
    await user.update({ publicMetadata: { tier: nextTier } });
    window.location.reload();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Your Tier: {userTier.toUpperCase()}</h1>
        {currentTierIndex < tiers.length - 1 && (
          <button
            onClick={handleUpgrade}
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition"
          >
            Upgrade to {tiers[currentTierIndex + 1].toUpperCase()}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} userTier={userTier} />
        ))}
      </div>
    </div>
  );
}
