import { InteriorPage } from "@/components/InteriorPage";

export default function Page() {
  return (
    <InteriorPage
      data={{
        eyebrow: "Forms and registrations",
        title: "Choose the right form",
        intro: "Use the form that matches your enquiry, registration or application. Each journey explains what information is needed before you begin.",
        image: "/images/sharepoint/project-me-graduation.webp",
        imageAlt: "Project ME participants celebrating together",
        cta: "Not sure which form to use?",
        ctaHref: "/contact",
        ctaText: "Contact OAKonsult and the team will help you choose the right route.",
        sectionEyebrow: "Forms and registrations",
        sectionTitle: "Support, participation and giving.",
        sectionText: "Programme and opportunity forms remain previews on this review website. Nothing is submitted or stored here.",
        items: [
          { title: "Contact OAKonsult", text: "Ask about support, programmes, partnerships, media or another enquiry.", href: "/contact" },
          { title: "Volunteer interest", text: "Share your interests, skills, availability and preferred region.", href: "/volunteer-opportunities" },
          { title: "Partnership or family referral", text: "For organisations and professionals making a consent-led referral or partnership enquiry.", href: "/partnerships" },
          { title: "Project ME interest", text: "Register interest in a future Project ME cohort or organisational delivery.", href: "/projectme" },
          { title: "Zumba registration", text: "Register for a parent-carer Zumba wellbeing session in Bromley.", href: "/zumba-class" },
          { title: "Zumba wellbeing check-in", text: "Complete the short participant wellbeing questionnaire.", href: "/zumba-wellbeing" },
          { title: "Opportunity application", text: "Apply only for an OAKonsult opportunity that is currently advertised.", href: "/jobs/zumba-group-coordinator" },
          { title: "Donate", text: "Choose a one-time or monthly gift in GBP or NGN and select the area you would like to support.", href: "/donate" },
        ],
      }}
    />
  );
}
