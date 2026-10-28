import PageHeader from "@/components/PageHeader";
import { EVENT } from "@/config/features";

export const metadata = {
  title: "Schedule — MT-haCks Hackathon",
};

// Placeholder timeline — update the times and items once the schedule is finalized.
const SCHEDULE = [
  { time: "9:00 AM", title: "Check-in & breakfast", body: "Pick up your badge and meet other hackers." },
  { time: "9:30 AM", title: "Opening ceremony", body: "Welcome, rules, and team matching for solo hackers." },
  { time: "10:00 AM", title: "Hacking begins", body: "Start building." },
  { time: "1:00 PM", title: "Lunch", body: "" },
  { time: "6:00 PM", title: "Hacking ends & dinner", body: "Submit your project." },
  { time: "6:30 PM", title: "Demos & judging", body: "Show judges what you built." },
  { time: "8:30 PM", title: "Closing ceremony & awards", body: "" },
  { time: "9:00 PM", title: "Event ends", body: "" },
];

export default function SchedulePage() {
  return (
    <main>
      <PageHeader title="Schedule" subtitle={`${EVENT.date} · ${EVENT.time}`} />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="mb-8 rounded-md bg-gold-100 px-4 py-3 text-sm text-maroon-900">
          This schedule is tentative and may change before the event.
        </p>
        <ol className="relative border-l-2 border-maroon-100">
          {SCHEDULE.map((item) => (
            <li key={item.time} className="mb-8 ml-6 last:mb-0">
              <span className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-2 border-white bg-maroon-700" />
              <p className="text-sm font-semibold text-gold-500">{item.time}</p>
              <h3 className="text-lg font-semibold text-maroon-900">{item.title}</h3>
              {item.body && <p className="text-sm text-gray-600">{item.body}</p>}
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
