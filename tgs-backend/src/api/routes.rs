use crate::api::models::PortfolioResponse;
use crate::services::portfolio;
use axum::Json;
use axum::extract::State;
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use serde_json::json;
use std::sync::Arc;

pub struct AppState {
    portfolio_service: Arc<portfolio::Service>,
}

impl AppState {
    pub fn new() -> Self {
        Self {
            portfolio_service: Arc::new(portfolio::Service::new()),
        }
    }
}

pub struct ApiError(anyhow::Error);

impl From<anyhow::Error> for ApiError {
    fn from(err: anyhow::Error) -> Self {
        Self(err)
    }
}

impl IntoResponse for ApiError {
    fn into_response(self) -> Response {
        let body = Json(json!({"error": self.0.to_string()}));
        (StatusCode::INTERNAL_SERVER_ERROR, body).into_response()
    }
}

pub async fn healthcheck() -> impl IntoResponse {
    (StatusCode::OK, Json(json!({"status": "ok"})))
}

pub async fn get_portfolio(
    State(state): State<Arc<AppState>>,
) -> Result<Json<PortfolioResponse>, ApiError> {
    let content = state.portfolio_service.get_content().await?;
    Ok(Json(content.into()))
}
