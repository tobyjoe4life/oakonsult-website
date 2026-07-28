import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TeamProfile } from "@/components/TeamProfile";
import { teamBySlug, teamProfileStaticParams } from "@/lib/team";

export function generateStaticParams() {
  return teamProfileStaticParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const member = teamBySlug(slug);
  if (!member) return {};
  return {
    title: `${member.name} | ${member.role}`,
    description: `${member.name} is ${member.role} at OAKonsult Disabilities Outreach. ${member.summary}`,
    robots: { index: false, follow: false, nocache: true },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = teamBySlug(slug);
  if (!member) notFound();
  return <TeamProfile member={member} />;
}
