// Category Mappings - Database names to UI display names and colors
// Keys MUST exactly match the `primary` values stored in Supabase final_1.event_categories

export interface CategoryConfig {
  display: string;  // Display name for UI
  color: string;    // Color name for styling
}

// Map database primary category names to UI display names and colors
// DB primaries (from event_categories[].primary) - verified against live data
export const PRIMARY_CATEGORY_MAP: Record<string, CategoryConfig> = {
  "Food & Dining": {
    display: "Food & Dining",
    color: "orange"
  },
  "Sports Viewing": {
    display: "Sports",
    color: "red"
  },
  "Live Performance": {
    display: "Live Music",
    color: "green"
  },
  "Club Night": {
    display: "Club Night",
    color: "pink"
  },
  "Day Party & Afterwork": {
    display: "Day Party",
    color: "yellow"
  },
  "Happy Hour": {
    display: "Happy Hour",
    color: "teal"
  },
  "Pool Party": {
    display: "Pool Party",
    color: "blue"
  },
  "Ladies Night": {
    display: "Ladies Night",
    color: "purple"
  },
  "Brunch": {
    display: "Brunch",
    color: "indigo"
  },
  "Comedy Night": {
    display: "Comedy",
    color: "gray"
  }
};

// Secondary categories grouped by primary (exact values from Supabase event_categories[].secondary)
export const SECONDARY_CATEGORIES_MAP: Record<string, string[]> = {
  "Food & Dining": [
    "Dining Experience",
    "Set Menu"
  ],
  "Sports Viewing": [
    "Football",
    "Rugby",
    "Cricket"
  ],
  "Live Performance": [
    "Solo Artist",
    "Guest DJ",
    "Live Band"
  ],
  "Club Night": [
    "Open Format",
    "Latin"
  ],
  "Day Party & Afterwork": [
    "Afternoon",
    "Sundowner",
    "Sunset"
  ],
  "Happy Hour": [
    "Daily",
    "Weekdays Only",
    "Specific Hours",
    "After Office"
  ],
  "Pool Party": [
    "Daytime"
  ],
  "Ladies Night": [
    "Complimentary Drinks"
  ],
  "Brunch": [
    "Live Entertainment",
    "Bottomless",
    "Free-Flow"
  ],
  "Comedy Night": [
    "Open Mic"
  ]
};

// Hex color mapping for UI
export const COLOR_HEX_MAP: Record<string, string> = {
  purple: "#9333EA",
  red: "#EF4444",
  yellow: "#F59E0B",
  orange: "#F97316",
  pink: "#EC4899",
  indigo: "#6366F1",
  blue: "#3B82F6",
  green: "#10B981",
  teal: "#14B8A6",
  gray: "#6B7280"
};

// Google Maps marker color mapping
export const GOOGLE_MAPS_COLOR_MAP: Record<string, string> = {
  purple: "purple",
  red: "red", 
  yellow: "yellow",
  orange: "orange",
  pink: "pink",
  indigo: "blue",
  blue: "blue",
  green: "green",
  teal: "blue",
  gray: "red" // fallback
};

// Get display name from database primary name
export function getDisplayName(dbPrimary: string): string {
  return PRIMARY_CATEGORY_MAP[dbPrimary]?.display || dbPrimary;
}

// Get color from database primary name
export function getCategoryColor(dbPrimary: string): string {
  return PRIMARY_CATEGORY_MAP[dbPrimary]?.color || "gray";
}

// Get hex color from color name
export function getHexColor(colorName: string): string {
  return COLOR_HEX_MAP[colorName] || COLOR_HEX_MAP.gray;
}

// Get all primary categories (database names)
export function getAllPrimaryCategories(): string[] {
  return Object.keys(PRIMARY_CATEGORY_MAP);
}

// Get secondary categories for a primary (database name)
export function getSecondaryCategories(dbPrimary: string): string[] {
  return SECONDARY_CATEGORIES_MAP[dbPrimary] || [];
}

// Get Google Maps marker color from category
export function getGoogleMapsColor(colorName: string): string {
  return GOOGLE_MAPS_COLOR_MAP[colorName] || "red";
}
