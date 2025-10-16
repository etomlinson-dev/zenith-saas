import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Project, Task } from "@/lib/project-data"
import { GripVertical, Plus } from "lucide-react"

interface KanbanBoardProps {
  project: Project
}

const statusColumns = [
  { id: "backlog", label: "Backlog", color: "bg-muted/80 border-t-4 border-t-muted-foreground" },
  { id: "todo", label: "To Do", color: "bg-blue-500/20 border-t-4 border-t-blue-500" },
  { id: "in-progress", label: "In Progress", color: "bg-yellow-500/20 border-t-4 border-t-yellow-500" },
  { id: "review", label: "Review", color: "bg-purple-500/20 border-t-4 border-t-purple-500" },
  { id: "blocked", label: "Blocked", color: "bg-red-500/20 border-t-4 border-t-red-500" },
  { id: "done", label: "Done", color: "bg-green-500/20 border-t-4 border-t-green-500" },
] as const

function TaskCard({ task, onDragStart }: { task: Task; onDragStart: (task: Task) => void }) {
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

  const isOverdue = (deadline: string) => {
    return new Date(deadline) < new Date()
  }

  return (
    <Card
      draggable={true}
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move"
        e.dataTransfer.setData("text/plain", task.id)
        onDragStart(task)
        const target = e.currentTarget as HTMLElement
        target.style.opacity = "0.5"
      }}
      onDragEnd={(e) => {
        const target = e.currentTarget as HTMLElement
        target.style.opacity = "1"
      }}
      className="p-3 cursor-move hover:shadow-lg transition-shadow duration-200 group select-none mb-2"
    >
      <div className="flex items-start gap-2">
        <div className="cursor-grab active:cursor-grabbing mt-0.5">
          <GripVertical className="w-4 h-4 text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="flex-1 space-y-2">
          <h4 className="text-sm font-medium text-foreground leading-tight">{task.title}</h4>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">
              {task.assignee.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </div>
            <span className="text-xs text-muted-foreground">{task.assignee.name}</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </Badge>
            <span
              className={`text-xs ${
                isOverdue(task.deadline) && task.status !== "done"
                  ? "text-red-500 font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              {task.deadline}
            </span>
          </div>

          {task.status !== "done" && task.progress > 0 && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-foreground font-medium">{task.progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all" style={{ width: `${task.progress}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

function Column({
  column,
  tasks,
  onDrop,
  onDragStart,
}: {
  column: (typeof statusColumns)[number]
  tasks: Task[]
  onDrop: (status: Task["status"]) => void
  onDragStart: (task: Task) => void
}) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = "move"
    setIsDragOver(true)
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX
    const y = e.clientY
    
    if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
      setIsDragOver(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
    onDrop(column.id as Task["status"])
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        flex flex-col rounded-lg border border-border/40 transition-all min-h-[400px]
        ${isDragOver ? "border-primary bg-primary/5 ring-2 ring-primary/20 scale-[1.02]" : ""}
      `}
    >
      <div className={`p-3 rounded-t-lg ${column.color} border-b border-border/40`}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm text-foreground">{column.label}</h3>
          <Badge variant="secondary" className="text-xs">
            {tasks.length}
          </Badge>
        </div>
      </div>

      <div className="flex-1 p-2 space-y-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDragStart={onDragStart} />
        ))}

        {tasks.length === 0 && (
          <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
            {isDragOver ? "Drop here" : "No tasks"}
          </div>
        )}
      </div>

      <div className="p-2 border-t border-border/40">
        <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Add task
        </Button>
      </div>
    </div>
  )
}

export function KanbanBoard({ project }: KanbanBoardProps) {
  const [tasks, setTasks] = useState<Task[]>(project.tasks)
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)

  const getTasksByStatus = (status: Task["status"]) => {
    return tasks.filter((task) => task.status === status)
  }

  const handleDragStart = (task: Task) => {
    setDraggedTask(task)
  }

  const handleDrop = (newStatus: Task["status"]) => {
    if (!draggedTask) {
      return
    }

    if (draggedTask.status === newStatus) {
      setDraggedTask(null)
      return
    }

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === draggedTask.id ? { ...task, status: newStatus } : task
      )
    )

    setDraggedTask(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Kanban Board</h2>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statusColumns.map((column) => {
          const columnTasks = getTasksByStatus(column.id as Task["status"])

          return (
            <Column
              key={column.id}
              column={column}
              tasks={columnTasks}
              onDrop={handleDrop}
              onDragStart={handleDragStart}
            />
          )
        })}
      </div>
    </div>
  )
}
