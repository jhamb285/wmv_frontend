'use client';

import React from 'react';
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

interface EventGridProps {
    events: Event[];
    emptyMessage?: string;
}

const EventGrid: React.FC<EventGridProps> = ({
    events,
    emptyMessage = 'No events found'
}) => {
    if (events.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-6">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <svg
                            className="w-10 h-10 text-gray-400 dark:text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {emptyMessage}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                        Try adjusting your filters or check back later for new events.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-8 pb-12">
            {events.map((event) => (
                <div key={event.id} className="flex justify-center">
                    <EventCard
                        venue={event.venue}
                        eventName={event.eventName}
                        venueName={event.venueName}
                        location={event.location}
                        price={event.price}
                        imageUrl={event.imageUrl}
                        badge={event.badge}
                        categories={event.categories}
                    />
                </div>
            ))}
        </div>
    );
};

export default EventGrid;
