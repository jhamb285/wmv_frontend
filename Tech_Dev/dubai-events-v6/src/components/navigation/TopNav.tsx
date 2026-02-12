'use client';

// Integrated date picker and category pills within TopNav container
import React, { useMemo, useEffect, useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User, Search } from 'lucide-react';
import { Venue } from '@/types';
import { parseDateFromFormat } from '@/lib/filters/date-utils';

interface DateSelectorProps {
  venues: Venue[];
  selectedDates: string[];
  onDateChange: (dates: string[]) => void;
  className?: string;
}

interface TopNavProps {
  navButtons?: React.ReactNode;
  onSearchClick?: () => void;
  showDatePicker?: boolean;
  datePickerProps?: DateSelectorProps;
  showCategoryPills?: boolean;
  categoryPillsContent?: React.ReactNode;
}

const TopNav: React.FC<TopNavProps> = ({ navButtons, onSearchClick, showDatePicker, datePickerProps, showCategoryPills, categoryPillsContent }) => {
  const { user, signOut } = useAuth();

  // Fetch all available dates from API (instead of extracting from filtered venues)
  const [filterOptions, setFilterOptions] = useState<{ dates?: string[] } | null>(null);

  useEffect(() => {
    // Only fetch if we need to show the date picker
    if (!showDatePicker) return;

    const fetchFilterOptions = async () => {
      try {
        const response = await fetch('/api/filter-options');
        if (!response.ok) throw new Error('Failed to fetch filter options');
        const result = await response.json();

        // Unwrap .data if present, otherwise use result directly
        console.log('📅 TOPNAV - API response:', result);
        setFilterOptions(result.data || result);
        console.log('📅 TOPNAV - Set filterOptions to:', result.data || result);
      } catch (error) {
        console.error('📅 TOPNAV - Failed to fetch filter options:', error);
        setFilterOptions({ dates: [] });
      }
    };

    fetchFilterOptions();
  }, [showDatePicker]);

  // Date picker logic (if showDatePicker is true)
  const dateOptions = useMemo(() => {
    if (!datePickerProps) return [];

    const allDates = filterOptions?.dates || [];

    // Calculate date range: (today - 3 days) through future
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const threeDaysAgo = new Date(today);
    threeDaysAgo.setDate(today.getDate() - 3);

    console.log('📅 TOPNAV - Processing dates from API:', allDates.length);
    console.log('📅 TOPNAV - Date range filter: from', threeDaysAgo.toDateString(), 'to future');

    // Filter and deduplicate dates
    const dateMap = new Map<string, Date>();

    allDates.forEach((dateStr: string) => {
      try {
        const date = parseDateFromFormat(dateStr);

        // Only include dates from (today - 3 days) onward
        if (date.getTime() >= threeDaysAgo.getTime()) {
          const dateKey = date.toDateString();

          // Deduplicate: only keep first occurrence
          if (!dateMap.has(dateKey)) {
            dateMap.set(dateKey, date);
          }
        }
      } catch (error) {
        console.warn('📅 TOPNAV - Failed to parse date:', dateStr, error);
      }
    });

    console.log('📅 TOPNAV - After filtering & deduplication:', dateMap.size, 'unique dates');

    // Convert to array and sort chronologically
    const sortedDates = Array.from(dateMap.entries())
      .sort(([, dateA], [, dateB]) => dateA.getTime() - dateB.getTime());

    // Transform to UI format
    const result = sortedDates.map(([dateKey, date]) => {
      const isToday = date.toDateString() === today.toDateString();

      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        day: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
        dateKey,
        isToday,
        isSaturday: date.getDay() === 6,
        isSunday: date.getDay() === 0
      };
    });

    console.log('📅 TOPNAV - Final date options:', result.map(d => `${d.day} ${d.date} (today: ${d.isToday})`));

    return result;
  }, [filterOptions, datePickerProps]);

  const handleDateClick = (dateKey: string) => {
    if (!datePickerProps) return;

    if (dateKey === 'all') {
      datePickerProps.onDateChange([]);
    } else {
      const isSelected = datePickerProps.selectedDates.includes(dateKey);
      if (isSelected) {
        datePickerProps.onDateChange(datePickerProps.selectedDates.filter(d => d !== dateKey));
      } else {
        datePickerProps.onDateChange([dateKey]);
      }
    }
  };

  const isDateSelected = (dateKey: string) => {
    if (!datePickerProps) return false;
    if (dateKey === 'all') {
      return datePickerProps.selectedDates.length === 0;
    }
    return datePickerProps.selectedDates.includes(dateKey);
  };

  // Render TopNav with integrated date picker
  return (
    <div className="fixed top-1 md:top-2 left-1 md:left-2 right-1 md:right-2 z-50">
      <div
        className={`px-3 md:px-4 border border-white/30 rounded-xl relative ${
          showDatePicker ? 'py-2.5 md:py-3' : 'py-2.5 md:py-3.5'
        }`}
        style={{
          background: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(30px) saturate(180%)',
          WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(0, 0, 0, 0.08)'
        }}
      >
        {/* FLEX-COL CONTAINER FOR TWO ROWS */}
        <div className="flex flex-col gap-2">

          {/* ROW 1: Logo, Search, Buttons (existing layout) */}
          <div className="flex items-center justify-between">
            <Image
              src="/logo_clean.svg"
              alt="WMV Logo"
              width={80}
              height={40}
              className="w-16 md:w-20 h-8 md:h-10 object-contain opacity-50 -ml-1 md:-ml-2"
            />

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-2 md:mx-4">
              <div
                className="relative cursor-pointer"
                onClick={onSearchClick}
              >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 stroke-[2.5] pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search for your Vibe?"
                  className="w-full pl-10 pr-4 py-2 bg-transparent rounded-xl border border-white/30 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
                  readOnly
                  onClick={onSearchClick}
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5 md:gap-2">
              {navButtons}
              {user && (
                <div className="flex items-center gap-2 ml-2">
                  <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/40 rounded-full">
                    <User className="w-4 h-4 text-gray-700" />
                    <span className="text-sm text-gray-700 font-medium">
                      {user.email || user.phone || 'User'}
                    </span>
                  </div>
                  <button
                    onClick={signOut}
                    className="flex items-center gap-2 px-3 py-1.5 bg-red-500/90 hover:bg-red-600/90 text-white rounded-full transition-colors duration-200"
                    title="Sign out"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden md:inline text-sm font-medium">Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ROW 2: Date Picker (NEW - integrated) */}
          {showDatePicker && datePickerProps && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide"
                 style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

              {/* "All Dates" Option */}
              <button
                onClick={() => handleDateClick('all')}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                  isDateSelected('all')
                    ? 'bg-black/30 text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                All Dates
              </button>

              {/* Individual Dates */}
              {dateOptions.map((dateOption, index) => {
                const isSelected = isDateSelected(dateOption.dateKey);
                const isToday = dateOption.isToday;

                // Color logic: Today = red, Weekend = red, Selected = white, Default = gray
                const textColor = isToday
                  ? '#dc2626' // Red for today
                  : (dateOption.isSaturday || dateOption.isSunday)
                    ? '#ef4444' // Red for weekends
                    : isSelected ? '#ffffff' : '#4b5563'; // White for selected, gray for default

                // Red box border for today's date
                const todayStyles = isToday ? {
                  border: '2px solid #dc2626',
                  background: isSelected ? 'rgba(220, 38, 38, 0.3)' : 'rgba(220, 38, 38, 0.15)'
                } : {};

                return (
                  <button
                    key={index}
                    onClick={() => handleDateClick(dateOption.dateKey)}
                    className={`flex flex-col items-center px-3 py-1.5 rounded-lg transition-all duration-200 whitespace-nowrap flex-shrink-0 relative ${
                      isSelected && !isToday ? 'bg-black/30' : isToday ? '' : 'hover:bg-black/10'
                    }`}
                    style={todayStyles}
                  >
                    {/* TODAY Badge */}
                    {isToday && (
                      <span
                        className="absolute -top-2 -right-2 text-[7px] font-bold px-1.5 py-0.5 rounded bg-red-600 text-white"
                        style={{ letterSpacing: '0.05em' }}
                      >
                        TODAY
                      </span>
                    )}

                    {/* Day (SAT, SUN, MON, etc.) */}
                    <span
                      style={{
                        color: isSelected && !isToday ? 'rgba(255,255,255,0.7)' : textColor,
                        fontSize: '10px',
                        fontWeight: isToday ? 700 : 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: '1px'
                      }}
                    >
                      {dateOption.day}
                    </span>

                    {/* Date with Month (Sep 12, Dec 25, etc.) */}
                    <span
                      style={{
                        color: textColor,
                        fontSize: '13px',
                        fontWeight: 700
                      }}
                    >
                      {dateOption.date}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* ROW 3: Category Pills (NEW - integrated) */}
          {showCategoryPills && categoryPillsContent && (
            <div className="-mx-1 px-1">
              {categoryPillsContent}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default TopNav;
