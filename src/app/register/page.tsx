import RegistrationForm from "@/components/RegistrationForm";
import PageHeader from "@/components/PageHeader";
import { EVENT } from "@/config/features";

export const metadata = {
  title: "Register — MT-haCks Hackathon",
};

export default function RegisterPage() {
  return (
    <main className="bg-gray-50">
      <PageHeader
        title="Register"
        subtitle={`${EVENT.date} · ${EVENT.time} · ${EVENT.venue}. ${EVENT.teamSize}.`}
      />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
          <RegistrationForm />
        </div>
      </div>
    </main>
  );
}
