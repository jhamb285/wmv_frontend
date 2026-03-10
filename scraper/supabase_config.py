"""
Shared Supabase client configuration for all scrapers.

Requires environment variables (set via scraper/.env or system env):
  SUPABASE_URL              – Project API URL (e.g. https://xxxxx.supabase.co)
  SUPABASE_SERVICE_ROLE_KEY – Service role key (bypasses RLS)
"""

import os

# Load .env file from the scraper directory
try:
    from dotenv import load_dotenv
    load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))
except ImportError:
    pass  # dotenv not installed; fall back to system env vars

try:
    from supabase import create_client

    SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
    SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")

    if SUPABASE_URL and SUPABASE_KEY:
        supabase_client = create_client(SUPABASE_URL, SUPABASE_KEY)
        SUPABASE_AVAILABLE = True
    else:
        supabase_client = None
        SUPABASE_AVAILABLE = False
        if not SUPABASE_URL:
            print("[WARN] SUPABASE_URL not set.")
        if not SUPABASE_KEY:
            print("[WARN] SUPABASE_SERVICE_ROLE_KEY not set.")

except ImportError:
    supabase_client = None
    SUPABASE_AVAILABLE = False
    print("[WARN] supabase package not installed. Run: pip install supabase")
