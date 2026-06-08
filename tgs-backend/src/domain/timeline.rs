#[derive(Debug, Clone)]
pub struct TimelineEntry {
    pub company: String,
    pub role: String,
    pub period: String,
    pub current: bool,
    pub bullets: Vec<String>,
}

/// Employee career history ordered from newest to oldest.
///
/// The first element is always the employee's current position.
/// Remaining elements are historical positions in descending chronological order.
pub struct CareerJourney(Vec<TimelineEntry>);

#[allow(dead_code)]
impl CareerJourney {
    pub fn new() -> Self {
        CareerJourney(Vec::new())
    }

    pub fn from_entries(entries: &[TimelineEntry]) -> Self {
        Self(entries.to_vec())
    }

    pub fn add(&mut self, entry: TimelineEntry) {
        self.0.push(entry);
    }

    pub fn remove(&mut self, entry: &TimelineEntry) {
        self.0.retain(|e| e.company != entry.company);
    }

    pub fn entries(&self) -> &[TimelineEntry] {
        &self.0
    }
}
