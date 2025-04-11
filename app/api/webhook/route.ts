import { NextRequest, NextResponse } from "next/server";

// Verify Token from Facebook Developer Settings
const VERIFY_TOKEN =  "your_verify_token_123";
const PAGE_ACCESS_TOKEN = "EAAUSvAOs2JsBO9SgiSoB49NiX90ZByKYYfimAAa3nwofyoaG1dCnkIBZBZAtC8daJEnEccwmDTf99weIGZBWx37FMGK8yf3YO6j5nazDrjZAp8uzsuQhoGV19YZCoyde1Jm59m9bW4maN2vuf5uyQFIVUPQ2GvfCjNIsagaHHOnw0iqeWQw0mQ4ZAl3uc7i5lBSHAZDZD"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified.");
    return new NextResponse(challenge, { status: 200 });
  } else {
    return new NextResponse("Forbidden", { status: 403 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.object === "page") {
    body.entry.forEach((entry: any) => {
      const webhookEvent = entry.messaging[0];
      console.log("Webhook event:", webhookEvent);

      // Example: Echo the received message
      if (webhookEvent.message) {
        handleIncomingMessage(
          webhookEvent.sender.id,
          webhookEvent.message.text
        );
      }
    });

    return new NextResponse("EVENT_RECEIVED", { status: 200 });
  } else {
    return new NextResponse("Not Found", { status: 404 });
  }
}

async function handleIncomingMessage(senderId: string, messageText: string) {
  const response = {
    recipient: { id: senderId },
    message: { text: `You said: ${messageText}` },
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/v12.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(response),
      }
    );

    const data = await res.json();
    console.log("Message sent:", data);
  } catch (err) {
    console.error("Error sending message:", err);
  }
}