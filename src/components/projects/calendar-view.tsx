"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { Project, Task } from "@/lib/project-data"
import { addTask, getProjectTeamMembers } from "@/lib/project-data"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { TaskDetailsDialog } from "./task-details-dialog"

interface CalendarViewProps {
  project: Project
}

export function CalendarView({ project }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 1, 1)) // February 2025
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [tasks, setTasks] = useState<Task[]>(project.tasks)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [taskDetailsOpen, setTaskDetailsOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    assignee: "",
    priority: "medium" as Task["priority"],
    status: "todo" as Task["status"],
    date: "",
  })
  
  const teamMembers = getProjectTeamMembers(project.id)

  // Update tasks when project data changes
  useEffect(() => {
    setTasks(project.tasks)
  }, [project.tasks])

  // Listen for project data updates
  useEffect(() => {
    const handleProjectUpdate = (event: CustomEvent) => {
      if (event.detail.projectId === project.id) {
        console.log("[CalendarView] Project data updated, refreshing tasks")
        // The project prop will be updated by parent, which triggers the first useEffect
      }
    }

    window.addEventListener('projectDataUpdated', handleProjectUpdate as EventListener)
    return () => window.removeEventListener('projectDataUpdated', handleProjectUpdate as EventListener)
  }, [project.id])

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  // Map tasks to calendar dates
  const getTasksForDate = (day: number) => {
    const dateStr = `2025-02-${day.toString().padStart(2, "0")}`
    return tasks.filter((task) => task.deadline === dateStr)
  }

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.assignee && newEvent.date) {
      const assigneeMember = teamMembers.find(m => m.name === newEvent.assignee)
      
      const taskData: Omit<Task, 'id'> = {
        title: newEvent.title,
        description: newEvent.description,
        status: newEvent.status,
        priority: newEvent.priority,
        assignee: {
          name: newEvent.assignee,
          avatar: assigneeMember?.avatar || "/placeholder.svg?height=32&width=32",
        },
        deadline: newEvent.date,
        progress: 0,
      }
      
      // Add task/event to global data store
      const newTaskWithId = addTask(project.id, taskData)
      
      if (!newTaskWithId) {
        console.error("[CalendarView] Failed to add task")
        return
      }
      
      // Update local state immediately for instant UI feedback
      setTasks([...tasks, newTaskWithId])
      
      // Reset form and close dialog
      setNewEvent({
        title: "",
        description: "",
        assignee: "",
        priority: "medium",
        status: "todo",
        date: "",
      })
      setIsDialogOpen(false)
      
      console.log("[CalendarView] Event added:", newTaskWithId.title)
    }
  }

  return (
    <div className="space-y-4">
      <Card className="p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={previousMonth}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={nextMonth}>
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button size="sm" onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Day Headers */}
          {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
            <div key={day} className="text-center font-semibold text-sm text-muted-foreground py-3 border-b">
              {day}
            </div>
          ))}

          {/* Empty cells for days before month starts */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-[120px] bg-muted/20 rounded-lg" />
          ))}

          {/* Calendar Days */}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
            const tasks = getTasksForDate(day)
            const isToday = day === 10 // Simulating today as Feb 10

            return (
              <div
                key={day}
                className={`
                  min-h-[120px] p-2 rounded-lg border border-border/40 hover:border-primary/40 transition-all
                  ${isToday ? "bg-primary/5 border-primary/60" : "bg-card"}
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`
                      text-sm font-semibold
                      ${isToday ? "w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center" : "text-foreground"}
                    `}
                  >
                    {day}
                  </span>
                  {tasks.length > 0 && (
                    <Badge variant="secondary" className="text-xs h-5">
                      {tasks.length}
                    </Badge>
                  )}
                </div>

                <div className="space-y-1">
                  {tasks.slice(0, 3).map((task) => (
                    <div
                      key={task.id}
                      onClick={() => {
                        setSelectedTask(task)
                        setTaskDetailsOpen(true)
                      }}
                      className={`
                        text-xs p-1.5 rounded truncate cursor-pointer transition-all hover:scale-105 hover:shadow-md
                        ${
                          task.status === "done"
                            ? "bg-green-500/20 text-green-700 dark:text-green-300"
                            : task.priority === "high"
                              ? "bg-red-500/20 text-red-700 dark:text-red-300"
                              : task.priority === "medium"
                                ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300"
                                : "bg-blue-500/20 text-blue-700 dark:text-blue-300"
                        }
                      `}
                    >
                      {task.title}
                    </div>
                  ))}
                  {tasks.length > 3 && (
                    <div className="text-xs text-muted-foreground text-center">+{tasks.length - 3} more</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Upcoming Events */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Upcoming Deadlines</h3>
        <div className="space-y-3">
          {tasks
            .filter((t) => t.status !== "done")
            .slice(0, 5)
            .map((task) => (
              <div
                key={task.id}
                onClick={() => {
                  setSelectedTask(task)
                  setTaskDetailsOpen(true)
                }}
                className="flex items-center gap-4 p-3 rounded-lg border border-border/40 hover:border-primary/40 hover:bg-muted/20 transition-all cursor-pointer"
              >
                <div className="text-center min-w-[60px]">
                  <p className="text-2xl font-bold text-foreground">{task.deadline.split("-")[2]}</p>
                  <p className="text-xs text-muted-foreground">FEB</p>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{task.title}</p>
                  <div className="flex items-center gap-2 mt-1">
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
                    <span className="text-xs text-muted-foreground">{task.assignee.name}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Card>

      {/* Add Event Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>
              Create a new event or task in the calendar.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="event-title">Event Title *</Label>
              <Input
                id="event-title"
                placeholder="e.g., Team Meeting, Product Launch"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="event-description">Description</Label>
              <Textarea
                id="event-description"
                placeholder="Describe the event..."
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="event-assignee">Assignee *</Label>
                <Select
                  value={newEvent.assignee}
                  onValueChange={(value) => setNewEvent({ ...newEvent, assignee: value })}
                >
                  <SelectTrigger id="event-assignee">
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map((member) => (
                      <SelectItem key={member.id} value={member.name}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-date">Date *</Label>
                <Input
                  id="event-date"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="event-priority">Priority</Label>
                <Select
                  value={newEvent.priority}
                  onValueChange={(value: Task["priority"]) => setNewEvent({ ...newEvent, priority: value })}
                >
                  <SelectTrigger id="event-priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-status">Status</Label>
                <Select
                  value={newEvent.status}
                  onValueChange={(value: Task["status"]) => setNewEvent({ ...newEvent, status: value })}
                >
                  <SelectTrigger id="event-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="backlog">Backlog</SelectItem>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddEvent}
              disabled={!newEvent.title || !newEvent.assignee || !newEvent.date}
            >
              Add Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Task Details Dialog */}
      <TaskDetailsDialog
        projectId={project.id}
        task={selectedTask}
        open={taskDetailsOpen}
        onOpenChange={setTaskDetailsOpen}
      />
    </div>
  )
}
