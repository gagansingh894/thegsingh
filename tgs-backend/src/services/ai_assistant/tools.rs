use crate::services::common::email::EmailSender;

use rig::completion::ToolDefinition;
use rig::tool::Tool;
use rig::wasm_compat::{WasmCompatSend, WasmCompatSync};
use serde::{Deserialize, Serialize};
use thiserror::Error;

#[derive(Debug, Deserialize, Serialize)]
pub struct EmailArgs {
    pub name: String,
    pub email: String,
    pub subject: String,
    pub message: String,
}

#[derive(Debug, Error)]
pub enum EmailToolError {
    #[error("invalid recipient")]
    InvalidRecipient,
    #[error("failed to send email: {0}")]
    SendFailed(String),
}

impl Tool for EmailSender {
    const NAME: &'static str = "email_sender";
    type Error = EmailToolError;
    type Args = EmailArgs;
    type Output = String;

    fn definition(
        &self,
        _prompt: String,
    ) -> impl Future<Output = ToolDefinition> + WasmCompatSend + WasmCompatSync {
        Box::pin(async {
            ToolDefinition {
                name: Self::NAME.to_string(),
                description: "Send a contact email to Gagandeep Singh on behalf of the user. Call this once you have collected name, email, subject and message.".to_string(),
                parameters: serde_json::json!({
                    "type": "object",
                    "properties": {
                        "name": { "type": "string", "description": "Visitor's name" },
                        "email": { "type": "string", "description": "Visitor's email address" },
                        "subject": { "type": "string", "description": "Email subject" },
                        "message": { "type": "string", "description": "Email message body" }
                    },
                    "required": ["name", "email", "subject", "message"]
                }),
            }
        })
    }

    fn call(
        &self,
        args: Self::Args,
    ) -> impl Future<Output = Result<Self::Output, Self::Error>> + WasmCompatSend {
        Box::pin(async move {
            self.send_email(args.name, args.email, args.subject, args.message)
                .await
                .map_err(|e| EmailToolError::SendFailed(e.to_string()))
        })
    }
}
