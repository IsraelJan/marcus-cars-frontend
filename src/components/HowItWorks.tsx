"use client";

import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Find it",
    description:
      "Search vehicles that match what you want and discover auctions worth watching.",
    action: "Browse vehicles",
    type: "search",
  },
  {
    number: "02",
    title: "Follow it",
    description:
      "Watch the auction unfold in real time and stay close as bids move.",
    action: "Watch the auction",
    type: "auction",
  },
  {
    number: "03",
    title: "Win it",
    description:
      "Place your bid, stay in control, and take the vehicle when you come out on top.",
    action: "Start bidding",
    type: "win",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-t border-border bg-surface/30 px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="max-w-2xl">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />

            <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
              How it works
            </span>
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-foreground md:text-6xl">
            From finding the car
            <br />
            to winning it.
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-6 text-muted md:text-base">
            Marcus makes the auction journey simple. Find a vehicle, follow
            the action, and bid when the moment is right.
          </p>
        </div>

        {/* Journey */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector */}
              {index < steps.length - 1 && (
                <div className="absolute left-full top-8 hidden w-6 -translate-x-3 lg:block">
                  <div className="h-px w-full bg-border" />
                </div>
              )}

              <article className="group h-full overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20">
                {/* Top */}
                <div className="flex items-center justify-between border-b border-border px-6 py-5">
                  <span className="text-sm font-medium text-accent">
                    {step.number}
                  </span>

                  <span className="text-xs uppercase tracking-wider text-muted">
                    {step.title}
                  </span>
                </div>

                {/* UI Preview */}
                <div className="h-56 border-b border-border p-6">
                  {step.type === "search" && <SearchPreview />}

                  {step.type === "auction" && <AuctionPreview />}

                  {step.type === "win" && <WinPreview />}
                </div>

                {/* Copy */}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold capitalize tracking-tight text-foreground">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted">
                    {step.description}
                  </p>

                  <Link
                    href={
                      step.type === "win"
                        ? "/auctions"
                        : step.type === "auction"
                          ? "/auctions"
                          : "/auctions"
                    }
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
                  >
                    {step.action}

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* Step 01 — Find it                  */
/* ---------------------------------- */

function SearchPreview() {
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="rounded-xl border border-border bg-surface p-4">
        <div className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-4 w-4 text-muted"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>

          <span className="text-xs text-muted">
            Search make, model or year...
          </span>
        </div>

        <div className="mt-3 flex gap-2">
          <span className="rounded-full bg-accent px-3 py-1.5 text-[10px] font-medium text-accent-foreground">
            Ford
          </span>

          <span className="rounded-full border border-border px-3 py-1.5 text-[10px] text-muted">
            Pickup
          </span>

          <span className="rounded-full border border-border px-3 py-1.5 text-[10px] text-muted">
            Under $40k
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* Step 02 — Follow it                */
/* ---------------------------------- */

function AuctionPreview() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-full rounded-xl border border-border bg-surface p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />

            <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground">
              Live auction
            </span>
          </div>

          <span className="text-xs font-medium text-accent">
            02:18
          </span>
        </div>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-[10px] text-muted">Current bid</p>

            <p className="mt-1 text-xl font-semibold text-accent">
              $31,800
            </p>
          </div>

          <div className="text-right">
            <p className="text-[10px] text-muted">Bids</p>

            <p className="mt-1 text-sm font-medium text-foreground">
              8 bids
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-[10px]">
            <span className="text-muted">Latest bid</span>
            <span className="text-foreground">$31,800</span>
          </div>

          <div className="flex justify-between text-[10px]">
            <span className="text-muted">Previous</span>
            <span className="text-muted">$31,200</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* Step 03 — Win it                  */
/* ---------------------------------- */

function WinPreview() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-full rounded-xl border border-accent/30 bg-accent/5 p-5 text-center">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="m5 12 4 4L19 6" />
          </svg>
        </div>

        <p className="mt-4 text-sm font-semibold text-foreground">
          You're the highest bidder
        </p>

        <p className="mt-1 text-xs text-muted">
          Your bid of $31,800 is currently winning.
        </p>

        <div className="mt-4 rounded-lg bg-accent px-4 py-2.5 text-xs font-semibold text-accent-foreground">
          Winning bid
        </div>
      </div>
    </div>
  );
}