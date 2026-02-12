'use client';

import React from 'react';
import { useClientSideVenues } from '@/hooks/useClientSideVenues';
import StackedEventCards from '@/components/events/StackedEventCards';
import {
  getCategoryColorForStackedCards,
  transformSupabaseDataToStackedCards
} from '@/lib/stacked-card-adapter';
import TopNav from '@/components/navigation/TopNav';
import BottomNav from '@/components/navigation/BottomNav';
import type { HierarchicalFilterState } from '@/types';

export default function StackedCardsPage() {
  // Create empty filter state to show all venues
  const emptyFilters: HierarchicalFilterState = {
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
    selectedAreas: [],
    activeDates: [],
    activeOffers: [],
    searchQuery: ''
  };

  const { filteredVenues, isLoading, error } = useClientSideVenues(emptyFilters);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black">
        <div className="text-white text-lg">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black">
        <div className="text-red-400 text-lg">Error: {error}</div>
      </div>
    );
  }

  // Transform Supabase data to StackedEventCards format
  const cards = transformSupabaseDataToStackedCards(filteredVenues);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black relative">
      {/* Top Navigation */}
      <div className="hidden md:block">
        <TopNav />
      </div>

      {/* Stacked Cards Container */}
      <StackedEventCards
        cards={cards}
        getCategoryColor={getCategoryColorForStackedCards}
      />

      {/* Bottom Navigation (Mobile) */}
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}
