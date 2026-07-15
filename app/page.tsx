import ExploreBtn from '@/components/ExploreBtn';
import RealtimeEvents from '@/components/RealtimeEvents';
import { IEvent } from '@/database/event.model';
import connectToDatabase from '@/lib/mongodb';
import Event from '@/database/event.model';

const Page = async() => {
  let events: IEvent[] = [];

  try {
    await connectToDatabase();
    const rawEvents = await Event.find().sort({ createdAt: -1 }).lean();
    // Serialize MongoDB ObjectIds to strings for client components
    events = JSON.parse(JSON.stringify(rawEvents));
  } catch (err) {
    console.error('Error fetching events:', err);
  }

  return (
    <section>
      <h1 className="text-center">Welcome to the Dev Event Hub</h1>
      <p className="text-center mt-5">Discover the latest hackathons, meetups, and conferences in the developer community.</p>
      <ExploreBtn />
      <RealtimeEvents initialEvents={events} />
    </section>
  );
}

export default Page;