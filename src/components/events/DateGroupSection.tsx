'use client';

import React from 'react';
import type { Venue, Event } from '@/types';
import EventListCard from './EventListCard';
import { getFirstEventForDate } from '@/lib/filters/date-grouping-utils';

interface DateGroupSectionProps {
  dateLabel: string;  // "Today", "Tomorrow", or "17 Sept 25"
  venues: Venue[];    // Venues with events on this date
  eventsMap: Map<number, Event[]>;  // Map of venue_id -> events
  expandedVenueIds: Set<number>;
  onToggleExpand: (venueId: number) => void;
  activeFilterColor: string;
  hasActiveFilter: boolean;
}

const DateGroupSection: React.FC<DateGroupSectionProps> = ({
  dateLabel,
  venues,
  eventsMap,
  expandedVenueIds,
  onToggleExpand,
  activeFilterColor,
  hasActiveFilter
}) => {
  if (venues.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      {/* Sticky Section Header */}
      <div className="sticky top-[188px] md:top-[216px] z-10 bg-gradient-to-b from-white via-white to-white/80 backdrop-blur-sm py-3 mb-6">
        <h2 className="text-3xl font-bold text-gray-900">
          {dateLabel}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {venues.length} {venues.length === 1 ? 'venue' : 'venues'}
        </p>
      </div>

      {/* Cards Container */}
      <div className="space-y-4">
        {venues.map(venue => {
          const venueId = Number(venue.venue_id);
          const allEvents = eventsMap.get(venueId) || [];
          const firstEvent = getFirstEventForDate(allEvents, dateLabel);
          const isExpanded = expandedVenueIds.has(venueId);

          return (
            <EventListCard
              key={venue.venue_id}
              venue={venue}
              event={firstEvent}
              allEvents={allEvents}
              isExpanded={isExpanded}
              onToggleExpand={() => onToggleExpand(venueId)}
              activeFilterColor={activeFilterColor}
              hasActiveFilter={hasActiveFilter}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DateGroupSection;
