import Image from "next/image";
import Link from "next/link";
import { HomeMotion } from "@/components/HomeMotion";
import { PictureBookGallery } from "@/components/PictureBookGallery";
import { galleryBookChapters, type GalleryRegion } from "@/lib/gallery";

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
  const intro = region
    ? `A picture book of OAKonsult ${region}: real photographs from programmes, outreach and community life, gathered into chapters you can browse at your own pace.`
    : "Two picture books of real OAKonsult work: parent-carer support and community wellbeing in the UK, and outreach, awareness and community partnership in Nigeria.";
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
          <p className="oak-kicker">Stories and impact</p>
          <h1 id="gallery-title">{region ? `The ${region} picture book` : title}</h1>
          <p>{intro}</p>
          <div className="editorial-route-links">
            {!region && <><Link href="/media-gallery/uk">Open the UK picture book <Arrow /></Link><Link href="/media-gallery/nigeria">Open the Nigeria picture book <Arrow /></Link></>}
            {region === "UK" && <Link href="/media-gallery/nigeria">Switch to the Nigeria picture book <Arrow /></Link>}
            {region === "Nigeria" && <Link href="/media-gallery/uk">Switch to the UK picture book <Arrow /></Link>}
          </div>
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
          <div className="gallery-region-heading" data-reveal><p className="oak-kicker dark">UK and Nigeria</p><h2 id="choose-gallery">Choose a picture book.</h2><p>Each book tells the story of one region in photographs, gathered into chapters with captions that explain what you are seeing.</p></div>
          <Link className="gallery-region-route route-uk" href="/media-gallery/uk" data-reveal>
            <div className="gallery-route-image"><Image src="/images/gallery-book/uk/parent-carers-zumba-in-motion.webp" alt="Parent carers moving together during an OAKonsult Zumba class" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
            <div><span>United Kingdom</span><h3>Parent-carer support, Project ME and community wellbeing.</h3><b>Open the UK picture book <Arrow /></b></div>
          </Link>
          <Link className="gallery-region-route route-ng" href="/media-gallery/nigeria" data-reveal>
            <div className="gallery-route-image"><Image src="/images/gallery-book/nigeria/press-conference-team.webp" alt="OAKonsult representatives holding information materials at a press conference" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
            <div><span>Nigeria</span><h3>Outreach, public awareness and community partnership.</h3><b>Open the Nigeria picture book <Arrow /></b></div>
          </Link>
        </section>
      )}

      {!region && (
        <section className="picture-book-gateway" aria-labelledby="picture-book-gateway-title">
          <div className="picture-book-gateway-heading" data-reveal>
            <p className="oak-kicker dark">Inside the books</p>
            <h2 id="picture-book-gateway-title">Two picture books, one story of support.</h2>
            <p>Supporters, funders and partners can see the work as it really happens: around tables, in studios, at schools and out in the community.</p>
          </div>
          <div className="picture-book-gateway-lists">
            <article className="picture-book-gateway-list" data-reveal>
              <h3>The UK picture book</h3>
              <p>Project ME sessions, community wellbeing, participant recognition and the people gathered around the work.</p>
              <ul>
                {galleryBookChapters.UK.map((chapter) => (
                  <li key={chapter.title}><span>{chapter.title}</span><p>{chapter.intro}</p></li>
                ))}
              </ul>
              <Link className="oak-editorial-link dark-link" href="/media-gallery/uk"><span>Open the UK picture book</span><Arrow /></Link>
            </article>
            <article className="picture-book-gateway-list" data-reveal>
              <h3>The Nigeria picture book</h3>
              <p>Community visits, radio and television conversations, the OAK Centre Prime site and a coordinated medical outreach.</p>
              <ul>
                {galleryBookChapters.Nigeria.map((chapter) => (
                  <li key={chapter.title}><span>{chapter.title}</span><p>{chapter.intro}</p></li>
                ))}
              </ul>
              <Link className="oak-editorial-link dark-link" href="/media-gallery/nigeria"><span>Open the Nigeria picture book</span><Arrow /></Link>
            </article>
          </div>
        </section>
      )}

      {region && <PictureBookGallery region={region} />}

      <section className="editorial-action-band">
        <div data-reveal><p className="oak-kicker">Support OAKonsult</p><h2>{region === "UK" ? "Support parent carers in the UK." : region === "Nigeria" ? "Support disability inclusion in Nigeria." : "Help more parent carers find support."}</h2></div>
        <div className="editorial-route-links light-links" data-reveal><Link href="/donate">Make a donation <Arrow /></Link><Link href="/get-involved">Volunteer or partner <Arrow /></Link></div>
      </section>
    </div>
  );
}
