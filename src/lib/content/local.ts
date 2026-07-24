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
    { value: "250+", label: "parent carers supported" },
    { value: "95%", label: "reported improved wellbeing" },
    { value: "75%", label: "reported increased confidence" },
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
