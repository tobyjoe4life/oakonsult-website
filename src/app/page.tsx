import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/lib/content";

const Arrow = () => <span aria-hidden="true">→</span>;

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Support that starts with listening</p>
          <h1>No parent carer should walk alone.</h1>
          <p className="hero-intro">We create space for parent carers to feel seen, build confidence and find practical support, while advancing disability inclusion in communities.</p>
          <div className="button-row">
            <Link className="button button-gold" href="/find-support">Find support</Link>
            <Link className="text-link light" href="/donate">Help make this possible <Arrow /></Link>
          </div>
          <div className="hero-trust" aria-label="OAKonsult at a glance">
            <span>Parent carer-led</span>
            <span>UK, Nigeria and online</span>
            <span>Inclusive by design</span>
          </div>
        </div>
        <div className="hero-image">
          <Image src="/images/hero-parent-carers.jpg" alt="Parent carers taking part in an OAKonsult wellbeing session" fill priority sizes="(max-width: 800px) 100vw, 50vw" />
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading">
          <div><p className="eyebrow dark">Start where you are</p><h2>There is a place for you here.</h2></div>
          <p>Whether you need support, want to strengthen your practice or help sustain the work, choose the route that feels right.</p>
        </div>
        <div className="path-grid">
          {[
            ["Support", "I am a parent or carer", "Find connection, wellbeing support and practical routes forward.", "/find-support"],
            ["Partnership", "I am a professional or organisation", "Explore programmes, referrals and ways to work in partnership.", "/what-we-do"],
            ["Take part", "I want to support the work", "Give time, fundraise, partner with us or make a donation.", "/get-involved"],
          ].map(([number, title, description, href]) => (
            <Link className="path-card" href={href} key={number}>
              <span>{number}</span><h3>{title}</h3><p>{description}</p><b>Explore this route <Arrow /></b>
            </Link>
          ))}
        </div>
      </section>

      <section className="feature section">
        <div className="shell split-feature">
          <div className="feature-image"><Image src="/images/project-me-session.jpg" alt="Parent carers taking part in a Project ME workshop" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
          <div className="feature-copy">
            <p className="eyebrow">Featured programme</p>
            <h2>Project ME puts the parent carer back in the picture.</h2>
            <p>A supportive programme focused on identity, wellbeing and confidence. It gives parent carers time to reflect, connect and move forward alongside people who understand.</p>
            <ul className="tick-list"><li>Space to focus on your own wellbeing</li><li>Tools for confidence and self-advocacy</li><li>A community rooted in shared understanding</li></ul>
            <Link className="button button-cream" href="/what-we-do">Discover Project ME</Link>
          </div>
        </div>
      </section>

      <section className="story-band">
        <div className="shell story-layout">
          <div>
            <p className="eyebrow dark">Belonging changes things</p>
            <h2>Being understood can be the beginning of something new.</h2>
            <p>Our communities make room for honest conversations, mutual encouragement and the knowledge that nobody has to carry everything alone.</p>
            <Link className="text-link" href="/stories">Read stories and reflections <Arrow /></Link>
          </div>
          <div className="story-photo"><Image src="/images/parent-carer-community.jpg" alt="Parent carers connecting in an OAKonsult community setting" fill sizes="(max-width: 800px) 100vw, 45vw" /></div>
        </div>
      </section>

      <section className="impact section">
        <div className="shell">
          <div className="impact-heading">
            <div><p className="eyebrow">Participant feedback</p><h2>What parent carers told us.</h2></div>
            <p>Figures currently published by OAKonsult, presented as participant feedback rather than universal outcomes.</p>
          </div>
          <div className="impact-grid">{siteContent.impact.map((item) => <div key={item.value}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading"><div><p className="eyebrow dark">Local roots, shared purpose</p><h2>Our work in the UK and Nigeria.</h2></div></div>
        <div className="region-grid">
          <Link href="/uk" className="region-card">
            <Image src="/images/project-me-graduants.jpg" alt="Project ME participants and supporters at a programme celebration" fill sizes="(max-width: 800px) 100vw, 50vw" />
            <div><span>United Kingdom</span><h3>Support that strengthens parent carers</h3><b>Explore our UK work <Arrow /></b></div>
          </Link>
          <Link href="/nigeria" className="region-card">
            <Image src="/images/nigeria-outreach.jpg" alt="OAKonsult community outreach volunteers, health workers and community members in Nigeria" fill sizes="(max-width: 800px) 100vw, 50vw" />
            <div><span>Nigeria</span><h3>Community-led disability inclusion</h3><b>Explore our Nigeria work <Arrow /></b></div>
          </Link>
        </div>
      </section>

      <section className="stories-section section">
        <div className="shell">
          <div className="section-heading"><div><p className="eyebrow dark">Ideas and lived experience</p><h2>Stories worth making room for.</h2></div></div>
          <div className="story-cards">
            {siteContent.stories.map((story) => (
              <article key={story.title}><span>{story.tag}</span><h3>{story.title}</h3><p>{story.summary}</p><Link href="/stories">Read more <Arrow /></Link></article>
            ))}
          </div>
        </div>
      </section>

      <section className="partner-rail" aria-labelledby="partners-heading">
        <div className="shell">
          <p id="partners-heading">Working alongside</p>
          <div>{siteContent.partners.map((partner) => <span key={partner}>{partner}</span>)}</div>
        </div>
      </section>

      <section className="final-cta">
        <div className="shell">
          <p className="eyebrow">One circle. Many ways to help.</p>
          <h2>Your support can help someone feel less alone.</h2>
          <div className="button-row centered"><Link className="button button-gold" href="/donate">Make a donation</Link><Link className="button button-cream" href="/find-support">I need support</Link></div>
        </div>
      </section>
    </>
  );
}
