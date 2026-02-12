'use client';

import React, { useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { extractUniqueDates } from '@/lib/filters/date-grouping-utils';
import { getActiveFilterColorScheme } from '@/lib/filters/filter-color-utils';
import type { HierarchicalFilterState } from '@/types';

interface DateSelectorPillsProps {
  selectedDate: string | null;  // null = "All Dates"
  onDateSelect: (date: string | null) => void;
  availableDates: string[];  // Unique dates from events
  filters?: HierarchicalFilterState;  // Optional for color syncing
}

const DateSelectorPills: React.FC<DateSelectorPillsProps> = ({
  selectedDate,
  onDateSelect,
  availableDates,
  filters
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  /**
   * Split date string into day-of-week and date parts for vertical display
   * Example: "SAT OCT 4" → { dayOfWeek: "SAT", date: "Oct 4" }
   */
  const splitDateForVerticalDisplay = (dateLabel: string): { dayOfWeek: string; date: string } => {
    const parts = dateLabel.split(' ');

    if (parts.length >= 3) {
      // Format: "SAT OCT 4"
      const dayOfWeek = parts[0]; // "SAT"
      const month = parts[1].charAt(0) + parts[1].slice(1).toLowerCase(); // "OCT" → "Oct"
      const day = parts[2]; // "4"
      return {
        dayOfWeek,
        date: `${month} ${day}`
      };
    }

    // Fallback for "All Dates" or unexpected formats
    return {
      dayOfWeek: dateLabel,
      date: ''
    };
  };

  // Get active filter color for styling
  const filterColorScheme = useMemo(() => {
    if (filters) {
      return getActiveFilterColorScheme(filters);
    }
    return { hexColor: '#6B7280', colorName: 'gray', hasActiveFilter: false };
  }, [filters]);

  // Generate date pills with "All Dates" option
  const datePills = useMemo(() => {
    const pills: Array<{ label: string; value: string | null }> = [
      { label: 'All Dates', value: null }
    ];

    availableDates.forEach(date => {
      pills.push({ label: date, value: date });
    });

    return pills;
  }, [availableDates]);

  // Auto-scroll to selected pill when selection changes
  useEffect(() => {
    if (scrollContainerRef.current && selectedDate) {
      const selectedButton = scrollContainerRef.current.querySelector(
        `[data-date-value="${selectedDate}"]`
      );
      if (selectedButton) {
        selectedButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [selectedDate]);

  // Render individual date box (vertical layout) - Matches VenueFloatingPanel design
  const renderDatePill = (pill: { label: string; value: string | null }) => {
    const isSelected = selectedDate === pill.value;

    // Split date for vertical display
    const { dayOfWeek, date: dateText } = splitDateForVerticalDisplay(pill.label);

    return (
      <motion.button
        key={pill.value || 'all'}
        data-date-value={pill.value || 'all'}
        onClick={() => onDateSelect(pill.value)}
        whileTap={{ scale: 0.95 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '10px 14px',
          borderRadius: '12px',
          minWidth: '58px',
          cursor: 'pointer',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          border: isSelected ? 'none' : '1.5px solid #e8e4dd',
          background: isSelected
            ? 'linear-gradient(145deg, #2d2926 0%, #1a1715 100%)'
            : '#fafaf8',
          boxShadow: isSelected
            ? '0 4px 12px rgba(26, 23, 21, 0.2)'
            : 'none',
          position: 'relative',
          flexShrink: 0
        }}
      >
        {pill.value === null ? (
          // "All Dates" - single line
          <span style={{
            fontSize: '13px',
            fontWeight: 700,
            color: isSelected ? 'white' : '#3d3a36'
          }}>
            {pill.label}
          </span>
        ) : (
          // Date box - two lines
          <>
            <span style={{
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: isSelected ? 'rgba(255,255,255,0.7)' : '#8a857d',
              marginBottom: '2px',
              fontWeight: 600
            }}>
              {dayOfWeek}
            </span>
            <span style={{
              fontWeight: 700,
              fontSize: '13px',
              color: isSelected ? 'white' : '#3d3a36'
            }}>
              {dateText}
            </span>
          </>
        )}
      </motion.button>
    );
  };

  // Don't render if no dates available
  if (availableDates.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-[128px] md:top-[156px] left-0 right-0 z-30 px-2 md:px-4 pb-2 bg-gradient-to-b from-white/90 to-white/50 backdrop-blur-sm">
      <div
        ref={scrollContainerRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {datePills.map(pill => renderDatePill(pill))}
      </div>
    </div>
  );
};

export default DateSelectorPills;
