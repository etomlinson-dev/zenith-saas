"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowDown, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react"
import { transactions } from "@/lib/inventory-data"
import { Link } from "react-router-dom"

export function TransactionsList() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const totalPages = Math.ceil(transactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTransactions = transactions.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/inventory">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Transactions</h1>
            <p className="text-muted-foreground">View all inventory transactions</p>
          </div>
        </div>

        {/* Transactions Table */}
        <Card className="p-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">All Transactions</h2>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium">Type</th>
                    <th className="text-left p-4 font-medium">SKU</th>
                    <th className="text-left p-4 font-medium">Product Name</th>
                    <th className="text-left p-4 font-medium">Quantity</th>
                    <th className="text-left p-4 font-medium">Date</th>
                    <th className="text-left p-4 font-medium">User</th>
                    <th className="text-left p-4 font-medium">Reference</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-t hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <Badge
                          className={
                            transaction.type === "scan-in"
                              ? "bg-green-500/10 text-green-600 border-green-500/20"
                              : "bg-orange-500/10 text-orange-600 border-orange-500/20"
                          }
                        >
                          {transaction.type === "scan-in" ? (
                            <ArrowDown className="w-3 h-3 mr-1" />
                          ) : (
                            <ArrowUp className="w-3 h-3 mr-1" />
                          )}
                          {transaction.type === "scan-in" ? "Scan-In" : "Check-Out"}
                        </Badge>
                      </td>
                      <td className="p-4 font-mono text-sm">{transaction.sku}</td>
                      <td className="p-4">{transaction.productName}</td>
                      <td className="p-4">
                        <span
                          className={`font-semibold ${transaction.type === "scan-in" ? "text-green-600" : "text-orange-600"}`}
                        >
                          {transaction.type === "scan-in" ? "+" : "-"}
                          {transaction.quantity}
                        </span>
                      </td>
                      <td className="p-4 text-sm">{transaction.date.toLocaleString()}</td>
                      <td className="p-4 text-sm">{transaction.user}</td>
                      <td className="p-4 font-mono text-sm">{transaction.reference || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, transactions.length)} of{" "}
                {transactions.length} transactions
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
