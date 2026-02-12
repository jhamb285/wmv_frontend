# Implementation Decisions & Recommendations

## Overview

This document addresses the two open questions from your requirements and provides recommendations based on clinic booking best practices.

---

## Decision 1: Overlap Policy for Multi-Hour Windows

### Question
When you have capacity configured like:
```
Hour 15-17: capacity=1
```

Should this be:
- **Option A**: Per-hour independent (1 booking per hour, so 2 total bookings possible)
- **Option B**: Single concurrent across whole window (1 booking total across both hours)

### Recommendation: **Option A - Per-Hour Independent** ✅

#### Why Per-Hour Independent?

1. **Flexibility for Patients**:
   - Patient A books 15:00-16:00 (hygiene)
   - Patient B books 16:00-17:00 (hygiene)
   - Both can be served in the same 2-hour window

2. **Realistic Clinic Operations**:
   - Most dental procedures are exactly 1 hour
   - Chairs can be turned over between appointments
   - Buffer time between appointments prevents overlap

3. **Better Capacity Utilization**:
   - You can serve more patients
   - Avoids unnecessarily blocking time

4. **Easier to Configure**:
   ```
   15, 1, 60, 15, hygiene
   16, 1, 60, 15, hygiene
   17, 1, 60, 15, hygiene
   ```
   Each hour is explicit and independent

#### When to Use Single Concurrent (Option B)?

Use Option B only for special cases:

**Example 1: Extended Procedure**
```
Date       Hour  Capacity  Duration  Buffer  Service      Notes
2025-11-07 14    1         120       30      root_canal   2-hour procedure
```
- This blocks 14:00-16:00 for ONE patient
- Create ONLY ONE row (hour 14)
- Set duration=120 minutes

**Example 2: Lunch Break**
```
Date       Hour  Capacity  Duration  Buffer  Service  Notes
2025-11-07 12    0         60        0       closed   Lunch break
2025-11-07 13    0         60        0       closed   Lunch break
```
- capacity=0 blocks all bookings

**Example 3: Complex Surgery**
```
Date       Hour  Capacity  Duration  Buffer  Service      Notes
2025-11-07 10    1         180       60      implant      3-hour surgery + buffer
```
- ONE row for hour 10
- duration=180 (3 hours)
- buffer=60 (1 hour cleanup/prep)
- Blocks 10:00-14:00 for ONE patient

### Implementation in n8n

The provided workflow **already implements Option A** (per-hour independent).

Here's how it works:

```javascript
// In "Count Overlapping Bookings" node
const overlappingCount = existingAppointments.filter(apt => {
  const aptStart = new Date(apt.startTime);
  const aptEnd = new Date(apt.endTime);

  // This checks if ANY part of requested time overlaps with existing
  return (aptStart < targetBufferEnd && aptEnd > targetStart);
}).length;
```

**Behavior**:
- Booking at 15:00-16:00 counts as 1 booking for hour 15
- Booking at 16:00-17:00 counts as 1 booking for hour 16
- They don't conflict (no overlap)

**To enforce Option B** (if needed later):
Add logic to check all hours spanned by appointment:

```javascript
// Option B: Check capacity across ALL spanned hours
const startHour = targetStart.getHours();
const endHour = targetEnd.getHours();
const hoursSpanned = [];

for (let h = startHour; h < endHour; h++) {
  hoursSpanned.push(h);
}

// Check each hour's capacity
for (const hour of hoursSpanned) {
  const hourCapacity = capacitySheet.find(c => c.hour === hour);
  if (!hourCapacity || hourCapacity.slotCapacity < 1) {
    return { status: "no_availability", reason: `Hour ${hour} unavailable` };
  }
}
```

---

## Decision 2: Slot Interval for User Options

### Question
Should users be able to book at:
- **15-minute intervals** (9:00, 9:15, 9:30, 9:45)
- **30-minute intervals** (9:00, 9:30)
- **60-minute intervals** (9:00, 10:00)

### Recommendation: **30-Minute Intervals** ✅

#### Why 30-Minute Intervals?

1. **Balance Between Flexibility & Complexity**:
   - 15-min: Too granular, creates scheduling chaos
   - 60-min: Too rigid, limits patient options
   - 30-min: Sweet spot for dental clinics

2. **Standard Dental Practice**:
   - Most clinics use 30-min or 1-hour slots
   - Procedures typically take 30, 60, or 90 minutes
   - Easy for staff to manage

3. **Capacity Configuration**:
   ```
   Hour 9:
   - 9:00-10:00: Slot 1
   - 9:30-10:30: Slot 2

   Hour 10:
   - 10:00-11:00: Slot 1
   - 10:30-11:30: Slot 2
   ```

4. **Buffer Time Compatibility**:
   - 15-min buffer between appointments
   - 30-min slots allow natural spacing
   - Prevents back-to-back scheduling issues

#### Implementation in GHL

**GHL Calendar Settings**:
```
Slot Interval: 30 minutes
Default Duration: 60 minutes
```

This allows bookings at:
- 9:00, 9:30, 10:00, 10:30, 11:00, etc.

**Google Sheets Configuration**:

You have two options:

**Option 1: Hour-Only (Simpler)**
```
date       | hour | slotCapacity | duration | buffer
2025-11-07 | 9    | 2            | 60       | 15
2025-11-07 | 10   | 2            | 60       | 15
```

Users can request:
- 9:00 (hour=9)
- 9:30 (via preferredStartISO)
- 10:00 (hour=10)
- 10:30 (via preferredStartISO)

**Option 2: Explicit 30-Min Rows**
```
date       | hour | minute | slotCapacity | duration | buffer
2025-11-07 | 9    | 0      | 1            | 60       | 15
2025-11-07 | 9    | 30     | 1            | 60       | 15
2025-11-07 | 10   | 0      | 1            | 60       | 15
2025-11-07 | 10   | 30     | 1            | 60       | 15
```

### Recommendation: **Start with Option 1 (Hour-Only)**

Why?
- Simpler to manage
- Fewer rows in sheet
- n8n workflow handles 30-min via `preferredStartISO`
- Easier to update capacity

**Migration Path**:
If you need finer control later:
1. Add `minute` column to Capacity sheet
2. Update n8n filtering logic to match hour+minute
3. Populate sheet with 30-min rows

---

## Capacity Planning Guide

### How to Set `slotCapacity` Value

The `slotCapacity` should represent:
- **Number of chairs/rooms available**
- **Number of hygienists/dentists available**
- **Whichever is smaller**

**Example**:
```
Your clinic has:
- 3 hygiene chairs
- 2 hygienists on duty

Capacity = 2 (limited by staff, not chairs)
```

### Real-World Capacity Examples

#### Example 1: Small Practice (1 Dentist + 1 Hygienist)

```csv
date,hour,slotCapacity,durationMinutes,bufferMinutes,serviceCode,notes
2025-11-07,9,1,60,15,hygiene,Morning hygiene
2025-11-07,10,1,60,15,hygiene,Morning hygiene
2025-11-07,11,1,60,15,hygiene,Morning hygiene
2025-11-07,13,1,60,15,dentist,Afternoon dentist
2025-11-07,14,1,60,15,dentist,Afternoon dentist
2025-11-07,15,1,60,15,dentist,Afternoon dentist
```

**Reasoning**:
- 1 hygienist → capacity=1 for hygiene hours
- 1 dentist → capacity=1 for dentist hours

#### Example 2: Medium Practice (2 Hygienists + 1 Dentist)

```csv
date,hour,slotCapacity,durationMinutes,bufferMinutes,serviceCode,notes
2025-11-07,9,2,60,15,hygiene,2 hygienists working
2025-11-07,10,2,60,15,hygiene,2 hygienists working
2025-11-07,11,2,60,15,hygiene,2 hygienists working
2025-11-07,13,3,60,15,any,All 3 staff available
2025-11-07,14,3,60,15,any,All 3 staff available
2025-11-07,15,1,60,15,dentist,Only dentist (hygienists off)
```

**Reasoning**:
- Morning: 2 hygienists can work in parallel
- Afternoon: All 3 can work (if chairs available)
- Late afternoon: Only dentist remains

#### Example 3: Large Practice (4 Chairs, 3 Hygienists, 2 Dentists)

```csv
date,hour,slotCapacity,durationMinutes,bufferMinutes,serviceCode,notes
2025-11-07,9,3,60,15,hygiene,3 hygienists
2025-11-07,10,3,60,15,hygiene,3 hygienists
2025-11-07,11,3,60,15,hygiene,3 hygienists
2025-11-07,13,5,60,15,any,All staff (3H+2D)
2025-11-07,14,5,60,15,any,All staff (3H+2D)
2025-11-07,15,2,60,0,emergency,Dentist emergencies only
```

**Reasoning**:
- capacity=3 for hygiene (limited by hygienist count)
- capacity=5 when all staff working
- Emergency slots: Tighter scheduling (no buffer)

### Buffer Time Guidelines

| Procedure Type | Duration | Recommended Buffer | Reasoning |
|----------------|----------|-------------------|-----------|
| Simple Cleaning | 60 min | 15 min | Chair cleanup, patient checkout |
| Deep Cleaning | 90 min | 20 min | More thorough cleanup needed |
| Filling | 60 min | 15 min | Standard cleanup time |
| Root Canal | 120 min | 30 min | Complex cleanup, sterilization |
| Consultation | 30 min | 10 min | Quick turnaround |
| Emergency | 60 min | 0 min | Back-to-back if needed |

### Special Scheduling Scenarios

#### Scenario 1: Lunch Break
```csv
date,hour,slotCapacity,durationMinutes,bufferMinutes,serviceCode,notes
2025-11-07,12,0,60,0,closed,Lunch break
```

#### Scenario 2: Staff Meeting
```csv
date,hour,slotCapacity,durationMinutes,bufferMinutes,serviceCode,notes
2025-11-07,17,0,60,0,closed,Weekly team meeting
```

#### Scenario 3: Half-Day (Only Morning)
```csv
date,hour,slotCapacity,durationMinutes,bufferMinutes,serviceCode,notes
2025-11-07,9,2,60,15,hygiene,Available
2025-11-07,10,2,60,15,hygiene,Available
2025-11-07,11,2,60,15,hygiene,Available
2025-11-07,13,0,60,0,closed,Closed afternoon
2025-11-07,14,0,60,0,closed,Closed afternoon
```

#### Scenario 4: Reduced Staff (Vacation)
```csv
date,hour,slotCapacity,durationMinutes,bufferMinutes,serviceCode,notes
2025-11-15,9,1,60,20,hygiene,Only 1 hygienist (vacation)
2025-11-15,10,1,60,20,hygiene,Only 1 hygienist (vacation)
2025-11-15,11,1,60,20,hygiene,Only 1 hygienist (vacation)
```
- Capacity reduced from 2 to 1
- Buffer increased to 20 min (understaffed)

---

## Recommended Configuration for Phase 1

### Starting Configuration

Based on best practices, here's a recommended starting point:

**GHL Settings**:
```
Calendar Type: Service Calendar
Slot Interval: 30 minutes
Default Duration: 60 minutes
Minimum Notice: 30 minutes
Date Range: 60 days
```

**Google Sheets - Capacity**:
```csv
date,hour,slotCapacity,durationMinutes,bufferMinutes,serviceCode,notes
[Week 1 - Your actual schedule here]
2025-11-07,9,2,60,15,hygiene,Morning slots
2025-11-07,10,2,60,15,hygiene,Morning slots
2025-11-07,11,2,60,15,hygiene,Morning slots
2025-11-07,13,2,60,15,hygiene,Afternoon slots
2025-11-07,14,2,60,15,hygiene,Afternoon slots
2025-11-07,15,1,60,15,consult,Consultation only
2025-11-07,16,1,60,15,consult,Consultation only
```

**Why These Values?**:
- **Capacity=2**: Conservative for small-medium practice
- **Duration=60**: Standard appointment length
- **Buffer=15**: Industry standard for turnover
- **ServiceCode**: hygiene vs consult for different providers

### Scaling Guide

As you grow comfortable with the system:

**Week 1-2**: Start conservative
- capacity=1-2
- buffer=15-20 min
- Monitor for issues

**Week 3-4**: Optimize based on data
- Increase capacity where demand is high
- Reduce buffer if staff is efficient
- Add new service codes as needed

**Month 2**: Fine-tune
- Analyze Bookings sheet
- Identify peak hours
- Adjust capacity dynamically

---

## Summary of Decisions

| Decision | Recommendation | Reasoning |
|----------|---------------|-----------|
| **Overlap Policy** | Per-hour independent | Better utilization, more flexible, easier to manage |
| **Slot Interval** | 30 minutes | Balance between flexibility and simplicity |
| **Starting Capacity** | 2 slots per hour | Conservative, safe for most small-medium practices |
| **Buffer Time** | 15 minutes | Industry standard for dental turnover |
| **Duration** | 60 minutes | Standard dental appointment length |

---

## Next Steps

1. **Review your clinic's actual capacity**:
   - Count chairs
   - Count staff per shift
   - Determine limiting factor

2. **Choose your slot interval**:
   - Recommended: 30 minutes
   - Configure in GHL calendar

3. **Populate Capacity sheet**:
   - Use recommended template above
   - Adjust for your clinic's hours
   - Set realistic capacity values

4. **Test with conservative values**:
   - Start low (capacity=1)
   - Increase after validating system works

5. **Monitor and optimize**:
   - Review Bookings sheet weekly
   - Adjust capacity based on demand
   - Fine-tune buffer times

---

## Questions to Ask Yourself

Before finalizing your configuration:

1. **How many staff members do you have per shift?**
   - Morning shift: _____
   - Afternoon shift: _____
   - This determines max capacity

2. **How many procedure rooms/chairs?**
   - Total: _____
   - This is your hard limit

3. **What's your typical appointment length?**
   - Hygiene: _____ minutes
   - Dentist: _____ minutes
   - Consultation: _____ minutes

4. **How much cleanup time do you need?**
   - Simple: _____ minutes
   - Complex: _____ minutes
   - Use this for buffer

5. **What are your peak demand hours?**
   - Morning: _____
   - Afternoon: _____
   - Evening: _____
   - Increase capacity during these times

6. **Do you offer different service types?**
   - Yes: Use multiple serviceCode values
   - No: Use single "any" or "general" code

---

## Final Recommendation

**Start Simple, Then Optimize**:

1. **Phase 1 (Week 1-2)**:
   - Slot interval: 30 min
   - Capacity: 1-2 (conservative)
   - Buffer: 15 min
   - Per-hour independent policy
   - Single service code

2. **Phase 2 (Week 3-4)**:
   - Analyze actual usage
   - Increase capacity where needed
   - Reduce buffer if possible
   - Add service codes for specialization

3. **Phase 3 (Month 2+)**:
   - Dynamic capacity based on day/time
   - Optimize buffer per procedure type
   - Consider 15-min intervals if needed
   - Add chat widget integration

**Remember**: You can always adjust! The Google Sheets approach makes it easy to experiment and optimize without changing code.

---

## Additional Resources

- **Dental Practice Management**: https://www.ada.org/resources/practice
- **Scheduling Best Practices**: Search for "dental practice scheduling optimization"
- **GHL Community**: https://community.gohighlevel.com/

---

**You're ready to implement! Use the main guide for step-by-step instructions.**

**Good luck! 🚀**
