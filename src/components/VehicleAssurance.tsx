"use client";

import Link from "next/link";

export default function VehicleAssurance() {
  return (
    <section
      id="vehicle-assurance"
      className="border-t border-border bg-surface/20 px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="max-w-2xl">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-accent" />

            <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
              Before you bid
            </span>
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-foreground md:text-6xl">
            Know what you're
            <br />
            bidding on.
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-6 text-muted md:text-base">
            Get the vehicle information and auction activity you need before
            making your move.
          </p>
        </div>

        {/* Main experience */}
        <div className="mt-14 grid overflow-hidden rounded-3xl border border-border bg-background lg:grid-cols-[1.15fr_0.85fr]">
          {/* Vehicle visual */}
          <div className="relative min-h-[420px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?auto=format&fit=crop&w=1400&q=85"
              alt="Ford F-150"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

            {/* Vehicle label */}
            <div className="absolute bottom-7 left-7 right-7">
              <p className="text-xs uppercase tracking-wider text-white/60">
                Featured vehicle
              </p>

              <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white">
                2022 Ford F-150 XLT
              </h3>

              <p className="mt-2 text-sm text-white/65">
                38,420 mi · Automatic · Gas · Dallas, TX
              </p>
            </div>
          </div>

          {/* Information */}
          <div className="p-7 md:p-9">
            {/* Vehicle details */}
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                Vehicle details
              </p>

              <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5">
                <Detail label="Mileage" value="38,420 mi" />
                <Detail label="Year" value="2022" />
                <Detail label="Transmission" value="Automatic" />
                <Detail label="Drive" value="4WD" />
                <Detail label="Fuel" value="Gas" />
                <Detail label="Condition" value="Verified" />
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 h-px bg-border" />

            {/* Auction details */}
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                Auction activity
              </p>

              <div className="mt-5 grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-muted">Current bid</p>

                  <p className="mt-1 text-2xl font-semibold tracking-tight text-accent">
                    $31,800
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted">Time remaining</p>

                  <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                    02:18
                  </p>
                </div>
              </div>

              {/* Activity */}
              <div className="mt-6 rounded-xl border border-border bg-surface p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">
                    Auction activity
                  </span>

                  <span className="text-xs font-medium text-accent">
                    Live
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <BidRow amount="$31,800" time="Just now" />
                  <BidRow amount="$31,200" time="24 sec ago" />
                  <BidRow amount="$30,700" time="51 sec ago" />
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/auctions"
              className="mt-7 flex w-full items-center justify-between rounded-full bg-foreground px-5 py-3.5 text-sm font-semibold text-background transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
            >
              <span>Explore Live Auctions</span>

              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs text-muted">{label}</p>

      <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

function BidRow({
  amount,
  time,
}: {
  amount: string;
  time: string;
}) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="font-medium text-foreground">{amount}</span>

      <span className="text-muted">{time}</span>
    </div>
  );
}