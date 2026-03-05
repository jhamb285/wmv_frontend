#!/bin/bash
# WMV Scraper Orchestrator - runs all 3 scrapers sequentially with logging

LOG_DIR="$HOME/wmv-scraper/logs"
mkdir -p "$LOG_DIR"
LOGFILE="$LOG_DIR/scrape_$(date +%Y%m%d_%H%M%S).log"

cd ~/wmv-scraper
source venv/bin/activate

echo "========================================" | tee -a "$LOGFILE"
echo "  WMV Scraper Run: $(date)" | tee -a "$LOGFILE"
echo "========================================" | tee -a "$LOGFILE"

FAILED=0

for scraper in dubainight_scraper.py party_finder_scraper.py platinumlist_scraper.py; do
    echo "" | tee -a "$LOGFILE"
    echo "[START] $scraper at $(date)" | tee -a "$LOGFILE"
    if python3 "$scraper" >> "$LOGFILE" 2>&1; then
        echo "[OK] $scraper completed at $(date)" | tee -a "$LOGFILE"
    else
        echo "[FAIL] $scraper failed at $(date)" | tee -a "$LOGFILE"
        FAILED=$((FAILED + 1))
    fi
done

echo "" | tee -a "$LOGFILE"
echo "========================================" | tee -a "$LOGFILE"
if [ $FAILED -gt 0 ]; then
    echo "[ERROR] $FAILED scraper(s) failed" | tee -a "$LOGFILE"
else
    echo "[OK] All scrapers completed successfully" | tee -a "$LOGFILE"
fi
echo "========================================" | tee -a "$LOGFILE"

# Clean up logs older than 7 days
find "$LOG_DIR" -name "scrape_*.log" -mtime +7 -delete
