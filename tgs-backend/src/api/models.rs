use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PortfolioResponse {
    pub about: AboutDetail,
    pub skills: Vec<SkillGroup>,
    pub journey: Vec<TimelineEntry>,
    pub projects: Vec<Project>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AboutDetail {
    pub role: String,
    pub location: String,
    pub currently: String,
    pub interests: Vec<String>,
    pub highlight: String,
    pub introduction: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Project {
    pub title: String,
    pub description: String,
    pub tags: Vec<String>,
    pub link: String,
    pub link_label: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SkillGroup {
    pub title: String,
    pub skills: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TimelineEntry {
    pub company: String,
    pub role: String,
    pub period: String,
    pub current: bool,
    pub bullets: Vec<String>,
}
