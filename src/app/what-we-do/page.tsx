import { InteriorPage } from "@/components/InteriorPage";

export default function Page() {
  return (
    <InteriorPage
      data={{
        eyebrow: "What we do",
        title: "Programmes and support",
        intro: "OAKonsult supports parent carers and works with communities to improve disability inclusion.",
        image: "/images/project-me-session.jpg",
        imageAlt: "A Project ME group session",
        cta: "Ask about a programme",
        ctaHref: "/contact",
        ctaText: "Contact the team to ask about availability, eligibility or referrals.",
        sectionEyebrow: "Our work",
        sectionTitle: "Support for parent carers. Inclusion in communities.",
        sectionText: "Choose a programme or service for more information.",
        items: [
          {
            title: "Project ME",
            text: "A wellbeing and confidence programme centred on the person behind the caring role.",
            href: "/programmes/project-me",
          },
          {
            title: "Parent-carer support",
            text: "Peer connection, wellbeing activities and practical signposting.",
            href: "/programmes/parent-carer-support",
          },
          {
            title: "Disability inclusion",
            text: "Training and community partnerships that improve access, understanding and participation.",
            href: "/programmes/support-for-churches",
          },
        ],
      }}
    />
  );
}
