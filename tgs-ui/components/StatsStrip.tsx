import { stats } from "@/lib/data";

export default function StatsStrip() {
  return (
    <div className="border-t border-b border-tgs-border animate-fade-in-up-delay-2">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-tgs-border md:bg-transparent">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`bg-tgs-bg px-8 py-6 md:border-r md:border-tgs-border ${
              i === stats.length - 1 ? "md:border-r-0" : ""
            } ${i === 0 ? "md:pl-10" : ""}`}
          >
            <div className="font-sans text-[24px] md:text-[28px] lg:text-[32px] font-extrabold text-tgs-text leading-none mb-1">
              {stat.number}
            </div>
            <div className="font-mono text-[11px] text-tgs-muted tracking-[0.08em] uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
