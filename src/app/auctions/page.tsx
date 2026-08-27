import Link from "next/link";

export default function AuctionsPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-32">
      <div className="mx-auto max-w-7xl">

        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
            Marcus Cars
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Live Auctions
          </h1>

          <p className="mt-5 text-base leading-7 text-muted">
            Live vehicle auctions will appear here. This page is
            currently being built as part of the Marcus Cars
            auction experience.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:brightness-105"
          >
            Back to Home
          </Link>
        </div>

      </div>
    </main>
  );
}