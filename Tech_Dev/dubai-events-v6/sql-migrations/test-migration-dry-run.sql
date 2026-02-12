-- =====================================================
-- DRY RUN TEST - Migration Verification
-- =====================================================
-- This script tests the migration logic WITHOUT making changes
-- Use this to verify the CASE logic before running the real migration
-- =====================================================

-- =====================================================
-- TEST 1: Verify venue_price CASE logic
-- =====================================================
-- This creates a test table with sample data and runs the conversion

CREATE TEMP TABLE test_venue_price (
  id SERIAL PRIMARY KEY,
  original_price TEXT,
  expected_price TEXT
);

INSERT INTO test_venue_price (original_price, expected_price) VALUES
  ('$', 'AED 100-200'),
  ('$$', 'AED 200-300'),
  ('$$$', 'AED 300-400'),
  ('$$$$', 'AED 500+'),
  ('£', 'AED 120-240'),
  ('££', 'AED 240-360'),
  ('£££', 'AED 360-480'),
  ('££££', 'AED 600+'),
  ('€', 'AED 100-200'),
  ('€€', 'AED 200-300'),
  ('€€€', 'AED 300-400'),
  ('€€€€', 'AED 500+'),
  ('AED 100-150', 'AED 100-150'),
  ('AED 200+', 'AED 200+'),
  (NULL, NULL);

-- Test the CASE logic
WITH converted AS (
  SELECT
    original_price,
    CASE
      WHEN original_price IS NULL THEN NULL
      WHEN original_price LIKE 'AED%' THEN original_price
      WHEN original_price = '$' THEN 'AED 100-200'
      WHEN original_price = '$$' THEN 'AED 200-300'
      WHEN original_price = '$$$' THEN 'AED 300-400'
      WHEN original_price = '$$$$' THEN 'AED 500+'
      WHEN original_price = '£' THEN 'AED 120-240'
      WHEN original_price = '££' THEN 'AED 240-360'
      WHEN original_price = '£££' THEN 'AED 360-480'
      WHEN original_price = '££££' THEN 'AED 600+'
      WHEN original_price = '€' THEN 'AED 100-200'
      WHEN original_price = '€€' THEN 'AED 200-300'
      WHEN original_price = '€€€' THEN 'AED 300-400'
      WHEN original_price = '€€€€' THEN 'AED 500+'
      ELSE original_price
    END as converted_price,
    expected_price
  FROM test_venue_price
)
SELECT
  original_price,
  converted_price,
  expected_price,
  CASE
    WHEN converted_price = expected_price THEN '✅ PASS'
    WHEN converted_price IS NULL AND expected_price IS NULL THEN '✅ PASS'
    ELSE '❌ FAIL'
  END as test_result
FROM converted;

-- All should show ✅ PASS

-- =====================================================
-- TEST 2: Verify JSON key extraction logic
-- =====================================================

CREATE TEMP TABLE test_json_extraction (
  id SERIAL PRIMARY KEY,
  original_json TEXT,
  expected_result TEXT
);

INSERT INTO test_json_extraction (original_json, expected_result) VALUES
  ('[{"Great dessert":true}]', '["Great dessert"]'),
  ('[{"Live music":true},{"Outdoor seating":true}]', '["Live music","Outdoor seating"]'),
  ('[]', '[]'),
  (NULL, NULL);

-- Test JSON extraction
WITH extracted AS (
  SELECT
    original_json,
    CASE
      WHEN original_json IS NULL OR original_json = '' THEN NULL
      WHEN original_json = '[]' THEN '[]'
      WHEN original_json::text LIKE '[%]' THEN
        (
          SELECT json_agg(key)::text
          FROM (
            SELECT json_object_keys(value::json) as key
            FROM json_array_elements(original_json::json)
          ) as keys
        )
      ELSE original_json
    END as extracted_json,
    expected_result
  FROM test_json_extraction
)
SELECT
  original_json,
  extracted_json,
  expected_result,
  CASE
    WHEN extracted_json = expected_result THEN '✅ PASS'
    WHEN extracted_json IS NULL AND expected_result IS NULL THEN '✅ PASS'
    ELSE '❌ FAIL'
  END as test_result
FROM extracted;

-- All should show ✅ PASS

-- =====================================================
-- TEST 3: Check actual data in final_1 (READ-ONLY)
-- =====================================================

-- Sample of current venue_price values
SELECT 'Current venue_price values:' as info;
SELECT DISTINCT venue_price, COUNT(*) as count
FROM final_1
GROUP BY venue_price
ORDER BY count DESC
LIMIT 20;

-- Sample of current venue_highlights
SELECT 'Current venue_highlights samples:' as info;
SELECT venue_highlights
FROM final_1
WHERE venue_highlights IS NOT NULL
LIMIT 5;

-- Sample of current venue_atmosphere
SELECT 'Current venue_atmosphere samples:' as info;
SELECT venue_atmosphere
FROM final_1
WHERE venue_atmosphere IS NOT NULL
LIMIT 5;

-- =====================================================
-- TEST 4: Preview what changes would be made
-- =====================================================

SELECT 'Preview of venue_price changes:' as info;
SELECT
  venue_price as current_value,
  CASE
    WHEN venue_price IS NULL THEN NULL
    WHEN venue_price LIKE 'AED%' THEN venue_price
    WHEN venue_price = '$' THEN 'AED 100-200'
    WHEN venue_price = '$$' THEN 'AED 200-300'
    WHEN venue_price = '$$$' THEN 'AED 300-400'
    WHEN venue_price = '$$$$' THEN 'AED 500+'
    WHEN venue_price = '£' THEN 'AED 120-240'
    WHEN venue_price = '££' THEN 'AED 240-360'
    WHEN venue_price = '£££' THEN 'AED 360-480'
    WHEN venue_price = '££££' THEN 'AED 600+'
    WHEN venue_price = '€' THEN 'AED 100-200'
    WHEN venue_price = '€€' THEN 'AED 200-300'
    WHEN venue_price = '€€€' THEN 'AED 300-400'
    WHEN venue_price = '€€€€' THEN 'AED 500+'
    ELSE venue_price
  END as new_value,
  COUNT(*) as affected_records
FROM final_1
GROUP BY venue_price
ORDER BY affected_records DESC;

-- =====================================================
-- SUMMARY
-- =====================================================

SELECT 'DRY RUN COMPLETE - Review results above' as summary;
SELECT 'If all tests show ✅ PASS, you can run the real migration' as next_step;

-- =====================================================
-- NOTES:
-- =====================================================
-- 1. This script does NOT modify any data in final_1
-- 2. It creates temporary test tables to verify logic
-- 3. Run this BEFORE running direct-column-update.sql
-- 4. All test tables are automatically dropped when session ends
-- 5. If any tests show ❌ FAIL, DO NOT run the migration
