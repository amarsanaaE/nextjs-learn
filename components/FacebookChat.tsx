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
    console.log("FacebookChat component mounted");
    console.log("Props received:", { appId, pageId, themeColor });

    // Load the Facebook SDK asynchronously
    const loadFacebookSDK = () => {
      console.log("Starting Facebook SDK load process");

      // Don't load again if already loaded
      if (document.getElementById("facebook-jssdk")) {
        console.log("Facebook SDK script tag already exists in DOM");
        return;
      }

      // Setup async initialization
      console.log("Setting up fbAsyncInit");
      window.fbAsyncInit = function () {
        console.log("fbAsyncInit called - initializing Facebook SDK");
        try {
          window.FB.init({
            appId: appId,
            autoLogAppEvents: true,
            xfbml: true,
            version: "v19.0",
          });
          console.log("Facebook SDK initialized successfully");
        } catch (error) {
          console.error("Error initializing Facebook SDK:", error);
        }
      };

      try {
        console.log("Creating Facebook SDK script element");
        // Load the SDK
        const script = document.createElement("script");
        script.id = "facebook-jssdk";
        script.defer = true;
        script.async = true;
        script.crossOrigin = "anonymous";
        script.src =
          "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";

        // Add event listeners to track script loading
        script.onload = () =>
          console.log("Facebook SDK script loaded successfully");
        script.onerror = (error) =>
          console.error("Error loading Facebook SDK script:", error);

        const firstScript = document.getElementsByTagName("script")[0];
        if (firstScript && firstScript.parentNode) {
          console.log("Inserting Facebook SDK script before first script");
          firstScript.parentNode.insertBefore(script, firstScript);
        } else {
          console.log("No existing scripts found, appending to head");
          document.head.appendChild(script);
        }
      } catch (error) {
        console.error("Error setting up Facebook SDK script:", error);
      }
    };

    loadFacebookSDK();

    // Check if the chat element is rendered every second for 10 seconds
    const chatCheckInterval = setInterval(() => {
      const chatElement = document.querySelector(".fb-customerchat");
      console.log("Checking if chat element is rendered:", chatElement);

      // Check if FB object is available
      if (window.FB) {
        console.log("FB object is available");
        try {
          // Try to parse XFBML again in case it failed
          window.FB.XFBML.parse();
          console.log("FB.XFBML.parse() executed");
        } catch (error) {
          console.error("Error executing FB.XFBML.parse():", error);
        }
      } else {
        console.log("FB object is not available yet");
      }
    }, 3000); // Check every 3 seconds

    // Stop checking after 30 seconds
    setTimeout(() => {
      clearInterval(chatCheckInterval);
      console.log("Stopped checking for chat element");
    }, 30000);

    // Cleanup on unmount
    return () => {
      console.log("FacebookChat component unmounting, cleaning up");
      clearInterval(chatCheckInterval);

      const fbRoot = document.getElementById("fb-root");
      if (fbRoot) {
        console.log("Clearing fb-root element");
        fbRoot.innerHTML = "";
      }
    };
  }, [appId, pageId]);

  console.log("Rendering FacebookChat component");

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
