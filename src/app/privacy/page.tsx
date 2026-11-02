import ScreenBar from "@/components/ScreenBar";
import { EVENT } from "@/config/features";

export const metadata = {
  title: "Privacy Policy — MT-haCks Hackathon",
};

export default function PrivacyPage() {
  return (
    <>
      <ScreenBar />
      <main className="screen">
        <div className="wrap">
          <h1>Privacy Policy</h1>
          <p className="meta">
            {EVENT.name} — {EVENT.organizer}
          </p>

          <div className="panel prose">
            <p>
              This page explains what information we collect through the {EVENT.name} registration
              form and how we use it.
            </p>

            <section>
              <h2>What we collect</h2>
              <p>
                Name, email, school, level of study, major, graduation year, hackathon experience,
                teammate requests, dietary restrictions, LinkedIn and other links you provide, your
                resume file, and your responses to the optional demographic questions on the form.
              </p>
            </section>

            <section>
              <h2>How we use it</h2>
              <p>
                To plan the event (team matching, food, headcount), to contact you with event
                updates, and — only if you upload a resume — to share it with event sponsors for
                recruiting purposes.
              </p>
            </section>

            <section>
              <h2>Where it&apos;s stored</h2>
              <p>
                Registration details are stored in a Google Sheet accessible only to event
                organizers. Resumes are stored in a Google Drive folder accessible only to event
                organizers and the sponsors we choose to share them with.
              </p>
            </section>

            <section>
              <h2>Questions</h2>
              <p>
                Contact the organizers at{" "}
                <a href={`mailto:${EVENT.contactEmail}`}>{EVENT.contactEmail}</a> with any questions
                about your data.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
