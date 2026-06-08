#[derive(Debug, Clone)]
pub struct AboutDetail {
    pub role: String,
    pub location: Location,
    pub currently: String,
    pub interests: Vec<String>,

    pub highlight: String,
    pub introduction: String,
}

#[derive(Debug, Clone)]
pub struct Location {
    pub state: String,
    pub country: String,
}
