export interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  linkLabel: string;
}

export interface BlogPost {
  date: string;
  title: string;
  tag: string;
  href: string;
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface StatItem {
  number: string;
  label: string;
}
