export interface LinkItem {
	label: string;
	href: string;
	external?: boolean;
}

export interface NavItem extends LinkItem {
	children?: LinkItem[];
}

export const brand = {
	name: "OAKonsult",
	tagline: "Living Life Abundantly",
	description:
		"Living Life Abundantly - We empower families raising children with disabilities through faith-rooted support, inclusive training, and community-based rehabilitation.",
};

export const donationCta: LinkItem = {
	label: "Donate",
	href: "/donate",
};

export const utilityLinks: LinkItem[] = [
	{ label: "Learning Platform", href: "https://courses.oakonsult.org", external: true },
	{ label: "Stories & News", href: "/blog-news-stories" },
];

export const navItems: NavItem[] = [
	{ label: "Home", href: "/" },
	{
		label: "About Us",
		href: "/about-us",
		children: [
			{ label: "Vision & Mission", href: "/vision-mission" },
			{ label: "History", href: "/history" },
			{ label: "Our Team", href: "/our-team" },
			{ label: "Partners & Supporters", href: "/partners-supporters" },
			{ label: "Annual Reports & Impact", href: "/annual-reports-impact" },
		],
	},
	{
		label: "Services & Initiatives",
		href: "/programs-services",
		children: [
			{ label: "UK Programs", href: "/uk-programs" },
			{ label: "Nigeria Programs", href: "/nigeria-programs" },
			{ label: "Support for Parent Carers", href: "/support-for-parent-carers" },
			{ label: "Project ME", href: "/projectme" },
			{ label: "Support for Churches", href: "/support-for-churches" },
			{ label: "OAK Centre Prime", href: "/oak-centre-prime" },
		],
	},
	{
		label: "Get Involved",
		href: "/get-involved",
		children: [
			{ label: "Volunteer Opportunities", href: "/volunteer-opportunities" },
			{ label: "Jobs", href: "/job-openings" },
			{ label: "Fundraising", href: "/fundraising" },
			{ label: "Partnerships", href: "/partnerships" },
			{ label: "Events", href: "/events" },
		],
	},
	{ label: "Media Gallery", href: "/media-gallery" },
	{ label: "Blog (News & Stories)", href: "/blog-news-stories" },
	{ label: "Contact Us", href: "/contact-us" },
];

export const programs = [
	{
		id: "parent-carers",
		slug: "support-for-parent-carers",
		title: "Support for Parent Carers",
		summary:
			"One-to-one coaching, wellbeing workshops and safe spaces to connect and recharge. Caring for a child with additional needs can feel overwhelming, so we combine practical tools with encouragement to help carers thrive.",
		image: "/media/wp/2022/09/oak-images-3.png",
	},
	{
		id: "churches",
		slug: "support-for-churches",
		title: "Support for Churches",
		summary:
			"We equip churches, schools, and communities to welcome and include families with disabilities through practical inclusion training, theology of dignity, and follow-through implementation.",
		image: "/media/wp/2023/10/Church-Foto.jpg",
	},
	{
		id: "community-rehab",
		slug: "support-for-parent-carers",
		title: "Community-Based Rehabilitation",
		summary:
			"Through awareness campaigns, support groups and outreach, we build inclusive communities one family at a time in the UK, Nigeria, and online.",
		image: "/media/wp/2022/09/oak-images-6.png",
	},
	{
		id: "project-me",
		slug: "projectme",
		title: "Project ME",
		summary:
			"A holistic programme with workshops, training, practical sessions, focus groups and therapeutic content for parent carers of children and young people with additional needs and disabilities.",
		image: "/media/wp/2023/10/IMG-20221020-WA0023-Project-Me.jpg",
	},
	{
		id: "oak-centre-prime",
		slug: "oak-centre-prime",
		title: "OAK Centre Prime",
		summary:
			"Nigeria's first holistic disability centre, built in loving memory of Abigail, with integrated education, therapy, respite, and vocational pathways.",
		image: "/media/wp/2025/04/4211940_1920x1080_f985cc-1.jpg",
	},
];

export const corePillars = [
	{
		title: "Parent Carer Support",
		description: "One-to-one coaching, wellbeing workshops, and safe spaces to connect and recharge.",
	},
	{
		title: "Inclusive Training",
		description:
			"We equip churches, schools, and communities to welcome and include families with disabilities.",
	},
	{
		title: "Community-Based Rehabilitation",
		description:
			"Through awareness campaigns, support groups, and international outreach, we build inclusive communities one family at a time.",
	},
	{
		title: "Project ME",
		description:
			"A holistic programme including workshops, training, practical sessions, focus groups, and therapeutic content for parent carers.",
	},
];

export const donorPriorities = [
	"Funds Project Me workshops where carers gain life skills, resilience and hope",
	"Credits inclusive training so faith and community groups welcome families of all abilities",
	"Drives community-based rehabilitation, from mobile therapy days to assistive-device clinics",
	"Advances OAK Centre Prime in Abigail's memory",
];

export const involvementPaths = [
	{
		title: "Volunteer Opportunities",
		description:
			"Every helping hand brings us closer to a more inclusive world. Volunteer with lived experience, professional skill, or a heart to serve.",
		cta: "Become a Volunteer",
		href: "/volunteer-opportunities",
	},
	{
		title: "Fundraising",
		description:
			"Host a giving campaign, community event, or donor outreach that helps us support families raising children with disabilities.",
		cta: "Plan a Fundraiser",
		href: "/fundraising",
	},
	{
		title: "Partnerships",
		description:
			"Join our network of faith groups, professionals, donors, and institutions creating lasting disability inclusion impact.",
		cta: "Start a Partnership",
		href: "/partnerships",
	},
	{
		title: "Events",
		description:
			"Learn, connect, and contribute to a more inclusive world through OAKonsult gatherings and campaign events.",
		cta: "View Events",
		href: "/events",
	},
];

export const campaignPreviews = [
	{
		title: "OAK Centre Prime",
		description:
			"Help build Nigeria's first holistic disability-support campus serving over 1,000 children and young people each year.",
		href: "/oak-centre-prime",
	},
	{
		title: "Care for Parent Carers",
		description:
			"Fund coaching, therapy support, and restorative pathways for parent carers navigating day-to-day disability care.",
		href: "/support-for-parent-carers",
	},
	{
		title: "Disability Awareness Training",
		description:
			"Transform communities through inclusive-church workshops, school-based SEND training, and awareness seminars.",
		href: "/support-for-churches",
	},
];

export const impactTimeline = [
	{
		year: "2021",
		milestone:
			"OAKonsult Disabilities Outreach founded by Olufunke and Ajisola Adeloye in response to lived parenting experience of complex disability.",
	},
	{
		year: "2021",
		milestone: "Registered as a charity in Nigeria, enabling formal disability-support programmes nationwide.",
	},
	{
		year: "2022",
		milestone:
			"Inclusive Church Training programme rolled out across Nigeria to help congregations create welcoming, accessible worship.",
	},
	{
		year: "2023",
		milestone: "Registered as a charity in the United Kingdom, strengthening accountability and UK partnerships.",
	},
	{
		year: "2023",
		milestone: "Project Me launched in Bromley to help parent carers thrive, not just survive.",
	},
	{
		year: "2025",
		milestone:
			"Groundbreaking begins for OAK Centre Prime in Oolo Town, Ogbomoso, Oyo State, Nigeria.",
	},
];

export const featuredPosts = [
	{
		title: "From Surviving to Living: A Free Webinar for Parent Carers",
		date: "February 20, 2026",
		href: "/blog/from-surviving-to-living",
		excerpt:
			"For many parent carers, life feels like survival. This free webinar is a roadmap to healing, clarity, and strength.",
	},
	{
		title: "Burnout Is Not Failure: A Letter to Every Parent Carer",
		date: "February 16, 2026",
		href: "/blog/burnout-is-not-failure",
		excerpt:
			"You didn't burn out because you are weak. You burned out because you have been carrying more than most people can see.",
	},
	{
		title: "Disability Does Not Limit Kindness",
		date: "February 12, 2026",
		href: "/blog/disability-does-not-limit-kindness",
		excerpt:
			"A boy with cerebral palsy stood so a mother carrying her baby could sit. Behind children like him are parent carers raising world-changers.",
	},
	{
		title: "Three New Trustees for OAKonsult Disabilities Outreach",
		date: "August 1, 2025",
		href: "https://oakonsult.org/three-new-trustees-for-oakonsult-disabilities-outreach/",
		excerpt:
			"We welcome Lucky Aigbefoh, Hadiza Daura, and Rev. Ajisola Adeloye to our Board of Trustees.",
	},
	{
		title: "Why Children with Disabilities in Nigeria Are Being Left Behind",
		date: "April 9, 2025",
		href: "https://oakonsult.org/why-children-with-disabilities-in-nigeria-are-being-left-behind/",
		excerpt:
			"Millions of children face exclusion from education, healthcare, and community life. Here's what we're doing about it.",
	},
	{
		title: "A Legacy of Hope: Help Us Build OAK Centre Prime in Memory of Abigail",
		date: "April 9, 2025",
		href: "https://oakonsult.org/a-legacy-of-hope-help-us-build-oak-centre-prime-in-memory-of-abigail/",
		excerpt:
			"Nigeria's first holistic disability campus is being built in loving memory of Abigail Adeloye.",
	},
];

export const values = ["Faith", "Joy", "Resilience", "Kindness", "Friendship"];

export const governanceTeam = [
	{
		slug: "olufunke-adeloye",
		name: "Olufunke Adeloye",
		role: "Chief Responsibility Officer",
		profile:
			"Olufunke leads OAKonsult's strategy and mission delivery, championing practical and faith-rooted support for families raising children with disabilities.",
		image: "/media/wp/2025/07/picture5_1587x2245_noedges.jpg",
	},
	{
		slug: "ajisola-adeloye",
		name: "Ajisola Adeloye",
		role: "Co-Founder & Trustee, United Kingdom",
		profile:
			"Ajisola co-founded OAKonsult and supports governance, teaching, and partnership development across UK and Nigeria operations.",
		image: "/media/wp/2025/08/Revd-Aji.jpg",
	},
	{
		slug: "itunuade-iyun",
		name: "Itunuade Iyun",
		role: "Country Director, Nigeria",
		profile:
			"Itunuade oversees programme delivery in Nigeria, coordinating local teams, partnerships, and community-facing disability inclusion initiatives.",
		image: "/media/wp/2022/11/2.png",
	},
	{
		slug: "hadiza-daura",
		name: "Hadiza Daura",
		role: "Trustee, United Kingdom",
		profile:
			"Hadiza provides trustee oversight with a focus on organisational stewardship, accountability, and long-term impact.",
		image: "/media/wp/2025/08/Ms-Hadiza-Daura-1587x2245-1.jpg",
	},
	{
		slug: "esther-kehinde",
		name: "Esther Kehinde",
		role: "Trustee, Nigeria",
		profile:
			"Esther supports trustee governance and contributes to strengthening inclusive support systems for families in Nigeria.",
		image: "/media/wp/2022/11/Oak-images-potrait-2.png",
	},
	{
		slug: "funmilola-oshin",
		name: "Funmilola Oshin",
		role: "Trustee, Nigeria",
		profile:
			"Funmilola helps guide governance decisions and supports OAKonsult's social impact priorities in Nigeria.",
		image: "/media/wp/2022/11/3.png",
	},
	{
		slug: "lucky-aigbefoh",
		name: "Lucky Aigbefoh",
		role: "Trustee, United Kingdom",
		profile:
			"Lucky contributes strategic trustee leadership to strengthen governance and sustainable growth for OAKonsult.",
		image: "/media/wp/2025/08/Mr.-Lucky-Aigbefoh.jpg",
	},
	{
		slug: "bunmi-soji-adeyemo",
		name: "Bunmi Soji Adeyemo",
		role: "Trustee, United Kingdom",
		profile:
			"Bunmi provides trustee-level support on people, policy, and organisational effectiveness.",
		image: "/media/wp/2025/07/picture_1587x2245.jpg",
	},
	{
		slug: "bolanle-ajayi",
		name: "Bolanle Ajayi",
		role: "Trustee, United Kingdom & HR",
		profile:
			"Bolanle supports governance and human-resource direction to ensure resilient teams and quality service delivery.",
		image: "/media/wp/2025/07/picture2_1587x2245.jpg",
	},
	{
		slug: "dayo-balogun",
		name: "Dayo Balogun",
		role: "Volunteer Manager",
		profile:
			"Dayo coordinates volunteer recruitment and engagement, connecting community capacity with family support needs.",
		image: "/media/wp/2022/11/7.png",
	},
	{
		slug: "omobola-oludele",
		name: "Omobola Oludele",
		role: "Learning & Development Manager",
		profile:
			"Omobola leads learning and development programmes that equip carers, partners, and communities with practical inclusion skills.",
		image: "/media/wp/2025/07/picture3_1587x2245.jpg",
	},
	{
		slug: "boluwatife-kehinde",
		name: "Boluwatife Kehinde",
		role: "Head of Administration",
		profile:
			"Boluwatife manages core operations and administration to keep programme delivery reliable and responsive.",
		image: "/media/wp/2025/07/picture4_1587x2245.jpg",
	},
	{
		slug: "rev-samuel-ajayi",
		name: "Rev. Samuel Ajayi",
		role: "OAK Centre Advisory Board Member",
		profile:
			"Rev. Samuel serves on the OAK Centre advisory board, offering guidance on leadership, inclusion, and faith-community engagement.",
		image: "/media/wp/2025/08/Rev-Samuel-Ajayi-_1587x2245.jpg",
	},
	{
		slug: "amb-eunice-eraye-unokhua",
		name: "Amb. Eunice Eraye Unokhua",
		role: "OAK Centre Advisory Board Member",
		profile:
			"Amb. Eunice serves on the OAK Centre advisory board, supporting partnerships and long-term institutional impact.",
		image: "/media/wp/2025/08/AMB-EUNICE-ERAYE-UNOKHUA_1587x2245.jpg",
	},
	{
		slug: "price-deji-irawo",
		name: "Price Deji Irawo",
		role: "OAK Centre Advisory Board Member",
		profile:
			"Price Deji Irawo contributes advisory leadership for OAK Centre Prime and strategic community mobilisation.",
		image: "/media/wp/2025/08/PRINCE-DEJI-IRAWO_1587x2245.jpg",
	},
	{
		slug: "dr-olugbenga-owoeye",
		name: "Dr Olugbenga Owoeye",
		role: "OAK Centre Advisory Board Member",
		profile:
			"Dr Owoeye offers advisory expertise supporting OAK Centre Prime's health, care, and programme vision.",
		image: "/media/wp/2025/10/Advisory_Board_Member_Dr-Owoeye.jpg",
	},
];

export const widerLeadershipNames = governanceTeam.map((member) => member.name);

export const partnerGroups = [
	{
		name: "To-Omo-Re School, Ilorin",
		logo: "/media/wp/2025/06/To-Omo-Re-School-Ilorin-FILEminimizer.png",
	},
	{
		name: "Pure Souls Learning Centre",
		logo: "/media/wp/2025/06/Puresouls-FILEminimizer.jpg",
	},
	{
		name: "PSLC",
		logo: "/media/wp/2025/06/PSLC-FILEminimizer.jpg",
	},
	{
		name: "Nigeria Baptist Theological Seminary, Ogbomoso",
		logo: "/media/wp/2025/06/Nigeria-Baptist-Theological-Seminary-Ogbomoso-FILEminimizer.jpg",
	},
	{
		name: "Methodist Theological Institute, Sagamu",
		logo: "/media/wp/2025/06/Methodist-Theological-Institute-Sagamu-FILEminimizer.jpg",
	},
	{
		name: "Marigold Special School, Lagos",
		logo: "/media/wp/2025/06/Marigold-Special-School-Lagos-FILEminimizer.jpg",
	},
	{
		name: "Jesus Kids, Ibadan",
		logo: "/media/wp/2025/06/Jesus-Kids-Ibadan-FILEminimizer.jpg",
	},
	{
		name: "Cerebral Palsy Center",
		logo: "/media/wp/2025/06/Cerebral-Palsy-Center-FILEminimizer.png",
	},
	{
		name: "Just Now",
		logo: "/media/wp/2025/06/just-now-logo.png",
	},
];

export const socialLinks = [
	{ label: "Instagram", href: "https://www.instagram.com/oakonsult/", icon: "instagram" },
	{ label: "YouTube", href: "https://www.youtube.com/@ThePrayingCarerChannel", icon: "youtube" },
	{ label: "Facebook", href: "https://www.facebook.com/oakonsult", icon: "facebook" },
	{ label: "LinkedIn", href: "https://www.linkedin.com/company/oakonsult", icon: "linkedin" },
];

export const testimonials = [
	{
		quote: "OAKonsult gave me a community where I finally felt understood. The coaching helped me see that I'm not just a carer — I'm a person with my own needs and dreams.",
		name: "Amy",
		location: "Bromley, UK",
		context: "Parent Carer",
	},
	{
		quote: "The inclusive training transformed how our church welcomes families with disabilities. We went from good intentions to real, practical inclusion.",
		name: "Clement",
		location: "Ibadan, Nigeria",
		context: "Church Leader",
	},
	{
		quote: "Project ME helped me rediscover my identity beyond caregiving. The workshops gave me tools I use every single day.",
		name: "Sarah",
		location: "London, UK",
		context: "Project ME Participant",
	},
];

export const contact = {
	email: "info@oakonsult.org",
	phones: ["+44 (0) 7479 436 823", "+234 814 683 4903"],
	ukAddress: [
		"OAKonsult Disabilities Outreach",
		"Church House, Rushet Road",
		"Orpington, Kent BR5 2PT, UK",
	],
	ngAddress: [
		"OAK Centre, Oolo Town",
		"Along Oyo/Ogbomoso Expressway, Oriire LGA",
		"Ogbomoso, Oyo State, Nigeria",
	],
	charityNumber: "1204553",
};
