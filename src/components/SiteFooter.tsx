import Image from "next/image";
import Link from "next/link";
import { journeyGroups } from "@/lib/site-navigation";

export function SiteFooter() {
  return (
    <footer className="site-footer footer-v4">
      <div className="footer-v4-rings" aria-hidden="true"><i /><i /><i /><i /></div>
      <p className="footer-v4-statement" data-reveal>No parent carer <em>should walk alone.</em></p>
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
        {journeyGroups.map((group) => (
          <div key={group.title}>
            <h3>{group.title}</h3>
            {group.footerLinks.map(({ label, href }) => <Link key={`${href}-${label}`} href={href}>{label}</Link>)}
          </div>
        ))}
      </div>
      <div className="shell region-footer">
        <Link href="/uk"><span>UK hub</span><strong>OAKonsult UK</strong><small>Parent-carer programmes, UK funders and support →</small></Link>
        <Link href="/nigeria"><span>Nigeria hub</span><strong>OAKonsult Nigeria</strong><small>Community outreach, local funders and the planned OAK Centre Prime →</small></Link>
      </div>
      <div className="shell footer-bottom">
        <span>&copy; {new Date().getFullYear()} OAKonsult Disabilities Outreach</span>
        <nav aria-label="Legal and contact">
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/accessibility">Accessibility</Link>
        </nav>
      </div>
    </footer>
  );
}
