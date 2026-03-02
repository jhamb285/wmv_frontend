// Event API route - fetch a single event by ID for the event detail page
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('id');

    if (!eventId) {
      return NextResponse.json({ error: 'Missing event id parameter' }, { status: 400 });
    }

    // Fetch the specific event
    const { data: eventData, error: eventError } = await supabase
      .from('final_1')
      .select(`
        venue_id,
        venue_name,
        venue_name_original,
        venue_area,
        venue_address,
        venue_country,
        venue_lat,
        venue_lng,
        venue_phone,
        venue_website,
        venue_category,
        venue_rating,
        venue_rating_count,
        venue_highlights,
        venue_atmosphere,
        venue_created_at,
        venue_final_instagram,
        event_id,
        event_date,
        event_name,
        event_time,
        artist,
        music_genre,
        event_vibe,
        ticket_price,
        special_offers,
        website_social,
        confidence_score,
        analysis_notes,
        music_genre_processed,
        event_vibe_processed,
        event_categories,
        attributes,
        metadata,
        media_url_1,
        media_type_1,
        media_url_2,
        media_type_2,
        deals,
        instagram_id
      `)
      .eq('event_id', eventId)
      .limit(1);

    if (eventError) {
      console.error('Supabase error:', eventError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    if (!eventData || eventData.length === 0) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const record = eventData[0];

    // Also fetch related events (same venue or same primary category)
    let relatedData: any[] = [];
    try {
      const { data: sameVenueEvents } = await supabase
        .from('final_1')
        .select(`
          event_id, event_name, event_date, event_time, artist, ticket_price,
          venue_name, venue_name_original, venue_area, venue_id,
          venue_rating, venue_rating_count,
          media_url_1, media_type_1,
          event_categories, special_offers, deals,
          music_genre, event_vibe, venue_category
        `)
        .eq('venue_id', record.venue_id)
        .neq('event_id', eventId)
        .limit(5);

      if (sameVenueEvents && sameVenueEvents.length > 0) {
        relatedData = sameVenueEvents;
      }
    } catch {
      // Silently fail — related events are optional
    }

    return NextResponse.json({
      event: record,
      related: relatedData,
    });
  } catch (error) {
    console.error('Event API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
