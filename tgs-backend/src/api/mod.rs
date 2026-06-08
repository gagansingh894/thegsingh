use std::sync::Arc;

use axum::Router;

use axum::routing::get;

pub use crate::api::routes::AppState;
use crate::api::routes::{get_portfolio, healthcheck};

mod models;
mod parser;
mod routes;

pub fn build_router(shared_state: Arc<AppState>) -> Router {
    let portfolio_routes = Router::new().route("/", get(get_portfolio));

    let v1_routes = Router::new().nest("/portfolio", portfolio_routes);

    Router::new()
        .route("/healthcheck", get(healthcheck))
        .nest("/api/v1", v1_routes)
        .with_state(shared_state)
}
