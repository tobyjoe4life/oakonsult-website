#!/usr/bin/env python3
"""Create a public-source content-parity inventory for oakonsult.org."""
from __future__ import annotations

import argparse
import hashlib
import json
import re
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from dataclasses import dataclass, field
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from typing import Any

BASE = "https://oakonsult.org"
UA = "Mozilla/5.0 (compatible; OAKonsult content parity audit/1.0)"
SOCIAL_HOSTS = {
    "facebook.com",
    "fb.com",
    "instagram.com",
    "linkedin.com",
    "youtube.com",
    "youtu.be",
    "twitter.com",
    "x.com",
    "tiktok.com",
}


def fetch(url: str, *, accept: str = "*/*", attempts: int = 3) -> tuple[int, dict[str, str], bytes]:
    last: Exception | None = None
    for attempt in range(attempts):
        try:
            request = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": accept})
            with urllib.request.urlopen(request, timeout=45) as response:
                return response.status, dict(response.headers.items()), response.read()
        except (urllib.error.URLError, TimeoutError) as exc:
            last = exc
            if attempt + 1 < attempts:
                time.sleep(1.5 * (attempt + 1))
    raise RuntimeError(f"failed to fetch {url}: {last}")


def clean_space(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


@dataclass
class FormInfo:
    action: str = ""
    method: str = "get"
    identifier: str = ""
    classes: str = ""
    fields: list[dict[str, Any]] = field(default_factory=list)
    buttons: list[str] = field(default_factory=list)


class PageParser(HTMLParser):
    def __init__(self, page_url: str) -> None:
        super().__init__(convert_charrefs=True)
        self.page_url = page_url
        self.title_parts: list[str] = []
        self.headings: list[dict[str, str]] = []
        self.images: list[dict[str, str]] = []
        self.links: list[dict[str, str]] = []
        self.iframes: list[dict[str, str]] = []
        self.forms: list[FormInfo] = []
        self.meta_description = ""
        self.canonical = ""
        self.text_parts: list[str] = []
        self._capture: str | None = None
        self._capture_parts: list[str] = []
        self._current_link: dict[str, str] | None = None
        self._current_button_parts: list[str] | None = None
        self._skip_depth = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = {key: value or "" for key, value in attrs}
        if tag in {"script", "style", "noscript", "svg"}:
            self._skip_depth += 1
            return
        if self._skip_depth:
            return
        if tag == "title" or tag in {"h1", "h2", "h3", "h4", "h5", "h6"}:
            self._capture = tag
            self._capture_parts = []
        elif tag == "meta" and attributes.get("name", "").lower() == "description":
            self.meta_description = clean_space(attributes.get("content", ""))
        elif tag == "link" and attributes.get("rel", "").lower() == "canonical":
            self.canonical = urllib.parse.urljoin(self.page_url, attributes.get("href", ""))
        elif tag == "a":
            href = urllib.parse.urljoin(self.page_url, attributes.get("href", ""))
            self._current_link = {"href": href, "text": ""}
            self._capture_parts = []
        elif tag == "img":
            src = attributes.get("src") or attributes.get("data-src") or attributes.get("data-lazy-src") or ""
            if src:
                self.images.append(
                    {
                        "src": urllib.parse.urljoin(self.page_url, src),
                        "alt": clean_space(attributes.get("alt", "")),
                    }
                )
        elif tag == "iframe":
            self.iframes.append(
                {
                    "src": urllib.parse.urljoin(self.page_url, attributes.get("src", "")),
                    "title": clean_space(attributes.get("title", "")),
                }
            )
        elif tag == "form":
            self.forms.append(
                FormInfo(
                    action=urllib.parse.urljoin(self.page_url, attributes.get("action", "")),
                    method=(attributes.get("method") or "get").lower(),
                    identifier=attributes.get("id", ""),
                    classes=attributes.get("class", ""),
                )
            )
        elif tag in {"input", "select", "textarea"} and self.forms:
            self.forms[-1].fields.append(
                {
                    "element": tag,
                    "name": attributes.get("name", ""),
                    "type": attributes.get("type", "") if tag == "input" else tag,
                    "required": "required" in attributes,
                    "placeholder": clean_space(attributes.get("placeholder", "")),
                }
            )
        elif tag == "button" and self.forms:
            self._current_button_parts = []

    def handle_endtag(self, tag: str) -> None:
        if tag in {"script", "style", "noscript", "svg"}:
            if self._skip_depth:
                self._skip_depth -= 1
            return
        if self._skip_depth:
            return
        if self._capture == tag:
            text = clean_space(" ".join(self._capture_parts))
            if tag == "title":
                self.title_parts = [text]
            elif text:
                self.headings.append({"level": tag, "text": text})
            self._capture = None
            self._capture_parts = []
        elif tag == "a" and self._current_link is not None:
            self._current_link["text"] = clean_space(" ".join(self._capture_parts))
            self.links.append(self._current_link)
            self._current_link = None
            self._capture_parts = []
        elif tag == "button" and self._current_button_parts is not None and self.forms:
            text = clean_space(" ".join(self._current_button_parts))
            if text:
                self.forms[-1].buttons.append(text)
            self._current_button_parts = None

    def handle_data(self, data: str) -> None:
        if self._skip_depth:
            return
        text = clean_space(data)
        if not text:
            return
        self.text_parts.append(text)
        if self._capture is not None or self._current_link is not None:
            self._capture_parts.append(text)
        if self._current_button_parts is not None:
            self._current_button_parts.append(text)


def sitemap_urls(index_url: str) -> tuple[dict[str, list[str]], list[str]]:
    _, _, index_body = fetch(index_url, accept="application/xml")
    namespace = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    index = ET.fromstring(index_body)
    children = [node.text or "" for node in index.findall(".//s:loc", namespace)]
    groups: dict[str, list[str]] = {}
    all_urls: list[str] = []
    for sitemap in children:
        _, _, body = fetch(sitemap, accept="application/xml")
        root = ET.fromstring(body)
        urls = [node.text or "" for node in root.findall(".//s:loc", namespace)]
        groups[sitemap] = urls
        all_urls.extend(urls)
    return groups, all_urls


def host_matches(host: str, candidates: set[str]) -> bool:
    host = host.lower().removeprefix("www.")
    return any(host == candidate or host.endswith("." + candidate) for candidate in candidates)


def inventory_page(url: str) -> dict[str, Any]:
    try:
        status, headers, body = fetch(url, accept="text/html")
    except Exception as exc:
        return {"url": url, "error": str(exc)}
    parser = PageParser(url)
    parser.feed(body.decode("utf-8", "replace"))
    text = clean_space(" ".join(parser.text_parts))
    social = [link for link in parser.links if host_matches(urllib.parse.urlparse(link["href"]).hostname or "", SOCIAL_HOSTS)]
    youtube = [link for link in parser.links if host_matches(urllib.parse.urlparse(link["href"]).hostname or "", {"youtube.com", "youtu.be"})]
    external_forms = [
        frame
        for frame in parser.iframes
        if any(term in frame["src"].lower() for term in ("givewp", "form", "eventbrite", "google", "microsoft"))
    ]
    return {
        "url": url,
        "status": status,
        "contentType": headers.get("Content-Type", ""),
        "title": parser.title_parts[0] if parser.title_parts else "",
        "metaDescription": parser.meta_description,
        "canonical": parser.canonical,
        "headings": parser.headings,
        "forms": [form.__dict__ for form in parser.forms],
        "iframes": parser.iframes,
        "externalFormFrames": external_forms,
        "socialLinks": social,
        "youtubeLinks": youtube,
        "images": parser.images,
        "internalLinks": [link for link in parser.links if (urllib.parse.urlparse(link["href"]).hostname or "").endswith("oakonsult.org")],
        "text": text,
        "textSha256": hashlib.sha256(text.encode()).hexdigest(),
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", default="docs/content-parity/production-audit.json")
    args = parser.parse_args()
    groups, urls = sitemap_urls(f"{BASE}/wp-sitemap.xml")
    unique_urls = list(dict.fromkeys(urls))
    pages = [inventory_page(url) for url in unique_urls]
    report = {
        "source": BASE,
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "sitemapGroups": groups,
        "summary": {
            "sitemaps": len(groups),
            "urls": len(unique_urls),
            "successful": sum(1 for page in pages if page.get("status") == 200),
            "failed": sum(1 for page in pages if page.get("error") or page.get("status") != 200),
            "pagesWithForms": sum(1 for page in pages if page.get("forms") or page.get("externalFormFrames")),
            "pagesWithSocialLinks": sum(1 for page in pages if page.get("socialLinks")),
            "pagesWithYouTubeLinks": sum(1 for page in pages if page.get("youtubeLinks")),
        },
        "pages": pages,
    }
    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps(report["summary"], indent=2))
    return 0 if report["summary"]["failed"] == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
