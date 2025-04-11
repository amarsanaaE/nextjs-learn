"use client";

import { useState, useEffect } from "react";

interface FacebookChatProps {
  pageId: string;
  themeColor?: string;
  loggedInGreeting?: string;
  loggedOutGreeting?: string;
}

export default function FacebookChat({
  pageId,
  themeColor = "#0084ff",
  loggedInGreeting = "Hi! How can we help you today?",
  loggedOutGreeting = "Hi! How can we help you today?",
}: FacebookChatProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Handle direct link to Facebook Messenger
  const openMessenger = () => {
    window.open(`https://m.me/${pageId}`, "_blank");
  };

  // Display iframe when chat is open
  const renderIframe = () => {
    if (!isOpen) return null;

    return (
      <div
        className="fixed bottom-20 right-6 z-50 shadow-lg rounded-lg overflow-hidden"
        style={{ width: "325px", height: "400px" }}
      >
        <div
          className="w-full bg-white flex justify-between items-center p-2"
          style={{ backgroundColor: themeColor }}
        >
          <span className="text-white font-bold">Chat with us</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-gray-200 font-bold"
          >
            ✕
          </button>
        </div>
        <iframe
          src={`https://www.messenger.com/t/${pageId}`}
          width="100%"
          height="370px"
          frameBorder="0"
          title="Facebook Messenger Chat"
        ></iframe>
      </div>
    );
  };

  // Listen for messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Handle any messages from the iframe if needed
      if (event.origin === "https://www.messenger.com") {
        console.log("Received message from Messenger iframe:", event.data);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <>
      {renderIframe()}

      {/* Chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 flex items-center justify-center shadow-lg text-white"
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
              d="M12 3.5C7.30558 3.5 3.5 7.02391 3.5 11.3911C3.5 13.5878 4.45441 15.5923 6.04746 17.0477C6.27578 17.2574 6.39913 17.555 6.37147 17.8535L6.21831 19.4893C6.16158 20.1169 6.79167 20.5907 7.36127 20.3219L9.06071 19.4679C9.29732 19.3485 9.56826 19.3397 9.81331 19.4447C10.5143 19.7433 11.2739 19.9035 12.0693 19.9934C12.0464 19.7935 12.034 19.5902 12.034 19.3841C12.034 15.5706 15.5748 12.5 19.967 12.5C20.3373 12.5 20.7003 12.5280 21.0543 12.5821C20.3149 7.55333 16.5637 3.5 12 3.5Z"
              fill="currentColor"
            />
          </svg>
        )}
      </button>
    </>
  );
}
