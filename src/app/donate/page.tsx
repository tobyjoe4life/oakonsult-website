import Image from "next/image";
import Link from "next/link";
import { DonationForm } from "@/components/DonationForm";
import { HomeMotion } from "@/components/HomeMotion";

export default function Page() {
  return (
    <div className="oak-home editorial-page donation-page">
      <HomeMotion />
      <section className="donation-hero" aria-labelledby="donation-title">
        <div className="donation-hero-copy" data-reveal>
          <nav className="editorial-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Donate</span></nav>
          <p className="oak-kicker">Give with purpose</p>
          <h1 id="donation-title">Support OAKonsult’s work.</h1>
          <p>Donations help fund parent-carer programmes, disability inclusion and community outreach.</p>
          <div className="donation-assurance">
            <div><strong>Currency</strong>Give in GBP or NGN.</div>
            <div><strong>Frequency</strong>One-time or monthly.</div>
            <div><strong>Preview only</strong>No payment or personal details are sent or stored.</div>
            <div><strong>News updates</strong>Preview choices do not subscribe you.</div>
          </div>
        </div>
        <div className="donation-form-stage" data-reveal>
          <DonationForm />
        </div>
      </section>

      <section className="donation-proof" aria-labelledby="donation-proof-title">
        <div className="donation-proof-heading" data-reveal>
          <p className="oak-kicker dark">How donations help</p>
          <h2 id="donation-proof-title">Your gift supports our wider work.</h2>
          <p>Donations are pooled with grants and partnership funding. A single gift is not tied to a guaranteed outcome.</p>
        </div>
        <div className="donation-proof-grid">
          <article data-reveal>
            <div className="donation-proof-image"><Image src="/images/gallery/uk-project-me-session.webp" alt="Parent carers taking part in a Project ME session" fill sizes="(max-width:760px) 100vw,33vw" /></div>
            <div><h3>Parent-carer wellbeing</h3><p>Programmes and community spaces that recognise the person behind the caring role.</p></div>
          </article>
          <article data-reveal>
            <div className="donation-proof-image"><Image src="/images/gallery/nigeria-knowledge-radio.webp" alt="OAKonsult disability-awareness engagement at Knowledge Radio" fill sizes="(max-width:760px) 100vw,33vw" /></div>
            <div><h3>Inclusion and awareness</h3><p>Practical disability-inclusion activity developed with churches, schools, communities and partners.</p></div>
          </article>
          <article data-reveal>
            <div className="donation-proof-image"><Image src="/images/gallery/nigeria-oolo-palace.webp" alt="OAKonsult representatives during a community engagement visit" fill sizes="(max-width:760px) 100vw,33vw" /></div>
            <div><h3>Community outreach</h3><p>Local partnerships and public engagement help people find support.</p></div>
          </article>
        </div>
      </section>

      <section className="donation-transparency" aria-labelledby="donation-transparency-title">
        <div data-reveal><p className="oak-kicker dark">Before you donate</p><h2 id="donation-transparency-title">How giving works.</h2></div>
        <div className="donation-transparency-list">
          <div data-reveal><span>01</span><div><h3>Choose currency and purpose</h3><p>Select GBP or NGN, then choose the area of work you would like to support.</p></div></div>
          <div data-reveal><span>02</span><div><h3>Marketing is optional</h3><p>You can donate without signing up for news or supporter updates.</p></div></div>
          <div data-reveal><span>03</span><div><h3>Payment is handled securely</h3><p>When donations go live, Stripe or Paystack will handle card details. OAKonsult will not store them.</p></div></div>
          <div data-reveal><span>04</span><div><h3>This is a preview</h3><p>No payment or personal information is sent or stored in this preview.</p></div></div>
        </div>
      </section>

      <section className="editorial-action-band">
        <div data-reveal><p className="oak-kicker">Other ways to help</p><h2>Volunteer or partner with OAKonsult.</h2><p>Contact the team about volunteering, professional support, partnerships or funding.</p></div>
        <div className="editorial-route-links light-links" data-reveal><Link href="/get-involved">Explore ways to help <span aria-hidden="true">→</span></Link><Link href="/funders-partners">See funders and partners <span aria-hidden="true">→</span></Link></div>
      </section>
    </div>
  );
}
