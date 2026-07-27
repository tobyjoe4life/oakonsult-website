import Link from "next/link";
import { HomeMotion } from "@/components/HomeMotion";
import { TeamPortrait } from "@/components/TeamPortrait";
import { officialUkTrusteeNames, regionDisplayName, teamByRegion, type TeamMember } from "@/lib/team";

const Arrow = () => <span aria-hidden="true">→</span>;

/**
 * Factual individual team profile. Uses the shared editorial masthead,
 * evidence-backed biography sections, related team links and the public
 * contact route, with semantic headings, breadcrumbs and metadata-friendly
 * structure.
 */
export function TeamProfile({ member }: { member: TeamMember }) {
  const region = regionDisplayName(member.region);
  const colleagues = teamByRegion(member.region).filter((person) => person.slug !== member.slug).slice(0, 3);
  const isUkTrustee = officialUkTrusteeNames.includes(member.name as (typeof officialUkTrusteeNames)[number]);

  return (
    <article className="oak-home editorial-page team-profile-page" data-mood={member.region === "nigeria" ? "harvest" : "growth"}>
      <HomeMotion />
      <header className="editorial-masthead team-profile-masthead">
        <div className="editorial-masthead-copy" data-reveal="left">
          <nav className="editorial-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/our-team">Our team</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/our-team/${member.region}`}>{region}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{member.name}</span>
          </nav>
          <p className="oak-kicker">Our team / {region}</p>
          <h1>{member.name}</h1>
          <p className="team-profile-role">{member.role}{member.familiarName ? ` · known as ${member.familiarName}` : ""}</p>
          <p>{member.summary}</p>
          <div className="team-profile-tags">
            <span className="team-profile-tag">{region}</span>
            {isUkTrustee ? <span className="team-profile-tag">Current UK trustee</span> : null}
          </div>
        </div>
        <div className="team-profile-hero">
          <TeamPortrait member={member} priority sizes="(max-width: 800px) 100vw, 46vw" />
        </div>
      </header>

      <div className="team-profile-sections">
        {member.biography.map((section, index) => (
          <section className={`detail-section tone-${(index % 3) + 1}`} key={section.title} data-reveal-group>
            <div className="detail-section-copy" data-reveal-child="slide">
              <p className="oak-kicker dark">{section.eyebrow}</p>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>
        ))}
      </div>

      <section className="detail-related" aria-labelledby="team-related-title">
        <div data-reveal><p className="oak-kicker dark">More from the team</p><h2 id="team-related-title">Related people and pages</h2></div>
        <div className="detail-related-list" data-reveal-group>
          {member.related.map((item) => (
            <Link href={item.href} key={item.href} data-reveal-child="slide">
              <div><h3>{item.label}</h3><p>{item.description}</p></div>
              <Arrow />
            </Link>
          ))}
          {colleagues.map((person) => (
            <Link href={`/our-team/${person.slug}`} key={person.slug} data-reveal-child="slide">
              <div><h3>{person.name}</h3><p>{person.role}</p></div>
              <Arrow />
            </Link>
          ))}
        </div>
      </section>

      <section className="editorial-action-band">
        <div data-reveal>
          <p className="oak-kicker">Contact OAKonsult</p>
          <h2>{member.ctaTitle}</h2>
          <p>{member.ctaText}</p>
        </div>
        <div className="editorial-route-links light-links" data-reveal>
          <Link href="/contact">Contact OAKonsult <Arrow /></Link>
          <Link href={`/our-team/${member.region}`}>Back to the {region} team <Arrow /></Link>
        </div>
      </section>
    </article>
  );
}
