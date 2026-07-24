import Image from "next/image";
import Link from "next/link";

export type PageData = {
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  items: { title: string; text: string }[];
  cta: string;
  ctaHref: string;
};

export function InteriorPage({ data }: { data: PageData }) {
  return (
    <>
      <section className="interior-hero shell">
        <div>
          <p className="eyebrow dark">{data.eyebrow}</p>
          <h1>{data.title}</h1>
          <p>{data.intro}</p>
          <Link className="button" href={data.ctaHref}>{data.cta}</Link>
        </div>
        <div className="interior-image">
          <Image src={data.image} alt={data.imageAlt} fill priority sizes="(max-width: 800px) 100vw, 45vw" />
        </div>
      </section>
      <section className="section cream-section">
        <div className="shell">
          <div className="section-heading">
            <div><p className="eyebrow dark">How we can help</p><h2>Practical routes forward.</h2></div>
          </div>
          <div className="info-grid">
            {data.items.map((item, index) => (
              <article key={item.title}>
                <span>0{index + 1}</span>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="simple-cta shell">
        <h2>Not sure which route is right?</h2>
        <p>Tell us a little about what you need and we will help you find the most suitable next step.</p>
        <Link className="text-link" href="/contact">Start a conversation <span aria-hidden="true">→</span></Link>
      </section>
    </>
  );
}
