import type { Metadata } from "next";
import Nav from "@/components/Nav";
import JourneyTimeline from "@/components/JourneyTimeline";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Journey — G Singh",
  description: "Career timeline and experience.",
};

export default function JourneyPage() {
  return (
    <>
      <Nav />
      <main className="pt-16 min-h-screen">
        <div className="max-w-[860px] mx-auto px-6 md:px-10 py-20">
          {/* Header */}
          <div className="mb-16 pb-5 border-b border-tgs-border animate-fade-in-up">
            <div className="font-mono text-[11px] text-tgs-muted tracking-[0.12em] uppercase mb-2 flex items-center gap-2">
              <span className="block w-3.5 h-px bg-tgs-muted" />
              Career
            </div>
            <h1 className="font-sans text-[clamp(28px,4vw,48px)] font-extrabold leading-tight tracking-tight text-tgs-text">
              Journey
            </h1>
            <p className="font-mono text-[13px] text-tgs-body leading-[1.9] mt-4 max-w-[540px]">
              A timeline of roles, systems built, and problems solved — from ML
              engineering in Bangalore to distributed systems at scale in London.
            </p>
          </div>

          {/* Timeline */}
          <div className="animate-fade-in-up" style={{ animationDelay: "150ms" }}>
            <JourneyTimeline />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
