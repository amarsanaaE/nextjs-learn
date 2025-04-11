import { Metadata } from "next";
import MessengerChat from "@/components/FacebookChat";

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
  // Your Facebook Page ID
  const facebookPageId = "597355006801976";

  return (
    <html lang="en">
      <body>
        {children}
        <MessengerChat pageId={facebookPageId} themeColor="#0084ff" />
      </body>
    </html>
  );
}
