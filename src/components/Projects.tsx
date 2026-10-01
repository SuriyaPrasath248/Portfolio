"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { xrProjects } from "@/content/site";
import Reveal from "./Reveal";
import { ArrowUpRight } from "./icons";

const base = process.env.NEXT_PUBLIC_BASE_PATH;

// Stacking cards: each card sticks a little lower than the previous one, and
// the card underneath shrinks and dims as the next slides over it.
export default function Projects() {
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cards = listRef.current ? [...listRef.current.children] as HTMLElement[] : [];
    if (!cards.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      cards.forEach((c, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const r = c.getBoundingClientRect();
        const nr = next.getBoundingClientRect();
        const covered = Math.max(0, Math.min(1, (r.bottom - nr.top) / r.height));
        c.style.transform = `scale(${1 - covered * 0.08})`;
        c.style.filter = `brightness(${1 - covered * 0.55})`;
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="projects" className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="font-serif text-[1.2rem] italic leading-none text-cyan">Projects</p>
          <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,2.6rem)] font-semibold tracking-[-0.03em]">Other things I&apos;ve shipped</h2>
          <p className="mt-2 max-w-[60ch] text-[15px] text-fg-2">Simulation and training software for metros, airports and banks.</p>
        </Reveal>

        <div ref={listRef} className="mx-auto mt-10 grid max-w-[900px] gap-8 pb-[10vh]">
          {xrProjects.map((p, i) => (
            <article
              key={p.title}
              className="sticky grid origin-top overflow-hidden rounded-[22px] border border-line-strong bg-elev will-change-transform md:min-h-[320px] md:grid-cols-[1.2fr_1fr]"
              style={{ top: `${88 + i * 20}px` }}
            >
              <div className="relative h-[180px] md:h-auto">
                <Image
                  src={`${base}${p.image}`}
                  alt={p.title}
                  fill
                  sizes="(min-width: 768px) 520px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-between gap-5 p-5 sm:p-6">
                <div>
                  <p className="tabular-nums text-[12.5px] text-fg-3">
                    {String(i + 1).padStart(2, "0")} / {String(xrProjects.length).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-[clamp(1.3rem,2.2vw,1.7rem)] font-semibold leading-tight tracking-[-0.03em]">{p.title}</h3>
                  <p className="mt-2 inline-flex rounded-full border border-cyan/30 bg-cyan/10 px-2.5 py-0.5 tabular-nums text-[11.5px] text-cyan">{p.tag}</p>
                  <p className="text-pretty mt-4 text-[14.5px] leading-relaxed text-fg-2">{p.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li key={t} className="rounded-lg bg-bg/70 px-2.5 py-1 tabular-nums text-[11.5px] text-fg-2 ring-1 ring-line-strong">{t}</li>
                    ))}
                  </ul>
                </div>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex w-fit items-center gap-1.5 text-[15px] text-cyan transition-colors hover:text-fg"
                >
                  View project <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
