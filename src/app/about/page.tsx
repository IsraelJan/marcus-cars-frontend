"use client";

import Link from "next/link";
import { useState } from "react";

export default function AboutPage() {
  const [showContact, setShowContact] = useState(false);

  return (
    <main className="min-h-screen bg-[#080b0d] text-white">
      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative min-h-[680px] overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2400&q=90')",
          }}
        />

        {/* Dark overlays */}
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080b0d] via-[#080b0d]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080b0d] via-transparent to-black/30" />

        <div className="relative z-10 mx-auto flex min-h-[680px] max-w-[1440px] items-center px-6 py-24 lg:px-10">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-lime-300">
              <span className="h-px w-10 bg-lime-300" />
              About Marcus Cars
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              A better way to discover, bid on and buy your next vehicle.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Marcus Cars is a modern U.S. automotive marketplace designed to
              make vehicle discovery, live auctions and buying decisions
              clearer, simpler and more connected.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/vehicles"
                className="inline-flex items-center justify-center rounded-full bg-lime-300 px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-lime-200"
              >
                Explore Vehicles
                <span className="ml-2">→</span>
              </Link>

              <Link
                href="/auctions"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.05] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/[0.1]"
              >
                View Live Auctions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRO
      ========================================================= */}

      <section className="border-b border-white/[0.08]">
        <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-lime-300">
                <span className="h-px w-8 bg-lime-300" />
                Our Mission
              </div>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Make the vehicle journey feel less complicated.
              </h2>
            </div>

            <div className="space-y-5 text-sm leading-8 text-slate-400">
              <p>
                Buying a vehicle can involve searching through countless
                listings, comparing specifications, following auctions,
                understanding bids and eventually making an important
                financial decision.
              </p>

              <p>
                Marcus Cars brings these experiences together in one
                structured platform. Our goal is to give buyers a clearer way
                to discover vehicles, understand listings, participate in
                auctions and manage their activity.
              </p>

              <p>
                The experience is designed around transparency, usability and
                giving customers the information they need before taking the
                next step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TRUST
      ========================================================= */}

      <section className="border-b border-white/[0.08] bg-[#0b0f12]">
        <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-10">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-lime-300">
              <span className="h-px w-8 bg-lime-300" />
              Built Around Trust
            </div>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Confidence should be part of the buying experience.
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-400">
              Every part of Marcus Cars is designed to help customers make
              informed decisions rather than feel pressured into them.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <TrustCard
              number="01"
              title="Clear Vehicle Information"
              text="Review important vehicle details, specifications, mileage, pricing and available images before making a decision."
            />

            <TrustCard
              number="02"
              title="Transparent Auctions"
              text="Follow auction activity, understand your bidding position and keep track of the vehicles you are competing for."
            />

            <TrustCard
              number="03"
              title="Account Control"
              text="Your account brings together saved vehicles, bidding activity, bid history and personal settings in one place."
            />

            <TrustCard
              number="04"
              title="Direct Communication"
              text="When you need more information, Marcus Cars provides clear ways to contact the team about a vehicle or auction."
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW THE PLATFORM WORKS
      ========================================================= */}

      <section className="border-b border-white/[0.08]">
        <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-lime-300">
                <span className="h-px w-8 bg-lime-300" />
                The Marcus Experience
              </div>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Everything connects through your account.
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
                From discovering a vehicle to following an auction, the
                platform is designed to keep your activity organized.
              </p>

              <Link
                href="/how-it-works"
                className="mt-7 inline-flex items-center text-sm font-semibold text-lime-300 transition hover:text-lime-200"
              >
                Learn how it works
                <span className="ml-2">→</span>
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ExperienceCard
                step="01"
                title="Discover"
                text="Browse vehicles by category, specifications and location."
              />

              <ExperienceCard
                step="02"
                title="Save"
                text="Keep vehicles you are interested in within your saved collection."
              />

              <ExperienceCard
                step="03"
                title="Bid"
                text="Participate in eligible live auctions and monitor your position."
              />

              <ExperienceCard
                step="04"
                title="Manage"
                text="Use your account to review activity, bid history and settings."
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PLATFORM FEATURES
      ========================================================= */}

      <section className="border-b border-white/[0.08] bg-[#0b0f12]">
        <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-10">
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.22em] text-lime-300">
              <span className="h-px w-8 bg-lime-300" />
              One Platform
              <span className="h-px w-8 bg-lime-300" />
            </div>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Designed around the complete journey.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400">
              Marcus Cars connects the major steps of vehicle discovery,
              auction participation and account management.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <FeatureCard
              title="Vehicle Marketplace"
              text="Explore available vehicles and open individual listings for detailed information."
              href="/vehicles"
              linkText="Browse vehicles"
            />

            <FeatureCard
              title="Live Auctions"
              text="Follow active auctions, review bidding activity and participate when eligible."
              href="/auctions"
              linkText="View auctions"
            />

            <FeatureCard
              title="Sell Your Car"
              text="Have a vehicle to sell? Start the process through the dedicated seller experience."
              href="/sell"
              linkText="Sell your car"
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          TEAM
      ========================================================= */}

      <section className="border-b border-white/[0.08]">
        <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-lime-300">
                <span className="h-px w-8 bg-lime-300" />
                The People Behind Marcus Cars
              </div>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Real people. Clear communication.
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-400">
                Customers should know who they are communicating with. This
                section is intentionally designed to make the Marcus Cars team
                visible throughout the customer journey.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowContact(true)}
              className="inline-flex w-fit items-center rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold transition hover:bg-white/[0.08]"
            >
              Contact Marcus Cars
              <span className="ml-2">→</span>
            </button>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {/* Replace these placeholders with the actual team members */}
            <TeamCard
              initials="MC"
              name="Marcus Cars Team"
              role="Customer Experience"
              description="Helping customers navigate vehicles, listings and the buying journey."
            />

            <TeamCard
              initials="AU"
              name="Auction Team"
              role="Auctions & Bidding"
              description="Supporting customers throughout the live auction experience."
            />

            <TeamCard
              initials="SA"
              name="Sales & Support"
              role="Vehicle Support"
              description="Available to help customers with vehicle questions and next steps."
            />
          </div>

          <div className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6">
            <p className="text-sm leading-7 text-slate-400">
              <span className="font-semibold text-white">
                Team information:
              </span>{" "}
              Before launch, replace the role-based cards above with the
              actual names, photographs, roles and professional contact
              information of the Marcus Cars team. This will strengthen
              customer trust without presenting invented identities.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          CUSTOMER PROMISE
      ========================================================= */}

      <section className="border-b border-white/[0.08] bg-[#0b0f12]">
        <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-lime-300">
                <span className="h-px w-8 bg-lime-300" />
                Our Promise
              </div>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Give customers the information to make the right decision.
              </h2>
            </div>

            <div className="rounded-3xl border border-white/[0.08] bg-[#101519] p-8">
              <div className="space-y-6">
                <PromiseRow
                  title="Clarity"
                  text="Important information should be easy to find."
                />

                <PromiseRow
                  title="Transparency"
                  text="Customers should understand what they are participating in."
                />

                <PromiseRow
                  title="Accessibility"
                  text="The platform should make it easy to find help when questions arise."
                />

                <PromiseRow
                  title="Control"
                  text="Your account should keep your vehicles, bids and activity organized."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}

      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=2200&q=85')",
          }}
        />

        <div className="absolute inset-0 bg-[#080b0d]/80" />

        <div className="relative mx-auto max-w-[1440px] px-6 py-24 text-center lg:px-10">
          <div className="mx-auto max-w-3xl">
            <div className="mb-5 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.22em] text-lime-300">
              <span className="h-px w-8 bg-lime-300" />
              Start Your Journey
              <span className="h-px w-8 bg-lime-300" />
            </div>

            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Your next vehicle could be closer than you think.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300">
              Explore available vehicles, follow live auctions or learn more
              about how Marcus Cars works.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/vehicles"
                className="inline-flex items-center justify-center rounded-full bg-lime-300 px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-lime-200"
              >
                Browse Vehicles
                <span className="ml-2">→</span>
              </Link>

              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.05] px-7 py-3.5 text-sm font-semibold transition hover:bg-white/[0.1]"
              >
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          QUICK LINKS
      ========================================================= */}

      <section className="border-t border-white/[0.08] bg-[#060809]">
        <div className="mx-auto max-w-[1440px] px-6 py-14 lg:px-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <QuickLink
              title="Vehicles"
              text="Browse available vehicles."
              href="/vehicles"
            />

            <QuickLink
              title="Live Auctions"
              text="See active auctions."
              href="/auctions"
            />

            <QuickLink
              title="How It Works"
              text="Understand the process."
              href="/how-it-works"
            />

            <QuickLink
              title="Sell Your Car"
              text="Start your seller journey."
              href="/sell"
            />
          </div>

          <div className="mt-12 flex flex-col gap-5 border-t border-white/[0.08] pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Marcus Cars. All rights reserved.</p>

            <div className="flex flex-wrap gap-5">
              <Link
                href="/privacy"
                className="transition hover:text-white"
              >
                Privacy
              </Link>

              <Link
                href="/terms"
                className="transition hover:text-white"
              >
                Terms
              </Link>

              <Link
                href="/how-it-works"
                className="transition hover:text-white"
              >
                How It Works
              </Link>

              <button
                type="button"
                onClick={() => setShowContact(true)}
                className="transition hover:text-white"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTACT MODAL
      ========================================================= */}

      {showContact && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-5 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#101519] p-7 shadow-2xl">
            <div className="flex items-start justify-between gap-5">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-lime-300">
                  Marcus Cars
                </div>

                <h3 className="mt-2 text-2xl font-semibold">
                  How can we help?
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Send us your question and the Marcus Cars team can follow up
                  with you.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowContact(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition hover:bg-white/5 hover:text-white"
                aria-label="Close contact form"
              >
                ×
              </button>
            </div>

            <form
              className="mt-7 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                setShowContact(false);
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="First name"
                  className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-lime-300/50"
                  required
                />

                <input
                  type="text"
                  placeholder="Last name"
                  className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-lime-300/50"
                  required
                />
              </div>

              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-lime-300/50"
                required
              />

              <select
                defaultValue=""
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300 outline-none focus:border-lime-300/50"
                required
              >
                <option value="" disabled>
                  What can we help with?
                </option>
                <option value="vehicle">Vehicle question</option>
                <option value="auction">Auction question</option>
                <option value="selling">Selling a vehicle</option>
                <option value="account">Account support</option>
                <option value="other">Something else</option>
              </select>

              <textarea
                rows={5}
                placeholder="Tell us how we can help..."
                className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-lime-300/50"
                required
              />

              <button
                type="submit"
                className="w-full rounded-full bg-lime-300 px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-lime-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function TrustCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#101519] p-6 transition hover:border-lime-300/20">
      <div className="text-xs font-medium text-lime-300">{number}</div>

      <h3 className="mt-8 text-lg font-semibold">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-slate-400">{text}</p>
    </div>
  );
}

function ExperienceCard({
  step,
  title,
  text,
}: {
  step: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#101519] p-7">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
          Step
        </span>

        <span className="text-sm font-medium text-lime-300">{step}</span>
      </div>

      <h3 className="mt-8 text-xl font-semibold">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-slate-400">{text}</p>
    </div>
  );
}

function FeatureCard({
  title,
  text,
  href,
  linkText,
}: {
  title: string;
  text: string;
  href: string;
  linkText: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#101519] p-7">
      <h3 className="text-xl font-semibold">{title}</h3>

      <p className="mt-4 text-sm leading-7 text-slate-400">{text}</p>

      <Link
        href={href}
        className="mt-7 inline-flex items-center text-sm font-semibold text-lime-300 transition hover:text-lime-200"
      >
        {linkText}
        <span className="ml-2">→</span>
      </Link>
    </div>
  );
}

function TeamCard({
  initials,
  name,
  role,
  description,
}: {
  initials: string;
  name: string;
  role: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#101519] p-7">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-lime-300/20 bg-lime-300/10 text-lg font-semibold text-lime-300">
        {initials}
      </div>

      <div className="mt-7">
        <h3 className="text-xl font-semibold">{name}</h3>

        <p className="mt-1 text-xs uppercase tracking-[0.15em] text-lime-300">
          {role}
        </p>

        <p className="mt-4 text-sm leading-7 text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

function PromiseRow({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4 border-b border-white/[0.08] pb-6 last:border-0 last:pb-0">
      <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-lime-300" />

      <div>
        <h3 className="font-semibold">{title}</h3>

        <p className="mt-1 text-sm leading-6 text-slate-400">{text}</p>
      </div>
    </div>
  );
}

function QuickLink({
  title,
  text,
  href,
}: {
  title: string;
  text: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition hover:border-lime-300/20 hover:bg-white/[0.04]"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>

        <span className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-lime-300">
          →
        </span>
      </div>

      <p className="mt-2 text-sm text-slate-500">{text}</p>
    </Link>
  );
}