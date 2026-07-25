"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const mainNavigation = [
  { label: "Find support", href: "/find-support" },
  { label: "Our work", href: "/what-we-do" },
  { label: "Stories & impact", href: "/impact" },
  { label: "Social media", href: "/social" },
  { label: "Media gallery", href: "/media-gallery" },
  { label: "Events", href: "/events" },
  { label: "Funders & partners", href: "/funders-partners" },
  { label: "Get involved", href: "/get-involved" },
  { label: "About us", href: "/about" },
] as const;

const regions = [
  {
    label: "OAKonsult UK",
    shortLabel: "UK",
    href: "/uk",
    description: "Parent-carer programmes, UK funders, support and partnerships.",
  },
  {
    label: "OAKonsult Nigeria",
    shortLabel: "Nigeria",
    href: "/nigeria",
    description: "Nigeria outreach, local funders, partnerships and the planned OAK Centre Prime.",
  },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const currentRegion = regions.find((region) => pathname.startsWith(region.href));
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const background = [
      document.querySelector("header.site-header"),
      document.querySelector("main"),
      document.querySelector("footer.site-footer"),
    ].filter(Boolean) as HTMLElement[];

    document.body.classList.toggle("menu-open", open);
    background.forEach((element) => {
      if (open) element.setAttribute("inert", "");
      else element.removeAttribute("inert");
    });

    if (open) {
      wasOpen.current = true;
      closeButtonRef.current?.focus();
    } else if (wasOpen.current) {
      menuButtonRef.current?.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (!open || event.key !== "Tab") return;

      const menu = document.getElementById("site-menu");
      const focusable = menu?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("menu-open");
      background.forEach((element) => element.removeAttribute("inert"));
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="site-header header-v4">
        <div className="header-v4-inner">
          <Link className="brand brand-v4" href="/" aria-label="OAKonsult Disabilities Outreach, home">
            <span className="brand-v4-logo-shell">
              <Image src="/logos/oakonsult-logo.png" width={124} height={94} alt="" priority />
            </span>
          </Link>

          <p className="header-v4-descriptor">Parent-carer support and disability inclusion</p>
          {currentRegion && <Link className="header-v4-region-current" href={currentRegion.href} aria-label={`Current regional hub: ${currentRegion.label}`}>{currentRegion.shortLabel}</Link>}

          <div className="header-actions header-v4-actions">
            <Link className="header-support-link" href="/find-support">Find support</Link>
            <Link className="button button-small header-donate" href="/donate">Donate</Link>
            <button ref={menuButtonRef} className="menu-button menu-button-v4" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(true)}><span>Menu</span><i aria-hidden="true"><b /><b /><b /></i></button>
          </div>
        </div>

        <nav className="header-v4-nav" aria-label="Primary navigation">
          <div className="header-v4-nav-inner">
            <div className="header-v4-main-links">
              <span>Our work</span>
              <Link className={pathname === "/what-we-do" || pathname.startsWith("/programmes/") ? "is-active" : undefined} href="/what-we-do">Programmes</Link>
              <Link className={pathname.startsWith("/stories") || pathname === "/impact" ? "is-active" : undefined} href="/stories">Stories</Link>
              <Link className={pathname === "/social" ? "is-active" : undefined} href="/social">Social</Link>
              <Link className={pathname.startsWith("/media-gallery") ? "is-active" : undefined} href="/media-gallery">Gallery</Link>
              <Link className={pathname === "/events" ? "is-active" : undefined} href="/events">Events</Link>
              <Link className={pathname === "/get-involved" ? "is-active" : undefined} href="/get-involved">Get involved</Link>
              <Link className={["/about", "/our-story", "/abigail", "/history", "/our-team", "/vision-mission"].some((route) => pathname === route) ? "is-active" : undefined} href="/about">About us</Link>
            </div>
            <div className="header-v4-region-links" aria-label="Where we work">
              <span>Where we work</span>
              {regions.map((region) => <Link className={pathname.startsWith(region.href) ? "is-active" : undefined} key={region.href} href={region.href}>{region.shortLabel}</Link>)}
            </div>
          </div>
        </nav>
      </header>

      {open && (
        <div className="mobile-menu menu-v4" id="site-menu" role="dialog" aria-modal="true" aria-label="Site menu">
          <div className="menu-v4-decoration" aria-hidden="true" />
          <div className="mobile-menu-top menu-v4-top">
            <Link className="menu-v4-brand" href="/" onClick={() => setOpen(false)} aria-label="OAKonsult home">
              <Image src="/logos/oakonsult-logo.png" width={118} height={90} alt="" />
            </Link>
            <button ref={closeButtonRef} onClick={() => setOpen(false)}>Close <span aria-hidden="true">×</span></button>
          </div>
          <div className="menu-v4-grid">
            <div className="menu-v4-primary">
              <p className="menu-v4-label">Explore OAKonsult</p>
              <nav aria-label="Main navigation">
                {mainNavigation.map((item, index) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}><span>{String(index + 1).padStart(2, "0")}</span>{item.label}<i aria-hidden="true">↗</i></Link>)}
              </nav>
            </div>

            <aside className="menu-v4-regions" aria-labelledby="where-we-work-title">
              <p className="menu-v4-label" id="where-we-work-title">Where we work</p>
              <div className="menu-v4-region-cards">
                {regions.map((region, index) => (
                  <Link key={region.href} href={region.href} className={`menu-v4-region-card region-${index + 1}${pathname.startsWith(region.href) ? " is-active" : ""}`} aria-current={pathname.startsWith(region.href) ? "page" : undefined} onClick={() => setOpen(false)}>
                    <span>{region.shortLabel}</span>
                    <strong>{region.label}</strong>
                    <small>{region.description}</small>
                    <i aria-hidden="true">→</i>
                  </Link>
                ))}
              </div>
              <p className="menu-v4-shared-note"><strong>One OAKonsult.</strong> Shared purpose, with country-specific programmes, funding and contact routes.</p>
              <div className="menu-v4-utility">
                <Link href="/contact" onClick={() => setOpen(false)}>Contact us</Link>
                <Link href="/accessibility" onClick={() => setOpen(false)}>Accessibility</Link>
                <Link href="/privacy" onClick={() => setOpen(false)}>Privacy</Link>
              </div>
              <small className="menu-v4-registration">Registered charity in England and Wales, 1204553.</small>
            </aside>
          </div>
        </div>
      )}
    </>
  );
}
