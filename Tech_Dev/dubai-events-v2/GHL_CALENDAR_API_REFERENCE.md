# GoHighLevel (GHL) Calendar API - Complete Reference

## Overview

This document provides a comprehensive list of all Calendar-related API endpoints available in GoHighLevel (GHL), including both API v1 and API v2 (recommended).

**Official Documentation**:
- API v2: https://marketplace.gohighlevel.com/docs/
- Developer Portal: https://developers.gohighlevel.com/

**Important Notes**:
- ✅ **Use API v2** for new integrations (all future endpoints will be added here)
- ⚠️ **API v1** has reached end-of-support (existing integrations still work, but no new support)
- 🔐 Authentication: OAuth 2.0 or API Key (Header: `Authorization: Bearer YOUR_API_KEY`)
- ⏱️ Rate Limit: 100 requests per 10 seconds per location/company

---

## API Base URLs

```
API v1: https://rest.gohighlevel.com/v1/
API v2: https://services.gohighlevel.com/
```

---

## 📅 Calendar Management APIs

### 1. Get All Calendars
**Get list of all calendars for a location**

```http
GET /calendars
```

**Query Parameters**:
- `locationId` (required) - Location ID

**Response**:
```json
{
  "calendars": [
    {
      "id": "calendar_123",
      "name": "Clinic Appointments",
      "description": "Main clinic booking calendar",
      "locationId": "location_abc",
      "status": "active",
      "eventType": "ServiceCalendar"
    }
  ]
}
```

**Use Case**: List all available calendars for selection

---

### 2. Get Calendar by ID
**Get detailed information about a specific calendar**

```http
GET /calendars/{calendarId}
```

**Path Parameters**:
- `calendarId` (required) - Calendar ID

**Response**:
```json
{
  "calendar": {
    "id": "calendar_123",
    "name": "Clinic Appointments",
    "description": "Main clinic booking calendar",
    "locationId": "location_abc",
    "slug": "clinic-appointments",
    "widgetSlug": "clinic-appointments-widget",
    "widgetType": "default",
    "calendarType": "service",
    "eventType": "ServiceCalendar",
    "eventTitle": "Appointment",
    "eventColor": "#039BE5",
    "meetingLocation": "123 Main St, Clinic",
    "slotDuration": 60,
    "slotInterval": 30,
    "slotBuffer": 0,
    "preBuffer": 0,
    "appoinmentPerSlot": 1,
    "appoinmentPerDay": 20,
    "openHours": [
      {
        "daysOfTheWeek": [1, 2, 3, 4, 5],
        "hours": [
          {
            "openHour": 9,
            "openMinute": 0,
            "closeHour": 17,
            "closeMinute": 0
          }
        ]
      }
    ],
    "enableRecurring": false,
    "recurring": null,
    "formId": "form_123",
    "stickyContact": true,
    "isLivePaymentMode": false,
    "autoConfirm": true,
    "shouldSendAlertEmailsToAssignedMember": true,
    "alertEmail": "admin@clinic.com",
    "googleInvitationEmails": false,
    "allowReschedule": true,
    "allowCancellation": true,
    "shouldAssignContactToTeamMember": true,
    "shouldSkipAssigningContactForExisting": false,
    "notes": "Please arrive 10 minutes early",
    "pixelId": null,
    "formSubmitType": "RedirectURL",
    "formSubmitRedirectURL": "https://clinic.com/thank-you",
    "formSubmitThanksMessage": "Thank you for booking!",
    "availabilityType": 0,
    "guestType": "count_only",
    "consentLabel": "I agree to the terms and conditions",
    "calendarCoverImage": "https://example.com/cover.jpg"
  }
}
```

**Use Case**: Get full calendar configuration including office hours, slot settings, etc.

---

### 3. Create Calendar
**Create a new calendar**

```http
POST /calendars
```

**Request Body**:
```json
{
  "locationId": "location_abc",
  "name": "New Calendar",
  "description": "Calendar description",
  "slug": "new-calendar",
  "widgetSlug": "new-calendar-widget",
  "widgetType": "default",
  "calendarType": "service",
  "eventType": "ServiceCalendar",
  "eventTitle": "Appointment",
  "eventColor": "#039BE5",
  "meetingLocation": "Office Address",
  "slotDuration": 60,
  "slotInterval": 30,
  "slotBuffer": 0,
  "preBuffer": 0,
  "appoinmentPerSlot": 1,
  "appoinmentPerDay": 20,
  "openHours": [
    {
      "daysOfTheWeek": [1, 2, 3, 4, 5],
      "hours": [
        {
          "openHour": 9,
          "openMinute": 0,
          "closeHour": 17,
          "closeMinute": 0
        }
      ]
    }
  ],
  "autoConfirm": true,
  "allowReschedule": true,
  "allowCancellation": true
}
```

**Response**:
```json
{
  "calendar": {
    "id": "calendar_new123",
    "name": "New Calendar",
    ...
  }
}
```

**Use Case**: Programmatically create calendars for different services

---

### 4. Update Calendar
**Modify calendar settings**

```http
PUT /calendars/{calendarId}
PATCH /calendars/{calendarId}
```

**Path Parameters**:
- `calendarId` (required) - Calendar ID

**Request Body**: Same as Create Calendar (partial updates allowed with PATCH)

**Use Case**: Update office hours, slot duration, capacity, etc.

---

### 5. Delete Calendar
**Remove a calendar**

```http
DELETE /calendars/{calendarId}
```

**Path Parameters**:
- `calendarId` (required) - Calendar ID

**Response**:
```json
{
  "success": true,
  "message": "Calendar deleted successfully"
}
```

**Use Case**: Remove unused calendars

---

## 🗓️ Appointment APIs

### 6. Get All Appointments
**List appointments for a calendar**

```http
GET /appointments
```

**Query Parameters**:
- `locationId` (required) - Location ID
- `calendarId` (required) - Calendar ID
- `startDate` (optional) - Filter from date (ISO 8601: `2025-11-07T00:00:00Z`)
- `endDate` (optional) - Filter to date (ISO 8601: `2025-11-07T23:59:59Z`)
- `includeAll` (optional) - Include cancelled appointments (boolean)
- `contactId` (optional) - Filter by specific contact
- `teamMemberId` (optional) - Filter by assigned team member
- `limit` (optional) - Results per page (default: 20, max: 100)
- `skip` (optional) - Skip N results (pagination)

**Response**:
```json
{
  "appointments": [
    {
      "id": "apt_123",
      "calendarId": "calendar_abc",
      "locationId": "location_xyz",
      "contactId": "contact_456",
      "groupId": null,
      "appointmentStatus": "confirmed",
      "assignedUserId": "user_789",
      "title": "Hygiene Appointment",
      "startTime": "2025-11-07T13:00:00.000Z",
      "endTime": "2025-11-07T14:00:00.000Z",
      "notes": "Patient prefers afternoon",
      "source": "api",
      "dateAdded": "2025-11-06T10:30:00.000Z",
      "selectedTimezone": "America/New_York",
      "selectedSlot": "2025-11-07T13:00:00-05:00",
      "calendarNotification": true
    }
  ],
  "count": 1,
  "total": 1
}
```

**Use Case**:
- ✅ **Your booking system uses this** to check existing appointments
- Count bookings in a time slot
- Display appointment list

---

### 7. Get Appointment by ID
**Get details of a specific appointment**

```http
GET /appointments/{appointmentId}
```

**Path Parameters**:
- `appointmentId` (required) - Appointment ID

**Response**:
```json
{
  "appointment": {
    "id": "apt_123",
    "calendarId": "calendar_abc",
    "locationId": "location_xyz",
    "contactId": "contact_456",
    "appointmentStatus": "confirmed",
    "title": "Hygiene Appointment",
    "startTime": "2025-11-07T13:00:00.000Z",
    "endTime": "2025-11-07T14:00:00.000Z",
    "notes": "Patient prefers afternoon",
    ...
  }
}
```

**Use Case**: Get full appointment details for confirmation

---

### 8. Create Appointment
**Book a new appointment**

```http
POST /appointments
```

**Request Body**:
```json
{
  "calendarId": "calendar_abc",
  "locationId": "location_xyz",
  "contactId": "contact_456",
  "startTime": "2025-11-07T13:00:00-05:00",
  "endTime": "2025-11-07T14:00:00-05:00",
  "title": "Hygiene Appointment",
  "appointmentStatus": "confirmed",
  "assignedUserId": "user_789",
  "address": "123 Main St",
  "ignoreDateRange": false,
  "toNotify": true,
  "notes": "Booked via API"
}
```

**Required Fields**:
- `calendarId`
- `locationId`
- `contactId`
- `startTime`
- `endTime`

**Optional Fields**:
- `title` - Appointment title
- `appointmentStatus` - `confirmed`, `showed`, `noshow`, `cancelled`, `invalid`
- `assignedUserId` - Team member ID
- `address` - Meeting location
- `notes` - Additional notes
- `toNotify` - Send notifications (boolean, default: true)
- `ignoreDateRange` - Allow booking outside calendar range (boolean)

**Response**:
```json
{
  "appointment": {
    "id": "apt_new123",
    "calendarId": "calendar_abc",
    "contactId": "contact_456",
    "startTime": "2025-11-07T13:00:00.000Z",
    "endTime": "2025-11-07T14:00:00.000Z",
    "appointmentStatus": "confirmed",
    ...
  }
}
```

**Possible Errors**:
- `400` - Validation error (e.g., time conflict, invalid date format)
- `401` - Unauthorized (invalid API key)
- `404` - Calendar or contact not found
- `409` - Conflict (slot already booked, if capacity exceeded)

**Use Case**:
- ✅ **Your booking system uses this** to create appointments
- Core booking functionality

---

### 9. Update Appointment
**Modify an existing appointment**

```http
PUT /appointments/{appointmentId}
PATCH /appointments/{appointmentId}
```

**Path Parameters**:
- `appointmentId` (required) - Appointment ID

**Request Body** (partial updates allowed):
```json
{
  "startTime": "2025-11-07T14:00:00-05:00",
  "endTime": "2025-11-07T15:00:00-05:00",
  "appointmentStatus": "confirmed",
  "notes": "Updated notes"
}
```

**Response**:
```json
{
  "appointment": {
    "id": "apt_123",
    "startTime": "2025-11-07T14:00:00.000Z",
    "endTime": "2025-11-07T15:00:00.000Z",
    ...
  }
}
```

**Use Case**:
- Reschedule appointments
- Change status (confirmed → showed/noshow/cancelled)
- Update notes or assigned user

---

### 10. Delete Appointment
**Cancel/remove an appointment**

```http
DELETE /appointments/{appointmentId}
```

**Path Parameters**:
- `appointmentId` (required) - Appointment ID

**Response**:
```json
{
  "success": true,
  "message": "Appointment deleted successfully"
}
```

**Note**: Some calendars may prefer to UPDATE status to "cancelled" instead of DELETE

**Use Case**: Cancel appointments, free up slots

---

## 🕐 Free Slots & Availability APIs

### 11. Get Free Slots
**Get available time slots for booking**

```http
GET /calendars/{calendarId}/free-slots
```

**Query Parameters**:
- `startDate` (required) - Start date (YYYY-MM-DD or ISO 8601)
- `endDate` (required) - End date (YYYY-MM-DD or ISO 8601)
- `timezone` (optional) - Timezone (e.g., "America/New_York")

**Response**:
```json
{
  "slots": [
    {
      "date": "2025-11-07",
      "slots": [
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00"
      ]
    },
    {
      "date": "2025-11-08",
      "slots": [
        "09:00",
        "09:30",
        "10:00"
      ]
    }
  ]
}
```

**Use Case**:
- Display available slots to users
- Alternative suggestion system
- ⚠️ **Note**: Your booking system uses Google Sheets for capacity instead, but this API is useful for native GHL slot management

---

### 12. Get Blocked Slots
**Get all blocked/unavailable time slots**

```http
GET /calendars/{calendarId}/block-slots
```

**Query Parameters**:
- `locationId` (required) - Location ID
- `startDate` (optional) - Filter from date
- `endDate` (optional) - Filter to date

**Response**:
```json
{
  "events": [
    {
      "id": "block_123",
      "calendarId": "calendar_abc",
      "startTime": "2025-11-07T12:00:00.000Z",
      "endTime": "2025-11-07T13:00:00.000Z",
      "title": "Lunch Break",
      "assignedUserId": null
    }
  ]
}
```

**Use Case**:
- Check blocked periods (lunch, meetings, etc.)
- Exclude from available slots

---

### 13. Create Blocked Slot
**Block a time period from bookings**

```http
POST /calendars/{calendarId}/block-slots
```

**Request Body**:
```json
{
  "locationId": "location_xyz",
  "calendarId": "calendar_abc",
  "startTime": "2025-11-07T12:00:00-05:00",
  "endTime": "2025-11-07T13:00:00-05:00",
  "title": "Lunch Break",
  "assignedUserId": "user_789"
}
```

**Response**:
```json
{
  "event": {
    "id": "block_new123",
    "calendarId": "calendar_abc",
    "startTime": "2025-11-07T12:00:00.000Z",
    "endTime": "2025-11-07T13:00:00.000Z",
    "title": "Lunch Break"
  }
}
```

**Use Case**:
- Block lunch breaks
- Block staff meetings
- Block personal time off
- Alternative to Google Sheets capacity=0

---

### 14. Update Blocked Slot
**Modify a blocked time period**

```http
PUT /calendars/{calendarId}/block-slots/{blockSlotId}
PATCH /calendars/{calendarId}/block-slots/{blockSlotId}
```

**Path Parameters**:
- `calendarId` (required) - Calendar ID
- `blockSlotId` (required) - Block slot ID

**Request Body**: Same as Create Blocked Slot (partial updates allowed)

**Use Case**: Change blocked period times

---

### 15. Delete Blocked Slot
**Remove a blocked time period**

```http
DELETE /calendars/{calendarId}/block-slots/{blockSlotId}
```

**Path Parameters**:
- `calendarId` (required) - Calendar ID
- `blockSlotId` (required) - Block slot ID

**Response**:
```json
{
  "success": true,
  "message": "Block slot deleted successfully"
}
```

**Use Case**: Re-open previously blocked time

---

## 📋 Calendar Events APIs

Calendar Events are similar to appointments but can include non-bookable events.

### 16. Get Calendar Events
**Get all events (appointments + blocked slots + custom events)**

```http
GET /calendars/{calendarId}/events
```

**Query Parameters**:
- `locationId` (required) - Location ID
- `startDate` (optional) - Filter from date
- `endDate` (optional) - Filter to date

**Response**:
```json
{
  "events": [
    {
      "id": "event_123",
      "calendarId": "calendar_abc",
      "eventType": "appointment",
      "title": "Patient Appointment",
      "startTime": "2025-11-07T13:00:00.000Z",
      "endTime": "2025-11-07T14:00:00.000Z",
      "status": "confirmed"
    },
    {
      "id": "event_456",
      "calendarId": "calendar_abc",
      "eventType": "blockSlot",
      "title": "Lunch Break",
      "startTime": "2025-11-07T12:00:00.000Z",
      "endTime": "2025-11-07T13:00:00.000Z",
      "status": "active"
    }
  ]
}
```

**Use Case**: Get unified view of all calendar activity

---

### 17. Delete Calendar Event
**Remove an event (appointment or blocked slot)**

```http
DELETE /calendars/events/{eventId}
```

**Path Parameters**:
- `eventId` (required) - Event ID

**Response**:
```json
{
  "success": true,
  "message": "Event deleted successfully"
}
```

**Use Case**: Unified deletion endpoint for any event type

---

## 👥 Calendar Groups APIs

Calendar Groups allow multiple team members to share a calendar.

### 18. Get Calendar Groups
**Get all calendar groups**

```http
GET /calendars/groups
```

**Query Parameters**:
- `locationId` (required) - Location ID

**Response**:
```json
{
  "groups": [
    {
      "id": "group_123",
      "name": "Hygienist Team",
      "description": "All hygienists",
      "locationId": "location_abc",
      "isActive": true
    }
  ]
}
```

**Use Case**: Manage team-based calendars

---

### 19. Create Calendar Group
**Create a new calendar group**

```http
POST /calendars/groups
```

**Request Body**:
```json
{
  "locationId": "location_abc",
  "name": "Hygienist Team",
  "description": "All hygienists",
  "isActive": true
}
```

**Use Case**: Create team calendars

---

### 20. Update Calendar Group
**Modify calendar group**

```http
PUT /calendars/groups/{groupId}
PATCH /calendars/groups/{groupId}
```

**Use Case**: Update team calendar settings

---

### 21. Delete Calendar Group
**Remove a calendar group**

```http
DELETE /calendars/groups/{groupId}
```

**Use Case**: Remove unused team calendars

---

## 🛠️ Calendar Resources APIs (Rooms & Equipment)

New feature for managing physical resources like rooms and equipment.

### 22. Get Calendar Resources
**Get all resources (rooms, equipment)**

```http
GET /calendars/resources
```

**Query Parameters**:
- `locationId` (required) - Location ID
- `resourceType` (optional) - Filter by type (e.g., "room", "equipment")

**Response**:
```json
{
  "resources": [
    {
      "id": "resource_123",
      "name": "Exam Room 1",
      "description": "Main exam room",
      "resourceType": "room",
      "capacity": 1,
      "isActive": true
    },
    {
      "id": "resource_456",
      "name": "X-Ray Machine",
      "description": "Digital X-Ray",
      "resourceType": "equipment",
      "capacity": 1,
      "isActive": true
    }
  ]
}
```

**Use Case**:
- Track room availability
- Manage equipment booking
- Enhanced capacity management

---

### 23. Create Calendar Resource
**Add a new resource**

```http
POST /calendars/resources
```

**Request Body**:
```json
{
  "locationId": "location_abc",
  "name": "Exam Room 2",
  "description": "Secondary exam room",
  "resourceType": "room",
  "capacity": 1,
  "isActive": true
}
```

**Use Case**: Add rooms/equipment to system

---

### 24. Update Calendar Resource
**Modify resource details**

```http
PUT /calendars/resources/{resourceId}
PATCH /calendars/resources/{resourceId}
```

**Use Case**: Update room/equipment details

---

### 25. Delete Calendar Resource
**Remove a resource**

```http
DELETE /calendars/resources/{resourceId}
```

**Use Case**: Remove decommissioned rooms/equipment

---

## 📝 Appointment Notes APIs

### 26. Get Appointment Notes
**Get notes for an appointment**

```http
GET /appointments/{appointmentId}/notes
```

**Response**:
```json
{
  "notes": [
    {
      "id": "note_123",
      "appointmentId": "apt_456",
      "userId": "user_789",
      "body": "Patient arrived 10 minutes early",
      "dateAdded": "2025-11-07T13:00:00.000Z"
    }
  ]
}
```

**Use Case**: Track appointment history and comments

---

### 27. Add Appointment Note
**Add a note to an appointment**

```http
POST /appointments/{appointmentId}/notes
```

**Request Body**:
```json
{
  "body": "Patient requested follow-up in 6 months",
  "userId": "user_789"
}
```

**Use Case**: Document appointment details

---

## 🔔 Calendar Notifications

Calendar notifications are configured in the calendar settings, but you can trigger them via appointments.

### Notification Triggers:
- **Appointment Confirmed** - Sent when appointment is created/confirmed
- **Appointment Reminder** - Sent before appointment (configured in calendar)
- **Appointment Cancelled** - Sent when appointment is cancelled
- **Appointment Rescheduled** - Sent when appointment time is changed

**Notification Channels**:
- Email
- SMS
- In-app notifications
- Google Calendar invites (if enabled)

**Control via API**:
```json
{
  "toNotify": true  // Include in Create/Update Appointment request
}
```

---

## 📊 API Usage Examples

### Example 1: Check Availability and Book

```javascript
// Step 1: Check existing appointments
const checkAvailability = async (calendarId, startTime, endTime) => {
  const response = await fetch(
    `https://rest.gohighlevel.com/v1/appointments/?calendarId=${calendarId}&startDate=${startTime}&endDate=${endTime}`,
    {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY'
      }
    }
  );

  const data = await response.json();
  return data.appointments.length; // Count existing bookings
};

// Step 2: Book if available
const bookAppointment = async (calendarId, contactId, startTime, endTime) => {
  const currentBookings = await checkAvailability(calendarId, startTime, endTime);
  const capacity = 2; // Your capacity from Google Sheets

  if (currentBookings >= capacity) {
    return { status: 'no_availability' };
  }

  const response = await fetch(
    'https://rest.gohighlevel.com/v1/appointments/',
    {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        calendarId: calendarId,
        locationId: 'YOUR_LOCATION_ID',
        contactId: contactId,
        startTime: startTime,
        endTime: endTime,
        title: 'Hygiene Appointment',
        appointmentStatus: 'confirmed',
        toNotify: true
      })
    }
  );

  const data = await response.json();
  return { status: 'success', appointment: data.appointment };
};
```

### Example 2: Get Available Slots

```javascript
const getAvailableSlots = async (calendarId, date) => {
  const response = await fetch(
    `https://services.gohighlevel.com/calendars/${calendarId}/free-slots?startDate=${date}&endDate=${date}&timezone=America/New_York`,
    {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY'
      }
    }
  );

  const data = await response.json();
  return data.slots;
};
```

### Example 3: Block Time for Lunch

```javascript
const blockLunchTime = async (calendarId, date) => {
  const startTime = `${date}T12:00:00-05:00`;
  const endTime = `${date}T13:00:00-05:00`;

  const response = await fetch(
    `https://services.gohighlevel.com/calendars/${calendarId}/block-slots`,
    {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        locationId: 'YOUR_LOCATION_ID',
        calendarId: calendarId,
        startTime: startTime,
        endTime: endTime,
        title: 'Lunch Break'
      })
    }
  );

  const data = await response.json();
  return data.event;
};
```

---

## 🚨 Common Error Codes

| Status Code | Error | Meaning | Solution |
|-------------|-------|---------|----------|
| 400 | Bad Request | Invalid request format or missing required fields | Check request body matches API spec |
| 401 | Unauthorized | Invalid or missing API key | Verify API key in Authorization header |
| 403 | Forbidden | API key lacks required permissions | Check API scopes in GHL settings |
| 404 | Not Found | Calendar, appointment, or contact doesn't exist | Verify IDs are correct |
| 409 | Conflict | Appointment time conflict or capacity exceeded | Check for existing bookings, adjust time |
| 429 | Too Many Requests | Rate limit exceeded (100 req/10sec) | Implement retry with exponential backoff |
| 500 | Internal Server Error | GHL server error | Retry request, contact support if persists |

---

## 🔐 Authentication Methods

### Method 1: API Key (Simplest)
```http
Authorization: Bearer YOUR_API_KEY
```

**Get API Key**:
1. GHL Settings → API
2. Create API Key
3. Select scopes:
   - `calendars.readonly`
   - `calendars.write`
   - `calendars/events.readonly`
   - `calendars/events.write`
   - `contacts.readonly`
   - `contacts.write`

### Method 2: OAuth 2.0 (For Apps)
Used for marketplace apps and third-party integrations.

**OAuth Flow**:
1. User authorizes app
2. App receives authorization code
3. Exchange code for access token
4. Use access token in API requests

**Token Endpoint**: `https://marketplace.gohighlevel.com/oauth/token`

---

## 📚 Additional Resources

### Official Documentation
- **Marketplace Docs**: https://marketplace.gohighlevel.com/docs/
- **Developer Portal**: https://developers.gohighlevel.com/
- **Stoplight API Docs**: https://highlevel.stoplight.io/ (may require login)

### Community Resources
- **GHL Community**: https://community.gohighlevel.com/
- **Feature Requests**: https://ideas.gohighlevel.com/
- **Support Portal**: https://help.gohighlevel.com/

### API Testing Tools
- **Postman Collection**: Available on GHL Postman workspace
- **OAuth Helper**: https://www.ghlapiv2.com/

---

## 🎯 API Summary for Your Booking System

### Essential APIs (What You NEED)

| API | Purpose in Your System | Priority |
|-----|------------------------|----------|
| **GET /appointments** | Check existing bookings for capacity calculation | ✅ Critical |
| **POST /appointments** | Create new appointments after capacity check | ✅ Critical |
| **GET /calendars/{id}** | Verify calendar exists and get settings | ⚠️ Nice to have |
| **PUT /appointments/{id}** | Reschedule appointments | ⚠️ Nice to have |
| **DELETE /appointments/{id}** | Cancel appointments | ⚠️ Nice to have |
| **GET /calendars/{id}/free-slots** | Alternative to Google Sheets capacity | ℹ️ Optional |
| **POST /calendars/{id}/block-slots** | Alternative to capacity=0 in sheets | ℹ️ Optional |

### Your Current Implementation Uses:
1. ✅ **GET /appointments** - To count existing bookings
2. ✅ **POST /appointments** - To create new bookings

### You Could Enhance With:
- **GET /calendars/{id}/free-slots** - Instead of calculating availability manually
- **POST /block-slots** - Instead of Google Sheets capacity=0 for closures
- **Calendar Resources API** - Track room/equipment availability

---

## 📋 Quick Reference Card

**Base URLs**:
```
v1: https://rest.gohighlevel.com/v1/
v2: https://services.gohighlevel.com/
```

**Authentication**:
```
Authorization: Bearer YOUR_API_KEY
```

**Key Endpoints**:
```
GET    /calendars                    → List calendars
GET    /calendars/{id}               → Get calendar details
GET    /appointments                 → List appointments (with filters)
POST   /appointments                 → Create appointment
PUT    /appointments/{id}            → Update appointment
DELETE /appointments/{id}            → Delete appointment
GET    /calendars/{id}/free-slots    → Get available slots
POST   /calendars/{id}/block-slots   → Block time period
```

**Rate Limit**: 100 requests / 10 seconds per location

**Date Format**: ISO 8601 (`2025-11-07T13:00:00-05:00`)

---

## ✅ Checklist: APIs for Your Project

```
Phase 1 (Current):
✅ GET /appointments - Check capacity
✅ POST /appointments - Book appointments

Phase 2 (Future Enhancements):
□ GET /calendars/{id} - Validate calendar settings
□ PUT /appointments/{id} - Allow rescheduling
□ DELETE /appointments/{id} - Allow cancellations
□ GET /calendars/{id}/free-slots - Native slot availability
□ POST /calendars/{id}/block-slots - Block time periods
□ GET /calendars/resources - Room/equipment tracking

Phase 3 (Advanced):
□ Calendar Groups - Team-based calendars
□ Appointment Notes - Document visit details
□ Calendar Events - Unified event management
```

---

**Last Updated**: November 2025
**API Version**: v2 (recommended)

**For the most up-to-date information, always refer to**:
- https://marketplace.gohighlevel.com/docs/
- https://developers.gohighlevel.com/

---

**You now have a complete reference of all GHL Calendar APIs! 🎉**
