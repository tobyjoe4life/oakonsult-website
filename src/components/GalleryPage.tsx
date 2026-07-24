import Image from "next/image";
import Link from "next/link";
import { HomeMotion } from "@/components/HomeMotion";
import { galleryItems, type GalleryRegion } from "@/lib/gallery";

type GalleryPageProps = {
  region?: GalleryRegion;
};

const Arrow = () => <span aria-hidden="true">→</span>;

export function GalleryPage({ region }: GalleryPageProps) {
  const items = region ? galleryItems.filter((item) => item.region === region) : galleryItems;
  const collectionExclusions = new Set(
    region === "UK"
      ? ["uk-project-me-session"]
      : region === "Nigeria"
        ? ["nigeria-knowledge-radio"]
        : ["uk-project-me-session", "uk-parent-carer-community", "nigeria-press-conference"],
  );
  const collectionItems = items.filter((item) => !collectionExclusions.has(item.slug));
  const title = region ? `${region} media gallery` : "Media gallery";
  const intro = region
    ? `Selected photographs from OAKonsult ${region} programmes, outreach, community activity and public engagement.`
    : "Photographs from parent-carer support, disability-inclusion programmes, community activity and public engagement across the UK and Nigeria.";

  return (
    <div className="oak-home editorial-page gallery-page">
      <HomeMotion />
      <section className="editorial-masthead gallery-masthead" aria-labelledby="gallery-title">
        <div className="editorial-masthead-copy" data-reveal>
          <nav className="editorial-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/impact">Stories &amp; impact</Link><span>/</span><span>{title}</span></nav>
          <p className="oak-kicker">Stories and impact</p>
          <h1 id="gallery-title">{title}</h1>
          <p>{intro}</p>
          <div className="editorial-route-links">
            {!region && <><Link href="/media-gallery/uk">Explore the UK gallery <Arrow /></Link><Link href="/media-gallery/nigeria">Explore the Nigeria gallery <Arrow /></Link></>}
            {region === "UK" && <Link href="/media-gallery/nigeria">Switch to the Nigeria gallery <Arrow /></Link>}
            {region === "Nigeria" && <Link href="/media-gallery/uk">Switch to the UK gallery <Arrow /></Link>}
          </div>
        </div>
        <div className="gallery-masthead-photo" data-reveal>
          <Image
            src={region === "Nigeria" ? "/images/gallery/nigeria-knowledge-radio.webp" : "/images/gallery/uk-project-me-session.webp"}
            alt={region === "Nigeria" ? "OAKonsult disability-awareness engagement at Knowledge Radio" : "Parent carers taking part in a Project ME session"}
            fill
            priority
            sizes="(max-width: 800px) 100vw, 52vw"
          />
        </div>
      </section>

      {!region && (
        <section className="gallery-region-split" aria-labelledby="choose-gallery">
          <div className="gallery-region-heading" data-reveal><p className="oak-kicker dark">Where the work happens</p><h2 id="choose-gallery">One mission, locally rooted.</h2><p>Choose a regional collection or continue into the mixed highlights below.</p></div>
          <Link className="gallery-region-route route-uk" href="/media-gallery/uk" data-reveal>
            <div className="gallery-route-image"><Image src="/images/gallery/uk-parent-carer-community.webp" alt="Parent carers connecting during an OAKonsult community activity" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
            <div><span>United Kingdom</span><h3>Parent-carer support, Project ME and community wellbeing.</h3><b>View UK media <Arrow /></b></div>
          </Link>
          <Link className="gallery-region-route route-ng" href="/media-gallery/nigeria" data-reveal>
            <div className="gallery-route-image"><Image src="/images/gallery/nigeria-press-conference.webp" alt="OAKonsult representatives at a public press conference" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
            <div><span>Nigeria</span><h3>Outreach, public awareness and community partnership.</h3><b>View Nigeria media <Arrow /></b></div>
          </Link>
        </section>
      )}

      <section className="gallery-collection" aria-labelledby="gallery-collection-title">
        <div className="gallery-collection-heading" data-reveal>
          <p className="oak-kicker dark">{region ? `${region} highlights` : "Curated highlights"}</p>
          <h2 id="gallery-collection-title">Real moments from the work.</h2>
          <p>This is a curated public showcase, not a complete media archive.</p>
        </div>
        <div className="gallery-grid">
          {collectionItems.map((item, index) => (
            <figure className={`gallery-figure figure-${(index % 4) + 1}`} key={item.slug} data-reveal>
              <div className="gallery-image"><Image src={item.src} alt={item.alt} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw" /></div>
              <figcaption><span>{item.region} / {item.theme}</span><h3>{item.title}</h3><p>{item.context}</p></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="editorial-action-band">
        <div data-reveal><p className="oak-kicker">Keep the circle growing</p><h2>Help create more moments of support, confidence and belonging.</h2></div>
        <div className="editorial-route-links light-links" data-reveal><Link href="/donate">Make a donation <Arrow /></Link><Link href="/get-involved">Volunteer or partner <Arrow /></Link></div>
      </section>
    </div>
  );
}
