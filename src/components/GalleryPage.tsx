import Image from "next/image";
import Link from "next/link";
import { HomeMotion } from "@/components/HomeMotion";
import { PictureBookGallery } from "@/components/PictureBookGallery";
import { type GalleryRegion } from "@/lib/gallery";

type GalleryPageProps = {
  region?: GalleryRegion;
};

const Arrow = () => <span aria-hidden="true">→</span>;

const mastheadPhoto: Record<GalleryRegion, { src: string; alt: string }> = {
  UK: {
    src: "/images/gallery-book/uk/project-me-graduation-group.webp",
    alt: "Project ME graduates, guests and OAKonsult representatives gathered on stage",
  },
  Nigeria: {
    src: "/images/gallery-book/nigeria/oolo-palace-community-visit.webp",
    alt: "OAKonsult and community representatives gathered during a palace visit",
  },
};

export function GalleryPage({ region }: GalleryPageProps) {
  const title = region ? `${region} media gallery` : "Media gallery";
  const intro = region === "UK"
    ? "Project ME, parent-carer wellbeing and community events in Bromley."
    : region === "Nigeria"
      ? "Community outreach, public awareness and OAK Centre Prime."
      : "Photographs from OAKonsult programmes in the UK and Nigeria.";
  const hero = region
    ? mastheadPhoto[region]
    : {
        src: "/images/gallery-book/uk/project-me-conversation.webp",
        alt: "Two Project ME participants in conversation at a shared table",
      };

  return (
    <div className="oak-home editorial-page gallery-page" data-mood="wellbeing">
      <HomeMotion />
      <section className="editorial-masthead gallery-masthead" aria-labelledby="gallery-title">
        <div className="editorial-masthead-copy" data-reveal="left">
          <nav className="editorial-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/impact">Stories &amp; impact</Link><span>/</span><span>{title}</span></nav>
          <h1 id="gallery-title">{region ? `The ${region} picture book` : title}</h1>
          <p>{intro}</p>
          {region && (
            <div className="editorial-route-links">
              {region === "UK" && <Link href="/media-gallery/nigeria">View Nigeria <Arrow /></Link>}
              {region === "Nigeria" && <Link href="/media-gallery/uk">View UK <Arrow /></Link>}
            </div>
          )}
        </div>
        <div className="gallery-masthead-photo" data-reveal="zoom">
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            priority
            sizes="(max-width: 800px) 100vw, 52vw"
          />
        </div>
      </section>

      {!region && (
        <section className="gallery-region-split" aria-labelledby="choose-gallery">
          <div className="gallery-region-heading" data-reveal><h2 id="choose-gallery">Choose a region.</h2></div>
          <Link className="gallery-region-route route-uk" href="/media-gallery/uk" data-reveal>
            <div className="gallery-route-image"><Image src="/images/gallery-book/uk/parent-carers-zumba-in-motion.webp" alt="Parent carers moving together during an OAKonsult Zumba class" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
            <div><span>United Kingdom</span><h3>Project ME and parent-carer wellbeing.</h3><b>View UK <Arrow /></b></div>
          </Link>
          <Link className="gallery-region-route route-ng" href="/media-gallery/nigeria" data-reveal>
            <div className="gallery-route-image"><Image src="/images/gallery-book/nigeria/press-conference-team.webp" alt="OAKonsult representatives holding information materials at a press conference" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
            <div><span>Nigeria</span><h3>Outreach and disability inclusion.</h3><b>View Nigeria <Arrow /></b></div>
          </Link>
        </section>
      )}

      {region && <PictureBookGallery region={region} />}

      <section className="editorial-action-band">
        <div data-reveal><h2>{region === "UK" ? "Support parent carers in the UK." : region === "Nigeria" ? "Support disability inclusion in Nigeria." : "Support OAKonsult’s work."}</h2></div>
        <div className="editorial-route-links light-links" data-reveal><Link href="/donate">Donate <Arrow /></Link><Link href="/get-involved">Get involved <Arrow /></Link></div>
      </section>
    </div>
  );
}
