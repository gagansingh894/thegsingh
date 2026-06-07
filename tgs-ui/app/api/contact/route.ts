import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// Switch to 'hello@thegsingh.com' once domain is verified in Resend
const FROM = "onboarding@resend.dev";
const TO = "gds31.gagandeepsingh@gmail.com";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `New message from ${name} — ${subject}`,
      html: `
        <div style="font-family:monospace;max-width:560px;color:#e8e8e8;background:#0e0e0e;padding:32px;border-radius:8px;">
          <p style="color:#6b6b6b;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:24px;">
            Portfolio contact form
          </p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <tr>
              <td style="color:#6b6b6b;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;padding:8px 0;width:80px;vertical-align:top;">Name</td>
              <td style="color:#e8e8e8;font-size:13px;padding:8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="color:#6b6b6b;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;padding:8px 0;vertical-align:top;">Email</td>
              <td style="color:#e8e8e8;font-size:13px;padding:8px 0;">${email}</td>
            </tr>
            <tr>
              <td style="color:#6b6b6b;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;padding:8px 0;vertical-align:top;">Subject</td>
              <td style="color:#e8e8e8;font-size:13px;padding:8px 0;">${subject}</td>
            </tr>
          </table>
          <div style="border-top:1px solid #2a2a2a;padding-top:20px;">
            <p style="color:#6b6b6b;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px;">Message</p>
            <p style="color:#a8a8a8;font-size:13px;line-height:1.8;white-space:pre-wrap;">${message}</p>
          </div>
          <p style="color:#3d3d3d;font-size:11px;margin-top:32px;border-top:1px solid #2a2a2a;padding-top:16px;">
            Reply directly to this email to reach ${name} at ${email}.
          </p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
