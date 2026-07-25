export type GalleryRegion = "UK" | "Nigeria";

export type GalleryItem = {
  slug: string;
  region: GalleryRegion;
  src: string;
  alt: string;
  title: string;
  context: string;
  theme: string;
};

export const galleryItems: GalleryItem[] = [
  {
    slug: "uk-project-me-session",
    region: "UK",
    src: "/images/gallery/uk-project-me-session.webp",
    alt: "Parent carers taking part in a Project ME session",
    title: "Project ME in community",
    context: "Parent carers taking part in a facilitated Project ME session.",
    theme: "Project ME",
  },
  {
    slug: "uk-project-me-group",
    region: "UK",
    src: "/images/gallery/uk-project-me-group.webp",
    alt: "A group presentation during an OAKonsult Project ME event",
    title: "Recognising shared progress",
    context: "A Project ME event marking the group’s progress.",
    theme: "Community",
  },

  {
    slug: "uk-parent-carer-community",
    region: "UK",
    src: "/images/gallery/uk-parent-carer-community.webp",
    alt: "Parent carers connecting during an OAKonsult community activity",
    title: "Connection around the table",
    context: "Parent carers meeting and talking during a community activity.",
    theme: "Parent carers",
  },
  {
    slug: "nigeria-knowledge-radio",
    region: "Nigeria",
    src: "/images/gallery/nigeria-knowledge-radio.webp",
    alt: "OAKonsult disability-awareness engagement at Knowledge Radio",
    title: "Taking inclusion into public conversation",
    context: "An OAKonsult discussion about disability inclusion on Knowledge Radio.",
    theme: "Public awareness",
  },
  {
    slug: "nigeria-press-conference",
    region: "Nigeria",
    src: "/images/gallery/nigeria-press-conference.webp",
    alt: "OAKonsult representatives at a public press conference",
    title: "Building awareness together",
    context: "OAKonsult representatives and partners at a public press event.",
    theme: "Advocacy",
  },
  {
    slug: "nigeria-oolo-palace",
    region: "Nigeria",
    src: "/images/gallery/nigeria-oolo-palace.webp",
    alt: "OAKonsult representatives during a community engagement visit to Oolo Palace",
    title: "Community-rooted relationships",
    context: "OAKonsult meeting local leaders during a community visit.",
    theme: "Community engagement",
  },
  {
    slug: "nigeria-community-outreach",
    region: "Nigeria",
    src: "/images/current-site-community-partnership.webp",
    alt: "Five adults together at an indoor community event with information displays behind them",
    title: "Here to help in community spaces",
    context: "OAKonsult representatives at an indoor community event.",
    theme: "Outreach",
  },
  {
    slug: "nigeria-tv-advocacy",
    region: "Nigeria",
    src: "/images/current-site-tv-advocacy.webp",
    alt: "Two adults in conversation during a television studio interview",
    title: "Inclusion in public conversation",
    context: "A television interview about disability inclusion and family support.",
    theme: "Public awareness",
  },
];

export const homepageGallery = [
  galleryItems[0],
  galleryItems[1],
  galleryItems[2],
  galleryItems[3],
  galleryItems[4],
  galleryItems[5],
];
