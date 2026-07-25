"use client";

import { FormEvent, useState } from "react";
import { isReviewSite } from "@/lib/site/review-mode";

const contactPreviewMode = isReviewSite();

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (contactPreviewMode) {
      setBusy(false);
      setIsError(false);
      setStatus("Form check complete. Nothing was sent or stored.");
      return;
    }

    const form = event.currentTarget;
    const fields = new FormData(form);
    setBusy(true);
    setIsError(false);
    setStatus("Sending securely…");

    const payload = {
      enquiryType: fields.get("enquiryType"),
      firstName: fields.get("firstName"),
      lastName: fields.get("lastName"),
      email: fields.get("email"),
      phone: fields.get("phone") || "",
      organisation: fields.get("organisation") || "",
      region: fields.get("region"),
      message: fields.get("message"),
      preferredContact: fields.get("preferredContact"),
      privacy: fields.get("privacy") === "on",
      marketing: fields.get("marketing") === "on",
      website: fields.get("website") || "",
    };

    try {
      const response = await fetch("/api/forms/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { message?: string };
      setIsError(!response.ok);
      setStatus(
        data.message ||
          (response.ok
            ? "Thank you. Your message has been received."
            : "Please check the form and try again."),
      );
      if (response.ok) form.reset();
    } catch {
      setIsError(true);
      setStatus("Your message could not be sent. Please try again later.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} autoComplete={contactPreviewMode ? "off" : "on"}>
      {contactPreviewMode && <p className="staging-form-note"><strong>Preview only</strong>Use placeholder details. Nothing is sent or stored. All fields are required unless marked optional.</p>}
      <label>
        What can we help with?
        <select name="enquiryType" required defaultValue="">
          <option value="" disabled>Select an enquiry type</option>
          <option value="parent-carer support">Parent-carer support</option>
          <option value="professional/referral">Professional enquiry or referral</option>
          <option value="programme">Programme information</option>
          <option value="partnership/funding">Partnership or funding</option>
          <option value="volunteering">Volunteering</option>
          <option value="media/other">Media or another enquiry</option>
        </select>
      </label>

      <div className="two-cols">
        <label>First name<input name="firstName" autoComplete={contactPreviewMode ? "off" : "given-name"} maxLength={80} required /></label>
        <label>Last name<input name="lastName" autoComplete={contactPreviewMode ? "off" : "family-name"} maxLength={80} required /></label>
      </div>
      <div className="two-cols">
        <label>Email address<input name="email" autoComplete={contactPreviewMode ? "off" : "email"} type="email" maxLength={254} required /></label>
        <label>Phone (optional)<input name="phone" autoComplete={contactPreviewMode ? "off" : "tel"} type="tel" maxLength={30} /></label>
      </div>
      <label>Organisation (optional)<input name="organisation" maxLength={120} /></label>
      <label>
        Region
        <select name="region" required defaultValue="">
          <option value="" disabled>Select your region</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Nigeria">Nigeria</option>
          <option value="Elsewhere / online">Elsewhere or online</option>
        </select>
      </label>
      <label>Your message<textarea name="message" rows={6} minLength={10} maxLength={3_000} required /></label>
      <label>
        Preferred contact method
        <select name="preferredContact" required defaultValue="email">
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
      </label>
      <label className="check"><input name="privacy" type="checkbox" required /> {contactPreviewMode ? "I understand that this preview does not send or store my details." : "I have read the privacy information and understand that OAKonsult will use these details to respond to this enquiry."}</label>
      <label className="check"><input name="marketing" type="checkbox" /> {contactPreviewMode ? "Preview the optional OAKonsult news and updates choice. This does not subscribe you." : "I would like to receive occasional OAKonsult news and updates. This is optional."}</label>
      <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <button className="button" type="submit" disabled={busy}>{busy ? "Sending…" : contactPreviewMode ? "Check form without sending" : "Send enquiry"}</button>
      {status && <p className={`form-status${isError ? " error" : ""}`} role={isError ? "alert" : "status"} aria-live="polite">{status}</p>}
    </form>
  );
}
