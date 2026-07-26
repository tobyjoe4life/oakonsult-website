import { PublicFormPage } from "@/components/PublicFormPage";
import { publicFormDefinitions } from "@/lib/public-form-definitions";

export default function Page() {
  return <PublicFormPage
    definition={publicFormDefinitions["zumba-wellbeing"]}
    eyebrow="Project ME / Evaluation"
    mood="wellbeing"
    title="Zumba wellbeing check-in"
    intro="Tell us how you are feeling so we can understand what is helping and improve the parent-carer wellbeing group."
    image="/images/sharepoint/zumba-group.webp"
    imageAlt="Parent carers together at an OAKonsult Zumba wellbeing session"
  />;
}
