import { InteriorPage } from "@/components/InteriorPage";

export default function Page() {
  return <InteriorPage data={{
    eyebrow: "About / Vision and mission",
    mood: "clay",
    title: "Living life abundantly",
    intro: "A vision of dignity, flourishing and practical inclusion for disabled children, young people and their families.",
    image: "/images/gallery/uk-parent-carer-community.webp",
    imageAlt: "Parent carers connecting at an OAKonsult activity",
    sectionEyebrow: "What guides us",
    sectionTitle: "Dignity in action, inclusion in practice.",
    sectionText: "OAKonsult believes every person has equal dignity and should have the opportunity to flourish. We welcome and support everyone, regardless of faith or background.",
    items: [
      { title: "Our vision", text: "Families within the disability community empowered, flourishing and able to live full lives with dignity, choice and opportunity.", href: "/about" },
      { title: "Our mission", text: "Empower parent carers and families through practical support, inclusive learning and welcoming communities.", href: "/find-support" },
      { title: "Everyone is welcome", text: "Support is never conditional on sharing a faith or taking part in a religious activity.", href: "/find-support" },
      { title: "Our values", text: "Faith. Joy. Resilience. Kindness. Friendship.", href: "/our-story" },
      { title: "Stories and reflections", text: "Read programme stories, parent-carer experiences and optional reflections.", href: "/stories" },
      { title: "Our inclusion commitment", text: "Disabled children and young people aged 0-25 and their families are welcome across faiths, cultures and backgrounds, including those with no faith.", href: "/find-support" },
    ],
    cta: "Find support without judgement",
    ctaText: "Begin with what you need today and the team will explain what OAKonsult can offer.",
    ctaHref: "/find-support",
  }} />;
}
