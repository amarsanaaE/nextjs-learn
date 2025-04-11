"use client";

import { useState } from "react";
import Image from "next/image";

interface MessengerChatProps {
  pageId: string;
  themeColor?: string;
}

export default function MessengerChat({
  pageId,
  themeColor = "#0084ff",
}: MessengerChatProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openMessenger = () => {
    window.open(`https://m.me/${pageId}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 rounded-lg shadow-lg bg-white p-4 w-80">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800">Chat with us</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            How can we help you today? Click the button below to chat with us on
            Messenger.
          </p>
          <button
            onClick={openMessenger}
            className="w-full py-2 px-4 rounded font-medium text-white"
            style={{ backgroundColor: themeColor }}
          >
            Continue to Messenger
          </button>
        </div>
      )}

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
              d="M12 3.5C7.30558 3.5 3.5 7.02391 3.5 11.3911C3.5 13.5878 4.45441 15.5923 6.04746 17.0477C6.27578 17.2574 6.39913 17.555 6.37147 17.8535L6.21831 19.4893C6.16158 20.1169 6.79167 20.5907 7.36127 20.3219L9.06071 19.4679C9.29732 19.3485 9.56826 19.3397 9.81331 19.4447C10.5143 19.7433 11.2739 19.9035 12.0693 19.9934C12.0464 19.7935 12.034 19.5902 12.034 19.3841C12.034 15.5706 15.5748 12.5 19.967 12.5C20.3373 12.5 20.7003 12.5280 21.0543 12.5821C20.3149 7.55333 16.5637 3.5 12 3.5ZM21.9926 14.4992C21.9973 14.4995 22.0019 14.4997 22.0065 14.5C22.0043 14.5 22.002 14.5 21.9996 14.5C21.9973 14.5 21.995 14.4996 21.9926 14.4992Z"
              fill="currentColor"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
