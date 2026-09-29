import { caseStudy } from "@/content/site";
import Reveal from "./Reveal";
import { ArrowUpRight } from "./icons";

export default function CaseStudy() {
  return (
    <section id="work" className="border-t border-line py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1040px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-fg-3">Selected work</p>
        </Reveal>

        <div className="mt-10 grid gap-10 md:grid-cols-[220px_minmax(0,1fr)] md:gap-16">
          {/* Sticky aside */}
          <Reveal as="div" className="md:sticky md:top-[92px] md:self-start">
            <h2 className="font-display text-[1.8rem] leading-[1.1]">{caseStudy.name}</h2>
            <dl className="mt-3.5 grid gap-1.5 text-[13.5px] text-fg-2">
              <dt className="mt-2 font-mono text-[11.5px] uppercase tracking-[0.06em] text-fg-3">Period</dt>
              <dd>{caseStudy.period}</dd>
              <dt className="mt-2 font-mono text-[11.5px] uppercase tracking-[0.06em] text-fg-3">Role</dt>
              <dd>{caseStudy.role}</dd>
            </dl>
            <a
              href={caseStudy.href}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 border-b border-line-strong pb-px text-[14px] text-fg transition-colors hover:border-fg"
            >
              {caseStudy.hrefLabel} <ArrowUpRight className="h-[13px] w-[13px]" />
            </a>
          </Reveal>

          {/* Body */}
          <div>
            <div className="space-y-4">
              {caseStudy.summary.map((p, i) => (
                <Reveal key={i} delay={i * 60}>
                  <p className="text-pretty max-w-[64ch] text-[1.02rem] leading-relaxed text-fg-2">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <p className="mt-10 font-mono text-[12px] uppercase tracking-[0.08em] text-fg-3">Under the hood</p>
            </Reveal>

            <ol className="mt-3 border-t border-line">
              {caseStudy.underTheHood.map((item, i) => (
                <Reveal as="li" key={item.title} delay={80 + i * 50} className="grid grid-cols-[30px_minmax(0,1fr)] gap-4 border-b border-line py-[22px]">
                  <span className="pt-[5px] font-mono text-[12px] text-fg-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[1.02rem] font-medium tracking-[-0.005em]">{item.title}</h3>
                    <p className="text-pretty mt-1.5 max-w-[62ch] text-[15px] leading-relaxed text-fg-2">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={200}>
              <ul className="mt-7 flex flex-wrap gap-2" aria-label="Stack">
                {caseStudy.stack.map((s) => (
                  <li key={s} className="rounded-md border border-line bg-elev px-2.5 py-[5px] font-mono text-[12px] text-fg-2">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
