import Image from "next/image";
import Link from "next/link";
import { HomeMotion } from "@/components/HomeMotion";
import { siteContent } from "@/lib/content";

const Arrow = () => <span aria-hidden="true">→</span>;

const highlights = [
  {
    label: "Parent-carer support",
    title: "Wellbeing, movement and peer connection.",
    text: "Project ME, Zumba sessions, webinars and peer support created practical ways for parent carers to connect and focus on their own wellbeing.",
  },
  {
    label: "Medical outreach",
    title: "Free care for children and young people.",
    text: "OAKonsult Nigeria records show that more than 100 children and young people with disabilities received free medical care during the reporting period.",
  },
  {
    label: "Disability inclusion",
    title: "Awareness built through local relationships.",
    text: "Community engagement, faith-community learning and public advocacy helped keep dignity, participation and practical inclusion in view.",
  },
  {
    label: "Partnership",
    title: "Different organisations, one shared purpose.",
    text: "Funders, health professionals, community organisations, churches and volunteers contributed different forms of support across the UK and Nigeria.",
  },
] as const;

export default function Page() {
  return (
    <div className="oak-home editorial-page impact-page">
      <HomeMotion />

      <section className="impact-masthead" aria-labelledby="impact-title">
        <div className="impact-masthead-copy" data-reveal>
          <nav className="editorial-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/stories">Stories and impact</Link><span aria-hidden="true">/</span><span aria-current="page">Impact</span>
          </nav>
          <p className="oak-kicker">Evidence, learning and accountability</p>
          <h1 id="impact-title">Impact should be clear enough to trust.</h1>
          <p>Numbers show reach. Feedback explains change. Photographs and stories add context. OAKonsult brings them together without claiming more than its records can support.</p>
          <div className="impact-masthead-links">
            <a href="#evidence">See the evidence <Arrow /></a>
            <Link href="/funders-partners">Funders and partners <Arrow /></Link>
          </div>
        </div>
        <div className="impact-masthead-photo" data-reveal>
          <Image src="/images/current-site-community-partnership.webp" alt="OAKonsult representatives with community partners at a public event" fill priority sizes="(max-width: 800px) 100vw, 54vw" />
          <span>Real programmes. Responsible reporting.</span>
        </div>
      </section>

      <section className="impact-evidence" id="evidence" aria-labelledby="evidence-title">
        <div className="impact-evidence-heading" data-reveal>
          <p className="oak-kicker dark">Verified evidence at a glance</p>
          <h2 id="evidence-title">What the records support.</h2>
          <p>These figures come from identified OAKonsult programme or outreach records. The source and reporting period stay attached to each number.</p>
        </div>
        <div className="impact-evidence-grid">
          {siteContent.impact.map((item, index) => (
            <article className={`impact-evidence-stat stat-${index + 1}`} key={item.value} data-reveal>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.value}</strong>
              <h3>{item.label}</h3>
              <dl><div><dt>Period</dt><dd>{item.period}</dd></div><div><dt>Basis</dt><dd>{item.source}</dd></div></dl>
            </article>
          ))}
        </div>
      </section>

      <section className="impact-principles" aria-labelledby="principles-title">
        <div className="impact-principles-statement" data-reveal>
          <p className="oak-kicker">How evidence is treated</p>
          <h2 id="principles-title">Listen. Check. Learn. Improve.</h2>
          <p>Impact is not only a headline number. It includes what participants say, what delivery records show and what the charity changes after learning from both.</p>
        </div>
        <ol className="impact-principles-list" data-reveal>
          <li><span>01</span><div><h3>Start with records.</h3><p>Participation and delivery figures should be tied to a programme, period and source.</p></div></li>
          <li><span>02</span><div><h3>Add people&apos;s experience.</h3><p>Feedback and stories help explain what changed, with consent and appropriate anonymity.</p></div></li>
          <li><span>03</span><div><h3>Keep regional context visible.</h3><p>UK and Nigeria activity is reported with its own programmes, partners and funding context.</p></div></li>
          <li><span>04</span><div><h3>Say what is still developing.</h3><p>Plans, targets and early learning are not presented as completed outcomes.</p></div></li>
        </ol>
      </section>

      <section className="impact-period" aria-labelledby="period-title">
        <div className="impact-period-heading" data-reveal>
          <p className="oak-kicker dark">January to June 2026</p>
          <h2 id="period-title">Six months of support, outreach and shared action.</h2>
          <p>A concise public view of the activity recorded across OAKonsult&apos;s UK and Nigeria work.</p>
        </div>
        <div className="impact-highlight-list">
          {highlights.map((item, index) => (
            <article key={item.label} data-reveal>
              <span>{String(index + 1).padStart(2, "0")} / {item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="impact-journal" aria-labelledby="impact-journal-title">
        <div className="impact-journal-heading" data-reveal>
          <p className="oak-kicker dark">The work in pictures</p>
          <h2 id="impact-journal-title">People, participation and place.</h2>
          <Link className="oak-editorial-link dark-link" href="/media-gallery"><span>View the media gallery</span><Arrow /></Link>
        </div>
        <div className="impact-journal-grid">
          <figure className="impact-journal-main" data-reveal><div><Image src="/images/gallery/uk-project-me-group.webp" alt="A group presentation during an OAKonsult Project ME event" fill sizes="(max-width: 800px) 100vw, 56vw" /></div><figcaption><span>United Kingdom</span><p>Programme activity creates opportunities to connect, learn and reflect.</p></figcaption></figure>
          <figure data-reveal><div><Image src="/images/impact/nigeria-community-session.jpeg" alt="Adults taking part in a facilitated OAKonsult community session in Nigeria" fill sizes="(max-width: 800px) 100vw, 38vw" /></div><figcaption><span>Nigeria</span><p>Facilitated conversation turns shared experience into practical learning.</p></figcaption></figure>
          <figure data-reveal><div><Image src="/images/impact/nigeria-outreach-team.jpeg" alt="OAKonsult outreach team members gathered together with programme materials" fill sizes="(max-width: 800px) 100vw, 38vw" /></div><figcaption><span>Nigeria</span><p>Local teams and volunteers help community activity take shape.</p></figcaption></figure>
        </div>
      </section>

      <section className="impact-reports" aria-labelledby="reports-title">
        <div data-reveal><p className="oak-kicker">Governance and reporting</p><h2 id="reports-title">Annual reports belong beside the evidence.</h2></div>
        <div data-reveal><p>Approved annual reports and public policy documents will be added when they are approved for publication by trustees or leadership. Partners and funders can request current governance or impact information from the team.</p><div className="impact-report-links"><Link href="/contact">Request information <Arrow /></Link><Link href="/funders-partners">See who works with us <Arrow /></Link></div></div>
      </section>

      <section className="editorial-action-band impact-action-band">
        <div data-reveal><p className="oak-kicker">Your next step</p><h2>Help the work grow with care.</h2><p>Support a programme, explore the stories or start a partnership conversation.</p></div>
        <div className="editorial-route-links light-links" data-reveal><Link href="/donate">Support OAKonsult <Arrow /></Link><Link href="/get-involved">Get involved <Arrow /></Link></div>
      </section>
    </div>
  );
}
