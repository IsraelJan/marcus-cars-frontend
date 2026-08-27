"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function Hero() {
  const { darkMode } = useTheme();

  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* =========================================================
          BACKGROUND VEHICLE
      ========================================================== */}
      <div className="absolute inset-0">

        <img
          src={
            darkMode
              ? "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=90"
              : "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=2200&q=90"
          }
          alt=""
          className="h-full w-full object-cover object-center transition-opacity duration-700"
        />

        {/* Dark / Light image treatment */}
        <div
          className={`absolute inset-0 transition-colors duration-700 ${
            darkMode
              ? "bg-black/55"
              : "bg-white/25"
          }`}
        />

        {/* Contrast treatment */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            darkMode
              ? "bg-[radial-gradient(circle_at_center,transparent_15%,rgba(0,0,0,0.55)_100%)]"
              : "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_15%,rgba(255,255,255,0.35)_100%)]"
          }`}
        />

        {/* Fade into next section */}
        <div
          className={`absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t transition-colors duration-700 ${
            darkMode
              ? "from-background via-background/70 to-transparent"
              : "from-background via-background/70 to-transparent"
          }`}
        />
      </div>

      {/* =========================================================
          HERO CONTENT
      ========================================================== */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-16 pt-28">

        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_360px]">

          {/* =====================================================
              MAIN HERO
          ====================================================== */}
          <div className="text-center lg:text-left">

            {/* Live indicator */}
            <div className="mb-6 flex items-center justify-center gap-3 lg:justify-start">

              <span
                className="h-2 w-2 rounded-full bg-accent"
                style={{
                  boxShadow: "0 0 14px var(--accent)",
                }}
              />

              <span
                className={`text-xs font-medium uppercase tracking-[0.28em] ${
                  darkMode
                    ? "text-accent"
                    : "text-accent"
                }`}
              >
                Live Automotive Auctions
              </span>
            </div>

            {/* =================================================
                MAIN MESSAGE
            ================================================== */}
            <h1
              className={`text-4xl font-semibold uppercase leading-[0.95] tracking-[-0.04em] transition-colors duration-500 sm:text-5xl md:text-6xl lg:text-7xl ${
                darkMode
                  ? "text-white"
                  : "text-neutral-950"
              }`}
            >
              <span>Find it.</span>

              <span
                className={`mx-2 sm:mx-3 ${
                  darkMode
                    ? "text-white/30"
                    : "text-black/25"
                }`}
              >
                |
              </span>

              <span>Follow it.</span>

              <span
                className={`mx-2 sm:mx-3 ${
                  darkMode
                    ? "text-white/30"
                    : "text-black/25"
                }`}
              >
                |
              </span>

              <span className="text-accent">
                Win it.
              </span>
            </h1>

            {/* Supporting copy */}
            <p
              className={`mx-auto mt-6 max-w-xl text-sm leading-6 transition-colors duration-500 sm:text-base lg:mx-0 ${
                darkMode
                  ? "text-white/70"
                  : "text-black/65"
              }`}
            >
              Discover vehicles, follow auctions, and bid
              in real time.
            </p>

            {/* =================================================
                PRIMARY ACTIONS
            ================================================== */}
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">

              {/* Explore Auctions */}
              <Link
                href="/auctions"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:scale-[1.02] hover:brightness-105"
              >
                Explore Live Auctions

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              {/* How It Works */}
              <Link
                href="#how-it-works"
                className={`inline-flex items-center justify-center gap-3 rounded-full border px-7 py-3.5 text-sm font-medium backdrop-blur-sm transition-all duration-300 ${
                  darkMode
                    ? "border-white/30 bg-black/20 text-white hover:border-white/50 hover:bg-white/10"
                    : "border-black/20 bg-white/45 text-black hover:border-black/40 hover:bg-white/65"
                }`}
              >
                How It Works

                <span
                  className={
                    darkMode
                      ? "text-white/70"
                      : "text-black/60"
                  }
                >
                  ▶
                </span>
              </Link>
            </div>

            {/* =================================================
                PRODUCT SIGNALS
            ================================================== */}
            <div
              className={`mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs lg:justify-start ${
                darkMode
                  ? "text-white/50"
                  : "text-black/50"
              }`}
            >
              <span>Live bidding</span>

              <span
                className={`h-1 w-1 rounded-full ${
                  darkMode
                    ? "bg-white/30"
                    : "bg-black/25"
                }`}
              />

              <span>Verified vehicles</span>

              <span
                className={`h-1 w-1 rounded-full ${
                  darkMode
                    ? "bg-white/30"
                    : "bg-black/25"
                }`}
              />

              <span>Real-time auctions</span>
            </div>
          </div>

          {/* =====================================================
              LIVE AUCTION CARD
          ====================================================== */}
          <div className="w-full max-w-[360px] justify-self-center lg:justify-self-end">

            <div
              className={`overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-xl transition-all duration-500 ${
                darkMode
                  ? "border-white/15 bg-black/65"
                  : "border-black/10 bg-white/75 shadow-black/10"
              }`}
            >

              {/* Card header */}
              <div
                className={`flex items-center justify-between border-b px-5 py-4 ${
                  darkMode
                    ? "border-white/10"
                    : "border-black/10"
                }`}
              >
                <div className="flex items-center gap-2">

                  <span
                    className="h-2 w-2 rounded-full bg-red-500"
                    style={{
                      boxShadow:
                        "0 0 10px rgba(239,68,68,0.8)",
                    }}
                  />

                  <span
                    className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                      darkMode
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    Live Now
                  </span>
                </div>

                <span className="rounded-full border border-red-400/20 bg-red-400/10 px-2.5 py-1 text-xs font-medium text-red-400">
                  02:41
                </span>
              </div>

              {/* Vehicle image */}
              <div className="relative aspect-[16/9] overflow-hidden">

                <img
                  src={
                    darkMode
                      ? "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=85"
                      : "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=900&q=85"
                  }
                  alt="Mercedes-AMG G 63"
                  className="h-full w-full object-cover transition-opacity duration-700"
                />

                <div
                  className={`absolute inset-0 bg-gradient-to-t ${
                    darkMode
                      ? "from-black/80 via-transparent to-transparent"
                      : "from-black/55 via-transparent to-transparent"
                  }`}
                />

                <div className="absolute bottom-3 left-4">

                  <p className="text-xs text-white/60">
                    2021
                  </p>

                  <p className="text-base font-semibold text-white">
                    Mercedes-AMG G 63
                  </p>

                </div>
              </div>

              {/* =================================================
                  AUCTION INFORMATION
              ================================================== */}
              <div className="p-5">

                <div className="flex items-end justify-between">

                  <div>
                    <p
                      className={`text-xs ${
                        darkMode
                          ? "text-white/50"
                          : "text-black/50"
                      }`}
                    >
                      Current Bid
                    </p>

                    <p className="mt-1 text-2xl font-semibold tracking-tight text-accent">
                      $142,500
                    </p>
                  </div>

                  <div className="text-right">

                    <p
                      className={`text-xs ${
                        darkMode
                          ? "text-white/50"
                          : "text-black/50"
                      }`}
                    >
                      Bids
                    </p>

                    <p
                      className={`mt-1 text-sm font-medium ${
                        darkMode
                          ? "text-white"
                          : "text-black"
                      }`}
                    >
                      7 bids
                    </p>

                  </div>
                </div>

                {/* Bid progress */}
                <div className="mt-4">

                  <div
                    className={`h-1 overflow-hidden rounded-full ${
                      darkMode
                        ? "bg-white/10"
                        : "bg-black/10"
                    }`}
                  >
                    <div className="h-full w-[72%] rounded-full bg-accent" />
                  </div>

                </div>

                {/* Card action */}
                <Link
                  href="/auctions"
                  className="mt-5 flex w-full items-center justify-center rounded-full bg-accent py-3 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:brightness-105"
                >
                  View & Place Bid
                </Link>

                {/* Auction status */}
                <div
                  className={`mt-3 flex items-center justify-center gap-2 text-xs ${
                    darkMode
                      ? "text-white/40"
                      : "text-black/40"
                  }`}
                >
                  <span>7 bidders watching</span>

                  <span>•</span>

                  <span>Ends in 02:41</span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}