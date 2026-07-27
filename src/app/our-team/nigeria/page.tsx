import type { Metadata } from "next";
import { TeamRegionPage } from "@/components/TeamRegionPage";

export const metadata: Metadata = {
  title: "The Nigeria team",
  description:
    "Meet the country leadership, trustees and delivery team of OAKonsult Disabilities Outreach in Nigeria.",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return <TeamRegionPage region="nigeria" />;
}
