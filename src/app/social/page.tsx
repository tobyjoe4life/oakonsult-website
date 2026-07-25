import Link from "next/link";

const socialChannels = [
  { name: "YouTube", href: "https://www.youtube.com/@ThePrayingCarerChannel", text: "Stories, worship, webinars, disability awareness and parent-carer encouragement on The Praying Carer Channel." },
  { name: "Facebook", href: "https://www.facebook.com/oakonsultdisabilitiesoutreach", text: "Community updates, programme news, practical encouragement and event highlights." },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/oakonsult-disabilities-outreach/", text: "Professional updates, partnerships, impact learning and disability-inclusion thought leadership." },
];

export default function Page() {
  return <div className="oak-home editorial-page interior-v5">
      <section className="interior-hero social-hero" aria-labelledby="social-title">
        <div className="interior-hero-copy">
          <nav className="editorial-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Social media</span></nav>
          <p className="oak-kicker">Stories, updates and community</p>
          <h1 id="social-title">Follow the work beyond the website</h1>
          <p>OAKonsult’s social channels carry programme moments, parent-carer encouragement, disability awareness, faith-sensitive reflection and public updates.</p>
        </div>
        <div className="social-hero-colour" aria-hidden="true"><span>1M+</span><small>social impressions reported across OAKonsult channels in 2026</small></div>
      </section>

      <section className="interior-flow social-flow" aria-labelledby="social-channels-title">
        <div className="interior-flow-heading">
          <p className="oak-kicker dark">Official channels</p>
          <h2 id="social-channels-title">Choose the platform that works for you.</h2>
          <p>These are OAKonsult’s official channels. Social platforms set their own cookie, account and accessibility policies.</p>
        </div>
        <div className="interior-list">
          {socialChannels.map((channel, index) => <article key={channel.name}>
            <span className="interior-index">0{index + 1}</span><h3>{channel.name}</h3><p>{channel.text}</p>
            <a href={channel.href} target="_blank" rel="noreferrer">Visit {channel.name} <span aria-hidden="true">↗</span></a>
          </article>)}
        </div>
      </section>

      <section className="social-video-section" aria-labelledby="social-video-title">
        <div className="shell"><p className="oak-kicker dark">Watch the story</p><h2 id="social-video-title">From a Whisper to a Movement</h2><p className="social-video-intro">A three-minute founding-story film from The Praying Carer Channel, followed by the OAKonsult rally held for Abigail and every child.</p>
          <div className="social-video-grid">
            <article><div className="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/8p--mGxHwTM" title="From a Whisper to a Movement by OAKonsult" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div><h3>From a Whisper to a Movement</h3><p>How one mother’s quiet question became a wider commitment to families.</p></article>
            <article><div className="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/bunpgVNwucQ" title="OAKonsult Rally" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div><h3>OAKonsult Rally</h3><p>Walking with purpose: for Abigail and for every child.</p></article>
          </div>
        </div>
      </section>
    </div>;
}
