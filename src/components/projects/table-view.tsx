"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Project, Task } from "@/lib/project-data"
import { Plus, Search, Filter, MoreHorizontal } from "lucide-react"

interface TableViewProps {
  project: Project
}

export function TableView({ project }: TableViewProps) {
  const [tasks, setTasks] = useState<Task[]>(project.tasks)
  const [searchQuery, setSearchQuery] = useState("")
  const [newTask, setNewTask] = useState({
    title: "",
    assignee: "",
    status: "todo" as Task["status"],
    deadline: "",
  })

  const filteredTasks = tasks.filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleAddTask = () => {
    if (newTask.title && newTask.assignee && newTask.deadline) {
      const task: Task = {
        id: `t${tasks.length + 1}`,
        title: newTask.title,
        status: newTask.status,
        priority: "medium",
        assignee: {
          name: newTask.assignee,
          avatar: "/placeholder.svg?height=32&width=32",
        },
        deadline: newTask.deadline,
        progress: 0,
      }
      setTasks([...tasks, task])
      setNewTask({ title: "", assignee: "", status: "todo", deadline: "" })
    }
  }

  const handleStatusChange = (taskId: string, newStatus: Task["status"]) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))
  }

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "border-red-500/50 text-red-500 bg-red-500/10"
      case "medium":
        return "border-yellow-500/50 text-yellow-500 bg-yellow-500/10"
      case "low":
        return "border-green-500/50 text-green-500 bg-green-500/10"
    }
  }

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "backlog":
        return "border-muted-foreground/50 text-muted-foreground bg-muted"
      case "todo":
        return "border-blue-500/50 text-blue-500 bg-blue-500/10"
      case "in-progress":
        return "border-yellow-500/50 text-yellow-500 bg-yellow-500/10"
      case "review":
        return "border-purple-500/50 text-purple-500 bg-purple-500/10"
      case "blocked":
        return "border-red-500/50 text-red-500 bg-red-500/10"
      case "done":
        return "border-green-500/50 text-green-500 bg-green-500/10"
    }
  }

  const isOverdue = (deadline: string, status: Task["status"]) => {
    return status !== "done" && new Date(deadline) < new Date()
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
            className="md:col-span-2"
          />
          <Input
            placeholder="Assignee name"
            value={newTask.assignee}
            onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
          />
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
            <Button onClick={handleAddTask} size="icon">
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
                    border-b border-border/40 hover:bg-muted/20 transition-colors
                    ${index % 2 === 0 ? "bg-background" : "bg-muted/10"}
                  `}
                >
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
                  <td className="p-4">
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
                        isOverdue(task.deadline, task.status) ? "text-red-500 font-semibold" : "text-foreground"
                      }`}
                    >
                      {task.deadline}
                    </span>
                  </td>
                  <td className="p-4">
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
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
    </div>
  )
}
