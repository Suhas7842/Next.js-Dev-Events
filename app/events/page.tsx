import RealtimeEvents from '@/components/RealtimeEvents';
import type { IEvent } from '@/database';
import connectToDatabase from '@/lib/mongodb';
import Event from '@/database/event.model';
import { Suspense } from 'react';

async function EventsData() {
  let events: IEvent[] = [];

  try {
    await connectToDatabase();
    const rawEvents = await Event.find().sort({ createdAt: -1 }).lean();
    events = JSON.parse(JSON.stringify(rawEvents));
  } catch (err) {
    console.error('Error fetching events:', err);
  }

  return <RealtimeEvents initialEvents={events} />;
}

const EventsPage = () => {
  return (
    <section>
      <div className="header">
        <h1>All Events</h1>
        <p className="mt-2">Browse all upcoming developer events, conferences, and meetups.</p>
      </div>

      <div className="mt-10">
        <Suspense fallback={<p className="text-center text-gray-500 mt-10">Loading live events...</p>}>
          <EventsData />
        </Suspense>
      </div>
    </section>
  );
};

export default EventsPage;

export const metadata = {
  title: 'All Events | Dev Event Hub',
  description: 'Browse all upcoming developer events, conferences, hackathons, and meetups.',
};
