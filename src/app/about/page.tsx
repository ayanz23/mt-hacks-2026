import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { EVENT } from "@/config/features";

export const metadata = {
  title: "About — MT-haCks Hackathon",
};

const DETAILS = [
  { label: "When", value: `${EVENT.date}, ${EVENT.time}` },
  { label: "Where", value: EVENT.venue },
  { label: "Teams", value: EVENT.teamSize },
  { label: "Hosted by", value: EVENT.organizer },
];

export default function AboutPage() {
  return (
    <main>
      <PageHeader title="About" subtitle={EVENT.tagline} />

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-3">
        <div className="flex flex-col gap-4 text-gray-700 md:col-span-2">
          <h2 className="text-2xl font-bold text-maroon-900">What is MT-haCks?</h2>
          <p>
            {EVENT.name} is a one-day hackathon hosted by the {EVENT.organizer}. Students
            come together to design and build projects that solve a real problem for a real
            person or community.
          </p>
          <p>
            Whether this is your first hackathon or your tenth, you&apos;re welcome here. Come
            with a team or come alone. We&apos;ll match solo hackers with teammates at the
            start of the day.
          </p>
          <h2 className="mt-6 text-2xl font-bold text-maroon-900">Hack for impact</h2>
          <p>
            We&apos;re looking for projects that work, not just demos. Think about who
            you&apos;re building for and what would actually make their day better.
          </p>
          <Link
            href="/register"
            className="mt-4 self-start rounded-md bg-maroon-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-maroon-800"
          >
            Register now
          </Link>
        </div>

        <dl className="flex flex-col gap-5 self-start rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          {DETAILS.map((d) => (
            <div key={d.label}>
              <dt className="text-xs font-semibold uppercase tracking-wider text-gold-500">
                {d.label}
              </dt>
              <dd className="mt-1 text-sm text-gray-700">{d.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
