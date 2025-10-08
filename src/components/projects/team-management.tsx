"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Project } from "@/lib/project-data"
import { Mail, MoreHorizontal, UserPlus, Search } from "lucide-react"

interface TeamManagementProps {
  project: Project
}

export function TeamManagement({ project }: TeamManagementProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showInviteForm, setShowInviteForm] = useState(false)

  const filteredTeam = project.team.filter((member) => member.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Calculate workload for each team member
  const getTeamMemberWorkload = (memberName: string) => {
    const tasks = project.tasks.filter((t) => t.assignee.name === memberName && t.status !== "done")
    return {
      activeTasks: tasks.length,
      highPriority: tasks.filter((t) => t.priority === "high").length,
      utilization: Math.min((tasks.length / 5) * 100, 100), // Assuming 5 tasks = 100% utilization
    }
  }

  return (
    <div className="space-y-4">
      {/* Team Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-card to-card/50 border-border/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Team Members</p>
              <p className="text-3xl font-bold text-foreground">{project.team.length}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-card to-card/50 border-border/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Capacity</p>
              <p className="text-3xl font-bold text-foreground">
                {project.team.reduce((sum, m) => sum + m.capacity, 0)}h
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <MoreHorizontal className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-card to-card/50 border-border/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg Utilization</p>
              <p className="text-3xl font-bold text-foreground">78%</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <MoreHorizontal className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Actions */}
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => setShowInviteForm(!showInviteForm)}>
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Member
          </Button>
        </div>

        {showInviteForm && (
          <div className="mt-4 p-4 rounded-lg bg-muted/20 border border-border/40">
            <h3 className="font-semibold mb-3 text-foreground">Invite Team Member</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Input placeholder="Email address" type="email" />
              <Input placeholder="Full name" />
              <Select defaultValue="developer">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="designer">Designer</SelectItem>
                  <SelectItem value="manager">Project Manager</SelectItem>
                  <SelectItem value="qa">QA Engineer</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Mail className="w-4 h-4 mr-2" />
                Send Invite
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTeam.map((member) => {
          const workload = getTeamMemberWorkload(member.name)

          return (
            <Card key={member.id} className="p-6 hover:border-primary/40 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-xl font-bold">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-3 mt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Capacity</span>
                      <span className="font-medium text-foreground">{member.capacity}h/week</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Utilization</span>
                        <span className="font-medium text-foreground">{workload.utilization.toFixed(0)}%</span>
                      </div>
                      <Progress value={workload.utilization} className="h-2" />
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Active Tasks: </span>
                        <span className="font-medium text-foreground">{workload.activeTasks}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">High Priority: </span>
                        <Badge variant="destructive" className="text-xs">
                          {workload.highPriority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Team Performance */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Team Performance</h3>
        <div className="space-y-4">
          {project.team.map((member) => {
            const completedTasks = project.tasks.filter(
              (t) => t.assignee.name === member.name && t.status === "done",
            ).length
            const totalTasks = project.tasks.filter((t) => t.assignee.name === member.name).length
            const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

            return (
              <div key={member.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{member.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {completedTasks} of {totalTasks} tasks completed
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{completionRate.toFixed(0)}%</span>
                </div>
                <Progress value={completionRate} className="h-2" />
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
