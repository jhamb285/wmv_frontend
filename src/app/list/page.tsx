'use client';

// List view with integrated TopNav date picker
import { useState, useMemo, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Map as MapIcon } from 'lucide-react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useClientSideVenues } from '@/hooks/useClientSideVenues';
import { type HierarchicalFilterState } from '@/types';
import TopNav from '@/components/navigation/TopNav';
import CategoryPills from '@/components/filters/CategoryPills';
import StackedEventCards from '@/components/events/StackedEventCards';
import FilterBottomSheet from '@/components/filters/FilterBottomSheet';
import { useFilterOptions } from '@/hooks/useFilterOptions';
import {
  getCategoryColorForStackedCards,
  transformSupabaseDataToStackedCards
} from '@/lib/stacked-card-adapter';

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
    activeDates: [], // Default to All Dates
    activeOffers: [],
    searchQuery: ''
  });

  const { allVenues, filteredVenues, isLoading } = useClientSideVenues(filters);

  // Venues filtered by date only (not by category) — for CategoryPills counts
  const dateFilteredVenues = useMemo(() => {
    if (filters.activeDates.length === 0) return allVenues;
    return allVenues.filter(venue => {
      if (!venue.event_date) return false;
      try {
        const venueDate = new Date(venue.event_date).toDateString();
        return filters.activeDates.includes(venueDate);
      } catch { return false; }
    });
  }, [allVenues, filters.activeDates]);

  // State for filter sheet modal
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [navHeight, setNavHeight] = useState(130);
  const handleNavHeightChange = useCallback((h: number) => setNavHeight(h), []);

  // Get filter options for FilterBottomSheet
  const { filterOptions } = useFilterOptions();

  const handleFiltersChange = (newFilters: HierarchicalFilterState) => {
    console.log('🔥 LIST VIEW - Filter change requested:', {
      old: filters.eventCategories,
      new: newFilters.eventCategories
    });
    setFilters(newFilters);
  };

  // Date handling for date picker
  const handleDateChange = (dates: string[]) => {
    setFilters({
      ...filters,
      activeDates: dates
    });
  };

  // Debug: Log filter state changes and venue data
  useEffect(() => {
    console.log('🔥 LIST VIEW - Filter state updated:', filters.eventCategories);
    console.log('🔥 LIST VIEW - Filtered venues count:', filteredVenues.length);
  }, [filters, filteredVenues.length]);

  // Debug: Log venue structure on initial load
  useEffect(() => {
    if (filteredVenues.length > 0) {
      console.log('🔥 LIST VIEW - Sample venue data:', {
        venue: filteredVenues[0],
        hasEventCategories: !!filteredVenues[0].event_categories,
        eventCategories: filteredVenues[0].event_categories,
        totalVenues: filteredVenues.length,
        venuesWithCategories: filteredVenues.filter(v => v.event_categories?.length > 0).length
      });
    }
  }, [filteredVenues]);

  // Transform venues to card format (date filtering handled by useClientSideVenues via filters.activeDates)
  const cards = useMemo(() => {
    // Transform venues to cards first
    const allCards = transformSupabaseDataToStackedCards(filteredVenues);

    // Deduplicate by event ID to prevent React duplicate key errors
    const eventMap = new Map<string, typeof allCards[0]>();
    allCards.forEach(card => {
      if (card.event.id && !eventMap.has(card.event.id)) {
        eventMap.set(card.event.id, card);
      }
    });

    console.log('🔍 LIST VIEW Deduplication - Input:', allCards.length, 'Output:', eventMap.size);
    return Array.from(eventMap.values());
  }, [filteredVenues]);

  // View toggle button — only map icon on list page
  const viewToggleButtons = (
    <button
      onClick={() => router.push('/')}
      className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90"
      style={{ background: 'rgba(59, 130, 246, 0.9)' }}
      title="Map View"
    >
      <MapIcon className="w-[18px] h-[18px] text-white" />
    </button>
  );


  if (isLoading) {
    return (
      <main className="min-h-screen w-full" style={{ backgroundColor: '#f5f5f0' }}>
        {/* Skeleton TopNav area */}
        <div className="w-full px-4 pt-4 pb-2" style={{ paddingTop: 'max(16px, env(safe-area-inset-top))' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="h-6 w-28 rounded-lg skeleton-pulse" style={{ background: 'rgba(0,0,0,0.08)' }} />
            <div className="flex gap-2">
              <div className="w-9 h-9 rounded-full skeleton-pulse" style={{ background: 'rgba(0,0,0,0.06)' }} />
              <div className="w-9 h-9 rounded-full skeleton-pulse" style={{ background: 'rgba(0,0,0,0.06)' }} />
            </div>
          </div>
          <div className="flex gap-2 mb-3 overflow-hidden">
            {[56, 48, 64, 48, 56, 48].map((w, i) => (
              <div key={i} className="h-8 rounded-full flex-shrink-0 skeleton-pulse" style={{ background: 'rgba(0,0,0,0.06)', width: `${w}px` }} />
            ))}
          </div>
          <div className="flex gap-2 overflow-hidden">
            {[72, 56, 80, 64, 72].map((w, i) => (
              <div key={i} className="h-7 rounded-full flex-shrink-0 skeleton-pulse" style={{ background: 'rgba(0,0,0,0.06)', width: `${w}px` }} />
            ))}
          </div>
        </div>

        {/* Skeleton card list */}
        <div className="px-4 mt-2 space-y-3">
          <div className="flex items-center gap-2 py-2">
            <div className="h-4 w-36 rounded skeleton-pulse" style={{ background: 'rgba(0,0,0,0.08)' }} />
            <div className="h-4 w-8 rounded skeleton-pulse" style={{ background: 'rgba(0,0,0,0.05)' }} />
          </div>

          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="rounded-xl px-4 py-3.5 flex items-center gap-3"
              style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}
            >
              <div className="w-[60px] h-[60px] rounded-xl flex-shrink-0 skeleton-pulse" style={{ background: 'rgba(0,0,0,0.06)' }} />
              <div className="flex-1 min-w-0 space-y-2">
                <div className="h-3 rounded skeleton-pulse" style={{ background: 'rgba(0,0,0,0.05)', width: '40%' }} />
                <div className="h-4 rounded skeleton-pulse" style={{ background: 'rgba(0,0,0,0.08)', width: `${60 + (i % 3) * 12}%` }} />
                <div className="h-3 rounded skeleton-pulse" style={{ background: 'rgba(0,0,0,0.05)', width: '55%' }} />
              </div>
              <div className="w-4 h-4 rounded skeleton-pulse flex-shrink-0" style={{ background: 'rgba(0,0,0,0.04)' }} />
            </div>
          ))}

          <div className="flex items-center gap-2 py-2 mt-2">
            <div className="h-4 w-40 rounded skeleton-pulse" style={{ background: 'rgba(0,0,0,0.08)' }} />
            <div className="h-4 w-6 rounded skeleton-pulse" style={{ background: 'rgba(0,0,0,0.05)' }} />
          </div>

          {[1, 2, 3].map((i) => (
            <div
              key={`s2-${i}`}
              className="rounded-xl px-4 py-3.5 flex items-center gap-3"
              style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}
            >
              <div className="w-[60px] h-[60px] rounded-xl flex-shrink-0 skeleton-pulse" style={{ background: 'rgba(0,0,0,0.06)' }} />
              <div className="flex-1 min-w-0 space-y-2">
                <div className="h-3 rounded skeleton-pulse" style={{ background: 'rgba(0,0,0,0.05)', width: '35%' }} />
                <div className="h-4 rounded skeleton-pulse" style={{ background: 'rgba(0,0,0,0.08)', width: `${55 + (i % 2) * 15}%` }} />
                <div className="h-3 rounded skeleton-pulse" style={{ background: 'rgba(0,0,0,0.05)', width: '50%' }} />
              </div>
              <div className="w-4 h-4 rounded skeleton-pulse flex-shrink-0" style={{ background: 'rgba(0,0,0,0.04)' }} />
            </div>
          ))}
        </div>
      </main>
    );
  }

  return (
    <ThemeProvider>
      <main className="min-h-screen w-full" style={{ backgroundColor: '#f5f5f0' }}>
        {/* Top Navigation with integrated date picker and category pills */}
        <TopNav
          navButtons={viewToggleButtons}
          onSearchClick={() => setIsFilterSheetOpen(true)}
          showDatePicker={true}
          datePickerProps={{
            venues: filteredVenues,
            selectedDates: filters.activeDates,
            onDateChange: handleDateChange
          }}
          showCategoryPills={true}
          categoryPillsContent={
            <CategoryPills
              filters={filters}
              onFiltersChange={handleFiltersChange}
              venues={dateFilteredVenues}
              inlineMode={true}
            />
          }
          onHeightChange={handleNavHeightChange}
        />

        {/* Stacked Event Cards - fixed scroll area below navbar */}
        <div
          className="fixed md:top-[210px] left-1.5 md:left-2 right-1.5 md:right-2 bottom-0 z-10 overflow-y-auto rounded-2xl"
          style={{ backgroundColor: '#f5f5f0', top: `${navHeight + 8}px` }}
        >
          <StackedEventCards
            cards={cards}
            getCategoryColor={getCategoryColorForStackedCards}
          />
        </div>

        {/* Filter Bottom Sheet */}
        <FilterBottomSheet
          isOpen={isFilterSheetOpen}
          onClose={() => setIsFilterSheetOpen(false)}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          filterOptions={filterOptions}
        />
      </main>
    </ThemeProvider>
  );
}
