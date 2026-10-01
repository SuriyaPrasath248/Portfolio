"use client";

import { useEffect, useRef, useState } from "react";

// Counts the number inside a stat like "4+", "~90%" or "1" up from zero the
// first time it scrolls into view. Server render shows the final value.
export default function CountUp({ value }: { value: string }) {
  const m = value.match(/^(\D*)(\d+)(.*)$/);
  const ref = useRef<HTMLSpanElement | null>(null);
  const [n, setN] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/^(\D*)(\d+)(.*)$/);
    if (!el || !match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = Number(match[2]);
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t: number) => {
        const k = Math.min(1, (t - t0) / 1400);
        setN(Math.round(target * (1 - Math.pow(1 - k, 3))));
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);

  if (!m) return <span>{value}</span>;
  return (
    <span ref={ref}>
      {m[1]}
      {n === null ? m[2] : n}
      {m[3]}
    </span>
  );
}
