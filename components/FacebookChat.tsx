"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: {
      init: (options: {
        xfbml?: boolean;
        version: string;
        appId?: string;
        autoLogAppEvents?: boolean;
      }) => void;
      XFBML: {
        parse: (element?: HTMLElement) => void;
      };
      CustomerChat: {
        show: (shouldShowDialog?: boolean) => void;
        hide: () => void;
        hideDialog: () => void;
        showDialog: () => void;
      };
    };
  }
}

interface FacebookChatProps {
  appId: string;
  pageId: string;
  themeColor?: string;
  loggedInGreeting?: string;
  loggedOutGreeting?: string;
}

export default function FacebookChat({
  appId,
  pageId,
  themeColor = "#0084ff",
  loggedInGreeting = "Hi! How can we help you?",
  loggedOutGreeting = "Hi! How can we help you?",
}: FacebookChatProps) {
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    console.log("FacebookChat component mounted with pageId:", pageId);

    // Create a chat button as fallback
    const createChatButton = () => {
      const button = document.createElement("button");
      button.textContent = "Chat with us";
      button.style.position = "fixed";
      button.style.bottom = "20px";
      button.style.right = "20px";
      button.style.backgroundColor = themeColor;
      button.style.color = "white";
      button.style.padding = "10px 20px";
      button.style.borderRadius = "30px";
      button.style.border = "none";
      button.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
      button.style.cursor = "pointer";
      button.style.zIndex = "1000";

      button.onclick = () => {
        window.open(`https://m.me/${pageId}`, "_blank");
      };

      document.body.appendChild(button);
      return button;
    };

    // Try to load Facebook SDK with a timeout
    const loadFacebookSDK = () => {
      return new Promise<void>((resolve, reject) => {
        try {
          // Remove any existing script
          const existingScript = document.getElementById("facebook-jssdk");
          if (existingScript) {
            existingScript.remove();
          }

          // Set up Facebook init
          window.fbAsyncInit = function () {
            console.log("Facebook SDK initialized");
            window.FB.init({
              xfbml: true,
              version: "v19.0",
              appId: appId,
            });
            resolve();
          };

          // Create new script element
          const script = document.createElement("script");
          script.id = "facebook-jssdk";
          script.src = "https://connect.facebook.net/en_US/sdk.js";
          script.async = true;
          script.defer = true;
          script.crossOrigin = "anonymous";
          script.onerror = () => {
            console.log(
              "Facebook SDK failed to load - creating fallback chat button"
            );
            reject(new Error("Failed to load Facebook SDK"));
          };

          document.head.appendChild(script);

          // Set timeout in case it hangs
          setTimeout(() => {
            if (!window.FB) {
              reject(new Error("Facebook SDK load timeout"));
            }
          }, 5000);
        } catch (error) {
          reject(error);
        }
      });
    };

    let chatButton: HTMLButtonElement | null = null;

    loadFacebookSDK()
      .then(() => {
        console.log("Facebook SDK loaded successfully");
        setShowChat(true);
      })
      .catch((error) => {
        console.error("Error loading Facebook SDK:", error);
        chatButton = createChatButton();
      });

    return () => {
      // Clean up
      if (chatButton) {
        chatButton.remove();
      }
    };
  }, [appId, pageId, themeColor]);

  return (
    <>
      <div id="fb-root"></div>

      {showChat && (
        <div
          className="fb-customerchat"
          data-attribution="setup_tool"
          data-page_id={pageId}
          data-theme_color={themeColor}
          data-logged_in_greeting={loggedInGreeting}
          data-logged_out_greeting={loggedOutGreeting}
        ></div>
      )}
    </>
  );
}
