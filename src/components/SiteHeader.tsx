"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { siteContent } from "@/lib/content";

export function SiteHeader() {
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
            <span className="brand-v4-mark"><Image src="/logos/oakonsult-mark.png" width={66} height={54} alt="" priority /></span>
            <span className="brand-v4-copy"><strong>OAKonsult</strong><small>Disabilities Outreach</small></span>
          </Link>

          <Link className="support-canopy" href="/find-support">
            <span>Need support?</span>
            <strong>Start with us</strong>
          </Link>

          <div className="header-actions header-v4-actions">
            <Link className="header-support-link" href="/find-support">Find support</Link>
            <Link className="button button-small header-donate" href="/donate">Donate</Link>
            <button ref={menuButtonRef} className="menu-button menu-button-v4" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(true)}><span>Menu</span><i aria-hidden="true"><b /><b /><b /></i></button>
          </div>
        </div>
      </header>

      {open && (
        <div className="mobile-menu menu-v4" id="site-menu" role="dialog" aria-modal="true" aria-label="Site menu">
          <div className="menu-v4-decoration" aria-hidden="true" />
          <div className="mobile-menu-top menu-v4-top">
            <Link className="menu-v4-brand" href="/" onClick={() => setOpen(false)}>OAKonsult</Link>
            <button ref={closeButtonRef} onClick={() => setOpen(false)}>Close <span aria-hidden="true">×</span></button>
          </div>
          <div className="menu-v4-grid">
            <nav aria-label="Main navigation">
              {siteContent.navigation.map((item, index) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{item.label}<i aria-hidden="true">↗</i></Link>)}
            </nav>
            <div className="menu-v4-aside">
              <p>Parent carer-led support and disability inclusion across the UK, Nigeria and online.</p>
              <Link href="/find-support" onClick={() => setOpen(false)}>I need support <span aria-hidden="true">→</span></Link>
              <Link href="/donate" onClick={() => setOpen(false)}>I want to help <span aria-hidden="true">→</span></Link>
              <Link href="/accessibility" onClick={() => setOpen(false)}>Accessibility</Link>
              <small>Registered charity 1204553</small>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
