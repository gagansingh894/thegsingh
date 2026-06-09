#[derive(Debug, Clone)]
pub struct AboutDetail {
    pub role: String,
    pub location: Location,
    pub currently: String,
    pub interests: Vec<String>,

    pub highlight: String,
    pub introduction: String,

    pub socials: Socials,
}

#[derive(Debug, Clone)]
pub struct Location {
    pub state: String,
    pub country: String,
}

#[derive(Debug, Clone)]
pub struct Socials {
    pub github: String,
    pub linkedin: String,
    pub email: String,
}
