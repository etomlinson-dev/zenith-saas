export interface Task {
  id: string
  title: string
  status: "backlog" | "todo" | "in-progress" | "review" | "blocked" | "done"
  priority: "low" | "medium" | "high"
  assignee: {
    name: string
    avatar: string
  }
  deadline: string
  progress: number
  description?: string
}

export interface Project {
  id: string
  name: string
  status: "active" | "completed" | "on-hold"
  progress: number
  deadline: string
  tasks: Task[]
  totalTasks: number
  completedTasks: number
  team: TeamMember[]
  files: ProjectFile[]
  activities: Activity[]
}

export interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
  capacity: number
}

export interface ProjectFile {
  id: string
  name: string
  type: string
  uploadedBy: string
  uploadedAt: string
  size: string
}

export interface Activity {
  id: string
  type: string
  description: string
  user: string
  timestamp: string
}

// Mock data for demonstration
export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    status: "active",
    progress: 65,
    deadline: "2025-03-15",
    totalTasks: 24,
    completedTasks: 16,
    tasks: [
      {
        id: "t1",
        title: "Design homepage mockup",
        status: "done",
        priority: "high",
        assignee: { name: "Sarah Chen", avatar: "/placeholder.svg?height=32&width=32" },
        deadline: "2025-02-20",
        progress: 100,
      },
      {
        id: "t2",
        title: "Implement responsive navigation",
        status: "in-progress",
        priority: "high",
        assignee: { name: "Mike Johnson", avatar: "/placeholder.svg?height=32&width=32" },
        deadline: "2025-02-25",
        progress: 60,
      },
      {
        id: "t3",
        title: "Create product page templates",
        status: "review",
        priority: "medium",
        assignee: { name: "Emily Davis", avatar: "/placeholder.svg?height=32&width=32" },
        deadline: "2025-02-28",
        progress: 90,
      },
      {
        id: "t4",
        title: "Setup analytics tracking",
        status: "todo",
        priority: "low",
        assignee: { name: "Alex Kim", avatar: "/placeholder.svg?height=32&width=32" },
        deadline: "2025-03-05",
        progress: 0,
      },
      {
        id: "t5",
        title: "Optimize image loading",
        status: "blocked",
        priority: "medium",
        assignee: { name: "Sarah Chen", avatar: "/placeholder.svg?height=32&width=32" },
        deadline: "2025-02-22",
        progress: 30,
      },
    ],
    team: [
      {
        id: "1",
        name: "Sarah Chen",
        role: "Lead Designer",
        avatar: "/placeholder.svg?height=40&width=40",
        capacity: 40,
      },
      {
        id: "2",
        name: "Mike Johnson",
        role: "Frontend Dev",
        avatar: "/placeholder.svg?height=40&width=40",
        capacity: 35,
      },
      {
        id: "3",
        name: "Emily Davis",
        role: "UI Designer",
        avatar: "/placeholder.svg?height=40&width=40",
        capacity: 30,
      },
      { id: "4", name: "Alex Kim", role: "Backend Dev", avatar: "/placeholder.svg?height=40&width=40", capacity: 38 },
    ],
    files: [
      {
        id: "1",
        name: "design-system.fig",
        type: "Figma",
        uploadedBy: "Sarah Chen",
        uploadedAt: "2025-02-10",
        size: "2.4 MB",
      },
      {
        id: "2",
        name: "wireframes.pdf",
        type: "PDF",
        uploadedBy: "Emily Davis",
        uploadedAt: "2025-02-12",
        size: "1.8 MB",
      },
    ],
    activities: [
      {
        id: "1",
        type: "task_completed",
        description: "Design homepage mockup completed",
        user: "Sarah Chen",
        timestamp: "2 hours ago",
      },
      {
        id: "2",
        type: "comment",
        description: "Added feedback on navigation design",
        user: "Mike Johnson",
        timestamp: "5 hours ago",
      },
    ],
  },
  {
    id: "2",
    name: "Mobile App Development",
    status: "active",
    progress: 42,
    deadline: "2025-04-20",
    totalTasks: 36,
    completedTasks: 15,
    tasks: [],
    team: [],
    files: [],
    activities: [],
  },
  {
    id: "3",
    name: "Marketing Campaign",
    status: "active",
    progress: 78,
    deadline: "2025-02-28",
    totalTasks: 18,
    completedTasks: 14,
    tasks: [],
    team: [],
    files: [],
    activities: [],
  },
  {
    id: "4",
    name: "API Integration",
    status: "on-hold",
    progress: 25,
    deadline: "2025-05-10",
    totalTasks: 22,
    completedTasks: 6,
    tasks: [],
    team: [],
    files: [],
    activities: [],
  },
  {
    id: "5",
    name: "Database Migration",
    status: "active",
    progress: 88,
    deadline: "2025-02-15",
    totalTasks: 12,
    completedTasks: 11,
    tasks: [],
    team: [],
    files: [],
    activities: [],
  },
]

export function getProjectById(id: string): Project | undefined {
  return mockProjects.find((p) => p.id === id)
}

export function getOverdueTasks(): number {
  const today = new Date()
  let count = 0
  mockProjects.forEach((project) => {
    project.tasks.forEach((task) => {
      if (task.status !== "done" && new Date(task.deadline) < today) {
        count++
      }
    })
  })
  return count
}

export function getUpcomingDeadlines(): number {
  const today = new Date()
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
  let count = 0
  mockProjects.forEach((project) => {
    project.tasks.forEach((task) => {
      const deadline = new Date(task.deadline)
      if (task.status !== "done" && deadline >= today && deadline <= nextWeek) {
        count++
      }
    })
  })
  return count
}
