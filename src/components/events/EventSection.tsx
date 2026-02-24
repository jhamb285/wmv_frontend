'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import EventCard from './EventCard';

import type { Venue } from '@/types';

interface Event {
  id: string;
  venue?: Venue;
  eventName: string;
  venueName: string;
  location: string;
  price: string;
  imageUrl: string;
  badge?: 'Recommended' | 'Selling fast' | 'Best price guaranteed';
  categories?: Array<{ primary: string; secondary?: string }>;
}

interface EventSectionProps {
  title: string;
  events: Event[];
  onShowAll?: () => void;
}

const EventSection: React.FC<EventSectionProps> = ({
  title,
  events,
  onShowAll
}) => {
  if (events.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 px-4 md:px-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-sm text-gray-500 mt-1">{events.length} venues</p>
        </div>
        {onShowAll && (
          <button
            onClick={onShowAll}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-200 group"
          >
            <span className="text-sm font-medium text-gray-700">Show all</span>
            <ChevronRight className="w-4 h-4 text-gray-600 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      {/* Horizontal Scrollable Cards */}
      <div
        className="flex gap-5 overflow-x-auto px-4 md:px-6 pb-4 scroll-smooth"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {events.map((event) => (
          <EventCard
            key={event.id}
            venue={event.venue}
            eventName={event.eventName}
            venueName={event.venueName}
            location={event.location}
            price={event.price}
            imageUrl={event.imageUrl}
            badge={event.badge}
            categories={event.categories}
          />
        ))}
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default EventSection;
