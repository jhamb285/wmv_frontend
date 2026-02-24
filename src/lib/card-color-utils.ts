import { getCategoryColor, getHexColor } from '@/lib/category-mappings';
import type { Venue } from '@/types';

/**
 * Converts a hex color code to HSL color space
 * @param hex - Hex color code (e.g., "#9333EA")
 * @returns Object with h (0-360), s (0-100), l (0-100)
 */
export function hexToHSL(hex: string): { h: number; s: number; l: number } {
  // Remove # if present
  hex = hex.replace('#', '');

  // Convert hex to RGB (0-1 range)
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Find min/max values
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

/**
 * Generates a dynamic background color for a venue card based on:
 * - Event category (determines base color from filter pill system)
 * - Venue rating (determines brightness and opacity)
 *
 * Higher ratings = darker, more opaque
 * Lower ratings = lighter, more transparent
 *
 * @param venue - Venue object with event_categories and rating
 * @returns HSLA color string ready for inline styles
 */
export function getCardColor(venue: Venue): string {
  // 1. Get primary category (defaults to 'Music Events' if not available)
  const primaryCategory = venue.event_categories?.[0]?.primary || 'Music Events';

  // 2. Map category to color name using existing filter pill system
  const colorName = getCategoryColor(primaryCategory);

  // 3. Get hex color for that color name
  const hexColor = getHexColor(colorName);

  // 4. Convert hex to HSL
  const { h, s } = hexToHSL(hexColor);

  // 5. Get venue rating (clamp between 1.0 and 5.0, default 3.0)
  const rating = venue.rating || 3.0;
  const clampedRating = Math.max(1.0, Math.min(5.0, rating));

  // 6. Normalize rating to 0-1 range (1.0 → 0, 5.0 → 1)
  const normalized = (clampedRating - 1.0) / 4.0;

  // 7. Calculate lightness: 78% (rating 1.0) → 48% (rating 5.0)
  //    Higher rating = darker color
  const lightness = 78 - (normalized * 30);

  // 8. Calculate opacity: 0.55 (rating 1.0) → 0.85 (rating 5.0)
  //    Higher rating = more opaque
  const opacity = 0.55 + (normalized * 0.30);

  // 9. Return HSLA color string
  return `hsla(${h}, ${s}%, ${lightness}%, ${opacity})`;
}

/**
 * Formats time display (currently a pass-through as times are already formatted in DB)
 * @param timeString - Time string from database (e.g., "08:00 PM - 03:00 AM")
 * @returns Formatted time string
 */
export function formatTimeDisplay(timeString?: string): string {
  if (!timeString) return '';
  return timeString;
}

/**
 * Formats date as "7 Oct 25" format
 * @param dateString - ISO date string or parseable date
 * @returns Formatted date string (e.g., "7 Oct 25")
 */
export function formatDateDisplay(dateString: string): string {
  try {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.getFullYear().toString().slice(-2);
    return `${day} ${month} ${year}`;
  } catch {
    return dateString;
  }
}
