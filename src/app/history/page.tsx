import { InteriorPage } from "@/components/InteriorPage";

export default function Page() {
  return <InteriorPage data={{
    eyebrow: "About / History",
    mood: "clay",
    title: "A history shaped by lived experience",
    intro: "From one family’s disability journey to a registered charity working across countries, programmes and communities.",
    image: "/images/sharepoint/oak-centre-dignitaries.webp",
    imageAlt: "OAKonsult representatives and community leaders in Nigeria",
    sectionEyebrow: "Our timeline",
    sectionTitle: "The milestones that brought OAKonsult here.",
    sectionText: "OAKonsult’s story moves from one family’s disability journey into a growing commitment to parent carers, inclusion and practical hope.",
    items: [
      { title: "2010 - The family journey begins", text: "Abigail sustained profound brain damage at 18 months. The Adeloye family relocated from Nigeria to the UK to seek specialist care.", href: "/our-story" },
      { title: "2014 - From questions to purpose", text: "As Abigail entered palliative care, Olufunke’s faith and lived experience deepened a call to support other families.", href: "/our-story" },
      { title: "2021 - OAKonsult is founded", text: "Olufunke and Ajisola Adeloye founded OAKonsult Disabilities Outreach and registered the charity in Nigeria.", href: "/about" },
      { title: "2022 - Inclusive church training", text: "The charity expanded disability-inclusion learning with churches and communities in Nigeria.", href: "/programmes/support-for-churches" },
      { title: "2023 - UK charity registration", text: "UK registration widened accountability and partnership, while Project ME began supporting parent carers in Bromley.", href: "/programmes/project-me" },
      { title: "2024 - Remembering Abigail", text: "Abigail died on 3 October 2024. Her joy, courage and insistence on inclusion remain central to OAKonsult’s identity.", href: "/abigail" },
      { title: "2025 - OAK Centre Prime ground-breaking", text: "A public ground-breaking milestone in Oolo Town marked the next phase of the planned disability-support centre.", href: "/programmes/oak-centre-prime" },
      { title: "2026 - Programmes and outreach continue", text: "Parent-carer wellbeing, Zumba, partnership work and free disability medical outreach continued across the UK and Nigeria.", href: "/impact" },
    ],
    cta: "Read the founding story",
    ctaText: "The timeline begins with a family and continues through every person who joins the mission.",
    ctaHref: "/our-story",
  }} />;
}
