import { getPortfolio } from "@/lib/tgs-client";

export const dynamic = "force-dynamic";
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

export default async function Home() {
  const data = await getPortfolio();

  return (
    <>
      <Nav />
      <Hero about={data.about} />
      <ScrollReveal>
        <About about={data.about} />
      </ScrollReveal>
      <hr className="border-none h-px bg-tgs-border max-w-[1200px] mx-auto" />
      <ScrollReveal>
        <Skills skills={data.skills} />
      </ScrollReveal>
      <hr className="border-none h-px bg-tgs-border max-w-[1200px] mx-auto" />
      <ScrollReveal>
        <Journey journey={data.journey} />
      </ScrollReveal>
      <hr className="border-none h-px bg-tgs-border max-w-[1200px] mx-auto" />
      <ScrollReveal>
        <Projects projects={data.projects} />
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
