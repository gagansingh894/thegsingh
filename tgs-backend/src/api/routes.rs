use crate::api::models::{
    ChatRequest, ChatResponse, ContactMeRequest, ContactMeResponse, PortfolioResponse,
};
use crate::services::{ai_assistant, portfolio};
use axum::Json;
use axum::extract::State;
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use deadpool_redis::{Config, Runtime};
use rig::client::CompletionClient;
use rig::completion::CompletionModel;
use serde_json::json;
use std::sync::Arc;

#[cfg(feature = "anthropic")]
pub type AppState = AppStateInner<rig::providers::anthropic::completion::CompletionModel>;

#[cfg(feature = "ollama")]
pub type AppState = AppStateInner<rig::providers::ollama::CompletionModel>;

pub struct AppStateInner<M: CompletionModel> {
    portfolio_service: Arc<portfolio::Service>,
    ai_assistant_service: Arc<ai_assistant::Service<M>>,
}

impl AppStateInner<rig::providers::anthropic::completion::CompletionModel> {
    #[cfg(feature = "anthropic")]
    pub fn new() -> Self {
        let resend_api_key = std::env::var("RESEND_API_KEY").expect("RESEND_API_KEY must be set");
        let portfolio_service = portfolio::Service::new(portfolio::Config { resend_api_key });

        let redis_url = std::env::var("REDIS_URL").expect("REDIS_URL must be set");
        let redis_connection_pool = Config::from_url(redis_url)
            .create_pool(Some(Runtime::Tokio1))
            .unwrap();

        let anthropic_api_key =
            std::env::var("ANTHROPIC_API_KEY").expect("ANTHROPIC_API_KEY");
        let client = rig::providers::anthropic::Client::new(anthropic_api_key).unwrap();
        let model =
            client.completion_model(rig::providers::anthropic::completion::CLAUDE_HAIKU_4_5);

        let ai_assistant_service = ai_assistant::Service::new(redis_connection_pool, model);

        Self {
            portfolio_service: Arc::new(portfolio_service),
            ai_assistant_service: Arc::new(ai_assistant_service),
        }
    }
}

impl AppStateInner<rig::providers::ollama::CompletionModel> {
    #[cfg(feature = "ollama")]
    pub fn new() -> Self {
        let resend_api_key = std::env::var("RESEND_API_KEY").expect("RESEND_API_KEY must be set");
        let portfolio_service = portfolio::Service::new(portfolio::Config { resend_api_key });

        let redis_url = std::env::var("REDIS_URL").expect("REDIS_URL must be set");
        let redis_connection_pool = Config::from_url(redis_url)
            .create_pool(Some(Runtime::Tokio1))
            .unwrap();

        let client = rig::providers::ollama::Client::new("").unwrap();
        let model = client.completion_model("gemma4:12b");

        let ai_assistant_service = ai_assistant::Service::new(redis_connection_pool, model);

        Self {
            portfolio_service: Arc::new(portfolio_service),
            ai_assistant_service: Arc::new(ai_assistant_service),
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

pub async fn chat(
    State(state): State<Arc<AppState>>,
    Json(request): Json<ChatRequest>,
) -> Result<Json<ChatResponse>, ApiError> {
    let response = state
        .ai_assistant_service
        .chat(request.conversation_id.clone(), request.content)
        .await?;
    Ok(Json(ChatResponse {
        conversation_id: request.conversation_id,
        content: response,
    }))
}
