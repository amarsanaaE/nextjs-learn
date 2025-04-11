"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: {
      init: (options: {
        xfbml?: boolean;
        version: string;
        autoLogAppEvents?: boolean;
      }) => void;
      XFBML: {
        parse: (element?: HTMLElement) => void;
      };
    };
  }
}

interface FacebookChatProps {
  pageId: string;
  themeColor?: string;
  loggedInGreeting?: string;
  loggedOutGreeting?: string;
  greetingDialogDisplay?: "show" | "hide" | "fade";
  greetingDialogDelay?: number;
}

export default function FacebookChat({
  pageId,
  themeColor = "#0084ff",
  loggedInGreeting = "Hi! How can we help you today?",
  loggedOutGreeting = "Hi! How can we help you today?",
  greetingDialogDisplay = "show",
  greetingDialogDelay = 5,
}: FacebookChatProps) {
  useEffect(() => {
    // Load the Facebook SDK script
    const loadFacebookSDK = () => {
      if (document.getElementById("facebook-jssdk")) {
        return;
      }

      // Add Facebook Messenger chat code
      const chatCode = document.createElement("script");
      chatCode.innerHTML = `
        window.fbAsyncInit = function() {
          FB.init({
            xfbml: true,
            version: 'v19.0'
          });
        };

        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      `;
      document.head.appendChild(chatCode);
    };

    // Create a function to manually add the chat elements
    const addChatElements = () => {
      // Add fb-root if it doesn't exist
      if (!document.getElementById("fb-root")) {
        const root = document.createElement("div");
        root.id = "fb-root";
        document.body.appendChild(root);
      }

      // Add customerchat element if it doesn't exist
      if (!document.querySelector(".fb-customerchat")) {
        const chat = document.createElement("div");
        chat.className = "fb-customerchat";
        chat.setAttribute("attribution", "biz_inbox");
        chat.setAttribute("page_id", pageId);

        if (themeColor) {
          chat.setAttribute("theme_color", themeColor);
        }

        if (loggedInGreeting) {
          chat.setAttribute("logged_in_greeting", loggedInGreeting);
        }

        if (loggedOutGreeting) {
          chat.setAttribute("logged_out_greeting", loggedOutGreeting);
        }

        chat.setAttribute("greeting_dialog_display", greetingDialogDisplay);
        chat.setAttribute(
          "greeting_dialog_delay",
          greetingDialogDelay.toString()
        );

        document.getElementById("fb-root")?.appendChild(chat);
      }
    };

    // Try both approaches to maximize chances of success
    loadFacebookSDK();
    addChatElements();

    // For cases where the script takes time to load, try again after a delay
    const timer = setTimeout(() => {
      if (!document.querySelector(".fb-customerchat")) {
        addChatElements();
        if (window.FB) {
          window.FB.XFBML.parse();
        }
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [
    pageId,
    themeColor,
    loggedInGreeting,
    loggedOutGreeting,
    greetingDialogDisplay,
    greetingDialogDelay,
  ]);

  // In React, we need to return null or the chat elements
  // We'll return empty divs for the Facebook SDK to find and replace
  return (
    <>
      {/* Placeholder elements that Facebook SDK will target */}
      <div id="fb-root"></div>
    </>
  );
}
