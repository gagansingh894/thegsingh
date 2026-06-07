import { skillGroups } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="py-[100px] px-10 max-w-[1200px] mx-auto">
      <div className="mb-14 pb-5 border-b border-tgs-border">
        <div className="font-mono text-[11px] text-tgs-muted tracking-[0.12em] uppercase mb-2 flex items-center gap-2">
          <span className="block w-3.5 h-px bg-tgs-muted" />
          Stack
        </div>
        <h2 className="font-sans text-[clamp(28px,3.5vw,44px)] font-extrabold leading-[1.05] tracking-tight text-tgs-text">
          Skills
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <div className="font-mono text-[11px] text-tgs-muted tracking-[0.1em] uppercase mb-5 pb-3 border-b border-tgs-border">
              {group.title}
            </div>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-[11px] text-tgs-body bg-tgs-surface border border-tgs-border px-3 py-1.5 rounded-sm tracking-wide transition-colors duration-200 hover:border-tgs-borderh hover:text-tgs-text"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
