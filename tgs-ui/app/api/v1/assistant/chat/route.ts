import { NextResponse } from "next/server";
import { sendChatMessage, TgsApiError } from "@/lib/tgs-client";

export async function POST(req: Request) {
  try {
    const { conversation_id, content } = await req.json();

    if (!conversation_id || !content?.trim()) {
      return NextResponse.json(
        { error: "conversation_id and content are required." },
        { status: 400 }
      );
    }

    const response = await sendChatMessage({ conversation_id, content });
    return NextResponse.json(response);
  } catch (e) {
    if (e instanceof TgsApiError) {
      return NextResponse.json({ error: "Failed to get response." }, { status: e.status });
    }
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
