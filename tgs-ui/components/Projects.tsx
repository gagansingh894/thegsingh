import type { Project } from "@/types";

interface Props { projects: Project[] }

export default function Projects({ projects }: Props) {
  return (
    <section id="projects" className="py-[100px] px-10 max-w-[1200px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-14 pb-5 border-b border-tgs-border">
        <div>
          <div className="font-mono text-[11px] text-tgs-muted tracking-[0.12em] uppercase mb-2 flex items-center gap-2">
            <span className="block w-3.5 h-px bg-tgs-muted" />
            Open Source &amp; Side Projects
          </div>
          <h2 className="font-sans text-[clamp(28px,3.5vw,44px)] font-extrabold leading-[1.05] tracking-tight text-tgs-text">
            Projects
          </h2>
          <p className="font-mono text-[12px] text-tgs-muted mt-2 leading-relaxed">
            Personal builds outside of work — tools, experiments, and things I found worth making.
          </p>
        </div>
        <a
          href="https://github.com/gagansingh894"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex font-mono text-[12px] text-tgs-muted border border-tgs-border px-6 py-3 rounded-[4px] no-underline tracking-widest uppercase whitespace-nowrap transition-all duration-200 hover:text-tgs-text hover:border-tgs-borderh hover:-translate-y-px"
        >
          View all on GitHub ↗
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-tgs-border border border-tgs-border rounded-md overflow-hidden">
        {projects.map((p, i) => {
          const isLastOdd = i === projects.length - 1 && projects.length % 2 !== 0;
          return (
            <div
              key={p.title}
              className={`bg-tgs-surface p-9 flex flex-col gap-4 transition-colors duration-200 hover:bg-tgs-surface2 ${
                isLastOdd ? "md:col-span-2" : ""
              }`}
            >
              <div className="flex gap-2 flex-wrap">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] text-tgs-muted bg-tgs-bg border border-tgs-border px-2.5 py-0.5 rounded-sm tracking-widest uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="font-sans text-[20px] font-bold text-tgs-text tracking-tight">
                {p.title}
              </div>
              <div className="font-mono text-[13px] leading-[1.8] text-tgs-body flex-1">
                {p.description}
              </div>
              <div className="mt-2">
                <a
                  href={p.link}
                  target={p.link.startsWith("http") ? "_blank" : undefined}
                  rel={p.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group/link font-mono text-[11px] text-tgs-muted no-underline tracking-[0.08em] uppercase inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-tgs-text"
                >
                  {p.link_label}
                  <svg
                    width="12"
                    height="12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
