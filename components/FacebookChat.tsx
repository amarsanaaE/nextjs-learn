"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
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
    // Load the Facebook SDK asynchronously
    const loadFacebookSDK = () => {
      // Don't load again if already loaded
      if (document.getElementById("facebook-jssdk")) return;

      // Setup async initialization
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: appId,
          autoLogAppEvents: true,
          xfbml: true,
          version: "v19.0",
        });
      };

      // Load the SDK
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.defer = true;
      script.async = true;
      script.crossOrigin = "anonymous";
      script.src =
        "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";

      const firstScript = document.getElementsByTagName("script")[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      } else {
        document.head.appendChild(script);
      }
    };

    loadFacebookSDK();

    // Cleanup on unmount
    return () => {
      const fbRoot = document.getElementById("fb-root");
      if (fbRoot) {
        fbRoot.innerHTML = "";
      }
    };
  }, [appId]);

  return (
    <>
      <div id="fb-root"></div>
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
