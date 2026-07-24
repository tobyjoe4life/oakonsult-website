import { z } from "zod";

const donationBaseSchema = z.object({
  frequency: z.enum(["one-time", "monthly"]),
  currency: z.enum(["GBP", "NGN"]),
  amount: z.coerce.number().finite().positive(),
  purpose: z.enum(["general", "project-me", "oak-centre", "community-outreach"]),
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().toLowerCase().email().max(254),
  message: z.string().trim().max(500).optional().default(""),
  anonymous: z.boolean().default(false),
  giftAid: z.boolean().default(false),
  privacy: z.literal(true),
  marketing: z.boolean().default(false),
  website: z.string().max(0),
});

export const donationSchema = donationBaseSchema.superRefine((value, context) => {
  const maximum = value.currency === "GBP" ? 100_000 : 100_000_000;
  if (value.amount > maximum) {
    context.addIssue({
      code: "custom",
      path: ["amount"],
      message: `The maximum ${value.currency} donation supported online is ${maximum.toLocaleString()}.`,
    });
  }

  if (value.giftAid && value.currency !== "GBP") {
    context.addIssue({
      code: "custom",
      path: ["giftAid"],
      message: "Gift Aid is available only for eligible GBP donations.",
    });
  }
});

export type DonationRequest = z.infer<typeof donationSchema>;

export const contactSchema = z.object({
  enquiryType: z.enum([
    "parent-carer support",
    "professional/referral",
    "programme",
    "partnership/funding",
    "volunteering",
    "media/other",
  ]),
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().toLowerCase().email().max(254),
  phone: z.string().trim().max(30).optional().default(""),
  organisation: z.string().trim().max(120).optional().default(""),
  region: z.enum(["United Kingdom", "Nigeria", "Elsewhere / online"]),
  message: z.string().trim().min(10).max(3_000),
  preferredContact: z.enum(["email", "phone"]),
  privacy: z.literal(true),
  marketing: z.boolean().default(false),
  website: z.string().max(0),
});

export type ContactRequest = z.infer<typeof contactSchema>;
