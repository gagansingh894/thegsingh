"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ChatMessage } from "@/types";

const TYPEWRITER_INTERVAL_MS = 8;

const mdComponents: React.ComponentProps<typeof ReactMarkdown>["components"] = {
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-tgs-text">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-0.5">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-0.5">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  pre: ({ children }) => <pre className="mb-2 overflow-x-auto bg-tgs-surface2 rounded-md px-3 py-2">{children}</pre>,
  code: ({ className, children }) =>
    className ? (
      <code className="text-[11px] block">{children}</code>
    ) : (
      <code className="bg-tgs-surface2 rounded px-1 py-0.5 text-[11px]">{children}</code>
    ),
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-tgs-text underline underline-offset-2 hover:text-tgs-accent">
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-tgs-border pl-3 text-tgs-muted italic mb-2">{children}</blockquote>
  ),
  h1: ({ children }) => <h1 className="font-semibold text-tgs-text text-[14px] mb-1 mt-2">{children}</h1>,
  h2: ({ children }) => <h2 className="font-semibold text-tgs-text text-[13px] mb-1 mt-2">{children}</h2>,
  h3: ({ children }) => <h3 className="font-semibold text-tgs-text text-[12px] mb-1 mt-1">{children}</h3>,
  hr: () => <hr className="border-tgs-border my-2" />,
};

export default function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId] = useState(() => crypto.randomUUID());
  const panelRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const animIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (animIntervalRef.current) clearInterval(animIntervalRef.current);
    };
  }, []);

  const animateAssistantMessage = useCallback((text: string) => {
    if (animIntervalRef.current) clearInterval(animIntervalRef.current);
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
    let i = 0;
    animIntervalRef.current = setInterval(() => {
      i++;
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "assistant", content: text.slice(0, i) };
        return updated;
      });
      if (i >= text.length) {
        clearInterval(animIntervalRef.current!);
        animIntervalRef.current = null;
      }
    }, TYPEWRITER_INTERVAL_MS);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    setLoading(true);

    try {
      const res = await fetch("/api/v1/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation_id: conversationId, content: trimmed }),
      });

      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      animateAssistantMessage(data.content);
    } catch {
      animateAssistantMessage("Sorry, something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [input, loading, conversationId, animateAssistantMessage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const isEmpty = messages.length === 0 && !loading;

  return (
    <div ref={panelRef} className="fixed bottom-7 right-7 z-[200] flex flex-col items-end gap-3">

      {/* Slide-up panel */}
      <div
        className={`bg-tgs-surface border border-tgs-border rounded-xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 origin-bottom-right ${
          expanded ? "w-[520px]" : "w-[340px]"
        } ${
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
          <div className="flex items-center gap-2">
            {/* Expand / collapse */}
            <button
              onClick={() => setExpanded((v) => !v)}
              className="text-tgs-dim hover:text-tgs-muted transition-colors duration-150 p-0.5"
              aria-label={expanded ? "Collapse chat" : "Expand chat"}
            >
              {expanded ? (
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="4 14 10 14 10 20" />
                  <polyline points="20 10 14 10 14 4" />
                  <line x1="10" y1="14" x2="3" y2="21" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                </svg>
              ) : (
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              )}
            </button>
            {/* Close */}
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
        </div>

        {/* Messages */}
        <div
          className={`overflow-y-auto px-4 py-4 flex flex-col gap-3 transition-all duration-300 ${
            expanded ? "h-[520px]" : "h-[300px]"
          }`}
        >
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center text-center gap-3 h-full">
              <div className="w-10 h-10 rounded-full border border-tgs-border flex items-center justify-center text-tgs-muted">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div>
                <p className="font-sans text-[13px] font-semibold text-tgs-text mb-1">
                  Hi there
                </p>
                <p className="font-mono text-[11px] text-tgs-muted leading-[1.8]">
                  Ask me about my work,<br />experience, or projects.
                </p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] px-3 py-2 rounded-lg font-mono text-[12px] leading-[1.7] break-words ${
                      msg.role === "user"
                        ? "bg-tgs-surface2 border border-tgs-border text-tgs-text whitespace-pre-wrap"
                        : "bg-tgs-bg border border-tgs-border text-tgs-body"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                        {msg.content}
                      </ReactMarkdown>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-tgs-bg border border-tgs-border rounded-lg px-3 py-2.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-tgs-muted animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-tgs-muted animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-tgs-muted animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 pb-4 pt-3 border-t border-tgs-border">
          <div className="flex items-end gap-2 bg-tgs-bg border border-tgs-border rounded-lg px-3 py-2.5 focus-within:border-tgs-borderh transition-colors duration-150">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              onKeyDown={handleKeyDown}
              disabled={loading}
              placeholder="Message..."
              rows={1}
              className="font-mono text-[12px] text-tgs-text placeholder:text-tgs-dim flex-1 bg-transparent resize-none outline-none leading-[1.5] max-h-[160px] overflow-y-auto disabled:opacity-50"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="text-tgs-dim hover:text-tgs-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150 shrink-0 pb-0.5"
              aria-label="Send message"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          <p className="font-mono text-[10px] text-tgs-dim mt-1.5 text-center">
            Enter to send · Shift+Enter for newline
          </p>
        </div>
      </div>

      {/* Bubble button */}
      <div className="relative">
        {!open && (
          <>
            <div className="absolute inset-0 rounded-full bg-tgs-muted/15 animate-ping pointer-events-none" />
            <div className="absolute inset-[-4px] rounded-full bg-tgs-muted/8 animate-ping pointer-events-none" style={{ animationDelay: "0.6s" }} />
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
