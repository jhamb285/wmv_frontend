# n8n Daily Capacity Sync Workflow - Complete Implementation Guide

## Overview

This workflow runs **daily at midnight** to pre-block unused GHL calendar slots based on Google Sheets capacity configuration.

**Purpose**:
- If Google Sheets says capacity=1, but GHL allows 5 slots
- Create 4 "phantom blocks" to hide the unused slots
- Result: Only 1 slot shows as available in GHL calendar widget

---

## Workflow Architecture

```
[Schedule Trigger]
     ↓
[Set Config Variables]
     ↓
[Read Google Sheets - Capacity]
     ↓
[Filter: Next 7 Days Only]
     ↓
[Calculate Blocks Needed]
     ↓
[Split Into Batches] → For each hour that needs blocks
     ↓
[Loop: Create Block Slots]
     ↓
[Log Results to Sheets]
     ↓
[Send Summary Email/Notification]
```

---

## Complete Node-by-Node Breakdown

### **Node 1: Schedule Trigger**

**Node Type**: `Schedule Trigger`

**Configuration**:
```json
{
  "rule": {
    "interval": [
      {
        "field": "cronExpression",
        "expression": "1 0 * * *"
      }
    ]
  },
  "triggerAt": "midnight"
}
```

**Settings**:
- **Cron Expression**: `1 0 * * *` (Runs at 12:01 AM daily)
- **Timezone**: `America/New_York` (or your timezone)

**Visual Config**:
```
Mode: Cron
Cron Expression: 1 0 * * *
Description: Run daily at midnight to sync capacity
```

---

### **Node 2: Set Config Variables**

**Node Type**: `Set` (or `Code` node)

**Purpose**: Define all configuration values in one place

**Configuration**:
```json
{
  "values": {
    "ghlLocationId": "YOUR_LOCATION_ID",
    "ghlCalendarId": "YOUR_CALENDAR_ID",
    "ghlMaxSlots": 5,
    "googleSheetId": "YOUR_SHEET_ID",
    "capacitySheetName": "Capacity",
    "logsSheetName": "CapacitySyncLogs",
    "daysAhead": 7,
    "timezone": "America/New_York",
    "timezoneOffset": "-05:00"
  }
}
```

**Using Set Node**:
- Click "Add Value" for each config item
- Name: `ghlLocationId`, Value: `your_actual_location_id`
- Repeat for all values above

**Alternative - Using Code Node**:
```javascript
return [{
  json: {
    ghlLocationId: "YOUR_LOCATION_ID",
    ghlCalendarId: "YOUR_CALENDAR_ID",
    ghlMaxSlots: 5,
    googleSheetId: "YOUR_SHEET_ID",
    capacitySheetName: "Capacity",
    logsSheetName: "CapacitySyncLogs",
    daysAhead: 7,
    timezone: "America/New_York",
    timezoneOffset: "-05:00"
  }
}];
```

---

### **Node 3: Read Google Sheets - Capacity**

**Node Type**: `Google Sheets`

**Operation**: `Read`

**Configuration**:
```json
{
  "authentication": "oAuth2",
  "operation": "read",
  "sheetName": "={{$json.capacitySheetName}}",
  "range": "A:G",
  "options": {
    "headerRow": 1,
    "dataStartRow": 2
  }
}
```

**Field Mapping**:
- Use expression: `={{$('Set Config Variables').item.json.capacitySheetName}}`
- Range: `A:G` (all columns in Capacity sheet)

**Expected Output** (per row):
```json
{
  "date": "2025-11-07",
  "hour": 9,
  "slotCapacity": 2,
  "durationMinutes": 60,
  "bufferMinutes": 0,
  "serviceCode": "hygiene",
  "notes": "Morning slots"
}
```

---

### **Node 4: Filter - Next 7 Days Only**

**Node Type**: `Code` (Function Node)

**Purpose**: Only process dates in the next 7 days

**Code**:
```javascript
// Get config
const daysAhead = $('Set Config Variables').item.json.daysAhead;

// Get all capacity rows
const items = $input.all();

// Calculate date range
const today = new Date();
today.setHours(0, 0, 0, 0);

const maxDate = new Date(today);
maxDate.setDate(maxDate.getDate() + daysAhead);

// Filter rows within date range
const filteredItems = items.filter(item => {
  const rowDate = new Date(item.json.date);
  rowDate.setHours(0, 0, 0, 0);

  return rowDate >= today && rowDate < maxDate;
});

console.log(`📅 Filtered ${filteredItems.length} rows for next ${daysAhead} days`);

return filteredItems;
```

**Output**: Only rows with dates between today and today+7 days

---

### **Node 5: Delete Old Blocks First**

**Node Type**: `Code` (Function Node)

**Purpose**: Get list of existing blocks to delete (cleanup)

**Code**:
```javascript
// Get config
const config = $('Set Config Variables').item.json;
const calendarId = config.ghlCalendarId;
const locationId = config.ghlLocationId;

// Calculate date range for cleanup
const today = new Date();
const startDate = today.toISOString();

const endDate = new Date(today);
endDate.setDate(endDate.getDate() + config.daysAhead);
const endDateISO = endDate.toISOString();

// Return parameters for GHL API call
return [{
  json: {
    calendarId: calendarId,
    locationId: locationId,
    startDate: startDate,
    endDate: endDateISO
  }
}];
```

---

### **Node 6: Get Existing Block Slots**

**Node Type**: `HTTP Request`

**Method**: `GET`

**URL**: `https://services.gohighlevel.com/calendars/{{$json.calendarId}}/block-slots`

**Authentication**: `Header Auth`
- Header Name: `Authorization`
- Header Value: `Bearer YOUR_GHL_API_KEY`

**Query Parameters**:
```
locationId: ={{$json.locationId}}
startDate: ={{$json.startDate}}
endDate: ={{$json.endDate}}
```

**Options**:
- Response → Never Error: `true` (handle errors gracefully)

**Expected Response**:
```json
{
  "events": [
    {
      "id": "block_123",
      "calendarId": "cal_abc",
      "startTime": "2025-11-07T09:00:00.000Z",
      "endTime": "2025-11-07T10:00:00.000Z",
      "title": "🔒 Capacity Limiter 1/4"
    }
  ]
}
```

---

### **Node 7: Filter Auto-Created Blocks**

**Node Type**: `Code` (Function Node)

**Purpose**: Only delete blocks created by this automation

**Code**:
```javascript
const response = $input.item.json;
const events = response.events || [];

// Filter only blocks created by our automation
const autoBlocks = events.filter(event => {
  return event.title && (
    event.title.includes("Capacity Limiter") ||
    event.title.includes("🔒") ||
    (event.notes && event.notes.includes("Auto-block"))
  );
});

console.log(`🗑️ Found ${autoBlocks.length} auto-created blocks to delete`);

// Return each block as separate item for deletion
return autoBlocks.map(block => ({
  json: {
    blockId: block.id,
    calendarId: block.calendarId,
    startTime: block.startTime,
    title: block.title
  }
}));
```

---

### **Node 8: Delete Old Blocks** (Loop)

**Node Type**: `HTTP Request`

**Method**: `DELETE`

**URL**: `https://services.gohighlevel.com/calendars/{{$('Set Config Variables').item.json.ghlCalendarId}}/block-slots/{{$json.blockId}}`

**Authentication**: `Header Auth`
- Header Name: `Authorization`
- Header Value: `Bearer YOUR_GHL_API_KEY`

**Options**:
- Response → Never Error: `true`
- Batching → Batch Size: `10` (delete 10 at a time)

**Note**: This node processes ALL items from Node 7 (loops automatically)

---

### **Node 9: Calculate Blocks Needed**

**Node Type**: `Code` (Function Node)

**Purpose**: Calculate how many block slots needed for each hour

**Code**:
```javascript
const config = $('Set Config Variables').item.json;
const ghlMaxSlots = config.ghlMaxSlots;
const timezoneOffset = config.timezoneOffset;

// Get all filtered capacity rows
const capacityRows = $('Filter - Next 7 Days Only').all();

const results = [];

for (const item of capacityRows) {
  const row = item.json;
  const sheetsCapacity = parseInt(row.slotCapacity);
  const date = row.date;
  const hour = parseInt(row.hour);

  // Calculate blocks needed
  const blocksNeeded = Math.max(0, ghlMaxSlots - sheetsCapacity);

  // Build ISO time strings
  const startTime = `${date}T${String(hour).padStart(2, '0')}:00:00${timezoneOffset}`;
  const endTime = `${date}T${String((hour + 1) % 24).padStart(2, '0')}:00:00${timezoneOffset}`;

  // Prepare result
  const result = {
    date: date,
    hour: hour,
    sheetsCapacity: sheetsCapacity,
    ghlMaxSlots: ghlMaxSlots,
    blocksNeeded: blocksNeeded,
    startTime: startTime,
    endTime: endTime,
    serviceCode: row.serviceCode,
    durationMinutes: parseInt(row.durationMinutes),
    status: blocksNeeded > 0 ? 'needs_blocking' :
            sheetsCapacity > ghlMaxSlots ? 'capacity_warning' :
            'no_action_needed'
  };

  // Log
  if (blocksNeeded > 0) {
    console.log(`🔒 ${date} ${hour}:00 - Need to block ${blocksNeeded} slots (capacity=${sheetsCapacity}, max=${ghlMaxSlots})`);
  } else if (sheetsCapacity > ghlMaxSlots) {
    console.warn(`⚠️ ${date} ${hour}:00 - Sheets capacity (${sheetsCapacity}) exceeds GHL max (${ghlMaxSlots})`);
  }

  results.push({ json: result });
}

console.log(`📊 Total hours processed: ${results.length}`);
console.log(`📊 Hours needing blocks: ${results.filter(r => r.json.blocksNeeded > 0).length}`);

return results;
```

**Output** (per hour):
```json
{
  "date": "2025-11-07",
  "hour": 15,
  "sheetsCapacity": 1,
  "ghlMaxSlots": 5,
  "blocksNeeded": 4,
  "startTime": "2025-11-07T15:00:00-05:00",
  "endTime": "2025-11-07T16:00:00-05:00",
  "serviceCode": "consult",
  "status": "needs_blocking"
}
```

---

### **Node 10: Filter - Only Rows Needing Blocks**

**Node Type**: `Filter` (IF Node)

**Condition**:
```json
{
  "conditions": {
    "number": [
      {
        "value1": "={{$json.blocksNeeded}}",
        "operation": "larger",
        "value2": 0
      }
    ]
  }
}
```

**Alternative - Code Node**:
```javascript
const items = $input.all();
const needsBlocking = items.filter(item => item.json.blocksNeeded > 0);

console.log(`✅ ${needsBlocking.length} hours need blocking`);

return needsBlocking;
```

**Output**: Only rows where `blocksNeeded > 0`

---

### **Node 11: Expand to Individual Blocks**

**Node Type**: `Code` (Function Node)

**Purpose**: Convert each hour into multiple block slot items

**Code**:
```javascript
const config = $('Set Config Variables').item.json;
const items = $input.all();

const blockSlots = [];

for (const item of items) {
  const data = item.json;

  // Create N block slots for this hour
  for (let i = 0; i < data.blocksNeeded; i++) {
    blockSlots.push({
      json: {
        calendarId: config.ghlCalendarId,
        locationId: config.ghlLocationId,
        startTime: data.startTime,
        endTime: data.endTime,
        title: `🔒 Capacity Limiter ${i + 1}/${data.blocksNeeded}`,
        notes: `Auto-block: Sheets capacity=${data.sheetsCapacity}, GHL max=${config.ghlMaxSlots}. Service: ${data.serviceCode}`,
        metadata: {
          date: data.date,
          hour: data.hour,
          sheetsCapacity: data.sheetsCapacity,
          blockIndex: i + 1,
          totalBlocks: data.blocksNeeded
        }
      }
    });
  }
}

console.log(`🔒 Created ${blockSlots.length} block slot items to insert`);

return blockSlots;
```

**Example Output** (if hour needs 4 blocks):
```json
[
  {
    "calendarId": "cal_123",
    "startTime": "2025-11-07T15:00:00-05:00",
    "endTime": "2025-11-07T16:00:00-05:00",
    "title": "🔒 Capacity Limiter 1/4",
    "notes": "Auto-block: Sheets capacity=1, GHL max=5"
  },
  {
    "calendarId": "cal_123",
    "startTime": "2025-11-07T15:00:00-05:00",
    "endTime": "2025-11-07T16:00:00-05:00",
    "title": "🔒 Capacity Limiter 2/4",
    "notes": "Auto-block: Sheets capacity=1, GHL max=5"
  },
  // ... 2 more blocks
]
```

---

### **Node 12: Create Block Slots** (Loop)

**Node Type**: `HTTP Request`

**Method**: `POST`

**URL**: `https://services.gohighlevel.com/calendars/{{$json.calendarId}}/block-slots`

**Authentication**: `Header Auth`
- Header Name: `Authorization`
- Header Value: `Bearer YOUR_GHL_API_KEY`

**Headers**:
```
Content-Type: application/json
```

**Body** (JSON):
```json
{
  "locationId": "={{$json.locationId}}",
  "calendarId": "={{$json.calendarId}}",
  "startTime": "={{$json.startTime}}",
  "endTime": "={{$json.endTime}}",
  "title": "={{$json.title}}",
  "notes": "={{$json.notes}}"
}
```

**Options**:
- Response → Never Error: `true`
- Batching → Batch Size: `5` (create 5 blocks per request batch)
- Batching → Interval: `1000` (1 second between batches to avoid rate limits)

**Expected Response**:
```json
{
  "event": {
    "id": "block_new123",
    "calendarId": "cal_abc",
    "startTime": "2025-11-07T15:00:00.000Z",
    "endTime": "2025-11-07T16:00:00.000Z",
    "title": "🔒 Capacity Limiter 1/4",
    "status": "active"
  }
}
```

**Error Handling**: If API fails, continue to next block (Never Error = true)

---

### **Node 13: Aggregate Results**

**Node Type**: `Code` (Function Node)

**Purpose**: Summarize what was created

**Code**:
```javascript
const createdBlocks = $input.all();

const successCount = createdBlocks.filter(item =>
  item.json.event && item.json.event.id
).length;

const failedCount = createdBlocks.length - successCount;

// Group by date
const byDate = {};
for (const item of createdBlocks) {
  if (item.json.event) {
    const date = item.json.event.startTime.split('T')[0];
    byDate[date] = (byDate[date] || 0) + 1;
  }
}

const summary = {
  timestamp: new Date().toISOString(),
  totalBlocksCreated: successCount,
  totalBlocksFailed: failedCount,
  blocksByDate: byDate,
  success: failedCount === 0
};

console.log(`✅ Summary: ${successCount} blocks created, ${failedCount} failed`);
console.log(`📊 Blocks by date:`, byDate);

return [{
  json: summary
}];
```

**Output**:
```json
{
  "timestamp": "2025-11-06T05:01:23.456Z",
  "totalBlocksCreated": 28,
  "totalBlocksFailed": 0,
  "blocksByDate": {
    "2025-11-07": 12,
    "2025-11-08": 10,
    "2025-11-09": 6
  },
  "success": true
}
```

---

### **Node 14: Log Results to Google Sheets**

**Node Type**: `Google Sheets`

**Operation**: `Append`

**Configuration**:
```json
{
  "authentication": "oAuth2",
  "operation": "append",
  "sheetName": "={{$('Set Config Variables').item.json.logsSheetName}}",
  "range": "A:F",
  "options": {
    "valueInputMode": "USER_ENTERED"
  }
}
```

**Columns to Append**:
```
A: timestamp
B: totalBlocksCreated
C: totalBlocksFailed
D: success
E: blocksByDate (as JSON string)
F: notes
```

**Values**:
```javascript
// Use expressions in the append configuration
timestamp: ={{$json.timestamp}}
totalBlocksCreated: ={{$json.totalBlocksCreated}}
totalBlocksFailed: ={{$json.totalBlocksFailed}}
success: ={{$json.success}}
blocksByDate: ={{JSON.stringify($json.blocksByDate)}}
notes: =Daily capacity sync completed
```

---

### **Node 15: Send Summary Notification** (Optional)

**Node Type**: `Send Email` or `Slack` or `Webhook`

**For Email** (using Gmail node):

**Configuration**:
```json
{
  "resource": "message",
  "operation": "send",
  "subject": "✅ Daily Capacity Sync Completed",
  "message": "Daily capacity sync ran successfully.\n\nBlocks Created: {{$json.totalBlocksCreated}}\nBlocks Failed: {{$json.totalBlocksFailed}}\n\nBlocks by Date:\n{{JSON.stringify($json.blocksByDate, null, 2)}}\n\nTimestamp: {{$json.timestamp}}",
  "toList": "your-email@example.com"
}
```

**Condition**: Only send if there were failures

Add IF node before email:
```javascript
$json.totalBlocksFailed > 0 || $json.totalBlocksCreated === 0
```

---

## 📊 Complete Workflow Visual

```
┌─────────────────────────────────────────────────────────────┐
│  1. Schedule Trigger (Midnight)                             │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│  2. Set Config Variables                                    │
│     - GHL IDs, Sheet IDs, Max Slots = 5                    │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│  3. Read Google Sheets - Capacity                           │
│     - Get all rows from Capacity sheet                      │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│  4. Filter - Next 7 Days Only                               │
│     - Only process upcoming dates                           │
└────────────────────────┬────────────────────────────────────┘
                         │
                    ┌────┴────┐
                    │ Cleanup │
                    └────┬────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│  5. Delete Old Blocks First                                 │
│     - Prepare date range                                    │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│  6. Get Existing Block Slots                                │
│     - GET /calendars/{id}/block-slots                       │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│  7. Filter Auto-Created Blocks                              │
│     - Only blocks with "Capacity Limiter" in title          │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│  8. Delete Old Blocks (Loop)                                │
│     - DELETE /calendars/{id}/block-slots/{blockId}          │
└────────────────────────┬────────────────────────────────────┘
                         │
                ┌────────┴────────┐
                │ Create New      │
                └────────┬────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│  9. Calculate Blocks Needed                                 │
│     - For each hour: blocksNeeded = 5 - sheetsCapacity      │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│  10. Filter - Only Rows Needing Blocks                      │
│      - Where blocksNeeded > 0                               │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│  11. Expand to Individual Blocks                            │
│      - Create N items for N blocks needed                   │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│  12. Create Block Slots (Loop)                              │
│      - POST /calendars/{id}/block-slots                     │
│      - Batch: 5 blocks at a time                            │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│  13. Aggregate Results                                      │
│      - Count success/failures                               │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│  14. Log Results to Google Sheets                           │
│      - Append to CapacitySyncLogs sheet                     │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│  15. Send Summary Notification (Optional)                   │
│      - Email/Slack if failures occurred                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 Setup Instructions

### Step 1: Create New Workflow in n8n

1. Open n8n
2. Click "+ New workflow"
3. Name: "Daily Capacity Sync - GHL Block Slots"
4. Save

### Step 2: Add Nodes in Order

Follow the node order above (1-15). For each node:

1. Click "+" to add node
2. Search for node type (e.g., "Schedule Trigger")
3. Configure as shown above
4. Connect to previous node

### Step 3: Configure Credentials

**Google Sheets OAuth2**:
1. Click on Google Sheets node
2. Credential: Create new
3. Follow OAuth flow
4. Authorize your Google account

**GHL API Key**:
1. Get API key from GHL Settings → API
2. In HTTP Request nodes:
   - Authentication: Header Auth
   - Name: `Authorization`
   - Value: `Bearer YOUR_API_KEY`

### Step 4: Update Config Node (Node 2)

Replace placeholder values:
```javascript
{
  ghlLocationId: "YOUR_ACTUAL_LOCATION_ID",
  ghlCalendarId: "YOUR_ACTUAL_CALENDAR_ID",
  ghlMaxSlots: 5,  // Update if different
  googleSheetId: "YOUR_SHEET_ID",
  capacitySheetName: "Capacity",
  logsSheetName: "CapacitySyncLogs",
  daysAhead: 7,
  timezone: "America/New_York",  // Your timezone
  timezoneOffset: "-05:00"  // Your offset
}
```

### Step 5: Create Logs Sheet

In your Google Sheet, create new tab:
```
Sheet Name: CapacitySyncLogs

Columns:
A: timestamp
B: totalBlocksCreated
C: totalBlocksFailed
D: success
E: blocksByDate
F: notes
```

### Step 6: Test Workflow

**Manual Test**:
1. Click "Execute Workflow" button
2. Watch each node execute
3. Check for errors
4. Verify blocks created in GHL calendar

**Check GHL Calendar**:
1. Go to GHL → Calendars
2. Select your calendar
3. View calendar for tomorrow
4. Should see "🔒 Capacity Limiter" blocks

### Step 7: Activate Workflow

1. Click "Active" toggle (top right)
2. Workflow will now run automatically at midnight

---

## 🧪 Testing Checklist

```
Pre-Test Setup:
☐ Google Sheets has capacity data for tomorrow
☐ GHL Calendar setting: Max appointments per slot = 5
☐ All credentials configured in n8n
☐ Config node has correct IDs

Manual Test:
☐ Click "Execute Workflow"
☐ Node 3 reads Google Sheets successfully
☐ Node 4 filters to next 7 days
☐ Node 9 calculates blocks correctly
☐ Node 12 creates blocks in GHL
☐ Node 14 logs to CapacitySyncLogs sheet
☐ No error messages in any node

GHL Calendar Verification:
☐ Open GHL calendar for tomorrow
☐ Check 3 PM (if capacity=1, should see 4 blocks)
☐ Check 9 AM (if capacity=2, should see 3 blocks)
☐ Check 1 PM (if capacity=4, should see 1 block)
☐ Block titles show "🔒 Capacity Limiter X/Y"

Widget Test:
☐ Open GHL booking widget
☐ Select tomorrow
☐ Verify only correct number of slots show
☐ 3 PM shows 1 slot (not 5) ✅
☐ 9 AM shows 2 slots (not 5) ✅

Cleanup Test (Next Day):
☐ Run workflow again
☐ Old blocks from yesterday should be deleted
☐ New blocks created for day 7
☐ No accumulation of old blocks
```

---

## ⚠️ Troubleshooting

### Issue 1: "Unauthorized" Error on GHL API

**Cause**: Invalid API key

**Fix**:
```
1. Go to GHL → Settings → API
2. Copy API key
3. In n8n HTTP Request nodes:
   - Header: Authorization
   - Value: Bearer YOUR_API_KEY (include "Bearer ")
```

### Issue 2: No Blocks Created

**Cause**: Filter removing all rows

**Debug**:
```
1. Check Node 4 output: Any rows?
2. Check Node 10 output: Any rows with blocksNeeded > 0?
3. Verify Google Sheets has dates for next 7 days
4. Check capacity values are less than ghlMaxSlots (5)
```

### Issue 3: Too Many Blocks Created

**Cause**: Cleanup not working, accumulating blocks

**Fix**:
```
1. Manually delete all blocks in GHL calendar
2. Check Node 7: Is it filtering correctly?
3. Verify block titles contain "Capacity Limiter"
4. Run cleanup workflow separately
```

### Issue 4: Rate Limit Errors

**Cause**: Creating blocks too fast (GHL rate limit: 100 req/10 sec)

**Fix**:
```
1. In Node 12 (Create Block Slots):
   - Options → Batching
   - Batch Size: 5
   - Interval Between Batches: 1000 ms
```

### Issue 5: Wrong Timezone

**Cause**: Blocks created at wrong times

**Fix**:
```
1. Update Node 2 Config:
   - timezone: "Your/Timezone"
   - timezoneOffset: "-05:00" (your offset)
2. Verify GHL calendar timezone matches
```

---

## 📊 Expected Results

### For Sample Capacity Configuration:

**Google Sheets**:
```
Nov 7, 9 AM: capacity=2
Nov 7, 1 PM: capacity=4
Nov 7, 3 PM: capacity=1
```

**After Workflow Runs**:
```
9 AM:
  Blocks Created: 3 (5-2=3)
  Available Slots: 2 ✅

1 PM:
  Blocks Created: 1 (5-4=1)
  Available Slots: 4 ✅

3 PM:
  Blocks Created: 4 (5-1=4)
  Available Slots: 1 ✅
```

**CapacitySyncLogs Sheet**:
```
timestamp                  | totalBlocksCreated | totalBlocksFailed | success
2025-11-06T05:01:23.456Z  | 28                | 0                 | true
```

---

## 🔄 Maintenance

### Daily Monitoring

Check CapacitySyncLogs sheet:
- Any failures?
- Block count seems correct?
- Success = true?

### Weekly Review

1. Review GHL calendar
2. Verify no old blocks accumulating
3. Check capacity utilization in Bookings sheet
4. Adjust Google Sheets capacity as needed

### Monthly Cleanup

1. Archive old logs (keep last 30 days)
2. Review and optimize capacity settings
3. Check for any GHL API changes

---

## 🎯 Success Criteria

```
✅ Workflow runs automatically at midnight
✅ Old blocks deleted before creating new ones
✅ Correct number of blocks created per hour
✅ GHL calendar widget shows accurate availability
✅ Logs recorded in Google Sheets
✅ No rate limit errors
✅ Blocks have clear titles for identification
```

---

## 📝 Next Steps After Implementation

1. **Test for 3 days** to verify stability
2. **Monitor logs** for any errors
3. **Adjust capacity** in Google Sheets based on demand
4. **Integrate with booking workflow** (your existing API)
5. **Add alerting** for failures (email/Slack)

---

## 🚀 You're Ready!

Follow this guide step-by-step to create the workflow in n8n.

**Estimated Setup Time**: 45-60 minutes

**Questions?** Check the troubleshooting section or test each node individually!

Good luck! 🎉
