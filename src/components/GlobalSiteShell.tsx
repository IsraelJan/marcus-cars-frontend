"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";

interface GlobalSiteShellProps {
  children: React.ReactNode;
}

export default function GlobalSiteShell({
  children,
}: GlobalSiteShellProps) {
  return (
    <ThemeProvider>
      <Navbar />

      {children}

      <Footer />
    </ThemeProvider>
  );
}