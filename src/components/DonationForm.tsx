"use client";

import { FormEvent, useRef, useState } from "react";
import { isReviewSite } from "@/lib/site/review-mode";

type DonationDetails = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  anonymous: boolean;
  giftAid: boolean;
  privacy: boolean;
  marketing: boolean;
  website: string;
};

const steps = ["Gift", "Details", "Review"];
const purposeLabels = {
  general: "Where it is needed most",
  "project-me": "Project ME",
  "oak-centre": "OAK Centre Prime",
  "community-outreach": "Community outreach",
} as const;

const donationPreviewMode = isReviewSite();
const displayedSteps = donationPreviewMode ? ["Gift", "Placeholder details", "Review"] : steps;

const initialDetails: DonationDetails = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
  anonymous: false,
  giftAid: false,
  privacy: false,
  marketing: false,
  website: "",
};

export function DonationForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(0);
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [currency, setCurrency] = useState<"GBP" | "NGN">("GBP");
  const [amount, setAmount] = useState("25");
  const [purpose, setPurpose] = useState<keyof typeof purposeLabels>("general");
  const [details, setDetails] = useState(initialDetails);
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);
  const [busy, setBusy] = useState(false);

  const suggestedAmounts = currency === "GBP"
    ? [10, 25, 50, 100]
    : [5_000, 10_000, 25_000, 50_000];

  const formattedAmount = new Intl.NumberFormat(currency === "GBP" ? "en-GB" : "en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);

  const impactCopy = frequency === "monthly"
    ? `Amount: ${formattedAmount} each month. Preferred area: ${purposeLabels[purpose]}.`
    : `Amount: ${formattedAmount}. Preferred area: ${purposeLabels[purpose]}.`;

  function updateDetails<K extends keyof DonationDetails>(key: K, value: DonationDetails[K]) {
    setDetails((current) => ({ ...current, [key]: value }));
  }

  function chooseCurrency(nextCurrency: "GBP" | "NGN") {
    setCurrency(nextCurrency);
    setAmount(nextCurrency === "GBP" ? "25" : "10000");
    if (nextCurrency === "NGN") updateDetails("giftAid", false);
  }

  function continueTo(nextStep: number) {
    setStatus("");
    if (step === 0 && (!Number.isFinite(Number(amount)) || Number(amount) <= 0)) {
      setIsError(true);
      setStatus("Enter a valid donation amount before continuing.");
      return;
    }
    if (step === 1 && !formRef.current?.reportValidity()) return;
    setIsError(false);
    setStep(nextStep);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (donationPreviewMode) {
      setBusy(false);
      setIsError(false);
      setStatus("Preview complete. Nothing was sent and no payment was taken.");
      return;
    }

    setBusy(true);
    setIsError(false);
    setStatus("Preparing secure checkout…");

    try {
      const response = await fetch("/api/donations/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          frequency,
          currency,
          amount: Number(amount),
          purpose,
          ...details,
        }),
      });
      const data = (await response.json()) as { message?: string; url?: string };

      if (response.ok && data.url) {
        window.location.assign(data.url);
        return;
      }

      setIsError(!response.ok);
      setStatus(
        data.message ||
          (response.ok
            ? "Your secure checkout is ready."
            : "Please check your details and try again."),
      );
    } catch {
      setIsError(true);
      setStatus("Checkout could not be prepared. No payment has been taken.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="journey" onSubmit={submit} ref={formRef} autoComplete={donationPreviewMode ? "off" : "on"}>
      <p className="donation-step-count">{donationPreviewMode ? "Preview step" : "Step"} {step + 1} of {displayedSteps.length}</p>
      <ol className="steps" aria-label={donationPreviewMode ? "Donation preview steps" : "Donation steps"}>
        {displayedSteps.map((label, index) => (
          <li className={index === step ? "active" : ""} key={label} aria-current={index === step ? "step" : undefined}>
            <span>{index + 1}</span>
            {label}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <fieldset>
          <legend>Choose your gift</legend>
          <p className="field-help">Your gift helps sustain parent-carer support and disability inclusion work.</p>

          <span className="field-label">How often would you like to give?</span>
          <div className="choice-row">
            <button type="button" aria-pressed={frequency === "one-time"} className={frequency === "one-time" ? "selected" : ""} onClick={() => setFrequency("one-time")}>One-time</button>
            <button type="button" aria-pressed={frequency === "monthly"} className={frequency === "monthly" ? "selected" : ""} onClick={() => setFrequency("monthly")}>Monthly</button>
          </div>

          <label>
            Currency
            <select value={currency} onChange={(event) => chooseCurrency(event.target.value as "GBP" | "NGN")}>
              <option value="GBP">GBP £</option>
              <option value="NGN">NGN ₦</option>
            </select>
          </label>

          <span className="field-label">Choose an amount</span>
          <div className="amounts">
            {suggestedAmounts.map((suggested) => (
              <button type="button" aria-pressed={amount === String(suggested)} className={amount === String(suggested) ? "selected" : ""} key={suggested} onClick={() => setAmount(String(suggested))}>
                {new Intl.NumberFormat(currency === "GBP" ? "en-GB" : "en-NG", { style: "currency", currency, maximumFractionDigits: 0 }).format(suggested)}
              </button>
            ))}
          </div>

          <label>
            Current amount in {currency} ({currency === "GBP" ? "£" : "₦"}, edit to change)
            <input min="1" inputMode="decimal" type="number" value={amount} onChange={(event) => setAmount(event.target.value)} required />
          </label>

          <label>
            Which area would you prefer your gift to support?
            <select value={purpose} onChange={(event) => setPurpose(event.target.value as keyof typeof purposeLabels)}>
              {Object.entries(purposeLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
            </select>
          </label>

          <p className="field-help">This choice is a preference. Donations are pooled with other funding and are not tied to a guaranteed outcome.</p>

          <p className="donation-impact-copy" aria-live="polite"><strong>Your chosen gift</strong>{impactCopy}</p>
          {donationPreviewMode && <p className="staging-form-note"><strong>Preview only</strong>This form does not accept payment or personal details.</p>}

          <div className="step-actions end">
            <button className="button" type="button" onClick={() => continueTo(1)}>{donationPreviewMode ? "Continue preview with" : "Continue with"} {formattedAmount}{frequency === "monthly" ? " monthly" : ""}</button>
          </div>
        </fieldset>
      )}

      {step === 1 && (
        <fieldset>
          <legend>About you</legend>
          <p className="field-help">{donationPreviewMode ? "Use placeholder details. Nothing entered on this page is sent." : "We need these details to prepare the payment and send a receipt."}</p>
          <div className="two-cols">
            <label>First name<input autoComplete={donationPreviewMode ? "off" : "given-name"} value={details.firstName} onChange={(event) => updateDetails("firstName", event.target.value)} required /></label>
            <label>Last name<input autoComplete={donationPreviewMode ? "off" : "family-name"} value={details.lastName} onChange={(event) => updateDetails("lastName", event.target.value)} required /></label>
          </div>
          <label>Email address<input autoComplete={donationPreviewMode ? "off" : "email"} type="email" value={details.email} onChange={(event) => updateDetails("email", event.target.value)} required /></label>
          <label>Message with your gift (optional)<textarea rows={4} maxLength={500} value={details.message} onChange={(event) => updateDetails("message", event.target.value)} /></label>
          <label className="check"><input type="checkbox" checked={details.anonymous} onChange={(event) => updateDetails("anonymous", event.target.checked)} /> Keep my name private in supporter acknowledgements.</label>

          {currency === "GBP" && (
            <label className="check"><input type="checkbox" checked={details.giftAid} onChange={(event) => updateDetails("giftAid", event.target.checked)} /> {donationPreviewMode ? "Add Gift Aid (not submitted in preview)." : "I am a UK taxpayer and want OAKonsult to claim Gift Aid on this donation. I understand that I must have paid enough UK Income Tax or Capital Gains Tax to cover the Gift Aid claimed."}</label>
          )}

          <label className="check"><input type="checkbox" checked={details.privacy} onChange={(event) => updateDetails("privacy", event.target.checked)} required /> {donationPreviewMode ? "I understand that this preview does not send or store my details." : "I have read the privacy information and understand that my details will be used to process this donation."}</label>
          <label className="check"><input type="checkbox" checked={details.marketing} onChange={(event) => updateDetails("marketing", event.target.checked)} /> {donationPreviewMode ? "Preview the optional OAKonsult news and supporter updates choice. This does not subscribe you." : "I would like to receive occasional OAKonsult news and supporter updates. This is optional."}</label>
          <label className="honeypot" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={details.website} onChange={(event) => updateDetails("website", event.target.value)} /></label>

          <div className="step-actions">
            <button className="button button-muted" type="button" onClick={() => setStep(0)}>Back</button>
            <button className="button" type="button" onClick={() => continueTo(2)}>Review gift</button>
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset>
          <legend>Review your gift</legend>
          <div className="review">
            <span>{frequency === "monthly" ? "Monthly gift" : "One-time gift"}</span>
            <strong>{formattedAmount}</strong>
            <p>For {purposeLabels[purpose]}</p>
            <dl>
              <div><dt>Donor</dt><dd>{details.firstName} {details.lastName}</dd></div>
              <div><dt>Email</dt><dd>{details.email}</dd></div>
              <div><dt>Gift Aid</dt><dd>{details.giftAid ? "Declaration selected" : "Not selected"}</dd></div>
              <div><dt>Updates</dt><dd>{details.marketing ? "Opted in" : "Not opted in"}</dd></div>
            </dl>
            <p className="secure-note">{donationPreviewMode ? `Payment would be handled by ${currency === "GBP" ? "Stripe" : "Paystack"} on the live website. This preview does not accept card details.` : `Secure payment will take place with ${currency === "GBP" ? "Stripe" : "Paystack"}. OAKonsult will not receive your card details.`}</p>
          </div>
          <div className="step-actions">
            <button className="button button-muted" type="button" onClick={() => setStep(1)}>Back</button>
            <button className="button" type="submit" disabled={busy}>{busy ? "Preparing…" : donationPreviewMode ? "Finish preview" : "Continue to secure payment"}</button>
          </div>
        </fieldset>
      )}

      {status && <p className={`form-status${isError ? " error" : ""}`} role={isError ? "alert" : "status"} aria-live="polite">{status}</p>}
    </form>
  );
}
