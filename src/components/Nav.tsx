import Link from "next/link";

const links = [
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-3 flex h-[52px] max-w-[1180px] items-center justify-between mx-3 rounded-full border border-line/80 bg-bg/60 px-4 backdrop-blur-xl backdrop-saturate-150 sm:mx-6 sm:px-5 xl:mx-auto">
        <Link href="/" className="flex items-center" aria-label="Suriya Prasath, home">
          <span className="block leading-tight">
            <span className="block text-[14.5px] font-medium tracking-[-0.01em]">Suriya Prasath</span>
            <span className="block tabular-nums text-[10.5px] text-fg-3">AI Engineer</span>
          </span>
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-3.5 sm:gap-6">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[13px] text-fg-2 transition-colors hover:text-fg sm:text-[14px]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
