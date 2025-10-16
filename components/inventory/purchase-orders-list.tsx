import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react"
import { purchaseOrders } from "@/lib/inventory-data"
import { Link } from "react-router-dom"

export function PurchaseOrdersList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredPOs = purchaseOrders.filter(
    (po) =>
      po.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      po.supplier.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredPOs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedPOs = filteredPOs.slice(startIndex, startIndex + itemsPerPage)

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
              <h1 className="text-3xl font-bold">Purchase Orders</h1>
              <p className="text-muted-foreground">Manage and track purchase orders</p>
            </div>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Purchase Order
          </Button>
        </div>

        {/* PO List */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">All Purchase Orders</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search PO number, supplier..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
            </div>

            {/* PO Table */}
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium">PO Number</th>
                    <th className="text-left p-4 font-medium">Supplier</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Total</th>
                    <th className="text-left p-4 font-medium">Created Date</th>
                    <th className="text-left p-4 font-medium">Expected Date</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedPOs.map((po) => (
                    <tr key={po.id} className="border-t hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-mono text-sm">{po.poNumber}</td>
                      <td className="p-4">{po.supplier}</td>
                      <td className="p-4">
                        <Badge className={getStatusColor(po.status)}>
                          {po.status.charAt(0).toUpperCase() + po.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="p-4 font-semibold">${po.total.toFixed(2)}</td>
                      <td className="p-4 text-sm">{po.createdDate.toLocaleDateString()}</td>
                      <td className="p-4 text-sm">{po.expectedDate ? po.expectedDate.toLocaleDateString() : "-"}</td>
                      <td className="p-4">
                        <Link href={`/inventory/purchase-orders/${po.id}`}>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredPOs.length)} of{" "}
                {filteredPOs.length} purchase orders
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
