use crate::domain;
use crate::services::portfolio;

use super::models::{AboutDetail, PortfolioResponse, Project, SkillGroup, TimelineEntry};

impl From<domain::AboutDetail> for AboutDetail {
    fn from(value: domain::AboutDetail) -> Self {
        Self {
            role: value.role,
            location: format!("{}, {}", value.location.state, value.location.country),
            currently: value.currently,
            interests: value.interests,
            highlight: value.highlight,
            introduction: value.introduction,
        }
    }
}

impl From<domain::Project> for Project {
    fn from(value: domain::Project) -> Self {
        Self {
            title: value.title,
            description: value.description,
            tags: value
                .tags
                .into_iter()
                .map(|skill| skill.to_string())
                .collect(),
            link: value.link,
            link_label: value.link_label,
        }
    }
}

impl From<domain::SkillGroup> for SkillGroup {
    fn from(value: domain::SkillGroup) -> Self {
        Self {
            title: value.title.to_string(),
            skills: value
                .skills
                .into_iter()
                .map(|skill| skill.to_string())
                .collect(),
        }
    }
}

impl From<domain::TimelineEntry> for TimelineEntry {
    fn from(value: domain::TimelineEntry) -> Self {
        Self {
            company: value.company,
            role: value.role,
            period: value.period,
            current: value.current,
            bullets: value.bullets,
        }
    }
}

impl From<portfolio::Response> for PortfolioResponse {
    fn from(value: portfolio::Response) -> Self {
        Self {
            about: value.about.into(),
            skills: value.skills.into_iter().map(Into::into).collect(),
            journey: value
                .journey
                .entries()
                .iter()
                .cloned()
                .map(Into::into)
                .collect(),
            projects: value.projects.into_iter().map(Into::into).collect(),
        }
    }
}
