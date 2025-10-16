import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { addTask, getProjectTeamMembers, type Task, type TeamMember } from "@/lib/project-data"

interface AddTaskDialogProps {
  projectId: string
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultStatus?: Task["status"]
}

export function AddTaskDialog({ 
  projectId, 
  open, 
  onOpenChange,
  defaultStatus = "todo"
}: AddTaskDialogProps) {
  console.log("[AddTaskDialog] Rendering, open:", open, "projectId:", projectId)
  
  const teamMembers = getProjectTeamMembers(projectId)
  
  console.log("[AddTaskDialog] Team members:", teamMembers.length)
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: defaultStatus as Task["status"],
    priority: "medium" as Task["priority"],
    assigneeName: "",
    assigneeAvatar: "",
    deadline: "",
    progress: 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log("[AddTaskDialog] Form submitted", formData)
    
    if (!formData.title.trim()) {
      console.log("[AddTaskDialog] Title is empty, not submitting")
      return
    }

    console.log("[AddTaskDialog] Adding task to project:", projectId)
    
    const newTask = addTask(projectId, {
      title: formData.title,
      description: formData.description,
      status: formData.status,
      priority: formData.priority,
      assignee: {
        name: formData.assigneeName || "Unassigned",
        avatar: formData.assigneeAvatar || "/placeholder.svg?height=32&width=32"
      },
      deadline: formData.deadline,
      progress: formData.progress,
    })

    console.log("[AddTaskDialog] Task added:", newTask)

    if (newTask) {
      // Reset form
      setFormData({
        title: "",
        description: "",
        status: defaultStatus,
        priority: "medium",
        assigneeName: "",
        assigneeAvatar: "",
        deadline: "",
        progress: 0,
      })
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Task Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter task title..."
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter task description..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as Task["status"] })}
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
              </div>

              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => setFormData({ ...formData, priority: value as Task["priority"] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="assignee">Assignee</Label>
                <Select
                  value={formData.assigneeName}
                  onValueChange={(value) => {
                    const member = teamMembers.find(m => m.name === value)
                    if (member) {
                      setFormData({ 
                        ...formData, 
                        assigneeName: member.name,
                        assigneeAvatar: member.avatar
                      })
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select assignee..." />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map((member) => (
                      <SelectItem key={member.id} value={member.name}>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">
                            {member.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm">{member.name}</span>
                            <span className="text-xs text-muted-foreground">{member.role}</span>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="deadline">Deadline (Optional)</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

