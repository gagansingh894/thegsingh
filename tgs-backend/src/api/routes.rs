use crate::api::models::{ContactMeRequest, ContactMeResponse, PortfolioResponse};
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
        let resend_api_key = std::env::var("RESEND_API_KEY").expect("RESEND_API_KEY must be set");
        let portfolio_service = portfolio::Service::new(portfolio::Config { resend_api_key });
        Self {
            portfolio_service: Arc::new(portfolio_service),
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

pub async fn contact_me(
    State(state): State<Arc<AppState>>,
    Json(request): Json<ContactMeRequest>,
) -> Result<Json<ContactMeResponse>, ApiError> {
    // Validate
    if request.name.trim().is_empty()
        || request.email.trim().is_empty()
        || request.subject.trim().is_empty()
        || request.message.trim().is_empty()
    {
        return Err(ApiError(anyhow::anyhow!("All fields are required.")));
    };

    let id = state
        .portfolio_service
        .contact_me(
            request.name,
            request.email,
            request.subject,
            request.message,
        )
        .await?;
    Ok(Json(ContactMeResponse { id }))
}
