import type { Metadata } from "next";
import "./globals.css";
import GlobalSiteShell from "@/components/GlobalSiteShell";

export const metadata: Metadata = {
  title: "Marcus Cars",
  description: "Live automotive auctions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <GlobalSiteShell>
          {children}
        </GlobalSiteShell>
      </body>
    </html>
  );
}