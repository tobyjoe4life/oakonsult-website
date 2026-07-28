"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { galleryBookFor, type GalleryRegion } from "@/lib/gallery";

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

  const [active, setActive] = useState<number | null>(null);
  const isOpen = active !== null;

  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastTrigger = useRef<number | null>(null);
  const wasOpen = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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
    <section className="picture-book" aria-label={`${region} media picture book`}>
      {chapters.map((chapter, chapterIndex) => (
        <section
          className="picture-book-chapter"
          key={chapter.title}
          aria-labelledby={`picture-book-chapter-${region}-${chapterIndex}`}
        >
          <div className="picture-book-chapter-intro" data-reveal>
            <h2 id={`picture-book-chapter-${region}-${chapterIndex}`}>{chapter.title}</h2>
            <p>{chapter.intro}</p>
          </div>
          <div className="picture-book-flow" data-reveal-group>
            {chapter.items.map((item) => {
              const index = indexBySlug.get(item.slug) ?? 0;
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
