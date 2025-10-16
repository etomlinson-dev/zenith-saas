"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Project, Milestone } from "@/lib/project-data"
import { addMilestone, getProjectMilestones } from "@/lib/project-data-milestones"
import { Plus } from "lucide-react"

interface TimelineViewProps {
  project: Project
}

export function TimelineView({ project }: TimelineViewProps) {
  // State for milestones - load from project data
  const [milestones, setMilestones] = useState<Milestone[]>(project.milestones || [])
  
  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newMilestone, setNewMilestone] = useState<Omit<Milestone, 'id'>>({
    name: "",
    date: "",
    status: "upcoming",
    description: "",
    taskIds: []
  })
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])

  // Load milestones from project
  useEffect(() => {
    const projectMilestones = getProjectMilestones(project.id)
    setMilestones(projectMilestones)
  }, [project.id])

  // Listen for project updates
  useEffect(() => {
    const handleProjectUpdate = (event: CustomEvent) => {
      if (event.detail.projectId === project.id) {
        const projectMilestones = getProjectMilestones(project.id)
        setMilestones(projectMilestones)
      }
    }

    window.addEventListener('projectDataUpdated', handleProjectUpdate as EventListener)
    return () => window.removeEventListener('projectDataUpdated', handleProjectUpdate as EventListener)
  }, [project.id])

  // Handle add milestone
  const handleAddMilestone = () => {
    if (newMilestone.name && newMilestone.date) {
      const milestoneToAdd = {
        ...newMilestone,
        taskIds: selectedTasks
      }

      const added = addMilestone(project.id, milestoneToAdd)
      if (added) {
        setNewMilestone({ name: "", date: "", status: "upcoming", description: "", taskIds: [] })
        setSelectedTasks([])
        setIsDialogOpen(false)
      }
    }
  }

  // Toggle task selection
  const toggleTaskSelection = (taskId: string) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    )
  }
  
  // Generate timeline data
  const timelineMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]

  // Group tasks by month
  const tasksByMonth = project.tasks.reduce(
    (acc, task) => {
      const month = task.deadline.split("-")[1]
      const monthName = timelineMonths[Number.parseInt(month) - 1]
      if (!acc[monthName]) acc[monthName] = []
      acc[monthName].push(task)
      return acc
    },
    {} as Record<string, typeof project.tasks>,
  )

  return (
    <div className="space-y-4">
      <Card className="p-6">
        {/* Timeline Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Project Timeline</h2>
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Milestone
            </Button>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="space-y-6">
          {/* Month Headers */}
          <div className="grid grid-cols-6 gap-4 pb-4 border-b border-border/40">
            {timelineMonths.map((month) => (
              <div key={month} className="text-center">
                <p className="font-semibold text-foreground">{month}</p>
                <p className="text-xs text-muted-foreground">2025</p>
              </div>
            ))}
          </div>

          {/* Timeline Rows */}
          <div className="space-y-4">
            {project.team.map((member) => {
              const memberTasks = project.tasks.filter((t) => t.assignee.name === member.name)

              return (
                <div key={member.id} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-4 relative">
                    {/* Background grid */}
                    {timelineMonths.map((month, i) => (
                      <div key={`bg-${month}`} className="h-16 bg-muted/20 rounded-lg border border-border/20" />
                    ))}

                    {/* Tasks overlay */}
                    <div className="absolute inset-0 grid grid-cols-6 gap-4">
                      {memberTasks.map((task) => {
                        const taskMonth = Number.parseInt(task.deadline.split("-")[1]) - 1
                        const taskDay = Number.parseInt(task.deadline.split("-")[2])
                        const position = (taskDay / 30) * 100

                        return (
                          <div
                            key={task.id}
                            className="relative"
                            style={{
                              gridColumn: taskMonth + 1,
                            }}
                          >
                            <div
                              className={`
                                absolute top-1/2 -translate-y-1/2 h-10 rounded-lg p-2 cursor-pointer
                                transition-all hover:scale-105 hover:shadow-lg group
                                ${
                                  task.status === "done"
                                    ? "bg-green-600"
                                  : task.status === "in-progress"
                                      ? "bg-yellow-600"
                                      : task.status === "blocked"
                                        ? "bg-red-600"
                                        : "bg-blue-600"
                                }
                              `}
                              style={{
                                left: `${position}%`,
                                width: "80px",
                              }}
                            >
                              <p className="text-xs font-medium text-white truncate">{task.title}</p>
                              <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-10">
                                <div className="bg-popover text-popover-foreground p-3 rounded-lg shadow-lg border border-border min-w-[200px]">
                                  <p className="font-semibold text-sm mb-1">{task.title}</p>
                                  <p className="text-xs text-muted-foreground mb-2">Due: {task.deadline}</p>
                                  <div className="flex gap-2">
                                    <Badge
                                      variant="outline"
                                      className={`text-xs ${
                                        task.priority === "high"
                                          ? "border-red-500 text-red-600 bg-red-500/20 dark:text-red-400"
                                        : task.priority === "medium"
                                            ? "border-yellow-500 text-yellow-600 bg-yellow-500/20 dark:text-yellow-400"
                                            : "border-green-500 text-green-600 bg-green-500/20 dark:text-green-400"
                                      }`}
                                    >
                                      {task.priority}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                      {task.status}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Card>

      {/* Milestones */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Project Milestones</h3>
        <div className="space-y-4">
          {milestones && milestones.length > 0 ? milestones.map((milestone, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-lg border border-border/40 hover:border-primary/40 hover:bg-muted/20 transition-all"
            >
              <div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center font-bold
                  ${
                    milestone.status === "completed"
                      ? "bg-green-500/20 text-green-600 dark:text-green-400"
                    : milestone.status === "in-progress"
                        ? "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                        : "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                  }
                `}
              >
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{milestone.name}</p>
                <p className="text-sm text-muted-foreground">{milestone.date}</p>
                {milestone.taskIds && milestone.taskIds.length > 0 && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-muted-foreground">
                      {milestone.taskIds.length} task{milestone.taskIds.length > 1 ? 's' : ''} assigned
                    </span>
                  </div>
                )}
                {milestone.description && (
                  <p className="text-xs text-muted-foreground mt-1">{milestone.description}</p>
                )}
              </div>
              <Badge
                variant="outline"
                className={`${
                  milestone.status === "completed"
                    ? "border-green-500 text-green-600 bg-green-500/20 dark:text-green-400"
                    : milestone.status === "in-progress"
                      ? "border-yellow-500 text-yellow-600 bg-yellow-500/20 dark:text-yellow-400"
                      : "border-blue-500 text-blue-600 bg-blue-500/20 dark:text-blue-400"
                }`}
              >
                {milestone.status}
              </Badge>
            </div>
          )) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              No milestones yet. Click "Add Milestone" to create one.
            </p>
          )}
        </div>
      </Card>

      {/* Add Milestone Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Milestone</DialogTitle>
            <DialogDescription>
              Create a new milestone to track key project deliverables and achievements.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="milestone-project">Project</Label>
              <Input
                id="milestone-project"
                value={project.name}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">Milestone will be added to this project</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="milestone-name">Milestone Name *</Label>
              <Input
                id="milestone-name"
                placeholder="e.g., Beta Launch"
                value={newMilestone.name}
                onChange={(e) => setNewMilestone({ ...newMilestone, name: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="milestone-description">Description</Label>
              <Textarea
                id="milestone-description"
                placeholder="Describe what this milestone represents..."
                value={newMilestone.description}
                onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="milestone-date">Target Date *</Label>
                <Input
                  id="milestone-date"
                  type="date"
                  value={newMilestone.date}
                  onChange={(e) => setNewMilestone({ ...newMilestone, date: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="milestone-status">Status</Label>
                <Select 
                  value={newMilestone.status} 
                  onValueChange={(value: "completed" | "in-progress" | "upcoming") => 
                    setNewMilestone({ ...newMilestone, status: value })
                  }
                >
                  <SelectTrigger id="milestone-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Assign Tasks to Milestone</Label>
              <p className="text-xs text-muted-foreground mb-2">
                Select which tasks are part of this milestone
              </p>
              <ScrollArea className="h-48 border rounded-md p-3">
                {project.tasks.length > 0 ? (
                  <div className="space-y-2">
                    {project.tasks.map((task) => (
                      <div key={task.id} className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md">
                        <Checkbox
                          id={`task-${task.id}`}
                          checked={selectedTasks.includes(task.id)}
                          onCheckedChange={() => toggleTaskSelection(task.id)}
                        />
                        <div className="flex-1 min-w-0">
                          <label
                            htmlFor={`task-${task.id}`}
                            className="text-sm font-medium leading-none cursor-pointer"
                          >
                            {task.title}
                          </label>
                          <p className="text-xs text-muted-foreground">
                            {task.assignee.name} • {task.status}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {task.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No tasks available in this project
                  </p>
                )}
              </ScrollArea>
              <p className="text-xs text-muted-foreground mt-2">
                {selectedTasks.length} task{selectedTasks.length !== 1 ? 's' : ''} selected
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMilestone} disabled={!newMilestone.name || !newMilestone.date}>
              Add Milestone
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
