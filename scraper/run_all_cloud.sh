#!/bin/bash
# WMV Scraper Orchestrator for Cloud Run Jobs
# Logs go to stdout (captured by Cloud Logging)

echo "========================================"
echo "  WMV Scraper Run: $(date)"
echo "========================================"

FAILED=0

for scraper in dubainight_scraper.py party_finder_scraper.py platinumlist_scraper.py; do
    echo ""
    echo "[START] $scraper at $(date)"
    if python3 "$scraper" 2>&1; then
        echo "[OK] $scraper completed at $(date)"
    else
        echo "[FAIL] $scraper failed at $(date)"
        FAILED=$((FAILED + 1))
    fi
done

echo ""
echo "========================================"
if [ $FAILED -gt 0 ]; then
    echo "[ERROR] $FAILED scraper(s) failed"
    exit 1
else
    echo "[OK] All scrapers completed successfully"
fi
echo "========================================"
