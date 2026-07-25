import Image from "next/image";
import Link from "next/link";
import { HomeMotion } from "@/components/HomeMotion";
import { siteContent } from "@/lib/content";

const storyImages = [
  { src: "/images/parent-carer-community.jpg", alt: "Parent carers spending time together" },
  { src: "/images/current-site-tv-advocacy.webp", alt: "OAKonsult representatives discussing disability inclusion in public media" },
  { src: "/images/care-in-action.jpeg", alt: "People taking part in community work" },
];

export default function Stories() {
  return (
    <div className="editorial-page story-index-page">
      <HomeMotion />
      <section className="story-index-hero" aria-labelledby="story-index-title">
        <div className="story-index-hero-copy">
          <nav className="editorial-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Stories</span></nav>
          <p className="oak-kicker">Stories and reflections</p>
          <h1 id="story-index-title">Stories and reflections</h1>
          <p>Read about parent-carer wellbeing, disability inclusion and community support. We do not identify private beneficiaries.</p>
        </div>
        <div className="story-index-hero-photo"><Image src="/images/gallery/uk-project-me-group.webp" alt="A Project ME community presentation" fill priority sizes="(max-width: 900px) 100vw, 50vw" /></div>
      </section>

      <section className="story-index-list" aria-label="Stories and reflections">
        <header data-reveal><p className="oak-kicker dark">Latest stories</p><h2>Parent-carer wellbeing, community and inclusion.</h2></header>
        {siteContent.stories.map((story, index) => (
          <article className="story-index-entry" key={story.title} data-reveal>
            <div className="story-index-image"><Image src={storyImages[index % storyImages.length].src} alt={storyImages[index % storyImages.length].alt} fill sizes="(max-width: 760px) 100vw, 42vw" /></div>
            <div className="story-index-copy">
              <span>0{index + 1} / {story.tag}</span>
              <h2>{story.title}</h2>
              <p>{story.summary}</p>
              <div><Link href="/impact">See our wider impact <span aria-hidden="true">→</span></Link><Link href="/contact">Talk to OAKonsult</Link></div>
            </div>
          </article>
        ))}
      </section>

      <section className="editorial-action-band"><div><p className="oak-kicker">More from OAKonsult</p><h2>See our programmes, photographs and partner organisations.</h2></div><div><Link className="editorial-primary-action" href="/media-gallery">View the media gallery <span aria-hidden="true">→</span></Link><Link className="editorial-secondary-action" href="/funders-partners">Funders and partners</Link></div></section>
    </div>
  );
}
