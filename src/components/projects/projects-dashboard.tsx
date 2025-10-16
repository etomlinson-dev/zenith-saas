"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { mockProjects, getOverdueTasks, getUpcomingDeadlines } from "@/lib/project-data"
import {
  LayoutDashboard,
  AlertCircle,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowRight,
  FolderKanban,
} from "lucide-react"
import { Link } from "react-router-dom"

export function ProjectsDashboard() {
  const activeProjects = mockProjects.filter((p) => p.status === "active").length
  const overdueTasks = getOverdueTasks()
  const upcomingDeadlines = getUpcomingDeadlines()

  const statusCounts = {
    backlog: 8,
    todo: 15,
    "in-progress": 12,
    review: 6,
    blocked: 3,
    done: 42,
  }

  return (
    <div className="min-h-screen bg-background my-28">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <FolderKanban className="w-8 h-8 text-foreground" />
            <h1 className="text-4xl font-bold text-foreground">Project Management</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">Project Management</span>
          </div>

          {/* KPI Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card className="p-4 bg-gradient-to-br from-card to-card/50 border-border/40">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active Projects</p>
                  <p className="text-3xl font-bold text-foreground">{activeProjects}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-destructive/10 to-card/50 border-destructive/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Overdue Tasks</p>
                  <p className="text-3xl font-bold text-destructive">{overdueTasks}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-destructive" />
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-card to-card/50 border-border/40">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Upcoming Deadlines</p>
                  <p className="text-3xl font-bold text-foreground">{upcomingDeadlines}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - 8 cols */}
          <div className="lg:col-span-8 space-y-6">
            {/* Status Tiles */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-foreground">To Do</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(statusCounts).map(([status, count]) => (
                  <div
                    key={status}
                    className="p-4 rounded-lg bg-gradient-to-br from-muted/50 to-muted/20 border border-border/40 hover:border-primary/40 transition-all cursor-pointer group"
                  >
                    <p className="text-sm text-muted-foreground capitalize mb-1 group-hover:text-foreground transition-colors">
                      {status.replace("-", " ")}
                    </p>
                    <p className="text-2xl font-bold text-foreground">{count}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Active Projects Table */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Active Projects</h2>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <div className="space-y-3">
                {mockProjects.slice(0, 5).map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center gap-4 p-4 rounded-lg border border-border/40 hover:border-primary/40 hover:bg-muted/20 transition-all group"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <div className="flex items-center gap-3">
                        <Progress value={project.progress} className="flex-1 h-2" />
                        <span className="text-sm text-muted-foreground min-w-[60px]">
                          {project.progress}% ({project.completedTasks}/{project.totalTasks})
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Deadline</p>
                        <p className="text-sm font-medium text-foreground">{project.deadline}</p>
                      </div>
                      <Link to={`/projects/${project.id}`}>
                        <Button size="sm" variant="ghost" className="group-hover:bg-primary/10">
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - 4 cols */}
          <div className="lg:col-span-4 space-y-6">
            {/* Calendar Widget */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Calendar</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">February 2025</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      ‹
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      ›
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                    <div key={i} className="text-muted-foreground font-medium py-2">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                    <div
                      key={day}
                      className={`
                        py-2 rounded-md cursor-pointer transition-colors
                        ${day === 10 ? "bg-primary text-primary-foreground font-bold" : "hover:bg-muted/50"}
                        ${[15, 20, 25, 28].includes(day) ? "relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-destructive" : ""}
                      `}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* My Tasks */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-foreground">My Tasks</h2>
              <div className="space-y-3">
                {[
                  { title: "Review design mockups", priority: "high", time: "Today" },
                  { title: "Update project timeline", priority: "medium", time: "Today" },
                  { title: "Team standup meeting", priority: "low", time: "2:00 PM" },
                  { title: "Code review for PR #234", priority: "high", time: "Tomorrow" },
                ].map((task, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/20 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{task.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            task.priority === "high"
                              ? "border-destructive/50 text-destructive"
                              : task.priority === "medium"
                                ? "border-yellow-500 text-yellow-600 bg-yellow-500/20 dark:text-yellow-400"
                                : "border-green-500 text-green-600 bg-green-500/20 dark:text-green-400"
                          }`}
                        >
                          {task.priority}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{task.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Activity Feed */}
        <Card className="p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Recent Activity</h2>
          <div className="space-y-4">
            {[
              {
                type: "completed",
                user: "Sarah Chen",
                action: "completed task",
                target: "Design homepage mockup",
                time: "2 hours ago",
              },
              {
                type: "comment",
                user: "Mike Johnson",
                action: "commented on",
                target: "Website Redesign",
                time: "5 hours ago",
              },
              {
                type: "created",
                user: "Emily Davis",
                action: "created new task",
                target: "Mobile responsive testing",
                time: "1 day ago",
              },
              {
                type: "updated",
                user: "Alex Kim",
                action: "updated status of",
                target: "API Integration",
                time: "2 days ago",
              },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/20 transition-colors">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === "completed"
                      ? "bg-green-500/10"
                      : activity.type === "comment"
                        ? "bg-blue-500/10"
                        : "bg-primary/10"
                  }`}
                >
                  {activity.type === "completed" ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : activity.type === "comment" ? (
                    <LayoutDashboard className="w-5 h-5 text-blue-500" />
                  ) : (
                    <Clock className="w-5 h-5 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">{activity.user}</span> {activity.action}{" "}
                    <span className="font-medium">{activity.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
