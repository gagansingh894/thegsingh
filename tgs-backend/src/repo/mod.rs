pub mod inmemory;

use anyhow::Error;
use async_trait::async_trait;

use crate::domain::{AboutDetail, Project, SkillGroup, TimelineEntry};

pub struct PortfolioResponse {
    pub about: AboutDetail,
    pub skills: Vec<SkillGroup>,
    pub timeline_entries: Vec<TimelineEntry>,
    pub projects: Vec<Project>,
}

#[allow(dead_code)]
#[async_trait]
pub trait Repo: Send + Sync + 'static {
    async fn get_portfolio(&self) -> Result<PortfolioResponse, Error>;
    async fn get_about(&self) -> Result<AboutDetail, Error>;
    async fn get_skills(&self) -> Result<Vec<SkillGroup>, Error>;
    async fn get_timeline_entries(&self) -> Result<Vec<TimelineEntry>, Error>;
    async fn get_projects(&self) -> Result<Vec<Project>, Error>;
}
