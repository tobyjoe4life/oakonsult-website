import { RegionPage, type RegionPageData } from "@/components/RegionPage";

const data: RegionPageData = {
  slug: "nigeria",
  country: "Nigeria",
  eyebrow: "Community-led disability inclusion",
  title: "Disability inclusion shaped with local communities.",
  intro: "OAKonsult Nigeria works through community outreach, family support and local partnerships. It is also developing plans for OAK Centre Prime.",
  context: "The Nigeria team works with communities, schools, health professionals and faith organisations. Contact the team about current programmes, outreach or OAK Centre Prime.",
  image: "/images/sharepoint/oak-centre-dignitaries.webp",
  imageAlt: "OAKonsult representatives and community guests at the OAK Centre groundbreaking event in Nigeria",
  primaryCta: { label: "Contact the Nigeria team", href: "mailto:info@oakonsult.org" },
  services: [
    {
      label: "Nigeria programme",
      title: "OAK Centre Prime",
      text: "A planned disability-support centre for children, young people and families in Nigeria.",
      details: ["Inclusive education and therapy vision", "Vocational and life-skills support", "Family and community support"],
      href: "/programmes/oak-centre-prime",
      linkLabel: "Explore OAK Centre Prime",
    },
    {
      label: "Nigeria & online",
      title: "Project ME Online",
      text: "Online learning and parent-carer support connected to the wider Project ME model where appropriate.",
      details: ["Online access", "Parent-carer learning", "Connection to shared resources"],
      href: "/programmes/project-me",
      linkLabel: "Explore Project ME",
    },
    {
      label: "Nigeria services",
      title: "Community Support",
      text: "Outreach and practical support delivered through community, school, home and health-related activity.",
      details: ["Medical outreach", "Community outreach", "Home and school visits"],
      href: "/media-gallery/nigeria",
      linkLabel: "See Nigeria outreach",
    },
    {
      label: "Nigeria inclusion",
      title: "Inclusive Support & Awareness",
      text: "Disability awareness and practical inclusion support for families, churches and other community organisations. Support is open to everyone, regardless of faith or background.",
      details: ["Community and church inclusion", "Optional Beyond Suffering learning", "Optional Talking Faith resources"],
      href: "/programmes/support-for-churches",
      linkLabel: "Explore inclusion support",
    },
  ],
  partnersTitle: "Nigeria Funders & Partners",
  partnersIntro: "These organisations fund, support or work alongside OAKonsult Nigeria.",
  partners: [
    { name: "Stanbic IBTC Bank G6 Fellowship", logo: "/partners/stanbic.png" },
    { name: "Flour Mills Nigeria", logo: "/partners/flour-mills.png" },
    { name: "Funmi Adewole Foundation", logo: "/partners/funmi-adewole.png" },
    { name: "Agbedare Jesus Care Foundation", logo: "/partners/agbedare-foundation.png" },
    { name: "Bowen University Teaching Hospital", logo: "/partners/bowen-medical.jpeg" },
    { name: "Ladoke Akintola University Medical Students’ Association", logo: "/partners/laumsa.jpg" },
  ],
  contact: {
    heading: "Connect with OAKonsult Nigeria.",
    text: "Ask about Nigeria outreach, OAK Centre Prime, volunteering, professional support or local partnerships.",
    email: "info@oakonsult.org",
    phone: "+234 814 683 4903",
    address: "OAK Centre, Oolo Town, Along Oyo/Ogbomoso Expressway, Oriire LGA, Ogbomoso, Oyo State, Nigeria",
  },
  otherRegion: {
    label: "OAKonsult UK",
    href: "/uk",
    text: "Looking for UK parent-carer support, Project ME or UK partnerships?",
  },
};

export default function Page() {
  return <RegionPage data={data} />;
}
