"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  TrendingUp,
  Clock,
  Package,
} from "lucide-react"
import { suppliers } from "@/lib/inventory-data"
import Link from "next/link"

export function SuppliersList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedSuppliers = filteredSuppliers.slice(startIndex, startIndex + itemsPerPage)

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-yellow-600"
    return "text-red-600"
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
              <h1 className="text-3xl font-bold">Suppliers</h1>
              <p className="text-muted-foreground">Manage supplier relationships and performance</p>
            </div>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Supplier
          </Button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search suppliers, contact name, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedSuppliers.map((supplier) => (
            <Card key={supplier.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                {/* Supplier Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{supplier.name}</h3>
                    <p className="text-sm text-muted-foreground">{supplier.contactName}</p>
                  </div>
                  <Badge className={`${getPerformanceColor(supplier.performanceScore)} bg-transparent border`}>
                    {supplier.performanceScore}%
                  </Badge>
                </div>

                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{supplier.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{supplier.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{supplier.address}</span>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Package className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <p className="text-lg font-bold">{supplier.totalOrders}</p>
                    <p className="text-xs text-muted-foreground">Orders</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <p className="text-lg font-bold">{supplier.leadTime}d</p>
                    <p className="text-xs text-muted-foreground">Lead Time</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <TrendingUp className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <p className="text-lg font-bold">{supplier.onTimeDelivery}%</p>
                    <p className="text-xs text-muted-foreground">On Time</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    Edit
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredSuppliers.length)} of{" "}
            {filteredSuppliers.length} suppliers
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
    </div>
  )
}
