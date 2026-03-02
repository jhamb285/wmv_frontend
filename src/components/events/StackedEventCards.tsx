'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, MapPin, Music, ChevronRight, Tag } from 'lucide-react';
import {
  groupByTimeOfDay,
  formatDateLabel,
  formatTimeClean,
  isEventHappeningNow,
} from '@/lib/time-utils';
import { getCategoryLightBg } from '@/lib/category-mappings';
import './StackedEventCards.css';

// ===========================================
// TYPE DEFINITIONS
// ===========================================

interface Venue {
  id: string;
  venue_name: string;
  venue_rating: number;
  venue_review_count: number;
  venue_location: string;
  venue_instagram?: string;
  venue_phone?: string;
  venue_coordinates?: { lat: number; lng: number };
  venue_website?: string;
  venue_address?: string;
  venue_highlights?: string;
  venue_atmosphere?: string;
  venue_category?: string;
  attributes?: any;
}

interface Event {
  id: string;
  venue_id: string;
  event_name: string;
  event_subtitle: string;
  event_time_start: string;
  event_time_end: string;
  event_date: string;
  event_entry_price: string;
  event_offers: string;
  category: string;
  artist?: string;
  music_genre?: string;
  event_vibe?: string;
  confidence_score?: number;
  analysis_notes?: string;
  website_social?: string;
  event_categories?: any[];
  deals?: Array<{ type: string; timing?: string | null; description: string }>;
  media_url_1?: string;
  media_url_2?: string;
}

interface EventCardData {
  event: Event;
  venue: Venue;
}

interface StackedEventCardsProps {
  cards: EventCardData[];
  getCategoryColor: (category: string) => { hue: number; saturation: number };
}

// ===========================================
// HELPERS
// ===========================================

function getEntryType(event: Event): { label: string; color: string } | null {
  const offers = event.event_offers?.toLowerCase() || '';
  if (offers.includes('free entry') || offers.includes('free')) {
    return { label: 'Free Entry', color: '#22c55e' };
  }
  if (event.deals && event.deals.length > 0) {
    const dealType = event.deals[0].type;
    if (dealType === 'ladies_night') return { label: 'Ladies Night', color: '#f472b6' };
    if (dealType === 'happy_hour') return { label: 'Happy Hour', color: '#f59e0b' };
    if (dealType === 'free_entry') return { label: 'Free Entry', color: '#22c55e' };
    if (dealType === '2for1') return { label: 'Buy 1 Get 1', color: '#34d399' };
  }
  if (offers.includes('ladies')) return { label: 'Ladies Night', color: '#f472b6' };
  if (offers.includes('happy hour')) return { label: 'Happy Hour', color: '#f59e0b' };
  return null;
}

function getPriceDisplay(price: string): string | null {
  if (!price) return null;
  const lower = price.toLowerCase();
  if (lower.includes('contact') || lower === 'n/a') return null;
  if (lower.includes('free')) return 'Free';
  // Remove duplicate words
  const words = price.split(/\s+/);
  const seen = new Set<string>();
  const deduped = words.filter(w => {
    const l = w.toLowerCase();
    if (seen.has(l)) return false;
    seen.add(l);
    return true;
  });
  return deduped.join(' ');
}

// ===========================================
// MINIMAL EVENT CARD (todo.today detailed style)
// ===========================================

function getSpecialOffersDisplay(offers: string): string | null {
  if (!offers) return null;
  const lower = offers.toLowerCase();
  if (lower.includes('no special') || lower === 'n/a' || lower === 'none') return null;
  return offers;
}

const MinimalEventCard: React.FC<{
  event: Event;
  venue: Venue;
  onClick: () => void;
}> = ({ event, venue, onClick }) => {
  const isLive = isEventHappeningNow(event.event_time_start, event.event_time_end, event.event_date);
  const price = getPriceDisplay(event.event_entry_price);
  const entryType = getEntryType(event);
  const specialOffer = getSpecialOffersDisplay(event.event_offers);

  // Pick best media: prefer image URLs over video (.mp4) URLs
  const url1 = (event as any).media_url_1 as string | undefined;
  const url2 = (event as any).media_url_2 as string | undefined;
  const isVideoUrl = (u: string) => /\.(mp4|mov|webm)$/i.test(u);
  const imageUrl = (url1 && !isVideoUrl(url1)) ? url1
    : (url2 && !isVideoUrl(url2)) ? url2
    : null;
  const videoUrl = !imageUrl ? (url1 || url2 || null) : null;

  // Get category-based light background color
  const categoryPrimary = event.event_categories?.[0]?.primary || event.category || '';
  const catColors = categoryPrimary ? getCategoryLightBg(categoryPrimary) : null;

  return (
    <div
      className="flex items-center gap-3 p-3.5 rounded-xl cursor-pointer mb-2"
      style={{
        background: catColors ? catColors.bg : '#ffffff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        borderLeft: catColors ? `3px solid ${catColors.border}` : '3px solid rgba(0,0,0,0.06)',
      }}
      onClick={onClick}
    >
      {/* Image / Video thumbnail */}
      <div className="w-[70px] h-[70px] rounded-xl overflow-hidden flex-shrink-0" style={{ background: 'rgba(0,0,0,0.04)' }}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={event.event_name}
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        ) : videoUrl ? (
          <video
            src={videoUrl}
            className="w-full h-full object-cover"
            muted
            playsInline
            preload="metadata"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Music className="w-5 h-5 text-gray-400" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        {/* Price + Entry Type Row */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {price && (
            <span className="text-[11px] font-bold text-green-600">{price}</span>
          )}
          {price && entryType && <span className="text-[10px] text-gray-300">·</span>}
          {entryType && (
            <span className="text-[11px] font-semibold" style={{ color: entryType.color }}>
              {entryType.label}
            </span>
          )}
        </div>

        {/* Event Name */}
        <h3 className="text-[15px] font-bold text-gray-900 leading-tight line-clamp-2">{event.event_name}</h3>

        {/* Time */}
        <div className="flex items-center gap-1.5">
          {isLive ? (
            <>
              <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 animate-pulse" />
              <span className="text-[12px] font-bold text-red-500">
                LIVE{event.event_time_end ? ` · until ${formatTimeClean(event.event_time_end)}` : ''}
              </span>
            </>
          ) : (
            <>
              <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <span className="text-[12px] text-gray-500 font-medium truncate">
                {formatDateLabel(event.event_date)}{event.event_time_start ? ` · ${formatTimeClean(event.event_time_start)}` : ''}
              </span>
            </>
          )}
        </div>

        {/* Venue */}
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <span className="text-[12px] text-gray-500 font-medium truncate">
            {venue.venue_name}{venue.venue_location ? `, ${venue.venue_location}` : ''}
          </span>
        </div>

        {/* Special Offers */}
        {specialOffer && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <Tag className="w-3 h-3 flex-shrink-0" style={{ color: '#b45309' }} />
            <span
              className="text-[11px] font-medium px-2 py-0.5 rounded-full truncate"
              style={{ background: 'rgba(245,158,11,0.12)', color: '#b45309' }}
            >
              {specialOffer}
            </span>
          </div>
        )}
      </div>

      {/* Chevron */}
      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-1" />
    </div>
  );
};

// ===========================================
// SECTION HEADER
// ===========================================

const SectionHeader: React.FC<{
  emoji: string;
  name: string;
  count: number;
}> = ({ emoji, name, count }) => (
  <div className="flex items-center gap-2 px-4 pt-3 pb-2">
    <span className="text-lg">{emoji}</span>
    <h2 className="text-[15px] font-bold text-gray-800">{name}</h2>
    <span className="text-[12px] text-gray-500 ml-auto">{count} events</span>
  </div>
);

// ===========================================
// MAIN COMPONENT
// ===========================================

const StackedEventCards: React.FC<StackedEventCardsProps> = ({
  cards,
}) => {
  const router = useRouter();

  // Group cards by time-of-day sections
  const sections = useMemo(() => {
    return groupByTimeOfDay(
      cards,
      (card) => card.event.event_time_start,
      (card) => card.event.event_time_end,
      (card) => card.event.event_date
    );
  }, [cards]);

  const handleCardClick = (eventId: string) => {
    router.push(`/event/${eventId}`);
  };

  console.log('🎴 StackedEventCards - cards:', cards.length, 'sections:', sections.length, sections.map(s => `${s.section.name}(${s.events.length})`));

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-5 text-center">
        <p className="text-base font-semibold text-gray-500">No events found</p>
        <p className="text-sm text-gray-400 mt-2">Try a different date or broaden your filters</p>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-2">
      {sections.map((section) => (
        <div key={section.section.key} className="mb-6">
          <SectionHeader
            emoji={section.section.emoji}
            name={section.section.name}
            count={section.events.length}
          />
          <div className="flex flex-col px-3">
            {section.events.map((cardData) => (
              <MinimalEventCard
                key={cardData.event.id}
                event={cardData.event}
                venue={cardData.venue}
                onClick={() => handleCardClick(cardData.event.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StackedEventCards;

// ===========================================
// EXPORT TYPES FOR EXTERNAL USE
// ===========================================

export type { Venue, Event, EventCardData, StackedEventCardsProps };
