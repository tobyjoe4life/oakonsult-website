import { PublicFormPage } from "@/components/PublicFormPage";
import { publicFormDefinitions } from "@/lib/public-form-definitions";

export default function Page() {
  return <PublicFormPage
    definition={publicFormDefinitions["zumba-registration"]}
    eyebrow="Project ME / Parent-carer wellbeing"
    title="Free Zumba for parent carers"
    intro="A warm, inclusive space in Bromley to move, recharge and connect with other parent carers. Registration is required."
    image="/images/sharepoint/zumba-action.webp"
    imageAlt="Parent carers taking part in a Zumba wellbeing session"
  >
    <section className="interior-section surface-lime"><div className="shell interior-split"><div><p className="oak-kicker">Choose a session</p><h2>Daytime or evening movement and connection.</h2></div><div className="interior-copy"><h3>Third Mondays</h3><p>6:30 pm to 7:30 pm.</p><h3>Fourth Fridays</h3><p>12:00 pm to 1:00 pm.</p><p>Places and dates can change. OAKonsult will confirm the venue and your place before you travel.</p><a className="oak-text-link" href="/zumba-wellbeing">Already attending? Complete the wellbeing check-in →</a></div></div></section>
  </PublicFormPage>;
}
