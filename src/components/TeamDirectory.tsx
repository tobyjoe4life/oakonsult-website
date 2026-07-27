import Link from "next/link";
import { HomeMotion } from "@/components/HomeMotion";
import { TeamPortrait } from "@/components/TeamPortrait";
import { regionDisplayName, teamMembers, type TeamMember } from "@/lib/team";

const Arrow = () => <span aria-hidden="true">→</span>;

/**
 * Editorial directory of team members. Cards link through to the individual
 * factual profile for each person and stay inside the premium editorial
 * system rather than a generic card grid.
 */
export function TeamDirectory({
  title = "Meet the team.",
  intro = "Trustees, staff and volunteers bring lived experience, governance, programme delivery and community relationships to OAKonsult’s work.",
  members = teamMembers,
  compact = false,
}: {
  title?: string;
  intro?: string;
  members?: TeamMember[];
  /** Compact rows are used on regional pages; the full mosaic is used on the hub. */
  compact?: boolean;
}) {
  return (
    <section className="team-directory" aria-labelledby="team-directory-title">
      <div className="team-directory-heading" data-reveal>
        <p className="oak-kicker dark">People and roles</p>
        <h2 id="team-directory-title">{title}</h2>
        <p>{intro}</p>
      </div>
      <ol className={`team-directory-list${compact ? " team-directory-compact" : ""}`} data-reveal-group>
        {members.map((member) => (
          <li key={member.slug} data-reveal-child="slide">
            <Link className="team-card" href={`/our-team/${member.slug}`}>
              <span className="team-card-media">
                <TeamPortrait member={member} sizes="(max-width: 760px) 38vw, 180px" />
              </span>
              <span className="team-card-copy">
                <span className="team-card-region">{regionDisplayName(member.region)}</span>
                <span className="team-card-name">{member.name}</span>
                <span className="team-card-role">{member.role}</span>
                <span className="team-card-summary">{member.summary}</span>
                <span className="team-card-link">Read profile <Arrow /></span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Hub wrapper that adds the global motion behaviour once for the page. */
export function TeamDirectorySection(props: Parameters<typeof TeamDirectory>[0]) {
  return (
    <>
      <HomeMotion />
      <TeamDirectory {...props} />
    </>
  );
}
