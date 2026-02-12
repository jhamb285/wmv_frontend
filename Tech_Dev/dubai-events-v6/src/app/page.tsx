'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Map as MapIcon, List } from 'lucide-react';
import MapContainer from '@/components/map/MapContainer';
import WelcomePopup from '@/components/onboarding/WelcomePopup';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useClientSideVenues } from '@/hooks/useClientSideVenues';
import { type Venue, type HierarchicalFilterState } from '@/types';

export default function Home() {
  const router = useRouter();

  const [filters, setFilters] = useState<HierarchicalFilterState>({
    selectedPrimaries: {
      genres: [],
      vibes: []
    },
    selectedSecondaries: {
      genres: {},
      vibes: {}
    },
    expandedPrimaries: {
      genres: [],
      vibes: []
    },
    // New event category filter state
    eventCategories: {
      selectedPrimaries: [],
      selectedSecondaries: {},
      expandedPrimaries: []
    },
    // New attribute filter state
    attributes: {
      venue: [],
      energy: [],
      timing: [],
      status: []
    },
    selectedAreas: ['All Dubai'],
    activeDates: [new Date().toDateString()], // Default to today's date
    activeOffers: [],
    searchQuery: ''
  });

  // Use client-side filtering for instant performance
  const { filteredVenues, isLoading, error } = useClientSideVenues(filters);

  // Deduplicate by venue_id for map markers (one marker per venue)
  const venues = useMemo(() => {
    const venueMap = new Map<number, typeof filteredVenues[0]>();
    filteredVenues.forEach(venue => {
      if (venue.venue_id && !venueMap.has(venue.venue_id)) {
        venueMap.set(venue.venue_id, venue);
      }
    });
    console.log('🗺️ MAP VIEW Deduplication - Input:', filteredVenues.length, 'Output:', venueMap.size);
    return Array.from(venueMap.values());
  }, [filteredVenues]);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  // Date handling for date picker
  const handleDateChange = (dates: string[]) => {
    setFilters({
      ...filters,
      activeDates: dates
    });
  };

  // Client-side filtering now handles venue loading automatically

  // Welcome popup logic - show on first visit this session
  useEffect(() => {
    // Check if user has seen welcome popup this session
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcomePopup');

    if (!hasSeenWelcome) {
      // Show popup after a short delay once venues are loaded
      if (!isLoading && venues.length > 0) {
        const timer = setTimeout(() => {
          setShowWelcomePopup(true);
        }, 1000); // 1 second delay after venues load

        return () => clearTimeout(timer);
      }
    }
  }, [isLoading, venues.length]);

  const handleCloseWelcomePopup = () => {
    setShowWelcomePopup(false);
    // Mark as seen for this session
    sessionStorage.setItem('hasSeenWelcomePopup', 'true');
  };

  const handleVenueSelect = (_venue: Venue) => {
  };

  const handleFiltersChange = (newFilters: HierarchicalFilterState) => {
    setFilters(newFilters);
  };


  if (error) {
    return (
      <main className="h-screen w-full flex items-center justify-center bg-background">
        <div className="retro-surface p-8 max-w-md text-center">
          <h3 className="text-lg font-semibold mb-2 text-red-600">Error Loading Venues</h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </main>
    );
  }

  
  // Show loading screen only for initial load (when no venues yet)
  if (isLoading && venues.length === 0) {
    return (
      <main className="h-screen w-full flex items-center justify-center bg-background" data-testid="loading-state">
        <div className="retro-surface p-8 max-w-md text-center">
          <h3 className="text-lg font-semibold mb-2">Loading Venues...</h3>
          <p className="text-muted-foreground">Finding Dubai venues...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mt-4"></div>
        </div>
      </main>
    );
  }


  // View toggle buttons - only List button shown on map view
  const viewToggleButtons = (
    <button
      onClick={() => router.push('/list')}
      className="p-2 rounded-full bg-blue-400 text-white backdrop-blur-sm border border-blue-300 hover:bg-blue-500 transition-all"
      title="List View"
    >
      <List className="w-4 h-4 md:w-5 md:h-5" />
    </button>
  );

  return (
    <ThemeProvider>
      <main className="h-screen w-full">
        <h1 className="sr-only">Dubai Event Discovery - Find the Hottest Venues and Events</h1>
        <MapContainer
          venues={venues}
          onVenueSelect={handleVenueSelect}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          isLoading={isLoading}
          data-testid="map-container"
          navButtons={viewToggleButtons}
          showDatePicker={true}
          datePickerProps={{
            venues: filteredVenues,
            selectedDates: filters.activeDates,
            onDateChange: handleDateChange
          }}
        />

        {/* Welcome Popup */}
        <WelcomePopup
          isOpen={showWelcomePopup}
          onClose={handleCloseWelcomePopup}
        />
      </main>
    </ThemeProvider>
  );
}