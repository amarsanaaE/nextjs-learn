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
    // Load Facebook SDK
    const loadFacebookSDK = () => {
      if (document.getElementById("facebook-jssdk")) {
        initFacebookChat();
        return;
      }

      window.fbAsyncInit = function () {
        window.FB.init({
          xfbml: true,
          version: "v19.0",
        });
      };

      const fjs = document.getElementsByTagName("script")[0];
      const js = document.createElement("script");
      js.id = "facebook-jssdk";
      js.src = `https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js#xfbml=1&version=v19.0&appId=${appId}&autoLogAppEvents=1`;
      js.async = true;
      js.defer = true;
      js.crossOrigin = "anonymous";
      if (fjs && fjs.parentNode) {
        fjs.parentNode.insertBefore(js, fjs);
      } else {
        document.head.appendChild(js);
      }
    };

    const initFacebookChat = () => {
      // Wait for FB SDK to initialize before adding the chat plugin
      if (window.FB) {
        window.FB.XFBML.parse();
      }
    };

    loadFacebookSDK();

    // Cleanup
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
        data-attribution="biz_inbox"
        data-page_id={pageId}
        data-theme_color={themeColor}
        data-logged_in_greeting={loggedInGreeting}
        data-logged_out_greeting={loggedOutGreeting}
      ></div>
    </>
  );
}
