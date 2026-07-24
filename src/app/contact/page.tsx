import { ContactForm } from "@/components/ContactForm";

export default function Contact() {
  return (
    <>
      <section className="page-title shell">
        <p className="eyebrow dark">Contact OAKonsult</p>
        <h1>Tell us how we can help.</h1>
        <p>Use this form for support, referrals, programmes, partnerships, volunteering and general enquiries.</p>
      </section>
      <section className="form-section">
        <div className="shell form-layout contact-layout">
          <aside>
            <p className="eyebrow">Before you begin</p>
            <h2>Your information will be treated with care.</h2>
            <p>Online enquiries are not active on this review site, so details entered here will not be delivered or stored.</p>
            <p>If your need is urgent or you are in immediate danger, contact the appropriate emergency service in your country. OAKonsult is not an emergency or crisis service.</p>
          </aside>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
