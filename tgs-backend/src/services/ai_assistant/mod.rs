mod memory;

use crate::services::ai_assistant::memory::RedisConversationalMemory;
use deadpool_redis::Pool;
use rig::OneOrMany;
use rig::completion::{AssistantContent, CompletionModel, CompletionRequest, message};
use rig::memory::ConversationMemory;

pub struct Service<M: CompletionModel> {
    system_prompt: String,
    model: M,
    memory: RedisConversationalMemory,
}

impl<M: CompletionModel> Service<M> {
    pub fn new(redis_connection_pool: Pool, model: M) -> Self {
        let system_prompt = include_str!("prompts/system_prompt.txt").replace(
            "{{PROFILE_CONTEXT}}",
            include_str!("prompts/profile_context.txt"),
        );

        Self {
            system_prompt,
            memory: RedisConversationalMemory::new(redis_connection_pool),
            model,
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
        let response = self
            .model
            .completion(CompletionRequest {
                model: None,
                preamble: Some(self.system_prompt.clone()),
                chat_history,
                documents: vec![],
                tools: vec![],
                temperature: None,
                max_tokens: Some(1024),
                tool_choice: None,
                additional_params: None,
                output_schema: None,
            })
            .await
            .map_err(|e| anyhow::anyhow!("LLM call failed: {}", e))
            .and_then(|model_response| match model_response.choice.first() {
                AssistantContent::Text(value) => Ok(value.text.clone()),
                _ => Err(anyhow::anyhow!("unexpected response type")),
            })?;
        let response_message = message::Message::assistant(response.clone());

        // update conversation history
        conversation.push(response_message);
        self.memory
            .append(conversation_id.as_str(), conversation)
            .await?;

        Ok(response)
    }
}
