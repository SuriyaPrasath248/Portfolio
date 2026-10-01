import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import StackMarquee from "@/components/StackMarquee";
import Featured from "@/components/Featured";
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
        <StackMarquee />
        <Featured />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
