import Image from "next/image";
import Link from "next/link";
import { HomeMotion } from "@/components/HomeMotion";

export type RegionService = {
  label: string;
  title: string;
  text: string;
  details: string[];
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
    <div className={`oak-home region-page region-page-${data.slug}`}>
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
          <span>{data.country} hub</span>
          <a className="is-active" href="#overview" aria-current="location">Overview</a>
          <a href="#programmes">Programmes</a>
          <a href="#partners">Funders &amp; partners</a>
          <a href="#contact">Contact</a>
          <Link href={data.otherRegion.href}>Switch to {data.otherRegion.label} →</Link>
        </div>
      </nav>

      <section className="region-overview" id="overview">
        <div className="region-overview-grid">
          <div data-reveal>
            <p className="oak-kicker dark">Local focus, shared mission</p>
            <h2>{data.title}</h2>
          </div>
          <div className="region-context-card" data-reveal>
            <span>How the structure works</span>
            <p>{data.context}</p>
            <strong>One organisation. Country-specific programmes, funding and contact routes.</strong>
          </div>
        </div>
      </section>

      <section className="region-programmes" id="programmes" aria-labelledby="region-programmes-title">
        <div className="region-section-heading" data-reveal>
          <p className="oak-kicker dark">Our {data.country} work</p>
          <h2 id="region-programmes-title">Everything in one clear place.</h2>
          <p>Explore the programmes and support connected specifically with OAKonsult {data.country}.</p>
        </div>
        <div className="region-service-grid">
          {data.services.map((service, index) => (
            <article className={`region-service-card card-${index + 1}`} key={service.title} data-reveal>
              <span>{service.label}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <ul>{service.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="region-partners" id="partners" aria-labelledby="region-partners-title">
        <div className="region-partners-heading" data-reveal>
          <p className="oak-kicker">Funding is presented by region</p>
          <h2 id="region-partners-title">{data.partnersTitle}</h2>
          <p>{data.partnersIntro}</p>
        </div>
        <div className="region-partner-grid">
          {data.partners.map((partner) => (
            <article className="region-partner-card" key={partner.name} data-reveal>
              <Image src={partner.logo} alt={`${partner.name} logo`} width={170} height={88} sizes="170px" />
              <span>{partner.name}</span>
            </article>
          ))}
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
          <p className="oak-kicker">The wider OAKonsult family</p>
          <h2>{data.otherRegion.text}</h2>
          <Link className="oak-pill oak-pill-gold" href={data.otherRegion.href}>Explore {data.otherRegion.label}</Link>
        </div>
      </section>
    </div>
  );
}
