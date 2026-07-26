import Link from "next/link";
import { HomeMotion } from "@/components/HomeMotion";

export type UtilityPageData = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: { title: string; paragraphs: string[] }[];
  ctaTitle: string;
  ctaText: string;
  ctaHref: string;
  ctaLabel: string;
};

export function UtilityPage({ data }: { data: UtilityPageData }) {
  return <article className="oak-home editorial-page utility-page">
    <HomeMotion />
    <header className="utility-masthead">
      <div className="utility-masthead-copy" data-reveal>
        <nav className="editorial-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">{data.eyebrow}</span>
        </nav>
        <p className="oak-kicker">{data.eyebrow}</p>
        <h1>{data.title}</h1>
        <p>{data.intro}</p>
      </div>
      <div className="utility-mark" aria-hidden="true">
        <span /><span /><span /><b>OAK</b>
      </div>
    </header>
    <div className="utility-body">
      <aside className="utility-index" data-reveal>
        <strong>On this page</strong>
        {data.sections.map((section, index) => <a href={`#utility-${index + 1}`} key={section.title}>{section.title}</a>)}
      </aside>
      <div className="utility-sections">
        {data.sections.map((section, index) => <section id={`utility-${index + 1}`} key={section.title} data-reveal>
          <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <div><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </section>)}
      </div>
    </div>
    <section className="editorial-action-band">
      <div data-reveal><p className="oak-kicker">Next step</p><h2>{data.ctaTitle}</h2><p>{data.ctaText}</p></div>
      <div className="editorial-route-links light-links" data-reveal><Link href={data.ctaHref}>{data.ctaLabel} <span aria-hidden="true">→</span></Link></div>
    </section>
  </article>;
}
