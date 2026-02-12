# CLAUDE.md - AI Assistant Project Context
## Dubai Events Platform V2 (Where's My Vibe)

> **Purpose**: This file provides comprehensive context for AI assistants (Claude, GPT, etc.) working on this project.
> **Last Updated**: October 2025
> **Project Status**: V1.0 Production Ready, V2.0 Planning

---

## 🎯 Project Overview

**Dubai Events Platform** (internally: "Where's My Vibe") is a sophisticated event discovery web application that helps users find venues and events in Dubai through an interactive map interface with advanced filtering capabilities.

### Quick Facts
- **Tech Stack**: Next.js 15, React 19, TypeScript 5, Tailwind CSS 4, Supabase
- **Codebase Size**: 65+ components, 387-line type system, 552-line filtering hook
- **Documentation**: 30,000+ words across comprehensive docs
- **Current Version**: V1.0 (Production Ready)
- **Deployment**: Vercel (primary), supports Docker

---

## 📁 Project Structure

```
dubai-events-v2/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── page.tsx            # Home (Map View)
│   │   ├── list/               # List View
│   │   ├── login/              # Authentication
│   │   └── api/                # API Routes (5 endpoints)
│   ├── components/             # 65+ React components
│   │   ├── auth/               # Google/Email/Phone auth
│   │   ├── filters/            # Hierarchical filter system
│   │   ├── map/                # Google Maps integration
│   │   ├── navigation/         # Top/Bottom nav
│   │   ├── venue/              # Venue details
│   │   └── ui/                 # Shadcn UI (20+ components)
│   ├── hooks/                  # 7 custom hooks
│   ├── contexts/               # React Context (Auth, Theme, BulkEvents)
│   ├── stores/                 # Zustand stores
│   ├── lib/                    # Utilities & config
│   └── types/                  # TypeScript definitions
├── docs/                       # Comprehensive documentation
│   ├── INDEX.md                # Documentation index
│   ├── FRONTEND_ARCHITECTURE.md  # Frontend deep dive
│   └── BACKEND_API.md          # Backend deep dive
├── README.md                   # Project overview
├── V1_FEATURES.md              # Feature documentation
├── TECHNICAL_IMPLEMENTATION.md # Implementation guide
└── V2_ROADMAP.md              # Future plans
```

---

## 🔑 Key Technologies & Versions

### Core Framework
```json
{
  "next": "15.5.2",
  "react": "19.1.0",
  "typescript": "5.0",
  "tailwindcss": "4.0"
}
```

### Critical Dependencies
```json
{
  "@supabase/supabase-js": "2.57.2",
  "@googlemaps/js-api-loader": "2.20.7",
  "zustand": "5.0.8",
  "@tanstack/react-query": "5.87.1",
  "framer-motion": "12.23.12",
  "lucide-react": "0.542.0"
}
```

### Authentication
- **Supabase Auth** with multi-provider support
- Google OAuth 2.0
- Email/Password
- Phone OTP (SMS)

---

## 🏗️ Architecture Decisions

### 1. Client-Side Filtering Strategy
**Why**: Instant performance without API round-trips
**How**:
- Load all venues once on mount (GET /api/venues)
- Filter 100% client-side using `useMemo` in `useClientSideVenues` hook
- 552-line filtering logic handles 10+ filter types
- No server calls during filter changes

**Key File**: `src/hooks/useClientSideVenues.ts`

### 2. Hierarchical Filter Structure
**Why**: Support complex categorization (Primary → Secondary)
**How**:
```typescript
{
  selectedPrimaries: {
    genres: ["Electronic", "Live"],
    vibes: ["Energy", "Atmosphere"]
  },
  selectedSecondaries: {
    genres: {
      "Electronic": ["Techno", "House"],
      "Live": ["Jazz", "Acoustic"]
    },
    vibes: {
      "Energy": ["High Energy", "Nightclub"],
      "Atmosphere": ["Rooftop", "Lounge"]
    }
  }
}
```

**Key File**: `src/types/index.ts` (HierarchicalFilterState interface)

### 3. Single Unified Table
**Why**: Simplify queries, reduce joins
**Table**: `final_1` in Supabase
**Contains**: Both venue AND event data (denormalized)
**Deduplication**: By `venue_id` after filtering

**Schema Location**: See `docs/BACKEND_API.md` - Database Schema section

### 4. Serverless API Routes
**Why**: Automatic scaling, zero config
**Routes** (5 total):
1. `GET /api/venues` - All venues (client-side filtering)
2. `GET /api/filter-options` - Available filter values
3. `GET /api/events` - Events for specific venue
4. `POST /api/events-bulk` - Batch event fetching
5. `GET /api/venue-names` - Autocomplete search

**Location**: `src/app/api/*/route.ts`

---

## 🎨 Design System

### Color Palette (Dubai Retro Theme)
```css
--venue-nightclub: #f8c967;   /* Gold - Premium venues */
--venue-restaurant: #a5b076;  /* Green - Dining */
--venue-bar: #e98d58;         /* Orange - Bars/Lounges */
--venue-beach: #b9d3c2;       /* Blue-green - Beach/Pool */
--venue-rooftop: #db8555;     /* Dark orange - Rooftops */
--venue-hotel: #dfd2ae;       /* Beige - Hotels */
```

### Glass Morphism Pattern
```css
background: rgba(0, 0, 0, 0.75);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.06);
box-shadow:
  0 8px 32px rgba(0, 0, 0, 0.4),
  0 4px 16px rgba(0, 0, 0, 0.3),
  inset 0 1px 0 rgba(255, 255, 255, 0.08);
```

### Responsive Breakpoints
```typescript
mobile: "< 768px"    // Bottom nav, full-width sidebar
tablet: "768px - 1024px"  // Horizontal nav, partial sidebar
desktop: "> 1024px"  // Full horizontal nav, fixed sidebar
```

---

## 🗺️ Google Maps Integration

### Custom Styling
- **Retro Dubai Theme**: Custom color palette matching venue types
- **POI Hiding**: Clean map without default Points of Interest
- **Custom Controls**: Zoom controls only, gesture handling: 'greedy'

### Venue Markers
- **Color-coded by category**: Nightclub (gold), Restaurant (green), etc.
- **Clustering**: Venues within 100m grouped at higher zoom levels
- **Animations**: Bounce effect on hover/click

**Config File**: `src/lib/maps-config.ts`

---

## 🔍 Filtering System Deep Dive

### Filter Types (10+ categories)

1. **Hierarchical Genres** (Music styles)
   - Primary: Electronic, Live, Cultural, Hip-Hop/R&B, etc.
   - Secondary: Techno, House, Jazz, Rock, etc.
   - Color-coded for visual distinction

2. **Hierarchical Vibes** (Atmosphere)
   - Primary: Energy, Atmosphere, Event Type, Music Style
   - Secondary: High Energy, Rooftop, Beach, VIP, etc.

3. **Areas** (Geographic)
   - 11 major Dubai areas
   - Special handling for JBR (Jumeirah Beach Residence)

4. **Dates**
   - Format: "17 Sept 25"
   - Historical + future events
   - Chronologically sorted

5. **Event Times** (Categorized)
   - Morning (6 AM - 12 PM)
   - Afternoon (12 PM - 6 PM)
   - Evening (6 PM - 10 PM)
   - Night (10 PM - 6 AM)

6. **Venue Categories**
   - Bar, Lounge, Restaurant, Beach Club, Nightclub, etc.

7. **Ticket Prices** (AED ranges)
   - Free, AED 0-50, AED 50-100, AED 100-200, AED 200+

8. **Venue Prices**
   - Exact values from database (e.g., "AED", "AED AED")

9. **Atmospheres**
   - High Energy, Intimate, Rooftop, Beach, etc.

10. **Event Categories**
    - Music Events, Nightlife, Sports & Viewing, etc.

11. **Ratings**
    - 1-5 stars filtering

12. **Special Offers**
    - Free Entry, VIP, Ladies Night, etc.

### Filter Logic (OR-based)
```typescript
// ANY selected filter value matches (inclusive OR)
if (activeGenres.length > 0) {
  const anyGenreMatches = activeGenres.some(selectedGenre =>
    venue.music_genre_processed.primaries.includes(selectedGenre) ||
    Object.values(venue.music_genre_processed.secondariesByPrimary)
      .some(secondaries => secondaries.includes(selectedGenre))
  );

  if (!anyGenreMatches) return false; // Exclude venue
}
```

**Key Implementation**: `src/hooks/useClientSideVenues.ts` (lines 99-544)

---

## 🔐 Authentication Flow

### Providers
1. **Google OAuth** - Most common, one-click sign-in
2. **Email/Password** - Traditional auth with password reset
3. **Phone OTP** - SMS-based verification for UAE numbers

### Session Management
- **Supabase Auth** handles JWT tokens
- **LocalStorage** persistence
- **Auto-refresh** on tab/window change
- **Auth Context** (`src/contexts/AuthContext.tsx`) provides global state

### Protected Routes (Future V2)
Currently all routes public; V2 will add:
- User profiles
- Saved favorites
- Event history
- Personalized recommendations

---

## 📊 Data Model

### Main Table: `final_1`

**Venue Fields**:
```typescript
venue_id: number              // Primary key
venue_name_original: string
venue_area: string            // Geographic area
venue_lat: decimal            // Latitude
venue_lng: decimal            // Longitude
venue_category: string        // Can be JSON array
venue_rating: decimal(3,2)    // 0.00-5.00
venue_price: string           // Price level
```

**Event Fields**:
```typescript
event_id: string
event_name: string
event_date: date
event_time: string            // "08:00 PM - 03:00 AM"
ticket_price: decimal(10,2)
special_offers: string[]
```

**Processed Fields** (JSON):
```typescript
music_genre_processed: {
  primaries: string[];
  secondariesByPrimary: Record<string, string[]>;
  colorFamilies: string[];
}

event_vibe_processed: {
  // Same structure as music_genre_processed
}

event_categories: {
  primary: string;
  secondary: string;
  confidence: number;
}[]

attributes: {
  venue: string[];     // ["Rooftop", "Open-air"]
  energy: string[];    // ["High Energy", "Packed"]
  timing: string[];    // ["Night", "Late Night"]
  status: string[];    // ["VIP", "Exclusive"]
}
```

**Indexes for Performance**:
```sql
CREATE INDEX idx_final_1_lat_lng ON final_1 (venue_lat, venue_lng);
CREATE INDEX idx_final_1_area ON final_1 (venue_area);
CREATE INDEX idx_final_1_date ON final_1 (event_date);
CREATE INDEX idx_final_1_venue_id ON final_1 (venue_id);
```

---

## 🎣 Custom Hooks Reference

### 1. `useClientSideVenues` ⭐ MOST IMPORTANT
**File**: `src/hooks/useClientSideVenues.ts` (552 lines)
**Purpose**: Client-side venue filtering
**Returns**:
```typescript
{
  allVenues: Venue[];
  filteredVenues: Venue[];
  isLoading: boolean;
  error: string | null;
}
```
**How it works**:
1. Loads all venues once on mount
2. Filters using `useMemo` (instant updates)
3. Applies all 10+ filter types sequentially
4. Returns deduplicated venues

### 2. `useFilterOptions`
**File**: `src/hooks/useFilterOptions.ts`
**Purpose**: Load available filter options from API
**Returns**: All possible values for each filter type

### 3. `useEvents`
**File**: `src/hooks/useEvents.ts`
**Purpose**: Fetch events for specific venue
**Uses**: React Query for caching

### 4. `useBulkEvents`
**File**: `src/hooks/useBulkEvents.ts`
**Purpose**: Batch event fetching (100+ venues)
**Optimization**: Reduces API calls

---

## 🎭 Component Hierarchy

### Top-Level Pages
```
App (ThemeProvider, AuthProvider)
└── page.tsx (Home - Map View)
    └── MapContainer
        ├── TopNav / BottomNav (responsive)
        ├── Google Maps
        │   └── VenuePin[] (with clustering)
        └── VenueDetailsSidebar
            └── EventSection[]
                └── EventCard[]
```

### Filter Components
```
FilterSection
├── CategoryPills (genres/vibes)
│   ├── PrimaryPill[]
│   └── SecondaryPill[][]
├── AttributePills
│   ├── VenueAttributes[]
│   ├── EnergyAttributes[]
│   ├── TimingAttributes[]
│   └── StatusAttributes[]
└── FilterActionBar
    ├── ClearButton
    └── ApplyButton
```

### Navigation Components
```
Desktop: TopNav
Mobile: BottomNav
Both contain:
├── AreaFilter
├── GenreFilter (hierarchical)
├── VibeFilter (hierarchical)
├── DateFilter
├── OffersFilter
└── AdditionalFilters (7+ more types)
```

---

## 🚀 Performance Optimizations

### 1. Client-Side Filtering
- **Zero API calls** during filter changes
- **Instant updates** via `useMemo`
- **Efficient algorithms** - O(n) filtering

### 2. React Optimizations
```typescript
// Memoized calculations
const filteredVenues = useMemo(() => {...}, [allVenues, filters]);

// Memoized callbacks
const handleFilterChange = useCallback((newFilters) => {...}, []);

// Component memoization
const EventCard = React.memo(({ event }) => {...});
```

### 3. Map Performance
- **Venue clustering** - Reduces marker count
- **Debounced updates** - 300ms delay on filter changes
- **Lazy loading** - Components load when needed

### 4. Code Splitting
```typescript
// Dynamic imports for route components
const ListViewPage = dynamic(() => import('./list/page'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});
```

---

## 🔧 Development Workflow

### Environment Setup
```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables
cp .env.example .env.local
# Add: NEXT_PUBLIC_SUPABASE_URL
#      NEXT_PUBLIC_SUPABASE_ANON_KEY
#      NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

# 3. Start development server
npm run dev  # http://localhost:3000
```

### Available Scripts
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "type-check": "tsc --noEmit"
}
```

### Code Quality
- **ESLint**: Code linting with Next.js config
- **Prettier**: Code formatting (`.prettierrc.json`)
- **TypeScript**: Full type checking (`tsconfig.json`)
- **Playwright**: E2E testing framework

---

## 🐛 Common Issues & Solutions

### Issue 1: Filters Not Working
**Symptom**: Selecting filter doesn't update venues
**Cause**: Filter state not updating or filtering logic error
**Debug**: Check console logs in `useClientSideVenues.ts`
**Fix**: Verify filter state structure matches `HierarchicalFilterState`

### Issue 2: Map Not Loading
**Symptom**: Blank map or error message
**Cause**: Missing/invalid Google Maps API key
**Debug**: Check browser console for API errors
**Fix**: Verify `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in `.env.local`

### Issue 3: No Venues Showing
**Symptom**: Map loads but no venue pins
**Cause**: API error or data not loaded
**Debug**: Check `/api/venues` endpoint response
**Fix**: Verify Supabase credentials and `final_1` table has data

### Issue 4: Authentication Fails
**Symptom**: Login doesn't work or redirects fail
**Cause**: Supabase auth configuration
**Debug**: Check Supabase dashboard → Authentication → Settings
**Fix**: Add redirect URLs to allowed list

---

## 📝 Code Style Guidelines

### TypeScript
```typescript
// Always use interfaces for data structures
interface Venue {
  venue_id: number;
  name: string;
  // ...
}

// Use type for unions/intersections
type FilterState = HierarchicalFilterState | FlatFilterState;

// Explicit return types for functions
function getVenues(): Promise<Venue[]> {
  // ...
}
```

### Component Structure
```typescript
'use client'; // Add for client components

import { useState, useEffect } from 'react';
import type { ComponentProps } from './types';

interface MyComponentProps {
  // Props definition
}

export default function MyComponent({ prop1, prop2 }: MyComponentProps) {
  // 1. Hooks
  const [state, setState] = useState();

  // 2. Effects
  useEffect(() => {...}, []);

  // 3. Event handlers
  const handleClick = () => {...};

  // 4. Render
  return (
    <div>...</div>
  );
}
```

### Naming Conventions
- **Components**: PascalCase (`VenueCard.tsx`)
- **Hooks**: camelCase with `use` prefix (`useClientSideVenues.ts`)
- **Utils**: camelCase (`category-utils.ts`)
- **Types**: PascalCase interfaces (`Venue`, `FilterState`)
- **Constants**: UPPER_SNAKE_CASE (`DUBAI_CENTER`, `RETRO_MAP_STYLE`)

---

## 🎯 V2 Roadmap Priorities

### Phase 1: UI/UX (Weeks 1-2)
- Welcome tutorial (3-step onboarding)
- Help center & tooltips
- Dark/Light mode toggle
- Enhanced loading states

### Phase 2: AI Enhancement (Weeks 2-3)
- Intelligent genre classification
- Vibe matching algorithm
- Natural language search
- Personalized recommendations

### Phase 3: Maps & List (Weeks 3-4)
- Heat maps for event density
- 3D building views
- Advanced list view with infinite scroll
- Event timeline view

### Phase 4: Infrastructure (Weeks 4-5)
- Redis caching for filter options
- WebSocket for real-time updates
- API rate limiting
- Performance monitoring (Sentry)

### Phase 5: Social Features (Weeks 5-6)
- User profiles & favorites
- Social sharing
- Event reminders
- Push notifications

**Full Roadmap**: See `V2_ROADMAP.md`

---

## 📚 Documentation Quick Links

### For Development
1. **[Frontend Architecture](./docs/FRONTEND_ARCHITECTURE.md)** - Complete component guide
2. **[Backend & API](./docs/BACKEND_API.md)** - API routes & database
3. **[Type System](./docs/FRONTEND_ARCHITECTURE.md#type-system)** - TypeScript types reference

### For Features
1. **[V1 Features](./V1_FEATURES.md)** - What the platform does
2. **[Filtering System](./docs/FRONTEND_ARCHITECTURE.md#filtering-system)** - How filters work
3. **[Authentication](./docs/FRONTEND_ARCHITECTURE.md#authentication-flow)** - Auth implementation

### For Deployment
1. **[Deployment Guide](./DEPLOYMENT.md)** - Production deployment
2. **[Database Setup](./DATABASE_SETUP.md)** - Supabase configuration
3. **[Environment Variables](./docs/BACKEND_API.md#security)** - Required env vars

---

## 💡 Tips for AI Assistants

### When Working with This Codebase

1. **Always check types first**
   - Location: `src/types/index.ts`
   - 387 lines of comprehensive type definitions
   - Reference before creating new interfaces

2. **Understand the filter flow**
   - User selects filter → State updates in `page.tsx`
   - `useClientSideVenues` filters all venues client-side
   - No API calls during filter changes
   - Results deduplicated by `venue_id`

3. **Follow existing patterns**
   - Component structure: hooks → effects → handlers → render
   - API routes: try-catch → query → transform → return
   - Types: interface for objects, type for unions

4. **Test filtering logic carefully**
   - ANY selected value matches (OR logic)
   - Hierarchical filters check both primary AND secondary
   - Special handling for pipe-separated values (vibes)
   - Date parsing supports multiple formats

5. **Performance matters**
   - Use `useMemo` for expensive calculations
   - Use `useCallback` for event handlers
   - Avoid unnecessary re-renders
   - Client-side filtering is intentional (don't move to server)

6. **Maintain documentation**
   - Update relevant .md files when changing architecture
   - Add comments for complex logic
   - Update type definitions when data structure changes

### Common AI Tasks

**Adding a new filter type:**
1. Add to `HierarchicalFilterState` in `src/types/index.ts`
2. Update filtering logic in `useClientSideVenues.ts`
3. Add UI component in `src/components/filters/`
4. Update `filter-options` API to return new options
5. Document in `docs/FRONTEND_ARCHITECTURE.md`

**Adding a new API route:**
1. Create `src/app/api/[name]/route.ts`
2. Follow existing error handling pattern
3. Add TypeScript types for request/response
4. Document in `docs/BACKEND_API.md`
5. Create custom hook if needed

**Modifying database schema:**
1. Update Supabase schema (SQL migrations)
2. Update types in `src/types/index.ts`
3. Update API routes that query affected tables
4. Update documentation in `docs/BACKEND_API.md`
5. Test thoroughly with real data

---

## 🔍 Debugging Tips

### Frontend Issues
```typescript
// Enable detailed filter logging
// In useClientSideVenues.ts, logs are already extensive
console.log('🔍 CLIENT FILTER - Starting filter with:', filters);
```

### API Issues
```typescript
// Check API route logs
console.log('📊 SUPABASE QUERY - Raw records returned:', data?.length);
```

### Map Issues
```typescript
// Check map initialization
console.log('🗺️ Map loaded with venues:', venues.length);
```

### State Issues
```typescript
// Use React DevTools
// Install: https://react.dev/learn/react-developer-tools
// Inspect: Component tree, Props, State, Hooks
```

---

## 🎉 Project Milestones

### ✅ Completed (V1.0)
- [x] Interactive map with custom Dubai theme
- [x] 10+ filter types with hierarchical structure
- [x] Client-side filtering for instant performance
- [x] Multi-provider authentication
- [x] Responsive design (mobile/tablet/desktop)
- [x] Venue-event data integration
- [x] Glass morphism UI design
- [x] Comprehensive documentation (30,000+ words)

### 🚧 In Progress
- [ ] User testing and feedback collection
- [ ] Performance monitoring setup
- [ ] V2 planning and design

### 📋 Planned (V2.0)
- [ ] AI-powered recommendations
- [ ] Social features (profiles, favorites)
- [ ] Dark/Light mode
- [ ] Push notifications
- [ ] Advanced search with NLP

---

## 📞 Support & Resources

### Documentation
- Start here: `README.md`
- Frontend: `docs/FRONTEND_ARCHITECTURE.md`
- Backend: `docs/BACKEND_API.md`
- Features: `V1_FEATURES.md`
- All docs: `docs/INDEX.md`

### External Resources
- Next.js 15: https://nextjs.org/docs
- React 19: https://react.dev
- Supabase: https://supabase.com/docs
- Google Maps API: https://developers.google.com/maps
- Tailwind CSS: https://tailwindcss.com/docs

### Project Links
- GitHub: https://github.com/jhamb285/WMV
- Deployment: Vercel (primary)

---

## 🏁 Quick Start for AI Assistants

**If you're helping with this project:**

1. **Read this file first** (you're here! ✓)
2. **Check the specific area**:
   - Frontend work? → `docs/FRONTEND_ARCHITECTURE.md`
   - Backend/API? → `docs/BACKEND_API.md`
   - Features? → `V1_FEATURES.md`
3. **Understand the types**: `src/types/index.ts`
4. **Follow existing patterns**: Look at similar components/routes
5. **Test thoroughly**: Filters are complex, test edge cases
6. **Update docs**: Keep documentation in sync with code

**Golden Rules:**
- ✅ Client-side filtering is intentional (don't change to server-side)
- ✅ Always use TypeScript types (defined in `src/types/index.ts`)
- ✅ Follow the hierarchical filter structure
- ✅ Maintain backward compatibility when possible
- ✅ Update documentation when changing architecture
- ❌ Don't add unnecessary dependencies
- ❌ Don't remove comprehensive logging (helpful for debugging)
- ❌ Don't change filter logic without understanding full flow

---

**Last Updated**: October 2025 | **Version**: 1.0 | **Status**: Production Ready

**Made with ❤️ by the Where's My Vibe Team**

---

*This file serves as the single source of truth for AI assistants working on the Dubai Events Platform. Keep it updated as the project evolves.*
