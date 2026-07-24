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
    document.body.classList.toggle("menu-open", open);
    if (open) {
      wasOpen.current = true;
      closeButtonRef.current?.focus();
    } else if (wasOpen.current) {
      menuButtonRef.current?.focus();
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <>
      <div className="trust-bar">
        <div className="shell trust-inner">
          <span>Registered charity 1204553</span>
          <span>Working across the UK, Nigeria and online</span>
          <Link href="/accessibility">Accessibility</Link>
        </div>
      </div>
      <header className="site-header">
        <div className="shell header-inner">
          <Link className="brand" href="/" aria-label="OAKonsult Disabilities Outreach, home">
            <Image src="/logos/oakonsult-mark.png" width={54} height={54} alt="" priority />
            <span><strong>OAKonsult</strong><small>Disabilities Outreach</small></span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {siteContent.navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>
          <div className="header-actions">
            <Link className="button button-small button-outline desktop-action" href="/find-support">Find support</Link>
            <Link className="button button-small desktop-action" href="/donate">Donate</Link>
            <button ref={menuButtonRef} className="menu-button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}>Menu</button>
          </div>
        </div>
      </header>
      {open && (
        <div className="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Site menu">
          <div className="mobile-menu-top">
            <span className="brand-text">OAKonsult</span>
            <button ref={closeButtonRef} onClick={() => setOpen(false)}>Close</button>
          </div>
          <nav aria-label="Mobile navigation">
            {siteContent.navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
          </nav>
          <div className="mobile-actions">
            <Link className="button button-cream" href="/find-support" onClick={() => setOpen(false)}>Find support</Link>
            <Link className="button button-gold" href="/donate" onClick={() => setOpen(false)}>Donate</Link>
          </div>
        </div>
      )}
    </>
  );
}
