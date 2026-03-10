"""
dubai.platinumlist.net Scraper
Scrapes event data from dubai.platinumlist.net and writes to Google Sheets (Sheet 2).

Strategy:
  - Site uses anti-bot protection → Selenium with anti-detection flags
  - Events are split across category pages (not paginated)
  - Each category page has a "Show More" button to reveal all events
  - Scrapes all Dubai events across all category pages, deduplicates, then
    visits each event detail page for full data

Columns: instagram_id, event_date, event_time, event_name, event_category,
         context, venue_name, venue_area

Requirements:
  pip install selenium beautifulsoup4 gspread google-auth webdriver-manager
"""

import time
import re
import os
import json
from datetime import datetime

import requests as http_requests
from bs4 import BeautifulSoup

try:
    import gspread
    from google.oauth2.service_account import Credentials
    GSPREAD_AVAILABLE = True
except ImportError:
    GSPREAD_AVAILABLE = False
    print("[WARN] gspread/google-auth not installed. Will save to CSV instead.")


# ─── Configuration ───────────────────────────────────────────────────────────

BASE_URL = "https://dubai.platinumlist.net"

# Category pages to scrape (all Dubai-specific)
CATEGORY_PAGES = [
    ("Events",    "https://dubai.platinumlist.net/events"),
    ("Nightlife", "https://dubai.platinumlist.net/nightlife"),
    ("Concert",   "https://dubai.platinumlist.net/concert"),
    ("Shows",     "https://dubai.platinumlist.net/shows"),
    ("Comedy",    "https://dubai.platinumlist.net/comedy"),
    ("Arabic",    "https://dubai.platinumlist.net/arabic"),
    ("Persian",   "https://dubai.platinumlist.net/persian"),
    ("Festival",  "https://dubai.platinumlist.net/festival"),
    ("Desi",      "https://dubai.platinumlist.net/desi"),
    ("Culinary",  "https://dubai.platinumlist.net/culinary/dinner-food"),
]

# Google Sheet settings
SPREADSHEET_ID = "1YeK9fckZlOr3gggwfqV8UHTDP3S0sg-tSD-wz_CXiJw"
SHEET_GID = 1873556126  # Sheet 2

# Path to Google Service Account credentials JSON (shared with party_finder_scraper)
CREDENTIALS_PATH = os.path.join(os.path.dirname(__file__), "credentials.json")

# Column headers
HEADERS = [
    "instagram_id",    # Empty for Platinumlist events (no Instagram data)
    "event_date",      # yyyy/mm/dd
    "event_time",
    "event_name",
    "event_category",
    "context",         # Enriched: includes artist, ticket_price, venue_address, directions, lat/lng
    "venue_name",
    "venue_area",
    "scraped_date",    # timestamp when this event was scraped
]

# Max "Show More" clicks per category page (None = unlimited)
MAX_SHOW_MORE_CLICKS = None

# Delay between detail page requests (seconds)
REQUEST_DELAY = 1.5


# ─── HTTP Session Setup ─────────────────────────────────────────────────────

def create_session():
    """
    Create a requests Session with browser-like headers.
    Platinumlist serves full server-rendered HTML — no Selenium needed.
    This works reliably in cloud environments (Cloud Run, etc.).
    """
    session = http_requests.Session()
    session.headers.update({
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
    })
    return session


# ─── Date Parsing ────────────────────────────────────────────────────────────

def parse_event_date(raw_date_str):
    """
    Convert date strings to yyyy/mm/dd.
    Handles:
      "Sat 7 Mar"              → next occurrence
      "Sat 7 Mar 2026"         → exact date
      "Sun 22 Mar – Tue 24 Mar"→ use first date
      "2026-03-22T18:00:00Z"   → ISO timestamp
    """
    if not raw_date_str:
        return ""

    raw = raw_date_str.strip()

    # ISO timestamp first
    iso_match = re.search(r'(\d{4}-\d{2}-\d{2})', raw)
    if iso_match:
        try:
            dt = datetime.strptime(iso_match.group(1), "%Y-%m-%d")
            return dt.strftime("%Y/%m/%d")
        except ValueError:
            pass

    # Handle date ranges → use first date only
    parts = re.split(r'\s*[–—]\s*|\s+to\s+', raw)
    raw = parts[0].strip()

    today = datetime.now()
    date_formats = [
        ("%a %d %b %Y", True),
        ("%a %d %b",    False),
        ("%d %b %Y",    True),
        ("%d %b",       False),
        ("%b %d %Y",    True),
        ("%b %d",       False),
        ("%A %d %B %Y", True),
        ("%A %d %B",    False),
    ]

    for fmt, has_year in date_formats:
        try:
            dt = datetime.strptime(raw, fmt)
            if not has_year:
                dt = dt.replace(year=today.year)
                if dt.date() < today.date():
                    dt = dt.replace(year=today.year + 1)
            return dt.strftime("%Y/%m/%d")
        except ValueError:
            continue

    return raw_date_str  # return as-is if nothing worked


# ─── Listing Page Scraping ───────────────────────────────────────────────────

def scrape_all_category_pages(session):
    """
    Scrape all category pages using HTTP requests.
    Platinumlist serves full server-rendered HTML, so no Selenium/JS needed.
    Returns list of partial event dicts (name, url, date, price, category).
    """
    print(f"\n{'='*60}")
    print("Scraping category pages for Dubai events...")
    print(f"{'='*60}")

    all_events = []

    for cat_name, cat_url in CATEGORY_PAGES:
        print(f"\n  [{cat_name}] {cat_url}")

        # Load page with retry
        html = None
        for attempt in range(3):
            try:
                resp = session.get(cat_url, timeout=30)
                resp.raise_for_status()
                html = resp.text
                break
            except Exception as e:
                if attempt < 2:
                    print(f"    [WARN] Request failed (attempt {attempt+1}/3), retrying...")
                    time.sleep(3)
                else:
                    print(f"    [ERROR] Failed to load: {e}")

        if not html:
            continue

        # Parse page HTML
        soup = BeautifulSoup(html, "html.parser")

        # Extract all event cards
        events = extract_listing_events(soup, cat_name)
        print(f"    Extracted {len(events)} events")
        all_events.extend(events)

    return all_events


def extract_listing_events(soup, default_category=""):
    """Extract event cards from a fully-loaded category page."""
    events = []
    seen_urls = set()

    # Find all event links
    for link in soup.find_all("a", href=True):
        href = link.get("href", "")
        if not href or "/event-tickets/" not in href:
            continue

        # Make absolute — ensure Dubai subdomain
        if href.startswith("/"):
            href = BASE_URL + href
        elif not href.startswith("http"):
            href = BASE_URL + "/" + href
        # Skip non-Dubai URLs
        if "dubai.platinumlist.net" not in href:
            continue

        norm_url = href.strip().rstrip("/")
        if norm_url in seen_urls:
            continue
        seen_urls.add(norm_url)

        # Walk up to find a reasonable card container
        # Stop at a container that wraps just this event (<=3 event links inside)
        container = link
        for _ in range(8):
            parent = container.parent
            if parent is None or parent.name in ["body", "html", "[document]"]:
                break
            parent_event_links = parent.find_all("a", href=re.compile(r"/event-tickets/"))
            if len(parent_event_links) == 1:
                # Perfect: this parent only contains this event
                container = parent
                break
            elif len(parent_event_links) <= 3:
                container = parent
            else:
                # Too many events in parent → current container is good enough
                break

        ev = _parse_card(container, link, href, default_category)
        if ev.get("event_name") and len(ev["event_name"]) > 2:
            events.append(ev)

    return events


def _parse_card(container, link, href, default_category):
    """Extract fields from a single event card element."""
    ev = {
        "event_name": "",
        "detail_url": href,
        "raw_date": "",
        "event_date": "",
        "event_time": "",
        "event_category": default_category,
        "artist": "",
        "ticket_price": "",
        "venue_name": "",
        "venue_area": "",
        "venue_address": "",
        "directions_url": "",
        "venue_lat": "",
        "venue_lng": "",
        "context": "",
    }

    # Event name: prefer heading tags, then image alt, then link text
    for tag_name in ["h1", "h2", "h3", "h4"]:
        h = container.find(tag_name)
        if h:
            ev["event_name"] = h.get_text(strip=True)
            break

    if not ev["event_name"]:
        img = link.find("img")
        if img and img.get("alt"):
            ev["event_name"] = img["alt"].strip()
        else:
            text = link.get_text(strip=True)
            if text and len(text) > 2:
                ev["event_name"] = text

    # Date: look for date-styled element
    for cls_pat in [r"date", r"when", r"time"]:
        date_el = container.find(class_=re.compile(cls_pat, re.IGNORECASE))
        if date_el:
            text = date_el.get_text(strip=True)
            # Must look like a real date (has digit + month-like text)
            if re.search(r'\d+\s+\w{3,}|\w{3,}\s+\d+', text):
                ev["raw_date"] = text
                break

    # Price — normalize to AED only (site may show INR/other currency)
    price_el = (
        container.find(class_="price")
        or container.find(class_=re.compile(r"price|cost|ticket", re.IGNORECASE))
    )
    if price_el:
        ev["ticket_price"] = _normalize_price(price_el.get_text(strip=True))

    # Category + structured data from ga4 attributes
    _extract_ga4_data(container, ev)
    _extract_ga4_data(link, ev)

    return ev


def _extract_ga4_data(element, ev):
    """Extract category/date/artist from data-ga4-click-item attribute."""
    for attr in ("data-ga4-click-item", "data-webengage-click"):
        raw = element.get(attr) if hasattr(element, "get") else None
        if not raw:
            continue
        try:
            data = json.loads(raw)

            # Must be a dict — detail pages may have JSON arrays in ga4 attributes
            if not isinstance(data, dict):
                continue

            # Skip UI-interaction events (login_click, click_menu_item, etc.)
            event_name = data.get("event_name", "")
            if event_name and "_" in event_name and not any(
                c.isdigit() for c in event_name
            ):
                continue

            # Category
            if not ev.get("event_category") or ev["event_category"] == "Events":
                cat = data.get("Primary Category") or data.get("Genre") or ""
                cat = re.sub(r'\s+Events?\s*$', '', cat, flags=re.IGNORECASE).strip()
                if cat:
                    ev["event_category"] = cat

            # Date from timestamp
            if not ev.get("raw_date"):
                ts = data.get("Event Date Timestamp") or data.get("eventDate") or ""
                if ts and re.search(r'\d{4}', str(ts)):
                    ev["raw_date"] = str(ts)

            # Artist
            if not ev.get("artist"):
                artist = (
                    data.get("artist_name") or data.get("Performer")
                    or data.get("Artist Name") or ""
                )
                if artist:
                    ev["artist"] = str(artist)

        except Exception:
            pass


# ─── Detail Page Scraping ────────────────────────────────────────────────────

def scrape_detail_page(session, event):
    """Fetch event detail page and enrich with time, venue, context, artist, price."""
    detail_url = event.get("detail_url", "")
    if not detail_url or "/event-tickets/" not in detail_url:
        return event

    print(f"    -> {detail_url[:90]}")

    try:
        resp = None
        for attempt in range(3):
            try:
                resp = session.get(detail_url, timeout=30)
                resp.raise_for_status()
                break
            except Exception:
                if attempt < 2:
                    time.sleep(2)
                else:
                    return event

        if not resp:
            return event

        time.sleep(REQUEST_DELAY)

        html = resp.text
        soup = BeautifulSoup(html, "html.parser")

        # ── 1. JSON-LD structured data (most reliable) ──
        ld = _extract_json_ld(soup)
        if ld and isinstance(ld, dict):
            if not event.get("event_name"):
                event["event_name"] = ld.get("name", "")

            # Start date/time
            start_date = ld.get("startDate") or ld.get("startTime") or ""
            if isinstance(start_date, list):
                start_date = start_date[0] if start_date else ""
            start_date = str(start_date) if start_date else ""
            if start_date:
                try:
                    clean = re.sub(r'\.\d+', '', start_date).replace("Z", "+00:00")
                    dt = datetime.fromisoformat(clean)
                    if not event.get("event_date"):
                        event["event_date"] = dt.strftime("%Y/%m/%d")
                    if not event.get("event_time"):
                        event["event_time"] = dt.strftime("%I:%M %p").lstrip("0")
                except Exception:
                    pass

            # Venue
            location = ld.get("location", {})
            if isinstance(location, dict):
                if not event.get("venue_name"):
                    event["venue_name"] = location.get("name", "")
                address = location.get("address", {})
                if not event.get("venue_area"):
                    if isinstance(address, dict):
                        parts = [
                            address.get("streetAddress", ""),
                            address.get("addressLocality", ""),
                            address.get("addressRegion", ""),
                        ]
                        event["venue_area"] = ", ".join(p for p in parts if p)
                    elif isinstance(address, str):
                        event["venue_area"] = address

                # Full address including country
                if not event.get("venue_address"):
                    if isinstance(address, dict):
                        addr_parts = [
                            address.get("streetAddress", ""),
                            address.get("addressLocality", ""),
                            address.get("addressRegion", ""),
                            address.get("addressCountry", ""),
                        ]
                        full_addr = " - ".join(p for p in addr_parts if p)
                        if full_addr:
                            event["venue_address"] = full_addr
                    elif isinstance(address, str):
                        event["venue_address"] = address

                # Geo coordinates
                geo = location.get("geo", {})
                if isinstance(geo, dict):
                    lat = geo.get("latitude") or geo.get("lat")
                    lng = geo.get("longitude") or geo.get("lng") or geo.get("lon")
                    if lat and lng:
                        try:
                            event["venue_lat"] = str(float(lat))
                            event["venue_lng"] = str(float(lng))
                        except (ValueError, TypeError):
                            pass

                # Location URL (often a maps link)
                loc_url = location.get("url", "")
                if loc_url and not event.get("directions_url"):
                    event["directions_url"] = loc_url

            # Description
            if not event.get("context"):
                desc = ld.get("description", "")
                if desc:
                    event["context"] = desc[:10000]

            # Performer
            if not event.get("artist"):
                for perf_key in ("performer", "organizer", "artist", "headliner"):
                    perf = ld.get(perf_key)
                    if perf:
                        if isinstance(perf, dict):
                            event["artist"] = perf.get("name", "")
                        elif isinstance(perf, list) and perf:
                            names = [p.get("name", "") for p in perf if isinstance(p, dict)]
                            event["artist"] = ", ".join(n for n in names if n)
                        if event["artist"]:
                            break

        # ── 1.5. Location section (between "How to get there" and "You might also like") ──
        loc_data = _extract_location_section(soup)

        if not event.get("venue_name") and loc_data["venue_name"]:
            event["venue_name"] = loc_data["venue_name"]
        if not event.get("venue_address") and loc_data["venue_address"]:
            event["venue_address"] = loc_data["venue_address"]
        if not event.get("venue_area") and loc_data["venue_address"]:
            area = _extract_area_from_address(loc_data["venue_address"])
            if area:
                event["venue_area"] = area
        if not event.get("directions_url") and loc_data["directions_url"]:
            event["directions_url"] = loc_data["directions_url"]
        if not event.get("venue_lat") and loc_data["venue_lat"]:
            event["venue_lat"] = loc_data["venue_lat"]
        if not event.get("venue_lng") and loc_data["venue_lng"]:
            event["venue_lng"] = loc_data["venue_lng"]

        # ── 2. HTML fallback for remaining missing fields ──
        # Search child elements for ga4 data attributes (not just root)
        for ga4_el in soup.find_all(attrs={"data-ga4-click-item": True}):
            _extract_ga4_data(ga4_el, event)
        for ga4_el in soup.find_all(attrs={"data-webengage-click": True}):
            _extract_ga4_data(ga4_el, event)

        if not event.get("event_date"):
            d = _extract_date_html(soup)
            if d:
                event["event_date"] = d

        if not event.get("event_time"):
            t = _extract_time_html(soup)
            if t:
                event["event_time"] = t

        if not event.get("venue_name"):
            vn = _extract_venue_name_html(soup)
            if vn:
                event["venue_name"] = vn

        if not event.get("venue_area"):
            va = _extract_venue_area_html(soup)
            if va:
                event["venue_area"] = va

        # Page-wide fallback for coordinates
        if not event.get("venue_lat") or not event.get("venue_lng"):
            lat, lng = _extract_coords_from_page(soup)
            if lat and lng:
                event["venue_lat"] = lat
                event["venue_lng"] = lng

        # Page-wide fallback for directions URL
        if not event.get("directions_url"):
            maps_link = soup.find("a", href=re.compile(
                r'google\.\w+/maps|maps\.google|goo\.gl/maps|maps\.app\.goo\.gl',
                re.IGNORECASE
            ))
            if maps_link:
                event["directions_url"] = maps_link.get("href", "")

        if not event.get("context"):
            ctx = extract_full_context(html)
            if ctx:
                event["context"] = ctx

        # Append location info to context (after all context extraction is done)
        loc_text_parts = []
        if loc_data["venue_name"]:
            loc_text_parts.append(f"Location: {loc_data['venue_name']}")
        if loc_data["venue_address"]:
            loc_text_parts.append(f"Address: {loc_data['venue_address']}")
        if loc_data["directions_url"]:
            loc_text_parts.append(f"Directions: {loc_data['directions_url']}")
        if loc_text_parts:
            loc_block = "\n--- Location ---\n" + "\n".join(loc_text_parts)
            event["context"] = (event.get("context", "") + loc_block)[:10000]

        if not event.get("artist"):
            a = _extract_artist_html(soup)
            if a:
                event["artist"] = a

        # Fallback: extract artist from event name for performer categories
        if not event.get("artist"):
            cat = event.get("event_category", "")
            if cat in _PERFORMER_CATEGORIES or not cat:
                a = extract_artist_from_name(event.get("event_name", ""), cat)
                if a:
                    event["artist"] = a

        # AED price from detail page (listing may show foreign currency)
        price_from_detail = _extract_ticket_price_html(soup)
        if price_from_detail:
            # Always prefer detail page AED price over listing page price
            event["ticket_price"] = price_from_detail
        elif not event.get("ticket_price"):
            pass  # No price found anywhere — leave blank

        # Date fallback
        if not event.get("event_date") and event.get("raw_date"):
            event["event_date"] = parse_event_date(event["raw_date"])

    except Exception as e:
        print(f"      [ERROR] {e}")

    return event


def _extract_json_ld(soup):
    """Extract JSON-LD Event structured data."""
    event_types = {
        "Event", "MusicEvent", "TheaterEvent", "SportsEvent", "ComedyEvent",
        "Festival", "ExhibitionEvent", "ChildrensEvent", "DanceEvent",
        "LiteraryEvent", "ScreeningEvent", "SocialEvent", "SaleEvent",
        "BusinessEvent", "EducationEvent", "FoodEvent",
    }
    for script in soup.find_all("script", type="application/ld+json"):
        try:
            raw = script.string
            if not raw:
                continue
            data = json.loads(raw)

            if isinstance(data, dict):
                dtype = data.get("@type", "")
                if dtype in event_types or (isinstance(dtype, list) and any(t in event_types for t in dtype)):
                    return data
                for item in data.get("@graph", []):
                    if isinstance(item, dict):
                        it = item.get("@type", "")
                        if it in event_types or (isinstance(it, list) and any(t in event_types for t in it)):
                            return item

            if isinstance(data, list):
                for item in data:
                    if isinstance(item, dict):
                        it = item.get("@type", "")
                        if it in event_types or (isinstance(it, list) and any(t in event_types for t in it)):
                            return item
        except Exception:
            pass
    return None


def _extract_date_html(soup):
    """
    Extract event date from HTML when JSON-LD is missing.
    Tries multiple strategies: time[datetime], itemprop, meta, CSS classes, text patterns.
    """
    # 1. <time datetime="..."> elements
    for time_el in soup.find_all("time", datetime=True):
        dt_val = time_el.get("datetime", "").strip()
        if dt_val and re.search(r'\d{4}', dt_val):
            result = parse_event_date(dt_val)
            if result and "/" in result:
                return result

    # 2. itemprop="startDate"
    for el in soup.find_all(attrs={"itemprop": True}):
        if el.get("itemprop", "").lower() in ("startdate", "starttime", "doortime"):
            dt_val = el.get("content") or el.get("datetime") or el.get_text(strip=True)
            if dt_val:
                result = parse_event_date(dt_val)
                if result and "/" in result:
                    return result

    # 3. Meta tags
    for meta in soup.find_all("meta"):
        prop = meta.get("property", "") or meta.get("name", "") or meta.get("itemprop", "")
        if re.search(r'(start.*time|event.*date|date.*event|startdate)', prop, re.IGNORECASE):
            content = meta.get("content", "")
            if content:
                result = parse_event_date(content)
                if result and "/" in result:
                    return result

    # 4. CSS class hints
    for sel in [
        "[class*='event-date']", "[class*='event__date']",
        "[class*='eventDate']", "[class*='start-date']",
        "[class*='date-time']", "[class*='when']",
        "[class*='date']",
    ]:
        el = soup.select_one(sel)
        if el:
            dt_attr = el.get("datetime") or el.get("content")
            if dt_attr:
                result = parse_event_date(dt_attr)
                if result and "/" in result:
                    return result
            text = el.get_text(strip=True)
            if re.search(r'\d{1,2}.*(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)', text, re.IGNORECASE):
                result = parse_event_date(text)
                if result and "/" in result:
                    return result

    # 5. Scan page text for recognisable date patterns
    text = soup.get_text()
    date_pats = [
        r'\b(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}\b',
        r'\b\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\b',
        r'\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b',
        r'\b\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}\b',
        r'\b(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b',
    ]
    for pat in date_pats:
        m = re.search(pat, text)
        if m:
            result = parse_event_date(m.group(0))
            if result and "/" in result:
                return result

    return ""


def _extract_time_html(soup):
    text = soup.get_text()
    for pat in [
        r'(\d{1,2}:\d{2}\s*(?:AM|PM)\s*[-–]\s*\d{1,2}:\d{2}\s*(?:AM|PM))',
        r'(\d{1,2}\s*(?:AM|PM)\s*[-–]\s*\d{1,2}\s*(?:AM|PM))',
        r'(\d{1,2}:\d{2}\s*(?:AM|PM))',
        r'(\d{1,2}\s*(?:AM|PM))',
    ]:
        m = re.search(pat, text, re.IGNORECASE)
        if m:
            return m.group(0).strip()
    # 24h format
    m = re.search(r'\b([01]?\d|2[0-3]):[0-5]\d\b', text)
    if m:
        return m.group(0)
    return ""


def _extract_venue_name_html(soup):
    for sel in [
        "[class*='venue-name']", "[class*='venue__name']",
        "[class*='VenueName']",  "[class*='location-name']",
    ]:
        el = soup.select_one(sel)
        if el:
            name = el.get_text(strip=True)
            if 2 < len(name) < 100:
                return name
    for tag in soup.find_all(["dt", "strong", "b", "h4", "h5"]):
        if tag.get_text(strip=True).lower() in ("venue", "location", "where"):
            nxt = tag.find_next_sibling()
            if nxt:
                name = nxt.get_text(strip=True)
                if 2 < len(name) < 100:
                    return name
    return ""


def _extract_venue_area_html(soup):
    for sel in ["address", "[class*='address']", "[itemprop='address']"]:
        el = soup.select_one(sel)
        if el:
            text = el.get_text(strip=True)
            if 10 < len(text) < 300 and _looks_like_address(text):
                return text

    all_text = soup.get_text()
    pattern = re.compile(
        r'[^\n.!?]{5,150}(?:dubai|jumeirah|marina|downtown|difc|jbr|deira|'
        r'barsha|palm|business bay|sheikh zayed|al habtoor|city walk|opera|'
        r'creek|meydan|tecom|al wasl|al quoz)[^\n.!?]{0,100}',
        re.IGNORECASE,
    )
    for m in pattern.finditer(all_text):
        candidate = m.group(0).strip()
        if 15 < len(candidate) < 250 and _looks_like_address(candidate):
            return candidate
    return ""


def _looks_like_address(text):
    if not text or len(text) < 10:
        return False
    text_lower = text.lower()
    bad = ["buy tickets", "select tickets", "add to cart", "read more", "click here"]
    if any(b in text_lower for b in bad):
        return False
    good = [",", "road", "street", "floor", "hotel", "resort", "mall", "tower",
            "dubai", "jumeirah", "marina", "difc", "downtown", "level", "building"]
    return any(g in text_lower for g in good)


def _extract_artist_html(soup):
    for sel in [
        "[class*='artist-name']", "[class*='performer']", "[class*='artist__name']",
        "[class*='act-name']", "[class*='lineup']", "[class*='headliner']",
    ]:
        el = soup.select_one(sel)
        if el:
            name = el.get_text(strip=True)
            if 2 < len(name) < 100:
                return name
    return ""


# Categories where artist name is likely embedded in the event name
_PERFORMER_CATEGORIES = {
    "Concert", "Nightlife", "Desi", "Persian", "Arabic", "Comedy", "Festival",
}


# ─── Location Section Extraction ────────────────────────────────────────────

def _find_directions_link(container):
    """Find the 'View directions' or similar link within a container."""
    # Text-based search
    for a_tag in container.find_all("a", href=True):
        link_text = a_tag.get_text(strip=True).lower()
        if any(phrase in link_text for phrase in [
            "view direction", "get direction", "directions",
            "view on map", "open in map", "navigate",
            "show on map", "google map",
        ]):
            return a_tag

    # Href-based search for Google Maps links
    for a_tag in container.find_all("a", href=True):
        href = a_tag.get("href", "")
        if re.search(r'google\.\w+/maps|maps\.google|goo\.gl/maps|maps\.app\.goo\.gl',
                      href, re.IGNORECASE):
            return a_tag

    # Class-based search
    for sel in [
        "a[class*='direction']", "a[class*='map-link']",
        "a[class*='mapLink']", "a[class*='navigate']",
    ]:
        el = container.select_one(sel)
        if el:
            return el

    return None


def _extract_coords_from_url(url):
    """
    Extract latitude and longitude from a Google Maps URL.
    Handles patterns: ?q=lat,lng  /@lat,lng  ?ll=lat,lng
                      destination=lat,lng  query=lat,lng  sll=lat,lng
    Returns (lat_str, lng_str) or ("", "").
    """
    if not url:
        return ("", "")

    # ?q=lat,lng or &q=lat,lng
    m = re.search(r'[?&]q=(-?\d+\.\d+),\s*(-?\d+\.\d+)', url)
    if m:
        return (m.group(1), m.group(2))

    # /@lat,lng
    m = re.search(r'@(-?\d+\.\d+),\s*(-?\d+\.\d+)', url)
    if m:
        return (m.group(1), m.group(2))

    # ?ll=lat,lng
    m = re.search(r'[?&]ll=(-?\d+\.\d+),\s*(-?\d+\.\d+)', url)
    if m:
        return (m.group(1), m.group(2))

    # destination=lat,lng
    m = re.search(r'destination=(-?\d+\.\d+),\s*(-?\d+\.\d+)', url)
    if m:
        return (m.group(1), m.group(2))

    # query=lat,lng
    m = re.search(r'query=(-?\d+\.\d+),\s*(-?\d+\.\d+)', url)
    if m:
        return (m.group(1), m.group(2))

    # sll=lat,lng
    m = re.search(r'sll=(-?\d+\.\d+),\s*(-?\d+\.\d+)', url)
    if m:
        return (m.group(1), m.group(2))

    return ("", "")


def _extract_area_from_address(full_address):
    """
    Extract a Dubai area name from a full address string.
    e.g. "Dubai Opera - Sheikh Mohammed bin Rashid Boulevard - Dubai - UAE"
         -> "Downtown Dubai"
    """
    if not full_address:
        return ""

    addr_lower = full_address.lower()

    area_map = {
        "downtown": "Downtown Dubai",
        "dubai mall": "Downtown Dubai",
        "burj khalifa": "Downtown Dubai",
        "sheikh mohammed bin rashid": "Downtown Dubai",
        "dubai opera": "Downtown Dubai",
        "marina": "Dubai Marina",
        "jbr": "JBR",
        "jumeirah beach residence": "JBR",
        "the walk": "JBR",
        "palm": "Palm Jumeirah",
        "atlantis": "Palm Jumeirah",
        "difc": "DIFC",
        "financial centre": "DIFC",
        "city walk": "City Walk",
        "la mer": "La Mer",
        "deira": "Deira",
        "business bay": "Business Bay",
        "al barsha": "Al Barsha",
        "barsha": "Al Barsha",
        "al habtoor": "Al Habtoor City",
        "habtoor": "Al Habtoor City",
        "meydan": "Meydan",
        "creek": "Dubai Creek",
        "festival city": "Dubai Festival City",
        "media city": "Dubai Media City",
        "internet city": "Dubai Internet City",
        "knowledge village": "Knowledge Village",
        "al quoz": "Al Quoz",
        "jumeirah": "Jumeirah",
        "world trade centre": "World Trade Centre",
        "wtc": "World Trade Centre",
        "expo": "Expo City",
        "tecom": "TECOM",
        "sheikh zayed": "Sheikh Zayed Road",
        "al wasl": "Al Wasl",
        "bluewaters": "Bluewaters Island",
        "ain dubai": "Bluewaters Island",
        "madinat": "Madinat Jumeirah",
        "souk": "Madinat Jumeirah",
        "ibn battuta": "Jebel Ali",
        "jebel ali": "Jebel Ali",
        "dubai hills": "Dubai Hills",
        "al sufouh": "Al Sufouh",
        "umm suqeim": "Umm Suqeim",
        "dubai world centre": "DWC",
    }

    for keyword, area in area_map.items():
        if keyword in addr_lower:
            return area

    return ""


def _extract_coords_from_page(soup):
    """
    Scan the entire page for Google Maps links, iframes, data attributes,
    and script variables to extract lat/lng coordinates.
    Returns (lat_str, lng_str) or ("", "").
    """
    # Check <a> tags with Google Maps URLs
    for a_tag in soup.find_all("a", href=True):
        href = a_tag.get("href", "")
        if re.search(r'google\.\w+/maps|maps\.google|goo\.gl/maps|maps\.app\.goo\.gl',
                      href, re.IGNORECASE):
            lat, lng = _extract_coords_from_url(href)
            if lat and lng:
                return (lat, lng)

    # Check <iframe> tags (embedded maps)
    for iframe in soup.find_all("iframe", src=True):
        src = iframe.get("src", "")
        if "google" in src.lower() and "map" in src.lower():
            lat, lng = _extract_coords_from_url(src)
            if lat and lng:
                return (lat, lng)

    # Check for coordinate data in data attributes
    for el in soup.find_all(attrs={"data-lat": True}):
        lat = el.get("data-lat", "")
        lng = el.get("data-lng") or el.get("data-lon") or el.get("data-longitude", "")
        if lat and lng:
            try:
                return (str(float(lat)), str(float(lng)))
            except (ValueError, TypeError):
                pass

    # Check page scripts for coordinate variables
    for script in soup.find_all("script"):
        if not script.string:
            continue
        text = script.string
        m = re.search(
            r'(?:latitude|lat)\s*[:=]\s*(-?\d+\.\d{3,})\s*[,;}\s]'
            r'.*?(?:longitude|lng|lon)\s*[:=]\s*(-?\d+\.\d{3,})',
            text, re.DOTALL
        )
        if m:
            lat_val = float(m.group(1))
            lng_val = float(m.group(2))
            # Sanity check for Dubai region
            if 24.0 <= lat_val <= 26.0 and 54.0 <= lng_val <= 57.0:
                return (str(lat_val), str(lng_val))

    return ("", "")


def _extract_location_section(soup):
    """
    Extract venue data from the dedicated 'Location' section on Platinumlist
    event detail pages (between 'How to get there' and 'You might also like').

    Returns dict with keys: venue_name, venue_address, directions_url,
                            venue_lat, venue_lng  (all default to "").
    """
    result = {
        "venue_name": "",
        "venue_address": "",
        "directions_url": "",
        "venue_lat": "",
        "venue_lng": "",
    }

    location_container = None

    # ── Strategy 1: Find heading with text "Location" and walk up ──
    for heading in soup.find_all(["h1", "h2", "h3", "h4", "h5", "h6", "div", "span"]):
        text = heading.get_text(strip=True).lower()
        if text == "location":
            parent = heading.parent
            for _ in range(5):
                if parent is None or parent.name in ("body", "html", "[document]"):
                    break
                parent_text = parent.get_text(strip=True)
                if len(parent_text) > 30:
                    location_container = parent
                    break
                parent = parent.parent
            if location_container:
                break

    # ── Strategy 2: CSS class-based search ──
    if not location_container:
        for sel in [
            "[class*='location-section']", "[class*='location_section']",
            "[class*='locationSection']", "[class*='venue-location']",
            "[class*='venue_location']", "[class*='venueLocation']",
            "[class*='event-location']", "[class*='eventLocation']",
            "section[class*='location']",
            "div[class*='location'][class*='card']",
            "div[class*='location'][class*='info']",
            "div[class*='location'][class*='detail']",
            "[data-section='location']", "[data-block='location']",
            "[id*='location-section']", "[id*='locationSection']",
        ]:
            el = soup.select_one(sel)
            if el:
                text = el.get_text(strip=True)
                if len(text) > 20:
                    location_container = el
                    break

    # ── Strategy 3: Find "View directions" link and walk up ──
    if not location_container:
        directions_link = _find_directions_link(soup)
        if directions_link:
            parent = directions_link.parent
            for _ in range(6):
                if parent is None or parent.name in ("body", "html", "[document]"):
                    break
                parent_text = parent.get_text(strip=True)
                if len(parent_text) > 50:
                    location_container = parent
                    break
                parent = parent.parent

    if not location_container:
        return result

    # ── Extract venue name ──
    for tag_name in ["h3", "h4", "h2", "h5", "strong", "b"]:
        for el in location_container.find_all(tag_name):
            text = el.get_text(strip=True)
            if (text.lower() not in ("location", "venue", "address", "directions",
                                      "view directions", "get directions",
                                      "how to get there", "venue location")
                    and 2 < len(text) < 100):
                result["venue_name"] = text
                break
        if result["venue_name"]:
            break

    # ── Extract full address ──
    address_candidates = []

    addr_tag = location_container.find("address")
    if addr_tag:
        addr_text = addr_tag.get_text(strip=True)
        if len(addr_text) > 10:
            address_candidates.append(addr_text)

    for sel in ["[class*='address']", "[itemprop='address']", "[class*='addr']"]:
        el = location_container.select_one(sel)
        if el:
            addr_text = el.get_text(strip=True)
            if len(addr_text) > 10:
                address_candidates.append(addr_text)

    for el in location_container.find_all(["p", "div", "span", "li"]):
        text = el.get_text(strip=True)
        if (len(text) > 15
                and text.lower() not in ("location", "venue", "view directions",
                                          "get directions", "view directions >",
                                          "venue location")
                and text != result["venue_name"]
                and _looks_like_address(text)):
            address_candidates.append(text)

    if address_candidates:
        result["venue_address"] = max(address_candidates, key=len)

    # ── Extract directions URL and coordinates ──
    directions_link = _find_directions_link(location_container)
    if directions_link:
        href = directions_link.get("href", "")
        if href:
            result["directions_url"] = href
            lat, lng = _extract_coords_from_url(href)
            if lat and lng:
                result["venue_lat"] = lat
                result["venue_lng"] = lng

    # Fallback: any Google Maps link in the container
    if not result["directions_url"]:
        for a_tag in location_container.find_all("a", href=True):
            href = a_tag.get("href", "")
            if re.search(r'google\.\w+/maps|maps\.google|goo\.gl/maps', href, re.IGNORECASE):
                result["directions_url"] = href
                lat, lng = _extract_coords_from_url(href)
                if lat and lng:
                    result["venue_lat"] = lat
                    result["venue_lng"] = lng
                break

    return result


def extract_artist_from_name(event_name, category=""):
    """
    Heuristically extract performer name from event title.
    Works for patterns like:
      "Swedish House Mafia at Ushuaïa Dubai"  → "Swedish House Mafia"
      "Charlotte de Witte at HIVE, Soho Garden" → "Charlotte de Witte"
      "Keinemusik | Pacha Icons in Dubai" → "Keinemusik"
      "Atif Aslam 2026 in Dubai"  → "Atif Aslam"
      "Max Amini Live in Dubai!" → "Max Amini"
    """
    if not event_name:
        return ""

    name = event_name.strip()

    # "Artist at Venue" / "Artist @ Venue" / "Artist live at Venue"
    m = re.match(r'^(.+?)\s+(?:live\s+at|at|@)\s+', name, re.IGNORECASE)
    if m:
        candidate = m.group(1).strip()
        candidate = re.sub(
            r'\s+(?:live|concert|tour|show|presents?|official)$', '',
            candidate, flags=re.IGNORECASE
        ).strip()
        if 2 < len(candidate) < 60:
            return candidate

    # "Artist | Rest of title"
    m = re.match(r'^(.+?)\s*\|', name)
    if m:
        candidate = m.group(1).strip()
        if 2 < len(candidate) < 60:
            return candidate

    # "Artist Live in Dubai" / "Artist 2026 in Dubai"
    m = re.match(r'^(.+?)\s+(?:live\s+in|in dubai|\d{4}\s+in|\d{4}$)', name, re.IGNORECASE)
    if m:
        candidate = m.group(1).strip()
        candidate = re.sub(
            r'\s+(?:live|concert|tour|show|presents?)$', '',
            candidate, flags=re.IGNORECASE
        ).strip()
        if 2 < len(candidate) < 60:
            return candidate

    return ""


def _normalize_price(price_text):
    """
    Return only AED/Dhs prices. Discard prices in other currencies (INR, USD, EUR, etc.).
    Returns "Free" for free events. Returns "" for foreign-currency prices.
    """
    if not price_text:
        return ""
    t = price_text.strip()
    # Free event
    if re.search(r'\bfree\b', t, re.IGNORECASE):
        return "Free"
    # AED / Dhs price → normalise to "AED XXX"
    m = re.search(r'(?:AED|Dhs?\.?)\s*([\d,]+(?:\.\d{1,2})?)', t, re.IGNORECASE)
    if m:
        return f"AED {m.group(1)}"
    # Reject anything that looks like a foreign currency
    if re.search(r'\b(?:INR|USD|EUR|GBP|₹|\$|€|£)\b|[A-Z]{3}\s*[\d,]+', t):
        return ""
    # Reject prices with decimals that look converted (e.g. "5,559.78")
    if re.search(r'\d{1,3},\d{3}\.\d{2}', t):
        return ""
    return ""


def _extract_ticket_price_html(soup):
    """Extract AED ticket price from detail page HTML."""
    text = soup.get_text()
    # AED / Dhs in text
    m = re.search(r'(?:AED|Dhs?\.?)\s*([\d,]+(?:\.\d{1,2})?)', text, re.IGNORECASE)
    if m:
        return f"AED {m.group(1)}"
    # "Free" event
    if re.search(r'\bfree entry\b|\bfree tickets?\b|\bfree admission\b', text, re.IGNORECASE):
        return "Free"
    return ""


def extract_full_context(html_string):
    """Extract and clean all meaningful text from the detail page."""
    soup2 = BeautifulSoup(html_string, "html.parser")

    for tag in soup2.find_all(["script", "style", "noscript", "nav", "iframe", "header", "footer"]):
        tag.decompose()

    content = (
        soup2.find(class_=re.compile(r"event.?description|event.?detail|event.?content|about.?event", re.IGNORECASE))
        or soup2.find(class_=re.compile(r"event.?info|event.?body|event.?text", re.IGNORECASE))
        or soup2.find("article")
        or soup2.find("main")
    )

    if not content:
        body = soup2.find("body")
        if body:
            divs = body.find_all("div")
            if divs:
                content = max(divs, key=lambda d: len(d.get_text(strip=True)))
            else:
                content = body
        else:
            content = soup2

    text = content.get_text(separator="\n", strip=True)

    # Stop collecting entirely when we hit these section headings
    # (these appear at the bottom of event pages — everything after is boilerplate)
    stop_patterns = [
        r"^terms and conditions",
        r"^terms & conditions",
        r"^t&c",
        r"^how to get there",
        r"^getting there",
        r"^directions",
        r"^venue (map|directions|location)",
        r"^you might also like",
        r"^similar events",
        r"^related events",
    ]

    skip_patterns = [
        r"^(home|menu|search|login|sign up|subscribe|cookie|privacy|terms|faq)$",
        r"^(share|tweet|pin|like|comment|reply|follow)$",
        r"^(next|previous|back|close|open|more|less)$",
        r"^\d+\s*(comments?|views?|shares?|likes?)$",
        r"^(all rights reserved|copyright|\©)",
        r"^(platinumlist|platinum list)\.?$",
        r"^buy tickets?$",
        r"^select tickets?$",
        r"^add to (cart|wishlist)$",
        r"^sold out$",
        r"^show map$",
        r"^get directions?$",
        r"^https?://",
        r"^\d{3,6}$",
        r"^why buy with platinumlist",
        r"^instant e-ticket",
        r"^secure payment",
        r"^best price guarantee",
        r"^24.?7 customer support",
        r"^no booking fees?",
    ]

    seen_lines = set()
    cleaned = []
    for line in text.split("\n"):
        line = line.strip()
        if not line or len(line) < 3:
            continue
        # Hard stop — discard this line and everything after it
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


# ─── Noise Filter ────────────────────────────────────────────────────────────

def is_valid_event(event):
    """Filter out noise entries and non-Dubai events."""
    name = event.get("event_name", "").strip()
    detail_url = event.get("detail_url", "")

    if not name or len(name) < 3:
        return False
    if not detail_url or "/event-tickets/" not in detail_url:
        return False
    # Only allow Dubai subdomain events
    if "dubai.platinumlist.net" not in detail_url:
        return False
    if len(name) > 120 and not event.get("event_date") and not event.get("raw_date"):
        return False
    return True


# ─── Context Enrichment ──────────────────────────────────────────────────────

def _build_enriched_context(event):
    """
    Build an enriched context string that includes the original context text
    plus extra Platinumlist-specific fields (artist, ticket_price, venue_address,
    directions_url, venue_lat, venue_lng) that don't exist in the 8-column format.
    """
    parts = []

    original_context = event.get("context", "").strip()
    if original_context:
        parts.append(original_context)

    extra_parts = []

    artist = event.get("artist", "").strip()
    if artist:
        extra_parts.append(f"Artist: {artist}")

    ticket_price = event.get("ticket_price", "").strip()
    if ticket_price:
        extra_parts.append(f"Ticket Price: {ticket_price}")

    venue_address = event.get("venue_address", "").strip()
    if venue_address and venue_address not in original_context:
        extra_parts.append(f"Venue Address: {venue_address}")

    directions_url = event.get("directions_url", "").strip()
    if directions_url and directions_url not in original_context:
        extra_parts.append(f"Directions: {directions_url}")

    lat = event.get("venue_lat", "").strip()
    lng = event.get("venue_lng", "").strip()
    if lat and lng:
        extra_parts.append(f"Coordinates: {lat}, {lng}")

    if extra_parts:
        extra_block = "\n--- Extra Info ---\n" + "\n".join(extra_parts)
        parts.append(extra_block)

    result = "\n".join(parts)

    if len(result) > 10000:
        result = result[:10000] + "\n... [truncated]"

    return result


# ─── Google Sheets Integration ───────────────────────────────────────────────

def write_to_google_sheets(events):
    """Write event data to Sheet 2 (found by SHEET_GID)."""
    if not GSPREAD_AVAILABLE:
        print("\n[WARN] gspread not available. Saving to CSV instead.")
        save_to_csv(events)
        return

    if not os.path.exists(CREDENTIALS_PATH):
        print(f"\n[WARN] Credentials not found at: {CREDENTIALS_PATH}")
        save_to_csv(events)
        return

    print(f"\n{'='*60}")
    print("Writing to Google Sheets (Sheet 2)...")
    print(f"{'='*60}")

    try:
        scopes = [
            "https://www.googleapis.com/auth/spreadsheets",
            "https://www.googleapis.com/auth/drive",
        ]
        creds = Credentials.from_service_account_file(CREDENTIALS_PATH, scopes=scopes)
        client = gspread.authorize(creds)
        spreadsheet = client.open_by_key(SPREADSHEET_ID)

        # Find Sheet 2 by GID
        worksheet = None
        for ws in spreadsheet.worksheets():
            if ws.id == SHEET_GID:
                worksheet = ws
                break

        if worksheet is None:
            print(f"  [WARN] Sheet GID {SHEET_GID} not found. Trying index 1...")
            worksheet = spreadsheet.get_worksheet(1)

        if worksheet is None:
            print("  [ERROR] Could not find Sheet 2. Saving to CSV...")
            save_to_csv(events)
            return

        print(f"  Writing to worksheet: '{worksheet.title}'")

        scraped_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        rows = [HEADERS]
        for ev in events:
            rows.append([
                "",                              # instagram_id (Platinumlist has no Instagram)
                ev.get("event_date", ""),
                ev.get("event_time", ""),
                ev.get("event_name", ""),
                ev.get("event_category", ""),
                _build_enriched_context(ev),
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

        print(f"  Successfully wrote {len(events)} events to Sheet 2!")
        print(f"  Sheet URL: https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit?gid={SHEET_GID}")

    except Exception as e:
        print(f"\n[ERROR] Failed to write to Google Sheets: {e}")
        save_to_csv(events)


def write_to_supabase(events):
    """Write event data to Supabase platinumlist_scraper table."""
    from supabase_config import supabase_client, SUPABASE_AVAILABLE

    if not SUPABASE_AVAILABLE:
        print("\n[WARN] Supabase not configured. Skipping Supabase write.")
        return

    try:
        print("\n  Writing to Supabase (platinumlist_scraper)...")
        scraped_date = datetime.now().isoformat()

        rows = []
        for ev in events:
            rows.append({
                "instagram_id": "",
                "event_date": ev.get("event_date", ""),
                "event_time": ev.get("event_time", ""),
                "event_name": ev.get("event_name", ""),
                "event_category": ev.get("event_category", ""),
                "context": _build_enriched_context(ev),
                "venue_name": ev.get("venue_name", ""),
                "venue_area": ev.get("venue_area", ""),
                "scraped_date": scraped_date,
            })

        # Clear old data (matches Google Sheets clear + rewrite behavior)
        supabase_client.table("platinumlist_scraper").delete().neq("id", 0).execute()

        # Insert in batches of 100
        for i in range(0, len(rows), 100):
            batch = rows[i:i + 100]
            supabase_client.table("platinumlist_scraper").insert(batch).execute()

        print(f"  Successfully wrote {len(events)} events to Supabase (platinumlist_scraper)!")

    except Exception as e:
        print(f"\n[ERROR] Failed to write to Supabase: {e}")


def save_to_csv(events):
    """Fallback: save to CSV."""
    import csv
    csv_path = os.path.join(os.path.dirname(__file__), "platinumlist_events.csv")
    scraped_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=HEADERS, extrasaction="ignore")
        writer.writeheader()
        for ev in events:
            writer.writerow({
                "instagram_id":   "",
                "event_date":     ev.get("event_date", ""),
                "event_time":     ev.get("event_time", ""),
                "event_name":     ev.get("event_name", ""),
                "event_category": ev.get("event_category", ""),
                "context":        _build_enriched_context(ev),
                "venue_name":     ev.get("venue_name", ""),
                "venue_area":     ev.get("venue_area", ""),
                "scraped_date":   scraped_date,
            })
    print(f"\n  Saved {len(events)} events to: {csv_path}")


# ─── Main Execution ──────────────────────────────────────────────────────────

def main():
    print("=" * 60)
    print("  Dubai Platinumlist Scraper")
    print(f"  Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"  Scraping {len(CATEGORY_PAGES)} category pages (Dubai only)")
    print("=" * 60)

    print("\nCreating HTTP session (no browser needed)...")
    session = create_session()

    try:
        # Step 1: Collect all event URLs from category pages
        all_events = scrape_all_category_pages(session)
        print(f"\nTotal events collected: {len(all_events)}")

        # Step 2: Filter noise
        valid = [ev for ev in all_events if is_valid_event(ev)]
        print(f"After noise filtering: {len(valid)}")

        # Step 3: Deduplicate by normalized detail_url
        dedup_map = {}
        for ev in valid:
            key = ev.get("detail_url", "").strip().rstrip("/").lower()
            if not key:
                continue
            if key not in dedup_map:
                dedup_map[key] = ev
            else:
                # Merge: keep best category (non-"Events" wins)
                existing = dedup_map[key]
                for field in ["event_name", "artist", "ticket_price", "raw_date"]:
                    if not existing.get(field) and ev.get(field):
                        existing[field] = ev[field]
                if existing.get("event_category") == "Events" and ev.get("event_category") not in ("Events", ""):
                    existing["event_category"] = ev["event_category"]

        unique_events = list(dedup_map.values())
        print(f"After deduplication: {len(unique_events)} unique events")

        # Step 4: Scrape detail pages
        print(f"\nScraping {len(unique_events)} detail pages...")
        for i, event in enumerate(unique_events):
            print(f"  [{i+1}/{len(unique_events)}] {event.get('event_name', 'Unknown')[:55]}")
            scrape_detail_page(session, event)
            time.sleep(0.3)

        # Step 5: Convert raw_date → event_date for any still missing
        for event in unique_events:
            if not event.get("event_date") and event.get("raw_date"):
                event["event_date"] = parse_event_date(event["raw_date"])

        # Step 6: Summary
        print(f"\n{'='*60}")
        print("  SCRAPING COMPLETE")
        print(f"{'='*60}")
        print(f"  Total unique events : {len(unique_events)}")
        print(f"  With date           : {sum(1 for e in unique_events if e.get('event_date'))}")
        print(f"  With time           : {sum(1 for e in unique_events if e.get('event_time'))}")
        print(f"  With category       : {sum(1 for e in unique_events if e.get('event_category'))}")
        print(f"  With artist         : {sum(1 for e in unique_events if e.get('artist'))}")
        print(f"  With ticket price   : {sum(1 for e in unique_events if e.get('ticket_price'))}")
        print(f"  With venue name     : {sum(1 for e in unique_events if e.get('venue_name'))}")
        print(f"  With venue area     : {sum(1 for e in unique_events if e.get('venue_area'))}")
        print(f"  With venue address  : {sum(1 for e in unique_events if e.get('venue_address'))}")
        print(f"  With directions URL : {sum(1 for e in unique_events if e.get('directions_url'))}")
        print(f"  With coordinates    : {sum(1 for e in unique_events if e.get('venue_lat') and e.get('venue_lng'))}")
        print(f"  With context        : {sum(1 for e in unique_events if e.get('context'))}")

        print(f"\n  Preview (first 5):")
        for ev in unique_events[:5]:
            print(f"    - {ev.get('event_name','?')[:55]}")
            print(f"      {ev.get('event_date','?')} | {ev.get('event_time','?')} | {ev.get('event_category','?')}")
            print(f"      Artist: {ev.get('artist','?')[:30]} | Price: {ev.get('ticket_price','?')}")
            print(f"      Venue: {ev.get('venue_name','?')[:40]}")

        # Step 7: Write to Sheet 2
        write_to_google_sheets(unique_events)

        # Step 8: Write to Supabase
        write_to_supabase(unique_events)

    finally:
        session.close()
        print("\nSession closed. Done!")


if __name__ == "__main__":
    main()
