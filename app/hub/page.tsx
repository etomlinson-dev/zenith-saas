import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  FolderKanban,
  Package,
  Users,
  Briefcase,
  UserCheck,
  Factory,
  Bot,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  Download,
  Plus,
  Search,
  Settings,
} from "lucide-react"

export default function HubDashboard() {
  const [timeRange, setTimeRange] = useState("7d")

  // Mock data for KPIs
  const kpis = [
    {
      title: "Active Projects",
      value: "24",
      trend: "+12%",
      trendUp: true,
      icon: FolderKanban,
      color: "text-blue-500",
    },
    {
      title: "Open Tasks",
      value: "156",
      trend: "-8%",
      trendUp: false,
      icon: CheckCircle2,
      color: "text-green-500",
    },
    {
      title: "Active Clients",
      value: "89",
      trend: "+5%",
      trendUp: true,
      icon: Users,
      color: "text-purple-500",
    },
    {
      title: "Team Members",
      value: "47",
      trend: "+2",
      trendUp: true,
      icon: UserCheck,
      color: "text-orange-500",
    },
    {
      title: "Inventory Value",
      value: "$2.4M",
      trend: "+15%",
      trendUp: true,
      icon: Package,
      color: "text-emerald-500",
    },
    {
      title: "Manufacturing OEE",
      value: "87%",
      trend: "+3%",
      trendUp: true,
      icon: Factory,
      color: "text-cyan-500",
    },
    {
      title: "Automation Jobs",
      value: "342",
      trend: "+28%",
      trendUp: true,
      icon: Bot,
      color: "text-pink-500",
    },
  ]

  // Mock data for module status
  const modules = [
    {
      name: "Project Management",
      shortName: "PM",
      icon: FolderKanban,
      color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      metrics: [
        { label: "Completion", value: "78%", progress: 78 },
        { label: "Overdue Tasks", value: "12", status: "warning" },
        { label: "Team Velocity", value: "42 pts/week", status: "success" },
      ],
      href: "/projects",
    },
    {
      name: "Inventory",
      shortName: "INV",
      icon: Package,
      color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      metrics: [
        { label: "Stock Level", value: "Good", status: "success" },
        { label: "Low Stock Alerts", value: "3", status: "warning" },
        { label: "PO Status", value: "8 pending", status: "info" },
      ],
      href: "/inventory",
    },
    {
      name: "Customer Success",
      shortName: "CSP",
      icon: Users,
      color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      metrics: [
        { label: "Avg Health Score", value: "8.2/10", progress: 82 },
        { label: "Renewal Dates", value: "14 upcoming", status: "info" },
        { label: "NPS Trend", value: "+12", status: "success" },
      ],
      href: "/customer-success",
    },
    {
      name: "Workforce Management",
      shortName: "WFM",
      icon: Briefcase,
      color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      metrics: [
        { label: "Active Jobs", value: "28", status: "success" },
        { label: "Technicians Online", value: "18/22", progress: 82 },
        { label: "Schedule Adherence", value: "94%", progress: 94 },
      ],
      href: "/workforce",
    },
    {
      name: "Human Resources",
      shortName: "HR",
      icon: UserCheck,
      color: "bg-pink-500/10 text-pink-500 border-pink-500/20",
      metrics: [
        { label: "Open Positions", value: "5", status: "info" },
        { label: "Reviews Due", value: "8", status: "warning" },
        { label: "Satisfaction", value: "4.3/5", progress: 86 },
      ],
      href: "/hr",
    },
    {
      name: "Manufacturing Ops",
      shortName: "Z-MO",
      icon: Factory,
      color: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
      metrics: [
        { label: "Machine Status", value: "12/14 running", progress: 86 },
        { label: "Production Rate", value: "245/hr", status: "success" },
        { label: "Downtime", value: "2.3%", status: "success" },
      ],
      href: "/manufacturing",
    },
    {
      name: "Automation",
      shortName: "AUTO",
      icon: Bot,
      color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
      metrics: [
        { label: "Bot Activity", value: "342 jobs", status: "success" },
        { label: "Success Rate", value: "98.5%", progress: 98.5 },
        { label: "Processing", value: "1.2k docs/day", status: "info" },
      ],
      href: "/automation",
    },
  ]

  // Mock activity feed
  const activities = [
    {
      type: "success",
      module: "PM",
      message: "Project 'Website Redesign' completed",
      time: "2 min ago",
    },
    {
      type: "warning",
      module: "INV",
      message: "Low stock alert: Widget A below threshold",
      time: "15 min ago",
    },
    {
      type: "info",
      module: "CSP",
      message: "New client onboarded: Acme Corp",
      time: "1 hour ago",
    },
    {
      type: "success",
      module: "AUTO",
      message: "Automation job completed: Invoice processing",
      time: "2 hours ago",
    },
    {
      type: "warning",
      module: "Z-MO",
      message: "Machine M-04 scheduled maintenance due",
      time: "3 hours ago",
    },
  ]

  return (
    <div className="min-h-screen bg-background p-6 py-28">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Zenith Hub</h1>
            <p className="text-muted-foreground">BusinessOps Platform - Central Command Center</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="gap-2">
              <Activity className="h-3 w-3" />
              System Healthy
            </Badge>
            <Badge variant="secondary">Last sync: 2 min ago</Badge>
          </div>
        </div>

        {/* Global Actions */}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Search className="h-4 w-4" />
            Quick Search
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Plus className="h-4 w-4" />
            Quick Create
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export Reports
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <div className="flex-1" />
          <div className="flex gap-2">
            <Button variant={timeRange === "24h" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("24h")}>
              24h
            </Button>
            <Button variant={timeRange === "7d" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("7d")}>
              7d
            </Button>
            <Button variant={timeRange === "30d" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("30d")}>
              30d
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-8">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <Icon className={`h-5 w-5 ${kpi.color}`} />
                  <div className="flex items-center gap-1 text-sm">
                    {kpi.trendUp ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className={kpi.trendUp ? "text-green-500" : "text-red-500"}>{kpi.trend}</span>
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1">{kpi.value}</div>
                <div className="text-xs text-muted-foreground">{kpi.title}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module Status Grid */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold mb-4">Module Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((module, index) => {
              const Icon = module.icon
              return (
                <Card
                  key={index}
                  className={`border-2 ${module.color} hover:shadow-lg transition-all cursor-pointer`}
                  onClick={() => (window.location.href = module.href)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${module.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{module.name}</CardTitle>
                          <Badge variant="outline" className="mt-1">
                            {module.shortName}
                          </Badge>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {module.metrics.map((metric, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-muted-foreground">{metric.label}</span>
                          <span className="font-medium">{metric.value}</span>
                        </div>
                        {metric.progress !== undefined && <Progress value={metric.progress} className="h-1" />}
                        {metric.status && (
                          <Badge
                            variant={
                              metric.status === "success"
                                ? "default"
                                : metric.status === "warning"
                                  ? "destructive"
                                  : "secondary"
                            }
                            className="text-xs"
                          >
                            {metric.status}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Real-Time Activity Feed */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Activity Feed</h2>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                  <div
                    className={`p-2 rounded-lg ${
                      activity.type === "success"
                        ? "bg-green-500/10 text-green-500"
                        : activity.type === "warning"
                          ? "bg-yellow-500/10 text-yellow-500"
                          : "bg-blue-500/10 text-blue-500"
                    }`}
                  >
                    {activity.type === "success" ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : activity.type === "warning" ? (
                      <AlertCircle className="h-4 w-4" />
                    ) : (
                      <Activity className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {activity.module}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </span>
                    </div>
                    <p className="text-sm">{activity.message}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Cross-Module Analytics Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Overall Efficiency</span>
                  <span className="font-medium">87%</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Resource Utilization</span>
                  <span className="font-medium">73%</span>
                </div>
                <Progress value={73} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Customer Satisfaction</span>
                  <span className="font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
