"use client";

import { useEffect, useState } from "react";
import { EVENT } from "@/config/features";

// Rendered on the client so the number reflects today, not the day the site was built.
export default function Countdown() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const ms = new Date(EVENT.startsAt).getTime() - Date.now();
    setDays(Math.max(0, Math.ceil(ms / 86_400_000)));
  }, []);

  return (
    <div className="count">
      <strong>{days ?? "--"}</strong>
      <span>
        days until
        <br />
        doors open
      </span>
    </div>
  );
}
