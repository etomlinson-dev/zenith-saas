import { ItemDetail } from "@/components/inventory/item-detail"

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  return <ItemDetail itemId={params.id} />
}
