import type { TimelineEntry } from "@/types";

interface Props { journey: TimelineEntry[] }

export default function JourneyTimeline({ journey }: Props) {
  return (
    <div className="relative">
      <div className="absolute left-[9px] top-3 bottom-3 w-px bg-tgs-border" />

      <div className="space-y-12">
        {journey.map((entry, i) => (
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
                      <span className="font-mono text-tgs-dim text-[12px] mt-0.5 shrink-0 select-none">—</span>
                      <span className="font-mono text-[12px] text-tgs-body leading-[1.8]">{bullet}</span>
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
