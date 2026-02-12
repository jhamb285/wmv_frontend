'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Map as MapIcon, List as ListIcon } from 'lucide-react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useClientSideVenues } from '@/hooks/useClientSideVenues';
import { type HierarchicalFilterState } from '@/types';
import TopNav from '@/components/navigation/TopNav';
import CategoryPills from '@/components/filters/CategoryPills';
import EventSection from '@/components/events/EventSection';

export default function ListView() {
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
    eventCategories: {
      selectedPrimaries: [],
      selectedSecondaries: {},
      expandedPrimaries: []
    },
    attributes: {
      venue: [],
      energy: [],
      timing: [],
      status: []
    },
    selectedAreas: ['All Dubai'],
    activeDates: [],
    activeOffers: [],
    searchQuery: ''
  });

  const { filteredVenues, isLoading } = useClientSideVenues(filters);

  const handleFiltersChange = (newFilters: HierarchicalFilterState) => {
    setFilters(newFilters);
  };

  // View toggle buttons
  const viewToggleButtons = (
    <>
      <button
        onClick={() => router.push('/')}
        className="p-2 rounded-full bg-blue-400 text-white backdrop-blur-sm border border-blue-300 hover:bg-blue-500 transition-all"
        title="Map View"
      >
        <MapIcon className="w-4 h-4 md:w-5 md:h-5" />
      </button>
      <button
        onClick={() => router.push('/list')}
        className="p-2 rounded-full bg-blue-500 text-white backdrop-blur-sm border border-blue-400 hover:bg-blue-600 transition-all"
        title="List View"
      >
        <ListIcon className="w-4 h-4 md:w-5 md:h-5" />
      </button>
    </>
  );

  // Convert venues to event format for sections
  const venueEvents = filteredVenues.map(venue => ({
    id: `venue-${venue.venue_id}`,
    venue: venue,
    eventName: venue.name,
    venueName: venue.name,
    location: venue.address || 'Dubai',
    price: 'View Details',
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop',
    badge: undefined as 'Recommended' | 'Selling fast' | 'Best price guaranteed' | undefined,
    categories: []
  }));

  // Show ALL venues in each section (not filtered by actual dates)
  const todayEvents = venueEvents;
  const tomorrowEvents = venueEvents;
  const next7DaysEvents = venueEvents;

  if (isLoading) {
    return (
      <main className="h-screen w-full flex items-center justify-center bg-background">
        <div className="p-8 max-w-md text-center">
          <h3 className="text-lg font-semibold mb-2">Loading Venues...</h3>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mt-4"></div>
        </div>
      </main>
    );
  }

  return (
    <ThemeProvider>
      <main className="min-h-screen w-full bg-background">
        {/* Top Navigation */}
        <TopNav navButtons={viewToggleButtons} />

        {/* Category Pills */}
        <CategoryPills
          filters={filters}
          onFiltersChange={handleFiltersChange}
          venues={filteredVenues}
        />

        {/* Event Sections - with top padding to account for fixed nav and pills */}
        <div className="pt-[140px] md:pt-[160px] pb-8">
          <EventSection
            title="Today"
            events={todayEvents}
            onShowAll={() => console.log('Show all today events')}
          />
          {tomorrowEvents.length > 0 && (
            <EventSection
              title="Tomorrow"
              events={tomorrowEvents}
              onShowAll={() => console.log('Show all tomorrow events')}
            />
          )}
          {next7DaysEvents.length > 0 && (
            <EventSection
              title="Next 7 days"
              events={next7DaysEvents}
              onShowAll={() => console.log('Show all next 7 days events')}
            />
          )}
        </div>
      </main>
    </ThemeProvider>
  );
}
