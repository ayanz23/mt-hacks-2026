import PageHeader from "@/components/PageHeader";
import { EVENT } from "@/config/features";

export const metadata = {
  title: "Sponsors — MT-haCks Hackathon",
};

export default function SponsorsPage() {
  return (
    <main>
      <PageHeader title="Sponsors" subtitle="The organizations that make MT-haCks possible." />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center text-gray-500">
          Sponsors will be announced soon.
        </div>

        <div className="mt-12 rounded-2xl bg-maroon-700 px-8 py-12 text-white">
          <h2 className="text-2xl font-bold">Interested in sponsoring?</h2>
          <p className="mt-2 max-w-2xl text-maroon-100">
            Sponsors get to meet motivated student builders and receive access to participant
            resumes for recruiting. Reach out and we&apos;ll send you more information.
          </p>
          <a
            href={`mailto:${EVENT.contactEmail}`}
            className="mt-6 inline-block rounded-md bg-gold-400 px-6 py-3 text-sm font-semibold text-maroon-900 transition hover:bg-gold-500"
          >
            Contact us: {EVENT.contactEmail}
          </a>
        </div>
      </section>
    </main>
  );
}
