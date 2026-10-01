"use client";

import { useEffect, useState } from "react";

// Cycles through words with a short blur-fade. Server render shows the first word.
export default function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setShow(false);
      window.setTimeout(() => {
        setI((n) => (n + 1) % words.length);
        setShow(true);
      }, 280);
    }, 2400);
    return () => window.clearInterval(id);
  }, [words.length]);

  return (
    <span
      className={`text-gradient inline-block font-serif italic transition-all duration-300 ${show ? "opacity-100 blur-0 translate-y-0" : "opacity-0 blur-sm translate-y-1"}`}
      aria-live="off"
    >
      {words[i]}
    </span>
  );
}
