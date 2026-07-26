"use client";

import { useEffect } from "react";

export function HomeMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const revealables = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-child]"),
    );

    // Assign stagger indexes inside every group so children cascade.
    document.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
      Array.from(group.querySelectorAll<HTMLElement>("[data-reveal-child]")).forEach((child, index) => {
        child.style.setProperty("--stagger-index", String(index));
      });
    });

    if (reduced.matches) {
      root.classList.add("reduce-motion");
      revealables.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    root.classList.add("motion-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12%", threshold: 0.12 },
    );

    revealables.forEach((element) => observer.observe(element));

    // Gentle scroll drift for decorative geometry. Uses the independent
    // `translate` CSS property so rotations and keyframes are untouched.
    const driftElements = Array.from(document.querySelectorAll<HTMLElement>("[data-drift]"));
    let frame = 0;
    const updateDrift = () => {
      frame = 0;
      const viewport = window.innerHeight || 1;
      for (const element of driftElements) {
        const rect = element.getBoundingClientRect();
        const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport;
        const amplitude = Number(element.dataset.drift) || 24;
        element.style.setProperty("--drift-y", `${(-progress * amplitude).toFixed(1)}px`);
      }
    };
    const requestDrift = () => {
      if (!frame) frame = requestAnimationFrame(updateDrift);
    };

    if (driftElements.length) {
      updateDrift();
      window.addEventListener("scroll", requestDrift, { passive: true });
      window.addEventListener("resize", requestDrift);
    }

    return () => {
      observer.disconnect();
      root.classList.remove("motion-ready");
      window.removeEventListener("scroll", requestDrift);
      window.removeEventListener("resize", requestDrift);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
