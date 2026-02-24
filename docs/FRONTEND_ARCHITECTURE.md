# Frontend Architecture Documentation
## Dubai Events Platform V2

---

## Table of Contents
1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Core Components](#core-components)
5. [State Management](#state-management)
6. [Routing & Navigation](#routing--navigation)
7. [Filtering System](#filtering-system)
8. [Map Integration](#map-integration)
9. [Authentication Flow](#authentication-flow)
10. [Styling & Theming](#styling--theming)
11. [Performance Optimizations](#performance-optimizations)
12. [Custom Hooks](#custom-hooks)
13. [Type System](#type-system)

---

## Overview

The Dubai Events Platform frontend is built using Next.js 15 with the App Router, TypeScript for type safety, and Tailwind CSS for styling. The architecture follows a component-based approach with clear separation of concerns between UI, business logic, and data management.

### Key Architectural Principles
- **Client-Side First**: Instant filtering using client-side data processing
- **Type Safety**: Full TypeScript coverage across all components
- **Responsive Design**: Mobile-first approach with breakpoint-specific layouts
- **Performance**: Optimized rendering with React hooks (useMemo, useCallback)
- **Accessibility**: Semantic HTML and ARIA labels throughout

---

## Technology Stack

### Core Framework
```json
{
  "next": "15.5.2",
  "react": "19.1.0",
  "typescript": "5.0"
}
```

### UI & Styling
```json
{
  "tailwindcss": "4.0",
  "framer-motion": "12.23.12",
  "lucide-react": "0.542.0",
  "@radix-ui/*": "Various radix components",
  "class-variance-authority": "0.7.1",
  "clsx": "2.1.1",
  "tailwind-merge": "3.3.1"
}
```

### State Management & Data Fetching
```json
{
  "zustand": "5.0.8",
  "@tanstack/react-query": "5.87.1",
  "axios": "1.11.0"
}
```

### Maps & External Services
```json
{
  "@googlemaps/js-api-loader": "2.20.7",
  "@supabase/supabase-js": "2.57.2"
}
```

---

## Project Structure

```
src/
├── app/                          # Next.js 15 App Router
│   ├── page.tsx                  # Home page (Map View)
│   ├── layout.tsx                # Root layout with providers
│   ├── globals.css               # Global styles
│   ├── list/                     # List view page
│   │   └── page.tsx
│   ├── auth/                     # Authentication pages
│   │   └── callback/
│   └── login/                    # Login page
│       └── page.tsx
│
├── components/                   # React components (65+ files)
│   ├── auth/                     # Authentication components
│   │   ├── GoogleLoginButton.tsx
│   │   ├── EmailLoginForm.tsx
│   │   └── PhoneLoginForm.tsx
│   ├── filters/                  # Filter system components
│   │   ├── CategoryPills.tsx     # Hierarchical genre/vibe filters
│   │   ├── AttributePills.tsx    # Event attribute filters
│   │   ├── BottomFilterButtons.tsx
│   │   ├── FilterActionBar.tsx
│   │   ├── FilterSection.tsx
│   │   └── PillButton.tsx
│   ├── map/                      # Map-related components
│   │   ├── MapContainer.tsx      # Main Google Maps wrapper
│   │   ├── VenuePin.tsx          # Individual venue pins
│   │   └── VenueCluster.tsx      # Venue clustering logic
│   ├── navigation/               # Navigation components
│   │   ├── TopNav.tsx            # Top navigation bar
│   │   ├── BottomNav.tsx         # Bottom navigation (mobile)
│   │   └── GenreFilterTiles.tsx
│   ├── venue/                    # Venue detail components
│   │   ├── VenueDetailsSidebar.tsx
│   │   └── VenueFloatingPanel.tsx
│   ├── events/                   # Event display components
│   │   ├── EventCard.tsx
│   │   └── EventSection.tsx
│   ├── onboarding/               # Onboarding UI
│   │   └── WelcomePopup.tsx
│   └── ui/                       # Shadcn UI components (20+ files)
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       └── ...
│
├── contexts/                     # React Context API
│   ├── AuthContext.tsx           # Authentication state
│   ├── ThemeContext.tsx          # Theme management
│   └── BulkEventsContext.tsx     # Event bulk loading
│
├── hooks/                        # Custom React hooks
│   ├── useClientSideVenues.ts    # Main filtering hook (552 lines)
│   ├── useBulkEvents.ts
│   ├── useEvents.ts
│   ├── useFilterOptions.ts
│   └── useVenues.ts
│
├── lib/                          # Utility functions
│   ├── supabase/
│   │   ├── client.ts             # Supabase client
│   │   └── server.ts             # Server-side Supabase
│   ├── category-mappings.ts      # Music/vibe categories
│   ├── category-utils.ts         # Category transformation
│   ├── maps-config.ts            # Google Maps configuration
│   ├── venue-clustering.ts       # Clustering algorithm
│   └── utils.ts                  # General utilities
│
├── stores/                       # Zustand state stores
│   ├── filters/
│   ├── venue/
│   ├── map/
│   └── ui/
│
├── types/                        # TypeScript definitions
│   ├── index.ts                  # Main types (387 lines)
│   ├── filters/
│   ├── venue/
│   └── map/
│
└── styles/                       # Additional stylesheets
    ├── horizontal-nav.css
    └── globals.css
```

---

## Core Components

### 1. App Entry Point (`src/app/page.tsx`)

**Purpose**: Main application page rendering the map view

**Key Features**:
- Hierarchical filter state management
- Client-side venue filtering with `useClientSideVenues`
- Welcome popup for first-time users
- View toggle buttons (Map/List)
- Loading and error states

**Code Structure**:
```typescript
export default function Home() {
  // Hierarchical filter state
  const [filters, setFilters] = useState<HierarchicalFilterState>({
    selectedPrimaries: { genres: [], vibes: [] },
    selectedSecondaries: { genres: {}, vibes: {} },
    expandedPrimaries: { genres: [], vibes: [] },
    eventCategories: {...},
    attributes: {...},
    selectedAreas: ['All Dubai'],
    activeDates: [],
    activeOffers: [],
    searchQuery: ''
  });

  // Client-side filtering for instant performance
  const { filteredVenues, isLoading, error } = useClientSideVenues(filters);

  // Welcome popup logic - show once per session
  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcomePopup');
    if (!hasSeenWelcome && !isLoading && venues.length > 0) {
      setTimeout(() => setShowWelcomePopup(true), 1000);
    }
  }, [isLoading, venues.length]);

  return (
    <ThemeProvider>
      <main className="h-screen w-full">
        <MapContainer
          venues={filteredVenues}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          isLoading={isLoading}
        />
        <WelcomePopup isOpen={showWelcomePopup} onClose={handleClose} />
      </main>
    </ThemeProvider>
  );
}
```

**State Management**:
- Uses React `useState` for filter state
- Session storage for welcome popup tracking
- Passes filter state down to child components

**Performance Considerations**:
- Client-side filtering prevents unnecessary API calls
- Memoized filtered venues in `useClientSideVenues`
- Delayed welcome popup to avoid blocking initial render

---

### 2. MapContainer (`src/components/map/MapContainer.tsx`)

**Purpose**: Main Google Maps integration component

**Responsibilities**:
1. Initialize Google Maps with custom retro Dubai styling
2. Render venue pins with clustering
3. Handle pin click events for venue selection
4. Coordinate viewport management
5. Display venue details sidebar

**Key Features**:
- Custom RETRO_MAP_STYLE for Dubai theme
- Venue clustering based on proximity
- Interactive venue pin markers
- Sidebar coordination for venue details
- Responsive map controls

**Integration Points**:
```typescript
// Maps configuration from lib/maps-config.ts
export const GOOGLE_MAPS_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  libraries: ['places', 'drawing', 'visualization'],
  language: 'en',
  region: 'AE'
};

export const MAP_OPTIONS = {
  center: DUBAI_CENTER, // { lat: 25.2048, lng: 55.2708 }
  zoom: 12,
  styles: RETRO_MAP_STYLE,
  disableDefaultUI: true,
  gestureHandling: 'greedy',
  zoomControl: true
};
```

**Map Styling** (RETRO_MAP_STYLE):
```typescript
// Custom retro Dubai color palette
const RETRO_MAP_STYLE = [
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#f8c967' }] // Highway gold
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#b9d3c2' }] // Water blue-green
  },
  // ... additional styling for parks, buildings, etc.
];
```

---

### 3. Filter Components

#### CategoryPills (`src/components/filters/CategoryPills.tsx`)
**Purpose**: Hierarchical genre/vibe filter pills

**Features**:
- Two-level hierarchy: Primary categories → Secondary subcategories
- Expand/collapse functionality for each primary
- Color-coded categories
- Multi-selection support
- Visual feedback for selected states

**Structure**:
```typescript
interface CategoryPillsProps {
  type: 'genres' | 'vibes';
  hierarchicalData: Record<string, { color: string; subcategories: string[] }>;
  selectedPrimaries: string[];
  selectedSecondaries: Record<string, string[]>;
  expandedPrimaries: string[];
  onSelectPrimary: (primary: string) => void;
  onSelectSecondary: (primary: string, secondary: string) => void;
  onToggleExpand: (primary: string) => void;
}
```

#### AttributePills (`src/components/filters/AttributePills.tsx`)
**Purpose**: Event attribute filters (venue, energy, timing, status)

**Features**:
- Four attribute categories
- Multi-selection within each category
- Visual pills with active states
- Responsive layout

---

### 4. Navigation Components

#### TopNav (`src/components/navigation/TopNav.tsx`)
**Desktop Navigation**:
- Horizontal pill-style navigation
- Glass morphism effects
- Filter panel management
- Active filter indicators

#### BottomNav (`src/components/navigation/BottomNav.tsx`)
**Mobile Navigation**:
- Fixed bottom navigation bar
- Glassmorphism floating design
- Expandable filter panels
- Touch-optimized interactions
- 44px+ touch targets

**Responsive Breakpoints**:
```typescript
// Mobile: < 768px
- Bottom navigation
- Full-width sidebar
- Compact filter panels

// Tablet: 768px - 1024px
- Horizontal navigation
- Partial sidebar
- Expanded filter panels

// Desktop: > 1024px
- Full horizontal navigation
- Fixed sidebar
- All filters visible
```

---

### 5. Venue Details Components

#### VenueDetailsSidebar (`src/components/venue/VenueDetailsSidebar.tsx`)
**Purpose**: Display comprehensive venue information

**Features**:
- Event grouping by date
- Scrollable event tiles
- Venue metadata (address, phone, website)
- Instagram stories integration (ready)
- Social links
- Rating display

**Data Flow**:
```typescript
// Fetch events for selected venue
const { events, isLoading } = useEvents({
  venue_name: venue.name,
  genres: filters.activeGenres,
  vibes: filters.activeVibes
});

// Group events by date
const eventsByDate = groupBy(events, 'event_date');
```

#### VenueFloatingPanel (`src/components/venue/VenueFloatingPanel.tsx`)
**Purpose**: Mobile-optimized floating venue panel

**Features**:
- Slide-up animation
- Swipe-to-dismiss gesture
- Compact event display
- Quick action buttons

---

### 6. Authentication Components

#### AuthContext (`src/contexts/AuthContext.tsx`)
**Purpose**: Centralized authentication state management

**Features**:
- Session management with Supabase
- User state tracking
- Auth state change listeners
- Sign out functionality

**Implementation**:
```typescript
interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        router.refresh();
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
```

#### Login Components
1. **GoogleLoginButton.tsx**: OAuth 2.0 Google Sign-In
2. **EmailLoginForm.tsx**: Email/password authentication
3. **PhoneLoginForm.tsx**: Phone OTP authentication

---

## State Management

### 1. React Context API

#### AuthContext
- **Purpose**: Global authentication state
- **Scope**: Application-wide
- **Usage**: User session, authentication status

#### ThemeContext
- **Purpose**: Dark/Light mode management
- **Scope**: Application-wide
- **Usage**: Theme toggle, system preference detection

#### BulkEventsContext
- **Purpose**: Bulk event loading state
- **Scope**: Event-related components
- **Usage**: Batch event fetching optimization

### 2. Zustand Stores

#### Filter Store (`stores/filters/`)
```typescript
interface FilterStore {
  filters: HierarchicalFilterState;
  setFilters: (filters: HierarchicalFilterState) => void;
  toggleArea: (area: string) => void;
  toggleGenre: (genre: string) => void;
  toggleVibe: (vibe: string) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filters: initialFilterState,
  setFilters: (filters) => set({ filters }),
  toggleArea: (area) => set(state => ({
    filters: {
      ...state.filters,
      selectedAreas: toggleArrayValue(state.filters.selectedAreas, area)
    }
  })),
  // ... other actions
}));
```

#### Map Store (`stores/map/`)
- Map center coordinates
- Zoom level
- Viewport bounds
- Selected venue

#### UI Store (`stores/ui/`)
- Sidebar open/closed state
- Modal visibility
- Toast notifications
- Loading states

### 3. Local Component State

**When to use**:
- Component-specific UI state (e.g., dropdown open/closed)
- Form input values
- Temporary animation states

**Example**:
```typescript
const [isExpanded, setIsExpanded] = useState(false);
const [searchQuery, setSearchQuery] = useState('');
```

---

## Routing & Navigation

### App Router Structure (Next.js 15)

```
app/
├── page.tsx                 # / (Home - Map View)
├── list/
│   └── page.tsx            # /list (List View)
├── auth/
│   ├── callback/
│   │   └── route.ts        # /auth/callback (OAuth callback)
├── login/
│   └── page.tsx            # /login (Login page)
└── api/                    # API routes (see Backend documentation)
```

### Navigation Methods

#### 1. Programmatic Navigation
```typescript
import { useRouter } from 'next/navigation';

const router = useRouter();
router.push('/list');        // Navigate to list view
router.back();               // Go back
router.refresh();            // Refresh current route
```

#### 2. Link Components
```typescript
import Link from 'next/link';

<Link href="/list">View as List</Link>
```

#### 3. View Toggle Buttons
```typescript
<button onClick={() => router.push('/')}>
  <Map className="w-5 h-5" />
</button>
<button onClick={() => router.push('/list')}>
  <List className="w-5 h-5" />
</button>
```

---

## Filtering System

### Architecture Overview

The filtering system uses a **client-side first** approach for instant performance:

1. **Data Loading**: Fetch all venues once on page load
2. **Client Filtering**: Filter in browser using `useMemo`
3. **Instant Updates**: No API calls during filter changes
4. **Hierarchical State**: Support primary + secondary selections

### Filter Types

#### 1. Hierarchical Filters
**Genres** (Music styles):
```typescript
{
  "Electronic": {
    color: "indigo",
    subcategories: ["Techno", "House", "Deep House", "Progressive"]
  },
  "Live": {
    color: "green",
    subcategories: ["Jazz", "Rock", "Acoustic", "Indie"]
  }
}
```

**Vibes** (Atmosphere):
```typescript
{
  "Energy": {
    color: "orange",
    subcategories: ["High Energy", "Nightclub", "Party", "Dance"]
  },
  "Atmosphere": {
    color: "teal",
    subcategories: ["Open-air", "Rooftop", "Lounge", "Intimate"]
  }
}
```

#### 2. Flat Filters
- **Areas**: Geographic locations (Downtown Dubai, Dubai Marina, JBR, etc.)
- **Dates**: Event dates (formatted: "17 Sept 25")
- **Offers**: Special offers (Free Entry, VIP, etc.)
- **Venue Categories**: Bar, Lounge, Restaurant, Beach Club, etc.

#### 3. Range Filters
- **Ratings**: 1-5 stars
- **Ticket Prices**: Free, AED 0-50, AED 50-100, AED 100-200, AED 200+
- **Venue Prices**: Exact database values (e.g., "AED", "AED AED", etc.)

#### 4. Time Filters (Categorized)
- Morning (6 AM - 12 PM)
- Afternoon (12 PM - 6 PM)
- Evening (6 PM - 10 PM)
- Night (10 PM - 6 AM)

### Filter State Structure

```typescript
interface HierarchicalFilterState {
  selectedPrimaries: {
    genres: string[];
    vibes: string[];
  };
  selectedSecondaries: {
    genres: Record<string, string[]>;  // { "Electronic": ["Techno", "House"] }
    vibes: Record<string, string[]>;
  };
  expandedPrimaries: {
    genres: string[];
    vibes: string[];
  };
  eventCategories: {
    selectedPrimaries: string[];
    selectedSecondaries: Record<string, string[]>;
    expandedPrimaries: string[];
  };
  attributes: {
    venue: string[];
    energy: string[];
    timing: string[];
    status: string[];
  };
  selectedAreas: string[];
  activeDates: string[];
  activeOffers: string[];
  searchQuery: string;
  selectedRatings?: number[];
  selectedVenueCategories?: string[];
  selectedTimes?: string[];
  selectedTicketPrices?: string[];
  selectedVenuePrices?: string[];
  selectedAtmospheres?: string[];
  selectedEventCategories?: string[];
}
```

### Filtering Logic (`useClientSideVenues.ts`)

**Key Features**:
- **552 lines** of comprehensive filtering logic
- Filters applied in sequence with console logging
- Support for hierarchical primary + secondary matching
- Special handling for pipe-separated values (vibes)
- Date format parsing and matching
- Time categorization and range matching

**Example Filter Application**:
```typescript
// Apply genre filter using music_genre_processed primaries AND secondaries
if (activeGenres?.length > 0) {
  if (!venue.music_genre_processed?.primaries) {
    return false; // Exclude venues without processed genres
  }

  // ANY selected genre must match (OR logic)
  const anyGenreMatches = activeGenres.some(selectedGenre => {
    // Check if it's a primary
    if (venue.music_genre_processed!.primaries.includes(selectedGenre)) {
      return true;
    }

    // Check if it's a secondary
    for (const [primary, secondaries] of Object.entries(
      venue.music_genre_processed!.secondariesByPrimary || {}
    )) {
      if (secondaries.includes(selectedGenre)) {
        return true;
      }
    }

    return false;
  });

  if (!anyGenreMatches) {
    return false;
  }
}
```

---

## Map Integration

### Google Maps Configuration

**API Setup** (`lib/maps-config.ts`):
```typescript
export const GOOGLE_MAPS_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  libraries: ['places', 'drawing', 'visualization'] as const,
  language: 'en',
  region: 'AE',
  version: 'weekly'
};

export const DUBAI_CENTER: LatLng = { lat: 25.2048, lng: 55.2708 };

export const DUBAI_AREAS: DubaiArea[] = [
  { name: 'Downtown Dubai', lat: 25.1972, lng: 55.2744, zoom: 14 },
  { name: 'Dubai Marina', lat: 25.0772, lng: 55.1390, zoom: 14 },
  { name: 'JBR (Jumeirah Beach Residence)', lat: 25.0785, lng: 55.1316, zoom: 15 },
  // ... 11 total areas
];
```

### Custom Map Styling (Retro Dubai Theme)

**Color Palette**:
```typescript
const RETRO_COLORS = {
  highway: '#f8c967',      // Gold
  park: '#a5b076',         // Green
  water: '#b9d3c2',        // Blue-green
  controlled: '#e98d58',   // Orange
  landscape: '#dfd2ae'     // Beige
};

const RETRO_MAP_STYLE: google.maps.MapTypeStyle[] = [
  {
    featureType: 'administrative',
    elementType: 'labels',
    stylers: [{ visibility: 'on' }]
  },
  {
    featureType: 'poi',
    stylers: [{ visibility: 'off' }]  // Hide POI for cleaner map
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: RETRO_COLORS.highway }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: RETRO_COLORS.water }]
  },
  // ... additional styling
];
```

### Venue Clustering

**Purpose**: Group nearby venues to reduce map clutter

**Algorithm** (`lib/venue-clustering.ts`):
```typescript
const CLUSTER_DISTANCE = 100; // meters

export function createVenueClusters(venues: Venue[]): VenueCluster[] {
  const clusters: VenueCluster[] = [];
  const processed = new Set<string>();

  venues.forEach(venue => {
    if (processed.has(venue.venue_id)) return;

    // Find nearby venues within CLUSTER_DISTANCE
    const nearby = venues.filter(v =>
      !processed.has(v.venue_id) &&
      calculateDistance(venue, v) < CLUSTER_DISTANCE
    );

    if (nearby.length > 1) {
      // Create cluster with multiple venues
      clusters.push(new VenueCluster(nearby));
      nearby.forEach(v => processed.add(v.venue_id));
    } else {
      // Single venue, no clustering needed
      clusters.push(venue);
      processed.add(venue.venue_id);
    }
  });

  return clusters;
}

function calculateDistance(venue1: Venue, venue2: Venue): number {
  // Haversine formula for distance between two coordinates
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (venue1.lat * Math.PI) / 180;
  const φ2 = (venue2.lat * Math.PI) / 180;
  const Δφ = ((venue2.lat - venue1.lat) * Math.PI) / 180;
  const Δλ = ((venue2.lng - venue1.lng) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}
```

### Venue Pin Rendering

**Pin Colors by Venue Type**:
```typescript
const VENUE_COLORS = {
  nightclub: '#f8c967',    // Gold
  restaurant: '#a5b076',   // Green
  bar: '#e98d58',          // Orange
  beach: '#b9d3c2',        // Blue-green
  rooftop: '#db8555',      // Dark orange
  hotel: '#dfd2ae'         // Beige
};

function getVenueColor(category: string): string {
  const categoryLower = category.toLowerCase();
  if (categoryLower.includes('night') || categoryLower.includes('club')) {
    return VENUE_COLORS.nightclub;
  }
  if (categoryLower.includes('restaurant')) {
    return VENUE_COLORS.restaurant;
  }
  // ... additional category checks
  return '#f8c967'; // Default to gold
}
```

---

## Authentication Flow

### Multi-Provider Authentication

#### 1. Google OAuth
```typescript
// GoogleLoginButton.tsx
async function handleGoogleLogin() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  });

  if (error) {
    console.error('Google login error:', error);
  }
}
```

#### 2. Email/Password
```typescript
// EmailLoginForm.tsx
async function handleEmailLogin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    setError(error.message);
  } else {
    router.push('/');
  }
}
```

#### 3. Phone OTP
```typescript
// PhoneLoginForm.tsx
async function sendOTP(phone: string) {
  const { error } = await supabase.auth.signInWithOtp({
    phone,
    options: {
      channel: 'sms'
    }
  });

  if (!error) {
    setOtpSent(true);
  }
}

async function verifyOTP(phone: string, token: string) {
  const { data, error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: 'sms'
  });

  if (!error) {
    router.push('/');
  }
}
```

### Auth State Management

**Session Persistence**:
- Supabase handles JWT tokens automatically
- Auth state persisted in localStorage
- Auto-refresh on tab/window change

**Protected Routes** (Future V2 feature):
```typescript
// middleware.ts (example for V2)
export function middleware(request: NextRequest) {
  const session = request.cookies.get('sb-access-token');

  if (!session && request.nextUrl.pathname.startsWith('/protected')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
```

---

## Styling & Theming

### Tailwind CSS Configuration

```typescript
// tailwind.config.ts
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dubai Retro Theme
        'venue-nightclub': 'hsl(var(--venue-nightclub))',
        'venue-restaurant': 'hsl(var(--venue-restaurant))',
        'venue-bar': 'hsl(var(--venue-bar))',
        'venue-beach': 'hsl(var(--venue-beach))',
        'venue-rooftop': 'hsl(var(--venue-rooftop))',
        'venue-hotel': 'hsl(var(--venue-hotel))',
      },
      backdropBlur: {
        xs: '2px',
      },
      maxHeight: {
        '50vh': '50vh',
        '30vh': '30vh',
      },
      animation: {
        'bounce-subtle': 'bounce 1s ease-in-out 2',
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ]
};
```

### CSS Variables (globals.css)

```css
:root {
  --venue-nightclub: 45 85% 69%;  /* #f8c967 */
  --venue-restaurant: 68 26% 58%; /* #a5b076 */
  --venue-bar: 23 68% 63%;        /* #e98d58 */
  --venue-beach: 158 24% 78%;     /* #b9d3c2 */
  --venue-rooftop: 18 58% 60%;    /* #db8555 */
  --venue-hotel: 45 37% 82%;      /* #dfd2ae */
}

.dark {
  --venue-nightclub: 45 85% 59%;
  --venue-restaurant: 68 26% 48%;
  /* ... dark mode variants */
}
```

### Glass Morphism Effects

```css
/* Glass navigation pill */
.glass-nav-pill {
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 4px 16px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

/* Dark glass popup */
.dark-glass-popup {
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.6),
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}
```

### Custom Scrollbar

```css
/* Thin scrollbar for desktop */
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.6) transparent;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.6);
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.8);
}
```

---

## Performance Optimizations

### 1. React Optimization Patterns

#### useMemo for Expensive Calculations
```typescript
const filteredVenues = useMemo(() => {
  return allVenues.filter(venue => {
    // Complex filtering logic
    return matchesAreaFilter(venue) &&
           matchesVibeFilter(venue) &&
           matchesDateFilter(venue);
  });
}, [allVenues, filters.selectedAreas, filters.activeVibes, filters.activeDates]);
```

#### useCallback for Event Handlers
```typescript
const handleFilterChange = useCallback((newFilters: HierarchicalFilterState) => {
  setFilters(newFilters);
}, []);

const handleVenueSelect = useCallback((venue: Venue) => {
  setSelectedVenue(venue);
  setIsSidebarOpen(true);
}, []);
```

#### React.memo for Component Memoization
```typescript
const EventCard = React.memo(({ event }: { event: Event }) => {
  return (
    <div className="event-card">
      <h3>{event.name}</h3>
      <p>{event.date}</p>
    </div>
  );
});
```

### 2. Data Loading Strategies

#### Single API Call on Mount
```typescript
// Load all venues once, filter client-side
useEffect(() => {
  const fetchAllVenues = async () => {
    const response = await fetch('/api/venues');
    const result = await response.json();
    setAllVenues(result.data);
  };

  fetchAllVenues();
}, []); // Empty dependency array - only load once
```

#### Lazy Loading for Route Components
```typescript
// Lazy load list view component
const ListViewPage = dynamic(() => import('./list/page'), {
  loading: () => <LoadingSpinner />,
  ssr: false // Disable SSR for faster hydration
});
```

### 3. Image Optimization

```typescript
import Image from 'next/image';

<Image
  src={venue.imageUrl}
  alt={venue.name}
  width={400}
  height={300}
  loading="lazy"
  placeholder="blur"
  blurDataURL="/placeholder.jpg"
/>
```

### 4. Map Performance

#### Venue Clustering
- Reduces number of map markers
- Improves rendering performance
- Better visual clarity

#### Debounced Map Updates
```typescript
const debouncedMapUpdate = useMemo(
  () => debounce((venues: Venue[]) => {
    updateMapMarkers(venues);
  }, 300),
  []
);

useEffect(() => {
  debouncedMapUpdate(filteredVenues);
}, [filteredVenues, debouncedMapUpdate]);
```

---

## Custom Hooks

### 1. useClientSideVenues

**Purpose**: Client-side venue filtering for instant performance

**File**: `src/hooks/useClientSideVenues.ts` (552 lines)

**Features**:
- Loads all venues once on mount
- Filters in `useMemo` for instant updates
- Comprehensive filter logic for 10+ filter types
- Console logging for debugging
- Error handling and loading states

**Usage**:
```typescript
const { filteredVenues, allVenues, isLoading, error } = useClientSideVenues(filters);
```

**Return Type**:
```typescript
interface UseClientSideVenuesResult {
  allVenues: Venue[];
  filteredVenues: Venue[];
  isLoading: boolean;
  error: string | null;
}
```

### 2. useFilterOptions

**Purpose**: Load available filter options from API

**File**: `src/hooks/useFilterOptions.ts`

**Features**:
- Fetches filter options from `/api/filter-options`
- Caches options in memory
- Returns hierarchical genres/vibes structure

**Usage**:
```typescript
const { filterOptions, isLoading, error } = useFilterOptions();

// filterOptions structure
{
  areas: string[],
  dates: string[],
  hierarchicalGenres: Record<string, { color: string; subcategories: string[] }>,
  hierarchicalVibes: Record<string, { color: string; subcategories: string[] }>,
  venueCategories: string[],
  specialOffers: string[],
  times: string[],
  ticketPrices: string[],
  atmospheres: string[],
  eventCategories: string[]
}
```

### 3. useEvents

**Purpose**: Fetch events for a specific venue

**File**: `src/hooks/useEvents.ts`

**Features**:
- React Query integration for caching
- Filter support
- Automatic refetch on filter changes

**Usage**:
```typescript
const { events, isLoading, error, refetch } = useEvents({
  venue_name: venue.name,
  genres: filters.activeGenres,
  vibes: filters.activeVibes,
  dates: filters.activeDates
});
```

### 4. useBulkEvents

**Purpose**: Batch event fetching optimization

**File**: `src/hooks/useBulkEvents.ts`

**Features**:
- Fetches events for multiple venues at once
- Reduces API calls
- Optimized for 100+ venues

**Usage**:
```typescript
const { bulkEvents, isLoading } = useBulkEvents(venueIds);
```

---

## Type System

### Core Type Definitions (`src/types/index.ts`)

#### Geographic Types
```typescript
interface LatLng {
  lat: number;
  lng: number;
}

interface DubaiArea {
  name: string;
  lat: number;
  lng: number;
  zoom?: number;
}

const DUBAI_CENTER: LatLng = { lat: 25.2048, lng: 55.2708 };
```

#### Venue Types
```typescript
interface Venue {
  venue_id: number | string;
  name: string;
  area: string;
  address?: string;
  country?: string;
  lat: number;
  lng: number;
  phone?: string;
  website?: string;
  category: string;
  created_at?: string;
  final_instagram?: string;
  event_vibe?: string[];
  event_date?: string;
  music_genre_processed?: ProcessedGenre;
  event_vibe_processed?: ProcessedVibe;
  event_categories?: EventCategory[];
  attributes?: EventAttributes;
  rating?: number;
  rating_count?: number;
}

interface ProcessedGenre {
  primaries: string[];
  secondariesByPrimary: Record<string, string[]>;
  colorFamilies: string[];
}

interface ProcessedVibe {
  primaries: string[];
  secondariesByPrimary: Record<string, string[]>;
  colorFamilies: string[];
}
```

#### Event Types
```typescript
interface Event {
  event_id: string;
  event_name: string;
  event_date: string;
  event_time?: string;
  venue_name: string;
  music_genres?: string[];
  event_vibes?: string[];
  ticket_price?: number;
  special_offers?: string[];
  artists?: string[];
  description?: string;
}

interface EventCategory {
  primary: string;
  secondary: string;
  confidence?: number;
}

interface EventAttributes {
  venue: string[];    // e.g., ["Rooftop", "Open-air"]
  energy: string[];   // e.g., ["High Energy", "Intimate"]
  timing: string[];   // e.g., ["Night", "Late Night"]
  status: string[];   // e.g., ["VIP", "Exclusive"]
}
```

#### Filter Types
```typescript
interface HierarchicalFilterState {
  selectedPrimaries: {
    genres: string[];
    vibes: string[];
  };
  selectedSecondaries: {
    genres: Record<string, string[]>;
    vibes: Record<string, string[]>;
  };
  expandedPrimaries: {
    genres: string[];
    vibes: string[];
  };
  eventCategories: {
    selectedPrimaries: string[];
    selectedSecondaries: Record<string, string[]>;
    expandedPrimaries: string[];
  };
  attributes: {
    venue: string[];
    energy: string[];
    timing: string[];
    status: string[];
  };
  selectedAreas: string[];
  activeDates: string[];
  activeOffers: string[];
  searchQuery: string;
  selectedRatings?: number[];
  selectedVenueCategories?: string[];
  selectedTimes?: string[];
  selectedTicketPrices?: string[];
  selectedVenuePrices?: string[];
  selectedAtmospheres?: string[];
  selectedEventCategories?: string[];
}

// Flat filter state for backward compatibility
interface FilterState {
  selectedAreas: string[];
  activeVibes: string[];
  activeDates: string[];
  activeGenres: string[];
  activeOffers: string[];
  searchQuery: string;
}
```

#### API Response Types
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
}

interface VenuesApiResponse extends ApiResponse<Venue[]> {
  message: string; // e.g., "Retrieved 257 venues from Supabase final_1"
}
```

---

## Component Communication Patterns

### 1. Props Drilling (Small Component Trees)
```typescript
// Parent component
<MapContainer
  venues={venues}
  filters={filters}
  onFiltersChange={handleFiltersChange}
/>

// MapContainer passes to children
<VenueDetailsSidebar
  venue={selectedVenue}
  filters={filters}
/>
```

### 2. Context for Global State
```typescript
// Wrap app with context provider
<AuthProvider>
  <ThemeProvider>
    <App />
  </ThemeProvider>
</AuthProvider>

// Access context in any component
const { user, session } = useAuth();
const { theme, toggleTheme } = useTheme();
```

### 3. Custom Hooks for Shared Logic
```typescript
// Share filtering logic across components
const { filteredVenues, isLoading } = useClientSideVenues(filters);

// Multiple components can use same hook
function MapView() {
  const { filteredVenues } = useClientSideVenues(filters);
  // Render map with filtered venues
}

function ListView() {
  const { filteredVenues } = useClientSideVenues(filters);
  // Render list with filtered venues
}
```

### 4. Event Emitters (Future V2 Feature)
```typescript
// Publish events
eventBus.emit('venue-selected', venue);

// Subscribe to events
eventBus.on('venue-selected', (venue) => {
  console.log('Venue selected:', venue);
});
```

---

## Error Handling & Loading States

### Error Boundaries
```typescript
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Loading States
```typescript
// Loading spinner component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      <p className="ml-4">Loading venues...</p>
    </div>
  );
}

// Usage in components
if (isLoading) {
  return <LoadingSpinner />;
}

if (error) {
  return <ErrorMessage message={error} />;
}

return <DataDisplay data={data} />;
```

### Toast Notifications
```typescript
// Using shadcn toast component
import { useToast } from '@/components/ui/use-toast';

function MyComponent() {
  const { toast } = useToast();

  const handleAction = async () => {
    try {
      await someAsyncAction();
      toast({
        title: 'Success',
        description: 'Action completed successfully',
        variant: 'default'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };
}
```

---

## Responsive Design Patterns

### Breakpoint System
```typescript
// Tailwind breakpoints
const breakpoints = {
  mobile: '< 768px',
  tablet: '768px - 1024px',
  desktop: '> 1024px'
};

// Usage in components
<div className="
  flex-col           // Mobile: stack vertically
  md:flex-row        // Tablet: horizontal
  lg:grid lg:grid-cols-3  // Desktop: grid layout
">
  {/* Content */}
</div>
```

### Conditional Rendering by Device
```typescript
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

// Usage
function ResponsiveNav() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return isMobile ? <BottomNav /> : <TopNav />;
}
```

### Touch Optimization
```typescript
// Touch-friendly button
<button
  className="min-w-[44px] min-h-[44px]"  // 44px minimum touch target
  onTouchStart={(e) => e.preventDefault()}  // Prevent double-tap zoom
  onTouchEnd={handleClick}
>
  Click Me
</button>

// Swipe gesture handler
function useSwipeGesture(onSwipeLeft: () => void, onSwipeRight: () => void) {
  const [touchStart, setTouchStart] = useState(0);

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const swipeDistance = touchStart - touchEnd;

    if (swipeDistance > 50) {
      onSwipeLeft();
    } else if (swipeDistance < -50) {
      onSwipeRight();
    }
  };

  return { handleTouchStart, handleTouchEnd };
}
```

---

## Future Frontend Enhancements (V2)

### 1. Progressive Web App (PWA)
- Service worker for offline support
- App manifest for install prompt
- Push notifications for event updates

### 2. Advanced Animations
- Framer Motion page transitions
- Skeleton loading states
- Parallax scrolling effects

### 3. Accessibility Improvements
- Screen reader support
- Keyboard navigation
- Focus management
- ARIA live regions

### 4. Performance Monitoring
- Real User Monitoring (RUM)
- Core Web Vitals tracking
- Error tracking with Sentry
- Analytics with Mixpanel

### 5. Internationalization (i18n)
- Multi-language support (Arabic, English)
- RTL layout support
- Localized date/time formats

---

## Development Workflow

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run type checking
npm run type-check
```

### Code Quality Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Type checking
- **Husky**: Git hooks for pre-commit checks

### Testing (Future V2)
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

---

## Conclusion

The Dubai Events Platform frontend is built with a modern, scalable architecture that prioritizes:

1. **Performance**: Client-side filtering, optimized rendering, lazy loading
2. **User Experience**: Responsive design, smooth animations, intuitive navigation
3. **Developer Experience**: TypeScript safety, clear component structure, comprehensive hooks
4. **Maintainability**: Modular components, consistent patterns, thorough documentation

This architecture provides a solid foundation for current features and future enhancements planned in V2.

---

**Last Updated**: October 2025
**Version**: 1.0
**Author**: Where's My Vibe Team
