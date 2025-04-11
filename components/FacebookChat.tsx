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

    // Manually create Facebook elements to ensure proper rendering
    const setupFacebookElements = () => {
      // Ensure we have fb-root
      if (!document.getElementById("fb-root")) {
        const root = document.createElement("div");
        root.id = "fb-root";
        document.body.appendChild(root);
        console.log("Created fb-root element");
      }

      // Create chat element manually
      let chatElement = document.querySelector(".fb-customerchat");
      if (!chatElement) {
        chatElement = document.createElement("div");
        chatElement.className = "fb-customerchat";
        chatElement.setAttribute("attribution", "setup_tool");
        chatElement.setAttribute("page_id", pageId);
        if (themeColor) {
          chatElement.setAttribute("theme_color", themeColor);
        }
        if (loggedInGreeting) {
          chatElement.setAttribute("logged_in_greeting", loggedInGreeting);
        }
        if (loggedOutGreeting) {
          chatElement.setAttribute("logged_out_greeting", loggedOutGreeting);
        }

        const fbRoot = document.getElementById("fb-root");
        if (fbRoot) {
          fbRoot.appendChild(chatElement);
          console.log("Manually created fb-customerchat element", chatElement);
        }
      } else {
        console.log("Chat element already exists");
      }
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
              xfbml: false, // We'll parse manually
              version: "v19.0",
              appId: appId,
            });

            // Add a slight delay before parsing XFBML to ensure DOM is ready
            setTimeout(() => {
              console.log("Manually parsing XFBML");
              window.FB.XFBML.parse();
            }, 1000);

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

    // Set up elements first
    setupFacebookElements();

    loadFacebookSDK()
      .then(() => {
        console.log("Facebook SDK loaded successfully");
        setShowChat(true);

        // Try parsing XFBML again after a delay
        setTimeout(() => {
          if (window.FB) {
            console.log("Re-parsing XFBML after delay");
            window.FB.XFBML.parse();
          }
        }, 3000);
      })
      .catch((error) => {
        console.error("Error loading Facebook SDK:", error);
        chatButton = createChatButton();
      });

    // Debug visibility issues - check if elements might be hidden
    const debugInterval = setInterval(() => {
      const chatEl = document.querySelector(".fb-customerchat");
      if (chatEl) {
        console.log(
          "Chat element exists. Styles:",
          window.getComputedStyle(chatEl)
        );

        // Look for Facebook's iframe which contains the actual chat widget
        const chatIframe = document.querySelector('iframe[title="Chat"]');
        if (chatIframe) {
          console.log("Chat iframe found:", chatIframe);
          console.log(
            "Chat iframe styles:",
            window.getComputedStyle(chatIframe)
          );
        } else {
          console.log("No chat iframe found yet");
        }
      }
    }, 5000);

    return () => {
      // Clean up
      clearInterval(debugInterval);
      if (chatButton) {
        chatButton.remove();
      }
    };
  }, [appId, pageId, themeColor, loggedInGreeting, loggedOutGreeting]);

  // Return empty fragment - we're creating elements manually
  return null;
}
