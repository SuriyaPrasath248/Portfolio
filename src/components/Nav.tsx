import { site } from "@/content/site";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md backdrop-saturate-150">
      <div className="mx-auto flex h-[60px] max-w-[1040px] items-center justify-between px-4 sm:px-8 lg:px-12">
        <a href="#top" className="font-display text-[1.1rem] tracking-[-0.01em] sm:text-[1.25rem]">
          {site.name.split(" ")[0]} {site.name.split(" ")[1]}
        </a>
        <nav aria-label="Primary">
          <ul className="flex gap-4 sm:gap-7">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative py-1.5 text-[13px] text-fg-2 transition-colors hover:text-fg sm:text-[14px]"
                >
                  {l.label}
                  <span className="absolute inset-x-0 bottom-0.5 h-px origin-left scale-x-0 bg-fg transition-transform duration-250 ease-out group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
