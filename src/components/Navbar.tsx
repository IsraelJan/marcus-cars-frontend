"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, isAuthenticated, signOut } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const accountMenuRef = useRef<HTMLDivElement>(null);

  /*
   * ------------------------------------------------------------
   * SCROLL STATE
   * ------------------------------------------------------------
   */

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

  /*
   * ------------------------------------------------------------
   * THEME
   * ------------------------------------------------------------
   */

  useEffect(() => {
    document.documentElement.classList.toggle("light", !darkMode);
  }, [darkMode]);

  /*
   * ------------------------------------------------------------
   * CLOSE ACCOUNT DROPDOWN WHEN CLICKING OUTSIDE
   * ------------------------------------------------------------
   */

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target as Node)
      ) {
        setAccountMenuOpen(false);
      }
    };

    if (accountMenuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [accountMenuOpen]);

  /*
   * ------------------------------------------------------------
   * HELPERS
   * ------------------------------------------------------------
   */

  const toggleTheme = () => {
    setDarkMode((current) => !current);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const closeAccountMenu = () => {
    setAccountMenuOpen(false);
  };

  const openAuth = () => {
    closeMobileMenu();
    closeAccountMenu();
    setAuthOpen(true);
  };

  const handleSignOut = () => {
    signOut();
    closeAccountMenu();
    closeMobileMenu();
  };

  /*
   * ------------------------------------------------------------
   * USER DISPLAY
   * ------------------------------------------------------------
   */

  const displayName = user?.name?.trim() || "Account";

  const firstName =
    displayName.split(" ")[0]?.trim() || "Account";

  const userInitial =
    firstName.charAt(0).toUpperCase() || "A";

  /*
   * ------------------------------------------------------------
   * RENDER
   * ------------------------------------------------------------
   */

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
                darkMode
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/40 text-muted transition-all duration-300 hover:border-foreground/20 hover:bg-surface hover:text-foreground"
            >
              {darkMode ? (
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

            {/* =================================================
                AUTHENTICATED ACCOUNT
            ================================================== */}

            {isAuthenticated ? (
              <div
                ref={accountMenuRef}
                className="relative"
              >
                <button
                  type="button"
                  onClick={() =>
                    setAccountMenuOpen((current) => !current)
                  }
                  aria-expanded={accountMenuOpen}
                  aria-haspopup="menu"
                  className="flex items-center gap-2 rounded-full border border-border bg-surface/40 px-3.5 py-2 text-sm text-foreground transition-all duration-300 hover:border-foreground/20 hover:bg-surface"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                    {userInitial}
                  </span>

                  <span className="max-w-[110px] truncate">
                    {firstName}
                  </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className={`h-3.5 w-3.5 transition-transform ${
                      accountMenuOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                {/* =================================================
                    ACCOUNT DROPDOWN
                ================================================== */}

                {accountMenuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-[calc(100%+12px)] w-64 overflow-hidden rounded-2xl border border-border bg-background/95 p-2 shadow-2xl backdrop-blur-xl"
                  >
                    {/* User Information */}

                    <div className="border-b border-border px-3 py-3">
                      <p className="text-sm font-semibold text-foreground">
                        {displayName}
                      </p>

                      <p className="mt-1 truncate text-xs text-muted">
                        {user?.email}
                      </p>
                    </div>

                    {/* =================================================
                        ACCOUNT HOME
                    ================================================== */}

                    <div className="py-2">
                      <Link
                        href="/account"
                        role="menuitem"
                        onClick={closeAccountMenu}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"
                      >
                        <AccountIcon />
                        <span>Account</span>
                      </Link>
                    </div>

                    {/* =================================================
                        ACTIVITY
                    ================================================== */}

                    <div className="py-2">
                      <Link
                        href="/account"
                        role="menuitem"
                        onClick={closeAccountMenu}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"
                      >
                        <ActivityIcon />
                        <span>My Activity</span>
                      </Link>

                      <Link
                        href="/account/saved-vehicles"
                        role="menuitem"
                        onClick={closeAccountMenu}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"
                      >
                        <HeartIcon />
                        <span>Saved Vehicles</span>
                      </Link>

                      <Link
                        href="/account/bid-history"
                        role="menuitem"
                        onClick={closeAccountMenu}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"
                      >
                        <HistoryIcon />
                        <span>Bid History</span>
                      </Link>
                    </div>

                    <div className="h-px bg-border" />

                    {/* =================================================
                        PERSONAL ACCOUNT
                    ================================================== */}

                    <div className="py-2">
                      <Link
                        href="/account/profile"
                        role="menuitem"
                        onClick={closeAccountMenu}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"
                      >
                        <UserIcon />
                        <span>Profile</span>
                      </Link>

                      <Link
                        href="/account/settings"
                        role="menuitem"
                        onClick={closeAccountMenu}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"
                      >
                        <SettingsIcon />
                        <span>Settings</span>
                      </Link>
                    </div>

                    <div className="h-px bg-border" />

                    {/* =================================================
                        SIGN OUT
                    ================================================== */}

                    <div className="p-1">
                      <button
                        type="button"
                        role="menuitem"
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted transition-colors hover:bg-red-500/10 hover:text-red-500"
                      >
                        <SignOutIcon />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* =================================================
                 SIGN IN
              ================================================== */

              <button
                type="button"
                onClick={openAuth}
                className="px-3 text-sm text-muted transition-colors hover:text-foreground"
              >
                Sign in
              </button>
            )}

            {/* =================================================
                PRIMARY CTA
            ================================================== */}

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
            {/* Mobile Account */}

            {isAuthenticated && (
              <Link
                href="/account"
                aria-label="My account"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/40 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-surface"
              >
                {userInitial}
              </Link>
            )}

            {/* Mobile Theme Toggle */}

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                darkMode
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/40 text-muted transition-all duration-300 hover:bg-surface hover:text-foreground"
            >
              {darkMode ? (
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
              onClick={() =>
                setMobileMenuOpen((current) => !current)
              }
              aria-label={
                mobileMenuOpen
                  ? "Close menu"
                  : "Open menu"
              }
              aria-expanded={mobileMenuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/40 text-foreground transition-all duration-300 hover:bg-surface"
            >
              {mobileMenuOpen ? (
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
                href="/#how-it-works"
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

              {/* =================================================
                  MOBILE AUTHENTICATED ACCOUNT
              ================================================== */}

              {isAuthenticated ? (
                <>
                  <div className="rounded-2xl border border-border bg-surface/40 p-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                        {userInitial}
                      </span>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {displayName}
                        </p>

                        <p className="truncate text-xs text-muted">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Account */}

                  <Link
                    href="/account"
                    onClick={closeMobileMenu}
                    className="text-base text-muted transition-colors hover:text-foreground"
                  >
                    Account
                  </Link>

                  {/* My Activity */}

                  <Link
                    href="/account"
                    onClick={closeMobileMenu}
                    className="text-base text-muted transition-colors hover:text-foreground"
                  >
                    My Activity
                  </Link>

                  {/* Saved Vehicles */}

                  <Link
                    href="/account/saved-vehicles"
                    onClick={closeMobileMenu}
                    className="text-base text-muted transition-colors hover:text-foreground"
                  >
                    Saved Vehicles
                  </Link>

                  {/* Bid History */}

                  <Link
                    href="/account/bid-history"
                    onClick={closeMobileMenu}
                    className="text-base text-muted transition-colors hover:text-foreground"
                  >
                    Bid History
                  </Link>

                  {/* Profile */}

                  <Link
                    href="/account/profile"
                    onClick={closeMobileMenu}
                    className="text-base text-muted transition-colors hover:text-foreground"
                  >
                    Profile
                  </Link>

                  {/* Settings */}

                  <Link
                    href="/account/settings"
                    onClick={closeMobileMenu}
                    className="text-base text-muted transition-colors hover:text-foreground"
                  >
                    Settings
                  </Link>

                  {/* Sign Out */}

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="text-left text-base text-muted transition-colors hover:text-red-500"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={openAuth}
                  className="text-left text-base text-muted transition-colors hover:text-foreground"
                >
                  Sign in
                </button>
              )}

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

/* ============================================================
   ACCOUNT ICONS
============================================================ */

function AccountIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="m7 15 3-3 3 2 5-6" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M20.84 8.61a5.5 5.5 0 0 0-7.78 0L12 9.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M3 12a9 9 0 1 0 3-6.71" />
      <path d="M3 4v5h5" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.9 1.9-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.04 1.56V20h-2.68v-.09a1.7 1.7 0 0 0-1.04-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-1.9-1.9.06-.06A1.7 1.7 0 0 0 7.4 15a1.7 1.7 0 0 0-1.56-1.04H5.75v-2.68h.09A1.7 1.7 0 0 0 7.4 10.24a1.7 1.7 0 0 0-.34-1.88L7 8.3l1.9-1.9.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1.04-1.56V5h2.68v.24a1.7 1.7 0 0 0 1.04 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 1.9 1.9-.06.06a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.56 1.04h.24v2.68h-.24A1.7 1.7 0 0 0 19.4 15Z" />
    </svg>
  );
}

function SignOutIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M10 5H6.5A1.5 1.5 0 0 0 5 6.5v11A1.5 1.5 0 0 0 6.5 19H10" />
      <path d="M14 8l4 4-4 4" />
      <path d="M18 12H9" />
    </svg>
  );
}