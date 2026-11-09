// Tracks and prizes. Mirrors the challenge list on the MLH event page:
// https://www.mlh.com/events/mt-hacks-fall-2026
// Copy lives here; src/components/TracksArcade.tsx renders it.

export type Tier = "hard" | "normal" | "easy";

export const TIERS: Record<Tier, { label: string; pips: number; name: string; blurb: string }> = {
  hard: {
    label: "Hard",
    pips: 3,
    name: "Final boss",
    blurb: "One prize for the best project of the day, judged across every track.",
  },
  normal: {
    label: "Medium",
    pips: 2,
    name: "Main tracks",
    blurb: "Every team picks one.",
  },
  easy: {
    label: "Easy",
    pips: 1,
    name: "Side quests",
    blurb: "Sponsor challenges you can go for on top of your main track.",
  },
};

export type Track = {
  id: string;
  tier: Tier;
  title: string;
  /** One-line pitch, shown on the card and at the top of the brief. */
  hook: string;
  prize: string;
  sponsor: {
    name: string;
    blurb: string;
    logo?: string;
    /** Set when the logo needs the dark screen behind it instead of the cream plate. */
    dark?: boolean;
    url?: string;
  };
  sections: { heading: string; body?: string; items?: string[] }[];
  /** Best Overall only: the shared rubric, in points out of 25 per line. */
  rubric?: { label: string; points: number }[];
  resources?: { label: string; url: string }[];
  mlhUrl: string;
};

export const TRACKS: Track[] = [
  {
    id: "best-overall",
    tier: "hard",
    title: "Best Overall",
    hook: "Best project of the day, judged across all tracks.",
    prize: "$300",
    sponsor: {
      name: "MT-haCks event prize",
      blurb: "Put up by the Muslim Tech Collaborative at Rutgers, the team that runs MT-haCks.",
      logo: "/logo-wordmark.png",
      dark: true,
    },
    sections: [
      {
        heading: "Who can enter",
        body: "Every team. Select Best Overall plus your one main track when you submit.",
      },
      {
        heading: "How it is judged",
        body: "Judges score every project on the same six-part rubric, 100 points in all.",
      },
    ],
    rubric: [
      { label: "Working system", points: 25 },
      { label: "Problem and user understanding", points: 20 },
      { label: "Technical rigor", points: 20 },
      { label: "Feasibility", points: 15 },
      { label: "Equity, privacy and trust", points: 10 },
      { label: "Presentation", points: 10 },
    ],
    mlhUrl: "https://www.mlh.com/events/mt-hacks-fall-2026/challenges/01a1bd85-f787-52bc-aba0-fc3f45ce2152",
  },
  {
    id: "climate-good",
    tier: "normal",
    title: "Climate Good",
    hook: "Turn public climate data into something a specific person can act on.",
    prize: "$200",
    sponsor: {
      name: "Rutgers Office of Climate Action",
      blurb: "The Rutgers office that leads the university's Climate Action Plan.",
      logo: "/sponsors/rutgers-climate-action.png",
      url: "https://climateaction.rutgers.edu/about/about-oca/",
    },
    sections: [
      {
        heading: "The mission",
        body: "Build a tool for energy use, emissions, waste, water, air quality or local climate risk, grounded in public data. Good sources: NOAA, EPA AirNow and EJScreen, NASA Earth data, EIA, Open-Meteo, Climate TRACE and Rutgers Climate Action.",
      },
      {
        heading: "The bar",
        body: "Action, not awareness. A facilities manager, a campus, a town or a household should be able to do something different because your tool exists.",
      },
      {
        heading: "Judges look for",
        items: [
          "Who it is for, and what that person did before your tool existed.",
          "Every estimate labeled as measured, modeled or assumed.",
          "What a human does when the data is wrong or missing.",
        ],
      },
    ],
    mlhUrl: "https://www.mlh.com/events/mt-hacks-fall-2026/challenges/01a1bd85-f7a2-4806-0147-5b1e997cfff5",
  },
  {
    id: "medtech",
    tier: "normal",
    title: "Medtech",
    hook: "Create solutions in healthcare that don't make diagnoses.",
    prize: "$200",
    sponsor: {
      name: "Muslims In Medicine",
      blurb: "Sponsor of the Medtech track.",
    },
    sections: [
      {
        heading: "The mission",
        body: "Build for care navigation, clinical workflow automation, population health explained in plain language, or outbreak early warning.",
      },
      {
        heading: "Hard rules",
        items: [
          "A human stays in the loop.",
          "No diagnostic claims.",
          "No real patient data. Use synthetic or public sources: Synthea, openFDA, CDC, ClinicalTrials.gov, HAPI FHIR, MedlinePlus.",
        ],
      },
      {
        heading: "Judges look for",
        items: ["Where the human sits in your system.", "What the system does with contradictory input."],
      },
    ],
    mlhUrl: "https://www.mlh.com/events/mt-hacks-fall-2026/challenges/01a1bd85-f7ca-06f7-28a7-132a142ecd41",
  },
  {
    id: "fintech",
    tier: "normal",
    title: "Fintech",
    hook: "Build financial tools people can actually trust.",
    prize: "$200",
    sponsor: {
      name: "Muslim Business Student Association",
      blurb: "Sponsor of the Fintech track.",
    },
    sections: [
      {
        heading: "The mission",
        body: "Ship a working financial product or an explainable quant tool: budgeting and savings, payments or remittances, lending alternatives, market or risk analysis, or tooling for financial institutions.",
      },
      {
        heading: "Judges look for",
        items: [
          "Transparency. Every output comes with a plain-words explanation a non-expert can follow.",
          "A clear statement of how the product handles interest and excessive uncertainty (gharar).",
          "Optional: proof of demand, such as signups or letters of intent from people who are not on your team.",
        ],
      },
      {
        heading: "Hard rules",
        items: [
          "Sandboxes only: Plaid Sandbox, Stripe test mode, Alpaca paper trading, SEC EDGAR, FRED.",
          "No real bank logins.",
          "No personalized investment advice.",
        ],
      },
    ],
    mlhUrl: "https://www.mlh.com/events/mt-hacks-fall-2026/challenges/01a1bd85-f7e5-c6ea-c9c6-57f68c4b88b3",
  },
  {
    id: "design",
    tier: "easy",
    title: "Design (UI/UX)",
    hook: "A custom logo and an interface someone could use without being told how.",
    prize: "$200",
    sponsor: {
      name: "Canva",
      blurb: "The online design platform. Fair game for your logo, pitch deck and mockups.",
      logo: "/sponsors/canva.svg",
      url: "https://www.canva.com/about/",
    },
    sections: [
      {
        heading: "Judges look for",
        items: [
          "Clarity. A first-time user knows what to do without being told.",
          "Accessibility: contrast, screen-reader support and plain language.",
          "Evidence of at least one test with a real person during the event, and what you changed because of it.",
        ],
      },
      {
        heading: "The logo",
        body: "Can someone who has never heard of your project tell what it does, and remember it an hour later? Distinctiveness and meaning beat polish.",
      },
      {
        heading: "Pro tip",
        body: "A rough prototype you tested beats a beautiful static mockup.",
      },
    ],
    mlhUrl: "https://www.mlh.com/events/mt-hacks-fall-2026/challenges/01a1bd85-f7fe-27b2-708f-9e8569807ef1",
  },
  {
    id: "browserbase",
    tier: "easy",
    title: "Best Use of Browserbase",
    hook: "Build an agent that does real work in a real browser.",
    prize: "TBD",
    sponsor: {
      name: "Browserbase",
      blurb: "Headless browser infrastructure for AI agents, and the team behind Stagehand, the open-source browser automation framework.",
      logo: "/sponsors/browserbase.png",
      url: "https://www.browserbase.com/about",
    },
    sections: [
      {
        heading: "The mission",
        body: "Use Browserbase and Stagehand to automate something that only works through a live website.",
        items: [
          "Filling government or benefits forms.",
          "Monitoring a page and acting on changes.",
          "Navigating a portal on a user's behalf.",
          "Pulling data that no API exposes.",
        ],
      },
      {
        heading: "Judges look for",
        items: [
          "The agent operating in the browser, not a diagram of it.",
          "What it does when the page doesn't match expectations.",
        ],
      },
    ],
    resources: [
      { label: "Browserbase docs", url: "https://docs.browserbase.com/" },
      { label: "Stagehand", url: "https://www.stagehand.dev/" },
    ],
    mlhUrl: "https://www.mlh.com/events/mt-hacks-fall-2026/challenges/01a1bd85-f81a-a762-e5fe-093950062202",
  },
  {
    id: "gemini",
    tier: "easy",
    title: "Best Use of Gemini",
    hook: "Use Google's models where they're strongest.",
    prize: "Digi Cam + Gemini Plushie",
    sponsor: {
      name: "Google",
      blurb: "Gemini API access through Google AI Studio, plus Gemma open models you can run on your own machine.",
      logo: "/sponsors/google.svg",
      url: "https://about.google/",
    },
    sections: [
      {
        heading: "The mission",
        body: "Build with the Gemini API (free key from Google AI Studio) or Gemma 4 open weights running locally or on a device.",
      },
      {
        heading: "Strong fits",
        items: [
          "Multilingual tools, with 140+ languages supported.",
          "On-device inference with the E2B and E4B models.",
          "Long-context analysis.",
          "Multimodal input.",
        ],
      },
      {
        heading: "Judges look for",
        body: "Proof that the model choice did something a generic call wouldn't.",
      },
      {
        heading: "Hard rules",
        body: "Don't send sensitive data through free-tier endpoints.",
      },
    ],
    resources: [
      { label: "Google AI Studio", url: "https://aistudio.google.com/" },
      { label: "Gemma models", url: "https://ai.google.dev/gemma" },
    ],
    mlhUrl: "https://www.mlh.com/events/mt-hacks-fall-2026/challenges/01a1bd85-f838-1561-3ed7-22a432cb9991",
  },
  {
    id: "snowflake",
    tier: "easy",
    title: "Best Use of Snowflake",
    hook: "Play with industry-leading LLMs on a single account using the Snowflake APIs.",
    prize: "Arduino Student Kit",
    sponsor: {
      name: "Snowflake",
      blurb: "The AI Data Cloud. One Snowflake account puts industry-leading LLMs behind a REST API.",
      logo: "/sponsors/snowflake.png",
      url: "https://www.snowflake.com/",
    },
    sections: [
      {
        heading: "The mission",
        body: "Call industry-leading LLMs from one Snowflake account. Adding AI to your project can take as little as a single cURL command to Snowflake's REST API. Build customized apps, RAG-powered chatbots or AI features in less time.",
      },
      {
        heading: "Perks",
        items: [
          "A special 120-day Snowflake trial for students.",
          "An example repository that shows the Snowflake REST API in action.",
        ],
      },
    ],
    resources: [
      {
        label: "Cortex LLM REST API docs",
        url: "https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-llm-rest-api",
      },
    ],
    mlhUrl: "https://www.mlh.com/events/mt-hacks-fall-2026/challenges/019d440d-07ed-9281-d3e6-34b7395833cc",
  },
];
