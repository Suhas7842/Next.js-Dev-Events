import { NextRequest } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Event from "@/database/event.model";

/**
 * Server-Sent Events (SSE) endpoint for real-time event updates
 * GET /api/events/stream
 */
export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      // Send initial connection message
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'connected' })}\n\n`));

      // Function to send events
      const sendEvents = async () => {
        try {
          await connectToDatabase();
          const events = await Event.find().sort({ createdAt: -1 }).lean();
          const serializedEvents = JSON.parse(JSON.stringify(events));

          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: 'events', data: serializedEvents })}\n\n`)
          );
        } catch (error) {
          console.error('Error fetching events for SSE:', error);
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: 'error', message: 'Failed to fetch events' })}\n\n`)
          );
        }
      };

      // Send initial events
      await sendEvents();

      // Poll for updates every 5 seconds
      const interval = setInterval(sendEvents, 5000);

      // Cleanup on connection close
      request.signal.addEventListener('abort', () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
