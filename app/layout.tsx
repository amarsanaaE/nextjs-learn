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
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased">
        {children}
        <FacebookChatPackage />
      </body>
    </html>
  );
}
