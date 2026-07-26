import { UtilityPage } from "@/components/UtilityPage";

export default function Privacy() {
  return <UtilityPage data={{
    eyebrow: "Privacy",
    title: "Your information deserves care.",
    intro: "OAKonsult Disabilities Outreach is responsible for personal information submitted through its website and services. Forms are currently disabled, and nothing entered into them is sent or stored.",
    sections: [
      { title: "Information and purpose", paragraphs: ["OAKonsult should collect only the information needed to respond to an enquiry, manage a programme, process a donation or carry out another clearly explained activity."] },
      { title: "Clear communication choices", paragraphs: ["Using information to answer an enquiry or administer a donation is separate from receiving news and supporter communications. Marketing consent is optional, specific and unchecked by default."] },
      { title: "Payment information", paragraphs: ["Card details will be collected only by the secure payment provider. OAKonsult may receive the donation record and information needed for receipts, Gift Aid where applicable and supporter administration, but not full card details."] },
      { title: "Your rights", paragraphs: ["You can ask about the personal information OAKonsult holds, request corrections, object to certain uses or withdraw marketing consent. Before forms or donations are enabled, the privacy notice will explain lawful bases, retention periods and contact routes."] },
    ],
    ctaTitle: "Ask a privacy question.",
    ctaText: "Contact OAKonsult if you want to understand how your information is used or exercise a data protection right.",
    ctaHref: "/contact",
    ctaLabel: "Contact OAKonsult about privacy",
  }} />;
}
