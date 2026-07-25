"use client";

import { FormEvent, useState } from "react";
import type { PublicFormDefinition, PublicFormField } from "@/lib/public-form-definitions";
import { isReviewSite } from "@/lib/site/review-mode";

function Field({ field }: { field: PublicFormField }) {
  const common = { name: field.name, required: field.required };
  if (field.type === "textarea") return <textarea {...common} rows={5} />;
  if (field.type === "select") return (
    <select {...common} defaultValue="">
      <option value="" disabled>Select an option</option>
      {field.options?.map((option) => <option key={option}>{option}</option>)}
    </select>
  );
  if (field.type === "radio" || field.type === "checkbox") return (
    <span className="public-form-choices">
      {(field.options || [field.label]).map((option) => (
        <label className="check" key={option}>
          <input type={field.type} name={field.name} value={option} required={field.required && (field.type === "radio" || !field.options)} />
          {option}
        </label>
      ))}
    </span>
  );
  return <input {...common} type={field.type} accept={field.type === "file" ? ".pdf,.doc,.docx" : undefined} />;
}

export function PublicInterestForm({ definition }: { definition: PublicFormDefinition }) {
  const [status, setStatus] = useState("");
  const review = isReviewSite();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setStatus(review
      ? "Preview complete. Nothing was sent or stored."
      : "This form is being connected to OAKonsult’s reviewed submission service. Please contact the team while that connection is completed.");
  }

  return (
    <form className="journey public-interest-form" onSubmit={submit}>
      <fieldset>
        <legend>{definition.title}</legend>
        <p className="field-help">{definition.intro}</p>
        {review && <p className="staging-form-note"><strong>Private staging preview</strong>Nothing entered here is sent or stored.</p>}
        {definition.fields.map((field) => field.type === "checkbox" || field.type === "radio" ? (
          <div className="field-group" key={field.name}>
            {field.options && <span className="field-label">{field.label}{field.required ? " *" : ""}</span>}
            {field.help && <span className="field-help">{field.help}</span>}
            <Field field={field} />
          </div>
        ) : (
          <label key={field.name}>
            <span className="field-label">{field.label}{field.required ? " *" : ""}</span>
            {field.help && <span className="field-help">{field.help}</span>}
            <Field field={field} />
          </label>
        ))}
        <button className="button" type="submit">{review ? `Preview ${definition.submitLabel.toLowerCase()}` : definition.submitLabel}</button>
        {status && <p className="form-status" role="status" aria-live="polite">{status}</p>}
      </fieldset>
    </form>
  );
}
