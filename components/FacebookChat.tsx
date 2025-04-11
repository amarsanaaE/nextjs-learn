"use client";

import { useState } from "react";

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

  return (
    <>
      {/* Chat popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 bg-white rounded-lg shadow-xl w-80 overflow-hidden">
          <div className="p-4 bg-white border-b flex flex-col items-center text-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
              style={{ backgroundColor: themeColor }}
            >
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
                  fill="white"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-1">Chat with us</h3>
            <p className="text-gray-600 text-sm">{loggedInGreeting}</p>
          </div>

          <div className="p-4 flex flex-col space-y-3">
            <p className="text-sm text-gray-600">
              We use Messenger to chat with our customers. Click the button
              below to start a conversation with us.
            </p>

            <button
              onClick={openMessenger}
              className="w-full py-2 px-4 rounded font-medium text-white flex items-center justify-center space-x-2"
              style={{ backgroundColor: themeColor }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 3.5C7.30558 3.5 3.5 7.02391 3.5 11.3911C3.5 13.5878 4.45441 15.5923 6.04746 17.0477C6.27578 17.2574 6.39913 17.555 6.37147 17.8535L6.21831 19.4893C6.16158 20.1169 6.79167 20.5907 7.36127 20.3219L9.06071 19.4679C9.29732 19.3485 9.56826 19.3397 9.81331 19.4447C10.5143 19.7433 11.2739 19.9035 12.0693 19.9934C12.0464 19.7935 12.034 19.5902 12.034 19.3841C12.034 15.5706 15.5748 12.5 19.967 12.5C20.3373 12.5 20.7003 12.5280 21.0543 12.5821C20.3149 7.55333 16.5637 3.5 12 3.5Z"
                  fill="white"
                />
              </svg>
              <span>Continue in Messenger</span>
            </button>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
