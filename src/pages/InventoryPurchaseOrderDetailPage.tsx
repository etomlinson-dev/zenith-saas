import { useParams } from 'react-router-dom'
import { PurchaseOrderDetail } from '@/components/inventory/purchase-order-detail'

export default function InventoryPurchaseOrderDetailPage() {
  const { id } = useParams()
  
  if (!id) {
    return <div>Purchase order not found</div>
  }
  
  return <PurchaseOrderDetail poId={id} />
}

