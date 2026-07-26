import Image from "next/image";
import Link from "next/link";
import { HomeMotion } from "@/components/HomeMotion";

export type RegionService = {
  label: string;
  title: string;
  text: string;
  details: string[];
  href: string;
  linkLabel: string;
};

export type RegionPartner = {
  name: string;
  logo: string;
};

export type RegionPageData = {
  slug: "uk" | "nigeria";
  country: string;
  title: string;
  eyebrow: string;
  intro: string;
  context: string;
  image: string;
  imageAlt: string;
  primaryCta: { label: string; href: string };
  services: RegionService[];
  partnersTitle: string;
  partnersIntro: string;
  partners: RegionPartner[];
  contact: {
    heading: string;
    text: string;
    email: string;
    phone: string;
    address: string;
  };
  otherRegion: { label: string; href: string; text: string };
};

export function RegionPage({ data }: { data: RegionPageData }) {
  return (
    <div className={`oak-home region-page region-page-${data.slug}`} data-mood={data.slug === "nigeria" ? "harvest" : "growth"}>
      <HomeMotion />

      <section className="region-hero" aria-labelledby="region-title">
        <div className="region-hero-image">
          <Image src={data.image} alt={data.imageAlt} fill priority sizes="100vw" />
        </div>
        <div className="region-hero-wash" aria-hidden="true" />
        <div className="region-hero-copy" data-reveal>
          <p className="oak-kicker">{data.eyebrow}</p>
          <h1 id="region-title">OAKonsult <span>{data.country}</span></h1>
          <p>{data.intro}</p>
          <div className="oak-actions">
            <Link className="oak-pill oak-pill-gold" href={data.primaryCta.href}>{data.primaryCta.label}</Link>
            <Link className="oak-editorial-link region-hero-link" href="#programmes"><span>Explore {data.country} programmes</span><i aria-hidden="true">↓</i></Link>
          </div>
        </div>

      </section>

      <nav className="region-jump" aria-label={`${data.country} page sections`}>
        <div className="region-jump-inner">
          <span>OAKonsult {data.country}</span>
          <a className="is-active" href="#overview" aria-current="location">Overview</a>
          <a href="#programmes">Programmes</a>
          <a href="#partners">Funders &amp; partners</a>
          <Link href={`/media-gallery/${data.slug}`}>Gallery</Link>
          <a href="#contact">Contact</a>
          <Link href={data.otherRegion.href}>Switch to {data.otherRegion.label} →</Link>
        </div>
      </nav>

      <section className="region-overview" id="overview">
        <div className="region-overview-grid">
          <div data-reveal>
            <p className="oak-kicker dark">OAKonsult {data.country}</p>
            <h2>{data.title}</h2>
          </div>
          <div className="region-context-card" data-reveal>
            <span>About our work in {data.country}</span>
            <p>{data.context}</p>
            <strong>Contact the {data.country} team for programme, funding or partnership enquiries.</strong>
          </div>
        </div>
      </section>

      <section className="region-programmes" id="programmes" aria-labelledby="region-programmes-title">
        <div className="region-section-heading" data-reveal>
          <p className="oak-kicker dark">Support and programmes</p>
          <h2 id="region-programmes-title">Our work in {data.country}.</h2>
          <p>Choose a programme or service to find out what is available.</p>
        </div>
        <div className="region-service-grid" data-reveal-group>
          {data.services.map((service, index) => (
            <article className={`region-service-card card-${index + 1}`} key={service.title} data-reveal-child="pop">
              <span>{service.label}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <ul>{service.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
              <Link href={service.href}>{service.linkLabel} <span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="region-partners" id="partners" aria-labelledby="region-partners-title">
        <div className="region-partners-heading" data-reveal>
          <p className="oak-kicker">Funders and partners</p>
          <h2 id="region-partners-title">{data.partnersTitle}</h2>
          <p>{data.partnersIntro}</p>
        </div>
        <div className="region-partner-grid" data-reveal-group>
          {data.partners.map((partner) => (
            <article className="region-partner-card" key={partner.name} data-reveal-child="pop">
              <Image src={partner.logo} alt={`${partner.name} logo`} width={170} height={88} sizes="170px" />
              <span>{partner.name}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="region-gallery-bridge" aria-labelledby={`${data.slug}-gallery-title`}>
        <div className="region-gallery-copy" data-reveal>
          <p className="oak-kicker dark">Media gallery</p>
          <h2 id={`${data.slug}-gallery-title`}>Our work in pictures.</h2>
          <p>See photographs from programmes, outreach and community activities in {data.country}.</p>
          <Link className="oak-editorial-link dark-link" href={`/media-gallery/${data.slug}`}><span>View the {data.country} gallery</span><i aria-hidden="true">→</i></Link>
        </div>
        <div className="region-gallery-images" data-reveal="zoom">
          <div><Image src={data.slug === "uk" ? "/images/gallery/uk-project-me-session.webp" : "/images/gallery/nigeria-knowledge-radio.webp"} alt={data.slug === "uk" ? "Parent carers taking part in a Project ME session" : "OAKonsult disability-awareness engagement at Knowledge Radio"} fill sizes="(max-width:800px) 100vw,34vw" /></div>
          <div><Image src={data.slug === "uk" ? "/images/gallery/uk-project-me-group.webp" : "/images/gallery/nigeria-press-conference.webp"} alt={data.slug === "uk" ? "A group presentation during an OAKonsult Project ME event" : "OAKonsult representatives at a public press conference"} fill sizes="(max-width:800px) 100vw,28vw" /></div>
        </div>
      </section>

      <section className="region-contact" id="contact">
        <div className="region-contact-copy" data-reveal>
          <p className="oak-kicker dark">Contact OAKonsult {data.country}</p>
          <h2>{data.contact.heading}</h2>
          <p>{data.contact.text}</p>
          <Link className="oak-pill oak-pill-dark" href={`mailto:${data.contact.email}`}>Email the {data.country} team</Link>
        </div>
        <address className="region-contact-card" data-reveal>
          <span>{data.country}</span>
          <strong>{data.contact.address}</strong>
          <a href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
          <a href={`tel:${data.contact.phone.replace(/[^+\d]/g, "")}`}>{data.contact.phone}</a>
        </address>
      </section>

      <section className="region-switch">
        <div data-reveal>
          <p className="oak-kicker">OAKonsult in another region</p>
          <h2>{data.otherRegion.text}</h2>
          <Link className="oak-pill oak-pill-gold" href={data.otherRegion.href}>Explore {data.otherRegion.label}</Link>
        </div>
      </section>
    </div>
  );
}
