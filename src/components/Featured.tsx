import { caseLink } from "@/content/site";
import Reveal from "./Reveal";
import LiveTurn from "./LiveTurn";
import { Play } from "./icons";

// Home-page teaser for the NeoRecruit case study.
export default function Featured() {
  return (
    <section id="work" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="font-serif text-[1.2rem] italic leading-none text-cyan">Featured work</p>
        </Reveal>

        <Reveal delay={60}>
          <div className="glow-card lift mt-6 grid gap-10 overflow-hidden p-6 sm:p-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
            <div>
              <h2 className="text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-[1] tracking-[-0.04em]">
                NeoRecruit<span className="text-gradient">.AI</span>
              </h2>
              <p className="mt-2 tabular-nums text-[12.5px] text-fg-3">2023 — now · sole engineer → technical lead</p>
              <p className="text-pretty mt-6 max-w-[54ch] text-[1.05rem] leading-relaxed text-fg-2">
                An AI interviewer that hiring teams actually use. It reads the CVs, interviews the candidate face to face
                through a real-time avatar, watches for cheating, and scores the conversation against the
                recruiter&apos;s own criteria. I designed and built all of it.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={caseLink.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-[14.5px] font-medium text-bg transition-transform hover:scale-[1.02]"
                >
                  <Play className="h-[12px] w-[12px]" /> {caseLink.label}
                </a>
              </div>
            </div>

            <LiveTurn />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
