import { format, addDays, startOfWeek, endOfWeek, isToday, isTomorrow, isThisWeek } from 'date-fns';

export type DatePreset = 'today' | 'tomorrow' | 'this-week' | 'custom';

/**
 * Convert date preset to actual date strings for API calls
 */
export function getDatesByPreset(preset: DatePreset, customDates?: string[]): string[] {
  const now = new Date();
  
  switch (preset) {
    case 'today':
      return [format(now, 'dd MMM yy')];
      
    case 'tomorrow':
      return [format(addDays(now, 1), 'dd MMM yy')];
      
    case 'this-week':
      const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Monday
      const weekEnd = endOfWeek(now, { weekStartsOn: 1 }); // Sunday
      const dates: string[] = [];
      
      for (let date = weekStart; date <= weekEnd; date = addDays(date, 1)) {
        dates.push(format(date, 'dd MMM yy'));
      }
      return dates;
      
    case 'custom':
      return customDates || [];
      
    default:
      return [];
  }
}

/**
 * Determine which preset matches the given dates
 */
export function getPresetFromDates(dates: string[]): DatePreset | null {
  if (dates.length === 0) return null;
  
  const now = new Date();
  
  // Check for today
  if (dates.length === 1) {
    const targetDate = format(now, 'dd MMM yy');
    if (dates[0] === targetDate) return 'today';
    
    const tomorrowDate = format(addDays(now, 1), 'dd MMM yy');
    if (dates[0] === tomorrowDate) return 'tomorrow';
  }
  
  // Check for this week
  const thisWeekDates = getDatesByPreset('this-week');
  if (dates.length === thisWeekDates.length && 
      dates.every(date => thisWeekDates.includes(date))) {
    return 'this-week';
  }
  
  return 'custom';
}

/**
 * Get display label for date preset
 */
export function getPresetLabel(preset: DatePreset): string {
  switch (preset) {
    case 'today': return 'Today';
    case 'tomorrow': return 'Tomorrow';
    case 'this-week': return 'This Week';
    case 'custom': return 'Custom Date';
    default: return '';
  }
}

/**
 * Check if a date string matches today
 */
export function isDateToday(dateString: string): boolean {
  try {
    const date = new Date(dateString);
    return isToday(date);
  } catch {
    return false;
  }
}

/**
 * Check if a date string matches tomorrow
 */
export function isDateTomorrow(dateString: string): boolean {
  try {
    const date = new Date(dateString);
    return isTomorrow(date);
  } catch {
    return false;
  }
}

/**
 * Check if a date string is within this week
 */
export function isDateThisWeek(dateString: string): boolean {
  try {
    const date = new Date(dateString);
    return isThisWeek(date, { weekStartsOn: 1 });
  } catch {
    return false;
  }
}
