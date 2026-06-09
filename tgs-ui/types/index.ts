// ── API response types (matches GET /api/v1/portfolio) ──────────────────────

export interface PortfolioSocials {
  github: string;
  linkedin: string;
  email: string;
}

export interface PortfolioAbout {
  role: string;
  location: string;
  currently: string;
  interests: string[];
  highlight: string;
  introduction: string;
  socials: PortfolioSocials;
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface TimelineEntry {
  company: string;
  role: string;
  period: string;
  current: boolean;
  bullets: string[];
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  link_label: string;
}

export interface PortfolioData {
  about: PortfolioAbout;
  skills: SkillGroup[];
  journey: TimelineEntry[];
  projects: Project[];
}

// ── Non-API types ────────────────────────────────────────────────────────────

export interface StatItem {
  number: string;
  label: string;
}

export interface BlogPost {
  date: string;
  title: string;
  tag: string;
  href: string;
}
