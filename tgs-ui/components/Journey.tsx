import JourneyTimeline from "@/components/JourneyTimeline";

export default function Journey() {
  return (
    <section id="journey" className="py-[100px] px-6 md:px-10 max-w-[1200px] mx-auto">
      <div className="mb-14 pb-5 border-b border-tgs-border">
        <div className="font-mono text-[11px] text-tgs-muted tracking-[0.12em] uppercase mb-2 flex items-center gap-2">
          <span className="block w-3.5 h-px bg-tgs-muted" />
          Career
        </div>
        <h2 className="font-sans text-[clamp(28px,3.5vw,44px)] font-extrabold leading-[1.05] tracking-tight text-tgs-text">
          Journey
        </h2>
        <p className="font-mono text-[13px] text-tgs-body leading-[1.9] mt-4 max-w-[540px]">
          A timeline of roles, systems built, and problems solved — from ML
          engineering in Bangalore to distributed systems at scale in London.
        </p>
      </div>
      <JourneyTimeline />
    </section>
  );
}
