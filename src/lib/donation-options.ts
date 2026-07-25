export const donationPurposeLabels = {
  general: "Where it is needed most",
  "parent-carer": "Parent-carer support",
  "project-me": "Project ME",
  "oak-centre": "OAK Centre Prime",
  "community-outreach": "Community outreach",
} as const;

export type DonationPurpose = keyof typeof donationPurposeLabels;

export function normaliseDonationPurpose(value: string | null | undefined): DonationPurpose {
  if (value && Object.hasOwn(donationPurposeLabels, value)) return value as DonationPurpose;
  return "general";
}
