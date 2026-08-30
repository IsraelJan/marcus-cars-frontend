"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { vehicles, type Vehicle } from "@/data/vehicles";

/* ============================================================
   ICONS
============================================================ */

function ArrowRightIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function HeartIcon({ size = 18, filled = false }: { size?: number; filled?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.8 8.8c0 5.2-8.8 10.2-8.8 10.2S3.2 14 3.2 8.8A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.7Z" />
    </svg>
  );
}

function TrashIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 7h16" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M6 7l1 13h10l1-13" />
      <path d="M9 7V4h6v3" />
    </svg>
  );
}

function ActivityIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12h4l2-7 4 14 2-7h4" />
    </svg>
  );
}

function ClockIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function UserIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-3.4 3.2-5.2 7-5.2s6.2 1.8 7 5.2" />
    </svg>
  );
}

function SettingsIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V20h-2.6v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H6V11.4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1L9 6.6l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V5h2.6v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1V13h-.1a1.7 1.7 0 0 0-1.5 1Z" />
    </svg>
  );
}

/* ============================================================
   ACCOUNT NAVIGATION
============================================================ */

function AccountNavLink({
  href,
  label,
  active = false,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={[
        "whitespace-nowrap rounded-xl px-4 py-2.5 text-sm transition-colors",
        active
          ? "bg-[#c7ff32] text-black"
          : "text-white/50 hover:bg-white/[0.05] hover:text-white",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

/* ============================================================
   VEHICLE CARD
============================================================ */

function SavedVehicleCard({
  vehicle,
  onRemove,
}: {
  vehicle: Vehicle;
  onRemove: (id: number) => void;
}) {
  const [imageIndex, setImageIndex] = useState(0);

  const image = vehicle.images[imageIndex] ?? vehicle.images[0];

  function nextImage(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (vehicle.images.length <= 1) return;

    setImageIndex((current) => (current + 1) % vehicle.images.length);
  }

  function previousImage(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (vehicle.images.length <= 1) return;

    setImageIndex(
      (current) =>
        (current - 1 + vehicle.images.length) % vehicle.images.length,
    );
  }

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b0f11]">
      {/* IMAGE */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#080b0d]">
        <Link
          href={`/vehicles/${vehicle.id}`}
          aria-label={`View ${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className="block h-full w-full"
        >
          <img
            src={image}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          />
        </Link>

        {/* SAVED BADGE */}
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/65 px-3 py-1.5 text-xs text-white backdrop-blur-md">
          <HeartIcon size={14} filled />
          Saved
        </div>

        {/* REMOVE */}
        <button
          type="button"
          onClick={() => onRemove(vehicle.id)}
          aria-label={`Remove ${vehicle.make} ${vehicle.model} from saved vehicles`}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/65 text-white/65 backdrop-blur-md transition hover:bg-black hover:text-white"
        >
          <TrashIcon />
        </button>

        {/* IMAGE CONTROLS */}
        {vehicle.images.length > 1 && (
          <>
            <button
              type="button"
              onClick={previousImage}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100"
            >
              ←
            </button>

            <button
              type="button"
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100"
            >
              →
            </button>
          </>
        )}

        {/* IMAGE INDICATORS */}
        {vehicle.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {vehicle.images.map((_, index) => (
              <span
                key={`${vehicle.id}-image-${index}`}
                className={[
                  "h-1.5 rounded-full transition-all",
                  index === imageIndex
                    ? "w-5 bg-white"
                    : "w-1.5 bg-white/45",
                ].join(" ")}
              />
            ))}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs text-white/35">
              {vehicle.year} · {vehicle.category}
            </p>

            <Link
              href={`/vehicles/${vehicle.id}`}
              className="mt-1 block text-lg font-semibold tracking-[-0.02em] text-white transition hover:text-[#c7ff32]"
            >
              {vehicle.make} {vehicle.model}
            </Link>

            <p className="mt-1 text-sm text-white/45">
              {vehicle.trim}
            </p>
          </div>

          <p className="shrink-0 text-base font-semibold text-white">
            {formatCurrency(vehicle.price)}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-white/[0.07] pt-4">
          <VehicleMeta label="Mileage" value={`${vehicle.mileage.toLocaleString()} mi`} />
          <VehicleMeta label="Location" value={vehicle.location} />
          <VehicleMeta label="Fuel" value={vehicle.fuel} />
          <VehicleMeta label="Drive" value={vehicle.drivetrain} />
        </div>

        <div className="mt-5 flex items-center gap-3">
          <Link
            href={`/vehicles/${vehicle.id}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#c7ff32] px-4 py-3 text-sm font-semibold text-black transition hover:brightness-105"
          >
            View Vehicle
            <ArrowRightIcon size={15} />
          </Link>

          <Link
            href={`/vehicles/${vehicle.id}`}
            className="rounded-xl border border-white/[0.09] px-4 py-3 text-sm text-white/65 transition hover:bg-white/[0.04] hover:text-white"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}

function VehicleMeta({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.14em] text-white/25">
        {label}
      </p>
      <p className="mt-1 text-xs text-white/65">{value}</p>
    </div>
  );
}

/* ============================================================
   CONTACT FORM
============================================================ */

type ContactForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vehicleId: string;
  message: string;
};

const initialForm: ContactForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  vehicleId: "",
  message: "",
};

/* ============================================================
   HELPERS
============================================================ */

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

/* ============================================================
   PAGE
============================================================ */

export default function SavedVehiclesPage() {
  /*
   * For the MVP we use the vehicles already defined in
   * src/data/vehicles.ts.
   *
   * This keeps every vehicle ID consistent with:
   * /vehicles/[id]
   *
   * Later, this can be replaced with authenticated user data
   * from Supabase/database without changing the card structure.
   */
  const [savedIds, setSavedIds] = useState<number[]>([1, 2, 5, 8]);

  const [form, setForm] = useState<ContactForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const savedVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => savedIds.includes(vehicle.id));
  }, [savedIds]);

  function removeVehicle(id: number) {
    setSavedIds((current) => current.filter((vehicleId) => vehicleId !== id));

    if (form.vehicleId === id.toString()) {
      setForm((current) => ({
        ...current,
        vehicleId: "",
      }));
    }
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    /*
     * Backend/email integration can be added later.
     * For now we only confirm the submission in the UI.
     */
    setSubmitted(true);

    setForm(initialForm);
  }

  function handleChange(
    field: keyof ContactForm,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (submitted) {
      setSubmitted(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#07090a] text-white">
      {/* ========================================================
          MAIN CONTAINER
      ========================================================= */}
      <div className="mx-auto w-full max-w-7xl px-5 pb-20 pt-28 sm:px-8 lg:px-10">
        {/* ======================================================
            BREADCRUMB
        ====================================================== */}
        <div className="mb-6 flex items-center gap-2 text-xs text-white/30">
          <Link
            href="/account"
            className="transition hover:text-white/70"
          >
            Account
          </Link>

          <span>/</span>

          <span className="text-white/60">
            Saved Vehicles
          </span>
        </div>

        {/* ======================================================
            PAGE HEADER
        ====================================================== */}
        <header className="max-w-2xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c7ff32]">
            Your Garage
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Saved Vehicles
          </h1>

          <p className="mt-3 text-sm leading-6 text-white/45">
            Keep track of vehicles you're interested in and come
            back to them whenever you're ready.
          </p>
        </header>

        {/* ======================================================
            ACCOUNT NAVIGATION
        ====================================================== */}
        <section className="mt-8 overflow-x-auto">
          <div className="flex min-w-max items-center gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.015] p-2">
            <AccountNavLink
              href="/account"
              label="My Activity"
            />

            <AccountNavLink
              href="/account/saved-vehicles"
              label="Saved Vehicles"
              active
            />

            <AccountNavLink
              href="/account/bid-history"
              label="Bid History"
            />

            <AccountNavLink
              href="/account/profile"
              label="Profile"
            />

            <AccountNavLink
              href="/account/settings"
              label="Settings"
            />
          </div>
        </section>

        {/* ======================================================
            SUMMARY
        ====================================================== */}
        <section className="mt-8 grid gap-3 sm:grid-cols-3">
          <SummaryCard
            label="Saved"
            value={savedVehicles.length.toString()}
            description="Vehicles you're watching"
            icon={<HeartIcon size={17} />}
          />

          <SummaryCard
            label="Auctions"
            value="Live"
            description="Explore current auctions"
            icon={<ActivityIcon size={17} />}
          />

          <SummaryCard
            label="Bids"
            value="View"
            description="Review your bid history"
            icon={<ClockIcon size={17} />}
          />
        </section>

        {/* ======================================================
            SAVED VEHICLES
        ====================================================== */}
        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
                Collection
              </p>

              <h2 className="mt-1 text-xl font-semibold tracking-[-0.02em]">
                Vehicles you've saved
              </h2>
            </div>

            <Link
              href="/vehicles"
              className="hidden items-center gap-2 text-xs text-white/45 transition hover:text-white sm:flex"
            >
              Browse vehicles
              <ArrowRightIcon size={14} />
            </Link>
          </div>

          {savedVehicles.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {savedVehicles.map((vehicle) => (
                <SavedVehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onRemove={removeVehicle}
                />
              ))}
            </div>
          ) : (
            <EmptySavedState />
          )}
        </section>

        {/* ======================================================
            AUCTION CTA
        ====================================================== */}
        <section className="mt-10 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b0f11]">
          <div className="grid lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="p-6 sm:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#c7ff32]">
                Looking for something else?
              </p>

              <h2 className="mt-2 text-xl font-semibold tracking-[-0.02em]">
                Browse the live marketplace
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/40">
                Explore available vehicles or see what is currently
                coming up in auction.
              </p>
            </div>

            <div className="flex flex-col gap-3 p-6 pt-0 sm:flex-row lg:p-8">
              <Link
                href="/vehicles"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.09] px-5 py-3 text-sm text-white/70 transition hover:bg-white/[0.04] hover:text-white"
              >
                Browse Vehicles
                <ArrowRightIcon size={15} />
              </Link>

              <Link
                href="/auctions"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#c7ff32] px-5 py-3 text-sm font-semibold text-black transition hover:brightness-105"
              >
                Live Auctions
                <ArrowRightIcon size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* ======================================================
            CONTACT FORM
        ====================================================== */}
        <section className="mt-10">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            {/* LEFT */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#c7ff32]">
                Need help?
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
                Ask about a saved vehicle
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-white/40">
                Have a question about availability, condition,
                pricing, inspection or the buying process? Send
                our team a message.
              </p>

              <div className="mt-6 space-y-4">
                <ContactPoint
                  icon={<HeartIcon size={16} />}
                  title="Vehicle interest"
                  description="Tell us which saved vehicle you're considering."
                />

                <ContactPoint
                  icon={<ActivityIcon size={16} />}
                  title="Auction support"
                  description="Ask about bidding, auction timing or requirements."
                />

                <ContactPoint
                  icon={<UserIcon size={16} />}
                  title="Buying assistance"
                  description="Our team can help you understand the next step."
                />
              </div>
            </div>

            {/* FORM */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0b0f11] p-6 sm:p-8">
              {submitted ? (
                <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c7ff32] text-black">
                    ✓
                  </div>

                  <h3 className="mt-5 text-xl font-semibold">
                    Message received
                  </h3>

                  <p className="mt-2 max-w-sm text-sm leading-6 text-white/40">
                    Thanks for reaching out. A member of the Marcus
                    Cars team will review your request.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 rounded-xl border border-white/[0.09] px-5 py-3 text-sm text-white/70 transition hover:bg-white/[0.04] hover:text-white"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
                      Contact Marcus Cars
                    </p>

                    <h3 className="mt-1 text-lg font-semibold">
                      How can we help?
                    </h3>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      label="First name"
                      value={form.firstName}
                      onChange={(value) =>
                        handleChange("firstName", value)
                      }
                      required
                    />

                    <FormField
                      label="Last name"
                      value={form.lastName}
                      onChange={(value) =>
                        handleChange("lastName", value)
                      }
                      required
                    />

                    <FormField
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={(value) =>
                        handleChange("email", value)
                      }
                      required
                    />

                    <FormField
                      label="Phone"
                      type="tel"
                      value={form.phone}
                      onChange={(value) =>
                        handleChange("phone", value)
                      }
                    />
                  </div>

                  {/* VEHICLE SELECT */}
                  <div className="mt-4">
                    <label
                      htmlFor="savedVehicle"
                      className="mb-2 block text-xs text-white/45"
                    >
                      Vehicle
                    </label>

                    <select
                      id="savedVehicle"
                      value={form.vehicleId}
                      onChange={(event) =>
                        handleChange(
                          "vehicleId",
                          event.target.value,
                        )
                      }
                      className="w-full rounded-xl border border-white/[0.09] bg-[#080b0d] px-4 py-3 text-sm text-white outline-none transition focus:border-[#c7ff32]/50"
                    >
                      <option value="">
                        Select a saved vehicle
                      </option>

                      {savedVehicles.map((vehicle) => (
                        <option
                          key={vehicle.id}
                          value={vehicle.id}
                        >
                          {vehicle.year} {vehicle.make}{" "}
                          {vehicle.model} —{" "}
                          {formatCurrency(vehicle.price)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* MESSAGE */}
                  <div className="mt-4">
                    <label
                      htmlFor="message"
                      className="mb-2 block text-xs text-white/45"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      value={form.message}
                      onChange={(event) =>
                        handleChange(
                          "message",
                          event.target.value,
                        )
                      }
                      required
                      rows={5}
                      placeholder="Tell us what you'd like to know..."
                      className="w-full resize-none rounded-xl border border-white/[0.09] bg-[#080b0d] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-[#c7ff32]/50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#c7ff32] px-5 py-3.5 text-sm font-semibold text-black transition hover:brightness-105"
                  >
                    Send Message
                    <ArrowRightIcon size={15} />
                  </button>

                  <p className="mt-3 text-center text-[11px] leading-5 text-white/25">
                    We&apos;ll use your contact details only to
                    respond to this enquiry.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ============================================================
   SUMMARY CARD
============================================================ */

function SummaryCard({
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
    <div className="rounded-2xl border border-white/[0.08] bg-[#0b0f11] p-5">
      <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] text-white/55">
        {icon}
      </div>

      <p className="text-xs text-white/35">
        {label}
      </p>

      <p className="mt-1 text-2xl font-semibold tracking-[-0.03em]">
        {value}
      </p>

      <p className="mt-1 text-xs text-white/30">
        {description}
      </p>
    </div>
  );
}

/* ============================================================
   CONTACT POINT
============================================================ */

function ContactPoint({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] text-white/50">
        {icon}
      </div>

      <div>
        <p className="text-sm font-medium text-white/75">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-white/30">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   FORM FIELD
============================================================ */

function FormField({
  label,
  type = "text",
  value,
  onChange,
  required = false,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs text-white/45"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="w-full rounded-xl border border-white/[0.09] bg-[#080b0d] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-[#c7ff32]/50"
      />
    </div>
  );
}

/* ============================================================
   EMPTY STATE
============================================================ */

function EmptySavedState() {
  return (
    <div className="rounded-2xl border border-dashed border-white/[0.1] bg-[#0b0f11] px-6 py-16 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.08] text-white/35">
        <HeartIcon size={20} />
      </div>

      <h3 className="mt-5 text-lg font-semibold">
        No saved vehicles yet
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/35">
        When you find a vehicle you like, save it here so you
        can easily return to it later.
      </p>

      <Link
        href="/vehicles"
        className="mx-auto mt-6 inline-flex items-center gap-2 rounded-xl bg-[#c7ff32] px-5 py-3 text-sm font-semibold text-black transition hover:brightness-105"
      >
        Browse Vehicles
        <ArrowRightIcon size={15} />
      </Link>
    </div>
  );
}