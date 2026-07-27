"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { isJourneyActive, isRouteActive, journeyGroups } from "@/lib/site-navigation";

const menuStaggerOffsets = journeyGroups.map((_, groupIndex) =>
  journeyGroups.slice(0, groupIndex).reduce((total, group) => total + group.menuLinks.length, 0),
);

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
              <span>Start here</span>
              <Link className={isJourneyActive(pathname, journeyGroups[0]) ? "is-active" : undefined} href={journeyGroups[0].href}>Get support</Link>
              <Link className={isJourneyActive(pathname, journeyGroups[1]) ? "is-active" : undefined} href={journeyGroups[1].href}>Give support</Link>
              <Link className={isJourneyActive(pathname, journeyGroups[2]) ? "is-active" : undefined} href={journeyGroups[2].href}>Our work &amp; impact</Link>
              <Link className={isJourneyActive(pathname, journeyGroups[3]) ? "is-active" : undefined} href={journeyGroups[3].href}>About OAKonsult</Link>
              <Link className={isJourneyActive(pathname, journeyGroups[4]) ? "is-active" : undefined} href={journeyGroups[4].href}>Work with us</Link>
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
                {journeyGroups.map((group, groupIndex) => (
                  <section className="menu-v4-journey" key={group.title} aria-label={group.title}>
                    <h2 className="menu-v4-label">{group.title}</h2>
                    <div className="menu-v4-journey-links">
                      {group.menuLinks.map((item, linkIndex) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          aria-current={isRouteActive(pathname, item.href) ? "page" : undefined}
                          onClick={() => setOpen(false)}
                          style={{ "--link-index": menuStaggerOffsets[groupIndex] + linkIndex } as CSSProperties}
                        >
                          {item.label}<i aria-hidden="true">↗</i>
                        </Link>
                      ))}
                    </div>
                  </section>
                ))}
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
