import type { PortfolioData } from "@/types";

const API_BASE = process.env.PORTFOLIO_API_URL ?? "http://localhost:8080";
const API_VERSION = "v1";
const TIMEOUT_MS = 5000;
const CHAT_TIMEOUT_MS = 30000;
const REVALIDATE_SECONDS = 3600;

// ── Error type ───────────────────────────────────────────────────────────────

export class TgsApiError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
    this.name = "TgsApiError";
  }
}

// ── Internal helpers ─────────────────────────────────────────────────────────

function endpoint(path: string): string {
  return `${API_BASE}/api/${API_VERSION}/${path}`;
}

async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(endpoint(path), {
    signal: AbortSignal.timeout(TIMEOUT_MS),
    next: {
      revalidate: process.env.NODE_ENV === "production" ? REVALIDATE_SECONDS : 0,
    },
  });

  if (!res.ok) {
    throw new TgsApiError(
      res.status,
      `[tgs-client] GET ${path} responded with ${res.status} ${res.statusText}`
    );
  }

  return res.json() as Promise<T>;
}

async function apiPost<TBody>(path: string, body: TBody): Promise<void> {
  const res = await fetch(endpoint(path), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: AbortSignal.timeout(TIMEOUT_MS),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new TgsApiError(
      res.status,
      `[tgs-client] POST ${path} responded with ${res.status} ${res.statusText}`
    );
  }
}

// ── Exports ──────────────────────────────────────────────────────────────────

export async function getPortfolio(): Promise<PortfolioData> {
  return apiGet<PortfolioData>("portfolio");
}

export interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactMessage(req: ContactRequest): Promise<void> {
  return apiPost<ContactRequest>("portfolio/contact", req);
}

export interface ChatRequest {
  conversation_id: string;
  content: string;
}

export interface ChatResponse {
  conversation_id: string;
  content: string;
}

export async function sendChatMessage(req: ChatRequest): Promise<ChatResponse> {
  const res = await fetch(endpoint("assistant/chat"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: AbortSignal.timeout(CHAT_TIMEOUT_MS),
    body: JSON.stringify(req),
  });

  if (!res.ok) {
    throw new TgsApiError(
      res.status,
      `[tgs-client] POST assistant/chat responded with ${res.status} ${res.statusText}`
    );
  }

  return res.json() as Promise<ChatResponse>;
}
