import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Users,
  AlertTriangle,
  TrendingUp,
  Search,
  Plus,
  Mail,
  Download,
  CheckCircle2,
  Circle,
  AlertCircle,
  Brain,
  Target,
  Zap,
  BarChart3,
  TrendingDown,
  DollarSign,
  Award,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Calendar,
  Phone,
  Building,
  User,
  FileText,
  Clock,
} from "lucide-react"

export default function CustomerSuccessPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [isClientModalOpen, setIsClientModalOpen] = useState(false)

  const clients = [
    {
      id: 1,
      name: "Acme Corp",
      industry: "Technology",
      healthScore: 85,
      status: "healthy",
      lastContact: "3 days",
      tasksCompleted: 12,
      tasksTotal: 15,
      milestonesCompleted: 4,
      milestonesTotal: 5,
      churnRisk: 15,
      churnTrend: "down",
      npsScore: 9,
      arr: 120000,
      renewalDate: "2025-06-15",
      csm: "Sarah Johnson",
      engagementScore: 92,
      healthTrend: [75, 78, 82, 85, 85],
    },
    {
      id: 2,
      name: "Beta Solutions",
      industry: "Manufacturing",
      healthScore: 45,
      status: "at-risk",
      lastContact: "12 days",
      tasksCompleted: 5,
      tasksTotal: 18,
      milestonesCompleted: 2,
      milestonesTotal: 6,
      churnRisk: 78,
      churnTrend: "up",
      npsScore: 4,
      arr: 85000,
      renewalDate: "2025-04-20",
      csm: "Michael Chen",
      engagementScore: 38,
      healthTrend: [68, 62, 55, 48, 45],
    },
    {
      id: 3,
      name: "Gamma Industries",
      industry: "Healthcare",
      healthScore: 72,
      status: "moderate",
      lastContact: "2 days",
      tasksCompleted: 8,
      tasksTotal: 12,
      milestonesCompleted: 3,
      milestonesTotal: 4,
      churnRisk: 35,
      churnTrend: "stable",
      npsScore: 7,
      arr: 95000,
      renewalDate: "2025-08-10",
      csm: "Sarah Johnson",
      engagementScore: 68,
      healthTrend: [70, 71, 70, 72, 72],
    },
    {
      id: 4,
      name: "Delta Systems",
      industry: "Finance",
      healthScore: 91,
      status: "healthy",
      lastContact: "1 day",
      tasksCompleted: 14,
      tasksTotal: 15,
      milestonesCompleted: 5,
      milestonesTotal: 5,
      churnRisk: 8,
      churnTrend: "down",
      npsScore: 10,
      arr: 250000,
      renewalDate: "2025-12-01",
      csm: "Emily Rodriguez",
      engagementScore: 95,
      healthTrend: [88, 89, 90, 91, 91],
    },
    {
      id: 5,
      name: "Epsilon Tech",
      industry: "Retail",
      healthScore: 58,
      status: "moderate",
      lastContact: "7 days",
      tasksCompleted: 6,
      tasksTotal: 14,
      milestonesCompleted: 2,
      milestonesTotal: 5,
      churnRisk: 52,
      churnTrend: "up",
      npsScore: 6,
      arr: 72000,
      renewalDate: "2025-05-15",
      csm: "Michael Chen",
      engagementScore: 55,
      healthTrend: [65, 62, 60, 58, 58],
    },
  ]

  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 50) return "text-yellow-500"
    return "text-red-500"
  }

  const getHealthBadge = (status: string) => {
    if (status === "healthy")
      return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Healthy</Badge>
    if (status === "moderate")
      return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Moderate</Badge>
    return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">At Risk</Badge>
  }

  const getChurnRiskBadge = (risk: number) => {
    if (risk < 25)
      return (
        <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
          <TrendingDown className="w-3 h-3 mr-1" />
          Low Risk
        </Badge>
      )
    if (risk < 60)
      return (
        <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
          <Activity className="w-3 h-3 mr-1" />
          Medium Risk
        </Badge>
      )
    return (
      <Badge className="bg-red-500/10 text-red-500 border-red-500/20">
        <TrendingUp className="w-3 h-3 mr-1" />
        High Risk
      </Badge>
    )
  }

  const handleViewClient = (client: any) => {
    setSelectedClient(client)
    setIsClientModalOpen(true)
  }

  const filteredClients = filterStatus === "all" ? clients : clients.filter((c) => c.status === filterStatus)

  const atRiskCount = clients.filter((c) => c.status === "at-risk").length
  const avgHealthScore = Math.round(clients.reduce((sum, c) => sum + c.healthScore, 0) / clients.length)
  const avgDaysSinceTouch = Math.round(
    clients.reduce((sum, c) => sum + Number.parseInt(c.lastContact), 0) / clients.length,
  )
  const totalARR = clients.reduce((sum, c) => sum + c.arr, 0)
  const avgNPS = Math.round(clients.reduce((sum, c) => sum + c.npsScore, 0) / clients.length)
  const highChurnRiskCount = clients.filter((c) => c.churnRisk > 60).length

  return (
    <div className="min-h-screen bg-background p-6 my-24">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold">Customer Success Platform</h1>
            <p className="text-muted-foreground">Zenith Success</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Client
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">Zenith Hub &gt; Customer Success Platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Clients</p>
                <p className="text-3xl font-bold">{clients.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Active client accounts</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Churn Risk</p>
                <p className="text-3xl font-bold text-red-500">{highChurnRiskCount}</p>
                <p className="text-xs text-muted-foreground mt-1">Predicted churn &gt;60%</p>
              </div>
              <Brain className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total ARR</p>
                <p className="text-3xl font-bold">${(totalARR / 1000).toFixed(0)}K</p>
                <p className="text-xs text-muted-foreground mt-1">Annual recurring revenue</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg NPS Score</p>
                <p className="text-3xl font-bold">{avgNPS}</p>
                <p className="text-xs text-muted-foreground mt-1">Net Promoter Score</p>
              </div>
              <Award className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="interactions">Interactions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Client List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Client List</CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant={filterStatus === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterStatus("all")}
                      >
                        All
                      </Button>
                      <Button
                        variant={filterStatus === "at-risk" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterStatus("at-risk")}
                      >
                        At Risk
                      </Button>
                      <Button
                        variant={filterStatus === "moderate" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterStatus("moderate")}
                      >
                        Moderate
                      </Button>
                      <Button
                        variant={filterStatus === "healthy" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterStatus("healthy")}
                      >
                        Healthy
                      </Button>
                    </div>
                  </div>
                  <div className="relative mt-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search by name or contact..." className="pl-10" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredClients.map((client) => (
                      <div
                        key={client.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{client.name}</h3>
                            {getHealthBadge(client.status)}
                            {getChurnRiskBadge(client.churnRisk)}
                          </div>
                          <p className="text-sm text-muted-foreground">{client.industry}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>Last contact: {client.lastContact} ago</span>
                            <span>
                              Tasks: {client.tasksCompleted}/{client.tasksTotal}
                            </span>
                            <span>
                              Milestones: {client.milestonesCompleted}/{client.milestonesTotal}
                            </span>
                            <span>ARR: ${(client.arr / 1000).toFixed(0)}K</span>
                            <span>Renewal: {new Date(client.renewalDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-muted-foreground">Health Trend:</span>
                            <div className="flex items-end gap-0.5 h-6">
                              {client.healthTrend.map((score, idx) => (
                                <div
                                  key={idx}
                                  className={`w-2 rounded-t ${
                                    score >= 80 ? "bg-green-500" : score >= 50 ? "bg-yellow-500" : "bg-red-500"
                                  }`}
                                  style={{ height: `${(score / 100) * 100}%` }}
                                />
                              ))}
                            </div>
                            {client.churnTrend === "up" && <ArrowUpRight className="w-4 h-4 text-red-500" />}
                            {client.churnTrend === "down" && <ArrowDownRight className="w-4 h-4 text-green-500" />}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Health Score</p>
                            <p className={`text-2xl font-bold ${getHealthColor(client.healthScore)}`}>
                              {client.healthScore}%
                            </p>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => handleViewClient(client)}>
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats & Activity */}
            <div className="space-y-4">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Brain className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Churn Alert</p>
                      <p className="text-xs text-muted-foreground">
                        Beta Solutions shows 78% churn risk. Recommend immediate outreach.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Upsell Opportunity</p>
                      <p className="text-xs text-muted-foreground">
                        Delta Systems has high engagement. Consider premium tier upgrade.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Action Required</p>
                      <p className="text-xs text-muted-foreground">
                        3 clients haven't been contacted in 7+ days. Schedule check-ins.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Task Progress</span>
                      <span className="text-sm font-semibold">75%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">45/60 completed</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Milestone Progress</span>
                      <span className="text-sm font-semibold">80%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "80%" }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">12/15 completed</p>
                  </div>

                  <div className="pt-4 border-t space-y-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm">5 tasks overdue</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">2 milestones overdue</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">3 clients need follow-up</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm">New task added for Acme Corp</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm">Milestone completed for Beta Solutions</p>
                        <p className="text-xs text-muted-foreground">5 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-4 h-4 text-blue-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm">Health score updated for Gamma Industries</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Circle className="w-4 h-4 text-primary mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm">Client portal accessed by Delta Systems</p>
                        <p className="text-xs text-muted-foreground">2 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="clients">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Client Directory</CardTitle>
                <div className="flex gap-2">
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Client
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search clients..." className="pl-10" />
                </div>
                <Button variant="outline" size="sm">
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {clients.map((client) => (
                  <div
                    key={client.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => handleViewClient(client)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{client.name}</h3>
                        {getHealthBadge(client.status)}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground">Industry</p>
                          <p className="font-medium">{client.industry}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">CSM</p>
                          <p className="font-medium">{client.csm}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">ARR</p>
                          <p className="font-medium">${(client.arr / 1000).toFixed(0)}K</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Renewal</p>
                          <p className="font-medium">{new Date(client.renewalDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Health</p>
                        <p className={`text-2xl font-bold ${getHealthColor(client.healthScore)}`}>
                          {client.healthScore}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Task Management</CardTitle>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Task
                </Button>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  All Tasks
                </Button>
                <Button variant="outline" size="sm">
                  Overdue
                </Button>
                <Button variant="outline" size="sm">
                  Due Soon
                </Button>
                <Button variant="outline" size="sm">
                  Completed
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {clients
                  .flatMap((client) => [
                    {
                      id: `${client.id}-1`,
                      client: client.name,
                      task: "Complete onboarding documentation",
                      status: "completed",
                      dueDate: "2 days ago",
                      priority: "high",
                    },
                    {
                      id: `${client.id}-2`,
                      client: client.name,
                      task: "Schedule quarterly business review",
                      status: "active",
                      dueDate: "In 5 days",
                      priority: "medium",
                    },
                  ])
                  .slice(0, 8)
                  .map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3 flex-1">
                        {task.status === "completed" ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium">{task.task}</p>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span>{task.client}</span>
                            <span>Due: {task.dueDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            task.priority === "high"
                              ? "bg-red-500/10 text-red-500 border-red-500/20"
                              : task.priority === "medium"
                                ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                                : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                          }
                        >
                          {task.priority}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Milestone Tracking</CardTitle>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Milestone
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clients.map((client) => (
                  <div key={client.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{client.name}</h3>
                        <p className="text-sm text-muted-foreground">{client.industry}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Progress</p>
                        <p className="text-xl font-bold">
                          {client.milestonesCompleted}/{client.milestonesTotal}
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mb-3">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{
                          width: `${(client.milestonesCompleted / client.milestonesTotal) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>Initial Setup Complete</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>Team Training Finished</span>
                      </div>
                      {client.milestonesCompleted < client.milestonesTotal && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Circle className="w-4 h-4" />
                          <span>First Value Milestone (In Progress)</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interactions">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Communication History</CardTitle>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Log Interaction
                </Button>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  All
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Meeting
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {clients
                  .flatMap((client, idx) => [
                    {
                      id: `${client.id}-email`,
                      type: "email",
                      client: client.name,
                      subject: "Quarterly Review Invitation",
                      description: `Sent quarterly business review invitation to ${client.name}`,
                      timestamp: `${idx + 1} hours ago`,
                      csm: client.csm,
                    },
                    {
                      id: `${client.id}-call`,
                      type: "call",
                      client: client.name,
                      subject: "Monthly Check-in Call",
                      description: "Discussed product adoption and upcoming features",
                      timestamp: `${idx + 2} days ago`,
                      csm: client.csm,
                    },
                  ])
                  .slice(0, 10)
                  .map((interaction) => (
                    <div
                      key={interaction.id}
                      className="flex gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          interaction.type === "email"
                            ? "bg-blue-500/10"
                            : interaction.type === "call"
                              ? "bg-green-500/10"
                              : "bg-purple-500/10"
                        }`}
                      >
                        {interaction.type === "email" && <Mail className="w-5 h-5 text-blue-500" />}
                        {interaction.type === "call" && <Phone className="w-5 h-5 text-green-500" />}
                        {interaction.type === "meeting" && <Users className="w-5 h-5 text-purple-500" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <h4 className="font-semibold">{interaction.subject}</h4>
                            <p className="text-sm text-muted-foreground">{interaction.client}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {interaction.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{interaction.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {interaction.csm}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {interaction.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Executive Dashboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Executive Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Retention Rate</p>
                    <p className="text-2xl font-bold text-green-500">94%</p>
                    <p className="text-xs text-muted-foreground mt-1">+2% from last quarter</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Expansion Revenue</p>
                    <p className="text-2xl font-bold text-primary">$125K</p>
                    <p className="text-xs text-muted-foreground mt-1">+18% from last quarter</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Avg NPS</p>
                    <p className="text-2xl font-bold">{avgNPS}</p>
                    <p className="text-xs text-muted-foreground mt-1">Promoter score</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Client Satisfaction</p>
                    <p className="text-2xl font-bold text-green-500">4.6/5</p>
                    <p className="text-xs text-muted-foreground mt-1">Based on surveys</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CSM Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  CSM Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-xs text-muted-foreground">2 clients • Avg Health: 79%</p>
                    </div>
                    <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Excellent</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Michael Chen</p>
                      <p className="text-xs text-muted-foreground">2 clients • Avg Health: 52%</p>
                    </div>
                    <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Needs Support</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Emily Rodriguez</p>
                      <p className="text-xs text-muted-foreground">1 client • Avg Health: 91%</p>
                    </div>
                    <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Outstanding</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Churn Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Churn Prediction Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Low Risk (0-25%)</span>
                      <span className="text-sm font-semibold">2 clients</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "40%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Medium Risk (25-60%)</span>
                      <span className="text-sm font-semibold">2 clients</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "40%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">High Risk (60%+)</span>
                      <span className="text-sm font-semibold">1 client</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: "20%" }}></div>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium mb-2">Key Churn Indicators:</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Low engagement score (&lt;50)</li>
                      <li>• Missed milestones (2+ overdue)</li>
                      <li>• No contact in 10+ days</li>
                      <li>• Declining health trend</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ROI Tracking */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  ROI & Revenue Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-green-500/5">
                    <p className="text-sm text-muted-foreground">Prevented Churn Value</p>
                    <p className="text-2xl font-bold text-green-500">$340K</p>
                    <p className="text-xs text-muted-foreground mt-1">Last 12 months</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-primary/5">
                    <p className="text-sm text-muted-foreground">Expansion Revenue</p>
                    <p className="text-2xl font-bold text-primary">$125K</p>
                    <p className="text-xs text-muted-foreground mt-1">Upsells & cross-sells</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Platform ROI</p>
                    <p className="text-2xl font-bold">385%</p>
                    <p className="text-xs text-muted-foreground mt-1">Return on investment</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Client Detail Modal */}
      <Dialog open={isClientModalOpen} onOpenChange={setIsClientModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="pb-3 border-b flex-shrink-0">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <DialogTitle className="text-xl mb-2 truncate">{selectedClient?.name}</DialogTitle>
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedClient && getHealthBadge(selectedClient.status)}
                  {selectedClient && getChurnRiskBadge(selectedClient.churnRisk)}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button className="mx-0 my-3.5 bg-transparent" variant="outline" size="sm">
                  <Mail className="w-4 h-4" />
                </Button>
                <Button className="my-3.5 bg-transparent" variant="outline" size="sm">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button className="my-3.5" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>

          {selectedClient && (
            <Tabs defaultValue="overview" className="flex-1 overflow-hidden flex flex-col">
              <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 flex-shrink-0">
                <TabsTrigger
                  value="overview"
                  className="border-b-2 border-transparent data-[state=active]:border-primary text-sm rounded-lg"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="health"
                  className="border-b-2 border-transparent data-[state=active]:border-primary text-sm rounded-lg"
                >
                  Health
                </TabsTrigger>
                <TabsTrigger
                  value="tasks"
                  className="border-b-2 border-transparent data-[state=active]:border-primary text-sm rounded-lg"
                >
                  Tasks
                </TabsTrigger>
                <TabsTrigger
                  value="activity"
                  className="border-b-2 border-transparent data-[state=active]:border-primary text-sm rounded-lg"
                >
                  Activity
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-y-auto pt-4">
                <TabsContent value="overview" className="mt-0 space-y-4">
                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-4 gap-3">
                    <Card>
                      <CardContent className="pt-4 pb-4 text-center">
                        <div className={`text-2xl font-bold mb-1 ${getHealthColor(selectedClient.healthScore)}`}>
                          {selectedClient.healthScore}%
                        </div>
                        <p className="text-xs text-muted-foreground">Health Score</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4 pb-4 text-center">
                        <div className="text-2xl font-bold mb-1">${(selectedClient.arr / 1000).toFixed(0)}K</div>
                        <p className="text-xs text-muted-foreground">Annual ARR</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4 pb-4 text-center">
                        <div className="text-2xl font-bold mb-1">{selectedClient.npsScore}/10</div>
                        <p className="text-xs text-muted-foreground">NPS Score</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4 pb-4 text-center">
                        <div className="text-2xl font-bold mb-1">{selectedClient.engagementScore}%</div>
                        <p className="text-xs text-muted-foreground">Engagement</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Client Details */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Client Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <Building className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-muted-foreground">Industry</p>
                            <p className="text-sm font-medium truncate">{selectedClient.industry}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 min-w-0">
                          <User className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-muted-foreground">CSM</p>
                            <p className="text-sm font-medium truncate">{selectedClient.csm}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 min-w-0">
                          <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-muted-foreground">Renewal Date</p>
                            <p className="text-sm font-medium truncate">
                              {new Date(selectedClient.renewalDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 min-w-0">
                          <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-muted-foreground">Last Contact</p>
                            <p className="text-sm font-medium truncate">{selectedClient.lastContact} ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          Task Progress
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xl font-bold">{selectedClient.tasksCompleted}</span>
                          <span className="text-sm text-muted-foreground">of {selectedClient.tasksTotal}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{
                              width: `${(selectedClient.tasksCompleted / selectedClient.tasksTotal) * 100}%`,
                            }}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Milestone Progress
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xl font-bold">{selectedClient.milestonesCompleted}</span>
                          <span className="text-sm text-muted-foreground">of {selectedClient.milestonesTotal}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all"
                            style={{
                              width: `${(selectedClient.milestonesCompleted / selectedClient.milestonesTotal) * 100}%`,
                            }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="health" className="mt-0 space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Health Score Trend</CardTitle>
                      <p className="text-xs text-muted-foreground">Last 5 periods</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-end justify-between gap-3 h-40 px-2">
                        {selectedClient.healthTrend.map((score: number, idx: number) => (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                            <div className="relative w-full">
                              <div
                                className={`w-full rounded-t transition-all ${
                                  score >= 80 ? "bg-green-500" : score >= 50 ? "bg-yellow-500" : "bg-red-500"
                                }`}
                                style={{ height: `${(score / 100) * 120}px` }}
                              />
                            </div>
                            <div className="text-center">
                              <p className="text-xs font-bold">{score}%</p>
                              <p className="text-[10px] text-muted-foreground">P{idx + 1}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t">
                        {selectedClient.churnTrend === "up" && (
                          <Badge className="bg-red-500/10 text-red-500 border-red-500/20 text-xs">
                            <ArrowUpRight className="w-3 h-3 mr-1" />
                            Declining
                          </Badge>
                        )}
                        {selectedClient.churnTrend === "down" && (
                          <Badge className="bg-green-500/10 text-green-500 border-green-500/20 text-xs">
                            <ArrowDownRight className="w-3 h-3 mr-1" />
                            Improving
                          </Badge>
                        )}
                        {selectedClient.churnTrend === "stable" && (
                          <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 text-xs">
                            <Activity className="w-3 h-3 mr-1" />
                            Stable
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-2 gap-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Churn Risk Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center mb-3">
                          <div
                            className={`text-3xl font-bold mb-2 ${selectedClient.churnRisk > 60 ? "text-red-500" : selectedClient.churnRisk > 25 ? "text-yellow-500" : "text-green-500"}`}
                          >
                            {selectedClient.churnRisk}%
                          </div>
                          {getChurnRiskBadge(selectedClient.churnRisk)}
                        </div>
                        <div className="space-y-1.5 text-xs">
                          <p className="text-muted-foreground font-medium">Risk Factors:</p>
                          <ul className="space-y-1">
                            {selectedClient.churnRisk > 60 && (
                              <>
                                <li className="flex items-center gap-1.5">
                                  <AlertCircle className="w-3 h-3 text-red-500 flex-shrink-0" />
                                  <span className="truncate">Low engagement</span>
                                </li>
                                <li className="flex items-center gap-1.5">
                                  <AlertCircle className="w-3 h-3 text-red-500 flex-shrink-0" />
                                  <span className="truncate">Declining trend</span>
                                </li>
                              </>
                            )}
                            {selectedClient.lastContact.includes("12") && (
                              <li className="flex items-center gap-1.5">
                                <AlertCircle className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                                <span className="truncate">No recent contact</span>
                              </li>
                            )}
                            {selectedClient.churnRisk < 25 && (
                              <li className="flex items-center gap-1.5 text-green-500">
                                <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                                <span className="truncate">All indicators healthy</span>
                              </li>
                            )}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Engagement Metrics</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-muted-foreground">Overall Score</span>
                            <span className="text-sm font-bold">{selectedClient.engagementScore}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${selectedClient.engagementScore}%` }}
                            />
                          </div>
                        </div>
                        <div className="pt-2 border-t space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Portal Logins</span>
                            <span className="font-medium">24</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Feature Usage</span>
                            <span className="font-medium">High</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Support Tickets</span>
                            <span className="font-medium">3</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="tasks" className="mt-0 space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Active Tasks</CardTitle>
                        <Button size="sm">
                          <Plus className="w-3 h-3 mr-1" />
                          <span className="text-xs">Add</span>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2.5 border rounded-lg">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">Complete onboarding documentation</p>
                            <p className="text-xs text-muted-foreground">Due: 2 days ago</p>
                          </div>
                          <Badge className="bg-green-500/10 text-green-500 border-green-500/20 text-xs flex-shrink-0">
                            Done
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 p-2.5 border rounded-lg">
                          <Circle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">Schedule quarterly business review</p>
                            <p className="text-xs text-muted-foreground">Due: In 5 days</p>
                          </div>
                          <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 text-xs flex-shrink-0">
                            Active
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 p-2.5 border rounded-lg">
                          <Circle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">Review feature adoption metrics</p>
                            <p className="text-xs text-muted-foreground">Due: In 10 days</p>
                          </div>
                          <Badge className="text-xs flex-shrink-0">Pending</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Milestones</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2.5 border rounded-lg">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">Initial Setup Complete</p>
                            <p className="text-xs text-muted-foreground">Completed 3 months ago</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2.5 border rounded-lg">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">Team Training Finished</p>
                            <p className="text-xs text-muted-foreground">Completed 2 months ago</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2.5 border rounded-lg">
                          <Circle className="w-4 h-4 text-primary flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">First Value Milestone</p>
                            <p className="text-xs text-muted-foreground">Target: Next month</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="activity" className="mt-0 space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex gap-2.5 pb-3 border-b last:border-0">
                          <div className="w-7 h-7 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                            <Mail className="w-3.5 h-3.5 text-green-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">Quarterly Review Invitation</p>
                            <p className="text-xs text-muted-foreground truncate">Sent by {selectedClient.csm}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">2 hours ago</p>
                          </div>
                        </div>
                        <div className="flex gap-2.5 pb-3 border-b last:border-0">
                          <div className="w-7 h-7 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">Documentation review completed</p>
                            <p className="text-xs text-muted-foreground truncate">Marked complete by client</p>
                            <p className="text-xs text-muted-foreground mt-0.5">1 day ago</p>
                          </div>
                        </div>
                        <div className="flex gap-2.5 pb-3 border-b last:border-0">
                          <div className="w-7 h-7 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                            <Phone className="w-3.5 h-3.5 text-purple-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">Monthly check-in call</p>
                            <p className="text-xs text-muted-foreground truncate">Duration: 45 minutes</p>
                            <p className="text-xs text-muted-foreground mt-0.5">3 days ago</p>
                          </div>
                        </div>
                        <div className="flex gap-2.5 pb-3 border-b last:border-0">
                          <div className="w-7 h-7 rounded-full bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-3.5 h-3.5 text-yellow-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">Q1 Report uploaded</p>
                            <p className="text-xs text-muted-foreground truncate">Uploaded by client</p>
                            <p className="text-xs text-muted-foreground mt-0.5">5 days ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
