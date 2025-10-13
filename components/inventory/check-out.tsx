import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Scan, Check, AlertTriangle } from "lucide-react"
import { inventoryItems } from "@/lib/inventory-data"
import { Link } from "react-router-dom"

export function CheckOut() {
  const [skuInput, setSkuInput] = useState("")
  const [quantity, setQuantity] = useState("1")
  const [reference, setReference] = useState("")
  const [notes, setNotes] = useState("")
  const [scannedItem, setScannedItem] = useState<(typeof inventoryItems)[0] | null>(null)
  const [recentCheckouts, setRecentCheckouts] = useState<
    Array<{ item: (typeof inventoryItems)[0]; quantity: number; timestamp: Date }>
  >([])

  const handleScan = () => {
    const item = inventoryItems.find((i) => i.sku.toLowerCase() === skuInput.toLowerCase() || i.barcode === skuInput)
    if (item) {
      setScannedItem(item)
    }
  }

  const handleConfirm = () => {
    if (scannedItem && quantity) {
      setRecentCheckouts([
        { item: scannedItem, quantity: Number.parseInt(quantity), timestamp: new Date() },
        ...recentCheckouts.slice(0, 4),
      ])
      setScannedItem(null)
      setSkuInput("")
      setQuantity("1")
      setReference("")
      setNotes("")
    }
  }

  const isLowStock = scannedItem && scannedItem.onHandQty - Number.parseInt(quantity || "0") < scannedItem.minQty

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/inventory">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Check-Out</h1>
            <p className="text-muted-foreground">Issue stock from inventory</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Checkout Interface */}
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Scan className="w-5 h-5 text-orange-600" />
                </div>
                <h2 className="text-xl font-semibold">Scan Item</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>SKU / Barcode</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter or scan SKU/barcode..."
                      value={skuInput}
                      onChange={(e) => setSkuInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleScan()}
                    />
                    <Button onClick={handleScan}>
                      <Scan className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {scannedItem && (
                  <>
                    <div className="p-4 border rounded-lg bg-muted/30">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{scannedItem.productName}</h3>
                          <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20">Found</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">SKU</p>
                            <p className="font-mono">{scannedItem.sku}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Location</p>
                            <p className="font-mono">{scannedItem.location}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Available</p>
                            <p className="font-semibold">{scannedItem.onHandQty - scannedItem.allocated}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Min Qty</p>
                            <p className="font-semibold">{scannedItem.minQty}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {isLowStock && (
                      <div className="p-3 border border-yellow-500/20 rounded-lg bg-yellow-500/10 flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-semibold text-yellow-600">Low Stock Warning</p>
                          <p className="text-yellow-600/80">This checkout will bring stock below minimum quantity</p>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        min="1"
                        max={scannedItem.onHandQty - scannedItem.allocated}
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Enter quantity..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Reference (Optional)</Label>
                      <Input
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        placeholder="Work order, sales order..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Notes (Optional)</Label>
                      <Textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Additional notes..."
                        rows={3}
                      />
                    </div>

                    <Button onClick={handleConfirm} className="w-full" size="lg">
                      <Check className="w-4 h-4 mr-2" />
                      Confirm Check-Out
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>

          {/* Recent Checkouts */}
          <Card className="p-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Recent Check-Outs</h2>
              {recentCheckouts.length > 0 ? (
                <div className="space-y-3">
                  {recentCheckouts.map((checkout, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <p className="font-semibold">{checkout.item.productName}</p>
                          <p className="text-sm text-muted-foreground font-mono">{checkout.item.sku}</p>
                          <div className="flex items-center gap-2 text-sm">
                            <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20">
                              -{checkout.quantity}
                            </Badge>
                            <span className="text-muted-foreground">{checkout.timestamp.toLocaleTimeString()}</span>
                          </div>
                        </div>
                        <Check className="w-5 h-5 text-orange-600" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Scan className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No recent check-outs</p>
                  <p className="text-sm">Start checking out items to see them here</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
