"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, ArrowDown, ArrowUp, Package, DollarSign, MapPin, TrendingUp, Calendar } from "lucide-react"
import { inventoryItems, inventoryMovements } from "@/lib/inventory-data"
import { Link } from "react-router-dom"

interface ItemDetailProps {
  itemId: string
}

export function ItemDetail({ itemId }: ItemDetailProps) {
  const item = inventoryItems.find((i) => i.id === itemId)
  const movements = inventoryMovements.filter((m) => m.itemId === itemId)

  if (!item) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <p>Item not found</p>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-stock":
        return "bg-green-500/10 text-green-600 border-green-500/20"
      case "low-stock":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "out-of-stock":
        return "bg-red-500/10 text-red-600 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/inventory">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">{item.productName}</h1>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-sm text-muted-foreground font-mono">{item.sku}</span>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{item.location}</span>
                <Badge className={getStatusColor(item.status)}>
                  {item.status === "in-stock" && "In Stock"}
                  {item.status === "low-stock" && "Low Stock"}
                  {item.status === "out-of-stock" && "Out of Stock"}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <ArrowDown className="w-4 h-4 mr-2" />
              Scan In
            </Button>
            <Button variant="outline">
              <ArrowUp className="w-4 h-4 mr-2" />
              Scan Out
            </Button>
            <Button>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Item Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">On Hand</p>
                    <p className="text-2xl font-bold">{item.onHandQty}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Min Qty</p>
                    <p className="text-2xl font-bold">{item.minQty}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Unit Cost</p>
                    <p className="text-2xl font-bold">${item.unitCost}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-lg font-bold font-mono">{item.location}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Item Information */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Item Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Supplier</p>
                  <p className="font-medium">{item.supplier}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium">{item.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Barcode</p>
                  <p className="font-mono text-sm">{item.barcode}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reorder Qty</p>
                  <p className="font-medium">{item.reorderQty}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Allocated</p>
                  <p className="font-medium">{item.allocated}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="font-medium">${item.totalValue.toFixed(2)}</p>
                </div>
              </div>
            </Card>

            {/* Recent Movements */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Movements</h2>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium">Date</th>
                      <th className="text-left p-4 font-medium">Reason</th>
                      <th className="text-left p-4 font-medium">Change</th>
                      <th className="text-left p-4 font-medium">Reference</th>
                      <th className="text-left p-4 font-medium">User</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movements.length > 0 ? (
                      movements.map((movement) => (
                        <tr key={movement.id} className="border-t hover:bg-muted/30 transition-colors">
                          <td className="p-4 text-sm">{movement.date.toLocaleDateString()}</td>
                          <td className="p-4">{movement.reason}</td>
                          <td className="p-4">
                            <span
                              className={`font-semibold ${movement.change > 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              {movement.change > 0 ? "+" : ""}
                              {movement.change}
                            </span>
                          </td>
                          <td className="p-4 font-mono text-sm">{movement.reference}</td>
                          <td className="p-4 text-sm">{movement.user}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-muted-foreground">
                          No movements recorded
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Right Panel - Image & Quick Actions */}
          <div className="space-y-6">
            {/* Item Image */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Item Image</h3>
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <Package className="w-16 h-16 text-muted-foreground" />
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                Upload Image
              </Button>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Available</span>
                  <span className="font-semibold">{item.onHandQty - item.allocated}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Allocated</span>
                  <span className="font-semibold">{item.allocated}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Reorder Point</span>
                  <span className="font-semibold">{item.minQty}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Reorder Qty</span>
                  <span className="font-semibold">{item.reorderQty}</span>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Value</span>
                    <span className="text-lg font-bold">${item.totalValue.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Last Movement */}
            {item.lastMovement && (
              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Last Movement</p>
                    <p className="font-medium">{item.lastMovement.toLocaleDateString()}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
