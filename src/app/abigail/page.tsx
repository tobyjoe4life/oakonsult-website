import { EditorialDetailPage } from "@/components/EditorialDetailPage";
import type { EditorialPageData } from "@/lib/editorial-pages";

const tribute: EditorialPageData = {
  eyebrow: "In loving memory / 2008-2024",
  title: "Oluwatoyitan Abigail Chikatara Adeloye",
  intro: "A short but powerfully radiant life. Abigail’s joy, courage and insistence on being included remain at the heart of OAKonsult’s work.",
  heroImage: "/images/oak-centre-prime/children-accommodation.jpg",
  heroAlt: "Architectural vision for the children’s accommodation at OAK Centre Prime",
  location: "Forever part of OAKonsult’s story",
  sections: [
    { eyebrow: "25 September 2008", title: "A life full of colour, music, laughter and love.", paragraphs: ["Abigail loved music, bright colours, cuddles and laughter. She adored her sisters, Teniola and Fikunmi, and cherished family devotion. Tuesdays were her special time to lead prayer.", "Although non-verbal, she communicated through her eyes, expressions, sounds and unmistakable personality. She made it clear that she wanted to be seen, included and loved."] },
    { eyebrow: "Courage", title: "Never defined by a diagnosis.", paragraphs: ["At 18 months, Abigail sustained profound brain damage following medical mismanagement in Nigeria. Her family relocated to the United Kingdom so she could access specialist care.", "Across the years she lived with complex health needs and repeatedly survived life-threatening illness. Her family remember a fighter, a teacher and a source of joy whose presence invited people to love more deeply and live with gratitude."] },
    { eyebrow: "3 October 2024", title: "Her light continues.", paragraphs: ["Abigail died aged 16. Her name, Oluwatoyitan, means ‘Can God be this great?’ Her family’s tribute describes a life that was brief but filled with purpose.", "This page will remain a permanent part of the OAKonsult website. It honours Abigail as a whole person, not a diagnosis, and preserves the reason the charity’s work is grounded in dignity, belonging and abundant life."] },
    { eyebrow: "Her legacy", title: "OAK Centre Prime carries memory into practical hope.", paragraphs: ["OAK Centre Prime is planned in Oolo Town, Ogbomoso, so children and young people with disabilities can find care, learning, therapy, community and opportunity closer to home.", "The aim is that no family should have to leave its community simply to secure dignity and support for a disabled child."] },
  ],
  related: [
    { label: "Read OAKonsult’s founding story", href: "/our-story", description: "Follow the journey from April 2010 to a shared movement." },
    { label: "Explore OAK Centre Prime", href: "/programmes/oak-centre-prime", description: "See the ground-breaking milestone and architectural vision." },
    { label: "Support the vision", href: "/donate?purpose=oak-centre", description: "Choose OAK Centre Prime when directing your support." },
  ],
  photos: [
    { src: "/images/oak-centre-prime/masterplan.jpg", alt: "OAK Centre Prime masterplan", caption: "A place planned around dignity, care and community." },
    { src: "/images/oak-centre-prime/health-centre.jpg", alt: "Architectural vision for the OAK Centre Prime health centre", caption: "Care closer to home." },
    { src: "/images/oak-centre-prime/entrance-gate.jpg", alt: "Architectural vision for the OAK Centre Prime entrance", caption: "A welcome shaped by Abigail’s legacy." },
  ],
  photosTitle: "Memory into mission.",
  ctaTitle: "For Abigail, and for every child waiting to be seen.",
  ctaText: "Learn about the planned centre, ask for the latest project information or support the work.",
  ctaLabel: "Explore OAK Centre Prime",
  ctaHref: "/programmes/oak-centre-prime",
};

export default function Page() { return <EditorialDetailPage data={tribute} />; }
