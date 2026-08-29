"use client";

import {
  ChangeEvent,
  FormEvent,
  useMemo,
  useState,
} from "react";

type VehicleForm = {
  make: string;
  model: string;
  year: string;
  mileage: string;
  transmission: string;
  fuel: string;
  bodyType: string;
  vin: string;
  condition: string;
  accidentHistory: string;
  serviceHistory: string;
  mechanicalCondition: string;
  ownership: string;
  startingBid: string;
  reservePrice: string;
  auctionDuration: string;
  location: string;
};

const initialForm: VehicleForm = {
  make: "",
  model: "",
  year: "",
  mileage: "",
  transmission: "",
  fuel: "",
  bodyType: "",
  vin: "",
  condition: "",
  accidentHistory: "",
  serviceHistory: "",
  mechanicalCondition: "",
  ownership: "",
  startingBid: "",
  reservePrice: "",
  auctionDuration: "7",
  location: "",
};

const steps = [
  "Vehicle Details",
  "Condition",
  "Photos",
  "Auction Details",
  "Review",
];

export default function SellYourCarPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<VehicleForm>(initialForm);
  const [photos, setPhotos] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (
    field: keyof VehicleForm,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handlePhotoUpload = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPhotos((previous) =>
      [...previous, ...previews].slice(0, 12)
    );

    event.target.value = "";
  };

  const removePhoto = (index: number) => {
    setPhotos((previous) =>
      previous.filter(
        (_, photoIndex) => photoIndex !== index
      )
    );
  };

  const scrollToForm = () => {
    document
      .getElementById("sell-form")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  const scrollToHowItWorks = () => {
    document
      .getElementById("sell-how-it-works")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  const goNext = () => {
    setCurrentStep((previous) =>
      Math.min(previous + 1, 5)
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goBack = () => {
    setCurrentStep((previous) =>
      Math.max(previous - 1, 1)
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const startingBid = useMemo(() => {
    if (!form.startingBid) return "—";

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(Number(form.startingBid));
  }, [form.startingBid]);

  const reservePrice = useMemo(() => {
    if (!form.reservePrice) return "No reserve";

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(Number(form.reservePrice));
  }, [form.reservePrice]);

  const vehicleName = [
    form.year,
    form.make,
    form.model,
  ]
    .filter(Boolean)
    .join(" ");

  if (submitted) {
    return (
      <main className="min-h-screen bg-background px-4 py-16 sm:px-6 lg:px-8">
        <section className="mx-auto flex min-h-[65vh] max-w-3xl items-center justify-center">
          <div className="w-full rounded-3xl border border-border bg-surface p-8 text-center sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-foreground text-background">
              <CheckIcon size={28} />
            </div>

            <p className="mt-6 text-sm font-medium uppercase tracking-[0.18em] text-muted">
              Submission received
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Your vehicle has been submitted.
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted">
              Your vehicle is now pending review. Once approved,
              it can be prepared for a Marcus Cars auction.
            </p>

            <div className="mx-auto mt-8 max-w-md rounded-2xl border border-border bg-background p-5 text-left">
              <ReviewRow label="Vehicle">
                {vehicleName || "Vehicle listing"}
              </ReviewRow>

              <ReviewRow label="Starting bid">
                {startingBid}
              </ReviewRow>

              <ReviewRow label="Status">
                <span className="rounded-full border border-border px-3 py-1 text-xs">
                  Pending Review
                </span>
              </ReviewRow>
            </div>

            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setCurrentStep(1);
                setForm(initialForm);
                setPhotos([]);
              }}
              className="mt-8 rounded-xl bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Submit Another Vehicle
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">

      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative isolate min-h-[680px] overflow-hidden bg-black text-white">

        {/* Background Image */}
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=85')",
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 -z-10 bg-black/65" />

        {/* Gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/70 to-black/20" />

        {/* Content */}
        <div className="mx-auto flex min-h-[680px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">

          <div className="max-w-3xl">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-white" />

              <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/80">
                Sell with Marcus Cars
              </span>
            </div>

            <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Your car deserves
              <br />
              the right buyer.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
              Turn your vehicle into an auction listing and put
              it in front of serious buyers looking for their
              next car.
            </p>

            {/* CTA */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

              <button
                type="button"
                onClick={scrollToForm}
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-white px-6 py-3.5 text-sm font-medium text-black transition-transform hover:scale-[1.02]"
              >
                Start Selling

                <ArrowRightIcon />
              </button>

              <button
                type="button"
                onClick={scrollToHowItWorks}
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/15"
              >
                See How It Works
              </button>

            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/15 pt-6">

              <TrustItem
                icon={<ShieldIcon />}
                text="Secure submission"
              />

              <TrustItem
                icon={<UsersIcon />}
                text="Serious buyers"
              />

              <TrustItem
                icon={<CheckIcon size={17} />}
                text="Simple process"
              />

            </div>

          </div>
        </div>

        {/* Bottom floating message */}
        <div className="absolute bottom-7 right-6 hidden max-w-xs rounded-2xl border border-white/15 bg-black/40 p-4 backdrop-blur-xl lg:block">
          <p className="text-xs uppercase tracking-[0.16em] text-white/50">
            Ready when you are
          </p>

          <p className="mt-2 text-sm leading-5 text-white/80">
            Tell us about your vehicle. We&apos;ll guide you
            through the rest.
          </p>
        </div>

      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================== */}
      <section
        id="sell-how-it-works"
        className="border-b border-border bg-background"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">

          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
              How it works
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
              Selling your car is straightforward.
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted">
              Complete the guided listing process and get your
              vehicle ready for review.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">

            <HowStep
              number="01"
              title="Tell us about your car"
              description="Enter the basic details, condition and history of your vehicle."
            />

            <HowStep
              number="02"
              title="Add your photos"
              description="Upload clear images that help buyers understand what you're selling."
            />

            <HowStep
              number="03"
              title="Set your auction"
              description="Choose your starting bid, duration and listing location."
            />

          </div>
        </div>
      </section>

      {/* =========================================================
          FORM
      ========================================================== */}
      <section
        id="sell-form"
        className="scroll-mt-20 bg-background"
      >

        {/* Progress */}
        <div className="border-b border-border bg-surface/50">
          <div className="mx-auto max-w-6xl overflow-x-auto px-4 py-5 sm:px-6 lg:px-8">

            <div className="flex min-w-max items-center">

              {steps.map((title, index) => {
                const number = index + 1;
                const active = currentStep === number;
                const completed = currentStep > number;

                return (
                  <div
                    key={title}
                    className="flex items-center"
                  >

                    <div className="flex items-center gap-3">

                      <div
                        className={[
                          "flex h-9 w-9 items-center justify-center rounded-full border text-sm font-medium",
                          active || completed
                            ? "border-foreground bg-foreground text-background"
                            : "border-border text-muted",
                        ].join(" ")}
                      >
                        {completed ? (
                          <CheckIcon size={15} />
                        ) : (
                          number
                        )}
                      </div>

                      <span
                        className={[
                          "text-sm",
                          active
                            ? "font-medium text-foreground"
                            : "text-muted",
                        ].join(" ")}
                      >
                        {title}
                      </span>

                    </div>

                    {index < steps.length - 1 && (
                      <div className="mx-4 h-px w-8 bg-border sm:w-12 lg:w-20" />
                    )}

                  </div>
                );
              })}

            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8 lg:py-14">

            <div>

              {/* =================================================
                  STEP 1
              ================================================== */}
              {currentStep === 1 && (
                <StepCard
                  step="Step 1"
                  title="Vehicle details"
                  description="Tell us about the vehicle you want to sell."
                >
                  <div className="grid gap-5 sm:grid-cols-2">

                    <Field label="Make" required>
                      <input
                        required
                        className="input"
                        placeholder="e.g. Toyota"
                        value={form.make}
                        onChange={(event) =>
                          updateField(
                            "make",
                            event.target.value
                          )
                        }
                      />
                    </Field>

                    <Field label="Model" required>
                      <input
                        required
                        className="input"
                        placeholder="e.g. Land Cruiser"
                        value={form.model}
                        onChange={(event) =>
                          updateField(
                            "model",
                            event.target.value
                          )
                        }
                      />
                    </Field>

                    <Field label="Year" required>
                      <input
                        required
                        type="number"
                        min="1900"
                        max="2030"
                        className="input"
                        placeholder="2022"
                        value={form.year}
                        onChange={(event) =>
                          updateField(
                            "year",
                            event.target.value
                          )
                        }
                      />
                    </Field>

                    <Field label="Mileage" required>
                      <input
                        required
                        className="input"
                        placeholder="45,000"
                        value={form.mileage}
                        onChange={(event) =>
                          updateField(
                            "mileage",
                            event.target.value
                          )
                        }
                      />
                    </Field>

                    <Field label="Transmission" required>
                      <select
                        required
                        className="input"
                        value={form.transmission}
                        onChange={(event) =>
                          updateField(
                            "transmission",
                            event.target.value
                          )
                        }
                      >
                        <option value="">
                          Select transmission
                        </option>
                        <option>Automatic</option>
                        <option>Manual</option>
                        <option>CVT</option>
                      </select>
                    </Field>

                    <Field label="Fuel Type" required>
                      <select
                        required
                        className="input"
                        value={form.fuel}
                        onChange={(event) =>
                          updateField(
                            "fuel",
                            event.target.value
                          )
                        }
                      >
                        <option value="">
                          Select fuel type
                        </option>
                        <option>Petrol</option>
                        <option>Diesel</option>
                        <option>Hybrid</option>
                        <option>Electric</option>
                      </select>
                    </Field>

                    <Field label="Body Type" required>
                      <select
                        required
                        className="input"
                        value={form.bodyType}
                        onChange={(event) =>
                          updateField(
                            "bodyType",
                            event.target.value
                          )
                        }
                      >
                        <option value="">
                          Select body type
                        </option>
                        <option>SUV</option>
                        <option>Sedan</option>
                        <option>Coupe</option>
                        <option>Convertible</option>
                        <option>Hatchback</option>
                        <option>Pickup</option>
                        <option>Van</option>
                        <option>Wagon</option>
                      </select>
                    </Field>

                    <Field label="VIN">
                      <input
                        className="input"
                        placeholder="17-character VIN"
                        value={form.vin}
                        onChange={(event) =>
                          updateField(
                            "vin",
                            event.target.value
                          )
                        }
                      />
                    </Field>

                  </div>
                </StepCard>
              )}

              {/* =================================================
                  STEP 2
              ================================================== */}
              {currentStep === 2 && (
                <StepCard
                  step="Step 2"
                  title="Vehicle condition"
                  description="Give buyers a clear picture of the vehicle's condition."
                >
                  <div className="space-y-5">

                    <Field label="Overall Condition" required>
                      <select
                        required
                        className="input"
                        value={form.condition}
                        onChange={(event) =>
                          updateField(
                            "condition",
                            event.target.value
                          )
                        }
                      >
                        <option value="">
                          Select condition
                        </option>
                        <option>Excellent</option>
                        <option>Very Good</option>
                        <option>Good</option>
                        <option>Fair</option>
                        <option>Needs Work</option>
                      </select>
                    </Field>

                    <Field label="Accident History" required>
                      <select
                        required
                        className="input"
                        value={form.accidentHistory}
                        onChange={(event) =>
                          updateField(
                            "accidentHistory",
                            event.target.value
                          )
                        }
                      >
                        <option value="">
                          Select an option
                        </option>
                        <option>
                          No known accidents
                        </option>
                        <option>
                          Previously involved in an accident
                        </option>
                        <option>Unknown</option>
                      </select>
                    </Field>

                    <Field label="Service History" required>
                      <select
                        required
                        className="input"
                        value={form.serviceHistory}
                        onChange={(event) =>
                          updateField(
                            "serviceHistory",
                            event.target.value
                          )
                        }
                      >
                        <option value="">
                          Select service history
                        </option>
                        <option>
                          Full service history
                        </option>
                        <option>
                          Partial service history
                        </option>
                        <option>
                          No documented service history
                        </option>
                      </select>
                    </Field>

                    <Field
                      label="Mechanical Condition"
                      required
                    >
                      <textarea
                        required
                        rows={5}
                        className="textarea"
                        placeholder="Describe the engine, transmission, suspension and any known mechanical issues."
                        value={form.mechanicalCondition}
                        onChange={(event) =>
                          updateField(
                            "mechanicalCondition",
                            event.target.value
                          )
                        }
                      />
                    </Field>

                    <Field label="Ownership">
                      <select
                        className="input"
                        value={form.ownership}
                        onChange={(event) =>
                          updateField(
                            "ownership",
                            event.target.value
                          )
                        }
                      >
                        <option value="">
                          Select ownership
                        </option>
                        <option>First owner</option>
                        <option>Second owner</option>
                        <option>
                          Multiple previous owners
                        </option>
                      </select>
                    </Field>

                  </div>
                </StepCard>
              )}

              {/* =================================================
                  STEP 3
              ================================================== */}
              {currentStep === 3 && (
                <StepCard
                  step="Step 3"
                  title="Vehicle photos"
                  description="Upload clear photos so buyers can inspect the vehicle."
                >

                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background px-6 py-14 text-center transition-colors hover:bg-surface">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border">
                      <UploadIcon />
                    </div>

                    <p className="mt-4 text-sm font-medium text-foreground">
                      Upload vehicle photos
                    </p>

                    <p className="mt-2 text-sm text-muted">
                      Add up to 12 images
                    </p>

                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />

                  </label>

                  {photos.length > 0 && (
                    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">

                      {photos.map((photo, index) => (
                        <div
                          key={`${photo}-${index}`}
                          className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-background"
                        >

                          <img
                            src={photo}
                            alt={`Vehicle photo ${index + 1}`}
                            className="h-full w-full object-cover"
                          />

                          {index === 0 && (
                            <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground">
                              Primary
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              removePhoto(index)
                            }
                            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-foreground"
                            aria-label={`Remove photo ${index + 1}`}
                          >
                            <CloseIcon />
                          </button>

                        </div>
                      ))}

                    </div>
                  )}

                  <div className="mt-6 rounded-2xl border border-border bg-background p-5">

                    <p className="text-sm font-medium text-foreground">
                      Recommended photos
                    </p>

                    <div className="mt-3 space-y-2 text-sm leading-6 text-muted">
                      <p>
                        • Front, rear and side exterior views
                      </p>
                      <p>• Interior and dashboard</p>
                      <p>• Wheels and tyres</p>
                      <p>• Engine bay</p>
                      <p>• Any visible damage</p>
                    </div>

                  </div>

                </StepCard>
              )}

              {/* =================================================
                  STEP 4
              ================================================== */}
              {currentStep === 4 && (
                <StepCard
                  step="Step 4"
                  title="Auction details"
                  description="Choose how your vehicle will enter the auction."
                >

                  <div className="grid gap-5 sm:grid-cols-2">

                    <Field
                      label="Starting Bid (USD)"
                      required
                    >
                      <div className="relative">

                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                          $
                        </span>

                        <input
                          required
                          type="number"
                          min="1"
                          className="input pl-8"
                          placeholder="8,500"
                          value={form.startingBid}
                          onChange={(event) =>
                            updateField(
                              "startingBid",
                              event.target.value
                            )
                          }
                        />

                      </div>
                    </Field>

                    <Field label="Reserve Price (USD)">
                      <div className="relative">

                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                          $
                        </span>

                        <input
                          type="number"
                          min="1"
                          className="input pl-8"
                          placeholder="Optional"
                          value={form.reservePrice}
                          onChange={(event) =>
                            updateField(
                              "reservePrice",
                              event.target.value
                            )
                          }
                        />

                      </div>
                    </Field>

                    <Field
                      label="Auction Duration"
                      required
                    >
                      <select
                        required
                        className="input"
                        value={form.auctionDuration}
                        onChange={(event) =>
                          updateField(
                            "auctionDuration",
                            event.target.value
                          )
                        }
                      >
                        <option value="3">
                          3 days
                        </option>
                        <option value="5">
                          5 days
                        </option>
                        <option value="7">
                          7 days
                        </option>
                        <option value="10">
                          10 days
                        </option>
                        <option value="14">
                          14 days
                        </option>
                      </select>
                    </Field>

                    <Field
                      label="Vehicle Location"
                      required
                    >
                      <input
                        required
                        className="input"
                        placeholder="e.g. Nairobi, Kenya"
                        value={form.location}
                        onChange={(event) =>
                          updateField(
                            "location",
                            event.target.value
                          )
                        }
                      />
                    </Field>

                  </div>

                  <div className="mt-8 rounded-2xl border border-border bg-background p-5">

                    <p className="text-sm font-medium text-foreground">
                      What happens next?
                    </p>

                    <p className="mt-2 text-sm leading-6 text-muted">
                      Your submission will be reviewed before
                      the vehicle is approved for auction.
                      Approved vehicles can then be made available
                      to bidders.
                    </p>

                  </div>

                </StepCard>
              )}

              {/* =================================================
                  STEP 5
              ================================================== */}
              {currentStep === 5 && (
                <StepCard
                  step="Step 5"
                  title="Review your listing"
                  description="Check your information before submitting the vehicle."
                >

                  <div className="space-y-5">

                    <ReviewSection title="Vehicle">

                      <ReviewRow label="Vehicle">
                        {vehicleName || "Not provided"}
                      </ReviewRow>

                      <ReviewRow label="Mileage">
                        {form.mileage || "Not provided"}
                      </ReviewRow>

                      <ReviewRow label="Transmission">
                        {form.transmission || "Not provided"}
                      </ReviewRow>

                      <ReviewRow label="Fuel">
                        {form.fuel || "Not provided"}
                      </ReviewRow>

                      <ReviewRow label="Body Type">
                        {form.bodyType || "Not provided"}
                      </ReviewRow>

                    </ReviewSection>

                    <ReviewSection title="Condition">

                      <ReviewRow label="Condition">
                        {form.condition || "Not provided"}
                      </ReviewRow>

                      <ReviewRow label="Accident history">
                        {form.accidentHistory ||
                          "Not provided"}
                      </ReviewRow>

                      <ReviewRow label="Service history">
                        {form.serviceHistory ||
                          "Not provided"}
                      </ReviewRow>

                    </ReviewSection>

                    <ReviewSection title="Auction">

                      <ReviewRow label="Starting bid">
                        {startingBid}
                      </ReviewRow>

                      <ReviewRow label="Reserve">
                        {reservePrice}
                      </ReviewRow>

                      <ReviewRow label="Duration">
                        {form.auctionDuration} days
                      </ReviewRow>

                      <ReviewRow label="Location">
                        {form.location || "Not provided"}
                      </ReviewRow>

                    </ReviewSection>

                    <div className="rounded-2xl border border-border bg-surface p-5">

                      <div className="flex gap-3">

                        <InfoIcon />

                        <div>

                          <p className="text-sm font-medium text-foreground">
                            Prototype submission
                          </p>

                          <p className="mt-2 text-sm leading-6 text-muted">
                            This prototype demonstrates the
                            seller journey. Production
                            verification, storage and auction
                            approval would be connected to the
                            backend later.
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                </StepCard>
              )}

              {/* =================================================
                  NAVIGATION
              ================================================== */}
              <div className="mt-6 flex items-center justify-between">

                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={goBack}
                    className="rounded-xl border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="rounded-xl bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="rounded-xl bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
                  >
                    Submit Vehicle
                  </button>
                )}

              </div>

            </div>

            {/* =====================================================
                LISTING PREVIEW
            ====================================================== */}
            <aside className="lg:sticky lg:top-24 lg:self-start">

              <div className="rounded-3xl border border-border bg-surface p-6">

                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                  Listing Preview
                </p>

                <div className="mt-5 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-border bg-background">

                  {photos[0] ? (
                    <img
                      src={photos[0]}
                      alt="Primary vehicle"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-center">

                      <CarIcon />

                      <p className="mt-3 text-sm text-muted">
                        Vehicle image
                      </p>

                    </div>
                  )}

                </div>

                <h2 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                  {vehicleName || "Your vehicle"}
                </h2>

                <div className="mt-5 space-y-3">

                  <SidebarRow label="Starting bid">
                    {startingBid}
                  </SidebarRow>

                  <SidebarRow label="Auction">
                    {form.auctionDuration} days
                  </SidebarRow>

                  <SidebarRow label="Photos">
                    {photos.length} / 12
                  </SidebarRow>

                  <SidebarRow label="Location">
                    {form.location || "—"}
                  </SidebarRow>

                </div>

              </div>

              <div className="mt-4 rounded-2xl border border-border p-5">

                <div className="flex gap-3">

                  <ShieldIcon />

                  <div>

                    <p className="text-sm font-medium text-foreground">
                      Secure marketplace
                    </p>

                    <p className="mt-2 text-xs leading-5 text-muted">
                      Vehicle information can be reviewed
                      before a listing goes live.
                    </p>

                  </div>

                </div>

              </div>

            </aside>

          </div>

        </form>

      </section>

    </main>
  );
}

/* ===============================================================
   COMPONENTS
================================================================ */

function StepCard({
  step,
  title,
  description,
  children,
}: {
  step: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-border bg-surface p-6 sm:p-8">

      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
        {step}
      </p>

      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>

      <p className="mt-3 text-sm leading-6 text-muted">
        {description}
      </p>

      <div className="mt-8">
        {children}
      </div>

    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">

      <span className="mb-2 block text-sm font-medium text-foreground">
        {label}
        {required && (
          <span className="ml-1 text-muted">*</span>
        )}
      </span>

      {children}

    </label>
  );
}

function ReviewSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-5">

      <h3 className="text-sm font-medium text-foreground">
        {title}
      </h3>

      <div className="mt-4 divide-y divide-border">
        {children}
      </div>

    </div>
  );
}

function ReviewRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-5 py-3 first:pt-0 last:pb-0">

      <span className="text-sm text-muted">
        {label}
      </span>

      <span className="text-right text-sm font-medium text-foreground">
        {children}
      </span>

    </div>
  );
}

function SidebarRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">

      <span className="text-sm text-muted">
        {label}
      </span>

      <span className="text-right text-sm font-medium text-foreground">
        {children}
      </span>

    </div>
  );
}

function TrustItem({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-white/70">
      {icon}
      {text}
    </div>
  );
}

function HowStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">

      <span className="text-xs font-medium tracking-[0.15em] text-muted">
        {number}
      </span>

      <h3 className="mt-5 text-lg font-semibold text-foreground">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-muted">
        {description}
      </p>

    </div>
  );
}

/* ===============================================================
   ICONS
================================================================ */

function CheckIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ArrowRightIcon() {
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
      className="transition-transform group-hover:translate-x-1"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 16V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M5 20h14" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 shrink-0 text-muted"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function UsersIcon() {
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
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mx-auto text-muted"
    >
      <path d="m5 17-1-5 2-5h12l2 5-1 5" />
      <path d="M4 12h16" />
      <path d="M7 17v2" />
      <path d="M17 17v2" />
      <circle cx="7" cy="17" r="1.5" />
      <circle cx="17" cy="17" r="1.5" />
    </svg>
  );
}