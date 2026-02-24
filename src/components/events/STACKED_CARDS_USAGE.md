# StackedEventCards Integration Guide

## ✅ Files Installed

1. `/src/components/events/StackedEventCards.tsx` - Main component
2. `/src/components/events/StackedEventCards.css` - Styling
3. `/src/lib/stacked-card-adapter.ts` - Adapter utility

## 📦 How to Use in Your List Page

### Option 1: Update Existing List Page

Update `/src/app/list/page.tsx`:

```tsx
'use client';

import React from 'react';
import { useClientSideVenues } from '@/hooks/useClientSideVenues';
import StackedEventCards from '@/components/events/StackedEventCards';
import {
  getCategoryColorForStackedCards,
  transformSupabaseDataToStackedCards
} from '@/lib/stacked-card-adapter';

export default function ListPage() {
  const { allVenues, filteredVenues, isLoading } = useClientSideVenues();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Transform Supabase data to StackedEventCards format
  const cards = transformSupabaseDataToStackedCards(filteredVenues);

  return (
    <div>
      <StackedEventCards
        cards={cards}
        getCategoryColor={getCategoryColorForStackedCards}
      />
    </div>
  );
}
```

### Option 2: Create New Stacked Cards Page

Create `/src/app/stacked/page.tsx`:

```tsx
'use client';

import React from 'react';
import { useClientSideVenues } from '@/hooks/useClientSideVenues';
import StackedEventCards from '@/components/events/StackedEventCards';
import {
  getCategoryColorForStackedCards,
  transformSupabaseDataToStackedCards
} from '@/lib/stacked-card-adapter';

export default function StackedCardsPage() {
  const { filteredVenues, isLoading } = useClientSideVenues();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading events...</p>
      </div>
    );
  }

  const cards = transformSupabaseDataToStackedCards(filteredVenues);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <StackedEventCards
        cards={cards}
        getCategoryColor={getCategoryColorForStackedCards}
      />
    </div>
  );
}
```

## 🎨 Color System Integration

### How It Works

1. **Your Existing Colors** (from `/src/lib/category-mappings.ts`):
   ```typescript
   "Music Events" → purple (#9333EA)
   "Nightlife" → pink (#EC4899)
   "Sports & Viewing" → red (#EF4444)
   ```

2. **Adapter Converts** to hue/saturation format:
   ```typescript
   getCategoryColorForStackedCards("Music Events")
   // Returns: { hue: 280, saturation: 85 }
   ```

3. **Component Uses** rating for brightness:
   - Rating 5.0 → Darker, more opaque
   - Rating 1.0 → Lighter, more transparent

### Result
Cards match your filter pill colors automatically! 🎉

## 🔧 Customizing the Data Transform

If your Supabase schema is different, edit `/src/lib/stacked-card-adapter.ts`:

```typescript
export function transformSupabaseDataToStackedCards(venues: SupabaseVenueEvent[]) {
  return venues.map((venue, index) => ({
    event: {
      id: venue.your_event_id_field || `event-${index}`,
      event_name: venue.your_event_name_field || 'Event',
      // ... map your fields here
    },
    venue: {
      venue_name: venue.your_venue_name_field,
      venue_rating: venue.your_rating_field || 4.0,
      // ... map your fields here
    }
  }));
}
```

## 📊 What Data Fields Are Used

### Event Fields (Required)
- `event_name` - Main event title
- `event_subtitle` - Secondary description
- `event_time_start` / `event_time_end` - Time display
- `event_date` - Date display
- `event_entry_price` - Pricing info
- `event_offers` - Special offers text
- `category` - For color determination

### Venue Fields (Required)
- `venue_name` - Venue name
- `venue_rating` - Rating (affects card darkness)
- `venue_review_count` - Number of reviews
- `venue_location` - Location text

### Venue Fields (Optional)
- `venue_instagram` - Instagram link
- `venue_phone` - Phone number
- `venue_coordinates` - `{ lat, lng }` for directions

## 🚀 Quick Test

Test it immediately:

```bash
# Visit the stacked cards page
http://localhost:3000/stacked
```

Or update your existing list page to use the new component!

## 🎯 Key Features

✅ **Automatic color matching** with filter pills
✅ **Dynamic brightness** based on venue rating
✅ **Glassmorphism design** with backdrop blur
✅ **Stacking effect** with -30px negative margin
✅ **Expandable content** with smooth animations
✅ **Action buttons** (Instagram, Call, Share, Directions)
✅ **Mobile responsive** design

## 📝 TypeScript Types

All types are exported from the component:

```typescript
import type {
  Venue,
  Event,
  EventCardData,
  StackedEventCardsProps
} from '@/components/events/StackedEventCards';
```

## 🔍 Troubleshooting

### Cards not showing?
- Check console for data transformation errors
- Verify `filteredVenues` has data
- Ensure event categories exist in your data

### Colors look wrong?
- Check that your event categories match `PRIMARY_CATEGORY_MAP`
- Default is "Music Events" (purple) if category not found

### Rating-based darkness not working?
- Ensure `venue.rating` is between 1.0 and 5.0
- Default is 3.0 if not provided

---

**All set!** 🎉 Your stacked event cards are ready to use with your existing color system.
