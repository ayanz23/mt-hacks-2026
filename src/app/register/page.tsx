import RegistrationForm from "@/components/RegistrationForm";
import ScreenBar from "@/components/ScreenBar";
import { EVENT } from "@/config/features";

export const metadata = {
  title: "Register — MT-haCks Hackathon",
};

export default function RegisterPage() {
  return (
    <>
      <ScreenBar />
      <main className="screen">
        <div className="wrap">
          <h1>Player registration</h1>
          <p className="meta">
            {EVENT.date} · {EVENT.time} · {EVENT.venue}
          </p>
          <RegistrationForm />
        </div>
      </main>
    </>
  );
}
