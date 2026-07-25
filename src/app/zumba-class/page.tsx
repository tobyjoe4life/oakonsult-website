import Image from "next/image";
import Link from "next/link";
import { HomeMotion } from "@/components/HomeMotion";
import { PublicInterestForm } from "@/components/PublicInterestForm";
import { publicFormDefinitions } from "@/lib/public-form-definitions";

const definition = publicFormDefinitions["zumba-registration"];

const Arrow = () => <span aria-hidden="true">→</span>;

const sessions = [
  {
    label: "Morning session",
    day: "3rd Mondays",
    time: "11:45am to 12:45pm",
    hall: "Chapel Hall",
    start: "Starts 15 June 2026",
  },
  {
    label: "Evening session",
    day: "3rd Thursdays",
    time: "7:30pm to 8:30pm",
    hall: "Verrall Hall",
    start: "Starts 16 July 2026",
  },
];

const whyJoin = [
  "Movement that fits around caring",
  "Connection with other parent carers",
  "A warm, inclusive and welcoming group",
  "A central, accessible Bromley venue",
  "Free to attend, with registration in advance",
];

const photos = [
  {
    src: "/images/sharepoint/zumba-class-2.webp",
    alt: "Parent carers together during a Zumba wellbeing session",
    caption: "A warm and welcoming group.",
  },
  {
    src: "/images/sharepoint/zumba-group.webp",
    alt: "Parent carers at an OAKonsult Zumba session in Bromley",
    caption: "Every session is funded for parent carers.",
  },
];

export default function Page() {
  return (
    <article className="oak-home editorial-page interior-v5 zumba-page">
      <HomeMotion />

      <header className="editorial-masthead">
        <div className="editorial-masthead-copy" data-reveal>
          <nav className="editorial-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/programmes/parent-carer-support">Parent-carer support</Link><span aria-hidden="true">/</span><span aria-current="page">Zumba class</span></nav>
          <p className="oak-kicker">Project ME / Parent-carer wellbeing</p>
          <h1>Free Zumba Class for Parent Carers</h1>
          <p>Project ME Zumba is a warm, inclusive group for parent carers in Bromley, bringing movement, connection and wellbeing together in one friendly hour. Attendance is funded. Registration is compulsory.</p>
          <div className="editorial-route-links">
            <a href="#register">Register for a session <Arrow /></a>
            <a href="#sessions">See times and venue <Arrow /></a>
          </div>
          <div className="editorial-location"><span aria-hidden="true">⌖</span><strong>Bromley United Reformed Church, 20 Widmore Road, Bromley BR1 1RY</strong></div>
        </div>
        <div className="detail-hero-photo" data-reveal>
          <Image src="/images/sharepoint/zumba-action.webp" alt="Parent carers taking part in a Zumba movement session" fill priority sizes="(max-width: 1100px) 100vw, 54vw" />
          <span className="detail-photo-shape" aria-hidden="true" />
        </div>
      </header>

      <section className="zumba-funding-band" aria-labelledby="zumba-funding-title">
        <div data-reveal>
          <p className="oak-kicker dark">Funding acknowledgment</p>
          <h2 id="zumba-funding-title">Project ME Parent Carer Zumba Group is funded for the next 2 years.</h2>
          <p>OAKonsult is delighted to announce support from The National Lottery Community Fund.</p>
          <p>Thanks to National Lottery players, this support helps OAKonsult offer welcoming Zumba sessions at a central, accessible Bromley venue.</p>
          <p className="zumba-funded-note">Attendance is funded. Registration is compulsory.</p>
        </div>
        <figure className="zumba-funder-logo" data-reveal>
          <Image src="/partners/national-lottery.png" alt="The National Lottery Community Fund logo" width={321} height={158} />
          <figcaption>Funded by The National Lottery Community Fund</figcaption>
        </figure>
      </section>

      <section className="zumba-sessions" id="sessions" aria-labelledby="zumba-sessions-title">
        <div className="zumba-sessions-heading" data-reveal>
          <p className="oak-kicker dark">When we meet</p>
          <h2 id="zumba-sessions-title">Two sessions each month, daytime or evening.</h2>
          <p>Choose the time that fits around caring. Both sessions take place at Bromley United Reformed Church, and the team confirms your place and practical details before you travel.</p>
        </div>
        <div className="zumba-session-list">
          {sessions.map((session) => (
            <article key={session.day} data-reveal>
              <span>{session.label}</span>
              <h3>{session.day}</h3>
              <p className="zumba-session-time">{session.time}</p>
              <p className="zumba-session-detail"><strong>{session.hall}</strong>{session.start}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="zumba-venue" aria-labelledby="zumba-venue-title">
        <div data-reveal>
          <p className="oak-kicker">Where we meet</p>
          <h2 id="zumba-venue-title">Bromley United Reformed Church</h2>
          <p>20 Widmore Road, Bromley BR1 1RY. A central, accessible Bromley venue for both the morning and evening sessions.</p>
        </div>
        <div className="editorial-route-links light-links" data-reveal>
          <a href="#register">Register your place <Arrow /></a>
        </div>
      </section>

      <div className="detail-sections">
        <section className="detail-section tone-2" aria-labelledby="zumba-why-title">
          <div className="detail-section-copy" data-reveal>
            <p className="oak-kicker dark">Why join</p>
            <h2 id="zumba-why-title">Movement, connection and time for yourself.</h2>
            <p>Caring can leave little time for your own wellbeing. Project ME Zumba gives parent carers a regular, welcoming hour to move, recharge and meet people who understand the caring role.</p>
            <p>The group is inclusive and goes at your pace, with daytime and evening options so you can choose what works for your week.</p>
          </div>
          <ul className="detail-point-list" data-reveal>
            {whyJoin.map((point, index) => <li key={point}><span>{String(index + 1).padStart(2, "0")}</span>{point}</li>)}
          </ul>
        </section>
      </div>

      <section className="detail-photo-journal" aria-labelledby="zumba-photos-title">
        <div className="detail-journal-heading" data-reveal>
          <p className="oak-kicker dark">In pictures</p>
          <h2 id="zumba-photos-title">Inside a Project ME Zumba session.</h2>
          <Link href="/media-gallery">View the media gallery <Arrow /></Link>
        </div>
        <div className="detail-photo-row">
          {photos.map((photo, index) => (
            <figure className={`detail-journal-photo photo-${index + 1}`} key={photo.src} data-reveal>
              <div><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 760px) 90vw, 33vw" /></div>
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="form-section" id="register" aria-labelledby="zumba-register-title">
        <div className="shell form-layout">
          <div data-reveal>
            <p className="oak-kicker">Secure, consent-led contact</p>
            <h2 id="zumba-register-title">Register your place</h2>
            <p>{definition.intro}</p>
            <p>Attendance is funded. Registration is compulsory, and OAKonsult will confirm availability and practical details before you travel.</p>
            <p>Questions about registering? Email <a href="mailto:ukinfo@oakonsult.org">ukinfo@oakonsult.org</a> or <a href="mailto:info@oakonsult.org">info@oakonsult.org</a>.</p>
            <p><Link href="/zumba-wellbeing">Already attending? Complete the wellbeing check-in <Arrow /></Link></p>
            <p className="field-help">Do not use this form for emergencies. OAKonsult does not provide emergency, medical or crisis services.</p>
          </div>
          <PublicInterestForm definition={definition} />
        </div>
      </section>

      <section className="editorial-action-band">
        <div data-reveal>
          <p className="oak-kicker">Looking after your wellbeing</p>
          <h2>Already coming along? Tell us how the sessions are helping.</h2>
          <p>The short wellbeing check-in helps OAKonsult understand how Project ME Zumba is supporting parent carers and keep improving the group.</p>
        </div>
        <div className="editorial-route-links light-links" data-reveal>
          <Link href="/zumba-wellbeing">Complete the wellbeing check-in <Arrow /></Link>
          <Link href="/programmes/parent-carer-support">Explore parent-carer support <Arrow /></Link>
        </div>
      </section>
    </article>
  );
}
