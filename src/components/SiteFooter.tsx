import Link from "next/link";

const groups = [
  { title: "Support", links: [["Find support", "/find-support"], ["Contact us", "/contact"], ["Safeguarding", "/contact"]] },
  { title: "Our work", links: [["What we do", "/what-we-do"], ["UK", "/uk"], ["Nigeria", "/nigeria"], ["Stories", "/stories"]] },
  { title: "Take part", links: [["Get involved", "/get-involved"], ["Donate", "/donate"], ["About us", "/about"]] },
  { title: "Information", links: [["Governance", "/about"], ["Privacy", "/privacy"], ["Accessibility", "/accessibility"]] },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-lead">
        <div>
          <p className="eyebrow">A stronger circle of support</p>
          <h2>Stay close to the work</h2>
        </div>
        <Link className="button button-gold" href="/contact">Keep in touch</Link>
      </div>
      <div className="shell footer-grid">
        <div className="footer-brand">
          <strong>OAKonsult</strong>
          <p>Supporting parent carers and advancing disability inclusion through practical, community-rooted work.</p>
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
        <div><strong>United Kingdom</strong><span>Parent-carer support, programmes and online connection</span></div>
        <div><strong>Nigeria</strong><span>Community outreach and partnerships</span></div>
      </div>
      <div className="shell footer-bottom">
        <span>&copy; {new Date().getFullYear()} OAKonsult Disabilities Outreach</span>
        <span>Living life abundantly</span>
      </div>
    </footer>
  );
}
