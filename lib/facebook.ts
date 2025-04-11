// Facebook API utilities for sending messages

/**
 * Send a text message to a user
 * @param recipientId - The Facebook user ID to send the message to
 * @param text - The message text
 * @param pageAccessToken - Your Facebook page access token
 */
export async function sendTextMessage(
  recipientId: string, 
  text: string, 
  pageAccessToken: string
) {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v19.0/me/messages?access_token=${pageAccessToken}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient: { id: recipientId },
          message: { text },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Facebook API Error: ${JSON.stringify(errorData)}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

/**
 * Send a template message with buttons
 * @param recipientId - The Facebook user ID to send the message to
 * @param text - The message text
 * @param buttons - Array of button objects
 * @param pageAccessToken - Your Facebook page access token
 */
export async function sendButtonTemplate(
  recipientId: string,
  text: string,
  buttons: Array<{
    type: 'web_url' | 'postback';
    url?: string;
    title: string;
    payload?: string;
  }>,
  pageAccessToken: string
) {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v19.0/me/messages?access_token=${pageAccessToken}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient: { id: recipientId },
          message: {
            attachment: {
              type: 'template',
              payload: {
                template_type: 'button',
                text,
                buttons,
              },
            },
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Facebook API Error: ${JSON.stringify(errorData)}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error sending button template:', error);
    throw error;
  }
}

/**
 * Send a generic template message (for rich cards)
 * @param recipientId - The Facebook user ID to send the message to
 * @param elements - Array of card elements
 * @param pageAccessToken - Your Facebook page access token
 */
export async function sendGenericTemplate(
  recipientId: string,
  elements: Array<{
    title: string;
    subtitle?: string;
    image_url?: string;
    default_action?: {
      type: 'web_url';
      url: string;
      webview_height_ratio?: 'tall' | 'compact' | 'full';
    };
    buttons?: Array<{
      type: 'web_url' | 'postback';
      url?: string;
      title: string;
      payload?: string;
    }>;
  }>,
  pageAccessToken: string
) {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v19.0/me/messages?access_token=${pageAccessToken}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient: { id: recipientId },
          message: {
            attachment: {
              type: 'template',
              payload: {
                template_type: 'generic',
                elements,
              },
            },
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Facebook API Error: ${JSON.stringify(errorData)}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error sending generic template:', error);
    throw error;
  }
}

/**
 * Mark a message as seen
 * @param recipientId - The Facebook user ID
 * @param pageAccessToken - Your Facebook page access token
 */
export async function sendMarkSeen(
  recipientId: string,
  pageAccessToken: string
) {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v19.0/me/messages?access_token=${pageAccessToken}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient: { id: recipientId },
          sender_action: 'mark_seen',
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Facebook API Error: ${JSON.stringify(errorData)}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error sending mark seen action:', error);
    throw error;
  }
}