import Image from "next/image";
import Link from "next/link";

const groups = [
  {
    title: "Support and programmes",
    links: [["Find support", "/find-support"], ["Project ME", "/programmes/project-me"], ["Parent-carer support", "/programmes/parent-carer-support"], ["Support for churches", "/programmes/support-for-churches"], ["OAK Centre Prime", "/programmes/oak-centre-prime"]],
  },
  {
    title: "Stories and activity",
    links: [["Our story", "/our-story"], ["Abigail’s tribute", "/abigail"], ["Stories & impact", "/impact"], ["Social media", "/social"], ["Media gallery", "/media-gallery"], ["Events", "/events"]],
  },
  {
    title: "Where we work",
    links: [["OAKonsult UK", "/uk"], ["UK gallery", "/media-gallery/uk"], ["OAKonsult Nigeria", "/nigeria"], ["Nigeria gallery", "/media-gallery/nigeria"]],
  },
  {
    title: "Take part",
    links: [["Get involved", "/get-involved"], ["Volunteer", "/volunteer-opportunities"], ["Zumba", "/zumba-class"], ["Donate", "/donate"], ["Funders & partners", "/funders-partners"], ["Contact", "/contact"], ["About us", "/about"], ["History", "/history"], ["Privacy", "/privacy"], ["Accessibility", "/accessibility"]],
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer footer-v4">
      <div className="footer-v4-rings" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="shell footer-lead">
        <div>
          <p className="eyebrow">A stronger circle of support</p>
          <h2>Stay close to the work.</h2>
        </div>
        <Link className="button button-gold" href="/contact">Keep in touch</Link>
      </div>
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link className="footer-v4-logo" href="/" aria-label="OAKonsult home"><Image src="/logos/oakonsult-logo.png" width={142} height={108} alt="" loading="eager" /></Link>
          <p>One OAKonsult, supporting parent carers and advancing disability inclusion through practical, community-rooted work.</p>
          <p>Registered charity in England and Wales, 1204553.</p>
        </div>
        {groups.map((group) => (
          <div key={group.title}>
            <h3>{group.title}</h3>
            {group.links.map(([label, href]) => <Link key={`${href}-${label}`} href={href}>{label}</Link>)}
          </div>
        ))}
      </div>
      <div className="shell region-footer">
        <Link href="/uk"><span>UK hub</span><strong>OAKonsult UK</strong><small>Parent-carer programmes, UK funders and support →</small></Link>
        <Link href="/nigeria"><span>Nigeria hub</span><strong>OAKonsult Nigeria</strong><small>Community outreach, local funders and the planned OAK Centre Prime →</small></Link>
      </div>
      <div className="shell footer-bottom">
        <span>&copy; {new Date().getFullYear()} OAKonsult Disabilities Outreach</span>
        <span>One purpose, with country-specific programmes and funding</span>
      </div>
    </footer>
  );
}
