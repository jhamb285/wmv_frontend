'use client';

import React from 'react';
import { Star, Music, Tag, Clock, MapPin, Instagram, Sparkles } from 'lucide-react';
import { useEvents } from '@/hooks/useEvents';
import { useTheme } from '@/contexts/ThemeContext';
import type { Venue } from '@/types';

interface EventCardProps {
  venue?: Venue;
  eventName: string;
  venueName: string;
  location: string;
  price: string;
  imageUrl: string;
  badge?: 'Recommended' | 'Selling fast' | 'Best price guaranteed';
  categories?: Array<{ primary: string; secondary?: string }>;
}

const EventCard: React.FC<EventCardProps> = ({ venue }) => {
  const { isDarkMode } = useTheme();

  // Fetch first event for this venue if venue data is provided
  const { events, isLoading } = useEvents({
    venue_id: venue?.venue_id ? Number(venue.venue_id) : undefined,
    limit: 1,
    enabled: !!venue?.venue_id
  });

  const event = events[0];

  if (!venue) {
    return null;
  }

  return (
    <div className={`group flex-shrink-0 w-[320px] md:w-[380px] rounded-[2rem] overflow-hidden relative transition-all duration-300 hover:-translate-y-1
                   ${isDarkMode
        ? 'bg-gray-900/95 border border-gray-800 shadow-2xl shadow-black/50'
        : 'bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
      }`}>

      {/* Main Content */}
      <div className="flex flex-col">

        {/* Header with Venue Info */}
        <div className="p-5 pb-3">
          <div className="flex justify-between items-start gap-4 mb-2">
            {/* Venue Name */}
            <h3 className={`text-2xl font-bold leading-tight tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {venue.name}
            </h3>

            {/* Rating */}
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${isDarkMode
              ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
              : 'bg-amber-50 border-amber-100 text-amber-700'
              }`}>
              <Star className="h-3.5 w-3.5 fill-current" />
              <span className="text-sm font-bold">{venue.rating ? venue.rating.toFixed(1) : '4.5'}</span>
            </div>
          </div>

          {/* Category & Location */}
          <div className="flex items-center gap-2 flex-wrap">
            {venue?.category && (
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${isDarkMode
                ? 'bg-gray-800 text-gray-300'
                : 'bg-gray-100 text-gray-600'
                }`}>
                <MapPin className="h-3 w-3" />
                {venue.category}
              </div>
            )}
            <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              • {venue.address || 'Dubai'}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={`mx-5 h-px ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`} />

        {/* Event Content */}
        <div className="p-5 py-4">
          {isLoading ? (
            <div className="flex flex-col gap-3">
              <div className={`h-6 w-3/4 rounded animate-pulse ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`} />
              <div className={`h-4 w-1/2 rounded animate-pulse ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`} />
            </div>
          ) : event ? (
            <div className="space-y-3">
              {/* Event Name */}
              <div>
                <h5 className={`font-bold text-lg leading-snug mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {event.artist || event.event_name}
                </h5>
                {event.event_name && event.artist && event.event_name !== event.artist && (
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {event.event_name}
                  </p>
                )}
              </div>

              {/* Event Details Grid */}
              <div className="grid grid-cols-1 gap-2">
                {/* Time */}
                {event.event_time && (
                  <div className={`flex items-center gap-2.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                      <Clock className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm font-medium">{event.event_time}</span>
                  </div>
                )}

                {/* Music Genre */}
                {event.music_genre && (
                  <div className={`flex items-center gap-2.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-pink-500/10 text-pink-400' : 'bg-pink-50 text-pink-600'}`}>
                      <Music className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm font-medium">{event.music_genre}</span>
                  </div>
                )}

                {/* Attributes - limited to 2 items */}
                {event.attributes && (
                  <div className={`flex items-start gap-2.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>
                      <Sparkles className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm font-medium leading-relaxed line-clamp-1">
                      {[
                        ...(event.attributes.venue || []),
                        ...(event.attributes.energy || []),
                        ...(event.attributes.timing || []),
                        ...(event.attributes.status || [])
                      ].slice(0, 2).join(' • ')}
                    </span>
                  </div>
                )}

                {/* Special Offers */}
                {event.special_offers && (
                  <div className={`flex items-center gap-2.5 ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>
                    <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-green-500/10 text-green-400' : 'bg-green-50 text-green-600'}`}>
                      <Tag className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm font-semibold line-clamp-1">{event.special_offers}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className={`flex flex-col items-center justify-center py-6 text-center ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
              <Music className="h-6 w-6 mb-1.5 opacity-50" />
              <p className="text-xs font-medium">No upcoming events</p>
            </div>
          )}
        </div>

        {/* Footer with Instagram */}
        {venue?.final_instagram && (
          <div className={`px-5 pb-5 pt-2`}>
            <a
              href={`https://instagram.com/${venue.final_instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl transition-all duration-200 font-semibold text-sm
                ${isDarkMode
                  ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'
                  : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm hover:shadow'
                }`}
            >
              <Instagram className="w-4 h-4" />
              <span>@{venue.final_instagram}</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;

