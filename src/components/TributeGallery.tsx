"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { TributeGalleryData } from "@/lib/editorial-pages";

export function TributeGallery({ title, intro, images }: TributeGalleryData) {
  const [active, setActive] = useState<number | null>(null);
  const isOpen = active !== null;
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastTrigger = useRef<number | null>(null);
  const wasOpen = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const open = (index: number) => {
    lastTrigger.current = index;
    setActive(index);
  };
  const close = useCallback(() => setActive(null), []);
  const showPrevious = useCallback(
    () => setActive((current) => (current === null ? current : (current + images.length - 1) % images.length)),
    [images.length],
  );
  const showNext = useCallback(
    () => setActive((current) => (current === null ? current : (current + 1) % images.length)),
    [images.length],
  );

  // While the viewer is open: lock page scroll, move focus inside, keep Tab
  // cycling within the dialog and wire Escape/arrow keys.
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
      if (event.key === "Tab") {
        const controls = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!controls || controls.length === 0) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          last.focus();
          event.preventDefault();
        } else if (!event.shiftKey && document.activeElement === last) {
          first.focus();
          event.preventDefault();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close, showPrevious, showNext]);

  // After the viewer closes, return focus to the tile that opened it.
  useEffect(() => {
    if (isOpen) {
      wasOpen.current = true;
      return;
    }
    if (wasOpen.current && lastTrigger.current !== null) {
      triggerRefs.current[lastTrigger.current]?.focus();
    }
    wasOpen.current = false;
  }, [isOpen]);

  const current = active === null ? null : images[active];

  return (
    <section className="tribute-gallery" aria-labelledby="tribute-gallery-title">
      <div className="tribute-gallery-heading" data-reveal>
        <p className="oak-kicker dark">A life in pictures</p>
        <h2 id="tribute-gallery-title">{title}</h2>
        <p>{intro}</p>
      </div>

      <div className="tribute-mosaic" data-reveal-group>
        {images.map((image, index) => (
          <figure className={`tribute-tile tile-${index + 1}`} key={image.src} data-reveal-child="unfold">
            <button
              type="button"
              className="tribute-tile-button"
              onClick={() => open(index)}
              aria-label={`Open image ${index + 1} of ${images.length}: ${image.alt}`}
              ref={(element) => {
                triggerRefs.current[index] = element;
              }}
            >
              <span className="tribute-tile-frame">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 42vw"
                  style={image.position ? { objectPosition: image.position } : undefined}
                />
                <span className="tribute-tile-open" aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" focusable="false">
                    <path d="M6 2H2v4M10 2h4v4M14 10v4h-4M2 10v4h4" />
                  </svg>
                  Open image
                </span>
              </span>
            </button>
            <figcaption>{image.caption}</figcaption>
          </figure>
        ))}
      </div>

      {active !== null && current && (
        <div
          className="tribute-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${current.caption} Image ${active + 1} of ${images.length}`}
          ref={dialogRef}
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div className="tribute-lightbox-stage">
            <Image src={current.src} alt={current.alt} fill sizes="94vw" style={{ objectFit: "contain" }} />
          </div>
          <p className="tribute-lightbox-count" aria-live="polite" aria-atomic="true">{active + 1} of {images.length}</p>
          <p className="tribute-lightbox-caption">{current.caption}</p>
          <button type="button" className="tribute-lightbox-close" onClick={close} ref={closeButtonRef} aria-label="Close image viewer">
            <span aria-hidden="true">×</span>
          </button>
          <button type="button" className="tribute-lightbox-nav tribute-lightbox-prev" onClick={showPrevious} aria-label="Previous image">
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" className="tribute-lightbox-nav tribute-lightbox-next" onClick={showNext} aria-label="Next image">
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </section>
  );
}
