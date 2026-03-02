'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Venue, FilterOptions } from '@/types';

interface VenueDataContextType {
  allVenues: Venue[];
  filterOptions: FilterOptions;
  isLoadingVenues: boolean;
  isLoadingFilters: boolean;
  venueError: string | null;
  filterError: string | null;
}

const defaultFilterOptions: FilterOptions = {
  areas: [],
  dates: [],
  hierarchicalGenres: {},
  hierarchicalVibes: {},
  vibes: [],
  genres: [],
  venueCategories: [],
  specialOffers: [],
  times: [],
  ticketPrices: [],
  venuePrices: [],
  atmospheres: [],
  eventCategories: []
};

const VenueDataContext = createContext<VenueDataContextType>({
  allVenues: [],
  filterOptions: defaultFilterOptions,
  isLoadingVenues: true,
  isLoadingFilters: true,
  venueError: null,
  filterError: null,
});

export function useVenueData() {
  return useContext(VenueDataContext);
}

export function VenueDataProvider({ children }: { children: React.ReactNode }) {
  const [allVenues, setAllVenues] = useState<Venue[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(defaultFilterOptions);
  const [isLoadingVenues, setIsLoadingVenues] = useState(true);
  const [isLoadingFilters, setIsLoadingFilters] = useState(true);
  const [venueError, setVenueError] = useState<string | null>(null);
  const [filterError, setFilterError] = useState<string | null>(null);

  // Fetch venues once on mount — shared across all pages
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setIsLoadingVenues(true);
        setVenueError(null);

        const response = await fetch('/api/venues', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.data) {
          setAllVenues(result.data);
        } else {
          setVenueError(result.error || 'Invalid response format');
        }
      } catch (err) {
        setVenueError(err instanceof Error ? err.message : 'Network error occurred');
        console.error('Error fetching venues:', err);
      } finally {
        setIsLoadingVenues(false);
      }
    };

    fetchVenues();
  }, []);

  // Fetch filter options once on mount — shared across all pages
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        setIsLoadingFilters(true);
        setFilterError(null);

        const response = await fetch('/api/filter-options', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.data) {
          setFilterOptions(result.data);
        } else {
          setFilterError(result.error || 'Invalid response format');
        }
      } catch (err) {
        setFilterError(err instanceof Error ? err.message : 'Network error occurred');
        console.error('Error fetching filter options:', err);
      } finally {
        setIsLoadingFilters(false);
      }
    };

    fetchFilterOptions();
  }, []);

  return (
    <VenueDataContext.Provider
      value={{
        allVenues,
        filterOptions,
        isLoadingVenues,
        isLoadingFilters,
        venueError,
        filterError,
      }}
    >
      {children}
    </VenueDataContext.Provider>
  );
}
