import { useState, useEffect, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { getProjectById, getProjectWithProgress, type Task } from "@/lib/project-data"
import {
  ArrowLeft,
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
import { SprintView } from "./sprint-view"
import { AddTaskDialog } from "./add-task-dialog"
import { TaskDetailsDialog } from "./task-details-dialog"

interface ProjectDetailProps {
  projectId: string
}

export function ProjectDetail({ projectId }: ProjectDetailProps) {
  const [refreshKey, setRefreshKey] = useState(0)
  const [activeView, setActiveView] = useState("board")
  const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false)
  const [addTaskDefaultStatus, setAddTaskDefaultStatus] = useState<Task["status"]>("todo")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [taskDetailsOpen, setTaskDetailsOpen] = useState(false)
  
  console.log("[ProjectDetail] Rendering, dialog open:", addTaskDialogOpen)
  
  // Get project with calculated progress (recalculates when refreshKey changes)
  const project = useMemo(() => {
    const baseProject = getProjectById(projectId)
    return baseProject ? getProjectWithProgress(baseProject) : null
  }, [projectId, refreshKey])

  // Listen for data updates and refresh
  useEffect(() => {
    const handleProjectUpdate = (event: CustomEvent) => {
      if (event.detail.projectId === projectId) {
        console.log('Project data updated, refreshing...')
        setRefreshKey(prev => prev + 1)
      }
    }
    
    window.addEventListener('projectDataUpdated' as any, handleProjectUpdate)
    return () => window.removeEventListener('projectDataUpdated' as any, handleProjectUpdate)
  }, [projectId])

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Project Not Found</h2>
          <p className="text-muted-foreground mb-4">The project you're looking for doesn't exist.</p>
          <Link to="/projects">
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
    <>
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/30 backdrop-blur-sm -mx-6 px-6 mb-6">
        <div className="py-6">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4 text-base"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Projects
          </Link>

          {/* Project Hero */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-5xl font-bold text-foreground mb-3">{project.name}</h1>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="border-green-500 text-green-600 bg-green-500/20 dark:text-green-400 text-base px-3 py-1">
                  {project.status}
                </Badge>
                <Badge variant="outline" className="border-primary text-primary bg-primary/20 text-base px-3 py-1">
                  Due: {project.deadline}
                </Badge>
                <Badge variant="outline" className="border-primary text-primary bg-primary/20 text-base px-3 py-1">
                  {project.progress}% Complete
                </Badge>
              </div>
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
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4 bg-gradient-to-br from-card to-card/50 border-border/40">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base text-muted-foreground mb-1">Progress</p>
                <p className="text-4xl font-bold text-foreground">{project.progress}%</p>
                <Progress value={project.progress} className="mt-2 h-2" />
              </div>
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-destructive/10 to-card/50 border-destructive/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base text-muted-foreground mb-1">Upcoming Deadlines</p>
                <p className="text-4xl font-bold text-destructive">
                  {project.tasks.filter((t) => t.status !== "done").length}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {project.tasks.filter((t) => t.status !== "done" && new Date(t.deadline) < new Date()).length} overdue
                </p>
              </div>
              <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="w-7 h-7 text-destructive" />
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-card to-card/50 border-border/40">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base text-muted-foreground mb-1">Hours Logged</p>
                <p className="text-4xl font-bold text-foreground">142</p>
                <p className="text-sm text-muted-foreground mt-2">This sprint</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-7 h-7 text-primary" />
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="w-full">
          {activeView === "board" && (
            <KanbanBoard 
              project={project} 
              onAddTask={(defaultStatus) => {
                console.log("[ProjectDetail] Opening dialog from kanban with status:", defaultStatus)
                setAddTaskDefaultStatus(defaultStatus || "todo")
                setAddTaskDialogOpen(true)
              }}
              onTaskClick={(task) => {
                console.log("[ProjectDetail] Task clicked:", task.title)
                setSelectedTask(task)
                setTaskDetailsOpen(true)
              }}
            />
          )}
          {activeView === "table" && <TableView project={project} />}
          {activeView === "calendar" && <CalendarView project={project} />}
          {activeView === "timeline" && <TimelineView project={project} />}
          {activeView === "sprint" && <SprintView project={project} />}
          {activeView === "team" && <TeamManagement project={project} />}
          {activeView === "files" && <FileManagement project={project} />}
          {activeView !== "board" &&
            activeView !== "table" &&
            activeView !== "calendar" &&
            activeView !== "timeline" &&
            activeView !== "sprint" &&
            activeView !== "team" &&
            activeView !== "files" && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4 capitalize">{activeView} View</h2>
                <p className="text-muted-foreground">{activeView} view coming soon...</p>
              </Card>
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

    <AddTaskDialog
      projectId={projectId}
      open={addTaskDialogOpen}
      onOpenChange={setAddTaskDialogOpen}
      defaultStatus={addTaskDefaultStatus}
    />
    
    <TaskDetailsDialog
      projectId={projectId}
      task={selectedTask}
      open={taskDetailsOpen}
      onOpenChange={setTaskDetailsOpen}
    />
  </>
  )
}
