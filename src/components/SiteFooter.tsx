import Image from "next/image";
import Link from "next/link";

const footerGroups = [
  {
    title: "Support and programmes",
    links: [
      ["Find support", "/find-support"],
      ["Project ME", "/programmes/project-me"],
      ["Parent-carer support", "/programmes/parent-carer-support"],
      ["Support for churches", "/programmes/support-for-churches"],
      ["OAK Centre Prime", "/programmes/oak-centre-prime"],
    ],
  },
  {
    title: "Stories and activity",
    links: [
      ["Stories & impact", "/impact"],
      ["Media gallery", "/media-gallery"],
      ["UK gallery", "/media-gallery/uk"],
      ["Nigeria gallery", "/media-gallery/nigeria"],
      ["Events", "/events"],
    ],
  },
  {
    title: "Take part",
    links: [
      ["Get involved", "/get-involved"],
      ["Donate", "/donate"],
      ["Funders & partners", "/funders-partners"],
      ["Contact", "/contact"],
      ["About OAKonsult", "/about"],
    ],
  },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer footer-v4">
      <div className="footer-v4-rings" aria-hidden="true"><i /><i /><i /></div>
      <div className="footer-v4-top">
        <div className="footer-v4-identity">
          <Image src="/logos/oakonsult-mark.png" alt="OAKonsult Disabilities Outreach" width={94} height={94} />
          <h2>Parent-carer support and disability inclusion.</h2>
          <p>Programmes, practical guidance and community partnerships in the UK and Nigeria.</p>
          <Link className="footer-v4-donate" href="/donate">Donate to OAKonsult <span aria-hidden="true">→</span></Link>
        </div>

        <nav className="footer-v4-links" aria-label="Footer navigation">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3>{group.title}</h3>
              {group.links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
            </div>
          ))}
        </nav>
      </div>

      <div className="footer-v4-regions" aria-label="Regional websites">
        <p>Where we work</p>
        <div className="region-footer">
          <Link href="/uk"><span>United Kingdom</span><strong>UK programmes, support and partnerships</strong><i aria-hidden="true">→</i></Link>
          <Link href="/nigeria"><span>Nigeria</span><strong>Nigeria outreach and OAK Centre Prime</strong><i aria-hidden="true">→</i></Link>
        </div>
      </div>

      <div className="footer-v4-bottom">
        <p>© {year} OAKonsult Disabilities Outreach.&nbsp;Registered charity in England and Wales, 1204553.</p>
        <div><Link href="/accessibility">Accessibility</Link><Link href="/privacy">Privacy</Link><Link href="/contact">Contact</Link></div>
      </div>
    </footer>
  );
}
