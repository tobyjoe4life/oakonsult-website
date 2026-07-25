import { InteriorPage } from "@/components/InteriorPage";

export default function Page() {
  return (
    <InteriorPage
      data={{
        eyebrow: "Who we are",
        title: "About OAKonsult",
        intro: "OAKonsult Disabilities Outreach is a registered charity supporting parent carers and advancing disability inclusion in the UK and Nigeria.",
        image: "/images/hero-parent-carers.jpg",
        imageAlt: "Parent carers together",
        cta: "View our programmes",
        ctaHref: "/what-we-do",
        ctaText: "See how OAKonsult supports parent carers and works with communities.",
        sectionEyebrow: "What guides us",
        sectionTitle: "Purpose, approach and responsibility.",
        sectionText: "Read how OAKonsult supports families and governs its work.",
        items: [
          {
            title: "Our purpose",
            text: "We support parent carers and work for greater participation and dignity for disabled people.",
            href: "/impact",
          },
          {
            title: "How we work",
            text: "We listen, build relationships and work with the strengths already present in communities.",
            href: "/what-we-do",
          },
          {
            title: "Our responsibilities",
            text: "Safeguarding, privacy, sound governance and careful use of funds guide our work.",
            href: "/funders-partners",
          },
        ],
      }}
    />
  );
}
