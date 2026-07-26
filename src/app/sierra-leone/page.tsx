import { InteriorPage } from "@/components/InteriorPage";

export default function Page() {
  return <InteriorPage data={{
    eyebrow: "Where we work / Sierra Leone",
    title: "OAKonsult Sierra Leone",
    intro: "A developing regional journey within OAKonsult’s shared commitment to disability inclusion and family support.",
    image: "/images/current-site-community-partnership.webp",
    imageAlt: "A community partnership gathering",
    sectionEyebrow: "Develop carefully",
    sectionTitle: "Local relationships before public promises.",
    sectionText: "For current information about OAKonsult’s connection with Sierra Leone, contact the team directly.",
    items: [
      { title: "One shared purpose", text: "Dignity, belonging and practical inclusion for disabled people and their families.", href: "/about" },
      { title: "Country-specific evidence", text: "Future activity will retain its own programme, funding, safeguarding and partnership context.", href: "/impact" },
      { title: "Ask for current information", text: "Contact OAKonsult if you are exploring a responsible Sierra Leone partnership.", href: "/contact" },
    ],
    cta: "Discuss Sierra Leone with OAKonsult",
    ctaText: "The team can confirm what is current, approved and ready to share.",
    ctaHref: "/contact",
  }} />;
}
