import { DonationForm } from "@/components/DonationForm";

export default function Donate() {
  return (
    <>
      <section className="page-title shell">
        <p className="eyebrow dark">Make a difference</p>
        <h1>Give someone a stronger circle of support.</h1>
        <p>A calm, secure journey for one-time and monthly gifts in GBP or NGN.</p>
      </section>
      <section className="form-section">
        <div className="shell form-layout">
          <aside>
            <p className="eyebrow">Your gift matters</p>
            <h2>Care grows when people choose to stand together.</h2>
            <p>Online payments are not active on this review site. No payment can be taken and no donation will be falsely confirmed.</p>
            <ul className="tick-list">
              <li>No card details collected by this website</li>
              <li>Marketing consent is always optional</li>
              <li>Secure payment handled by Stripe or Paystack</li>
            </ul>
          </aside>
          <DonationForm />
        </div>
      </section>
    </>
  );
}
