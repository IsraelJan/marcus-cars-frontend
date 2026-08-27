import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LiveBids from "@/components/LiveBids";
import HowItWorks from "@/components/HowItWorks";
import UpcomingAuctions from "@/components/UpcomingAuctions";
import VehicleAssurance from "@/components/VehicleAssurance";




export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <LiveBids />
      <HowItWorks />
      <UpcomingAuctions />
      <VehicleAssurance />
    </main>
  );
}