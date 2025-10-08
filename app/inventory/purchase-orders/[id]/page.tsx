import { PurchaseOrderDetail } from "@/components/inventory/purchase-order-detail"

export default function PurchaseOrderDetailPage({ params }: { params: { id: string } }) {
  return <PurchaseOrderDetail poId={params.id} />
}
