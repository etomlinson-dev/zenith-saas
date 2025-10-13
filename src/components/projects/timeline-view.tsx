"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Project } from "@/lib/project-data"
import { Plus, ZoomIn, ZoomOut } from "lucide-react"

interface TimelineViewProps {
  project: Project
}

export function TimelineView({ project }: TimelineViewProps) {
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
            <Button variant="outline" size="sm">
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button size="sm">
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
          {[
            { name: "Project Kickoff", date: "2025-01-15", status: "completed" },
            { name: "Design Phase Complete", date: "2025-02-28", status: "in-progress" },
            { name: "Development Complete", date: "2025-04-30", status: "upcoming" },
            { name: "Testing & QA", date: "2025-05-31", status: "upcoming" },
            { name: "Launch", date: "2025-06-15", status: "upcoming" },
          ].map((milestone, i) => (
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
          ))}
        </div>
      </Card>
    </div>
  )
}
