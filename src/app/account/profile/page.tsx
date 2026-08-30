"use client";

import Link from "next/link";
import { useState } from "react";

type IconProps = {
  size?: number;
  strokeWidth?: number;
};

function SunIcon({ size = 18, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
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
  );
}

function ChevronDownIcon({ size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function UserIcon({ size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c.7-4.1 3.3-6 8-6s7.3 1.9 8 6" />
    </svg>
  );
}

function ActivityIcon({ size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="m7 16 4-5 3 3 5-7" />
    </svg>
  );
}

function HeartIcon({ size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.8 8.7c0 5.5-8.8 11-8.8 11s-8.8-5.5-8.8-11A5.2 5.2 0 0 1 12 5.6a5.2 5.2 0 0 1 8.8 3.1Z" />
    </svg>
  );
}

function ClockIcon({ size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function SettingsIcon({ size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" />
      <path d="m19.4 15 .1.1a2 2 0 0 1-2.8 2.8l-.1-.1a2 2 0 0 0-3.4 1.4v.2a2 2 0 0 1-4 0v-.2a2 2 0 0 0-3.4-1.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A2 2 0 0 0 3.9 11H3.7a2 2 0 0 1 0-4h.2a2 2 0 0 0 1.4-3.4l-.1-.1A2 2 0 1 1 8 1l.1.1a2 2 0 0 0 3.4-1.4v-.2a2 2 0 0 1 4 0v.2A2 2 0 0 0 18.9 1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A2 2 0 0 0 23.1 7h.2a2 2 0 0 1 0 4h-.2a2 2 0 0 0-1.4 3.4Z" />
    </svg>
  );
}

function PencilIcon({ size = 17 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
    </svg>
  );
}

function ArrowRightIcon({ size = 17 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function ShieldIcon({ size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3 20 6v5c0 5.1-3.4 8.9-8 10-4.6-1.1-8-4.9-8-10V6Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function MailIcon({ size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PhoneIcon({ size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.6 3.5 9 3l2 5-2 1.5a14 14 0 0 0 5.5 5.5L16 13l5 2 .5 2.4a2 2 0 0 1-2 2.4C10.8 19.2 4.8 13.2 3.6 4.5a2 2 0 0 1 3-1Z" />
    </svg>
  );
}

function LogoutIcon({ size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
      <path d="M14 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5" />
    </svg>
  );
}

type AccountLinkProps = {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
};

function AccountLink({
  href,
  icon,
  title,
  description,
  badge,
}: AccountLinkProps) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-4 border-b border-white/[0.07] px-5 py-5 transition hover:bg-white/[0.025] last:border-b-0"
    >
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-white/60 transition group-hover:border-[#c7ff32]/30 group-hover:text-[#c7ff32]">
          {icon}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-white">{title}</h3>

            {badge && (
              <span className="rounded-full border border-[#c7ff32]/20 bg-[#c7ff32]/10 px-2 py-0.5 text-[10px] font-medium text-[#c7ff32]">
                {badge}
              </span>
            )}
          </div>

          <p className="mt-1 text-xs leading-5 text-white/45">
            {description}
          </p>
        </div>
      </div>

      <div className="shrink-0 text-white/35 transition group-hover:translate-x-0.5 group-hover:text-[#c7ff32]">
        <ArrowRightIcon />
      </div>
    </Link>
  );
}

export default function ProfilePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const user = {
    name: "Google Member",
    email: "google@marcuscars.demo",
    initials: "G",
    memberSince: "August 2026",
    verified: true,
  };

  return (
    <main className="min-h-screen bg-[#080b0d] text-white">
      {/* =========================================================
          NAVBAR
      ========================================================== */}

      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#080b0d]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 sm:px-7 lg:px-10">
          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 text-[19px] font-extrabold tracking-[-0.04em]"
          >
            MARCUS<span className="text-[#c7ff32]">.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 lg:flex">
            <Link
              href="/"
              className="text-[13px] text-white/60 transition hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/auctions"
              className="text-[13px] text-white/60 transition hover:text-white"
            >
              Live Auctions
            </Link>

            <Link
              href="/how-it-works"
              className="text-[13px] text-white/60 transition hover:text-white"
            >
              How It Works
            </Link>

            <Link
              href="/vehicles"
              className="text-[13px] text-white/60 transition hover:text-white"
            >
              Vehicles
            </Link>

            <Link
              href="/sell"
              className="text-[13px] text-white/60 transition hover:text-white"
            >
              Sell Your Car
            </Link>

            <Link
              href="/about"
              className="text-[13px] text-white/60 transition hover:text-white"
            >
              About Us
            </Link>
          </nav>

          {/* Desktop Right */}
          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              aria-label="Toggle theme"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] text-white/60 transition hover:border-white/20 hover:text-white"
            >
              <SunIcon size={17} />
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((value) => !value)}
                className="flex h-10 items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.02] px-3 transition hover:border-white/20"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#c7ff32] text-[12px] font-bold text-black">
                  {user.initials}
                </span>

                <span className="text-[13px] font-medium text-white">
                  {user.name}
                </span>

                <ChevronDownIcon size={14} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-[48px] w-[230px] overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0c1012] shadow-2xl shadow-black/40">
                  <div className="border-b border-white/[0.08] px-4 py-4">
                    <p className="text-sm font-semibold text-white">
                      {user.name}
                    </p>
                    <p className="mt-1 text-xs text-white/45">
                      {user.email}
                    </p>
                  </div>

                  <div className="py-1.5">
                    <Link
                      href="/activity"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-white/65 transition hover:bg-white/[0.04] hover:text-white"
                    >
                      <ActivityIcon size={17} />
                      My Activity
                    </Link>

                    <Link
                      href="/profile/saved"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-white/65 transition hover:bg-white/[0.04] hover:text-white"
                    >
                      <HeartIcon size={17} />
                      Saved Vehicles
                    </Link>

                    <Link
                      href="/profile/bids"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-white/65 transition hover:bg-white/[0.04] hover:text-white"
                    >
                      <ClockIcon size={17} />
                      Bid History
                    </Link>

                    <Link
                      href="/profile"
                      className="flex items-center gap-3 bg-white/[0.03] px-4 py-3 text-sm text-white"
                    >
                      <UserIcon size={17} />
                      Profile
                    </Link>

                    <Link
                      href="/profile/settings"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-white/65 transition hover:bg-white/[0.04] hover:text-white"
                    >
                      <SettingsIcon size={17} />
                      Settings
                    </Link>
                  </div>

                  <div className="border-t border-white/[0.08] p-1.5">
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-white/55 transition hover:bg-white/[0.04] hover:text-white"
                    >
                      <LogoutIcon size={17} />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/auctions"
              className="rounded-full bg-[#c7ff32] px-5 py-2.5 text-[13px] font-semibold text-black transition hover:brightness-95"
            >
              Start Bidding
            </Link>
          </div>

          {/* Mobile */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.1] text-white/70 lg:hidden"
            aria-label="Open navigation"
          >
            <span className="text-xl">{mobileMenuOpen ? "×" : "☰"}</span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-white/[0.06] px-5 pb-5 pt-3 lg:hidden">
            <nav className="flex flex-col">
              {[
                ["Home", "/"],
                ["Live Auctions", "/auctions"],
                ["How It Works", "/how-it-works"],
                ["Vehicles", "/vehicles"],
                ["Sell Your Car", "/sell"],
                ["About Us", "/about"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="border-b border-white/[0.05] py-3 text-sm text-white/65"
                >
                  {label}
                </Link>
              ))}

              <Link
                href="/auctions"
                className="mt-4 rounded-full bg-[#c7ff32] px-5 py-3 text-center text-sm font-semibold text-black"
              >
                Start Bidding
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* =========================================================
          PAGE
      ========================================================== */}

      <section className="mx-auto max-w-[1180px] px-5 pb-20 pt-10 sm:px-7 sm:pt-12 lg:px-8">
        {/* Page heading */}
        <div className="mb-9">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c7ff32]">
            Account
          </p>

          <h1 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
            Your Profile
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-white/50">
            Manage your personal information, activity and Marcus Cars
            preferences.
          </p>
        </div>

        {/* =====================================================
            PROFILE HEADER CARD
        ====================================================== */}

        <div className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0b0f11]">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-5">
                {/* Avatar */}
                <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-full bg-[#c7ff32] text-2xl font-bold text-black">
                  {user.initials}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-semibold tracking-[-0.02em]">
                      {user.name}
                    </h2>

                    {user.verified && (
                      <span className="rounded-full border border-[#c7ff32]/20 bg-[#c7ff32]/10 px-2.5 py-1 text-[10px] font-medium text-[#c7ff32]">
                        Verified
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm text-white/50">
                    {user.email}
                  </p>

                  <p className="mt-2 text-xs text-white/35">
                    Member since {user.memberSince}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="flex w-fit items-center gap-2 rounded-full border border-white/[0.12] px-4 py-2.5 text-xs font-medium text-white/75 transition hover:border-white/25 hover:text-white"
              >
                <PencilIcon size={15} />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Contact details */}
          <div className="grid border-t border-white/[0.07] sm:grid-cols-2">
            <div className="flex items-center gap-3 border-b border-white/[0.07] px-6 py-4 sm:border-b-0 sm:border-r">
              <span className="text-white/35">
                <MailIcon />
              </span>

              <div>
                <p className="text-[10px] uppercase tracking-[0.12em] text-white/30">
                  Email
                </p>

                <p className="mt-1 text-sm text-white/70">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-6 py-4">
              <span className="text-white/35">
                <PhoneIcon />
              </span>

              <div>
                <p className="text-[10px] uppercase tracking-[0.12em] text-white/30">
                  Phone
                </p>

                <p className="mt-1 text-sm text-white/35">
                  Not added yet
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            QUICK OVERVIEW
        ====================================================== */}

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0b0f11] p-5">
            <div className="mb-6 flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] text-white/55">
              <ActivityIcon size={17} />
            </div>

            <p className="text-xs text-white/40">My Activity</p>

            <p className="mt-1 text-2xl font-semibold tracking-[-0.03em]">
              8
            </p>

            <p className="mt-1 text-xs text-white/30">
              Recent account actions
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#0b0f11] p-5">
            <div className="mb-6 flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] text-white/55">
              <HeartIcon size={17} />
            </div>

            <p className="text-xs text-white/40">Saved Vehicles</p>

            <p className="mt-1 text-2xl font-semibold tracking-[-0.03em]">
              4
            </p>

            <p className="mt-1 text-xs text-white/30">
              Vehicles saved for later
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#0b0f11] p-5">
            <div className="mb-6 flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] text-white/55">
              <ClockIcon size={17} />
            </div>

            <p className="text-xs text-white/40">Bid History</p>

            <p className="mt-1 text-2xl font-semibold tracking-[-0.03em]">
              2
            </p>

            <p className="mt-1 text-xs text-white/30">
              Previous and active bids
            </p>
          </div>
        </div>

        {/* =====================================================
            ACCOUNT MENU
        ====================================================== */}

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          {/* Main */}
          <div>
            <div className="mb-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#c7ff32]">
                Account
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                Manage your account
              </h2>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b0f11]">
              <AccountLink
                href="/activity"
                icon={<ActivityIcon />}
                title="My Activity"
                description="View your recent bids, auction activity and account actions."
              />

              <AccountLink
                href="/profile/saved"
                icon={<HeartIcon />}
                title="Saved Vehicles"
                description="View vehicles you've saved and want to come back to."
                badge="4 saved"
              />

              <AccountLink
                href="/profile/bids"
                icon={<ClockIcon />}
                title="Bid History"
                description="Review your active, completed and previous bids."
                badge="2 bids"
              />

              <AccountLink
                href="/profile/settings"
                icon={<SettingsIcon />}
                title="Settings"
                description="Manage account preferences, notifications and security."
              />
            </div>
          </div>

          {/* Security */}
          <div>
            <div className="mb-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#c7ff32]">
                Security
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                Account security
              </h2>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#0b0f11] p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#c7ff32]/20 bg-[#c7ff32]/10 text-[#c7ff32]">
                  <ShieldIcon />
                </div>

                <div>
                  <h3 className="text-sm font-medium">
                    Your account is secure
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-white/40">
                    Your account is currently connected through Google
                    authentication.
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-white/[0.07] pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/40">
                    Authentication
                  </span>

                  <span className="text-xs font-medium text-[#c7ff32]">
                    Google
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-white/40">
                    Account status
                  </span>

                  <span className="flex items-center gap-1.5 text-xs font-medium text-white/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c7ff32]" />
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Sign out */}
            <button
              type="button"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-[#0b0f11] px-5 py-4 text-sm text-white/50 transition hover:border-red-400/20 hover:text-red-300"
            >
              <LogoutIcon size={17} />
              Sign out
            </button>
          </div>
        </div>

        {/* =====================================================
            FOOTER NOTE
        ====================================================== */}

        <div className="mt-10 border-t border-white/[0.06] pt-6">
          <p className="text-center text-xs text-white/25">
            Marcus Cars · Your account, activity and preferences
          </p>
        </div>
      </section>
    </main>
  );
}