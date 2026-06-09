"use client";

import { useState, useEffect } from "react";

const links = [
  { href: "#about",    label: "About",    id: "about"    },
  { href: "#skills",   label: "Skills",   id: "skills"   },
  { href: "#journey",  label: "Journey",  id: "journey"  },
  { href: "#projects", label: "Projects", id: "projects" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let current = "";
      sections.forEach((s) => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 100) {
          current = s.id;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-[rgba(14,14,14,0.85)] backdrop-blur-md border-b border-tgs-border flex items-center justify-between px-10 z-[100]">
        <a
          href="/"
          className="font-sans text-[14px] font-extrabold text-tgs-text border border-tgs-border px-2.5 py-1 rounded-sm tracking-[0.15em] no-underline"
        >
          TGS
        </a>

        <ul className="hidden md:flex items-center gap-8 list-none">
          {links.map((link) => {
            const active = activeSection === link.id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative font-mono text-[12px] tracking-widest uppercase no-underline transition-colors duration-200 ${
                    active ? "nav-link-active" : "text-tgs-muted hover:text-tgs-text"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-[-3px] left-0 h-px bg-tgs-text transition-all duration-200 ${
                      active ? "w-full" : "w-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
          <li>
            <a
              href="#contact"
              className="font-mono text-[12px] font-medium text-tgs-bg bg-tgs-text px-[18px] py-2 rounded-[4px] no-underline tracking-widest uppercase transition-opacity duration-200 hover:opacity-85"
            >
              Contact
            </a>
          </li>
        </ul>

        <button
          className="md:hidden flex flex-col gap-[5px] cursor-pointer p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-[22px] h-px bg-tgs-muted transition-all duration-200 ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`block w-[22px] h-px bg-tgs-muted transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-[22px] h-px bg-tgs-muted transition-all duration-200 ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed top-16 left-0 right-0 bg-[rgba(14,14,14,0.97)] border-b border-tgs-border px-10 py-6 z-[99] flex flex-col gap-5 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-mono text-[13px] text-tgs-muted tracking-widest uppercase no-underline transition-colors hover:text-tgs-text"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="font-mono text-[13px] text-tgs-muted tracking-widest uppercase no-underline transition-colors hover:text-tgs-text"
          >
            Contact
          </a>
        </div>
      )}
    </>
  );
}
