"use client";

import { useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [done, setDone] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch {
      /* clipboard blocked — the mailto link beside this still works */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`h-9 px-3 rounded-full border text-[13px] transition-colors duration-200 cursor-pointer
        ${done ? "border-accent text-accent" : "border-line-strong text-fg-2 hover:text-fg hover:border-fg-3"}`}
      aria-live="polite"
    >
      {done ? "Copied" : "Copy"}
    </button>
  );
}
