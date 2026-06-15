mod memory;
mod tools;

use crate::services::ai_assistant::memory::RedisConversationalMemory;
use crate::services::ai_assistant::tools::EmailArgs;
use crate::services::common::email::EmailSender;
use deadpool_redis::Pool;
use rig::OneOrMany;
use rig::completion::{AssistantContent, CompletionModel, CompletionRequest, message};
use rig::memory::ConversationMemory;
use rig::tool::Tool;

pub struct Service<M: CompletionModel> {
    system_prompt: String,
    model: M,
    model_name: String,
    email_sender: EmailSender,
    memory: RedisConversationalMemory,
}

impl<M: CompletionModel> Service<M> {
    pub fn new(
        redis_connection_pool: Pool,
        email_sender: EmailSender,
        model: M,
        model_name: impl Into<String>,
    ) -> Self {
        let system_prompt = include_str!("prompts/system_prompt.txt").replace(
            "{{PROFILE_CONTEXT}}",
            include_str!("prompts/profile_context.txt"),
        );

        Self {
            system_prompt,
            email_sender,
            memory: RedisConversationalMemory::new(redis_connection_pool),
            model,
            model_name: model_name.into(),
        }
    }

    pub async fn chat(&self, conversation_id: String, content: String) -> anyhow::Result<String> {
        // load memory based on conversation_id
        let mut conversation = self.memory.load(conversation_id.as_str()).await?;

        // prepare new message and append to existing message
        let new_message = message::Message::user(content);
        conversation.push(new_message);

        // call llm
        let chat_history = OneOrMany::many(conversation.clone())?;
        let email_tool = self.email_sender.definition(String::new()).await;
        let completion_result = self
            .model
            .completion(CompletionRequest {
                model: None,
                preamble: Some(self.system_prompt.clone()),
                chat_history,
                documents: vec![],
                tools: vec![email_tool],
                temperature: None,
                max_tokens: Some(1024),
                tool_choice: None,
                additional_params: None,
                output_schema: None,
            })
            .await
            .map_err(|e| anyhow::anyhow!("LLM call failed: {}", e))?;

        let response = match completion_result.choice.first() {
            AssistantContent::Text(value) => value.text.clone(),
            AssistantContent::ToolCall(value) => {
                if value.function.name == EmailSender::NAME {
                    let args: EmailArgs = serde_json::from_value(value.function.arguments.clone())?;
                    self.email_sender
                        .call(args)
                        .await
                        .map_err(|e| anyhow::anyhow!("Tool call failed: {}", e))?
                } else {
                    anyhow::bail!("Unknown tool: {}", value.function.name)
                }
            }
            _ => return Err(anyhow::anyhow!("unexpected response type")),
        };

        let response_message = message::Message::assistant(response.clone());

        // update conversation history
        conversation.push(response_message);
        self.memory
            .append(conversation_id.as_str(), conversation)
            .await?;

        Ok(response)
    }
}
