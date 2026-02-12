# Backend & API Documentation
## Dubai Events Platform V2

---

## Table of Contents
1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [API Architecture](#api-architecture)
4. [Database Schema](#database-schema)
5. [API Routes](#api-routes)
6. [Data Processing](#data-processing)
7. [Error Handling](#error-handling)
8. [Performance & Caching](#performance--caching)
9. [Security](#security)
10. [Supabase Integration](#supabase-integration)
11. [Future Enhancements](#future-enhancements)

---

## Overview

The backend for Dubai Events Platform is built using **Next.js 15 App Router API Routes** with **Supabase** as the database and authentication provider. The architecture follows a serverless approach with API routes handling data fetching, processing, and filtering logic.

### Key Design Principles
- **Client-Side First**: Minimize API calls by loading all data once
- **Serverless Functions**: Each API route is a standalone serverless function
- **Type Safety**: Full TypeScript coverage for all API routes
- **Error Handling**: Comprehensive error handling with detailed logging
- **Performance**: Optimized queries with proper indexing

---

## Technology Stack

### Backend Framework
```json
{
  "next": "15.5.2",
  "typescript": "5.0"
}
```

### Database & Authentication
```json
{
  "@supabase/supabase-js": "2.57.2",
  "@supabase/auth-helpers-nextjs": "0.10.0",
  "@supabase/auth-ui-react": "0.4.7"
}
```

### HTTP & Data Processing
```json
{
  "axios": "1.11.0",
  "node-fetch": "3.3.2"
}
```

---

## API Architecture

### Next.js App Router API Routes

API routes are located in `src/app/api/` directory:

```
src/app/api/
├── venues/
│   └── route.ts              # GET /api/venues
├── events/
│   └── route.ts              # GET /api/events
├── events-bulk/
│   └── route.ts              # POST /api/events-bulk
├── filter-options/
│   └── route.ts              # GET /api/filter-options
└── venue-names/
    └── route.ts              # GET /api/venue-names
```

### API Route Structure

Each API route follows this pattern:

```typescript
// src/app/api/example/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
  try {
    // 1. Parse request parameters
    const { searchParams } = new URL(request.url);
    const param = searchParams.get('param');

    // 2. Query database
    const { data, error } = await supabase
      .from('table_name')
      .select('*')
      .eq('column', param);

    if (error) throw error;

    // 3. Process data
    const processedData = data.map(transform);

    // 4. Return response
    return NextResponse.json({
      success: true,
      data: processedData,
      message: `Retrieved ${processedData.length} records`
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  // Handle POST requests
}
```

---

## Database Schema

### Supabase Database Structure

The platform uses a single unified table `final_1` that contains both venue and event data.

#### Main Table: `final_1`

**Venue Columns**:
```sql
CREATE TABLE final_1 (
  -- Identifiers
  venue_id INTEGER PRIMARY KEY,

  -- Basic Information
  venue_name_original TEXT,
  venue_area TEXT,
  venue_address TEXT,
  venue_city TEXT DEFAULT 'Dubai',
  venue_country TEXT DEFAULT 'UAE',

  -- Location
  venue_lat DECIMAL(10, 8),
  venue_lng DECIMAL(11, 8),

  -- Contact
  venue_phone TEXT,
  venue_website TEXT,
  venue_final_instagram TEXT,

  -- Classification
  venue_category TEXT,     -- Can be JSON array
  venue_price TEXT,        -- Price level (e.g., "AED", "AED AED")

  -- Ratings
  venue_rating DECIMAL(3, 2),        -- 0.00 - 5.00
  venue_rating_count INTEGER,

  -- Timestamps
  venue_created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  venue_updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Event Information
  event_id TEXT,
  event_name TEXT,
  event_date DATE,
  event_time TEXT,                   -- e.g., "08:00 PM - 03:00 AM"
  event_vibe TEXT[],                 -- Array of vibe strings

  -- Processed Data (JSON)
  music_genre_processed JSONB,       -- { primaries: [], secondariesByPrimary: {}, colorFamilies: [] }
  event_vibe_processed JSONB,        -- Same structure as music_genre_processed
  event_categories JSONB,            -- [{ primary: "", secondary: "", confidence: 0.95 }]
  attributes JSONB,                  -- { venue: [], energy: [], timing: [], status: [] }

  -- Event Details
  artists TEXT[],
  ticket_price DECIMAL(10, 2),
  special_offers TEXT[],
  confidence_score DECIMAL(3, 2),

  -- Constraints
  CONSTRAINT valid_rating CHECK (venue_rating >= 0 AND venue_rating <= 5),
  CONSTRAINT valid_confidence CHECK (confidence_score >= 0 AND confidence_score <= 1)
);
```

**Indexes for Performance**:
```sql
-- Geographic queries
CREATE INDEX idx_final_1_lat_lng ON final_1 (venue_lat, venue_lng);

-- Filter queries
CREATE INDEX idx_final_1_area ON final_1 (venue_area);
CREATE INDEX idx_final_1_date ON final_1 (event_date);
CREATE INDEX idx_final_1_venue_id ON final_1 (venue_id);
CREATE INDEX idx_final_1_instagram ON final_1 (venue_final_instagram);

-- Full-text search (future)
CREATE INDEX idx_final_1_venue_name ON final_1 USING gin(to_tsvector('english', venue_name_original));
```

**Row Level Security (RLS)**:
```sql
-- Enable RLS
ALTER TABLE final_1 ENABLE ROW LEVEL SECURITY;

-- Public read access (no auth required)
CREATE POLICY "Allow public read access" ON final_1
  FOR SELECT
  USING (true);

-- Admin write access (authenticated users only)
CREATE POLICY "Allow authenticated write access" ON final_1
  FOR INSERT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update access" ON final_1
  FOR UPDATE
  USING (auth.role() = 'authenticated');
```

#### JSON Column Structures

**music_genre_processed / event_vibe_processed**:
```json
{
  "primaries": ["Electronic", "Live"],
  "secondariesByPrimary": {
    "Electronic": ["Techno", "House", "Deep House"],
    "Live": ["Jazz", "Acoustic"]
  },
  "colorFamilies": ["indigo", "green"]
}
```

**event_categories**:
```json
[
  {
    "primary": "Music Events",
    "secondary": "Live Performances",
    "confidence": 0.95
  },
  {
    "primary": "Nightlife",
    "secondary": "Club Nights",
    "confidence": 0.88
  }
]
```

**attributes**:
```json
{
  "venue": ["Rooftop", "Open-air"],
  "energy": ["High Energy", "Packed"],
  "timing": ["Night", "Late Night"],
  "status": ["VIP", "Exclusive"]
}
```

---

## API Routes

### 1. GET /api/venues

**Purpose**: Fetch all venues with optional filtering

**File**: `src/app/api/venues/route.ts`

**Parameters**: None (uses client-side filtering)

**Response**:
```typescript
interface VenuesResponse {
  success: boolean;
  data: Venue[];
  message: string;
}

interface Venue {
  venue_id: number;
  name: string;
  area: string;
  address: string;
  country: string;
  lat: number;
  lng: number;
  phone: string;
  website: string;
  category: string;
  created_at: string;
  final_instagram: string;
  event_vibe: string[];
  event_date: string;
  music_genre_processed: ProcessedGenre;
  event_vibe_processed: ProcessedVibe;
  event_categories: EventCategory[];
  attributes: EventAttributes;
  rating: number;
  rating_count: number;
}
```

**Example Response**:
```json
{
  "success": true,
  "data": [
    {
      "venue_id": 1,
      "name": "Nusr-Et",
      "area": "Downtown Dubai",
      "lat": 25.1972,
      "lng": 55.2744,
      "category": "Restaurant",
      "music_genre_processed": {
        "primaries": ["Electronic"],
        "secondariesByPrimary": {
          "Electronic": ["House", "Deep House"]
        },
        "colorFamilies": ["indigo"]
      },
      "event_vibe_processed": {
        "primaries": ["Atmosphere", "Event Type"],
        "secondariesByPrimary": {
          "Atmosphere": ["Luxury", "Fine Dining"],
          "Event Type": ["VIP", "Exclusive"]
        },
        "colorFamilies": ["teal", "pink"]
      },
      "rating": 4.5,
      "rating_count": 1250
    }
  ],
  "message": "Retrieved 257 venues from Supabase final_1"
}
```

**Implementation Details**:

```typescript
export async function GET() {
  try {
    console.log('🔄 Loading ALL venues for client-side filtering');

    // Base query to get venue data from final_1 table
    let query = supabase
      .from('final_1')
      .select(`
        venue_id,
        venue_name_original,
        venue_area,
        venue_address,
        venue_country,
        venue_lat,
        venue_lng,
        venue_phone,
        venue_website,
        venue_category,
        venue_created_at,
        venue_final_instagram,
        event_vibe,
        event_date,
        music_genre_processed,
        event_vibe_processed,
        event_categories,
        attributes,
        venue_rating,
        venue_rating_count
      `)
      .not('venue_id', 'is', null)  // Only records with venue data
      .not('venue_lat', 'is', null)  // Must have coordinates
      .not('venue_lng', 'is', null)
      .order('venue_name_original', { ascending: true })
      .limit(1000);

    const { data, error } = await query;

    if (error) throw error;

    console.log('📊 SUPABASE QUERY - Raw records returned:', data?.length || 0);

    // Transform data to match frontend format
    let venues = data?.map(record => ({
      venue_id: record.venue_id,
      name: record.venue_name_original,
      area: record.venue_area,
      lat: record.venue_lat,
      lng: record.venue_lng,
      category: record.venue_category,
      music_genre_processed: record.music_genre_processed,
      event_vibe_processed: record.event_vibe_processed
        || transformEventVibeToProcessed(record.event_vibe),
      event_categories: record.event_categories,
      attributes: record.attributes,
      rating: record.venue_rating,
      rating_count: record.venue_rating_count
    })) || [];

    // Deduplicate venues by venue_id
    const venuesMap = new Map();
    venues.forEach(venue => {
      if (!venuesMap.has(venue.venue_id)) {
        venuesMap.set(venue.venue_id, venue);
      }
    });

    venues = Array.from(venuesMap.values());
    console.log('🔄 DEDUPLICATION - Venues after dedup:', venues.length);

    return NextResponse.json({
      success: true,
      data: venues,
      message: `Retrieved ${venues.length} venues from Supabase final_1`
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
```

**Key Features**:
1. **Single Query**: Fetches all venues at once for client-side filtering
2. **Data Transformation**: Converts database format to frontend format
3. **Deduplication**: Removes duplicate venues by venue_id
4. **Fallback Processing**: Transforms event_vibe if event_vibe_processed is null
5. **Comprehensive Logging**: Detailed console logs for debugging

---

### 2. GET /api/filter-options

**Purpose**: Get available filter options for all filter types

**File**: `src/app/api/filter-options/route.ts`

**Parameters**: None (returns all available options)

**Response**:
```typescript
interface FilterOptionsResponse {
  success: boolean;
  data: {
    areas: string[];
    dates: string[];
    hierarchicalGenres: Record<string, { color: string; subcategories: string[] }>;
    hierarchicalVibes: Record<string, { color: string; subcategories: string[] }>;
    genres: string[];  // Flat list for backward compatibility
    vibes: string[];   // Flat list for backward compatibility
    venueCategories: string[];
    specialOffers: string[];
    times: string[];  // ["Morning", "Afternoon", "Evening", "Night"]
    ticketPrices: string[];  // ["Free", "AED 0-50", ...]
    venuePrices: string[];   // Actual values from database
    atmospheres: string[];
    eventCategories: string[];
  };
  message: string;
}
```

**Example Response**:
```json
{
  "success": true,
  "data": {
    "areas": [
      "Downtown Dubai",
      "Dubai Marina",
      "JBR (Jumeirah Beach Residence)",
      "Business Bay",
      "DIFC",
      "Palm Jumeirah"
    ],
    "dates": [
      "17 Sept 25",
      "18 Sept 25",
      "19 Sept 25"
    ],
    "hierarchicalGenres": {
      "Electronic": {
        "color": "indigo",
        "subcategories": ["Techno", "House", "Deep House", "Progressive"]
      },
      "Live": {
        "color": "green",
        "subcategories": ["Jazz", "Rock", "Acoustic", "Indie"]
      }
    },
    "hierarchicalVibes": {
      "Energy": {
        "color": "orange",
        "subcategories": ["High Energy", "Nightclub", "Party", "Dance"]
      },
      "Atmosphere": {
        "color": "teal",
        "subcategories": ["Open-air", "Rooftop", "Lounge", "Intimate"]
      }
    },
    "venueCategories": ["Bar", "Lounge", "Restaurant", "Beach Club", "Nightclub"],
    "specialOffers": ["Free Entry", "VIP", "Ladies Night"],
    "times": ["Morning", "Afternoon", "Evening", "Night"],
    "ticketPrices": ["Free", "AED 0-50", "AED 50-100", "AED 100-200", "AED 200+"],
    "venuePrices": ["AED", "AED AED", "AED AED AED"],
    "atmospheres": ["High Energy", "Intimate", "Rooftop", "Beach"],
    "eventCategories": ["Music Events", "Nightlife", "Sports & Viewing"]
  },
  "message": "Retrieved 11 areas, 6 genre categories, 4 vibe categories, 150 dates, 5 venue categories, 3 special offers, 4 time categories, 8 atmospheres, 3 event categories, 3 venue prices"
}
```

**Implementation Details**:

```typescript
export async function GET() {
  try {
    console.log('🔄 Fetching ALL filter options (ignoring parameters for client-side filtering)');

    // Get ALL data without filters
    const { data, error } = await supabase
      .from('final_1')
      .select(`
        venue_area,
        event_vibe,
        event_date,
        event_time,
        music_genre_processed,
        venue_category,
        special_offers,
        ticket_price,
        venue_price,
        event_categories,
        attributes
      `);

    if (error) throw error;

    // 1. Extract unique areas
    const uniqueAreas = [...new Set(
      data?.map(record => record.venue_area)
        .filter(area => area && area.trim())
    )].sort();

    // 2. Extract hierarchical genres from music_genre_processed
    const genreMap: Record<string, { color: string; subcategories: Set<string> }> = {};

    data?.forEach((record) => {
      if (record.music_genre_processed?.primaries) {
        record.music_genre_processed.primaries.forEach(primary => {
          if (!genreMap[primary]) {
            const color = record.music_genre_processed?.colorFamilies?.[0] || 'gray';
            genreMap[primary] = {
              color: color,
              subcategories: new Set()
            };
          }

          const secondaries = record.music_genre_processed?.secondariesByPrimary?.[primary] || [];
          if (secondaries.length === 0) {
            genreMap[primary].subcategories.add(primary);
          } else {
            secondaries.forEach(sec => genreMap[primary].subcategories.add(sec));
          }
        });
      }
    });

    const hierarchicalGenres: Record<string, { color: string; subcategories: string[] }> = {};
    Object.entries(genreMap).forEach(([primary, data]) => {
      hierarchicalGenres[primary] = {
        color: data.color,
        subcategories: Array.from(data.subcategories).sort()
      };
    });

    // 3. Extract hierarchical vibes from event_vibe
    const flatVibes = [...new Set(
      data?.flatMap((record) =>
        Array.isArray(record.event_vibe)
          ? record.event_vibe
              .filter(vibe => vibe && vibe.trim())
              .flatMap(vibe => vibe.split('|').map(tag => tag.trim()).filter(tag => tag))
          : []
      )
    )];

    // Define vibe categorization
    const vibeCategories: Record<string, {keywords: string[], color: string}> = {
      "Energy": {
        keywords: ["high energy", "nightclub", "packed", "party", "dance", "energetic"],
        color: "orange"
      },
      "Atmosphere": {
        keywords: ["open-air", "rooftop", "terrace", "lounge", "intimate", "casual", "chill"],
        color: "teal"
      },
      "Event Type": {
        keywords: ["beach", "pool", "dayclub", "brunch", "vip", "exclusive", "luxury", "fine dining"],
        color: "pink"
      },
      "Music Style": {
        keywords: ["techno", "house", "hip-hop", "r&b", "live", "rock", "indie", "jazz"],
        color: "indigo"
      }
    };

    const hierarchicalVibes: Record<string, { color: string; subcategories: string[] }> = {};

    Object.entries(vibeCategories).forEach(([primary, {keywords, color}]) => {
      const matchingVibes = flatVibes.filter(vibe =>
        keywords.some(keyword => vibe.toLowerCase().includes(keyword.toLowerCase()))
      );

      hierarchicalVibes[primary] = {
        color: color,
        subcategories: matchingVibes.sort()
      };
    });

    // 4. Extract and format dates
    const uniqueDates = [...new Set(
      data?.map((record) => {
        if (!record.event_date) return null;

        try {
          const eventDate = new Date(record.event_date);
          if (isNaN(eventDate.getTime())) return null;

          // Format as "17 Sept 25"
          const day = eventDate.getUTCDate();
          const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                             'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
          const month = monthNames[eventDate.getUTCMonth()];
          const year = eventDate.getUTCFullYear().toString().slice(-2);
          return `${day} ${month} ${year}`;
        } catch {
          return null;
        }
      }).filter(date => date !== null)
    )].sort((a, b) => {
      // Sort dates chronologically
      try {
        const parseDate = (dateStr: string) => {
          const [day, monthPart, year] = dateStr.split(' ');
          const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                             'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
          const monthIndex = monthNames.findIndex(m => m.toLowerCase() === monthPart.toLowerCase());
          const fullYear = parseInt(year) < 50 ? 2000 + parseInt(year) : 1900 + parseInt(year);
          return new Date(fullYear, monthIndex, parseInt(day));
        };

        const dateA = parseDate(a);
        const dateB = parseDate(b);
        return dateA.getTime() - dateB.getTime();
      } catch {
        return 0;
      }
    });

    // 5. Extract venue categories (parse JSON arrays)
    const allVenueCategories: string[] = [];
    data?.forEach((record: any) => {
      if (record.venue_category) {
        try {
          const categories = typeof record.venue_category === 'string'
            ? JSON.parse(record.venue_category)
            : record.venue_category;

          if (Array.isArray(categories)) {
            allVenueCategories.push(...categories);
          } else if (typeof categories === 'string') {
            allVenueCategories.push(categories);
          }
        } catch (e) {
          if (typeof record.venue_category === 'string' && record.venue_category.trim()) {
            allVenueCategories.push(record.venue_category);
          }
        }
      }
    });
    const venueCategories = [...new Set(allVenueCategories)].filter(cat => cat && cat.trim()).sort();

    // 6. Extract special offers
    const allOffers = data?.flatMap((record: any) => {
      if (!record.special_offers) return [];
      if (Array.isArray(record.special_offers)) return record.special_offers;
      if (typeof record.special_offers === 'string') {
        return record.special_offers.split(/[,|;]/).map(o => o.trim()).filter(o => o);
      }
      return [];
    }) || [];
    const uniqueOffers = [...new Set(allOffers)].sort();

    // 7. Categorize event times
    const categorizeTime = (timeStr: string): string[] => {
      if (!timeStr) return [];

      const categories: Set<string> = new Set();
      const timePattern = /(\d{1,2}):(\d{2})\s*(AM|PM)/gi;
      const matches = Array.from(timeStr.matchAll(timePattern));

      if (matches.length === 0) return [];

      const to24Hour = (hour: number, minute: number, period: string): number => {
        let h = hour;
        if (period.toUpperCase() === 'PM' && h !== 12) h += 12;
        if (period.toUpperCase() === 'AM' && h === 12) h = 0;
        return h + minute / 60;
      };

      if (matches.length >= 1) {
        const startHour = parseInt(matches[0][1]);
        const startMin = parseInt(matches[0][2]);
        const startPeriod = matches[0][3];
        const startTime = to24Hour(startHour, startMin, startPeriod);

        let endTime = startTime + 3;
        if (matches.length >= 2) {
          const endHour = parseInt(matches[1][1]);
          const endMin = parseInt(matches[1][2]);
          const endPeriod = matches[1][3];
          endTime = to24Hour(endHour, endMin, endPeriod);
          if (endTime < startTime) endTime += 24;
        }

        for (let t = startTime; t < endTime; t += 0.5) {
          const hour = t % 24;
          if (hour >= 6 && hour < 12) categories.add('Morning');
          else if (hour >= 12 && hour < 18) categories.add('Afternoon');
          else if (hour >= 18 && hour < 22) categories.add('Evening');
          else categories.add('Night');
        }
      }

      return Array.from(categories);
    };

    const timeCategories: Set<string> = new Set();
    data?.forEach((record: any) => {
      if (record.event_time) {
        const categories = categorizeTime(record.event_time);
        categories.forEach(cat => timeCategories.add(cat));
      }
    });

    const orderedTimes = ['Morning', 'Afternoon', 'Evening', 'Night'].filter(t => timeCategories.has(t));

    // 8. Ticket price ranges
    const ticketPriceRanges = ['Free', 'AED 0-50', 'AED 50-100', 'AED 100-200', 'AED 200+'];

    // 9. Venue prices (exact values from DB)
    const allVenuePrices = data?.map((record: any) => record.venue_price)
      .filter(price => price !== null && price !== undefined && price.toString().trim())
      .map(price => price.toString().trim()) || [];
    const uniqueVenuePrices = [...new Set(allVenuePrices)].sort();

    // 10. Extract atmospheres from attributes
    const allAtmospheres: string[] = [];
    data?.forEach((record: any) => {
      if (record.attributes?.energy) {
        allAtmospheres.push(...record.attributes.energy);
      }
      if (record.attributes?.venue) {
        allAtmospheres.push(...record.attributes.venue);
      }
    });
    const uniqueAtmospheres = [...new Set(allAtmospheres)].sort();

    // 11. Extract event categories (primaries only)
    const allEventCategories: string[] = [];
    data?.forEach((record: any) => {
      if (record.event_categories && Array.isArray(record.event_categories)) {
        record.event_categories.forEach((cat: any) => {
          if (cat.primary) {
            allEventCategories.push(cat.primary);
          }
        });
      }
    });
    const uniqueEventCategories = [...new Set(allEventCategories)].sort();

    console.log('✅ Found areas from Supabase:', uniqueAreas);
    console.log('✅ Extracted hierarchical genres:', Object.keys(hierarchicalGenres));
    console.log('✅ Created hierarchical vibes:', Object.keys(hierarchicalVibes));

    return NextResponse.json({
      success: true,
      data: {
        areas: uniqueAreas,
        dates: uniqueDates,
        hierarchicalGenres: hierarchicalGenres,
        hierarchicalVibes: hierarchicalVibes,
        genres: Object.keys(hierarchicalGenres).sort(),
        vibes: Object.keys(hierarchicalVibes),
        venueCategories: venueCategories,
        specialOffers: uniqueOffers,
        times: orderedTimes,
        ticketPrices: ticketPriceRanges,
        venuePrices: uniqueVenuePrices,
        atmospheres: uniqueAtmospheres,
        eventCategories: uniqueEventCategories
      },
      message: `Retrieved ${uniqueAreas.length} areas, ${Object.keys(hierarchicalGenres).length} genre categories, ${Object.keys(hierarchicalVibes).length} vibe categories, ${uniqueDates.length} dates, ${venueCategories.length} venue categories, ${uniqueOffers.length} special offers, ${orderedTimes.length} time categories, ${uniqueAtmospheres.length} atmospheres, ${uniqueEventCategories.length} event categories, ${uniqueVenuePrices.length} venue prices`
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({
      success: false,
      data: { areas: [], vibes: [], dates: [], genres: [] },
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
```

**Key Features**:
1. **Comprehensive Options**: Returns all possible filter values
2. **Hierarchical Structure**: Genres and vibes organized into categories
3. **Dynamic Categorization**: Vibes categorized by keyword matching
4. **Date Formatting**: Dates formatted as "17 Sept 25"
5. **Time Categorization**: Event times grouped into Morning/Afternoon/Evening/Night
6. **JSON Parsing**: Handles JSON array fields (venue_category, special_offers)

---

### 3. GET /api/events

**Purpose**: Fetch events for a specific venue

**File**: `src/app/api/events/route.ts`

**Parameters**:
- `venue_name` (required): Name of the venue
- `limit` (optional): Number of events to return (default: 50)

**Response**:
```typescript
interface EventsResponse {
  success: boolean;
  data: Event[];
  message: string;
}

interface Event {
  event_id: string;
  event_name: string;
  event_date: string;
  event_time: string;
  venue_name: string;
  music_genres: string[];
  event_vibes: string[];
  ticket_price: number;
  special_offers: string[];
  artists: string[];
  venue: Venue;  // Linked venue data
}
```

**Example Request**:
```
GET /api/events?venue_name=Nusr-Et&limit=10
```

**Example Response**:
```json
{
  "success": true,
  "data": [
    {
      "event_id": "evt_123",
      "event_name": "Saturday Night Live",
      "event_date": "2025-09-17",
      "event_time": "08:00 PM - 03:00 AM",
      "venue_name": "Nusr-Et",
      "music_genres": ["House", "Deep House"],
      "event_vibes": ["High Energy", "VIP"],
      "ticket_price": 150,
      "special_offers": ["VIP Table Booking"],
      "artists": ["DJ Name"],
      "venue": {
        "venue_id": 1,
        "name": "Nusr-Et",
        "area": "Downtown Dubai",
        "lat": 25.1972,
        "lng": 55.2744
      }
    }
  ],
  "message": "Retrieved 10 events for Nusr-Et"
}
```

---

### 4. POST /api/events-bulk

**Purpose**: Batch fetch events for multiple venues

**File**: `src/app/api/events-bulk/route.ts`

**Request Body**:
```typescript
interface BulkEventsRequest {
  venue_ids: number[];
  limit_per_venue?: number;  // Default: 20
}
```

**Response**:
```typescript
interface BulkEventsResponse {
  success: boolean;
  data: Record<number, Event[]>;  // venue_id -> events mapping
  message: string;
}
```

**Example Request**:
```json
POST /api/events-bulk
{
  "venue_ids": [1, 2, 3, 4, 5],
  "limit_per_venue": 10
}
```

**Example Response**:
```json
{
  "success": true,
  "data": {
    "1": [/* events for venue 1 */],
    "2": [/* events for venue 2 */],
    "3": [/* events for venue 3 */]
  },
  "message": "Retrieved events for 3 out of 5 venues"
}
```

**Performance Optimization**:
- Uses batch queries to reduce database round trips
- Parallel processing for multiple venue queries
- Configurable limit per venue to prevent overload

---

### 5. GET /api/venue-names

**Purpose**: Autocomplete for venue name search

**File**: `src/app/api/venue-names/route.ts`

**Parameters**:
- `q` (required): Search query (minimum 2 characters)

**Response**:
```typescript
interface VenueNamesResponse {
  success: boolean;
  data: { id: number; name: string; area: string }[];
  message: string;
}
```

**Example Request**:
```
GET /api/venue-names?q=nus
```

**Example Response**:
```json
{
  "success": true,
  "data": [
    { "id": 1, "name": "Nusr-Et", "area": "Downtown Dubai" },
    { "id": 42, "name": "Nusr-Et Marina", "area": "Dubai Marina" }
  ],
  "message": "Found 2 matching venues"
}
```

---

## Data Processing

### 1. Event Vibe Processing

**Transform pipe-separated vibes into hierarchical structure**:

```typescript
function transformEventVibeToProcessed(eventVibeArray: string[] | null | undefined) {
  if (!eventVibeArray || !Array.isArray(eventVibeArray)) return null;

  // Define vibe categories
  const vibeCategories: Record<string, {keywords: string[], color: string}> = {
    "Energy": {
      keywords: ["high energy", "nightclub", "packed", "party", "dance"],
      color: "orange"
    },
    "Atmosphere": {
      keywords: ["open-air", "rooftop", "terrace", "lounge", "intimate"],
      color: "teal"
    },
    "Event Type": {
      keywords: ["beach", "pool", "dayclub", "brunch", "vip", "exclusive"],
      color: "pink"
    },
    "Music Style": {
      keywords: ["techno", "house", "hip-hop", "r&b", "live", "jazz"],
      color: "indigo"
    }
  };

  // Extract individual tags from pipe-separated strings
  const vibeTags = eventVibeArray
    .flatMap(vibe => vibe.split('|').map(tag => tag.trim()))
    .filter(tag => tag);

  const primaries: string[] = [];
  const secondariesByPrimary: Record<string, string[]> = {};
  const colorFamilies: string[] = [];

  // Categorize each vibe tag
  Object.entries(vibeCategories).forEach(([primary, {keywords, color}]) => {
    const matchingTags = vibeTags.filter(tag =>
      keywords.some(keyword => tag.toLowerCase().includes(keyword.toLowerCase()))
    );

    if (matchingTags.length > 0) {
      primaries.push(primary);
      secondariesByPrimary[primary] = [...new Set(matchingTags)].sort();
      colorFamilies.push(color);
    }
  });

  if (primaries.length === 0) return null;

  return {
    primaries,
    secondariesByPrimary,
    colorFamilies
  };
}
```

### 2. Venue Deduplication

**Remove duplicate venues by venue_id**:

```typescript
function deduplicateVenues(venues: Venue[]): Venue[] {
  const venuesMap = new Map<number, Venue>();

  venues.forEach(venue => {
    const venueId = venue.venue_id;
    if (!venuesMap.has(venueId)) {
      venuesMap.set(venueId, venue);
    } else {
      // Keep the venue with more complete data
      const existing = venuesMap.get(venueId)!;
      if (hasMoreCompleteData(venue, existing)) {
        venuesMap.set(venueId, venue);
      }
    }
  });

  return Array.from(venuesMap.values());
}

function hasMoreCompleteData(venue1: Venue, venue2: Venue): boolean {
  // Count non-null fields
  const count1 = Object.values(venue1).filter(v => v !== null && v !== undefined).length;
  const count2 = Object.values(venue2).filter(v => v !== null && v !== undefined).length;
  return count1 > count2;
}
```

### 3. Date Parsing and Formatting

**Parse various date formats and convert to standard format**:

```typescript
function parseEventDate(dateStr: string): Date | null {
  try {
    // Handle ISO format: "2025-09-17T00:00:00+00:00"
    if (dateStr.includes('T')) {
      return new Date(dateStr);
    }

    // Handle "17 Sept 25" format
    if (dateStr.includes(' ')) {
      const [day, monthPart, year] = dateStr.split(' ');
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                         'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      const monthIndex = monthNames.findIndex(m => m.toLowerCase() === monthPart.toLowerCase());
      if (monthIndex === -1) return null;

      const fullYear = parseInt(year) < 50 ? 2000 + parseInt(year) : 1900 + parseInt(year);
      return new Date(fullYear, monthIndex, parseInt(day));
    }

    // Handle "17/September/2025" format
    if (dateStr.includes('/')) {
      const [day, monthPart, year] = dateStr.split('/');
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const monthIndex = monthNames.findIndex(m => m.toLowerCase() === monthPart.toLowerCase());
      if (monthIndex === -1) return null;

      return new Date(parseInt(year), monthIndex, parseInt(day));
    }

    return null;
  } catch {
    return null;
  }
}

function formatDateForDisplay(date: Date): string {
  const day = date.getUTCDate();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                     'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[date.getUTCMonth()];
  const year = date.getUTCFullYear().toString().slice(-2);
  return `${day} ${month} ${year}`;
}
```

---

## Error Handling

### API Error Response Format

All API routes follow a consistent error response format:

```typescript
interface ErrorResponse {
  success: false;
  error: string;
  data?: never;  // Ensure data is not present on error
}
```

### Error Handling Pattern

```typescript
export async function GET(request: Request) {
  try {
    // API logic here

    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('API Error:', error);

    // Log detailed error information
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}
```

### Supabase Error Handling

```typescript
const { data, error } = await supabase
  .from('final_1')
  .select('*');

if (error) {
  console.error('Supabase error:', error);

  // Check for specific error types
  if (error.code === 'PGRST116') {
    // No rows found - return empty array instead of error
    return NextResponse.json({
      success: true,
      data: [],
      message: 'No records found'
    });
  }

  throw new Error(`Database error: ${error.message}`);
}
```

---

## Performance & Caching

### 1. Database Query Optimization

**Use proper indexing**:
```sql
-- Geographic queries
CREATE INDEX idx_final_1_lat_lng ON final_1 (venue_lat, venue_lng);

-- Filter queries
CREATE INDEX idx_final_1_area ON final_1 (venue_area);
CREATE INDEX idx_final_1_date ON final_1 (event_date);
```

**Limit result sets**:
```typescript
const { data, error } = await supabase
  .from('final_1')
  .select('*')
  .limit(1000);  // Prevent accidental full table scans
```

**Select only needed columns**:
```typescript
const { data, error } = await supabase
  .from('final_1')
  .select('venue_id, venue_name_original, venue_lat, venue_lng')  // Only what's needed
  .limit(100);
```

### 2. API Route Caching

**No caching for real-time data**:
```typescript
const response = await fetch('/api/venues', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',  // Always fetch fresh data
  },
});
```

**Future: Add Redis caching for filter options**:
```typescript
// Example for V2
const cacheKey = 'filter-options';
const cached = await redis.get(cacheKey);

if (cached) {
  return NextResponse.json(JSON.parse(cached));
}

const filterOptions = await generateFilterOptions();
await redis.set(cacheKey, JSON.stringify(filterOptions), 'EX', 3600);  // Cache for 1 hour

return NextResponse.json(filterOptions);
```

### 3. Response Compression

Next.js automatically compresses responses > 1KB with gzip/brotli.

---

## Security

### 1. Environment Variables

```typescript
// Required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY'
];

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});
```

### 2. Supabase Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE final_1 ENABLE ROW LEVEL SECURITY;

-- Public read access (no auth required for viewing events)
CREATE POLICY "Allow public read access" ON final_1
  FOR SELECT
  USING (true);

-- Admin write access (only authenticated admins can modify)
CREATE POLICY "Allow admin write access" ON final_1
  FOR INSERT
  USING (auth.role() = 'authenticated' AND auth.jwt()->>'role' = 'admin');

CREATE POLICY "Allow admin update access" ON final_1
  FOR UPDATE
  USING (auth.role() = 'authenticated' AND auth.jwt()->>'role' = 'admin');
```

### 3. Input Validation

```typescript
function validateVenueName(name: string): boolean {
  // Must be non-empty and less than 100 characters
  if (!name || name.trim().length === 0 || name.length > 100) {
    return false;
  }

  // Only allow alphanumeric, spaces, and basic punctuation
  const validPattern = /^[a-zA-Z0-9\s\-'&,\.]+$/;
  return validPattern.test(name);
}

// Usage in API route
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const venueName = searchParams.get('venue_name');

  if (!venueName || !validateVenueName(venueName)) {
    return NextResponse.json({
      success: false,
      error: 'Invalid venue name'
    }, { status: 400 });
  }

  // Continue with validated input
}
```

### 4. Rate Limiting (Future V2)

```typescript
// Example with Vercel KV or Upstash Redis
import rateLimit from '@/lib/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // Max 500 unique IPs per interval
});

export async function GET(request: Request) {
  try {
    await limiter.check(10, 'CACHE_TOKEN'); // 10 requests per minute
  } catch {
    return NextResponse.json({
      success: false,
      error: 'Rate limit exceeded'
    }, { status: 429 });
  }

  // Continue with API logic
}
```

---

## Supabase Integration

### 1. Client Setup

**For API Routes** (`src/lib/supabase/client.ts`):
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

**For Server Components** (`src/lib/supabase/server.ts`):
```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
}
```

### 2. Query Patterns

**Basic Select**:
```typescript
const { data, error } = await supabase
  .from('final_1')
  .select('*');
```

**Filtered Query**:
```typescript
const { data, error } = await supabase
  .from('final_1')
  .select('venue_name_original, venue_area')
  .eq('venue_area', 'Downtown Dubai')
  .gte('venue_rating', 4.0)
  .order('venue_rating', { ascending: false })
  .limit(10);
```

**Complex Filters**:
```typescript
const { data, error } = await supabase
  .from('final_1')
  .select('*')
  .or('venue_area.eq.Downtown Dubai,venue_area.eq.Dubai Marina')
  .contains('event_vibe', ['Beach', 'Pool'])
  .gte('event_date', '2025-09-01')
  .lte('event_date', '2025-09-30');
```

**Join Queries** (Future if normalized):
```typescript
const { data, error } = await supabase
  .from('events')
  .select(`
    *,
    venue:venues (
      venue_name,
      venue_area,
      venue_lat,
      venue_lng
    )
  `)
  .eq('event_date', '2025-09-17');
```

### 3. Real-Time Subscriptions (Future V2)

```typescript
// Subscribe to new events
const subscription = supabase
  .channel('events-channel')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'final_1',
      filter: 'venue_area=eq.Downtown Dubai'
    },
    (payload) => {
      console.log('New event added:', payload.new);
      // Update UI with new event
    }
  )
  .subscribe();

// Cleanup
subscription.unsubscribe();
```

---

## Future Enhancements

### V2 API Improvements

#### 1. GraphQL API
```typescript
// Use GraphQL for more flexible queries
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

const typeDefs = `#graphql
  type Venue {
    id: ID!
    name: String!
    area: String!
    events: [Event!]!
  }

  type Event {
    id: ID!
    name: String!
    date: String!
    venue: Venue!
  }

  type Query {
    venues(area: String, genre: String): [Venue!]!
    events(venueId: ID!, limit: Int): [Event!]!
  }
`;

const resolvers = {
  Query: {
    venues: async (_, { area, genre }) => {
      // Fetch venues with filters
    },
    events: async (_, { venueId, limit }) => {
      // Fetch events for venue
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
export default startServerAndCreateNextHandler(server);
```

#### 2. Webhook Endpoints
```typescript
// POST /api/webhooks/event-update
export async function POST(request: Request) {
  const signature = request.headers.get('X-Webhook-Signature');

  // Verify webhook signature
  if (!verifyWebhookSignature(signature, await request.text())) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const payload = await request.json();

  // Process webhook payload
  await processEventUpdate(payload);

  return NextResponse.json({ success: true });
}
```

#### 3. Search API with Elasticsearch
```typescript
// POST /api/search
export async function POST(request: Request) {
  const { query, filters } = await request.json();

  const results = await elasticsearch.search({
    index: 'venues',
    body: {
      query: {
        bool: {
          must: [
            {
              multi_match: {
                query,
                fields: ['venue_name^2', 'venue_area', 'event_vibe']
              }
            }
          ],
          filter: filters
        }
      }
    }
  });

  return NextResponse.json({
    success: true,
    data: results.hits.hits.map(hit => hit._source)
  });
}
```

#### 4. Analytics API
```typescript
// GET /api/analytics/popular-venues
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeRange = searchParams.get('range') || '7d';

  const analytics = await getPopularVenues(timeRange);

  return NextResponse.json({
    success: true,
    data: analytics
  });
}
```

---

## Conclusion

The Dubai Events Platform backend is designed for:

1. **Performance**: Optimized queries, client-side filtering, efficient data processing
2. **Scalability**: Serverless architecture, horizontal scaling with Supabase
3. **Reliability**: Comprehensive error handling, logging, data validation
4. **Security**: RLS policies, input validation, environment variable protection
5. **Maintainability**: Type-safe APIs, consistent patterns, thorough documentation

This architecture provides a solid foundation for current features and seamless integration of future enhancements planned in V2.

---

**Last Updated**: October 2025
**Version**: 1.0
**Author**: Where's My Vibe Team
