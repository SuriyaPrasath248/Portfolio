import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import VelocityMarquee from "@/components/VelocityMarquee";
import Featured from "@/components/Featured";
import HomeHighlights from "@/components/HomeHighlights";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GlowTracker from "@/components/GlowTracker";

export default function Home() {
  return (
    <>
      <GlowTracker />
      <Nav />
      <main>
        <Hero />
        <VelocityMarquee />
        <Featured />
        <HomeHighlights />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
