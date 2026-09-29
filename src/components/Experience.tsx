import { roles, education, recognition } from "@/content/site";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="border-t border-line py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1040px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-fg-3">Experience</p>
        </Reveal>

        <ol className="mt-8 border-t border-line">
          {roles.map((r, i) => (
            <Reveal as="li" key={r.org} delay={i * 50} className="grid gap-y-1.5 border-b border-line py-6 md:grid-cols-[170px_minmax(0,1fr)] md:gap-x-8">
              <p className="pt-1 font-mono text-[12.5px] text-fg-3">{r.when}</p>
              <div>
                <h3 className="text-[1.05rem] font-medium">
                  {r.title} <span className="font-normal text-fg-3">· {r.org} · {r.where}</span>
                </h3>
                <p className="text-pretty mt-1.5 max-w-[62ch] text-[15px] leading-relaxed text-fg-2">{r.body}</p>
              </div>
            </Reveal>
          ))}
          <Reveal as="li" delay={160} className="grid gap-y-1 border-b border-line py-5 md:grid-cols-[170px_minmax(0,1fr)] md:gap-x-8">
            <p className="pt-0.5 font-mono text-[12.5px] text-fg-3">{education.when}</p>
            <p className="text-[15px] text-fg-2">
              <span className="font-medium text-fg">{education.title}</span> · {education.org}
            </p>
          </Reveal>
        </ol>

        <Reveal delay={120}>
          <p className="mt-16 font-mono text-[12px] uppercase tracking-[0.08em] text-fg-3">Recognition</p>
        </Reveal>
        <ul className="mt-5 grid gap-5 md:grid-cols-3 md:gap-8">
          {recognition.map((r, i) => (
            <Reveal as="li" key={r.title} delay={150 + i * 50} className="border-t border-line pt-4">
              <p className="text-[15px] font-medium">{r.title}</p>
              <p className="mt-1 text-[14px] text-fg-2">{r.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
