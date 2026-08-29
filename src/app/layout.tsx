import type { Metadata } from "next";
import "./globals.css";
import GlobalSiteShell from "@/components/GlobalSiteShell";
import { AuthProvider } from "@/context/AuthContext";

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
        <AuthProvider>
          <GlobalSiteShell>
            {children}
          </GlobalSiteShell>
        </AuthProvider>
      </body>
    </html>
  );
}