"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AuthModal from "@/components/AuthModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", !darkMode);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((current) => !current);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const openAuth = () => {
    closeMobileMenu();
    setAuthOpen(true);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-border/70 bg-background/75 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* =====================================================
              LOGO
          ====================================================== */}
          <Link
            href="/"
            className="relative z-10 text-xl font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
            aria-label="Marcus Cars Home"
          >
            MARCUS<span className="text-accent">.</span>
          </Link>

          {/* =====================================================
              DESKTOP NAVIGATION
          ====================================================== */}
          <nav
            className="hidden items-center gap-7 lg:flex"
            aria-label="Primary navigation"
          >
            <Link
              href="/"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              Home
            </Link>

            <Link
              href="/auctions"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              Live Auctions
            </Link>

            <Link
              href="/#how-it-works"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              How It Works
            </Link>

            <Link
              href="/vehicles"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              Vehicles
            </Link>

            <Link
              href="/sell"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              Sell Your Car
            </Link>

            <Link
              href="/about"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              About Us
            </Link>
          </nav>

          {/* =====================================================
              DESKTOP ACTIONS
          ====================================================== */}
          <div className="hidden items-center gap-3 lg:flex">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/40 text-muted transition-all duration-300 hover:border-foreground/20 hover:bg-surface hover:text-foreground"
            >
              {darkMode ? (
                /* Sun */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              ) : (
                /* Moon */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
                </svg>
              )}
            </button>

            {/* Sign In */}
            <button
              type="button"
              onClick={openAuth}
              className="px-3 text-sm text-muted transition-colors hover:text-foreground"
            >
              Sign in
            </button>

            {/* Primary CTA */}
            <Link
              href="/auctions"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:scale-[1.02] hover:brightness-105"
            >
              Start Bidding
            </Link>
          </div>

          {/* =====================================================
              MOBILE CONTROLS
          ====================================================== */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/40 text-muted transition-all duration-300 hover:bg-surface hover:text-foreground"
            >
              {darkMode ? (
                /* Sun */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41-1.41" />
                </svg>
              ) : (
                /* Moon */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
                </svg>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((current) => !current)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/40 text-foreground transition-all duration-300 hover:bg-surface"
            >
              {mobileMenuOpen ? (
                /* Close */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12" />
                  <path d="M18 6 6 18" />
                </svg>
              ) : (
                /* Menu */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* =====================================================
            MOBILE MENU
        ====================================================== */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-background/95 px-6 py-6 backdrop-blur-xl lg:hidden">
            <nav
              className="flex flex-col gap-5"
              aria-label="Mobile navigation"
            >
              <Link
                href="/"
                onClick={closeMobileMenu}
                className="text-base text-muted transition-colors hover:text-foreground"
              >
                Home
              </Link>

              <Link
                href="/auctions"
                onClick={closeMobileMenu}
                className="text-base text-muted transition-colors hover:text-foreground"
              >
                Live Auctions
              </Link>

              <Link
                href="/how-it-works"
                onClick={closeMobileMenu}
                className="text-base text-muted transition-colors hover:text-foreground"
              >
                How It Works
              </Link>

              <Link
                href="/vehicles"
                onClick={closeMobileMenu}
                className="text-base text-muted transition-colors hover:text-foreground"
              >
                Vehicles
              </Link>

              <Link
                href="/sell"
                onClick={closeMobileMenu}
                className="text-base text-muted transition-colors hover:text-foreground"
              >
                Sell Your Car
              </Link>

              <Link
                href="/about"
                onClick={closeMobileMenu}
                className="text-base text-muted transition-colors hover:text-foreground"
              >
                About Us
              </Link>

              <div className="my-1 h-px bg-border" />

              {/* Mobile Sign In */}
              <button
                type="button"
                onClick={openAuth}
                className="text-left text-base text-muted transition-colors hover:text-foreground"
              >
                Sign in
              </button>

              {/* Mobile CTA */}
              <Link
                href="/auctions"
                onClick={closeMobileMenu}
                className="mt-1 inline-flex w-fit rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:brightness-105"
              >
                Start Bidding
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* =====================================================
          AUTHENTICATION MODAL
      ====================================================== */}
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
      />
    </>
  );
}