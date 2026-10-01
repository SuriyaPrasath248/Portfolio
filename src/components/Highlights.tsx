import { highlights, type Highlight } from "@/content/site";
import Reveal from "./Reveal";

// ── Tiny illustrative visuals, one per highlight ──────────────────────────────

const MATCHES = [
  { name: "Candidate A", pct: 92 },
  { name: "Candidate B", pct: 81 },
  { name: "Candidate C", pct: 64 },
];

function Match() {
  return (
    <div className="flex h-20 flex-col justify-center gap-2">
      {MATCHES.map((m, i) => (
        <div key={m.name} className="flex items-center gap-3 tabular-nums text-[12px]">
          <span className="w-20 shrink-0 text-fg-2">{m.name}</span>
          <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-line">
            <span
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet to-cyan"
              style={{ width: `${m.pct}%`, animation: `grow 1.4s var(--ease-out-soft) ${i * 0.15}s both` }}
            />
          </span>
          <span className={i === 0 ? "w-8 text-right text-cyan" : "w-8 text-right text-fg-3"}>{m.pct}%</span>
        </div>
      ))}
    </div>
  );
}

function Schema() {
  return (
    <div className="flex h-20 flex-col justify-center rounded-xl border border-line bg-bg/70 px-4 font-mono text-[11.5px] leading-[1.6] text-fg-2">
      <p className="truncate">
        <span className="text-cyan">communication</span>: <span className="text-violet">8</span> <span className="text-fg-3">· “clear, structured…”</span>
      </p>
      <p className="truncate">
        <span className="text-cyan">problem_solving</span>: <span className="text-violet">7</span> <span className="text-fg-3">· “good trade-offs…”</span>
      </p>
    </div>
  );
}

// Landmarks for a stylised frontal face (viewBox 0 0 120 120).
const L: Record<string, [number, number]> = {
  top: [60, 16], tl: [38, 24], tr: [82, 24], cl: [28, 50], cr: [92, 50],
  jl: [34, 80], jr: [86, 80], chin: [60, 102], cl2: [45, 96], cr2: [75, 96],
  bl: [38, 42], br: [82, 42], bm: [60, 44],
  el: [46, 52], er: [74, 52], eli: [53, 52], eri: [67, 52], elo: [39, 52], ero: [81, 52],
  nb: [60, 56], nt: [60, 68], nl: [55, 69], nr: [65, 69],
  ml: [50, 81], mr: [70, 81], mt: [60, 79], mb: [60, 85],
};
const MESH: [string, string][] = [
  ["top", "tl"], ["top", "tr"], ["tl", "cl"], ["tr", "cr"], ["cl", "jl"], ["cr", "jr"], ["jl", "cl2"], ["jr", "cr2"],
  ["cl2", "chin"], ["cr2", "chin"], ["tl", "bl"], ["tr", "br"], ["top", "bm"], ["bl", "bm"], ["br", "bm"],
  ["bl", "elo"], ["br", "ero"], ["bm", "nb"], ["eli", "nb"], ["eri", "nb"], ["nb", "nt"], ["nt", "nl"], ["nt", "nr"],
  ["elo", "cl"], ["ero", "cr"], ["nl", "ml"], ["nr", "mr"], ["ml", "jl"], ["mr", "jr"], ["ml", "mb"], ["mr", "mb"],
  ["mb", "chin"], ["mt", "nt"], ["el", "nl"], ["er", "nr"],
];

function Face() {
  return (
    <div className="flex h-20 items-center justify-center gap-5">
      <div className="relative h-full">
        <svg viewBox="0 0 120 120" className="h-full" aria-hidden="true">
          <defs>
            <linearGradient id="faceg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="var(--violet)" />
              <stop offset="1" stopColor="var(--cyan)" />
            </linearGradient>
          </defs>
          {/* detection corners */}
          <g stroke="var(--cyan)" strokeWidth="2.5" fill="none" strokeLinecap="round">
            <path d="M12 24V10h14M108 24V10H94M12 96v14h14M108 96v14H94" />
          </g>
          {/* mesh */}
          <g stroke="url(#faceg)" strokeOpacity="0.35" strokeWidth="0.8">
            {MESH.map(([a, b]) => (
              <line key={a + b} x1={L[a][0]} y1={L[a][1]} x2={L[b][0]} y2={L[b][1]} />
            ))}
          </g>
          {/* features */}
          <g fill="none" stroke="url(#faceg)" strokeWidth="1.6" strokeLinecap="round">
            <path d="M60 16C80 16 92 31 92 50c0 22-11 40-32 52C39 90 28 72 28 50c0-19 12-34 32-34Z" strokeOpacity="0.8" />
            <path d="M39 44q7-5 15-1M66 43q8-4 15 1" />
            <path d="M39 52q7-5 14 0q-7 4-14 0ZM67 52q7-5 14 0q-7 4-14 0Z" />
            <path d="M60 56l-4 12q4 2 8 0" strokeOpacity="0.8" />
            <path d="M50 81q10-4 20 0q-10 6-20 0Z" />
          </g>
          <circle cx="46" cy="52" r="2.4" fill="var(--cyan)" />
          <circle cx="74" cy="52" r="2.4" fill="var(--cyan)" />
          {Object.values(L).map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.1" fill="var(--fg)" fillOpacity="0.85" />
          ))}
        </svg>
        <span className="absolute inset-x-[10%] top-[8%] h-px bg-cyan shadow-[0_0_10px_var(--cyan)] [animation:scan-sm_2.2s_ease-in-out_infinite_alternate]" />
      </div>
      <ul className="space-y-1 text-[12px]">
        <li className="flex items-center gap-1.5 text-ok"><span className="h-1.5 w-1.5 rounded-full bg-ok" /> 1 face</li>
        <li className="flex items-center gap-1.5 text-ok"><span className="h-1.5 w-1.5 rounded-full bg-ok" /> 1 person</li>
        <li className="flex items-center gap-1.5 text-cyan"><span className="h-1.5 w-1.5 rounded-full bg-cyan" /> gaze on screen</li>
      </ul>
    </div>
  );
}

const visuals: Partial<Record<Highlight["visual"], () => React.ReactElement>> = {
  match: Match,
  schema: Schema,
  face: Face,
};

export default function Highlights() {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {highlights.map((h, i) => {
        const V = visuals[h.visual];
        return (
          <Reveal as="li" key={h.title} delay={i * 60} className="glow-card lift flex flex-col gap-5 p-5">
            {V && <V />}
            <div className="mt-auto">
              <h3 className="text-[1rem] font-medium tracking-[-0.01em]">{h.title}</h3>
              <p className="text-pretty mt-1 text-[14px] leading-relaxed text-fg-2">{h.body}</p>
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}
