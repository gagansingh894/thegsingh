use crate::domain::{AboutDetail, CareerJourney, Project, SkillGroup};
use crate::repo;
use crate::repo::Repo;
use anyhow::Result;
use std::sync::Arc;

pub struct Service {
    pub repo: Arc<dyn Repo>,
}

pub struct Response {
    pub about: AboutDetail,
    pub skills: Vec<SkillGroup>,
    pub journey: CareerJourney,
    pub projects: Vec<Project>,
}

impl Service {
    pub fn new() -> Self {
        Self {
            repo: Arc::new(repo::inmemory::InMemoryRepo::new()),
        }
    }

    pub async fn get_content(&self) -> Result<Response, anyhow::Error> {
        match self.repo.get_portfolio().await {
            Ok(response) => Ok(Response {
                about: response.about,
                skills: response.skills,
                journey: CareerJourney::from_entries(&response.timeline_entries),
                projects: response.projects,
            }),
            Err(e) => {
                anyhow::bail!("Error getting content: {}", e)
            }
        }
    }
}
