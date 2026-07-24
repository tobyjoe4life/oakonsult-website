import Image from "next/image";
import Link from "next/link";
import { HomeMotion } from "@/components/HomeMotion";

export type InteriorPageData = {
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  cta: string;
  ctaHref: string;
  items: {
    title: string;
    text: string;
    href?: string;
  }[];
};

export function InteriorPage({ data }: { data: InteriorPageData }) {
  return (
    <div className="oak-home editorial-page interior-v5">
      <HomeMotion />
      <section className="interior-hero" aria-labelledby="interior-title">
        <div className="interior-hero-copy" data-reveal>
          <nav className="editorial-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>{data.title}</span></nav>
          <p className="oak-kicker">{data.eyebrow}</p>
          <h1 id="interior-title">{data.title}</h1>
          <p>{data.intro}</p>
        </div>
        <div className="interior-hero-image" data-reveal><Image src={data.image} alt={data.imageAlt} fill priority sizes="(max-width: 960px) 100vw, 54vw" /></div>
      </section>

      <section className="interior-flow" aria-labelledby="interior-section-title">
        <div className="interior-flow-heading" data-reveal>
          <p className="oak-kicker dark">Explore OAKonsult</p>
          <h2 id="interior-section-title">Choose where to go next.</h2>
          <p>Open a route for more detail, practical information and a clear next step.</p>
        </div>
        <div className="interior-list">
          {data.items.map((item, index) => (
            <article key={item.title} data-reveal>
              <span className="interior-index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <Link href={item.href ?? data.ctaHref}>Explore <span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-action-band">
        <div data-reveal><p className="oak-kicker">Next step</p><h2>{data.cta}</h2><p>Contact OAKonsult if you need help choosing the right route or want to discuss the work in more detail.</p></div>
        <div className="editorial-route-links light-links" data-reveal>
          <Link href={data.ctaHref}>{data.cta} <span aria-hidden="true">→</span></Link>
          <Link href="/media-gallery">View the media gallery <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </div>
  );
}
