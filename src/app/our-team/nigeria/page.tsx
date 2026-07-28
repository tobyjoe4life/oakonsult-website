import type { Metadata } from "next";
import { TeamRegionPage } from "@/components/TeamRegionPage";

export const metadata: Metadata = {
  title: "The Nigeria team",
  description:
    "Public profiles of trustees, leadership and selected delivery colleagues connected with OAKonsult Disabilities Outreach in Nigeria.",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return <TeamRegionPage region="nigeria" />;
}
