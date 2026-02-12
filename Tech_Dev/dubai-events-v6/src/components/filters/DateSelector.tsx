'use client';

import React, { useMemo } from 'react';
import { Venue } from '@/types';

interface DateOption {
  date: string;      // e.g., "Oct 4"
  day: string;       // e.g., "SAT"
  dateKey: string;   // e.g., "Sat Oct 04 2025"
  isTonight: boolean;
  isSaturday: boolean;
  isSunday: boolean;
}

interface DateSelectorProps {
  venues: Venue[];
  selectedDates: string[];
  onDateChange: (dates: string[]) => void;
  className?: string;
}

export default function DateSelector({
  venues,
  selectedDates,
  onDateChange,
  className
}: DateSelectorProps) {
  // Group venues by date
  const venuesByDate = useMemo(() => {
    const grouped = venues.reduce((acc, venue) => {
      if (venue.event_date) {
        const dateKey = new Date(venue.event_date).toDateString();
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(venue);
      }
      return acc;
    }, {} as Record<string, Venue[]>);
    return grouped;
  }, [venues]);

  // Create date options
  const dateOptions = useMemo(() => {
    const dates = Object.keys(venuesByDate).sort((a, b) =>
      new Date(a).getTime() - new Date(b).getTime()
    );

    return dates.map(dateKey => {
      const date = new Date(dateKey);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const eventDate = new Date(date);
      eventDate.setHours(0, 0, 0, 0);

      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        day: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
        dateKey,
        isTonight: eventDate.getTime() === today.getTime(),
        isSaturday: date.getDay() === 6,
        isSunday: date.getDay() === 0
      };
    });
  }, [venuesByDate]);

  // Add "All Dates" option
  const allDatesOption: DateOption = {
    date: 'All Dates',
    day: '',
    dateKey: 'all',
    isTonight: false,
    isSaturday: false,
    isSunday: false
  };

  const dateOptionsWithAll = [allDatesOption, ...dateOptions];

  const handleDateClick = (dateKey: string) => {
    if (dateKey === 'all') {
      onDateChange([]); // Clear all dates
    } else {
      // Toggle single date selection
      const isSelected = selectedDates.includes(dateKey);
      if (isSelected) {
        onDateChange(selectedDates.filter(d => d !== dateKey));
      } else {
        onDateChange([dateKey]); // Single select for now
      }
    }
  };

  const isDateSelected = (dateKey: string) => {
    if (dateKey === 'all') {
      return selectedDates.length === 0;
    }
    return selectedDates.includes(dateKey);
  };

  return (
    <div className={`fixed left-0 right-0 z-40 ${className || ''}`}
         style={{
           top: '64px',
           background: 'linear-gradient(180deg, rgba(31,41,55,0.98) 0%, rgba(17,24,39,0.95) 100%)',
           backdropFilter: 'blur(12px)',
           borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
           padding: '12px 16px'
         }}>
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        {dateOptionsWithAll.map((dateOption, index) => {
          const isSelected = isDateSelected(dateOption.dateKey);
          const textColor = (dateOption.isSaturday || dateOption.isSunday) ? '#ef4444' : '#ffffff';

          return (
            <div
              key={index}
              onClick={() => handleDateClick(dateOption.dateKey)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 14px',
                borderRadius: '12px',
                minWidth: dateOption.dateKey === 'all' ? '80px' : '58px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                background: isSelected
                  ? 'linear-gradient(145deg, #3b82f6 0%, #2563eb 100%)'
                  : 'rgba(55, 65, 81, 0.5)',
                border: isSelected ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: isSelected
                  ? '0 4px 12px rgba(59, 130, 246, 0.3)'
                  : 'none',
                position: 'relative',
                flexShrink: 0
              }}
            >
              {dateOption.isTonight && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  color: 'white',
                  fontSize: '8px',
                  fontWeight: 700,
                  padding: '3px 6px',
                  borderRadius: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  boxShadow: '0 2px 6px rgba(239, 68, 68, 0.3)'
                }}>
                  TONIGHT
                </span>
              )}

              {dateOption.dateKey === 'all' ? (
                <span style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: isSelected ? 'white' : '#9ca3af'
                }}>
                  {dateOption.date}
                </span>
              ) : (
                <>
                  <span style={{
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: isSelected ? 'rgba(255,255,255,0.8)' : textColor,
                    marginBottom: '2px',
                    fontWeight: 600
                  }}>
                    {dateOption.day}
                  </span>
                  <span style={{
                    fontWeight: 700,
                    fontSize: '13px',
                    color: isSelected ? 'white' : textColor
                  }}>
                    {dateOption.date}
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
