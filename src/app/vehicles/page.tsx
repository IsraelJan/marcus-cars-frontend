"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import {
  vehicles,
  type Vehicle,
  type VehicleCategory,
} from "@/data/vehicles";

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

const categories = [
  "All Vehicles",
  "SUVs",
  "Sedans",
  "Pickups",
  "Electric",
] as const;

type CategoryFilter = (typeof categories)[number];

type VehicleTypeFilter = Exclude<CategoryFilter, "All Vehicles">;

type SortOption =
  | "Popular"
  | "Price: Low to High"
  | "Price: High to Low"
  | "Mileage";

/*
|--------------------------------------------------------------------------
| CATEGORY DATA
|--------------------------------------------------------------------------
|
| Explicitly typed so TypeScript never treats "All Vehicles"
| as a valid VehicleCategory.
|
*/

const vehicleTypeCategories: VehicleTypeFilter[] = [
  "SUVs",
  "Sedans",
  "Pickups",
  "Electric",
];

const categoryMap: Record<VehicleTypeFilter, VehicleCategory> = {
  SUVs: "SUV",
  Sedans: "Sedan",
  Pickups: "Pickup",
  Electric: "Electric",
};

/*
|--------------------------------------------------------------------------
| FORMATTERS
|--------------------------------------------------------------------------
*/

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatMileage(mileage: number): string {
  return new Intl.NumberFormat("en-US").format(mileage);
}

/*
|--------------------------------------------------------------------------
| ICONS
|--------------------------------------------------------------------------
*/

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function SlidersIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 6h16" />
      <path d="M7 6v12" />
      <path d="M4 18h16" />
      <path d="M17 6v12" />
      <path d="M4 12h16" />
      <path d="M12 12v6" />
    </svg>
  );
}

function ChevronIcon({
  direction = "right",
}: {
  direction?: "left" | "right";
}) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        d={
          direction === "left"
            ? "m15 18-6-6 6-6"
            : "m9 18 6-6-6-6"
        }
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z" />
    </svg>
  );
}

/*
|--------------------------------------------------------------------------
| VEHICLE CARD
|--------------------------------------------------------------------------
*/

function VehicleCard({
  vehicle,
}: {
  vehicle: Vehicle;
}) {
  const [imageIndex, setImageIndex] = useState<number>(0);

  const hasMultipleImages = vehicle.images.length > 1;

  function nextImage(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();
    event.stopPropagation();

    if (!hasMultipleImages) {
      return;
    }

    setImageIndex((currentIndex: number) =>
      currentIndex >= vehicle.images.length - 1
        ? 0
        : currentIndex + 1,
    );
  }

  function previousImage(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();
    event.stopPropagation();

    if (!hasMultipleImages) {
      return;
    }

    setImageIndex((currentIndex: number) =>
      currentIndex <= 0
        ? vehicle.images.length - 1
        : currentIndex - 1,
    );
  }

  function saveVehicle(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();
    event.stopPropagation();

    // Save functionality can be connected later.
  }

  return (
    <Link
      href={`/vehicles/${vehicle.id}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-2xl"
    >
      {/* IMAGE */}
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-light">
        <img
          src={vehicle.images[imageIndex]}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
        />

        {/* BADGES */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          <div className="flex flex-wrap gap-2">
            {vehicle.popular && (
              <span className="rounded-full bg-accent px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-accent-foreground">
                Popular
              </span>
            )}

            {vehicle.category === "Electric" && (
              <span className="rounded-full bg-black/75 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur">
                Electric
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={saveVehicle}
            aria-label={`Save ${vehicle.make} ${vehicle.model}`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
          >
            <HeartIcon />
          </button>
        </div>

        {/* PREVIOUS IMAGE */}
        {hasMultipleImages && (
          <button
            type="button"
            onClick={previousImage}
            aria-label={`Previous image of ${vehicle.make} ${vehicle.model}`}
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur transition group-hover:opacity-100"
          >
            <ChevronIcon direction="left" />
          </button>
        )}

        {/* NEXT IMAGE */}
        {hasMultipleImages && (
          <button
            type="button"
            onClick={nextImage}
            aria-label={`Next image of ${vehicle.make} ${vehicle.model}`}
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur transition group-hover:opacity-100"
          >
            <ChevronIcon />
          </button>
        )}

        {/* IMAGE INDICATORS */}
        {vehicle.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {vehicle.images.map(
              (image: string, index: number) => (
                <span
                  key={`${vehicle.id}-${image}-${index}`}
                  className={`h-1.5 rounded-full transition-all ${
                    index === imageIndex
                      ? "w-5 bg-white"
                      : "w-1.5 bg-white/50"
                  }`}
                />
              ),
            )}
          </div>
        )}
      </div>

      {/* INFORMATION */}
      <div className="p-5">
        <div className="mb-1 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">
              {vehicle.year} · {vehicle.trim}
            </p>

            <h2 className="mt-1 truncate text-lg font-semibold tracking-tight">
              {vehicle.make} {vehicle.model}
            </h2>
          </div>

          <p className="whitespace-nowrap text-lg font-bold">
            {formatPrice(vehicle.price)}
          </p>
        </div>

        {/* SPECS */}
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
          <span>
            {formatMileage(vehicle.mileage)} mi
          </span>

          <span className="h-1 w-1 rounded-full bg-border" />

          <span>{vehicle.fuel}</span>

          <span className="h-1 w-1 rounded-full bg-border" />

          <span>{vehicle.drivetrain}</span>
        </div>

        {/* FOOTER */}
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm text-muted">
            {vehicle.location}
          </span>

          <span className="text-sm font-semibold transition group-hover:text-accent">
            View vehicle →
          </span>
        </div>
      </div>
    </Link>
  );
}

/*
|--------------------------------------------------------------------------
| MAIN PAGE
|--------------------------------------------------------------------------
*/

export default function VehiclesPage() {
  const [activeCategory, setActiveCategory] =
    useState<CategoryFilter>("All Vehicles");

  const [search, setSearch] = useState<string>("");

  const [sort, setSort] =
    useState<SortOption>("Popular");

  const [showFilters, setShowFilters] =
    useState<boolean>(false);

  const [maxPrice, setMaxPrice] =
    useState<number>(200000);

  const [maxMileage, setMaxMileage] =
    useState<number>(100000);

  const [selectedMake, setSelectedMake] =
    useState<string>("All Makes");

  /*
  |--------------------------------------------------------------------------
  | MAKES
  |--------------------------------------------------------------------------
  */

  const makes = useMemo<string[]>(() => {
    const uniqueMakes = Array.from(
      new Set(
        vehicles.map(
          (vehicle: Vehicle) => vehicle.make,
        ),
      ),
    );

    return ["All Makes", ...uniqueMakes];
  }, []);

  /*
  |--------------------------------------------------------------------------
  | FILTER + SORT
  |--------------------------------------------------------------------------
  */

  const filteredVehicles = useMemo<Vehicle[]>(() => {
    let result: Vehicle[] = [...vehicles];

    /*
    |----------------------------------------------------------------------
    | CATEGORY
    |----------------------------------------------------------------------
    */

    if (activeCategory !== "All Vehicles") {
      const selectedCategory: VehicleCategory =
        categoryMap[activeCategory];

      result = result.filter(
        (vehicle: Vehicle) =>
          vehicle.category === selectedCategory,
      );
    }

    /*
    |----------------------------------------------------------------------
    | MAKE
    |----------------------------------------------------------------------
    */

    if (selectedMake !== "All Makes") {
      result = result.filter(
        (vehicle: Vehicle) =>
          vehicle.make === selectedMake,
      );
    }

    /*
    |----------------------------------------------------------------------
    | PRICE + MILEAGE
    |----------------------------------------------------------------------
    */

    result = result.filter(
      (vehicle: Vehicle) =>
        vehicle.price <= maxPrice &&
        vehicle.mileage <= maxMileage,
    );

    /*
    |----------------------------------------------------------------------
    | SEARCH
    |----------------------------------------------------------------------
    */

    const query = search.trim().toLowerCase();

    if (query.length > 0) {
      result = result.filter(
        (vehicle: Vehicle) => {
          const searchableText = [
            vehicle.make,
            vehicle.model,
            vehicle.trim,
            vehicle.year.toString(),
            vehicle.category,
            vehicle.location,
            vehicle.fuel,
            vehicle.drivetrain,
            vehicle.stockNumber,
          ]
            .join(" ")
            .toLowerCase();

          return searchableText.includes(query);
        },
      );
    }

    /*
    |----------------------------------------------------------------------
    | SORT
    |----------------------------------------------------------------------
    */

    if (sort === "Price: Low to High") {
      result.sort(
        (a: Vehicle, b: Vehicle) =>
          a.price - b.price,
      );
    } else if (sort === "Price: High to Low") {
      result.sort(
        (a: Vehicle, b: Vehicle) =>
          b.price - a.price,
      );
    } else if (sort === "Mileage") {
      result.sort(
        (a: Vehicle, b: Vehicle) =>
          a.mileage - b.mileage,
      );
    } else {
      result.sort(
        (a: Vehicle, b: Vehicle) =>
          Number(Boolean(b.popular)) -
          Number(Boolean(a.popular)),
      );
    }

    return result;
  }, [
    activeCategory,
    search,
    sort,
    maxPrice,
    maxMileage,
    selectedMake,
  ]);

  /*
  |--------------------------------------------------------------------------
  | RESET FILTERS
  |--------------------------------------------------------------------------
  */

  function resetFilters(): void {
    setSearch("");
    setActiveCategory("All Vehicles");
    setSelectedMake("All Makes");
    setMaxPrice(200000);
    setMaxMileage(100000);
    setSort("Popular");
  }

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* ================================================================
          COMPACT MARKETPLACE HEADER
      ================================================================= */}

      <section className="border-b border-border pt-20 sm:pt-22">
        <div className="mx-auto max-w-[1500px] px-5 pb-4 pt-3 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

            {/* TITLE */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                Marcus Cars Marketplace
              </p>

              <h1 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
                Cars for sale
              </h1>
            </div>

            {/* SEARCH */}
            <div className="relative w-full lg:max-w-[500px]">
              <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-muted">
                <SearchIcon />
              </div>

              <input
                value={search}
                onChange={(
                  event: React.ChangeEvent<HTMLInputElement>,
                ) => {
                  setSearch(event.target.value);
                }}
                placeholder="Search make, model or year..."
                className="h-11 w-full rounded-xl border border-border bg-surface pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-accent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          CATEGORY BAR
      ================================================================= */}

      <div className="sticky top-[72px] z-20 border-b border-border bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] gap-1 overflow-x-auto px-5 py-2 sm:px-8 lg:px-10">

          {categories.map(
            (category: CategoryFilter) => {
              const active =
                activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setActiveCategory(category)
                  }
                  className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-accent text-accent-foreground"
                      : "text-muted hover:bg-surface hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              );
            },
          )}

        </div>
      </div>

      {/* ================================================================
          MARKETPLACE
      ================================================================= */}

      <section className="mx-auto max-w-[1500px] px-5 py-5 sm:px-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[225px_minmax(0,1fr)]">

          {/* ============================================================
              LEFT FILTERS
          ============================================================= */}

          <aside
            className={`lg:block ${
              showFilters
                ? "block"
                : "hidden"
            }`}
          >
            <div className="rounded-2xl border border-border bg-surface p-5 lg:sticky lg:top-[126px]">

              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">
                    Filters
                  </p>

                  <p className="mt-0.5 text-xs text-muted">
                    Refine your search
                  </p>
                </div>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-medium text-accent hover:underline"
                >
                  Reset
                </button>
              </div>

              <div className="space-y-6">

                {/* MAKE */}

                <div>
                  <label
                    htmlFor="vehicle-make"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted"
                  >
                    Make
                  </label>

                  <select
                    id="vehicle-make"
                    value={selectedMake}
                    onChange={(
                      event: React.ChangeEvent<HTMLSelectElement>,
                    ) => {
                      setSelectedMake(
                        event.target.value,
                      );
                    }}
                    className="h-10 w-full rounded-lg border border-border bg-surface-light px-3 text-sm text-foreground outline-none focus:border-accent"
                  >
                    {makes.map(
                      (make: string) => (
                        <option
                          key={make}
                          value={make}
                        >
                          {make}
                        </option>
                      ),
                    )}
                  </select>
                </div>

                {/* PRICE */}

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="max-price"
                      className="text-xs font-semibold uppercase tracking-wide text-muted"
                    >
                      Maximum price
                    </label>

                    <span className="text-xs font-medium">
                      {formatPrice(maxPrice)}
                    </span>
                  </div>

                  <input
                    id="max-price"
                    type="range"
                    min="20000"
                    max="200000"
                    step="5000"
                    value={maxPrice}
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>,
                    ) => {
                      setMaxPrice(
                        Number(event.target.value),
                      );
                    }}
                    className="w-full accent-[var(--accent)]"
                  />
                </div>

                {/* MILEAGE */}

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="max-mileage"
                      className="text-xs font-semibold uppercase tracking-wide text-muted"
                    >
                      Maximum mileage
                    </label>

                    <span className="text-xs font-medium">
                      {formatMileage(maxMileage)} mi
                    </span>
                  </div>

                  <input
                    id="max-mileage"
                    type="range"
                    min="5000"
                    max="100000"
                    step="5000"
                    value={maxMileage}
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>,
                    ) => {
                      setMaxMileage(
                        Number(event.target.value),
                      );
                    }}
                    className="w-full accent-[var(--accent)]"
                  />
                </div>

                {/* VEHICLE TYPE */}

                <div className="border-t border-border pt-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
                    Vehicle type
                  </p>

                  <div className="space-y-1">
                    {vehicleTypeCategories.map(
                      (
                        category: VehicleTypeFilter,
                      ) => (
                        <button
                          key={category}
                          type="button"
                          onClick={() =>
                            setActiveCategory(
                              category,
                            )
                          }
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                            activeCategory ===
                            category
                              ? "bg-accent/10 font-medium text-foreground"
                              : "text-muted hover:bg-surface-light hover:text-foreground"
                          }`}
                        >
                          <span>{category}</span>

                          {activeCategory ===
                            category && (
                            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                          )}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* ============================================================
              INVENTORY
          ============================================================= */}

          <div className="min-w-0">

            {/* INVENTORY HEADER */}

            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                  Available vehicles
                </p>

                <h2 className="mt-1 text-xl font-semibold tracking-tight">
                  Browse vehicles
                </h2>

                <p className="mt-1 text-sm text-muted">
                  {filteredVehicles.length}{" "}
                  {filteredVehicles.length === 1
                    ? "vehicle"
                    : "vehicles"}{" "}
                  available for sale
                </p>
              </div>

              <div className="flex items-center gap-2">

                {/* MOBILE FILTER BUTTON */}

                <button
                  type="button"
                  onClick={() =>
                    setShowFilters(
                      (current: boolean) =>
                        !current,
                    )
                  }
                  className="flex h-10 items-center gap-2 rounded-lg border border-border bg-surface px-3 text-sm font-medium lg:hidden"
                >
                  <SlidersIcon />
                  Filters
                </button>

                {/* SORT */}

                <select
                  value={sort}
                  onChange={(
                    event: React.ChangeEvent<HTMLSelectElement>,
                  ) => {
                    setSort(
                      event.target.value as SortOption,
                    );
                  }}
                  className="h-10 rounded-lg border border-border bg-surface px-3 text-sm text-foreground outline-none focus:border-accent"
                >
                  <option value="Popular">
                    Popular
                  </option>

                  <option value="Price: Low to High">
                    Price: Low to High
                  </option>

                  <option value="Price: High to Low">
                    Price: High to Low
                  </option>

                  <option value="Mileage">
                    Mileage
                  </option>
                </select>
              </div>
            </div>

            {/* ==========================================================
                VEHICLES
            =========================================================== */}

            {filteredVehicles.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredVehicles.map(
                  (vehicle: Vehicle) => (
                    <VehicleCard
                      key={vehicle.id}
                      vehicle={vehicle}
                    />
                  ),
                )}
              </div>
            ) : (
              <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-border bg-surface px-6 text-center">
                <div>

                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface-light text-muted">
                    <SearchIcon />
                  </div>

                  <h3 className="text-lg font-semibold">
                    No vehicles found
                  </h3>

                  <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
                    Try adjusting your search or filters.
                  </p>

                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-5 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground"
                  >
                    Clear filters
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ================================================================
          SELL YOUR CAR
      ================================================================= */}

      <section className="mx-auto max-w-[1500px] px-5 pb-16 pt-5 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">

          <div className="flex flex-col items-start justify-between gap-5 p-6 sm:p-8 lg:flex-row lg:items-center">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                Have a vehicle to sell?
              </p>

              <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                Sell your car through Marcus Cars
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                Tell us about your vehicle and submit it
                for review. Once approved, it can appear
                in the marketplace for qualified buyers.
              </p>
            </div>

            <Link
              href="/sell"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
            >
              Sell your car
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
}