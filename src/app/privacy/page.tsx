import Link from "next/link";

export default function Privacy() {
  return (
    <section className="page-title shell prose">
      <p className="eyebrow dark">Privacy</p>
      <h1>Your information deserves care.</h1>
      <p>OAKonsult Disabilities Outreach is responsible for personal information submitted through its website and services. Forms on this development site do not send or store anything you enter.</p>
      <h2>Clear choices</h2>
      <p>Using personal information to respond to an enquiry or process a donation is separate from receiving news and supporter communications. Marketing consent is optional, specific and unchecked by default.</p>
      <h2>Payment information</h2>
      <p>Card details will be collected only by the secure payment provider. OAKonsult will receive the donation record and information needed for receipts, Gift Aid where applicable, and supporter administration, but not full card details.</p>
      <h2>Your rights</h2>
      <p>You can ask about the personal information OAKonsult holds, request corrections, object to certain uses or withdraw marketing consent. A full privacy notice covering lawful bases, retention periods and contact routes will be published before forms and donations go live.</p>
      <p><Link className="text-link" href="/contact">Contact OAKonsult about privacy <span aria-hidden="true">→</span></Link></p>
    </section>
  );
}
