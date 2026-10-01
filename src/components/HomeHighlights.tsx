import Highlights from "./Highlights";
import Pipeline from "./Pipeline";
import Reveal from "./Reveal";

// The NeoRecruit story on the home page: how it works, then the hard parts.
export default function HomeHighlights() {
  return (
    <section className="pb-8">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="font-serif text-[1.2rem] italic leading-none text-cyan">How it works</p>
          <h2 className="mt-3 max-w-[24ch] text-[clamp(1.9rem,3.8vw,2.8rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
            Four AI pipelines, one product.
          </h2>
        </Reveal>
        <div className="mt-10">
          <Pipeline />
        </div>

        <Reveal className="mt-20">
          <p className="font-serif text-[1.2rem] italic leading-none text-cyan">Under the hood</p>
          <h2 className="mt-3 max-w-[24ch] text-[clamp(1.9rem,3.8vw,2.8rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
            Hard problems, solved.
          </h2>
        </Reveal>
        <div className="mt-10">
          <Highlights />
        </div>

      </div>
    </section>
  );
}
