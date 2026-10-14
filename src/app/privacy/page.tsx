import { EVENT } from "@/config/features";

export const metadata = {
  title: "Privacy Policy — MT-haCks Hackathon",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-2xl font-bold text-maroon-800">Privacy Policy</h1>
        <p className="mt-2 text-sm text-gray-500">{EVENT.name} — {EVENT.organizer}</p>

        <div className="mt-8 flex flex-col gap-6 text-sm leading-6 text-gray-700">
          <p>
            This page explains what information we collect through the {EVENT.name}{" "}
            registration form and how we use it.
          </p>

          <section>
            <h2 className="font-semibold text-maroon-800">What we collect</h2>
            <p className="mt-2">
              Name, email, school, level of study, major, graduation year, hackathon
              experience, teammate requests, dietary restrictions, LinkedIn and other
              links you provide, your resume file, and your responses to the optional
              demographic questions on the form.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-maroon-800">How we use it</h2>
            <p className="mt-2">
              To plan the event (team matching, food, headcount), to contact you with
              event updates, and — only if you upload a resume — to share it with
              event sponsors for recruiting purposes.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-maroon-800">Where it&apos;s stored</h2>
            <p className="mt-2">
              Registration details are stored in a Google Sheet accessible only to
              event organizers. Resumes are stored in a Google Drive folder accessible
              only to event organizers and the sponsors we choose to share them with.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-maroon-800">Questions</h2>
            <p className="mt-2">
              Contact the organizers at{" "}
              <a className="underline text-maroon-700" href="mailto:ayanzia10@gmail.com">
                ayanzia10@gmail.com
              </a>{" "}
              with any questions about your data.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
