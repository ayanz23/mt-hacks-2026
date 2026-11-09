"use client";

import { useEffect, useRef, useState } from "react";
import { TIERS, TRACKS, type Tier, type Track } from "@/config/tracks";

const TIER_ORDER: Tier[] = ["hard", "normal", "easy"];

// Difficulty pips: filled squares out of three, like lives on a HUD.
function Pips({ n }: { n: number }) {
  return (
    <span className="pips" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <i key={i} className={i < n ? "on" : undefined} />
      ))}
    </span>
  );
}

function SponsorPlate({ sponsor }: { sponsor: Track["sponsor"] }) {
  if (!sponsor.logo) {
    return <span className="plate text">{sponsor.name}</span>;
  }
  return (
    <span className={`plate${sponsor.dark ? " dark" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={sponsor.logo} alt={sponsor.name} />
    </span>
  );
}

// One cabinet, two screens. The select screen lists every track by difficulty; pressing a
// track swaps the whole screen for that track's brief. Keys on the views replay the CRT
// switch animation on each change.
export default function TracksArcade() {
  const [openId, setOpenId] = useState<string | null>(null);
  const arcade = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const cards = useRef(new Map<string, HTMLButtonElement>());
  const returnTo = useRef<string | null>(null);

  const open = openId ? (TRACKS.find((t) => t.id === openId) ?? null) : null;

  const show = (id: string) => {
    returnTo.current = id;
    setOpenId(id);
  };
  const back = () => setOpenId(null);

  // Focus follows the screen: onto the title when a brief opens, back to its card on close.
  // If the card was near the bottom of the viewport, bring the screen's top back into view.
  useEffect(() => {
    if (open) {
      heading.current?.focus({ preventScroll: true });
      const top = arcade.current?.getBoundingClientRect().top ?? 0;
      if (top < 80) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollBy({ top: top - 96, behavior: reduce ? "auto" : "smooth" });
      }
    } else if (returnTo.current) {
      cards.current.get(returnTo.current)?.focus();
      returnTo.current = null;
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="arcade" ref={arcade}>
      <div className="bezel arcade-bezel">
        <div className="crt arcade-screen">
          {open ? (
            <div className={`view detail ${open.tier}`} key={open.id}>
              <div className="hud-top">
                <span>
                  {TIERS[open.tier].label.toUpperCase()} · {TIERS[open.tier].name.toUpperCase()}
                </span>
                <span>{open.prize.toUpperCase()}</span>
              </div>
              <div className="detail-head">
                <div>
                  <h3 ref={heading} tabIndex={-1}>
                    {open.title}
                  </h3>
                  <p className="hook">{open.hook}</p>
                </div>
                <button type="button" className="btn black" onClick={back}>
                  Back
                </button>
              </div>
              <div className="detail-body">
                <div className="brief">
                  {open.sections.map((s) => (
                    <div key={s.heading}>
                      <h4>{s.heading}</h4>
                      {s.body && <p>{s.body}</p>}
                      {s.items && (
                        <ul>
                          {s.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                  {open.rubric && (
                    <div>
                      <h4>Scoring rubric</h4>
                      <ul className="rubric">
                        {open.rubric.map((r) => (
                          <li key={r.label}>
                            <span>{r.label}</span>
                            <span className="meter" aria-hidden="true">
                              {[0, 1, 2, 3, 4].map((k) => (
                                <i key={k} className={k < r.points / 5 ? "on" : undefined} />
                              ))}
                            </span>
                            <b>{r.points}</b>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <aside className="sponsor-card">
                  <p className="label">Made possible by</p>
                  <SponsorPlate sponsor={open.sponsor} />
                  <b>{open.sponsor.name}</b>
                  <p>{open.sponsor.blurb}</p>
                  {open.resources && (
                    <>
                      <p className="label">Power-ups</p>
                      <ul className="resources">
                        {open.resources.map((r) => (
                          <li key={r.url}>
                            <a href={r.url} target="_blank" rel="noreferrer">
                              {r.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  <div className="sponsor-actions">
                    {open.sponsor.url && (
                      <a className="btn gold" href={open.sponsor.url} target="_blank" rel="noreferrer">
                        Visit sponsor
                      </a>
                    )}
                    <a className="btn black" href={open.mlhUrl} target="_blank" rel="noreferrer">
                      View on MLH
                    </a>
                  </div>
                </aside>
              </div>
            </div>
          ) : (
            <div className="view select" key="select">
              <div className="hud-top">
                <span>SELECT TRACK</span>
                <span>{TRACKS.length} PRIZES</span>
              </div>
              {TIER_ORDER.map((tier) => {
                const t = TIERS[tier];
                return (
                  <div key={tier} className={`tier ${tier}`} role="group" aria-labelledby={`tier-${tier}`}>
                    <header className="tier-head">
                      <span className="diff">
                        <Pips n={t.pips} />
                        {t.label}
                      </span>
                      <h3 id={`tier-${tier}`}>{t.name}</h3>
                      <span className="tier-blurb">{t.blurb}</span>
                    </header>
                    <ul className="cards">
                      {TRACKS.filter((track) => track.tier === tier).map((track) => (
                        <li key={track.id}>
                          <button
                            type="button"
                            className="card"
                            ref={(el) => {
                              if (el) cards.current.set(track.id, el);
                              else cards.current.delete(track.id);
                            }}
                            onClick={() => show(track.id)}
                          >
                            <span className="card-prize">{track.prize}</span>
                            <b>{track.title}</b>
                            <span className="card-sponsor">{track.sponsor.name}</span>
                            {tier === "hard" && <span className="card-hook">{track.hook}</span>}
                            <span className="card-cta" aria-hidden="true">
                              PRESS START
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="arcade-deck">
        <span className="stick" aria-hidden="true">
          <i />
        </span>
        <ul className="legend" aria-label="Difficulty key">
          {TIER_ORDER.map((tier) => (
            <li key={tier} className={tier}>
              <i aria-hidden="true" />
              <span>{TIERS[tier].label}</span>
            </li>
          ))}
        </ul>
        <span className="deck-hint" aria-hidden="true">
          {open ? "ESC = BACK" : "PICK A TRACK"}
        </span>
      </div>
    </div>
  );
}
