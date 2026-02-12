# Direct Column Update Migration Guide

## ⚠️ CRITICAL: Backup First!

This migration updates columns **in-place** with **no automatic rollback**. You MUST backup before running.

---

## Overview

This migration standardizes data in the `final_1` table by updating 3 columns directly:

| Column | Change |
|--------|--------|
| `venue_price` | Convert all currencies → AED standardized format |
| `venue_highlights` | Extract keys from `[{"key":true}]` → `["key"]` |
| `venue_atmosphere` | Extract keys from `[{"key":true}]` → `["key"]` |
| `venue_category` | **No changes** (already works as JSON string) |

---

## 🎯 Transformations

### 1. venue_price (Currency Standardization)

**Current values:**
```
$, $$, $$$, $$$$
£, ££, £££, ££££
€, €€, €€€, €€€€
AED 100-150, AED 200+, etc.
null
```

**New standardized format (all in AED):**

| Original | Converted | Notes |
|----------|-----------|-------|
| `$` | `AED 100-200` | Base range |
| `$$` | `AED 200-300` | Linear scaling |
| `$$$` | `AED 300-400` | Linear scaling |
| `$$$$` | `AED 500+` | Premium |
| `£` | `AED 120-240` | 1 GBP ≈ 4.8 AED |
| `££` | `AED 240-360` | Scaled |
| `£££` | `AED 360-480` | Scaled |
| `££££` | `AED 600+` | Premium |
| `€` | `AED 100-200` | 1 EUR ≈ 4.0 AED |
| `€€` | `AED 200-300` | Scaled |
| `€€€` | `AED 300-400` | Scaled |
| `€€€€` | `AED 500+` | Premium |
| `AED 100-150` | `AED 100-150` | Keep as-is |
| `null` | `null` | No change |

---

### 2. venue_highlights (JSON Key Extraction)

**Before:**
```json
[{"Great dessert":true},{"Live music":true},{"Outdoor seating":true}]
```

**After:**
```json
["Great dessert","Live music","Outdoor seating"]
```

**Why:** Simpler format, boolean values were always `true`

---

### 3. venue_atmosphere (JSON Key Extraction)

**Before:**
```json
[{"Casual":true},{"Cosy":true},{"Upscale":true}]
```

**After:**
```json
["Casual","Cosy","Upscale"]
```

**Why:** Same as highlights - extract keys only

---

## 📋 Migration Steps

### Step 1: Backup Your Database

**CRITICAL: Do this BEFORE running the migration!**

#### Option A - Supabase Dashboard (Recommended)
1. Go to **Database** → **Backups**
2. Click **"Create Backup"**
3. Wait for completion (~5-10 minutes)
4. Verify backup exists before proceeding

#### Option B - pg_dump Command
```bash
# Replace with your Supabase credentials
pg_dump -h db.wmxokeidssynkjkjizqs.supabase.co \
  -U postgres \
  -d postgres \
  -t final_1 \
  > backup_final_1_$(date +%Y%m%d_%H%M%S).sql
```

#### Option C - Supabase CLI
```bash
supabase db dump -f backup_$(date +%Y%m%d_%H%M%S).sql
```

---

### Step 2: Open SQL Editor

1. Go to **Supabase Dashboard**
2. Click **SQL Editor** in left sidebar
3. Click **"+ New query"**

---

### Step 3: Copy Migration Script

1. Open `sql-migrations/direct-column-update.sql`
2. Copy **entire contents**
3. Paste into Supabase SQL Editor

---

### Step 4: Run the Script

1. Click **"Run"** button (or press `Ctrl+Enter`)
2. Script will:
   - Start a transaction (`BEGIN`)
   - Update `venue_price`
   - Update `venue_highlights`
   - Update `venue_atmosphere`
   - Show verification queries
   - **WAIT for you to COMMIT or ROLLBACK**

---

### Step 5: Verify Changes

**Review the output of these verification queries:**

#### Check 1: Price Distribution
```sql
-- Should show only AED formats
SELECT venue_price, COUNT(*) as count
FROM final_1
GROUP BY venue_price
ORDER BY count DESC;
```

✅ **Expected**: All values start with "AED" (except NULL)
❌ **Problem**: If you see `$`, `£`, `€` → Something went wrong

#### Check 2: Sample Records
```sql
SELECT
  venue_name_original,
  venue_price,
  venue_highlights,
  venue_atmosphere
FROM final_1
LIMIT 10;
```

✅ **Expected**:
- `venue_price`: "AED 100-200", "AED 300-400", etc.
- `venue_highlights`: `["Great dessert","Live music"]`
- `venue_atmosphere`: `["Casual","Trendy"]`

#### Check 3: Unconverted Prices
```sql
-- Should return EMPTY (or only NULL)
SELECT DISTINCT venue_price
FROM final_1
WHERE venue_price IS NOT NULL
  AND venue_price NOT LIKE 'AED%';
```

✅ **Expected**: No results (or empty)
❌ **Problem**: If any rows returned → ROLLBACK and investigate

---

### Step 6: Commit or Rollback

**If verification looks good:**
```sql
COMMIT;
```

**If you see any issues:**
```sql
ROLLBACK;
```

⚠️ **IMPORTANT**:
- Don't close the SQL Editor until you COMMIT or ROLLBACK
- After COMMIT, changes are permanent (only backup can undo)
- ROLLBACK only works if you haven't closed the transaction

---

### Step 7: Update Statistics (After COMMIT)

Run this to optimize query performance:
```sql
ANALYZE final_1;
```

---

## 🔄 Application Code Changes

### No Changes Needed!

Since we're keeping the same column names and JSON string format for most fields, your existing application code will continue to work:

```typescript
// venue_category - NO CHANGE (still JSON string)
const categories = JSON.parse(record.venue_category); // ✅ Still works

// venue_price - Already handled as string
const price = record.venue_price; // ✅ Just displays different values

// venue_highlights - Still JSON string, just simpler format
const highlights = JSON.parse(record.venue_highlights); // ✅ Still works

// venue_atmosphere - Same as highlights
const atmosphere = JSON.parse(record.venue_atmosphere); // ✅ Still works
```

---

## 🔍 Testing After Migration

### Test 1: Price Filtering
```sql
-- Find affordable venues
SELECT venue_name_original, venue_price
FROM final_1
WHERE venue_price IN ('AED 100-200', 'AED 200-300')
LIMIT 10;
```

### Test 2: Highlights Extraction
```sql
-- Parse highlights in query
SELECT
  venue_name_original,
  venue_highlights,
  json_array_length(venue_highlights::json) as num_highlights
FROM final_1
WHERE venue_highlights IS NOT NULL
LIMIT 10;
```

### Test 3: Application Integration
1. Open your application: http://localhost:3000
2. Test price filtering in UI
3. Verify venue details display correctly
4. Check that no errors appear in console

---

## 🔙 Rollback Instructions

### If You Haven't Committed Yet
```sql
ROLLBACK;
```
All changes will be undone immediately.

---

### If You Already Committed

Only option is to restore from backup:

#### Option A - Supabase Dashboard
1. Go to **Database** → **Backups**
2. Find your backup (created in Step 1)
3. Click **"Restore"**
4. Confirm restoration
5. Wait for completion

#### Option B - pg_restore Command
```bash
pg_restore -h db.wmxokeidssynkjkjizqs.supabase.co \
  -U postgres \
  -d postgres \
  --clean \
  backup_final_1_20251027_123456.sql
```

#### Option C - Supabase CLI
```bash
# Reset database (⚠️ removes ALL data)
supabase db reset

# Restore from backup
psql "$SUPABASE_DB_URL" < backup_20251027_123456.sql
```

---

## 📊 Expected Results

After successful migration:

### Prices
- ✅ All currencies converted to AED
- ✅ Consistent format: "AED X-Y" or "AED X+"
- ✅ Easy to filter and display

### Highlights & Atmosphere
- ✅ Simpler JSON format (array of strings)
- ✅ Ready for future UI features
- ✅ Smaller storage size

### Database Health
- ✅ All queries work as before
- ✅ No breaking changes to application
- ✅ Data standardized and clean

---

## ⚠️ Common Issues & Solutions

### Issue 1: "Syntax error near CASE"
**Cause**: SQL editor doesn't support multi-line statements
**Solution**: Run the script in parts, or use `psql` command line

### Issue 2: "Cannot convert to JSON"
**Cause**: Some records have malformed JSON
**Solution**: The script handles this with `ELSE` clause - keeps original value

### Issue 3: "Transaction still open"
**Cause**: Forgot to COMMIT or ROLLBACK
**Solution**:
```sql
-- Check transaction status
SELECT * FROM pg_stat_activity WHERE state = 'idle in transaction';

-- Then commit or rollback
COMMIT;  -- or ROLLBACK;
```

### Issue 4: Changes Not Visible in App
**Cause**: Application cache
**Solution**:
1. Clear browser cache
2. Restart Next.js dev server
3. Check API response in Network tab

---

## ✅ Pre-Flight Checklist

Before running migration:

- [ ] Database backup created and verified
- [ ] Tested on local/staging environment first
- [ ] SQL script reviewed and understood
- [ ] Application downtime scheduled (if needed)
- [ ] Team notified of migration
- [ ] Rollback plan prepared

During migration:

- [ ] Transaction started (BEGIN)
- [ ] Updates completed successfully
- [ ] Verification queries run
- [ ] All checks passed
- [ ] COMMIT executed

After migration:

- [ ] Statistics updated (ANALYZE)
- [ ] Application tested
- [ ] No errors in logs
- [ ] Team notified of completion
- [ ] Documentation updated

---

## 📞 Support

If you encounter issues:

1. **Don't panic** - If you haven't committed, just ROLLBACK
2. **Check Supabase logs** - Dashboard → Logs
3. **Verify backup exists** - Before attempting rollback
4. **Test queries** - Run verification queries manually
5. **Restore from backup** - Last resort if needed

---

## 📈 Performance Impact

**Expected performance:**
- ✅ Queries: No change (same columns, same types)
- ✅ Storage: Slightly reduced (simpler JSON)
- ✅ Indexes: No changes needed
- ✅ Application: No code changes required

**Migration time:**
- Small DB (<1K records): ~5 seconds
- Medium DB (1K-10K records): ~30 seconds
- Large DB (10K+ records): ~1-2 minutes

---

## 🎯 Success Criteria

Migration is successful when:

1. ✅ All prices in AED format
2. ✅ No unconverted currencies remain
3. ✅ Highlights/atmosphere in simple array format
4. ✅ Application works without errors
5. ✅ No data loss
6. ✅ Backup created and verified

---

**Last Updated**: 2025-10-27
**Version**: 2.0 (Direct Update)
**Author**: Dubai Events Platform Team

---

## 🔗 Related Files

- Migration Script: `sql-migrations/direct-column-update.sql`
- Original Documentation: `docs/BACKEND_API.md`
- API Routes: `src/app/api/*/route.ts`
