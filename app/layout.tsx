import { Metadata } from "next";
import Script from "next/script";
import FacebookChatPackage from "@/components/reactFb";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Acme Dashboard",
    default: "Acme Dashboard",
  },
  description: "The official Next.js Course Dashboard, built with App Router.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          id="facebook-jssdk"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.fbAsyncInit = function() {
                FB.init({
                  appId: '${
                    process.env.NEXT_PUBLIC_FACEBOOK_APP_ID ||
                    "1427973608364187"
                  }',
                  autoLogAppEvents: true,
                  xfbml: true,
                  version: 'v18.0'
                });
              };
            `,
          }}
        />
        <Script
          strategy="lazyOnload"
          src="https://connect.facebook.net/en_US/sdk.js"
          crossOrigin="anonymous"
          nonce="rAnd0m"
        />
      </head>
      <body className="antialiased">
        {children}
        <FacebookChatPackage />
      </body>
    </html>
  );
}
