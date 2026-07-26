import { InteriorPage } from "@/components/InteriorPage";

export default function Page() {
  return <InteriorPage data={{
    eyebrow: "About / People",
    mood: "clay",
    title: "Our team",
    intro: "Trustees, staff and volunteers bring lived experience, governance, programme delivery and community relationships to OAKonsult’s work.",
    image: "/images/current-site-community-partnership.webp",
    imageAlt: "OAKonsult team members and community partners",
    sectionEyebrow: "People and roles",
    sectionTitle: "Shared responsibility across the charity.",
    sectionText: "Leadership, governance, programme delivery and volunteering come together around one shared responsibility to families.",
    items: [
      { title: "Olufunke Adeloye", text: "Founder and Chief Executive Officer.", href: "/contact" },
      { title: "Ajisola Adeloye", text: "Co-founder and UK trustee.", href: "/contact" },
      { title: "Bunmi Soji Adeyemo", text: "Chair and UK trustee.", href: "/contact" },
      { title: "Hadiza Daura", text: "UK trustee.", href: "/contact" },
      { title: "Lucky Aigbefoh", text: "UK trustee.", href: "/contact" },
      { title: "Bolanle Ajayi", text: "UK trustee and HR support.", href: "/contact" },
      { title: "Dayo Balogun", text: "Volunteer Manager.", href: "/volunteer-opportunities" },
      { title: "Regional teams and volunteers", text: "OAKonsult’s wider work is supported by trustees, programme staff, volunteers, professional partners and community leaders in each region.", href: "/get-involved" },
    ],
    cta: "Contact the right regional team",
    ctaText: "Use the contact page for governance, programme, media or partnership enquiries.",
    ctaHref: "/contact",
  }} />;
}
