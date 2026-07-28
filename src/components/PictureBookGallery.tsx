"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { galleryBookFor, type GalleryRegion } from "@/lib/gallery";

const FAVOURITES_KEY = "oakonsult-picture-book-favourites";

type PictureBookGalleryProps = {
  region: GalleryRegion;
};

const imageSizes = (prominence: string) => {
  if (prominence === "full") return "(max-width: 760px) 100vw, 96vw";
  if (prominence === "wide") return "(max-width: 760px) 100vw, (max-width: 1100px) 72vw, 62vw";
  if (prominence === "portrait") return "(max-width: 760px) 100vw, (max-width: 1100px) 48vw, 34vw";
  return "(max-width: 760px) 100vw, (max-width: 1100px) 55vw, 44vw";
};

export function PictureBookGallery({ region }: PictureBookGalleryProps) {
  const chapters = useMemo(() => galleryBookFor(region), [region]);
  const photographs = useMemo(() => chapters.flatMap((chapter) => chapter.items), [chapters]);
  const indexBySlug = useMemo(() => {
    const map = new Map<string, number>();
    photographs.forEach((item, index) => map.set(item.slug, index));
    return map;
  }, [photographs]);

  const [favourites, setFavourites] = useState<string[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const isOpen = active !== null;

  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastTrigger = useRef<number | null>(null);
  const wasOpen = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Restore any favourites the visitor saved on this device during earlier visits.
  // Deferred to a microtask so the first render matches the server output.
  useEffect(() => {
    let cancelled = false;
    void Promise.resolve().then(() => {
      if (cancelled) return;
      try {
        const stored = window.localStorage.getItem(FAVOURITES_KEY);
        if (!stored) return;
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavourites(parsed.filter((entry): entry is string => typeof entry === "string"));
        }
      } catch {
        // localStorage may be unavailable; favourites simply stay unsaved.
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const toggleFavourite = useCallback((slug: string) => {
    setFavourites((current) => {
      const next = current.includes(slug)
        ? current.filter((entry) => entry !== slug)
        : [...current, slug];
      try {
        window.localStorage.setItem(FAVOURITES_KEY, JSON.stringify(next));
      } catch {
        // localStorage may be unavailable; keep the in-memory state only.
      }
      return next;
    });
  }, []);

  const openViewer = (index: number) => {
    lastTrigger.current = index;
    setActive(index);
  };
  const closeViewer = useCallback(() => setActive(null), []);
  const showPrevious = useCallback(
    () => setActive((current) => (current === null ? current : (current + photographs.length - 1) % photographs.length)),
    [photographs.length],
  );
  const showNext = useCallback(
    () => setActive((current) => (current === null ? current : (current + 1) % photographs.length)),
    [photographs.length],
  );

  // While the viewer is open: lock page scroll, move focus inside, keep Tab
  // cycling within the dialog and wire Escape/arrow keys.
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeViewer();
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
  }, [isOpen, closeViewer, showPrevious, showNext]);

  // After the viewer closes, return focus to the photograph that opened it.
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

  const current = active === null ? null : photographs[active];

  return (
    <section className="picture-book" aria-labelledby="picture-book-heading">
      <div className="picture-book-heading" data-reveal>
        <p className="oak-kicker dark">A book to browse slowly</p>
        <h2 id="picture-book-heading">
          {region === "UK"
            ? "Parent-carer support and community wellbeing in the UK."
            : "Outreach, awareness and community partnership in Nigeria."}
        </h2>
        <p>
          Scroll through each chapter, open any photograph for a closer look and save the moments
          that matter to you with the heart control.
        </p>
        <p className="picture-book-note">
          Photographs you like are saved on this device only. They are not shared
          with OAKonsult or anyone else, and clearing your browser storage removes them.
        </p>
      </div>

      {chapters.map((chapter, chapterIndex) => (
        <section
          className="picture-book-chapter"
          key={chapter.title}
          aria-labelledby={`picture-book-chapter-${chapterIndex}`}
        >
          <div className="picture-book-chapter-intro" data-reveal>
            <h3 id={`picture-book-chapter-${chapterIndex}`}>{chapter.title}</h3>
            <p>{chapter.intro}</p>
          </div>
          <div className="picture-book-flow" data-reveal-group>
            {chapter.items.map((item) => {
              const index = indexBySlug.get(item.slug) ?? 0;
              const saved = favourites.includes(item.slug);
              return (
                <figure
                  className="picture-book-figure"
                  data-prominence={item.prominence}
                  key={item.slug}
                  data-reveal-child="unfold"
                >
                  <button
                    type="button"
                    className="picture-book-open"
                    onClick={() => openViewer(index)}
                    aria-label={`View larger: ${item.alt}`}
                    ref={(element) => {
                      triggerRefs.current[index] = element;
                    }}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      sizes={imageSizes(item.prominence)}
                    />
                    <span className="picture-book-open-hint" aria-hidden="true">
                      <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" focusable="false">
                        <path d="M6 2H2v4M10 2h4v4M14 10v4h-4M2 10v4h4" />
                      </svg>
                      View
                    </span>
                  </button>
                  <figcaption className="picture-book-caption">
                    <p>{item.caption}</p>
                    <button
                      type="button"
                      className="picture-book-favourite"
                      aria-pressed={saved}
                      aria-label={
                        saved
                          ? `Remove your like from this photograph: ${item.title}`
                          : `Like this photograph: ${item.title}`
                      }
                      onClick={() => toggleFavourite(item.slug)}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill={saved ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="1.8"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d="M12 20.5c-.4 0-.8-.14-1.1-.42C7.4 16.9 3 13.3 3 9.6 3 7.02 5.02 5 7.6 5c1.54 0 3.04.75 4.4 2.1C13.36 5.75 14.86 5 16.4 5 18.98 5 21 7.02 21 9.6c0 3.7-4.4 7.3-7.9 10.48-.3.28-.7.42-1.1.42Z" />
                      </svg>
                      <span>{saved ? "Liked" : "Like"}</span>
                    </button>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>
      ))}

      {active !== null && current && (
        <div
          className="picture-book-viewer"
          role="dialog"
          aria-modal="true"
          aria-label={`${current.alt}. Photograph ${active + 1} of ${photographs.length}`}
          ref={dialogRef}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeViewer();
          }}
        >
          <div className="picture-book-viewer-stage">
            <Image src={current.src} alt={current.alt} fill sizes="94vw" style={{ objectFit: "contain" }} />
          </div>
          <p className="picture-book-viewer-count" aria-live="polite" aria-atomic="true">
            {active + 1} of {photographs.length}
          </p>
          <p className="picture-book-viewer-caption">{current.caption}</p>
          <button
            type="button"
            className="picture-book-viewer-close"
            onClick={closeViewer}
            ref={closeButtonRef}
            aria-label="Close image viewer"
          >
            <span aria-hidden="true">×</span>
          </button>
          <button
            type="button"
            className="picture-book-viewer-nav picture-book-viewer-prev"
            onClick={showPrevious}
            aria-label="Previous photograph"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className="picture-book-viewer-nav picture-book-viewer-next"
            onClick={showNext}
            aria-label="Next photograph"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </section>
  );
}
