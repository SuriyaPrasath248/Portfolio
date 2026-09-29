import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import CaseStudy from "@/components/CaseStudy";
import ProjectGrid from "@/components/ProjectGrid";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <CaseStudy />
        <ProjectGrid />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
