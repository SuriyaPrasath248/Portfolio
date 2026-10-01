import { site } from "@/content/site";
import Reveal from "./Reveal";
import CopyEmail from "./CopyEmail";
import { ArrowUpRight, Mail } from "./icons";

const socials = [
  { label: "GitHub", href: site.links.github },
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "X", href: site.links.x },
];

export default function Contact() {
  return (
    <section id="contact" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div className="breathe pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/15 blur-[140px]" />
      <div className="mx-auto max-w-[1180px] px-5 text-center sm:px-8 lg:px-12">
        <Reveal>
          <p className="font-serif text-[1.2rem] italic leading-none text-cyan">Contact</p>
          <h2 className="text-balance mx-auto mt-4 max-w-[18ch] text-[clamp(2.4rem,6vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            Hiring for <span className="text-gradient font-serif font-normal italic">AI engineering</span>? Let&apos;s talk.
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-fg px-6 text-[15px] font-medium text-bg transition-transform hover:scale-[1.02]"
            >
              <Mail /> {site.email}
            </a>
            <CopyEmail email={site.email} />
          </div>
        </Reveal>

        <Reveal delay={140}>
          <ul className="mt-8 flex justify-center gap-6 text-[14.5px]">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-fg-2 transition-colors hover:text-fg">
                  {s.label} <ArrowUpRight className="h-[12px] w-[12px]" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
