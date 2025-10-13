import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Package,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  DollarSign,
  Users,
  FileText,
  BarChart3,
  History,
  MapPin,
  Search,
  Filter,
  Plus,
  Download,
  Upload,
  Scan,
  Brain,
  Target,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Truck,
  Star,
  TrendingUp as TrendUp,
} from "lucide-react"

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Mock data for inventory items
  const inventoryItems = [
    {
      id: 1,
      name: "Industrial Sensor XR-500",
      sku: "SEN-XR500",
      category: "Electronics",
      locations: [
        { name: "Main Warehouse", stock: 145, reorderPoint: 50 },
        { name: "Site A", stock: 23, reorderPoint: 20 },
        { name: "Site B", stock: 67, reorderPoint: 30 },
      ],
      totalStock: 235,
      reorderPoint: 100,
      unitCost: 125.5,
      supplier: "TechSupply Co",
      lastOrdered: "2024-01-15",
      demandForecast: 180,
      abcClass: "A",
      serialTracked: true,
    },
    {
      id: 2,
      name: "Hydraulic Pump HP-200",
      sku: "HYD-HP200",
      category: "Machinery",
      locations: [
        { name: "Main Warehouse", stock: 12, reorderPoint: 15 },
        { name: "Site A", stock: 3, reorderPoint: 5 },
      ],
      totalStock: 15,
      reorderPoint: 20,
      unitCost: 850.0,
      supplier: "HydroTech Inc",
      lastOrdered: "2024-01-10",
      demandForecast: 25,
      abcClass: "B",
      serialTracked: true,
    },
    {
      id: 3,
      name: "Safety Gloves (Box of 100)",
      sku: "SAF-GLV100",
      category: "Safety Equipment",
      locations: [
        { name: "Main Warehouse", stock: 450, reorderPoint: 200 },
        { name: "Site A", stock: 120, reorderPoint: 50 },
        { name: "Site B", stock: 180, reorderPoint: 75 },
      ],
      totalStock: 750,
      reorderPoint: 325,
      unitCost: 45.0,
      supplier: "SafetyFirst Ltd",
      lastOrdered: "2024-01-20",
      demandForecast: 600,
      abcClass: "C",
      serialTracked: false,
    },
    {
      id: 4,
      name: "Control Panel CP-1000",
      sku: "CTL-CP1000",
      category: "Electronics",
      locations: [{ name: "Main Warehouse", stock: 8, reorderPoint: 10 }],
      totalStock: 8,
      reorderPoint: 10,
      unitCost: 1250.0,
      supplier: "ControlSys Pro",
      lastOrdered: "2024-01-05",
      demandForecast: 15,
      abcClass: "A",
      serialTracked: true,
    },
    {
      id: 5,
      name: "Lubricant Oil (5L)",
      sku: "LUB-OIL5L",
      category: "Consumables",
      locations: [
        { name: "Main Warehouse", stock: 280, reorderPoint: 150 },
        { name: "Site A", stock: 45, reorderPoint: 30 },
        { name: "Site B", stock: 92, reorderPoint: 50 },
      ],
      totalStock: 417,
      reorderPoint: 230,
      unitCost: 32.5,
      supplier: "Industrial Supplies",
      lastOrdered: "2024-01-18",
      demandForecast: 350,
      abcClass: "C",
      serialTracked: false,
    },
  ]

  // Mock data for suppliers
  const suppliers = [
    {
      id: 1,
      name: "TechSupply Co",
      category: "Electronics",
      onTimeDelivery: 94,
      qualityScore: 92,
      avgLeadTime: 7,
      totalOrders: 156,
      activeContracts: 3,
      riskLevel: "low",
      lastOrder: "2024-01-15",
      totalSpend: 125000,
    },
    {
      id: 2,
      name: "HydroTech Inc",
      category: "Machinery",
      onTimeDelivery: 88,
      qualityScore: 95,
      avgLeadTime: 14,
      totalOrders: 89,
      activeContracts: 2,
      riskLevel: "low",
      lastOrder: "2024-01-10",
      totalSpend: 245000,
    },
    {
      id: 3,
      name: "SafetyFirst Ltd",
      category: "Safety Equipment",
      onTimeDelivery: 96,
      qualityScore: 90,
      avgLeadTime: 5,
      totalOrders: 203,
      activeContracts: 4,
      riskLevel: "low",
      lastOrder: "2024-01-20",
      totalSpend: 78000,
    },
    {
      id: 4,
      name: "ControlSys Pro",
      category: "Electronics",
      onTimeDelivery: 82,
      qualityScore: 88,
      avgLeadTime: 21,
      totalOrders: 45,
      activeContracts: 1,
      riskLevel: "medium",
      lastOrder: "2024-01-05",
      totalSpend: 156000,
    },
  ]

  // Mock data for purchase orders
  const purchaseOrders = [
    {
      id: "PO-2024-001",
      supplier: "TechSupply Co",
      items: 3,
      totalValue: 15660,
      status: "pending",
      orderDate: "2024-01-22",
      expectedDelivery: "2024-01-29",
      approver: "John Smith",
    },
    {
      id: "PO-2024-002",
      supplier: "HydroTech Inc",
      items: 2,
      totalValue: 25500,
      status: "approved",
      orderDate: "2024-01-20",
      expectedDelivery: "2024-02-03",
      approver: "Sarah Johnson",
    },
    {
      id: "PO-2024-003",
      supplier: "SafetyFirst Ltd",
      items: 5,
      totalValue: 4500,
      status: "delivered",
      orderDate: "2024-01-15",
      expectedDelivery: "2024-01-20",
      approver: "Mike Davis",
    },
    {
      id: "PO-2024-004",
      supplier: "ControlSys Pro",
      items: 1,
      totalValue: 12500,
      status: "in_transit",
      orderDate: "2024-01-18",
      expectedDelivery: "2024-02-08",
      approver: "John Smith",
    },
  ]

  // Calculate low stock items
  const lowStockItems = inventoryItems.filter((item) => item.totalStock < item.reorderPoint)

  // Calculate total inventory value
  const totalInventoryValue = inventoryItems.reduce((sum, item) => sum + item.totalStock * item.unitCost, 0)

  // Get stock status
  const getStockStatus = (item: (typeof inventoryItems)[0]) => {
    const percentage = (item.totalStock / item.reorderPoint) * 100
    if (percentage < 50) return { status: "critical", color: "text-red-500", bg: "bg-red-500/10" }
    if (percentage < 100) return { status: "low", color: "text-amber-500", bg: "bg-amber-500/10" }
    return { status: "healthy", color: "text-emerald-500", bg: "bg-emerald-500/10" }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Inventory Management</h1>
            <p className="text-muted-foreground">AI-Powered Supply Chain Intelligence</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="dashboard">
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="items">
              <Package className="h-4 w-4 mr-2" />
              Items
            </TabsTrigger>
            <TabsTrigger value="suppliers">
              <Users className="h-4 w-4 mr-2" />
              Suppliers
            </TabsTrigger>
            <TabsTrigger value="purchase-orders">
              <FileText className="h-4 w-4 mr-2" />
              Purchase Orders
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <TrendingUp className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="transactions">
              <History className="h-4 w-4 mr-2" />
              Transactions
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Inventory Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">${(totalInventoryValue / 1000).toFixed(1)}K</div>
                      <p className="text-xs text-emerald-500 flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +8.2% from last month
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">{inventoryItems.length}</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Across {inventoryItems.flatMap((i) => i.locations).length} locations
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-amber-500">{lowStockItems.length}</div>
                      <p className="text-xs text-muted-foreground mt-1">Require immediate attention</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                      <AlertTriangle className="h-6 w-6 text-amber-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Pending POs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">
                        {purchaseOrders.filter((po) => po.status === "pending").length}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Insights & Low Stock Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    AI-Powered Insights
                  </CardTitle>
                  <CardDescription>Smart recommendations for inventory optimization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <Target className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">Optimal Reorder Opportunity</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Order Industrial Sensor XR-500 now to save 12% on bulk pricing and avoid stockout in 14 days
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">Demand Spike Predicted</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Safety Gloves demand expected to increase 35% next month based on project schedules
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <TrendUp className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">Cost Optimization</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Transfer 30 units of Hydraulic Pump from Main Warehouse to Site A to reduce shipping costs by
                        $450
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Low Stock Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    Low Stock Alerts
                  </CardTitle>
                  <CardDescription>Items requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {lowStockItems.map((item) => {
                      const status = getStockStatus(item)
                      return (
                        <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.sku}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className={`text-sm font-medium ${status.color}`}>
                                {item.totalStock} / {item.reorderPoint}
                              </p>
                              <p className="text-xs text-muted-foreground">Stock / Reorder</p>
                            </div>
                            <Button size="sm" variant="outline">
                              Order Now
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Inventory Health & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Inventory Health by Category */}
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Health by Category</CardTitle>
                  <CardDescription>Stock levels across different categories</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {["Electronics", "Machinery", "Safety Equipment", "Consumables"].map((category) => {
                    const categoryItems = inventoryItems.filter((i) => i.category === category)
                    const totalValue = categoryItems.reduce((sum, item) => sum + item.totalStock * item.unitCost, 0)
                    const lowStock = categoryItems.filter((i) => i.totalStock < i.reorderPoint).length

                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{category}</span>
                          <span className="text-muted-foreground">${(totalValue / 1000).toFixed(1)}K</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                              style={{
                                width: `${Math.min((categoryItems.length / inventoryItems.length) * 100, 100)}%`,
                              }}
                            />
                          </div>
                          {lowStock > 0 && (
                            <Badge variant="outline" className="text-xs text-amber-500 border-amber-500/50">
                              {lowStock} low
                            </Badge>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest inventory transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                        <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">Stock Received</p>
                        <p className="text-xs text-muted-foreground">Safety Gloves (Box of 100) - 200 units</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <ArrowDownRight className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">Stock Issued</p>
                        <p className="text-xs text-muted-foreground">
                          Industrial Sensor XR-500 - 15 units to Project Alpha
                        </p>
                        <p className="text-xs text-muted-foreground">5 hours ago</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                        <Truck className="h-4 w-4 text-amber-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">Transfer Completed</p>
                        <p className="text-xs text-muted-foreground">
                          Hydraulic Pump HP-200 - 5 units from Main to Site A
                        </p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="h-4 w-4 text-purple-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">PO Created</p>
                        <p className="text-xs text-muted-foreground">PO-2024-001 - TechSupply Co - $15,660</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Items Tab */}
          <TabsContent value="items" className="space-y-4">
            {/* Filters */}
            <Card className="py-0 my-3.5">
              <CardContent className="pt-2 pb-2">
                <div className="flex flex-wrap gap-4 my-0 py-0.5">
                  <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search items..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 pt-0 my-0"
                      />
                    </div>
                  </div>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="main">Main Warehouse</SelectItem>
                      <SelectItem value="site-a">Site A</SelectItem>
                      <SelectItem value="site-b">Site B</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="machinery">Machinery</SelectItem>
                      <SelectItem value="safety">Safety Equipment</SelectItem>
                      <SelectItem value="consumables">Consumables</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Items List */}
            <div className="grid gap-4">
              {inventoryItems.map((item) => {
                const status = getStockStatus(item)
                return (
                  <Card key={item.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                          <Package className="h-8 w-8 text-muted-foreground" />
                        </div>

                        <div className="flex-1 min-w-0 space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-semibold">{item.name}</h3>
                                <Badge variant="outline" className="text-xs">
                                  {item.sku}
                                </Badge>
                                <Badge variant="outline" className={`text-xs ${status.color}`}>
                                  {status.status}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  Class {item.abcClass}
                                </Badge>
                                {item.serialTracked && (
                                  <Badge variant="outline" className="text-xs">
                                    Serial Tracked
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {item.category} • Supplier: {item.supplier}
                              </p>
                            </div>

                            <div className="text-right flex-shrink-0">
                              <p className="text-lg font-bold">{item.totalStock}</p>
                              <p className="text-xs text-muted-foreground">Total Units</p>
                            </div>
                          </div>

                          {/* Locations */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {item.locations.map((location, idx) => (
                              <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                                <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium truncate">{location.name}</p>
                                  <p className="text-xs text-muted-foreground">{location.stock} units</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Metrics */}
                          <div className="flex items-center gap-6 text-sm">
                            <div>
                              <span className="text-muted-foreground">Unit Cost:</span>
                              <span className="font-medium ml-2">${item.unitCost}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Total Value:</span>
                              <span className="font-medium ml-2">
                                ${(item.totalStock * item.unitCost).toLocaleString()}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Reorder Point:</span>
                              <span className="font-medium ml-2">{item.reorderPoint}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Forecast (30d):</span>
                              <span className="font-medium ml-2">{item.demandForecast}</span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                            <Button size="sm" variant="outline">
                              Adjust Stock
                            </Button>
                            <Button size="sm" variant="outline">
                              Create PO
                            </Button>
                            <Button size="sm" variant="outline">
                              <Scan className="h-4 w-4 mr-2" />
                              Scan
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Suppliers Tab */}
          <TabsContent value="suppliers" className="space-y-4">
            <div className="grid gap-4">
              {suppliers.map((supplier) => (
                <Card key={supplier.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <Users className="h-8 w-8 text-muted-foreground" />
                      </div>

                      <div className="flex-1 min-w-0 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold">{supplier.name}</h3>
                              <Badge variant="outline" className="text-xs">
                                {supplier.category}
                              </Badge>
                              <Badge
                                variant="outline"
                                className={`text-xs ${
                                  supplier.riskLevel === "low"
                                    ? "text-emerald-500 border-emerald-500/50"
                                    : "text-amber-500 border-amber-500/50"
                                }`}
                              >
                                {supplier.riskLevel} risk
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {supplier.activeContracts} active contracts • Last order: {supplier.lastOrder}
                            </p>
                          </div>

                          <div className="text-right flex-shrink-0">
                            <p className="text-lg font-bold">${(supplier.totalSpend / 1000).toFixed(0)}K</p>
                            <p className="text-xs text-muted-foreground">Total Spend</p>
                          </div>
                        </div>

                        {/* Performance Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">On-Time Delivery</span>
                              <span className="font-medium">{supplier.onTimeDelivery}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                                style={{ width: `${supplier.onTimeDelivery}%` }}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Quality Score</span>
                              <span className="font-medium">{supplier.qualityScore}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                                style={{ width: `${supplier.qualityScore}%` }}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Avg Lead Time</span>
                              <span className="font-medium">{supplier.avgLeadTime} days</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < Math.floor(5 - supplier.avgLeadTime / 7)
                                      ? "fill-amber-400 text-amber-400"
                                      : "text-muted"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-6 text-sm">
                          <div>
                            <span className="text-muted-foreground">Total Orders:</span>
                            <span className="font-medium ml-2">{supplier.totalOrders}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Active Contracts:</span>
                            <span className="font-medium ml-2">{supplier.activeContracts}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            Create PO
                          </Button>
                          <Button size="sm" variant="outline">
                            View Contracts
                          </Button>
                          <Button size="sm" variant="outline">
                            Performance Report
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Purchase Orders Tab */}
          <TabsContent value="purchase-orders" className="space-y-4">
            <div className="grid gap-4">
              {purchaseOrders.map((po) => (
                <Card key={po.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                      </div>

                      <div className="flex-1 min-w-0 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold">{po.id}</h3>
                              <Badge
                                variant="outline"
                                className={`text-xs ${
                                  po.status === "delivered"
                                    ? "text-emerald-500 border-emerald-500/50"
                                    : po.status === "approved"
                                      ? "text-blue-500 border-blue-500/50"
                                      : po.status === "in_transit"
                                        ? "text-purple-500 border-purple-500/50"
                                        : "text-amber-500 border-amber-500/50"
                                }`}
                              >
                                {po.status === "in_transit" ? "In Transit" : po.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {po.supplier} • {po.items} items • Approver: {po.approver}
                            </p>
                          </div>

                          <div className="text-right flex-shrink-0">
                            <p className="text-lg font-bold">${po.totalValue.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Total Value</p>
                          </div>
                        </div>

                        {/* Dates */}
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <span className="text-muted-foreground">Ordered:</span>
                              <span className="font-medium ml-2">{po.orderDate}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <span className="text-muted-foreground">Expected:</span>
                              <span className="font-medium ml-2">{po.expectedDelivery}</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          {po.status === "pending" && (
                            <>
                              <Button size="sm" variant="outline" className="text-emerald-500 bg-transparent">
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Approve
                              </Button>
                              <Button size="sm" variant="outline" className="text-red-500 bg-transparent">
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </Button>
                            </>
                          )}
                          {po.status === "in_transit" && (
                            <Button size="sm" variant="outline">
                              <Truck className="h-4 w-4 mr-2" />
                              Track Shipment
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Inventory Turnover</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.2x</div>
                  <p className="text-xs text-emerald-500 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +0.3 from last quarter
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Carrying Cost</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12.4K</div>
                  <p className="text-xs text-emerald-500 flex items-center mt-1">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -5.2% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Stock Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">98.5%</div>
                  <p className="text-xs text-emerald-500 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +1.2% from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Demand Forecasting */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI Demand Forecasting
                </CardTitle>
                <CardDescription>Predicted inventory requirements for next 90 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inventoryItems.slice(0, 3).map((item) => (
                    <div key={item.id} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-muted-foreground">Forecast: {item.demandForecast} units</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{
                              width: `${Math.min((item.demandForecast / (item.totalStock + item.demandForecast)) * 100, 100)}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {((item.demandForecast / item.totalStock) * 100).toFixed(0)}% increase
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cost Analysis & ABC Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cost Analysis</CardTitle>
                  <CardDescription>Breakdown of inventory costs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Carrying Costs</span>
                      <span className="font-medium">$12,400</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 w-[45%]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Ordering Costs</span>
                      <span className="font-medium">$8,200</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 w-[30%]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Stockout Costs</span>
                      <span className="font-medium">$3,100</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-red-500 to-red-400 w-[15%]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Shrinkage Costs</span>
                      <span className="font-medium">$2,800</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400 w-[10%]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>ABC Analysis</CardTitle>
                  <CardDescription>Inventory classification by value</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <div>
                      <p className="text-sm font-medium">Class A Items</p>
                      <p className="text-xs text-muted-foreground">High value, low quantity</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{inventoryItems.filter((i) => i.abcClass === "A").length}</p>
                      <p className="text-xs text-muted-foreground">70% of value</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div>
                      <p className="text-sm font-medium">Class B Items</p>
                      <p className="text-xs text-muted-foreground">Moderate value and quantity</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{inventoryItems.filter((i) => i.abcClass === "B").length}</p>
                      <p className="text-xs text-muted-foreground">20% of value</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <div>
                      <p className="text-sm font-medium">Class C Items</p>
                      <p className="text-xs text-muted-foreground">Low value, high quantity</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{inventoryItems.filter((i) => i.abcClass === "C").length}</p>
                      <p className="text-xs text-muted-foreground">10% of value</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Complete audit trail of inventory movements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      type: "receipt",
                      item: "Safety Gloves (Box of 100)",
                      qty: 200,
                      location: "Main Warehouse",
                      user: "John Smith",
                      time: "2 hours ago",
                      icon: ArrowUpRight,
                      color: "emerald",
                    },
                    {
                      type: "issue",
                      item: "Industrial Sensor XR-500",
                      qty: 15,
                      location: "Project Alpha",
                      user: "Sarah Johnson",
                      time: "5 hours ago",
                      icon: ArrowDownRight,
                      color: "blue",
                    },
                    {
                      type: "transfer",
                      item: "Hydraulic Pump HP-200",
                      qty: 5,
                      location: "Main → Site A",
                      user: "Mike Davis",
                      time: "1 day ago",
                      icon: Truck,
                      color: "amber",
                    },
                    {
                      type: "adjustment",
                      item: "Control Panel CP-1000",
                      qty: -2,
                      location: "Main Warehouse",
                      user: "System",
                      time: "1 day ago",
                      icon: AlertCircle,
                      color: "red",
                    },
                    {
                      type: "receipt",
                      item: "Lubricant Oil (5L)",
                      qty: 100,
                      location: "Main Warehouse",
                      user: "John Smith",
                      time: "2 days ago",
                      icon: ArrowUpRight,
                      color: "emerald",
                    },
                  ].map((transaction, idx) => {
                    const Icon = transaction.icon
                    return (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border">
                        <div
                          className={`h-10 w-10 rounded-full bg-${transaction.color}-500/10 flex items-center justify-center flex-shrink-0`}
                        >
                          <Icon className={`h-5 w-5 text-${transaction.color}-500`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{transaction.item}</p>
                          <p className="text-xs text-muted-foreground">
                            {transaction.location} • {transaction.user}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p
                            className={`text-sm font-medium ${transaction.qty > 0 ? "text-emerald-500" : "text-red-500"}`}
                          >
                            {transaction.qty > 0 ? "+" : ""}
                            {transaction.qty}
                          </p>
                          <p className="text-xs text-muted-foreground">{transaction.time}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
