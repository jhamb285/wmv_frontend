import { format, isToday, isTomorrow, parseISO } from 'date-fns';
import type { Venue, Event } from '@/types';

export type DateGroupLabel = 'Today' | 'Tomorrow' | string;

/**
 * Convert event_date to group label
 * Returns formatted date string "Dec 1" (consistent with maps calendar)
 */
export function getDateGroupLabel(eventDate: string): DateGroupLabel {
  try {
    // Try ISO format first
    let date = parseISO(eventDate);

    // If invalid, try parsing "5 Sept 25" format from database
    if (isNaN(date.getTime())) {
      const parts = eventDate.trim().split(' ');
      if (parts.length === 3) {
        const [day, monthAbbr, year] = parts;

        // Month mapping (note: database uses "Sept" not "Sep")
        const monthMap: Record<string, number> = {
          'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
          'Jul': 6, 'Aug': 7, 'Sept': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
        };

        const month = monthMap[monthAbbr];
        if (month !== undefined) {
          // Convert 2-digit year to full year (25 -> 2025)
          const fullYear = parseInt(year) < 50 ? 2000 + parseInt(year) : 1900 + parseInt(year);
          date = new Date(fullYear, month, parseInt(day));
        }
      }
    }

    // Check if date is valid after all parsing attempts
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', eventDate);
      return eventDate; // Fallback to raw string
    }

    // Format as "SAT DEC 1" (day of week + month + day, uppercase)
    return format(date, 'EEE MMM d').toUpperCase();
  } catch (error) {
    console.error('Date parsing error:', eventDate, error);
    return eventDate; // Fallback to raw string
  }
}

/**
 * Sort date group labels chronologically
 * All dates sorted by their actual date value
 */
export function sortDateGroupLabels(labels: string[]): string[] {
  return labels.sort((a, b) => {
    // Sort all dates chronologically
    try {
      // Parse formatted dates like "Dec 1", "Dec 2"
      // Convert to full date string with current year for parsing
      const currentYear = new Date().getFullYear();
      const dateA = new Date(`${a} ${currentYear}`);
      const dateB = new Date(`${b} ${currentYear}`);

      if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
        return dateA.getTime() - dateB.getTime();
      }
    } catch {
      // If parsing fails, fallback to string comparison
    }

    return a.localeCompare(b);
  });
}

/**
 * Get unique dates from events map
 * Returns sorted array of date labels
 */
export function extractUniqueDates(
  eventsMap?: Map<number, Event[]>
): string[] {
  if (!eventsMap) {
    return [];
  }

  const dateSet = new Set<string>();

  eventsMap.forEach(events => {
    events.forEach(event => {
      if (event.event_date) {
        const label = getDateGroupLabel(event.event_date);
        dateSet.add(label);
      }
    });
  });

  return sortDateGroupLabels(Array.from(dateSet));
}

/**
 * Check if venue has events on specific date
 */
export function venueHasEventOnDate(
  venue: Venue,
  events: Event[],
  dateLabel: string
): boolean {
  return events.some(event => {
    if (!event.event_date) return false;
    const eventLabel = getDateGroupLabel(event.event_date);
    return eventLabel === dateLabel;
  });
}

/**
 * Filter events for a specific date label
 */
export function filterEventsByDate(
  events: Event[],
  dateLabel: string
): Event[] {
  return events.filter(event => {
    if (!event.event_date) return false;
    const eventLabel = getDateGroupLabel(event.event_date);
    return eventLabel === dateLabel;
  });
}

/**
 * Group venues by their event dates
 * Returns map of date labels to venues that have events on that date
 */
export function groupVenuesByDate(
  venues: Venue[],
  eventsMap: Map<number, Event[]> | undefined,
  selectedDate: string | null
): Map<DateGroupLabel, Venue[]> {
  const grouped = new Map<DateGroupLabel, Venue[]>();

  if (!eventsMap) {
    return grouped;
  }

  venues.forEach(venue => {
    const venueId = Number(venue.venue_id);
    const events = eventsMap.get(venueId) || [];

    // Skip venues with no events
    if (events.length === 0) return;

    // Collect all unique dates this venue has events on
    const venueDates = new Set<DateGroupLabel>();
    events.forEach(event => {
      if (!event.event_date) return;

      const label = getDateGroupLabel(event.event_date);

      // If date filter is active, only include matching dates
      if (selectedDate === null || selectedDate === label) {
        venueDates.add(label);
      }
    });

    // Add venue to each date group it belongs to
    venueDates.forEach(dateLabel => {
      if (!grouped.has(dateLabel)) {
        grouped.set(dateLabel, []);
      }
      grouped.get(dateLabel)!.push(venue);
    });
  });

  return grouped;
}

/**
 * Get first event for a venue on a specific date
 * Useful for displaying preview event in collapsed card
 */
export function getFirstEventForDate(
  events: Event[],
  dateLabel: string
): Event | null {
  const filteredEvents = filterEventsByDate(events, dateLabel);
  return filteredEvents.length > 0 ? filteredEvents[0] : null;
}

/**
 * Count total events for a date across all venues
 */
export function countEventsForDate(
  eventsMap: Map<number, Event[]> | undefined,
  dateLabel: string
): number {
  if (!eventsMap) {
    return 0;
  }

  let count = 0;

  eventsMap.forEach(events => {
    count += filterEventsByDate(events, dateLabel).length;
  });

  return count;
}
