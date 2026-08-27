"use client";

import Link from "next/link";

const liveAuctions = [
  {
    id: 1,
    year: "2022",
    make: "Ford",
    model: "F-150 XLT",
    mileage: "38,420 mi",
    transmission: "Automatic",
    fuel: "Gas",
    location: "Dallas, TX",
    bid: "$31,800",
    bids: 8,
    time: "03:42",
    image:
      "https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    year: "2021",
    make: "Chevrolet",
    model: "Silverado 1500 LT",
    mileage: "44,180 mi",
    transmission: "Automatic",
    fuel: "Gas",
    location: "Houston, TX",
    bid: "$28,600",
    bids: 6,
    time: "02:18",
    image:
      "https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    year: "2022",
    make: "Ford",
    model: "Explorer ST",
    mileage: "26,750 mi",
    transmission: "Automatic",
    fuel: "Gas",
    location: "Atlanta, GA",
    bid: "$34,200",
    bids: 9,
    time: "01:06",
    image:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function LiveBids() {
  return (
    <section
      id="live-auctions"
      className="border-t border-border bg-background px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />

              <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
                Live now
              </span>
            </div>

            <h2 className="text-4xl font-semibold tracking-[-0.04em] text-foreground md:text-5xl">
              Live Auctions
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-muted md:text-base">
              Vehicles being auctioned right now. Find one worth chasing and
              join before the clock runs out.
            </p>
          </div>

          <Link
            href="/auctions"
            className="group inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
          >
            View all auctions
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Live auction cards */}
        <div className="grid gap-6 lg:grid-cols-3">
          {liveAuctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AuctionCard({
  auction,
}: {
  auction: (typeof liveAuctions)[number];
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20">
      {/* Vehicle image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={auction.image}
          alt={`${auction.year} ${auction.make} ${auction.model}`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        {/* Live indicator */}
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          LIVE
        </div>

        {/* Countdown */}
        <div className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
          Ends in {auction.time}
        </div>

        {/* Vehicle name over image */}
        <div className="absolute bottom-4 left-5 right-5">
          <p className="text-xs font-medium uppercase tracking-wider text-white/60">
            {auction.year}
          </p>

          <h3 className="mt-1 text-2xl font-semibold tracking-tight text-white">
            {auction.make} {auction.model}
          </h3>
        </div>
      </div>

      {/* Vehicle information */}
      <div className="p-5">
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
          <span>{auction.mileage}</span>

          <span className="text-border">•</span>

          <span>{auction.transmission}</span>

          <span className="text-border">•</span>

          <span>{auction.fuel}</span>

          <span className="text-border">•</span>

          <span>{auction.location}</span>
        </div>

        {/* Bid information */}
        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-xs text-muted">Current bid</p>

            <p className="mt-1 text-2xl font-semibold tracking-tight text-accent">
              {auction.bid}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-muted">Auction activity</p>

            <p className="mt-1 text-sm font-medium text-foreground">
              {auction.bids} bids
            </p>
          </div>
        </div>

        {/* Action */}
        <Link
          href={`/auctions/${auction.id}`}
          className="mt-5 flex w-full items-center justify-between rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground"
        >
          <span>View Auction</span>

          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}