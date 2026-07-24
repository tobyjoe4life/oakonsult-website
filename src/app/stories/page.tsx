import { siteContent } from "@/lib/content";
import Link from "next/link";

export default function Stories() {
  return (
    <>
      <section className="page-title shell">
        <p className="eyebrow dark">Stories and reflections</p>
        <h1>Making room for honest experience.</h1>
        <p>Thoughts on parent carer wellbeing, disability inclusion and the power of community.</p>
      </section>
      <section className="section cream-section">
        <div className="shell story-list">
          {siteContent.stories.map((story, index) => (
            <article key={story.title}>
              <span>0{index + 1} / {story.tag}</span>
              <h2>{story.title}</h2>
              <p>{story.summary}</p>
              <Link href="/contact">Talk to us about this topic <span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
