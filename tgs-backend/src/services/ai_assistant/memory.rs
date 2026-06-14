use deadpool_redis::Pool;
use redis::AsyncCommands;
use rig::memory::{ConversationMemory, MemoryError};
use rig::message::Message;
use rig::wasm_compat::WasmBoxedFuture;

pub struct RedisConversationalMemory {
    pool: Pool,
}

impl RedisConversationalMemory {
    pub fn new(redis_connection_pool: Pool) -> Self {
        Self {
            pool: redis_connection_pool,
        }
    }
}

impl ConversationMemory for RedisConversationalMemory {
    fn load<'a>(
        &'a self,
        conversation_id: &'a str,
    ) -> WasmBoxedFuture<'a, Result<Vec<Message>, MemoryError>> {
        Box::pin(async move {
            let mut conn = self.pool.get().await.map_err(|e| {
                MemoryError::Internal(format!("failed to get Redis connection: {}", e))
            })?;

            let value: Option<String> = conn.get(conversation_id).await.map_err(|e| {
                MemoryError::Internal(format!(
                    "failed to get conversation for id {}: {}",
                    conversation_id, e
                ))
            })?;

            match value {
                None => Ok(vec![]),
                Some(json) => serde_json::from_str(&json).map_err(|e| {
                    MemoryError::Internal(format!("failed to deserialize JSON: {}", e))
                }),
            }
        })
    }

    fn append<'a>(
        &'a self,
        conversation_id: &'a str,
        messages: Vec<Message>,
    ) -> WasmBoxedFuture<'a, Result<(), MemoryError>> {
        Box::pin(async move {
            let mut conn = self.pool.get().await.map_err(|e| {
                MemoryError::Internal(format!("failed to get Redis connection: {}", e))
            })?;

            let raw_messages: String = serde_json::to_string(&messages).map_err(|e| {
                MemoryError::Internal(format!("failed to serialize messages: {}", e))
            })?;

            conn.set::<_, _, ()>(conversation_id, raw_messages)
                .await
                .map_err(|e| MemoryError::Internal(e.to_string()))?;

            Ok(())
        })
    }

    fn clear<'a>(
        &'a self,
        conversation_id: &'a str,
    ) -> WasmBoxedFuture<'a, Result<(), MemoryError>> {
        Box::pin(async move {
            let mut conn = self.pool.get().await.map_err(|e| {
                MemoryError::Internal(format!("failed to get Redis connection: {}", e))
            })?;

            conn.del::<_, ()>(conversation_id)
                .await
                .map_err(|e| MemoryError::Internal(e.to_string()))?;

            Ok(())
        })
    }
}
