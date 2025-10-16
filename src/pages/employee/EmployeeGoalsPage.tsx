import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Target, 
  Plus, 
  TrendingUp, 
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Edit,
  Trash2,
  ChevronRight
} from "lucide-react"

interface Goal {
  id: string
  title: string
  description: string
  category: "individual" | "team" | "company"
  progress: number
  dueDate: string
  status: "on-track" | "at-risk" | "behind" | "completed"
  metrics: {
    name: string
    current: number
    target: number
    unit: string
  }[]
  lastUpdated: string
}

export default function EmployeeGoalsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    category: "individual" as Goal["category"],
    dueDate: "",
  })

  // Mock goals data
  const goals: Goal[] = [
    {
      id: "1",
      title: "Complete Advanced React Architecture Course",
      description: "Finish the advanced React patterns and architecture course to improve frontend development skills",
      category: "individual",
      progress: 75,
      dueDate: "2025-02-28",
      status: "on-track",
      metrics: [
        { name: "Modules", current: 6, target: 8, unit: "modules" },
        { name: "Projects", current: 2, target: 3, unit: "projects" },
      ],
      lastUpdated: "2025-01-10"
    },
    {
      id: "2",
      title: "Mentor 2 Junior Engineers",
      description: "Provide guidance and support to help junior team members grow their technical skills",
      category: "team",
      progress: 50,
      dueDate: "2025-03-31",
      status: "on-track",
      metrics: [
        { name: "Mentees", current: 2, target: 2, unit: "people" },
        { name: "1:1 Sessions", current: 8, target: 16, unit: "sessions" },
      ],
      lastUpdated: "2025-01-08"
    },
    {
      id: "3",
      title: "Reduce API Response Time by 30%",
      description: "Optimize backend APIs to improve overall system performance",
      category: "company",
      progress: 20,
      dueDate: "2025-02-15",
      status: "at-risk",
      metrics: [
        { name: "Response Time", current: 850, target: 600, unit: "ms" },
        { name: "Endpoints Optimized", current: 3, target: 15, unit: "endpoints" },
      ],
      lastUpdated: "2025-01-05"
    },
    {
      id: "4",
      title: "Ship New Feature: User Dashboard",
      description: "Design and implement the new user analytics dashboard",
      category: "individual",
      progress: 90,
      dueDate: "2025-01-20",
      status: "on-track",
      metrics: [
        { name: "Components", current: 9, target: 10, unit: "components" },
        { name: "Tests", current: 45, target: 50, unit: "tests" },
      ],
      lastUpdated: "2025-01-12"
    },
    {
      id: "5",
      title: "Improve Code Review Quality",
      description: "Provide more thorough and educational code reviews for the team",
      category: "team",
      progress: 60,
      dueDate: "2025-03-31",
      status: "on-track",
      metrics: [
        { name: "Reviews", current: 30, target: 50, unit: "reviews" },
        { name: "Average Depth", current: 6, target: 10, unit: "comments" },
      ],
      lastUpdated: "2025-01-11"
    },
    {
      id: "6",
      title: "Complete Security Training Certification",
      description: "Obtain certification in application security best practices",
      category: "individual",
      progress: 100,
      dueDate: "2024-12-31",
      status: "completed",
      metrics: [
        { name: "Progress", current: 100, target: 100, unit: "%" },
      ],
      lastUpdated: "2024-12-28"
    },
  ]

  const activeGoals = goals.filter(g => g.status !== "completed")
  const completedGoals = goals.filter(g => g.status === "completed")

  const goalsByCategory = {
    individual: goals.filter(g => g.category === "individual" && g.status !== "completed"),
    team: goals.filter(g => g.category === "team" && g.status !== "completed"),
    company: goals.filter(g => g.category === "company" && g.status !== "completed"),
  }

  const overallProgress = Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length)

  const getStatusColor = (status: Goal["status"]) => {
    switch (status) {
      case "on-track": return "border-green-500 text-green-600 bg-green-500/20"
      case "at-risk": return "border-yellow-500 text-yellow-600 bg-yellow-500/20"
      case "behind": return "border-red-500 text-red-600 bg-red-500/20"
      case "completed": return "border-blue-500 text-blue-600 bg-blue-500/20"
    }
  }

  const getStatusIcon = (status: Goal["status"]) => {
    switch (status) {
      case "on-track": return CheckCircle2
      case "at-risk": return AlertCircle
      case "behind": return Clock
      case "completed": return CheckCircle2
    }
  }

  const getCategoryColor = (category: Goal["category"]) => {
    switch (category) {
      case "individual": return "border-purple-500 text-purple-600 bg-purple-500/10"
      case "team": return "border-blue-500 text-blue-600 bg-blue-500/10"
      case "company": return "border-green-500 text-green-600 bg-green-500/10"
    }
  }

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.dueDate) {
      // In real app, this would create a new goal via API
      console.log("Creating new goal:", newGoal)
      setIsDialogOpen(false)
      setNewGoal({ title: "", description: "", category: "individual", dueDate: "" })
    }
  }

  return (
    <div className="min-h-screen bg-background p-6 my-16">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">My Goals</h1>
            <p className="text-muted-foreground">Track and manage your objectives</p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Goal
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{overallProgress}%</div>
            <Progress value={overallProgress} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeGoals.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {completedGoals.length} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Track</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {goals.filter(g => g.status === "on-track").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Goals progressing well
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At Risk</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">
              {goals.filter(g => g.status === "at-risk").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Need attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Goals ({activeGoals.length})</TabsTrigger>
          <TabsTrigger value="individual">Individual ({goalsByCategory.individual.length})</TabsTrigger>
          <TabsTrigger value="team">Team ({goalsByCategory.team.length})</TabsTrigger>
          <TabsTrigger value="company">Company ({goalsByCategory.company.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedGoals.length})</TabsTrigger>
        </TabsList>

        {/* All Goals */}
        <TabsContent value="all" className="space-y-4">
          {activeGoals.map((goal) => (
            <Card key={goal.id} className="hover:border-primary/40 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle>{goal.title}</CardTitle>
                      <Badge variant="outline" className={getCategoryColor(goal.category)}>
                        {goal.category}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(goal.status)}>
                        {goal.status}
                      </Badge>
                    </div>
                    <CardDescription>{goal.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm font-bold">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {goal.metrics.map((metric, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">{metric.name}</span>
                        <span className="text-xs font-medium">
                          {metric.current}/{metric.target} {metric.unit}
                        </span>
                      </div>
                      <Progress value={(metric.current / metric.target) * 100} className="h-1" />
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Due {goal.dueDate}
                    </span>
                    <span>Last updated {goal.lastUpdated}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7">
                    View Details
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Individual Goals */}
        <TabsContent value="individual" className="space-y-4">
          {goalsByCategory.individual.map((goal) => (
            <Card key={goal.id} className="hover:border-primary/40 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle>{goal.title}</CardTitle>
                      <Badge variant="outline" className={getStatusColor(goal.status)}>
                        {goal.status}
                      </Badge>
                    </div>
                    <CardDescription>{goal.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-bold">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Team Goals */}
        <TabsContent value="team" className="space-y-4">
          {goalsByCategory.team.map((goal) => (
            <Card key={goal.id} className="hover:border-primary/40 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle>{goal.title}</CardTitle>
                      <Badge variant="outline" className={getStatusColor(goal.status)}>
                        {goal.status}
                      </Badge>
                    </div>
                    <CardDescription>{goal.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-bold">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Company Goals */}
        <TabsContent value="company" className="space-y-4">
          {goalsByCategory.company.map((goal) => (
            <Card key={goal.id} className="hover:border-primary/40 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle>{goal.title}</CardTitle>
                      <Badge variant="outline" className={getStatusColor(goal.status)}>
                        {goal.status}
                      </Badge>
                    </div>
                    <CardDescription>{goal.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-bold">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Completed Goals */}
        <TabsContent value="completed" className="space-y-4">
          {completedGoals.map((goal) => (
            <Card key={goal.id} className="opacity-75">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="line-through">{goal.title}</CardTitle>
                      <Badge variant="outline" className={getCategoryColor(goal.category)}>
                        {goal.category}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(goal.status)}>
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    </div>
                    <CardDescription>{goal.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={100} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">Completed on {goal.lastUpdated}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Add Goal Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Goal</DialogTitle>
            <DialogDescription>
              Set a new objective to track your progress
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="goal-title">Goal Title *</Label>
              <Input
                id="goal-title"
                placeholder="e.g., Learn TypeScript"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal-description">Description</Label>
              <Textarea
                id="goal-description"
                placeholder="What do you want to achieve?"
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="goal-category">Category</Label>
                <Select
                  value={newGoal.category}
                  onValueChange={(value: Goal["category"]) => setNewGoal({ ...newGoal, category: value })}
                >
                  <SelectTrigger id="goal-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="team">Team</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal-due">Due Date *</Label>
                <Input
                  id="goal-due"
                  type="date"
                  value={newGoal.dueDate}
                  onChange={(e) => setNewGoal({ ...newGoal, dueDate: e.target.value })}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddGoal}
              disabled={!newGoal.title || !newGoal.dueDate}
            >
              Create Goal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

