"use client";

import { useEffect } from "react";
import Script from "next/script";

interface FacebookChatProps {
  pageId: string;
  themeColor?: string;
  loggedInGreeting?: string;
  loggedOutGreeting?: string;
}

export default function FacebookChat({
  pageId,
  themeColor = "#0084ff",
  loggedInGreeting = "Hi! How can we help you?",
  loggedOutGreeting = "Hi! How can we help you?",
}: FacebookChatProps) {
  // This function will be called once the Facebook SDK is loaded
  const handleFbLoad = () => {
    console.log("Facebook SDK script loaded successfully");

    // Create a fallback button in case the chat doesn't appear
    const createFallbackButton = () => {
      console.log("Creating fallback button");
      // Check if button already exists
      if (document.getElementById("fb-fallback-button")) {
        return;
      }

      const button = document.createElement("button");
      button.id = "fb-fallback-button";
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

      // Hide fallback button if chat appears
      const checkInterval = setInterval(() => {
        const chatIframe = document.querySelector('iframe[title^="Messenger"]');
        if (chatIframe) {
          console.log(
            "Facebook chat iframe detected, removing fallback button"
          );
          button.remove();
          clearInterval(checkInterval);
        }
      }, 2000);

      // Remove fallback after 30 seconds if chat doesn't appear
      setTimeout(() => {
        clearInterval(checkInterval);
      }, 30000);
    };

    // Check if chat appears within 10 seconds
    setTimeout(() => {
      const chatIframe = document.querySelector('iframe[title^="Messenger"]');
      if (!chatIframe) {
        console.log(
          "No Facebook chat iframe detected after timeout, showing fallback"
        );
        createFallbackButton();
      } else {
        console.log("Facebook chat iframe detected successfully");
      }
    }, 10000);
  };

  return (
    <>
      {/* Facebook SDK script */}
      <Script
        id="facebook-jssdk"
        strategy="lazyOnload"
        src={`https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js#xfbml=1&version=v19.0`}
        onLoad={handleFbLoad}
        onError={(e) => console.error("Error loading Facebook SDK:", e)}
      />

      {/* Facebook Chat markup - exactly as Facebook provides it but with data- prefix for React */}
      <div id="fb-root"></div>
      <div
        className="fb-customerchat"
        data-attribution="biz_inbox"
        data-page_id={pageId}
        data-theme_color={themeColor}
        data-logged_in_greeting={loggedInGreeting}
        data-logged_out_greeting={loggedOutGreeting}
      ></div>
    </>
  );
}
