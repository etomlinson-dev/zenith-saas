"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/lib/project-data"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

interface CalendarViewProps {
  project: Project
}

export function CalendarView({ project }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 1, 1)) // February 2025

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
    return project.tasks.filter((task) => task.deadline === dateStr)
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
            <Button size="sm">
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
                      className={`
                        text-xs p-1.5 rounded truncate cursor-pointer transition-all hover:scale-105
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
          {project.tasks
            .filter((t) => t.status !== "done")
            .slice(0, 5)
            .map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-4 p-3 rounded-lg border border-border/40 hover:border-primary/40 hover:bg-muted/20 transition-all"
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
    </div>
  )
}
