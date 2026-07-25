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
  photosTitle: string;
  ctaTitle: string;
  ctaText: string;
  ctaLabel: string;
  ctaHref: string;
};

export const editorialPages = {
  projectMe: {
    eyebrow: "UK / Parent-carer wellbeing",
    title: "Project ME",
    intro: "Project ME is a wellbeing and resilience programme for parent carers. It offers time to reflect, rebuild confidence and meet people who understand.",
    heroImage: "/images/gallery/uk-project-me-session.webp",
    heroAlt: "Parent carers taking part in a Project ME session",
    location: "Bromley and the wider UK programme network",
    sections: [
      {
        eyebrow: "Why it exists",
        title: "A programme centred on the person behind the caring role.",
        paragraphs: [
          "Project ME grew from OAKonsult’s parent-carer work and the From Surviving to Living message. It recognises that caring can affect identity, emotional wellbeing, confidence and connection.",
          "The programme gives parent carers time to reflect, learn, move and decide what they want to do next, without pressure or comparison.",
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
          "Project ME includes facilitated workshops, wellbeing sessions, parent voice activities, mentoring and signposting to relevant services.",
          "Delivery varies by cohort, funding period and location. Contact the UK team to ask what is available.",
        ],
      },
    ],
    related: [
      { label: "Parent-carer support", href: "/programmes/parent-carer-support", description: "See the wider support, wellbeing and signposting routes." },
      { label: "Events", href: "/events", description: "Find OAKonsult sessions and programme activities." },
      { label: "UK media gallery", href: "/media-gallery/uk", description: "See Project ME and UK community activities in pictures." },
    ],
    photos: [
      { src: "/images/gallery/uk-project-me-session.webp", alt: "Parent carers taking part in a Project ME session", caption: "Space to reflect and connect." },
      { src: "/images/gallery/uk-project-me-group.webp", alt: "A group presentation during an OAKonsult Project ME event", caption: "Celebrating shared progress." },
      { src: "/images/sharepoint/zumba-action.webp", alt: "A wellbeing movement session", caption: "Wellbeing can include movement and joy." },
    ],
    photosTitle: "Project ME in pictures.",
    ctaTitle: "Interested in Project ME?",
    ctaText: "Contact the UK team to ask about the programme, eligibility and the next available route.",
    ctaLabel: "Register interest in Project ME",
    ctaHref: "/projectme",
  },
  parentCarerSupport: {
    eyebrow: "UK / Family support",
    title: "Support for parent carers",
    intro: "Wellbeing support, peer connection and practical signposting for people caring for disabled children and young people.",
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
        paragraphs: ["Availability varies by programme and funding period. Current support can include:"],
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
          "We ask for personal information only when it is needed and with your consent.",
        ],
      },
    ],
    related: [
      { label: "Project ME", href: "/programmes/project-me", description: "Learn about the wellbeing and resilience programme." },
      { label: "Find support", href: "/find-support", description: "Choose a route based on your immediate need." },
      { label: "UK programmes", href: "/uk", description: "See UK support and programmes." },
    ],
    photos: [
      { src: "/images/gallery/uk-parent-carer-community.webp", alt: "Parent carers connecting during an OAKonsult community activity", caption: "Connection without judgement." },
      { src: "/images/gallery/uk-project-me-session.webp", alt: "Parent carers taking part in a Project ME session", caption: "Practical learning together." },
      { src: "/images/care-in-action.jpeg", alt: "A warm moment during an OAKonsult community activity", caption: "Care, dignity and belonging." },
    ],
    photosTitle: "Support and connection in pictures.",
    ctaTitle: "You do not have to work out the next step alone.",
    ctaText: "Tell the UK team what kind of support you are looking for. If OAKonsult is not the right route, the team can explain what it can and cannot offer.",
    ctaLabel: "Request support",
    ctaHref: "/contact",
  },
  churches: {
    eyebrow: "Faith communities / Inclusion",
    title: "Support for churches",
    intro: "Faith-rooted training for churches that want to welcome disabled people and support parent carers more effectively.",
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
          "OAKonsult offers guided learning using Beyond Suffering: A Christian View on Disability Outreach, presented by the Christian Institute on Disability, Joni and Friends, USA.",
          "The curriculum covers disability outreach, theology of suffering and disability, the church’s role and an introduction to bioethics. Contact the team to confirm the available format.",
        ],
      },
      {
        eyebrow: "Delivery",
        title: "Shape the training around the church’s context.",
        paragraphs: ["Options include a 90-minute introduction, half-day or full-day training, and longer learning cohorts. Sessions may be online or in person by arrangement."],
      },
    ],
    related: [
      { label: "Talking Faith", href: "/stories", description: "Read faith-sensitive stories and reflections." },
      { label: "Parent-carer support", href: "/programmes/parent-carer-support", description: "Understand the wider support routes for families." },
      { label: "Partnerships", href: "/funders-partners", description: "See how organisations can work alongside OAKonsult." },
    ],
    photos: [
      { src: "/images/gallery/uk-project-me-group.webp", alt: "A group presentation during an OAKonsult community event", caption: "Begin with listening and dignity." },
      { src: "/images/sharepoint/press-conference.webp", alt: "People gathering at an OAKonsult partnership event", caption: "Equip leaders and volunteers together." },
      { src: "/images/gallery/uk-parent-carer-community.webp", alt: "Parent carers connecting during an OAKonsult community activity", caption: "Make support routes visible." },
    ],
    photosTitle: "Inclusion work in pictures.",
    ctaTitle: "Build a more welcoming church pathway.",
    ctaText: "Tell OAKonsult about your church, your current provision and the people you want to serve better.",
    ctaLabel: "Discuss church training",
    ctaHref: "/partnerships",
  },
  oakCentrePrime: {
    eyebrow: "Nigeria / Future development",
    title: "OAK Centre Prime",
    intro: "A planned disability-support centre in Oolo Town, Ogbomoso, created in memory of Abigail.",
    heroImage: "/images/gallery/nigeria-oolo-palace.webp",
    heroAlt: "OAKonsult representatives during a community engagement visit to Oolo Palace",
    location: "Oolo Town, Ogbomoso, Oyo State, Nigeria",
    sections: [
      {
        eyebrow: "Abigail’s legacy",
        title: "Love, loss and a determination to make support easier to find.",
        paragraphs: [
          "OAK Centre Prime is the next expression of Abigail’s legacy. Her life and her family’s experience inspired a commitment to practical disability support and inclusion.",
          "The centre is still at the planning stage. Contact the Nigeria team for current plans, timescales and ways to support it.",
        ],
      },
      {
        eyebrow: "The proposed model",
        title: "Support for disabled people and their families.",
        paragraphs: ["The proposed centre would bring several types of support together on one site."],
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
          "The Nigeria team can provide current information for prospective partners and donors.",
        ],
      },
    ],
    related: [
      { label: "OAKonsult Nigeria", href: "/nigeria", description: "See the wider Nigeria programme and outreach context." },
      { label: "Nigeria media gallery", href: "/media-gallery/nigeria", description: "Browse selected community and public-engagement photographs." },
      { label: "Funders and partners", href: "/funders-partners", description: "See organisations connected with the work in both countries." },
    ],
    photos: [
      { src: "/images/gallery/nigeria-oolo-palace.webp", alt: "OAKonsult representatives during a community engagement visit to Oolo Palace", caption: "Local relationships shape the vision." },
      { src: "/images/gallery/nigeria-press-conference.webp", alt: "OAKonsult representatives at a public press conference", caption: "Building public understanding." },
      { src: "/images/gallery/nigeria-knowledge-radio.webp", alt: "OAKonsult disability-awareness engagement at Knowledge Radio", caption: "Keeping disability inclusion in public conversation." },
    ],
    photosTitle: "Community engagement in Nigeria.",
    ctaTitle: "Interested in OAK Centre Prime?",
    ctaText: "Contact the Nigeria team for current plans, timescales and ways to support the project.",
    ctaLabel: "Contact OAKonsult Nigeria",
    ctaHref: "/contact",
  },
  events: {
    eyebrow: "Events and activities",
    title: "Come and take part",
    intro: "Find OAKonsult sessions, community activities and programme events. Check the event details before you travel.",
    heroImage: "/images/sharepoint/zumba-action.webp",
    heroAlt: "A wellbeing movement session",
    location: "UK and Nigeria, depending on the activity",
    sections: [
      {
        eyebrow: "Parent-carer wellbeing",
        title: "Zumba wellbeing sessions for parent carers.",
        paragraphs: [
          "OAKonsult has run free daytime and evening Zumba sessions for parent carers in Bromley.",
          "Registration is required. Dates, venues and availability can change, so check the registration details or contact the UK team before travelling.",
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
      { label: "Media gallery", href: "/media-gallery", description: "See photographs from programmes and community activities." },
    ],
    photos: [
      { src: "/images/sharepoint/zumba-action.webp", alt: "A wellbeing movement session", caption: "Movement, energy and connection." },
      { src: "/images/gallery/uk-project-me-session.webp", alt: "Parent carers taking part in a Project ME session", caption: "Programme sessions can create space to reflect." },
      { src: "/images/gallery/nigeria-press-conference.webp", alt: "OAKonsult representatives at a public press conference", caption: "Public engagement across regions." },
    ],
    photosTitle: "Sessions and public events.",
    ctaTitle: "Want the latest event details?",
    ctaText: "Check the current programme information or ask the relevant regional team before making plans.",
    ctaLabel: "Ask about an event",
    ctaHref: "/contact",
  },
  impact: {
    eyebrow: "Stories, evidence and accountability",
    title: "Impact grows from listening",
    intro: "See how OAKonsult reports programme activity, participant feedback, governance and learning across the UK and Nigeria.",
    heroImage: "/images/current-site-community-partnership.webp",
    heroAlt: "People gathering at an OAKonsult partnership event",
    location: "Across the UK and Nigeria",
    sections: [
      {
        eyebrow: "Evidence with care",
        title: "We report what we can verify.",
        paragraphs: [
          "Participation figures show who the work reached. Feedback and stories add context to the numbers.",
          "Figures come from programme records. Stories and photographs require appropriate consent before publication.",
        ],
      },
      {
        eyebrow: "What the charity reports",
        title: "Impact includes learning and responsible governance.",
        paragraphs: ["OAKonsult reports on programme activity and how the charity is governed."],
        points: [
          "Trustee oversight and transparent charity information",
          "Safeguarding, privacy, equality and risk commitments",
          "Parent-carer progress and programme learning",
          "Annual or period-based impact information",
          "Contact details for governance and funder enquiries",
        ],
      },
      {
        eyebrow: "Regional context",
        title: "Each region has its own programme and funding context.",
        paragraphs: ["UK and Nigeria work is reported separately, including the programmes delivered and the organisations that funded or supported them."],
      },
    ],
    related: [
      { label: "Stories", href: "/stories", description: "Read programme and community stories." },
      { label: "Media gallery", href: "/media-gallery", description: "See photographs from UK and Nigeria activities." },
      { label: "Funders and partners", href: "/funders-partners", description: "See funders and partners in the UK and Nigeria." },
    ],
    photos: [
      { src: "/images/gallery/uk-project-me-group.webp", alt: "A group presentation during an OAKonsult Project ME event", caption: "Learning from programme activity." },
      { src: "/images/gallery/uk-parent-carer-community.webp", alt: "Parent carers connecting during an OAKonsult community activity", caption: "Parent carers meeting in community." },
      { src: "/images/gallery/nigeria-knowledge-radio.webp", alt: "OAKonsult disability-awareness engagement at Knowledge Radio", caption: "Public awareness is part of the work." },
    ],
    photosTitle: "Programmes and outreach in pictures.",
    ctaTitle: "Need impact or governance information?",
    ctaText: "Partners and funders can contact the team for current information and available reports.",
    ctaLabel: "Contact OAKonsult",
    ctaHref: "/contact",
  },
} satisfies Record<string, EditorialPageData>;
