import { NextResponse } from "next/server";
import { sendContactMessage, TgsApiError } from "@/lib/tgs-client";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    await sendContactMessage({ name, email, subject, message });
    return NextResponse.json({ success: true });
  } catch (e) {
    if (e instanceof TgsApiError) {
      return NextResponse.json({ error: "Failed to send message." }, { status: e.status });
    }
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
