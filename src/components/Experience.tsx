"use client";

import { useEffect, useRef, useState } from "react";
import { roles, education, recognition } from "@/content/site";
import Reveal from "./Reveal";

// Pinned experience: the section locks in place while you scroll through it.
// Each scroll step advances one role — the card swaps in place and the big
// year rolls — then the page carries on. Dots jump straight to a role.
function RecIcon({ kind }: { kind: string }) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (kind === "trophy")
    return (<svg {...common}><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0Z" /><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" /></svg>);
  if (kind === "award")
    return (<svg {...common}><circle cx="12" cy="9" r="6" /><path d="m8.5 14 -1.5 7 5-3 5 3-1.5-7" /></svg>);
  return (<svg {...common}><circle cx="12" cy="15" r="6" /><path d="M8.5 9.5 5 3h5l2 4 2-4h5l-3.5 6.5" /><path d="m12 12.5.9 1.8 2 .3-1.45 1.4.35 2-1.8-.95-1.8.95.35-2-1.45-1.4 2-.3Z" /></svg>);
}

export default function Experience() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const n = roles.length;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = track.getBoundingClientRect();
      const span = track.offsetHeight - window.innerHeight;
      const p = span > 0 ? Math.max(0, Math.min(1, -r.top / span)) : 0;
      setActive(Math.min(n - 1, Math.floor(p * n)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [n]);

  const jumpTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const span = track.offsetHeight - window.innerHeight;
    const top = track.getBoundingClientRect().top + window.scrollY + ((i + 0.5) / n) * span;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section id="experience" className="pt-20 sm:pt-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="font-serif text-[1.2rem] italic leading-none text-cyan">Experience</p>
          <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,2.6rem)] font-semibold tracking-[-0.03em]">Where I&apos;ve worked</h2>
        </Reveal>
      </div>

      {/* Scroll track: one viewport-ish of scrolling per role */}
      <div ref={trackRef} className="relative" style={{ height: `${n * 75 + 25}svh` }}>
        <div className="sticky top-0 flex h-[100svh] items-center">
          <div className="mx-auto grid w-full max-w-[1180px] items-center gap-8 px-5 sm:px-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-14 lg:px-12">
            {/* Year + progress */}
            <div>
              <div className="h-[1em] overflow-hidden text-[clamp(4rem,12vw,9.5rem)] font-bold leading-none tracking-[-0.06em]">
                <div
                  className="transition-transform duration-[800ms] ease-[cubic-bezier(.2,.7,.2,1)]"
                  style={{ transform: `translateY(${-active}em)` }}
                >
                  {roles.map((r) => (
                    <div key={r.year} className="text-gradient h-[1em]">{r.year}</div>
                  ))}
                </div>
              </div>
              <p className="mt-3 tabular-nums text-[13px] text-fg-2">{roles[active].when}</p>

              <div className="mt-8 flex items-center gap-4">
                <span className="tabular-nums text-[12px] text-fg-3">
                  <span className="text-fg">{String(active + 1).padStart(2, "0")}</span> / {String(n).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-2" role="tablist" aria-label="Roles">
                  {roles.map((r, i) => (
                    <button
                      key={r.org}
                      type="button"
                      role="tab"
                      aria-selected={i === active}
                      aria-label={`${r.title}, ${r.org}`}
                      onClick={() => jumpTo(i)}
                      className={`h-1.5 cursor-pointer rounded-full transition-all duration-500 ${i === active ? "w-8 bg-cyan" : "w-1.5 bg-fg-3/60 hover:bg-fg-2"}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Card stack: all cards share one grid cell; only the active one shows */}
            <div className="grid [&>*]:col-start-1 [&>*]:row-start-1">
              {roles.map((r, i) => {
                const state = i === active ? "on" : i < active ? "past" : "next";
                return (
                  <article
                    key={r.org}
                    aria-hidden={state !== "on"}
                    className={`relative self-center overflow-hidden rounded-[24px] border border-violet/40 bg-elev shadow-[0_40px_90px_-45px_color-mix(in_srgb,var(--violet)_70%,transparent)] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${
                      state === "on"
                        ? "visible translate-y-0 scale-100 opacity-100"
                        : state === "past"
                          ? "invisible -translate-y-10 scale-[0.96] opacity-0"
                          : "invisible translate-y-10 scale-[0.96] opacity-0"
                    }`}
                  >
                    <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet to-cyan" />
                    <span className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-violet/20 blur-[70px]" />

                    <div className="relative p-6 sm:p-7">
                      <div className="flex items-center gap-3">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet to-cyan text-[17px] font-bold text-bg">
                          {r.org.charAt(0)}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-[15px] font-medium">{r.org}</p>
                          <p className="mt-0.5 flex flex-wrap items-center gap-2 tabular-nums text-[11.5px] text-fg-3">
                            <span>{r.when}</span>
                            <span className="rounded-full border border-line-strong px-2 py-px text-fg-2">{r.where}</span>
                          </p>
                        </div>
                        {i === 0 && (
                          <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ok/40 bg-ok/10 px-2.5 py-1 tabular-nums text-[11px] text-ok">
                            <span className="h-1.5 w-1.5 rounded-full bg-ok" /> Current
                          </span>
                        )}
                      </div>

                      <h3 className="mt-6 text-[clamp(1.25rem,2.2vw,1.55rem)] font-semibold leading-snug tracking-[-0.02em]">{r.title}</h3>
                      <p className="text-pretty mt-3 max-w-[60ch] text-[15px] leading-relaxed text-fg-2">{r.body}</p>

                      <ul className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
                        {r.tags.map((t) => (
                          <li key={t} className="rounded-lg bg-bg/70 px-2.5 py-1 tabular-nums text-[11.5px] text-fg-2 ring-1 ring-line-strong">{t}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1180px] px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
        <Reveal className="border-t border-line pt-6">
          <p className="text-[15px] text-fg-2">
            <span className="tabular-nums text-[12.5px] text-fg-3">{education.when}</span>
            <span className="mx-3 text-fg-3">·</span>
            <span className="font-medium text-fg">{education.title}</span> · {education.org}
          </p>
        </Reveal>

        <Reveal className="mt-20">
          <p className="font-serif text-[1.2rem] italic leading-none text-cyan">Recognition</p>
          <h3 className="mt-3 text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-[-0.03em]">Along the way</h3>
        </Reveal>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {recognition.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 80} className="group glow-card lift relative overflow-hidden p-6">
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet/25 to-cyan/20 text-cyan ring-1 ring-violet/30">
                  <RecIcon kind={r.icon} />
                </span>
                <span className="rounded-full border border-line-strong px-2.5 py-1 tabular-nums text-[11.5px] text-fg-2">{r.year}</span>
              </div>
              <p className="mt-6 text-[1.08rem] font-semibold leading-snug tracking-[-0.01em]">{r.title}</p>
              <p className="text-pretty mt-2 text-[14.5px] leading-relaxed text-fg-2">{r.body}</p>
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-violet to-cyan transition-transform duration-500 group-hover:scale-x-100" />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
