// Bulk Events API route - Fetch events for multiple venues at once (Google Maps style)
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

interface EventRecord {
  event_vibe?: string[];
  event_date?: string;
  id?: number;
  venue_name?: string;
  special_offers?: string;
  music_genre_processed?: {
    primaries: string[];
    secondariesByPrimary: Record<string, string[]>;
  };
  venue_id?: number;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { venue_ids, venue_names, limit = 10, genres, vibes, offers, dates } = body;

    // Require venue_ids (we always have them now from the hook)
    if (!venue_ids || !Array.isArray(venue_ids) || venue_ids.length === 0) {
      return NextResponse.json({
        success: false,
        data: {},
        error: 'venue_ids array is required'
      }, { status: 400 });
    }

    console.log(`🚀 BULK FETCH - Loading events for ${venue_ids.length} venues by venue_id (same as map view)`);

    // Build base query - query by venue_id using .in() method (same as map view)
    let query = supabase
      .from('final_1')
      .select('*')
      .in('venue_id', venue_ids)  // Clean, indexed query
      .not('event_id', 'is', null)
      .order('event_date', { ascending: false }) // Show newest dates first
      .limit(limit * venue_ids.length); // Increase limit for multiple venues

    // Apply genre filter in JavaScript after fetching (since music_genre_processed is JSONB)
    let genreFilterToApply = null;
    if (genres) {
      genreFilterToApply = Array.isArray(genres) ? genres : genres.split(',').map((g: string) => g.trim());
    }

    let vibeFilterToApply = null;
    if (vibes) {
      vibeFilterToApply = Array.isArray(vibes) ? vibes : vibes.split(',').map((v: string) => v.trim());
    }

    // Apply offers filter in JavaScript after fetching (to avoid PostgREST ILIKE issues)
    let offersFilterToApply = null;
    if (offers) {
      offersFilterToApply = Array.isArray(offers) ? offers : offers.split(',').map((o: string) => o.trim());
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase bulk fetch error:', error);
      return NextResponse.json({
        success: false,
        data: {},
        error: error.message
      }, { status: 500 });
    }

    // Apply genre filter in JavaScript using music_genre_processed primaries
    let filteredData = data;
    if (genreFilterToApply && genreFilterToApply.length > 0) {
      filteredData = data?.filter((record: EventRecord) => {
        if (!record.music_genre_processed?.primaries) return false;
        return genreFilterToApply.some((requestedGenre: string) =>
          record.music_genre_processed!.primaries.includes(requestedGenre)
        );
      });
    }

    // Apply vibes filter in JavaScript
    if (vibeFilterToApply && vibeFilterToApply.length > 0) {
      filteredData = filteredData?.filter((record: EventRecord) => {
        if (!record.event_vibe || !Array.isArray(record.event_vibe)) return false;
        return vibeFilterToApply.some((requestedVibe: string) =>
          record.event_vibe!.some((eventVibeElement: string) =>
            eventVibeElement && eventVibeElement.toLowerCase().includes(requestedVibe.toLowerCase())
          )
        );
      });
    }

    // Apply offers filter in JavaScript
    if (offersFilterToApply && offersFilterToApply.length > 0) {
      filteredData = filteredData?.filter((record: EventRecord) => {
        if (!record.special_offers) return false;
        const offersStr = typeof record.special_offers === 'string'
          ? record.special_offers
          : (Array.isArray(record.special_offers) ? record.special_offers.join(' ') : '');

        return offersFilterToApply.some((requestedOffer: string) =>
          offersStr.toLowerCase().includes(requestedOffer.toLowerCase())
        );
      });
    }

    // Apply dates filter
    if (dates && filteredData) {
      const dateList = Array.isArray(dates) ? dates : dates.split(',').map((d: string) => d.trim());
      filteredData = filteredData.filter((record: EventRecord) => {
        if (!record.event_date) return false;

        const eventDate = new Date(record.event_date);
        if (isNaN(eventDate.getTime())) return false;

        return dateList.some((selectedDate: string) => {
          try {
            let selectedDateObj: Date;

            if (selectedDate.includes('/')) {
              const [day, monthName, year] = selectedDate.split('/');
              const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                                'July', 'August', 'September', 'October', 'November', 'December'];
              const monthIndex = monthNames.findIndex(m => m.toLowerCase() === monthName.toLowerCase());
              if (monthIndex === -1) return false;
              selectedDateObj = new Date(parseInt(year), monthIndex, parseInt(day));
            } else {
              const [day, monthPart, year] = selectedDate.split(' ');
              const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                                'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
              const monthIndex = monthNames.findIndex(m => m.toLowerCase() === monthPart.toLowerCase());
              if (monthIndex === -1) return false;
              const fullYear = parseInt(year) < 50 ? 2000 + parseInt(year) : 1900 + parseInt(year);
              selectedDateObj = new Date(fullYear, monthIndex, parseInt(day));
            }

            const eventDateOnly = new Date(eventDate.getUTCFullYear(), eventDate.getUTCMonth(), eventDate.getUTCDate());
            const selectedDateOnly = new Date(selectedDateObj.getFullYear(), selectedDateObj.getMonth(), selectedDateObj.getDate());

            return eventDateOnly.getTime() === selectedDateOnly.getTime();
          } catch {
            return false;
          }
        });
      });
    }

    // Transform data
    const transformedData = filteredData?.map(record => ({
      id: record.event_id,
      created_at: record.event_created_at,
      event_date: record.event_date,
      event_time: record.event_time,
      venue_name: record.venue_name,
      venue_id: record.venue_id,
      artist: Array.isArray(record.artists) ? record.artists.join(', ') : record.artists,
      music_genre: Array.isArray(record.music_genre) ? record.music_genre.join(', ') : record.music_genre,
      event_vibe: Array.isArray(record.event_vibe) ? record.event_vibe.join(', ') : record.event_vibe,
      event_name: record.event_name,
      ticket_price: record.ticket_price,
      special_offers: Array.isArray(record.special_offers) ? record.special_offers.join(', ') : record.special_offers,
      website_social: Array.isArray(record.website_social) ? record.website_social.join(', ') : record.website_social,
      confidence_score: record.confidence_score,
      analysis_notes: record.analysis_notes,
      instagram_id: record.instagram_id
    })) || [];

    // Group events by venue_id (using numeric IDs for reliable matching)
    const eventsByVenue: Record<number, unknown[]> = {};

    // Group by venue_id
    const byVenueId = new Map<number, unknown[]>();
    transformedData.forEach(event => {
      if (event.venue_id) {
        if (!byVenueId.has(event.venue_id)) {
          byVenueId.set(event.venue_id, []);
        }
        byVenueId.get(event.venue_id)!.push(event);
      }
    });

    // Key by venue_id directly (more reliable than venue names)
    byVenueId.forEach((events, venueId) => {
      eventsByVenue[venueId] = events;
    });

    // Initialize empty arrays for venues with no events (by venue_id)
    venue_ids?.forEach(id => {
      if (!eventsByVenue[id]) {
        eventsByVenue[id] = [];
      }
    });

    const totalEvents = Object.values(eventsByVenue).reduce((sum, events) => sum + events.length, 0);

    console.log(`✅ BULK FETCH COMPLETE - Retrieved ${totalEvents} events across ${venue_ids.length} venues`);
    console.log(`📊 Events per venue:`, Object.entries(eventsByVenue).map(([venue, events]) =>
      `${venue}: ${events.length}`).join(', '));

    return NextResponse.json({
      success: true,
      data: eventsByVenue,
      message: `Retrieved ${totalEvents} events for ${venue_ids.length} venues`,
      stats: {
        total_events: totalEvents,
        venues_requested: venue_ids.length,
        venues_with_events: Object.keys(eventsByVenue).filter(venue => eventsByVenue[venue].length > 0).length
      }
    });

  } catch (error) {
    console.error('Bulk Events API Error:', error);

    return NextResponse.json({
      success: false,
      data: {},
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}