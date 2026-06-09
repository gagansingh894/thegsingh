"use client";

import { useState } from "react";
import SocialLink from "@/components/SocialLink";

const inputClass =
  "w-full bg-tgs-surface border border-tgs-border rounded-[4px] px-4 py-3 font-mono text-[12px] text-tgs-text placeholder:text-tgs-dim outline-none transition-colors duration-200 focus:border-tgs-borderh disabled:opacity-50 disabled:cursor-not-allowed";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setErrorMsg("Network error — please try again.");
      setStatus("error");
    }
  };

  const loading = status === "loading";

  return (
    <section id="contact" className="py-[100px] px-6 md:px-10 max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div>
          <div className="font-mono text-[11px] text-tgs-muted tracking-[0.12em] uppercase mb-2 flex items-center gap-2">
            <span className="block w-3.5 h-px bg-tgs-muted" />
            Get in touch
          </div>
          <h2 className="font-sans text-[clamp(32px,4vw,54px)] font-extrabold leading-[1.05] tracking-tight text-tgs-text mb-5">
            Let&apos;s work<br />together.
          </h2>
          <p className="font-mono text-[13px] text-tgs-body leading-[1.8] mb-9">
            Open to interesting engineering problems, collaborations, and
            conversations about systems, fintech, or open-source.
          </p>
          <div className="flex gap-5">
            <SocialLink href="https://github.com/gagansingh894" label="GitHub" type="github" className="text-tgs-muted hover:text-tgs-text" />
            <SocialLink href="https://linkedin.com/in/gagandeepsingh894" label="LinkedIn" type="linkedin" className="text-tgs-muted hover:text-tgs-text" />
            <SocialLink href="mailto:gagandeep@thegsingh.com" label="Email" type="email" className="text-tgs-muted hover:text-tgs-text" />
          </div>
        </div>

        <div>
          {status === "success" ? (
            <div className="flex flex-col items-start gap-4 py-8">
              <div className="w-10 h-10 rounded-full border border-tgs-borderh flex items-center justify-center text-tgs-text">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <p className="font-sans text-[16px] font-semibold text-tgs-text mb-1">Message sent.</p>
                <p className="font-mono text-[12px] text-tgs-muted leading-[1.8]">
                  Thanks for reaching out — I&apos;ll get back to you soon.
                </p>
              </div>
              <button
                onClick={() => setStatus("idle")}
                className="font-mono text-[11px] text-tgs-muted tracking-widest uppercase border border-tgs-border px-4 py-2 rounded-[4px] transition-colors hover:text-tgs-text hover:border-tgs-borderh mt-2"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <div className="grid grid-cols-2 gap-3.5">
                <input type="text" placeholder="Name" value={form.name} onChange={set("name")} required disabled={loading} className={inputClass} />
                <input type="email" placeholder="Email" value={form.email} onChange={set("email")} required disabled={loading} className={inputClass} />
              </div>
              <input type="text" placeholder="Subject" value={form.subject} onChange={set("subject")} required disabled={loading} className={inputClass} />
              <textarea
                placeholder="Message"
                value={form.message}
                onChange={set("message")}
                required
                disabled={loading}
                rows={5}
                className={`${inputClass} resize-y min-h-[110px]`}
              />

              {status === "error" && (
                <p className="font-mono text-[11px] text-red-400 tracking-wide">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="self-start inline-flex items-center gap-2 font-mono text-[12px] font-medium tracking-widest uppercase text-tgs-bg bg-tgs-text px-6 py-3 rounded-[4px] cursor-pointer transition-all duration-200 hover:opacity-90 hover:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin" width="14" height="14" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send message
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
