"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-block text-xl font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
            >
              MARCUS<span className="text-accent">.</span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
              A smarter way to discover vehicles, follow auctions, and bid in
              real time.
            </p>

            <p className="mt-5 text-sm font-medium text-foreground">
              Find it. Follow it. Win it.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Company
            </h3>

            <nav className="mt-5 flex flex-col gap-3">
              <Link
                href="/about"
                className="w-fit text-sm text-muted transition-colors hover:text-foreground"
              >
                About Marcus
              </Link>

              <Link
                href="/team"
                className="w-fit text-sm text-muted transition-colors hover:text-foreground"
              >
                Meet the Team
              </Link>

              <Link
                href="/careers"
                className="w-fit text-sm text-muted transition-colors hover:text-foreground"
              >
                Careers
              </Link>
            </nav>
          </div>

          {/* Auctions */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Auctions
            </h3>

            <nav className="mt-5 flex flex-col gap-3">
              <Link
                href="/auctions"
                className="w-fit text-sm text-muted transition-colors hover:text-foreground"
              >
                Live Auctions
              </Link>

              <Link
                href="/auctions#upcoming"
                className="w-fit text-sm text-muted transition-colors hover:text-foreground"
              >
                Upcoming Auctions
              </Link>

              <Link
                href="/vehicles"
                className="w-fit text-sm text-muted transition-colors hover:text-foreground"
              >
                Browse Vehicles
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Support
            </h3>

            <nav className="mt-5 flex flex-col gap-3">
              <Link
                href="/help"
                className="w-fit text-sm text-muted transition-colors hover:text-foreground"
              >
                Help Center
              </Link>

              <button
                type="button"
                className="w-fit text-left text-sm text-muted transition-colors hover:text-foreground"
              >
                Contact Us
              </button>

              <a
                href="mailto:info@marcuscars.com"
                className="w-fit text-sm text-muted transition-colors hover:text-foreground"
              >
                info@marcuscars.com
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-5 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <span>© 2026 Marcus Cars</span>

            <span className="hidden text-border sm:inline">•</span>

            <span>United States</span>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-foreground"
            >
              Terms
            </Link>

            <Link
              href="/auction-rules"
              className="transition-colors hover:text-foreground"
            >
              Auction Rules
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}