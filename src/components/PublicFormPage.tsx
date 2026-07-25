import Image from "next/image";
import { PublicInterestForm } from "@/components/PublicInterestForm";
import type { PublicFormDefinition } from "@/lib/public-form-definitions";

export function PublicFormPage({
  definition,
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  children,
}: {
  definition: PublicFormDefinition;
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  children?: React.ReactNode;
}) {
  return (
      <div className="oak-home editorial-page interior-v5">
        <section className="interior-hero">
          <div className="interior-hero-copy">
              <p className="oak-kicker">{eyebrow}</p>
              <h1>{title}</h1>
              <p>{intro}</p>
          </div>
          <div className="interior-hero-image">
              <Image src={image} alt={imageAlt} fill sizes="(max-width: 800px) 100vw, 54vw" />
          </div>
        </section>
        {children}
        <section className="form-section">
          <div className="shell form-layout">
            <div>
              <p className="oak-kicker">Secure, consent-led contact</p>
              <h2>{definition.title}</h2>
              <p>{definition.intro}</p>
              <p className="field-help">Do not use this form for emergencies. OAKonsult does not provide emergency, medical or crisis services.</p>
            </div>
            <PublicInterestForm definition={definition} />
          </div>
        </section>
      </div>
  );
}
