import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { getProjectById } from "@/lib/project-data"
import {
  ArrowLeft,
  Edit,
  Plus,
  Upload,
  List,
  LayoutGrid,
  Target,
  GitBranch,
  CalendarIcon,
  TrendingUp,
  Users,
  FolderOpen,
  Share2,
  BarChart3,
  AlertCircle,
  Clock,
} from "lucide-react"
import { Link } from "react-router-dom"
import { KanbanBoard } from "./kanban-board"
import { TableView } from "./table-view"
import { CalendarView } from "./calendar-view"
import { TimelineView } from "./timeline-view"
import { TeamManagement } from "./team-management"
import { FileManagement } from "./file-management"

interface ProjectDetailProps {
  projectId: string
}

export function ProjectDetail({ projectId }: ProjectDetailProps) {
  const project = getProjectById(projectId)
  const [activeView, setActiveView] = useState("board")

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Project Not Found</h2>
          <p className="text-muted-foreground mb-4">The project you're looking for doesn't exist.</p>
          <Link href="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </div>
    )
  }

  const viewModes = [
    { id: "table", label: "Table", icon: List },
    { id: "board", label: "Board", icon: LayoutGrid },
    { id: "plan", label: "Plan", icon: Target },
    { id: "timeline", label: "Timeline", icon: GitBranch },
    { id: "calendar", label: "Calendar", icon: CalendarIcon },
    { id: "sprint", label: "Sprint", icon: TrendingUp },
    { id: "team", label: "Team", icon: Users },
    { id: "files", label: "Files", icon: FolderOpen },
    { id: "share", label: "Share", icon: Share2 },
    { id: "reports", label: "Reports", icon: BarChart3 },
  ]

  return (
    <div className="min-h-screen bg-background py-28">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          {/* Project Hero */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-3">{project.name}</h1>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="border-green-500/50 text-green-500">
                  {project.status}
                </Badge>
                <Badge variant="outline" className="border-primary/50 text-primary">
                  Due: {project.deadline}
                </Badge>
                <Badge variant="outline" className="border-primary/50 text-primary">
                  {project.progress}% Complete
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload File
              </Button>
            </div>
          </div>

          {/* View Mode Toolbar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {viewModes.map((mode) => {
              const Icon = mode.icon
              return (
                <Button
                  key={mode.id}
                  variant={activeView === mode.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveView(mode.id)}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <Icon className="w-4 h-4" />
                  {mode.label}
                </Button>
              )
            })}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4 bg-gradient-to-br from-card to-card/50 border-border/40">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Progress</p>
                <p className="text-3xl font-bold text-foreground">{project.progress}%</p>
                <Progress value={project.progress} className="mt-2 h-2" />
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-destructive/10 to-card/50 border-destructive/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Upcoming Deadlines</p>
                <p className="text-3xl font-bold text-destructive">
                  {project.tasks.filter((t) => t.status !== "done").length}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {project.tasks.filter((t) => t.status !== "done" && new Date(t.deadline) < new Date()).length} overdue
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-card to-card/50 border-border/40">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Hours Logged</p>
                <p className="text-3xl font-bold text-foreground">142</p>
                <p className="text-xs text-muted-foreground mt-2">This sprint</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Main View */}
          <div className={activeView === "team" || activeView === "files" ? "lg:col-span-12" : "lg:col-span-9"}>
            {activeView === "board" && <KanbanBoard project={project} />}
            {activeView === "table" && <TableView project={project} />}
            {activeView === "calendar" && <CalendarView project={project} />}
            {activeView === "timeline" && <TimelineView project={project} />}
            {activeView === "team" && <TeamManagement project={project} />}
            {activeView === "files" && <FileManagement project={project} />}
            {activeView !== "board" &&
              activeView !== "table" &&
              activeView !== "calendar" &&
              activeView !== "timeline" &&
              activeView !== "team" &&
              activeView !== "files" && (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4 capitalize">{activeView} View</h2>
                  <p className="text-muted-foreground">{activeView} view coming soon...</p>
                </Card>
              )}
          </div>

          {/* Right Sidebar - Only show for certain views */}
          {activeView !== "team" && activeView !== "files" && (
            <div className="lg:col-span-3 space-y-6">
              {/* Calendar */}
              <Card className="p-4">
                <h3 className="font-semibold mb-3 text-foreground">Calendar</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">February 2025</span>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        ‹
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        ›
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-xs">
                    {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                      <div key={i} className="text-muted-foreground font-medium py-1">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                      <div
                        key={day}
                        className={`
                        py-1 rounded text-xs cursor-pointer transition-colors
                        ${day === 10 ? "bg-primary text-primary-foreground font-bold" : "hover:bg-muted/50"}
                        ${[15, 20, 25, 28].includes(day) ? "relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-destructive" : ""}
                      `}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Team Members */}
              <Card className="p-4">
                <h3 className="font-semibold mb-3 text-foreground">Team</h3>
                <div className="space-y-3">
                  {project.team.map((member) => (
                    <div key={member.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{member.capacity}h</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Files */}
              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">Files</h3>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {project.files.map((file) => (
                    <div
                      key={file.id}
                      className="p-2 rounded-lg border border-border/40 hover:border-primary/40 hover:bg-muted/20 transition-all cursor-pointer"
                    >
                      <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{file.size}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Activity Timeline */}
        <Card className="p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Activity Timeline</h2>
          <div className="space-y-4">
            {project.activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">{activity.user}</span> {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
