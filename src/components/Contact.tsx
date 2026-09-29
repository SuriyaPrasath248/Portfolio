import { site } from "@/content/site";
import Reveal from "./Reveal";
import CopyEmail from "./CopyEmail";
import { ArrowUpRight } from "./icons";

const socials = [
  { label: "GitHub", href: site.links.github },
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "X", href: site.links.x },
];

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1040px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-fg-3">Contact</p>
          <h2 className="font-display text-balance mt-2.5 max-w-[16ch] text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05] tracking-[-0.015em]">
            Building something with real-time media or AI? Say hello.
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className="border-b border-line-strong pb-0.5 font-mono text-[clamp(15px,2.2vw,18px)] transition-colors hover:border-fg"
            >
              {site.email}
            </a>
            <CopyEmail email={site.email} />
          </div>
        </Reveal>

        <Reveal delay={140}>
          <ul className="mt-7 flex gap-5 text-[14.5px]">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-fg-2 transition-colors hover:text-fg"
                >
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
