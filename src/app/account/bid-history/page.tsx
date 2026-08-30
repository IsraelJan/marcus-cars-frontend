"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { vehicles, type Vehicle } from "../../../data/vehicles";

type BidStatus = "Won" | "Outbid" | "Leading" | "Ended";

type BidRecord = {
  id: number;
  vehicleId: number;
  auctionDate: string;
  bidAmount: number;
  highestBid: number;
  status: BidStatus;
  bidsPlaced: number;
  auctionType: "Live Auction" | "Timed Auction";
};

const bidHistory: BidRecord[] = [
  {
    id: 1,
    vehicleId: 1,
    auctionDate: "August 28, 2026",
    bidAmount: 118000,
    highestBid: 118000,
    status: "Leading",
    bidsPlaced: 6,
    auctionType: "Live Auction",
  },
  {
    id: 2,
    vehicleId: 3,
    auctionDate: "August 21, 2026",
    bidAmount: 42500,
    highestBid: 44800,
    status: "Outbid",
    bidsPlaced: 4,
    auctionType: "Timed Auction",
  },
  {
    id: 3,
    vehicleId: 4,
    auctionDate: "August 15, 2026",
    bidAmount: 68000,
    highestBid: 68000,
    status: "Won",
    bidsPlaced: 8,
    auctionType: "Live Auction",
  },
  {
    id: 4,
    vehicleId: 5,
    auctionDate: "August 8, 2026",
    bidAmount: 85000,
    highestBid: 91000,
    status: "Ended",
    bidsPlaced: 5,
    auctionType: "Timed Auction",
  },
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);

function getVehicle(vehicleId: number): Vehicle | undefined {
  return vehicles.find((vehicle) => vehicle.id === vehicleId);
}

function StatusBadge({ status }: { status: BidStatus }) {
  const styles: Record<BidStatus, string> = {
    Won: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    Leading: "border-lime-400/20 bg-lime-400/10 text-lime-300",
    Outbid: "border-orange-400/20 bg-orange-400/10 text-orange-300",
    Ended: "border-white/10 bg-white/[0.04] text-slate-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function Icon({
  children,
  className = "h-5 w-5",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export default function BidHistoryPage() {
  const [filter, setFilter] = useState<"All" | BidStatus>("All");
  const [search, setSearch] = useState("");

  const filteredBids = useMemo(() => {
    return bidHistory.filter((bid) => {
      const vehicle = getVehicle(bid.vehicleId);

      if (!vehicle) {
        return false;
      }

      const matchesFilter =
        filter === "All" || bid.status === filter;

      const searchText = `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim} ${vehicle.location}`.toLowerCase();

      const matchesSearch = searchText.includes(
        search.toLowerCase().trim(),
      );

      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  const totalBids = bidHistory.reduce(
    (total, bid) => total + bid.bidsPlaced,
    0,
  );

  const wonBids = bidHistory.filter(
    (bid) => bid.status === "Won",
  ).length;

  const leadingBids = bidHistory.filter(
    (bid) => bid.status === "Leading",
  ).length;

  const outbidBids = bidHistory.filter(
    (bid) => bid.status === "Outbid",
  ).length;

  const totalCommitted = bidHistory.reduce(
    (total, bid) => total + bid.bidAmount,
    0,
  );

  return (
    <main className="min-h-screen bg-[#080b0d] text-white">
      {/* -------------------------------------------------------------
          HEADER
      ------------------------------------------------------------- */}
      <section className="border-b border-white/[0.08]">
        <div className="mx-auto max-w-[1440px] px-06 pb-10 pt-15 lg:px-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-lime-300">
                <span className="h-px w-8 bg-lime-300" />
                Account
              </div>

              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Bid History
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
                Review your bidding activity, track previous auctions and
                keep an eye on vehicles you've competed for.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/auctions"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/[0.06]"
              >
                Browse Auctions
                <Icon className="h-4 w-4">
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </Icon>
              </Link>

              <Link
                href="/vehicles"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-lime-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-lime-200"
              >
                Browse Vehicles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          ACCOUNT NAVIGATION
      ------------------------------------------------------------- */}
      <div className="border-b border-white/[0.06] bg-[#0a0d0f]">
        <div className="mx-auto flex max-w-[1440px] gap-1 overflow-x-auto px-6 lg:px-10">
          <Link
            href="/account"
            className="whitespace-nowrap border-b border-transparent px-4 py-4 text-sm text-slate-400 transition hover:text-white"
          >
            My Activity
          </Link>

          <Link
            href="/account/saved-vehicles"
            className="whitespace-nowrap border-b border-transparent px-4 py-4 text-sm text-slate-400 transition hover:text-white"
          >
            Saved Vehicles
          </Link>

          <Link
            href="/account/bid-history"
            className="whitespace-nowrap border-b border-lime-300 px-4 py-4 text-sm font-medium text-white"
          >
            Bid History
          </Link>

          <Link
            href="/account/profile"
            className="whitespace-nowrap border-b border-transparent px-4 py-4 text-sm text-slate-400 transition hover:text-white"
          >
            Profile
          </Link>

          <Link
            href="/account/settings"
            className="whitespace-nowrap border-b border-transparent px-4 py-4 text-sm text-slate-400 transition hover:text-white"
          >
            Settings
          </Link>
        </div>
      </div>

      {/* -------------------------------------------------------------
          MAIN CONTENT
      ------------------------------------------------------------- */}
      <div className="mx-auto max-w-[1440px] px-6 py-10 lg:px-10">
        {/* -----------------------------------------------------------
            SUMMARY CARDS
        ----------------------------------------------------------- */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0d1114] p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-500">
                  Total bids placed
                </p>

                <p className="mt-3 text-3xl font-semibold">
                  {totalBids}
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  Across your auction activity
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-slate-300">
                <Icon>
                  <path d="M12 20V10" />
                  <path d="m7 15 5-5 5 5" />
                  <path d="M5 4h14" />
                </Icon>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#0d1114] p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-500">
                  Currently leading
                </p>

                <p className="mt-3 text-3xl font-semibold">
                  {leadingBids}
                </p>

                <p className="mt-2 text-xs text-lime-300">
                  Keep watching these auctions
                </p>
              </div>

              <div className="rounded-xl border border-lime-300/10 bg-lime-300/[0.05] p-3 text-lime-300">
                <Icon>
                  <path d="m5 12 4 4L19 6" />
                </Icon>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#0d1114] p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-500">
                  Auctions won
                </p>

                <p className="mt-3 text-3xl font-semibold">
                  {wonBids}
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  Successful auction outcomes
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-slate-300">
                <Icon>
                  <path d="M8 21h8" />
                  <path d="M12 17v4" />
                  <path d="M7 4h10" />
                  <path d="M6 4v5a6 6 0 0 0 12 0V4" />
                  <path d="M4 4h3" />
                  <path d="M17 4h3" />
                </Icon>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#0d1114] p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-500">
                  Total bid value
                </p>

                <p className="mt-3 text-3xl font-semibold">
                  {formatCurrency(totalCommitted)}
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  Cumulative bid amounts
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-slate-300">
                <Icon>
                  <circle cx="12" cy="12" r="8" />
                  <path d="M12 8v8" />
                  <path d="M9.5 10.5c0-1 1-1.5 2.5-1.5s2.5.5 2.5 1.5-1 1.5-2.5 1.5-2.5.5-2.5 1.5 1 1.5 2.5 1.5 2.5-.5 2.5-1.5" />
                </Icon>
              </div>
            </div>
          </div>
        </section>

        {/* -----------------------------------------------------------
            ACTIVITY INSIGHT
        ----------------------------------------------------------- */}
        <section className="mt-8 rounded-2xl border border-white/[0.08] bg-[#0d1114]">
          <div className="grid lg:grid-cols-[1fr_auto]">
            <div className="p-6 lg:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-300 text-black">
                  <Icon className="h-5 w-5">
                    <path d="m5 12 4 4L19 6" />
                  </Icon>
                </span>

                <div>
                  <p className="text-sm font-medium">
                    Your auction activity
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    You have {leadingBids} active leading{" "}
                    {leadingBids === 1 ? "bid" : "bids"} and{" "}
                    {outbidBids} outbid{" "}
                    {outbidBids === 1 ? "auction" : "auctions"}.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/[0.07] p-6 lg:border-l lg:border-t-0 lg:px-8">
              <Link
                href="/account"
                className="inline-flex items-center gap-2 text-sm font-medium text-lime-300 hover:text-lime-200"
              >
                View My Activity
                <Icon className="h-4 w-4">
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </Icon>
              </Link>
            </div>
          </div>
        </section>

        {/* -----------------------------------------------------------
            HISTORY HEADER + FILTERS
        ----------------------------------------------------------- */}
        <section className="mt-12">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-lime-300">
                Your activity
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Auction History
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Every bid connected to your account.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-4-4" />
                </Icon>

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search vehicles..."
                  className="h-11 w-full rounded-xl border border-white/10 bg-[#0d1114] pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-lime-300/40 sm:w-64"
                />
              </div>

              <div className="flex rounded-xl border border-white/10 bg-[#0d1114] p-1">
                {(
                  [
                    "All",
                    "Leading",
                    "Won",
                    "Outbid",
                    "Ended",
                  ] as const
                ).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setFilter(item)}
                    className={`rounded-lg px-3 py-2 text-xs transition ${
                      filter === item
                        ? "bg-white/[0.08] text-white"
                        : "text-slate-500 hover:text-white"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------
              BID RECORDS
          --------------------------------------------------------- */}
          <div className="mt-6 space-y-4">
            {filteredBids.map((bid) => {
              const vehicle = getVehicle(bid.vehicleId);

              if (!vehicle) {
                return null;
              }

              return (
                <article
                  key={bid.id}
                  className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d1114] transition hover:border-white/[0.14]"
                >
                  <div className="grid lg:grid-cols-[260px_1fr_auto]">
                    {/* Vehicle image */}
                    <Link
                      href={`/vehicles/${vehicle.id}`}
                      className="group relative block h-56 overflow-hidden bg-black lg:h-full"
                    >
                      <img
                        src={vehicle.images[0]}
                        alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute left-4 top-4">
                        <StatusBadge status={bid.status} />
                      </div>
                    </Link>

                    {/* Vehicle details */}
                    <div className="p-6 lg:p-7">
                      <div className="flex flex-col gap-5">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                            <span>{vehicle.year}</span>
                            <span>•</span>
                            <span>{vehicle.category}</span>
                            <span>•</span>
                            <span>{vehicle.location}</span>
                          </div>

                          <Link
                            href={`/vehicles/${vehicle.id}`}
                            className="mt-2 block text-xl font-semibold transition hover:text-lime-300"
                          >
                            {vehicle.year} {vehicle.make}{" "}
                            {vehicle.model}
                          </Link>

                          <p className="mt-1 text-sm text-slate-500">
                            {vehicle.trim}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-y border-white/[0.07] py-5 sm:grid-cols-4">
                          <div>
                            <p className="text-xs text-slate-600">
                              Your bid
                            </p>
                            <p className="mt-1 text-sm font-semibold text-white">
                              {formatCurrency(bid.bidAmount)}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-slate-600">
                              Highest bid
                            </p>
                            <p className="mt-1 text-sm font-semibold text-white">
                              {formatCurrency(bid.highestBid)}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-slate-600">
                              Bids placed
                            </p>
                            <p className="mt-1 text-sm font-semibold text-white">
                              {bid.bidsPlaced}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-slate-600">
                              Auction
                            </p>
                            <p className="mt-1 text-sm font-semibold text-white">
                              {bid.auctionType}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                          <span>
                            Auction date:{" "}
                            <span className="text-slate-300">
                              {bid.auctionDate}
                            </span>
                          </span>

                          <span className="hidden h-1 w-1 rounded-full bg-slate-700 sm:block" />

                          <span>
                            Stock:{" "}
                            <span className="text-slate-300">
                              {vehicle.stockNumber}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action area */}
                    <div className="flex flex-row items-center gap-3 border-t border-white/[0.07] p-5 lg:flex-col lg:items-stretch lg:justify-center lg:border-l lg:border-t-0 lg:p-6">
                      <Link
                        href={`/vehicles/${vehicle.id}`}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/[0.05] lg:flex-none"
                      >
                        View Vehicle
                        <Icon className="h-4 w-4">
                          <path d="M5 12h14" />
                          <path d="m13 6 6 6-6 6" />
                        </Icon>
                      </Link>

                      {bid.status === "Leading" && (
                        <Link
                          href="/auctions"
                          className="inline-flex flex-1 items-center justify-center rounded-xl bg-lime-300 px-4 py-3 text-sm font-semibold text-black transition hover:bg-lime-200 lg:flex-none"
                        >
                          Continue Bidding
                        </Link>
                      )}

                      {bid.status === "Outbid" && (
                        <Link
                          href="/auctions"
                          className="inline-flex flex-1 items-center justify-center rounded-xl bg-lime-300 px-4 py-3 text-sm font-semibold text-black transition hover:bg-lime-200 lg:flex-none"
                        >
                          Find Auctions
                        </Link>
                      )}

                      {bid.status === "Won" && (
                        <Link
                          href="/account"
                          className="inline-flex flex-1 items-center justify-center rounded-xl border border-lime-300/20 bg-lime-300/[0.06] px-4 py-3 text-sm font-medium text-lime-300 transition hover:bg-lime-300/[0.1] lg:flex-none"
                        >
                          View Activity
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}

            {/* Empty state */}
            {filteredBids.length === 0 && (
              <div className="rounded-2xl border border-dashed border-white/10 bg-[#0d1114] px-6 py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-500">
                  <Icon>
                    <path d="M12 6v6l4 2" />
                    <circle cx="12" cy="12" r="8" />
                  </Icon>
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  No bid history found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  We couldn't find any bids matching your current
                  search or filter.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setFilter("All");
                  }}
                  className="mt-6 rounded-xl border border-white/10 px-5 py-3 text-sm text-white transition hover:bg-white/[0.05]"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* -----------------------------------------------------------
            BIDDING GUIDANCE
        ----------------------------------------------------------- */}
        <section className="mt-12 grid gap-5 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0d1114] p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-slate-300">
              <Icon>
                <circle cx="12" cy="12" r="8" />
                <path d="M12 8v4l3 2" />
              </Icon>
            </div>

            <h3 className="mt-5 font-semibold">
              Watch your leading bids
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Keep an eye on active auctions where you currently
              hold the highest bid.
            </p>

            <Link
              href="/auctions"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-lime-300"
            >
              View live auctions
              <Icon className="h-4 w-4">
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </Icon>
            </Link>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#0d1114] p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-slate-300">
              <Icon>
                <path d="M20 12a8 8 0 1 1-2.34-5.66" />
                <path d="M20 4v6h-6" />
              </Icon>
            </div>

            <h3 className="mt-5 font-semibold">
              Been outbid?
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Return to the auction area to discover other vehicles
              that may fit what you're looking for.
            </p>

            <Link
              href="/vehicles"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-lime-300"
            >
              Browse vehicles
              <Icon className="h-4 w-4">
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </Icon>
            </Link>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#0d1114] p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-slate-300">
              <Icon>
                <path d="M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
                <path d="M12 8v4l3 2" />
              </Icon>
            </div>

            <h3 className="mt-5 font-semibold">
              Need assistance?
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              If you have a question about a bid, auction or vehicle,
              our team can help.
            </p>

            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-lime-300"
            >
              Contact Marcus
              <Icon className="h-4 w-4">
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </Icon>
            </Link>
          </div>
        </section>

        {/* -----------------------------------------------------------
            ACCOUNT QUICK LINKS
        ----------------------------------------------------------- */}
        <section className="mt-12 rounded-2xl border border-white/[0.08] bg-[#0d1114] p-6 lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-lime-300">
                Account
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                Manage your Marcus account
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Access your saved vehicles, profile and account
                preferences.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/account/saved-vehicles"
                className="rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
              >
                Saved Vehicles
              </Link>

              <Link
                href="/account/profile"
                className="rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
              >
                Profile
              </Link>

              <Link
                href="/account/settings"
                className="rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
              >
                Settings
              </Link>
            </div>
          </div>
        </section>

        {/* -----------------------------------------------------------
            FOOTER NOTE
        ----------------------------------------------------------- */}
        <div className="py-10 text-center text-xs text-slate-600">
          Bid information is displayed for account activity and
          record-keeping purposes.
        </div>
      </div>
    </main>
  );
}