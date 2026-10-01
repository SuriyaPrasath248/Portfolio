import Link from "next/link";
import { caseLink, pipeline } from "@/content/site";
import Reveal from "./Reveal";
import { ArrowRight, Play } from "./icons";

// Home-page teaser for the NeoRecruit case study.
export default function Featured() {
  return (
    <section id="work" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-cyan">Featured work</p>
        </Reveal>

        <Reveal delay={60}>
          <div className="glow-card mt-6 grid gap-10 overflow-hidden p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
            <div>
              <h2 className="text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-[1] tracking-[-0.04em]">
                NeoRecruit<span className="text-gradient">.AI</span>
              </h2>
              <p className="mt-2 font-mono text-[12.5px] text-fg-3">2023 — now · sole engineer → technical lead</p>
              <p className="text-pretty mt-6 max-w-[52ch] text-[1.05rem] leading-relaxed text-fg-2">
                An AI interviewer that hiring teams actually use. It reads the CVs, interviews the candidate face to face
                through a real-time avatar, watches for cheating, and scores the conversation against the
                recruiter&apos;s own criteria. I designed and built all of it.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/neorecruit/"
                  className="group inline-flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-[14.5px] font-medium text-bg transition-transform hover:scale-[1.02]"
                >
                  Read the case study <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a
                  href={caseLink.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-[14.5px] transition-colors hover:border-fg-3"
                >
                  <Play className="h-[12px] w-[12px] text-cyan" /> {caseLink.label}
                </a>
              </div>
            </div>

            {/* Compact system map */}
            <ol className="grid gap-3 self-center sm:grid-cols-2">
              {pipeline.map((lane, i) => (
                <li key={lane.id} className="rounded-2xl border border-line bg-bg/60 p-4">
                  <p className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-fg-3">
                    {lane.title}
                    <span className="text-fg-3/70">0{i + 1}</span>
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    {lane.nodes.map((n, j) => (
                      <span key={n.id} className="flex items-center gap-1.5">
                        <span className="rounded-md border border-line-strong bg-elev px-2 py-1 text-[12px] text-fg">{n.label}</span>
                        {j < lane.nodes.length - 1 && <span className="text-[11px] text-violet">→</span>}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
