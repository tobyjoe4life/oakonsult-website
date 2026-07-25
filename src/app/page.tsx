import Image from "next/image";
import Link from "next/link";
import { HomeMotion } from "@/components/HomeMotion";
import { siteContent } from "@/lib/content";
import { homepageGallery } from "@/lib/gallery";

const Arrow = () => <span className="oak-arrow" aria-hidden="true">→</span>;

function GrowthRings({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 420 420" aria-hidden="true">
      <path d="M210 31c97 0 176 79 176 176S307 383 210 383 34 304 34 207 113 31 210 31Z" />
      <path d="M210 74c74 0 134 60 134 134s-60 134-134 134S76 282 76 208 136 74 210 74Z" />
      <path d="M210 116c51 0 92 41 92 92s-41 92-92 92-92-41-92-92 41-92 92-92Z" />
      <path d="M210 157c28 0 51 23 51 51s-23 51-51 51-51-23-51-51 23-51 51-51Z" />
      <path d="M208 31c-17 36-26 72-26 108 0 58 29 84 29 139 0 36-10 71-29 105" />
    </svg>
  );
}

function OakLeaf({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 360 480" aria-hidden="true">
      <path className="leaf-fill" d="M181 449c-9-61-7-112 6-155-46 27-100 12-122-30 35-8 52-26 58-52-43-3-75-32-78-70 35 9 62 2 82-22-23-28-22-64 3-89 18 24 41 36 69 36 7-29 29-51 58-60 1 31 13 55 37 71 24-13 48-13 70-1-10 29-29 48-56 57 16 23 19 48 10 75-24-14-48-17-73-7 7 28-1 53-24 75-18-18-39-27-64-25 23 48 36 104 40 167h-46Z" />
      <path className="leaf-line" d="M181 449c-4-118 19-220 71-306M182 292l-59-79M205 245l92-69M162 342l-63-73M218 205l-25-122" />
    </svg>
  );
}

const partnerLogos = [
  ["The National Lottery Community Fund", "/partners/national-lottery.png"],
  ["Bromley Council", "/partners/bromley.png"],
  ["Mayor of London", "/partners/mayor-of-london.jpg"],
  ["Just Sow", "/partners/just-sow.png"],
  ["The Big Give", "/partners/big-give.png"],
  ["Bishop Radford Trust", "/partners/bishop-radford.svg"],
  ["The Albert Hunt Trust", "/partners/albert-hunt.png"],
  ["Christ Church Orpington", "/partners/christ-church.webp"],
  ["Joni and Friends", "/partners/joni-and-friends.jpg"],
  ["SEN Parenting", "/partners/sen-parenting.webp"],
  ["Stanbic IBTC", "/partners/stanbic.png"],
  ["Flour Mills of Nigeria", "/partners/flour-mills.png"],
] as const;

export default function Home() {
  return (
    <div className="oak-home">
      <HomeMotion />

      <section className="oak-hero" aria-labelledby="home-title">
        <div className="oak-hero-photo">
          <Image
            className="oak-hero-image-desktop"
            src="/images/sharepoint/zumba-action.webp"
            alt="Parent carers taking part in an OAKonsult Zumba wellbeing session"
            fill
            priority
            sizes="(max-width: 800px) 1px, 100vw"
          />
          <Image
            className="oak-hero-image-mobile"
            src="/images/sharepoint/zumba-group-mobile.webp"
            alt="Parent carers taking part in an OAKonsult Zumba wellbeing session"
            fill
            priority
            sizes="(max-width: 800px) 100vw, 1px"
          />
        </div>
        <div className="oak-hero-scrim" aria-hidden="true" />
        <GrowthRings className="oak-hero-rings" />
        <OakLeaf className="oak-hero-leaf" />
        <div className="oak-hero-field" aria-hidden="true" />
        <div className="oak-hero-content" data-reveal>
          <p className="oak-kicker">Support that starts with listening</p>
          <h1 id="home-title">No parent carer<br />should walk<br />alone.</h1>
          <p>We make space for parent carers to feel seen, build confidence and find practical support, while advancing disability inclusion in communities.</p>
          <div className="oak-actions">
            <Link className="oak-pill oak-pill-dark" href="/find-support">Get support</Link>
            <Link className="oak-editorial-link" href="/donate"><span>Help make this possible</span><Arrow /></Link>
          </div>
        </div>
        <nav className="oak-hero-note" aria-label="Choose a region" data-reveal>
          <span>Where we work</span>
          <Link href="/uk">United Kingdom <Arrow /></Link>
          <Link href="/nigeria">Nigeria <Arrow /></Link>
        </nav>
        <a className="oak-scroll-cue" href="#welcome"><span>Scroll</span><i aria-hidden="true">↓</i></a>
      </section>

      <section className="oak-proof" id="welcome">
        <div className="oak-proof-shell">
          <div className="oak-proof-photo" data-reveal>
            <Image src="/images/current-site-community-partnership.webp" alt="OAKonsult representatives with community partners at a public event" fill sizes="(max-width: 760px) 78vw, 38vw" />
            <OakLeaf className="oak-proof-leaf" />
          </div>
          <blockquote data-reveal>
            <span className="oak-quote-marks" aria-hidden="true">“</span>
            <p>Being understood can be a start.</p>
            <footer>Support, connection and time to breathe.</footer>
          </blockquote>
        </div>
      </section>

      <section className="oak-pathways" id="support-pathways">
        <GrowthRings className="oak-pathway-rings" />
        <OakLeaf className="oak-pathway-leaf" />
        <div className="oak-wide-grid">
          <div className="oak-pathway-statement" data-reveal>
            <p className="oak-kicker dark">Start here</p>
            <h2>What would you like to do?</h2>
            <p>Choose the option that best matches what you need today.</p>
          </div>
          <div className="oak-route-list" data-reveal>
            <Link href="/find-support"><span>01</span><h3>Do you need support?</h3><p>Find connection, wellbeing support and practical routes forward.</p><b>Get support <Arrow /></b></Link>
            <Link href="/get-involved"><span>02</span><h3>Can you give support?</h3><p>Donate, volunteer, fundraise or build something with us.</p><b>Give support <Arrow /></b></Link>
            <Link href="/what-we-do"><span>03</span><h3>Are you a professional or partner?</h3><p>Explore referrals, inclusion training and partnership opportunities.</p><b>Work with us <Arrow /></b></Link>
          </div>
        </div>
      </section>

      <section className="oak-editorial" id="oak-in-action" aria-labelledby="action-title">
        <div className="oak-editorial-intro" data-reveal>
          <p className="oak-kicker dark">OAKonsult in action</p>
          <h2 id="action-title">Support for parent carers and communities.</h2>
        </div>
        <div className="oak-editorial-canvas">
          <div className="oak-action-list" data-reveal>
            <Link href="/programmes/project-me"><span>Project ME</span><strong>Identity, wellbeing and confidence for parent carers</strong><Arrow /></Link>
            <Link href="/programmes/parent-carer-support"><span>Wellbeing</span><strong>Movement, connection and a reason to keep showing up</strong><Arrow /></Link>
            <Link href="/nigeria"><span>Community outreach</span><strong>Disability inclusion built with local communities</strong><Arrow /></Link>
          </div>
          <Link className="oak-poster-tile oak-poster-project" href="/programmes/project-me" data-reveal>
            <Image src="/images/sharepoint/project-me-workshop.webp" alt="A facilitator leading an OAKonsult Project ME workshop" fill sizes="(max-width: 760px) 92vw, 52vw" />
            <div><span>Featured programme</span><h3>Project ME puts the parent carer back in the picture.</h3><b>Discover Project ME <Arrow /></b></div>
          </Link>
          <Link className="oak-poster-tile oak-poster-funding" href="/stories" data-reveal>
            <Image src="/images/gallery/nigeria-knowledge-radio.webp" alt="OAKonsult disability-awareness engagement at Knowledge Radio" fill sizes="(max-width: 760px) 82vw, 30vw" />
            <span>Stronger carers. Stronger families.</span>
          </Link>
          <Link className="oak-poster-tile oak-poster-tv" href="/impact" data-reveal>
            <Image src="/images/current-site-tv-advocacy.webp" alt="OAKonsult taking part in a television discussion" fill sizes="(max-width: 760px) 82vw, 34vw" />
            <div><span>Advocacy</span><h3>Making parent carer voices visible.</h3><b>See stories and insight <Arrow /></b></div>
          </Link>
        </div>
      </section>

      <section className="oak-project-band" id="project-me">
        <div className="oak-project-collage" data-reveal>
          <div className="oak-collage-main"><Image src="/images/sharepoint/project-me-graduation.webp" alt="Project ME participants at a programme celebration" fill sizes="(max-width: 760px) 88vw, 46vw" /></div>
          <div className="oak-collage-small top"><Image src="/images/sharepoint/project-me-session-wide.webp" alt="Parent carers taking part in a facilitated Project ME session" fill sizes="(max-width: 760px) 42vw, 20vw" /></div>
          <div className="oak-collage-small bottom"><Image src="/images/sharepoint/zumba-group.webp" alt="OAKonsult Zumba participants moving together in a wellbeing session" fill sizes="(max-width: 760px) 42vw, 20vw" /></div>
          <span className="oak-collage-sticker">Project ME<br />in action.</span>
        </div>
        <div className="oak-project-copy" data-reveal>
          <p className="oak-kicker">Project ME</p>
          <h2>Time to remember the person behind the caring role.</h2>
          <p>Project ME creates a supportive space for identity, wellbeing, confidence and connection. Parent carers can reflect, learn and move forward alongside people who understand.</p>
          <ul><li>Room to focus on your own wellbeing</li><li>Tools for confidence and self-advocacy</li><li>A peer community of parent carers</li></ul>
          <Link className="oak-pill oak-pill-gold" href="/programmes/project-me">Explore the programme</Link>
        </div>
        <GrowthRings className="oak-project-rings" />
      </section>

      <section className="oak-impact" aria-labelledby="impact-title">
        <OakLeaf className="oak-impact-leaf" />
        <div className="oak-impact-top" data-reveal>
          <div><p className="oak-kicker dark">Participant feedback</p><h2 id="impact-title">What parent carers told us.</h2></div>
          <p>Feedback from Project ME participants. Results vary between people and cohorts.</p>
        </div>
        <div className="oak-impact-grid">
          {siteContent.impact.map((item, index) => (
            <div key={item.value} className={`oak-impact-stat stat-${index + 1}`} data-reveal>
              <GrowthRings className="oak-stat-rings" />
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="oak-regions" aria-labelledby="regions-title">
        <div className="oak-regions-heading" data-reveal>
          <p className="oak-kicker dark">Where we work</p>
          <h2 id="regions-title">Across the UK and Nigeria.</h2>
        </div>
        <div className="oak-region-cards">
          <Link href="/uk" className="oak-region-card oak-region-uk" data-reveal>
            <Image src="/images/sharepoint/zumba-group.webp" alt="Parent carers taking part in an OAKonsult wellbeing activity in the UK" fill sizes="(max-width: 760px) 94vw, 50vw" />
            <div><span>United Kingdom</span><h3>Support that strengthens parent carers.</h3><b>Explore our UK work <Arrow /></b></div>
          </Link>
          <Link href="/nigeria" className="oak-region-card oak-region-ng" data-reveal>
            <Image src="/images/sharepoint/oak-centre-dignitaries.webp" alt="OAKonsult representatives and guests at the OAK Centre groundbreaking event" fill sizes="(max-width: 760px) 94vw, 50vw" />
            <div><span>Nigeria</span><h3>Community‑led disability inclusion.</h3><b>Explore our Nigeria work <Arrow /></b></div>
          </Link>
        </div>
      </section>

      <section className="oak-gallery-preview" aria-labelledby="home-gallery-title">
        <div className="oak-gallery-preview-heading" data-reveal>
          <div><p className="oak-kicker dark">Media gallery</p><h2 id="home-gallery-title">OAKonsult in pictures.</h2></div>
          <div><p>Photographs from OAKonsult programmes, outreach and community activities in the UK and Nigeria.</p><Link className="oak-editorial-link dark-link" href="/media-gallery"><span>View the gallery</span><Arrow /></Link></div>
        </div>
        <div className="oak-gallery-preview-grid">
          {homepageGallery.map((item, index) => (
            <Link className={`oak-gallery-preview-item item-${index + 1}`} href={item.region === "UK" ? "/media-gallery/uk" : "/media-gallery/nigeria"} key={item.slug} data-reveal>
              <Image src={item.src} alt={item.alt} fill sizes="(max-width: 760px) 92vw, (max-width: 1100px) 50vw, 33vw" />
              <div><span>{item.region} / {item.theme}</span><strong>{item.title}</strong><i aria-hidden="true">→</i></div>
            </Link>
          ))}
        </div>
      </section>

      <nav className="oak-home-directory" aria-label="More OAKonsult destinations">
        <span>More from OAKonsult</span>
        <Link href="/impact"><small>01</small><strong>Stories &amp; impact</strong><Arrow /></Link>
        <Link href="/events"><small>02</small><strong>Events</strong><Arrow /></Link>
        <Link href="/funders-partners"><small>03</small><strong>Funders &amp; partners</strong><Arrow /></Link>
        <Link href="/get-involved"><small>04</small><strong>Get involved</strong><Arrow /></Link>
      </nav>

      <section className="oak-stories" id="latest-stories" aria-labelledby="stories-title">
        <div className="oak-stories-heading" data-reveal>
          <p className="oak-kicker dark">Stories and reflections</p>
          <h2 id="stories-title">Read about parent-carer wellbeing and inclusion.</h2>
          <Link className="oak-editorial-link dark-link" href="/stories"><span>View all stories</span><Arrow /></Link>
        </div>
        <div className="oak-story-collage">
          <article className="oak-story oak-story-large" data-reveal>
            <div className="oak-story-image"><Image src="/images/parent-carer-community.jpg" alt="Parent carers connecting during an OAKonsult community activity" fill sizes="(max-width: 760px) 92vw, 52vw" /></div>
            <span>{siteContent.stories[0].tag}</span><h3>{siteContent.stories[0].title}</h3><p>{siteContent.stories[0].summary}</p><Link href="/stories">Read the story <Arrow /></Link>
          </article>
          <article className="oak-story oak-story-small clay" data-reveal>
            <div className="oak-story-image"><Image src="/images/sharepoint/press-conference.webp" alt="OAKonsult representatives at a public press event" fill sizes="(max-width: 760px) 78vw, 32vw" /></div>
            <span>{siteContent.stories[1].tag}</span><h3>{siteContent.stories[1].title}</h3><Link href="/stories">Read the story <Arrow /></Link>
          </article>
          <article className="oak-story oak-story-small teal" data-reveal>
            <div className="oak-story-image"><Image src="/images/care-in-action.jpeg" alt="A community member sharing a warm moment at an OAKonsult event" fill sizes="(max-width: 760px) 78vw, 30vw" /></div>
            <span>{siteContent.stories[2].tag}</span><h3>{siteContent.stories[2].title}</h3><Link href="/stories">Read the story <Arrow /></Link>
          </article>
        </div>
      </section>

      <section className="oak-partners" aria-labelledby="partners-title">
        <div className="oak-partners-intro"><p className="oak-kicker">Working together</p><h2 id="partners-title">Our funders and partners.</h2><Link className="oak-editorial-link" href="/funders-partners"><span>See all funders and partners</span><Arrow /></Link></div>
        <p className="oak-logo-swipe-hint">Swipe to see more partners <span aria-hidden="true">→</span></p>
        <div className="oak-logo-window" role="region" aria-label="Funders and partners logo list" tabIndex={0}>
          <div className="oak-logo-track">
            {[...partnerLogos, ...partnerLogos].map(([name, logo], index) => (
              <div className="oak-logo-card" key={`${name}-${index}`} aria-hidden={index >= partnerLogos.length ? "true" : undefined}>
                <Image src={logo} alt={index < partnerLogos.length ? name : ""} width={160} height={78} sizes="160px" loading="eager" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="oak-final-cta">
        <GrowthRings className="oak-final-rings" />
        <OakLeaf className="oak-final-leaf" />
        <div data-reveal>
          <p className="oak-kicker">Support OAKonsult</p>
          <h2>Your support can help someone feel less alone.</h2>
          <div className="oak-actions centered"><Link className="oak-pill oak-pill-gold" href="/donate">Make a donation</Link><Link className="oak-pill oak-pill-light" href="/find-support">I need support</Link></div>
        </div>
      </section>
    </div>
  );
}
