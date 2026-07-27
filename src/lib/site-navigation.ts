export type SiteLink = {
  label: string;
  href: string;
};

export type JourneyGroup = {
  title: string;
  desktopLabel: string;
  href: string;
  activeRoutes: readonly string[];
  menuLinks: readonly SiteLink[];
  footerLinks: readonly SiteLink[];
};

export const journeyGroups = [
  {
    title: "Get support",
    desktopLabel: "Get support",
    href: "/find-support",
    activeRoutes: [
      "/find-support",
      "/programmes/project-me",
      "/programmes/parent-carer-support",
      "/zumba-class",
      "/zumba-wellbeing",
    ],
    menuLinks: [
      { label: "Find support", href: "/find-support" },
      { label: "Project ME", href: "/programmes/project-me" },
      { label: "Parent-carer support", href: "/programmes/parent-carer-support" },
    ],
    footerLinks: [
      { label: "Find support", href: "/find-support" },
      { label: "Project ME", href: "/programmes/project-me" },
      { label: "Parent-carer support", href: "/programmes/parent-carer-support" },
      { label: "Zumba class", href: "/zumba-class" },
    ],
  },
  {
    title: "Give support",
    desktopLabel: "Give support",
    href: "/get-involved",
    activeRoutes: ["/donate", "/get-involved", "/volunteer-opportunities"],
    menuLinks: [
      { label: "Donate", href: "/donate" },
      { label: "Get involved", href: "/get-involved" },
      { label: "Volunteer", href: "/volunteer-opportunities" },
    ],
    footerLinks: [
      { label: "Donate", href: "/donate" },
      { label: "Get involved", href: "/get-involved" },
      { label: "Volunteer", href: "/volunteer-opportunities" },
    ],
  },
  {
    title: "Our work and impact",
    desktopLabel: "Our work & impact",
    href: "/what-we-do",
    activeRoutes: [
      "/what-we-do",
      "/programmes/support-for-churches",
      "/programmes/oak-centre-prime",
      "/stories",
      "/impact",
      "/events",
      "/media-gallery",
      "/social",
      "/funders-partners",
    ],
    menuLinks: [
      { label: "What we do", href: "/what-we-do" },
      { label: "Stories", href: "/stories" },
      { label: "Impact", href: "/impact" },
      { label: "Events", href: "/events" },
      { label: "Media gallery", href: "/media-gallery" },
      { label: "Social media", href: "/social" },
      { label: "Funders & partners", href: "/funders-partners" },
    ],
    footerLinks: [
      { label: "What we do", href: "/what-we-do" },
      { label: "Support for churches", href: "/programmes/support-for-churches" },
      { label: "OAK Centre Prime", href: "/programmes/oak-centre-prime" },
      { label: "Stories & impact", href: "/impact" },
      { label: "Events", href: "/events" },
      { label: "Media gallery", href: "/media-gallery" },
      { label: "UK gallery", href: "/media-gallery/uk" },
      { label: "Nigeria gallery", href: "/media-gallery/nigeria" },
      { label: "Social media", href: "/social" },
      { label: "Funders & partners", href: "/funders-partners" },
    ],
  },
  {
    title: "About OAKonsult",
    desktopLabel: "About OAKonsult",
    href: "/about",
    activeRoutes: ["/about", "/our-story", "/abigail", "/history", "/our-team", "/vision-mission"],
    menuLinks: [
      { label: "About us", href: "/about" },
      { label: "Our story", href: "/our-story" },
      { label: "Abigail’s tribute", href: "/abigail" },
      { label: "Our team", href: "/our-team" },
      { label: "History", href: "/history" },
      { label: "Vision & mission", href: "/vision-mission" },
    ],
    footerLinks: [
      { label: "About us", href: "/about" },
      { label: "Our story", href: "/our-story" },
      { label: "Abigail’s tribute", href: "/abigail" },
      { label: "Our team", href: "/our-team" },
      { label: "History", href: "/history" },
      { label: "Vision & mission", href: "/vision-mission" },
    ],
  },
  {
    title: "Work with us",
    desktopLabel: "Work with us",
    href: "/partnerships",
    activeRoutes: ["/partnerships", "/contact"],
    menuLinks: [
      { label: "Partnerships and referrals", href: "/partnerships" },
      { label: "Contact us", href: "/contact" },
    ],
    footerLinks: [
      { label: "Partner with us", href: "/partnerships" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const satisfies readonly JourneyGroup[];

export const isRouteActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

export const isJourneyActive = (pathname: string, journey: JourneyGroup) =>
  journey.activeRoutes.some((route) => isRouteActive(pathname, route));

export const getPrimaryJourneyTitle = (pathname: string) =>
  journeyGroups.find((journey) => isJourneyActive(pathname, journey))?.title ?? null;
