import Image from "next/image";
import Link from "next/link";
import { HomeMotion } from "@/components/HomeMotion";

const groups = [
  {
    region: "United Kingdom",
    title: "UK funders",
    note: "Confirmed funders and supporters connected with OAKonsult’s UK work and Project ME.",
    organisations: [
      ["Mayor of London", "/partners/mayor-of-london.jpg"],
      ["The National Lottery Community Fund", "/partners/national-lottery.png"],
      ["Just Sow", "/partners/just-sow.png"],
      ["Big Give", "/partners/big-give.png"],
      ["Bishop Radford Trust", "/partners/bishop-radford.svg"],
      ["The Albert Hunt Trust", "/partners/albert-hunt.png"],
      ["Christ Church Orpington", "/partners/christ-church.webp"],
    ],
  },
  {
    region: "United Kingdom",
    title: "UK partners",
    note: "Local and specialist organisations connected with support for parent carers and families.",
    organisations: [
      ["Bromley Council", "/partners/bromley.png"],
      ["Your Voice in Health & Social Care", "/partners/yvhsc.png"],
      ["STUBS Disability Services", "/partners/stubs.png"],
      ["SEN Parenting", "/partners/sen-parenting.webp"],
    ],
  },
  {
    region: "Nigeria",
    title: "Nigeria funders",
    note: "Funders connected with OAKonsult’s Nigeria outreach and disability-inclusion work.",
    organisations: [
      ["Stanbic IBTC Bank", "/partners/stanbic.png"],
      ["Flour Mills Nigeria", "/partners/flour-mills.png"],
      ["Funmi Adewole Foundation", "/partners/funmi-adewole.png"],
    ],
  },
  {
    region: "Nigeria",
    title: "Nigeria partner network",
    note: "Organisations working alongside OAKonsult to extend disability inclusion, professional learning and family support.",
    organisations: [
      ["Agbedare Jesus Care Foundation", "/partners/agbedare-foundation.png"],
      ["Bowen University Teaching Hospital", "/partners/bowen-medical.jpeg"],
      ["Ladoke Akintola University Medical Students’ Association", "/partners/laumsa.jpg"],
    ],
  },
] as const;

const nigeriaPartners = [
  "G6 Foundation",
  "To Omo Re School, Ilorin",
  "PureSouls Learning Foundation",
  "Patrick Speech & Languages Centre",
  "Nigeria Baptist Theological Seminary, Ogbomoso",
  "Methodist Theological Institute, Sagamu",
  "Marigold Special School, Lagos",
  "Jesus Kids, Ibadan",
  "Cerebral Palsy Center, Lagos",
];

export default function Page() {
  return (
    <div className="oak-home editorial-page partners-page">
      <HomeMotion />
      <header className="editorial-masthead partners-masthead">
        <div className="editorial-masthead-copy" data-reveal>
          <nav className="editorial-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Funders &amp; partners</span></nav>
          <p className="oak-kicker">Partnership and accountability</p>
          <h1>Funders &amp; partners</h1>
          <p>Recognising the organisations that help strengthen programmes, outreach and routes to support across the UK and Nigeria.</p>
          <div className="editorial-route-links"><Link href="/contact">Partner with OAKonsult <span aria-hidden="true">→</span></Link><Link href="/impact">See impact and accountability <span aria-hidden="true">→</span></Link></div>
        </div>
        <div className="partners-hero-photo" data-reveal><Image src="/images/current-site-community-partnership.webp" alt="People gathering at an OAKonsult partnership event" fill priority sizes="(max-width: 800px) 100vw, 52vw" /></div>
      </header>

      <section className="partners-introduction">
        <p className="oak-kicker dark">One OAKonsult, regional relationships</p>
        <h2>Partnerships are shown where they belong.</h2>
        <p>Funding and programme relationships are presented by region, so the work they support stays clear.</p>
      </section>

      <div className="partner-groups">
        {groups.map((group, groupIndex) => (
          <section className={`partner-group partner-group-${groupIndex + 1}`} key={group.title}>
            <header data-reveal><span>{group.region}</span><h2>{group.title}</h2><p>{group.note}</p></header>
            <div className="partner-logo-list">
              {group.organisations.map(([name, src], index) => (
                <figure key={name} data-reveal>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><Image src={src} alt={name} width={184} height={92} /></div>
                  <figcaption>{name}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        ))}

        <section className="partner-group partner-group-community">
          <header data-reveal><span>Nigeria</span><h2>Partners &amp; supported organisations</h2><p>Schools, charities, faith organisations and specialist services connected through outreach, training and referrals.</p></header>
          <ol className="partner-name-list">
            {nigeriaPartners.map((name, index) => <li key={name} data-reveal><span>{String(index + 1).padStart(2, "0")}</span>{name}</li>)}
          </ol>
        </section>

        <section className="partner-endorsement">
          <div data-reveal><span>International endorsement</span><h2>Joni and Friends</h2><p>OAKonsult is a Joni and Friends endorsed organisation, reflecting a shared commitment to disability inclusion and family support.</p></div>
          <Image src="/partners/joni-and-friends.jpg" alt="Joni and Friends" width={240} height={120} />
        </section>
      </div>

      <section className="editorial-action-band">
        <div data-reveal><p className="oak-kicker">Work with us</p><h2>Build a clear, useful route for families.</h2><p>Talk to OAKonsult about funding, referrals, training, programme delivery or professional support.</p></div>
        <div className="editorial-route-links light-links" data-reveal><Link href="/contact">Start a conversation <span aria-hidden="true">→</span></Link><Link href="/get-involved">Other ways to help <span aria-hidden="true">→</span></Link></div>
      </section>
    </div>
  );
}
