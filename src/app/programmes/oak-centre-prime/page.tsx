import { EditorialDetailPage } from "@/components/EditorialDetailPage";
import type { EditorialPageData } from "@/lib/editorial-pages";

const oakCentrePrime: EditorialPageData = {
  eyebrow: "Nigeria / Oolo Town",
  title: "OAK Centre Prime",
  intro: "A planned inclusive disability-support centre created in memory of Abigail, bringing care, learning, community and opportunity together on one site.",
  heroImage: "/images/oak-centre-prime/masterplan.jpg",
  heroAlt: "Architectural masterplan for OAK Centre Prime in Oolo Town",
  location: "Oolo Town, Ogbomoso, Oyo State, Nigeria",
  sections: [
    { eyebrow: "Abigail’s legacy", title: "A home-grown answer to a journey no family should have to repeat.", paragraphs: ["Abigail’s family had to leave Nigeria to obtain the specialist care and dignity she needed. OAK Centre Prime is planned so more children and young people with disabilities can find coordinated support closer to home.", "The centre is a long-term, phased vision. Plans, costs and timescales must continue to be reviewed with professional, community, safeguarding and governance oversight."] },
    { eyebrow: "Groundbreaking / 7 April 2025", title: "A public milestone in Oolo Town.", paragraphs: ["The ground-breaking ceremony brought together community leaders, government representatives, supporters, families and OAKonsult’s team at the proposed site.", "The event marked the transition from vision towards phased development. It did not mean the full centre was already funded or complete."] },
    { eyebrow: "The architectural vision", title: "Connected spaces for health, learning, family life and community.", paragraphs: ["The public-facing architectural plan includes an administration and welcome building, health centre, community hall, inclusive education and therapy spaces, children’s accommodation, recreation facilities and accessible movement across the site."], points: ["Health centre and therapy support", "Inclusive school, skills and learning spaces", "Community hall and family support", "Children’s accommodation and respite", "Recreation, adaptive sport and wellbeing", "Faith, reflection and community gathering"] },
    { eyebrow: "Build responsibly", title: "A centre of this scale must grow in transparent phases.", paragraphs: ["OAKonsult will need appropriate planning permission, professional design and construction oversight, safeguarding, sustainable operating plans and transparent fundraising before each phase opens.", "Prospective partners and donors should request the most recent verified project update rather than treating early architectural images as a completion promise."] },
  ],
  related: [
    { label: "A tribute to Abigail", href: "/abigail", description: "Read about the life and legacy at the heart of this vision." },
    { label: "OAKonsult Nigeria", href: "/nigeria", description: "See community support, outreach and disability inclusion work in Nigeria." },
    { label: "Support the project", href: "/donate?purpose=oak-centre", description: "Choose OAK Centre Prime when directing your support." },
  ],
  photos: [
    { src: "/images/oak-centre-prime/administration.jpg", alt: "Architectural rendering of OAK Centre Prime administration building", caption: "Administration and welcome building." },
    { src: "/images/oak-centre-prime/health-centre.jpg", alt: "Architectural rendering of OAK Centre Prime health centre", caption: "Proposed health centre." },
    { src: "/images/oak-centre-prime/community-centre.jpg", alt: "Architectural rendering of OAK Centre Prime community centre", caption: "Proposed community hall and centre." },
    { src: "/images/oak-centre-prime/children-accommodation.jpg", alt: "Architectural rendering of children’s accommodation at OAK Centre Prime", caption: "Proposed children’s accommodation." },
    { src: "/images/oak-centre-prime/entrance-gate.jpg", alt: "Architectural rendering of the OAK Centre Prime entrance gate", caption: "Proposed arrival and entrance." },
    { src: "/images/sharepoint/oak-centre-dignitaries.webp", alt: "Community and traditional leaders gathered at the OAK Centre site", caption: "Community relationships around the OAK Centre vision." },
  ],
  photosTitle: "The public architectural vision and community milestone.",
  ctaTitle: "Ask for the current project position.",
  ctaText: "Contact the Nigeria team for the latest plans, development phase, partnership information and approved ways to support.",
  ctaLabel: "Contact OAKonsult Nigeria",
  ctaHref: "/contact",
};

export default function Page() { return <EditorialDetailPage data={oakCentrePrime} />; }
