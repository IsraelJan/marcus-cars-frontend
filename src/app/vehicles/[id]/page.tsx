"use client";

import Link from "next/link";
import { use, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { getVehicleById, vehicles } from "@/data/vehicles";

/*
|--------------------------------------------------------------------------
| HELPERS
|--------------------------------------------------------------------------
*/

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatMileage(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

/*
|--------------------------------------------------------------------------
| ICON
|--------------------------------------------------------------------------
*/

function Icon({
  children,
  className = "h-5 w-5",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/*
|--------------------------------------------------------------------------
| INFO ROW
|--------------------------------------------------------------------------
*/

function InfoRow({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-muted">{label}</span>

      <span
        className={`text-right text-sm font-medium ${
          accent ? "text-accent" : "text-foreground"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| QUICK SPEC
|--------------------------------------------------------------------------
*/

function QuickSpec({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-border p-5 sm:border-b-0 sm:border-l first:sm:border-l-0">
      <p className="text-xs text-muted">{label}</p>

      <p className="mt-2 text-sm font-medium text-foreground">
        {value}
      </p>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| SPEC CARD
|--------------------------------------------------------------------------
*/

function SpecCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <p className="text-xs text-muted">{label}</p>

      <p className="mt-2 break-words text-sm font-medium leading-5 text-foreground">
        {value}
      </p>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| PAGE
|--------------------------------------------------------------------------
*/

export default function VehicleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  /*
  |--------------------------------------------------------------------------
  | GET ID FROM /vehicles/[id]
  |--------------------------------------------------------------------------
  |
  | Example:
  |
  | /vehicles/1
  |
  | gives:
  |
  | id = "1"
  |
  | We then use the SAME data source as /vehicles/page.tsx:
  |
  | src/data/vehicles.ts
  |
  */

  const { id } = use(params);

  /*
  |--------------------------------------------------------------------------
  | FIND VEHICLE FROM CENTRAL DATA SOURCE
  |--------------------------------------------------------------------------
  |
  | IMPORTANT:
  |
  | Do NOT create another vehicles array here.
  |
  | The vehicle ID comes directly from the URL and is matched against
  | the IDs inside src/data/vehicles.ts.
  |
  */

  const vehicle = getVehicleById(id);

  /*
  |--------------------------------------------------------------------------
  | STATE
  |--------------------------------------------------------------------------
  */

  const [selectedImage, setSelectedImage] = useState(0);

  const [saved, setSaved] = useState(false);

  const [showContact, setShowContact] = useState(false);

  const [contactType, setContactType] = useState<
    "availability" | "question"
  >("availability");

  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferredContact: "Email",
    message: "",
  });

  /*
  |--------------------------------------------------------------------------
  | VEHICLE NOT FOUND
  |--------------------------------------------------------------------------
  |
  | This check happens BEFORE anything below uses vehicle.
  |
  | TypeScript now knows that vehicle exists after this point.
  |
  */

  if (!vehicle) {
    return (
      <main className="min-h-screen bg-background px-5 pb-20 pt-28 text-foreground sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/vehicles"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <Icon className="h-4 w-4">
              <path d="m15 18-6-6 6-6" />
            </Icon>

            Back to Vehicles
          </Link>

          <div className="mt-10 rounded-3xl border border-border bg-surface p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-surface-light text-muted">
              <Icon className="h-6 w-6">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </Icon>
            </div>

            <h1 className="mt-5 text-2xl font-semibold">
              Vehicle not found
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
              We could not find a vehicle matching ID{" "}
              <span className="font-medium text-foreground">
                {id}
              </span>
              .
            </p>

            <Link
              href="/vehicles"
              className="mt-7 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:brightness-105"
            >
              Browse Vehicles
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | GALLERY
  |--------------------------------------------------------------------------
  |
  | vehicle has already been narrowed above.
  |
  */

  const gallery =
    vehicle.images.length > 0 ? vehicle.images : [];

  /*
  |--------------------------------------------------------------------------
  | FORM HANDLERS
  |--------------------------------------------------------------------------
  */

  function openAvailability() {
    setContactType("availability");
    setSubmitted(false);

    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      preferredContact: "Email",
      message: `I would like to check the availability of the this model.`,
    });

    setShowContact(true);
  }

  function openQuestion() {
    setContactType("question");
    setSubmitted(false);

    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      preferredContact: "Email",
      message: `I'm interested in the vehicle.`,
    });

    setShowContact(true);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  function closeContact() {
    setShowContact(false);
    setSubmitted(false);
  }

  /*
  |--------------------------------------------------------------------------
  | RETURN
  |--------------------------------------------------------------------------
  */

  return (
    <main className="min-h-screen bg-background pb-24 pt-20 text-foreground sm:pt-24">

      {/* ============================================================
          TOP BAR
      ============================================================ */}

      <div className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">

          <Link
            href="/vehicles"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <Icon className="h-4 w-4">
              <path d="m15 18-6-6 6-6" />
            </Icon>

            Back to Vehicles
          </Link>

          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />

            Available for sale
          </div>
        </div>
      </div>

      {/* ============================================================
          VEHICLE INTRO
      ============================================================ */}

      <section className="mx-auto max-w-7xl px-5 pt-7 sm:px-6 lg:px-8">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <div className="flex flex-wrap items-center gap-2">

              <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent">
                For Sale
              </span>

              <span className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted">
                {vehicle.category}
              </span>

              {vehicle.fuel === "Electric" && (
                <span className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted">
                  Electric
                </span>
              )}

              {vehicle.popular && (
                <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground">
                  Popular
                </span>
              )}

            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h1>

            <p className="mt-2 text-sm text-muted">
              {vehicle.trim} · {vehicle.location}
            </p>

          </div>

          <button
            type="button"
            onClick={() => setSaved((current) => !current)}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium transition hover:border-foreground/30"
          >
            <Icon className="h-4 w-4">
              <path
                d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.3a4.7 4.7 0 0 1 8.8 2.4Z"
                fill={saved ? "currentColor" : "none"}
              />
            </Icon>

            {saved ? "Saved" : "Save Vehicle"}
          </button>

        </div>
      </section>

      {/* ============================================================
          MAIN VEHICLE
      ============================================================ */}

      <section className="mx-auto max-w-7xl px-5 pt-7 sm:px-6 lg:px-8">

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_380px]">

          {/* ========================================================
              GALLERY
          ======================================================== */}

          <div className="min-w-0">

            <div className="overflow-hidden rounded-3xl border border-border bg-surface">

              <div className="relative aspect-[16/10] overflow-hidden bg-surface-light">

                {gallery.length > 0 ? (
                  <img
                    src={gallery[selectedImage]}
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted">
                    Vehicle image unavailable
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent p-5">

                  <div className="flex items-end justify-between gap-4">

                    <div>
                      <p className="text-xs text-white/65">
                        Vehicle photography
                      </p>

                      <p className="mt-1 text-sm font-medium text-white">
                        {gallery.length > 0
                          ? `${selectedImage + 1} / ${gallery.length}`
                          : "No images"}
                      </p>
                    </div>

                    <span className="rounded-full bg-black/45 px-3 py-1.5 text-xs text-white backdrop-blur-md">
                      {vehicle.location}
                    </span>

                  </div>
                </div>

                {gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedImage((current) =>
                          current === 0
                            ? gallery.length - 1
                            : current - 1,
                        )
                      }
                      aria-label="Previous vehicle image"
                      className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition hover:bg-black/70"
                    >
                      ←
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedImage((current) =>
                          current === gallery.length - 1
                            ? 0
                            : current + 1,
                        )
                      }
                      aria-label="Next vehicle image"
                      className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition hover:bg-black/70"
                    >
                      →
                    </button>
                  </>
                )}

              </div>
            </div>

            {gallery.length > 1 && (
              <div className="mt-3 flex gap-3 overflow-x-auto pb-1">

                {gallery.map((image, index) => (
                  <button
                    key={`${vehicle.id}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    aria-label={`View vehicle image ${index + 1}`}
                    className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border transition ${
                      selectedImage === index
                        ? "border-accent ring-1 ring-accent"
                        : "border-border hover:border-foreground/30"
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}

              </div>
            )}

          </div>

          {/* ========================================================
              BUY / AVAILABILITY CARD
          ======================================================== */}

          <aside className="h-fit rounded-3xl border border-border bg-surface p-6 lg:sticky lg:top-28">

            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
              Asking price
            </p>

            <p className="mt-2 text-4xl font-semibold tracking-tight">
              {formatCurrency(vehicle.price)}
            </p>

            <p className="mt-2 text-sm text-muted">
              Price shown in USD
            </p>

            <div className="my-6 h-px bg-border" />

            <div className="space-y-4">

              <InfoRow
                label="Mileage"
                value={`${formatMileage(vehicle.mileage)} mi`}
              />

              <InfoRow
                label="Location"
                value={vehicle.location}
              />

              <InfoRow
                label="Stock"
                value={vehicle.stockNumber}
              />

              <InfoRow
                label="Availability"
                value="Available"
                accent
              />

            </div>

            <div className="mt-7 space-y-3">

              <button
                type="button"
                onClick={openAvailability}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition hover:brightness-105"
              >
                Check Availability
                <span>→</span>
              </button>

              <button
                type="button"
                onClick={openQuestion}
                className="flex w-full items-center justify-center rounded-full border border-border bg-background px-6 py-3.5 text-sm font-medium transition hover:border-foreground/25 hover:bg-surface-light"
              >
                Ask About This Vehicle
              </button>

            </div>

            <div className="mt-6 border-t border-border pt-5">

              <p className="text-xs leading-5 text-muted">
                Availability can change. Confirm availability before
                arranging payment, inspection or collection.
              </p>

            </div>

          </aside>

        </div>
      </section>

      {/* ============================================================
          QUICK SPECS
      ============================================================ */}

      <section className="mx-auto max-w-7xl px-5 pt-12 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-border bg-surface sm:grid-cols-4">

          <QuickSpec
            label="Mileage"
            value={`${formatMileage(vehicle.mileage)} mi`}
          />

          <QuickSpec
            label="Powertrain"
            value={vehicle.fuel}
          />

          <QuickSpec
            label="Transmission"
            value={vehicle.transmission}
          />

          <QuickSpec
            label="Drivetrain"
            value={vehicle.drivetrain}
          />

        </div>
      </section>

      {/* ============================================================
          ABOUT VEHICLE
      ============================================================ */}

      <section className="mx-auto max-w-7xl px-5 pt-14 sm:px-6 lg:px-8">

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

          <div>

            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              About this vehicle
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              A closer look at the {vehicle.make} {vehicle.model}.
            </h2>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-muted sm:text-base">
              {vehicle.description}
            </p>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted sm:text-base">
              {vehicle.condition}
            </p>

          </div>

          <div className="rounded-3xl border border-border bg-surface p-6">

            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
              Vehicle information
            </p>

            <div className="mt-5 space-y-4">

              <InfoRow
                label="Exterior"
                value={vehicle.exterior}
              />

              <InfoRow
                label="Interior"
                value={vehicle.interior}
              />

              <InfoRow
                label="Seats"
                value={vehicle.seats.toString()}
              />

              <InfoRow
                label="Body type"
                value={vehicle.category}
              />

              <InfoRow
                label="Fuel"
                value={vehicle.fuel}
              />

              <InfoRow
                label="Stock"
                value={vehicle.stockNumber}
              />

            </div>

          </div>

        </div>
      </section>

      {/* ============================================================
          FULL SPECIFICATIONS
      ============================================================ */}

      <section className="mx-auto max-w-7xl px-5 pt-14 sm:px-6 lg:px-8">

        <div className="border-t border-border pt-12">

          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Specifications
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Vehicle details
          </h2>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            <SpecCard
              label="Vehicle ID"
              value={vehicle.id.toString()}
            />

            <SpecCard
              label="Year"
              value={vehicle.year.toString()}
            />

            <SpecCard
              label="Make"
              value={vehicle.make}
            />

            <SpecCard
              label="Model"
              value={vehicle.model}
            />

            <SpecCard
              label="Trim"
              value={vehicle.trim}
            />

            <SpecCard
              label="Mileage"
              value={`${formatMileage(vehicle.mileage)} mi`}
            />

            <SpecCard
              label="Transmission"
              value={vehicle.transmission}
            />

            <SpecCard
              label="Drivetrain"
              value={vehicle.drivetrain}
            />

            <SpecCard
              label="Fuel"
              value={vehicle.fuel}
            />

            <SpecCard
              label="Exterior"
              value={vehicle.exterior}
            />

            <SpecCard
              label="Interior"
              value={vehicle.interior}
            />

            <SpecCard
              label="Seats"
              value={vehicle.seats.toString()}
            />

            <SpecCard
              label="Body Type"
              value={vehicle.category}
            />

            <SpecCard
              label="Location"
              value={vehicle.location}
            />

            <SpecCard
              label="VIN"
              value={vehicle.vin}
            />

            <SpecCard
              label="Stock Number"
              value={vehicle.stockNumber}
            />

            <SpecCard
              label="Price"
              value={formatCurrency(vehicle.price)}
            />

          </div>
        </div>
      </section>

      {/* ============================================================
          BUYER CONFIDENCE
      ============================================================ */}

      <section className="mx-auto max-w-7xl px-5 pt-14 sm:px-6 lg:px-8">

        <div className="rounded-3xl border border-accent/15 bg-accent/[0.04] p-6 sm:p-8">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div className="max-w-2xl">

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Marcus Cars
              </p>

              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                Interested in this vehicle?
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted">
                Review the specifications, confirm availability and
                contact the Marcus Cars team about this vehicle before
                making your purchase decision.
              </p>

            </div>

            <div className="grid grid-cols-3 gap-3">

              <div className="rounded-2xl border border-border bg-surface px-4 py-4 text-center">
                <p className="text-sm font-semibold">
                  For Sale
                </p>

                <p className="mt-1 text-[11px] text-muted">
                  Status
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface px-4 py-4 text-center">
                <p className="text-sm font-semibold">
                  {vehicle.location}
                </p>

                <p className="mt-1 text-[11px] text-muted">
                  Location
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface px-4 py-4 text-center">
                <p className="text-sm font-semibold">
                  USD
                </p>

                <p className="mt-1 text-[11px] text-muted">
                  Pricing
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ============================================================
          CONTACT MODAL
      ============================================================ */}

      {showContact && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 px-4 py-6 backdrop-blur-md"
          onClick={closeContact}
        >

          <div
            className="my-auto w-full max-w-lg rounded-3xl border border-border bg-background p-6 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >

            {!submitted ? (
              <>

                {/* MODAL HEADER */}

                <div className="flex items-start justify-between gap-5">

                  <div>

                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
                      {contactType === "availability"
                        ? "Check availability"
                        : "Ask about this vehicle"}
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </h2>

                    <p className="mt-1 text-sm text-muted">
                      {vehicle.trim}
                    </p>

                    <p className="mt-1 text-sm text-muted">
                      {formatCurrency(vehicle.price)} ·{" "}
                      {vehicle.location}
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={closeContact}
                    aria-label="Close"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted transition hover:bg-surface hover:text-foreground"
                  >
                    ×
                  </button>

                </div>

                {/* VEHICLE SUMMARY */}

                <div className="mt-5 rounded-2xl border border-border bg-surface p-4">

                  <div className="flex items-center justify-between gap-4">

                    <div>

                      <p className="text-xs text-muted">
                        Vehicle
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        {vehicle.year} {vehicle.make}{" "}
                        {vehicle.model}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-xs text-muted">
                        Stock
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        {vehicle.stockNumber}
                      </p>

                    </div>

                  </div>
                </div>

                {/* FORM */}

                <form
                  onSubmit={handleSubmit}
                  className="mt-6 space-y-4"
                >

                  <div className="grid gap-4 sm:grid-cols-2">

                    <div>

                      <label
                        htmlFor="firstName"
                        className="mb-1.5 block text-xs font-medium text-muted"
                      >
                        First name
                      </label>

                      <input
                        id="firstName"
                        type="text"
                        required
                        value={form.firstName}
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            firstName: event.target.value,
                          }))
                        }
                        placeholder="First name"
                        className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm outline-none transition focus:border-accent"
                      />

                    </div>

                    <div>

                      <label
                        htmlFor="lastName"
                        className="mb-1.5 block text-xs font-medium text-muted"
                      >
                        Last name
                      </label>

                      <input
                        id="lastName"
                        type="text"
                        required
                        value={form.lastName}
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            lastName: event.target.value,
                          }))
                        }
                        placeholder="Last name"
                        className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm outline-none transition focus:border-accent"
                      />

                    </div>

                  </div>

                  <div>

                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-xs font-medium text-muted"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          email: event.target.value,
                        }))
                      }
                      placeholder="you@example.com"
                      className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm outline-none transition focus:border-accent"
                    />

                  </div>

                  <div>

                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-xs font-medium text-muted"
                    >
                      Phone number
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          phone: event.target.value,
                        }))
                      }
                      placeholder="+1 (555) 000-0000"
                      className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm outline-none transition focus:border-accent"
                    />

                  </div>

                  <div>

                    <label
                      htmlFor="preferredContact"
                      className="mb-1.5 block text-xs font-medium text-muted"
                    >
                      Preferred contact
                    </label>

                    <select
                      id="preferredContact"
                      value={form.preferredContact}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          preferredContact: event.target.value,
                        }))
                      }
                      className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm outline-none focus:border-accent"
                    >
                      <option value="Email">
                        Email
                      </option>

                      <option value="Phone">
                        Phone
                      </option>

                      <option value="Either">
                        Either
                      </option>
                    </select>

                  </div>

                  <div>

                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-xs font-medium text-muted"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={form.message}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          message: event.target.value,
                        }))
                      }
                      className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm leading-6 outline-none transition focus:border-accent"
                    />

                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition hover:brightness-105"
                  >

                    {contactType === "availability"
                      ? "Check Availability"
                      : "Send Enquiry"}

                    <span>→</span>

                  </button>

                  <p className="text-center text-xs leading-5 text-muted">
                    Your request is tied to vehicle{" "}
                    {vehicle.stockNumber}.
                  </p>

                </form>
              </>
            ) : (
              /* ======================================================
                 SUCCESS STATE
              ====================================================== */

              <div className="py-8 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl text-accent-foreground">
                  ✓
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Request received
                </p>

                <h2 className="mt-3 text-2xl font-semibold">
                  Thanks, {form.firstName}.
                </h2>

                <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted">
                  Your request for the{" "}
                  <span className="font-medium text-foreground">
                    {vehicle.year} {vehicle.make}{" "}
                    {vehicle.model}
                  </span>{" "}
                  has been recorded.
                </p>

                <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-border bg-surface p-4 text-left">

                  <InfoRow
                    label="Vehicle"
                    value={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  />

                  <div className="my-3 h-px bg-border" />

                  <InfoRow
                    label="Stock"
                    value={vehicle.stockNumber}
                  />

                  <div className="my-3 h-px bg-border" />

                  <InfoRow
                    label="Location"
                    value={vehicle.location}
                  />

                </div>

                <p className="mx-auto mt-5 max-w-md text-xs leading-5 text-muted">
                  A Marcus Cars representative can follow up using
                  your preferred contact method to confirm availability
                  and discuss the next steps.
                </p>

                <button
                  type="button"
                  onClick={closeContact}
                  className="mt-7 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground transition hover:brightness-105"
                >
                  Done
                </button>

              </div>
            )}

          </div>
        </div>
      )}

    </main>
  );
}