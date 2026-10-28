import PageHeader from "@/components/PageHeader";
import { EVENT } from "@/config/features";

export const metadata = {
  title: "FAQ — MT-haCks Hackathon",
};

const FAQS = [
  {
    q: "What is a hackathon?",
    a: "A hackathon is an event where people team up to build a project, such as an app, website or hardware hack, in a short amount of time. No prior experience is needed.",
  },
  {
    q: "When and where is it?",
    a: `${EVENT.date}, ${EVENT.time}, at ${EVENT.venue}.`,
  },
  {
    q: "How much does it cost?",
    a: "Nothing. MT-haCks is free to attend.",
  },
  {
    q: "How big can teams be?",
    a: "Teams can have 1–4 people. If you don't have a team, register anyway and we'll match you with one at the start of the event.",
  },
  {
    q: "Do I need to be 18?",
    a: "Participants must be 18 or older. If you're under 18, contact the organizers for a guardian consent form.",
  },
  {
    q: "Will there be food?",
    a: "Yes. Let us know about any dietary restrictions or allergies on the registration form so we can plan for you.",
  },
  {
    q: "What should I bring?",
    a: "A laptop, charger, and anything else you need to build your project.",
  },
  {
    q: "I have another question.",
    a: `Email us at ${EVENT.contactEmail}.`,
  },
];

export default function FaqPage() {
  return (
    <main>
      <PageHeader title="FAQ" subtitle="Frequently asked questions about MT-haCks." />

      <section className="mx-auto flex max-w-3xl flex-col gap-3 px-6 py-16">
        {FAQS.map((faq) => (
          <details
            key={faq.q}
            className="group rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-maroon-900">
              {faq.q}
              <span className="ml-4 text-maroon-700 transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm text-gray-700">{faq.a}</p>
          </details>
        ))}
      </section>
    </main>
  );
}
