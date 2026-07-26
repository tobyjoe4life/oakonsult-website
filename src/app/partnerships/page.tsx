import { PublicFormPage } from "@/components/PublicFormPage";
import { publicFormDefinitions } from "@/lib/public-form-definitions";

export default function Page() {
  return <PublicFormPage
    definition={publicFormDefinitions["partnership-referral"]}
    eyebrow="Partnerships and referrals"
    mood="clay"
    title="Work with OAKonsult"
    intro="Schools, churches, charities, community groups and local services can explore partnership or refer a parent carer with consent."
    image="/images/sharepoint/project-me-workshop.webp"
    imageAlt="An OAKonsult partnership and community workshop"
  />;
}
