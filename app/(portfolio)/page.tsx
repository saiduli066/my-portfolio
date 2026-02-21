import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import SectionTransition from "@/components/SectionTransition";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Deep gradient base layer */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, #0b0b0f 0%, #0f0f1a 40%, #0b0b0f 100%)",
        }}
      />

      <div className="relative z-10">
        <Hero />
        <SectionTransition>
          <About />
        </SectionTransition>
        <SectionTransition>
          <Skills />
        </SectionTransition>
        <SectionTransition>
          <Projects />
        </SectionTransition>
        <SectionTransition>
          <Contact />
        </SectionTransition>
      </div>
    </main>
  );
}
