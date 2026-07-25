import { ContactForm } from "@/components/ContactForm";

export default function Contact() {
  return (
    <>
      <section className="page-title shell">
        <p className="eyebrow dark">Contact OAKonsult</p>
        <h1>Tell us how we can help.</h1>
        <p>This preview shows the enquiry form for support, referrals, programmes, partnerships, volunteering and general enquiries.</p>
      </section>
      <section className="form-section">
        <div className="shell form-layout contact-layout">
          <aside>
            <p className="eyebrow">Before you begin</p>
            <h2>Review the form without sharing personal information.</h2>
            <p>Use placeholder details only. Nothing you enter is sent or stored.</p>
            <p>If your need is urgent or you are in immediate danger, contact the appropriate emergency service in your country. OAKonsult is not an emergency or crisis service.</p>
          </aside>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
