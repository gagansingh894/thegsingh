"use client";

import { useState, useEffect, useRef } from "react";

export default function ChatBubble() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div ref={panelRef} className="fixed bottom-7 right-7 z-[200] flex flex-col items-end gap-3">

      {/* Slide-up panel */}
      <div
        className={`w-[320px] bg-tgs-surface border border-tgs-border rounded-xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 origin-bottom-right ${
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-tgs-border">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-tgs-muted animate-pulse" />
            <span className="font-sans text-[13px] font-semibold text-tgs-text tracking-tight">
              Ask me anything
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-tgs-dim hover:text-tgs-muted transition-colors duration-150 p-0.5"
            aria-label="Close chat"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-8 flex flex-col items-center text-center gap-4">
          <div className="w-10 h-10 rounded-full border border-tgs-border flex items-center justify-center text-tgs-muted">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div>
            <p className="font-sans text-[13px] font-semibold text-tgs-text mb-1">
              Coming soon
            </p>
            <p className="font-mono text-[11px] text-tgs-muted leading-[1.8]">
              An AI assistant trained on my work,
              <br />experience, and projects. Ask it anything.
            </p>
          </div>
        </div>

        {/* Disabled input */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 bg-tgs-bg border border-tgs-border rounded-lg px-4 py-3 opacity-50 cursor-not-allowed">
            <span className="font-mono text-[12px] text-tgs-dim flex-1">
              Message...
            </span>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-tgs-dim shrink-0">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bubble button */}
      <div className="relative">
        {/* Pulsating ring — only when closed */}
        {!open && (
          <>
            <div className="absolute inset-0 rounded-full bg-tgs-muted/15 animate-ping" />
            <div className="absolute inset-[-4px] rounded-full bg-tgs-muted/8 animate-ping" style={{ animationDelay: "0.6s" }} />
          </>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          className={`relative w-[52px] h-[52px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 border ${
            open
              ? "bg-tgs-surface2 border-tgs-borderh scale-95 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "bg-tgs-surface border-tgs-border hover:border-tgs-borderh hover:bg-tgs-surface2 hover:scale-105 animate-glow-pulse"
          }`}
          aria-label="Open chat"
        >
          {open ? (
            <svg width="18" height="18" fill="none" stroke="#6b6b6b" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="20" height="20" fill="none" stroke="#a8a8a8" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </button>
      </div>

    </div>
  );
}
