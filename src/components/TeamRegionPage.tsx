import Image from "next/image";
import Link from "next/link";
import { HomeMotion } from "@/components/HomeMotion";
import { TeamDirectory } from "@/components/TeamDirectory";
import { regionDisplayName, teamByRegion, type TeamRegion } from "@/lib/team";

const Arrow = () => <span aria-hidden="true">→</span>;

/**
 * Regional team directory (United Kingdom or Nigeria). Shares the premium
 * editorial hero and the centralised team data, and routes every person
 * through to their factual individual profile.
 */
export function TeamRegionPage({ region }: { region: TeamRegion }) {
  const display = regionDisplayName(region);
  const members = teamByRegion(region);
  const other = region === "uk" ? "nigeria" : "uk";
  const otherDisplay = regionDisplayName(other);

  return (
    <div className={`oak-home editorial-page team-region-page team-region-${region}`} data-mood={region === "nigeria" ? "harvest" : "growth"}>
      <HomeMotion />

      <section className="interior-hero" aria-labelledby="team-region-title">
        <div className="interior-hero-copy" data-reveal="left">
          <nav className="editorial-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/our-team">Our team</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{display}</span>
          </nav>
          <p className="oak-kicker">Our team / {display}</p>
          <h1 id="team-region-title">The {display} team</h1>
          <p>
            Meet the {members.length} people serving OAKonsult in {display === "United Kingdom" ? "the United Kingdom" : "Nigeria"},
            across governance, leadership and programme delivery.
          </p>
        </div>
        <div className="interior-hero-image" data-reveal="zoom">
          <Image
            src={region === "uk" ? "/images/gallery/uk-parent-carer-community.webp" : "/images/sharepoint/oak-centre-dignitaries.webp"}
            alt={region === "uk" ? "Parent carers connecting at an OAKonsult activity in the UK" : "OAKonsult representatives and community leaders in Nigeria"}
            fill
            priority
            sizes="(max-width: 960px) 100vw, 54vw"
          />
        </div>
      </section>

      <TeamDirectory
        compact
        title={`Everyone in ${display === "United Kingdom" ? "the United Kingdom" : "Nigeria"}.`}
        intro={`Trustees, leadership and delivery colleagues connected with OAKonsult’s ${display} work.`}
        members={members}
      />

      <section className="editorial-action-band">
        <div data-reveal>
          <p className="oak-kicker">OAKonsult in another region</p>
          <h2>Looking for the {otherDisplay} team?</h2>
          <p>Explore the {otherDisplay} directory or return to the full team hub.</p>
        </div>
        <div className="editorial-route-links light-links" data-reveal>
          <Link href={`/our-team/${other}`}>Meet the {otherDisplay} team <Arrow /></Link>
          <Link href="/our-team">Back to the team hub <Arrow /></Link>
        </div>
      </section>
    </div>
  );
}
