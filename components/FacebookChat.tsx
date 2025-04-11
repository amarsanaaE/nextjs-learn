"use client";

import { useState, useEffect, useRef } from "react";

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface EmbeddedChatProps {
  pageId: string;
  themeColor?: string;
  initialMessage?: string;
}

export default function EmbeddedChat({
  pageId,
  themeColor = "#0084ff",
  initialMessage = "Hi! How can I help you today?",
}: EmbeddedChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat with welcome message
  useEffect(() => {
    // Generate a random session ID for this chat
    if (!sessionId) {
      setSessionId(
        `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
      );
    }

    // Only add initial message if there are no messages yet
    if (messages.length === 0 && initialMessage) {
      setMessages([
        {
          id: "welcome",
          text: initialMessage,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    }
  }, [initialMessage, messages.length, sessionId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending messages to webhook
  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message to chat
    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      // Send message to webhook API
      const response = await fetch("/api/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          object: "page",
          entry: [
            {
              id: pageId,
              time: Date.now(),
              messaging: [
                {
                  sender: { id: sessionId },
                  recipient: { id: pageId },
                  timestamp: Date.now(),
                  message: { text: text },
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      // Simulate response time
      setTimeout(() => {
        let botResponse =
          "Thank you for your message. I'll get back to you soon!";

        // Simple keyword responses
        if (
          text.toLowerCase().includes("hello") ||
          text.toLowerCase().includes("hi")
        ) {
          botResponse = "Hello! How can I help you today?";
        } else if (text.toLowerCase().includes("help")) {
          botResponse = "I'm here to help! What do you need assistance with?";
        } else if (
          text.toLowerCase().includes("product") ||
          text.toLowerCase().includes("service")
        ) {
          botResponse =
            "We offer a range of products and services. Could you tell me more specifically what you're looking for?";
        } else if (
          text.toLowerCase().includes("price") ||
          text.toLowerCase().includes("cost")
        ) {
          botResponse =
            "Our pricing varies based on your specific needs. Would you like to discuss this further?";
        }

        // Add bot response to chat
        setMessages((prev) => [
          ...prev,
          {
            id: `bot_${Date.now()}`,
            text: botResponse,
            isUser: false,
            timestamp: new Date(),
          },
        ]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error("Error sending message:", error);

      // Add error message to chat
      setMessages((prev) => [
        ...prev,
        {
          id: `error_${Date.now()}`,
          text: "Sorry, there was an error processing your message. Please try again.",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  // Format timestamp to readable time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 rounded-lg shadow-lg bg-white w-80 sm:w-96 max-h-[500px] flex flex-col">
          {/* Chat header */}
          <div
            className="p-3 rounded-t-lg flex items-center justify-between"
            style={{ backgroundColor: themeColor }}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 3.5C7.30558 3.5 3.5 7.02391 3.5 11.3911C3.5 13.5878 4.45441 15.5923 6.04746 17.0477C6.27578 17.2574 6.39913 17.555 6.37147 17.8535L6.21831 19.4893C6.16158 20.1169 6.79167 20.5907 7.36127 20.3219L9.06071 19.4679C9.29732 19.3485 9.56826 19.3397 9.81331 19.4447C10.5143 19.7433 11.2739 19.9035 12.0693 19.9934C12.0464 19.7935 12.034 19.5902 12.034 19.3841C12.034 15.5706 15.5748 12.5 19.967 12.5C20.3373 12.5 20.7003 12.528 21.0543 12.5821C20.3149 7.55333 16.5637 3.5 12 3.5Z"
                    fill={themeColor}
                  />
                </svg>
              </div>
              <h3 className="font-bold text-white">Chat with us</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* Chat messages */}
          <div className="p-4 overflow-y-auto flex-1 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-3 flex ${
                  msg.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.isUser
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  style={{
                    backgroundColor: msg.isUser ? themeColor : undefined,
                  }}
                >
                  <p className="text-sm">{msg.text}</p>
                  <span className="text-xs mt-1 opacity-70 block text-right">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start mb-3">
                <div className="bg-gray-200 text-gray-800 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <div className="p-3 border-t">
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1"
              />
              <button
                type="submit"
                className="rounded-r-lg px-4 py-2 text-white flex items-center justify-center"
                style={{ backgroundColor: themeColor }}
                disabled={!inputText.trim()}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 2L11 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 2L15 22L11 13L2 9L22 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full w-14 h-14 flex items-center justify-center shadow-lg text-white"
        style={{ backgroundColor: themeColor }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
              fill="currentColor"
            />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 3.5C7.30558 3.5 3.5 7.02391 3.5 11.3911C3.5 13.5878 4.45441 15.5923 6.04746 17.0477C6.27578 17.2574 6.39913 17.555 6.37147 17.8535L6.21831 19.4893C6.16158 20.1169 6.79167 20.5907 7.36127 20.3219L9.06071 19.4679C9.29732 19.3485 9.56826 19.3397 9.81331 19.4447C10.5143 19.7433 11.2739 19.9035 12.0693 19.9934C12.0464 19.7935 12.034 19.5902 12.034 19.3841C12.034 15.5706 15.5748 12.5 19.967 12.5C20.3373 12.5 20.7003 12.528 21.0543 12.5821C20.3149 7.55333 16.5637 3.5 12 3.5Z"
              fill="currentColor"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
