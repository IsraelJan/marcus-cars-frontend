"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type AuctionStatus = "live" | "upcoming" | "ended";

interface Auction {
  id: number;
  year: number;
  make: string;
  model: string;
  trim: string;
  bid: string;
  bids: number;
  time: string;
  status: AuctionStatus;
  image: string;
}

const auctions: Auction[] = [
  {
    id: 1,
    year: 2022,
    make: "Mercedes-AMG",
    model: "G 63",
    trim: "4MATIC",
    bid: "$142,500",
    bids: 28,
    time: "02:41:08",
    status: "live",
    image:
      "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: 2,
    year: 2022,
    make: "Ford",
    model: "F-150",
    trim: "Lariat",
    bid: "$48,500",
    bids: 12,
    time: "03:18:42",
    status: "live",
    image:
      "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: 3,
    year: 2023,
    make: "Chevrolet",
    model: "Silverado",
    trim: "High Country",
    bid: "$58,900",
    bids: 16,
    time: "04:32:11",
    status: "live",
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: 4,
    year: 2021,
    make: "Ford",
    model: "Bronco",
    trim: "Wildtrak",
    bid: "$39,200",
    bids: 8,
    time: "01:18:42",
    status: "live",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: 5,
    year: 2023,
    make: "BMW",
    model: "M4 Competition",
    trim: "xDrive",
    bid: "$76,800",
    bids: 21,
    time: "05:06:17",
    status: "live",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: 6,
    year: 2021,
    make: "Porsche",
    model: "911 Carrera",
    trim: "Coupe",
    bid: "$118,400",
    bids: 14,
    time: "06:24:51",
    status: "live",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: 7,
    year: 2022,
    make: "Range Rover",
    model: "Sport",
    trim: "HSE",
    bid: "$89,600",
    bids: 11,
    time: "Tomorrow",
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: 8,
    year: 2022,
    make: "GMC",
    model: "Sierra",
    trim: "Denali",
    bid: "$54,700",
    bids: 10,
    time: "Tomorrow",
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: 9,
    year: 2023,
    make: "Toyota",
    model: "Land Cruiser",
    trim: "300 Series",
    bid: "$92,300",
    bids: 18,
    time: "Ended",
    status: "ended",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: 10,
    year: 2022,
    make: "Cadillac",
    model: "Escalade",
    trim: "Premium Luxury",
    bid: "$81,750",
    bids: 15,
    time: "Ended",
    status: "ended",
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=90",
  },
];

const tabs: { label: string; value: AuctionStatus }[] = [
  { label: "Live Now", value: "live" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Ended", value: "ended" },
];

export default function AuctionsPage() {
  const [activeTab, setActiveTab] = useState<AuctionStatus>("live");
  const [search, setSearch] = useState("");

  const filteredAuctions = useMemo(() => {
    const query = search.trim().toLowerCase();

    return auctions.filter((auction) => {
      const matchesStatus = auction.status === activeTab;

      const vehicleName =
        `${auction.year} ${auction.make} ${auction.model} ${auction.trim}`.toLowerCase();

      const matchesSearch =
        query.length === 0 || vehicleName.includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [activeTab, search]);

  /*
   * For the prototype, the Auction Spotlight is automatically
   * selected using bidding activity.
   *
   * Later this can come from backend logic such as:
   * - most watched
   * - highest bidding momentum
   * - admin featured auction
   * - highest engagement
   */
  const spotlight =
    activeTab === "live" && filteredAuctions.length > 0
      ? [...filteredAuctions].sort((a, b) => b.bids - a.bids)[0]
      : null;

  const gridAuctions = spotlight
    ? filteredAuctions.filter((auction) => auction.id !== spotlight.id)
    : filteredAuctions;

  return (
    <main className="relative min-h-screen overflow-hidden bg-background pb-24 pt-28 text-foreground">
      {/* ========================================================
          FULL PAGE AUTOMOTIVE BACKGROUND
      ========================================================= */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2400&q=90"
          alt=""
          className="h-full w-full object-cover object-center opacity-[0.15]"
        />

        <div className="absolute inset-0 bg-background/85" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,transparent_0%,rgba(0,0,0,0.3)_80%)]" />

        <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>

      {/* ========================================================
          HEADER
      ========================================================= */}
      <section className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_14px_var(--accent)]" />

            <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
              Marcus Cars
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl lg:text-6xl">
            Live Auctions
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-6 text-muted sm:text-base">
            Explore vehicles currently going under the hammer,
            follow the action, and find your next opportunity.
          </p>
        </div>

        {/* ======================================================
            TABS
        ====================================================== */}
        <div className="mt-10 flex items-center gap-2 overflow-x-auto border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={`relative whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.value
                  ? "text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {tab.label}

              {activeTab === tab.value && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-accent" />
              )}
            </button>
          ))}
        </div>

        {/* ======================================================
            SEARCH
        ====================================================== */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search make, model or year..."
              className="h-12 w-full rounded-xl border border-border bg-surface/90 px-11 text-sm text-foreground outline-none backdrop-blur-md transition focus:border-accent"
            />
          </div>

          <button
            type="button"
            className="h-12 rounded-xl border border-border bg-surface/90 px-6 text-sm font-medium text-foreground backdrop-blur-md transition hover:border-foreground/20"
          >
            Filters
            <span className="ml-2 text-muted">☰</span>
          </button>
        </div>
      </section>

      {/* ========================================================
          AUCTION SPOTLIGHT
      ========================================================= */}
      {spotlight && (
        <section className="relative mx-auto mt-12 max-w-7xl px-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Auction Spotlight
            </span>

            <span className="h-px w-12 bg-accent/40" />

            <span className="text-xs text-muted">
              Most active live auction
            </span>
          </div>

          <div className="group overflow-hidden rounded-3xl border border-border bg-surface/85 shadow-2xl backdrop-blur-xl">
            <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
              {/* Spotlight Image */}
              <div className="relative min-h-[360px] overflow-hidden lg:min-h-[430px]">
                <img
                  src={spotlight.image}
                  alt={`${spotlight.year} ${spotlight.make} ${spotlight.model}`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />

                <div className="absolute left-6 top-6">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                    Live Now
                  </span>
                </div>

                <div className="absolute bottom-6 left-6">
                  <p className="text-sm text-white/65">
                    {spotlight.year}
                  </p>

                  <h2 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
                    {spotlight.make} {spotlight.model}
                  </h2>

                  <p className="mt-1 text-sm text-white/60">
                    {spotlight.trim}
                  </p>
                </div>
              </div>

              {/* Spotlight Details */}
              <div className="flex flex-col justify-between p-7 lg:p-9">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-accent">
                    High bidding activity
                  </p>

                  <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                    Worth watching.
                  </h3>

                  <p className="mt-4 max-w-md text-sm leading-6 text-muted">
                    This vehicle currently has the highest bidding
                    activity among the live auctions.
                  </p>
                </div>

                <div className="mt-10">
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <p className="text-xs text-muted">
                        Current bid
                      </p>

                      <p className="mt-1 text-3xl font-semibold tracking-tight text-accent">
                        {spotlight.bid}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted">
                        Time remaining
                      </p>

                      <p className="mt-2 text-lg font-semibold">
                        {spotlight.time}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                    <div>
                      <p className="text-xs text-muted">
                        Bid activity
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        {spotlight.bids} bids
                      </p>
                    </div>

                    <Link
                      href={`/auctions/${spotlight.id}`}
                      className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:scale-[1.02] hover:brightness-105"
                    >
                      View Auction →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          VEHICLE GRID
      ========================================================= */}
      <section className="relative mx-auto mt-14 max-w-7xl px-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              {activeTab === "live"
                ? "Live right now"
                : activeTab === "upcoming"
                  ? "Coming soon"
                  : "Auction history"}
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              {gridAuctions.length}{" "}
              {gridAuctions.length === 1
                ? "vehicle"
                : "vehicles"}
            </h2>
          </div>
        </div>

        {gridAuctions.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {gridAuctions.map((auction) => (
              <AuctionCard
                key={auction.id}
                auction={auction}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-surface/85 px-6 py-20 text-center backdrop-blur-md">
            <p className="text-sm text-muted">
              No vehicles match your search.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

/* ==============================================================
   AUCTION CARD
============================================================== */

function AuctionCard({
  auction,
}: {
  auction: Auction;
}) {
  const isLive = auction.status === "live";

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-surface/90 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-2xl">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={auction.image}
          alt={`${auction.year} ${auction.make} ${auction.model}`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        {/* Status */}
        <div className="absolute left-4 top-4">
          {isLive ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/65 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
              Live
            </span>
          ) : (
            <span className="rounded-full border border-white/15 bg-black/65 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
              {auction.status === "upcoming"
                ? "Upcoming"
                : "Ended"}
            </span>
          )}
        </div>

        {/* Watch */}
        <button
          type="button"
          aria-label={`Watch ${auction.year} ${auction.make} ${auction.model}`}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-md transition hover:bg-white hover:text-black"
        >
          ♡
        </button>

        {/* Vehicle Name */}
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs text-white/65">
            {auction.year}
          </p>

          <h3 className="mt-1 text-lg font-semibold text-white">
            {auction.make} {auction.model}
          </h3>

          <p className="text-xs text-white/60">
            {auction.trim}
          </p>
        </div>
      </div>

      {/* Card Information */}
      <div className="p-5">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-muted">
              {isLive ? "Current bid" : "Last bid"}
            </p>

            <p className="mt-1 text-2xl font-semibold tracking-tight text-accent">
              {auction.bid}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-muted">Bids</p>

            <p className="mt-1 text-sm font-medium text-foreground">
              {auction.bids}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <div>
            <p className="text-xs text-muted">
              {isLive ? "Ends in" : "Status"}
            </p>

            <p className="mt-1 text-sm font-medium text-foreground">
              {auction.time}
            </p>
          </div>

          <Link
            href={`/auctions/${auction.id}`}
            className="rounded-full bg-foreground px-5 py-2.5 text-xs font-semibold text-background transition hover:bg-accent hover:text-accent-foreground"
          >
            View Auction →
          </Link>
        </div>
      </div>
    </article>
  );
}