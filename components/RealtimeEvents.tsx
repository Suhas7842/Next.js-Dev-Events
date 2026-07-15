"use client";

import { useRealtimeEvents } from '@/hooks/useRealtimeEvents';
import EventCard from './EventCard';
import type { IEvent } from '@/database';

interface RealtimeEventsProps {
  initialEvents: IEvent[];
}

/**
 * Real-time events component with SSE updates
 * Falls back to initial events if connection fails
 */
export default function RealtimeEvents({ initialEvents }: RealtimeEventsProps) {
  const { events, isConnected, error } = useRealtimeEvents();

  // Use real-time events if connected, otherwise fall back to initial
  const displayEvents = isConnected && events.length > 0 ? events : initialEvents;

  return (
    <div className="mt-20" id="events">
      <div className="flex items-center justify-between mb-8">
        <h3>Explore Events</h3>
        {isConnected && (
          <span className="flex items-center gap-2 text-sm text-green-600">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            Live Updates
          </span>
        )}
      </div>

      <div className="events">
        {error && !isConnected && (
          <p className="text-center text-yellow-600 mb-4 text-sm">
            {error} (Showing cached events)
          </p>
        )}
        {displayEvents.length > 0 ? (
          displayEvents.map((event: IEvent, index: number) => (
            <EventCard key={event._id?.toString() || event.slug} {...event} priority={index === 0} />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">No events available at the moment.</p>
        )}
      </div>
    </div>
  );
}
