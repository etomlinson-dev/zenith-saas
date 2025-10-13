import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  LayoutDashboard,
  Kanban,
  GanttChart,
  List,
  Calendar,
  Users,
  Clock,
  AlertTriangle,
  TrendingUp,
  Target,
  CheckCircle2,
  AlertCircle,
  Plus,
  Filter,
  ArrowUpRight,
  Zap,
  Brain,
  Link2,
  Package,
  Factory,
  UserCheck,
  MoreVertical,
  Search,
  ArrowDown,
  Circle,
  CheckCircle,
  XCircle,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [viewMode, setViewMode] = useState("kanban")
  const [taskFilter, setTaskFilter] = useState("all")
  const [taskSearch, setTaskSearch] = useState("")

  // Mock data for projects
  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      client: "Acme Corp",
      status: "in-progress",
      stage: "In Progress",
      health: 85,
      progress: 65,
      budget: 50000,
      spent: 32500,
      team: 5,
      tasks: { total: 45, completed: 29, inProgress: 12, blocked: 4 },
      deadline: "2024-03-15",
      startDate: "2024-01-15",
      risk: "low",
      aiInsight: "On track for on-time delivery",
      integrations: ["CSP", "HR"],
      velocity: 12.5,
      predictedCompletion: "2024-03-12",
    },
    {
      id: 2,
      name: "Mobile App Development",
      client: "TechStart Inc",
      status: "in-progress",
      stage: "In Progress",
      health: 62,
      progress: 45,
      budget: 120000,
      spent: 78000,
      team: 8,
      tasks: { total: 89, completed: 40, inProgress: 35, blocked: 14 },
      deadline: "2024-04-30",
      startDate: "2024-02-01",
      risk: "medium",
      aiInsight: "Resource constraints detected",
      integrations: ["CSP", "HR", "Z-MO"],
      velocity: 8.3,
      predictedCompletion: "2024-05-15",
    },
    {
      id: 3,
      name: "ERP Implementation",
      client: "Global Industries",
      status: "planning",
      stage: "Planning",
      health: 90,
      progress: 15,
      budget: 250000,
      spent: 25000,
      team: 12,
      tasks: { total: 156, completed: 23, inProgress: 18, blocked: 2 },
      deadline: "2024-08-31",
      startDate: "2024-01-01",
      risk: "low",
      aiInsight: "Strong team allocation",
      integrations: ["CSP", "HR", "Inventory", "Z-MO"],
      velocity: 15.2,
      predictedCompletion: "2024-08-20",
    },
    {
      id: 4,
      name: "Data Migration",
      client: "FinServe Ltd",
      status: "at-risk",
      stage: "Review",
      health: 45,
      progress: 72,
      budget: 80000,
      spent: 85000,
      team: 6,
      tasks: { total: 67, completed: 48, inProgress: 8, blocked: 11 },
      deadline: "2024-02-28",
      startDate: "2023-12-01",
      risk: "high",
      aiInsight: "Budget overrun, timeline at risk",
      integrations: ["CSP"],
      velocity: 5.1,
      predictedCompletion: "2024-03-25",
    },
    {
      id: 5,
      name: "Cloud Infrastructure",
      client: "DataCorp",
      status: "completed",
      stage: "Completed",
      health: 95,
      progress: 100,
      budget: 65000,
      spent: 62000,
      team: 4,
      tasks: { total: 52, completed: 52, inProgress: 0, blocked: 0 },
      deadline: "2024-01-31",
      startDate: "2023-11-01",
      risk: "low",
      aiInsight: "Successfully delivered under budget",
      integrations: ["CSP", "HR"],
      velocity: 14.8,
      predictedCompletion: "2024-01-31",
    },
  ]

  const allTasks = [
    {
      id: 1,
      title: "Design homepage mockups",
      project: "Website Redesign",
      projectId: 1,
      status: "completed",
      priority: "high",
      assignee: "Sarah Chen",
      dueDate: "2024-02-15",
      progress: 100,
      dependencies: [],
    },
    {
      id: 2,
      title: "Implement responsive navigation",
      project: "Website Redesign",
      projectId: 1,
      status: "in-progress",
      priority: "high",
      assignee: "Mike Johnson",
      dueDate: "2024-02-20",
      progress: 65,
      dependencies: [1],
    },
    {
      id: 3,
      title: "Set up authentication flow",
      project: "Mobile App Development",
      projectId: 2,
      status: "in-progress",
      priority: "critical",
      assignee: "Alex Rivera",
      dueDate: "2024-02-18",
      progress: 45,
      dependencies: [],
    },
    {
      id: 4,
      title: "Database schema design",
      project: "Mobile App Development",
      projectId: 2,
      status: "completed",
      priority: "high",
      assignee: "Emma Davis",
      dueDate: "2024-02-10",
      progress: 100,
      dependencies: [],
    },
    {
      id: 5,
      title: "API integration testing",
      project: "Mobile App Development",
      projectId: 2,
      status: "blocked",
      priority: "medium",
      assignee: "James Wilson",
      dueDate: "2024-02-25",
      progress: 20,
      dependencies: [3, 4],
    },
    {
      id: 6,
      title: "Requirements gathering",
      project: "ERP Implementation",
      projectId: 3,
      status: "completed",
      priority: "high",
      assignee: "Lisa Anderson",
      dueDate: "2024-01-20",
      progress: 100,
      dependencies: [],
    },
    {
      id: 7,
      title: "Module configuration",
      project: "ERP Implementation",
      projectId: 3,
      status: "in-progress",
      priority: "medium",
      assignee: "David Kim",
      dueDate: "2024-03-15",
      progress: 30,
      dependencies: [6],
    },
    {
      id: 8,
      title: "Data validation scripts",
      project: "Data Migration",
      projectId: 4,
      status: "blocked",
      priority: "critical",
      assignee: "Rachel Green",
      dueDate: "2024-02-22",
      progress: 75,
      dependencies: [],
    },
    {
      id: 9,
      title: "Performance optimization",
      project: "Data Migration",
      projectId: 4,
      status: "todo",
      priority: "high",
      assignee: "Tom Harris",
      dueDate: "2024-02-28",
      progress: 0,
      dependencies: [8],
    },
    {
      id: 10,
      title: "Security audit",
      project: "Cloud Infrastructure",
      projectId: 5,
      status: "completed",
      priority: "critical",
      assignee: "Nina Patel",
      dueDate: "2024-01-25",
      progress: 100,
      dependencies: [],
    },
  ]

  const teamResources = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Senior Designer",
      avatar: "SC",
      projects: ["Website Redesign", "Mobile App Development"],
      capacity: 40,
      allocated: 35,
      utilization: 87.5,
      skills: ["UI/UX", "Figma", "Design Systems"],
    },
    {
      id: 2,
      name: "Mike Johnson",
      role: "Frontend Developer",
      avatar: "MJ",
      projects: ["Website Redesign"],
      capacity: 40,
      allocated: 40,
      utilization: 100,
      skills: ["React", "TypeScript", "CSS"],
    },
    {
      id: 3,
      name: "Alex Rivera",
      role: "Full Stack Developer",
      avatar: "AR",
      projects: ["Mobile App Development", "ERP Implementation"],
      capacity: 40,
      allocated: 38,
      utilization: 95,
      skills: ["Node.js", "React Native", "PostgreSQL"],
    },
    {
      id: 4,
      name: "Emma Davis",
      role: "Backend Developer",
      avatar: "ED",
      projects: ["Mobile App Development", "Data Migration"],
      capacity: 40,
      allocated: 32,
      utilization: 80,
      skills: ["Python", "Django", "AWS"],
    },
    {
      id: 5,
      name: "James Wilson",
      role: "QA Engineer",
      avatar: "JW",
      projects: ["Mobile App Development", "Website Redesign"],
      capacity: 40,
      allocated: 28,
      utilization: 70,
      skills: ["Testing", "Automation", "Selenium"],
    },
    {
      id: 6,
      name: "Lisa Anderson",
      role: "Project Manager",
      avatar: "LA",
      projects: ["ERP Implementation"],
      capacity: 40,
      allocated: 40,
      utilization: 100,
      skills: ["Agile", "Scrum", "Stakeholder Management"],
    },
    {
      id: 7,
      name: "David Kim",
      role: "DevOps Engineer",
      avatar: "DK",
      projects: ["ERP Implementation", "Cloud Infrastructure"],
      capacity: 40,
      allocated: 36,
      utilization: 90,
      skills: ["Docker", "Kubernetes", "CI/CD"],
    },
    {
      id: 8,
      name: "Rachel Green",
      role: "Data Engineer",
      avatar: "RG",
      projects: ["Data Migration"],
      capacity: 40,
      allocated: 40,
      utilization: 100,
      skills: ["ETL", "SQL", "Data Modeling"],
    },
  ]

  const portfolioMetrics = {
    totalProjects: 24,
    activeProjects: 18,
    completedThisMonth: 6,
    atRisk: 3,
    totalBudget: 2450000,
    totalSpent: 1680000,
    avgHealth: 74,
    avgVelocity: 10.2,
    teamUtilization: 82,
    onTimeDelivery: 87,
  }

  const getHealthColor = (health: number) => {
    if (health >= 80) return "text-green-500"
    if (health >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getHealthBg = (health: number) => {
    if (health >= 80) return "bg-green-500/10"
    if (health >= 60) return "bg-yellow-500/10"
    return "bg-red-500/10"
  }

  const getRiskBadge = (risk: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      low: { variant: "secondary", label: "Low Risk" },
      medium: { variant: "outline", label: "Medium Risk" },
      high: { variant: "destructive", label: "High Risk" },
    }
    return variants[risk] || variants.low
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Circle className="h-4 w-4 text-blue-500" />
      case "blocked":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Circle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline" }> = {
      critical: { variant: "destructive" },
      high: { variant: "default" },
      medium: { variant: "secondary" },
      low: { variant: "outline" },
    }
    return variants[priority] || variants.medium
  }

  const kanbanStages = ["Planning", "In Progress", "Review", "Completed"]
  const projectsByStage = kanbanStages.reduce(
    (acc, stage) => {
      acc[stage] = projects.filter((p) => p.stage === stage)
      return acc
    },
    {} as Record<string, typeof projects>,
  )

  const filteredTasks = allTasks.filter((task) => {
    const matchesFilter = taskFilter === "all" || task.status === taskFilter
    const matchesSearch =
      taskSearch === "" ||
      task.title.toLowerCase().includes(taskSearch.toLowerCase()) ||
      task.project.toLowerCase().includes(taskSearch.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background p-6 my-16">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold">Project Management</h1>
            <p className="text-muted-foreground">AI-Powered Project Execution Engine</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="projects">
            <Kanban className="h-4 w-4 mr-2" />
            Projects
          </TabsTrigger>
          <TabsTrigger value="tasks">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Tasks
          </TabsTrigger>
          <TabsTrigger value="resources">
            <Users className="h-4 w-4 mr-2" />
            Resources
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <TrendingUp className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-4">
          {/* Portfolio KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Active Projects</CardDescription>
                <CardTitle className="text-2xl">{portfolioMetrics.activeProjects}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">{portfolioMetrics.totalProjects} total</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Portfolio Health</CardDescription>
                <CardTitle className="text-2xl">{portfolioMetrics.avgHealth}%</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={portfolioMetrics.avgHealth} className="h-1" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Budget Utilization</CardDescription>
                <CardTitle className="text-2xl">
                  {Math.round((portfolioMetrics.totalSpent / portfolioMetrics.totalBudget) * 100)}%
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  ${(portfolioMetrics.totalSpent / 1000).toFixed(0)}K / $
                  {(portfolioMetrics.totalBudget / 1000).toFixed(0)}K
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Team Utilization</CardDescription>
                <CardTitle className="text-2xl">{portfolioMetrics.teamUtilization}%</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={portfolioMetrics.teamUtilization} className="h-1" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>On-Time Delivery</CardDescription>
                <CardTitle className="text-2xl">{portfolioMetrics.onTimeDelivery}%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-xs text-green-500">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +5% vs last month
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights & Alerts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    AI-Powered Insights
                  </CardTitle>
                  <CardDescription>Predictive analytics and recommendations</CardDescription>
                </div>
                <Badge variant="secondary">
                  <Zap className="h-3 w-3 mr-1" />
                  Live
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div className="flex-1">
                  <div className="font-medium">Resource Bottleneck Detected</div>
                  <div className="text-sm text-muted-foreground">
                    Mobile App Development project needs 2 additional developers. Recommend reallocating from ERP
                    Implementation.
                  </div>
                  <Button variant="link" size="sm" className="h-auto p-0 mt-1">
                    View Recommendations →
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <div className="flex-1">
                  <div className="font-medium">Budget Overrun Risk</div>
                  <div className="text-sm text-muted-foreground">
                    Data Migration project is 106% of budget with 28% work remaining. Predicted final cost: $95K.
                  </div>
                  <Button variant="link" size="sm" className="h-auto p-0 mt-1">
                    Review Budget →
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
                <div className="flex-1">
                  <div className="font-medium">Velocity Improvement Opportunity</div>
                  <div className="text-sm text-muted-foreground">
                    ERP Implementation team velocity is 52% above average. Consider applying their workflow patterns to
                    other projects.
                  </div>
                  <Button variant="link" size="sm" className="h-auto p-0 mt-1">
                    Analyze Patterns →
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Health Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Project Portfolio</CardTitle>
              <CardDescription>Real-time project health and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg ${getHealthBg(project.health)} flex items-center justify-center`}
                    >
                      <span className={`text-lg font-bold ${getHealthColor(project.health)}`}>{project.health}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold truncate">{project.name}</h3>
                        <Badge {...getRiskBadge(project.risk)} className="text-xs" />
                        {project.integrations.map((integration) => (
                          <Badge key={integration} variant="outline" className="text-xs">
                            <Link2 className="h-3 w-3 mr-1" />
                            {integration}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{project.client}</span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {project.team}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Due {project.deadline}
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          Velocity: {project.velocity}
                        </span>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Progress: {project.progress}%</span>
                          <span className="text-muted-foreground">
                            {project.tasks.completed}/{project.tasks.total} tasks
                          </span>
                        </div>
                        <Progress value={project.progress} className="h-1.5" />
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-xs">
                        <Brain className="h-3 w-3 text-primary" />
                        <span className="text-muted-foreground">{project.aiInsight}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-medium">
                        ${(project.spent / 1000).toFixed(0)}K / ${(project.budget / 1000).toFixed(0)}K
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {Math.round((project.spent / project.budget) * 100)}% spent
                      </div>
                      <Button variant="ghost" size="sm" className="mt-2">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cross-Module Integration Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-primary" />
                  CSP Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">12</div>
                <div className="text-xs text-muted-foreground">Projects linked to clients</div>
                <div className="mt-2 text-xs text-green-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  Client health scores updated
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  HR Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">47</div>
                <div className="text-xs text-muted-foreground">Team members tracked</div>
                <div className="mt-2 text-xs text-green-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  Performance data synced
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Package className="h-4 w-4 text-primary" />
                  Inventory Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">8</div>
                <div className="text-xs text-muted-foreground">Projects with asset allocation</div>
                <div className="mt-2 text-xs text-muted-foreground">$234K in allocated resources</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Factory className="h-4 w-4 text-primary" />
                  Z-MO Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">5</div>
                <div className="text-xs text-muted-foreground">Manufacturing projects</div>
                <div className="mt-2 text-xs text-green-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  Production milestones synced
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>All Projects</CardTitle>
                  <CardDescription>Manage and track project execution</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select value={viewMode} onValueChange={setViewMode}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kanban">
                        <div className="flex items-center gap-2">
                          <Kanban className="h-4 w-4" />
                          Kanban
                        </div>
                      </SelectItem>
                      <SelectItem value="list">
                        <div className="flex items-center gap-2">
                          <List className="h-4 w-4" />
                          List
                        </div>
                      </SelectItem>
                      <SelectItem value="gantt">
                        <div className="flex items-center gap-2">
                          <GanttChart className="h-4 w-4" />
                          Gantt
                        </div>
                      </SelectItem>
                      <SelectItem value="timeline">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Timeline
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {viewMode === "kanban" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {kanbanStages.map((stage) => (
                    <div key={stage} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm">{stage}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {projectsByStage[stage].length}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        {projectsByStage[stage].map((project) => (
                          <Card key={project.id} className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardContent className="p-3 space-y-2">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="font-medium text-sm line-clamp-2">{project.name}</h4>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <MoreVertical className="h-3 w-3" />
                                </Button>
                              </div>
                              <div className="text-xs text-muted-foreground">{project.client}</div>
                              <div className="flex items-center gap-1">
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    project.health >= 80
                                      ? "bg-green-500"
                                      : project.health >= 60
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                  }`}
                                />
                                <span className="text-xs text-muted-foreground">Health: {project.health}%</span>
                              </div>
                              <Progress value={project.progress} className="h-1" />
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>{project.progress}% complete</span>
                                <span className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {project.team}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {project.deadline}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {viewMode === "list" && (
                <div className="space-y-2">
                  <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-medium text-muted-foreground border-b">
                    <div className="col-span-3">Project</div>
                    <div className="col-span-2">Client</div>
                    <div className="col-span-1">Health</div>
                    <div className="col-span-1">Progress</div>
                    <div className="col-span-2">Budget</div>
                    <div className="col-span-1">Team</div>
                    <div className="col-span-2">Deadline</div>
                  </div>
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-muted/50 rounded-lg transition-colors cursor-pointer"
                    >
                      <div className="col-span-3">
                        <div className="font-medium text-sm">{project.name}</div>
                        <div className="flex gap-1 mt-1">
                          <Badge {...getRiskBadge(project.risk)} className="text-xs" />
                        </div>
                      </div>
                      <div className="col-span-2 text-sm text-muted-foreground">{project.client}</div>
                      <div className="col-span-1">
                        <div className={`text-sm font-medium ${getHealthColor(project.health)}`}>{project.health}%</div>
                      </div>
                      <div className="col-span-1">
                        <div className="text-sm">{project.progress}%</div>
                        <Progress value={project.progress} className="h-1 mt-1" />
                      </div>
                      <div className="col-span-2">
                        <div className="text-sm">
                          ${(project.spent / 1000).toFixed(0)}K / ${(project.budget / 1000).toFixed(0)}K
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {Math.round((project.spent / project.budget) * 100)}% spent
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Users className="h-3 w-3" />
                          {project.team}
                        </div>
                      </div>
                      <div className="col-span-2 text-sm text-muted-foreground">{project.deadline}</div>
                    </div>
                  ))}
                </div>
              )}

              {viewMode === "gantt" && (
                <div className="space-y-4">
                  <div className="flex gap-4 text-xs font-medium text-muted-foreground border-b pb-2">
                    <div className="w-48">Project</div>
                    <div className="flex-1 grid grid-cols-6 gap-2 text-center">
                      <div>Jan</div>
                      <div>Feb</div>
                      <div>Mar</div>
                      <div>Apr</div>
                      <div>May</div>
                      <div>Jun</div>
                    </div>
                  </div>
                  {projects.map((project) => {
                    const startMonth = new Date(project.startDate).getMonth()
                    const endMonth = new Date(project.deadline).getMonth()
                    const duration = endMonth - startMonth + 1
                    const gridStart = startMonth + 1

                    return (
                      <div key={project.id} className="flex gap-4 items-center">
                        <div className="w-48">
                          <div className="font-medium text-sm">{project.name}</div>
                          <div className="text-xs text-muted-foreground">{project.client}</div>
                        </div>
                        <div className="flex-1 grid grid-cols-6 gap-2 relative h-8">
                          <div
                            className={`absolute h-6 rounded ${
                              project.health >= 80
                                ? "bg-green-500/20 border border-green-500"
                                : project.health >= 60
                                  ? "bg-yellow-500/20 border border-yellow-500"
                                  : "bg-red-500/20 border border-red-500"
                            } flex items-center justify-center text-xs font-medium`}
                            style={{
                              left: `${((gridStart - 1) / 6) * 100}%`,
                              width: `${(duration / 6) * 100}%`,
                            }}
                          >
                            {project.progress}%
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {viewMode === "timeline" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Button variant="outline" size="sm">
                      Today
                    </Button>
                    <Button variant="ghost" size="sm">
                      Previous
                    </Button>
                    <Button variant="ghost" size="sm">
                      Next
                    </Button>
                    <div className="flex-1 text-center font-medium">Q1 2024</div>
                  </div>
                  <div className="space-y-3">
                    {projects.map((project) => (
                      <Card key={project.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-medium">{project.name}</h4>
                                <Badge {...getRiskBadge(project.risk)} className="text-xs" />
                              </div>
                              <div className="text-sm text-muted-foreground mb-2">{project.client}</div>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1.5">
                                  <Calendar className="h-3 w-3" />
                                  {project.startDate} → {project.deadline}
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <Users className="h-3 w-3" />
                                  {project.team} members
                                </span>
                                <span className={getHealthColor(project.health)}>Health: {project.health}%</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium mb-1">{project.progress}% Complete</div>
                              <Progress value={project.progress} className="w-32 h-2" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Task Management</CardTitle>
                  <CardDescription>Track and manage tasks across all projects</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search tasks..."
                      className="pl-8 w-64"
                      value={taskSearch}
                      onChange={(e) => setTaskSearch(e.target.value)}
                    />
                  </div>
                  <Select value={taskFilter} onValueChange={setTaskFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tasks</SelectItem>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Task
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-medium text-muted-foreground border-b">
                  <div className="col-span-4">Task</div>
                  <div className="col-span-2">Project</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-1">Priority</div>
                  <div className="col-span-2">Assignee</div>
                  <div className="col-span-1">Progress</div>
                  <div className="col-span-1">Due Date</div>
                </div>
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className="grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-muted/50 rounded-lg transition-colors cursor-pointer"
                  >
                    <div className="col-span-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(task.status)}
                        <span className="font-medium text-sm">{task.title}</span>
                      </div>
                      {task.dependencies.length > 0 && (
                        <div className="text-xs text-muted-foreground mt-1 ml-6">
                          Depends on: {task.dependencies.length} task(s)
                        </div>
                      )}
                    </div>
                    <div className="col-span-2 text-sm text-muted-foreground">{task.project}</div>
                    <div className="col-span-1">
                      <Badge variant="outline" className="text-xs capitalize">
                        {task.status}
                      </Badge>
                    </div>
                    <div className="col-span-1">
                      <Badge {...getPriorityBadge(task.priority)} className="text-xs capitalize">
                        {task.priority}
                      </Badge>
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                          {task.assignee
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="text-sm">{task.assignee}</span>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="flex items-center gap-2">
                        <Progress value={task.progress} className="h-1.5 flex-1" />
                        <span className="text-xs text-muted-foreground w-8">{task.progress}%</span>
                      </div>
                    </div>
                    <div className="col-span-1 text-sm text-muted-foreground">{task.dueDate}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Task Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Tasks</CardDescription>
                <CardTitle className="text-2xl">{allTasks.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">Across {projects.length} projects</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>In Progress</CardDescription>
                <CardTitle className="text-2xl">{allTasks.filter((t) => t.status === "in-progress").length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-green-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  Active development
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Blocked</CardDescription>
                <CardTitle className="text-2xl">{allTasks.filter((t) => t.status === "blocked").length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-red-500 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Needs attention
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Completed</CardDescription>
                <CardTitle className="text-2xl">{allTasks.filter((t) => t.status === "completed").length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {Math.round((allTasks.filter((t) => t.status === "completed").length / allTasks.length) * 100)}%
                  completion rate
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Team Size</CardDescription>
                <CardTitle className="text-2xl">{teamResources.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">Active members</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Avg Utilization</CardDescription>
                <CardTitle className="text-2xl">
                  {Math.round(teamResources.reduce((acc, r) => acc + r.utilization, 0) / teamResources.length)}%
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress
                  value={teamResources.reduce((acc, r) => acc + r.utilization, 0) / teamResources.length}
                  className="h-1"
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Capacity</CardDescription>
                <CardTitle className="text-2xl">{teamResources.reduce((acc, r) => acc + r.capacity, 0)}h</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">Per week</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Allocated Hours</CardDescription>
                <CardTitle className="text-2xl">{teamResources.reduce((acc, r) => acc + r.allocated, 0)}h</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {Math.round(
                    (teamResources.reduce((acc, r) => acc + r.allocated, 0) /
                      teamResources.reduce((acc, r) => acc + r.capacity, 0)) *
                      100,
                  )}
                  % of capacity
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Team Resources</CardTitle>
                  <CardDescription>Capacity planning and workload distribution</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Member
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamResources.map((resource) => (
                  <div
                    key={resource.id}
                    className="flex items-center gap-4 p-5 border rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-base font-medium text-foreground">
                      {resource.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-base">{resource.name}</h3>
                        <Badge variant="outline" className="text-xs font-normal">
                          {resource.role}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5" />
                          {resource.projects.length} {resource.projects.length === 1 ? "project" : "projects"}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {resource.allocated}h / {resource.capacity}h per week
                        </span>
                        <span
                          className={
                            resource.utilization >= 95
                              ? "text-orange-600 dark:text-orange-400 font-medium"
                              : resource.utilization >= 85
                                ? "text-amber-600 dark:text-amber-400"
                                : "text-emerald-600 dark:text-emerald-400"
                          }
                        >
                          {resource.utilization}% utilized
                        </span>
                      </div>
                      <div className="mb-3">
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all ${
                              resource.utilization >= 95
                                ? "bg-gradient-to-r from-orange-400 to-orange-500"
                                : resource.utilization >= 85
                                  ? "bg-gradient-to-r from-amber-400 to-amber-500"
                                  : "bg-gradient-to-r from-emerald-400 to-emerald-500"
                            }`}
                            style={{ width: `${resource.utilization}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {resource.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs font-normal bg-muted/50">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right min-w-[140px]">
                      <div className="text-xs font-medium text-muted-foreground mb-2">Active Projects</div>
                      <div className="space-y-1.5">
                        {resource.projects.map((project) => (
                          <div key={project} className="text-xs text-foreground bg-muted/30 px-2 py-1 rounded">
                            {project}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Capacity Planning Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Capacity Overview</CardTitle>
              <CardDescription>Team workload distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamResources.map((resource) => (
                  <div key={resource.id} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{resource.name}</span>
                      <span className="text-muted-foreground">
                        {resource.allocated}h / {resource.capacity}h
                      </span>
                    </div>
                    <div className="relative h-10 bg-muted/50 rounded-lg overflow-hidden border border-border/50">
                      <div
                        className={`absolute inset-y-0 left-0 flex items-center justify-center text-xs font-medium transition-all ${
                          resource.utilization >= 95
                            ? "bg-gradient-to-r from-orange-400/80 to-orange-500/80 text-white"
                            : resource.utilization >= 85
                              ? "bg-gradient-to-r from-amber-400/80 to-amber-500/80 text-white"
                              : "bg-gradient-to-r from-emerald-400/80 to-emerald-500/80 text-white"
                        }`}
                        style={{ width: `${resource.utilization}%` }}
                      >
                        <span className="drop-shadow-sm">{resource.utilization}%</span>
                      </div>
                      <div className="absolute inset-y-0 right-0 w-px bg-border" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Success Rate</CardDescription>
                <CardTitle className="text-2xl">87%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-green-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +5% vs last quarter
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Avg Velocity</CardDescription>
                <CardTitle className="text-2xl">10.2</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">Story points per sprint</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Budget Variance</CardDescription>
                <CardTitle className="text-2xl">-3.2%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-green-500 flex items-center">
                  <ArrowDown className="h-3 w-3 mr-1" />
                  Under budget
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Avg Project Duration</CardDescription>
                <CardTitle className="text-2xl">3.2mo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">From start to completion</div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Performance Metrics
              </CardTitle>
              <CardDescription>Key performance indicators across all projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">On-Time Delivery Rate</span>
                    <span className="text-sm text-muted-foreground">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Budget Adherence</span>
                    <span className="text-sm text-muted-foreground">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Client Satisfaction</span>
                    <span className="text-sm text-muted-foreground">4.6/5.0</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Team Productivity</span>
                    <span className="text-sm text-muted-foreground">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Health Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  Project Health Distribution
                </CardTitle>
                <CardDescription>Current portfolio status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-sm">Healthy (80%+)</span>
                    </div>
                    <span className="text-sm font-medium">
                      {projects.filter((p) => p.health >= 80).length} projects
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="text-sm">At Risk (60-79%)</span>
                    </div>
                    <span className="text-sm font-medium">
                      {projects.filter((p) => p.health >= 60 && p.health < 80).length} projects
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="text-sm">Critical (&lt;60%)</span>
                    </div>
                    <span className="text-sm font-medium">{projects.filter((p) => p.health < 60).length} projects</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Velocity Trends
                </CardTitle>
                <CardDescription>Team performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Current Sprint</span>
                    <span className="text-sm font-medium">10.2 pts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Last Sprint</span>
                    <span className="text-sm font-medium">9.8 pts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">3-Sprint Average</span>
                    <span className="text-sm font-medium">9.5 pts</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-sm font-medium">Trend</span>
                    <span className="text-sm text-green-500 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      +7.4%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottleneck Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI-Powered Bottleneck Analysis
              </CardTitle>
              <CardDescription>Identified issues and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium">Resource Constraint</div>
                    <div className="text-sm text-muted-foreground">
                      Frontend developers at 98% capacity. Consider hiring or reallocating resources.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium">Dependency Blocker</div>
                    <div className="text-sm text-muted-foreground">
                      2 tasks blocked for &gt;5 days. Review dependencies in Mobile App Development.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium">Optimization Opportunity</div>
                    <div className="text-sm text-muted-foreground">
                      ERP Implementation team has 15% spare capacity. Consider accelerating timeline.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
