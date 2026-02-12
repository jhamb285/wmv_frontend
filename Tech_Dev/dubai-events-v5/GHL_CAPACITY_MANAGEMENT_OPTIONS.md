# GHL Calendar Capacity Management - Complete Guide

## Overview

GoHighLevel provides several built-in ways to manage appointment capacity. This guide explains all options and how they work with your Google Sheets + n8n system.

---

## 🎯 GHL Native Capacity Options

### Option 1: **Appointments Per Slot** (What You're Using)

**Setting Location**: Calendar Settings → Availability → Advanced Settings

```
Setting: "Maximum appointments per slot"
Your Value: 3
```

**How It Works**:
- Each time slot can have up to 3 concurrent appointments
- GHL natively allows overbooking up to this limit
- When 3 appointments are booked for 2:00 PM, GHL hides that slot

**Example**:
```
2:00 PM slot (capacity = 3):
- Booking 1: John Doe - Available ✅
- Booking 2: Jane Smith - Available ✅
- Booking 3: Bob Johnson - Available ✅
- Booking 4: Alice Brown - BLOCKED ❌ (slot hidden in calendar widget)
```

**Pros**:
- ✅ Built into GHL
- ✅ No API needed
- ✅ Works with native booking widget
- ✅ Simple to configure

**Cons**:
- ❌ Same capacity for ALL time slots (can't vary by hour)
- ❌ Can't have different capacity for different services
- ❌ No hourly/daily variation
- ❌ Can't easily change without editing calendar settings

---

### Option 2: **Round Robin Assignment**

**Setting Location**: Calendar Settings → Assignment → Round Robin

```
Setting: "Assign appointments using Round Robin"
Options:
- Assign to available team member
- Prioritize by schedule
- Equal distribution
```

**How It Works**:
- Distributes appointments evenly across team members
- Each team member has their own availability
- Capacity = number of team members available at that time

**Example**:
```
Team Members:
- Dr. Smith (Mon-Fri 9 AM - 5 PM)
- Dr. Jones (Mon-Wed 9 AM - 3 PM)
- Dr. Brown (Thu-Fri 10 AM - 4 PM)

Monday 2:00 PM capacity = 2 (Smith + Jones)
Thursday 2:00 PM capacity = 2 (Smith + Brown)
Thursday 10:00 AM capacity = 2 (Smith + Brown)
Thursday 5:00 PM capacity = 1 (only Smith)
```

**Assignment Logic**:
```
Booking 1 → Assigned to Dr. Smith
Booking 2 → Assigned to Dr. Jones (round robin)
Booking 3 → Assigned to Dr. Smith (back to start)
```

**Pros**:
- ✅ Dynamic capacity based on team availability
- ✅ Fair distribution of workload
- ✅ Capacity automatically adjusts when team members are unavailable

**Cons**:
- ❌ Requires multiple GHL users (costs more)
- ❌ Capacity limited to number of team members
- ❌ Can't overbook beyond team size

---

### Option 3: **Class/Group Calendar**

**Setting Location**: Create Calendar → Select "Class Calendar" type

```
Type: Class/Group Calendar
Capacity: 10 (seats per class)
```

**How It Works**:
- Designed for group sessions (classes, webinars, workshops)
- Single event with multiple attendees
- All attendees share the same time slot

**Example**:
```
Yoga Class - 10:00 AM (capacity = 10):
- Attendee 1: John Doe ✅
- Attendee 2: Jane Smith ✅
- ...
- Attendee 10: Bob Johnson ✅
- Attendee 11: Alice Brown ❌ (class full)
```

**Pros**:
- ✅ High capacity (up to 100+ per slot)
- ✅ Perfect for group events
- ✅ Built-in attendee management

**Cons**:
- ❌ Not suitable for individual appointments
- ❌ All attendees see each other
- ❌ Different workflow from service calendars

---

### Option 4: **Multiple Calendars**

**Strategy**: Create separate calendars for different capacity needs

```
Calendar 1: "Morning Hygiene" (capacity = 2)
Calendar 2: "Afternoon Hygiene" (capacity = 4)
Calendar 3: "Consultations" (capacity = 1)
```

**How It Works**:
- Each calendar has its own capacity setting
- User selects appropriate calendar when booking
- Manage capacity by enabling/disabling calendars

**Example**:
```
Patient wants hygiene appointment:
- Show both "Morning Hygiene" and "Afternoon Hygiene" options
- Each has different capacity
- Times display based on respective settings
```

**Pros**:
- ✅ Different capacity per calendar
- ✅ Can adjust capacity by enabling/disabling
- ✅ Separate booking flows for different services

**Cons**:
- ❌ Clutters calendar view
- ❌ Harder to manage multiple calendars
- ❌ Confusing for patients (which calendar to choose?)

---

### Option 5: **Block Slots API** (Dynamic Blocking)

**Method**: Use GHL Block Slots API to dynamically block times

```http
POST /calendars/{calendarId}/block-slots

Body:
{
  "startTime": "2025-11-07T14:00:00-05:00",
  "endTime": "2025-11-07T15:00:00-05:00",
  "title": "Capacity Reached"
}
```

**How It Works with Your System**:
```
1. Google Sheets says: 2:00 PM capacity = 1
2. n8n checks GHL: 1 appointment already exists
3. Capacity reached (1 booked / 1 capacity)
4. n8n calls Block Slots API to hide 2:00 PM
5. GHL calendar widget no longer shows 2:00 PM
```

**Pros**:
- ✅ Dynamic blocking based on Google Sheets capacity
- ✅ Can vary by hour/day/service
- ✅ Works with your existing n8n workflow
- ✅ Calendar widget respects blocks automatically

**Cons**:
- ❌ Requires API calls (adds complexity)
- ❌ Need to clean up blocks periodically
- ❌ Blocks apply to ALL booking sources (widget, manual, API)

---

## 🔄 Your Current Setup: Hybrid Approach

### What You Have Now:

**GHL Calendar Settings**:
```
Maximum appointments per slot: 3
Round Robin: Disabled
Calendar Type: Service Calendar
```

**Google Sheets**:
```
Hour  | Capacity | Reality
------|----------|--------
9 AM  | 2        | Can actually book 3 (GHL limit)
1 PM  | 4        | Only allows 3 (GHL limit)
3 PM  | 1        | Only allows 1 (Sheets limit wins)
```

**Current Behavior**:
- Your **n8n workflow** enforces Google Sheets capacity
- **GHL calendar widget** allows up to 3 (native limit)
- **Mismatch**: Widget might show availability when Sheets says capacity=1

---

## 🎯 Recommended Solutions for Your Needs

### **Problem**: You want variable capacity by hour, but GHL native capacity is fixed at 3

### **Solution 1: Sync Blocks to GHL** ⭐ RECOMMENDED

Enhance your n8n workflow to create/delete block slots dynamically.

**How It Works**:

```
┌─────────────────────────────────────────────────────┐
│              GOOGLE SHEETS (Source of Truth)        │
├─────────────────────────────────────────────────────┤
│ Hour  | Capacity | Current Bookings | Available    │
│ 9 AM  | 2        | 1                | 1            │
│ 10 AM | 4        | 3                | 1            │
│ 11 AM | 1        | 1                | 0 (FULL)     │
└─────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────┐
│              N8N WORKFLOW LOGIC                      │
├─────────────────────────────────────────────────────┤
│ IF capacity=1 AND current_bookings=1:               │
│   → Create block slot to hide time in GHL widget    │
│                                                      │
│ IF capacity=1 AND current_bookings=0:               │
│   → Delete block slot (if exists) to show time      │
└─────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────┐
│              GHL CALENDAR WIDGET                     │
├─────────────────────────────────────────────────────┤
│ ✅ Shows: 9 AM (1 slot left)                        │
│ ✅ Shows: 10 AM (1 slot left)                       │
│ ❌ Hidden: 11 AM (blocked - capacity reached)       │
└─────────────────────────────────────────────────────┘
```

**Implementation in n8n**:

Add these nodes after "Count Overlapping Bookings":

```javascript
// New Node: "Check If Should Block Slot"
const capacityData = $('Find Matching Capacity').item.json;
const bookingData = $('Count Overlapping Bookings').item.json;

const shouldBlock = (
  bookingData.availableSlots === 0 ||
  (capacityData.slotCapacity === 1 && bookingData.currentBookings >= 1)
);

return {
  json: {
    shouldBlock: shouldBlock,
    startTime: bookingData.timeData.startISO,
    endTime: bookingData.timeData.endISO,
    reason: shouldBlock ? "Capacity reached" : "Slots available"
  }
};
```

```javascript
// New Node: "Create Block Slot" (if shouldBlock = true)
// HTTP Request to GHL API
POST /calendars/{calendarId}/block-slots

Body:
{
  "locationId": "{{$('Config').item.json.locationId}}",
  "calendarId": "{{$('Config').item.json.calendarId}}",
  "startTime": "{{$('Check If Should Block Slot').item.json.startTime}}",
  "endTime": "{{$('Check If Should Block Slot').item.json.endTime}}",
  "title": "Capacity Reached (Auto-blocked by n8n)",
  "notes": "Blocked because Google Sheets capacity reached"
}
```

**Benefits**:
- ✅ GHL calendar widget accurately reflects Google Sheets capacity
- ✅ Patients can't double-book through widget
- ✅ Works for capacity=1 special cases
- ✅ Automatic sync between Sheets and GHL

**Maintenance**:
- Need periodic cleanup of old block slots (weekly/monthly)
- Consider adding "unblock" logic when appointments are cancelled

---

### **Solution 2: Set GHL Calendar to Max Capacity**

Set GHL native capacity to match your highest Google Sheets capacity.

**Configuration**:
```
Google Sheets highest capacity: 4 (at 1 PM)
GHL Calendar Setting: "Maximum appointments per slot" = 4

Hour  | Sheets Capacity | GHL Native | Effective
------|-----------------|------------|----------
9 AM  | 2               | 4          | 2 (n8n enforces)
1 PM  | 4               | 4          | 4 (both allow)
3 PM  | 1               | 4          | 1 (n8n enforces)
```

**Pros**:
- ✅ Simple change (just update one GHL setting)
- ✅ n8n still enforces stricter Sheets limits
- ✅ No risk of GHL blocking when Sheets allows

**Cons**:
- ❌ GHL widget might show availability when Sheets says full
- ❌ Widget-based bookings bypass n8n checks
- ❌ Need to disable GHL widget or route through n8n only

---

### **Solution 3: Disable GHL Public Widget** (API-Only Booking)

Force all bookings through your n8n API endpoint.

**How**:
1. Disable GHL calendar public widget
2. Build custom booking form on your website
3. Form submits to n8n webhook (your current system)
4. n8n enforces Google Sheets capacity perfectly

**Benefits**:
- ✅ 100% control over capacity enforcement
- ✅ No widget vs. API mismatches
- ✅ Custom booking experience

**Drawbacks**:
- ❌ Need to build custom booking UI
- ❌ Can't use GHL's native widget features
- ❌ More development work

---

### **Solution 4: Use GHL Calendar Resources API** 🆕

Leverage the new Resources API for room/chair capacity.

**Setup**:
```
Create Resources:
- Resource 1: "Exam Room 1"
- Resource 2: "Exam Room 2"
- Resource 3: "Exam Room 3"

Calendar Setting:
- Require resource booking
- Capacity = number of available resources at that time
```

**Dynamic Capacity via API**:
```javascript
// Make certain resources unavailable at specific times
// Example: Morning - 2 rooms, Afternoon - 4 rooms

// Morning: Make Resources 3 & 4 unavailable
POST /calendars/resources/{resource3}/availability
{ available: false, startTime: "09:00", endTime: "12:00" }

// Afternoon: Make all resources available
POST /calendars/resources/{resource3}/availability
{ available: true, startTime: "13:00", endTime: "17:00" }
```

**Pros**:
- ✅ Native GHL feature (no hacks)
- ✅ Dynamic capacity by time
- ✅ Visual resource management in GHL UI
- ✅ Track which room/chair is used

**Cons**:
- ❌ Newer feature (may have bugs)
- ❌ More complex setup
- ❌ Requires understanding of Resources API

---

## 📊 Comparison Table

| Method | Hourly Variation | Service Variation | Complexity | GHL Widget Sync | Recommended |
|--------|-----------------|-------------------|------------|-----------------|-------------|
| **Native Capacity** | ❌ No | ❌ No | ⭐ Low | ✅ Yes | ⚠️ Limited |
| **Round Robin** | ⚠️ Indirect | ❌ No | ⭐⭐ Medium | ✅ Yes | ⚠️ Team-based only |
| **Multiple Calendars** | ✅ Yes | ✅ Yes | ⭐⭐⭐ High | ✅ Yes | ❌ Messy |
| **Block Slots API** | ✅ Yes | ✅ Yes | ⭐⭐⭐ High | ✅ Yes | ✅ **BEST** |
| **API-Only Booking** | ✅ Yes | ✅ Yes | ⭐⭐⭐⭐ Very High | ❌ No widget | ⚠️ Custom build |
| **Resources API** | ✅ Yes | ⚠️ Indirect | ⭐⭐⭐⭐ Very High | ✅ Yes | ✅ Future-proof |

---

## 🎯 My Recommendation for You

Based on your requirements:
- ✅ You want variable capacity by hour
- ✅ You want to block when capacity=1 is full
- ✅ You want GHL widget to respect Google Sheets capacity

### **Implement Solution 1: Block Slots API** ⭐

**Why**:
1. Works with your existing setup
2. GHL widget automatically respects blocks
3. Google Sheets remains source of truth
4. No need to rebuild booking UI

**Action Items**:
1. Update n8n workflow to create block slots when capacity reached
2. Set GHL calendar "Maximum appointments per slot" to 4 (your max)
3. Add cleanup workflow to remove old blocks weekly

---

## 🛠️ Implementation Example: Block Slots Integration

### Enhanced n8n Workflow

**Add after "Count Overlapping Bookings" node**:

```
[Count Overlapping Bookings]
          ↓
[IF: Capacity Full?]
     ↙         ↘
   YES         NO
     ↓          ↓
[Create    [Continue Normal
 Block      Booking Flow]
 Slot]
```

### New Node: "Check If Full"

```javascript
const slotCapacity = $('Find Matching Capacity').item.json.slotCapacity;
const currentBookings = $('Count Overlapping Bookings').item.json.currentBookings;
const availableSlots = slotCapacity - currentBookings;

return {
  json: {
    isFull: availableSlots <= 0,
    slotCapacity: slotCapacity,
    currentBookings: currentBookings,
    availableSlots: availableSlots
  }
};
```

### New Node: "Create Block Slot" (HTTP Request)

```http
POST https://services.gohighlevel.com/calendars/{{calendarId}}/block-slots

Headers:
Authorization: Bearer YOUR_API_KEY

Body:
{
  "locationId": "{{locationId}}",
  "calendarId": "{{calendarId}}",
  "startTime": "{{startISO}}",
  "endTime": "{{endISO}}",
  "title": "🚫 Capacity Full",
  "notes": "Auto-blocked by n8n capacity system. Capacity: {{slotCapacity}}, Booked: {{currentBookings}}"
}
```

### Cleanup Workflow (Weekly)

**Separate n8n workflow (runs weekly)**:

```javascript
// Get all block slots created by automation
GET /calendars/{calendarId}/block-slots

// Filter blocks older than 7 days
const oldBlocks = blocks.filter(b =>
  new Date(b.startTime) < new Date(Date.now() - 7*24*60*60*1000)
);

// Delete old blocks
oldBlocks.forEach(block => {
  DELETE /calendars/{calendarId}/block-slots/{block.id}
});
```

---

## 🎓 Best Practices

### 1. Keep GHL Native Capacity as "Safety Net"
```
Set to: Your highest capacity + 1
Example: If max capacity in Sheets is 4, set GHL to 5

Why: Prevents accidental overbooking if n8n fails
```

### 2. Use Descriptive Block Slot Titles
```
Good: "🚫 2PM Full (2/2) - Auto-blocked"
Bad: "Blocked"

Why: Easy to identify automated blocks in GHL UI
```

### 3. Tag Automated Blocks
```
Add identifier in notes: "AUTO_BLOCK_N8N"

Why: Easy to filter and clean up programmatically
```

### 4. Monitor Block Slot Creation
```
Log to Google Sheets:
- Timestamp
- Hour blocked
- Reason
- Block ID (for cleanup)

Why: Track when capacity is reached, optimize scheduling
```

### 5. Handle Block Failures Gracefully
```javascript
try {
  createBlockSlot();
} catch (error) {
  // Still allow booking to proceed (n8n enforces capacity)
  // Log error for review
  logError("Block slot creation failed, but booking allowed");
}
```

---

## ❓ FAQ

### Q: What happens if someone books through GHL widget during a race condition?

**A**: With Block Slots API:
- n8n blocks slot immediately when capacity reached
- GHL widget refreshes and hides blocked time
- Future widget bookings can't select that time
- Only API bookings (through n8n) work after that

Without blocking:
- GHL native capacity is your only protection
- Set it to match your max expected capacity

---

### Q: Can I have different capacity for different service types in the same hour?

**A**: Not easily with single calendar. Options:
1. Create separate calendars per service type (messy)
2. Use custom fields in booking form + n8n logic to filter
3. Use Calendar Resources API with service-specific resources

---

### Q: How do I prevent GHL widget bookings and force API-only?

**A**:
1. Calendar Settings → Widget Settings → Disable "Show on public pages"
2. Use Calendar API Key authentication (requires API key to book)
3. Build custom form that calls n8n webhook only

---

### Q: Can I use Round Robin AND capacity management?

**A**: Yes! Combine them:
- Round Robin assigns to team members
- Each team member's calendar has "appointments per slot" setting
- n8n adds additional layer from Google Sheets

Example:
```
Dr. Smith calendar: 2 appointments per slot
Dr. Jones calendar: 2 appointments per slot
Total capacity at 2 PM: 4 (2+2)
Google Sheets says 2 PM capacity = 3
n8n blocks after 3 bookings (stricter than GHL)
```

---

## 🎯 Action Plan for Your Setup

### Phase 1: Immediate (Today)
```
✅ Set GHL calendar "Maximum appointments per slot" = 4
   (Matches your highest Google Sheets capacity)

✅ Test current n8n workflow with capacity=1, 2, 3, 4
   (Verify n8n enforcement works)
```

### Phase 2: Short Term (This Week)
```
✅ Add "Block Slot" logic to n8n workflow
✅ Test block creation when capacity reached
✅ Verify GHL widget hides blocked times
```

### Phase 3: Medium Term (Next 2 Weeks)
```
✅ Add cleanup workflow for old blocks
✅ Monitor block creation logs
✅ Optimize capacity in Google Sheets based on real data
```

### Phase 4: Long Term (Future)
```
⚠️  Consider migrating to Calendar Resources API
⚠️  Explore building custom booking UI
⚠️  Add predictive capacity suggestions
```

---

## 📚 Additional Resources

**GHL Calendar Documentation**:
- https://help.gohighlevel.com/support/solutions/48000449585

**GHL Resources API** (New):
- https://marketplace.gohighlevel.com/docs/ghl/calendars/resources/

**Your Implementation Docs**:
- `GHL_CALENDAR_API_REFERENCE.md` - All API endpoints
- `GHL_CAPACITY_BOOKING_IMPLEMENTATION.md` - Current setup
- `GHL_QUICK_REFERENCE.md` - Quick reference guide

---

## 🎉 Summary

**Your Question**: "How do I manage variable capacity with GHL?"

**Answer**:
1. **Current**: GHL native capacity (fixed at 3) + n8n enforcement (variable from Sheets)
2. **Problem**: Widget might show availability when Sheets says full
3. **Solution**: Add Block Slots API to n8n workflow ⭐
4. **Benefit**: GHL widget automatically syncs with Google Sheets capacity

**Next Step**:
Enhance your n8n workflow to create block slots when capacity is reached. This makes GHL widget respect your Google Sheets capacity configuration!

---

**Need help implementing Block Slots API in your n8n workflow? Let me know!** 🚀
