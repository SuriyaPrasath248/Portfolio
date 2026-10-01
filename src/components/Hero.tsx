import Link from "next/link";
import { hero, site } from "@/content/site";
import NeuralField from "./NeuralField";
import RotatingWord from "./RotatingWord";
import LiveTurn from "./LiveTurn";
import Reveal from "./Reveal";
import { ArrowRight, Mail } from "./icons";

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 lg:min-h-[100svh] lg:pb-20">
      {/* Ambient light */}
      <div className="pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[620px] w-[620px] rounded-full bg-violet/20 blur-[140px]" />
      <div className="pointer-events-none absolute top-[30%] right-[20%] -z-10 h-[420px] w-[420px] rounded-full bg-cyan/10 blur-[120px]" />

      {/* 3D network — sits behind the copy on mobile, to the right on desktop */}
      <NeuralField className="absolute inset-0 -z-10 opacity-60 lg:left-[38%] lg:opacity-100" />

      <div className="mx-auto grid max-w-[1180px] gap-12 px-5 sm:px-8 lg:min-h-[calc(100svh-12rem)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:px-12">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-elev/70 px-3 py-1.5 font-mono text-[11.5px] text-fg-2 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_var(--cyan)]" />
              {hero.kicker}
            </p>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="mt-7 text-[clamp(2.9rem,7.4vw,6rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
              {hero.headlineA}
              <br />
              <RotatingWord words={hero.rotating} />
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="text-pretty mt-7 max-w-[54ch] text-[clamp(1.02rem,1.5vw,1.15rem)] leading-relaxed text-fg-2">{hero.lede}</p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/neorecruit/"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-fg px-6 text-[15px] font-medium text-bg transition-transform hover:scale-[1.02]"
              >
                See how NeoRecruit works
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong bg-elev/50 px-5 text-[15px] backdrop-blur transition-colors hover:border-fg-3"
              >
                <Mail /> Email me
              </a>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <dl className="mt-12 grid max-w-[560px] grid-cols-3 gap-4 sm:gap-8">
              {hero.facts.map((f) => (
                <div key={f.label} className="border-l border-line-strong pl-3 sm:pl-4">
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="text-[clamp(1.5rem,3vw,2.1rem)] font-semibold tracking-[-0.03em]">{f.value}</dd>
                  <dd className="mt-1 text-[12.5px] leading-snug text-fg-3">{f.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={300} className="flex justify-center lg:justify-end lg:self-end">
          <LiveTurn />
        </Reveal>
      </div>
    </section>
  );
}
