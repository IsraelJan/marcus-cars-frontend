"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";

type BidStatus = "leading" | "outbid" | "won";

interface Bid {
  id: number;
  title: string;
  year: number;
  image: string;
  yourBid: number;
  currentBid: number;
  securityHold: number;
  status: BidStatus;
  endsIn: string;
  location: string;
}

interface ActivityItem {
  id: number;
  type: "bid" | "outbid" | "hold" | "won";
  title: string;
  description: string;
  amount?: number;
  time: string;
}

/*
 * Demo auction data
 *
 * IMPORTANT:
 * These are USD amounts.
 *
 * Security hold = 10% of the user's bid.
 */
const initialBids: Bid[] = [
  {
    id: 1,
    title: "2021 Toyota Land Cruiser Prado",
    year: 2021,
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
    yourBid: 8500,
    currentBid: 8500,
    securityHold: 850,
    status: "leading",
    endsIn: "01h 42m",
    location: "4MATIC · Dallas, TX",
  },
  {
    id: 2,
    title: "2022 Ford F-150",
    year: 2022,
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    yourBid: 6800,
    currentBid: 7200,
    securityHold: 680,
    status: "outbid",
    endsIn: "03h 18m",
    location: "Lariat · Houston, TX",
  },
  {
    id: 3,
    title: "2023 Chevrolet Silverado",
    year: 2023,
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
    yourBid: 59150,
    currentBid: 58900,
    securityHold: 5915,
    status: "leading",
    endsIn: "05h 06m",
    location: "High Country · Austin, TX",
  },
];

const initialActivity: ActivityItem[] = [
  {
    id: 1,
    type: "bid",
    title: "Bid placed",
    description: "2021 Toyota Land Cruiser Prado",
    amount: 8500,
    time: "Today, 8:42 PM",
  },
  {
    id: 2,
    type: "outbid",
    title: "You were outbid",
    description: "2020 Subaru Forester XT",
    amount: 7200,
    time: "Today, 7:31 PM",
  },
  {
    id: 3,
    type: "hold",
    title: "Security hold",
    description: "2020 Subaru Forester XT",
    amount: 680,
    time: "Today, 7:30 PM",
  },
  {
    id: 4,
    type: "bid",
    title: "Bid placed",
    description: "2019 Mercedes-Benz C200",
    amount: 12500,
    time: "Yesterday, 6:14 PM",
  },
];

export default function AccountPage() {
  const { user, isAuthenticated } = useAuth();

  const [bids, setBids] = useState<Bid[]>(initialBids);

  const [activeTab, setActiveTab] = useState<
    "all" | "leading" | "outbid" | "won"
  >("all");

  const [activity] = useState<ActivityItem[]>(initialActivity);

  /*
   * ----------------------------------------------------------
   * USER
   * ----------------------------------------------------------
   */

  const displayName = user?.name?.trim() || "there";

  const firstName = displayName.split(" ")[0] || "there";

  /*
   * ----------------------------------------------------------
   * CURRENCY
   * ----------------------------------------------------------
   *
   * Marcus Cars uses USD throughout this dashboard.
   */

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  /*
   * ----------------------------------------------------------
   * SUMMARY
   * ----------------------------------------------------------
   */

  const stats = useMemo(() => {
    const active = bids.filter(
      (bid) =>
        bid.status === "leading" ||
        bid.status === "outbid"
    ).length;

    const leading = bids.filter(
      (bid) => bid.status === "leading"
    ).length;

    const outbid = bids.filter(
      (bid) => bid.status === "outbid"
    ).length;

    const won = bids.filter(
      (bid) => bid.status === "won"
    ).length;

    /*
     * Only active security holds are included.
     *
     * If a bid is eventually outbid and its hold is released,
     * the backend will later remove it from this figure.
     */

    const held = bids
      .filter(
        (bid) =>
          bid.status === "leading" ||
          bid.status === "outbid"
      )
      .reduce(
        (total, bid) => total + bid.securityHold,
        0
      );

    return {
      active,
      leading,
      outbid,
      won,
      held,
    };
  }, [bids]);

  /*
   * ----------------------------------------------------------
   * FILTERED BIDS
   * ----------------------------------------------------------
   */

  const filteredBids = useMemo(() => {
    if (activeTab === "all") {
      return bids;
    }

    return bids.filter(
      (bid) => bid.status === activeTab
    );
  }, [activeTab, bids]);

  /*
   * ----------------------------------------------------------
   * INCREASE BID
   * ----------------------------------------------------------
   *
   * Demo behaviour:
   *
   * New bid = current bid + $500
   *
   * Security hold = exactly 10% of the new bid.
   *
   * Example:
   *
   * $8,500 bid
   * $850 security hold
   *
   * $9,000 bid
   * $900 security hold
   */

  const increaseBid = (id: number) => {
    setBids((currentBids) =>
      currentBids.map((bid) => {
        if (bid.id !== id) {
          return bid;
        }

        const newBid = bid.currentBid + 500;

        const newSecurityHold = Math.round(
          newBid * 0.1
        );

        return {
          ...bid,
          yourBid: newBid,
          currentBid: newBid,
          securityHold: newSecurityHold,
          status: "leading",
        };
      })
    );
  };

  /*
   * ----------------------------------------------------------
   * STATUS
   * ----------------------------------------------------------
   */

  const getStatusLabel = (status: BidStatus) => {
    switch (status) {
      case "leading":
        return "Leading";

      case "outbid":
        return "Outbid";

      case "won":
        return "Won";

      default:
        return status;
    }
  };

  const getStatusClasses = (status: BidStatus) => {
    switch (status) {
      case "leading":
        return "border-emerald-500/20 bg-emerald-500/10 text-emerald-400";

      case "outbid":
        return "border-amber-500/20 bg-amber-500/10 text-amber-400";

      case "won":
        return "border-accent/20 bg-accent/10 text-accent";

      default:
        return "border-border bg-surface text-muted";
    }
  };

  /*
   * ----------------------------------------------------------
   * ACTIVITY ICON
   * ----------------------------------------------------------
   */

  const getActivityIcon = (
    type: ActivityItem["type"]
  ) => {
    switch (type) {
      case "bid":
        return <BidIcon />;

      case "outbid":
        return <AlertIcon />;

      case "hold":
        return <LockIcon />;

      case "won":
        return <TrophyIcon />;

      default:
        return <ActivityIcon />;
    }
  };

  /*
   * ----------------------------------------------------------
   * NOT SIGNED IN
   * ----------------------------------------------------------
   */

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-background px-6 pb-20 pt-32">
        <div className="mx-auto flex min-h-[60vh] max-w-4xl items-center justify-center">
          <div className="w-full max-w-lg rounded-3xl border border-border bg-surface/40 p-8 text-center shadow-2xl backdrop-blur-xl">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-surface">
              <LockIcon large />
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Private Area
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Sign in to view your activity
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted">
              Your bids, saved vehicles, auction history
              and security holds will appear here once
              you sign in.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/auctions"
                className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-surface"
              >
                Browse Auctions
              </Link>

              <Link
                href="/"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-all hover:brightness-105"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /*
   * ==========================================================
   * MAIN PAGE
   * ==========================================================
   */

  return (
    <main className="min-h-screen bg-background px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* ====================================================
            HEADER
        ===================================================== */}

        <section className="mb-8">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                My Activity
              </p>

              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Welcome back, {firstName}
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
                Keep track of your bids, auction positions
                and security funds in one place.
              </p>
            </div>

            <Link
              href="/auctions"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-all hover:scale-[1.01] hover:brightness-105"
            >
              Browse Live Auctions
              <ArrowRightIcon />
            </Link>
          </div>
        </section>

        {/* ====================================================
            SUMMARY
        ===================================================== */}

        <section className="mb-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Active Bids"
            value={stats.active.toString()}
            description="Currently participating"
            icon={<ActivityIcon />}
          />

          <StatCard
            label="Leading"
            value={stats.leading.toString()}
            description="You're currently ahead"
            icon={<TrendingIcon />}
          />

          <StatCard
            label="Outbid"
            value={stats.outbid.toString()}
            description="Action may be needed"
            icon={<AlertIcon />}
          />

          <StatCard
            label="Won"
            value={stats.won.toString()}
            description="Successful auctions"
            icon={<TrophyIcon />}
          />
        </section>

        {/* ====================================================
            SECURITY FUNDS
        ===================================================== */}

        <section className="mb-10 overflow-hidden rounded-3xl border border-border bg-surface/30">
          <div className="border-b border-border px-5 py-5 sm:px-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Security Funds
                </p>

                <h2 className="mt-1 text-lg font-semibold text-foreground">
                  Your active security holds
                </h2>
              </div>

              <div className="hidden rounded-full border border-border bg-background/40 px-3 py-1.5 text-xs text-muted sm:block">
                10% security hold
              </div>
            </div>
          </div>

          <div className="grid gap-px bg-border sm:grid-cols-3">
            <div className="bg-background/70 p-5 sm:p-6">
              <p className="text-xs text-muted">
                Currently held
              </p>

              <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                {formatCurrency(stats.held)}
              </p>

              <p className="mt-2 text-xs leading-5 text-muted">
                Total security holds attached to active
                bids.
              </p>
            </div>

            <div className="bg-background/70 p-5 sm:p-6">
              <p className="text-xs text-muted">
                Security rate
              </p>

              <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                10%
              </p>

              <p className="mt-2 text-xs leading-5 text-muted">
                Calculated from the applicable bid amount.
              </p>
            </div>

            <div className="bg-background/70 p-5 sm:p-6">
              <p className="text-xs text-muted">
                What is held?
              </p>

              <p className="mt-2 text-sm font-semibold text-foreground">
                Security fee only
              </p>

              <p className="mt-2 text-xs leading-5 text-muted">
                The full vehicle bid amount is not taken as
                the security hold.
              </p>
            </div>
          </div>
        </section>

        {/* ====================================================
            BIDS
        ===================================================== */}

        <section className="mb-10">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Auction Activity
              </p>

              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                Your bids
              </h2>
            </div>

            <div className="flex w-full overflow-x-auto rounded-xl border border-border bg-surface/30 p-1 sm:w-auto">
              {[
                ["all", "All"],
                ["leading", "Leading"],
                ["outbid", "Outbid"],
                ["won", "Won"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setActiveTab(
                      value as
                        | "all"
                        | "leading"
                        | "outbid"
                        | "won"
                    )
                  }
                  className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                    activeTab === value
                      ? "bg-surface text-foreground shadow-sm"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredBids.length === 0 ? (
              <div className="rounded-3xl border border-border bg-surface/30 p-10 text-center">
                <p className="text-sm font-medium text-foreground">
                  No activity in this category yet.
                </p>

                <Link
                  href="/auctions"
                  className="mt-4 inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground"
                >
                  Explore Auctions
                </Link>
              </div>
            ) : (
              filteredBids.map((bid) => (
                <div
                  key={bid.id}
                  className="overflow-hidden rounded-3xl border border-border bg-surface/20 transition-all duration-300 hover:border-foreground/15 hover:bg-surface/30"
                >
                  <div className="grid lg:grid-cols-[240px_1fr]">
                    {/* Vehicle image */}

                    <div className="relative h-52 overflow-hidden lg:h-full lg:min-h-[260px]">
                      <img
                        src={bid.image}
                        alt={bid.title}
                        className="h-full w-full object-cover"
                      />

                      <div className="absolute left-4 top-4">
                        <span
                          className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-md ${getStatusClasses(
                            bid.status
                          )}`}
                        >
                          {getStatusLabel(bid.status)}
                        </span>
                      </div>
                    </div>

                    {/* Vehicle details */}

                    <div className="p-5 sm:p-6">
                      <div className="flex flex-col justify-between gap-4 sm:flex-row">
                        <div>
                          <p className="text-xs text-muted">
                            {bid.year} · {bid.location}
                          </p>

                          <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
                            {bid.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted">
                          <ClockIcon />

                          <span>
                            Ends in {bid.endsIn}
                          </span>
                        </div>
                      </div>

                      <div className="my-5 h-px bg-border" />

                      {/* Bid information */}

                      <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                          <p className="text-xs text-muted">
                            Your bid
                          </p>

                          <p className="mt-1 text-lg font-semibold text-foreground">
                            {formatCurrency(bid.yourBid)}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-muted">
                            Current bid
                          </p>

                          <p className="mt-1 text-lg font-semibold text-foreground">
                            {formatCurrency(
                              bid.currentBid
                            )}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-muted">
                            Security hold
                          </p>

                          <p className="mt-1 text-lg font-semibold text-foreground">
                            {formatCurrency(
                              bid.securityHold
                            )}
                          </p>

                          <p className="mt-1 text-[11px] text-muted">
                            10% of your bid
                          </p>
                        </div>
                      </div>

                      {/* Outbid message */}

                      {bid.status === "outbid" && (
                        <div className="mt-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
                          <div className="flex gap-3">
                            <div className="mt-0.5 text-amber-400">
                              <AlertIcon />
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-foreground">
                                You have been outbid
                              </p>

                              <p className="mt-1 text-xs leading-5 text-muted">
                                The current auction price is
                                above your bid. Increase your
                                bid if you want to remain
                                competitive.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Actions */}

                      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <Link
                          href={`/auctions/${bid.id}`}
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-surface"
                        >
                          View Auction
                          <ArrowRightIcon />
                        </Link>

                        {bid.status === "outbid" && (
                          <button
                            type="button"
                            onClick={() =>
                              increaseBid(bid.id)
                            }
                            className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-all hover:brightness-105"
                          >
                            Increase Bid
                          </button>
                        )}

                        {bid.status === "leading" && (
                          <div className="flex items-center gap-2 text-xs text-emerald-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                            You're currently leading
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ====================================================
            RECENT ACTIVITY + QUICK ACTIONS
        ===================================================== */}

        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          {/* Recent activity */}

          <div className="rounded-3xl border border-border bg-surface/20">
            <div className="border-b border-border px-5 py-5 sm:px-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Timeline
              </p>

              <h2 className="mt-1 text-xl font-semibold text-foreground">
                Recent activity
              </h2>
            </div>

            <div className="divide-y divide-border">
              {activity.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 px-5 py-5 sm:px-6"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-muted">
                    {getActivityIcon(item.type)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col justify-between gap-1 sm:flex-row">
                      <p className="text-sm font-semibold text-foreground">
                        {item.title}
                      </p>

                      <span className="text-xs text-muted">
                        {item.time}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-muted">
                      {item.description}
                    </p>

                    {item.amount !== undefined && (
                      <p className="mt-2 text-sm font-medium text-foreground">
                        {formatCurrency(item.amount)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}

          <div className="space-y-4">
            <div className="rounded-3xl border border-border bg-surface/20 p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Quick Actions
              </p>

              <div className="mt-5 space-y-2">
                <QuickAction
                  href="/auctions"
                  icon={<GavelIcon />}
                  title="Browse Live Auctions"
                  description="Find your next vehicle"
                />

                <QuickAction
                  href="/vehicles"
                  icon={<CarIcon />}
                  title="Browse Vehicles"
                  description="Explore available inventory"
                />

                <QuickAction
                  href="/sell"
                  icon={<SellIcon />}
                  title="Sell Your Car"
                  description="Start a vehicle listing"
                />
              </div>
            </div>

            {/* Security information */}

            <div className="rounded-3xl border border-accent/15 bg-accent/5 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-accent">
                  <InfoIcon />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    How your security hold works
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-muted">
                    A 10% security amount is associated
                    with your applicable bid. This is
                    separate from the full vehicle purchase
                    price.
                  </p>

                  <p className="mt-2 text-xs leading-5 text-muted">
                    If you are outbid, the security amount
                    associated with that bid can be released
                    according to the platform's payment and
                    refund process.
                  </p>

                  <p className="mt-2 text-xs leading-5 text-muted">
                    If you win, the security amount can be
                    applied toward the applicable purchase
                    obligation.
                  </p>

                  <Link
                    href="/#how-it-works"
                    className="mt-4 inline-flex text-xs font-semibold text-accent hover:underline"
                  >
                    Learn how bidding works
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  label,
  value,
  description,
  icon,
}: {
  label: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface/20 p-5 transition-all duration-300 hover:bg-surface/30">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-muted">
            {label}
          </p>

          <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
            {value}
          </p>

          <p className="mt-2 text-xs text-muted">
            {description}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-muted">
          {icon}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   QUICK ACTION
============================================================ */

function QuickAction({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-2xl border border-transparent p-3 transition-all hover:border-border hover:bg-surface"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-muted transition-colors group-hover:text-foreground">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-muted">
          {description}
        </p>
      </div>

      <ArrowRightIcon />
    </Link>
  );
}

/* ============================================================
   ICONS
============================================================ */

function ActivityIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="m7 15 3-3 3 2 5-6" />
    </svg>
  );
}

function TrendingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M3 17 9 11l4 4 8-8" />
      <path d="M15 7h6v6" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M10.3 4.2 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H4v2a4 4 0 0 0 4 4" />
      <path d="M17 6h3v2a4 4 0 0 1-4 4" />
    </svg>
  );
}

function BidIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M12 3v18" />
      <path d="M17 7.5c0-1.7-2.2-3-5-3s-5 1.3-5 3 2.2 3 5 3 5 1.3 5 3-2.2 3-5 3-5-1.3-5-3" />
    </svg>
  );
}

function LockIcon({
  large = false,
}: {
  large?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={large ? "h-7 w-7" : "h-4 w-4"}
      aria-hidden="true"
    >
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
        rx="2"
      />

      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function GavelIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="m14 5 5 5" />
      <path d="m12 7 5 5" />
      <path d="m4 20 8-8" />
      <path d="m3 17 4 4" />
      <path d="m7 4 5 5" />
      <path d="M5 6 3 8l5 5 2-2" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M5 17h14" />
      <path d="m6 17-1-5 2-5h10l2 5-1 5" />
      <path d="M7 12h10" />
      <circle cx="7.5" cy="17.5" r="1.5" />
      <circle cx="16.5" cy="17.5" r="1.5" />
    </svg>
  );
}

function SellIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M12 3v18" />
      <path d="M17 7.5c0-1.7-2.2-3-5-3s-5 1.3-5 3 2.2 3 5 3 5 1.3 5 3-2.2 3-5 3-5-1.3-5-3" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  );
}