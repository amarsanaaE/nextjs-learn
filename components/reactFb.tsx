"use client";
import React, { useEffect } from "react";

// Declare global types for window object extensions
declare global {
  interface Window {
    __ow: {
      organizationId: string;
      integration_name: string;
      product_name: string;
      asyncInit?: boolean;
    };
    OpenWidget: any;
  }
}

export default function FacebookChatPackage() {
  useEffect(() => {
    // Define OpenWidget configuration
    window.__ow = window.__ow || {};
    window.__ow.organizationId = "4818368b-66af-4242-ac76-3b23f7af3d1b";
    window.__ow.integration_name = "manual_settings";
    window.__ow.product_name = "openwidget";

    // Initialize OpenWidget
    (function (n: Window, t: Document, c: Function) {
      function i(n: any[]): any {
        return e._h ? e._h.apply(null, n) : e._q.push(n);
      }

      const e: {
        _q: any[];
        _h: any | null;
        _v: string;
        on: Function;
        once: Function;
        off: Function;
        get: Function;
        call: Function;
        init: Function;
      } = {
        _q: [],
        _h: null,
        _v: "2.0",
        on: function () {
          i(["on", c.call(arguments)]);
        },
        once: function () {
          i(["once", c.call(arguments)]);
        },
        off: function () {
          i(["off", c.call(arguments)]);
        },
        get: function () {
          if (!e._h)
            throw new Error("[OpenWidget] You can't use getters before load.");
          return i(["get", c.call(arguments)]);
        },
        call: function () {
          i(["call", c.call(arguments)]);
        },
        init: function () {
          const n = t.createElement("script");
          n.async = true;
          n.type = "text/javascript";
          n.src = "https://cdn.openwidget.com/openwidget.js";
          t.head.appendChild(n);
        },
      };

      !n.__ow.asyncInit && e.init();
      n.OpenWidget = n.OpenWidget || e;
    })(window, document, [].slice);
  }, []); // Empty dependency array ensures the script runs only once on mount

  return (
    <>
      <noscript>
        You need to{" "}
        <a
          href="https://www.openwidget.com/enable-javascript"
          rel="noopener nofollow"
        >
          enable JavaScript
        </a>{" "}
        to use the communication tool powered by{" "}
        <a
          href="https://www.openwidget.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          OpenWidget
        </a>
      </noscript>
    </>
  );
}
