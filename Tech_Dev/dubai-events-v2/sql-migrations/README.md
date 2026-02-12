# SQL Migrations

This folder contains database migration scripts for the Dubai Events Platform.

## 📁 Files

### 1. **direct-column-update.sql** ⭐ Main Migration Script
- Updates 3 columns in `final_1` table (in-place)
- Standardizes all currencies to AED
- Extracts JSON keys from highlights/atmosphere
- **MUST backup database before running!**

### 2. **MIGRATION_GUIDE_DIRECT.md** 📖 Complete Guide
- Step-by-step instructions
- Verification procedures
- Rollback instructions
- Troubleshooting tips

### 3. **test-migration-dry-run.sql** 🧪 Test Script
- Runs migration logic WITHOUT making changes
- Verifies CASE logic correctness
- Shows preview of changes
- **Run this FIRST before the real migration!**

---

## 🚀 Quick Start

### Step 1: Backup (CRITICAL!)
```bash
# Supabase Dashboard → Database → Backups → Create Backup
# OR use pg_dump or Supabase CLI
```

### Step 2: Test First (Recommended)
```sql
-- Run in Supabase SQL Editor
-- Open: test-migration-dry-run.sql
-- Verify all tests show ✅ PASS
```

### Step 3: Run Migration
```sql
-- Run in Supabase SQL Editor
-- Open: direct-column-update.sql
-- Follow prompts, verify results, then COMMIT
```

### Step 4: Verify
```sql
-- Check results in application
-- Run verification queries
ANALYZE final_1;
```

---

## 📊 What Gets Changed

| Column | Before | After |
|--------|--------|-------|
| `venue_price` | `$`, `$$`, `£`, `€` | `AED 100-200`, `AED 200-300`, etc. |
| `venue_highlights` | `[{"key":true}]` | `["key"]` |
| `venue_atmosphere` | `[{"key":true}]` | `["key"]` |
| `venue_category` | **No changes** | Same (JSON string) |

---

## ⚠️ Important Notes

1. **Backup is mandatory** - No automatic rollback after COMMIT
2. **Test first** - Run dry-run script to verify logic
3. **Transaction-based** - Can ROLLBACK before COMMIT
4. **In-place updates** - No temporary columns
5. **No app changes needed** - Same column names, compatible formats

---

## 🔄 Migration Flow

```
1. CREATE BACKUP
   ↓
2. RUN test-migration-dry-run.sql (verify ✅)
   ↓
3. RUN direct-column-update.sql
   ↓
4. VERIFY results (check queries)
   ↓
5. COMMIT (if good) or ROLLBACK (if issues)
   ↓
6. ANALYZE final_1 (update statistics)
   ↓
7. TEST application
```

---

## 📞 Need Help?

- Read: `MIGRATION_GUIDE_DIRECT.md`
- Check Supabase logs: Dashboard → Logs
- Verify backup exists before proceeding
- Test on staging/local first

---

**Last Updated**: 2025-10-27
