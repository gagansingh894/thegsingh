import type { PortfolioData } from "@/types";

const API_BASE = process.env.PORTFOLIO_API_URL ?? "http://localhost:8080";

export async function getPortfolio(): Promise<PortfolioData> {
  const res = await fetch(`${API_BASE}/api/v1/portfolio`, {
    next: { revalidate: 3600 }, // re-fetch at most once per hour
  });

  if (!res.ok) {
    throw new Error(`Portfolio API responded with ${res.status}`);
  }

  return res.json();
}
