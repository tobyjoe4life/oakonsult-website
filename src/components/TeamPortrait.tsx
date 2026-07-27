import Image from "next/image";
import { teamInitials, type TeamMember } from "@/lib/team";

/**
 * Editorial portrait frame for team members.
 *
 * Where a verified portrait exists it is shown with its per-image focal
 * point. Where no verified portrait exists, a premium monogram treatment is
 * used instead. The monogram is decorative initials only and is never
 * presented as a photograph.
 */
export function TeamPortrait({
  member,
  priority = false,
  sizes = "(max-width: 760px) 100vw, 42vw",
}: {
  member: TeamMember;
  priority?: boolean;
  sizes?: string;
}) {
  if (member.image) {
    return (
      <div className="team-portrait team-portrait-photo" data-reveal="zoom">
        <Image
          src={member.image.src}
          alt={member.image.alt}
          fill
          priority={priority}
          sizes={sizes}
          style={member.image.position ? { objectPosition: member.image.position } : undefined}
        />
      </div>
    );
  }

  return (
    <div className="team-portrait team-portrait-monogram" data-reveal="zoom" role="img" aria-label={`${member.name}, ${member.role}`}>
      <span aria-hidden="true">{teamInitials(member.name)}</span>
    </div>
  );
}
