"""
ThePartyFinder.com Scraper
Scrapes event data from thepartyfinder.com and writes to Google Sheets.

Pages scraped:
  - https://thepartyfinder.com/
  - https://thepartyfinder.com/events/
  - https://thepartyfinder.com/weekly-events/

Columns: instagram_id, event_date, event_time, event_name, context, venue_name, venue_area

Requirements:
  pip install selenium beautifulsoup4 gspread google-auth webdriver-manager
"""

import time
import re
import os
from datetime import datetime, timedelta

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
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

URLS = [
    "https://thepartyfinder.com/",
    "https://thepartyfinder.com/events/",
    "https://thepartyfinder.com/weekly-events/",
]

# Google Sheet ID (from the URL)
SPREADSHEET_ID = "1YeK9fckZlOr3gggwfqV8UHTDP3S0sg-tSD-wz_CXiJw"

# Path to your Google Service Account credentials JSON
CREDENTIALS_PATH = os.path.join(os.path.dirname(__file__), "credentials.json")

# Column headers for the spreadsheet
HEADERS = [
    "instagram_id",
    "event_date",
    "event_time",
    "event_name",
    "event_category",
    "context",
    "venue_name",
    "venue_area",
    "scraped_date",
]

# Category tabs on thePartyfinder.com /events/ page
CATEGORY_TABS = [
    "Nightclub",
    "Beach & Pool",
    "Restaurant",
    "Brunch",
    "Ladies Night",
    "After Party",
    "Persian & Arabic",
]

# Day name → weekday number (Monday=0, Sunday=6)
DAY_NAME_MAP = {
    "monday": 0, "mon": 0,
    "tuesday": 1, "tue": 1,
    "wednesday": 2, "wed": 2,
    "thursday": 3, "thu": 3,
    "friday": 4, "fri": 4,
    "saturday": 5, "sat": 5,
    "sunday": 6, "sun": 6,
}

# Delay between detail page requests (seconds) - be respectful
REQUEST_DELAY = 1.5

# Site's own Instagram handles to skip (we want venue/event handles)
SITE_IG_HANDLES = {
    "partyfinderdubai", "thepartyfinder", "thepartyfinderdubai",
    "partyfinder", "partyfindersdubai", "partyfinderfarsi",
    "p", "v", "reel", "reels", "stories", "explore", "accounts",
    "tv", "s", "ar", "en", "o1", "about", "help",
}

# Minimum Instagram handle length (skip short/invalid handles)
MIN_IG_HANDLE_LEN = 3

# Noise event names to filter out
NOISE_NAMES = {
    "find top events", "find events", "the party finder", "luxury stays",
    "past events", "load more", "view all", "see all", "read more",
    "search", "menu", "home",
}


# ─── Browser Setup ───────────────────────────────────────────────────────────

def create_driver():
    """Create a headless Chrome browser instance."""
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
    chrome_options.page_load_strategy = "eager"

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    driver.set_page_load_timeout(60)
    return driver


# ─── Category Scraping ───────────────────────────────────────────────────────

def scrape_categories(driver):
    """
    Scrape the /events/ page to map event URLs → category names.
    The site uses <ul class="menu-tabs"> for tab labels and
    <div class="content-tabs"> for each tab's event list (1:1 mapping).
    Returns a dict mapping detail_url → category name.
    """
    print(f"\n{'='*60}")
    print("Scraping event categories from filter tabs...")
    print(f"{'='*60}")

    category_map = {}  # detail_url → category

    driver.get("https://thepartyfinder.com/events/")
    time.sleep(3)

    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")

    # Get tab labels from <ul class="menu-tabs">
    tabs_ul = soup.find("ul", class_="menu-tabs")
    if not tabs_ul:
        print("  [WARN] Could not find menu-tabs element")
        return category_map

    tab_labels = [li.get_text(strip=True) for li in tabs_ul.find_all("li")]
    print(f"  Found tabs: {tab_labels}")

    # Get all <div class="content-tabs"> — one per tab
    content_divs = soup.find_all("div", class_="content-tabs")
    print(f"  Found {len(content_divs)} content sections")

    for i, div in enumerate(content_divs):
        # Get the tab label (skip "All" tab at index 0)
        cat_name = tab_labels[i] if i < len(tab_labels) else f"Unknown-{i}"
        if cat_name.lower() == "all":
            continue

        # Find all event detail links in this tab's content
        event_links = set()
        for a in div.find_all("a", href=True):
            href = a["href"]
            if "thepartyfinder.com/events/" in href and not href.endswith("/events/"):
                event_links.add(href.lower().strip().rstrip("/"))

        for link in event_links:
            if link not in category_map:
                category_map[link] = cat_name

        print(f"  [{cat_name}] {len(event_links)} events")

    print(f"  Total categorized URLs: {len(category_map)}")
    return category_map


# ─── Date Conversion ─────────────────────────────────────────────────────────

def day_name_to_date(day_str):
    """
    Convert a day name (e.g., "Tuesday", "FRIDAY", "Wed") to the
    next occurrence in yyyy/mm/dd format.
    Returns the original string if it can't be parsed.
    """
    if not day_str:
        return ""

    day_lower = day_str.strip().lower()

    # Handle "every tuesday" → "tuesday"
    day_lower = re.sub(r'^every\s+', '', day_lower)

    # Handle day ranges like "Wed-Sun" → use the first day
    if "-" in day_lower:
        day_lower = day_lower.split("-")[0].strip()

    # Look up the weekday number
    target_weekday = DAY_NAME_MAP.get(day_lower)
    if target_weekday is None:
        # Not a recognized day name — return as-is
        return day_str

    # Calculate the next occurrence of this weekday
    today = datetime.now()
    today_weekday = today.weekday()  # Monday=0, Sunday=6

    days_ahead = target_weekday - today_weekday
    if days_ahead <= 0:
        days_ahead += 7  # Next week

    next_date = today + timedelta(days=days_ahead)
    return next_date.strftime("%Y/%m/%d")


# ─── Listing Page Scraping ───────────────────────────────────────────────────

def scrape_listing_page(driver, url):
    """
    Scrape a listing page for event cards.
    Returns a list of dicts with partial event data + detail_url.
    """
    print(f"\n{'='*60}")
    print(f"Scraping listing: {url}")
    print(f"{'='*60}")

    # Load page with retry (homepage can be slow due to heavy embeds)
    for attempt in range(3):
        try:
            driver.get(url)
            break
        except Exception as e:
            if attempt < 2:
                print(f"  [WARN] Page load timeout (attempt {attempt+1}/3), retrying...")
                continue
            else:
                print(f"  [ERROR] Failed to load {url} after 3 attempts: {e}")
                return []
    time.sleep(3)

    # Scroll to trigger lazy-loaded content
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(1)
    driver.execute_script("window.scrollTo(0, 0);")
    time.sleep(1)

    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")

    # Remove noise sections BEFORE searching for cards:
    # - Event Photos gallery (div.galleryfp, div.gallery-ib)
    # - Top Venues section (div.venuefp, div.venue-ib, div.latest-services)
    # - Instagram feed (div.sbi_photo_wrap, div.sbi-feed)
    # - On /events/ page: remove all content-tabs that are NOT the active "All" tab
    noise_selectors = [
        "div.galleryfp", "div.gallery-ib",
        "div.venuefp", "div.venue-ib", "div.latest-services",
        "[class*='sbi_photo']", "[class*='sbi-feed']", "[class*='sbi_']",
    ]
    for sel in noise_selectors:
        for el in soup.select(sel):
            el.decompose()

    # For /events/ page: the page embeds one content-tabs div per category tab.
    # Only keep the first "active" tab (the "All" tab) and remove the rest,
    # otherwise the same event appears once per category it belongs to.
    is_events_page = url.rstrip("/").endswith("/events")
    if is_events_page:
        all_content_tabs = soup.find_all("div", class_="content-tabs")
        # Keep only the first div (the "All" active tab); remove the rest
        for ct in all_content_tabs[1:]:
            ct.decompose()
        kept = len(all_content_tabs[:1])
        removed = len(all_content_tabs) - kept
        if removed:
            print(f"  Removed {removed} hidden category-tab divs (keeping 'All' tab only)")

    events = []

    # Strategy 1: Look for event cards (WordPress patterns)
    cards = soup.select("article, .event-card, .post, .card, .entry")

    if not cards:
        cards = soup.find_all("div", class_=lambda c: c and any(
            kw in str(c).lower() for kw in ["event", "card", "post", "item"]
        ))

    if not cards:
        h3_tags = soup.find_all("h3")
        for h3 in h3_tags:
            parent = h3.parent
            for _ in range(5):
                if parent and parent.name in ["article", "div", "section", "li"]:
                    if parent not in cards:
                        cards.append(parent)
                    break
                if parent:
                    parent = parent.parent

    print(f"  Found {len(cards)} potential card containers")

    for card in cards:
        event_data = extract_card_data(card, url)
        if event_data and event_data.get("event_name"):
            events.append(event_data)

    # Deduplicate within this page
    seen = set()
    unique_events = []
    for ev in events:
        key = (ev.get("event_name", "").lower().strip(), ev.get("venue_name", "").lower().strip())
        if key not in seen and key[0]:
            seen.add(key)
            unique_events.append(ev)

    print(f"  Extracted {len(unique_events)} unique events from listing")
    return unique_events


def extract_card_data(card, source_url):
    """Extract event data from a single card element."""
    data = {
        "event_name": "",
        "venue_name": "",
        "event_date": "",
        "event_time": "",
        "detail_url": "",
        "source_url": source_url,
    }

    # Event name: usually in h3, h2, or h4
    name_el = card.find(["h3", "h2", "h4"])
    if name_el:
        data["event_name"] = name_el.get_text(strip=True)

    if not data["event_name"]:
        link = card.find("a", class_=lambda c: c and "title" in str(c).lower())
        if link:
            data["event_name"] = link.get_text(strip=True)

    # Venue name + time: often in <ul><li> elements
    list_items = card.find_all("li")
    for li in list_items:
        text = li.get_text(strip=True)

        if not data["venue_name"] and not re.search(r'\d{1,2}[:\s]?\d{0,2}\s*(AM|PM|am|pm)', text):
            if len(text) > 2 and not text.startswith("http"):
                data["venue_name"] = text

        if re.search(r'(monday|tuesday|wednesday|thursday|friday|saturday|sunday|daily|weekly|mon|tue|wed|thu|fri|sat|sun)', text.lower()):
            day_match = re.search(
                r'(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|'
                r'Mon|Tue|Wed|Thu|Fri|Sat|Sun|Daily|Weekly|'
                r'Mon-Sun|Wed-Sun|Thu-Sat|Fri-Sat)[,\s-]*',
                text, re.IGNORECASE
            )
            if day_match:
                data["event_date"] = day_match.group(0).strip().rstrip(",- ")

            # Match full time range like "11 PM - 4 AM" or "9:30 PM - 4 AM"
            time_match = re.search(
                r'(\d{1,2}(?:[:.]\d{2})?\s*(?:AM|PM)\s*(?:-|to|till|–)\s*\d{1,2}(?:[:.]\d{2})?\s*(?:AM|PM))',
                text, re.IGNORECASE
            )
            if time_match:
                data["event_time"] = time_match.group(0).strip()
            else:
                time_match = re.search(
                    r'(\d{1,2}(?:[:.]\d{2})?\s*(?:AM|PM))',
                    text, re.IGNORECASE
                )
                if time_match:
                    data["event_time"] = time_match.group(0).strip()

        elif re.search(r'\d{1,2}[:\s]?\d{0,2}\s*(AM|PM|am|pm)', text, re.IGNORECASE):
            data["event_time"] = text

    # Detail URL: "Read More" link or main card link
    read_more = card.find("a", string=re.compile(r"read\s*more|view\s*more|learn\s*more|details", re.IGNORECASE))
    if read_more and read_more.get("href"):
        data["detail_url"] = read_more["href"]
    else:
        for a in card.find_all("a", href=True):
            href = a["href"]
            if href and "thepartyfinder.com" in href and href != source_url:
                if not href.endswith(("/events/", "/weekly-events/", "/")):
                    data["detail_url"] = href
                    break

    # Make detail URL absolute
    if data["detail_url"] and not data["detail_url"].startswith("http"):
        data["detail_url"] = "https://thepartyfinder.com" + data["detail_url"]

    return data


def is_valid_event(event):
    """Filter out noise entries that aren't real events."""
    name = event.get("event_name", "").strip()
    name_lower = name.lower()

    # Skip noise names
    if name_lower in NOISE_NAMES:
        return False

    # Skip very short names (likely nav items like "ORA", "PAPA", "BLU")
    # UNLESS they have a detail_url pointing to /events/
    if len(name) <= 5 and "/events/" not in event.get("detail_url", ""):
        return False

    # Skip blog post titles (very long, article-like names)
    if len(name) > 80 and not event.get("event_date") and not event.get("event_time"):
        return False

    # Skip entries where venue_name looks like a number (e.g., "4.0" from rating)
    venue = event.get("venue_name", "").strip()
    if venue and re.match(r'^\d+\.?\d*$', venue):
        event["venue_name"] = ""  # Clear invalid venue name

    # Skip entries where venue is "Location" or "Open Gallery" (UI labels)
    if venue.lower() in ("location", "open gallery", "all"):
        event["venue_name"] = ""  # Clear UI label

    # Skip venue-only pages (not events)
    if "/venues/" in event.get("detail_url", "") and "/events/" not in event.get("detail_url", ""):
        return False

    # Must have either: a /events/ detail URL, or date/time info
    has_event_url = "/events/" in event.get("detail_url", "")
    has_date_time = bool(event.get("event_date") or event.get("event_time"))

    if not has_event_url and not has_date_time:
        return False

    return True


# ─── Detail Page Scraping ────────────────────────────────────────────────────

def scrape_detail_page(driver, event):
    """
    Visit event detail page and extract additional data:
    - instagram_id
    - venue_area (address/location)
    - context (all text content)
    """
    detail_url = event.get("detail_url", "")
    if not detail_url:
        return event

    # Only scrape /events/ and /venues/ pages, skip blog posts
    if "/events/" not in detail_url and "/venues/" not in detail_url:
        return event

    print(f"  -> Detail: {detail_url[:80]}...")

    try:
        driver.get(detail_url)
        time.sleep(REQUEST_DELAY)

        html = driver.page_source
        soup = BeautifulSoup(html, "html.parser")

        # ── Instagram ID (venue/event specific, not site handle) ──
        instagram = extract_instagram(soup, html)
        if instagram:
            event["instagram_id"] = instagram

        # ── Venue Area / Address ──
        venue_area = extract_venue_area(soup)
        if venue_area:
            event["venue_area"] = venue_area

        # ── Also extract/improve venue_name from detail page if missing ──
        if not event.get("venue_name"):
            venue_name = extract_venue_name_from_detail(soup)
            if venue_name:
                event["venue_name"] = venue_name

        # ── Context: All meaningful text from the page ──
        context = extract_full_context(html)
        if context:
            event["context"] = context

        # ── Also try to get better event_date/time from detail page ──
        if not event.get("event_date") or not event.get("event_time"):
            date_time = extract_date_time_from_detail(soup)
            if date_time.get("event_date") and not event.get("event_date"):
                event["event_date"] = date_time["event_date"]
            if date_time.get("event_time") and not event.get("event_time"):
                event["event_time"] = date_time["event_time"]

    except Exception as e:
        print(f"    [ERROR] Failed to scrape detail page: {e}")

    return event


def extract_instagram(soup, html):
    """
    Extract venue/event-specific Instagram handle.
    Skips the site's own handles (@partyfinderdubai etc).
    """
    all_handles = []

    # Method 1: Look for Instagram links in the page
    ig_links = soup.find_all("a", href=re.compile(r"instagram\.com/", re.IGNORECASE))
    for link in ig_links:
        href = link.get("href", "")
        match = re.search(r"instagram\.com/([A-Za-z0-9_.]+)", href)
        if match:
            handle = match.group(1).lower().rstrip("/")
            if handle not in SITE_IG_HANDLES:
                all_handles.append(handle)

    # Method 2: Look for @handle patterns in text content
    # Focus on the main content area, not header/footer
    content_area = soup.find("main") or soup.find("article") or soup.find(
        class_=re.compile(r"content|entry|post|single", re.IGNORECASE)
    )
    if content_area:
        text = content_area.get_text()
    else:
        text = soup.get_text()

    ig_mentions = re.findall(r"@([A-Za-z0-9_.]{3,30})", text)
    for mention in ig_mentions:
        handle = mention.lower()
        if handle not in SITE_IG_HANDLES and not handle.endswith("."):
            all_handles.append(handle)

    # Method 3: Search raw HTML for Instagram URLs (catches hidden/JS links)
    ig_urls = re.findall(r"instagram\.com/([A-Za-z0-9_.]+)", html)
    for handle in ig_urls:
        handle = handle.lower().rstrip("/")
        if handle not in SITE_IG_HANDLES:
            all_handles.append(handle)

    # Return the first unique, valid handle found
    seen = set()
    for h in all_handles:
        if h not in seen and len(h) >= MIN_IG_HANDLE_LEN:
            seen.add(h)
            return f"@{h}"

    return ""


def is_valid_address(text):
    """Check if text looks like a real address (not a button label or venue name)."""
    if not text or len(text) < 8:
        return False
    text_lower = text.lower().strip()
    # Reject known non-address strings
    bad_patterns = [
        "open in google", "view on map", "get directions", "click here",
        "read more", "learn more", "book now", "reserve",
        # Common venue names that appear in "TOP VENUES" sidebar
        "o beach dubai", "surf club", "ora club dubai", "papa dubai",
        "avenue club", "dream dubai", "ce la vi", "wane by somiya",
        "dubai's urban pool party",
    ]
    for bad in bad_patterns:
        if bad in text_lower:
            return False
    # Reject pure venue names (short, no comma, no specific address indicators)
    # "O Beach Dubai" is a venue name, not an address
    # Real addresses typically have: comma, floor/road/street, or detailed location
    has_comma = "," in text
    has_address_detail = bool(re.search(
        r'(road|street|st\.|floor|level|tower|hotel|resort|mall|district|'
        r'building|block|gate|sector|plot|cluster)',
        text, re.IGNORECASE
    ))
    has_area_name = bool(re.search(
        r'(jumeirah|deira|sheikh zayed|al habtoor|marina|downtown|'
        r'jbr|difc|barsha|tecom|al wasl|al sufouh|city walk|la mer|palm|'
        r'business bay|bur dubai|karama|satwa|mirdif|silicon oasis|'
        r'address sky view|address beach|four seasons|hilton|sheraton|'
        r'marriott|fairmont|shangri.la|voco|taj dubai)',
        text, re.IGNORECASE
    ))
    # Must have at least a comma OR an address-specific keyword
    if not has_comma and not has_address_detail and not has_area_name:
        return False
    # Short text without comma is likely a venue name
    if len(text) < 20 and not has_comma and not has_address_detail:
        return False
    return True


def extract_venue_area(soup):
    """Extract venue area/address from the detail page."""

    # Method 0: Look inside event-morep for LOCATION label followed by address text
    event_more = soup.find(class_="event-morep")
    if event_more:
        text_block = event_more.get_text(separator="\n")
        lines = [l.strip() for l in text_block.split("\n") if l.strip()]
        for i, line in enumerate(lines):
            if line.lower() in ("location", "location & time", "address"):
                # Next non-empty line is the address
                for j in range(i + 1, min(i + 4, len(lines))):
                    candidate = lines[j]
                    if is_valid_address(candidate):
                        return candidate

    # Method 1: Look for structured data with address labels
    for tag in soup.find_all(["h3", "h4", "strong", "b", "dt"]):
        tag_text = tag.get_text(strip=True).lower()
        if tag_text in ("venue", "location", "address", "where"):
            next_el = tag.find_next_sibling()
            if next_el:
                addr = next_el.get_text(strip=True)
                if is_valid_address(addr):
                    return addr
            parent = tag.parent
            if parent:
                full_text = parent.get_text(strip=True)
                addr = re.sub(r'^(venue|location|address|where)\s*:?\s*', '', full_text, flags=re.IGNORECASE)
                if is_valid_address(addr):
                    return addr

    # Method 2: Look for "Location:" pattern in text
    for indicator in ["location", "address"]:
        label = soup.find(string=re.compile(rf"{indicator}\s*:", re.IGNORECASE))
        if label:
            parent = label.parent if hasattr(label, "parent") else None
            if parent:
                text = parent.get_text(strip=True)
                text = re.sub(rf"^.*?{indicator}\s*:\s*", "", text, flags=re.IGNORECASE)
                if is_valid_address(text):
                    return text.strip()

    # Method 3: Look for elements with address-related classes
    addr_els = soup.find_all(class_=re.compile(r"address|location|venue.?area|place", re.IGNORECASE))
    for el in addr_els:
        text = el.get_text(strip=True)
        if is_valid_address(text):
            return text

    # Method 4: Look for Google Maps links
    maps_link = soup.find("a", href=re.compile(r"google\.\w+/maps|maps\.google|goo\.gl/maps", re.IGNORECASE))
    if maps_link:
        text = maps_link.get_text(strip=True)
        if is_valid_address(text):
            return text

    # Method 5: Look for address-like text with "Dubai" + comma pattern
    content_area = soup.find("main") or soup.find("article") or soup
    all_text = content_area.get_text()

    addr_pattern = re.compile(
        r'([A-Z0-9][^.!?\n]{5,100},\s*(?:Dubai|Abu Dhabi|Sharjah|Ajman|RAK))',
        re.IGNORECASE
    )
    matches = addr_pattern.findall(all_text)
    for match in matches:
        match = match.strip()
        if 10 < len(match) < 200 and is_valid_address(match):
            return match

    # Method 6: Look for location keywords near "Dubai"
    dubai_pattern = re.compile(
        r'[^.!?\n]*(?:road|street|floor|hotel|resort|marina|downtown|jumeirah|'
        r'deira|bur|jbr|difc|creek|mall|city walk|la mer|palm|barsha|tecom|'
        r'al habtoor|sheikh zayed|al wasl|al sufouh)[^.!?\n]*dubai[^.!?\n]*',
        re.IGNORECASE
    )
    matches = dubai_pattern.findall(all_text)
    for match in matches:
        match = match.strip()
        if 10 < len(match) < 200 and is_valid_address(match):
            return match

    return ""


def extract_venue_name_from_detail(soup):
    """Try to extract venue name from detail page when listing didn't provide one."""
    # Look for "VENUE" label followed by venue name
    for tag in soup.find_all(["h3", "h4", "strong", "dt"]):
        if tag.get_text(strip=True).lower() == "venue":
            next_el = tag.find_next_sibling()
            if next_el:
                name = next_el.get_text(strip=True)
                if name and 2 < len(name) < 100:
                    return name

    return ""


def extract_full_context(html_string):
    """
    Extract ALL meaningful text content from the detail page HTML.
    Captures descriptions, pricing, dress code, age requirements, etc.

    Takes raw HTML string (not soup) to avoid mutation issues.
    """
    # Re-parse from raw HTML so we don't affect the main soup
    soup2 = BeautifulSoup(html_string, "html.parser")

    # Remove unwanted elements
    for tag in soup2.find_all(["script", "style", "noscript", "nav", "iframe"]):
        tag.decompose()

    # Remove header and footer if they exist
    for tag in soup2.find_all(["header", "footer"]):
        tag.decompose()

    # Remove EVENT PHOTOS, TOP VENUES, and Instagram feed sections
    for sel in [
        "div.galleryfp", "div.gallery-ib",
        "div.venuefp", "div.venue-ib", "div.latest-services",
        "[class*='sbi_photo']", "[class*='sbi-feed']", "[class*='sbi_']",
    ]:
        for el in soup2.select(sel):
            el.decompose()

    # ThePartyFinder.com specific: event detail pages use these classes
    # 1. div.event-morep — main content with event details, pricing, age limit, etc.
    # 2. div.about-event-info — event description/about text
    # Combine both for full context
    text_parts = []

    about_info = soup2.find(class_="about-event-info")
    if about_info:
        text_parts.append(about_info.get_text(separator="\n", strip=True))

    event_more = soup2.find(class_="event-morep")
    if event_more:
        text_parts.append(event_more.get_text(separator="\n", strip=True))

    # If site-specific classes not found, try standard patterns
    if not text_parts:
        content = (
            soup2.find("article")
            or soup2.find("main")
            or soup2.find(class_=re.compile(r"entry-content|post-content|single-content|article-content", re.IGNORECASE))
        )

        if not content:
            # Fallback: find the largest text-containing div
            body = soup2.find("body")
            if body:
                divs = body.find_all("div")
                best_div = None
                best_len = 0
                for div in divs:
                    text_len = len(div.get_text(strip=True))
                    if text_len > best_len and text_len > 200:
                        best_len = text_len
                        best_div = div
                content = best_div or body

        if content:
            text_parts.append(content.get_text(separator="\n", strip=True))

    if not text_parts:
        return ""

    text = "\n".join(text_parts)

    # Clean up
    lines = text.split("\n")
    cleaned_lines = []
    skip_patterns = [
        r"^(home|menu|search|login|sign up|subscribe|cookie|privacy|terms)$",
        r"^(share|tweet|pin|like|comment|reply)$",
        r"^(next|previous|back|close|open)$",
        r"^\d+\s*(comments?|views?|shares?|likes?)$",
        r"^(the party finder|thepartyfinder|partyfinderdubai)$",
        r"^(all rights reserved|copyright|\u00a9)",
        r"^open in google",
        r"^event photos$",
        r"^find the best",
        r"^story$",
        r"^events$",
        r"^status$",
        r"^\+971",           # phone numbers
        r"^click to quick reserve",
        r"^have a question",
        r"^book now$",
        r"^\d{3,6}$",        # bare numbers (view counts like "6206", "2154")
    ]

    seen_lines = set()
    for line in lines:
        line = line.strip()
        if not line or len(line) < 3:
            continue
        if any(re.match(pat, line, re.IGNORECASE) for pat in skip_patterns):
            continue
        # Deduplicate identical lines (removes duplicated "The Essentials" blocks)
        if line in seen_lines:
            continue
        seen_lines.add(line)
        cleaned_lines.append(line)

    context = "\n".join(cleaned_lines)

    # Truncate if extremely long (Google Sheets cell limit is 50,000 chars)
    if len(context) > 10000:
        context = context[:10000] + "\n... [truncated]"

    return context


def extract_date_time_from_detail(soup):
    """Try to extract date/time from the detail page content."""
    result = {"event_date": "", "event_time": ""}

    # Focus on content area
    content = soup.find("article") or soup.find("main") or soup
    text = content.get_text()

    # Look for specific calendar dates first (e.g., "14 June", "June 14", "14 June 2026")
    # These take priority over day-of-week patterns
    MONTHS = (r'January|February|March|April|May|June|July|August|'
              r'September|October|November|December|'
              r'Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Oct|Nov|Dec')
    specific_date = re.search(
        rf'(\d{{1,2}}\s+(?:{MONTHS})(?:\s+\d{{4}})?|(?:{MONTHS})\s+\d{{1,2}}(?:\s+\d{{4}})?)',
        text, re.IGNORECASE
    )
    if specific_date:
        raw = specific_date.group(0).strip()
        # Try to parse into yyyy/mm/dd
        for fmt in ("%d %B %Y", "%d %B", "%B %d %Y", "%B %d",
                    "%d %b %Y", "%d %b", "%b %d %Y", "%b %d"):
            try:
                dt = datetime.strptime(raw, fmt)
                if dt.year == 1900:
                    dt = dt.replace(year=datetime.now().year)
                result["event_date"] = dt.strftime("%Y/%m/%d")
                break
            except ValueError:
                continue

    # Fall back to day-of-week if no specific date found
    if not result["event_date"]:
        day_match = re.search(
            r'(Every\s+)?(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|'
            r'Mon-Sun|Wed-Sun|Thu-Sat|Fri-Sat|Daily)',
            text, re.IGNORECASE
        )
        if day_match:
            result["event_date"] = day_match.group(0).strip()

    # Look for time patterns
    time_match = re.search(
        r'(\d{1,2}(?::\d{2})?\s*(?:AM|PM)\s*(?:-|to|till|–)\s*\d{1,2}(?::\d{2})?\s*(?:AM|PM))',
        text, re.IGNORECASE
    )
    if time_match:
        result["event_time"] = time_match.group(0).strip()
    else:
        time_match = re.search(
            r'(\d{1,2}(?::\d{2})?\s*(?:AM|PM)\s*(?:till|to|–|-)\s*\w+)',
            text, re.IGNORECASE
        )
        if time_match:
            result["event_time"] = time_match.group(0).strip()

    return result


# ─── Google Sheets Integration ───────────────────────────────────────────────

def write_to_google_sheets(events):
    """Write event data to Google Sheets."""
    if not GSPREAD_AVAILABLE:
        print("\n[WARN] gspread not available. Saving to CSV instead.")
        save_to_csv(events)
        return

    if not os.path.exists(CREDENTIALS_PATH):
        print(f"\n[WARN] Credentials file not found at: {CREDENTIALS_PATH}")
        print("       Please follow the setup instructions to create a service account.")
        print("       Saving to CSV instead...")
        save_to_csv(events)
        return

    print(f"\n{'='*60}")
    print("Writing to Google Sheets...")
    print(f"{'='*60}")

    try:
        scopes = [
            "https://www.googleapis.com/auth/spreadsheets",
            "https://www.googleapis.com/auth/drive",
        ]
        creds = Credentials.from_service_account_file(CREDENTIALS_PATH, scopes=scopes)
        client = gspread.authorize(creds)

        spreadsheet = client.open_by_key(SPREADSHEET_ID)
        worksheet = spreadsheet.sheet1

        scraped_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        rows = [HEADERS]
        for ev in events:
            row = [
                ev.get("instagram_id", ""),
                ev.get("event_date", ""),
                ev.get("event_time", ""),
                ev.get("event_name", ""),
                ev.get("event_category", ""),
                ev.get("context", ""),
                ev.get("venue_name", ""),
                ev.get("venue_area", ""),
                scraped_date,
            ]
            rows.append(row)

        worksheet.clear()
        worksheet.update(range_name="A1", values=rows)

        worksheet.format("A1:I1", {
            "textFormat": {"bold": True},
            "backgroundColor": {"red": 0.9, "green": 0.9, "blue": 0.9},
        })

        print(f"  Successfully wrote {len(events)} events to Google Sheets!")
        print(f"  Sheet URL: https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}")

    except Exception as e:
        print(f"\n[ERROR] Failed to write to Google Sheets: {e}")
        print("        Saving to CSV as fallback...")
        save_to_csv(events)


def write_to_supabase(events):
    """Write event data to Supabase partyfinder_scraper table."""
    from supabase_config import supabase_client, SUPABASE_AVAILABLE

    if not SUPABASE_AVAILABLE:
        print("\n[WARN] Supabase not configured. Skipping Supabase write.")
        return

    if not events:
        print("\n[WARN] No events to write. Skipping Supabase write (preserving existing data).")
        return

    try:
        print("\n  Writing to Supabase (partyfinder_scraper)...")
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
            supabase_client.table("partyfinder_scraper").insert(batch).execute()

        # Only delete old data AFTER successful insert
        supabase_client.table("partyfinder_scraper").delete().neq("scraped_date", scraped_date).execute()

        print(f"  Successfully wrote {len(events)} events to Supabase (partyfinder_scraper)!")

    except Exception as e:
        print(f"\n[ERROR] Failed to write to Supabase: {e}")


def save_to_csv(events):
    """Fallback: Save events to a CSV file."""
    import csv

    csv_path = os.path.join(os.path.dirname(__file__), "scraped_events.csv")

    scraped_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=HEADERS, extrasaction="ignore")
        writer.writeheader()
        for ev in events:
            writer.writerow({
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

    print(f"\n  Saved {len(events)} events to: {csv_path}")


# ─── Main Execution ──────────────────────────────────────────────────────────

def main():
    print("=" * 60)
    print("  ThePartyFinder.com Scraper")
    print(f"  Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)

    print("\nLaunching headless Chrome...")
    driver = create_driver()

    try:
        # Step 1: Scrape categories by clicking filter tabs on /events/
        category_map = scrape_categories(driver)

        # Step 2: Scrape all listing pages
        all_events = []
        for url in URLS:
            events = scrape_listing_page(driver, url)
            all_events.extend(events)

        print(f"\nTotal events from all pages: {len(all_events)}")

        # Step 3: Filter out noise entries
        valid_events = [ev for ev in all_events if is_valid_event(ev)]
        print(f"After noise filtering: {len(valid_events)} valid events")

        # Step 4: Global deduplication (same event on multiple pages)
        dedup_map = {}
        for ev in valid_events:
            detail = ev.get("detail_url", "").lower().strip()
            name = ev.get("event_name", "").lower().strip()

            if detail:
                key = detail
            else:
                key = name

            if key not in dedup_map:
                dedup_map[key] = ev
            else:
                existing = dedup_map[key]
                if len(ev.get("event_name", "")) > len(existing.get("event_name", "")):
                    existing["event_name"] = ev["event_name"]
                for field in ["event_date", "event_time", "venue_name"]:
                    if not existing.get(field) and ev.get(field):
                        existing[field] = ev[field]

        unique_events = list(dedup_map.values())
        print(f"After deduplication: {len(unique_events)} unique events")

        # Step 5: Assign categories from the category_map (URL-based match)
        for event in unique_events:
            detail_url = event.get("detail_url", "").lower().strip().rstrip("/")
            if detail_url in category_map:
                event["event_category"] = category_map[detail_url]

        cat_count = sum(1 for e in unique_events if e.get("event_category"))
        print(f"Events with category (URL-match): {cat_count}/{len(unique_events)}")

        # Step 6: Scrape detail pages
        print(f"\nScraping {len(unique_events)} detail pages...")
        for i, event in enumerate(unique_events):
            print(f"  [{i+1}/{len(unique_events)}] {event.get('event_name', 'Unknown')[:50]}")
            scrape_detail_page(driver, event)
            time.sleep(0.5)

        # Step 6b: Keyword-based category fallback (runs AFTER detail scraping
        # so that venue_name from detail pages is available)
        CATEGORY_KEYWORDS = [
            ("Brunch",           ["brunch"]),
            ("Ladies Night",     ["ladies night", "ladies day", "lady night", "ladies"]),
            ("Beach & Pool",     ["beach", "pool", "surf", "o beach", "zero gravity",
                                  "surf club", "nikki beach"]),
            ("After Party",      ["after party", "afterparty"]),
            ("Persian & Arabic", ["persian", "arabic", "farsi"]),
            ("Restaurant",       ["restaurant", "dinner show", "dining", "dinner",
                                  "izel", "torno subito", "nobu", "coya", "trove"]),
            ("Nightclub",        ["nightclub", "night club", "sky 2.0", "sky2.0",
                                  "skyami", "sky dance", "sky lounge nightclub",
                                  "fly friday", "fly dubai", "fly nightclub",
                                  "opal room", "ukiyo", "vision club",
                                  "dusk till dawn", "club"]),
        ]
        for event in unique_events:
            if event.get("event_category"):
                continue  # already assigned by URL-match
            # Build search text from event name + venue name + URL slug
            url_slug = (
                event.get("detail_url", "")
                .split("/events/")[-1]
                .replace("-", " ")
                .rstrip("/")
            )
            search_text = (
                event.get("event_name", "") + " " +
                event.get("venue_name", "") + " " +
                url_slug
            ).lower()
            for cat_name, keywords in CATEGORY_KEYWORDS:
                if any(kw in search_text for kw in keywords):
                    event["event_category"] = cat_name
                    break

        cat_count = sum(1 for e in unique_events if e.get("event_category"))
        print(f"Events with category (after keyword fallback): {cat_count}/{len(unique_events)}")

        # Step 7: Convert event_date from day names to yyyy/mm/dd
        for event in unique_events:
            raw_date = event.get("event_date", "")
            if raw_date:
                event["event_date"] = day_name_to_date(raw_date)

        # Step 8: Print summary
        print(f"\n{'='*60}")
        print("  SCRAPING COMPLETE - Summary")
        print(f"{'='*60}")
        print(f"  Total unique events: {len(unique_events)}")

        ig_count = sum(1 for e in unique_events if e.get("instagram_id"))
        area_count = sum(1 for e in unique_events if e.get("venue_area"))
        ctx_count = sum(1 for e in unique_events if e.get("context"))
        cat_count = sum(1 for e in unique_events if e.get("event_category"))
        print(f"  With Instagram: {ig_count}")
        print(f"  With Venue Area: {area_count}")
        print(f"  With Context: {ctx_count}")
        print(f"  With Category: {cat_count}")

        print(f"\n  Preview (first 5 events):")
        for ev in unique_events[:5]:
            print(f"    - {ev.get('event_name', '?')} @ {ev.get('venue_name', '?')}")
            print(f"      Date: {ev.get('event_date', '?')} | Time: {ev.get('event_time', '?')} | Cat: {ev.get('event_category', '?')}")
            print(f"      IG: {ev.get('instagram_id', 'N/A')} | Area: {ev.get('venue_area', 'N/A')[:60]}")

        # Step 9: Write to Google Sheets (or CSV fallback)
        try:
            write_to_google_sheets(unique_events)
        except Exception as e:
            print(f"\n[ERROR] Google Sheets write failed: {e}")

        # Step 10: Write to Supabase
        try:
            write_to_supabase(unique_events)
        except Exception as e:
            print(f"\n[ERROR] Supabase write failed: {e}")

    finally:
        driver.quit()
        print("\nBrowser closed. Done!")


if __name__ == "__main__":
    main()
