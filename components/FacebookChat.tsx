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

    // Using Facebook's official implementation pattern
    const loadFacebookSDK = () => {
      console.log("Setting up Facebook SDK using official pattern");

      // Add Facebook SDK script
      const facebookScript = document.createElement("script");
      facebookScript.innerHTML = `
        window.fbAsyncInit = function() {
          FB.init({
            xfbml            : true,
            version          : 'v19.0'
          });
          console.log("Facebook SDK initialized through official pattern");
        };

        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      `;

      document.head.appendChild(facebookScript);
    };

    // Clean up any existing instances first
    const existingScript = document.getElementById("facebook-jssdk");
    if (existingScript && existingScript.parentNode) {
      existingScript.parentNode.removeChild(existingScript);
    }

    const fbRoot = document.getElementById("fb-root");
    if (fbRoot) {
      fbRoot.innerHTML = "";
    } else {
      const newFbRoot = document.createElement("div");
      newFbRoot.id = "fb-root";
      document.body.appendChild(newFbRoot);
    }

    // Create the customerchat div directly
    let chatDiv = document.querySelector(".fb-customerchat");
    if (chatDiv) {
      chatDiv.remove();
    }

    chatDiv = document.createElement("div");
    chatDiv.className = "fb-customerchat";
    chatDiv.setAttribute("attribution", "setup_tool");
    chatDiv.setAttribute("page_id", pageId);

    if (themeColor) {
      chatDiv.setAttribute("theme_color", themeColor);
    }
    if (loggedInGreeting) {
      chatDiv.setAttribute("logged_in_greeting", loggedInGreeting);
    }
    if (loggedOutGreeting) {
      chatDiv.setAttribute("logged_out_greeting", loggedOutGreeting);
    }

    const fbRootElement = document.getElementById("fb-root");
    if (fbRootElement) {
      fbRootElement.appendChild(chatDiv);
    }

    // Load the SDK
    loadFacebookSDK();

    // Cleanup
    return () => {
      console.log("FacebookChat component unmounting");
      // We intentionally don't remove the FB script on unmount
      // as that can cause issues with FB's internal state
    };
  }, [appId, pageId, themeColor, loggedInGreeting, loggedOutGreeting]);

  // No need for React to render elements that FB will handle
  return null;
}
