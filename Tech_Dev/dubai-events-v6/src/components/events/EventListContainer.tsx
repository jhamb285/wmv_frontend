'use client';

import React from 'react';
import type { Venue, HierarchicalFilterState } from '@/types';
import { useBulkEvents } from '@/hooks/useBulkEvents';
import { ExpandableCardList } from './ExpandableCardList';

interface EventListContainerProps {
  venues: Venue[];
  filters: HierarchicalFilterState;
}

const EventListContainer: React.FC<EventListContainerProps> = ({
  venues,
  filters
}) => {
  // Fetch events for all visible venues
  const { eventsByVenue, isLoading: eventsLoading } = useBulkEvents({
    venues,
    limit: 50,
    enabled: venues.length > 0
  });

  // Debug logging
  console.log('📦 EventListContainer - Venues:', venues.length);
  console.log('📦 EventListContainer - eventsLoading:', eventsLoading);
  console.log('📦 EventListContainer - eventsByVenue keys:', Object.keys(eventsByVenue).length);
  if (venues.length > 0 && Object.keys(eventsByVenue).length > 0) {
    const firstVenueId = Number(venues[0].venue_id);
    const hasEventsForFirstVenue = firstVenueId in eventsByVenue;
    const eventsForFirstVenue = eventsByVenue[firstVenueId]?.length || 0;
    console.log('📦 SAMPLE - First venue_id:', firstVenueId);
    console.log('📦 SAMPLE - First venue name:', venues[0].name);
    console.log('📦 LOOKUP TEST - Has events for venue', firstVenueId, ':', hasEventsForFirstVenue);
    console.log('📦 EVENT COUNT - Events for venue', firstVenueId, ':', eventsForFirstVenue);
    console.log('📦 ALL KEYS - EventsByVenue keys:', Object.keys(eventsByVenue).map(Number).sort((a,b) => a-b).slice(0, 10));
  }

  // Show venues immediately, even while events are loading
  if (eventsLoading) {
    return (
      <>
        <ExpandableCardList
          venues={venues}
          eventsByVenue={{}}  // Pass empty object during loading
        />
        <div className="fixed bottom-4 right-4 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-white text-sm">
          Loading events...
        </div>
      </>
    );
  }

  // No venues after filtering
  if (venues.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <p className="text-xl font-semibold text-gray-900 mb-2">
          No events found
        </p>
        <p className="text-gray-600 text-center">
          Try adjusting your filters
        </p>
      </div>
    );
  }

  return (
    <ExpandableCardList
      venues={venues}
      eventsByVenue={eventsByVenue}
    />
  );
};

export default EventListContainer;
