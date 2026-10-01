"use client";

import { useEffect, useRef } from "react";
import { stack } from "@/content/site";

// Two rows of large words drifting in opposite directions. Scrolling speeds
// them up and skews them; scrolling up reverses them. Plain rAF, no libraries;
// pauses off-screen and stays static for reduced-motion users.
export default function VelocityMarquee() {
  const rootRef = useRef<HTMLElement | null>(null);
  const row1 = useRef<HTMLDivElement | null>(null);
  const row2 = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current, r1 = row1.current, r2 = row2.current;
    if (!root || !r1 || !r2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x1 = 0;
    let x2 = -r2.scrollWidth / 3;
    let dir = 1;
    let skew = 0;
    let lastY = window.scrollY;
    let visible = true;
    let raf = 0;

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { rootMargin: "100px" });
    io.observe(root);

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const y = window.scrollY;
      const vel = y - lastY; // px per frame
      lastY = y;
      if (vel !== 0) dir = vel > 0 ? 1 : -1;
      skew += (Math.max(-12, Math.min(12, -vel * 0.35)) - skew) * 0.15;
      if (!visible) return;

      const speed = 0.9 + Math.min(Math.abs(vel) * 0.25, 14);
      x1 -= speed * dir;
      x2 += speed * dir;
      const w1 = r1.scrollWidth / 3, w2 = r2.scrollWidth / 3;
      if (x1 <= -w1) x1 += w1;
      if (x1 > 0) x1 -= w1;
      if (x2 >= 0) x2 -= w2;
      if (x2 < -w2) x2 += w2;
      r1.style.transform = `translate3d(${x1}px,0,0) skewX(${skew}deg)`;
      r2.style.transform = `translate3d(${x2}px,0,0) skewX(${-skew}deg)`;
    };
    frame();
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);

  const half = Math.ceil(stack.length / 2);
  const rowA = stack.slice(0, half);
  const rowB = stack.slice(half);
  const words = (list: string[]) =>
    [...list, ...list, ...list].map((w, i) => (
      <span key={i} className={i % 2 ? "text-transparent [-webkit-text-stroke:1px_var(--line-strong)]" : ""}>
        {w}
      </span>
    ));

  return (
    <section ref={rootRef} aria-label="What I work with" className="overflow-hidden py-6">
      <p className="sr-only">{stack.join(", ")}</p>
      <div aria-hidden="true" className="border-y border-line py-5">
        <div ref={row1} className="flex w-max gap-14 whitespace-nowrap text-[clamp(2.4rem,6.5vw,5.2rem)] font-semibold leading-none tracking-[-0.04em] will-change-transform">
          {words(rowA)}
        </div>
      </div>
      <div aria-hidden="true" className="border-b border-line py-5">
        <div ref={row2} className="flex w-max gap-14 whitespace-nowrap text-[clamp(2.4rem,6.5vw,5.2rem)] font-semibold leading-none tracking-[-0.04em] will-change-transform">
          {words(rowB)}
        </div>
      </div>
    </section>
  );
}
