use crate::domain::{AboutDetail, CareerJourney, Project, SkillGroup};
use crate::repo;
use crate::repo::Repo;

use crate::services::common::email::EmailSender;
use anyhow::Result;
use std::sync::Arc;

pub struct Service {
    pub repo: Arc<dyn Repo>,
    pub email_sender: EmailSender,
}

pub struct ContentResponse {
    pub about: AboutDetail,
    pub skills: Vec<SkillGroup>,
    pub journey: CareerJourney,
    pub projects: Vec<Project>,
}
pub struct Config {
    pub resend_api_key: String,
}

impl Service {
    pub fn new(email_sender: EmailSender) -> Self {
        Self {
            repo: Arc::new(repo::inmemory::InMemoryRepo::new()),
            email_sender,
        }
    }

    pub async fn get_content(&self) -> Result<ContentResponse, anyhow::Error> {
        match self.repo.get_portfolio().await {
            Ok(response) => Ok(ContentResponse {
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

    pub async fn contact_me(
        &self,
        name: String,
        email: String,
        subject: String,
        message: String,
    ) -> Result<String> {
        match self
            .email_sender
            .send_email(name, email, subject, message)
            .await
        {
            Ok(response) => Ok(response),
            Err(e) => {
                anyhow::bail!("Error sending email: {}", e)
            }
        }
    }
}
