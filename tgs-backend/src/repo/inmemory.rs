use crate::domain::{
    AboutDetail, Location, Project, Skill, SkillGroup, SkillGroupTitle, TimelineEntry,
};
use crate::repo::{PortfolioResponse, Repo};
use anyhow::Error;
use async_trait::async_trait;

pub struct InMemoryRepo {
    about: AboutDetail,
    skills: Vec<SkillGroup>,
    timeline_entries: Vec<TimelineEntry>,
    projects: Vec<Project>,
    // stats: Vec<StatItem>,
}

impl InMemoryRepo {
    pub fn new() -> Self {
        Self {
            about: AboutDetail {
                role: "Senior Software Engineer".to_string(),
                location: Location {
                    state: "London".to_string(),
                    country: "UK".to_string(),
                },
                currently: "White Label Delivery Platform @ Deliveroo (DoorDash)".to_string(),
                interests: vec![
                    "Distributed Systems".to_string(),
                    "ML Systems".to_string(),
                    "AI Agents".to_string(),
                ],
                highlight: "6+ years building distributed systems across ad tech, finance, delivery and ML serving at Deliveroo. Scaled ML serving platforms to high throughput at low latency, designed targeting and scheduling algorithms across the ad platform, launched Ad Credits and Co-Funded Campaigns that unlocked significant revenue, engineered billing infrastructure for complex franchise hierarchies, and shipped event-driven delivery platforms at scale.".to_string(),
                introduction: "I care deeply about clean architecture, correctness, and systems that don't page you in the middle of the night. Most of my work sits at the intersection of backend engineering and data-intensive applications — from polyglot microservices to end-to-end MLOps.".to_string(),
            },

            skills: vec![
                SkillGroup {
                    title: SkillGroupTitle::Programming,
                    skills: vec![
                        Skill::Go,
                        Skill::Python,
                        Skill::Rust,
                        Skill::Java,
                        Skill::Scala,
                    ],
                },
                SkillGroup {
                    title: SkillGroupTitle::SystemArchitectureAndBackend,
                    skills: vec![
                        Skill::EventDrivenArchitecture,
                        Skill::DomainDrivenDesign,
                        Skill::LayeredArchitecture,
                        Skill::Microservices,
                        Skill::DistributedSystems,
                        Skill::Grpc,
                        Skill::Rest,
                        Skill::Tdd,
                    ],
                },
                SkillGroup {
                    title: SkillGroupTitle::AIAndMLOPS,
                    skills: vec![
                        Skill::Argo,
                        Skill::Airflow,
                        Skill::MLFlow,
                        Skill::LangChain,
                        Skill::Rag,
                        Skill::AiAgents,
                    ],
                },
                SkillGroup {
                    title: SkillGroupTitle::DataScienceAndMachineLearning,
                    skills: vec![
                        Skill::TensorFlow,
                        Skill::PyTorch,
                        Skill::HuggingFace,
                        Skill::ScikitLearn,
                        Skill::Pandas,
                        Skill::NumPy,
                        Skill::Shap,
                    ],
                },
                SkillGroup {
                    title: SkillGroupTitle::DataManagement,
                    skills: vec![
                        Skill::PostgreSQL,
                        Skill::DynamoDB,
                        Skill::Redis,
                        Skill::Kafka,
                        Skill::Cassandra,
                        Skill::Qdrant,
                    ],
                },
                SkillGroup {
                    title: SkillGroupTitle::CloudComputing,
                    skills: vec![
                        Skill::Aws,
                        Skill::Azure,
                        Skill::Docker,
                        Skill::Kubernetes,
                        Skill::Terraform,
                        Skill::Datadog,
                        Skill::CircleCI,
                    ],
                },
            ],

            timeline_entries: vec![
                TimelineEntry {
                    company: "Deliveroo (DoorDash)".to_string(),
                    role: "Senior Software Engineer — White Label Delivery Platform".to_string(),
                    period: "Mar 2026 – Present".to_string(),
                    current: true,
                    bullets: vec![
                        "Building Deliveroo Express, a white label DaaS platform processing 900K+ deliveries contributing £10.4M+ annualised revenue via a Go/Rust event-driven architecture.".to_string(),
                        "Designed a secure token-based real-time order tracking system, unblocking commercial contracts with enterprise retail partners.".to_string(),
                    ],
                },
                TimelineEntry {
                    company: "Deliveroo (DoorDash)".to_string(),
                    role: "Senior Software Engineer — Ad Platform, Financial Systems & MLOps".to_string(),
                    period: "Apr 2025 – Feb 2026".to_string(),
                    current: false,
                    bullets: vec![
                        "Developed Ad Platform managing 35,000+ campaigns contributing £100M+ annual revenue.".to_string(),
                        "Scaled ML serving platform to 1000 RPS, resolving p99 latency regression from 30ms to sub-20ms via inference batching.".to_string(),
                        "Designed Targeting and Scheduling algorithms, driving 10% adoption of targeted campaigns.".to_string(),
                        "Led phased migration to decouple the Ad Platform from the financial system via async communication.".to_string(),
                    ],
                },
                TimelineEntry {
                    company: "Deliveroo".to_string(),
                    role: "Software Engineer — Ad Platform, Financial Systems & MLOps".to_string(),
                    period: "Feb 2022 – Mar 2025".to_string(),
                    current: false,
                    bullets: vec![
                        "Engineered low-latency ML serving for click probability prediction and auto-bidding, achieving sub-20ms p99.".to_string(),
                        "Delivered Ad Credits system and Co-Funded Campaigns, unlocking £3.5M annual revenue.".to_string(),
                        "Built Centralised Billing System for complex franchise hierarchies, unlocking £1.92M operational efficiency.".to_string(),
                        "Built proof-of-concept LLM-powered AI agent for campaign management using tool calling.".to_string(),
                    ],
                },
                TimelineEntry {
                    company: "Thoucentric".to_string(),
                    role: "Machine Learning Engineer".to_string(),
                    period: "Nov 2020 – Jan 2022".to_string(),
                    current: false,
                    bullets: vec![
                        "Developed forecasting and commodity pricing models, cutting training times by 45% via containerisation.".to_string(),
                        "Designed scalable ML pipelines with distributed task execution across Kubernetes clusters.".to_string(),
                        "Built hyper-parameter tuning and model lifecycle frameworks, reducing development time by 30%.".to_string(),
                    ],
                },
                TimelineEntry {
                    company: "University of Nottingham".to_string(),
                    role: "MSc Data Science".to_string(),
                    period: "Sep 2019 – Sep 2020".to_string(),
                    current: false,
                    bullets: vec![],
                },
            ],

            projects: vec![
                Project {
                    title: "JAMS".to_string(),
                    description: "Cloud-agnostic, low-latency model server with multi-framework support (TensorFlow, PyTorch, LightGBM, CatBoost). Exposes HTTP and gRPC APIs with built-in OpenTelemetry observability. Production-grade ML serving infrastructure in Rust.".to_string(),
                    tags: vec![Skill::Rust, Skill::Grpc, Skill::TensorFlow, Skill::PyTorch],
                    link: "https://github.com/gagansingh894/jams-rs".to_string(),
                    link_label: "View on GitHub".to_string(),
                },
                Project {
                    title: "PaSys".to_string(),
                    description: "Event-driven payment and settlement system in Rust with ACID guarantees, a double-entry accounting ledger, multi-party reconciliation, and fault-tolerant transaction processing.".to_string(),
                    tags: vec![Skill::Rust, Skill::Java, Skill::EventDrivenArchitecture],
                    link: "https://github.com/gagansingh894/pasys-rs".to_string(),
                    link_label: "View on GitHub".to_string(),
                },
                Project {
                    title: "atlas".to_string(),
                    description: "Codebase intelligence for AI agents. Builds a machine-readable index of a repo once, then refreshes only changed sections. Supports architecture docs, Q&A, diagram generation, and multi-repo dependency mapping — with deterministic git-accelerated refresh logic.".to_string(),
                    tags: vec![Skill::AiAgents, Skill::Rag],
                    link: "https://github.com/gagansingh894/atlas".to_string(),
                    link_label: "View on GitHub".to_string(),
                },
                Project {
                    title: "Real-Time Fraud Detection".to_string(),
                    description: "Cloud-native end-to-end fraud detection system. Combines Spark ETL, MLflow model tracking, real-time streaming prediction via Kafka and Cassandra, and full Airflow orchestration — deployed on Kubernetes.".to_string(),
                    tags: vec![Skill::Python, Skill::Kafka, Skill::Cassandra, Skill::MLFlow, Skill::Airflow],
                    link: "https://github.com/gagansingh894/Real-Time-Credit-Card-Fraud-Detection".to_string(),
                    link_label: "View on GitHub".to_string(),
                },
            ],

            // stats: vec![
            //     StatItem {
            //         number: "5+".to_string(),
            //         label: "Years experience".to_string(),
            //     },
            //     StatItem {
            //         number: "5".to_string(),
            //         label: "Languages".to_string(),
            //     },
            //     StatItem {
            //         number: "sub-20ms".to_string(),
            //         label: "P99 latency".to_string(),
            //     },
            //     StatItem {
            //         number: "£100M+".to_string(),
            //         label: "Revenue systems".to_string(),
            //     },
            // ],
        }
    }
}

#[async_trait]
impl Repo for InMemoryRepo {
    async fn get_portfolio(&self) -> Result<PortfolioResponse, Error> {
        Ok(PortfolioResponse {
            about: self.about.clone(),
            skills: self.skills.clone(),
            timeline_entries: self.timeline_entries.clone(),
            projects: self.projects.clone(),
        })
    }

    async fn get_about(&self) -> Result<AboutDetail, Error> {
        Ok(self.about.clone())
    }

    async fn get_skills(&self) -> Result<Vec<SkillGroup>, Error> {
        Ok(self.skills.clone())
    }

    async fn get_timeline_entries(&self) -> Result<Vec<TimelineEntry>, Error> {
        Ok(self.timeline_entries.clone())
    }

    async fn get_projects(&self) -> Result<Vec<Project>, Error> {
        Ok(self.projects.clone())
    }
}
