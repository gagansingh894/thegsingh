import Image from "next/image";
import SocialLink from "@/components/SocialLink";

export default function Hero() {
  return (
    <div className="relative min-h-screen pt-16 flex items-center overflow-hidden">

      {/* Radial gradient — barely-there depth behind the image */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[520px] h-[520px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(232,232,232,0.045) 0%, transparent 68%)" }}
        />
        <div
          className="absolute top-[25%] left-[2%] w-[280px] h-[280px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(232,232,232,0.02) 0%, transparent 70%)" }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] items-center gap-12 lg:gap-16 px-6 md:px-10 max-w-[1200px] mx-auto w-full py-16 relative">

        {/* LEFT — text */}
        <div className="min-w-0 pr-0 lg:pr-10 order-2 lg:order-1">

          {/* "Hi, I'm" */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0ms" }}>
            <p className="font-sans text-[18px] lg:text-[22px] font-semibold text-tgs-muted mb-1 tracking-tight">
              Hi, I&apos;m
            </p>
          </div>

          {/* Name — character by character */}
          <h1 className="font-sans font-extrabold leading-none tracking-tight mb-5
                         text-[44px] lg:text-[58px] xl:text-[72px]">
            <span className="text-tgs-text whitespace-nowrap">
              {"Gagandeep".split("").map((char, i) => (
                <span
                  key={i}
                  className="animate-char"
                  style={{ animationDelay: `${60 + i * 52}ms` }}
                >
                  {char}
                </span>
              ))}
            </span>
            <br />
            <em className="not-italic text-tgs-muted font-bold whitespace-nowrap">
              {"Singh.".split("").map((char, i) => (
                <span
                  key={i}
                  className="animate-char"
                  style={{ animationDelay: `${530 + i * 52}ms` }}
                >
                  {char}
                </span>
              ))}
            </em>
          </h1>

          {/* Role */}
          <div
            className="animate-fade-in-up flex items-center gap-3 mb-8"
            style={{ animationDelay: "820ms" }}
          >
            <span className="block w-8 h-px bg-tgs-borderh shrink-0" />
            <p className="font-sans text-[15px] lg:text-[17px] font-semibold text-tgs-body tracking-wide">
              Senior Software Engineer
            </p>
          </div>

          {/* Bio */}
          <div className="animate-fade-in-up" style={{ animationDelay: "980ms" }}>
            <p className="font-mono text-[13px] leading-[1.9] text-tgs-body max-w-[480px] mb-8">
              Building distributed systems across ad tech, financial system,
              and delivery platform — with a focus on ML-powered backends
              and large-scale data systems.
            </p>
          </div>

          {/* Buttons */}
          <div
            className="animate-fade-in-up flex gap-3.5 flex-wrap mb-5"
            style={{ animationDelay: "1120ms" }}
          >
            <a
              href="/Gagan_Resume_2026_v1.pdf"
              download
              className="inline-flex items-center gap-2 font-mono text-[12px] font-medium tracking-widest uppercase text-tgs-bg bg-tgs-text px-6 py-3 rounded-[4px] no-underline transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CV
            </a>
            <a
              href="#journey"
              className="inline-flex items-center gap-2 font-mono text-[12px] tracking-widest uppercase text-tgs-muted border border-tgs-border px-6 py-3 rounded-[4px] no-underline transition-all duration-200 hover:text-tgs-text hover:border-tgs-borderh hover:-translate-y-px"
            >
              View Work
            </a>
          </div>

          {/* Socials */}
          <div
            className="animate-fade-in-up flex gap-5"
            style={{ animationDelay: "1260ms" }}
          >
            <SocialLink href="https://github.com/gagansingh894" label="GitHub" type="github" className="text-tgs-dim hover:text-tgs-muted" />
            <SocialLink href="https://linkedin.com/in/gagandeepsingh894" label="LinkedIn" type="linkedin" className="text-tgs-dim hover:text-tgs-muted" />
            <SocialLink href="mailto:gagandeep@thegsingh.com" label="Email" type="email" className="text-tgs-dim hover:text-tgs-muted" />
          </div>
        </div>

        {/* RIGHT — profile image */}
        <div
          className="animate-fade-in-right flex justify-center lg:justify-end min-w-0 order-1 lg:order-2"
          style={{ animationDelay: "200ms" }}
        >
          <div className="relative">
            <div className="absolute inset-0 translate-x-3 translate-y-3 border border-tgs-border rounded-xl opacity-50 animate-shimmer" />
            <div className="absolute inset-0 translate-x-6 translate-y-6 border border-tgs-border rounded-xl opacity-25 animate-shimmer" style={{ animationDelay: "1.5s" }} />
            <div className="relative w-[260px] h-[330px] md:w-[295px] md:h-[370px] lg:w-[315px] lg:h-[400px] xl:w-[350px] xl:h-[440px] rounded-xl overflow-hidden border border-tgs-borderh animate-float">
              <Image
                src="/profile.png"
                alt="Gagandeep Singh"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-tgs-bg/40 to-transparent" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
