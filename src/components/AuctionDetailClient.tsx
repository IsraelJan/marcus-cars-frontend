"use client";

import Link from "next/link";
import { useState } from "react";
import AuthModal from "@/components/AuthModal";

interface Vehicle {
  id: number;
  year: number;
  make: string;
  model: string;
  trim: string;

  bid: number;
  bids: number;
  time: string;

  mileage: string;
  engine: string;
  transmission: string;
  drivetrain: string;
  fuel: string;
  location: string;

  exteriorColor: string;
  interiorColor: string;
  seats: string;
  bodyType: string;

  image: string;
  gallery: string[];

  description: string;
  condition: string;

  videoUrl: string;

  verification: {
    vin: boolean;
    identity: boolean;
    inspection: boolean;
    history: boolean;
  };
}

const vehicles: Vehicle[] = [
  {
    id: 1,
    year: 2022,
    make: "Mercedes-AMG",
    model: "G 63",
    trim: "4MATIC",
    bid: 142500,
    bids: 28,
    time: "02:41:08",
    mileage: "24,580 mi",
    engine: "4.0L V8 Biturbo",
    transmission: "9-Speed Automatic",
    drivetrain: "AWD",
    fuel: "Gasoline",
    location: "Dallas, TX",
    exteriorColor: "Obsidian Black",
    interiorColor: "Jet Black Leather",
    seats: "5",
    bodyType: "SUV",
    image:
      "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=2000&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85",
    ],
    description:
      "A performance-focused luxury SUV combining AMG engineering with everyday usability. The vehicle is presented with detailed media and auction information to help buyers make an informed bidding decision.",
    condition:
      "The vehicle is presented for auction with the condition information available through the listing. Buyers should review all available documentation, media and inspection information before bidding.",
    videoUrl: "https://www.youtube.com/embed/Scxs7L0vhZ4",
    verification: {
      vin: true,
      identity: true,
      inspection: true,
      history: true,
    },
  },

  {
    id: 2,
    year: 2022,
    make: "Ford",
    model: "F-150",
    trim: "Lariat",
    bid: 48500,
    bids: 12,
    time: "03:18:42",
    mileage: "31,240 mi",
    engine: "3.5L EcoBoost V6",
    transmission: "10-Speed Automatic",
    drivetrain: "4WD",
    fuel: "Gasoline",
    location: "Houston, TX",
    exteriorColor: "Agate Black",
    interiorColor: "Black Leather",
    seats: "5",
    bodyType: "Pickup",
    image:
      "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=2000&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1507138451611-3001135909fa?auto=format&fit=crop&w=1600&q=85",
    ],
    description:
      "A capable full-size pickup designed for daily driving, utility and long-distance use.",
    condition:
      "Condition details should be reviewed alongside the available inspection and vehicle documentation before bidding.",
    videoUrl: "https://www.youtube.com/embed/Scxs7L0vhZ4",
    verification: {
      vin: true,
      identity: true,
      inspection: true,
      history: true,
    },
  },

  {
    id: 3,
    year: 2023,
    make: "Chevrolet",
    model: "Silverado",
    trim: "High Country",
    bid: 58900,
    bids: 16,
    time: "04:32:11",
    mileage: "18,920 mi",
    engine: "6.2L V8",
    transmission: "10-Speed Automatic",
    drivetrain: "4WD",
    fuel: "Gasoline",
    location: "Austin, TX",
    exteriorColor: "Black",
    interiorColor: "Jet Black Leather",
    seats: "5",
    bodyType: "Pickup",
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=2000&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85",
    ],
    description:
      "A premium full-size pickup with a strong V8 powertrain and upscale cabin.",
    condition:
      "Buyers should review the complete condition information and supporting documentation before placing a bid.",
    videoUrl: "https://www.youtube.com/embed/Scxs7L0vhZ4",
    verification: {
      vin: true,
      identity: true,
      inspection: true,
      history: true,
    },
  },

  {
    id: 4,
    year: 2021,
    make: "Ford",
    model: "Bronco",
    trim: "Wildtrak",
    bid: 39200,
    bids: 8,
    time: "01:18:42",
    mileage: "28,410 mi",
    engine: "2.7L EcoBoost V6",
    transmission: "10-Speed Automatic",
    drivetrain: "4WD",
    fuel: "Gasoline",
    location: "Phoenix, AZ",
    exteriorColor: "Carbonized Grey",
    interiorColor: "Black",
    seats: "5",
    bodyType: "SUV",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=2000&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1600&q=85",
    ],
    description:
      "An adventure-oriented SUV combining four-wheel-drive capability with modern comfort.",
    condition:
      "Review all available vehicle documentation, inspection information and media before bidding.",
    videoUrl: "https://www.youtube.com/embed/Scxs7L0vhZ4",
    verification: {
      vin: true,
      identity: true,
      inspection: true,
      history: true,
    },
  },

  {
    id: 5,
    year: 2023,
    make: "BMW",
    model: "M4 Competition",
    trim: "xDrive",
    bid: 76800,
    bids: 21,
    time: "05:06:17",
    mileage: "12,840 mi",
    engine: "3.0L Twin-Turbo I6",
    transmission: "8-Speed Automatic",
    drivetrain: "AWD",
    fuel: "Gasoline",
    location: "Miami, FL",
    exteriorColor: "Black Sapphire",
    interiorColor: "Black Merino Leather",
    seats: "4",
    bodyType: "Coupe",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=2000&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1600&q=85",
    ],
    description:
      "A high-performance coupe combining BMW M engineering with premium everyday usability.",
    condition:
      "Review the available condition information and inspection documentation before bidding.",
    videoUrl: "https://www.youtube.com/embed/Scxs7L0vhZ4",
    verification: {
      vin: true,
      identity: true,
      inspection: true,
      history: true,
    },
  },

  {
    id: 6,
    year: 2021,
    make: "Porsche",
    model: "911 Carrera",
    trim: "Coupe",
    bid: 118400,
    bids: 14,
    time: "06:24:51",
    mileage: "9,420 mi",
    engine: "3.0L Twin-Turbo Flat-6",
    transmission: "8-Speed PDK",
    drivetrain: "RWD",
    fuel: "Gasoline",
    location: "Los Angeles, CA",
    exteriorColor: "Black",
    interiorColor: "Black Leather",
    seats: "4",
    bodyType: "Coupe",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=90",
    ],
    description:
      "A focused sports car experience built around performance, handling and driver engagement.",
    condition:
      "Review all available documentation and inspection information before participating in the auction.",
    videoUrl: "https://www.youtube.com/embed/Scxs7L0vhZ4",
    verification: {
      vin: true,
      identity: true,
      inspection: true,
      history: true,
    },
  },

  {
    id: 7,
    year: 2022,
    make: "Range Rover",
    model: "Sport",
    trim: "HSE",
    bid: 89600,
    bids: 11,
    time: "Tomorrow",
    mileage: "21,760 mi",
    engine: "3.0L Turbo I6",
    transmission: "8-Speed Automatic",
    drivetrain: "AWD",
    fuel: "Gasoline",
    location: "New York, NY",
    exteriorColor: "Santorini Black",
    interiorColor: "Ebony Leather",
    seats: "5",
    bodyType: "SUV",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=2000&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=2000&q=90",
    ],
    description:
      "A premium SUV combining luxury, technology and all-wheel-drive capability.",
    condition:
      "Review all available vehicle information before participating in the auction.",
    videoUrl: "https://www.youtube.com/embed/Scxs7L0vhZ4",
    verification: {
      vin: true,
      identity: true,
      inspection: true,
      history: true,
    },
  },

  {
    id: 8,
    year: 2022,
    make: "GMC",
    model: "Sierra",
    trim: "Denali",
    bid: 54700,
    bids: 10,
    time: "Tomorrow",
    mileage: "26,130 mi",
    engine: "6.2L V8",
    transmission: "10-Speed Automatic",
    drivetrain: "4WD",
    fuel: "Gasoline",
    location: "Denver, CO",
    exteriorColor: "Onyx Black",
    interiorColor: "Jet Black Leather",
    seats: "5",
    bodyType: "Pickup",
    image:
      "https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?auto=format&fit=crop&w=2000&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?auto=format&fit=crop&w=2000&q=90",
    ],
    description:
      "A premium pickup combining towing capability with a refined interior.",
    condition:
      "Review inspection information and available documentation before bidding.",
    videoUrl: "https://www.youtube.com/embed/Scxs7L0vhZ4",
    verification: {
      vin: true,
      identity: true,
      inspection: true,
      history: true,
    },
  },

  {
    id: 9,
    year: 2023,
    make: "Toyota",
    model: "Land Cruiser",
    trim: "300 Series",
    bid: 92300,
    bids: 18,
    time: "Ended",
    mileage: "15,620 mi",
    engine: "3.5L Twin-Turbo V6",
    transmission: "10-Speed Automatic",
    drivetrain: "4WD",
    fuel: "Gasoline",
    location: "Dallas, TX",
    exteriorColor: "Black",
    interiorColor: "Black Leather",
    seats: "7",
    bodyType: "SUV",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=2000&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=2000&q=90",
    ],
    description:
      "A large luxury SUV designed around long-distance comfort and off-road capability.",
    condition:
      "This auction has ended. Historical vehicle information remains available for review.",
    videoUrl: "https://www.youtube.com/embed/Scxs7L0vhZ4",
    verification: {
      vin: true,
      identity: true,
      inspection: true,
      history: true,
    },
  },

  {
    id: 10,
    year: 2022,
    make: "Cadillac",
    model: "Escalade",
    trim: "Premium Luxury",
    bid: 81750,
    bids: 15,
    time: "Ended",
    mileage: "19,340 mi",
    engine: "6.2L V8",
    transmission: "10-Speed Automatic",
    drivetrain: "4WD",
    fuel: "Gasoline",
    location: "Atlanta, GA",
    exteriorColor: "Black Raven",
    interiorColor: "Jet Black Leather",
    seats: "7",
    bodyType: "SUV",
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=2000&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=2000&q=90",
    ],
    description:
      "A full-size luxury SUV focused on space, technology and premium comfort.",
    condition:
      "This auction has ended. Buyers can still review the available vehicle information.",
    videoUrl: "https://www.youtube.com/embed/Scxs7L0vhZ4",
    verification: {
      vin: true,
      identity: true,
      inspection: true,
      history: true,
    },
  },
];

const bidHistory = [
  {
    bidder: "Bidder #2841",
    amount: "$142,500",
    time: "2 min ago",
  },
  {
    bidder: "Bidder #1932",
    amount: "$141,750",
    time: "5 min ago",
  },
  {
    bidder: "Bidder #4820",
    amount: "$140,500",
    time: "9 min ago",
  },
  {
    bidder: "Bidder #1028",
    amount: "$139,250",
    time: "14 min ago",
  },
];

type PaymentMethod =
  | "visa"
  | "mastercard"
  | "amex"
  | "paypal"
  | "binance";

export default function AuctionDetailClient({
  vehicleId,
}: {
  vehicleId: number;
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [bidAmount, setBidAmount] = useState("");
  const [watching, setWatching] = useState(false);

  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  const [showAuthModal, setShowAuthModal] =
    useState(false);

  const [showBidModal, setShowBidModal] =
    useState(false);

  const [showPaymentModal, setShowPaymentModal] =
    useState(false);

  const [bidSubmitted, setBidSubmitted] =
    useState(false);

  const [selectedPayment, setSelectedPayment] =
    useState<PaymentMethod>("visa");

  const vehicle =
    vehicles.find((item) => item.id === vehicleId) ??
    vehicles[0];

  const isLive =
    vehicle.time !== "Ended" &&
    vehicle.time !== "Tomorrow";

  const minimumBid = vehicle.bid + 250;

  const numericBid = Number(bidAmount);

  const effectiveBid =
    bidAmount.trim() !== "" &&
    numericBid >= minimumBid
      ? numericBid
      : minimumBid;

  /*
   * Marcus Cars prototype bidding model:
   *
   * The buyer enters the actual bid amount.
   * The security amount is represented as 10%
   * of that bid.
   *
   * This is a UI/prototype rule only.
   * No real payment is processed here.
   */
  const bidSecurity = Math.round(
    effectiveBid * 0.1
  );

  const remainingBalance =
    effectiveBid - bidSecurity;

  const gallery =
    vehicle.gallery.length > 0
      ? vehicle.gallery
      : [vehicle.image];

  const handlePlaceBid = () => {
    if (!isLive) {
      return;
    }

    if (
      bidAmount.trim() !== "" &&
      numericBid < minimumBid
    ) {
      window.alert(
        `Your bid must be at least $${minimumBid.toLocaleString()}.`
      );

      return;
    }

    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    setShowBidModal(true);
  };

  const handleAuthenticationSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
    setShowBidModal(true);
  };

  const handleContinueToPayment = () => {
    setShowBidModal(false);
    setShowPaymentModal(true);
  };

  const handleConfirmBid = () => {
    setShowPaymentModal(false);
    setBidSubmitted(true);
  };

  const handleCloseBidFlow = () => {
    setShowBidModal(false);
    setShowPaymentModal(false);
  };

  const increaseBid = (amount: number) => {
    const nextBid = Math.max(
      amount,
      minimumBid
    );

    setBidAmount(nextBid.toString());
    setBidSubmitted(false);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background pb-24 pt-28 text-foreground">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2400&q=90"
          alt=""
          className="h-full w-full object-cover object-center opacity-[0.08]"
        />

        <div className="absolute inset-0 bg-background/95" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent_45%)]" />
      </div>

      <section className="mx-auto max-w-7xl px-6">
        {/* ===================================================
            BACK
        ==================================================== */}

        <Link
          href="/auctions"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          ← Back to Live Auctions
        </Link>

        {/* ===================================================
            VEHICLE HEADER
        ==================================================== */}

        <div className="mt-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                {isLive && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                    Live Auction
                  </span>
                )}

                <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent">
                  Verified Listing
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                {vehicle.year} {vehicle.make}{" "}
                {vehicle.model}
              </h1>

              <p className="mt-2 text-sm text-muted">
                {vehicle.trim} · {vehicle.location}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setWatching((value) => !value)
              }
              className="w-fit rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium transition hover:border-foreground/30"
            >
              {watching
                ? "♥ Watching"
                : "♡ Watch Vehicle"}
            </button>
          </div>
        </div>

        {/* ===================================================
            MAIN VEHICLE AREA
        ==================================================== */}

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          {/* =================================================
              GALLERY
          ================================================== */}

          <div>
            <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={gallery[selectedImage]}
                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  className="h-full w-full object-cover transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5">
                  <p className="text-xs text-white/60">
                    {selectedImage + 1} / {gallery.length}
                  </p>

                  <p className="mt-1 text-sm font-medium text-white">
                    Exterior & interior media
                  </p>
                </div>

                {gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous vehicle image"
                      onClick={() =>
                        setSelectedImage((current) =>
                          current === 0
                            ? gallery.length - 1
                            : current - 1
                        )
                      }
                      className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60"
                    >
                      ←
                    </button>

                    <button
                      type="button"
                      aria-label="Next vehicle image"
                      onClick={() =>
                        setSelectedImage((current) =>
                          current === gallery.length - 1
                            ? 0
                            : current + 1
                        )
                      }
                      className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60"
                    >
                      →
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Horizontal thumbnails */}

            <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
              {gallery.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() =>
                    setSelectedImage(index)
                  }
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

                  {selectedImage === index && (
                    <div className="absolute inset-0 bg-accent/10" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* =================================================
              BIDDING
          ================================================== */}

          <aside className="h-fit rounded-3xl border border-border bg-surface/95 p-6 shadow-2xl lg:sticky lg:top-28">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              Current bid
            </p>

            <p className="mt-2 text-4xl font-semibold tracking-tight text-accent">
              ${vehicle.bid.toLocaleString()}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <InfoBox
                label="Bids"
                value={vehicle.bids.toString()}
              />

              <InfoBox
                label="Time left"
                value={vehicle.time}
              />
            </div>

            {isLive ? (
              <>
                <div className="mt-6">
                  <label
                    htmlFor="bid"
                    className="text-xs text-muted"
                  >
                    Your bid
                  </label>

                  <div className="relative mt-2">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted">
                      $
                    </span>

                    <input
                      id="bid"
                      type="number"
                      min={minimumBid}
                      step={250}
                      value={bidAmount}
                      onChange={(event) =>
                        setBidAmount(
                          event.target.value
                        )
                      }
                      placeholder={minimumBid.toString()}
                      className="h-13 w-full rounded-xl border border-border bg-background px-8 text-sm outline-none transition focus:border-accent"
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-xs text-muted">
                      Minimum next bid
                    </p>

                    <p className="text-xs font-medium text-foreground">
                      ${minimumBid.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Security preview */}

                <div className="mt-5 rounded-2xl border border-accent/20 bg-accent/[0.04] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">
                      10% bid security
                    </span>

                    <span className="text-sm font-semibold text-accent">
                      ${bidSecurity.toLocaleString()}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                    <span className="text-xs text-muted">
                      Remaining if you win
                    </span>

                    <span className="text-sm font-semibold">
                      ${remainingBalance.toLocaleString()}
                    </span>
                  </div>

                  <p className="mt-3 text-[11px] leading-5 text-muted">
                    The security amount shown here represents
                    the prototype&apos;s 10% bidding model. It is
                    not the full vehicle purchase price.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handlePlaceBid}
                  className="mt-5 w-full rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition hover:brightness-105"
                >
                  Place Bid →
                </button>
              </>
            ) : (
              <div className="mt-6 rounded-xl border border-border bg-background/50 p-4 text-sm text-muted">
                This auction is no longer accepting bids.
              </div>
            )}

            <div className="mt-5 border-t border-border pt-5">
              <p className="text-xs leading-5 text-muted">
                Review the vehicle information, verification
                details and available documentation before
                placing a bid.
              </p>
            </div>
          </aside>
        </div>

        {/* ===================================================
            VEHICLE AUTHENTICATION
        ==================================================== */}

        <section className="mt-14 rounded-3xl border border-accent/20 bg-accent/[0.04] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Marcus Vehicle Verification
              </p>

              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                Know what you&apos;re bidding on.
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted">
                We designed this section to give buyers a clear
                view of the verification information available
                for the vehicle before they commit to a bid.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border border-accent/20 bg-accent/10 px-5 py-4">
              <p className="text-xs text-accent">
                Verification status
              </p>

              <p className="mt-1 text-sm font-semibold">
                {
                  Object.values(
                    vehicle.verification
                  ).filter(Boolean).length
                }{" "}
                checks available
              </p>
            </div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <VerificationItem
              title="VIN Information"
              active={vehicle.verification.vin}
            />

            <VerificationItem
              title="Vehicle Identity"
              active={vehicle.verification.identity}
            />

            <VerificationItem
              title="Inspection"
              active={vehicle.verification.inspection}
            />

            <VerificationItem
              title="History Information"
              active={vehicle.verification.history}
            />
          </div>

          <p className="mt-5 text-xs leading-5 text-muted">
            Verification badges indicate information available
            through the listing. They do not replace independent
            inspection or official vehicle-history documentation.
          </p>
        </section>

        {/* ===================================================
            VIDEO TOUR
        ==================================================== */}

        <section className="mt-14">
          <SectionHeading
            eyebrow="Vehicle tour"
            title="See the vehicle before you bid."
            description="A detailed walkaround helps buyers understand the vehicle beyond static listing photos."
          />

          <div className="mt-7 overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl">
            <div className="aspect-video">
              <iframe
                src={vehicle.videoUrl}
                title={`${vehicle.year} ${vehicle.make} ${vehicle.model} vehicle tour`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* ===================================================
            SPECIFICATIONS
        ==================================================== */}

        <section className="mt-14">
          <SectionHeading
            eyebrow="Specifications"
            title="Every important detail, in one place."
            description="Review the core mechanical, exterior and interior specifications before making a decision."
          />

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <DetailItem
              label="Mileage"
              value={vehicle.mileage}
            />

            <DetailItem
              label="Engine"
              value={vehicle.engine}
            />

            <DetailItem
              label="Transmission"
              value={vehicle.transmission}
            />

            <DetailItem
              label="Drivetrain"
              value={vehicle.drivetrain}
            />

            <DetailItem
              label="Fuel"
              value={vehicle.fuel}
            />

            <DetailItem
              label="Body Type"
              value={vehicle.bodyType}
            />

            <DetailItem
              label="Exterior"
              value={vehicle.exteriorColor}
            />

            <DetailItem
              label="Interior"
              value={vehicle.interiorColor}
            />

            <DetailItem
              label="Seats"
              value={vehicle.seats}
            />

            <DetailItem
              label="Location"
              value={vehicle.location}
            />

            <DetailItem
              label="Year"
              value={vehicle.year.toString()}
            />

            <DetailItem
              label="Trim"
              value={vehicle.trim}
            />
          </div>
        </section>

        {/* ===================================================
            INTERIOR
        ==================================================== */}

        <section className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Interior"
              title="Understand the cabin."
              description="Interior information helps buyers assess comfort, materials and everyday usability."
            />

            <div className="mt-7 overflow-hidden rounded-3xl border border-border bg-surface shadow-xl">
              <div className="aspect-[4/3]">
                <img
                  src={
                    gallery.length > 1
                      ? gallery[1]
                      : gallery[0]
                  }
                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model} interior`}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-surface p-7">
            <div className="grid gap-6 sm:grid-cols-2">
              <InteriorFeature
                title="Interior finish"
                value={vehicle.interiorColor}
              />

              <InteriorFeature
                title="Seating"
                value={`${vehicle.seats} seats`}
              />

              <InteriorFeature
                title="Cabin condition"
                value="Review available media"
              />

              <InteriorFeature
                title="Interior media"
                value="Photos + video tour"
              />
            </div>

            <div className="mt-7 border-t border-border pt-6">
              <p className="text-xs uppercase tracking-[0.18em] text-accent">
                Buyer perspective
              </p>

              <p className="mt-3 text-sm leading-7 text-muted">
                Buyers should be able to understand how the
                vehicle looks, feels and presents itself before
                committing to an auction. Interior media,
                vehicle documentation and inspection information
                should be reviewed together.
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================
            CONDITION
        ==================================================== */}

        <section className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-surface p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">
              Condition
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              What buyers should know.
            </h2>

            <p className="mt-5 text-sm leading-7 text-muted">
              {vehicle.condition}
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-surface p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">
              Buyer review
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              Review before bidding.
            </h2>

            <ul className="mt-5 space-y-4 text-sm text-muted">
              <li className="flex gap-3">
                <span className="text-accent">✓</span>
                Review the vehicle history information.
              </li>

              <li className="flex gap-3">
                <span className="text-accent">✓</span>
                Review available inspection information.
              </li>

              <li className="flex gap-3">
                <span className="text-accent">✓</span>
                Watch the vehicle walkaround.
              </li>

              <li className="flex gap-3">
                <span className="text-accent">✓</span>
                Review all available photographs.
              </li>

              <li className="flex gap-3">
                <span className="text-accent">✓</span>
                Understand the auction terms before bidding.
              </li>
            </ul>
          </div>
        </section>

        {/* ===================================================
            HISTORY
        ==================================================== */}

        <section className="mt-14">
          <SectionHeading
            eyebrow="Vehicle history"
            title="Confidence before commitment."
            description="Important vehicle documentation should be easy to find before a buyer places a bid."
          />

          <div className="mt-7 grid gap-3 md:grid-cols-3">
            <HistoryCard
              title="VIN"
              description="Vehicle identification information can be reviewed before bidding."
              action="View VIN details"
            />

            <HistoryCard
              title="History Report"
              description="Vehicle history documentation can be connected here in the production platform."
              action="View history"
            />

            <HistoryCard
              title="Inspection Report"
              description="Inspection findings should be available for buyers to review before committing."
              action="View inspection"
            />
          </div>
        </section>

        {/* ===================================================
            ABOUT + BID HISTORY
        ==================================================== */}

        <section className="mt-14 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="rounded-3xl border border-border bg-surface p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">
              About this vehicle
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              {vehicle.make} {vehicle.model}
            </h2>

            <p className="mt-5 text-sm leading-7 text-muted">
              {vehicle.description}
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-surface p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-accent">
                  Auction activity
                </p>

                <h2 className="mt-2 text-xl font-semibold">
                  Bid history
                </h2>
              </div>

              <span className="text-xs text-muted">
                {vehicle.bids} bids
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {bidHistory.map((bid) => (
                <div
                  key={`${bid.bidder}-${bid.amount}`}
                  className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {bid.bidder}
                    </p>

                    <p className="mt-1 text-xs text-muted">
                      {bid.time}
                    </p>
                  </div>

                  <p className="text-sm font-semibold text-accent">
                    {bid.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>

      {/* =====================================================
          AUTHENTICATION
      ====================================================== */}

      <AuthModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthenticationSuccess}
      />

      {/* =====================================================
          BID REVIEW MODAL
      ====================================================== */}

      {showBidModal && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md sm:p-6"
          onClick={() => setShowBidModal(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="bid-review-title"
            onClick={(event) =>
              event.stopPropagation()
            }
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-border bg-surface shadow-2xl"
          >
            <div className="p-7">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-accent">
                    Bid review
                  </p>

                  <h2
                    id="bid-review-title"
                    className="mt-2 text-2xl font-semibold"
                  >
                    Review your bid
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-muted">
                    Review your bid and understand the security
                    amount before continuing to payment selection.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowBidModal(false)
                  }
                  aria-label="Close bid review"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted transition hover:text-foreground"
                >
                  ×
                </button>
              </div>

              {/* Vehicle summary */}

              <div className="mt-7 overflow-hidden rounded-2xl border border-border">
                <div className="flex gap-4 p-4">
                  <img
                    src={gallery[0]}
                    alt=""
                    className="h-20 w-28 rounded-xl object-cover"
                  />

                  <div>
                    <p className="text-sm font-semibold">
                      {vehicle.year} {vehicle.make}{" "}
                      {vehicle.model}
                    </p>

                    <p className="mt-1 text-xs text-muted">
                      {vehicle.trim} · {vehicle.location}
                    </p>

                    <p className="mt-2 text-xs text-accent">
                      Live auction
                    </p>
                  </div>
                </div>
              </div>

              {/* Bid amount */}

              <div className="mt-5 rounded-2xl border border-accent/20 bg-accent/[0.05] p-5">
                <p className="text-xs text-muted">
                  Your bid
                </p>

                <p className="mt-2 text-3xl font-semibold tracking-tight text-accent">
                  ${effectiveBid.toLocaleString()}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <InfoBox
                    label="Current bid"
                    value={`$${vehicle.bid.toLocaleString()}`}
                  />

                  <InfoBox
                    label="Minimum next bid"
                    value={`$${minimumBid.toLocaleString()}`}
                  />
                </div>
              </div>

              {/* Financial commitment */}

              <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-background/50">
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted">
                        Bid security
                      </p>

                      <p className="mt-1 text-2xl font-semibold text-accent">
                        ${bidSecurity.toLocaleString()}
                      </p>
                    </div>

                    <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                      10%
                    </span>
                  </div>

                  <div className="mt-5 border-t border-border pt-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted">
                        Remaining balance if you win
                      </span>

                      <span className="text-sm font-semibold">
                        ${remainingBalance.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border px-5 py-4">
                  <p className="text-xs leading-5 text-muted">
                    You are not paying the full vehicle price at
                    this stage. This prototype represents the
                    bidding security as 10% of your submitted bid.
                  </p>
                </div>
              </div>

              {/* Important notice */}

              <div className="mt-5 rounded-2xl border border-border bg-background/50 p-5">
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    !
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Before you continue
                    </p>

                    <p className="mt-2 text-xs leading-5 text-muted">
                      A bid is an intentional commitment to
                      participate in this auction. Review the
                      vehicle information, available documentation
                      and auction terms before confirming.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() =>
                    setShowBidModal(false)
                  }
                  className="flex-1 rounded-full border border-border px-5 py-3.5 text-sm font-medium transition hover:bg-background"
                >
                  Go Back
                </button>

                <button
                  type="button"
                  onClick={handleContinueToPayment}
                  className="flex-1 rounded-full bg-accent px-5 py-3.5 text-sm font-semibold text-accent-foreground transition hover:brightness-105"
                >
                  Continue to Payment →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          PAYMENT METHOD MODAL
      ====================================================== */}

      {showPaymentModal && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md sm:p-6"
          onClick={handleCloseBidFlow}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-title"
            onClick={(event) =>
              event.stopPropagation()
            }
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-border bg-surface shadow-2xl"
          >
            <div className="p-7">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-accent">
                    Bid security
                  </p>

                  <h2
                    id="payment-title"
                    className="mt-2 text-2xl font-semibold"
                  >
                    Secure your bid
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-muted">
                    Select a payment method for the security
                    amount associated with your bid.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCloseBidFlow}
                  aria-label="Close payment selection"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted transition hover:text-foreground"
                >
                  ×
                </button>
              </div>

              {/* Financial summary */}

              <div className="mt-7 overflow-hidden rounded-2xl border border-accent/20 bg-accent/[0.04]">
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted">
                        Your bid
                      </p>

                      <p className="mt-1 text-2xl font-semibold">
                        ${effectiveBid.toLocaleString()}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-muted">
                        Security
                      </p>

                      <p className="mt-1 text-2xl font-semibold text-accent">
                        ${bidSecurity.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-border pt-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted">
                        Remaining if you win
                      </span>

                      <span className="text-sm font-semibold">
                        ${remainingBalance.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Explanation */}

              <div className="mt-5 rounded-2xl border border-border bg-background/50 p-4">
                <p className="text-xs leading-5 text-muted">
                  <span className="font-medium text-foreground">
                    You are securing your bid, not paying for the
                    vehicle in full.
                  </span>{" "}
                  The 10% amount shown is the prototype security
                  requirement for this auction experience.
                </p>
              </div>

              {/* Payment methods */}

              <div className="mt-6">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
                  Choose payment method
                </p>

                <div className="mt-3 space-y-3">
                  <PaymentOption
                    id="visa"
                    title="Visa"
                    subtitle="Credit or debit card"
                    selected={
                      selectedPayment === "visa"
                    }
                    onSelect={() =>
                      setSelectedPayment("visa")
                    }
                    icon={<VisaIcon />}
                  />

                  <PaymentOption
                    id="mastercard"
                    title="Mastercard"
                    subtitle="Credit or debit card"
                    selected={
                      selectedPayment === "mastercard"
                    }
                    onSelect={() =>
                      setSelectedPayment("mastercard")
                    }
                    icon={<MastercardIcon />}
                  />

                  <PaymentOption
                    id="amex"
                    title="American Express"
                    subtitle="Credit or debit card"
                    selected={
                      selectedPayment === "amex"
                    }
                    onSelect={() =>
                      setSelectedPayment("amex")
                    }
                    icon={<AmexIcon />}
                  />

                  <PaymentOption
                    id="paypal"
                    title="PayPal"
                    subtitle="Pay with your PayPal account"
                    selected={
                      selectedPayment === "paypal"
                    }
                    onSelect={() =>
                      setSelectedPayment("paypal")
                    }
                    icon={<PayPalIcon />}
                  />

                  <PaymentOption
                    id="binance"
                    title="Binance"
                    subtitle="Crypto payment option"
                    selected={
                      selectedPayment === "binance"
                    }
                    onSelect={() =>
                      setSelectedPayment("binance")
                    }
                    icon={<BinanceIcon />}
                  />
                </div>
              </div>

              {/* Prototype notice */}

              <div className="mt-6 rounded-2xl border border-border bg-background/50 p-4">
                <p className="text-xs leading-5 text-muted">
                  Payment processing is not connected in this
                  prototype. The payment methods shown here are
                  representative of the intended final experience.
                </p>
              </div>

              {/* Confirm */}

              <button
                type="button"
                onClick={handleConfirmBid}
                className="mt-6 w-full rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition hover:brightness-105"
              >
                Confirm Bid & Security — $
                {bidSecurity.toLocaleString()}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowPaymentModal(false);
                  setShowBidModal(true);
                }}
                className="mt-3 w-full py-2 text-sm text-muted transition hover:text-foreground"
              >
                Back to bid review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          BID SUCCESS / ACTIVE BID
      ====================================================== */}

      {bidSubmitted && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md sm:p-6">
          <div className="w-full max-w-lg rounded-3xl border border-accent/20 bg-surface p-7 shadow-2xl sm:p-9">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
              ✓
            </div>

            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Bid submitted
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              You&apos;re in the auction.
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted">
              Your prototype bid has been recorded for this
              session. In the production platform, this would
              now be connected to the live auction system and
              your account activity.
            </p>

            <div className="mt-7 rounded-2xl border border-border bg-background/50 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted">
                    Your bid
                  </p>

                  <p className="mt-1 text-2xl font-semibold text-accent">
                    ${effectiveBid.toLocaleString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-muted">
                    Status
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    Active
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-border pt-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted">
                      Bid security
                    </p>

                    <p className="mt-1 text-sm font-semibold text-accent">
                      ${bidSecurity.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted">
                      Remaining if won
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      ${remainingBalance.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 border-t border-border pt-5">
                <p className="text-xs text-muted">
                  Payment method selected
                </p>

                <p className="mt-1 text-sm font-medium">
                  {getPaymentLabel(selectedPayment)}
                </p>
              </div>
            </div>

            {/* Outbid explanation */}

            <div className="mt-5 rounded-2xl border border-border bg-background/50 p-5">
              <p className="text-sm font-semibold">
                What happens if you&apos;re outbid?
              </p>

              <p className="mt-2 text-xs leading-5 text-muted">
                If another buyer places a higher bid, your
                auction status can change to &quot;Outbid&quot;.
                You can then return to the auction and increase
                your bid while bidding remains open.
              </p>

              <button
                type="button"
                onClick={() => {
                  setBidSubmitted(false);

                  increaseBid(
                    Math.max(
                      effectiveBid + 250,
                      vehicle.bid + 250
                    )
                  );
                }}
                className="mt-4 rounded-full border border-border px-4 py-2 text-xs font-medium transition hover:bg-background"
              >
                Prepare a Higher Bid
              </button>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                href="/auctions"
                className="flex items-center justify-center rounded-full border border-border px-5 py-3.5 text-sm font-medium transition hover:bg-background"
              >
                Back to Auctions
              </Link>

              <button
                type="button"
                onClick={() =>
                  setBidSubmitted(false)
                }
                className="rounded-full bg-accent px-5 py-3.5 text-sm font-semibold text-accent-foreground transition hover:brightness-105"
              >
                Continue Viewing
              </button>
            </div>

            <Link
              href="/activity"
              className="mt-4 block text-center text-sm font-medium text-accent transition hover:opacity-80"
            >
              View My Activity →
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}

/* ============================================================
   SECTION HEADING
============================================================ */

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        {eyebrow}
      </p>

      <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>

      <p className="mt-3 text-sm leading-6 text-muted">
        {description}
      </p>
    </div>
  );
}

/* ============================================================
   INFO BOX
============================================================ */

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background/50 p-4">
      <p className="text-xs text-muted">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold">
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   DETAIL ITEM
============================================================ */

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <p className="text-xs text-muted">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold">
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   VERIFICATION
============================================================ */

function VerificationItem({
  title,
  active,
}: {
  title: string;
  active: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
          active
            ? "bg-accent/10 text-accent"
            : "bg-background text-muted"
        }`}
      >
        {active ? "✓" : "—"}
      </div>

      <div>
        <p className="text-sm font-medium">
          {title}
        </p>

        <p className="mt-1 text-xs text-muted">
          {active
            ? "Available for review"
            : "Not available"}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   INTERIOR FEATURE
============================================================ */

function InteriorFeature({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs text-muted">
        {title}
      </p>

      <p className="mt-1 text-sm font-medium">
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   HISTORY CARD
============================================================ */

function HistoryCard({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
        ✓
      </div>

      <h3 className="mt-5 text-base font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-muted">
        {description}
      </p>

      <button
        type="button"
        className="mt-5 text-sm font-medium text-accent transition hover:opacity-80"
      >
        {action} →
      </button>
    </div>
  );
}

/* ============================================================
   PAYMENT OPTION
============================================================ */

function PaymentOption({
  id,
  title,
  subtitle,
  selected,
  onSelect,
  icon,
}: {
  id: string;
  title: string;
  subtitle: string;
  selected: boolean;
  onSelect: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      id={id}
      onClick={onSelect}
      className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
        selected
          ? "border-accent bg-accent/[0.06]"
          : "border-border bg-background/40 hover:border-foreground/20"
      }`}
    >
      <div
        className={`flex h-11 w-14 shrink-0 items-center justify-center rounded-xl border ${
          selected
            ? "border-accent/30 bg-accent/10"
            : "border-border bg-surface"
        }`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">
          {title}
        </p>

        <p className="mt-1 text-xs text-muted">
          {subtitle}
        </p>
      </div>

      <div
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
          selected
            ? "border-accent bg-accent text-accent-foreground"
            : "border-border"
        }`}
      >
        {selected && (
          <span className="h-2 w-2 rounded-full bg-current" />
        )}
      </div>
    </button>
  );
}

/* ============================================================
   PAYMENT LABEL
============================================================ */

function getPaymentLabel(
  method: PaymentMethod
) {
  switch (method) {
    case "visa":
      return "Visa";

    case "mastercard":
      return "Mastercard";

    case "amex":
      return "American Express";

    case "paypal":
      return "PayPal";

    case "binance":
      return "Binance";

    default:
      return "Selected payment method";
  }
}

/* ============================================================
   VISA ICON
============================================================ */

function VisaIcon() {
  return (
    <span className="text-sm font-black italic tracking-tight">
      VISA
    </span>
  );
}

/* ============================================================
   MASTERCARD ICON
============================================================ */

function MastercardIcon() {
  return (
    <div className="flex items-center">
      <span className="h-6 w-6 rounded-full bg-current opacity-80" />
      <span className="-ml-2 h-6 w-6 rounded-full border border-background bg-current opacity-50" />
    </div>
  );
}

/* ============================================================
   AMEX ICON
============================================================ */

function AmexIcon() {
  return (
    <span className="text-[10px] font-bold tracking-tight">
      AMEX
    </span>
  );
}

/* ============================================================
   PAYPAL ICON
============================================================ */

function PayPalIcon() {
  return (
    <span className="text-xs font-bold italic">
      PayPal
    </span>
  );
}

/* ============================================================
   BINANCE ICON
============================================================ */

function BinanceIcon() {
  return (
    <span className="text-lg font-bold">
      ◇
    </span>
  );
}