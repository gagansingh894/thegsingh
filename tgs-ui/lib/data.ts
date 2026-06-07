import type { Project, BlogPost, SkillGroup, StatItem } from "@/types";

export const projects: Project[] = [
  {
    title: "JAMS",
    description:
      "Cloud-agnostic, low-latency model server with multi-framework support (TensorFlow, PyTorch, LightGBM, CatBoost). Exposes HTTP and gRPC APIs with built-in OpenTelemetry observability. Production-grade ML serving infrastructure in Rust.",
    tags: ["Rust", "gRPC", "ML Infra", "OpenTelemetry"],
    link: "https://github.com/gagansingh894/jams-rs",
    linkLabel: "View on GitHub",
  },
  {
    title: "PaSys",
    description:
      "Event-driven payment and settlement system in Rust with ACID guarantees, a double-entry accounting ledger, multi-party reconciliation, and fault-tolerant transaction processing.",
    tags: ["Rust", "Java", "Event-Driven", "ACID Ledger"],
    link: "https://github.com/gagansingh894/pasys-rs",
    linkLabel: "View on GitHub",
  },
  {
    title: "atlas",
    description:
      "Codebase intelligence for AI agents. Builds a machine-readable index of a repo once, then refreshes only changed sections. Supports architecture docs, Q&A, diagram generation, and multi-repo dependency mapping — with deterministic git-accelerated refresh logic.",
    tags: ["AI Agents", "DevTools", "Shell", "Claude Code"],
    link: "https://github.com/gagansingh894/atlas",
    linkLabel: "View on GitHub",
  },
  {
    title: "Real-Time Fraud Detection",
    description:
      "Cloud-native end-to-end fraud detection system. Combines Spark ETL, MLflow model tracking, real-time streaming prediction via Kafka and Cassandra, and full Airflow orchestration — deployed on Kubernetes.",
    tags: ["Python", "Spark", "Kafka", "Cassandra", "MLOps"],
    link: "https://github.com/gagansingh894/Real-Time-Credit-Card-Fraud-Detection",
    linkLabel: "View on GitHub",
  },
];

export const blogPosts: BlogPost[] = [
  {
    date: "Jun 2026",
    title: "Building Codebase Intelligence with AST Parsing and LLMs",
    tag: "Systems",
    href: "#",
  },
  {
    date: "May 2026",
    title: "Scaling ML Serving to 1000 RPS: Inference Batching Deep Dive",
    tag: "ML Infra",
    href: "#",
  },
  {
    date: "Apr 2026",
    title: "Event-Driven Payment Systems: ACID Guarantees in a Distributed World",
    tag: "Architecture",
    href: "#",
  },
  {
    date: "Mar 2026",
    title: "Multi-Backend ML Serving in Rust: The JAMS Architecture",
    tag: "Rust",
    href: "#",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Programming",
    skills: ["Go", "Python", "Rust", "Java", "Scala"],
  },
  {
    title: "System Architecture & Backend",
    skills: ["Event-Driven Architecture", "Domain-Driven Design", "Layered Architecture", "Microservices", "Distributed Systems", "gRPC", "REST", "TDD"],
  },
  {
    title: "AI & MLOps",
    skills: ["Argo", "Airflow", "MLflow", "LangChain", "RAG", "AI Agents"],
  },
  {
    title: "Data Science & Machine Learning",
    skills: ["TensorFlow", "PyTorch", "Hugging Face", "Scikit-Learn", "Pandas", "NumPy", "SHAP"],
  },
  {
    title: "Data Management",
    skills: ["PostgreSQL", "DynamoDB", "Redis", "Kafka", "Cassandra", "Qdrant"],
  },
  {
    title: "Cloud Computing",
    skills: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform", "Datadog", "CircleCI"],
  },
];

export const stats: StatItem[] = [
  { number: "5+", label: "Years experience" },
  { number: "5", label: "Languages" },
  { number: "sub-20ms", label: "P99 latency" },
  { number: "£100M+", label: "Revenue systems" },
];
