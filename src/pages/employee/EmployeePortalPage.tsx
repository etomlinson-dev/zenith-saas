import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Users, 
  Target, 
  BookOpen, 
  Calendar, 
  Star, 
  TrendingUp, 
  Award,
  Briefcase,
  Clock,
  CheckCircle2,
  ArrowRight,
  Bell,
  MessageSquare
} from "lucide-react"

export default function EmployeePortalPage() {
  // Mock current user data
  const currentUser = {
    name: "Sarah Johnson",
    position: "Senior Software Engineer",
    department: "Engineering",
    photo: "/placeholder.svg?height=100&width=100",
    employeeId: "EMP-1234",
    manager: "Michael Chen",
    startDate: "2023-01-15",
    performanceScore: 4.5,
    goalsCompleted: 8,
    goalsTotal: 10,
    trainingInProgress: 3,
    ptoBalance: 15,
    nextReview: "2025-03-15",
  }

  const quickActions = [
    { label: "Company Directory", icon: Users, link: "/employee/directory", color: "bg-blue-500" },
    { label: "My Performance", icon: Star, link: "/employee/performance", color: "bg-purple-500" },
    { label: "My Goals", icon: Target, link: "/employee/goals", color: "bg-green-500" },
    { label: "Learning & Development", icon: BookOpen, link: "/employee/development", color: "bg-orange-500" },
    { label: "Internal Jobs", icon: Briefcase, link: "/employee/jobs", color: "bg-pink-500" },
    { label: "My Profile", icon: Users, link: "/employee/profile", color: "bg-indigo-500" },
  ]

  const upcomingEvents = [
    { type: "Review", title: "Performance Review with Manager", date: "Mar 15, 2025", icon: Star, color: "text-purple-500" },
    { type: "Training", title: "Advanced React Patterns", date: "Feb 20, 2025", icon: BookOpen, color: "text-blue-500" },
    { type: "Meeting", title: "Team Quarterly Planning", date: "Feb 18, 2025", icon: Calendar, color: "text-green-500" },
  ]

  const recentAchievements = [
    { title: "Goal Achiever", description: "Completed 8 goals this quarter", icon: Award, color: "text-yellow-500" },
    { title: "Team Player", description: "Received 5 peer recognitions", icon: Users, color: "text-blue-500" },
    { title: "Learning Champion", description: "Completed 3 training courses", icon: BookOpen, color: "text-green-500" },
  ]

  const notifications = [
    { message: "New training course available: Advanced TypeScript", time: "2 hours ago", unread: true },
    { message: "Your goal 'Complete Q1 Project' is due in 5 days", time: "1 day ago", unread: true },
    { message: "Michael Chen commented on your performance review", time: "3 days ago", unread: false },
  ]

  const tenure = Math.floor((new Date().getTime() - new Date(currentUser.startDate).getTime()) / (1000 * 60 * 60 * 24 * 365))
  const tenureMonths = Math.floor(((new Date().getTime() - new Date(currentUser.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30)) % 12)

  return (
    <div className="min-h-screen bg-background p-6 my-16">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex items-center gap-6 mb-4">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
            {currentUser.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">Welcome back, {currentUser.name.split(' ')[0]}! 👋</h1>
            <p className="text-muted-foreground">{currentUser.position} • {currentUser.department}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span>ID: {currentUser.employeeId}</span>
              <span>•</span>
              <span>Manager: {currentUser.manager}</span>
              <span>•</span>
              <span>Tenure: {tenure} {tenure === 1 ? 'year' : 'years'} {tenureMonths} months</span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            {notifications.filter(n => n.unread).length} Notifications
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUser.performanceScore}/5.0</div>
            <p className="text-xs text-muted-foreground">
              Next review: {currentUser.nextReview}
            </p>
            <Progress value={(currentUser.performanceScore / 5) * 100} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goals Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUser.goalsCompleted}/{currentUser.goalsTotal}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((currentUser.goalsCompleted / currentUser.goalsTotal) * 100)}% complete
            </p>
            <Progress value={(currentUser.goalsCompleted / currentUser.goalsTotal) * 100} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUser.trainingInProgress}</div>
            <p className="text-xs text-muted-foreground">
              In progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">PTO Balance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUser.ptoBalance}</div>
            <p className="text-xs text-muted-foreground">
              Days available
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Quick Actions & Events */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Access your most used features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {quickActions.map((action) => (
                  <Link key={action.label} to={action.link}>
                    <Button
                      variant="outline"
                      className="w-full h-24 flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-all"
                    >
                      <div className={`${action.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                        <action.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs font-medium text-center">{action.label}</span>
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Your schedule for the next few weeks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg border border-border/40 hover:border-primary/40 hover:bg-muted/20 transition-all">
                    <div className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center ${event.color}`}>
                      <event.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-foreground">{event.title}</p>
                        <Badge variant="outline" className="text-xs">{event.type}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{event.date}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>Stay updated with important information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification, index) => (
                  <div key={index} className={`flex items-start gap-3 p-3 rounded-lg border ${notification.unread ? 'border-primary/40 bg-primary/5' : 'border-border/40'}`}>
                    <div className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-primary' : 'bg-muted'}`} />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-4">
                View All Notifications
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Achievements & Stats */}
        <div className="space-y-6">
          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
              <CardDescription>Your accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <div className={`w-10 h-10 rounded-full bg-background flex items-center justify-center ${achievement.color}`}>
                      <achievement.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-foreground">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Trend</CardTitle>
              <CardDescription>Your progress over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">This Quarter</span>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-green-500">+0.3</span>
                  </div>
                </div>
                <Progress value={90} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  You're performing 10% above your department average
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
              <CardDescription>Helpful links</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Employee Handbook
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Company Calendar
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  HR Support
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Benefits Portal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

