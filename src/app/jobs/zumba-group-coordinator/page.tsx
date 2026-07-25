import { PublicFormPage } from "@/components/PublicFormPage";
import { publicFormDefinitions } from "@/lib/public-form-definitions";

export default function Page() {
  return <PublicFormPage
    definition={publicFormDefinitions["job-application"]}
    eyebrow="Jobs and opportunities"
    title="Zumba Group Coordinator"
    intro="Help the Parent Carer Zumba Wellbeing Group run smoothly. Check with OAKonsult that this opportunity remains open before applying."
    image="/images/sharepoint/zumba-group-mobile.webp"
    imageAlt="OAKonsult parent-carer Zumba group"
  />;
}
