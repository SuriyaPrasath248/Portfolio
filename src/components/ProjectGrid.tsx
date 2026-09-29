import Image from "next/image";
import { projects, alsoBuilt } from "@/content/site";
import Reveal from "./Reveal";
import { ArrowUpRight } from "./icons";

export default function ProjectGrid() {
  return (
    <section className="border-t border-line py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1040px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-fg-3">VR &amp; immersive</p>
          <h2 className="font-display mt-2.5 text-[clamp(1.9rem,3.6vw,2.6rem)] leading-[1.1] tracking-[-0.01em]">
            Two years of training simulations, before the AI work.
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 50}>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="group block rounded-[10px] outline-offset-[6px]"
              >
                <figure className="m-0 aspect-[16/10] overflow-hidden rounded-[10px] border border-line bg-elev transition-colors group-hover:border-line-strong">
                  <Image
                    src={p.image}
                    alt={p.title}
                    width={1600}
                    height={1000}
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full object-cover saturate-[.9] transition-[transform,filter] duration-600 ease-out group-hover:scale-[1.025] group-hover:saturate-100"
                  />
                </figure>
                <div className="px-0.5 pt-3.5">
                  <h3 className="flex items-center justify-between gap-3 text-[1rem] font-medium">
                    {p.title}
                    <ArrowUpRight className="h-[14px] w-[14px] text-fg-3 transition-[transform,color] duration-250 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                  </h3>
                  <p className="text-pretty mt-1.5 text-[14.5px] leading-relaxed text-fg-2">{p.blurb}</p>
                  <p className="mt-2.5 font-mono text-[11.5px] text-fg-3">{p.tags.join(" · ")}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={100}>
          <div className="mt-10 border-t border-line pt-6">
            <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-fg-3">Also built</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {alsoBuilt.map((a) => (
                <li key={a.title} className="text-[14.5px] text-fg-2">
                  {a.href ? (
                    <a href={a.href} target="_blank" rel="noreferrer" className="font-medium text-fg border-b border-transparent hover:border-line-strong">
                      {a.title}
                    </a>
                  ) : (
                    <span className="font-medium text-fg">{a.title}</span>
                  )}
                  {" — "}
                  {a.blurb}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
