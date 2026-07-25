import { PublicFormPage } from "@/components/PublicFormPage";
import { publicFormDefinitions } from "@/lib/public-form-definitions";

export default function Page() {
  return <PublicFormPage
    definition={publicFormDefinitions["project-me-interest"]}
    eyebrow="Project ME"
    title="Express interest in Project ME"
    intro="Ask about a future parent-carer wellbeing and resilience cohort or organisational delivery."
    image="/images/gallery/uk-project-me-session.webp"
    imageAlt="Parent carers participating in a Project ME session"
  />;
}
