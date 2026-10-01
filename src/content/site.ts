// Single source of truth for everything on the page.
// Facts here are taken from the CV, the NeoRecruit codebase and its production
// logs — keep them accurate. No invented metrics.

export const site = {
  name: "Suriya Prasath M",
  role: "AI Engineer",
  url: "https://suriyaprasath248.github.io/Portfolio/",
  location: "Coimbatore, India",
  description:
    "AI engineer building real-time AI systems in production: AI interviews, speech, computer vision and semantic matching. Sole engineer on NeoRecruit.AI.",
  email: "m.s.prasath5818@gmail.com",
  links: {
    github: "https://github.com/SuriyaPrasath248",
    linkedin: "https://www.linkedin.com/in/suriya-prasath-m-0506ba165/",
    x: "https://x.com/MSPrasath5818",
    xHandle: "@MSPrasath5818",
  },
};

export const hero = {
  kicker: "AI Engineer · Technical Lead at NeoRecruit.AI",
  headlineA: "I build AI that",
  rotating: ["listens.", "talks back.", "watches.", "judges fairly."],
  lede:
    "4+ years building software; the last three spent engineering and leading the core AI of an interviewer that real hiring teams rely on, where speech, language, vision and evaluation reason together in real time.",
  facts: [
    { value: "4+", label: "years of experience" },
    { value: "4", label: "AI pipelines in production" },
    { value: "5", label: "interview languages" },
  ],
};

// One interview turn, replayed as a log tail. Deliberately generic.
export const liveTurn = [
  { t: "00.0", tag: "mic", text: "answer captured · speech detected ✓" },
  { t: "01.1", tag: "stt", text: "speech → text" },
  { t: "02.6", tag: "llm", text: "follow-up question generated" },
  { t: "03.0", tag: "tts", text: "reply voiced" },
  { t: "03.1", tag: "avatar", text: "avatar responds in real time" },
  { t: "∞", tag: "vision", text: "integrity checks running on-device" },
];

export type PipelineNode = {
  id: string;
  label: string;
  sub: string;
  detail: string;
};

export type PipelineLane = {
  id: string;
  title: string;
  nodes: PipelineNode[];
};

export const pipeline: PipelineLane[] = [
  {
    id: "screen",
    title: "Screening",
    nodes: [
      { id: "cv", label: "CV upload", sub: "bulk", detail: "Recruiters upload CVs in bulk; each is parsed into a structured profile." },
      { id: "embed", label: "Understand", sub: "semantic", detail: "CVs and the job description are compared by meaning, not by keyword overlap." },
      { id: "vec", label: "Rank", sub: "shortlist", detail: "Candidates are ranked against the role and the best are invited to the AI interview." },
    ],
  },
  {
    id: "interview",
    title: "Live interview",
    nodes: [
      { id: "mic", label: "Listen", sub: "silence guard", detail: "Silent or dead-mic recordings are caught before transcription, so the system never invents an answer the candidate didn't give." },
      { id: "stt", label: "Transcribe", sub: "speech → text", detail: "Spoken answers become text quickly enough to keep the conversation natural." },
      { id: "llm", label: "Reason", sub: "follow-ups", detail: "The model knows the job, the CV and the conversation so far, and asks the next question in the recruiter's language." },
      { id: "voice", label: "Respond", sub: "voice + avatar", detail: "Replies are voiced and delivered through a real-time avatar for a face-to-face feel." },
    ],
  },
  {
    id: "integrity",
    title: "Integrity",
    nodes: [
      { id: "cam", label: "Camera", sub: "on-device", detail: "Proctoring runs in the candidate's browser. Nothing is uploaded for analysis." },
      { id: "vision", label: "Vision", sub: "on-device models", detail: "Checks for missing faces, extra people and where the candidate is looking." },
      { id: "flags", label: "Report", sub: "risk score", detail: "Signals roll up into a risk score a recruiter can review." },
    ],
  },
  {
    id: "eval",
    title: "Evaluation",
    nodes: [
      { id: "schema", label: "Criteria", sub: "recruiter-defined", detail: "Each hiring team defines its own scoring criteria." },
      { id: "score", label: "Score", sub: "structured", detail: "The transcript is scored per criterion with written reasoning, returned as structured data rather than free text." },
      { id: "aicheck", label: "Authenticity", sub: "second pass", detail: "A second pass flags answers that look AI-generated rather than the candidate's own." },
    ],
  },
];

export type Highlight = {
  title: string;
  body: string;
  visual: "match" | "schema" | "face";
  span?: "wide" | "tall";
};

export const highlights: Highlight[] = [
  {
    title: "Semantic CV matching",
    body: "Hundreds of CVs ranked against a job by meaning, not keywords, so the right people reach the interview.",
    visual: "match",
  },
  {
    title: "Structured scoring",
    body: "Each recruiter criterion comes back as a score with reasoning, not free text.",
    visual: "schema",
  },
  {
    title: "On-device proctoring",
    body: "Integrity checks run in the browser. No video is uploaded for analysis.",
    visual: "face",
  },
];

// Kept deliberately high-level: capabilities, not vendors.
export const stack = [
  "LLMs", "Speech AI", "Computer vision", "Semantic search", "Real-time media",
  "Python", "TypeScript", "React", "Next.js", "Serverless cloud",
];

export type XrProject = { title: string; image: string; href: string; tag: string; summary: string; tags: string[] };

// Earlier career, kept short on purpose.
export const xrProjects: XrProject[] = [
  {
    title: "Kochi Metro Rail VR", image: "/images/km.webp", href: "https://www.youtube.com/watch?v=e3R1MZmnR-w", tag: "Best Booth, 15th UMI",
    summary: "Station walkthrough simulation for KMRL, shown to the Governor of Kerala and awarded Best Booth at the 15th Urban Mobility India conference.",
    tags: ["Unity", "OpenXR", "360° video"],
  },
  {
    title: "Kochi Water Metro VR", image: "/images/wm.webp", href: "https://www.youtube.com/watch?v=ITmuylA6ypc", tag: "KMRL",
    summary: "Companion simulation of the water-metro terminals for the same KMRL showcase.",
    tags: ["Unity", "OpenXR", "Simulation"],
  },
  {
    title: "Airport Logistics", image: "/images/atvr.webp", href: "https://drive.google.com/file/d/1Hxz0xkzJ5mI2Y1n9TxmHIabys5ufx8QQ/view", tag: "4× faster training",
    summary: "VR onboarding for ground operations. Reported 75% better retention and 4× faster training than the classroom version.",
    tags: ["Unity", "VR training", "Aviation"],
  },
  {
    title: "Federal Bank Gold Testing", image: "/images/fb.webp", href: "https://drive.google.com/file/d/1SMDjeqQj4UlSI-T0Iged9mvKXSRXUUFg/view", tag: "Banking",
    summary: "Procedure training for branch staff: the chemical checks used to verify gold, rebuilt as a hands-on VR module.",
    tags: ["Unity", "VR training", "Banking"],
  },
  {
    title: "Faulty Wire Tracing", image: "/images/fw.webp", href: "https://drive.google.com/file/d/1I_oOc0Wpujjc5qLqiRyOlo3Ph4766b0q/view", tag: "AR · IoT twin",
    summary: "Digital twin of a vehicle harness that traces a faulty wire through the real chassis in AR, driven by IoT sensor data.",
    tags: ["AR", "Digital twin", "IoT"],
  },
  {
    title: "Virtual Tourism", image: "/images/vt.webp", href: "https://drive.google.com/file/d/1qcrnDiVZe_6Izs8CDKLxCfD8Tc4YZxFV/view", tag: "Photogrammetry",
    summary: "Photogrammetry-scanned monuments you can walk through in VR.",
    tags: ["Photogrammetry", "VR", "3D"],
  },
];

export const caseLink = {
  href: "https://drive.google.com/file/d/182ktzJ09cAHHLcVS0OFF6HDJstgC2zp0/view?usp=sharing",
  label: "Watch the product walkthrough",
};

export const roles = [
  {
    year: "2023",
    tags: ["AI systems", "LLMs", "Speech", "Vision", "Leadership"],
    when: "Jul 2023 — now",
    title: "Software Developer → Technical Lead",
    org: "NeoRecruit.AI",
    where: "Remote",
    body: "Sole engineer on an AI hiring platform: AI interviews, speech, vision proctoring, CV matching and the infrastructure underneath. Took it from prototype to a product used by hiring teams.",
  },
  {
    year: "2022",
    tags: ["Unity", "XR", "Simulation"],
    when: "Nov 2022 — Jul 2023",
    title: "Unity XR Developer",
    org: "XR Horizon",
    where: "Kochi",
    body: "Industrial and transport VR simulations for KMRL, Britco and Federal Bank.",
  },
  {
    year: "2021",
    tags: ["Unity", "Mobile VR", "AR"],
    when: "Sep 2021 — Oct 2022",
    title: "Junior Unity Developer",
    org: "GrahasVR",
    where: "Remote",
    body: "Mobile VR safety training and educational AR.",
  },
];

export const education = {
  when: "2019 — 2023",
  title: "B.Tech, Information Technology",
  org: "Bannari Amman Institute of Technology",
};

export const recognition = [
  { title: "Smart India Hackathon", year: "2022", icon: "trophy", body: "National finalist in India's largest government-run hackathon." },
  { title: "Best Booth, Urban Mobility India", year: "2022", icon: "award", body: "Awarded at the 15th UMI conference for the KMRL VR simulation." },
  { title: "WorldSkills India", year: "2021", icon: "medal", body: "Wild-card entrant in 3D Game Art; later trained BRICS and WorldSkills medallists." },
] as const;
