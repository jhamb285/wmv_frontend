# GHL Dynamic Capacity Booking - Quick Reference

## 📋 Pre-Implementation Checklist

### Before You Start
- [ ] GHL account with admin access
- [ ] Google account for Sheets
- [ ] n8n instance (cloud or self-hosted)
- [ ] Text editor for noting IDs/keys
- [ ] Postman or curl for testing

### Time Estimate
- **GHL Setup**: 45 minutes
- **Google Sheets**: 30 minutes
- **n8n Workflow**: 2-3 hours
- **Testing**: 1 hour
- **Total**: 4-5 hours

---

## 🔑 Critical IDs to Collect

Use this template to track your configuration:

```
┌─────────────────────────────────────────────────────┐
│                 GHL CONFIGURATION                    │
├─────────────────────────────────────────────────────┤
│ Location ID:    _________________________________   │
│                                                      │
│ Calendar ID:    _________________________________   │
│                                                      │
│ API Key:        _________________________________   │
│                 _________________________________   │
│                 _________________________________   │
│                                                      │
│ Test Contact:   _________________________________   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│              GOOGLE SHEETS CONFIG                    │
├─────────────────────────────────────────────────────┤
│ Sheet ID:       _________________________________   │
│                                                      │
│ Service Email:  _________________________________   │
│ (if using)      _________________________________   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                   n8n CONFIG                         │
├─────────────────────────────────────────────────────┤
│ Instance URL:   _________________________________   │
│                                                      │
│ Webhook URL:    _________________________________   │
│                 _________________________________   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                  CLINIC SETTINGS                     │
├─────────────────────────────────────────────────────┤
│ Timezone:       _________________________________   │
│                                                      │
│ Default Slot:   _______ minutes                     │
│                                                      │
│ Buffer Time:    _______ minutes                     │
│                                                      │
│ Slot Interval:  _______ minutes (15 or 30)          │
└─────────────────────────────────────────────────────┘
```

---

## 📊 Google Sheets Templates

### Capacity Sheet Structure

| date       | hour | slotCapacity | durationMinutes | bufferMinutes | serviceCode | notes                    |
|------------|------|--------------|-----------------|---------------|-------------|--------------------------|
| 2025-11-07 | 9    | 2            | 60              | 0             | hygiene     | Morning slots            |
| 2025-11-07 | 10   | 2            | 60              | 0             | hygiene     | Morning slots            |
| 2025-11-07 | 13   | 4            | 60              | 0             | hygiene     | High capacity afternoon  |
| 2025-11-07 | 15   | 1            | 60              | 15            | consult     | Consultation only        |
| 2025-11-07 | 17   | 0            | 60              | 0             | closed      | Closed hour              |

### Bookings Sheet Structure

| timestamp           | date       | startISO                 | endISO                   | hour | serviceCode | contactId | appointmentId | status    | source  |
|---------------------|------------|--------------------------|--------------------------|------|-------------|-----------|---------------|-----------|---------|
| 2025-11-06T10:30:00 | 2025-11-07 | 2025-11-07T13:00:00-05:00| 2025-11-07T14:00:00-05:00| 13   | hygiene     | cont_123  | apt_456       | confirmed | n8n_api |

---

## 🔌 API Endpoints Reference

### GHL API (v1)

**Base URL**: `https://rest.gohighlevel.com/v1/`

#### Get Appointments
```http
GET /appointments/
Authorization: Bearer YOUR_API_KEY

Query Parameters:
- locationId (required)
- calendarId (required)
- startDate (ISO 8601)
- endDate (ISO 8601)
```

#### Create Appointment
```http
POST /appointments/
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

Body:
{
  "locationId": "string",
  "calendarId": "string",
  "contactId": "string",
  "startTime": "2025-11-07T13:00:00-05:00",
  "endTime": "2025-11-07T14:00:00-05:00",
  "title": "Hygiene Appointment",
  "appointmentStatus": "confirmed"
}
```

#### Response Format
```json
{
  "appointment": {
    "id": "apt_123456",
    "calendarId": "cal_789",
    "contactId": "contact_abc",
    "startTime": "2025-11-07T13:00:00.000Z",
    "endTime": "2025-11-07T14:00:00.000Z",
    "title": "Hygiene Appointment",
    "status": "confirmed"
  }
}
```

---

## 🧪 Test Request Examples

### Test 1: Basic Booking (cURL)

```bash
curl -X POST https://your-n8n.app/webhook/booking \
  -H "Content-Type: application/json" \
  -d '{
    "contactId": "contact_123",
    "date": "2025-11-07",
    "hour": 13,
    "serviceCode": "hygiene"
  }'
```

### Test 2: Booking with Specific Time (cURL)

```bash
curl -X POST https://your-n8n.app/webhook/booking \
  -H "Content-Type: application/json" \
  -d '{
    "contactId": "contact_123",
    "date": "2025-11-07",
    "preferredStartISO": "2025-11-07T14:30:00-05:00",
    "serviceCode": "hygiene"
  }'
```

### Test 3: Create New Contact + Book (cURL)

```bash
curl -X POST https://your-n8n.app/webhook/booking \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "date": "2025-11-07",
    "hour": 15,
    "serviceCode": "consult"
  }'
```

### Postman Collection (JSON)

```json
{
  "info": {
    "name": "GHL Capacity Booking Tests",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Book Appointment - Hour",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"contactId\": \"{{contactId}}\",\n  \"date\": \"2025-11-07\",\n  \"hour\": 13,\n  \"serviceCode\": \"hygiene\"\n}"
        },
        "url": {
          "raw": "{{n8nWebhookUrl}}/booking",
          "host": ["{{n8nWebhookUrl}}"],
          "path": ["booking"]
        }
      }
    },
    {
      "name": "Book Appointment - ISO Time",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"contactId\": \"{{contactId}}\",\n  \"date\": \"2025-11-07\",\n  \"preferredStartISO\": \"2025-11-07T14:30:00-05:00\",\n  \"serviceCode\": \"hygiene\"\n}"
        },
        "url": {
          "raw": "{{n8nWebhookUrl}}/booking",
          "host": ["{{n8nWebhookUrl}}"],
          "path": ["booking"]
        }
      }
    }
  ],
  "variable": [
    {
      "key": "n8nWebhookUrl",
      "value": "https://your-n8n-instance.app/webhook"
    },
    {
      "key": "contactId",
      "value": "contact_123"
    }
  ]
}
```

---

## 📈 Workflow Logic Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    REQUEST RECEIVED                          │
│  {contactId, date, hour, serviceCode}                       │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   VALIDATE INPUT                             │
│  ✓ Required fields present                                  │
│  ✓ Date format correct (YYYY-MM-DD)                         │
│  ✓ Hour in range (0-23)                                     │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│             READ CAPACITY FROM GOOGLE SHEETS                 │
│  Query: date = requested date                               │
│  Filter: serviceCode = requested service                    │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              FIND MATCHING CAPACITY ROW                      │
│  Match: date + hour + serviceCode                           │
│  Extract: slotCapacity, duration, buffer                    │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│           CALCULATE START & END TIMES                        │
│  startISO = date + hour (or use preferredStartISO)          │
│  endISO = startISO + durationMinutes                        │
│  bufferEndISO = endISO + bufferMinutes                      │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│          FETCH EXISTING GHL APPOINTMENTS                     │
│  GET /appointments/                                          │
│  Filter: calendarId, startDate, endDate                     │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│          COUNT OVERLAPPING APPOINTMENTS                      │
│  Count appointments where:                                   │
│    (apt.start < targetBufferEnd) AND                        │
│    (apt.end > targetStart)                                  │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              CHECK AVAILABILITY                              │
│  availableSlots = slotCapacity - currentBookings            │
│  canBook = availableSlots > 0                               │
└───────────────────────────┬─────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                │                       │
         YES (available)          NO (full)
                │                       │
                ▼                       ▼
┌──────────────────────────┐   ┌──────────────────────────┐
│   CREATE APPOINTMENT     │   │   FIND ALTERNATIVES      │
│   POST /appointments/    │   │   Next available hours   │
│   Log to Bookings Sheet  │   │   with capacity > 0      │
└────────────┬─────────────┘   └────────────┬─────────────┘
             │                               │
             ▼                               ▼
┌──────────────────────────┐   ┌──────────────────────────┐
│   SUCCESS RESPONSE       │   │   NO AVAILABILITY        │
│   {status: "success",    │   │   {status: "no_avail",   │
│    appointmentId,        │   │    alternatives: [...]}  │
│    startTime, endTime}   │   │                          │
└──────────────────────────┘   └──────────────────────────┘
```

---

## 🎯 Decision Tree: Capacity Calculation

```
Is requested time slot available?
│
├─ Step 1: Find capacity row for (date, hour, serviceCode)
│  │
│  ├─ Found? → Continue
│  └─ Not found? → ERROR: "No capacity configured"
│
├─ Step 2: Get slotCapacity from row
│  Example: slotCapacity = 2
│
├─ Step 3: Fetch existing GHL appointments for time window
│  Time window = [startISO, bufferEndISO]
│
├─ Step 4: Count overlapping appointments
│  │
│  └─ For each existing appointment:
│      Does it overlap with [startISO, bufferEndISO]?
│      │
│      ├─ Overlap logic:
│      │  (apt.start < targetBufferEnd) AND (apt.end > targetStart)
│      │
│      └─ Count overlaps → currentBookings
│
├─ Step 5: Calculate availability
│  availableSlots = slotCapacity - currentBookings
│  │
│  ├─ availableSlots > 0?
│  │  │
│  │  ├─ YES → Book appointment
│  │  │  └─ Create in GHL
│  │  │     └─ Log to Bookings sheet
│  │  │        └─ Return success
│  │  │
│  │  └─ NO → Find alternatives
│  │     └─ Scan other hours for same date
│  │        └─ Return top 3 with capacity > 0
│  │
│  └─ Return response to user
```

---

## ⚠️ Common Pitfalls & Solutions

### Pitfall 1: Timezone Confusion

**Problem**: Appointments showing at wrong times

**Cause**: Inconsistent timezone handling

**Solution**:
```javascript
// ALWAYS use timezone offset in ISO strings
const correct = "2025-11-07T13:00:00-05:00"; // EST
const wrong = "2025-11-07T13:00:00"; // No timezone = UTC assumed

// Set timezone in Config sheet
Config["timezone"] = "America/New_York";

// Calculate offset dynamically
const tzOffset = new Date().toLocaleString('en-US', {
  timeZone: 'America/New_York',
  timeZoneName: 'short'
});
```

### Pitfall 2: Race Conditions

**Problem**: Double bookings when multiple requests hit same slot

**Cause**: GHL appointment not immediately visible in next query

**Solution**:
```javascript
// Add retry logic with fresh capacity check
async function bookWithRetry(payload, maxRetries = 1) {
  for (let i = 0; i <= maxRetries; i++) {
    // Check capacity
    const available = await checkCapacity(payload);

    if (available) {
      // Attempt booking
      const result = await createAppointment(payload);

      if (result.error && result.error.includes("conflict")) {
        // Race condition detected, retry
        if (i < maxRetries) {
          await sleep(100); // Small delay
          continue;
        }
      }

      return result;
    }

    // Not available, find alternatives
    return findAlternatives(payload);
  }
}
```

### Pitfall 3: Buffer Time Not Working

**Problem**: Appointments booked too close together

**Cause**: bufferEndISO not used in overlap check

**Solution**:
```javascript
// WRONG: Check only appointment duration
const overlaps = (apt.start < targetEnd && apt.end > targetStart);

// CORRECT: Check including buffer
const overlaps = (apt.start < targetBufferEnd && apt.end > targetStart);
//                                 ^^^^^^^^^^ Include buffer
```

### Pitfall 4: Service Code Case Sensitivity

**Problem**: Capacity not found even though it exists

**Cause**: "Hygiene" vs "hygiene"

**Solution**:
```javascript
// Normalize to lowercase everywhere
const requestServiceCode = payload.serviceCode.toLowerCase();
const sheetServiceCode = row.serviceCode.toLowerCase();

if (requestServiceCode === sheetServiceCode) {
  // Match found
}
```

### Pitfall 5: Date Format Issues

**Problem**: "Invalid date" errors

**Cause**: Multiple date formats in different systems

**Solution**:
```javascript
// Standardize on YYYY-MM-DD for Sheets and API
function validateDateFormat(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) {
    throw new Error("Date must be in YYYY-MM-DD format");
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date value");
  }

  return dateString;
}

// Convert other formats
function parseFlexibleDate(input) {
  // Handle: "2025-11-07", "11/07/2025", "Nov 7 2025", etc.
  const date = new Date(input);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
```

---

## 📊 Monitoring & Maintenance

### Daily Checks

```bash
# Check n8n executions
# Look for:
- ❌ Failed executions
- ⚠️  Warnings in logs
- 📊 Success rate

# Check Bookings sheet
# Verify:
- ✅ All bookings have appointmentId
- ✅ Status = "confirmed"
- ✅ No duplicate entries

# Check GHL Calendar
# Ensure:
- ✅ Appointments visible
- ✅ Contact details correct
- ✅ Times match Bookings sheet
```

### Weekly Review

```sql
-- Analyze booking patterns (use Sheets filters or export to DB)

-- Top booking hours
SELECT hour, COUNT(*) as bookings
FROM Bookings
WHERE date >= DATE('now', '-7 days')
GROUP BY hour
ORDER BY bookings DESC;

-- Service code distribution
SELECT serviceCode, COUNT(*) as count
FROM Bookings
WHERE date >= DATE('now', '-7 days')
GROUP BY serviceCode;

-- Capacity utilization
SELECT
  date,
  hour,
  COUNT(*) as booked,
  slotCapacity,
  (COUNT(*) * 100.0 / slotCapacity) as utilization_percent
FROM Bookings b
JOIN Capacity c ON b.date = c.date AND b.hour = c.hour
WHERE b.date >= DATE('now', '-7 days')
GROUP BY date, hour;
```

### Monthly Optimization

1. **Capacity Adjustment**:
   - Identify underutilized hours → Reduce capacity
   - Identify overbooked attempts → Increase capacity

2. **Buffer Time Review**:
   - Too many rejections? → Reduce buffer
   - Appointments running late? → Increase buffer

3. **Service Code Analysis**:
   - Are codes being used correctly?
   - Need new service types?

---

## 🚨 Error Response Codes

| Status Code | Meaning | Cause | Action |
|-------------|---------|-------|--------|
| `success` | Appointment booked | Capacity available | No action needed |
| `no_availability` | Slot fully booked | currentBookings >= capacity | Show alternatives |
| `error` | General error | Various | Check error message |
| `validation_error` | Invalid input | Missing/wrong fields | Fix request payload |
| `capacity_not_found` | No config for date/service | Sheet missing row | Add capacity config |
| `ghl_api_error` | GHL API failure | API issue | Retry or check credentials |
| `sheets_error` | Google Sheets error | Permission or connectivity | Check credentials |

### Error Response Examples

```json
// Validation Error
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    "date is required (YYYY-MM-DD format)",
    "hour must be between 0 and 23"
  ]
}

// No Capacity Configured
{
  "status": "error",
  "message": "No capacity configured for date 2025-11-07, service hygiene",
  "alternatives": []
}

// GHL API Error
{
  "status": "error",
  "message": "GHL API returned 401: Unauthorized",
  "details": {
    "node": "Get GHL Appointments",
    "timestamp": "2025-11-06T10:30:00Z"
  }
}

// No Availability with Alternatives
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
    },
    {
      "hour": 15,
      "startISO": "2025-11-07T15:00:00-05:00",
      "capacity": 2,
      "displayTime": "15:00"
    }
  ]
}
```

---

## 🔒 Security Best Practices

### API Key Security

```bash
# ❌ NEVER commit API keys to code
const apiKey = "eyJhbGc..."; // WRONG

# ✅ Use n8n credentials vault
const apiKey = $credentials.ghlApi.apiKey; // CORRECT

# ✅ Use environment variables (n8n cloud)
const apiKey = $env.GHL_API_KEY; // CORRECT
```

### Webhook Security

```javascript
// Add authentication to webhook
// Option 1: Secret header
if (req.headers['x-webhook-secret'] !== 'your-secret-here') {
  return {
    status: 'error',
    message: 'Unauthorized'
  };
}

// Option 2: Query parameter
if (req.query.secret !== 'your-secret-here') {
  return {
    status: 'error',
    message: 'Unauthorized'
  };
}

// Option 3: JWT token
const jwt = require('jsonwebtoken');
try {
  const decoded = jwt.verify(req.headers.authorization, 'your-secret');
} catch (err) {
  return { status: 'error', message: 'Invalid token' };
}
```

### Google Sheets Security

```bash
# ✅ Use service account (production)
# - Create service account in Google Cloud Console
# - Share sheet with service account email only
# - Grant "Editor" permission (not "Owner")

# ✅ Limit sheet access
# - Don't make sheet public
# - Share only with necessary accounts
# - Use "Specific people" not "Anyone with link"

# ✅ Backup regularly
# - File → Download → Microsoft Excel (.xlsx)
# - Store in secure location
# - Automate weekly backups
```

---

## 🎓 Learning Resources

### GHL API Documentation
- **Main Docs**: https://highlevel.stoplight.io/
- **Calendars API**: https://highlevel.stoplight.io/docs/integrations/calendar
- **Appointments**: https://highlevel.stoplight.io/docs/integrations/appointments
- **Contacts**: https://highlevel.stoplight.io/docs/integrations/contacts

### n8n Documentation
- **Getting Started**: https://docs.n8n.io/getting-started/
- **Nodes Library**: https://docs.n8n.io/integrations/
- **Webhooks**: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/
- **Google Sheets**: https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/

### Google Sheets API
- **API Overview**: https://developers.google.com/sheets/api/guides/concepts
- **Authentication**: https://developers.google.com/sheets/api/guides/authorizing
- **Service Accounts**: https://cloud.google.com/iam/docs/service-accounts

---

## 📞 Support Contacts

If you get stuck:

1. **n8n Community**: https://community.n8n.io/
2. **GHL Support**: support@gohighlevel.com
3. **Google Workspace Support**: https://support.google.com/a/

---

## ✅ Final Pre-Launch Checklist

Before going live:

```
Configuration:
□ All IDs collected and verified
□ API credentials tested
□ Google Sheets permissions set
□ n8n workflow activated

Testing:
□ Test 1: Basic booking succeeds
□ Test 2: At-capacity returns alternatives
□ Test 3: Invalid input returns validation error
□ Test 4: Buffer time respected
□ Test 5: Different service codes work
□ Test 6: Race condition handling works

Data:
□ Capacity sheet filled for next 30 days
□ Service codes documented
□ Timezone configured correctly

Monitoring:
□ n8n execution logs accessible
□ Bookings sheet monitored
□ GHL calendar synced
□ Error alerts configured

Documentation:
□ Team trained on system
□ Runbook created for common issues
□ Contact information for support

Security:
□ API keys secured in vault
□ Webhook authentication enabled
□ Sheet access restricted
□ Backups scheduled
```

---

**You're now ready to implement! Refer to the main guide for detailed step-by-step instructions.**

**Good luck! 🚀**
