export type PublicFormField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "number" | "textarea" | "select" | "radio" | "checkbox" | "file";
  required?: boolean;
  help?: string;
  options?: string[];
};

export type PublicFormDefinition = {
  id: "volunteer" | "partnership-referral" | "project-me-interest" | "zumba-registration" | "zumba-wellbeing" | "job-application";
  title: string;
  intro: string;
  submitLabel: string;
  fields: PublicFormField[];
};

export const publicFormDefinitions: Record<PublicFormDefinition["id"], PublicFormDefinition> = {
  volunteer: {
    id: "volunteer",
    title: "Volunteer interest form",
    intro: "Tell us how you would like to help. The team will review your interests, availability and the safest next step.",
    submitLabel: "Submit volunteer interest",
    fields: [
      { name: "interests", label: "Areas you are interested in", type: "checkbox", options: ["Parent-carer buddy", "Events and wellbeing", "Fundraising", "Communications", "Administration", "Nigeria community outreach"] },
      { name: "availability", label: "Days and times you are usually available", type: "text", required: true },
      { name: "firstName", label: "First name", type: "text", required: true },
      { name: "lastName", label: "Last name", type: "text", required: true },
      { name: "city", label: "Town or city", type: "text", required: true },
      { name: "country", label: "Country", type: "select", options: ["United Kingdom", "Nigeria", "Sierra Leone", "Other"], required: true },
      { name: "phone", label: "Phone number", type: "tel" },
      { name: "email", label: "Email address", type: "email", required: true },
      { name: "experience", label: "Relevant experience, skills or lived experience", type: "textarea" },
      { name: "motivation", label: "Why would you like to volunteer with OAKonsult?", type: "textarea", required: true },
      { name: "privacy", label: "I have read the privacy information and agree to be contacted about volunteering.", type: "checkbox", required: true },
    ],
  },
  "partnership-referral": {
    id: "partnership-referral",
    title: "Partnership and family referral form",
    intro: "For schools, churches, charities, community groups and local services. Share a family’s details only with their clear consent.",
    submitLabel: "Submit referral",
    fields: [
      { name: "referrerName", label: "Your full name", type: "text", required: true },
      { name: "organisationRole", label: "Organisation and role", type: "text", required: true },
      { name: "referrerEmail", label: "Your email address", type: "email", required: true },
      { name: "referrerPhone", label: "Your phone number", type: "tel" },
      { name: "parentCarerName", label: "Parent or carer name", type: "text", required: true },
      { name: "parentCarerContact", label: "Contact details shared with consent", type: "text", required: true },
      { name: "relationshipToFamily", label: "Your relationship to the family", type: "text", required: true },
      { name: "supportNeeded", label: "Support that may help", type: "checkbox", options: ["Parent-carer wellbeing", "Project ME", "Community connection", "Faith-sensitive support", "Signposting", "Other"] },
      { name: "referralSummary", label: "Reason for referral", type: "textarea", required: true },
      { name: "communicationAccessNeeds", label: "Communication or accessibility needs", type: "textarea", help: "Include only information needed to make contact safely." },
      { name: "consent", label: "The parent or carer has agreed that I may share these details with OAKonsult.", type: "checkbox", required: true },
      { name: "privacy", label: "I understand how this information will be used.", type: "checkbox", required: true },
    ],
  },
  "project-me-interest": {
    id: "project-me-interest",
    title: "Project ME training interest form",
    intro: "Register your interest in a future Project ME cohort or ask about organisational delivery.",
    submitLabel: "Submit Project ME interest",
    fields: [
      { name: "firstName", label: "First name", type: "text", required: true },
      { name: "lastName", label: "Last name", type: "text", required: true },
      { name: "email", label: "Email address", type: "email", required: true },
      { name: "location", label: "Town or location", type: "text", required: true },
      { name: "caregivingRole", label: "Your connection to caring or disability inclusion", type: "radio", options: ["Parent carer", "Family member", "Professional", "Church or community leader", "Other"], required: true },
      { name: "trainingGoals", label: "What would you like to gain?", type: "checkbox", options: ["Wellbeing and resilience", "Confidence and identity", "Peer connection", "Navigating support", "Faith-sensitive encouragement"] },
      { name: "additionalInfo", label: "Questions or additional information", type: "textarea" },
      { name: "consent", label: "I agree to be contacted about Project ME and understand this is an expression of interest, not a confirmed place.", type: "checkbox", required: true },
    ],
  },
  "zumba-registration": {
    id: "zumba-registration",
    title: "Project ME Zumba registration",
    intro: "Register for a free parent-carer wellbeing session in Bromley. We will confirm availability and practical details.",
    submitLabel: "Submit registration",
    fields: [
      { name: "fullName", label: "Full name", type: "text", required: true },
      { name: "email", label: "Email address", type: "email", required: true },
      { name: "phone", label: "Phone number", type: "tel", required: true },
      { name: "preferredSession", label: "Preferred session", type: "radio", options: ["Third Monday, 6:30 pm to 7:30 pm", "Fourth Friday, 12:00 pm to 1:00 pm", "Either session"], required: true },
      { name: "numberOfAttendees", label: "Number attending", type: "number", required: true },
      { name: "accessSupportNeeds", label: "Light access or support needs", type: "textarea", help: "Do not include detailed medical information here." },
      { name: "message", label: "Other question or message", type: "textarea" },
      { name: "consent", label: "I agree to be contacted about this Zumba registration and have read the privacy information.", type: "checkbox", required: true },
    ],
  },
  "zumba-wellbeing": {
    id: "zumba-wellbeing",
    title: "Zumba wellbeing check-in",
    intro: "A short questionnaire to help OAKonsult understand how the sessions are supporting parent-carer wellbeing.",
    submitLabel: "Submit wellbeing questionnaire",
    fields: [
      { name: "fullName", label: "Full name", type: "text", required: true },
      { name: "email", label: "Email address", type: "email", required: true },
      { name: "wellbeingRating", label: "How would you rate your overall wellbeing today?", type: "select", options: ["1 - Very low", "2", "3", "4", "5 - Very good"], required: true },
      { name: "isolationFrequency", label: "How often have you felt isolated recently?", type: "select", options: ["Never", "Rarely", "Sometimes", "Often", "Very often"], required: true },
      { name: "wellbeingConfidence", label: "How confident do you feel looking after your wellbeing?", type: "select", options: ["Not confident", "A little confident", "Fairly confident", "Very confident"], required: true },
      { name: "activityFrequency", label: "How often are you physically active?", type: "select", options: ["Less than monthly", "Monthly", "Weekly", "Several times a week"], required: true },
      { name: "additionalComments", label: "Anything else you would like us to know?", type: "textarea" },
      { name: "consent", label: "I understand how this wellbeing information will be used and agree to submit it.", type: "checkbox", required: true },
    ],
  },
  "job-application": {
    id: "job-application",
    title: "Opportunity application form",
    intro: "Use this only for an opportunity currently advertised by OAKonsult. Check the closing date before applying.",
    submitLabel: "Submit application",
    fields: [
      { name: "name", label: "Full name", type: "text", required: true },
      { name: "email", label: "Email address", type: "email", required: true },
      { name: "phone", label: "Phone number", type: "tel", required: true },
      { name: "coverLetter", label: "Supporting statement", type: "textarea", required: true },
      { name: "cv", label: "CV", type: "file", required: true },
      { name: "privacy", label: "I agree to the privacy information for recruitment applications.", type: "checkbox", required: true },
    ],
  },
};
