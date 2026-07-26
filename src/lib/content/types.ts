export type NavItem = { label: string; href: string };
export type Story = { title: string; summary: string; tag: string };
export type SiteContent = {
  navigation: NavItem[];
  impact: { value: string; label: string; source: string; period: string }[];
  stories: Story[];
  partners: string[];
};
export interface ContentSource { getSiteContent(): Promise<SiteContent>; }
