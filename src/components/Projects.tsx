import Image from "next/image";
import { xrProjects } from "@/content/site";
import Reveal from "./Reveal";
import { ArrowUpRight } from "./icons";

const base = process.env.NEXT_PUBLIC_BASE_PATH;

export default function Projects() {
  return (
    <section id="projects" className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-cyan">Projects</p>
          <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,2.6rem)] font-semibold tracking-[-0.03em]">Other things I&apos;ve shipped</h2>
          <p className="mt-2 max-w-[60ch] text-[15px] text-fg-2">Simulation and training software for metros, airports and banks.</p>
        </Reveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {xrProjects.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 50}>
              <a href={p.href} target="_blank" rel="noreferrer" className="group glow-card block overflow-hidden">
                <figure className="m-0 aspect-[16/10] overflow-hidden">
                  <Image
                    src={`${base}${p.image}`}
                    alt={p.title}
                    width={1600}
                    height={1000}
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full object-cover opacity-85 transition-[transform,opacity] duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
                  />
                </figure>
                <div className="flex items-center justify-between gap-3 px-4 py-3.5">
                  <div>
                    <h3 className="text-[15px] font-medium">{p.title}</h3>
                    <p className="mt-0.5 font-mono text-[11.5px] text-fg-3">{p.tag}</p>
                  </div>
                  <ArrowUpRight className="text-fg-3 transition-colors group-hover:text-cyan" />
                </div>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
