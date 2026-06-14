use std::sync::Arc;

use axum::Router;

pub use crate::api::routes::AppState;
use crate::api::routes::{chat, contact_me, get_portfolio, healthcheck};
use axum::routing::{get, post};

mod models;
mod parser;
mod routes;

pub fn build_router(shared_state: Arc<AppState>) -> Router {
    let portfolio_routes = Router::new()
        .route("/", get(get_portfolio))
        .route("/contact", post(contact_me));

    let ai_assistant_routes = Router::new().route("/chat", post(chat));

    let v1_routes = Router::new()
        .nest("/portfolio", portfolio_routes)
        .nest("/assistant", ai_assistant_routes);

    Router::new()
        .route("/healthcheck", get(healthcheck))
        .nest("/api/v1", v1_routes)
        .with_state(shared_state)
}
