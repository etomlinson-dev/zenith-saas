"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Edit, Check, X, FileText, Calendar, DollarSign, Package } from "lucide-react"
import { purchaseOrders } from "@/lib/inventory-data"
import Link from "next/link"

interface PurchaseOrderDetailProps {
  poId: string
}

export function PurchaseOrderDetail({ poId }: PurchaseOrderDetailProps) {
  const po = purchaseOrders.find((p) => p.id === poId)

  if (!po) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <p>Purchase order not found</p>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-500/10 text-gray-600 border-gray-500/20"
      case "open":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      case "pending":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "received":
        return "bg-green-500/10 text-green-600 border-green-500/20"
      case "cancelled":
        return "bg-red-500/10 text-red-600 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  const totalReceived = po.lineItems.reduce((sum, item) => sum + item.receivedQty, 0)
  const totalOrdered = po.lineItems.reduce((sum, item) => sum + item.quantity, 0)
  const receiveProgress = (totalReceived / totalOrdered) * 100

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/inventory/purchase-orders">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">{po.poNumber}</h1>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-sm text-muted-foreground">{po.supplier}</span>
                <span className="text-sm text-muted-foreground">•</span>
                <Badge className={getStatusColor(po.status)}>
                  {po.status.charAt(0).toUpperCase() + po.status.slice(1)}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {po.status === "open" && (
              <Button variant="outline">
                <Package className="w-4 h-4 mr-2" />
                Receive Items
              </Button>
            )}
            {po.status === "draft" && (
              <Button>
                <Check className="w-4 h-4 mr-2" />
                Approve
              </Button>
            )}
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            {po.status !== "cancelled" && (
              <Button variant="outline">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            )}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">PO Number</p>
                <p className="font-mono font-semibold">{po.poNumber}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-xl font-bold">${po.total.toFixed(2)}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Created</p>
                <p className="font-semibold">{po.createdDate.toLocaleDateString()}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expected</p>
                <p className="font-semibold">{po.expectedDate ? po.expectedDate.toLocaleDateString() : "TBD"}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Receiving Progress */}
        {po.status === "open" && (
          <Card className="p-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Receiving Progress</h3>
                <span className="text-sm text-muted-foreground">
                  {totalReceived} of {totalOrdered} items received
                </span>
              </div>
              <Progress value={receiveProgress} className="h-2" />
            </div>
          </Card>
        )}

        {/* Line Items */}
        <Card className="p-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Line Items</h2>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium">SKU</th>
                    <th className="text-left p-4 font-medium">Product Name</th>
                    <th className="text-left p-4 font-medium">Quantity</th>
                    <th className="text-left p-4 font-medium">Received</th>
                    <th className="text-left p-4 font-medium">Unit Cost</th>
                    <th className="text-left p-4 font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {po.lineItems.map((item) => (
                    <tr key={item.id} className="border-t hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-mono text-sm">{item.sku}</td>
                      <td className="p-4">{item.productName}</td>
                      <td className="p-4 font-semibold">{item.quantity}</td>
                      <td className="p-4">
                        <span
                          className={`font-semibold ${item.receivedQty === item.quantity ? "text-green-600" : "text-yellow-600"}`}
                        >
                          {item.receivedQty}
                        </span>
                      </td>
                      <td className="p-4">${item.unitCost.toFixed(2)}</td>
                      <td className="p-4 font-semibold">${item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-muted/50 border-t-2">
                  <tr>
                    <td colSpan={5} className="p-4 text-right font-semibold">
                      Total:
                    </td>
                    <td className="p-4 font-bold text-lg">${po.total.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </Card>

        {/* Supplier Information */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Supplier Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Supplier Name</p>
              <p className="font-medium">{po.supplier}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge className={getStatusColor(po.status)}>
                {po.status.charAt(0).toUpperCase() + po.status.slice(1)}
              </Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
