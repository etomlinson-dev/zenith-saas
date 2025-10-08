import { useParams } from 'react-router-dom'
import { ItemDetail } from '@/components/inventory/item-detail'

export default function InventoryItemDetailPage() {
  const { id } = useParams()
  
  if (!id) {
    return <div>Item not found</div>
  }
  
  return <ItemDetail itemId={id} />
}

