-- =====================================================
-- Direct Column Update Migration Script
-- Dubai Events Platform V2
-- =====================================================
-- ⚠️ WARNING: This script directly updates columns in-place
-- MUST backup database before running!
-- =====================================================
-- Updates 3 columns in final_1 table:
-- 1. venue_price: Standardize all currencies to AED
-- 2. venue_highlights: Extract keys from JSON objects
-- 3. venue_atmosphere: Extract keys from JSON objects
-- (venue_category: No changes - already works as JSON string)
-- =====================================================

-- =====================================================
-- BACKUP INSTRUCTIONS - RUN BEFORE THIS SCRIPT!
-- =====================================================
/*
Option 1 - Supabase Dashboard:
1. Go to Database → Backups
2. Click "Create Backup"
3. Wait for completion

Option 2 - pg_dump command:
pg_dump -h db.wmxokeidssynkjkjizqs.supabase.co \
  -U postgres \
  -d postgres \
  -t final_1 \
  > backup_final_1_$(date +%Y%m%d_%H%M%S).sql

Option 3 - Supabase CLI:
supabase db dump -f backup_$(date +%Y%m%d_%H%M%S).sql
*/

-- =====================================================
-- START TRANSACTION
-- =====================================================
-- This allows you to ROLLBACK if something goes wrong
-- Do NOT commit until you verify the changes!

BEGIN;

-- =====================================================
-- STEP 1: Update venue_price (Standardize to AED)
-- =====================================================
-- Convert all currencies to AED with linear scaling:
-- $ → AED 100-200, $$ → AED 200-300, $$$ → AED 300-400, $$$$ → AED 500+
-- £ → AED 120-240, ££ → AED 240-360, £££ → AED 360-480, ££££ → AED 600+
-- € → AED 100-200, €€ → AED 200-300, €€€ → AED 300-400, €€€€ → AED 500+

UPDATE final_1
SET venue_price = CASE
  -- Handle NULL
  WHEN venue_price IS NULL THEN NULL

  -- Already in AED format - keep as-is
  WHEN venue_price LIKE 'AED%' THEN venue_price

  -- Convert dollar signs to AED (linear scaling)
  WHEN venue_price = '$' THEN 'AED 100-200'
  WHEN venue_price = '$$' THEN 'AED 200-300'
  WHEN venue_price = '$$$' THEN 'AED 300-400'
  WHEN venue_price = '$$$$' THEN 'AED 500+'

  -- Convert pound signs to AED (£1 ≈ 4.8 AED, scaled proportionally)
  WHEN venue_price = '£' THEN 'AED 120-240'
  WHEN venue_price = '££' THEN 'AED 240-360'
  WHEN venue_price = '£££' THEN 'AED 360-480'
  WHEN venue_price = '££££' THEN 'AED 600+'

  -- Convert euro signs to AED (€1 ≈ 4.0 AED, scaled proportionally)
  WHEN venue_price = '€' THEN 'AED 100-200'
  WHEN venue_price = '€€' THEN 'AED 200-300'
  WHEN venue_price = '€€€' THEN 'AED 300-400'
  WHEN venue_price = '€€€€' THEN 'AED 500+'

  -- Default: keep original if unrecognized
  ELSE venue_price
END;

-- Verify venue_price update
SELECT 'venue_price update completed' as step;
SELECT venue_price, COUNT(*) as count
FROM final_1
WHERE venue_price IS NOT NULL
GROUP BY venue_price
ORDER BY count DESC;


-- =====================================================
-- STEP 2: Update venue_highlights (Extract keys from JSON)
-- =====================================================
-- Current: [{"Great dessert":true},{"Live music":true}]
-- New: ["Great dessert","Live music"]

UPDATE final_1
SET venue_highlights = CASE
  WHEN venue_highlights IS NULL OR venue_highlights = '' THEN NULL
  WHEN venue_highlights = '[]' THEN '[]'
  WHEN venue_highlights::text LIKE '[%]' THEN
    -- Extract keys from JSON array of objects and create new JSON array of strings
    (
      SELECT json_agg(key)::text
      FROM (
        SELECT json_object_keys(value::json) as key
        FROM json_array_elements(venue_highlights::json)
      ) as keys
    )
  ELSE venue_highlights
END;

-- Verify venue_highlights update
SELECT 'venue_highlights update completed' as step;
SELECT venue_highlights
FROM final_1
WHERE venue_highlights IS NOT NULL AND venue_highlights != '[]'
LIMIT 10;


-- =====================================================
-- STEP 3: Update venue_atmosphere (Extract keys from JSON)
-- =====================================================
-- Current: [{"Casual":true},{"Cosy":true}]
-- New: ["Casual","Cosy"]

UPDATE final_1
SET venue_atmosphere = CASE
  WHEN venue_atmosphere IS NULL OR venue_atmosphere = '' THEN NULL
  WHEN venue_atmosphere = '[]' THEN '[]'
  WHEN venue_atmosphere::text LIKE '[%]' THEN
    -- Extract keys from JSON array of objects and create new JSON array of strings
    (
      SELECT json_agg(key)::text
      FROM (
        SELECT json_object_keys(value::json) as key
        FROM json_array_elements(venue_atmosphere::json)
      ) as keys
    )
  ELSE venue_atmosphere
END;

-- Verify venue_atmosphere update
SELECT 'venue_atmosphere update completed' as step;
SELECT venue_atmosphere
FROM final_1
WHERE venue_atmosphere IS NOT NULL AND venue_atmosphere != '[]'
LIMIT 10;


-- =====================================================
-- FINAL VERIFICATION QUERIES
-- =====================================================
-- Run these to verify all changes before COMMIT

-- 1. Check venue_price distribution
SELECT 'Final venue_price distribution:' as info;
SELECT venue_price, COUNT(*) as count
FROM final_1
GROUP BY venue_price
ORDER BY count DESC;

-- 2. Sample records with all updated columns
SELECT 'Sample of updated records:' as info;
SELECT
  venue_name_original,
  venue_price,
  venue_highlights,
  venue_atmosphere
FROM final_1
WHERE venue_price IS NOT NULL OR venue_highlights IS NOT NULL
LIMIT 10;

-- 3. Count of affected records
SELECT 'Record counts:' as info;
SELECT
  COUNT(*) as total_records,
  COUNT(venue_price) as records_with_price,
  COUNT(CASE WHEN venue_price LIKE 'AED%' THEN 1 END) as prices_in_aed,
  COUNT(venue_highlights) as records_with_highlights,
  COUNT(venue_atmosphere) as records_with_atmosphere
FROM final_1;

-- 4. Check for any unconverted prices
SELECT 'Prices NOT in AED format (should be empty or NULL):' as info;
SELECT DISTINCT venue_price
FROM final_1
WHERE venue_price IS NOT NULL
  AND venue_price NOT LIKE 'AED%'
ORDER BY venue_price;


-- =====================================================
-- COMMIT OR ROLLBACK
-- =====================================================
-- ⚠️ IMPORTANT: Review the verification queries above!
--
-- If everything looks good:
--   COMMIT;
--
-- If you see issues:
--   ROLLBACK;
--
-- DO NOT CLOSE THIS WINDOW UNTIL YOU COMMIT OR ROLLBACK!
-- =====================================================

-- Uncomment ONE of these after verification:

-- COMMIT;    -- ✅ Apply changes permanently
-- ROLLBACK;  -- ❌ Undo all changes


-- =====================================================
-- POST-MIGRATION: Update statistics
-- =====================================================
-- Run this AFTER commit to update query planner statistics

-- ANALYZE final_1;


-- =====================================================
-- ROLLBACK INSTRUCTIONS (if you committed but need to undo)
-- =====================================================
/*
If you already committed and need to rollback:

1. Restore from backup:
   pg_restore -h your-host -U your-user -d your-db backup_file.sql

2. Or using Supabase Dashboard:
   Database → Backups → Click "Restore" on your backup

3. Or using Supabase CLI:
   supabase db reset
   # Then re-import your backup
*/


-- =====================================================
-- TESTING QUERIES (after migration)
-- =====================================================
/*
-- Test venue_price filtering
SELECT venue_name_original, venue_price
FROM final_1
WHERE venue_price IN ('AED 100-200', 'AED 200-300')
LIMIT 10;

-- Test highlights (if using JSON parsing in app)
SELECT venue_name_original,
       venue_highlights,
       json_array_length(venue_highlights::json) as num_highlights
FROM final_1
WHERE venue_highlights IS NOT NULL AND venue_highlights != '[]'
LIMIT 10;

-- Test atmosphere
SELECT venue_name_original,
       venue_atmosphere,
       json_array_length(venue_atmosphere::json) as num_atmospheres
FROM final_1
WHERE venue_atmosphere IS NOT NULL AND venue_atmosphere != '[]'
LIMIT 10;
*/


-- =====================================================
-- NOTES:
-- =====================================================
-- 1. This script updates columns IN-PLACE (no temporary columns)
-- 2. Changes are wrapped in a transaction for safety
-- 3. MUST backup database before running
-- 4. Verify all changes before COMMIT
-- 5. Can ROLLBACK if issues found before COMMIT
-- 6. After COMMIT, only way to undo is restore from backup
-- 7. venue_category is NOT modified (already works as JSON string)
-- 8. venue_highlights and venue_atmosphere are converted to JSON arrays of strings
-- 9. All prices are standardized to AED format
-- 10. Run ANALYZE after COMMIT to update statistics
