import Image from "next/image";
import Link from "next/link";

const groups = [
  { title: "Support", links: [["Find support", "/find-support"], ["Contact us", "/contact"], ["Safeguarding", "/contact"]] },
  { title: "Our work", links: [["What we do", "/what-we-do"], ["UK", "/uk"], ["Nigeria", "/nigeria"], ["Stories", "/stories"]] },
  { title: "Take part", links: [["Get involved", "/get-involved"], ["Donate", "/donate"], ["About us", "/about"]] },
  { title: "Information", links: [["Governance", "/about"], ["Privacy", "/privacy"], ["Accessibility", "/accessibility"]] },
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
          <Link className="footer-v4-logo" href="/" aria-label="OAKonsult home"><Image src="/logos/oakonsult-mark.png" width={82} height={64} alt="" /><span><strong>OAKonsult</strong><small>Disabilities Outreach</small></span></Link>
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
