import Hero from "@/components/Hero";
import LiveBids from "@/components/LiveBids";
import HowItWorks from "@/components/HowItWorks";
import UpcomingAuctions from "@/components/UpcomingAuctions";
import VehicleAssurance from "@/components/VehicleAssurance";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <LiveBids />
      <HowItWorks />
      <UpcomingAuctions />
      <VehicleAssurance />
      <FinalCTA />
    </main>
  );
}