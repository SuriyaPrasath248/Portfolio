"use client";

import { useState } from "react";
import { pipeline } from "@/content/site";
import Reveal from "./Reveal";

// Interactive system map: four lanes of the NeoRecruit pipeline. Selecting a
// node explains what that stage does. Connectors carry an animated signal.
export default function Pipeline() {
  const [sel, setSel] = useState<{ lane: string; node: string }>({ lane: "interview", node: "stt" });

  return (
    <div className="space-y-4">
      {pipeline.map((lane, li) => {
        const active = lane.nodes.find((n) => sel.lane === lane.id && sel.node === n.id);
        return (
          <Reveal key={lane.id} delay={li * 90} className="glow-card p-4 sm:p-5">
            <div className="grid gap-4 lg:grid-cols-[150px_minmax(0,1fr)] lg:items-center">
              <p className="text-[14px] font-medium text-fg-2">
                <span className="mr-2 font-serif text-[1.1rem] italic text-violet">0{li + 1}</span>
                {lane.title}
              </p>

              <ol className="flex flex-col items-stretch gap-0 sm:flex-row sm:items-center">
                {lane.nodes.map((n, i) => {
                  const on = sel.lane === lane.id && sel.node === n.id;
                  return (
                    <li key={n.id} style={{ ["--i" as string]: i }} className="stagger-item flex flex-col items-stretch sm:flex-1 sm:flex-row sm:items-center">
                      <button
                        type="button"
                        onClick={() => setSel({ lane: lane.id, node: n.id })}
                        aria-pressed={on}
                        className={`group relative w-full cursor-pointer rounded-xl border px-3.5 py-3 text-left transition-all sm:min-w-0 ${
                          on
                            ? "border-cyan/60 bg-cyan/[0.07] shadow-[0_0_0_1px_color-mix(in_srgb,var(--cyan)_30%,transparent),0_10px_40px_-12px_color-mix(in_srgb,var(--cyan)_50%,transparent)]"
                            : "border-line-strong bg-bg/50 hover:border-fg-3"
                        }`}
                      >
                        <span className="block text-[14px] font-medium leading-tight">{n.label}</span>
                        <span className="mt-0.5 block truncate text-[12px] text-fg-3">{n.sub}</span>
                      </button>
                      {i < lane.nodes.length - 1 && (
                        <svg className="mx-auto h-6 w-4 shrink-0 sm:h-4 sm:w-10" viewBox="0 0 40 16" preserveAspectRatio="none" aria-hidden="true">
                          <line x1="0" y1="8" x2="40" y2="8" className="hidden sm:block" stroke="var(--line-strong)" strokeWidth="2" />
                          <line x1="0" y1="8" x2="40" y2="8" className="flow hidden sm:block" stroke="var(--cyan)" strokeWidth="2" />
                          <line x1="20" y1="0" x2="20" y2="16" className="flow sm:hidden" stroke="var(--cyan)" strokeWidth="2" />
                        </svg>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>

            <div
              className={`grid transition-all duration-500 ${active ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              aria-live="polite"
            >
              <div className="overflow-hidden">
                {active && (
                  <p className="rounded-xl border border-line bg-bg/60 px-4 py-3 text-[14.5px] leading-relaxed text-fg-2 lg:ml-[166px]">
                    <span className="mr-2 font-medium text-fg">{active.label}.</span>
                    {active.detail}
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        );
      })}
      <p className="pl-1 text-[13px] text-fg-3">Tap any stage to see what it does.</p>
    </div>
  );
}
