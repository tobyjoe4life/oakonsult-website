import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { HomeMotion } from "@/components/HomeMotion";
import { TeamDirectory } from "@/components/TeamDirectory";
import { nigeriaTeamMembers, ukTeamMembers } from "@/lib/team";

const Arrow = () => <span aria-hidden="true">→</span>;

export const metadata: Metadata = {
  title: "Our team",
  description:
    "Meet the trustees, leadership and delivery team of OAKonsult Disabilities Outreach across the United Kingdom and Nigeria.",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return (
    <div className="oak-home editorial-page interior-v5 team-hub-page" data-mood="clay">
      <HomeMotion />

      <section className="interior-hero" aria-labelledby="team-hub-title">
        <div className="interior-hero-copy" data-reveal="left">
          <nav className="editorial-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Our team</span>
          </nav>
          <p className="oak-kicker">About / People</p>
          <h1 id="team-hub-title">Our team</h1>
          <p>
            Trustees, staff and volunteers bring lived experience, governance, programme delivery and community
            relationships to OAKonsult’s work across the United Kingdom and Nigeria.
          </p>
        </div>
        <div className="interior-hero-image" data-reveal="zoom">
          <Image
            src="/images/current-site-community-partnership.webp"
            alt="OAKonsult team members and community partners"
            fill
            priority
            sizes="(max-width: 960px) 100vw, 54vw"
          />
        </div>
      </section>

      <section className="team-governance" aria-labelledby="team-governance-title">
        <div className="team-governance-copy" data-reveal>
          <p className="oak-kicker dark">Leadership, governance and delivery</p>
          <h2 id="team-governance-title">Shared responsibility across the charity.</h2>
          <p>
            OAKonsult is guided by a board of trustees, led day to day by its executive leadership and carried
            forward by operations staff and volunteers in each region. Together they keep governance, programmes
            and family support accountable and connected.
          </p>
        </div>
        <ol className="team-governance-list" data-reveal-group>
          <li data-reveal-child="slide">
            <h3>Governance</h3>
            <p>Trustees provide oversight, accountability and strategic direction for the charity in each region.</p>
          </li>
          <li data-reveal-child="slide">
            <h3>Executive leadership</h3>
            <p>The Co-founder and Chief Executive Officer and the Country Director, Nigeria guide vision and delivery.</p>
          </li>
          <li data-reveal-child="slide">
            <h3>Operations and delivery</h3>
            <p>Operations, administration, learning, volunteering and advocacy staff keep programmes dependable.</p>
          </li>
        </ol>
      </section>

      <section className="team-region-choice" aria-labelledby="team-region-choice-title">
        <div className="team-region-choice-heading" data-reveal>
          <p className="oak-kicker dark">Two regions, one team</p>
          <h2 id="team-region-choice-title">Choose a regional directory.</h2>
          <p>Each card opens a current public profile and the shared contact route.</p>
        </div>
        <div className="team-region-choice-grid" data-reveal-group>
          <Link className="team-region-card team-region-card-uk" href="/our-team/uk" data-reveal-child="pop">
            <span className="team-region-card-label">United Kingdom</span>
            <span className="team-region-card-count">{ukTeamMembers.length} people</span>
            <span className="team-region-card-text">Trustees, executive leadership and operations in the UK.</span>
            <span className="team-region-card-link">Meet the UK team <Arrow /></span>
          </Link>
          <Link className="team-region-card team-region-card-nigeria" href="/our-team/nigeria" data-reveal-child="pop">
            <span className="team-region-card-label">Nigeria</span>
            <span className="team-region-card-count">{nigeriaTeamMembers.length} people</span>
            <span className="team-region-card-text">Country leadership, trustees and delivery in Nigeria.</span>
            <span className="team-region-card-link">Meet the Nigeria team <Arrow /></span>
          </Link>
        </div>
      </section>

      <TeamDirectory
        title="Public leadership, trustees and selected delivery team."
        intro="A curated public directory across both regions. Select any person to read their current profile."
      />

      <section className="editorial-action-band">
        <div data-reveal>
          <p className="oak-kicker">Contact us</p>
          <h2>Contact the right regional team</h2>
          <p>Use the contact page for governance, programme, media or partnership enquiries.</p>
        </div>
        <div className="editorial-route-links light-links" data-reveal>
          <Link href="/contact">Contact OAKonsult <Arrow /></Link>
          <Link href="/media-gallery">See our work in pictures <Arrow /></Link>
        </div>
      </section>
    </div>
  );
}
