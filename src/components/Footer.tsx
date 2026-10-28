import Link from "next/link";
import { EVENT } from "@/config/features";

const COLUMNS = [
  {
    title: "Event",
    links: [
      { href: "/about", label: "About" },
      { href: "/schedule", label: "Schedule" },
      { href: "/register", label: "Register" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/sponsors", label: "Sponsors" },
      { href: "/privacy", label: "Privacy Policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-maroon-900 text-maroon-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-lg font-bold text-white">{EVENT.name}</p>
          <p className="mt-2 max-w-sm text-sm">{EVENT.tagline}</p>
          <p className="mt-4 text-sm">
            Questions?{" "}
            <a className="underline hover:text-gold-100" href={`mailto:${EVENT.contactEmail}`}>
              {EVENT.contactEmail}
            </a>
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold uppercase tracking-wider text-gold-100">
              {col.title}
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-maroon-800 px-6 py-4 text-center text-xs">
        © 2026 {EVENT.organizer}
      </div>
    </footer>
  );
}
