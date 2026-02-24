# Dynamic Hourwise Capacity Booking System - Complete Implementation Guide

## Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [GHL Setup (Step-by-Step)](#ghl-setup-step-by-step)
4. [Google Sheets Setup (Step-by-Step)](#google-sheets-setup-step-by-step)
5. [n8n Workflow Configuration](#n8n-workflow-configuration)
6. [Testing & Validation](#testing--validation)
7. [Troubleshooting](#troubleshooting)

---

## Overview

This system implements dynamic, per-hour multiple slot booking using:
- **Google Sheets** as the source of truth for capacity
- **GHL (GoHighLevel)** as the booking system
- **n8n** as the integration middleware

### Architecture Flow
```
User Request → n8n Webhook → Check Google Sheets Capacity →
Query GHL Existing Bookings → Calculate Availability →
Create GHL Appointment (if available) → Update Google Sheets → Response
```

---

## Prerequisites

### Required Accounts & Access
- [ ] GoHighLevel account with API access
- [ ] Google account for Sheets
- [ ] n8n instance (cloud or self-hosted)

### Information You'll Need to Collect
- [ ] GHL Location ID
- [ ] GHL Calendar ID
- [ ] GHL API Key
- [ ] Google Sheets credentials
- [ ] Timezone for your clinic (e.g., "America/New_York")

---

## GHL Setup (Step-by-Step)

### Step 1: Access Your GHL Account

1. Log into GoHighLevel: https://app.gohighlevel.com
2. Select your **Sub-Account** (your clinic)
3. Note your **Location ID**:
   - Go to Settings → Business Profile
   - Copy the Location ID (looks like: `xXxXxXxXxXxXxXxXxXxX`)

### Step 2: Create Calendar

1. **Navigate to Calendars**:
   - Left sidebar → Calendars → Calendars

2. **Create New Calendar**:
   - Click "+ New Calendar"
   - Choose calendar type: **"Service Calendar"** (recommended for clinics)

3. **Configure Calendar Settings**:
   ```
   Calendar Name: Clinic Appointments
   Description: Dynamic capacity booking calendar

   AVAILABILITY SETTINGS:
   - Default Slot Duration: 60 minutes
   - Slot Interval: 15 minutes (users can book at :00, :15, :30, :45)
   - Minimum Scheduling Notice: 30 minutes
   - Date Range: 90 days in advance

   CAPACITY SETTINGS:
   - Staff Members/Resources: 1 (we'll manage capacity via n8n)
   - Allow Multiple Bookings: No (n8n will handle this)

   BUFFER SETTINGS:
   - Buffer Before: 0 minutes (managed in Google Sheets)
   - Buffer After: 0 minutes (managed in Google Sheets)

   OFFICE HOURS:
   Monday-Friday: 9:00 AM - 6:00 PM
   Saturday: 9:00 AM - 2:00 PM
   Sunday: Closed
   ```

4. **Save Calendar**:
   - Click "Save"
   - Copy the **Calendar ID** from the URL (looks like: `yYyYyYyYyYyYyYyYyYyY`)

### Step 3: Configure Calendar Settings

1. **Booking Form Fields**:
   - Go to your calendar → Settings → Booking Form
   - Enable these fields:
     - First Name (required)
     - Last Name (required)
     - Email (required)
     - Phone (required)
     - Notes (optional)
     - Service Type (custom dropdown - optional)

2. **Confirmation Settings**:
   - Settings → Confirmations
   - Enable: Email confirmation
   - Enable: SMS confirmation (optional)
   - Customize confirmation templates as needed

3. **Calendar Appearance** (if exposing to public):
   - Settings → Appearance
   - Customize colors to match your brand
   - **Important**: If using n8n-only booking, you can hide this calendar from public

### Step 4: Get GHL API Key

1. **Navigate to API Settings**:
   - Go to Settings → API
   - Or visit: https://app.gohighlevel.com/settings/api-keys

2. **Create API Key**:
   - Click "+ Create API Key"
   - Name: "n8n Booking Integration"
   - **Scopes Required**:
     - ✅ `calendars.readonly` - Read calendar configuration
     - ✅ `calendars.write` - Create/update appointments
     - ✅ `calendars/events.readonly` - Read existing appointments
     - ✅ `calendars/events.write` - Create appointments
     - ✅ `contacts.readonly` - Read contact details
     - ✅ `contacts.write` - Create contacts (if needed)

3. **Copy API Key**:
   - **IMPORTANT**: Copy and save this immediately
   - Store securely (you won't see it again)
   - Format: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Step 5: Create Test Contact (Optional)

1. **Navigate to Contacts**:
   - Left sidebar → Contacts

2. **Add Test Contact**:
   ```
   First Name: Test
   Last Name: Patient
   Email: test@example.com
   Phone: +1234567890
   ```

3. **Copy Contact ID**:
   - Open the contact
   - Copy ID from URL (looks like: `zZzZzZzZzZzZzZzZzZzZ`)

### Step 6: Test Manual Booking (Validation)

1. **Create Test Appointment**:
   - Go to Calendars → Your Calendar
   - Click "+ Add Appointment"
   - Fill in details:
     - Contact: Select your test contact
     - Date: Tomorrow
     - Time: 2:00 PM
     - Duration: 60 minutes
   - Click "Create"

2. **Verify**:
   - Check that appointment appears on calendar
   - Note the Appointment ID
   - This confirms your calendar is working

### GHL Setup Checklist

Copy these values for n8n configuration:

```
✅ Location ID: _______________________
✅ Calendar ID: _______________________
✅ API Key: _______________________
✅ Test Contact ID: _______________________
✅ Timezone: _______________________
```

---

## Google Sheets Setup (Step-by-Step)

### Step 1: Create New Google Sheet

1. **Go to Google Sheets**: https://sheets.google.com
2. **Create New Spreadsheet**:
   - Click "+ Blank"
   - Rename to: "Clinic Capacity Booking System"

### Step 2: Create "Capacity" Sheet

1. **Sheet 1 → Rename to "Capacity"**

2. **Set Up Headers (Row 1)**:
   ```
   A1: date
   B1: hour
   C1: slotCapacity
   D1: durationMinutes
   E1: bufferMinutes
   F1: serviceCode
   G1: notes
   ```

3. **Format Columns**:
   - Select Column A (date):
     - Format → Number → Date (YYYY-MM-DD)
   - Select Column B (hour):
     - Format → Number → Number (0 decimals)
   - Select Columns C-E:
     - Format → Number → Number (0 decimals)

4. **Add Sample Data (Rows 2-10)**:
   ```
   A2: 2025-11-07    B2: 9     C2: 2    D2: 60    E2: 0    F2: hygiene    G2: Morning hygiene slots
   A3: 2025-11-07    B3: 10    C3: 2    D3: 60    E3: 0    F3: hygiene    G3: Morning hygiene slots
   A4: 2025-11-07    B4: 11    C4: 2    D4: 60    E4: 0    F4: hygiene    G4: Morning hygiene slots
   A5: 2025-11-07    B5: 13    C5: 4    D5: 60    E5: 0    F5: hygiene    G5: Afternoon - high capacity
   A6: 2025-11-07    B6: 14    C6: 4    D6: 60    E6: 0    F6: hygiene    G6: Afternoon - high capacity
   A7: 2025-11-07    B7: 15    C7: 1    D7: 60    E7: 15   F7: consult    G7: Consultation only
   A8: 2025-11-07    B8: 16    C8: 1    D8: 60    E8: 15   F8: consult    G8: Consultation only
   A9: 2025-11-07    B9: 17    C9: 0    D9: 60    E9: 0    F9: closed     G9: Closed hour
   ```

5. **Data Validation** (Optional but recommended):
   - Select Column B (hour):
     - Data → Data validation
     - Criteria: Number between 0 and 23
   - Select Column C (slotCapacity):
     - Data → Data validation
     - Criteria: Number greater than or equal to 0

### Step 3: Create "Bookings" Sheet

1. **Add New Sheet**:
   - Click "+" at bottom
   - Rename to "Bookings"

2. **Set Up Headers (Row 1)**:
   ```
   A1: timestamp
   B1: date
   C1: startISO
   D1: endISO
   E1: hour
   F1: serviceCode
   G1: contactId
   H1: appointmentId
   I1: status
   J1: source
   K1: notes
   ```

3. **Format Columns**:
   - Column A (timestamp):
     - Format → Number → Date time
   - Column B (date):
     - Format → Number → Date (YYYY-MM-DD)
   - Column C-D (ISO times):
     - Format → Plain text

4. **Add Header Row Formatting**:
   - Select Row 1
   - Bold text
   - Background color: Light blue
   - Freeze row: View → Freeze → 1 row

### Step 4: Create "Config" Sheet (Optional)

1. **Add New Sheet**:
   - Click "+"
   - Rename to "Config"

2. **Set Up Configuration Parameters**:
   ```
   A1: Parameter          B1: Value
   A2: timezone           B2: America/New_York
   A3: locationId         B3: [Your GHL Location ID]
   A4: calendarId         B4: [Your GHL Calendar ID]
   A5: defaultDuration    B5: 60
   A6: defaultBuffer      B6: 0
   ```

### Step 5: Set Up Sheet Permissions

1. **Share Sheet**:
   - Click "Share" button (top right)
   - Add your n8n service account email OR
   - Get shareable link: "Anyone with the link can edit"

2. **Copy Sheet ID**:
   - From URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
   - Copy the `SHEET_ID_HERE` portion
   - Save for n8n configuration

### Step 6: Create Sample Capacity for Testing

Add capacity for **next 7 days**:

1. **In Capacity Sheet**:
   - Fill dates for next week (today + 7 days)
   - Hours: 9-17 (9 AM to 5 PM)
   - Capacity: Vary between 1-4
   - Service codes: hygiene, consult, cleaning

**Example Template** (copy and adjust dates):
```
2025-11-07, 9, 2, 60, 0, hygiene, Morning slots
2025-11-07, 10, 2, 60, 0, hygiene, Morning slots
2025-11-07, 11, 2, 60, 0, hygiene, Morning slots
2025-11-07, 13, 4, 60, 0, hygiene, High capacity afternoon
2025-11-07, 14, 4, 60, 0, hygiene, High capacity afternoon
2025-11-07, 15, 2, 60, 0, hygiene, Standard afternoon
2025-11-07, 16, 1, 60, 15, consult, Consultation slots
```

### Google Sheets Setup Checklist

```
✅ Sheet created and named: _______________________
✅ "Capacity" sheet with headers and sample data: ✓
✅ "Bookings" sheet with headers: ✓
✅ "Config" sheet (optional): ✓
✅ Sheet ID copied: _______________________
✅ Permissions set (shareable or service account): ✓
✅ Sample capacity data for next 7 days: ✓
```

---

## n8n Workflow Configuration

### Step 1: Set Up n8n Instance

1. **Access n8n**:
   - Cloud: https://app.n8n.cloud
   - Self-hosted: Your instance URL

2. **Create New Workflow**:
   - Click "New workflow"
   - Name: "GHL Dynamic Capacity Booking"

### Step 2: Configure Credentials

#### GHL API Credential

1. **Add Credential**:
   - Go to Credentials (left sidebar)
   - Click "+ Add Credential"
   - Search for "HTTP Request" or "GoHighLevel"

2. **If using HTTP Request (Generic)**:
   ```
   Name: GHL API
   Authentication: Header Auth

   Header Name: Authorization
   Header Value: Bearer [YOUR_GHL_API_KEY]
   ```

3. **Base URL for GHL API**:
   - V1: `https://rest.gohighlevel.com/v1/`
   - V2: `https://services.gohighlevel.com/`

#### Google Sheets Credential

1. **Add Credential**:
   - Credentials → "+ Add Credential"
   - Search for "Google Sheets API"

2. **Choose Authentication Method**:
   - **Option A: OAuth2** (easier for personal use)
     - Click "Connect my account"
     - Authorize with your Google account

   - **Option B: Service Account** (better for production)
     - Create service account in Google Cloud Console
     - Download JSON key
     - Paste into n8n credential
     - Share sheet with service account email

### Step 3: Build Workflow - Phase 1 (Capacity-Gated Booking)

#### Node 1: Webhook (Trigger)

```json
{
  "node": "Webhook",
  "settings": {
    "path": "booking",
    "method": "POST",
    "responseMode": "lastNode",
    "authentication": "headerAuth"
  },
  "expected_payload": {
    "contactId": "string (required)",
    "firstName": "string (optional - create contact if contactId missing)",
    "lastName": "string (optional)",
    "email": "string (optional)",
    "phone": "string (optional)",
    "date": "string (YYYY-MM-DD, required)",
    "preferredStartISO": "string (ISO 8601, optional)",
    "hour": "number (0-23, optional if preferredStartISO provided)",
    "durationMinutes": "number (optional, defaults to sheet)",
    "serviceCode": "string (required)"
  }
}
```

**Webhook URL will be**: `https://your-n8n-instance/webhook/booking`

#### Node 2: Validate Input

**Function Node**: "Validate Request"

```javascript
// Validate required fields
const item = $input.item.json;
const errors = [];

// Required fields
if (!item.date) errors.push("date is required (YYYY-MM-DD format)");
if (!item.serviceCode) errors.push("serviceCode is required");
if (!item.contactId && (!item.firstName || !item.lastName || !item.email)) {
  errors.push("Either contactId OR (firstName, lastName, email) required");
}

// Date format validation
if (item.date && !/^\d{4}-\d{2}-\d{2}$/.test(item.date)) {
  errors.push("date must be in YYYY-MM-DD format");
}

// Hour validation (if provided)
if (item.hour !== undefined && (item.hour < 0 || item.hour > 23)) {
  errors.push("hour must be between 0 and 23");
}

// Duration validation (if provided)
if (item.durationMinutes && (item.durationMinutes < 15 || item.durationMinutes > 240)) {
  errors.push("durationMinutes must be between 15 and 240");
}

if (errors.length > 0) {
  return {
    json: {
      status: "error",
      errors: errors,
      message: "Validation failed"
    }
  };
}

// Extract hour from preferredStartISO if provided
let hour = item.hour;
if (item.preferredStartISO && !hour) {
  const dt = new Date(item.preferredStartISO);
  hour = dt.getHours();
}

return {
  json: {
    ...item,
    hour: hour,
    status: "validated"
  }
};
```

#### Node 3: Read Capacity from Google Sheets

**Google Sheets Node**: "Read Capacity"

```json
{
  "operation": "read",
  "sheetName": "Capacity",
  "range": "A:G",
  "options": {
    "headerRow": 1
  }
}
```

#### Node 4: Filter Relevant Capacity

**Filter Node** or **Code Node**: "Find Matching Capacity"

```javascript
const items = $input.all();
const requestDate = $('Webhook').item.json.date;
const requestServiceCode = $('Webhook').item.json.serviceCode;
const requestHour = $('Validate Request').item.json.hour;

// Filter capacity records for matching date and service
const matchingCapacity = items.filter(item => {
  const capacityData = item.json;
  return capacityData.date === requestDate &&
         capacityData.serviceCode === requestServiceCode &&
         (requestHour === undefined || capacityData.hour === requestHour);
});

if (matchingCapacity.length === 0) {
  return [{
    json: {
      status: "error",
      message: `No capacity configured for date ${requestDate}, service ${requestServiceCode}`,
      alternatives: []
    }
  }];
}

// If no specific hour requested, use first available hour
let targetCapacity = matchingCapacity[0].json;
if (requestHour !== undefined) {
  targetCapacity = matchingCapacity.find(c => c.json.hour === requestHour)?.json || targetCapacity;
}

return [{
  json: {
    status: "capacity_found",
    targetDate: requestDate,
    targetHour: targetCapacity.hour,
    slotCapacity: targetCapacity.slotCapacity,
    durationMinutes: targetCapacity.durationMinutes,
    bufferMinutes: targetCapacity.bufferMinutes || 0,
    serviceCode: targetCapacity.serviceCode,
    allMatchingHours: matchingCapacity.map(c => ({
      hour: c.json.hour,
      capacity: c.json.slotCapacity
    }))
  }
};
```

#### Node 5: Calculate Time Window

**Function Node**: "Calculate Start & End Times"

```javascript
const webhookData = $('Webhook').item.json;
const capacityData = $input.item.json;

// Determine start time
let startISO;
if (webhookData.preferredStartISO) {
  startISO = webhookData.preferredStartISO;
} else {
  // Construct ISO from date + hour
  const date = webhookData.date;
  const hour = capacityData.targetHour;
  startISO = `${date}T${String(hour).padStart(2, '0')}:00:00-05:00`; // Adjust timezone offset
}

// Calculate end time
const startDate = new Date(startISO);
const durationMs = capacityData.durationMinutes * 60 * 1000;
const endDate = new Date(startDate.getTime() + durationMs);
const endISO = endDate.toISOString();

// Calculate buffer end (for checking conflicts)
const bufferMs = capacityData.bufferMinutes * 60 * 1000;
const bufferEndDate = new Date(endDate.getTime() + bufferMs);
const bufferEndISO = bufferEndDate.toISOString();

return {
  json: {
    ...capacityData,
    startISO: startISO,
    endISO: endISO,
    bufferEndISO: bufferEndISO,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString()
  }
};
```

#### Node 6: Fetch Existing GHL Appointments

**HTTP Request Node**: "Get GHL Appointments"

```json
{
  "method": "GET",
  "url": "https://rest.gohighlevel.com/v1/appointments/",
  "authentication": "predefinedCredentialType",
  "nodeCredentialType": "ghlApi",
  "qs": {
    "calendarId": "={{$('Config').item.json.calendarId}}",
    "startDate": "={{$('Calculate Start & End Times').item.json.startISO}}",
    "endDate": "={{$('Calculate Start & End Times').item.json.bufferEndISO}}",
    "locationId": "={{$('Config').item.json.locationId}}"
  },
  "options": {
    "response": {
      "response": {
        "neverError": true
      }
    }
  }
}
```

#### Node 7: Count Current Bookings

**Function Node**: "Count Overlapping Appointments"

```javascript
const existingAppointments = $input.item.json.appointments || [];
const targetStart = new Date($('Calculate Start & End Times').item.json.startISO);
const targetEnd = new Date($('Calculate Start & End Times').item.json.endISO);
const targetBufferEnd = new Date($('Calculate Start & End Times').item.json.bufferEndISO);

// Count overlaps (including buffer time)
const overlappingCount = existingAppointments.filter(apt => {
  const aptStart = new Date(apt.startTime);
  const aptEnd = new Date(apt.endTime);

  // Check if appointments overlap (including buffer)
  return (aptStart < targetBufferEnd && aptEnd > targetStart);
}).length;

const slotCapacity = $('Calculate Start & End Times').item.json.slotCapacity;
const availableSlots = Math.max(0, slotCapacity - overlappingCount);

return {
  json: {
    currentBookings: overlappingCount,
    slotCapacity: slotCapacity,
    availableSlots: availableSlots,
    canBook: availableSlots > 0,
    existingAppointments: existingAppointments.length
  }
};
```

#### Node 8: IF Node - Check Availability

**IF Node**: "Has Available Slot?"

```json
{
  "conditions": {
    "boolean": [
      {
        "value1": "={{$json.canBook}}",
        "value2": true
      }
    ]
  }
}
```

#### Node 9a: Create GHL Appointment (TRUE branch)

**HTTP Request Node**: "Create Appointment"

```json
{
  "method": "POST",
  "url": "https://rest.gohighlevel.com/v1/appointments/",
  "authentication": "predefinedCredentialType",
  "nodeCredentialType": "ghlApi",
  "body": {
    "calendarId": "={{$('Config').item.json.calendarId}}",
    "locationId": "={{$('Config').item.json.locationId}}",
    "contactId": "={{$('Webhook').item.json.contactId}}",
    "startTime": "={{$('Calculate Start & End Times').item.json.startISO}}",
    "endTime": "={{$('Calculate Start & End Times').item.json.endISO}}",
    "title": "{{$('Webhook').item.json.serviceCode}} Appointment",
    "appointmentStatus": "confirmed",
    "notes": "Booked via n8n dynamic capacity system"
  },
  "options": {
    "response": {
      "response": {
        "neverError": true
      }
    }
  }
}
```

#### Node 10a: Log Booking to Google Sheets

**Google Sheets Node**: "Append to Bookings"

```json
{
  "operation": "append",
  "sheetName": "Bookings",
  "range": "A:K",
  "options": {
    "valueInputMode": "USER_ENTERED"
  },
  "dataMode": "autoMapInputData",
  "values": {
    "timestamp": "={{$now.toISO()}}",
    "date": "={{$('Webhook').item.json.date}}",
    "startISO": "={{$('Calculate Start & End Times').item.json.startISO}}",
    "endISO": "={{$('Calculate Start & End Times').item.json.endISO}}",
    "hour": "={{$('Calculate Start & End Times').item.json.targetHour}}",
    "serviceCode": "={{$('Webhook').item.json.serviceCode}}",
    "contactId": "={{$('Webhook').item.json.contactId}}",
    "appointmentId": "={{$('Create Appointment').item.json.appointment.id}}",
    "status": "confirmed",
    "source": "n8n_api",
    "notes": "Success"
  }
}
```

#### Node 11a: Success Response

**Respond to Webhook Node**: "Success Response"

```json
{
  "status": "success",
  "message": "Appointment booked successfully",
  "appointment": {
    "id": "={{$('Create Appointment').item.json.appointment.id}}",
    "startTime": "={{$('Calculate Start & End Times').item.json.startISO}}",
    "endTime": "={{$('Calculate Start & End Times').item.json.endISO}}",
    "duration": "={{$('Calculate Start & End Times').item.json.durationMinutes}}",
    "serviceCode": "={{$('Webhook').item.json.serviceCode}}"
  }
}
```

#### Node 9b: Generate Alternatives (FALSE branch)

**Function Node**: "Find Alternative Slots"

```javascript
const allMatchingHours = $('Find Matching Capacity').item.json.allMatchingHours || [];
const requestedDate = $('Webhook').item.json.date;
const serviceCode = $('Webhook').item.json.serviceCode;

// Generate alternative time slots
const alternatives = allMatchingHours
  .filter(h => h.capacity > 0)
  .slice(0, 3) // Top 3 alternatives
  .map(h => {
    const startISO = `${requestedDate}T${String(h.hour).padStart(2, '0')}:00:00-05:00`;
    return {
      hour: h.hour,
      startISO: startISO,
      capacity: h.capacity,
      displayTime: `${h.hour}:00`
    };
  });

return {
  json: {
    status: "no_availability",
    message: "Requested time slot is fully booked",
    requestedTime: $('Calculate Start & End Times').item.json.startISO,
    currentBookings: $('Count Overlapping Appointments').item.json.currentBookings,
    slotCapacity: $('Count Overlapping Appointments').item.json.slotCapacity,
    alternatives: alternatives
  }
};
```

#### Node 10b: Failure Response

**Respond to Webhook Node**: "No Availability Response"

```json
{
  "status": "no_availability",
  "message": "={{$json.message}}",
  "details": {
    "requestedTime": "={{$json.requestedTime}}",
    "currentBookings": "={{$json.currentBookings}}",
    "slotCapacity": "={{$json.slotCapacity}}"
  },
  "alternatives": "={{$json.alternatives}}"
}
```

### Step 4: Add Error Handling

**Error Trigger Node**: Connect to all nodes

```javascript
// Error Handler Function
const errorNode = $input.item.json;

return {
  json: {
    status: "error",
    message: errorNode.error?.message || "An unexpected error occurred",
    details: {
      node: errorNode.node,
      timestamp: new Date().toISOString()
    }
  }
};
```

### Step 5: Test Workflow

1. **Activate Workflow**:
   - Click "Active" toggle (top right)

2. **Get Webhook URL**:
   - Click on Webhook node
   - Copy "Test URL" or "Production URL"

3. **Test with Postman/curl**:

```bash
curl -X POST https://your-n8n-instance/webhook/booking \
  -H "Content-Type: application/json" \
  -d '{
    "contactId": "YOUR_TEST_CONTACT_ID",
    "date": "2025-11-07",
    "hour": 13,
    "serviceCode": "hygiene"
  }'
```

**Expected Response** (if slot available):
```json
{
  "status": "success",
  "message": "Appointment booked successfully",
  "appointment": {
    "id": "apt_123456",
    "startTime": "2025-11-07T13:00:00-05:00",
    "endTime": "2025-11-07T14:00:00-05:00",
    "duration": 60,
    "serviceCode": "hygiene"
  }
}
```

**Expected Response** (if fully booked):
```json
{
  "status": "no_availability",
  "message": "Requested time slot is fully booked",
  "details": {
    "requestedTime": "2025-11-07T13:00:00-05:00",
    "currentBookings": 2,
    "slotCapacity": 2
  },
  "alternatives": [
    {
      "hour": 14,
      "startISO": "2025-11-07T14:00:00-05:00",
      "capacity": 4,
      "displayTime": "14:00"
    }
  ]
}
```

### Workflow Visual Layout

```
[Webhook]
    ↓
[Validate Input]
    ↓
[Read Capacity Sheet]
    ↓
[Find Matching Capacity]
    ↓
[Calculate Start & End Times]
    ↓
[Get GHL Appointments]
    ↓
[Count Overlapping]
    ↓
[IF: Has Available Slot?]
    ├─ TRUE → [Create Appointment] → [Log to Sheets] → [Success Response]
    └─ FALSE → [Find Alternatives] → [No Availability Response]
```

---

## Testing & Validation

### Test Suite - Phase 1

#### Test 1: Basic Booking (Happy Path)

**Setup**:
- Capacity sheet: 2025-11-07, hour 13, capacity=2, service=hygiene
- No existing bookings

**Request**:
```json
{
  "contactId": "contact_123",
  "date": "2025-11-07",
  "hour": 13,
  "serviceCode": "hygiene"
}
```

**Expected**:
- ✅ Status: success
- ✅ GHL appointment created
- ✅ Booking logged to Google Sheets
- ✅ Response includes appointment ID and times

#### Test 2: At Capacity (No Availability)

**Setup**:
- Capacity sheet: hour 13, capacity=2
- Existing: 2 appointments already booked

**Request**:
```json
{
  "contactId": "contact_456",
  "date": "2025-11-07",
  "hour": 13,
  "serviceCode": "hygiene"
}
```

**Expected**:
- ✅ Status: no_availability
- ✅ Alternatives provided (hour 14, 15, etc.)
- ✅ No GHL appointment created
- ✅ Current bookings count = 2

#### Test 3: Multi-Hour Capacity

**Setup**:
- Hour 14: capacity=4
- Existing: 2 appointments

**Requests**: Book 3 appointments rapidly

**Expected**:
- ✅ First 2 succeed (total 4)
- ✅ Third fails with no_availability
- ✅ No race conditions

#### Test 4: Buffer Time Enforcement

**Setup**:
- Hour 15: capacity=1, buffer=15 minutes
- Existing: 1 appointment 15:00-16:00

**Request**: Book for 15:50-16:50

**Expected**:
- ✅ Rejected (conflicts with buffer ending at 16:15)
- ✅ Alternatives suggested

#### Test 5: Different Service Codes

**Setup**:
- Hour 16: hygiene capacity=2, consult capacity=1

**Request**: Book consult

**Expected**:
- ✅ Matches correct capacity row
- ✅ Doesn't interfere with hygiene bookings

#### Test 6: Invalid Input

**Request**:
```json
{
  "date": "invalid-date",
  "serviceCode": "hygiene"
}
```

**Expected**:
- ✅ Status: error
- ✅ Validation error message
- ✅ No API calls made

#### Test 7: No Capacity Configured

**Request**: Date with no capacity rows

**Expected**:
- ✅ Status: error
- ✅ Message: "No capacity configured"
- ✅ No booking attempted

### Manual Testing Checklist

```
Phase 1 - Core Booking Logic:
□ Webhook receives and validates input
□ Google Sheets capacity data reads correctly
□ GHL existing appointments fetch works
□ Overlap counting is accurate
□ Appointments create in GHL successfully
□ Bookings log to Google Sheets
□ Response format is correct
□ Error handling catches all edge cases

Capacity Rules:
□ Respects slotCapacity limits
□ Handles buffer minutes correctly
□ Matches service codes accurately
□ Filters by date correctly
□ Hour matching works (0-23)

Edge Cases:
□ Race conditions (2 requests same time)
□ Missing contactId (create new contact flow)
□ Invalid API credentials (error handling)
□ Sheet temporarily unavailable (retry logic)
□ GHL API rate limits (429 errors)
```

---

## Troubleshooting

### Common Issues

#### Issue 1: "Unauthorized" Error from GHL

**Symptoms**: HTTP 401 from GHL API

**Causes**:
- Invalid API key
- API key missing required scopes

**Solutions**:
1. Verify API key in GHL Settings → API
2. Check scopes include `calendars.write` and `calendars/events.write`
3. Regenerate API key if needed
4. Update n8n credential

#### Issue 2: "Calendar not found"

**Symptoms**: HTTP 404 from GHL calendar endpoint

**Causes**:
- Wrong calendarId
- Calendar deleted or disabled

**Solutions**:
1. Go to GHL Calendars → Copy correct ID
2. Update n8n Config or workflow parameters
3. Verify calendar status in GHL

#### Issue 3: Google Sheets Permission Denied

**Symptoms**: n8n cannot read/write to sheet

**Causes**:
- Sheet not shared with service account
- OAuth token expired

**Solutions**:
1. Share sheet with service account email
2. Re-authenticate OAuth in n8n credentials
3. Check sheet ID is correct

#### Issue 4: Wrong Timezone

**Symptoms**: Bookings appear at wrong times in GHL

**Causes**:
- ISO strings not including timezone offset
- Timezone mismatch between systems

**Solutions**:
1. Add timezone to Config sheet
2. Use consistent timezone offset in ISO strings
3. Example: `-05:00` for EST, `-08:00` for PST
4. Update "Calculate Start & End Times" node

#### Issue 5: Alternatives Not Showing

**Symptoms**: When fully booked, no alternatives provided

**Causes**:
- No other hours with capacity > 0
- Logic error in "Find Alternatives" node

**Solutions**:
1. Check Capacity sheet has other available hours
2. Debug "Find Alternative Slots" function node
3. Ensure filter logic is correct

#### Issue 6: Double Bookings (Race Condition)

**Symptoms**: More bookings than capacity allows

**Causes**:
- Two requests processed simultaneously
- GHL appointment not yet visible when counting

**Solutions**:
1. Add retry logic after booking attempt
2. Re-check availability after failed booking
3. Implement idempotency with unique request IDs
4. Add small delay (100ms) before responding

### Debug Mode

**Enable in n8n**:
1. Workflow Settings → "Save Manual Executions"
2. Click "Execute Workflow" for each test
3. View execution logs for each node
4. Inspect JSON output at each step

**Key Debug Points**:
- After "Validate Input" → Check extracted hour
- After "Find Matching Capacity" → Verify capacity values
- After "Get GHL Appointments" → Count existing bookings
- After "Count Overlapping" → Check availableSlots calculation

### Logging Recommendations

Add these logs to Function nodes:

```javascript
// At start of critical nodes
console.log(`[${new Date().toISOString()}] Node: ${$node.name} - Starting`);
console.log('Input:', JSON.stringify($input.item.json, null, 2));

// After calculations
console.log('Result:', result);

// Before returning
console.log('Returning:', JSON.stringify(output, null, 2));
```

---

## Next Steps - Phase 2 (Chat Integration)

Once Phase 1 is stable, add GHL Chat widget:

### Phase 2 Overview

1. **GHL Workflow for Chat**:
   - Trigger: New chat message
   - Extract: Date, time preferences, service type
   - Call: n8n webhook (this workflow)
   - Respond: Confirmation or alternatives

2. **n8n Enhancements**:
   - Add NLP for date parsing ("tomorrow", "next Monday")
   - Format alternatives as human-readable messages
   - Return rich response for GHL to display

3. **User Experience**:
   - User: "I need a hygiene appointment tomorrow afternoon"
   - Bot: "I have availability at 2 PM or 3 PM. Which works better?"
   - User: "2 PM"
   - Bot: "Great! Booking your appointment for [date] at 2 PM."

**Documentation for Phase 2 will be created after Phase 1 is validated.**

---

## Configuration Summary

### Required Values

Copy and complete:

```
=== GHL Configuration ===
Location ID: _______________________
Calendar ID: _______________________
API Key: _______________________
Test Contact ID: _______________________

=== Google Sheets ===
Sheet ID: _______________________
Sheet URL: _______________________
Service Account Email (if used): _______________________

=== n8n ===
Webhook URL: _______________________
Workflow ID: _______________________

=== Settings ===
Timezone: _______________________
Default Duration: _______ minutes
Default Buffer: _______ minutes
Slot Interval: _______ minutes
```

---

## Support & Maintenance

### Regular Maintenance Tasks

**Daily**:
- Monitor Bookings sheet for errors
- Check n8n execution logs for failures

**Weekly**:
- Update Capacity sheet for next 2 weeks
- Review and adjust capacity based on demand

**Monthly**:
- Audit GHL appointments vs Bookings sheet for discrepancies
- Review API usage and rate limits
- Update service codes if clinic offerings change

### Capacity Planning Tips

1. **Peak Hours**: Increase capacity during high-demand times
2. **Low Demand**: Reduce capacity but keep some availability
3. **Special Events**: Block out hours with capacity=0
4. **Buffer Time**: Increase during complex procedures
5. **Overbooking**: Never set capacity > actual chairs/staff

---

## Conclusion

You now have a complete implementation plan for:

✅ **GHL Setup**: Calendar, API, test contacts
✅ **Google Sheets**: Capacity and Bookings tracking
✅ **n8n Workflow**: Capacity-gated booking logic
✅ **Testing**: Comprehensive test cases
✅ **Troubleshooting**: Common issues and solutions

### Implementation Timeline

- **Day 1**: GHL and Google Sheets setup (2-3 hours)
- **Day 2**: n8n workflow build and credential config (3-4 hours)
- **Day 3**: Testing and debugging (2-3 hours)
- **Day 4**: Load Capacity sheet with real schedules (1-2 hours)
- **Day 5**: Production validation and monitoring setup (2 hours)

**Total**: ~10-14 hours for Phase 1 implementation

### Success Criteria

- [ ] Can book appointments via webhook
- [ ] Respects capacity limits from Google Sheets
- [ ] Returns alternatives when fully booked
- [ ] Handles errors gracefully
- [ ] Logs all bookings to Sheets
- [ ] No double bookings under normal conditions

---

**Ready to implement? Start with GHL Setup (Section 3) and follow each step carefully. Good luck! 🚀**
