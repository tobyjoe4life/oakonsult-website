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
          <h1 id="donation-title">Help the circle of support grow.</h1>
          <p>Your gift can contribute to parent-carer wellbeing, practical support, disability inclusion and carefully governed outreach.</p>
          <div className="donation-assurance">
            <div><strong>Choose your region</strong>Give in GBP or NGN.</div>
            <div><strong>Choose your rhythm</strong>One-time or monthly.</div>
            <div><strong>Development preview</strong>This staging flow cannot take payment.</div>
            <div><strong>Privacy-respecting</strong>Marketing consent is separate and optional.</div>
          </div>
        </div>
        <div className="donation-form-stage" data-reveal>
          <DonationForm />
        </div>
      </section>

      <section className="donation-proof" aria-labelledby="donation-proof-title">
        <div className="donation-proof-heading" data-reveal>
          <p className="oak-kicker dark">What your support contributes to</p>
          <h2 id="donation-proof-title">Support that can meet people in more than one place.</h2>
          <p>Donations are combined with grants, partnerships and other support. They should never be described as buying a guaranteed individual outcome.</p>
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
            <div><h3>Community-rooted outreach</h3><p>Relationships, listening and public engagement that can strengthen local routes into support.</p></div>
          </article>
        </div>
      </section>

      <section className="donation-transparency" aria-labelledby="donation-transparency-title">
        <div data-reveal><p className="oak-kicker dark">Give with confidence</p><h2 id="donation-transparency-title">A clearer donation journey.</h2></div>
        <div className="donation-transparency-list">
          <div data-reveal><span>01</span><div><h3>Country-specific currency and purpose</h3><p>Choose GBP or NGN and see the relevant secure-payment route at review stage.</p></div></div>
          <div data-reveal><span>02</span><div><h3>Consent is not bundled</h3><p>Processing consent, Gift Aid where relevant and supporter communications are presented separately.</p></div></div>
          <div data-reveal><span>03</span><div><h3>No card details stored by OAKonsult</h3><p>When live payment integration is enabled, card details will be handled by the configured payment provider.</p></div></div>
          <div data-reveal><span>04</span><div><h3>Staging is safe to review</h3><p>The current development flow cannot take payment. It is available for design and content review only.</p></div></div>
        </div>
      </section>

      <section className="editorial-action-band">
        <div data-reveal><p className="oak-kicker">Prefer another way to help?</p><h2>Give time, expertise, partnership or visibility.</h2><p>Talk to OAKonsult before offering restricted funding, services or programme commitments.</p></div>
        <div className="editorial-route-links light-links" data-reveal><Link href="/get-involved">Explore ways to help <span aria-hidden="true">→</span></Link><Link href="/funders-partners">See funders and partners <span aria-hidden="true">→</span></Link></div>
      </section>
    </div>
  );
}
