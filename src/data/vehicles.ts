export type VehicleCategory =
  | "SUV"
  | "Sedan"
  | "Pickup"
  | "Electric";

export type Vehicle = {
  id: number;
  year: number;
  make: string;
  model: string;
  trim: string;
  category: VehicleCategory;
  price: number;
  mileage: number;
  location: string;
  fuel: string;
  transmission: string;
  drivetrain: string;
  exterior: string;
  interior: string;
  popular?: boolean;
  images: string[];
  description: string;
  condition: string;
  vin: string;
  stockNumber: string;
  seats: number;
};

export const vehicles: Vehicle[] = [
  {
    id: 1,
    year: 2022,
    make: "Mercedes-Benz",
    model: "G-Class",
    trim: "AMG G 63",
    category: "SUV",
    price: 142500,
    mileage: 24580,
    location: "Dallas, TX",
    fuel: "Gasoline",
    transmission: "Automatic",
    drivetrain: "AWD",
    exterior: "Obsidian Black",
    interior: "Black Nappa Leather",
    popular: true,
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=2000&q=90",
    ],
    description:
      "A striking Mercedes-Benz G-Class offering commanding road presence, premium materials and exceptional performance.",
    condition:
      "Well-presented vehicle with detailed information available for buyer review.",
    vin: "W1N463276MA000001",
    stockNumber: "MC-1001",
    seats: 5,
  },

  {
    id: 2,
    year: 2023,
    make: "Tesla",
    model: "Model Y",
    trim: "Long Range AWD",
    category: "Electric",
    price: 42990,
    mileage: 18240,
    location: "Austin, TX",
    fuel: "Electric",
    transmission: "Single-Speed",
    drivetrain: "AWD",
    exterior: "Pearl White",
    interior: "Black",
    images: [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=2000&q=90",
    ],
    description:
      "A fully electric Tesla Model Y combining long-range capability, modern technology and practical SUV versatility.",
    condition:
      "Electric vehicle with detailed specifications and condition information available.",
    vin: "7SAYGDEF5PF000002",
    stockNumber: "MC-1002",
    seats: 5,
  },

  {
    id: 3,
    year: 2021,
    make: "Ford",
    model: "F-150",
    trim: "Lariat SuperCrew",
    category: "Pickup",
    price: 48900,
    mileage: 34120,
    location: "Houston, TX",
    fuel: "Gasoline",
    transmission: "Automatic",
    drivetrain: "4WD",
    exterior: "Agate Black",
    interior: "Black Leather",
    images: [
      "https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1583267746897-2cf415887172?auto=format&fit=crop&w=2000&q=90",
    ],
    description:
      "A capable Ford F-150 Lariat designed for everyday driving, utility and demanding work.",
    condition:
      "Well-presented pickup with detailed vehicle information available.",
    vin: "1FTFW1ED4MFA00003",
    stockNumber: "MC-1003",
    seats: 5,
  },

  {
    id: 4,
    year: 2022,
    make: "BMW",
    model: "M4",
    trim: "Competition",
    category: "Sedan",
    price: 72400,
    mileage: 14680,
    location: "Miami, FL",
    fuel: "Gasoline",
    transmission: "Automatic",
    drivetrain: "RWD",
    exterior: "Brooklyn Grey",
    interior: "Black Merino Leather",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=2000&q=90",
    ],
    description:
      "A performance-focused BMW M4 Competition combining aggressive styling, precision handling and a premium interior.",
    condition:
      "Well-presented performance sedan with detailed vehicle information available.",
    vin: "WBS33BA00NCA00004",
    stockNumber: "MC-1004",
    seats: 5,
  },

  {
    id: 5,
    year: 2023,
    make: "Porsche",
    model: "Cayenne",
    trim: "GTS",
    category: "SUV",
    price: 96800,
    mileage: 11920,
    location: "Scottsdale, AZ",
    fuel: "Gasoline",
    transmission: "Automatic",
    drivetrain: "AWD",
    exterior: "Carmine Red",
    interior: "Black",
    images: [
      "https://images.unsplash.com/photo-1611651338412-8403fa6e3599?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=90",
    ],
    description:
      "A premium Porsche Cayenne GTS combining strong performance, luxury materials and everyday SUV practicality.",
    condition:
      "Premium SUV with detailed specifications available for buyer review.",
    vin: "WP1AG2A50PLA00005",
    stockNumber: "MC-1005",
    seats: 5,
  },

  {
    id: 6,
    year: 2020,
    make: "Toyota",
    model: "Tacoma",
    trim: "TRD Off-Road",
    category: "Pickup",
    price: 36900,
    mileage: 42100,
    location: "Phoenix, AZ",
    fuel: "Gasoline",
    transmission: "Automatic",
    drivetrain: "4WD",
    exterior: "Cement Grey",
    interior: "Black",
    images: [
      "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?auto=format&fit=crop&w=2000&q=90",
    ],
    description:
      "A dependable Toyota Tacoma TRD Off-Road built for utility, outdoor use and everyday driving.",
    condition:
      "Well-presented pickup with capability and specification information available.",
    vin: "3TMCZ5AN9LM000006",
    stockNumber: "MC-1006",
    seats: 5,
  },

  {
    id: 7,
    year: 2022,
    make: "Audi",
    model: "RS5",
    trim: "Sportback",
    category: "Sedan",
    price: 63500,
    mileage: 21750,
    location: "Atlanta, GA",
    fuel: "Gasoline",
    transmission: "Automatic",
    drivetrain: "AWD",
    exterior: "Glacier White",
    interior: "Black",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=2000&q=90",
    ],
    description:
      "A performance-oriented Audi RS5 Sportback offering strong performance, refined technology and everyday practicality.",
    condition:
      "Well-presented performance vehicle with detailed information available.",
    vin: "WUAANAF51NA000007",
    stockNumber: "MC-1007",
    seats: 5,
  },

  {
    id: 8,
    year: 2021,
    make: "Lexus",
    model: "RX 350",
    trim: "F Sport",
    category: "SUV",
    price: 44800,
    mileage: 28760,
    location: "Los Angeles, CA",
    fuel: "Gasoline",
    transmission: "Automatic",
    drivetrain: "AWD",
    exterior: "Atomic Silver",
    interior: "Black",
    images: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=2000&q=90",
    ],
    description:
      "A refined Lexus RX 350 F Sport combining comfort, premium design and all-wheel-drive capability.",
    condition:
      "Well-presented SUV with detailed vehicle information available.",
    vin: "2T2BZMCA8MC000008",
    stockNumber: "MC-1008",
    seats: 5,
  },
];

export function getVehicleById(id: string | number) {
  return vehicles.find(
    (vehicle) => vehicle.id.toString() === id.toString(),
  );
}