import { UtilityPage } from "@/components/UtilityPage";

export default function Accessibility() {
  return <UtilityPage data={{
    eyebrow: "Accessibility",
    title: "Everyone should be able to use this website.",
    intro: "OAKonsult wants disabled people, parent carers and every visitor to find information and complete key journeys without unnecessary barriers.",
    sections: [
      { title: "How the site is designed", paragraphs: ["The website aims to meet WCAG 2.2 AA. It supports keyboard navigation, visible focus, text resizing, reduced motion and small-screen reflow."] },
      { title: "Alternative ways to contact us", paragraphs: ["If a form or page does not work for you, contact OAKonsult and explain the information or service you were trying to reach. The team can discuss another practical route."] },
      { title: "Tell us about a barrier", paragraphs: ["Include the page address, what you were trying to do and the device or assistive technology you were using. Do not include sensitive medical information unless it is necessary for your request."] },
    ],
    ctaTitle: "Help us remove a barrier.",
    ctaText: "Tell the team what was difficult and what would make the journey usable for you.",
    ctaHref: "/contact",
    ctaLabel: "Contact OAKonsult",
  }} />;
}
