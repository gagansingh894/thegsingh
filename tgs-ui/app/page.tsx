import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Journey from "@/components/Journey";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatBubble from "@/components/ChatBubble";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <ScrollReveal>
        <About />
      </ScrollReveal>
      <hr className="border-none h-px bg-tgs-border max-w-[1200px] mx-auto" />
      <ScrollReveal>
        <Skills />
      </ScrollReveal>
      <hr className="border-none h-px bg-tgs-border max-w-[1200px] mx-auto" />
      <ScrollReveal>
        <Journey />
      </ScrollReveal>
      <hr className="border-none h-px bg-tgs-border max-w-[1200px] mx-auto" />
      <ScrollReveal>
        <Projects />
      </ScrollReveal>
      <hr className="border-none h-px bg-tgs-border max-w-[1200px] mx-auto" />
      <ScrollReveal>
        <Contact />
      </ScrollReveal>
      <Footer />
      <ChatBubble />
    </>
  );
}
