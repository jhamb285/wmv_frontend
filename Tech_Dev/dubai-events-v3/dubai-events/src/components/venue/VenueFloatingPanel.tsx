'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, Calendar, Music, Star, ExternalLink, Instagram, Phone, Users, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useEvents } from '@/hooks/useEvents';
import type { Venue, FilterState, InstagramStory } from '@/types';

interface VenueFloatingPanelProps {
  venue: Venue | null;
  isOpen: boolean;
  onClose: () => void;
  filters?: FilterState;
  stories?: InstagramStory[];
  onViewDetails?: () => void;
}

const VenueFloatingPanel: React.FC<VenueFloatingPanelProps> = ({
  venue,
  isOpen,
  onClose,
  filters,
  stories = [],
  onViewDetails
}) => {
  // Fetch real event data for this venue with applied filters
  const { events, isLoading: eventsLoading, error: eventsError } = useEvents({
    venue_name: venue?.name || '',
    limit: 10,
    genres: filters?.activeGenres || [],
    vibes: filters?.activeVibes || [],
    offers: filters?.activeOffers || [],
    dates: filters?.activeDates || []
  });

  // Group events by date
  const eventsByDate = events.reduce((acc, event) => {
    const dateKey = new Date(event.event_date).toDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, typeof events>);

  const uniqueDates = Object.keys(eventsByDate).sort((a, b) =>
    new Date(a).getTime() - new Date(b).getTime()
  );

  // State for selected date (default to first date)
  const [selectedDateKey, setSelectedDateKey] = useState(uniqueDates[0] || '');

  // Update selected date when events change
  React.useEffect(() => {
    if (uniqueDates.length > 0 && !uniqueDates.includes(selectedDateKey)) {
      setSelectedDateKey(uniqueDates[0]);
    }
  }, [uniqueDates, selectedDateKey]);

  const selectedDateEvents = selectedDateKey ? eventsByDate[selectedDateKey] || [] : [];
  const hasLiveStories = stories.length > 0;

  if (!venue) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Light Glassmorphism Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-lg
                       before:absolute before:inset-0 before:bg-gradient-to-br before:from-black/20 before:to-black/10 before:pointer-events-none
                       relative"
          />

          {/* Floating Panel */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300,
              duration: 0.3
            }}
            className="fixed bottom-4 left-4 right-4 z-60 max-w-2xl mx-auto h-[30vh]"
          >
            <div className="bg-white/30 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 overflow-hidden h-full
                           before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-white/5 before:pointer-events-none before:rounded-2xl
                           after:absolute after:inset-0 after:bg-gradient-to-t after:from-transparent after:via-white/5 after:to-white/10 after:pointer-events-none after:rounded-2xl
                           relative">

              {/* Main Layout: 80% Left + 20% Right */}
              <div className="flex h-full">

                {/* Left Section - 80% */}
                <div className="flex-1 w-4/5 flex flex-col p-3">

                  {/* Header with Venue Name */}
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">
                      {venue.name}
                    </h3>
                    {hasLiveStories && (
                      <Badge className="bg-red-500/90 text-white animate-pulse border-red-400/50">
                        <span className="w-2 h-2 bg-red-400 rounded-full mr-1.5 animate-pulse"></span>
                        {stories.length} Live
                      </Badge>
                    )}
                  </div>

                  {/* Event Content Card */}
                  <div className="flex-1 overflow-hidden">
                    {eventsLoading ? (
                      <div className="text-sm text-gray-600 text-center py-2">Loading events...</div>
                    ) : events.length > 0 ? (
                      <>
                        {/* Events Display */}
                        {selectedDateEvents.length === 1 ? (
                          /* Single Event */
                          <div className="w-full h-full">
                            {selectedDateEvents.map((event, index) => (
                              <div key={event.id || `event-${index}`} className="bg-white/60 backdrop-blur-sm border border-gray-300/30 rounded-lg p-3 w-full h-full
                                   relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-gray-100/20 before:pointer-events-none before:rounded-lg">
                                <div className="flex flex-col h-full">
                                  <div className="flex-1">
                                    {/* Event Name (Primary) - Up to 2 Lines */}
                                    <h5 className="font-bold text-gray-900 text-base mb-1 line-clamp-2 leading-tight">
                                      {event.artist || event.event_name}
                                    </h5>

                                    {/* Event Name (if different from artist) - Up to 2 Lines */}
                                    {event.event_name && event.artist && event.event_name !== event.artist && (
                                      <div className="text-xs text-gray-700 mb-1 line-clamp-2 leading-tight">{event.event_name}</div>
                                    )}

                                    {/* Event Vibe - Up to 2 Lines */}
                                    {event.event_vibe && (
                                      <div className="flex items-start gap-1 text-xs text-purple-600 mb-0.5">
                                        <Star className="h-3 w-3 flex-shrink-0 mt-0.5" />
                                        <span className="line-clamp-2 leading-tight">{event.event_vibe}</span>
                                      </div>
                                    )}

                                    {/* Music Genre - Up to 2 Lines */}
                                    {event.music_genre && (
                                      <div className="flex items-start gap-1 text-xs text-blue-600 mb-1">
                                        <Music className="h-3 w-3 flex-shrink-0 mt-0.5" />
                                        <span className="line-clamp-2 leading-tight">{event.music_genre}</span>
                                      </div>
                                    )}

                                    {/* Special Offers */}
                                    {event.special_offers && (
                                      <div className="mt-1">
                                        <Badge className="bg-green-500/80 text-white text-xs px-1.5 py-0.5">
                                          {event.special_offers.length > 35
                                            ? `${event.special_offers.substring(0, 35)}...`
                                            : event.special_offers
                                          }
                                        </Badge>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          /* Multiple Events - Vertical List */
                          <div className="w-full h-full overflow-y-auto">
                            <div className="space-y-2">
                              {selectedDateEvents.map((event, index) => (
                                <div key={event.id || `event-${index}`} className="bg-white/60 backdrop-blur-sm border border-gray-300/30 rounded-lg p-3 w-full
                                     relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-gray-100/20 before:pointer-events-none before:rounded-lg">
                                  <div className="flex flex-col">
                                    {/* Event Name (Primary) - Up to 2 Lines */}
                                    <h5 className="font-bold text-gray-900 text-base mb-1 line-clamp-2 leading-tight">
                                      {event.artist || event.event_name}
                                    </h5>

                                    {/* Event Name (if different from artist) - Up to 2 Lines */}
                                    {event.event_name && event.artist && event.event_name !== event.artist && (
                                      <div className="text-xs text-gray-700 mb-1 line-clamp-2 leading-tight">{event.event_name}</div>
                                    )}

                                    {/* Event Vibe - Up to 2 Lines */}
                                    {event.event_vibe && (
                                      <div className="flex items-start gap-1 text-xs text-purple-600 mb-0.5">
                                        <Star className="h-3 w-3 flex-shrink-0 mt-0.5" />
                                        <span className="line-clamp-2 leading-tight">{event.event_vibe}</span>
                                      </div>
                                    )}

                                    {/* Music Genre - Up to 2 Lines */}
                                    {event.music_genre && (
                                      <div className="flex items-start gap-1 text-xs text-blue-600 mb-1">
                                        <Music className="h-3 w-3 flex-shrink-0 mt-0.5" />
                                        <span className="line-clamp-2 leading-tight">{event.music_genre}</span>
                                      </div>
                                    )}

                                    {/* Special Offers */}
                                    {event.special_offers && (
                                      <div className="mt-1">
                                        <Badge className="bg-green-500/80 text-white text-xs px-1.5 py-0.5">
                                          {event.special_offers.length > 35
                                            ? `${event.special_offers.substring(0, 35)}...`
                                            : event.special_offers
                                          }
                                        </Badge>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-sm text-gray-600 text-center py-2">No events found</div>
                    )}
                  </div>
                </div>

                {/* Right Section - 20% */}
                <div className="w-1/5 flex flex-col p-3 border-l border-white/20">

                  {/* Top - Instagram (Centered) */}
                  <div className="flex justify-center">
                    {venue?.final_instagram && (
                      <a
                        href={`https://instagram.com/${venue.final_instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-gray-800/90 hover:bg-gray-900 transition-colors"
                        title="Instagram"
                      >
                        <Instagram className="w-5 h-5 text-white" />
                      </a>
                    )}
                  </div>

                  {/* Middle - Event Dates (Vertically and Horizontally Centered) */}
                  <div className="flex-1 flex items-center justify-center">
                    {selectedDateEvents.length > 0 && (
                      <div className="flex flex-col gap-1 items-center">
                        {selectedDateEvents.slice(0, 2).map((event, index) => (
                          <div
                            key={event.id || `event-${index}`}
                            className="px-2 py-1 rounded-full text-xs whitespace-nowrap bg-blue-500/80 text-white"
                          >
                            {new Date(event.event_date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                        ))}
                        {selectedDateEvents.length > 2 && (
                          <div className="text-xs text-gray-600 text-center">+{selectedDateEvents.length - 2} more</div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Bottom - Arrow (Centered) */}
                  <div className="flex justify-center">
                    <button
                      onClick={onViewDetails}
                      className="p-2 rounded-full bg-gray-800/90 hover:bg-gray-900 transition-colors"
                      title="View Details"
                    >
                      <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default VenueFloatingPanel;