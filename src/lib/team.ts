/**
 * Centralised, strongly typed OAKonsult team directory.
 *
 * Every public team surface (hub, regional directories and individual
 * profiles) renders from this single module so names, roles and regions
 * stay consistent across the site.
 */

export type TeamRegion = "uk" | "nigeria";

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
  region: TeamRegion;
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
    group: "executive",
    summary:
      "Co-founder and Chief Executive Officer. OAKonsult grew from her family’s experience caring for their daughter Abigail after she sustained profound brain damage in Nigeria in 2010.",
    biography: [
      {
        eyebrow: "Lived experience",
        title: "A calling shaped by Abigail’s life.",
        paragraphs: [
          "In 2010, when she was 18 months old, Olufunke and Ajisola Adeloye’s daughter Abigail suffered catastrophic brain damage caused by a preventable medical error in Nigeria. The family moved to the United Kingdom so Abigail could receive the specialist care she needed.",
          "Years of hospital corridors, sleepless nights and uncertainty became a determination that no other family should face the disability journey alone. From that fierce love, Olufunke and Ajisola co-founded OAKonsult Disabilities Outreach as a place of compassion, training and practical support for families raising children with disabilities.",
        ],
      },
      {
        eyebrow: "Chief Executive Officer",
        title: "Turning personal pain into shared purpose.",
        paragraphs: [
          "Olufunke leads OAKonsult across the United Kingdom and Nigeria, guiding parent-carer support, inclusive training and community outreach shaped by lived experience. Abigail died on 3 October 2024, aged 16. Her legacy of resilience continues to inspire every family the charity serves.",
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
    group: "trustee",
    summary:
      "Co-founder and UK trustee. A theologian and pioneering seminary administrator who served for 32 years at the Nigerian Baptist Theological Seminary, Ogbomoso.",
    biography: [
      {
        eyebrow: "Background",
        title: "A theologian and pioneering seminary administrator.",
        paragraphs: [
          "Ajisola Adeola Adeloye co-founded OAKonsult Disabilities Outreach with Olufunke Adeloye and serves as a trustee of the charity in the United Kingdom. He holds an MPhil in Theology.",
          "From Fiditi in Oyo State, Nigeria, he was the founding Registrar of the Nigerian Baptist Theological Seminary in Ogbomoso and gave 32 years of service to the seminary, helping to build its administration and strengthen theological education.",
        ],
      },
      {
        eyebrow: "At OAKonsult",
        title: "Foundational vision and steady governance.",
        paragraphs: [
          "As co-founder, Ajisola supports the strategic growth and foundational vision of the charity. He contributes to organisational development, partnerships and governance alongside fellow trustees.",
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
    group: "trustee",
    summary:
      "Chair of the Board of Trustees. More than 25 years in broadcast media, including freelance production for Sky TV and the BBC.",
    biography: [
      {
        eyebrow: "Background",
        title: "A career in broadcast media and public communication.",
        paragraphs: [
          "Modupe Olubunmi Soji-Adeyemo, known familiarly as Bunmi, brings more than 25 years of broadcast media experience to OAKonsult. She worked as a freelance producer for Sky TV and the BBC, and gained experience with the Press Secretary’s Office at Buckingham Palace and the Foreign and Commonwealth Office.",
          "Her background spans communications and public diplomacy, giving the board a strong understanding of public messaging, reputation and stakeholder relationships.",
        ],
      },
      {
        eyebrow: "Chair of the Board of Trustees",
        title: "Leading with inclusion, service and community impact.",
        paragraphs: [
          "As Chair of the Board of Trustees of OAKonsult in the United Kingdom, she provides strategic oversight and governance support so the charity remains faithful to its mission and values. She leads with a focus on inclusion, service and community impact, supporting initiatives that empower parent carers and promote the inclusion of disabled people.",
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
    ctaText: "For governance, communications or partnership enquiries, contact OAKonsult through the shared contact route.",
  },
  {
    slug: "hadiza-daura",
    name: "Hadiza Daura",
    role: "UK trustee",
    region: "uk",
    group: "trustee",
    summary:
      "UK trustee. More than 30 years in the NHS, a trained counsellor and a parent carer with deep experience of disability advocacy and fundraising.",
    biography: [
      {
        eyebrow: "Background",
        title: "Three decades of NHS service and counselling.",
        paragraphs: [
          "Hadiza Daura graduated with a BSc in Business Studies in 1988 and joined the NHS in 1989, building more than 30 years of administrative and leadership experience across the health service. She is also a trained counsellor.",
          "Her professional life sits alongside charity fundraising and disability advocacy, informed by her own lived experience as a parent carer and of serious illness, which she carries with characteristic steadiness and dignity.",
        ],
      },
      {
        eyebrow: "UK trustee",
        title: "Governance grounded in lived experience.",
        paragraphs: [
          "As a trustee of OAKonsult in the United Kingdom, Hadiza helps keep the charity’s programmes grounded in the realities families face. A graduate and Champion of the Project ME programme, she brings both professional discipline and personal understanding to the board.",
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
    group: "trustee",
    summary:
      "UK trustee. More than 20 years of finance and accounting experience across the UK and Nigeria, including tax, audit and financial management at PwC and EY.",
    biography: [
      {
        eyebrow: "Background",
        title: "Two decades of finance and accounting leadership.",
        paragraphs: [
          "Lucky Sanni Aigbefoh is a finance and accounting professional with more than 20 years of experience across the United Kingdom and Nigeria. His background covers tax, audit and financial management, including work at PwC and EY.",
          "He previously served as a Chief Financial Officer in Nigerian telecommunications. He is a member of ACCA and holds an MSc in Finance Management and a BA in Accounting and Finance.",
        ],
      },
      {
        eyebrow: "UK trustee",
        title: "Financial stewardship for sustainable impact.",
        paragraphs: [
          "As a trustee of OAKonsult in the United Kingdom, Lucky strengthens the charity’s financial governance, accountability and strategic planning, helping the board steward resources well for the families the charity serves.",
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
    ctaText: "For governance, finance or funding enquiries, contact OAKonsult through the shared contact route.",
  },
  {
    slug: "bolanle-alice-ajayi",
    name: "Bolanle Alice Ajayi",
    role: "Operations Manager and UK trustee",
    region: "uk",
    group: "trustee",
    summary:
      "Operations Manager and UK trustee. Involved with OAKonsult for about a decade since 2014, covering HR strategy, people management, operations, compliance support and DBS coordination.",
    biography: [
      {
        eyebrow: "Background",
        title: "A decade of service alongside OAKonsult.",
        paragraphs: [
          "Bolanle Alice Ajayi has been involved with OAKonsult for about a decade, beginning in 2014. Over those years she has supported the charity’s growth from an early outreach into a structured organisation.",
          "Her contribution spans HR strategy and people management, the smooth running of day-to-day operations, financial and compliance support, and DBS coordination that keeps volunteer processes safe and orderly.",
        ],
      },
      {
        eyebrow: "Operations Manager and UK trustee",
        title: "Where governance meets day-to-day delivery.",
        paragraphs: [
          "As Operations Manager and a trustee of OAKonsult in the United Kingdom, Bolanle works at the intersection of governance and operations. She helps oversee organisational processes, strengthen systems and support service quality so families experience dependable, well-run support.",
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
    region: "uk",
    group: "operations",
    summary:
      "Volunteer Manager. Leads volunteer documentation and processes, recruitment and training coordination, skills mapping and volunteer recognition.",
    biography: [
      {
        eyebrow: "Volunteer leadership",
        title: "Building a well-supported volunteer network.",
        paragraphs: [
          "Dayo Balogun serves as OAKonsult’s Volunteer Manager, looking after the people who give their time to the charity’s programmes and outreach.",
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
      alt: "Portrait of Dayo Balogun, Volunteer Manager of OAKonsult",
      position: "50% 18%",
    },
    ctaTitle: "Ask about volunteering",
    ctaText: "For volunteering enquiries, contact OAKonsult through the shared contact route or visit the volunteer page.",
  },
  {
    slug: "itunuade-iyun",
    name: "Itunuade Iyun",
    role: "Country Director, Nigeria",
    region: "nigeria",
    group: "executive",
    summary:
      "Country Director, Nigeria. More than 20 years in education, including 12 years as Head of School at Modern Montessori International School, Lagos. Joined OAKonsult in 2022.",
    biography: [
      {
        eyebrow: "Background",
        title: "Over two decades in education leadership.",
        paragraphs: [
          "Itunuade Iyun brings more than 20 years of experience in education, spanning teaching and school management. She served for 12 years as Head of School at Modern Montessori International School in Lagos and remains a consultant to the school.",
          "Her expertise covers early-years and primary curriculum leadership, teacher development and day-to-day school operations, grounding OAKonsult’s work in credible educational practice.",
        ],
      },
      {
        eyebrow: "Country Director, Nigeria",
        title: "Leading Nigeria operations and programme delivery.",
        paragraphs: [
          "Itunuade joined OAKonsult in 2022 and became Country Director in 2023. She leads Nigeria operations and local programme execution, overseeing community outreach, stakeholder relationships and the delivery of initiatives at the national level.",
        ],
      },
    ],
    related: [
      { label: "OAKonsult Nigeria", href: "/nigeria", description: "Explore the Nigeria hub, programmes and partnerships." },
      { label: "OAK Centre Prime", href: "/programmes/oak-centre-prime", description: "See the planned centre Itunuade helps move forward." },
    ],
    ctaTitle: "Talk to the Nigeria team",
    ctaText: "For Nigeria programme, school or partnership enquiries, contact OAKonsult through the shared contact route.",
  },
  {
    slug: "esther-aderike-kehinde",
    name: "Esther Aderike Kehinde",
    role: "Nigeria trustee",
    region: "nigeria",
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
          "As a trustee of OAKonsult in Nigeria, Esther serves as a steward of the charity’s mission and values. She provides strategic oversight, supports accountability and helps uphold the integrity of the charity’s work within the disability community.",
        ],
      },
    ],
    related: [
      { label: "OAKonsult Nigeria", href: "/nigeria", description: "Explore the Nigeria hub, programmes and partnerships." },
      { label: "Our history", href: "/history", description: "See the milestones that shaped the charity." },
    ],
    ctaTitle: "Talk to the Nigeria team",
    ctaText: "For governance or Nigeria partnership enquiries, contact OAKonsult through the shared contact route.",
  },
  {
    slug: "oshin-hannah-oluwafunmilayo",
    name: "Oshin Hannah Oluwafunmilayo",
    role: "Nigeria support and advocacy",
    region: "nigeria",
    group: "operations",
    summary:
      "Nigeria support and advocacy. A parent and sibling-support advocate and founder of Five Hearts Siblings, which supports siblings of children with disabilities.",
    biography: [
      {
        eyebrow: "Lived experience",
        title: "Advocacy born from family life.",
        paragraphs: [
          "Oshin Hannah Oluwafunmilayo is a parent and sibling-support advocate whose commitment grows out of lived experience. After the death of her daughter following illness, she channelled her understanding of family life with disability into standing with other parents, carers and siblings.",
          "She founded Five Hearts Siblings, a non-profit supporting siblings of children with disabilities, recognising that brothers and sisters also carry questions, responsibilities and hopes that deserve attention.",
        ],
      },
      {
        eyebrow: "Support and advocacy",
        title: "For inclusive schools, stronger families, sustainable communities.",
        paragraphs: [
          "Hannah brings longstanding board and advisory service to her advocacy. She supports parent carers, helps with training for churches and schools, and takes part in advocacy and community outreaches. Her focus is inclusive schools, stronger family support and sustainable communities where every person is valued without discrimination.",
        ],
      },
    ],
    related: [
      { label: "OAKonsult Nigeria", href: "/nigeria", description: "Explore the Nigeria hub, programmes and partnerships." },
      { label: "Support for churches", href: "/programmes/support-for-churches", description: "See the optional inclusion learning offered to faith communities." },
    ],
    image: {
      src: "/images/team/oshin-hannah-oluwafunmilayo.webp",
      alt: "Portrait of Oshin Hannah Oluwafunmilayo, Nigeria support and advocacy",
      position: "50% 22%",
    },
    ctaTitle: "Talk to the Nigeria team",
    ctaText: "For family support or advocacy enquiries, contact OAKonsult through the shared contact route.",
  },
  {
    slug: "omobola-oludele",
    name: "Omobola Oludele",
    role: "Learning and Development Manager, Nigeria",
    region: "nigeria",
    group: "operations",
    summary:
      "Learning and Development Manager, Nigeria. 21 years of teaching experience and a trained Montessori directress and Mathematics teacher. Joined OAKonsult as a volunteer more than 10 years ago.",
    biography: [
      {
        eyebrow: "Background",
        title: "A teacher at heart, for 21 years and counting.",
        paragraphs: [
          "Omobola Oludele has 21 years of teaching experience. She is a trained Montessori directress and Mathematics teacher with strengths in curriculum planning, adult learning, volunteer engagement, teacher coaching and learning innovation.",
          "She joined OAKonsult as a volunteer more than 10 years ago and has continued to contribute to training, advocacy and community outreach ever since.",
        ],
      },
      {
        eyebrow: "Learning and Development Manager, Nigeria",
        title: "Building the charity’s capacity to teach and include.",
        paragraphs: [
          "As Learning and Development Manager in Nigeria, Omobola leads capacity-building initiatives, training programmes and learning interventions. She supports volunteers’ statutory training and helps connect OAKonsult with training partners, including the link with Joni and Friends for the Beyond Suffering programme.",
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
    group: "operations",
    summary:
      "Head of Administration, Nigeria. Coordinates administration, volunteer skills-gap work and programme-budget preparation across the charity’s Nigeria work.",
    biography: [
      {
        eyebrow: "Administration",
        title: "Keeping Nigeria operations coordinated.",
        paragraphs: [
          "Boluwatife Kehinde serves as Head of Administration in Nigeria, helping the charity’s day-to-day work stay organised, documented and well prepared.",
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

/** Canonical static parameters consumed directly by the App Router profile route. */
export const teamProfileStaticParams = (): { slug: string }[] =>
  teamMembers.map((member) => ({ slug: member.slug }));

export const ukTeamMembers = teamByRegion("uk");
export const nigeriaTeamMembers = teamByRegion("nigeria");

export const ukTrustees = teamMembers.filter(
  (member) => member.region === "uk" && officialUkTrusteeNames.includes(member.name as (typeof officialUkTrusteeNames)[number]),
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
