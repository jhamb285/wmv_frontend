'use client';

import { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Map as MapIcon, List as ListIcon } from 'lucide-react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useClientSideVenues } from '@/hooks/useClientSideVenues';
import { type HierarchicalFilterState } from '@/types';
import TopNav from '@/components/navigation/TopNav';
import CategoryPills from '@/components/filters/CategoryPills';
import EventGrid from '@/components/events/EventGrid';

export default function AllEventsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const day = searchParams.get('day') || 'today';

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

    // Get title based on day parameter
    const getTitle = () => {
        switch (day) {
            case 'today':
                return 'Today';
            case 'tomorrow':
                return 'Tomorrow';
            case 'next7days':
                return 'Next 7 Days';
            default:
                return 'Events';
        }
    };

    // Convert venues to event format
    const venueEvents = useMemo(() =>
        filteredVenues.map(venue => ({
            id: `venue-${venue.venue_id}`,
            venue: venue,
            eventName: venue.name,
            venueName: venue.name,
            location: venue.address || 'Dubai',
            price: 'View Details',
            imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop',
            badge: undefined as 'Recommended' | 'Selling fast' | 'Best price guaranteed' | undefined,
            categories: []
        })),
        [filteredVenues]
    );

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

    if (isLoading) {
        return (
            <main className="h-screen w-full flex items-center justify-center bg-background">
                <div className="p-8 max-w-md text-center">
                    <h3 className="text-lg font-semibold mb-2">Loading Events...</h3>
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

                {/* Content - with top padding to account for fixed nav and pills */}
                <div className="pt-[150px] md:pt-[180px] pb-12">
                    {/* Header with Back Button */}
                    <div className="px-6 md:px-8 mb-8">
                        <button
                            onClick={() => router.back()}
                            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm font-semibold">Back</span>
                        </button>

                        <div>
                            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-3">
                                {getTitle()}
                            </h1>
                            <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
                                {venueEvents.length} {venueEvents.length === 1 ? 'venue' : 'venues'} available
                            </p>
                        </div>
                    </div>

                    {/* Event Grid */}
                    <EventGrid
                        events={venueEvents}
                        emptyMessage={`No events found for ${getTitle().toLowerCase()}`}
                    />
                </div>
            </main>
        </ThemeProvider>
    );
}
