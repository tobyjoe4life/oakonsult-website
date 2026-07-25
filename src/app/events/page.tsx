import { InteriorPage } from "@/components/InteriorPage";

export default function Page() {
  return <InteriorPage data={{
    eyebrow: "Events and activities",
    title: "Come and take part",
    intro: "Find current OAKonsult sessions, community activities and programme events. Registration and availability can change, so confirm details before travelling.",
    image: "/images/sharepoint/zumba-action.webp",
    imageAlt: "A parent-carer Zumba wellbeing session",
    sectionEyebrow: "Current routes",
    sectionTitle: "Move, connect, learn and take part.",
    sectionText: "OAKonsult runs activities in different regions and funding periods. Attendance never counts as consent for a participant’s story or image to be published.",
    items: [
      { title: "Evening Zumba for parent carers", text: "Free Project ME wellbeing session on third Mondays, usually 6:30 pm to 7:30 pm in Bromley. Registration is required.", href: "/zumba-class" },
      { title: "Daytime Zumba for parent carers", text: "Free Project ME wellbeing session on fourth Fridays, usually 12:00 pm to 1:00 pm in Bromley. Registration is required.", href: "/zumba-class" },
      { title: "Zumba wellbeing check-in", text: "Already attending? Complete the consent-led questionnaire that helps OAKonsult understand participant wellbeing and improve the group.", href: "/zumba-wellbeing" },
      { title: "Project ME", text: "Ask about future wellbeing and resilience cohorts, workshops or organisational delivery.", href: "/projectme" },
      { title: "Nigeria outreach", text: "See verified community and medical outreach updates, including the 7 April 2026 disability medical outreach in Oolo Town.", href: "/stories" },
      { title: "Accessibility and safeguarding", text: "Contact the relevant regional team before a session to discuss access, participation, photography or safeguarding questions.", href: "/contact" },
    ],
    cta: "Ask about an event",
    ctaText: "The team can confirm dates, venue, eligibility, access information and whether places remain.",
    ctaHref: "/contact",
  }} />;
}
