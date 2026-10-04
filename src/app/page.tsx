import RegistrationForm from "@/components/RegistrationForm";
import { EVENT } from "@/config/features";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-maroon-800 text-white">
        <div className="mx-auto max-w-3xl px-6 py-12 text-center">
          <p className="text-sm uppercase tracking-widest text-gold-100">{EVENT.organizer}</p>
          <h1 className="mt-2 text-4xl font-bold">{EVENT.name}</h1>
          <p className="mt-3 text-maroon-100">{EVENT.tagline}</p>
          <dl className="mt-6 grid grid-cols-1 gap-3 text-sm text-maroon-50 sm:grid-cols-3">
            <div>
              <dt className="font-semibold text-gold-100">Date</dt>
              <dd>{EVENT.date}</dd>
            </div>
            <div>
              <dt className="font-semibold text-gold-100">Time</dt>
              <dd>{EVENT.time}</dd>
            </div>
            <div>
              <dt className="font-semibold text-gold-100">Venue</dt>
              <dd>{EVENT.venue}</dd>
            </div>
          </dl>
          <p className="mt-4 text-xs text-maroon-100">{EVENT.teamSize}</p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
          <RegistrationForm />
        </div>
      </div>
    </main>
  );
}
