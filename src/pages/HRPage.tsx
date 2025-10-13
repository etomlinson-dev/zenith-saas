import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { calculateZenithMatchScore, defaultJobRequirements } from "@/lib/zenith-matching"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Users,
  Star,
  Briefcase,
  Search,
  Plus,
  BarChart3,
  Calendar,
  FileText,
  Target,
  Download,
  X,
  ArrowRight,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle2,
  AlertCircle,
  Brain,
  Award,
  UserPlus,
  MessageSquare,
  Sparkles,
  Shield,
  Heart,
  BookOpen,
  Filter,
  FileCheck,
  AlertTriangle,
  ThumbsUp,
  Lightbulb,
  Rocket,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  UserCog,
} from "lucide-react"
import { AddEmployeeDialog } from "@/components/hr/add-employee-dialog"
import { AddReviewDialog } from "@/components/hr/add-review-dialog"
import { AddGoalDialog } from "@/components/hr/add-goal-dialog"
import { AddCandidateDialog } from "@/components/hr/add-candidate-dialog"

// Mock data for employees
const mockEmployees = [
  {
    id: 1,
    name: "Diane Young",
    position: "Software Engineer",
    department: "Engineering",
    status: "Active",
    nextReview: "2025-02-15",
    lastReview: "2024-12-15",
    performanceScore: 4.5,
  },
  {
    id: 2,
    name: "Kathryn Washington",
    position: "Project Manager",
    department: "Marketing",
    status: "Active",
    nextReview: "2025-01-20",
    lastReview: "2024-11-20",
    performanceScore: 4.2,
  },
  {
    id: 3,
    name: "Guy Hawkins",
    position: "Sales Representative",
    department: "Sales",
    status: "Active",
    nextReview: "2025-03-10",
    lastReview: "2024-12-10",
    performanceScore: 4.8,
  },
  {
    id: 4,
    name: "Annette Black",
    position: "Marketing Coordinator",
    department: "Marketing",
    status: "Onboarding",
    nextReview: "2025-06-01",
    lastReview: null,
    performanceScore: null,
  },
  {
    id: 5,
    name: "Michael Chen",
    position: "Senior Developer",
    department: "Engineering",
    status: "Active",
    nextReview: "2025-02-28",
    lastReview: "2024-12-28",
    performanceScore: 4.6,
  },
  {
    id: 6,
    name: "Sarah Johnson",
    position: "HR Manager",
    department: "Human Resources",
    status: "Active",
    nextReview: "2025-03-15",
    lastReview: "2024-12-15",
    performanceScore: 4.4,
  },
]

// Mock activity data
const recentActivity = [
  { id: 1, text: "Performance review completed for Michael Chen", time: "2 hours ago" },
  { id: 2, text: "New goal added for Sarah Johnson", time: "5 hours ago" },
  { id: 3, text: "Resume submitted by John Doe", time: "1 day ago" },
  { id: 4, text: "Employee onboarding started for Annette Black", time: "2 days ago" },
]

// Mock data for recruitment candidates - FULLY ANONYMOUS
const mockCandidates = [
  {
    id: 1,
    candidateId: "CAND-M2K8L-4A7C",
    position: "Senior Developer",
    stage: "Applied",
    daysInStage: 2,
    assignedTo: "Recruiter A",
    appliedDate: "2025-01-08",
    skills: "React, Node.js, TypeScript, JavaScript",
    experience: "5-10 years",
    education: "Bachelor's Degree",
    certifications: "AWS Certified Developer",
  },
  {
    id: 2,
    candidateId: "CAND-N3J9M-5B8D",
    position: "Product Manager",
    stage: "Reviewed",
    daysInStage: 5,
    assignedTo: "Recruiter B",
    appliedDate: "2025-01-03",
    skills: "Agile, Product Strategy, Roadmapping, Stakeholder Management",
    experience: "5-10 years",
    education: "Master's Degree",
    certifications: "CSPO, Product Management",
  },
  {
    id: 3,
    candidateId: "CAND-P4K1N-6C9E",
    position: "UX Designer",
    stage: "Interviewed",
    daysInStage: 3,
    assignedTo: "Recruiter A",
    appliedDate: "2024-12-28",
    skills: "Figma, User Research, Prototyping, Wireframing",
    experience: "2-5 years",
    education: "Bachelor's Degree",
    certifications: "UX Certification",
  },
  {
    id: 4,
    candidateId: "CAND-Q5L2O-7D1F",
    position: "Senior Developer",
    stage: "Offered",
    daysInStage: 1,
    assignedTo: "Recruiter B",
    appliedDate: "2024-12-20",
    skills: "Python, AWS, Kubernetes, Docker, CI/CD",
    experience: "10+ years",
    education: "Master's Degree",
    certifications: "AWS Certified Solutions Architect, Kubernetes Certified",
  },
  {
    id: 5,
    candidateId: "CAND-R6M3P-8E2G",
    position: "Marketing Manager",
    stage: "Applied",
    daysInStage: 1,
    assignedTo: "Recruiter A",
    appliedDate: "2025-01-09",
    skills: "SEO, Content Strategy, Analytics, Google Analytics",
    experience: "5-10 years",
    education: "Bachelor's Degree",
    certifications: "Google Analytics, HubSpot",
  },
  {
    id: 6,
    candidateId: "CAND-S7N4Q-9F3H",
    position: "Sales Representative",
    stage: "Reviewed",
    daysInStage: 4,
    assignedTo: "Recruiter B",
    appliedDate: "2025-01-04",
    skills: "B2B Sales, CRM, Negotiation, Salesforce",
    experience: "2-5 years",
    education: "Bachelor's Degree",
    certifications: "Salesforce Certified",
  },
]

// Mock data for performance reviews
const mockPerformanceReviews = [
  {
    id: 1,
    employeeId: 1,
    employeeName: "Diane Young",
    department: "Engineering",
    latestReview: "2024-12-15",
    nextReview: "2025-02-15",
    collaboration: 5,
    accountability: 4,
    trustworthy: 5,
    leadership: 4,
    trend: "up",
    status: "on-time",
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: "Kathryn Washington",
    department: "Marketing",
    latestReview: "2024-11-20",
    nextReview: "2025-01-20",
    collaboration: 4,
    accountability: 4,
    trustworthy: 4,
    leadership: 5,
    trend: "stable",
    status: "upcoming",
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: "Guy Hawkins",
    department: "Sales",
    latestReview: "2024-12-10",
    nextReview: "2025-03-10",
    collaboration: 5,
    accountability: 5,
    trustworthy: 5,
    leadership: 4,
    trend: "up",
    status: "on-time",
  },
  {
    id: 4,
    employeeId: 5,
    employeeName: "Michael Chen",
    department: "Engineering",
    latestReview: "2024-12-28",
    nextReview: "2025-02-28",
    collaboration: 4,
    accountability: 5,
    trustworthy: 5,
    leadership: 5,
    trend: "up",
    status: "on-time",
  },
  {
    id: 5,
    employeeId: 6,
    employeeName: "Sarah Johnson",
    department: "Human Resources",
    latestReview: "2024-12-15",
    nextReview: "2025-03-15",
    collaboration: 5,
    accountability: 4,
    trustworthy: 4,
    leadership: 4,
    trend: "stable",
    status: "on-time",
  },
]

// Mock data for goals
const mockGoals = [
  {
    id: 1,
    employeeId: 1,
    employeeName: "Diane Young",
    department: "Engineering",
    goal: "Complete React certification",
    category: "Professional Development",
    progress: 75,
    status: "On Track",
    dueDate: "2025-03-31",
    createdDate: "2025-01-01",
  },
  {
    id: 2,
    employeeId: 1,
    employeeName: "Diane Young",
    department: "Engineering",
    goal: "Lead 2 major projects",
    category: "Leadership",
    progress: 50,
    status: "On Track",
    dueDate: "2025-06-30",
    createdDate: "2025-01-01",
  },
  {
    id: 3,
    employeeId: 2,
    employeeName: "Kathryn Washington",
    department: "Marketing",
    goal: "Increase campaign ROI by 20%",
    category: "Performance",
    progress: 30,
    status: "Behind",
    dueDate: "2025-04-30",
    createdDate: "2025-01-01",
  },
  {
    id: 4,
    employeeId: 3,
    employeeName: "Guy Hawkins",
    department: "Sales",
    goal: "Close 50 deals this quarter",
    category: "Sales Target",
    progress: 90,
    status: "On Track",
    dueDate: "2025-03-31",
    createdDate: "2025-01-01",
  },
  {
    id: 5,
    employeeId: 5,
    employeeName: "Michael Chen",
    department: "Engineering",
    goal: "Mentor 3 junior developers",
    category: "Mentorship",
    progress: 100,
    status: "Complete",
    dueDate: "2025-02-28",
    createdDate: "2024-11-01",
  },
  {
    id: 6,
    employeeId: 6,
    employeeName: "Sarah Johnson",
    department: "Human Resources",
    goal: "Implement new onboarding process",
    category: "Process Improvement",
    progress: 60,
    status: "On Track",
    dueDate: "2025-05-31",
    createdDate: "2025-01-01",
  },
]

const mockAIInsights = [
  {
    id: 1,
    type: "retention-risk",
    employee: "Diane Young",
    risk: "medium",
    factors: ["Low engagement score", "No promotion in 2 years"],
    recommendation: "Schedule 1-on-1 to discuss career growth",
  },
  {
    id: 2,
    type: "high-performer",
    employee: "Guy Hawkins",
    score: 4.8,
    recommendation: "Consider for leadership development program",
  },
  {
    id: 3,
    type: "skill-gap",
    department: "Engineering",
    gap: "Cloud Architecture",
    recommendation: "Recommend AWS certification training",
  },
]

const mock360Feedback = [
  {
    id: 1,
    employeeId: 1,
    employeeName: "Diane Young",
    selfRating: 4.2,
    managerRating: 4.5,
    peerRating: 4.3,
    directReportRating: 4.4,
    overallScore: 4.35,
    feedbackCount: 8,
    status: "complete",
  },
  {
    id: 2,
    employeeId: 3,
    employeeName: "Guy Hawkins",
    selfRating: 4.5,
    managerRating: 4.8,
    peerRating: 4.7,
    directReportRating: null,
    overallScore: 4.67,
    feedbackCount: 6,
    status: "complete",
  },
]

const mockMentorships = [
  {
    id: 1,
    mentor: "Michael Chen",
    mentee: "Annette Black",
    focus: "Technical Leadership",
    matchScore: 92,
    startDate: "2025-01-01",
    status: "active",
  },
  {
    id: 2,
    mentor: "Sarah Johnson",
    mentee: "Diane Young",
    focus: "Career Development",
    matchScore: 88,
    startDate: "2024-12-15",
    status: "active",
  },
]

const mockCareerPaths = [
  {
    id: 1,
    employee: "Diane Young",
    currentRole: "Software Engineer",
    nextRole: "Senior Software Engineer",
    timeToPromotion: "6-12 months",
    readiness: 75,
    requiredSkills: ["System Design", "Mentoring", "Project Leadership"],
  },
  {
    id: 2,
    employee: "Annette Black",
    currentRole: "Marketing Coordinator",
    nextRole: "Marketing Manager",
    timeToPromotion: "12-18 months",
    readiness: 45,
    requiredSkills: ["Team Management", "Budget Planning", "Strategy"],
  },
]

const mockDiversityMetrics = {
  gender: { male: 55, female: 42, nonBinary: 3 },
  ethnicity: { asian: 25, black: 15, hispanic: 20, white: 35, other: 5 },
  ageGroups: { "18-25": 15, "26-35": 45, "36-45": 25, "46-55": 10, "55+": 5 },
  hiringDiversity: 68, // percentage
  leadershipDiversity: 42, // percentage
}

const mockRecognitions = [
  {
    id: 1,
    from: "Michael Chen",
    to: "Diane Young",
    type: "Peer Recognition",
    category: "Innovation",
    message: "Outstanding work on the new architecture design!",
    date: "2025-01-08",
  },
  {
    id: 2,
    from: "Sarah Johnson",
    to: "Guy Hawkins",
    type: "Manager Recognition",
    category: "Excellence",
    message: "Exceeded sales targets for Q4 2024",
    date: "2025-01-05",
  },
]

const mockLearningPaths = [
  {
    id: 1,
    employee: "Diane Young",
    course: "AWS Solutions Architect",
    progress: 65,
    dueDate: "2025-03-31",
    status: "in-progress",
  },
  {
    id: 2,
    employee: "Michael Chen",
    course: "Leadership Essentials",
    progress: 100,
    dueDate: "2025-01-15",
    status: "completed",
  },
]

export default function HRPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("dashboard")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [riskFilter, setRiskFilter] = useState("all")
  const [showTopCandidates, setShowTopCandidates] = useState(true)
  const [candidateStageFilter, setCandidateStageFilter] = useState("All")
  const [editingGoal, setEditingGoal] = useState<number | null>(null)
  const [goalProgress, setGoalProgress] = useState<number>(0)

  // Calculate days until/since review
  const getDaysUntilReview = (reviewDate: string) => {
    const today = new Date()
    const review = new Date(reviewDate)
    const diffTime = review.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays > 0) {
      return `In ${diffDays} days`
    } else if (diffDays === 0) {
      return "Today"
    } else {
      return `${Math.abs(diffDays)} days overdue`
    }
  }

  // Get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default"
      case "Onboarding":
        return "secondary"
      case "Inactive":
        return "outline"
      default:
        return "default"
    }
  }

  // Get stage badge variant
  const getStageVariant = (stage: string) => {
    switch (stage) {
      case "Applied":
        return "secondary"
      case "Reviewed":
        return "default"
      case "Interviewed":
        return "outline"
      case "Offered":
        return "default"
      default:
        return "secondary"
    }
  }

  // Get stage color
  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Applied":
        return "text-blue-500"
      case "Reviewed":
        return "text-yellow-500"
      case "Interviewed":
        return "text-orange-500"
      case "Offered":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  // Filter employees based on search
  const filteredEmployees = mockEmployees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Helper function to calculate overall rating
  const calculateOverallRating = (review: (typeof mockPerformanceReviews)[0]) => {
    return ((review.collaboration + review.accountability + review.trustworthy + review.leadership) / 4).toFixed(1)
  }

  // Helper function to get rating color
  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-500"
    if (rating >= 3) return "text-yellow-500"
    return "text-red-500"
  }

  // Helper function to get trend icon
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  // Helper function to get review status badge
  const getReviewStatusBadge = (status: string) => {
    switch (status) {
      case "on-time":
        return <Badge variant="default">On Time</Badge>
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>
      case "upcoming":
        return <Badge variant="secondary">Upcoming</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Helper function to get goal status color
  const getGoalStatusColor = (status: string) => {
    switch (status) {
      case "On Track":
        return "bg-green-500/10 text-green-600 border-green-500/20"
      case "Behind":
        return "bg-red-500/10 text-red-600 border-red-500/20"
      case "Complete":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  // Helper function to get goal status icon
  const getGoalStatusIcon = (status: string) => {
    switch (status) {
      case "On Track":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "Behind":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "Complete":
        return <CheckCircle2 className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  // Helper function to calculate days until due date
  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays > 0) {
      return `${diffDays} days left`
    } else if (diffDays === 0) {
      return "Due today"
    } else {
      return `${Math.abs(diffDays)} days overdue`
    }
  }

  // Goal statistics calculations
  const totalGoals = mockGoals.length
  const onTrackGoals = mockGoals.filter((g) => g.status === "On Track").length
  const behindGoals = mockGoals.filter((g) => g.status === "Behind").length
  const completeGoals = mockGoals.filter((g) => g.status === "Complete").length

  return (
    <div className="min-h-screen bg-background my-28">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <span className="hover:text-foreground cursor-pointer transition-colors">Home</span>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground">Human Resources</span>
              </div>
              
              {/* Title with Icon */}
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2.5 rounded-lg">
                  <UserCog className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-3xl font-bold">Human Resources</h1>
              </div>
              
              <p className="text-muted-foreground mt-2">ZHire - Zenith-Powered Human Capital Management</p>
            </div>
            <div className="flex gap-2">
              <AddEmployeeDialog />
              <AddReviewDialog />
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 border-none py-8 border-0">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="development">Development</TabsTrigger>
            <TabsTrigger value="insights">Zenith Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="inline h-3 w-3 mr-1 text-green-500" />
                    +5% from last quarter
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Retention Risk</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-500">3</div>
                  <p className="text-xs text-muted-foreground">Employees need attention</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.35/5</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="inline h-3 w-3 mr-1 text-green-500" />
                    +0.2 from last period
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">Across 5 departments</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <CardTitle>Zenith-Powered Insights</CardTitle>
                    </div>
                    <Badge variant="secondary" className="gap-1">
                      <Sparkles className="h-3 w-3" />
                      Smart Recommendations
                    </Badge>
                  </div>
                  <CardDescription>Predictive analytics and actionable recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAIInsights.map((insight) => (
                      <div key={insight.id} className="p-4 border rounded-lg bg-accent/30">
                        {insight.type === "retention-risk" && (
                          <>
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                <h4 className="font-semibold">Retention Risk Alert</h4>
                              </div>
                              <Badge variant="outline" className="text-yellow-500 border-yellow-500">
                                {insight.risk} risk
                              </Badge>
                            </div>
                            <p className="text-sm mb-2">
                              <strong>{insight.employee}</strong> shows signs of disengagement
                            </p>
                            <div className="text-xs text-muted-foreground mb-2">
                              <strong>Risk Factors:</strong> {insight.factors?.join(", ") || "N/A"}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Lightbulb className="h-4 w-4 text-primary" />
                              <span className="text-primary font-medium">{insight.recommendation}</span>
                            </div>
                          </>
                        )}
                        {insight.type === "high-performer" && (
                          <>
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Rocket className="h-4 w-4 text-green-500" />
                                <h4 className="font-semibold">High Performer Identified</h4>
                              </div>
                              <Badge variant="outline" className="text-green-500 border-green-500">
                                {insight.score}/5.0
                              </Badge>
                            </div>
                            <p className="text-sm mb-2">
                              <strong>{insight.employee}</strong> consistently exceeds expectations
                            </p>
                            <div className="flex items-center gap-2 text-sm">
                              <Lightbulb className="h-4 w-4 text-primary" />
                              <span className="text-primary font-medium">{insight.recommendation}</span>
                            </div>
                          </>
                        )}
                        {insight.type === "skill-gap" && (
                          <>
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <GraduationCap className="h-4 w-4 text-blue-500" />
                                <h4 className="font-semibold">Skill Gap Detected</h4>
                              </div>
                              <Badge variant="outline" className="text-blue-500 border-blue-500">
                                {insight.department}
                              </Badge>
                            </div>
                            <p className="text-sm mb-2">
                              Team needs development in <strong>{insight.gap}</strong>
                            </p>
                            <div className="flex items-center gap-2 text-sm">
                              <Lightbulb className="h-4 w-4 text-primary" />
                              <span className="text-primary font-medium">{insight.recommendation}</span>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common HR tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Schedule Interview
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send 360° Feedback
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Award className="mr-2 h-4 w-4" />
                    Give Recognition
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <FileCheck className="mr-2 h-4 w-4" />
                    Approve Time Off
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Assign Training
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Employee Directory */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Employee Directory</CardTitle>
                      <div className="relative w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search employees..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredEmployees.map((employee) => (
                        <div
                          key={employee.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold">{employee.name}</h3>
                              <Badge variant={getStatusVariant(employee.status)}>{employee.status}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {employee.position} • {employee.department}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              <Calendar className="inline h-3 w-3 mr-1" />
                              Next Review: {getDaysUntilReview(employee.nextReview)}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Reviews
                            </Button>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex gap-3">
                          <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                          <div className="flex-1">
                            <p className="text-sm">{activity.text}</p>
                            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="recruitment">
            {/* Quick Action Bar */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">Recruitment Pipeline</h2>
                <p className="text-sm text-muted-foreground">
                  Anonymous, bias-free hiring with Zenith-powered matching
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <AddCandidateDialog />
              </div>
            </div>

            {/* Anonymous Info Badge - Compact */}
            <div className="mb-6 flex items-center gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
              <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Anonymous Mode:</strong> All candidates identified by ID only. No personal information displayed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">142</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="inline h-3 w-3 mr-1 text-green-500" />
                    +18% this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Zenith-Matched</CardTitle>
                  <Sparkles className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">38</div>
                  <p className="text-xs text-muted-foreground">High-fit candidates</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Time to Fill</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">22</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingDown className="inline h-3 w-3 mr-1 text-green-500" />
                    -6 days improvement
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Interviews Scheduled</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">This week</p>
                </CardContent>
              </Card>
            </div>

            {/* Top Candidates Section - Collapsible */}
            <Card className="mb-6">
              <CardHeader 
                className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => setShowTopCandidates(!showTopCandidates)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        Top Matching Candidates
                        <Badge variant="secondary" className="ml-2">3 candidates</Badge>
                      </CardTitle>
                      <CardDescription>Best fits based on skills, experience, and qualifications</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    {showTopCandidates ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              {showTopCandidates && (
                <CardContent>
                  <div className="space-y-3">
                    {mockCandidates.slice(0, 3).map((candidate) => {
                    // Get job requirements for this position
                    const jobReqs = defaultJobRequirements[candidate.position] || defaultJobRequirements["Senior Developer"]
                    // Calculate real Zenith match score
                    const zenithScore = calculateZenithMatchScore(candidate, jobReqs)
                    const scoreColor = zenithScore >= 90 ? "text-green-600" : zenithScore >= 75 ? "text-blue-600" : zenithScore >= 60 ? "text-yellow-600" : "text-gray-600"
                    const scoreBg = zenithScore >= 90 ? "bg-green-50 dark:bg-green-950" : zenithScore >= 75 ? "bg-blue-50 dark:bg-blue-950" : zenithScore >= 60 ? "bg-yellow-50 dark:bg-yellow-950" : "bg-gray-50 dark:bg-gray-950"
                    
                    return (
                      <div
                        key={candidate.id}
                        className="group flex items-start gap-4 p-4 border-2 rounded-lg transition-all duration-200 cursor-pointer bg-background hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-500 hover:shadow-2xl hover:scale-[1.02]"
                      >
                        {/* Match Score - Visual Indicator */}
                        <div className={`flex flex-col items-center justify-center p-3 rounded-lg ${scoreBg} min-w-[80px]`}>
                          <div className={`text-3xl font-bold ${scoreColor}`}>{zenithScore}</div>
                          <div className="text-xs text-muted-foreground mt-1">Match</div>
                          <div className="flex items-center gap-1 mt-1">
                            <Sparkles className={`h-3 w-3 ${scoreColor}`} />
                          </div>
                        </div>

                        {/* Candidate Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{candidate.candidateId}</h3>
                            <Badge variant={getStageVariant(candidate.stage)} className={`${getStageColor(candidate.stage)} font-medium`}>
                              {candidate.stage}
                            </Badge>
                          </div>
                          
                          <p className="text-sm font-medium text-foreground mb-3">{candidate.position}</p>
                          
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            <div className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 rounded-full bg-primary" />
                              <span className="text-muted-foreground">Experience:</span>
                              <span className="font-medium">{candidate.experience}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 rounded-full bg-primary" />
                              <span className="text-muted-foreground">Education:</span>
                              <span className="font-medium">{candidate.education}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {candidate.skills.split(',').slice(0, 4).map((skill, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {skill.trim()}
                              </Badge>
                            ))}
                            {candidate.skills.split(',').length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{candidate.skills.split(',').length - 4} more
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Applied {new Date(candidate.appliedDate).toLocaleDateString()}
                            </span>
                            <span>•</span>
                            <span>{candidate.assignedTo}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2">
                          <Button size="sm" className="w-full">
                            <Calendar className="mr-2 h-4 w-4" />
                            Interview
                          </Button>
                          <Button variant="outline" size="sm" className="w-full">
                            <FileText className="mr-2 h-4 w-4" />
                            View Resume
                          </Button>
                          <Button variant="outline" size="sm" className="w-full">
                            <ArrowRight className="mr-2 h-4 w-4" />
                            Next Stage
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
                </CardContent>
              )}
            </Card>

            {/* All Candidates - Organized by Stage */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>All Candidates by Stage</CardTitle>
                    <CardDescription>View and manage candidates at each hiring stage</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Stage Tabs/Filters */}
                <div className="flex gap-2 mb-6 flex-wrap">
                  <Button 
                    variant={candidateStageFilter === "All" ? "default" : "outline"} 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={() => setCandidateStageFilter("All")}
                  >
                    All Candidates
                    <Badge variant="secondary" className="ml-1">{mockCandidates.length}</Badge>
                  </Button>
                  <Button 
                    variant={candidateStageFilter === "Applied" ? "default" : "outline"} 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={() => setCandidateStageFilter("Applied")}
                  >
                    Applied
                    <Badge variant="secondary" className="ml-1">{mockCandidates.filter(c => c.stage === "Applied").length}</Badge>
                  </Button>
                  <Button 
                    variant={candidateStageFilter === "Reviewed" ? "default" : "outline"} 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={() => setCandidateStageFilter("Reviewed")}
                  >
                    Reviewed
                    <Badge variant="secondary" className="ml-1">{mockCandidates.filter(c => c.stage === "Reviewed").length}</Badge>
                  </Button>
                  <Button 
                    variant={candidateStageFilter === "Interviewed" ? "default" : "outline"} 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={() => setCandidateStageFilter("Interviewed")}
                  >
                    Interviewed
                    <Badge variant="secondary" className="ml-1">{mockCandidates.filter(c => c.stage === "Interviewed").length}</Badge>
                  </Button>
                  <Button 
                    variant={candidateStageFilter === "Offered" ? "default" : "outline"} 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={() => setCandidateStageFilter("Offered")}
                  >
                    Offered
                    <Badge variant="secondary" className="ml-1">{mockCandidates.filter(c => c.stage === "Offered").length}</Badge>
                  </Button>
                </div>

                {/* Candidate List */}
                <div className="space-y-3">
                  {mockCandidates.filter(candidate => candidateStageFilter === "All" || candidate.stage === candidateStageFilter).length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p className="text-lg font-medium mb-1">No candidates in this stage</p>
                      <p className="text-sm">Try selecting a different stage filter</p>
                    </div>
                  ) : (
                    mockCandidates
                      .filter(candidate => candidateStageFilter === "All" || candidate.stage === candidateStageFilter)
                      .map((candidate) => {
                    const jobReqs = defaultJobRequirements[candidate.position] || defaultJobRequirements["Senior Developer"]
                    const zenithScore = calculateZenithMatchScore(candidate, jobReqs)
                    
                    return (
                      <div
                        key={candidate.id}
                        className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        {/* Compact Score */}
                        <div className="flex flex-col items-center min-w-[60px]">
                          <div className={`text-2xl font-bold ${zenithScore >= 90 ? 'text-green-600' : zenithScore >= 75 ? 'text-blue-600' : 'text-gray-600'}`}>
                            {zenithScore}
                          </div>
                          <div className="text-xs text-muted-foreground">match</div>
                        </div>

                        {/* Candidate Info - Compact */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{candidate.candidateId}</h3>
                            <Badge variant={getStageVariant(candidate.stage)} className={getStageColor(candidate.stage)}>
                              {candidate.stage}
                            </Badge>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm font-medium">{candidate.position}</span>
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{candidate.experience}</span>
                            <span>•</span>
                            <span>{candidate.education}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {candidate.daysInStage}d in stage
                            </span>
                            <span>•</span>
                            <span>{candidate.assignedTo}</span>
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Calendar className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employees">
            <div className="mb-6 flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <AddEmployeeDialog />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45</div>
                  <p className="text-xs text-muted-foreground">Across 8 departments</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Onboarding</CardTitle>
                  <UserPlus className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">New hires this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Tenure</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.2 yrs</div>
                  <p className="text-xs text-muted-foreground">Company average</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Engagement</CardTitle>
                  <Heart className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8.5/10</div>
                  <p className="text-xs text-muted-foreground">Latest pulse survey</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Employee Directory</CardTitle>
                <CardDescription>Comprehensive employee information and management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredEmployees.map((employee) => (
                    <div
                      key={employee.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{employee.name}</h3>
                          <Badge variant={getStatusVariant(employee.status)}>{employee.status}</Badge>
                          {employee.performanceScore && employee.performanceScore >= 4.5 && (
                            <Badge variant="outline" className="gap-1 text-yellow-500 border-yellow-500">
                              <Star className="h-3 w-3 fill-yellow-500" />
                              Top Performer
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {employee.position} • {employee.department}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>
                            <Calendar className="inline h-3 w-3 mr-1" />
                            Next Review: {getDaysUntilReview(employee.nextReview)}
                          </span>
                          {employee.performanceScore && (
                            <span>
                              <Star className="inline h-3 w-3 mr-1" />
                              Score: {employee.performanceScore}/5.0
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Feedback
                        </Button>
                        <Button variant="outline" size="sm">
                          <Target className="mr-2 h-4 w-4" />
                          Goals
                        </Button>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            {/* Performance KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Review Score</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.2/5</div>
                  <p className="text-xs text-muted-foreground">Across all employees</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Reviews</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">This period</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Reviews Overdue</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12%</div>
                  <p className="text-xs text-muted-foreground">Need attention</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Reviews</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">Next 30 days</p>
                </CardContent>
              </Card>
            </div>

            {/* Performance Reviews Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Employee Performance Reviews</CardTitle>
                    <CardDescription>Track and manage employee performance ratings</CardDescription>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Review
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPerformanceReviews.map((review) => {
                    const overallRating = calculateOverallRating(review)
                    return (
                      <div key={review.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold">{review.employeeName}</h3>
                              {getReviewStatusBadge(review.status)}
                              {getTrendIcon(review.trend)}
                            </div>
                            <p className="text-sm text-muted-foreground">{review.department}</p>
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${getRatingColor(Number(overallRating))}`}>
                              {overallRating}
                            </div>
                            <p className="text-xs text-muted-foreground">Overall Rating</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Collaboration</p>
                            <div className="flex items-center gap-2">
                              <div className={`text-lg font-semibold ${getRatingColor(review.collaboration)}`}>
                                {review.collaboration}
                              </div>
                              <div className="text-xs text-muted-foreground">/5</div>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Accountability</p>
                            <div className="flex items-center gap-2">
                              <div className={`text-lg font-semibold ${getRatingColor(review.accountability)}`}>
                                {review.accountability}
                              </div>
                              <div className="text-xs text-muted-foreground">/5</div>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Trustworthy</p>
                            <div className="flex items-center gap-2">
                              <div className={`text-lg font-semibold ${getRatingColor(review.trustworthy)}`}>
                                {review.trustworthy}
                              </div>
                              <div className="text-xs text-muted-foreground">/5</div>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Leadership</p>
                            <div className="flex items-center gap-2">
                              <div className={`text-lg font-semibold ${getRatingColor(review.leadership)}`}>
                                {review.leadership}
                              </div>
                              <div className="text-xs text-muted-foreground">/5</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                          <span>Latest Review: {new Date(review.latestReview).toLocaleDateString()}</span>
                          <span>Next Review: {new Date(review.nextReview).toLocaleDateString()}</span>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            Add Review
                          </Button>
                          <Button variant="outline" size="sm">
                            View History
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals">
            {/* Goal Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Goals</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalGoals}</div>
                  <p className="text-xs text-muted-foreground">Active employee goals</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">On Track</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">
                    {onTrackGoals} ({Math.round((onTrackGoals / totalGoals) * 100)}%)
                  </div>
                  <p className="text-xs text-muted-foreground">Progressing well</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Behind</CardTitle>
                  <AlertCircle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-500">
                    {behindGoals} ({Math.round((behindGoals / totalGoals) * 100)}%)
                  </div>
                  <p className="text-xs text-muted-foreground">Need attention</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Complete</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-500">
                    {completeGoals} ({Math.round((completeGoals / totalGoals) * 100)}%)
                  </div>
                  <p className="text-xs text-muted-foreground">Achieved goals</p>
                </CardContent>
              </Card>
            </div>

            {/* Goals List */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Employee Goals</CardTitle>
                    <CardDescription>Track and manage employee goals and progress</CardDescription>
                  </div>
                  <AddGoalDialog />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockGoals.map((goal) => (
                    <div key={goal.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{goal.goal}</h3>
                            <Badge className={getGoalStatusColor(goal.status)}>
                              {getGoalStatusIcon(goal.status)}
                              <span className="ml-1">{goal.status}</span>
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <span className="font-medium">{goal.employeeName}</span>
                            <span>•</span>
                            <span>{goal.department}</span>
                            <span>•</span>
                            <span className="text-xs bg-accent px-2 py-1 rounded">{goal.category}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{goal.progress}%</div>
                          <p className="text-xs text-muted-foreground">Progress</p>
                        </div>
                      </div>

                      <div className="mb-3">
                        <Progress value={goal.progress} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span>
                          <Calendar className="inline h-3 w-3 mr-1" />
                          Due: {new Date(goal.dueDate).toLocaleDateString()} ({getDaysUntilDue(goal.dueDate)})
                        </span>
                        <span>Created: {new Date(goal.createdDate).toLocaleDateString()}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setEditingGoal(goal.id)
                            setGoalProgress(goal.progress)
                          }}
                        >
                          Update Progress
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Add Comment
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Update Progress Dialog */}
            <Dialog open={editingGoal !== null} onOpenChange={(open) => !open && setEditingGoal(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Goal Progress</DialogTitle>
                  <DialogDescription>
                    {editingGoal && mockGoals.find(g => g.id === editingGoal)?.goal}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="progress">Progress</Label>
                      <span className="text-2xl font-bold text-primary">{goalProgress}%</span>
                    </div>
                    <Slider
                      id="progress"
                      value={[goalProgress]}
                      onValueChange={(value) => setGoalProgress(value[0])}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* Progress Bar Preview */}
                  <div className="space-y-2">
                    <Label>Progress Preview</Label>
                    <Progress value={goalProgress} className="h-3" />
                  </div>

                  {/* Status Based on Progress */}
                  <div className="p-3 bg-accent rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">New Status:</span>
                      {goalProgress === 100 ? (
                        <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Complete
                        </Badge>
                      ) : goalProgress >= 70 ? (
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          On Track
                        </Badge>
                      ) : (
                        <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Needs Attention
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setEditingGoal(null)}>
                    Cancel
                  </Button>
                  <Button onClick={() => {
                    console.log(`[v0] Updated goal ${editingGoal} progress to ${goalProgress}%`)
                    // In a real app, this would update the backend
                    // For now, just close the dialog
                    setEditingGoal(null)
                  }}>
                    Save Progress
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="space-y-6">
              {/* Analytics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Headcount</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45</div>
                    <p className="text-xs text-muted-foreground">
                      <TrendingUp className="inline h-3 w-3 mr-1 text-green-500" />
                      +5% from last quarter
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Turnover Rate</CardTitle>
                    <TrendingDown className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8.5%</div>
                    <p className="text-xs text-muted-foreground">
                      <TrendingDown className="inline h-3 w-3 mr-1 text-green-500" />
                      -2% from last quarter
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Tenure</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3.2 yrs</div>
                    <p className="text-xs text-muted-foreground">Average employee tenure</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Goal Completion</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">82%</div>
                    <p className="text-xs text-muted-foreground">
                      <TrendingUp className="inline h-3 w-3 mr-1 text-green-500" />
                      +7% from last quarter
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <CardTitle>Diversity & Inclusion Metrics</CardTitle>
                  </div>
                  <CardDescription>Workforce diversity and representation tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-semibold mb-3">Gender Distribution</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">Male</span>
                            <span className="text-sm font-medium">{mockDiversityMetrics.gender.male}%</span>
                          </div>
                          <Progress value={mockDiversityMetrics.gender.male} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">Female</span>
                            <span className="text-sm font-medium">{mockDiversityMetrics.gender.female}%</span>
                          </div>
                          <Progress value={mockDiversityMetrics.gender.female} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">Non-Binary</span>
                            <span className="text-sm font-medium">{mockDiversityMetrics.gender.nonBinary}%</span>
                          </div>
                          <Progress value={mockDiversityMetrics.gender.nonBinary} className="h-2" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold mb-3">Diversity Scores</h3>
                      <div className="space-y-4">
                        <div className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm">Hiring Diversity</span>
                            <span className="text-lg font-bold text-green-500">
                              {mockDiversityMetrics.hiringDiversity}%
                            </span>
                          </div>
                          <Progress value={mockDiversityMetrics.hiringDiversity} className="h-2" />
                        </div>
                        <div className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm">Leadership Diversity</span>
                            <span className="text-lg font-bold text-yellow-500">
                              {mockDiversityMetrics.leadershipDiversity}%
                            </span>
                          </div>
                          <Progress value={mockDiversityMetrics.leadershipDiversity} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recruitment Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle>Recruitment Analytics</CardTitle>
                  <CardDescription>Hiring trends and source effectiveness</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Application Sources */}
                    <div>
                      <h3 className="text-sm font-semibold mb-3">Application Sources</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">LinkedIn</span>
                            <span className="text-sm font-medium">45%</span>
                          </div>
                          <Progress value={45} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">Indeed</span>
                            <span className="text-sm font-medium">30%</span>
                          </div>
                          <Progress value={30} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">Company Website</span>
                            <span className="text-sm font-medium">15%</span>
                          </div>
                          <Progress value={15} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">Referrals</span>
                            <span className="text-sm font-medium">10%</span>
                          </div>
                          <Progress value={10} className="h-2" />
                        </div>
                      </div>
                    </div>

                    {/* Time to Hire by Department */}
                    <div>
                      <h3 className="text-sm font-semibold mb-3">Average Time to Hire (Days)</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-3 border rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Engineering</p>
                          <p className="text-2xl font-bold">32</p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Sales</p>
                          <p className="text-2xl font-bold">24</p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Marketing</p>
                          <p className="text-2xl font-bold">28</p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">HR</p>
                          <p className="text-2xl font-bold">26</p>
                        </div>
                      </div>
                    </div>

                    {/* Offer Acceptance Rate */}
                    <div>
                      <h3 className="text-sm font-semibold mb-3">Offer Acceptance Rate</h3>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <Progress value={85} className="h-3" />
                        </div>
                        <div className="text-2xl font-bold text-green-500">85%</div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">17 out of 20 offers accepted this quarter</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analytics</CardTitle>
                  <CardDescription>Employee performance trends and department comparisons</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Department Performance */}
                    <div>
                      <h3 className="text-sm font-semibold mb-3">Average Performance Score by Department</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">Engineering</span>
                            <span className="text-sm font-medium text-green-500">4.5/5</span>
                          </div>
                          <Progress value={90} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">Sales</span>
                            <span className="text-sm font-medium text-green-500">4.6/5</span>
                          </div>
                          <Progress value={92} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">Marketing</span>
                            <span className="text-sm font-medium text-green-500">4.3/5</span>
                          </div>
                          <Progress value={86} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">Human Resources</span>
                            <span className="text-sm font-medium text-green-500">4.4/5</span>
                          </div>
                          <Progress value={88} className="h-2" />
                        </div>
                      </div>
                    </div>

                    {/* Review Completion Rate */}
                    <div>
                      <h3 className="text-sm font-semibold mb-3">Review Completion Rate</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="p-3 border rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Completed</p>
                          <p className="text-2xl font-bold text-green-500">88%</p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Overdue</p>
                          <p className="text-2xl font-bold text-red-500">12%</p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Upcoming</p>
                          <p className="text-2xl font-bold text-blue-500">15</p>
                        </div>
                      </div>
                    </div>

                    {/* Performance Trends */}
                    <div>
                      <h3 className="text-sm font-semibold mb-3">Performance Trends</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-3 border rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <p className="text-xs text-muted-foreground">Improving</p>
                          </div>
                          <p className="text-2xl font-bold">65%</p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Minus className="h-4 w-4 text-gray-500" />
                            <p className="text-xs text-muted-foreground">Stable</p>
                          </div>
                          <p className="text-2xl font-bold">30%</p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <TrendingDown className="h-4 w-4 text-red-500" />
                            <p className="text-xs text-muted-foreground">Declining</p>
                          </div>
                          <p className="text-2xl font-bold">5%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Employee Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle>Employee Analytics</CardTitle>
                  <CardDescription>Workforce composition and engagement metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Headcount by Department */}
                    <div>
                      <h3 className="text-sm font-semibold mb-3">Headcount by Department</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-3 border rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Engineering</p>
                          <p className="text-2xl font-bold">18</p>
                          <p className="text-xs text-muted-foreground">40%</p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Sales</p>
                          <p className="text-2xl font-bold">12</p>
                          <p className="text-xs text-muted-foreground">27%</p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Marketing</p>
                          <p className="text-2xl font-bold">8</p>
                          <p className="text-xs text-muted-foreground">18%</p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Other</p>
                          <p className="text-2xl font-bold">7</p>
                          <p className="text-xs text-muted-foreground">15%</p>
                        </div>
                      </div>
                    </div>

                    {/* Tenure Distribution */}
                    <div>
                      <h3 className="text-sm font-semibold mb-3">Tenure Distribution</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">0-1 years</span>
                            <span className="text-sm font-medium">35%</span>
                          </div>
                          <Progress value={35} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">1-3 years</span>
                            <span className="text-sm font-medium">40%</span>
                          </div>
                          <Progress value={40} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">3-5 years</span>
                            <span className="text-sm font-medium">15%</span>
                          </div>
                          <Progress value={15} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">5+ years</span>
                            <span className="text-sm font-medium">10%</span>
                          </div>
                          <Progress value={10} className="h-2" />
                        </div>
                      </div>
                    </div>

                    {/* Engagement Metrics */}
                    <div>
                      <h3 className="text-sm font-semibold mb-3">Engagement Metrics</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="p-3 border rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Goal Completion</p>
                          <p className="text-2xl font-bold text-green-500">82%</p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Avg NPS Score</p>
                          <p className="text-2xl font-bold text-green-500">8.5</p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Training Hours</p>
                          <p className="text-2xl font-bold">24</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Export Options */}
              <div className="flex justify-end gap-2">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="development">
            <div className="space-y-6">
              {/* Career Path Visualization */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-primary" />
                    <CardTitle>Career Path Planning</CardTitle>
                  </div>
                  <CardDescription>Employee career progression and development tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockCareerPaths.map((path) => (
                      <div key={path.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold mb-1">{path.employee}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{path.currentRole}</span>
                              <ArrowRight className="h-4 w-4" />
                              <span className="font-medium text-foreground">{path.nextRole}</span>
                            </div>
                          </div>
                          <Badge variant="outline">{path.timeToPromotion}</Badge>
                        </div>

                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Promotion Readiness</span>
                            <span className="text-sm font-bold">{path.readiness}%</span>
                          </div>
                          <Progress value={path.readiness} className="h-2" />
                        </div>

                        <div>
                          <p className="text-xs text-muted-foreground mb-2">Required Skills:</p>
                          <div className="flex flex-wrap gap-2">
                            {path.requiredSkills.map((skill, idx) => (
                              <Badge key={idx} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Mentorship Program */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <CardTitle>Mentorship Program</CardTitle>
                    </div>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Match
                    </Button>
                  </div>
                  <CardDescription>Zenith-powered mentor-mentee matching</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockMentorships.map((match) => (
                      <div key={match.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold">{match.mentor}</h4>
                              <ArrowRight className="h-4 w-4 text-muted-foreground" />
                              <h4 className="font-semibold">{match.mentee}</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">Focus: {match.focus}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="gap-1">
                              <Sparkles className="h-3 w-3" />
                              {match.matchScore}% match
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Started: {new Date(match.startDate).toLocaleDateString()}</span>
                          <Badge variant="secondary">{match.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Learning & Development */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <CardTitle>Learning & Development</CardTitle>
                  </div>
                  <CardDescription>Training programs and skill development tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockLearningPaths.map((learning) => (
                      <div key={learning.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{learning.employee}</h4>
                            <p className="text-sm text-muted-foreground">{learning.course}</p>
                          </div>
                          <Badge variant={learning.status === "completed" ? "secondary" : "default"}>
                            {learning.status === "completed" ? (
                              <>
                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                Completed
                              </>
                            ) : (
                              "In Progress"
                            )}
                          </Badge>
                        </div>
                        <div className="mb-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">Progress</span>
                            <span className="text-sm font-bold">{learning.progress}%</span>
                          </div>
                          <Progress value={learning.progress} className="h-2" />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Due: {new Date(learning.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recognition Platform */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      <CardTitle>Recognition & Achievements</CardTitle>
                    </div>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Give Recognition
                    </Button>
                  </div>
                  <CardDescription>Peer and manager recognition tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockRecognitions.map((recognition) => (
                      <div key={recognition.id} className="p-4 border rounded-lg bg-accent/30">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <ThumbsUp className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold">{recognition.from}</span>
                              <ArrowRight className="h-4 w-4 text-muted-foreground" />
                              <span className="font-semibold">{recognition.to}</span>
                              <Badge variant="outline">{recognition.category}</Badge>
                            </div>
                            <p className="text-sm mb-2">{recognition.message}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(recognition.date).toLocaleDateString()} • {recognition.type}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights">
            <div className="space-y-6">
              {/* Predictive Analytics */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <CardTitle>Predictive Analytics Dashboard</CardTitle>
                  </div>
                  <CardDescription>Zenith-powered workforce insights and recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        <h3 className="font-semibold">Retention Risks</h3>
                      </div>
                      <div className="text-3xl font-bold text-yellow-500 mb-1">3</div>
                      <p className="text-xs text-muted-foreground">Employees at risk</p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Rocket className="h-5 w-5 text-green-500" />
                        <h3 className="font-semibold">High Performers</h3>
                      </div>
                      <div className="text-3xl font-bold text-green-500 mb-1">8</div>
                      <p className="text-xs text-muted-foreground">Ready for promotion</p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <GraduationCap className="h-5 w-5 text-blue-500" />
                        <h3 className="font-semibold">Skill Gaps</h3>
                      </div>
                      <div className="text-3xl font-bold text-blue-500 mb-1">5</div>
                      <p className="text-xs text-muted-foreground">Areas need training</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Detailed Insights</h3>
                    {mockAIInsights.map((insight) => (
                      <div key={insight.id} className="p-4 border rounded-lg bg-accent/30">
                        {insight.type === "retention-risk" && (
                          <>
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                                <div>
                                  <h4 className="font-semibold">Retention Risk: {insight.employee}</h4>
                                  <p className="text-sm text-muted-foreground">Predicted churn probability: 65%</p>
                                </div>
                              </div>
                              <Badge variant="outline" className="text-yellow-500 border-yellow-500">
                                {insight.risk} risk
                              </Badge>
                            </div>
                            <div className="mb-3">
                              <p className="text-sm font-medium mb-2">Contributing Factors:</p>
                              <ul className="space-y-1">
                                {insight.factors?.map((factor, idx) => (
                                  <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                                    {factor}
                                  </li>
                                )) || <li className="text-sm text-muted-foreground">No factors available</li>}
                              </ul>
                            </div>
                            <div className="p-3 bg-primary/5 rounded-lg">
                              <div className="flex items-start gap-2">
                                <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-medium text-primary mb-1">Recommended Actions:</p>
                                  <p className="text-sm">{insight.recommendation}</p>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                        {insight.type === "high-performer" && (
                          <>
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <Rocket className="h-5 w-5 text-green-500" />
                                <div>
                                  <h4 className="font-semibold">High Performer: {insight.employee}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    Performance score: {insight.score}/5.0
                                  </p>
                                </div>
                              </div>
                              <Badge variant="outline" className="text-green-500 border-green-500">
                                Top 10%
                              </Badge>
                            </div>
                            <div className="p-3 bg-primary/5 rounded-lg">
                              <div className="flex items-start gap-2">
                                <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-medium text-primary mb-1">Recommended Actions:</p>
                                  <p className="text-sm">{insight.recommendation}</p>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                        {insight.type === "skill-gap" && (
                          <>
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <GraduationCap className="h-5 w-5 text-blue-500" />
                                <div>
                                  <h4 className="font-semibold">Skill Gap: {insight.gap}</h4>
                                  <p className="text-sm text-muted-foreground">Department: {insight.department}</p>
                                </div>
                              </div>
                              <Badge variant="outline" className="text-blue-500 border-blue-500">
                                Critical
                              </Badge>
                            </div>
                            <div className="p-3 bg-primary/5 rounded-lg">
                              <div className="flex items-start gap-2">
                                <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-medium text-primary mb-1">Recommended Actions:</p>
                                  <p className="text-sm">{insight.recommendation}</p>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 360° Feedback Overview */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <CardTitle>360° Feedback System</CardTitle>
                  </div>
                  <CardDescription>Multi-source performance feedback and insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mock360Feedback.map((feedback) => (
                      <div key={feedback.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold mb-1">{feedback.employeeName}</h3>
                            <p className="text-sm text-muted-foreground">{feedback.feedbackCount} feedback responses</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-500">{feedback.overallScore}</div>
                            <p className="text-xs text-muted-foreground">Overall Score</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="p-3 border rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">Self Rating</p>
                            <p className="text-lg font-bold">{feedback.selfRating}</p>
                          </div>
                          <div className="p-3 border rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">Manager</p>
                            <p className="text-lg font-bold">{feedback.managerRating}</p>
                          </div>
                          <div className="p-3 border rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">Peers</p>
                            <p className="text-lg font-bold">{feedback.peerRating}</p>
                          </div>
                          <div className="p-3 border rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">Direct Reports</p>
                            <p className="text-lg font-bold">{feedback.directReportRating || "N/A"}</p>
                          </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                          <Button variant="outline" size="sm">
                            <FileText className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Request Feedback
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Workforce Planning */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <CardTitle>Workforce Planning & Forecasting</CardTitle>
                  </div>
                  <CardDescription>Headcount forecasting and resource planning</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold mb-3">Hiring Forecast (Next 6 Months)</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-3 border rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Engineering</p>
                          <p className="text-2xl font-bold">+5</p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Sales</p>
                          <p className="text-2xl font-bold">+3</p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Marketing</p>
                          <p className="text-2xl font-bold">+2</p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Operations</p>
                          <p className="text-2xl font-bold">+2</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold mb-3">Predicted Attrition Risk</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">Low Risk</span>
                            <span className="text-sm font-medium text-green-500">75%</span>
                          </div>
                          <Progress value={75} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">Medium Risk</span>
                            <span className="text-sm font-medium text-yellow-500">18%</span>
                          </div>
                          <Progress value={18} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">High Risk</span>
                            <span className="text-sm font-medium text-red-500">7%</span>
                          </div>
                          <Progress value={7} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
