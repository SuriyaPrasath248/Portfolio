import { roles, education, recognition } from "@/content/site";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-cyan">Experience</p>
          <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,2.6rem)] font-semibold tracking-[-0.03em]">Where I&apos;ve worked</h2>
        </Reveal>

        <ol className="relative mt-10 space-y-4 before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-px before:bg-gradient-to-b before:from-violet before:via-line-strong before:to-transparent md:before:left-[207px]">
          {roles.map((r, i) => (
            <Reveal as="li" key={r.org} delay={i * 60} className="relative grid gap-y-2 pl-8 md:grid-cols-[180px_minmax(0,1fr)] md:gap-x-14 md:pl-0">
              <span className={`absolute top-[7px] left-0 h-[15px] w-[15px] rounded-full border-2 md:left-[200px] ${i === 0 ? "border-cyan bg-cyan/30 shadow-[0_0_14px_var(--cyan)]" : "border-line-strong bg-bg"}`} />
              <p className="pt-1 font-mono text-[12.5px] text-fg-3 md:text-right">{r.when}</p>
              <div className={`glow-card p-5 sm:p-6 ${i === 0 ? "" : "opacity-90"}`}>
                <h3 className="text-[1.08rem] font-medium">
                  {r.title}
                  <span className="font-normal text-fg-3"> · {r.org}</span>
                </h3>
                <p className="mt-0.5 font-mono text-[11.5px] text-fg-3">{r.where}</p>
                <p className="text-pretty mt-3 max-w-[64ch] text-[15px] leading-relaxed text-fg-2">{r.body}</p>
              </div>
            </Reveal>
          ))}
          <Reveal as="li" delay={200} className="relative grid gap-y-1 pl-8 md:grid-cols-[180px_minmax(0,1fr)] md:gap-x-14 md:pl-0">
            <span className="absolute top-[7px] left-0 h-[15px] w-[15px] rounded-full border-2 border-line-strong bg-bg md:left-[200px]" />
            <p className="pt-1 font-mono text-[12.5px] text-fg-3 md:text-right">{education.when}</p>
            <p className="px-1 pt-0.5 text-[15px] text-fg-2">
              <span className="font-medium text-fg">{education.title}</span> · {education.org}
            </p>
          </Reveal>
        </ol>

        <ul className="mt-16 grid gap-4 md:grid-cols-3">
          {recognition.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 60} className="glow-card p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-violet">Recognition</p>
              <p className="mt-2 text-[15px] font-medium">{r.title}</p>
              <p className="mt-1 text-[14px] text-fg-2">{r.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
