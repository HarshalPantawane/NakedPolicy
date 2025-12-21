#!/usr/bin/env python3
"""
policy_fetcher_safe.py

Ethical, production-safe policy fetcher:
- Tier 1: requests (static fetch)
- Tier 2: Playwright fallback
- No bot-protection bypass attempts
- Expanded policy paths + keywords
"""

import os
import re
import sys
import requests
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright, TimeoutError as PWTimeoutError


# =========================================================
# CONFIG
# =========================================================

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "en-US,en;q=0.9",
}

MIN_TEXT_LEN = 500
OUT_DIR = "policies"

BOT_PHRASES = [
    "just a moment",
    "checking your browser",
    "cloudflare",
    "ray id",
    "enable javascript",
    "verifying you are human",
    "security check",
]

# =========================================================
# KEYWORDS (used for content validation)
# =========================================================

KEYWORDS = {
    "privacy": [
        "privacy",
        "privacy policy",
        "data protection",
        "data privacy",
        "personal data",
    ],
    "terms": [
        "terms",
        "terms of service",
        "terms of use",
        "terms and conditions",
        "conditions of use",
        "user agreement",
    ],
    "cookies": [
        "cookie",
        "cookies",
        "cookie policy",
        "tracking technologies",
    ],
    "code_of_conduct": [
        "code of conduct",
        "ethics",
        "acceptable use",
        "behavior",
    ],
}

# =========================================================
# COMMON PATHS (single source of truth)
# =========================================================

COMMON_PATHS = {
    "privacy": [
        "/privacy",
        "/privacy-policy",
        "/privacy_policy",
        "/privacy-notice",
        "/data-protection",
        "/data-privacy",
        "/legal/privacy",
        "/legal/privacy-policy",
    ],
    "terms": [
        "/terms",
        "/terms-of-service",
        "/terms-of-use",
        "/terms-and-conditions",
        "/terms_conditions",
        "/conditions",
        "/conditions-of-use",
        "/user-agreement",
        "/legal/terms",
    ],
    "cookies": [
        "/cookie",
        "/cookies",
        "/cookie-policy",
        "/cookie_policy",
        "/cookies-policy",
        "/cookie-settings",
        "/legal/cookies",
    ],
    "code_of_conduct": [
        "/code-of-conduct",
        "/code_of_conduct",
        "/conduct",
        "/ethics",
        "/acceptable-use",
        "/acceptable-use-policy",
        "/aup",
        "/legal/code-of-conduct",
    ],
}

# =========================================================
# AUTO-GENERATE POLICY_PATHS
# =========================================================

POLICY_PATHS = []
_seen = set()

for paths in COMMON_PATHS.values():
    for p in paths:
        if p not in _seen:
            POLICY_PATHS.append(p)
            _seen.add(p)


# =========================================================
# UTILITIES
# =========================================================

def clean_text(html: str) -> str:
    soup = BeautifulSoup(html or "", "html.parser")
    for tag in soup(["script", "style", "noscript", "iframe"]):
        tag.decompose()
    text = soup.get_text(" ", strip=True)
    return re.sub(r"\s{2,}", " ", text)


def is_bot_page(text: str) -> bool:
    lower = (text or "").lower()
    return any(p in lower for p in BOT_PHRASES)


def contains_keywords(text: str, policy_type: str) -> bool:
    lower = (text or "").lower()
    return any(k in lower for k in KEYWORDS.get(policy_type, []))


def safe_domain(url: str) -> str:
    return urlparse(url).netloc.replace(":", "_")


def save_file(domain: str, policy_type: str, text: str):
    os.makedirs(OUT_DIR, exist_ok=True)
    fname = f"{domain}_{policy_type}.txt"
    path = os.path.join(OUT_DIR, fname)
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)
    print(f"[saved] {fname} ({len(text)} chars)")


# =========================================================
# TIER 1 — STATIC FETCH
# =========================================================

def fetch_static(url: str) -> str | None:
    try:
        r = requests.get(url, headers=HEADERS, timeout=15)
        if r.status_code != 200:
            return None
        text = clean_text(r.text)
        if len(text) < MIN_TEXT_LEN or is_bot_page(text):
            return None
        return text
    except Exception:
        return None


# =========================================================
# TIER 2 — PLAYWRIGHT FALLBACK
# =========================================================

def fetch_playwright(url: str) -> str | None:
    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent=HEADERS["User-Agent"],
            locale="en-US",
            viewport={"width": 1920, "height": 1080},
        )
        page = context.new_page()
        try:
            page.goto(url, wait_until="domcontentloaded", timeout=30000)
            page.wait_for_timeout(3000)
            html = page.content()
            text = clean_text(html)
            if len(text) < MIN_TEXT_LEN or is_bot_page(text):
                return None
            return text
        except PWTimeoutError:
            return None
        finally:
            browser.close()



# =========================================================
# API FUNCTION (for app.py integration)
# =========================================================

def fetch_policy_for_url(site: str) -> dict:
    """
    Fetch policies for a website and return text (for API use)
    
    Args:
        site: Website URL (e.g., "github.com" or "https://github.com")
    
    Returns:
        dict: {
            'url': 'github.com',
            'policies': {
                'privacy': 'policy text...',
                'terms': 'policy text...',
                'cookies': 'policy text...'
            },
            'found_types': ['privacy', 'terms']
        }
    """
    if not site.startswith("http"):
        site = "https://" + site

    parsed = urlparse(site)
    origin = f"{parsed.scheme}://{parsed.netloc}"
    
    result = {
        'url': parsed.netloc,
        'policies': {},
        'found_types': []
    }

    for policy_type, paths in COMMON_PATHS.items():
        for path in paths:
            url = urljoin(origin, path)
            
            text = fetch_static(url)
            if not text:
                text = fetch_playwright(url)

            if text and contains_keywords(text, policy_type):
                result['policies'][policy_type] = text
                result['found_types'].append(policy_type)
                break

    return result


# =========================================================
# MAIN (CLI usage)
# =========================================================

def main(site: str):
    if not site.startswith("http"):
        site = "https://" + site

    parsed = urlparse(site)
    origin = f"{parsed.scheme}://{parsed.netloc}"
    domain = safe_domain(site)

    print(f"\nTarget: {origin}\n")

    for policy_type, paths in COMMON_PATHS.items():
        print(f"\n[{policy_type.upper()}]")
        found = False

        for path in paths:
            url = urljoin(origin, path)
            print(f"  → Trying {url}")

            text = fetch_static(url)
            if not text:
                text = fetch_playwright(url)

            if text and contains_keywords(text, policy_type):
                save_file(domain, policy_type, text)
                found = True
                break

        if not found:
            print("  ✗ Not found or blocked")

    print("\nDone. Check ./policies directory.")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python policy_fetcher_safe.py <website>")
        sys.exit(1)

    main(sys.argv[1])
