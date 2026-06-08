use crate::domain::skill::Skill;

#[derive(Debug, Clone)]
pub struct Project {
    pub title: String,
    pub description: String,
    pub tags: Vec<Skill>,
    pub link: String,
    pub link_label: String,
}
