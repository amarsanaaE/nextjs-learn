"use client";
import React, { useState, useEffect } from "react";
import { FacebookProvider, CustomChat } from "react-facebook";

export default function FacebookChatPackage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only render the chat component on the client side
  if (!isClient) return null;

  const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "1427973608364187";
  const pageId = process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID || "597355006801976";

  return (
    <div className="fb-chat-container">
      <FacebookProvider appId={appId} chatSupport>
        <CustomChat pageId={pageId} minimized={true} themeColor="#0070F3" />
      </FacebookProvider>
    </div>
  );
}
