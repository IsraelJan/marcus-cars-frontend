import AuctionDetailClient from "@/components/AuctionDetailClient";

interface AuctionDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AuctionDetailPage({
  params,
}: AuctionDetailPageProps) {
  const { id } = await params;

  const vehicleId = Number(id);

  return <AuctionDetailClient vehicleId={vehicleId} />;
}