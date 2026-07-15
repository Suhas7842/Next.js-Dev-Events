"use client";

import { useState, useEffect } from 'react';
import type { IEvent } from '@/database';

interface SSEMessage {
  type: 'connected' | 'events' | 'error';
  data?: IEvent[];
  message?: string;
}

/**
 * Custom hook for real-time event updates via Server-Sent Events
 *
 * @returns {Object} - { events, isConnected, error }
 */
export function useRealtimeEvents() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let eventSource: EventSource | null = null;

    const connectSSE = () => {
      try {
        eventSource = new EventSource('/api/events/stream');

        eventSource.onopen = () => {
          console.log('✅ SSE Connected');
          setIsConnected(true);
          setError(null);
        };

        eventSource.onmessage = (event) => {
          try {
            const message: SSEMessage = JSON.parse(event.data);

            if (message.type === 'connected') {
              console.log('✅ Server confirmed connection');
            } else if (message.type === 'events' && message.data) {
              setEvents(message.data);
            } else if (message.type === 'error') {
              setError(message.message || 'Unknown error');
            }
          } catch (err) {
            console.error('Error parsing SSE message:', err);
          }
        };

        eventSource.onerror = (err) => {
          console.error('❌ SSE Error:', err);
          setIsConnected(false);
          setError('Connection lost. Reconnecting...');

          // Cleanup and reconnect after 3 seconds
          if (eventSource) {
            eventSource.close();
          }
          setTimeout(connectSSE, 3000);
        };
      } catch (err) {
        console.error('Failed to create EventSource:', err);
        setError('Failed to establish connection');
      }
    };

    // Initial connection
    connectSSE();

    // Cleanup on unmount
    return () => {
      if (eventSource) {
        console.log('🔌 Closing SSE connection');
        eventSource.close();
      }
    };
  }, []);

  return { events, isConnected, error };
}
