import Image from "next/image";
import Link from "next/link";
import { HomeMotion } from "@/components/HomeMotion";

const regions = [
  {
    id: "uk-programmes",
    eyebrow: "UK programmes",
    title: "Support in London and online.",
    text: "OAKonsult UK provides parent-carer wellbeing, peer connection and disability-inclusion programmes. In-person activities are based in London, with some support available online.",
    hubHref: "/uk",
    hubLabel: "Explore the UK hub",
    image: "/images/gallery/uk-project-me-session.webp",
    imageAlt: "Parent carers taking part in a Project ME session",
    imageCaption: "Project ME in community",
    programmes: [
      { title: "Support for Parent Carers", text: "Practical and peer-led support for unpaid parent carers of disabled children and young people.", href: "/programmes/parent-carer-support" },
      { title: "Project ME", text: "Wellbeing, confidence and identity support centred on the person behind the caring role.", href: "/programmes/project-me" },
      { title: "Zumba wellbeing", text: "Free movement and connection sessions for parent carers in Bromley, with a dedicated registration journey.", href: "/zumba-class" },
      { title: "Community inclusion support", text: "Practical disability-inclusion work with churches, faith communities and other community organisations. Family support is open to everyone, regardless of faith or background.", href: "/programmes/support-for-churches" },
    ],
  },
  {
    id: "nigeria-programmes",
    eyebrow: "Nigeria programmes",
    title: "Community-rooted disability inclusion.",
    text: "OAKonsult Nigeria works through community outreach, family support, disability awareness and local partnerships. It is also developing plans for OAK Centre Prime.",
    hubHref: "/nigeria",
    hubLabel: "Explore the Nigeria hub",
    image: "/images/gallery/nigeria-oolo-palace.webp",
    imageAlt: "OAKonsult representatives during a community engagement visit to Oolo Palace",
    imageCaption: "Community-rooted relationships",
    programmes: [
      { title: "OAK Centre Prime", text: "The planned disability-support centre for children, young people and families in Oolo Town, Oyo State.", href: "/programmes/oak-centre-prime" },
      { title: "Project ME Online", text: "Online parent-carer learning connected to the wider Project ME model where appropriate.", href: "/programmes/project-me" },
      { title: "Community support, outreach and rehabilitation", text: "Medical outreach, home and school visits, public awareness and community-based rehabilitation activity rooted in local relationships.", href: "/media-gallery/nigeria" },
      { title: "Community inclusion and awareness", text: "Disability awareness and practical inclusion support for families, churches and other community organisations.", href: "/programmes/support-for-churches" },
    ],
  },
] as const;

const sharedProgrammes = [
  { title: "Project ME resources", text: "Project ME learning can support parent carers through in-person and online activity, depending on availability.", href: "/programmes/project-me" },
  { title: "Disability-inclusion support", text: "OAKonsult works with community groups, churches and partners to improve understanding, access and participation.", href: "/programmes/support-for-churches" },
] as const;

export default function Page() {
  return (
    <div className="oak-home editorial-page interior-v5 programme-directory" data-mood="harvest">
      <HomeMotion />
      <section className="interior-hero" aria-labelledby="programme-directory-title">
        <div className="interior-hero-copy" data-reveal>
          <nav className="editorial-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Programmes</span></nav>
          <p className="oak-kicker">What we do</p>
          <h1 id="programme-directory-title">Programmes by place.</h1>
          <p>Find OAKonsult programmes through the UK and Nigeria hubs, with shared and online support clearly identified. Everyone is welcome, regardless of faith or background.</p>
        </div>
        <div className="interior-hero-image" data-reveal="zoom"><Image src="/images/project-me-session.jpg" alt="A Project ME group session" fill priority sizes="(max-width: 960px) 100vw, 54vw" /></div>
      </section>

      <nav className="programme-directory-jump" aria-label="Programme regions">
        <a href="#uk-programmes">UK programmes</a>
        <a href="#nigeria-programmes">Nigeria programmes</a>
        <a href="#shared-support">Shared and online support</a>
      </nav>

      {regions.map((region) => (
        <section className={`programme-region programme-region-${region.id}`} id={region.id} key={region.id} aria-labelledby={`${region.id}-title`}>
          <div className="programme-region-heading" data-reveal>
            <p className="oak-kicker dark">{region.eyebrow}</p>
            <h2 id={`${region.id}-title`}>{region.title}</h2>
            <p>{region.text}</p>
            <Link href={region.hubHref}>{region.hubLabel} <span aria-hidden="true">→</span></Link>
            <figure className="programme-region-photo">
              <div><Image src={region.image} alt={region.imageAlt} fill sizes="(max-width: 960px) 100vw, 34vw" /></div>
              <figcaption>{region.imageCaption}</figcaption>
            </figure>
          </div>
          <div className="programme-region-list" data-reveal-group>
            {region.programmes.map((programme, index) => (
              <article key={`${region.id}-${programme.title}`} data-reveal-child="slide">
                <span className="programme-number">{String(index + 1).padStart(2, "0")}</span>
                <div><h3><Link href={programme.href}>{programme.title}</Link></h3><p>{programme.text}</p></div>
                <Link className="programme-row-link" href={programme.href} aria-label={`Explore ${programme.title}`}>Explore <span aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
        </section>
      ))}

      <section className="programme-region programme-shared" id="shared-support" aria-labelledby="shared-support-title">
        <div className="programme-region-heading" data-reveal>
          <p className="oak-kicker dark">Shared and online support</p>
          <h2 id="shared-support-title">One purpose across both hubs.</h2>
          <p>Some learning, inclusion and partnership work can cross regions. Availability, location and eligibility are confirmed by the relevant OAKonsult team.</p>
          <Link href="/contact">Ask about availability <span aria-hidden="true">→</span></Link>
        </div>
        <div className="programme-region-list" data-reveal-group>
          {sharedProgrammes.map((programme, index) => (
            <article key={programme.title} data-reveal-child="slide">
              <span className="programme-number">{String(index + 1).padStart(2, "0")}</span>
              <div><h3><Link href={programme.href}>{programme.title}</Link></h3><p>{programme.text}</p></div>
              <Link className="programme-row-link" href={programme.href} aria-label={`Explore ${programme.title}`}>Explore <span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-action-band">
        <div data-reveal><p className="oak-kicker">Your next step</p><h2>Start with the journey that fits.</h2><p>Ask for support through the relevant programme, or choose how you would like to volunteer, partner or give.</p></div>
        <div className="editorial-route-links light-links" data-reveal><Link href="/find-support">Find support <span aria-hidden="true">→</span></Link><Link href="/get-involved">Get involved <span aria-hidden="true">→</span></Link></div>
      </section>
    </div>
  );
}
