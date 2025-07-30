const tierOrder = { free: 1, silver: 2, gold: 3, platinum: 4 };

export default function EventCard({ event, userTier }: { event: any; userTier: string }) {
  const isLocked = tierOrder[event.tier] > tierOrder[userTier];

  const badgeColor = {
    free: 'bg-green-500',
    silver: 'bg-gray-400',
    gold: 'bg-yellow-400',
    platinum: 'bg-purple-500',
  }[event.tier];

  return (
    <div className={\`bg-gray-800 rounded-xl shadow-lg overflow-hidden \${isLocked && 'opacity-60'}\`}>
      <img src={event.image_url} alt={event.title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-bold">{event.title}</h2>
        <p className="text-sm text-gray-300">{event.description}</p>
        <p className="text-sm mt-2">{new Date(event.event_date).toDateString()}</p>
        <span className={\`inline-block mt-2 px-2 py-1 rounded text-xs text-white \${badgeColor}\`}>
          {event.tier.toUpperCase()}
        </span>

        {isLocked && (
          <p className="mt-2 text-red-400 text-sm">
            Upgrade to {event.tier} to access this event
          </p>
        )}
      </div>
    </div>
  );
}
