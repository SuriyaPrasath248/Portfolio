import { hero, site } from "@/content/site";
import Reveal from "./Reveal";
import { ArrowUpRight, Mail } from "./icons";

export default function Hero() {
  return (
    <section id="top" className="pt-16 pb-14 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-24">
      <div className="mx-auto max-w-[1040px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="mb-7 inline-flex items-center gap-2.5 font-mono text-[12.5px] tracking-[0.04em] text-fg-2">
            <span className="h-[7px] w-[7px] rounded-full bg-accent shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_22%,transparent)]" />
            {hero.kicker}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <h1 className="font-display text-balance max-w-[18ch] text-[clamp(2.6rem,6.2vw,4.6rem)] leading-[1.02] tracking-[-0.015em]">
            {hero.headline}
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-pretty mt-7 max-w-[62ch] text-[clamp(1.05rem,1.6vw,1.2rem)] leading-relaxed text-fg-2">
            {hero.lede}
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex h-[42px] items-center gap-2 rounded-full border border-fg bg-fg px-[18px] text-[14.5px] font-medium text-bg transition-colors hover:bg-fg/88"
            >
              <Mail /> Email me
            </a>
            <a
              href={site.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-[42px] items-center gap-2 rounded-full border border-line-strong px-[18px] text-[14.5px] font-medium transition-colors hover:border-fg-3 hover:bg-elev"
            >
              GitHub <ArrowUpRight />
            </a>
          </div>
        </Reveal>

        <Reveal delay={240}>
          <dl className="mt-12 grid max-w-[560px] grid-cols-3 gap-x-5 gap-y-2 border-t border-line pt-6 sm:gap-x-10">
            {hero.facts.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-display text-[1.6rem] leading-none">{f.value}</dd>
                <dd className="mt-1 text-[13px] text-fg-3">{f.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
