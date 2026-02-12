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
    <div className="mb-16 md:mb-20">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-8 px-6 md:px-8">
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400 mt-2 font-medium">{events.length} venues available</p>
        </div>
        {onShowAll && (
          <button
            onClick={onShowAll}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 group"
          >
            <span className="text-sm font-semibold text-gray-900 dark:text-white">View all</span>
            <ChevronRight className="w-4 h-4 text-gray-900 dark:text-white group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      {/* Horizontal Scrollable Cards */}
      <div
        className="flex gap-6 overflow-x-auto px-6 md:px-8 pb-12 pt-4 -mt-4 scroll-smooth"
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

        {/* Mobile Show All Card */}
        {onShowAll && (
          <button
            onClick={onShowAll}
            className="md:hidden flex-shrink-0 w-[160px] flex flex-col items-center justify-center gap-4 rounded-[2rem] bg-gray-50 dark:bg-gray-900/50 border-2 border-dashed border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm">
              <ChevronRight className="w-6 h-6 text-gray-900 dark:text-white" />
            </div>
            <span className="font-bold text-gray-900 dark:text-white">View all</span>
          </button>
        )}
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
