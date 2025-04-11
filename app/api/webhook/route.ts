import { NextRequest, NextResponse } from 'next/server';
import facebookConfig from '@/lib/facebook-config';
import { sendTextMessage, sendButtonTemplate } from '@/lib/facebook';

// Handle GET requests (for webhook verification)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === facebookConfig.verifyToken) {
      // Respond with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      return new NextResponse(challenge, { status: 200 });
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  // Return a '404 Not Found' if mode or token are not present
  return new NextResponse('Not Found', { status: 404 });
}

// Handle POST requests (for webhook events)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if this is an event from a page subscription
    if (body.object === 'page') {
      // Iterate over each entry - there may be multiple if batched
      for (const entry of body.entry) {
        // Get the webhook event
        const webhookEvent = entry.messaging?.[0];

        if (webhookEvent) {
          const senderId = webhookEvent.sender.id;
          console.log(`Sender ID: ${senderId}`);

          // Check if the event is a message or a postback
          if (webhookEvent.message) {
            await handleMessage(senderId, webhookEvent.message);
          } else if (webhookEvent.postback) {
            await handlePostback(senderId, webhookEvent.postback);
          }
        }
      }

      // Return a '200 OK' response to all requests
      return new NextResponse('EVENT_RECEIVED', { status: 200 });
    } else {
      // Return a '404 Not Found' if event is not from a page subscription
      return new NextResponse('Not Found', { status: 404 });
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// Function to handle messages
async function handleMessage(senderId: string, receivedMessage: any) {
  console.log('Message received:', receivedMessage);

  try {
    // Handle text messages
    if (receivedMessage.text) {
      const messageText = receivedMessage.text.toLowerCase();
      
      // Simple response based on message content
      if (messageText.includes('hello') || messageText.includes('hi')) {
        await sendTextMessage(
          senderId, 
          "Hello! How can I help you today?", 
          facebookConfig.pageAccessToken
        );
      } else if (messageText.includes('help')) {
        // Send a button template with options
        await sendButtonTemplate(
          senderId,
          "What kind of help do you need?",
          [
            {
              type: "postback",
              title: "Product Information",
              payload: "PRODUCT_INFO"
            },
            {
              type: "postback",
              title: "Talk to Support",
              payload: "CUSTOMER_SUPPORT"
            },
            {
              type: "web_url",
              title: "Visit Website",
              url: "https://nextjs-learn-eight-phi.vercel.app/"
            }
          ],
          facebookConfig.pageAccessToken
        );
      } else {
        // Default response for any other message
        await sendTextMessage(
          senderId,
          `Thanks for your message: "${receivedMessage.text}". How can I assist you?`,
          facebookConfig.pageAccessToken
        );
      }
    } 
    // Handle attachments (images, files, etc.)
    else if (receivedMessage.attachments) {
      await sendTextMessage(
        senderId,
        "Thanks for sending this attachment. I've received it!",
        facebookConfig.pageAccessToken
      );
    }
  } catch (error) {
    console.error('Error in handleMessage:', error);
  }
}

// Function to handle postbacks
async function handlePostback(senderId: string, receivedPostback: any) {
  console.log('Postback received:', receivedPostback);

  try {
    const payload = receivedPostback.payload;
    
    // Handle different postback payloads
    switch (payload) {
      case 'GET_STARTED':
        await sendTextMessage(
          senderId,
          "Welcome! I'm your friendly bot assistant. How can I help you today?",
          facebookConfig.pageAccessToken
        );
        break;
        
      case 'PRODUCT_INFO':
        await sendTextMessage(
          senderId,
          "Our products are designed with you in mind. We offer a range of solutions to meet your needs. What specific product are you interested in?",
          facebookConfig.pageAccessToken
        );
        break;
        
      case 'CUSTOMER_SUPPORT':
        await sendTextMessage(
          senderId,
          "Our support team will get back to you shortly. In the meantime, could you briefly describe the issue you're experiencing?",
          facebookConfig.pageAccessToken
        );
        break;
        
      default:
        await sendTextMessage(
          senderId,
          `I received your request: ${payload}. I'll process it right away.`,
          facebookConfig.pageAccessToken
        );
    }
  } catch (error) {
    console.error('Error in handlePostback:', error);
  }
}