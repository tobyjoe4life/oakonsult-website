import type { ContentSource, SiteContent } from "./types";

export const siteContent: SiteContent = {
  navigation: [
    { label: "Find support", href: "/find-support" },
    { label: "What we do", href: "/what-we-do" },
    { label: "Where we work", href: "/uk" },
    { label: "Stories", href: "/stories" },
    { label: "Get involved", href: "/get-involved" },
    { label: "About us", href: "/about" },
  ],
  impact: [
    {
      value: "36",
      label: "parent carers supported through Project ME",
      source: "Project ME programme records",
      period: "To 18 May 2026",
    },
    {
      value: "95%",
      label: "reported improved mental wellbeing",
      source: "Project ME participant feedback",
      period: "To 18 May 2026",
    },
    {
      value: "100+",
      label: "children and young people received free medical care",
      source: "OAKonsult Nigeria outreach records",
      period: "January to June 2026",
    },
  ],
  stories: [
    { tag: "Parent carer wellbeing", title: "From surviving to living", summary: "Why parent carers need spaces for their own wellbeing, connection and growth." },
    { tag: "Community", title: "Disability does not limit kindness", summary: "A reflection on inclusion, dignity and what stronger communities make possible." },
    { tag: "Wellbeing", title: "Burnout is not failure", summary: "Recognising pressure and making room for parent carers to pause and be supported." },
  ],
  partners: [
    "The National Lottery Community Fund",
    "Bromley Council",
    "Just Sow",
    "The Big Give",
    "Bishop Radford Trust",
    "The Albert Hunt Trust",
    "Christ Church Orpington",
    "Mayor of London",
  ],
};

export const localContentSource: ContentSource = {
  async getSiteContent() {
    return siteContent;
  },
};
