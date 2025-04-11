import type { NextApiRequest, NextApiResponse } from "next";

// Verify Token from Facebook Developer Settings
const VERIFY_TOKEN = "your_verify_token_123";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Webhook verification
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("Webhook verified.");
      res.status(200).send(challenge);
    } else {
      res.status(403).send("Forbidden");
    }
  } else if (req.method === "POST") {
    // Handle incoming messages
    const body = req.body;

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

      res.status(200).send("EVENT_RECEIVED");
    } else {
      res.status(404).send("Not Found");
    }
  }
}

async function handleIncomingMessage(senderId: string, messageText: string) {
  const PAGE_ACCESS_TOKEN = "EAAUSvAOs2JsBO9SgiSoB49NiX90ZByKYYfimAAa3nwofyoaG1dCnkIBZBZAtC8daJEnEccwmDTf99weIGZBWx37FMGK8yf3YO6j5nazDrjZAp8uzsuQhoGV19YZCoyde1Jm59m9bW4maN2vuf5uyQFIVUPQ2GvfCjNIsagaHHOnw0iqeWQw0mQ4ZAl3uc7i5lBSHAZDZD";

  const response = {
    recipient: { id: senderId },
    message: { text: `You said: ${messageText}` },
  };

  await fetch(
    `https://graph.facebook.com/v12.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(response),
    }
  ).then((res) => res.json())
    .then((data) => console.log("Message sent:", data))
    .catch((err) => console.error("Error sending message:", err));
}