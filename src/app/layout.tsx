import type { Metadata } from "next";
import { Chakra_Petch, Press_Start_2P, Silkscreen } from "next/font/google";
import "./globals.css";

const display = Press_Start_2P({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const label = Silkscreen({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-label" });
const body = Chakra_Petch({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "MT-haCks Hackathon",
  description:
    "Register for MT-haCks, the Muslim Tech Collaborative hackathon at Rutgers — Nov 21, 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${label.variable} ${body.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
