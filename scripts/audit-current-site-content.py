from __future__ import annotations

import html
import json
import re
import urllib.request
from html.parser import HTMLParser
from pathlib import Path

BASE = "https://oakonsult.org/wp-json/wp/v2"
UA = "Mozilla/5.0 (compatible; OAKonsult redesign content audit)"
ROOT = Path(__file__).resolve().parents[1]

class Extractor(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.text: list[str] = []
        self.headings: list[str] = []
        self.links: list[dict[str, str]] = []
        self._heading: str | None = None
        self._heading_text: list[str] = []
        self._link: str | None = None
        self._link_text: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if tag in {"h1", "h2", "h3", "h4", "h5", "h6"}:
            self._heading = tag
            self._heading_text = []
        if tag == "a" and values.get("href"):
            self._link = values["href"]
            self._link_text = []

    def handle_endtag(self, tag: str) -> None:
        if self._heading == tag:
            value = clean(" ".join(self._heading_text))
            if value:
                self.headings.append(value)
            self._heading = None
        if tag == "a" and self._link:
            label = clean(" ".join(self._link_text))
            self.links.append({"label": label, "href": self._link})
            self._link = None

    def handle_data(self, data: str) -> None:
        value = clean(data)
        if not value:
            return
        self.text.append(value)
        if self._heading:
            self._heading_text.append(value)
        if self._link:
            self._link_text.append(value)

def clean(value: str) -> str:
    return re.sub(r"\s+", " ", html.unescape(value)).strip()

def get_json(url: str):
    request = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(request, timeout=60) as response:
        return json.load(response)

pages = get_json(f"{BASE}/pages?per_page=100&status=publish&_fields=id,slug,link,title,content,excerpt,parent,menu_order")
posts = get_json(f"{BASE}/posts?per_page=100&status=publish&_fields=id,slug,link,title,content,excerpt,date")

def normalize(item: dict, kind: str) -> dict:
    parser = Extractor()
    parser.feed(item.get("content", {}).get("rendered", ""))
    seen: set[tuple[str, str]] = set()
    links = []
    for link in parser.links:
        key = (link["label"], link["href"])
        if key in seen:
            continue
        seen.add(key)
        links.append(link)
    return {
        "kind": kind,
        "id": item["id"],
        "title": clean(item["title"]["rendered"]),
        "slug": item["slug"],
        "url": item["link"],
        "headings": parser.headings,
        "text": clean(" ".join(parser.text)),
        "links": links,
    }

inventory = {
    "source": "Current public OAKonsult WordPress REST API",
    "pages": [normalize(item, "page") for item in pages],
    "posts": [normalize(item, "post") for item in posts],
}
(ROOT / "docs" / "oak-current-site-content-inventory.json").write_text(json.dumps(inventory, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print(f"audited {len(pages)} pages and {len(posts)} posts")
