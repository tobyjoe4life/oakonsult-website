import { InteriorPage } from "@/components/InteriorPage";

export default function Page() {
  return (
    <InteriorPage
      data={{
        eyebrow: "Find support",
        mood: "growth",
        title: "Support for parent carers",
        intro: "If you care for a disabled child or family member, you deserve support too. Choose the option that best matches what you need today.",
        image: "/images/parent-carer-community.jpg",
        imageAlt: "Parent carers connecting",
        cta: "Contact the team",
        ctaHref: "/contact",
        ctaText: "Tell us what support you are looking for and where you are based.",
        sectionEyebrow: "Support options",
        sectionTitle: "Start with what you need today.",
        sectionText: "Choose wellbeing support, Project ME or practical signposting.",
        items: [
          {
            title: "Wellbeing and connection",
            text: "Join supportive spaces where your experience is understood and your wellbeing matters.",
            href: "/programmes/parent-carer-support",
          },
          {
            title: "Project ME",
            text: "Make time for your wellbeing, rebuild confidence and meet other parent carers.",
            href: "/programmes/project-me",
          },
          {
            title: "Practical signposting",
            text: "Talk through what is happening and find relevant local or specialist help.",
            href: "/contact",
          },
        ],
      }}
    />
  );
}
