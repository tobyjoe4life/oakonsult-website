import { InteriorPage } from "@/components/InteriorPage";

export default function Page() {
  return (
    <InteriorPage
      data={{
        eyebrow: "Get involved",
        title: "Ways to support OAKonsult",
        intro: "You can volunteer, work with us as a partner or make a donation.",
        image: "/images/care-in-action.jpeg",
        imageAlt: "People taking part in community work",
        cta: "Contact OAKonsult",
        ctaHref: "/contact",
        ctaText: "Tell us how you would like to help and what experience or support you can offer.",
        sectionEyebrow: "Ways to help",
        sectionTitle: "Choose how you would like to contribute.",
        sectionText: "Volunteer, discuss a partnership or support the work with a donation.",
        items: [
          {
            title: "Volunteer",
            text: "Offer your time and skills in a role that matches current needs and safeguarding requirements.",
            href: "/volunteer-opportunities",
          },
          {
            title: "Partner with us",
            text: "Talk to us about programme delivery, referrals, professional support or funding.",
            href: "/partnerships",
          },
          {
            title: "Donate",
            text: "Make a one-time or monthly gift to support programmes and outreach.",
            href: "/donate",
          },
          {
            title: "Forms and registrations",
            text: "Find programme registrations, referrals, applications and participation forms in one place.",
            href: "/forms",
          },
        ],
      }}
    />
  );
}
