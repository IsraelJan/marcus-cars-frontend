"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function FinalCTA() {
  const { darkMode } = useTheme();
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    if (!contactOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [contactOpen]);

  const ctaImage = darkMode
    ? "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2200&q=85"
    : "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=2200&q=85";

  return (
    <>
      {/* =========================================================
          FINAL CTA
      ========================================================== */}
      <section className="relative overflow-hidden border-t border-border">

        {/* =======================================================
            BACKGROUND
        ======================================================== */}
        <div className="absolute inset-0">

          <img
            src={ctaImage}
            alt=""
            aria-hidden="true"
            className={`h-full w-full object-cover object-center transition-all duration-700 ${
              darkMode
                ? "brightness-[0.55]"
                : "brightness-[0.9]"
            }`}
          />

          {/* Theme-aware overlay */}
          <div
            className={`absolute inset-0 transition-colors duration-700 ${
              darkMode
                ? "bg-black/65"
                : "bg-white/30"
            }`}
          />

          {/* Center lighting */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              darkMode
                ? "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]"
                : "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35),transparent_60%)]"
            }`}
          />

          {/* Fade into page */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>

        {/* =======================================================
            CONTENT
        ======================================================== */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-28">

          {/* CTA CARD */}
          <div
            className={`grid overflow-hidden rounded-3xl border backdrop-blur-xl transition-all duration-500 md:grid-cols-2 ${
              darkMode
                ? "border-white/15 bg-black/55"
                : "border-black/10 bg-white/75 shadow-xl shadow-black/5"
            }`}
          >

            {/* ===================================================
                PRIMARY CTA
            ==================================================== */}
            <div className="flex min-h-[320px] flex-col justify-between p-8 md:p-10 lg:p-12">

              <div>

                {/* Label */}
                <div className="flex items-center gap-3">

                  <span
                    className="h-2 w-2 rounded-full bg-accent"
                    style={{
                      boxShadow: "0 0 12px var(--accent)",
                    }}
                  />

                  <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
                    Your next move
                  </span>

                </div>

                {/* Heading */}
                <h2
                  className={`mt-5 max-w-lg text-3xl font-semibold tracking-[-0.04em] transition-colors duration-500 sm:text-4xl md:text-5xl ${
                    darkMode
                      ? "text-white"
                      : "text-foreground"
                  }`}
                >
                  Ready to make
                  <br />
                  your move?
                </h2>

                {/* Description */}
                <p
                  className={`mt-5 max-w-md text-sm leading-6 transition-colors duration-500 md:text-base ${
                    darkMode
                      ? "text-white/60"
                      : "text-foreground/60"
                  }`}
                >
                  Find a vehicle, follow the auction, and make
                  your bid when the moment is right.
                </p>

              </div>

              {/* CTA */}
              <div className="mt-8">

                <Link
                  href="/auctions"
                  className="group inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:scale-[1.02] hover:brightness-105"
                >
                  Explore Live Auctions

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>

              </div>
            </div>

            {/* ===================================================
                CONTACT CTA
            ==================================================== */}
            <div
              className={`flex min-h-[320px] flex-col justify-between border-t p-8 transition-colors duration-500 md:border-l md:border-t-0 md:p-10 lg:p-12 ${
                darkMode
                  ? "border-white/10"
                  : "border-black/10"
              }`}
            >

              <div>

                {/* Label */}
                <span
                  className={`text-xs font-medium uppercase tracking-[0.25em] transition-colors duration-500 ${
                    darkMode
                      ? "text-white/45"
                      : "text-foreground/45"
                  }`}
                >
                  Need assistance?
                </span>

                {/* Heading */}
                <h2
                  className={`mt-5 max-w-md text-3xl font-semibold tracking-[-0.04em] transition-colors duration-500 sm:text-4xl ${
                    darkMode
                      ? "text-white"
                      : "text-foreground"
                  }`}
                >
                  Need a hand?
                </h2>

                {/* Description */}
                <p
                  className={`mt-5 max-w-md text-sm leading-6 transition-colors duration-500 md:text-base ${
                    darkMode
                      ? "text-white/60"
                      : "text-foreground/60"
                  }`}
                >
                  Questions about a vehicle, auction, or your
                  account? Get in touch without leaving the
                  experience.
                </p>

              </div>

              {/* Contact button */}
              <div className="mt-8">

                <button
                  type="button"
                  onClick={() => setContactOpen(true)}
                  className={`group inline-flex items-center gap-3 rounded-full border px-6 py-3.5 text-sm font-semibold transition-all duration-300 ${
                    darkMode
                      ? "border-white/20 text-white hover:border-white/40 hover:bg-white/10"
                      : "border-black/20 text-foreground hover:border-black/40 hover:bg-black/5"
                  }`}
                >
                  Contact Us

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>

              </div>
            </div>
          </div>

          {/* =====================================================
              CLOSING LINE
          ====================================================== */}
          <p
            className={`mt-8 text-center text-xs transition-colors duration-500 ${
              darkMode
                ? "text-white/35"
                : "text-foreground/35"
            }`}
          >
            Marcus Cars · Built around the moment you find
            the right vehicle.
          </p>

        </div>
      </section>

      {/* =========================================================
          CONTACT DRAWER
      ========================================================== */}
      {contactOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm md:items-stretch md:justify-end"
          onClick={() => setContactOpen(false)}
        >
          <aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-xl overflow-y-auto border-t border-border bg-background shadow-2xl md:border-l md:border-t-0"
          >
            <div className="flex min-h-full flex-col">

              {/* Drawer header */}
              <div className="flex items-center justify-between border-b border-border px-6 py-5 md:px-8">

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                    Contact Marcus
                  </p>

                  <h2
                    id="contact-title"
                    className="mt-1 text-xl font-semibold tracking-tight text-foreground"
                  >
                    How can we help?
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setContactOpen(false)}
                  aria-label="Close contact panel"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-surface hover:text-foreground"
                >
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
                </button>

              </div>

              {/* Form */}
              <div className="flex-1 px-6 py-7 md:px-8 md:py-9">

                <p className="max-w-md text-sm leading-6 text-muted">
                  Send us a message and our team will get back
                  to you.
                </p>

                <form className="mt-8 space-y-5">

                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-xs font-medium text-foreground"
                    >
                      Name
                    </label>

                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your name"
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-xs font-medium text-foreground"
                    >
                      Email
                    </label>

                    <input
                      id="contact-email"
                      type="email"
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
                    />
                  </div>

                  {/* Topic */}
                  <div>
                    <label
                      htmlFor="contact-topic"
                      className="mb-2 block text-xs font-medium text-foreground"
                    >
                      What can we help with?
                    </label>

                    <select
                      id="contact-topic"
                      defaultValue=""
                      className="w-full appearance-none rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
                    >
                      <option value="" disabled>
                        Select a topic
                      </option>

                      <option value="vehicle">
                        Question about a vehicle
                      </option>

                      <option value="auction">
                        Question about an auction
                      </option>

                      <option value="account">
                        Account support
                      </option>

                      <option value="bidding">
                        Bidding support
                      </option>

                      <option value="other">
                        Something else
                      </option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-2 block text-xs font-medium text-foreground"
                    >
                      Message
                    </label>

                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Tell us what you need help with..."
                      className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="button"
                    className="w-full rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:brightness-105"
                  >
                    Send Message
                  </button>

                </form>

                <p className="mt-5 text-center text-xs leading-5 text-muted">
                  This prototype form is not connected to a
                  messaging service yet.
                </p>

              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}