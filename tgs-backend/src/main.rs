mod api;
mod domain;
mod repo;
mod services;

use std::sync::Arc;

use api::AppState;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let state = Arc::new(AppState::new());
    let app = api::build_router(state);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080").await?;
    println!("listening on {}", listener.local_addr()?);

    axum::serve(listener, app)
        .with_graceful_shutdown(shutdown_signal())
        .await?;

    Ok(())
}

async fn shutdown_signal() {
    let ctrl_c = async {
        tokio::signal::ctrl_c()
            .await
            .expect("failed to install Ctrl+C handler");
    };

    #[cfg(unix)]
    let terminate = async {
        tokio::signal::unix::signal(tokio::signal::unix::SignalKind::terminate())
            .expect("failed to install SIGTERM handler")
            .recv()
            .await;
    };

    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();

    tokio::select! {
        _ = ctrl_c => {},
        _ = terminate => {},
    }

    println!("shutdown signal received, draining connections");
}
