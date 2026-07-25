import { InteriorPage } from "@/components/InteriorPage";

export default function Page() {
  return <InteriorPage data={{
    eyebrow: "About / Vision and mission",
    title: "Living life abundantly",
    intro: "A faith-rooted vision of dignity, flourishing and practical inclusion for disabled children, young people and their families.",
    image: "/images/gallery/uk-parent-carer-community.webp",
    imageAlt: "Parent carers connecting at an OAKonsult activity",
    sectionEyebrow: "What guides us",
    sectionTitle: "Faith in action, inclusion in practice.",
    sectionText: "OAKonsult holds to Christ’s promise of abundant life in John 10:10 and to the dignity of every person made in the image of God. The charity welcomes families across religion, culture and background.",
    items: [
      { title: "Our vision", text: "Families within the disability community empowered, flourishing and living the dominion life victoriously as people made in the image of God.", href: "/about" },
      { title: "Our mission", text: "Empower parent carers and families with biblical principles, practical support and inclusive cultures in which they can flourish.", href: "/find-support" },
      { title: "Our creed", text: "We believe in the sovereignty of God the Father, Son and Holy Spirit in the affairs of humanity.", href: "/talking-faith-for-parent-carers" },
      { title: "Our values", text: "Faith. Joy. Resilience. Kindness. Friendship.", href: "/our-story" },
      { title: "Our inclusion commitment", text: "Faith shapes our ethos but does not restrict who can receive support. Families of disabled children and young people aged 0-25 are welcome.", href: "/find-support" },
    ],
    cta: "Find support without judgement",
    ctaText: "Begin with what you need today and the team will explain what OAKonsult can offer.",
    ctaHref: "/find-support",
  }} />;
}
