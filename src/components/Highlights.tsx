import { highlights, type Highlight } from "@/content/site";
import Reveal from "./Reveal";

// ── Tiny illustrative visuals, one per highlight ──────────────────────────────

function Wave() {
  // Speech bars, then a flat "silent" stretch the guard blocks, then speech again.
  const bars = Array.from({ length: 48 }, (_, i) => i);
  return (
    <div className="relative flex h-24 items-center gap-[3px]">
      {bars.map((i) => {
        const silent = i >= 18 && i < 32;
        return (
          <span
            key={i}
            className={`w-full origin-center rounded-full ${silent ? "h-[3px] bg-fg-3/40" : "h-full bg-gradient-to-t from-violet to-cyan"}`}
            style={silent ? undefined : { animation: `wave ${0.9 + (i % 5) * 0.17}s ease-in-out ${(i % 7) * 0.08}s infinite` }}
          />
        );
      })}
      <span className="absolute left-[37.5%] right-[33.3%] -top-1 rounded-md border border-[#ff6b6b]/40 bg-[#ff6b6b]/10 py-0.5 text-center font-mono text-[10.5px] text-[#ff8f8f]">
        silence · blocked
      </span>
    </div>
  );
}

function Schema() {
  return (
    <pre className="overflow-hidden rounded-xl border border-line bg-bg/70 p-4 font-mono text-[11.5px] leading-[1.7] text-fg-2">
{`{
  "name": "score_candidate",
  "parameters": {
    "type": "object",
    "properties": {
      `}<span className="text-cyan">{`"communication"`}</span>{`: {
        "type": `}<span className="text-violet">{`"number"`}</span>{`,
        "description": "…criteria"
      },
      `}<span className="text-cyan">{`"problem_solving"`}</span>{`: { … },
      `}<span className="text-cyan">{`"role_fit"`}</span>{`: { … }
    },
    "required": [ … all metrics ]
  }
}`}
    </pre>
  );
}

function Face() {
  // Rough landmark cloud + scanning box.
  const pts: [number, number][] = [];
  for (let a = 0; a < 28; a++) {
    const t = (a / 28) * Math.PI * 2;
    pts.push([60 + Math.cos(t) * 34, 62 + Math.sin(t) * 44]);
  }
  const features: [number, number][] = [
    [46, 50], [50, 48], [54, 50], [66, 50], [70, 48], [74, 50],
    [60, 58], [58, 66], [62, 66], [50, 80], [55, 83], [60, 84], [65, 83], [70, 80],
  ];
  return (
    <div className="relative grid h-36 place-items-center">
      <svg viewBox="0 0 120 124" className="h-full" aria-hidden="true">
        <rect x="18" y="10" width="84" height="104" rx="8" fill="none" stroke="var(--cyan)" strokeOpacity="0.6" strokeDasharray="6 4" />
        {[...pts, ...features].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i >= pts.length ? 1.6 : 1.2} fill={i >= pts.length ? "var(--cyan)" : "var(--violet)"} />
        ))}
        <circle cx="50" cy="50" r="4" fill="none" stroke="var(--cyan)" strokeOpacity="0.8" />
        <circle cx="70" cy="50" r="4" fill="none" stroke="var(--cyan)" strokeOpacity="0.8" />
      </svg>
      <span className="absolute inset-x-[30%] top-3 h-px bg-cyan shadow-[0_0_12px_var(--cyan)] [animation:scan_2.6s_ease-in-out_infinite_alternate]" />
      <span className="absolute right-0 bottom-0 rounded-md border border-ok/40 bg-ok/10 px-2 py-0.5 font-mono text-[10.5px] text-ok">1 face · gaze ok</span>
    </div>
  );
}

function Timer() {
  return (
    <div className="flex h-36 items-center justify-center gap-6">
      <div className="relative h-28 w-28">
        <div className="absolute inset-0 rounded-full bg-[conic-gradient(var(--cyan)_0deg,var(--violet)_306deg,var(--line)_306deg)] [mask:radial-gradient(farthest-side,transparent_calc(100%-6px),#000_calc(100%-5px))]" />
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="text-[1.4rem] font-semibold tracking-[-0.02em]">17:00</p>
            <p className="font-mono text-[10px] text-fg-3">hot-swap</p>
          </div>
        </div>
      </div>
      <ul className="space-y-1.5 font-mono text-[11px] text-fg-2">
        <li><span className="text-fg-3">00:00</span> session A</li>
        <li><span className="text-cyan">17:00</span> B warms up</li>
        <li><span className="text-violet">17:0x</span> swap after sentence</li>
        <li><span className="text-fg-3">20:00</span> A would expire</li>
      </ul>
    </div>
  );
}

function Chunks() {
  const chunks = ["chunk_0", "chunk_1", "chunk_2", "chunk_3", "chunk_4"];
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {chunks.map((c, i) => (
          <div key={c} className="relative flex-1 overflow-hidden rounded-lg border border-line-strong bg-bg/60 px-2 py-2">
            <span className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet/40 to-cyan/40" style={{ animation: `fill 3s ease-out ${i * 0.45}s infinite` }} />
            <span className="relative font-mono text-[10.5px] text-fg-2">{c}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 font-mono text-[11px] text-fg-3">
        <span>5-min slices · retry ×3</span>
        <span className="h-px flex-1 bg-gradient-to-r from-line-strong to-cyan/60" />
        <span className="rounded-md border border-cyan/40 bg-cyan/10 px-2 py-1 text-cyan">FFmpeg merge → interview.webm</span>
      </div>
    </div>
  );
}

const visuals: Record<Highlight["visual"], () => React.ReactElement> = {
  wave: Wave,
  schema: Schema,
  face: Face,
  timer: Timer,
  chunks: Chunks,
};

export default function Highlights() {
  return (
    <ul className="grid gap-4 md:grid-cols-3 md:grid-rows-[auto_auto_auto]">
      {highlights.map((h, i) => {
        const V = visuals[h.visual];
        const span =
          h.span === "wide" ? "md:col-span-2" : h.span === "tall" ? "md:row-span-2" : "";
        return (
          <Reveal as="li" key={h.title} delay={i * 60} className={`glow-card flex flex-col gap-5 p-5 sm:p-6 ${span}`}>
            <V />
            <div className="mt-auto">
              <h3 className="text-[1.08rem] font-medium tracking-[-0.01em]">{h.title}</h3>
              <p className="text-pretty mt-1.5 text-[14.5px] leading-relaxed text-fg-2">{h.body}</p>
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}
