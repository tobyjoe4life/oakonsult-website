import { InteriorPage } from "@/components/InteriorPage";

export default function AboutPage() {
  return (
    <InteriorPage
      data={{
        eyebrow: "About OAKonsult / Who we are",
        title: "Who we are",
        intro: "A Christian disability charity helping parent carers and families move from surviving towards living life abundantly through practical support, inclusive training and community-led outreach.",
        image: "/images/care-in-action.jpeg",
        imageAlt: "A caring moment during an OAKonsult community activity",
        sectionEyebrow: "Our identity",
        sectionTitle: "Love, loss and unshakable hope became a shared mission.",
        sectionText: "Our vision is for families in the disability community to be empowered and flourishing as people made in the image of God. Our mission brings together biblical encouragement, practical support and inclusive cultures. Faith shapes our ethos, but support is not faith-restrictive. Our values are Faith, Joy, Resilience, Kindness and Friendship.",
        items: [
          { title: "Our story", text: "From crisis to calling: the journey from April 2010 to a growing disability-inclusion movement.", href: "/our-story" },
          { title: "Abigail’s tribute", text: "A permanent tribute to Oluwatoyitan Abigail Chikatara Adeloye and the legacy she continues to inspire.", href: "/abigail" },
          { title: "Our history", text: "A timeline from lived experience, to registration in Nigeria and the UK, to Project ME and OAK Centre Prime.", href: "/history" },
          { title: "Vision, mission and values", text: "Understand the Christian foundation, promise of abundant life and inclusive commitment that guide OAKonsult.", href: "/vision-mission" },
          { title: "Our team", text: "Meet the trustees, staff and volunteers connected with the work in each region.", href: "/our-team" },
          { title: "Governance and impact", text: "Read charity information, safeguarding commitments, reports and verified impact highlights.", href: "/impact" },
          { title: "United Kingdom", text: "Parent-carer wellbeing, Project ME, Zumba, inclusive training and community connection.", href: "/uk" },
          { title: "Nigeria", text: "Community support, medical and school outreach, public awareness and OAK Centre Prime.", href: "/nigeria" },
          { title: "Sierra Leone", text: "Follow OAKonsult’s developing Sierra Leone journey within one shared identity.", href: "/sierra-leone" },
        ],
        cta: "Find the part of OAKonsult that matters to you",
        ctaText: "Find support, understand the story, explore a programme, partner with the charity or ask a question.",
        ctaHref: "/find-support",
      }}
    />
  );
}
