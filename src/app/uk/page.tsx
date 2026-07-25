import { RegionPage, type RegionPageData } from "@/components/RegionPage";

const data: RegionPageData = {
  slug: "uk",
  country: "UK",
  eyebrow: "Parent-carer support in the UK",
  title: "Support in London and online.",
  intro: "OAKonsult UK offers practical guidance, wellbeing programmes and peer connection for parent carers. In-person activities are based in London, with some support available online.",
  context: "The UK team runs parent-carer programmes, community activities and disability-inclusion work. Contact the team to ask what is currently available.",
  image: "/images/sharepoint/project-me-graduation.webp",
  imageAlt: "Project ME participants celebrating together in the United Kingdom",
  primaryCta: { label: "Find UK support", href: "/find-support" },
  services: [
    {
      label: "UK support",
      title: "Support for Parent Carers",
      text: "Practical and peer-led support for unpaid parent carers of disabled children and young people.",
      details: ["Wellbeing support", "Peer connection", "Practical routes forward"],
      href: "/programmes/parent-carer-support",
      linkLabel: "Explore parent-carer support",
    },
    {
      label: "UK programme",
      title: "Project ME",
      text: "A programme that helps parent carers make time for wellbeing, rebuild confidence and reconnect with their identity.",
      details: ["Facilitated workshops", "Practical learning", "Shared lived experience"],
      href: "/programmes/project-me",
      linkLabel: "Discover Project ME",
    },
    {
      label: "UK community",
      title: "Community Wellbeing",
      text: "Inclusive activity and connection that bring parent carers, families and local communities together.",
      details: ["Zumba and movement", "Community connection", "Spaces to recharge"],
      href: "/events",
      linkLabel: "See events and activities",
    },
    {
      label: "UK inclusion",
      title: "Faith-led Support & Inclusion",
      text: "Faith-shaped support and practical inclusion work that welcomes eligible families of all faiths and none.",
      details: ["Support for churches", "Inclusive training", "Talking Faith for Parent Carers"],
      href: "/programmes/support-for-churches",
      linkLabel: "Explore church inclusion support",
    },
  ],
  partnersTitle: "UK Funders & Partners",
  partnersIntro: "These organisations fund, support or work alongside OAKonsult UK.",
  partners: [
    { name: "The National Lottery Community Fund", logo: "/partners/national-lottery.png" },
    { name: "Mayor of London", logo: "/partners/mayor-of-london.jpg" },
    { name: "Bromley Council", logo: "/partners/bromley.png" },
    { name: "Just Sow", logo: "/partners/just-sow.png" },
    { name: "The Big Give", logo: "/partners/big-give.png" },
    { name: "Bishop Radford Trust", logo: "/partners/bishop-radford.svg" },
    { name: "The Albert Hunt Trust", logo: "/partners/albert-hunt.png" },
    { name: "Christ Church Orpington", logo: "/partners/christ-church.webp" },
    { name: "Your Voice in Health & Social Care", logo: "/partners/yvhsc.png" },
    { name: "STUBS Disability Services", logo: "/partners/stubs.png" },
    { name: "SEN Parenting", logo: "/partners/sen-parenting.webp" },
  ],
  contact: {
    heading: "Start with the UK team.",
    text: "Ask about UK parent-carer support, programmes, referrals, volunteering or partnership opportunities.",
    email: "ukinfo@oakonsult.org",
    phone: "+44 (0) 7479 436 823",
    address: "Church House, Rushet Road, Orpington, Kent BR5 2PT, UK",
  },
  otherRegion: {
    label: "OAKonsult Nigeria",
    href: "/nigeria",
    text: "Looking for Nigeria outreach, partnerships or the planned OAK Centre Prime?",
  },
};

export default function Page() {
  return <RegionPage data={data} />;
}
