import Link from "next/link";
import Highlights from "./Highlights";
import Pipeline from "./Pipeline";
import Reveal from "./Reveal";
import { ArrowRight } from "./icons";

// The NeoRecruit story on the home page: how it works, then the hard parts.
export default function HomeHighlights() {
  return (
    <section className="pb-8">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-cyan">How it works</p>
          <h2 className="mt-3 max-w-[24ch] text-[clamp(1.9rem,3.8vw,2.8rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
            Four AI pipelines, one product.
          </h2>
        </Reveal>
        <div className="mt-10">
          <Pipeline />
        </div>

        <Reveal className="mt-24">
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-cyan">Under the hood</p>
          <h2 className="mt-3 max-w-[24ch] text-[clamp(1.9rem,3.8vw,2.8rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
            Problems I solved in production.
          </h2>
        </Reveal>
        <div className="mt-10">
          <Highlights />
        </div>

        <Reveal className="mt-10">
          <Link href="/neorecruit/" className="group inline-flex items-center gap-2 text-[15px] text-fg-2 transition-colors hover:text-fg">
            Full NeoRecruit case study <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
