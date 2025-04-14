"use client";
import React, { Component } from "react";
import { FacebookProvider, CustomChat } from "react-facebook";

export default class FacebookChatPackage extends Component {
  render() {
    return (
      <FacebookProvider
        appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "1427973608364187"}
        chatSupport
      >
        <CustomChat
          pageId={process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID || "597355006801976"}
          minimized={false}
        />
      </FacebookProvider>
    );
  }
}
