'use client';

import type { FilterOptions } from '@/types';
import { useVenueData } from '@/contexts/VenueDataContext';

interface UseFilterOptionsResult {
  filterOptions: FilterOptions;
  isLoading: boolean;
  error: string | null;
}

export function useFilterOptions(): UseFilterOptionsResult {
  // Use shared filter options from context — no duplicate fetches on page navigation
  const { filterOptions, isLoadingFilters: isLoading, filterError: error } = useVenueData();

  return { filterOptions, isLoading, error };
}
