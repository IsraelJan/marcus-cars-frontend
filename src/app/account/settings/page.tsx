"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useAuth } from "@/context/AuthContext";

type ContactPreference = "Email" | "Phone" | "Either";

type SettingsState = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContact: ContactPreference;
  emailNotifications: boolean;
  auctionNotifications: boolean;
  bidNotifications: boolean;
  savedVehicleAlerts: boolean;
  marketingEmails: boolean;
};

const initialSettings: SettingsState = {
  username: "IsraelJan",
  firstName: "Israel",
  lastName: "Jan",
  email: "israel@example.com",
  phone: "+1 (000) 000-0000",
  preferredContact: "Email",
  emailNotifications: true,
  auctionNotifications: true,
  bidNotifications: true,
  savedVehicleAlerts: true,
  marketingEmails: false,
};

export default function SettingsPage() {
  const { user, isAuthenticated } = useAuth();

  const [settings, setSettings] =
    useState<SettingsState>(initialSettings);

  const [saved, setSaved] = useState(false);

  const [showPasswordForm, setShowPasswordForm] =
    useState(false);

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [passwordMessage, setPasswordMessage] =
    useState("");

  const [membership] = useState<"Free" | "Premium">(
    "Free",
  );

  const displayName =
    user?.name?.trim() ||
    `${settings.firstName} ${settings.lastName}`.trim() ||
    "Marcus Member";

  const firstName =
    displayName.split(" ")[0] || "Member";

  const userEmail =
    user?.email || settings.email;

  /*
   |--------------------------------------------------------------------------
   | AUTH GUARD
   |--------------------------------------------------------------------------
   */

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#07090b] text-white">
        <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-6 pt-24">
          <div className="w-full rounded-3xl border border-white/[0.08] bg-[#0b0f11] p-8 text-center shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#c7ff32]/20 bg-[#c7ff32]/10 text-[#c7ff32]">
              <LockIcon />
            </div>

            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c7ff32]">
              Account
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Sign in to manage your settings
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/45">
              Your account settings are available after
              you sign in to Marcus Cars.
            </p>

            <Link
              href="/"
              className="mt-7 inline-flex rounded-full bg-[#c7ff32] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-105"
            >
              Return Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /*
   |--------------------------------------------------------------------------
   | FIELD UPDATE
   |--------------------------------------------------------------------------
   */

  function updateSetting<K extends keyof SettingsState>(
    key: K,
    value: SettingsState[K],
  ) {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));

    setSaved(false);
  }

  /*
   |--------------------------------------------------------------------------
   | SAVE SETTINGS
   |--------------------------------------------------------------------------
   */

  function handleSaveSettings(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 3000);
  }

  /*
   |--------------------------------------------------------------------------
   | RESET SETTINGS
   |--------------------------------------------------------------------------
   */

  function handleReset() {
    setSettings(initialSettings);
    setSaved(false);
  }

  /*
   |--------------------------------------------------------------------------
   | PASSWORD
   |--------------------------------------------------------------------------
   */

  function handlePasswordChange(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setPasswordMessage("");

    if (!currentPassword.trim()) {
      setPasswordMessage(
        "Please enter your current password.",
      );
      return;
    }

    if (newPassword.length < 8) {
      setPasswordMessage(
        "Your new password must contain at least 8 characters.",
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage(
        "The new passwords do not match.",
      );
      return;
    }

    setPasswordMessage(
      "Password updated successfully in this prototype.",
    );

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  /*
   |--------------------------------------------------------------------------
   | TOGGLE
   |--------------------------------------------------------------------------
   */

  function Toggle({
    enabled,
    onChange,
    label,
    description,
  }: {
    enabled: boolean;
    onChange: (value: boolean) => void;
    label: string;
    description: string;
  }) {
    return (
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className="flex w-full items-center justify-between gap-6 border-b border-white/[0.06] py-5 text-left last:border-b-0"
        aria-pressed={enabled}
      >
        <div className="min-w-0">
          <p className="text-sm font-medium text-white/90">
            {label}
          </p>

          <p className="mt-1 max-w-xl text-xs leading-5 text-white/40">
            {description}
          </p>
        </div>

        <span
          className={`relative h-6 w-11 shrink-0 rounded-full border transition ${
            enabled
              ? "border-[#c7ff32]/40 bg-[#c7ff32]"
              : "border-white/[0.12] bg-white/[0.06]"
          }`}
        >
          <span
            className={`absolute top-1 h-4 w-4 rounded-full transition ${
              enabled
                ? "left-6 bg-black"
                : "left-1 bg-white/45"
            }`}
          />
        </span>
      </button>
    );
  }

  return (
    <main className="min-h-screen bg-[#07090b] pb-10 pt-20 text-white sm:pt-24">
      {/* =========================================================
          PAGE HEADER
      ========================================================= */}

      <section className="border-b border-white/[0.08]">
        <div className="mx-auto max-w-[1440px] px-6 pb-12 pt-6 lg:px-10 lg:pb-14 lg:pt-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-[#c7ff32]">
                <span className="h-px w-8 bg-[#c7ff32]" />
                Account
              </div>

              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Settings
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/45">
                Manage your personal information,
                notifications, security and Marcus Cars
                membership preferences.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/account"
                className="rounded-full border border-white/[0.1] px-5 py-2.5 text-sm font-medium text-white/65 transition hover:border-white/[0.18] hover:text-white"
              >
                My Activity
              </Link>

              <Link
                href="/vehicles"
                className="rounded-full bg-[#c7ff32] px-5 py-2.5 text-sm font-semibold text-black transition hover:brightness-105"
              >
                Browse Vehicles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SETTINGS CONTENT
      ========================================================= */}

      <div className="mx-auto max-w-[1440px] px-6 pt-10 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* =====================================================
              MAIN COLUMN
          ===================================================== */}

          <div className="space-y-8">
            {/* ===================================================
                PROFILE INFORMATION
            =================================================== */}

            <form
              onSubmit={handleSaveSettings}
              className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0b0f11]"
            >
              <div className="border-b border-white/[0.07] px-6 py-6 sm:px-8">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c7ff32]">
                      Personal information
                    </p>

                    <h2 className="mt-2 text-xl font-semibold">
                      Profile details
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-white/40">
                      Keep the information associated with
                      your Marcus Cars account up to date.
                    </p>
                  </div>

                  <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-white/45 sm:flex">
                    <UserIcon />
                  </div>
                </div>
              </div>

              <div className="space-y-6 px-6 py-7 sm:px-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="First name"
                    value={settings.firstName}
                    onChange={(value) =>
                      updateSetting("firstName", value)
                    }
                  />

                  <Field
                    label="Last name"
                    value={settings.lastName}
                    onChange={(value) =>
                      updateSetting("lastName", value)
                    }
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Username"
                    value={settings.username}
                    onChange={(value) =>
                      updateSetting("username", value)
                    }
                  />

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-medium text-white/55"
                    >
                      Email address
                    </label>

                    <input
                      id="email"
                      type="email"
                      value={settings.email}
                      onChange={(event) =>
                        updateSetting(
                          "email",
                          event.target.value,
                        )
                      }
                      className="h-12 w-full rounded-xl border border-white/[0.09] bg-[#080b0d] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#c7ff32]/50"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Phone number"
                    value={settings.phone}
                    onChange={(value) =>
                      updateSetting("phone", value)
                    }
                  />

                  <div>
                    <label
                      htmlFor="preferredContact"
                      className="mb-2 block text-xs font-medium text-white/55"
                    >
                      Preferred contact
                    </label>

                    <select
                      id="preferredContact"
                      value={settings.preferredContact}
                      onChange={(event) =>
                        updateSetting(
                          "preferredContact",
                          event.target
                            .value as ContactPreference,
                        )
                      }
                      className="h-12 w-full rounded-xl border border-white/[0.09] bg-[#080b0d] px-4 text-sm text-white outline-none transition focus:border-[#c7ff32]/50"
                    >
                      <option
                        value="Email"
                        className="bg-[#080b0d]"
                      >
                        Email
                      </option>

                      <option
                        value="Phone"
                        className="bg-[#080b0d]"
                      >
                        Phone
                      </option>

                      <option
                        value="Either"
                        className="bg-[#080b0d]"
                      >
                        Either
                      </option>
                    </select>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#c7ff32]/10 text-[#c7ff32]">
                      <InfoIcon />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-white/75">
                        Account email
                      </p>

                      <p className="mt-1 text-xs leading-5 text-white/35">
                        Your account is currently associated
                        with{" "}
                        <span className="text-white/60">
                          {userEmail}
                        </span>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-white/[0.07] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <div className="text-xs text-white/35">
                  {saved
                    ? "Your settings have been saved."
                    : "Changes are currently stored in this prototype."}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-full border border-white/[0.1] px-5 py-2.5 text-sm font-medium text-white/55 transition hover:border-white/[0.18] hover:text-white"
                  >
                    Reset
                  </button>

                  <button
                    type="submit"
                    className="rounded-full bg-[#c7ff32] px-6 py-2.5 text-sm font-semibold text-black transition hover:brightness-105"
                  >
                    {saved
                      ? "Saved ✓"
                      : "Save changes"}
                  </button>
                </div>
              </div>
            </form>

            {/* ===================================================
                NOTIFICATIONS
            =================================================== */}

            <section className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0b0f11]">
              <div className="border-b border-white/[0.07] px-6 py-6 sm:px-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c7ff32]">
                  Notifications
                </p>

                <h2 className="mt-2 text-xl font-semibold">
                  Stay informed
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/40">
                  Choose which updates Marcus Cars can send
                  to you.
                </p>
              </div>

              <div className="px-6 sm:px-8">
                <Toggle
                  label="Email notifications"
                  description="Receive important account updates, confirmations and service messages."
                  enabled={settings.emailNotifications}
                  onChange={(value) =>
                    updateSetting(
                      "emailNotifications",
                      value,
                    )
                  }
                />

                <Toggle
                  label="Auction notifications"
                  description="Get notified about auctions you're watching and auctions that may interest you."
                  enabled={settings.auctionNotifications}
                  onChange={(value) =>
                    updateSetting(
                      "auctionNotifications",
                      value,
                    )
                  }
                />

                <Toggle
                  label="Bid notifications"
                  description="Receive alerts when you're outbid, leading or when your auction status changes."
                  enabled={settings.bidNotifications}
                  onChange={(value) =>
                    updateSetting(
                      "bidNotifications",
                      value,
                    )
                  }
                />

                <Toggle
                  label="Saved vehicle alerts"
                  description="Know when a saved vehicle changes status or becomes relevant to your account."
                  enabled={settings.savedVehicleAlerts}
                  onChange={(value) =>
                    updateSetting(
                      "savedVehicleAlerts",
                      value,
                    )
                  }
                />

                <Toggle
                  label="Marketing emails"
                  description="Receive occasional Marcus Cars offers, news and marketplace updates."
                  enabled={settings.marketingEmails}
                  onChange={(value) =>
                    updateSetting(
                      "marketingEmails",
                      value,
                    )
                  }
                />
              </div>
            </section>

            {/* ===================================================
                SECURITY
            =================================================== */}

            <section className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0b0f11]">
              <div className="border-b border-white/[0.07] px-6 py-6 sm:px-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c7ff32]">
                  Security
                </p>

                <h2 className="mt-2 text-xl font-semibold">
                  Protect your account
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/40">
                  Manage your password and keep your account
                  secure.
                </p>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-col gap-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#c7ff32]/20 bg-[#c7ff32]/10 text-[#c7ff32]">
                      <ShieldIcon />
                    </div>

                    <div>
                      <h3 className="text-sm font-medium">
                        Password & security
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-white/40">
                        Update your password regularly and
                        protect your account credentials.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswordForm(
                        (current) => !current,
                      )
                    }
                    className="rounded-full border border-white/[0.1] px-5 py-2.5 text-sm font-medium text-white/70 transition hover:border-white/[0.2] hover:text-white"
                  >
                    {showPasswordForm
                      ? "Cancel"
                      : "Change password"}
                  </button>
                </div>

                {showPasswordForm && (
                  <form
                    onSubmit={handlePasswordChange}
                    className="mt-5 rounded-2xl border border-white/[0.07] bg-[#080b0d] p-5 sm:p-6"
                  >
                    <div className="grid gap-5">
                      <PasswordField
                        id="currentPassword"
                        label="Current password"
                        value={currentPassword}
                        onChange={setCurrentPassword}
                      />

                      <PasswordField
                        id="newPassword"
                        label="New password"
                        value={newPassword}
                        onChange={setNewPassword}
                      />

                      <PasswordField
                        id="confirmPassword"
                        label="Confirm new password"
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                      />

                      {passwordMessage && (
                        <div className="rounded-xl border border-[#c7ff32]/20 bg-[#c7ff32]/[0.06] px-4 py-3 text-xs leading-5 text-white/65">
                          {passwordMessage}
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full rounded-full bg-[#c7ff32] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-105"
                      >
                        Update password
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </section>
          </div>

          {/* =====================================================
              SIDEBAR
          ===================================================== */}

          <aside className="space-y-8">
            {/* ===================================================
                ACCOUNT SUMMARY
            =================================================== */}

            <section className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0b0f11]">
              <div className="p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c7ff32]">
                  Your account
                </p>

                <div className="mt-5 flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#c7ff32] text-lg font-bold text-black">
                    {firstName
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <h2 className="truncate text-base font-semibold">
                      {displayName}
                    </h2>

                    <p className="mt-1 truncate text-xs text-white/40">
                      {userEmail}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/[0.07]">
                <AccountLink
                  href="/account"
                  label="My Activity"
                  icon={<ActivityIcon />}
                />

                <AccountLink
                  href="/account/saved-vehicles"
                  label="Saved Vehicles"
                  icon={<HeartIcon />}
                />

                <AccountLink
                  href="/account/bid-history"
                  label="Bid History"
                  icon={<HistoryIcon />}
                />

                <AccountLink
                  href="/account/profile"
                  label="Profile"
                  icon={<UserIcon />}
                />
              </div>
            </section>

            {/* ===================================================
                MEMBERSHIP
            =================================================== */}

            <section className="overflow-hidden rounded-3xl border border-[#c7ff32]/20 bg-[#0b0f11]">
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c7ff32]">
                      Membership
                    </p>

                    <h2 className="mt-2 text-xl font-semibold">
                      {membership}
                    </h2>
                  </div>

                  <div className="rounded-full border border-white/[0.1] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/45">
                    Current
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-white/40">
                  You're currently using the standard Marcus
                  Cars account experience.
                </p>

                <div className="mt-5 space-y-3">
                  <Benefit text="Save vehicles" />
                  <Benefit text="Track your bids" />
                  <Benefit text="Watch live auctions" />
                  <Benefit text="Manage your account" />
                </div>

                <button
                  type="button"
                  className="mt-6 w-full rounded-full border border-[#c7ff32]/30 bg-[#c7ff32]/10 px-5 py-3 text-sm font-semibold text-[#c7ff32] transition hover:bg-[#c7ff32]/15"
                >
                  Explore Premium
                </button>
              </div>
            </section>

            {/* ===================================================
                QUICK LINKS
            =================================================== */}

            <section className="rounded-3xl border border-white/[0.08] bg-[#0b0f11] p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c7ff32]">
                Quick access
              </p>

              <div className="mt-5 space-y-2">
                <QuickLink
                  href="/auctions"
                  label="Live Auctions"
                />

                <QuickLink
                  href="/vehicles"
                  label="Browse Vehicles"
                />

                <QuickLink
                  href="/how-it-works"
                  label="How It Works"
                />

                <QuickLink
                  href="/sell"
                  label="Sell Your Car"
                />
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

/*
 |--------------------------------------------------------------------------
 | FIELD
 |--------------------------------------------------------------------------
 */

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = label
    .toLowerCase()
    .replace(/\s+/g, "-");

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-medium text-white/55"
      >
        {label}
      </label>

      <input
        id={id}
        type="text"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-12 w-full rounded-xl border border-white/[0.09] bg-[#080b0d] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#c7ff32]/50"
      />
    </div>
  );
}

/*
 |--------------------------------------------------------------------------
 | PASSWORD FIELD
 |--------------------------------------------------------------------------
 */

function PasswordField({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-medium text-white/55"
      >
        {label}
      </label>

      <input
        id={id}
        type="password"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        autoComplete="new-password"
        className="h-12 w-full rounded-xl border border-white/[0.09] bg-[#080b0d] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#c7ff32]/50"
      />
    </div>
  );
}

/*
 |--------------------------------------------------------------------------
 | ACCOUNT LINK
 |--------------------------------------------------------------------------
 */

function AccountLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 border-b border-white/[0.06] px-6 py-4 text-sm text-white/55 transition last:border-b-0 hover:bg-white/[0.025] hover:text-white"
    >
      <span className="text-white/40">
        {icon}
      </span>

      <span>{label}</span>

      <span className="ml-auto text-white/20">
        →
      </span>
    </Link>
  );
}

/*
 |--------------------------------------------------------------------------
 | QUICK LINK
 |--------------------------------------------------------------------------
 */

function QuickLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.015] px-4 py-3 text-sm text-white/55 transition hover:border-white/[0.12] hover:bg-white/[0.03] hover:text-white"
    >
      <span>{label}</span>

      <span className="text-white/20">
        →
      </span>
    </Link>
  );
}

/*
 |--------------------------------------------------------------------------
 | MEMBERSHIP BENEFIT
 |--------------------------------------------------------------------------
 */

function Benefit({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 text-xs text-white/55">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#c7ff32]/10 text-[#c7ff32]">
        ✓
      </span>

      {text}
    </div>
  );
}

/*
 |--------------------------------------------------------------------------
 | ICONS
 |--------------------------------------------------------------------------
 */

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.7-3.2 3.2-5 7-5s6.3 1.8 7 5" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
        rx="2"
      />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M12 3 19 6v5c0 4.5-2.8 8-7 10-4.2-2-7-5.5-7-10V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v6" />
      <path d="M12 7h.01" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M4 17V7" />
      <path d="M4 17h16" />
      <path d="m7 14 3-4 3 2 5-6" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M20.8 8.8c0 5-8.8 10-8.8 10s-8.8-5-8.8-10A4.8 4.8 0 0 1 12 6a4.8 4.8 0 0 1 8.8 2.8Z" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 5v5h5" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}