use crate::domain::{AboutDetail, CareerJourney, Project, SkillGroup};
use crate::repo;
use crate::repo::Repo;
use anyhow::Result;
use resend_rs::{Resend, types::CreateEmailBaseOptions};
use std::sync::Arc;

pub struct Service {
    pub repo: Arc<dyn Repo>,
    pub email_client: Resend,
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
    pub fn new(config: Config) -> Self {
        Self {
            repo: Arc::new(repo::inmemory::InMemoryRepo::new()),
            email_client: Resend::new(config.resend_api_key.as_str()),
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
        let from = "Portfolio <onboarding@resend.dev>";
        let to = ["gds31.gagandeepsingh@gmail.com"];
        let subject = format!("New message from {} — {}", name, subject);
        let html = build_email_html(name, email.clone(), subject.clone(), message);

        let email = CreateEmailBaseOptions::new(from, to, &subject)
            .with_reply(email.as_str())
            .with_html(&html);

        match self.email_client.emails.send(email).await {
            Ok(response) => Ok(response.id.to_string()),
            Err(e) => anyhow::bail!("Error sending email to portfolio: {}", e),
        }
    }
}

// ── Email template ────────────────────────────────────────────────────────────
// Matches the original Next.js HTML template exactly.

fn build_email_html(name: String, email: String, subject: String, message: String) -> String {
    format!(
        r#"
        <div style="font-family:monospace;max-width:560px;color:#e8e8e8;background:#0e0e0e;padding:32px;border-radius:8px;">
          <p style="color:#6b6b6b;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:24px;">
            Portfolio contact form
          </p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <tr>
              <td style="color:#6b6b6b;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;padding:8px 0;width:80px;vertical-align:top;">Name</td>
              <td style="color:#e8e8e8;font-size:13px;padding:8px 0;">{name}</td>
            </tr>
            <tr>
              <td style="color:#6b6b6b;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;padding:8px 0;vertical-align:top;">Email</td>
              <td style="color:#e8e8e8;font-size:13px;padding:8px 0;">{email}</td>
            </tr>
            <tr>
              <td style="color:#6b6b6b;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;padding:8px 0;vertical-align:top;">Subject</td>
              <td style="color:#e8e8e8;font-size:13px;padding:8px 0;">{subject}</td>
            </tr>
          </table>
          <div style="border-top:1px solid #2a2a2a;padding-top:20px;">
            <p style="color:#6b6b6b;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px;">Message</p>
            <p style="color:#a8a8a8;font-size:13px;line-height:1.8;white-space:pre-wrap;">{message}</p>
          </div>
          <p style="color:#3d3d3d;font-size:11px;margin-top:32px;border-top:1px solid #2a2a2a;padding-top:16px;">
            Reply directly to this email to reach {name} at {email}.
          </p>
        </div>
        "#,
        name = name,
        email = email,
        subject = subject,
        message = message,
    )
}
