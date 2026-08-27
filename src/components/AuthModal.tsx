"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type AuthMode = "signin" | "signup";
type Provider = "google" | "apple" | null;

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({
  open,
  onClose,
}: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [submitted, setSubmitted] = useState(false);
  const [provider, setProvider] = useState<Provider>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  if (!open) {
    return null;
  }

  const isSignIn = mode === "signin";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setProvider(null);
    setSubmitted(true);
  };

  const handleProviderLogin = (
    selectedProvider: "google" | "apple"
  ) => {
    setProvider(selectedProvider);

    /*
     * Prototype behavior:
     * We simulate the provider authentication.
     * Real Google/Apple OAuth will be connected later.
     */
    setTimeout(() => {
      setProvider(null);
      setSubmitted(true);
    }, 800);
  };

  const switchMode = () => {
    setMode(isSignIn ? "signup" : "signin");
    setSubmitted(false);
    setProvider(null);
  };

  const handleClose = () => {
    setSubmitted(false);
    setProvider(null);
    setMode("signin");
    setFullName("");
    setEmail("");
    setPhone("");
    onClose();
  };

  const handleForgotPassword = () => {
    window.alert(
      "Password reset is part of the next authentication stage of this prototype."
    );
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-md"
      onClick={handleClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        onClick={(event) => event.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl border border-border bg-background shadow-2xl"
      >
        {/* Close */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close authentication window"
          className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-surface hover:text-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M6 6l12 12" />
            <path d="M18 6 6 18" />
          </svg>
        </button>

        <div className="p-7 sm:p-9">
          {/* Header */}
          <div className="pr-10">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
              Marcus Cars
            </p>

            <h2
              id="auth-title"
              className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground"
            >
              {submitted
                ? isSignIn
                  ? "You're signed in."
                  : "Account created."
                : isSignIn
                  ? "Welcome back."
                  : "Create your account."}
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted">
              {submitted
                ? isSignIn
                  ? "Your Marcus account is ready. You can continue exploring live auctions."
                  : "Your Marcus account is ready. You can now save vehicles and place bids."
                : isSignIn
                  ? "Sign in to continue bidding, track vehicles, and manage your activity."
                  : "Create an account to bid, save vehicles, and keep track of your auctions."}
            </p>
          </div>

          {/* Success State */}
          {submitted ? (
            <div className="mt-8">
              {/* Success message */}
              <div className="flex items-start gap-4 rounded-2xl border border-accent/20 bg-accent/5 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {isSignIn
                      ? "Sign in successful"
                      : "Welcome to Marcus"}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-muted">
                    {provider
                      ? `Signed in with ${provider}.`
                      : "Authentication completed successfully in this prototype."}
                  </p>
                </div>
              </div>

              {/* Account details */}
              {!isSignIn && (
                <div className="mt-5 rounded-2xl border border-border bg-surface p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                    Your account
                  </p>

                  <div className="mt-4 space-y-4">
                    <div>
                      <p className="text-xs text-muted">Name</p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        {fullName || "Marcus Member"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted">Email</p>
                      <p className="mt-1 break-all text-sm font-medium text-foreground">
                        {email || "your@email.com"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted">Phone</p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        {phone || "Phone number added"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Continue */}
              <Link
                href="/auctions"
                onClick={handleClose}
                className="mt-6 flex w-full items-center justify-center rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:brightness-105"
              >
                Continue to Live Auctions
              </Link>

              <button
                type="button"
                onClick={handleClose}
                className="mt-3 w-full py-2 text-sm text-muted transition-colors hover:text-foreground"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Social authentication */}
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  disabled={provider !== null}
                  onClick={() => handleProviderLogin("google")}
                  className="flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-medium text-foreground transition-all hover:border-foreground/20 hover:bg-surface-light disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {provider === "google" ? (
                    <LoadingSpinner />
                  ) : (
                    <GoogleIcon />
                  )}

                  {provider === "google"
                    ? "Connecting..."
                    : "Google"}
                </button>

                <button
                  type="button"
                  disabled={provider !== null}
                  onClick={() => handleProviderLogin("apple")}
                  className="flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-medium text-foreground transition-all hover:border-foreground/20 hover:bg-surface-light disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {provider === "apple" ? (
                    <LoadingSpinner />
                  ) : (
                    <AppleIcon />
                  )}

                  {provider === "apple"
                    ? "Connecting..."
                    : "Apple"}
                </button>
              </div>

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-border" />

                <span className="text-xs text-muted">
                  or continue with email
                </span>

                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* Full name */}
                {!isSignIn && (
                  <div>
                    <label
                      htmlFor="auth-name"
                      className="mb-2 block text-xs font-medium text-foreground"
                    >
                      Full name
                    </label>

                    <input
                      id="auth-name"
                      type="text"
                      value={fullName}
                      onChange={(event) =>
                        setFullName(event.target.value)
                      }
                      required
                      autoComplete="name"
                      placeholder="Your full name"
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
                    />
                  </div>
                )}

                {/* Email */}
                <div>
                  <label
                    htmlFor="auth-email"
                    className="mb-2 block text-xs font-medium text-foreground"
                  >
                    Email
                  </label>

                  <input
                    id="auth-email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
                  />
                </div>

                {/* Phone */}
                {!isSignIn && (
                  <div>
                    <label
                      htmlFor="auth-phone"
                      className="mb-2 block text-xs font-medium text-foreground"
                    >
                      Phone number
                    </label>

                    <input
                      id="auth-phone"
                      type="tel"
                      value={phone}
                      onChange={(event) =>
                        setPhone(event.target.value)
                      }
                      required
                      autoComplete="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
                    />
                  </div>
                )}

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="auth-password"
                      className="text-xs font-medium text-foreground"
                    >
                      Password
                    </label>

                    {isSignIn && (
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-xs text-muted transition-colors hover:text-accent"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>

                  <input
                    id="auth-password"
                    type="password"
                    required
                    autoComplete={
                      isSignIn
                        ? "current-password"
                        : "new-password"
                    }
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
                  />
                </div>

                {/* Confirm password */}
                {!isSignIn && (
                  <div>
                    <label
                      htmlFor="auth-confirm-password"
                      className="mb-2 block text-xs font-medium text-foreground"
                    >
                      Confirm password
                    </label>

                    <input
                      id="auth-confirm-password"
                      type="password"
                      required
                      autoComplete="new-password"
                      placeholder="Confirm your password"
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
                    />
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="mt-2 w-full rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:brightness-105"
                >
                  {isSignIn
                    ? "Sign In"
                    : "Create Account"}
                </button>
              </form>

              {/* Switch mode */}
              <div className="mt-7 text-center text-sm text-muted">
                {isSignIn ? (
                  <>
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={switchMode}
                      className="font-medium text-foreground transition-colors hover:text-accent"
                    >
                      Create account
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={switchMode}
                      className="font-medium text-foreground transition-colors hover:text-accent"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </div>

              {/* Legal */}
              <p className="mt-6 text-center text-[11px] leading-5 text-muted">
                By continuing, you agree to the Marcus Cars
                Terms and Privacy Policy.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <span
      className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
      aria-hidden="true"
    />
  );
}

function GoogleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M21.35 12.27c0-.78-.07-1.54-.22-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.42Z"
      />
      <path
        fill="currentColor"
        d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.75 9.75 0 0 0 12 21.75Z"
      />
      <path
        fill="currentColor"
        d="M6.54 13.83A5.86 5.86 0 0 1 6.24 12c0-.64.11-1.26.3-1.83V7.64H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.36l3.24-2.53Z"
      />
      <path
        fill="currentColor"
        d="M12 6.14c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.23 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.7 5.39l3.24 2.53C7.31 7.86 9.46 6.14 12 6.14Z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.32 2.98-2.53 4.09ZM12.03 7.25C11.88 5.02 13.69 3.18 15.78 3c.29 2.58-2.34 4.5-3.75 4.25Z" />
    </svg>
  );
}