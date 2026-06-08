use strum::Display;

#[derive(Debug, Clone)]
pub struct SkillGroup {
    pub title: SkillGroupTitle,
    pub skills: Vec<Skill>,
}

#[derive(Debug, Clone, Display)]
pub enum SkillGroupTitle {
    Programming,
    #[strum(serialize = "System Architecture & Backend")]
    SystemArchitectureAndBackend,
    #[strum(serialize = "AI & MLOps")]
    AIAndMLOPS,
    #[strum(serialize = "Data Science & Machine Learning")]
    DataScienceAndMachineLearning,
    #[strum(serialize = "Data Management")]
    DataManagement,
    #[strum(serialize = "Cloud Computing")]
    CloudComputing,
}

#[derive(Debug, Clone, Display)]
pub enum Skill {
    // Programming
    Go,
    Python,
    Rust,
    Java,
    Scala,

    // System Architecture & Backend
    #[strum(serialize = "Event-Driven Architecture")]
    EventDrivenArchitecture,
    #[strum(serialize = "Domain-Driven Design")]
    DomainDrivenDesign,
    #[strum(serialize = "Layered Architecture")]
    LayeredArchitecture,
    #[strum(serialize = "Microservices")]
    Microservices,
    #[strum(serialize = "Distributed Systems")]
    DistributedSystems,
    #[strum(serialize = "gRPC")]
    Grpc,
    #[strum(serialize = "REST")]
    Rest,
    #[strum(serialize = "TDD")]
    Tdd,

    // AI & MLOps
    #[strum(serialize = "Argo")]
    Argo,
    #[strum(serialize = "Airflow")]
    Airflow,
    #[strum(serialize = "MLFlow")]
    MLFlow,
    #[strum(serialize = "Langchain")]
    LangChain,
    #[strum(serialize = "RAG")]
    Rag,
    #[strum(serialize = "AI Agents")]
    AiAgents,

    // Data Science & Machine Learning
    #[strum(serialize = "Tensorflow")]
    TensorFlow,
    #[strum(serialize = "PyTorch")]
    PyTorch,
    #[strum(serialize = "Hugging Face")]
    HuggingFace,
    #[strum(serialize = "Scikit-Learn")]
    ScikitLearn,
    #[strum(serialize = "Pandas")]
    Pandas,
    #[strum(serialize = "Numpy")]
    NumPy,
    #[strum(serialize = "SHAP")]
    Shap,

    // Data Management
    #[strum(serialize = "PostgreSQL")]
    PostgreSQL,
    #[strum(serialize = "DynamoDB")]
    DynamoDB,
    #[strum(serialize = "Redis")]
    Redis,
    #[strum(serialize = "Kafka")]
    Kafka,
    #[strum(serialize = "Cassandra")]
    Cassandra,
    #[strum(serialize = "Qdrant")]
    Qdrant,

    // Cloud Computing
    #[strum(serialize = "AWS")]
    Aws,
    #[strum(serialize = "Azure")]
    Azure,
    #[strum(serialize = "Docker")]
    Docker,
    #[strum(serialize = "Kubernetes")]
    Kubernetes,
    #[strum(serialize = "Terraform")]
    Terraform,
    #[strum(serialize = "Datadog")]
    Datadog,
    #[strum(serialize = "CircleCI")]
    CircleCI,
}
