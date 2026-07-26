import { EditorialDetailPage } from "@/components/EditorialDetailPage";
import type { EditorialPageData } from "@/lib/editorial-pages";

const story: EditorialPageData = {
  eyebrow: "Our founding story",
  mood: "clay",
  title: "From crisis to calling",
  intro: "OAKonsult grew from one family’s disability journey and a determination that other families should not walk alone.",
  heroImage: "/images/hero-parent-carers.jpg",
  heroAlt: "Parent carers gathered in an OAKonsult community setting",
  location: "Nigeria and the United Kingdom",
  sections: [
    { eyebrow: "April 2010", title: "A young family’s life changed overnight.", paragraphs: ["When Olufunke and Ajisola Adeloye’s youngest daughter, Oluwatoyitan Abigail Chikatara, was 18 months old, a convulsion and subsequent medical mismanagement in Nigeria caused profound brain damage.", "The family relocated to the United Kingdom with their three daughters to seek the specialist care Abigail needed. Their plans, careers and daily family life changed completely."] },
    { eyebrow: "The years that followed", title: "Abigail kept teaching the family what abundant life could mean.", paragraphs: ["Abigail lived with complex disabilities and significant health needs. She was also joyful, expressive and deeply loved. Her resilience challenged the family to look beyond diagnosis and insist on dignity, belonging and the fullness of life.", "For Olufunke, John 10:10 became a personal anchor: abundant life was not the absence of difficulty, but a life of purpose, faith, relationship and hope in the middle of it."] },
    { eyebrow: "2021", title: "Lived experience became organised support.", paragraphs: ["Olufunke’s personal journey into disability learning and advocacy developed into a commitment to support other families. In 2021, Olufunke and Ajisola founded OAKonsult Disabilities Outreach.", "The charity was registered in Nigeria in 2021 and in the United Kingdom in 2023, bringing parent-carer support, inclusive training, optional faith-sensitive encouragement and community outreach into one shared mission."] },
    { eyebrow: "Today", title: "The story continues through every family that is seen and supported.", paragraphs: ["Abigail died on 3 October 2024, aged 16. OAKonsult carries her legacy forward through its programmes and through the planned OAK Centre Prime in Oolo Town, Nigeria.", "This is not a story of one person rescuing others. It is a growing community of families, volunteers, churches, partners and supporters learning to make inclusion practical."] },
  ],
  related: [
    { label: "A tribute to Abigail", href: "/abigail", description: "Read the permanent tribute to the life at the heart of OAKonsult’s legacy." },
    { label: "OAK Centre Prime", href: "/programmes/oak-centre-prime", description: "See the planned centre and its architectural vision." },
    { label: "Who we are", href: "/about", description: "Read the charity’s vision, mission, values and inclusion commitment." },
  ],
  photos: [
    { src: "/images/care-in-action.jpeg", alt: "A caring moment during an OAKonsult community activity", caption: "Care expressed through presence and practical action." },
    { src: "/images/gallery/uk-parent-carer-community.webp", alt: "Parent carers connecting at an OAKonsult gathering", caption: "No family should have to walk alone." },
    { src: "/images/sharepoint/oak-centre-dignitaries.webp", alt: "Community leaders gathered at the OAK Centre site", caption: "A story that now reaches across communities." },
  ],
  photosTitle: "From lived experience to a shared movement.",
  ctaTitle: "Help the story keep growing.",
  ctaText: "Join a programme, volunteer, partner or support the work in the way that fits you.",
  ctaLabel: "Find your way to take part",
  ctaHref: "/get-involved",
};

export default function Page() { return <EditorialDetailPage data={story} />; }
