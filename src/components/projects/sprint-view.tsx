"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Project, Task } from "@/lib/project-data"
import { Plus, Play, CheckCircle2, Calendar, Users, Target, TrendingUp, Flag } from "lucide-react"

interface SprintViewProps {
  project: Project
}

interface Sprint {
  id: string
  name: string
  goal: string
  startDate: string
  endDate: string
  status: "planned" | "active" | "completed"
  taskIds: string[]
}

export function SprintView({ project }: SprintViewProps) {
  const [sprints, setSprints] = useState<Sprint[]>([
    {
      id: "sprint-1",
      name: "Sprint 1 - Foundation",
      goal: "Setup project foundation and core features",
      startDate: "2025-02-01",
      endDate: "2025-02-14",
      status: "active",
      taskIds: project.tasks.slice(0, 3).map(t => t.id),
    },
    {
      id: "sprint-2",
      name: "Sprint 2 - Enhancement",
      goal: "Add advanced features and optimizations",
      startDate: "2025-02-15",
      endDate: "2025-02-28",
      status: "planned",
      taskIds: project.tasks.slice(3, 5).map(t => t.id),
    },
  ])
  
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newSprint, setNewSprint] = useState({
    name: "",
    goal: "",
    startDate: "",
    endDate: "",
  })
  const [tasks, setTasks] = useState<Task[]>(project.tasks)

  // Update tasks when project data changes
  useEffect(() => {
    setTasks(project.tasks)
  }, [project.tasks])

  // Listen for project data updates
  useEffect(() => {
    const handleProjectUpdate = (event: CustomEvent) => {
      if (event.detail.projectId === project.id) {
        console.log("[SprintView] Project data updated, refreshing tasks")
      }
    }

    window.addEventListener('projectDataUpdated', handleProjectUpdate as EventListener)
    return () => window.removeEventListener('projectDataUpdated', handleProjectUpdate as EventListener)
  }, [project.id])

  const activeSprint = sprints.find(s => s.status === "active")
  const plannedSprints = sprints.filter(s => s.status === "planned")
  const completedSprints = sprints.filter(s => s.status === "completed")

  const getSprintTasks = (sprintId: string) => {
    const sprint = sprints.find(s => s.id === sprintId)
    if (!sprint) return []
    return tasks.filter(t => sprint.taskIds.includes(t.id))
  }

  const getSprintProgress = (sprintId: string) => {
    const sprintTasks = getSprintTasks(sprintId)
    if (sprintTasks.length === 0) return 0
    const completedTasks = sprintTasks.filter(t => t.status === "done").length
    return Math.round((completedTasks / sprintTasks.length) * 100)
  }

  const handleAddSprint = () => {
    if (newSprint.name && newSprint.startDate && newSprint.endDate) {
      const sprint: Sprint = {
        id: `sprint-${sprints.length + 1}`,
        name: newSprint.name,
        goal: newSprint.goal,
        startDate: newSprint.startDate,
        endDate: newSprint.endDate,
        status: "planned",
        taskIds: [],
      }
      
      setSprints([...sprints, sprint])
      setNewSprint({ name: "", goal: "", startDate: "", endDate: "" })
      setIsDialogOpen(false)
      
      console.log("[SprintView] Sprint added:", sprint.name)
    }
  }

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "backlog":
        return "border-muted-foreground text-muted-foreground bg-muted/80"
      case "todo":
        return "border-blue-500 text-blue-600 bg-blue-500/20 dark:text-blue-400"
      case "in-progress":
        return "border-yellow-500 text-yellow-600 bg-yellow-500/20 dark:text-yellow-400"
      case "review":
        return "border-purple-500 text-purple-600 bg-purple-500/20 dark:text-purple-400"
      case "blocked":
        return "border-red-500 text-red-600 bg-red-500/20 dark:text-red-400"
      case "done":
        return "border-green-500 text-green-600 bg-green-500/20 dark:text-green-400"
    }
  }

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "border-red-500 text-red-600 bg-red-500/20 dark:text-red-400"
      case "medium":
        return "border-yellow-500 text-yellow-600 bg-yellow-500/20 dark:text-yellow-400"
      case "low":
        return "border-green-500 text-green-600 bg-green-500/20 dark:text-green-400"
    }
  }

  return (
    <div className="space-y-4">
      {/* Sprint Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Sprint Board</h2>
          <p className="text-sm text-muted-foreground">Manage your sprints and track progress</p>
        </div>
        <Button size="sm" onClick={() => setIsDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Sprint
        </Button>
      </div>

      {/* Sprint Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sprint</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSprint ? "1" : "0"}</div>
            <p className="text-xs text-muted-foreground">
              {activeSprint ? activeSprint.name : "No active sprint"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeSprint ? getSprintTasks(activeSprint.id).length : 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {activeSprint ? `${getSprintTasks(activeSprint.id).filter(t => t.status === "done").length} completed` : "N/A"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeSprint ? `${getSprintProgress(activeSprint.id)}%` : "0%"}
            </div>
            <Progress value={activeSprint ? getSprintProgress(activeSprint.id) : 0} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Capacity</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.team.length}</div>
            <p className="text-xs text-muted-foreground">Team members</p>
          </CardContent>
        </Card>
      </div>

      {/* Sprint Tabs */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Sprint</TabsTrigger>
          <TabsTrigger value="planned">Planned ({plannedSprints.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedSprints.length})</TabsTrigger>
        </TabsList>

        {/* Active Sprint */}
        <TabsContent value="active" className="space-y-4">
          {activeSprint ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-xl">{activeSprint.name}</CardTitle>
                      <Badge variant="default" className="bg-green-500">
                        <Play className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <Target className="w-3 h-3 inline mr-1" />
                      {activeSprint.goal}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3 inline mr-1" />
                      {activeSprint.startDate} → {activeSprint.endDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{getSprintProgress(activeSprint.id)}%</div>
                    <div className="text-xs text-muted-foreground">Complete</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">Sprint Tasks</h4>
                    <Badge variant="outline">
                      {getSprintTasks(activeSprint.id).length} tasks
                    </Badge>
                  </div>
                  {getSprintTasks(activeSprint.id).map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-4 p-3 rounded-lg border border-border/40 hover:border-primary/40 hover:bg-muted/20 transition-all"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-foreground">{task.title}</p>
                          <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                            <Flag className="w-3 h-3 mr-1" />
                            {task.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{task.assignee.name}</span>
                          <span>•</span>
                          <span>Due {task.deadline}</span>
                        </div>
                        {task.progress > 0 && task.status !== "done" && (
                          <div className="mt-2">
                            <Progress value={task.progress} className="h-1.5" />
                          </div>
                        )}
                      </div>
                      <Badge variant="outline" className={getStatusColor(task.status)}>
                        {task.status === "done" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {task.status.replace("-", " ")}
                      </Badge>
                    </div>
                  ))}
                  {getSprintTasks(activeSprint.id).length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Target className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No tasks in this sprint yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="p-12">
              <div className="text-center text-muted-foreground">
                <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No Active Sprint</h3>
                <p className="mb-4">Start a sprint to begin tracking your team's progress</p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Sprint
                </Button>
              </div>
            </Card>
          )}
        </TabsContent>

        {/* Planned Sprints */}
        <TabsContent value="planned" className="space-y-4">
          {plannedSprints.map((sprint) => (
            <Card key={sprint.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-lg">{sprint.name}</CardTitle>
                      <Badge variant="outline" className="border-blue-500 text-blue-600 bg-blue-500/20">
                        Planned
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <Target className="w-3 h-3 inline mr-1" />
                      {sprint.goal}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3 inline mr-1" />
                      {sprint.startDate} → {sprint.endDate}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Play className="w-4 h-4 mr-2" />
                    Start Sprint
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{getSprintTasks(sprint.id).length} tasks planned</span>
                  <span>Ready to start</span>
                </div>
              </CardContent>
            </Card>
          ))}
          {plannedSprints.length === 0 && (
            <Card className="p-12">
              <div className="text-center text-muted-foreground">
                <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No Planned Sprints</h3>
                <p>Create a sprint to plan your upcoming work</p>
              </div>
            </Card>
          )}
        </TabsContent>

        {/* Completed Sprints */}
        <TabsContent value="completed" className="space-y-4">
          {completedSprints.map((sprint) => (
            <Card key={sprint.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-lg">{sprint.name}</CardTitle>
                      <Badge variant="outline" className="border-green-500 text-green-600 bg-green-500/20">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <Target className="w-3 h-3 inline mr-1" />
                      {sprint.goal}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3 inline mr-1" />
                      {sprint.startDate} → {sprint.endDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">100%</div>
                    <div className="text-xs text-muted-foreground">Complete</div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
          {completedSprints.length === 0 && (
            <Card className="p-12">
              <div className="text-center text-muted-foreground">
                <CheckCircle2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No Completed Sprints</h3>
                <p>Complete your first sprint to see it here</p>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Add Sprint Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Sprint</DialogTitle>
            <DialogDescription>
              Plan your next sprint with goals and timeline.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="sprint-name">Sprint Name *</Label>
              <Input
                id="sprint-name"
                placeholder="e.g., Sprint 3 - Performance"
                value={newSprint.name}
                onChange={(e) => setNewSprint({ ...newSprint, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sprint-goal">Sprint Goal</Label>
              <Textarea
                id="sprint-goal"
                placeholder="What do you want to achieve in this sprint?"
                value={newSprint.goal}
                onChange={(e) => setNewSprint({ ...newSprint, goal: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sprint-start">Start Date *</Label>
                <Input
                  id="sprint-start"
                  type="date"
                  value={newSprint.startDate}
                  onChange={(e) => setNewSprint({ ...newSprint, startDate: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sprint-end">End Date *</Label>
                <Input
                  id="sprint-end"
                  type="date"
                  value={newSprint.endDate}
                  onChange={(e) => setNewSprint({ ...newSprint, endDate: e.target.value })}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddSprint}
              disabled={!newSprint.name || !newSprint.startDate || !newSprint.endDate}
            >
              Create Sprint
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

