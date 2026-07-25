import { PublicFormPage } from "@/components/PublicFormPage";
import { publicFormDefinitions } from "@/lib/public-form-definitions";

export default function Page() {
  return <PublicFormPage
    definition={publicFormDefinitions.volunteer}
    eyebrow="Get involved"
    title="Volunteer with OAKonsult"
    intro="Offer time, skills or lived experience to help families, programmes and community outreach in the UK or Nigeria."
    image="/images/current-site-community-partnership.webp"
    imageAlt="OAKonsult volunteers and community partners together"
  />;
}
