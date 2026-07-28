/**
 * Centralised, strongly typed OAKonsult team directory.
 *
 * Every public team surface (hub, regional directories and individual
 * profiles) renders from this single module so names, roles and regions
 * stay consistent across the site.
 */

export type TeamRegion = "uk" | "nigeria";

export type TeamOperationalRemit = TeamRegion | "cross-regional";

export type TeamGroup = "trustee" | "executive" | "operations";

export type TeamSection = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
};

export type TeamMember = {
  slug: string;
  name: string;
  /** Optional familiar name shown clearly beside the full verified name. */
  familiarName?: string;
  role: string;
  /** Public directory grouping. This is not a board-jurisdiction field. */
  region: TeamRegion;
  /** Legal or governance jurisdiction for a trustee role, where applicable. */
  boardJurisdiction?: TeamRegion;
  /** Geographic scope of the person's operational work. */
  operationalRemit: TeamOperationalRemit;
  group: TeamGroup;
  /** One-line summary used on directory listings. */
  summary: string;
  /** Evidence-backed biography shown on the individual profile. */
  biography: TeamSection[];
  /** Related destinations rendered at the foot of the profile. */
  related: { label: string; href: string; description: string }[];
  image?: {
    src: string;
    alt: string;
    /** Focal point for editorial crops, applied as object-position. */
    position?: string;
  };
  ctaTitle: string;
  ctaText: string;
};

export const teamMembers: TeamMember[] = [
  {
    slug: "olufunke-adeloye",
    name: "Olufunke Adeloye",
    role: "Co-founder and Chief Executive Officer",
    region: "uk",
    operationalRemit: "cross-regional",
    group: "executive",
    summary:
      "Co-founder and Chief Executive Officer. OAKonsult grew from her family’s experience after their daughter Abigail sustained profound brain damage following medical mismanagement in Nigeria.",
    biography: [
      {
        eyebrow: "Lived experience",
        title: "A calling shaped by Abigail’s life.",
        paragraphs: [
          "In 2010, when she was 18 months old, Olufunke and Ajisola Adeloye’s daughter Abigail sustained profound brain damage following medical mismanagement in Nigeria. The family moved to the United Kingdom so Abigail could receive specialist care.",
          "Their experience of caring for Abigail and navigating disability services led Olufunke and Ajisola to co-found OAKonsult Disabilities Outreach, offering practical support, training and connection for families raising children with disabilities.",
        ],
      },
      {
        eyebrow: "Chief Executive Officer",
        title: "Turning personal pain into shared purpose.",
        paragraphs: [
          "Olufunke leads OAKonsult across the United Kingdom and Nigeria, guiding parent-carer support, inclusive training and community outreach shaped by lived experience. Abigail died on 3 October 2024, aged 16, and her life remains central to OAKonsult’s story.",
        ],
      },
    ],
    related: [
      { label: "Our story", href: "/our-story", description: "Read how one family’s journey became organised support for others." },
      { label: "A tribute to Abigail", href: "/abigail", description: "Visit the permanent tribute at the heart of OAKonsult’s legacy." },
    ],
    image: {
      src: "/images/team/olufunke-adeloye.webp",
      alt: "Portrait of Olufunke Adeloye, Co-founder and Chief Executive Officer of OAKonsult",
      position: "50% 18%",
    },
    ctaTitle: "Talk to the leadership team",
    ctaText: "For leadership, media or partnership enquiries, contact OAKonsult through the shared contact route.",
  },
  {
    slug: "ajisola-adeloye",
    name: "Ajisola Adeola Adeloye",
    familiarName: "Aji",
    role: "Co-founder and UK trustee",
    region: "uk",
    boardJurisdiction: "uk",
    operationalRemit: "cross-regional",
    group: "trustee",
    summary:
      "Co-founder and UK trustee. A Church of England priest, parent carer and experienced leader in real estate, facilities management, youth ministry and advocacy.",
    biography: [
      {
        eyebrow: "Background",
        title: "Ministry, leadership and lived experience.",
        paragraphs: [
          "Reverend Ajisola Adeola Adeloye is a Church of England priest serving in St Paul’s Cray, Orpington. He brings lived experience as a parent carer and leadership experience in real estate and facilities management.",
          "His work also includes more than two decades of youth ministry and advocacy, supporting young people, families and communities.",
        ],
      },
      {
        eyebrow: "At OAKonsult",
        title: "Foundational vision and steady governance.",
        paragraphs: [
          "Ajisola co-founded OAKonsult Disabilities Outreach with Olufunke Adeloye and is a UK trustee. He contributes to organisational development, partnerships, governance and the charity’s long-term direction.",
        ],
      },
    ],
    related: [
      { label: "Our history", href: "/history", description: "See the milestones that carried the founding vision forward." },
      { label: "OAK Centre Prime", href: "/programmes/oak-centre-prime", description: "Explore the planned disability-support centre in Oyo State." },
    ],
    image: {
      src: "/images/team/ajisola-adeloye.webp",
      alt: "Portrait of Ajisola Adeola Adeloye, co-founder and UK trustee of OAKonsult",
      position: "50% 18%",
    },
    ctaTitle: "Talk to the UK team",
    ctaText: "For governance, faith-community or partnership enquiries, contact OAKonsult through the shared contact route.",
  },
  {
    slug: "modupe-olubunmi-soji-adeyemo",
    name: "Modupe Olubunmi Soji-Adeyemo",
    familiarName: "Bunmi",
    role: "Chair of the Board of Trustees",
    region: "uk",
    boardJurisdiction: "uk",
    operationalRemit: "uk",
    group: "trustee",
    summary:
      "Chair of the Board of Trustees. A Nurse Practitioner with more than two decades of clinical experience and a commitment to inclusive, people-centred support.",
    biography: [
      {
        eyebrow: "Background",
        title: "Clinical experience and people-centred leadership.",
        paragraphs: [
          "Modupe Olubunmi Soji-Adeyemo, known familiarly as Bunmi, is a Nurse Practitioner with more than two decades of clinical experience.",
          "Her healthcare background brings a practical understanding of care, inclusion and the importance of listening to disabled people and their families.",
        ],
      },
      {
        eyebrow: "Chair of the Board of Trustees",
        title: "Leading with inclusion, service and community impact.",
        paragraphs: [
          "As Chair of OAKonsult’s Board of Trustees in the United Kingdom, Bunmi provides strategic leadership and governance oversight. She supports inclusive healthcare and disability advocacy, community outreach and constructive relationships with partners and stakeholders.",
        ],
      },
    ],
    related: [
      { label: "Our team", href: "/our-team", description: "Meet the wider leadership, trustees and delivery team." },
      { label: "Impact and accountability", href: "/impact", description: "See how OAKonsult reports activity and learns from evidence." },
    ],
    image: {
      src: "/images/team/modupe-soji-adeyemo.webp",
      alt: "Portrait of Modupe Olubunmi Soji-Adeyemo, Chair of the Board of Trustees of OAKonsult",
      position: "50% 18%",
    },
    ctaTitle: "Talk to the UK team",
    ctaText: "For governance, healthcare-inclusion or partnership enquiries, contact OAKonsult through the shared contact route.",
  },
  {
    slug: "hadiza-daura",
    name: "Hadiza Daura",
    role: "UK trustee",
    region: "uk",
    boardJurisdiction: "uk",
    operationalRemit: "uk",
    group: "trustee",
    summary:
      "UK trustee, parent carer, disability advocate and Project ME Champion, with qualifications in Cooperative Management and Accounting and Auditing.",
    biography: [
      {
        eyebrow: "Background",
        title: "Professional and lived experience.",
        paragraphs: [
          "Hadiza Daura holds qualifications in Cooperative Management and Accounting and Auditing. Her professional experience includes work connected with the Abuja Geographical Information System.",
          "She also brings lived experience as a parent carer, alongside a sustained commitment to disability advocacy, fundraising and community participation.",
        ],
      },
      {
        eyebrow: "UK trustee",
        title: "Governance grounded in lived experience.",
        paragraphs: [
          "As a UK trustee, Hadiza helps keep OAKonsult’s programmes grounded in the realities families face. She is a graduate and Champion of Project ME and brings professional, cultural and lived-experience insight to co-production and governance.",
        ],
      },
    ],
    related: [
      { label: "Project ME", href: "/programmes/project-me", description: "Learn about the wellbeing programme Hadiza champions." },
      { label: "Find support", href: "/find-support", description: "Start with what your family needs today." },
    ],
    image: {
      src: "/images/team/hadiza-daura.webp",
      alt: "Portrait of Hadiza Daura, UK trustee of OAKonsult",
      position: "50% 18%",
    },
    ctaTitle: "Talk to the UK team",
    ctaText: "For governance, programme or support enquiries, contact OAKonsult through the shared contact route.",
  },
  {
    slug: "lucky-sanni-aigbefoh",
    name: "Lucky Sanni Aigbefoh",
    role: "UK trustee",
    region: "uk",
    boardJurisdiction: "uk",
    operationalRemit: "uk",
    group: "trustee",
    summary:
      "UK trustee, Senior Project Manager and Certified Scrum Master with more than a decade of experience delivering complex organisational change.",
    biography: [
      {
        eyebrow: "Background",
        title: "Project leadership and organisational change.",
        paragraphs: [
          "Lucky Sanni Aigbefoh is a Senior Project Manager and Certified Scrum Master with more than a decade of experience delivering complex projects.",
          "His work spans HR, payroll, infrastructure, implementation and business transformation, with strengths in agile delivery, stakeholder engagement, risk management and global-team leadership.",
        ],
      },
      {
        eyebrow: "UK trustee",
        title: "Governance shaped by delivery experience.",
        paragraphs: [
          "As a UK trustee, Lucky contributes project-delivery, governance, risk-management and organisational-change experience to the board’s oversight and strategic planning.",
        ],
      },
    ],
    related: [
      { label: "Impact and accountability", href: "/impact", description: "See how OAKonsult reports activity and learns from evidence." },
      { label: "Funders and partners", href: "/funders-partners", description: "Meet the organisations that support the work." },
    ],
    image: {
      src: "/images/team/lucky-aigbefoh.webp",
      alt: "Portrait of Lucky Sanni Aigbefoh, UK trustee of OAKonsult",
      position: "50% 18%",
    },
    ctaTitle: "Talk to the UK team",
    ctaText: "For governance, project or partnership enquiries, contact OAKonsult through the shared contact route.",
  },
  {
    slug: "bolanle-alice-ajayi",
    name: "Bolanle Alice Ajayi",
    role: "Operations Manager and UK trustee",
    region: "uk",
    boardJurisdiction: "uk",
    operationalRemit: "cross-regional",
    group: "trustee",
    summary:
      "Operations Manager and UK trustee, bringing procurement, strategy, operations and supplier-management experience from her work at EY Ireland.",
    biography: [
      {
        eyebrow: "Background",
        title: "Procurement, strategy and operations.",
        paragraphs: [
          "Bolanle Alice Ajayi is a Procurement Manager at EY Ireland with experience in strategy, operations, supplier management and service improvement.",
          "At OAKonsult, her contribution covers HR, operational systems, staff welfare, compliance and practical support for programme delivery.",
        ],
      },
      {
        eyebrow: "Operations Manager and UK trustee",
        title: "Where governance meets day-to-day delivery.",
        paragraphs: [
          "As Operations Manager and a UK trustee, Bolanle works across governance and operations. She strengthens organisational processes and supports dependable, well-run services for families and communities.",
        ],
      },
    ],
    related: [
      { label: "Volunteer opportunities", href: "/volunteer-opportunities", description: "See how to join the volunteer network Bolanle helps support." },
      { label: "Our team", href: "/our-team", description: "Meet the wider leadership, trustees and delivery team." },
    ],
    image: {
      src: "/images/team/bolanle-ajayi.webp",
      alt: "Portrait of Bolanle Alice Ajayi, Operations Manager and UK trustee of OAKonsult",
      position: "50% 18%",
    },
    ctaTitle: "Talk to the UK team",
    ctaText: "For operations, HR or volunteering enquiries, contact OAKonsult through the shared contact route.",
  },
  {
    slug: "dayo-balogun",
    name: "Dayo Balogun",
    role: "Volunteer Manager",
    region: "nigeria",
    operationalRemit: "nigeria",
    group: "operations",
    summary:
      "Volunteer Manager. Leads volunteer documentation and processes, recruitment and training coordination, skills mapping and volunteer recognition.",
    biography: [
      {
        eyebrow: "Volunteer leadership",
        title: "Building a well-supported volunteer network.",
        paragraphs: [
          "Dayo Balogun is OAKonsult’s Volunteer Manager. He supports the people who give their time to the charity’s programmes and outreach.",
          "His work covers volunteer documentation and processes, the coordination of recruitment and training, skills mapping across the volunteer network and volunteer recognition, so every volunteer is known, prepared and appreciated.",
        ],
      },
      {
        eyebrow: "Why it matters",
        title: "Good volunteering starts with good care.",
        paragraphs: [
          "By keeping processes clear and supportive, Dayo helps volunteers focus on what matters most: standing alongside parent carers, disabled children and young people, and the communities OAKonsult serves.",
        ],
      },
    ],
    related: [
      { label: "Volunteer opportunities", href: "/volunteer-opportunities", description: "Explore current ways to volunteer with OAKonsult." },
      { label: "Get involved", href: "/get-involved", description: "Find other ways to take part in the work." },
    ],
    image: {
      src: "/images/team/dayo-balogun.webp",
      alt: "Portrait of Dayo Balogun, Volunteer Manager at OAKonsult",
      position: "50% 16%",
    },
    ctaTitle: "Ask about volunteering",
    ctaText: "For volunteering enquiries, contact OAKonsult through the shared contact route or visit the volunteer page.",
  },
  {
    slug: "itunuade-iyun",
    name: "Itunuade Iyun",
    role: "Country Director, Nigeria",
    region: "nigeria",
    operationalRemit: "nigeria",
    group: "executive",
    summary:
      "Country Director, Nigeria, with experience across media, non-governmental organisations, development work, counselling, mentoring and enterprise.",
    biography: [
      {
        eyebrow: "Background",
        title: "Communication, development and counselling.",
        paragraphs: [
          "Itunuade Iyun holds a BSc (Hons) in Mass Communication and a master’s degree in International Law and Diplomacy from the University of Lagos. She is also a certified counsellor with Love, Dating and Marriage Ministry.",
          "Her experience spans media, local and international non-governmental organisations, development work, counselling, mentoring, ministry support and enterprise.",
        ],
      },
      {
        eyebrow: "Country Director, Nigeria",
        title: "Leading Nigeria operations and programme delivery.",
        paragraphs: [
          "As Country Director, Itunuade leads OAKonsult’s Nigeria operations, programmes and stakeholder engagement. Her work includes disability-inclusion initiatives, parent-carer empowerment and the development of OAK Centre Prime.",
        ],
      },
    ],
    related: [
      { label: "OAKonsult Nigeria", href: "/nigeria", description: "Explore the Nigeria hub, programmes and partnerships." },
      { label: "OAK Centre Prime", href: "/programmes/oak-centre-prime", description: "See the planned centre Itunuade helps move forward." },
    ],
    image: {
      src: "/images/team/itunuade-iyun.webp",
      alt: "Portrait of Itunuade Iyun, Country Director for OAKonsult Nigeria",
      position: "50% 18%",
    },
    ctaTitle: "Talk to the Nigeria team",
    ctaText: "For Nigeria programme or partnership enquiries, contact OAKonsult through the shared contact route.",
  },
  {
    slug: "esther-aderike-kehinde",
    name: "Esther Aderike Kehinde",
    role: "Nigeria trustee",
    region: "nigeria",
    boardJurisdiction: "nigeria",
    operationalRemit: "nigeria",
    group: "trustee",
    summary:
      "Nigeria trustee. A career across education and public administration, including more than three decades at NEC, now INEC, before retiring from civil service in April 2020.",
    biography: [
      {
        eyebrow: "Background",
        title: "A career in education and public administration.",
        paragraphs: [
          "Esther Aderike Kehinde earned her NCE in 1986, a Higher Diploma in Public Administration in 1997, a postgraduate diploma in Public Administration in 2013 and a Master of Public Administration in 2015.",
          "She joined NEC, now INEC, in 1989 and served the institution for more than three decades before retiring from active civil service in April 2020. Alongside her professional life, she has held community and church leadership roles.",
        ],
      },
      {
        eyebrow: "Nigeria trustee",
        title: "Governance as stewardship.",
        paragraphs: [
          "Esther is a trustee of OAKonsult in Nigeria. She provides strategic oversight, supports accountability and helps uphold the integrity of the charity’s work within the disability community.",
        ],
      },
    ],
    related: [
      { label: "OAKonsult Nigeria", href: "/nigeria", description: "Explore the Nigeria hub, programmes and partnerships." },
      { label: "Our history", href: "/history", description: "See the milestones that shaped the charity." },
    ],
    image: {
      src: "/images/team/esther-aderike-kehinde.webp",
      alt: "Portrait of Esther Aderike Kehinde, Nigeria trustee of OAKonsult",
      position: "50% 17%",
    },
    ctaTitle: "Talk to the Nigeria team",
    ctaText: "For governance or Nigeria partnership enquiries, contact OAKonsult through the shared contact route.",
  },
  {
    slug: "oshin-hannah-oluwafunmilayo",
    name: "Oshin Hannah Oluwafunmilayo",
    familiarName: "Funmi Oshin",
    role: "Nigeria trustee",
    region: "nigeria",
    boardJurisdiction: "nigeria",
    operationalRemit: "nigeria",
    group: "trustee",
    summary:
      "Nigeria trustee with hands-on experience supporting parents and families of children with diverse needs through training, advocacy and community outreach.",
    biography: [
      {
        eyebrow: "Family support",
        title: "Practical experience alongside families.",
        paragraphs: [
          "Oshin Hannah Oluwafunmilayo, also known as Funmi Oshin, has hands-on experience supporting parents and families of children with autism, cerebral palsy, ADHD, dyslexia and visual impairment.",
          "Her contribution includes family support, disability inclusion, community engagement, training and outreach with parents, churches, schools and local communities.",
        ],
      },
      {
        eyebrow: "Nigeria trustee",
        title: "Governance informed by community experience.",
        paragraphs: [
          "As a Nigeria trustee, Funmi contributes family-support and disability-community insight to governance, advocacy and the development of inclusive programmes.",
        ],
      },
    ],
    related: [
      { label: "OAKonsult Nigeria", href: "/nigeria", description: "Explore the Nigeria hub, programmes and partnerships." },
      { label: "Support for churches", href: "/programmes/support-for-churches", description: "See the optional inclusion learning offered to faith communities." },
    ],
    image: {
      src: "/images/team/oshin-hannah-oluwafunmilayo.webp",
      alt: "Portrait of Oshin Hannah Oluwafunmilayo, Nigeria trustee of OAKonsult",
      position: "50% 22%",
    },
    ctaTitle: "Talk to the Nigeria team",
    ctaText: "For governance, family-support or advocacy enquiries, contact OAKonsult through the shared contact route.",
  },
  {
    slug: "omobola-oludele",
    name: "Omobola Oludele",
    role: "Learning and Development Manager, Nigeria",
    region: "nigeria",
    operationalRemit: "nigeria",
    group: "operations",
    summary:
      "Learning and Development Manager, Nigeria. Leads capacity-building, training and learning interventions for staff, volunteers and community programmes.",
    biography: [
      {
        eyebrow: "Learning and development",
        title: "Building skills for dependable support.",
        paragraphs: [
          "Omobola Oludele leads capacity-building, training programmes and learning interventions for OAKonsult in Nigeria.",
          "Her role includes statutory learning for volunteers and practical support for advocacy, community outreach and inclusive programme delivery.",
        ],
      },
      {
        eyebrow: "Learning and Development Manager, Nigeria",
        title: "Building the charity’s capacity to teach and include.",
        paragraphs: [
          "Omobola supports OAKonsult’s work with Joni and Friends and the Beyond Suffering programme, helping the team strengthen disability awareness and inclusive practice.",
        ],
      },
    ],
    related: [
      { label: "Support for churches", href: "/programmes/support-for-churches", description: "See the optional inclusion learning Omobola helps deliver." },
      { label: "Volunteer opportunities", href: "/volunteer-opportunities", description: "Explore current ways to volunteer with OAKonsult." },
    ],
    image: {
      src: "/images/team/omobola-oludele.webp",
      alt: "Portrait of Omobola Oludele, Learning and Development Manager in Nigeria",
      position: "50% 20%",
    },
    ctaTitle: "Talk to the Nigeria team",
    ctaText: "For training or learning enquiries, contact OAKonsult through the shared contact route.",
  },
  {
    slug: "boluwatife-kehinde",
    name: "Boluwatife Kehinde",
    role: "Head of Administration, Nigeria",
    region: "nigeria",
    operationalRemit: "nigeria",
    group: "operations",
    summary:
      "Head of Administration, Nigeria. Coordinates administration, volunteer skills-gap work and programme-budget preparation across the charity’s Nigeria work.",
    biography: [
      {
        eyebrow: "Administration",
        title: "Keeping Nigeria operations coordinated.",
        paragraphs: [
          "Boluwatife Kehinde is Head of Administration in Nigeria. She keeps the charity’s day-to-day work organised, documented and prepared.",
          "The role supports administrative coordination across the team, volunteer skills-gap analysis that informs recruitment and training, and programme-budget preparation that helps outreach and community activity run responsibly.",
        ],
      },
      {
        eyebrow: "Why it matters",
        title: "Good administration protects good work.",
        paragraphs: [
          "By keeping records, budgets and coordination in good order, Boluwatife helps programme staff and volunteers focus on families, outreach and inclusion rather than paperwork.",
        ],
      },
    ],
    related: [
      { label: "OAKonsult Nigeria", href: "/nigeria", description: "Explore the Nigeria hub, programmes and partnerships." },
      { label: "Our team", href: "/our-team", description: "Meet the wider leadership, trustees and delivery team." },
    ],
    image: {
      src: "/images/team/boluwatife-kehinde.webp",
      alt: "Portrait of Boluwatife Kehinde, Head of Administration for OAKonsult Nigeria",
      position: "50% 18%",
    },
    ctaTitle: "Talk to the Nigeria team",
    ctaText: "For Nigeria administrative or programme enquiries, contact OAKonsult through the shared contact route.",
  },
];

/** Exact current UK trustee roster on the Charity Commission register for charity 1204553. */
export const officialUkTrusteeNames = [
  "Ajisola Adeola Adeloye",
  "Bolanle Alice Ajayi",
  "Hadiza Daura",
  "Lucky Sanni Aigbefoh",
  "Modupe Olubunmi Soji-Adeyemo",
] as const;

export const teamBySlug = (slug: string): TeamMember | undefined =>
  teamMembers.find((member) => member.slug === slug);

export const teamByRegion = (region: TeamRegion): TeamMember[] =>
  teamMembers.filter((member) => member.region === region);

export const teamByBoardJurisdiction = (region: TeamRegion): TeamMember[] =>
  teamMembers.filter((member) => member.boardJurisdiction === region);

/** Canonical static parameters consumed directly by the App Router profile route. */
export const teamProfileStaticParams = (): { slug: string }[] =>
  teamMembers.map((member) => ({ slug: member.slug }));

export const ukTeamMembers = teamByRegion("uk");
export const nigeriaTeamMembers = teamByRegion("nigeria");

export const ukTrustees = teamByBoardJurisdiction("uk").filter(
  (member) => officialUkTrusteeNames.includes(member.name as (typeof officialUkTrusteeNames)[number]),
);

export const regionDisplayName = (region: TeamRegion): string =>
  region === "uk" ? "United Kingdom" : "Nigeria";

/** Decorative initials used only where no verified portrait exists. */
export const teamInitials = (name: string): string =>
  name
    .split(/\s+/)
    .map((part) => part.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ]/g, ""))
    .filter(Boolean)
    .map((part) => part[0]!.toUpperCase())
    .slice(0, 2)
    .join("");
