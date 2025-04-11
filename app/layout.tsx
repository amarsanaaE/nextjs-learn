import { Metadata } from "next";
import FacebookChat from "@/components/FacebookChat";

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
  // Replace these values with your actual Facebook App ID and Page ID
  const facebookAppId = "1427973608364187";
  const facebookPageId = "597355006801976";

  return (
    <html lang="en">
      <body>
        {children}
        <FacebookChat
          pageId={facebookPageId}
          themeColor="#0084ff"
          loggedInGreeting="Hello! How can we help you today?"
          loggedOutGreeting="Hello! How can we assist you?"
        />
      </body>
    </html>
  );
}
