"use client";
import React, { useEffect } from "react";

export default function FacebookChatPackage() {
  const pageId = process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID || "597355006801976";

  useEffect(() => {
    // Check if Facebook SDK is loaded
    if (typeof window !== "undefined" && "FB" in window) {
      window.FB.XFBML.parse();
    }

    // Add event listener for when FB SDK is loaded asynchronously
    const handleFbInit = () => {
      if (typeof window !== "undefined" && "FB" in window) {
        window.FB.XFBML.parse();
      }
    };

    window.addEventListener("fbAsyncInit", handleFbInit);

    // Cleanup
    return () => {
      window.removeEventListener("fbAsyncInit", handleFbInit);
    };
  }, []);

  return (
    <>
      <div
        className="fb-customerchat"
        data-attribution="biz_inbox"
        data-page_id={pageId}
        data-theme_color="#0070F3"
      ></div>
    </>
  );
}
