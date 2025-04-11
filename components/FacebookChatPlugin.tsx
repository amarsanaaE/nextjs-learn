"use client";
import React, { useEffect } from "react";

function FacebookChatPlugin() {
  useEffect(() => {
    // Load Facebook SDK
    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
    script.async = true;
    script.onload = () => {
      (window as any).FB.init({
        appId: "1427973608364187",
        autoLogAppEvents: true,
        xfbml: true,
        version: "v12.0",
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <div id="fb-root"></div>

      {/* Facebook customer chat plugin */}
      <div
        id="fb-customer-chat"
        className="fb-customerchat"
        data-attribution="setup_tool"
        data-page_id="597355006801976"
      ></div>
    </>
  );
}

export default FacebookChatPlugin;
