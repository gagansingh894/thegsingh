const timeline = [
  {
    company: "Deliveroo (DoorDash)",
    role: "Senior Software Engineer — White Label Delivery Platform",
    period: "Mar 2026 – Present",
    current: true,
    bullets: [
      "Building Deliveroo Express, a white label DaaS platform processing 900K+ deliveries contributing £10.4M+ annualised revenue via a Go/Rust event-driven architecture.",
      "Designed a secure token-based real-time order tracking system, unblocking commercial contracts with enterprise retail partners.",
    ],
  },
  {
    company: "Deliveroo (DoorDash)",
    role: "Senior Software Engineer — Ad Platform, Financial Systems & MLOps",
    period: "Apr 2025 – Feb 2026",
    current: false,
    bullets: [
      "Developed Ad Platform managing 35,000+ campaigns contributing £100M+ annual revenue.",
      "Scaled ML serving platform to 1000 RPS, resolving p99 latency regression from 30ms to sub-20ms via inference batching.",
      "Designed Targeting and Scheduling algorithms, driving 10% adoption of targeted campaigns.",
      "Led phased migration to decouple the Ad Platform from the financial system via async communication.",
    ],
  },
  {
    company: "Deliveroo",
    role: "Software Engineer — Ad Platform, Financial Systems & MLOps",
    period: "Feb 2022 – Mar 2025",
    current: false,
    bullets: [
      "Engineered low-latency ML serving for click probability prediction and auto-bidding, achieving sub-20ms p99.",
      "Delivered Ad Credits system and Co-Funded Campaigns, unlocking £3.5M annual revenue.",
      "Built Centralised Billing System for complex franchise hierarchies, unlocking £1.92M operational efficiency.",
      "Built proof-of-concept LLM-powered AI agent for campaign management.",
    ],
  },
  {
    company: "Thoucentric",
    role: "Machine Learning Engineer",
    period: "Nov 2020 – Jan 2022",
    current: false,
    bullets: [
      "Developed forecasting and commodity pricing models, cutting training times by 45% via containerisation.",
      "Designed scalable ML pipelines with distributed task execution across Kubernetes clusters.",
      "Built hyper-parameter tuning and model lifecycle frameworks, reducing development time by 30%.",
    ],
  },
  {
    company: "University of Nottingham",
    role: "MSc Data Science",
    period: "Sep 2019 – Sep 2020",
    current: false,
    bullets: [],
  },
];

export default function JourneyTimeline() {
  return (
    <div className="relative">
      {/* Vertical connecting line */}
      <div className="absolute left-[9px] top-3 bottom-3 w-px bg-tgs-border" />

      <div className="space-y-12">
        {timeline.map((entry, i) => (
          <div key={i} className="relative flex gap-8">
            {/* Node */}
            <div className="relative z-10 mt-1 shrink-0">
              <div
                className={`w-[19px] h-[19px] rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  entry.current
                    ? "border-tgs-text bg-tgs-bg shadow-[0_0_12px_rgba(232,232,232,0.25)]"
                    : "border-tgs-borderh bg-tgs-bg hover:border-tgs-text hover:shadow-[0_0_8px_rgba(232,232,232,0.15)]"
                }`}
              >
                {entry.current && (
                  <div className="w-[7px] h-[7px] rounded-full bg-tgs-text animate-pulse" />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 pb-2">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h3 className="font-sans text-[16px] font-bold text-tgs-text leading-snug">
                  {entry.role}
                </h3>
                {entry.current && (
                  <span className="font-mono text-[9px] text-tgs-text border border-tgs-borderh px-2 py-0.5 rounded-sm tracking-widest uppercase">
                    Current
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-[11px] text-tgs-muted tracking-wide">
                  {entry.company}
                </span>
                <span className="text-tgs-dim">·</span>
                <span className="font-mono text-[11px] text-tgs-dim tracking-wide">
                  {entry.period}
                </span>
              </div>
              {entry.bullets.length > 0 && (
                <ul className="space-y-2.5">
                  {entry.bullets.map((bullet, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="font-mono text-tgs-dim text-[12px] mt-0.5 shrink-0 select-none">
                        —
                      </span>
                      <span className="font-mono text-[12px] text-tgs-body leading-[1.8]">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
