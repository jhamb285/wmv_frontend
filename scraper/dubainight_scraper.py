"""
dubainight.com Scraper
Scrapes event data from dubainight.com/events and writes to Google Sheets (Sheet 3).

Strategy:
  - Site is Next.js SSG → event data embedded in __NEXT_DATA__ JSON
  - Apollo Client GraphQL cache with normalized objects
  - Paginated listing (12 events per page)
  - Detail pages at /events/[slug] for full descriptions
  - No Cloudflare/CAPTCHA but uses Selenium for JS-rendered pages

Columns: instagram_id, event_date, event_time, event_name, event_category,
         context, venue_name, venue_area

Requirements:
  pip install selenium beautifulsoup4 gspread google-auth webdriver-manager
"""

import time
import re
import os
import json
import html as html_mod
from datetime import datetime, timedelta

import requests as http_requests  # renamed to avoid clash with selenium

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup

try:
    import gspread
    from google.oauth2.service_account import Credentials
    GSPREAD_AVAILABLE = True
except ImportError:
    GSPREAD_AVAILABLE = False
    print("[WARN] gspread/google-auth not installed. Will save to CSV instead.")


# ─── Configuration ───────────────────────────────────────────────────────────

BASE_URL = "https://dubainight.com"
EVENTS_URL = "https://dubainight.com/events"

# Google Sheet settings
SPREADSHEET_ID = "1YeK9fckZlOr3gggwfqV8UHTDP3S0sg-tSD-wz_CXiJw"
SHEET_GID = 1036792483  # Sheet 3

# Path to Google Service Account credentials JSON
CREDENTIALS_PATH = os.path.join(os.path.dirname(__file__), "credentials.json")

# Column headers (matches party_finder scraper format)
HEADERS = [
    "instagram_id",      # venue slug / identifier (e.g., "club-iris")
    "event_date",        # yyyy/mm/dd
    "event_time",        # occurrence time (Night, Afternoon, etc.)
    "event_name",
    "event_category",    # Party, Ladies Night, Pool Party, etc.
    "context",           # full page text content
    "venue_name",
    "venue_area",
    "scraped_date",      # timestamp when this event was scraped
]

# Max pages to scrape (None = all pages until empty)
MAX_PAGES = None

# Delay between requests (seconds)
REQUEST_DELAY = 1.5

# ─── GraphQL API Configuration ──────────────────────────────────────────────

# Will be discovered at runtime via CDP or fallback probing
GRAPHQL_ENDPOINT = None

# Date range: scrape today + next N days of future events
SCAN_DAYS_AHEAD = 30

# Events per page for GraphQL pagination (browser uses 20)
EVENTS_PER_PAGE = 20

# Maximum pages to try per date-range query
MAX_GRAPHQL_PAGES = 50

# Delay between GraphQL requests (seconds)
GRAPHQL_REQUEST_DELAY = 0.5

# The GraphQL query extracted from DubaiNight's JS bundle
GRAPHQL_QUERY_TEXT = """
query WebQueryPaginateEvents(
  $pageNumber: Int!
  $perPage: Int!
  $occurrence: String
  $eventFromDate: DateTime
  $withPhotos: Boolean
  $featured: Boolean
  $eventToDate: DateTime
  $venueId: ID
  $areaId: ID
  $name: String
  $eventTypeIds: [ID!]
  $order: EventOrder!
  $venueTypeId: ID
) {
  p_Events: pagination(pageNumber: $pageNumber, perPage: $perPage) {
    eventFilters(
      occurrence: $occurrence
      from: $eventFromDate
      to: $eventToDate
      order: $order
      withPhotos: $withPhotos
      venueId: $venueId
      areaId: $areaId
      name: $name
      featured: $featured
      eventTypeIds: $eventTypeIds
      venueTypeId: $venueTypeId
    ) {
      ...EventFilterFragment
      __typename
    }
    __typename
  }
}

fragment EventFilterFragment on EventByDate {
  eDate
  eventDates {
    id
    eDate
    enabled
    photographer
    eventParent {
      id
      occurrenceTime
      slug
      venue {
        id
        name
        latitude
        longitude
        slug
        __typename
      }
      genres {
        id
        name
        __typename
      }
      eventTypes {
        id
        name
        color
        __typename
      }
      __typename
    }
    event {
      id
      name
      photographer
      poster { id url __typename }
      video { id url __typename }
      __typename
    }
    __typename
  }
  __typename
}
"""


# ─── Browser Setup ───────────────────────────────────────────────────────────

def create_driver(enable_perf_logging=False):
    """Create a headless Chrome browser with anti-detection flags."""
    chrome_options = Options()
    chrome_options.add_argument("--headless=new")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--disable-extensions")
    chrome_options.add_argument("--disable-infobars")
    chrome_options.add_argument("--disable-notifications")
    chrome_options.add_argument("--disable-popup-blocking")
    chrome_options.add_argument("--ignore-certificate-errors")
    chrome_options.add_argument("--window-size=1920,1080")
    chrome_options.add_argument(
        "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
    )
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option("useAutomationExtension", False)
    chrome_options.page_load_strategy = "eager"

    if enable_perf_logging:
        chrome_options.set_capability("goog:loggingPrefs", {"performance": "ALL"})

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    driver.set_page_load_timeout(60)

    # Hide Selenium's webdriver property
    driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
        "source": "Object.defineProperty(navigator, 'webdriver', {get: () => undefined})"
    })

    return driver


# ─── GraphQL API Discovery ──────────────────────────────────────────────────

def discover_graphql_endpoint(driver):
    """
    Discover the GraphQL API endpoint using multiple strategies:
    1. CDP performance logs (captures actual browser network traffic)
    2. JS injection (find Apollo Client instance)
    3. Endpoint probing (try known URL patterns)

    Returns: (endpoint_url, headers_dict) or (None, {})
    """
    print("\n  Discovering GraphQL API endpoint...")

    # Strategy 1: Performance logs
    endpoint, headers = _discover_via_perf_logs(driver)
    if endpoint:
        return endpoint, headers

    # Strategy 2: JS injection
    endpoint, headers = _discover_via_js_injection(driver)
    if endpoint:
        return endpoint, headers

    # Strategy 3: Probe known endpoints
    endpoint, headers = _discover_via_probing()
    if endpoint:
        return endpoint, headers

    print("  [WARN] Could not discover GraphQL endpoint.")
    return None, {}


def _discover_via_perf_logs(driver):
    """Analyze Chrome performance logs to find GraphQL API calls."""
    print("    [1/3] Checking performance logs...")
    try:
        driver.get(EVENTS_URL)
        time.sleep(5)

        logs = driver.get_log("performance")
        for entry in logs:
            try:
                log = json.loads(entry["message"])
                message = log.get("message", {})
                if message.get("method") != "Network.requestWillBeSent":
                    continue
                request = message.get("params", {}).get("request", {})
                url = request.get("url", "")
                method = request.get("method", "")
                # Skip OPTIONS preflight — only capture actual POST requests
                if method != "POST":
                    continue
                if any(kw in url.lower() for kw in ["graphql", "api.dubainight"]):
                    headers = request.get("headers", {})
                    # Clean headers: remove non-forwardable ones
                    clean = {k: v for k, v in headers.items()
                             if k.lower() not in ("host", "content-length", "accept-encoding")}
                    print(f"    Found endpoint: {url}")
                    print(f"    Headers: {list(clean.keys())}")
                    return url, clean
            except Exception:
                continue
    except Exception as e:
        print(f"    [WARN] Perf logs failed: {e}")

    return None, {}


def _discover_via_js_injection(driver):
    """Try to find Apollo Client URI via browser JavaScript."""
    print("    [2/3] Trying JS injection...")
    try:
        result = driver.execute_script("""
            // Check for Apollo Client instance
            if (window.__APOLLO_CLIENT__) {
                var link = window.__APOLLO_CLIENT__.link;
                if (link && link.options && link.options.uri) {
                    return link.options.uri;
                }
            }
            // Check Next.js runtime config
            if (window.__NEXT_DATA__ && window.__NEXT_DATA__.runtimeConfig) {
                var config = window.__NEXT_DATA__.runtimeConfig;
                for (var key in config) {
                    var val = config[key];
                    if (typeof val === 'string' && (val.includes('graphql') || val.includes('api.'))) {
                        return val;
                    }
                }
            }
            return null;
        """)
        if result:
            print(f"    Found endpoint via JS: {result}")
            return result, {}
    except Exception as e:
        print(f"    [WARN] JS injection failed: {e}")

    return None, {}


def _discover_via_probing():
    """Try known endpoint patterns with a test query."""
    print("    [3/3] Probing known endpoints...")
    today = datetime.now().strftime("%Y-%m-%d")
    test_payload = {
        "operationName": "WebQueryPaginateEvents",
        "variables": {
            "pageNumber": 1,
            "perPage": 1,
            "order": "DATE_ASC",
            "eventFromDate": today,
        },
        "query": GRAPHQL_QUERY_TEXT,
    }
    test_headers = {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Origin": "https://dubainight.com",
        "Referer": "https://dubainight.com/",
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
        ),
        "x-source-region": "region_dubai",
    }
    candidates = [
        "https://api.dubainight.com/graphql",
        "https://api.dubainight.com/",
        "https://api.dubainight.com",
        "https://dubainight.com/api/graphql",
    ]
    for url in candidates:
        try:
            resp = http_requests.post(url, json=test_payload, headers=test_headers, timeout=15)
            if resp.status_code == 200:
                data = resp.json()
                if "data" in data:
                    print(f"    Found working endpoint: {url}")
                    return url, {}
        except Exception:
            continue

    return None, {}


# ─── __NEXT_DATA__ Parsing ───────────────────────────────────────────────────

def extract_next_data(driver):
    """Extract and parse __NEXT_DATA__ JSON from the current page."""
    try:
        script_el = driver.find_element(By.ID, "__NEXT_DATA__")
        if script_el:
            raw = script_el.get_attribute("textContent") or script_el.get_attribute("innerHTML")
            if raw:
                return json.loads(raw)
    except Exception:
        pass

    # Fallback: parse from page source
    try:
        soup = BeautifulSoup(driver.page_source, "html.parser")
        script = soup.find("script", id="__NEXT_DATA__")
        if script and script.string:
            return json.loads(script.string)
    except Exception:
        pass

    return None


def parse_apollo_cache(next_data):
    """
    Parse the Apollo Client cache from __NEXT_DATA__ to extract events.

    The cache stores normalized objects by typename:
      - Event:{id}         → name, poster
      - EventDate:{id}     → eDate, event ref, eventParent ref
      - EventParent:{id}   → slug, venue ref, genres, eventTypes, occurrenceTime
      - Venue:{id}         → name, latitude, longitude, slug
      - Genre:{id}         → name
      - EventType:{id}     → name
    """
    if not next_data:
        return []

    # Navigate to the Apollo cache
    cache = None
    try:
        props = next_data.get("props", {}).get("pageProps", {})
        # The cache may be nested under different keys
        cache = props.get("cache", {})
        if not cache:
            # Try Apollo state
            apollo = next_data.get("props", {}).get("__APOLLO_STATE__", {})
            if apollo:
                cache = apollo
    except Exception:
        return []

    if not cache:
        return []

    # Index all objects by their cache key
    events_map = {}      # Event:{id} → data
    event_dates = {}     # EventDate:{id} → data
    event_parents = {}   # EventParent:{id} → data
    venues = {}          # Venue:{id} → data
    genres = {}          # Genre:{id} → name
    event_types = {}     # EventType:{id} → name

    for key, val in cache.items():
        if not isinstance(val, dict):
            continue
        typename = val.get("__typename", "")

        if typename == "Event" or key.startswith("Event:"):
            events_map[key] = val
        elif typename == "EventDate" or key.startswith("EventDate:"):
            event_dates[key] = val
        elif typename == "EventParent" or key.startswith("EventParent:"):
            event_parents[key] = val
        elif typename == "Venue" or key.startswith("Venue:"):
            venues[key] = val
        elif typename == "Genre" or key.startswith("Genre:"):
            genres[key] = val.get("name", "")
        elif typename == "EventType" or key.startswith("EventType:"):
            event_types[key] = val.get("name", "")

    # Build event list by iterating EventDate objects
    results = []
    seen_slugs = set()

    for ed_key, ed_val in event_dates.items():
        e_date = ed_val.get("eDate", "")

        # Resolve event reference
        event_ref = ed_val.get("event", {})
        if isinstance(event_ref, dict) and "__ref" in event_ref:
            event_ref = events_map.get(event_ref["__ref"], {})
        elif isinstance(event_ref, str):
            event_ref = events_map.get(event_ref, {})

        # Resolve eventParent reference
        ep_ref = ed_val.get("eventParent", {})
        if isinstance(ep_ref, dict) and "__ref" in ep_ref:
            ep_ref = event_parents.get(ep_ref["__ref"], {})
        elif isinstance(ep_ref, str):
            ep_ref = event_parents.get(ep_ref, {})

        # Also check event's eventParent if not on EventDate
        if not ep_ref or not isinstance(ep_ref, dict) or not ep_ref.get("slug"):
            ep_from_event = event_ref.get("eventParent", {}) if isinstance(event_ref, dict) else {}
            if isinstance(ep_from_event, dict) and "__ref" in ep_from_event:
                ep_ref = event_parents.get(ep_from_event["__ref"], {})

        if not isinstance(ep_ref, dict):
            ep_ref = {}

        slug = ep_ref.get("slug", "")

        # Resolve venue
        venue_ref = ep_ref.get("venue", {})
        if isinstance(venue_ref, dict) and "__ref" in venue_ref:
            venue_ref = venues.get(venue_ref["__ref"], {})
        elif isinstance(venue_ref, str):
            venue_ref = venues.get(venue_ref, {})
        if not isinstance(venue_ref, dict):
            venue_ref = {}

        # Resolve genres
        genre_list = ep_ref.get("genres", [])
        genre_names = []
        if isinstance(genre_list, list):
            for g in genre_list:
                if isinstance(g, dict) and "__ref" in g:
                    name = genres.get(g["__ref"], "")
                    if name:
                        genre_names.append(name)
                elif isinstance(g, dict):
                    name = g.get("name", "")
                    if name:
                        genre_names.append(name)

        # Resolve event types
        type_list = ep_ref.get("eventTypes", [])
        type_names = []
        if isinstance(type_list, list):
            for t in type_list:
                if isinstance(t, dict) and "__ref" in t:
                    name = event_types.get(t["__ref"], "")
                    if name:
                        type_names.append(name)
                elif isinstance(t, dict):
                    name = t.get("name", "")
                    if name:
                        type_names.append(name)

        # Event name
        event_name = ""
        if isinstance(event_ref, dict):
            event_name = event_ref.get("name", "")
        if not event_name and ep_ref:
            event_name = ep_ref.get("name", slug.replace("-", " ").title())

        # Occurrence time
        occurrence = ep_ref.get("occurrenceTime", "")

        # Venue data
        venue_name = venue_ref.get("name", "")
        venue_slug = venue_ref.get("slug", "")
        venue_lat = str(venue_ref.get("latitude", "")) if venue_ref.get("latitude") else ""
        venue_lng = str(venue_ref.get("longitude", "")) if venue_ref.get("longitude") else ""

        # Dedup key: slug + date (same event can appear on different dates)
        dedup_key = f"{slug}|{e_date}"
        if dedup_key in seen_slugs:
            continue
        seen_slugs.add(dedup_key)

        # Format date
        event_date = ""
        if e_date:
            try:
                dt = datetime.strptime(e_date[:10], "%Y-%m-%d")
                event_date = dt.strftime("%Y/%m/%d")
            except ValueError:
                event_date = e_date

        # Derive venue area from coordinates
        venue_area = _area_from_coords(venue_lat, venue_lng, venue_name)

        ev = {
            "instagram_id": venue_slug or slug,
            "event_name": event_name,
            "event_date": event_date,
            "event_time": occurrence,
            "event_category": ", ".join(type_names) if type_names else "",
            "venue_name": venue_name,
            "venue_area": venue_area,
            "context": "",
            "detail_url": f"{BASE_URL}/events/{e_date[:10]}/{slug}" if slug and e_date else "",
            "slug": slug,
        }
        results.append(ev)

    return results


# ─── Area Mapping from Coordinates ───────────────────────────────────────────

# Known Dubai venue areas with approximate center coordinates
_DUBAI_AREAS = [
    ("Downtown Dubai",       25.1972, 55.2744, 2.0),
    ("Dubai Marina",         25.0800, 55.1400, 2.0),
    ("JBR",                  25.0780, 55.1330, 1.0),
    ("Palm Jumeirah",        25.1124, 55.1390, 2.5),
    ("DIFC",                 25.2100, 55.2800, 1.0),
    ("Business Bay",         25.1860, 55.2625, 1.5),
    ("Jumeirah",             25.2100, 55.2500, 2.0),
    ("Al Barsha",            25.1130, 55.2000, 2.0),
    ("Deira",                25.2700, 55.3300, 2.0),
    ("Meydan",               25.1600, 55.3050, 2.0),
    ("Al Quoz",              25.1400, 55.2300, 1.5),
    ("City Walk",            25.2060, 55.2600, 1.0),
    ("La Mer",               25.2310, 55.2630, 1.0),
    ("Bluewaters Island",    25.0790, 55.1200, 1.0),
    ("Al Habtoor City",      25.1870, 55.2430, 1.0),
    ("Expo City",            24.9600, 55.1500, 2.0),
    ("Dubai Festival City",  25.2240, 55.3530, 1.5),
    ("Madinat Jumeirah",     25.1320, 55.1850, 1.0),
    ("Jebel Ali",            25.0200, 55.0700, 3.0),
    ("Dubai Hills",          25.1280, 55.2400, 2.0),
    ("Sheikh Zayed Road",    25.1850, 55.2600, 1.5),
    ("Umm Suqeim",           25.1500, 55.2050, 2.0),
    ("World Trade Centre",   25.2280, 55.2870, 1.0),
]


def _area_from_coords(lat_str, lng_str, venue_name=""):
    """Derive Dubai area name from coordinates or venue name."""
    # Try venue name keywords first
    if venue_name:
        name_lower = venue_name.lower()
        area_keywords = {
            "marina": "Dubai Marina",
            "jbr": "JBR",
            "palm": "Palm Jumeirah",
            "atlantis": "Palm Jumeirah",
            "difc": "DIFC",
            "downtown": "Downtown Dubai",
            "city walk": "City Walk",
            "la mer": "La Mer",
            "bluewaters": "Bluewaters Island",
            "meydan": "Meydan",
            "soho garden": "Meydan",
            "habtoor": "Al Habtoor City",
            "madinat": "Madinat Jumeirah",
            "expo": "Expo City",
            "barasti": "Dubai Marina",
            "zero gravity": "Dubai Marina",
        }
        for keyword, area in area_keywords.items():
            if keyword in name_lower:
                return area

    # Fall back to coordinate distance
    if not lat_str or not lng_str:
        return ""

    try:
        lat = float(lat_str)
        lng = float(lng_str)
    except (ValueError, TypeError):
        return ""

    best_area = ""
    best_dist = float("inf")

    for area_name, area_lat, area_lng, radius_km in _DUBAI_AREAS:
        # Simple Euclidean distance (good enough for small Dubai area)
        dist = ((lat - area_lat) ** 2 + (lng - area_lng) ** 2) ** 0.5
        dist_km = dist * 111  # rough conversion degrees to km
        if dist_km < radius_km and dist < best_dist:
            best_dist = dist
            best_area = area_name

    return best_area if best_area else "Dubai"


# ─── GraphQL API Scraping ───────────────────────────────────────────────────

def parse_graphql_response(events_by_date):
    """
    Parse the direct GraphQL eventFilters response into event dicts.

    The response is already denormalized (no __ref resolution needed),
    making this much simpler than parse_apollo_cache().
    """
    results = []
    seen_slugs = set()

    for date_group in events_by_date:
        group_date = date_group.get("eDate", "")
        event_dates = date_group.get("eventDates", [])

        for ed in event_dates:
            e_date = ed.get("eDate", group_date)

            # Event data
            event_obj = ed.get("event") or {}
            event_name = event_obj.get("name", "")

            # EventParent data
            ep = ed.get("eventParent") or {}
            slug = ep.get("slug", "")
            occurrence = ep.get("occurrenceTime", "")

            # Venue data
            venue = ep.get("venue") or {}
            venue_name = venue.get("name", "")
            venue_slug = venue.get("slug", "")
            venue_lat = str(venue.get("latitude", "")) if venue.get("latitude") else ""
            venue_lng = str(venue.get("longitude", "")) if venue.get("longitude") else ""

            # Genres
            genre_names = [g.get("name", "") for g in (ep.get("genres") or []) if g.get("name")]

            # Event types
            type_names = [t.get("name", "") for t in (ep.get("eventTypes") or []) if t.get("name")]

            # Dedup within this response
            dedup_key = f"{slug}|{e_date}"
            if dedup_key in seen_slugs:
                continue
            seen_slugs.add(dedup_key)

            # Format date
            event_date = ""
            if e_date:
                try:
                    dt = datetime.strptime(e_date[:10], "%Y-%m-%d")
                    event_date = dt.strftime("%Y/%m/%d")
                except ValueError:
                    event_date = e_date

            # Area from coordinates
            venue_area = _area_from_coords(venue_lat, venue_lng, venue_name)

            ev = {
                "instagram_id": venue_slug or slug,
                "event_name": event_name,
                "event_date": event_date,
                "event_time": occurrence,
                "event_category": ", ".join(type_names) if type_names else "",
                "venue_name": venue_name,
                "venue_area": venue_area,
                "context": "",
                "detail_url": f"{BASE_URL}/events/{e_date[:10]}/{slug}" if slug and e_date else "",
                "slug": slug,
            }
            results.append(ev)

    return results


def fetch_events_via_graphql(endpoint, headers, from_date=None, to_date=None):
    """
    Fetch all events from the GraphQL API with pagination.

    Args:
        endpoint: GraphQL API URL
        headers: HTTP headers captured from browser
        from_date: start date "YYYY-MM-DD" (default: today)
        to_date: end date "YYYY-MM-DD" (default: None = no upper bound)

    Returns: list of event dicts
    """
    if not endpoint:
        return []

    if not from_date:
        from_date = datetime.now().strftime("%Y-%m-%d")

    req_headers = {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Origin": "https://dubainight.com",
        "Referer": "https://dubainight.com/",
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
        ),
        "x-source-region": "region_dubai",
    }
    # Merge any captured headers (e.g., x-region, authorization)
    for key, val in headers.items():
        if key.lower() not in ("host", "content-length", "accept-encoding"):
            req_headers[key] = val

    all_events = []
    seen_keys = set()
    page = 1

    while page <= MAX_GRAPHQL_PAGES:
        variables = {
            "pageNumber": page,
            "perPage": EVENTS_PER_PAGE,
            "order": "DATE_ASC",
            "eventFromDate": from_date,
        }
        if to_date:
            variables["eventToDate"] = to_date

        payload = {
            "operationName": "WebQueryPaginateEvents",
            "variables": variables,
            "query": GRAPHQL_QUERY_TEXT,
        }

        print(f"    [GraphQL] Page {page} | from={from_date} to={to_date or 'open'}")

        try:
            resp = http_requests.post(endpoint, json=payload, headers=req_headers, timeout=30)

            if resp.status_code != 200:
                print(f"    [GraphQL] HTTP {resp.status_code} — stopping pagination")
                break

            data = resp.json()

            if "errors" in data:
                print(f"    [GraphQL] API errors: {str(data['errors'])[:200]}")
                break

            events_by_date = (
                data.get("data", {})
                .get("p_Events", {})
                .get("eventFilters", [])
            )

            if not events_by_date:
                print(f"    [GraphQL] No events returned — end of data")
                break

            page_events = parse_graphql_response(events_by_date)

            new_count = 0
            for ev in page_events:
                key = f"{ev.get('slug', '')}|{ev.get('event_date', '')}"
                if key not in seen_keys:
                    seen_keys.add(key)
                    all_events.append(ev)
                    new_count += 1

            print(f"    [GraphQL] Got {len(page_events)} events ({new_count} new)")

            if new_count == 0:
                print(f"    [GraphQL] All duplicates — end of date range")
                break

            if len(page_events) < EVENTS_PER_PAGE:
                print(f"    [GraphQL] Last page (< {EVENTS_PER_PAGE} events)")
                break

            page += 1
            time.sleep(GRAPHQL_REQUEST_DELAY)

        except http_requests.exceptions.Timeout:
            print(f"    [GraphQL] Timeout on page {page}, retrying...")
            time.sleep(3)
            continue
        except http_requests.exceptions.RequestException as e:
            print(f"    [GraphQL] Request error: {e}")
            break
        except (json.JSONDecodeError, KeyError) as e:
            print(f"    [GraphQL] Parse error: {e}")
            break

    return all_events


def scrape_all_events_graphql(driver):
    """
    Full GraphQL-based event scraping:
    1. Discover the API endpoint via CDP
    2. Paginate through today + next SCAN_DAYS_AHEAD days in 7-day windows
    3. Fall back to SSG scraping if GraphQL fails
    """
    print(f"\n{'='*60}")
    print("Phase 1: Discovering GraphQL API endpoint...")
    print(f"{'='*60}")

    endpoint, headers = discover_graphql_endpoint(driver)

    if not endpoint:
        print("  [WARN] GraphQL discovery failed. Falling back to SSG scraping.")
        return scrape_events_listing(driver)

    print(f"\n{'='*60}")
    print(f"Phase 2: Fetching events via GraphQL API...")
    print(f"  Endpoint: {endpoint}")
    print(f"  Scanning today + next {SCAN_DAYS_AHEAD} days")
    print(f"{'='*60}")

    all_events = []
    seen_global = set()
    today = datetime.now()

    # Scan in 7-day windows
    window_days = 7
    for start_offset in range(0, SCAN_DAYS_AHEAD, window_days):
        window_start = today + timedelta(days=start_offset)
        window_end = today + timedelta(days=min(start_offset + window_days, SCAN_DAYS_AHEAD))

        from_date = window_start.strftime("%Y-%m-%d")
        to_date = window_end.strftime("%Y-%m-%d")

        print(f"\n  --- Window: {from_date} to {to_date} ---")

        window_events = fetch_events_via_graphql(endpoint, headers, from_date, to_date)

        new_in_window = 0
        for ev in window_events:
            key = f"{ev.get('slug', '')}|{ev.get('event_date', '')}"
            if key not in seen_global:
                seen_global.add(key)
                all_events.append(ev)
                new_in_window += 1

        print(f"  Window total: {len(window_events)} events ({new_in_window} globally new)")
        time.sleep(1.0)

    # Also try unbounded query from today to catch events beyond SCAN_DAYS_AHEAD
    print(f"\n  --- Unbounded query from today ---")
    unbounded = fetch_events_via_graphql(endpoint, headers, today.strftime("%Y-%m-%d"), None)
    new_unbounded = 0
    for ev in unbounded:
        key = f"{ev.get('slug', '')}|{ev.get('event_date', '')}"
        if key not in seen_global:
            seen_global.add(key)
            all_events.append(ev)
            new_unbounded += 1
    print(f"  Unbounded total: {len(unbounded)} events ({new_unbounded} globally new)")

    print(f"\n  TOTAL from GraphQL: {len(all_events)} unique events")

    # Fall back to SSG if GraphQL returned nothing
    if not all_events:
        print("  [WARN] GraphQL returned 0 events. Falling back to SSG scraping.")
        return scrape_events_listing(driver)

    return all_events


# ─── Listing Page Scraping (SSG fallback) ────────────────────────────────────

def scrape_events_listing(driver):
    """Scrape all events from the paginated listing at /events."""
    all_events = []
    seen_keys = set()  # Track slug|date across all pages to detect end
    page = 1

    while True:
        if MAX_PAGES and page > MAX_PAGES:
            break

        url = EVENTS_URL if page == 1 else f"{EVENTS_URL}?page={page}"
        print(f"\n  [Page {page}] {url}")

        try:
            for attempt in range(3):
                try:
                    driver.get(url)
                    break
                except Exception:
                    if attempt < 2:
                        print(f"    [WARN] Timeout (attempt {attempt+1}/3), retrying...")
                        time.sleep(3)
                    else:
                        print(f"    [ERROR] Failed to load page {page} after 3 attempts")
                        return all_events

            time.sleep(3)  # Wait for JS rendering

            next_data = extract_next_data(driver)
            if not next_data:
                print(f"    [WARN] No __NEXT_DATA__ found on page {page}")
                break

            events = parse_apollo_cache(next_data)
            if not events:
                print(f"    No events found — end of listing")
                break

            # Check how many are actually new (not seen before)
            new_count = 0
            for ev in events:
                key = f"{ev.get('slug','')}|{ev.get('event_date','')}"
                if key not in seen_keys:
                    seen_keys.add(key)
                    new_count += 1

            print(f"    Extracted {len(events)} events ({new_count} new)")
            all_events.extend(events)

            # Stop if all events on this page were already seen (end of data)
            if new_count == 0:
                print(f"    All duplicates — end of listing reached")
                break

            # Also stop if fewer than expected
            if len(events) < 12:
                print(f"    Last page reached (< 12 events)")
                break

            page += 1
            time.sleep(REQUEST_DELAY)

        except Exception as e:
            print(f"    [ERROR] Page {page}: {e}")
            break

    return all_events


# ─── Detail Page Scraping ────────────────────────────────────────────────────

def scrape_detail_page(driver, event):
    """Visit event detail page and enrich with context."""
    detail_url = event.get("detail_url", "")
    if not detail_url:
        return event

    print(f"    -> {detail_url[:90]}")

    try:
        for attempt in range(3):
            try:
                driver.get(detail_url)
                break
            except Exception:
                if attempt < 2:
                    time.sleep(2)
                else:
                    return event

        time.sleep(REQUEST_DELAY)

        html = driver.page_source

        # ── 1. Try __NEXT_DATA__ on detail page for description ──
        next_data = extract_next_data(driver)
        if next_data:
            _enrich_from_detail_next_data(next_data, event)

        # ── 2. Extract context from page HTML ──
        if not event.get("context"):
            ctx = _extract_context(html)
            if ctx:
                event["context"] = ctx

    except Exception as e:
        print(f"      [ERROR] {e}")

    return event


def _enrich_from_detail_next_data(next_data, event):
    """Extract context from detail page __NEXT_DATA__.

    On detail pages, descriptions live on Event objects (not EventParent).
    Also grabs offers and venue details for a richer context.
    """
    try:
        cache = next_data.get("props", {}).get("pageProps", {}).get("cache", {})
        if not cache:
            return

        parts = []

        # 1. Event description + offers (on Event objects)
        for key, val in cache.items():
            if not isinstance(val, dict):
                continue
            typename = val.get("__typename", "")
            if typename == "Event" or (key.startswith("Event:") and "Date" not in key and "Parent" not in key and "Type" not in key):
                desc = val.get("description", "")
                if desc:
                    clean = re.sub(r'<[^>]+>', ' ', str(desc))
                    clean = re.sub(r'\s+', ' ', clean).strip()
                    if len(clean) > 10:
                        parts.append(clean)
                offers = val.get("offers", "")
                if offers:
                    clean = re.sub(r'<[^>]+>', ' ', str(offers))
                    clean = re.sub(r'\s+', ' ', clean).strip()
                    if len(clean) > 5:
                        parts.append(f"Offers: {clean}")

        # 2. Venue details (on Venue objects)
        for key, val in cache.items():
            if not isinstance(val, dict):
                continue
            if val.get("__typename") == "Venue" or key.startswith("Venue:"):
                details = val.get("details", {})
                if isinstance(details, dict):
                    info = details.get("info", "")
                    if info:
                        clean = re.sub(r'<[^>]+>', ' ', str(info))
                        clean = re.sub(r'\s+', ' ', clean).strip()
                        if len(clean) > 10:
                            parts.append(f"Venue: {clean}")

        if parts and not event.get("context"):
            event["context"] = html_mod.unescape("\n".join(parts))[:10000]

    except Exception:
        pass


# ─── HTML Extraction Helpers ─────────────────────────────────────────────────

def _extract_context(html_string):
    """Extract and clean meaningful text from the detail page."""
    soup = BeautifulSoup(html_string, "html.parser")

    # Remove boilerplate
    for tag in soup.find_all(["script", "style", "noscript", "nav", "iframe", "header", "footer"]):
        tag.decompose()

    # Find content area
    content = (
        soup.find(class_=re.compile(r"event.?description|event.?detail|event.?content|about", re.IGNORECASE))
        or soup.find(class_=re.compile(r"event.?info|event.?body|event.?text|content", re.IGNORECASE))
        or soup.find("article")
        or soup.find("main")
    )

    if not content:
        body = soup.find("body")
        if body:
            divs = body.find_all("div")
            if divs:
                content = max(divs, key=lambda d: len(d.get_text(strip=True)))
            else:
                content = body
        else:
            content = soup

    text = content.get_text(separator="\n", strip=True)

    # Stop patterns
    stop_patterns = [
        r"^you might also like",
        r"^similar events",
        r"^related events",
        r"^more events",
        r"^upcoming events",
        r"^newsletter",
        r"^subscribe",
        r"^footer",
    ]

    skip_patterns = [
        r"^(home|menu|search|login|sign up|subscribe|cookie|privacy|terms)$",
        r"^(share|tweet|pin|like|comment|reply|follow)$",
        r"^(next|previous|back|close|open|more|less)$",
        r"^(all rights reserved|copyright|\©)",
        r"^(dubainight)\.?$",
        r"^https?://",
        r"^\d{3,6}$",
        r"^(things to do|venues|best places|offers|special|city guide)$",
    ]

    seen_lines = set()
    cleaned = []
    for line in text.split("\n"):
        line = line.strip()
        if not line or len(line) < 3:
            continue
        if any(re.match(pat, line, re.IGNORECASE) for pat in stop_patterns):
            break
        if any(re.match(pat, line, re.IGNORECASE) for pat in skip_patterns):
            continue
        if line in seen_lines:
            continue
        seen_lines.add(line)
        cleaned.append(line)

    result = "\n".join(cleaned)
    if len(result) > 10000:
        result = result[:10000] + "\n... [truncated]"
    return result


# ─── Data Processing ─────────────────────────────────────────────────────────

def is_valid_event(event):
    """Filter out noise entries."""
    name = event.get("event_name", "").strip()
    if not name or len(name) < 3:
        return False
    if not event.get("event_date"):
        return False
    return True


def deduplicate_events(events):
    """Deduplicate events by slug + date."""
    dedup_map = {}
    for ev in events:
        key = f"{ev.get('slug', '')}|{ev.get('event_date', '')}".lower().strip()
        if not key or key == "|":
            key = f"{ev.get('event_name', '')}|{ev.get('event_date', '')}".lower().strip()

        if key not in dedup_map:
            dedup_map[key] = ev
        else:
            # Merge: fill gaps in existing entry
            existing = dedup_map[key]
            for field in ["event_time", "event_category", "context", "venue_area"]:
                if not existing.get(field) and ev.get(field):
                    existing[field] = ev[field]
            # Prefer non-generic category
            if not existing.get("event_category") and ev.get("event_category"):
                existing["event_category"] = ev["event_category"]

    return list(dedup_map.values())


# ─── Google Sheets Integration ───────────────────────────────────────────────

def write_to_google_sheets(events):
    """Write event data to Sheet 3 (found by SHEET_GID)."""
    if not GSPREAD_AVAILABLE:
        print("\n[WARN] gspread not available. Saving to CSV instead.")
        save_to_csv(events)
        return

    if not os.path.exists(CREDENTIALS_PATH):
        print(f"\n[WARN] Credentials not found at: {CREDENTIALS_PATH}")
        save_to_csv(events)
        return

    print(f"\n{'='*60}")
    print("Writing to Google Sheets (Sheet 3)...")
    print(f"{'='*60}")

    try:
        scopes = [
            "https://www.googleapis.com/auth/spreadsheets",
            "https://www.googleapis.com/auth/drive",
        ]
        creds = Credentials.from_service_account_file(CREDENTIALS_PATH, scopes=scopes)
        client = gspread.authorize(creds)
        spreadsheet = client.open_by_key(SPREADSHEET_ID)

        # Find Sheet 3 by GID
        worksheet = None
        for ws in spreadsheet.worksheets():
            if ws.id == SHEET_GID:
                worksheet = ws
                break

        if worksheet is None:
            print(f"  [WARN] Sheet GID {SHEET_GID} not found. Trying index 2...")
            worksheet = spreadsheet.get_worksheet(2)

        if worksheet is None:
            print("  [ERROR] Could not find Sheet 3. Saving to CSV...")
            save_to_csv(events)
            return

        print(f"  Writing to worksheet: '{worksheet.title}'")

        scraped_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        rows = [HEADERS]
        for ev in events:
            rows.append([
                ev.get("instagram_id", ""),
                ev.get("event_date", ""),
                ev.get("event_time", ""),
                ev.get("event_name", ""),
                ev.get("event_category", ""),
                ev.get("context", ""),
                ev.get("venue_name", ""),
                ev.get("venue_area", ""),
                scraped_date,
            ])

        worksheet.clear()
        worksheet.update(range_name="A1", values=rows)
        worksheet.format("A1:I1", {
            "textFormat": {"bold": True},
            "backgroundColor": {"red": 0.9, "green": 0.9, "blue": 0.9},
        })

        print(f"  Successfully wrote {len(events)} events to Sheet 3!")
        print(f"  Sheet URL: https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit?gid={SHEET_GID}")

    except Exception as e:
        print(f"\n[ERROR] Failed to write to Google Sheets: {e}")
        save_to_csv(events)


def write_to_supabase(events):
    """Write event data to Supabase dubainight_scraper table."""
    from supabase_config import supabase_client, SUPABASE_AVAILABLE

    if not SUPABASE_AVAILABLE:
        print("\n[WARN] Supabase not configured. Skipping Supabase write.")
        return

    if not events:
        print("\n[WARN] No events to write. Skipping Supabase write (preserving existing data).")
        return

    try:
        print("\n  Writing to Supabase (dubainight_scraper)...")
        scraped_date = datetime.now().isoformat()

        rows = []
        for ev in events:
            rows.append({
                "instagram_id": ev.get("instagram_id", ""),
                "event_date": ev.get("event_date", ""),
                "event_time": ev.get("event_time", ""),
                "event_name": ev.get("event_name", ""),
                "event_category": ev.get("event_category", ""),
                "context": ev.get("context", ""),
                "venue_name": ev.get("venue_name", ""),
                "venue_area": ev.get("venue_area", ""),
                "scraped_date": scraped_date,
            })

        # Insert new data first (before deleting old data)
        for i in range(0, len(rows), 100):
            batch = rows[i:i + 100]
            supabase_client.table("dubainight_scraper").insert(batch).execute()

        # Only delete old data AFTER successful insert
        supabase_client.table("dubainight_scraper").delete().neq("scraped_date", scraped_date).execute()

        print(f"  Successfully wrote {len(events)} events to Supabase (dubainight_scraper)!")

    except Exception as e:
        print(f"\n[ERROR] Failed to write to Supabase: {e}")


def save_to_csv(events):
    """Fallback: save to CSV."""
    import csv
    scraped_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    csv_path = os.path.join(os.path.dirname(__file__), "dubainight_events.csv")
    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=HEADERS, extrasaction="ignore")
        writer.writeheader()
        for ev in events:
            row = {field: ev.get(field, "") for field in HEADERS}
            row["scraped_date"] = scraped_date
            writer.writerow(row)
    print(f"\n  Saved {len(events)} events to: {csv_path}")


# ─── Main Execution ──────────────────────────────────────────────────────────

def main():
    print("=" * 60)
    print("  DubaiNight.com Scraper (v2 — GraphQL + SSG Hybrid)")
    print(f"  Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)

    print("\nLaunching headless Chrome (with network logging)...")
    driver = create_driver(enable_perf_logging=True)

    try:
        # Step 1: Scrape events via GraphQL API (with SSG fallback)
        all_events = scrape_all_events_graphql(driver)
        print(f"\nTotal events from all sources: {len(all_events)}")

        # Step 2: Filter noise
        valid = [ev for ev in all_events if is_valid_event(ev)]
        print(f"After filtering: {len(valid)}")

        # Step 3: Deduplicate
        unique_events = deduplicate_events(valid)
        print(f"After deduplication: {len(unique_events)} unique events")

        # Step 4: Scrape detail pages for context
        print(f"\n{'='*60}")
        print(f"Scraping {len(unique_events)} detail pages...")
        print(f"{'='*60}")

        for i, event in enumerate(unique_events):
            print(f"  [{i+1}/{len(unique_events)}] {event.get('event_name', 'Unknown')[:55]}")
            scrape_detail_page(driver, event)
            time.sleep(0.3)

        # Step 5: Summary
        print(f"\n{'='*60}")
        print("  SCRAPING COMPLETE")
        print(f"{'='*60}")
        print(f"  Total unique events : {len(unique_events)}")
        print(f"  With instagram_id   : {sum(1 for e in unique_events if e.get('instagram_id'))}")
        print(f"  With date           : {sum(1 for e in unique_events if e.get('event_date'))}")
        print(f"  With time           : {sum(1 for e in unique_events if e.get('event_time'))}")
        print(f"  With category       : {sum(1 for e in unique_events if e.get('event_category'))}")
        print(f"  With context        : {sum(1 for e in unique_events if e.get('context'))}")
        print(f"  With venue name     : {sum(1 for e in unique_events if e.get('venue_name'))}")
        print(f"  With venue area     : {sum(1 for e in unique_events if e.get('venue_area'))}")

        print(f"\n  Preview (first 5):")
        for ev in unique_events[:5]:
            print(f"    - {ev.get('event_name','?')[:55]}")
            print(f"      {ev.get('event_date','?')} | {ev.get('event_time','?')} | {ev.get('event_category','?')}")
            print(f"      Venue: {ev.get('venue_name','?')[:40]} | Area: {ev.get('venue_area','?')}")

        # Step 6: Write to Sheet 3
        try:
            write_to_google_sheets(unique_events)
        except Exception as e:
            print(f"\n[ERROR] Google Sheets write failed: {e}")

        # Step 7: Write to Supabase
        try:
            write_to_supabase(unique_events)
        except Exception as e:
            print(f"\n[ERROR] Supabase write failed: {e}")

    finally:
        driver.quit()
        print("\nBrowser closed. Done!")


if __name__ == "__main__":
    main()
