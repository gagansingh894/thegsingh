use resend_rs::types::CreateEmailBaseOptions;
use std::sync::Arc;

#[derive(Clone)]
pub struct EmailSender {
    client: Arc<resend_rs::Resend>,
}

impl EmailSender {
    pub fn new(api_key: String) -> Self {
        Self {
            client: Arc::new(resend_rs::Resend::new(&api_key)),
        }
    }

    pub async fn send_email(
        &self,
        name: String,
        email: String,
        subject: String,
        message: String,
    ) -> anyhow::Result<String> {
        let from = "Portfolio <onboarding@resend.dev>";
        let to = ["gds31.gagandeepsingh@gmail.com"];
        let subject = format!("New message from {} — {}", name, subject);
        let html = build_email_html(name, email.clone(), subject.clone(), message);

        let email = CreateEmailBaseOptions::new(from, to, &subject)
            .with_reply(email.as_str())
            .with_html(&html);

        match self.client.emails.send(email).await {
            Ok(_) => Ok(
                "Your message has been sent to Gagan. He will get back to you soon!".to_string(),
            ),
            Err(e) => anyhow::bail!("Error sending email to portfolio: {}", e),
        }
    }
}

// ── Email template ────────────────────────────────────────────────────────────
// Matches the original Next.js HTML template exactly.

fn build_email_html(name: String, email: String, subject: String, message: String) -> String {
    format!(
        r#"
        <div style="font-family:monospace;max-width:560px;color:#e8e8e8;background:#0e0e0e;padding:32px;border-radius:8px;">
          <p style="color:#6b6b6b;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:24px;">
            Portfolio contact form
          </p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <tr>
              <td style="color:#6b6b6b;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;padding:8px 0;width:80px;vertical-align:top;">Name</td>
              <td style="color:#e8e8e8;font-size:13px;padding:8px 0;">{name}</td>
            </tr>
            <tr>
              <td style="color:#6b6b6b;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;padding:8px 0;vertical-align:top;">Email</td>
              <td style="color:#e8e8e8;font-size:13px;padding:8px 0;">{email}</td>
            </tr>
            <tr>
              <td style="color:#6b6b6b;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;padding:8px 0;vertical-align:top;">Subject</td>
              <td style="color:#e8e8e8;font-size:13px;padding:8px 0;">{subject}</td>
            </tr>
          </table>
          <div style="border-top:1px solid #2a2a2a;padding-top:20px;">
            <p style="color:#6b6b6b;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px;">Message</p>
            <p style="color:#a8a8a8;font-size:13px;line-height:1.8;white-space:pre-wrap;">{message}</p>
          </div>
          <p style="color:#3d3d3d;font-size:11px;margin-top:32px;border-top:1px solid #2a2a2a;padding-top:16px;">
            Reply directly to this email to reach {name} at {email}.
          </p>
        </div>
        "#,
        name = name,
        email = email,
        subject = subject,
        message = message,
    )
}
