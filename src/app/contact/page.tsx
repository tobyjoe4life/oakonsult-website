import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { HomeMotion } from "@/components/HomeMotion";

export default function Contact() {
  return <div className="oak-home editorial-page contact-editorial-page" data-mood="growth">
    <HomeMotion />
    <header className="contact-editorial-masthead">
      <div className="contact-editorial-copy" data-reveal>
        <nav className="editorial-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Contact</span></nav>
        <p className="oak-kicker">Contact OAKonsult</p>
        <h1>Tell us how we can help.</h1>
        <p>Choose the enquiry route that fits: support, referrals, programmes, partnerships, volunteering, media or a general question.</p>
      </div>
      <div className="contact-editorial-photo" data-reveal><Image src="/images/current-site-community-partnership.webp" alt="OAKonsult representatives at a community event" fill priority sizes="(max-width: 900px) 100vw, 46vw" /></div>
    </header>
    <section className="form-section contact-editorial-form">
      <div className="shell form-layout contact-layout">
        <aside data-reveal>
          <p className="oak-kicker">Before you begin</p>
          <h2>Review the form without sharing personal information.</h2>
          <p>Use placeholder details only. Nothing you enter is sent or stored.</p>
          <p>If your need is urgent or you are in immediate danger, contact the appropriate emergency service in your country. OAKonsult is not an emergency or crisis service.</p>
        </aside>
        <div data-reveal><ContactForm /></div>
      </div>
    </section>
  </div>;
}
