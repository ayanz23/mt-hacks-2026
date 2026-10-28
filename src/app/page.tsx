import Link from "next/link";
import { EVENT } from "@/config/features";

const STATS = [
  { label: "Date", value: "Nov 21, 2026" },
  { label: "Hours of hacking", value: "12" },
  { label: "Team size", value: "1–4" },
  { label: "Cost to attend", value: "Free" },
];

const CARDS = [
  {
    href: "/about",
    title: "About the event",
    body: "Learn what MT-haCks is, who it's for, and what we mean by hacking for impact.",
  },
  {
    href: "/schedule",
    title: "Schedule",
    body: "See how the day runs, from check-in and team matching to demos and awards.",
  },
  {
    href: "/faq",
    title: "FAQ",
    body: "Answers to common questions about teams, eligibility, food, and what to bring.",
  },
  {
    href: "/sponsors",
    title: "Sponsors",
    body: "Meet the organizations supporting MT-haCks, or find out how to get involved.",
  },
];

export default function Home() {
  return (
    <main>
      <section className="bg-maroon-800 text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <p className="text-sm uppercase tracking-widest text-gold-100">{EVENT.organizer}</p>
          <h1 className="mt-3 max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl">
            {EVENT.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-maroon-100">{EVENT.tagline}</p>
          <p className="mt-2 text-sm text-maroon-100">
            {EVENT.date} · {EVENT.time} · {EVENT.venue}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/register"
              className="rounded-md bg-gold-400 px-6 py-3 text-sm font-semibold text-maroon-900 transition hover:bg-gold-500"
            >
              Register now
            </Link>
            <Link
              href="/about"
              className="rounded-md border border-maroon-100 px-6 py-3 text-sm font-semibold text-white transition hover:bg-maroon-700"
            >
              Learn more
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200 bg-white">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <dd className="text-3xl font-bold text-maroon-800">{stat.value}</dd>
              <dt className="mt-1 text-sm text-gray-500">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-bold text-maroon-900">Everything you need to know</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {CARDS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-maroon-100 hover:shadow-md"
            >
              <h3 className="text-xl font-semibold text-maroon-800">{card.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{card.body}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-maroon-700 group-hover:underline">
                Read more →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex flex-col items-start gap-6 rounded-2xl bg-maroon-700 px-8 py-12 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Ready to build something that matters?</h2>
            <p className="mt-2 text-maroon-100">{EVENT.teamSize}.</p>
          </div>
          <Link
            href="/register"
            className="shrink-0 rounded-md bg-gold-400 px-6 py-3 text-sm font-semibold text-maroon-900 transition hover:bg-gold-500"
          >
            Register for {EVENT.name}
          </Link>
        </div>
      </section>
    </main>
  );
}
