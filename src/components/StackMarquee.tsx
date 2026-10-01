import { stack } from "@/content/site";

export default function StackMarquee() {
  const row = [...stack, ...stack];
  return (
    <section aria-label="Tools I work with" className="relative overflow-hidden border-y border-line py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />
      <ul className="marquee flex w-max gap-10 whitespace-nowrap">
        {row.map((s, i) => (
          <li key={i} className="flex items-center gap-10 text-[15px] text-fg-2">
            {s}
            <span className="h-1 w-1 rounded-full bg-violet/70" />
          </li>
        ))}
      </ul>
    </section>
  );
}
