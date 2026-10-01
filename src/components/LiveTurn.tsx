"use client";

import { useEffect, useState } from "react";
import { liveTurn } from "@/content/site";

const tagColor: Record<string, string> = {
  mic: "text-ok",
  stt: "text-cyan",
  llm: "text-violet",
  tts: "text-cyan",
  avatar: "text-violet",
  vision: "text-fg-2",
};

// A real interview turn replayed line by line, like a log tail.
export default function LiveTurn() {
  const [n, setN] = useState(liveTurn.length);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Server render shows the full log; the replay starts on the first tick.
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      if (i > liveTurn.length + 3) i = 0; // hold the full log a moment, then replay
      setN(Math.min(i, liveTurn.length));
    }, 750);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="glow-card w-full max-w-[460px] overflow-hidden !rounded-2xl bg-elev/80 backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        <p className="flex items-center gap-2 font-mono text-[11px] text-fg-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-ok [animation:pulse-ring_1.6s_ease-out_infinite]" />
            <span className="relative h-2 w-2 rounded-full bg-ok" />
          </span>
          interview turn · live
        </p>
      </div>
      <ol className="min-h-[188px] space-y-1.5 px-4 py-3.5 font-mono text-[11.5px] leading-relaxed sm:text-[12px]">
        {liveTurn.slice(0, n).map((l) => (
          <li key={l.tag} className="flex gap-3">
            <span className="w-9 shrink-0 text-fg-3">{l.t}</span>
            <span className={`w-12 shrink-0 ${tagColor[l.tag]}`}>{l.tag}</span>
            <span className="text-fg-2">{l.text}</span>
          </li>
        ))}
        {n < liveTurn.length && (
          <li className="flex gap-3">
            <span className="w-9 text-fg-3">··</span>
            <span className="caret text-cyan">▍</span>
          </li>
        )}
      </ol>
    </div>
  );
}
