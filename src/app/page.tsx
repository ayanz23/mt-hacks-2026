import Link from "next/link";
import ArcadeNav from "@/components/ArcadeNav";
import Countdown from "@/components/Countdown";
import PixelHeart from "@/components/PixelHeart";
import { EVENT } from "@/config/features";

const CLASSES = [
  { key: "T", name: "Technical", body: "You write the code and wire up the hardware.", color: "var(--brass)" },
  { key: "D", name: "Design", body: "You lead on design, research and the pitch.", color: "var(--wine)" },
];

// Coin-return bursts: [landing x, pop height, landing y, delay in seconds]. Two bursts of four per loop.
// Payout: [x drift, landing y, delay] for the stream of coins falling from the chute.
const DROPS = [
  [-3, 36, 0],
  [6, 34, 0.2],
  [-9, 35, 0.4],
  [2, 33, 0.6],
  [10, 36, 0.8],
  [-5, 34, 1],
];

// The heap in the tray, as [left, bottom] in px. Coins with a delay jostle as drops land.
const PILE: [number, number, number?][] = [
  [4, 2], [16, 1], [28, 2], [40, 1], [52, 2], [64, 1], [76, 2],
  [10, 6], [22, 7], [34, 6], [46, 7], [58, 6], [70, 7],
  [22, 11, 0.06], [34, 12, 0.46], [46, 11, 0.26], [58, 12, 0.86],
  [30, 16, 0.66], [42, 16, 1.06], [52, 15, 0.16],
];

// Order fills a 4-column grid; the long Rutgers name spans two columns.
// Logos live in public/sponsors.
const SPONSORS = [
  { name: "Google", logo: "/sponsors/google.svg", url: "https://about.google/" },
  { name: "OpenAI", logo: "/sponsors/openai.svg", url: "https://openai.com/about/" },
  { name: "Microsoft", logo: "/sponsors/microsoft.svg", url: "https://www.microsoft.com/en-us/about" },
  { name: "Amazon Web Services", logo: "/sponsors/aws.svg", url: "https://aws.amazon.com/about-aws/" },
  {
    name: "Rutgers Office of Climate Action",
    logo: "/sponsors/rutgers-climate-action.png",
    url: "https://climateaction.rutgers.edu/about/about-oca/",
    wide: true,
  },
  { name: "Adobe", logo: "/sponsors/adobe.svg", url: "https://www.adobe.com/about-adobe.html" },
  { name: "Canva", logo: "/sponsors/canva.svg", url: "https://www.canva.com/about/" },
  { name: "Celsius", logo: "/sponsors/celsius.svg", url: "https://www.celsius.com/" },
  { name: "Uber Eats", logo: "/sponsors/ubereats.svg", url: "https://www.ubereats.com/" },
  { name: "MLH", logo: "/sponsors/mlh.svg", url: "https://mlh.io/" },
];

const SCHEDULE = [
  { stage: "STAGE 1", time: "9:00 AM", title: "Check-in", body: "Pick up your badge and meet other hackers." },
  { stage: "STAGE 2", time: "9:30 AM", title: "Opening ceremony", body: "Welcome, rules, and team matching for solo hackers." },
  { stage: "STAGE 3", time: "10:00 AM", title: "Hacking begins", body: "Seven hours to build. Hacking runs until 5:00 PM." },
  { stage: "STAGE 4", time: "12:00 PM", title: "Brunch", body: "Served until 2:00 PM." },
  { stage: "STAGE 5", time: "2:00 PM", title: "Workshop 1", body: "" },
  { stage: "STAGE 6", time: "3:00 PM", title: "Workshop 2", body: "" },
  { stage: "BOSS", time: "5:00 PM", title: "Judging & dinner", body: "Hacking ends. Demo your project to the judges while dinner is served, until 7:30 PM." },
  { stage: "STAGE 8", time: "7:30 PM", title: "Closing, awards & pictures", body: "Game over at 8:30 PM." },
];

const FAQS = [
  {
    q: "What is a hackathon?",
    a: "An event where people team up to build a project, such as an app, website or hardware hack, in a short amount of time. No prior experience is needed.",
  },
  { q: "When and where is it?", a: `${EVENT.date}, ${EVENT.time}, at ${EVENT.venue}.` },
  { q: "How much does it cost?", a: "Nothing. MT-haCks is free to attend." },
  {
    q: "How big can teams be?",
    a: "Teams can have 1–4 people. If you don't have a team, register anyway and we'll match you with one at the start of the event.",
  },
  {
    q: "Do I need to be 18?",
    a: "Participants must be 18 or older. If you're under 18, contact the organizers for a guardian consent form.",
  },
  {
    q: "Will there be food?",
    a: "Yes. Tell us about any dietary restrictions or allergies on the registration form so we can plan for you.",
  },
  { q: "What should I bring?", a: "A laptop, a charger, and anything else you need to build your project." },
  { q: "I have another question.", a: `Email us at ${EVENT.contactEmail}.` },
];

export default function Home() {
  return (
    <>
      <ArcadeNav />

      <header className="hero" id="top">
        <div className="wrap">
          <div>
            <p className="kicker">{EVENT.organizer} presents</p>
            <h1 className="title">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-wordmark.png" alt="MT-haCks" width={1842} height={432} />
            </h1>
            <p className="tagline">{EVENT.tagline}</p>
            <div className="hero-actions">
              <Link className="btn gold big" href="/register">
                Register
              </Link>
              <a className="btn black" href="#faq">
                How to play
              </a>
            </div>
            <p className="blink">
              <span>INSERT COIN</span> &nbsp;·&nbsp; FREE PLAY
            </p>
          </div>

          <div className="cabinet" aria-label="Event details">
            <div className="marquee" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-wordmark.png" alt="" width={1842} height={432} />
            </div>
            <div className="bezel">
              <div className="crt hud">
                <div className="hud-top">
                  <span>1UP</span>
                  <span>NOV 21 2026</span>
                </div>
                <Countdown />
                <dl>
                  <div>
                    <dt>DATE</dt>
                    <dd>{EVENT.date}</dd>
                  </div>
                  <div>
                    <dt>TIME</dt>
                    <dd>{EVENT.time}</dd>
                  </div>
                  <div>
                    <dt>ARENA</dt>
                    <dd>{EVENT.venue}</dd>
                  </div>
                  <div>
                    <dt>PARTY</dt>
                    <dd>
                      <span className="hearts" aria-hidden="true">
                        <PixelHeart />
                        <PixelHeart />
                        <PixelHeart />
                        <PixelHeart />
                      </span>
                      1–4 players. Solo? We&apos;ll match you.
                    </dd>
                  </div>
                  <div>
                    <dt>CREDITS</dt>
                    <dd>Free to attend</dd>
                  </div>
                </dl>
                <div>
                  <div className="bar-label">
                    <span>HACK TIME</span>
                    <span>7 HRS</span>
                  </div>
                  <div className="bar" aria-hidden="true">
                    {Array.from({ length: 7 }, (_, i) => (
                      <i key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="deck" aria-hidden="true">
              <span className="stick">
                <i />
              </span>
              <span className="pbtns">
                {["--wine", "--gold", "--brass", "--maroon"].map((c) => (
                  <i key={c} style={{ "--c": `var(${c})` } as React.CSSProperties} />
                ))}
              </span>
            </div>
            <div className="coin-door" aria-hidden="true">
              <span className="coin-slot">
                <i />
                <span>25¢</span>
              </span>
              <span className="coin-return">
                <span className="label">RETURN</span>
                <span className="flap" />
                <span className="tray">
                  {PILE.map(([left, bottom, delay]) => (
                    <i
                      key={`${left}-${bottom}`}
                      className={delay === undefined ? undefined : "jostle"}
                      style={
                        {
                          left: `${left}px`,
                          bottom: `${bottom}px`,
                          animationDelay: delay === undefined ? undefined : `${delay}s`,
                        } as React.CSSProperties
                      }
                    />
                  ))}
                </span>
                {DROPS.map(([x, y, delay]) => (
                  <i
                    key={delay}
                    className="drop"
                    style={
                      {
                        "--x": `${x}px`,
                        "--y": `${y}px`,
                        animationDelay: `${delay}s`,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="stage" id="about">
          <div className="wrap">
            <div className="stage-head">
              <h2>Story mode</h2>
              <span className="tag">About the event</span>
            </div>
            <div className="about">
              <div className="copy">
                <p>
                  MT-haCks is a one-day hackathon hosted by the {EVENT.organizer}. Students come
                  together to design and build projects that solve a real problem for a real person
                  or community.
                </p>
                <p>
                  Whether this is your first hackathon or your tenth, you&apos;re welcome here. Come
                  with a team or come alone. We&apos;ll match solo hackers with teammates at the
                  start of the day.
                </p>
                <h3>Hack for impact</h3>
                <p>
                  We&apos;re looking for projects that work, not just demos. Think about who
                  you&apos;re building for and what would actually make their day better.
                </p>
              </div>
              <div className="panel classes">
                <p>SELECT YOUR CLASS</p>
                {CLASSES.map((c) => (
                  <div className="class" key={c.key}>
                    <span className="chip" style={{ background: c.color }}>
                      {c.key}
                    </span>
                    <div>
                      <b>{c.name}</b>
                      <span>{c.body}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="stage" id="schedule">
          <div className="wrap">
            <div className="stage-head">
              <h2>Stage select</h2>
              <span className="tag">Schedule · Sat Nov 21</span>
            </div>
            <ol className="stages">
              {SCHEDULE.map((s) => (
                <li key={s.time} className={`panel${s.stage === "BOSS" ? " boss" : ""}`}>
                  <span className="n">{s.stage}</span>
                  <time>{s.time}</time>
                  <div>
                    <b>{s.title}</b>
                    {s.body && <span>{s.body}</span>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="stage" id="faq">
          <div className="wrap">
            <div className="stage-head">
              <h2>How to play</h2>
              <span className="tag">Frequently asked questions</span>
            </div>
            <div className="faq">
              {FAQS.map((faq, i) => (
                <details key={faq.q} className="panel" open={i === 0}>
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="stage" id="sponsors">
          <div className="wrap">
            <div className="stage-head">
              <h2>Player 2</h2>
              <span className="tag">Sponsors</span>
            </div>
            <p className="lede">
              The organizations that make MT-haCks possible.
            </p>
            <ul className="sponsors">
              {SPONSORS.map((sponsor) => (
                <li key={sponsor.name} className={sponsor.wide ? "wide" : undefined}>
                  <a className="plate" href={sponsor.url} target="_blank" rel="noreferrer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={sponsor.logo} alt={sponsor.name} />
                  </a>
                </li>
              ))}
            </ul>
            <div className="panel coin">
              <div>
                <h3>Insert coin to sponsor</h3>
                <p>
                  Meet motivated student builders and get access to participant resumes for
                  recruiting. Email us and we&apos;ll send you more information.
                </p>
              </div>
              <a className="mail" href={`mailto:${EVENT.contactEmail}`}>
                {EVENT.contactEmail}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap">
          <div className="continue">
            <p>
              Continue? <span>Register now.</span>
            </p>
            <Link className="btn gold big" href="/register">
              Register
            </Link>
          </div>
          <div className="fine">
            <span>© 2026 {EVENT.organizer}</span>
            <span>Questions: {EVENT.contactEmail}</span>
            <Link href="/privacy">Privacy policy</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
