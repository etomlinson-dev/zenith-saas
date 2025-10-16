import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock,
  Search,
  Bookmark,
  Send,
  CheckCircle2,
  AlertCircle,
  Calendar
} from "lucide-react"

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: "full-time" | "part-time" | "contract"
  level: "entry" | "mid" | "senior" | "lead"
  salary: string
  postedDate: string
  description: string
  requirements: string[]
}

interface Application {
  id: string
  jobTitle: string
  department: string
  appliedDate: string
  status: "under-review" | "interview" | "offer" | "rejected"
}

export default function JobApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  const jobs: Job[] = [
    {
      id: "1",
      title: "Senior Frontend Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "full-time",
      level: "senior",
      salary: "$140,000 - $180,000",
      postedDate: "2025-01-10",
      description: "We're looking for a senior frontend engineer to lead our UI/UX initiatives and mentor junior developers.",
      requirements: ["5+ years React experience", "TypeScript expertise", "System design knowledge"]
    },
    {
      id: "2",
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "full-time",
      level: "mid",
      salary: "$120,000 - $150,000",
      postedDate: "2025-01-08",
      description: "Join our product team to drive feature development and strategic initiatives.",
      requirements: ["3+ years PM experience", "Strong analytical skills", "Excellent communication"]
    },
    {
      id: "3",
      title: "Engineering Manager",
      department: "Engineering",
      location: "New York, NY",
      type: "full-time",
      level: "lead",
      salary: "$160,000 - $200,000",
      postedDate: "2025-01-05",
      description: "Lead a team of engineers building our next-generation platform.",
      requirements: ["5+ years engineering experience", "2+ years management", "Technical leadership"]
    },
  ]

  const myApplications: Application[] = [
    {
      id: "1",
      jobTitle: "Staff Engineer",
      department: "Engineering",
      appliedDate: "2024-12-15",
      status: "under-review"
    },
    {
      id: "2",
      jobTitle: "Tech Lead",
      department: "Engineering",
      appliedDate: "2024-11-20",
      status: "interview"
    },
  ]

  const savedJobs = [
    {
      id: "1",
      jobTitle: "Senior Frontend Engineer",
      department: "Engineering"
    },
  ]

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = departmentFilter === "all" || job.department === departmentFilter
    return matchesSearch && matchesDepartment
  })

  const getLevelColor = (level: string) => {
    switch (level) {
      case "entry": return "border-green-500 text-green-600 bg-green-500/10"
      case "mid": return "border-blue-500 text-blue-600 bg-blue-500/10"
      case "senior": return "border-purple-500 text-purple-600 bg-purple-500/10"
      case "lead": return "border-orange-500 text-orange-600 bg-orange-500/10"
      default: return ""
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "under-review": return "border-yellow-500 text-yellow-600 bg-yellow-500/10"
      case "interview": return "border-blue-500 text-blue-600 bg-blue-500/10"
      case "offer": return "border-green-500 text-green-600 bg-green-500/10"
      case "rejected": return "border-red-500 text-red-600 bg-red-500/10"
      default: return ""
    }
  }

  return (
    <div className="min-h-screen bg-background p-6 my-16">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Internal Jobs</h1>
        <p className="text-muted-foreground">Explore new opportunities within the company</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{jobs.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Applications</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{myApplications.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Jobs</CardTitle>
            <Bookmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{savedJobs.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="browse" className="space-y-6">
        <TabsList>
          <TabsTrigger value="browse">Browse Jobs ({jobs.length})</TabsTrigger>
          <TabsTrigger value="applications">My Applications ({myApplications.length})</TabsTrigger>
          <TabsTrigger value="saved">Saved ({savedJobs.length})</TabsTrigger>
        </TabsList>

        {/* Browse Jobs */}
        <TabsContent value="browse" className="space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Job Listings */}
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle>{job.title}</CardTitle>
                        <Badge variant="outline" className={getLevelColor(job.level)}>
                          {job.level}
                        </Badge>
                        <Badge variant="outline">{job.type}</Badge>
                      </div>
                      <CardDescription>{job.department}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{job.description}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {job.salary}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Posted {job.postedDate}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Requirements:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {job.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1">
                      <Send className="w-4 h-4 mr-2" />
                      Apply Now
                    </Button>
                    <Button variant="outline">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* My Applications */}
        <TabsContent value="applications" className="space-y-4">
          {myApplications.map((app) => (
            <Card key={app.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{app.jobTitle}</CardTitle>
                    <CardDescription>{app.department}</CardDescription>
                  </div>
                  <Badge variant="outline" className={getStatusColor(app.status)}>
                    {app.status === "under-review" ? (
                      <>
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Under Review
                      </>
                    ) : app.status === "interview" ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Interview Stage
                      </>
                    ) : (
                      app.status
                    )}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Applied {app.appliedDate}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Saved Jobs */}
        <TabsContent value="saved" className="space-y-4">
          {savedJobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{job.jobTitle}</CardTitle>
                    <CardDescription>{job.department}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button size="sm">
                      <Send className="w-4 h-4 mr-2" />
                      Apply
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

