import Image from "next/image";
import Link from "next/link";
import { HomeMotion } from "@/components/HomeMotion";
import { TributeGallery } from "@/components/TributeGallery";
import type { EditorialPageData } from "@/lib/editorial-pages";

const Arrow = () => <span aria-hidden="true">→</span>;

export function EditorialDetailPage({ data }: { data: EditorialPageData }) {
  const supportingPhotos = (data.photos ?? []).filter((photo) => photo.src !== data.heroImage);

  return (
    <article className="oak-home editorial-page detail-page" data-mood={data.mood ?? "growth"}>
      <HomeMotion />
      <header className="editorial-masthead detail-masthead">
        <div className="editorial-masthead-copy" data-reveal="left">
          <nav className="editorial-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/what-we-do">Our work</Link><span aria-hidden="true">/</span><span aria-current="page">{data.title}</span></nav>
          <p className="oak-kicker">{data.eyebrow}</p>
          <h1>{data.title}</h1>
          <p>{data.intro}</p>
          <div className="editorial-location"><span aria-hidden="true">⌖</span><strong>{data.location}</strong></div>
        </div>
        <div className="detail-hero-photo" data-reveal="zoom">
          <Image src={data.heroImage} alt={data.heroAlt} fill priority sizes="(max-width: 800px) 100vw, 54vw" style={data.heroPosition ? { objectPosition: data.heroPosition } : undefined} />
          <span className="detail-photo-shape" aria-hidden="true" data-drift="18" />
        </div>
      </header>

      <nav className="detail-on-page" aria-label="On this page">
        <span>On this page</span>
        {data.sections.map((section, index) => <a href={`#section-${index + 1}`} key={section.title}>{section.title}</a>)}
      </nav>

      <div className="detail-sections">
        {data.sections.map((section, index) => (
          <section className={`detail-section tone-${(index % 3) + 1}`} id={`section-${index + 1}`} key={section.title} data-reveal-group>
            <div className="detail-section-copy" data-reveal-child="slide">
              <p className="oak-kicker dark">{section.eyebrow}</p>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            {section.points && (
              <ul className="detail-point-list" data-reveal-child="slide">
                {section.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            )}
          </section>
        ))}
      </div>

      {data.gallery ? (
        <TributeGallery title={data.gallery.title} intro={data.gallery.intro} images={data.gallery.images} />
      ) : data.photos && data.photos.length > 0 ? (
        <section className="detail-photo-journal" aria-labelledby="photo-journal-title">
          <div className="detail-journal-heading" data-reveal><p className="oak-kicker dark">In pictures</p><h2 id="photo-journal-title">{data.photosTitle}</h2><Link href="/media-gallery">View the media gallery <Arrow /></Link></div>
          <div className="detail-photo-row" data-reveal-group>
            {supportingPhotos.map((photo, index) => (
              <figure className={`detail-journal-photo photo-${index + 1}`} key={photo.src} data-reveal-child="unfold">
                <div><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 760px) 90vw, 33vw" /></div>
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <section className="detail-related" aria-labelledby="related-title">
        <div data-reveal><p className="oak-kicker dark">More information</p><h2 id="related-title">Related pages</h2></div>
        <div className="detail-related-list" data-reveal-group>
          {data.related.map((item) => (
            <Link href={item.href} key={item.href} data-reveal-child="slide">
              <div><h3>{item.label}</h3><p>{item.description}</p></div><Arrow />
            </Link>
          ))}
        </div>
      </section>

      <section className="editorial-action-band">
        <div data-reveal><p className="oak-kicker">Contact OAKonsult</p><h2>{data.ctaTitle}</h2><p>{data.ctaText}</p></div>
        <div className="editorial-route-links light-links" data-reveal><Link href={data.ctaHref}>{data.ctaLabel} <Arrow /></Link><Link href="/donate">Support the work <Arrow /></Link></div>
      </section>
    </article>
  );
}
