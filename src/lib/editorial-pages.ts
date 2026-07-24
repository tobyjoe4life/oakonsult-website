export type EditorialSection = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  points?: string[];
};

export type EditorialLink = {
  label: string;
  href: string;
  description: string;
};

export type EditorialPageData = {
  eyebrow: string;
  title: string;
  intro: string;
  heroImage: string;
  heroAlt: string;
  location: string;
  sections: EditorialSection[];
  related: EditorialLink[];
  photos: { src: string; alt: string; caption: string }[];
  ctaTitle: string;
  ctaText: string;
  ctaLabel: string;
  ctaHref: string;
};

export const editorialPages = {
  projectMe: {
    eyebrow: "UK / Parent-carer wellbeing",
    title: "Project ME",
    intro: "From surviving to living: a wellbeing and resilience programme that helps parent carers reconnect with identity, confidence, practical support and people who understand.",
    heroImage: "/images/gallery/uk-project-me-session.webp",
    heroAlt: "Parent carers taking part in a Project ME session",
    location: "Bromley and the wider UK programme network",
    sections: [
      {
        eyebrow: "Why it exists",
        title: "A programme centred on the person behind the caring role.",
        paragraphs: [
          "Project ME grew from OAKonsult’s parent-carer work and the From Surviving to Living message. It recognises that caring can affect identity, emotional wellbeing, confidence and connection.",
          "The programme creates structured space to reflect, learn, move, build relationships and identify practical next steps without pressure or comparison.",
        ],
      },
      {
        eyebrow: "What the programme explores",
        title: "Wellbeing, voice, connection and future direction.",
        paragraphs: ["Sessions are shaped around practical themes that parent carers can apply at their own pace."],
        points: [
          "Identity and confidence before and after diagnosis",
          "Rest, movement, nutrition and ways to manage stress",
          "Peer connection, mentoring and community support",
          "Parent voice, SEND guidance and navigating services",
          "Routes into volunteering, learning or work where appropriate",
        ],
      },
      {
        eyebrow: "How it is delivered",
        title: "A mix of workshops, practical sessions and peer connection.",
        paragraphs: [
          "Project ME has brought together facilitated workshops, wellbeing content, focus groups, parent voice and advocacy activity, mentoring pathways and signposting to relevant services.",
          "Delivery details can change by cohort, funding period and location. The UK team can confirm the next available route.",
        ],
      },
    ],
    related: [
      { label: "Parent-carer support", href: "/programmes/parent-carer-support", description: "See the wider support, wellbeing and signposting routes." },
      { label: "Events", href: "/events", description: "Find published OAKonsult sessions and programme activity." },
      { label: "UK media gallery", href: "/media-gallery/uk", description: "Browse selected moments from Project ME and UK community work." },
    ],
    photos: [
      { src: "/images/gallery/uk-project-me-session.webp", alt: "Parent carers taking part in a Project ME session", caption: "Space to reflect and connect." },
      { src: "/images/gallery/uk-project-me-group.webp", alt: "A group presentation during an OAKonsult Project ME event", caption: "Celebrating shared progress." },
      { src: "/images/sharepoint/zumba-action.webp", alt: "A wellbeing movement session", caption: "Wellbeing can include movement and joy." },
    ],
    ctaTitle: "Interested in Project ME?",
    ctaText: "Contact the UK team to ask about the programme, eligibility and the next available route.",
    ctaLabel: "Contact the UK team",
    ctaHref: "/contact",
  },
  parentCarerSupport: {
    eyebrow: "UK / Family support",
    title: "Support for parent carers",
    intro: "Clear, compassionate routes into wellbeing, peer connection, practical signposting and faith-sensitive encouragement for people caring for disabled children and young people.",
    heroImage: "/images/gallery/uk-parent-carer-community.webp",
    heroAlt: "Parent carers connecting during an OAKonsult community activity",
    location: "UK support routes",
    sections: [
      {
        eyebrow: "Start where you are",
        title: "Support that respects real caring responsibilities.",
        paragraphs: [
          "Parent carers often carry complex demands across health, education, home life, work and relationships. OAKonsult offers a welcoming first conversation and helps people find the most appropriate next step.",
          "The charity offers support and signposting, not emergency services or a replacement for medical, safeguarding or statutory provision.",
        ],
      },
      {
        eyebrow: "Ways to connect",
        title: "Choose the kind of support that fits today.",
        paragraphs: ["Availability varies by programme and funding period. Published routes include:"],
        points: [
          "Project ME wellbeing and resilience activity",
          "Parent-carer community and peer connection",
          "Zumba and movement-based wellbeing sessions",
          "Prayer, reflection and faith-sensitive encouragement",
          "Practical signposting to relevant local or specialist services",
        ],
      },
      {
        eyebrow: "A careful pathway",
        title: "Listen first, then agree a useful next step.",
        paragraphs: [
          "The team begins by understanding what the parent carer is looking for, what barriers may be present and whether an OAKonsult programme or another service is the better route.",
          "Personal information should only be shared with consent and for a clear purpose.",
        ],
      },
    ],
    related: [
      { label: "Project ME", href: "/programmes/project-me", description: "Explore the flagship wellbeing and resilience programme." },
      { label: "Find support", href: "/find-support", description: "Choose a route based on your immediate need." },
      { label: "UK programmes", href: "/uk", description: "See the country-specific UK hub." },
    ],
    photos: [
      { src: "/images/gallery/uk-parent-carer-community.webp", alt: "Parent carers connecting during an OAKonsult community activity", caption: "Connection without judgement." },
      { src: "/images/gallery/uk-project-me-session.webp", alt: "Parent carers taking part in a Project ME session", caption: "Practical learning together." },
      { src: "/images/care-in-action.jpeg", alt: "A warm moment during an OAKonsult community activity", caption: "Care, dignity and belonging." },
    ],
    ctaTitle: "You do not have to work out the next step alone.",
    ctaText: "Tell the UK team what kind of support you are looking for. If OAKonsult is not the right route, the team can explain what it can and cannot offer.",
    ctaLabel: "Request support",
    ctaHref: "/contact",
  },
  churches: {
    eyebrow: "Faith communities / Inclusion",
    title: "Support for churches",
    intro: "Practical, faith-rooted training that helps churches welcome disabled children, young people and adults, support parent carers and build a culture where everyone can belong, grow and serve.",
    heroImage: "/images/current-site-community-partnership.webp",
    heroAlt: "A welcoming inclusion and support conversation",
    location: "Available online and by arrangement",
    sections: [
      {
        eyebrow: "Inclusive practice",
        title: "Turn compassion into accessible action.",
        paragraphs: ["Training can help leaders and volunteers review language, hospitality, communication, sensory needs, safeguarding awareness and signposting."],
        points: [
          "People-first language and a theology of dignity",
          "Sensory-aware services, visual schedules and quieter spaces",
          "Support for children and young people with additional needs",
          "Accessible hospitality, volunteer preparation and clear boundaries",
        ],
      },
      {
        eyebrow: "Biblical foundations",
        title: "Beyond Suffering learning routes.",
        paragraphs: [
          "OAKonsult’s published church offer includes guided learning using Beyond Suffering: A Christian View on Disability Outreach, presented by the Christian Institute on Disability, Joni and Friends, USA.",
          "The curriculum covers disability outreach, theology of suffering and disability, the church’s role and an introduction to bioethics. Format and licensing arrangements should be confirmed with the team.",
        ],
      },
      {
        eyebrow: "Delivery",
        title: "Shape the training around the church’s context.",
        paragraphs: ["Published formats include a 90-minute introduction, half-day or full-day training, and longer learning cohorts. Sessions may be online or in person by arrangement."],
      },
    ],
    related: [
      { label: "Talking Faith", href: "/stories", description: "Read faith-sensitive reflections and approved stories." },
      { label: "Parent-carer support", href: "/programmes/parent-carer-support", description: "Understand the wider support routes for families." },
      { label: "Partnerships", href: "/funders-partners", description: "See how organisations can work alongside OAKonsult." },
    ],
    photos: [
      { src: "/images/current-site-community-partnership.webp", alt: "A welcoming inclusion and support conversation", caption: "Begin with listening and dignity." },
      { src: "/images/sharepoint/press-conference.webp", alt: "People gathering at an OAKonsult partnership event", caption: "Equip leaders and volunteers together." },
      { src: "/images/gallery/uk-community-stand.webp", alt: "OAKonsult information stand at a UK community activity", caption: "Make support routes visible." },
    ],
    ctaTitle: "Build a more welcoming church pathway.",
    ctaText: "Tell OAKonsult about your church, your current provision and the people you want to serve better.",
    ctaLabel: "Discuss church training",
    ctaHref: "/contact",
  },
  oakCentrePrime: {
    eyebrow: "Nigeria / Future development",
    title: "OAK Centre Prime",
    intro: "A planned holistic disability centre in Oolo Town, Ogbomoso, created in memory of Abigail and shaped around care, learning, respite, skills, community and belonging.",
    heroImage: "/images/gallery/nigeria-oolo-palace.webp",
    heroAlt: "OAKonsult representatives during a community engagement visit to Oolo Palace",
    location: "Oolo Town, Ogbomoso, Oyo State, Nigeria",
    sections: [
      {
        eyebrow: "Abigail’s legacy",
        title: "Love, loss and a determination that families should not face the journey alone.",
        paragraphs: [
          "OAK Centre Prime is presented by OAKonsult as the next expression of Abigail’s legacy. Her life and her family’s experience inspired a commitment to practical disability support, inclusion and hope.",
          "The centre remains a planned development. Public wording, delivery dates and impact targets should continue to reflect the latest approved project information.",
        ],
      },
      {
        eyebrow: "The proposed model",
        title: "Support designed around the whole family journey.",
        paragraphs: ["The current public concept brings several forms of support together on one site."],
        points: [
          "Inclusive education and specialist therapy",
          "Vocational and life-skills development",
          "Emotional, social and spiritual support",
          "Short-break and longer-stay accommodation",
          "Community outreach, inclusion and adaptive activity",
        ],
      },
      {
        eyebrow: "Build responsibly",
        title: "Community partnership, governance and transparent fundraising matter.",
        paragraphs: [
          "A development of this scale requires phased planning, appropriate professional oversight, safeguarding, robust governance and clear communication with supporters.",
          "The Nigeria team can provide the latest approved information for prospective partners and donors.",
        ],
      },
    ],
    related: [
      { label: "OAKonsult Nigeria", href: "/nigeria", description: "See the wider Nigeria programme and outreach context." },
      { label: "Nigeria media gallery", href: "/media-gallery/nigeria", description: "Browse selected community and public-engagement photographs." },
      { label: "Funders and partners", href: "/funders-partners", description: "See confirmed relationships across both countries." },
    ],
    photos: [
      { src: "/images/gallery/nigeria-oolo-palace.webp", alt: "OAKonsult representatives during a community engagement visit to Oolo Palace", caption: "Local relationships shape the vision." },
      { src: "/images/gallery/nigeria-press-conference.webp", alt: "OAKonsult representatives at a public press conference", caption: "Building public understanding." },
      { src: "/images/gallery/nigeria-knowledge-radio.webp", alt: "OAKonsult disability-awareness engagement at Knowledge Radio", caption: "Keeping disability inclusion in public conversation." },
    ],
    ctaTitle: "Ask for the latest approved project information.",
    ctaText: "Prospective supporters and partners can contact the Nigeria team before relying on historic targets or timelines.",
    ctaLabel: "Contact OAKonsult Nigeria",
    ctaHref: "/contact",
  },
  events: {
    eyebrow: "Events and activities",
    title: "Come and take part",
    intro: "Published sessions, community activities and programme opportunities from OAKonsult. Registration details and availability should always be checked on the relevant event page.",
    heroImage: "/images/sharepoint/zumba-action.webp",
    heroAlt: "A wellbeing movement session",
    location: "UK and Nigeria, depending on the activity",
    sections: [
      {
        eyebrow: "Current programme route",
        title: "Zumba wellbeing sessions for parent carers.",
        paragraphs: [
          "OAKonsult’s current public events information highlights free Zumba activity in Bromley, including daytime and evening routes for parent carers.",
          "Registration is required. Dates, venue details, eligibility and capacity can change, so use the published registration route or contact the UK team before travelling.",
        ],
      },
      {
        eyebrow: "More ways to gather",
        title: "Workshops, outreach and public-awareness activity.",
        paragraphs: ["Event types may include Project ME sessions, parent-carer conversations, partner activity, church inclusion learning, outreach and public engagement."],
      },
      {
        eyebrow: "Access and safeguarding",
        title: "Ask what you need before the session.",
        paragraphs: ["Contact the team about accessibility, participation needs, photography or safeguarding questions. Attendance at an event should never be treated as consent for a person’s story or image to be published."],
      },
    ],
    related: [
      { label: "Project ME", href: "/programmes/project-me", description: "Understand the wider wellbeing programme." },
      { label: "Find support", href: "/find-support", description: "Choose the support route that fits your needs." },
      { label: "Media gallery", href: "/media-gallery", description: "See approved public photographs from earlier activity." },
    ],
    photos: [
      { src: "/images/sharepoint/zumba-action.webp", alt: "A wellbeing movement session", caption: "Movement, energy and connection." },
      { src: "/images/gallery/uk-project-me-session.webp", alt: "Parent carers taking part in a Project ME session", caption: "Programme sessions can create space to reflect." },
      { src: "/images/gallery/nigeria-press-conference.webp", alt: "OAKonsult representatives at a public press conference", caption: "Public engagement across regions." },
    ],
    ctaTitle: "Want the latest event details?",
    ctaText: "Check the current programme information or ask the relevant regional team before making plans.",
    ctaLabel: "Ask about an event",
    ctaHref: "/contact",
  },
  impact: {
    eyebrow: "Stories, evidence and accountability",
    title: "Impact grows from listening",
    intro: "OAKonsult brings together approved stories, programme learning, governance information and public reporting so families, partners and supporters can understand the work without inflated claims.",
    heroImage: "/images/current-site-community-partnership.webp",
    heroAlt: "People gathering at an OAKonsult partnership event",
    location: "Across the UK and Nigeria",
    sections: [
      {
        eyebrow: "Evidence with care",
        title: "Numbers show reach. Stories help explain what changed.",
        paragraphs: [
          "Good impact communication connects participation data with appropriate qualitative evidence, feedback and programme learning.",
          "OAKonsult should publish only figures that can be traced to approved records and only stories or photographs covered by suitable consent.",
        ],
      },
      {
        eyebrow: "What the charity reports",
        title: "Governance and learning belong alongside programme highlights.",
        paragraphs: ["The current public impact route brings together several forms of assurance."],
        points: [
          "Trustee oversight and transparent charity information",
          "Safeguarding, privacy, equality and risk commitments",
          "Parent-carer progress and programme learning",
          "Approved annual or period-based impact highlights",
          "Clear contact routes for governance and funder enquiries",
        ],
      },
      {
        eyebrow: "Regional context",
        title: "One mission, with country-specific evidence.",
        paragraphs: ["UK and Nigeria activity should be described with its own programme, funder, partner and delivery context. The shared brand should not blur important differences in who funded or delivered the work."],
      },
    ],
    related: [
      { label: "Stories", href: "/stories", description: "Read approved programme and community stories." },
      { label: "Media gallery", href: "/media-gallery", description: "Browse curated photographs from both regional programmes." },
      { label: "Funders and partners", href: "/funders-partners", description: "See confirmed relationships by region." },
    ],
    photos: [
      { src: "/images/current-site-community-partnership.webp", alt: "People gathering at an OAKonsult partnership event", caption: "Partnership creates wider routes to support." },
      { src: "/images/gallery/uk-community-stand.webp", alt: "OAKonsult information stand at a UK community activity", caption: "Meeting communities with practical information." },
      { src: "/images/gallery/nigeria-knowledge-radio.webp", alt: "OAKonsult disability-awareness engagement at Knowledge Radio", caption: "Public awareness is part of the work." },
    ],
    ctaTitle: "Need governance or impact information?",
    ctaText: "Partners and funders can ask the team for the latest approved information and available reports.",
    ctaLabel: "Contact OAKonsult",
    ctaHref: "/contact",
  },
} satisfies Record<string, EditorialPageData>;
