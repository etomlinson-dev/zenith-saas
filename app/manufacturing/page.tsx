"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle2, Download, RefreshCw, Plus, Clock, Zap, BarChart3, Package } from "lucide-react"

export default function ManufacturingPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const kpis = {
    oee: { value: 85.2, availability: 92, performance: 88, quality: 95 },
    throughput: 24.5,
    scrap: 2.1,
    alarms: 0,
  }

  const machines = [
    {
      id: "CNC-01",
      status: "RUN",
      cell: "Cell-A",
      goodParts: 245,
      scrap: 5,
      oee: 87.3,
    },
    {
      id: "CNC-02",
      status: "IDLE",
      cell: "Cell-A",
      goodParts: 198,
      scrap: 3,
      oee: 82.1,
    },
    {
      id: "Press-01",
      status: "RUN",
      cell: "Cell-B",
      goodParts: 312,
      scrap: 8,
      oee: 89.5,
    },
  ]

  const downtimeReasons = [
    { reason: "Equipment Failure", minutes: 45, events: 3 },
    { reason: "Setup/Changeover", minutes: 32, events: 5 },
    { reason: "Material Shortage", minutes: 18, events: 2 },
    { reason: "Quality Issue", minutes: 12, events: 1 },
  ]

  const workOrders = [
    {
      id: "WO-1234",
      sku: "PART-A-001",
      quantity: 500,
      completed: 245,
      status: "In Progress",
      eta: "2h 15m",
    },
    {
      id: "WO-1235",
      sku: "PART-B-002",
      quantity: 300,
      completed: 198,
      status: "In Progress",
      eta: "1h 45m",
    },
    {
      id: "WO-1236",
      sku: "PART-C-003",
      quantity: 400,
      completed: 0,
      status: "Queued",
      eta: "4h 30m",
    },
  ]

  const predictions = [
    {
      type: "risk",
      message: "All clear",
      confidence: 95,
      severity: "low",
    },
    {
      type: "performance",
      message: "CNC-02 showing 5% cycle time slowdown",
      confidence: 87,
      severity: "medium",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "RUN":
        return "bg-green-500"
      case "IDLE":
        return "bg-yellow-500"
      case "DOWN":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "RUN":
        return "default"
      case "IDLE":
        return "secondary"
      case "DOWN":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="min-h-screen bg-background p-6 my-28">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold">Manufacturing Operations</h1>
            <p className="text-sm text-muted-foreground">Z-MO Plant Overview</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download CSV
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Machine
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Zenith Hub &gt; Manufacturing Operations</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">OEE Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">{kpis.oee.value}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              A {kpis.oee.availability}% · P {kpis.oee.performance}% · Q {kpis.oee.quality}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Throughput/hr</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{kpis.throughput}</div>
            <p className="text-xs text-muted-foreground mt-1">Good parts today / hours elapsed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Scrap %</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">{kpis.scrap}%</div>
            <p className="text-xs text-muted-foreground mt-1">Total scrap vs total produced</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Alarms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">{kpis.alarms}</div>
            <p className="text-xs text-muted-foreground mt-1">All clear</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="machines">Machines</TabsTrigger>
          <TabsTrigger value="workorders">Work Orders</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Predictive Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Predictive Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {predictions.map((pred, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  {pred.severity === "low" ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm">{pred.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">Confidence: {pred.confidence}%</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Machine Grid */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-lg font-semibold">Machine Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {machines.map((machine) => (
                  <Card key={machine.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{machine.id}</CardTitle>
                        <Badge variant={getStatusBadge(machine.status)} className={getStatusColor(machine.status)}>
                          {machine.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{machine.cell}</p>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Good Parts:</span>
                        <span className="font-semibold">{machine.goodParts}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Scrap:</span>
                        <span className="font-semibold text-red-400">{machine.scrap}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">OEE:</span>
                        <span className="font-semibold text-green-400">{machine.oee}%</span>
                      </div>
                      <Button size="sm" variant="outline" className="w-full mt-2 bg-transparent">
                        Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* OEE Trend Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    OEE 7-Day Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-end justify-between gap-2">
                    {[82, 85, 83, 87, 86, 84, 85].map((value, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                        <div
                          className="w-full bg-gradient-to-t from-primary to-primary/50 rounded-t"
                          style={{ height: `${value}%` }}
                        />
                        <span className="text-xs text-muted-foreground">Day {idx + 1}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Top Downtime */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Top Downtime Today
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {downtimeReasons.map((reason, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{reason.reason}</span>
                        <span className="font-semibold">{reason.minutes}m</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-red-500" style={{ width: `${(reason.minutes / 45) * 100}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{reason.events} events</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Work in Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Work in Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {workOrders.slice(0, 2).map((wo) => (
                    <div key={wo.id} className="p-3 bg-muted rounded-lg space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-semibold">{wo.id}</p>
                          <p className="text-xs text-muted-foreground">{wo.sku}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {wo.status}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span>
                            {wo.completed}/{wo.quantity}
                          </span>
                        </div>
                        <div className="h-1.5 bg-background rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${(wo.completed / wo.quantity) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">ETA: {wo.eta}</span>
                        <Button size="sm" variant="ghost" className="h-6 text-xs">
                          Suggest
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="machines">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">Machine monitoring details coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workorders">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">Work order management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">Quality management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">Maintenance tracking coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">Advanced analytics coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
