import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Project, Task } from "@/lib/project-data"
import { Plus, Search, Filter, MoreVertical, Trash2 } from "lucide-react"
import { TaskDetailsDialog } from "./task-details-dialog"
import { getProjectTeamMembers, updateTaskStatus, deleteTask, addTask } from "@/lib/project-data"

interface TableViewProps {
  project: Project
}

export function TableView({ project }: TableViewProps) {
  const [tasks, setTasks] = useState<Task[]>(project.tasks)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [taskDetailsOpen, setTaskDetailsOpen] = useState(false)
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  const teamMembers = getProjectTeamMembers(project.id)
  const [newTask, setNewTask] = useState({
    title: "",
    assigneeName: "",
    assigneeAvatar: "",
    status: "todo" as Task["status"],
    deadline: "",
  })

  const filteredTasks = tasks.filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()))

  // Update tasks when project data changes
  useEffect(() => {
    setTasks(project.tasks)
  }, [project.tasks])

  // Listen for project data updates
  useEffect(() => {
    const handleProjectUpdate = (event: CustomEvent) => {
      if (event.detail.projectId === project.id) {
        console.log("[TableView] Project data updated, refreshing tasks")
        setTasks(project.tasks)
      }
    }

    window.addEventListener('projectDataUpdated', handleProjectUpdate as EventListener)
    return () => window.removeEventListener('projectDataUpdated', handleProjectUpdate as EventListener)
  }, [project.id, project.tasks])

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    setTaskDetailsOpen(true)
  }

  const formatDeadline = (deadline: string) => {
    if (!deadline) return 'No deadline'
    const date = new Date(deadline)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const handleAddTask = () => {
    if (newTask.title && newTask.assigneeName) {
      const taskData: Omit<Task, 'id'> = {
        title: newTask.title,
        status: newTask.status,
        priority: "medium",
        assignee: {
          name: newTask.assigneeName,
          avatar: newTask.assigneeAvatar || "/placeholder.svg?height=32&width=32",
        },
        deadline: newTask.deadline,
        progress: 0,
      }
      
      // Add task to global data store
      const newTaskWithId = addTask(project.id, taskData)
      
      if (!newTaskWithId) {
        console.error("[TableView] Failed to add task")
        return
      }
      
      // Update local state
      setTasks([...tasks, newTaskWithId])
      
      // Reset form
      setNewTask({ title: "", assigneeName: "", assigneeAvatar: "", status: "todo", deadline: "" })
      
      console.log("[TableView] Task added:", newTaskWithId.title)
    }
  }

  const handleStatusChange = (taskId: string, newStatus: Task["status"]) => {
    // Update local state immediately for responsive UI
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))
    
    // Update the underlying data and trigger refresh across all views
    updateTaskStatus(project.id, taskId, newStatus)
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

  const isOverdue = (deadline: string, status: Task["status"]) => {
    if (!deadline || status === "done") return false
    return new Date(deadline) < new Date()
  }

  const toggleTaskSelection = (taskId: string) => {
    setSelectedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    )
  }

  const toggleSelectAll = () => {
    setSelectedTasks(prev =>
      prev.length === filteredTasks.length
        ? []
        : filteredTasks.map(t => t.id)
    )
  }

  const deleteSelectedTasks = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedTasks.length} task(s)?`)) {
      // Delete each selected task
      selectedTasks.forEach(taskId => {
        deleteTask(project.id, taskId)
      })
      
      // Update local state
      setTasks(tasks.filter(t => !selectedTasks.includes(t.id)))
      setSelectedTasks([])
    }
  }

  return (
    <div className="space-y-4">
      {/* Quick Add Task Form */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3 text-foreground">Quick Add Task</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <Input
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && newTask.title && newTask.assigneeName) {
                handleAddTask()
              }
            }}
            className="md:col-span-2"
          />
          <Select
            value={newTask.assigneeName}
            onValueChange={(value) => {
              const member = teamMembers.find(m => m.name === value)
              if (member) {
                setNewTask({ ...newTask, assigneeName: member.name, assigneeAvatar: member.avatar })
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select assignee..." />
            </SelectTrigger>
            <SelectContent>
              {teamMembers.map((member) => (
                <SelectItem key={member.id} value={member.name}>
                  {member.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={newTask.status}
            onValueChange={(value) => setNewTask({ ...newTask, status: value as Task["status"] })}
          >
            <SelectTrigger>
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
          <div className="flex gap-2">
            <Input
              type="date"
              value={newTask.deadline}
              onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
              className="flex-1"
            />
            <Button 
              onClick={handleAddTask} 
              size="icon"
              disabled={!newTask.title || !newTask.assigneeName}
              title={!newTask.title || !newTask.assigneeName ? "Enter title and select assignee" : "Add task"}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Search and Filter */}
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          {selectedTasks.length > 0 && (
            <>
              <Badge variant="secondary">
                {selectedTasks.length} selected
              </Badge>
              <Button
                variant="destructive"
                size="sm"
                onClick={deleteSelectedTasks}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete {selectedTasks.length === 1 ? 'Task' : `${selectedTasks.length} Tasks`}
              </Button>
            </>
          )}
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Saved views" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="my-tasks">My Tasks</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="high-priority">High Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Tasks Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border/40">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-foreground w-12">
                  <Checkbox
                    checked={selectedTasks.length === filteredTasks.length && filteredTasks.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">Task</th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">Assignee</th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">Status</th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">Priority</th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">Progress</th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">Deadline</th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task, index) => (
                <tr
                  key={task.id}
                  className={`
                    border-b border-border/40 hover:bg-muted/20 transition-colors cursor-pointer
                    ${index % 2 === 0 ? "bg-background" : "bg-muted/10"}
                  `}
                  onClick={() => handleTaskClick(task)}
                >
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedTasks.includes(task.id)}
                      onCheckedChange={() => toggleTaskSelection(task.id)}
                    />
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-foreground">{task.title}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">
                        {task.assignee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="text-sm text-foreground">{task.assignee.name}</span>
                    </div>
                  </td>
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <Select
                      value={task.status}
                      onValueChange={(value) => handleStatusChange(task.id, value as Task["status"])}
                    >
                      <SelectTrigger className="w-[140px]">
                        <Badge variant="outline" className={`${getStatusColor(task.status)} border-0`}>
                          {task.status.replace("-", " ")}
                        </Badge>
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
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <Progress value={task.progress} className="flex-1 h-2" />
                      <span className="text-sm text-muted-foreground">{task.progress}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-sm ${
                        task.deadline && isOverdue(task.deadline, task.status) ? "text-red-500 font-semibold" : "text-foreground"
                      }`}
                    >
                      {formatDeadline(task.deadline)}
                    </span>
                  </td>
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="sm" onClick={() => handleTaskClick(task)}>
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTasks.length === 0 && (
          <div className="flex items-center justify-center py-12 text-muted-foreground">No tasks found</div>
        )}
      </Card>

      <TaskDetailsDialog
        projectId={project.id}
        task={selectedTask}
        open={taskDetailsOpen}
        onOpenChange={setTaskDetailsOpen}
      />
    </div>
  )
}
