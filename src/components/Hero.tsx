"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background vehicle */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=90"
          alt=""
          className="h-full w-full object-cover object-center"
        />

        {/* Image treatment */}
        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,rgba(0,0,0,0.5)_100%)]" />

        {/* Fade into Live Bids section */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>

      {/* Hero layout */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-16 pt-28">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_360px]">
          
          {/* Main Hero Content */}
          <div className="text-center lg:text-left">
            {/* Live indicator */}
            <div className="mb-6 flex items-center justify-center gap-3 lg:justify-start">
              <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_14px_var(--accent)]" />

              <span className="text-xs font-medium uppercase tracking-[0.28em] text-accent">
                Live Automotive Auctions
              </span>
            </div>

            {/* Main message */}
            <h1 className="text-5xl font-semibold uppercase leading-[0.95] tracking-[-0.045em] text-white sm:text-6xl md:text-7xl lg:text-8xl">
              <span>Find it.</span>
              <span className="mx-2 text-white/30 sm:mx-3">
                |
              </span>
              <span>Follow it.</span>
              <span className="mx-2 text-white/30 sm:mx-3">
                |
              </span>
              <span className="text-accent">Win it.</span>
            </h1>

            {/* Supporting copy */}
            <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-white/70 sm:text-base lg:mx-0">
              Discover vehicles, follow auctions, and bid in real time.
            </p>

            {/* Primary actions */}
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                href="/auctions"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:scale-[1.02] hover:brightness-105"
              >
                Explore Live Auctions

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/30 bg-black/20 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/10"
              >
                How It Works

                <span className="text-white/70">▶</span>
              </Link>
            </div>

            {/* Product signals */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/50 lg:justify-start">
              <span>Live bidding</span>

              <span className="h-1 w-1 rounded-full bg-white/30" />

              <span>Verified vehicles</span>

              <span className="h-1 w-1 rounded-full bg-white/30" />

              <span>Real-time auctions</span>
            </div>
          </div>

          {/* Live Auction Card */}
          <div className="w-full max-w-[360px] justify-self-center lg:justify-self-end">
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-black/65 shadow-2xl backdrop-blur-xl">
              
              {/* Card header */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />

                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
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
                  src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=85"
                  alt="Mercedes-AMG G 63"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute bottom-3 left-4">
                  <p className="text-xs text-white/60">2021</p>
                  <p className="text-base font-semibold text-white">
                    Mercedes-AMG G 63
                  </p>
                </div>
              </div>

              {/* Auction information */}
              <div className="p-5">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-white/50">Current Bid</p>

                    <p className="mt-1 text-2xl font-semibold tracking-tight text-accent">
                      $142,500
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-white/50">Bids</p>

                    <p className="mt-1 text-sm font-medium text-white">
                      7 bids
                    </p>
                  </div>
                </div>

                {/* Bid progress */}
                <div className="mt-4">
                  <div className="h-1 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[72%] rounded-full bg-accent" />
                  </div>
                </div>

                {/* Card action */}
                <Link
                  href="/auctions"
                  className="mt-5 flex w-full items-center justify-center rounded-full bg-white py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-accent"
                >
                  View & Place Bid
                </Link>

                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-white/40">
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