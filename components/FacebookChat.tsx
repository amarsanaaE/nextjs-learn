"use client";

import { useEffect } from "react";

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
  useEffect(() => {
    console.log("FacebookChat component mounted with pageId:", pageId);

    // Function to load Facebook SDK
    const loadFacebookSDK = () => {
      // Remove any existing Facebook SDK scripts to prevent duplicates
      const existingScript = document.getElementById("facebook-jssdk");
      if (existingScript) {
        existingScript.remove();
      }

      // Add Facebook SDK
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.src =
        "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      // Initialize Facebook SDK
      window.fbAsyncInit = function () {
        console.log("Facebook SDK initialization called");
        window.FB.init({
          xfbml: true,
          version: "v19.0",
        });
      };
    };

    loadFacebookSDK();

    return () => {
      // Clean up if necessary
      const chatElement = document.querySelector(".fb-customerchat");
      if (chatElement) {
        chatElement.remove();
      }

      const existingScript = document.getElementById("facebook-jssdk");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [appId, pageId]);

  return (
    <>
      {/* These elements must be rendered directly for Facebook's SDK to find them */}
      <div id="fb-root"></div>

      {/* Customer Chat code - using data- prefix for React compatibility */}
      <div
        className="fb-customerchat"
        data-attribution="setup_tool"
        data-page_id={pageId}
        data-theme_color={themeColor}
        data-logged_in_greeting={loggedInGreeting}
        data-logged_out_greeting={loggedOutGreeting}
      ></div>
    </>
  );
}
