"use client";

import Link from "next/link";

const upcomingAuctions = [
  {
    id: 4,
    date: "AUG 29",
    time: "10:30 AM",
    year: "2022",
    make: "Ford",
    model: "F-250 Super Duty",
    mileage: "41,200 mi",
    location: "Dallas, TX",
    startingBid: "$28,500",
    image:
      "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 5,
    date: "AUG 30",
    time: "2:00 PM",
    year: "2021",
    make: "Jeep",
    model: "Wrangler Rubicon",
    mileage: "23,800 mi",
    location: "Phoenix, AZ",
    startingBid: "$34,000",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function UpcomingAuctions() {
  return (
    <section
      id="upcoming"
      className="border-t border-border bg-background px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-accent" />

              <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
                Coming up
              </span>
            </div>

            <h2 className="text-4xl font-semibold tracking-[-0.04em] text-foreground md:text-5xl">
              Upcoming Auctions
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-muted md:text-base">
              See what's coming next and save an auction before it goes live.
            </p>
          </div>

          <Link
            href="/auctions"
            className="group inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
          >
            View auction schedule
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Upcoming auction list */}
        <div className="space-y-4">
          {upcomingAuctions.map((auction) => (
            <UpcomingAuctionCard
              key={auction.id}
              auction={auction}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function UpcomingAuctionCard({
  auction,
}: {
  auction: (typeof upcomingAuctions)[number];
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-foreground/20">
      <div className="grid md:grid-cols-[170px_260px_1fr_auto] md:items-center">
        {/* Date */}
        <div className="flex items-center gap-4 border-b border-border p-5 md:border-b-0 md:border-r">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">
              Auction
            </p>

            <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
              {auction.date}
            </p>

            <p className="mt-1 text-sm text-accent">
              {auction.time}
            </p>
          </div>
        </div>

        {/* Vehicle image */}
        <div className="relative aspect-[16/9] overflow-hidden md:aspect-auto md:h-full">
          <img
            src={auction.image}
            alt={`${auction.year} ${auction.make} ${auction.model}`}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        </div>

        {/* Vehicle information */}
        <div className="p-5 md:px-7">
          <p className="text-xs uppercase tracking-wider text-muted">
            {auction.year}
          </p>

          <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
            {auction.make} {auction.model}
          </h3>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
            <span>{auction.mileage}</span>

            <span>•</span>

            <span>{auction.location}</span>
          </div>

          <div className="mt-5">
            <p className="text-xs text-muted">Starting bid</p>

            <p className="mt-1 text-xl font-semibold text-accent">
              {auction.startingBid}
            </p>
          </div>
        </div>

        {/* Action */}
        <div className="border-t border-border p-5 md:border-l md:border-t-0 md:p-6">
          <button
            type="button"
            className="w-full whitespace-nowrap rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground md:w-auto"
          >
            Set Reminder
          </button>
        </div>
      </div>
    </article>
  );
}