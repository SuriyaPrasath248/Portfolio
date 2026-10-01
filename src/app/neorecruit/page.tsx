import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import GlowTracker from "@/components/GlowTracker";
import Reveal from "@/components/Reveal";
import Pipeline from "@/components/Pipeline";
import Highlights from "@/components/Highlights";
import NeuralField from "@/components/NeuralField";
import { ArrowLeft, Play } from "@/components/icons";
import { caseLink, site, stack } from "@/content/site";

export const metadata: Metadata = {
  title: `NeoRecruit.AI — case study · ${site.name}`,
  description:
    "How I built NeoRecruit.AI: an AI interviewer that screens CVs, runs live spoken interviews through a real-time avatar, proctors on-device and scores against the recruiter's own criteria.",
};

const meta = [
  { k: "Role", v: "Sole engineer → Technical Lead" },
  { k: "Timeline", v: "Jul 2023 — now" },
  { k: "Status", v: "In pilot with real hiring teams" },
  { k: "Impact", v: "~90% less manual screening" },
];

const flow = [
  { n: "01", t: "Shortlist", d: "Recruiter uploads CVs in bulk. They're parsed, embedded and ranked against the job by semantic similarity." },
  { n: "02", t: "Interview", d: "The candidate talks to a real-time AI avatar that asks follow-ups from their own answers, in the recruiter's language." },
  { n: "03", t: "Proctor", d: "Vision models in the browser check for extra people, missing faces, gaze, tab switches and extra monitors." },
  { n: "04", t: "Score", d: "The transcript is scored against the recruiter's own criteria, with a second pass for AI-generated answers." },
];

export default function NeoRecruitPage() {
  return (
    <>
      <GlowTracker />
      <Nav />
      <main>
        {/* Header */}
        <section className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
          <NeuralField className="absolute inset-0 -z-10 opacity-35" />
          <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-violet/20 blur-[150px]" />
          <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
            <Reveal>
              <Link href="/" className="inline-flex items-center gap-1.5 text-[13.5px] text-fg-2 transition-colors hover:text-fg">
                <ArrowLeft className="h-[13px] w-[13px]" /> Back home
              </Link>
            </Reveal>
            <Reveal delay={50}>
              <p className="mt-8 font-mono text-[12px] uppercase tracking-[0.14em] text-cyan">Case study</p>
              <h1 className="mt-3 text-[clamp(3rem,9vw,7rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
                NeoRecruit<span className="text-gradient">.AI</span>
              </h1>
            </Reveal>
            <Reveal delay={110}>
              <p className="text-pretty mt-6 max-w-[60ch] text-[clamp(1.05rem,1.7vw,1.25rem)] leading-relaxed text-fg-2">
                An AI interviewer for hiring teams. It screens CVs, runs a live spoken interview through a real-time avatar,
                proctors with computer vision in the browser, and scores the conversation against the recruiter&apos;s own
                criteria. I&apos;ve been its only engineer for three years.
              </p>
            </Reveal>
            <Reveal delay={170}>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href={caseLink.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-fg px-6 text-[15px] font-medium text-bg transition-transform hover:scale-[1.02]"
                >
                  <Play className="h-[13px] w-[13px]" /> Watch the product walkthrough
                </a>
              </div>
            </Reveal>
            <Reveal delay={220}>
              <dl className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
                {meta.map((m) => (
                  <div key={m.k} className="border-l border-line-strong pl-4">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-3">{m.k}</dt>
                    <dd className="mt-1.5 text-[15px] text-fg">{m.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* What it does */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
            <Reveal>
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-cyan">What it does</p>
              <h2 className="mt-3 max-w-[22ch] text-[clamp(1.9rem,3.8vw,2.8rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
                From a pile of CVs to a scored interview, without a human in the loop.
              </h2>
            </Reveal>
            <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {flow.map((f, i) => (
                <Reveal as="li" key={f.n} delay={i * 60} className="glow-card p-5">
                  <p className="font-mono text-[12px] text-violet">{f.n}</p>
                  <h3 className="mt-3 text-[1.15rem] font-medium">{f.t}</h3>
                  <p className="text-pretty mt-2 text-[14.5px] leading-relaxed text-fg-2">{f.d}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Architecture */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
            <Reveal>
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-cyan">Architecture</p>
              <h2 className="mt-3 max-w-[24ch] text-[clamp(1.9rem,3.8vw,2.8rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
                Four AI pipelines, one product.
              </h2>
              <p className="text-pretty mt-3 max-w-[62ch] text-[15.5px] leading-relaxed text-fg-2">
                A recruiter dashboard, a candidate interview app and a serverless backend, multi-tenant and secured with
                MFA and role-based access.
              </p>
            </Reveal>
            <div className="mt-10">
              <Pipeline />
            </div>
          </div>
        </section>

        {/* Hard problems */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
            <Reveal>
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-cyan">Hard problems</p>
              <h2 className="mt-3 max-w-[24ch] text-[clamp(1.9rem,3.8vw,2.8rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
                The parts that broke in production, and how I fixed them.
              </h2>
            </Reveal>
            <div className="mt-10">
              <Highlights />
            </div>
          </div>
        </section>

        {/* Stack + media */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto grid max-w-[1180px] gap-6 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:px-12">
            <Reveal className="glow-card p-6 sm:p-8">
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-cyan">Stack</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {stack.map((s) => (
                  <li key={s} className="rounded-lg border border-line-strong bg-bg/60 px-3 py-1.5 font-mono text-[12.5px] text-fg-2">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={80}>
              <a
                href={caseLink.href}
                target="_blank"
                rel="noreferrer"
                className="group glow-card flex h-full flex-col justify-between gap-8 p-6 sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-line-strong bg-bg/60 text-cyan">
                    <Play className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-medium">Product walkthrough</p>
                    <p className="font-mono text-[11.5px] text-fg-3">Video · Google Drive</p>
                  </div>
                </div>
                <p className="inline-flex items-center gap-2 text-[15px] text-fg transition-colors group-hover:text-cyan">
                  <Play className="h-[12px] w-[12px]" /> Open the folder
                </p>
              </a>
            </Reveal>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
