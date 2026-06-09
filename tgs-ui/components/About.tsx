import type { PortfolioAbout } from "@/types";

interface Props {
  about: PortfolioAbout;
}

export default function About({ about }: Props) {
  const details = [
    { label: "Role",      value: about.role },
    { label: "Location",  value: about.location },
    { label: "Currently", value: about.currently },
    { label: "Interests", value: about.interests.join(", ") },
  ];

  return (
    <section id="about" className="py-[100px] px-10 max-w-[1200px] mx-auto">
      <div className="mb-14 pb-5 border-b border-tgs-border">
        <div className="font-mono text-[11px] text-tgs-muted tracking-[0.12em] uppercase mb-2 flex items-center gap-2">
          <span className="block w-3.5 h-px bg-tgs-muted" />
          Background
        </div>
        <h2 className="font-sans text-[clamp(28px,3.5vw,44px)] font-extrabold leading-[1.05] tracking-tight text-tgs-text">
          About me
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-20 items-start">
        <div>
          {details.map(({ label, value }) => (
            <div key={label} className="mb-5">
              <div className="font-mono text-[11px] text-tgs-muted tracking-[0.1em] uppercase mb-1">
                {label}
              </div>
              <div className="font-sans text-[15px] text-tgs-text">{value}</div>
            </div>
          ))}
        </div>

        <div>
          <p className="font-mono text-[13px] leading-[1.9] text-tgs-body mb-4">
            {about.highlight}
          </p>
          <p className="font-mono text-[13px] leading-[1.9] text-tgs-body mb-4">
            {about.introduction}
          </p>
          <div className="mt-7">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 font-mono text-[12px] text-tgs-muted border border-tgs-border px-6 py-3 rounded-[4px] no-underline tracking-widest uppercase transition-all duration-200 hover:text-tgs-text hover:border-tgs-borderh hover:-translate-y-px"
            >
              Get in touch →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
