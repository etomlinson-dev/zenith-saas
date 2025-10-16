import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Briefcase,
  Users,
  ClipboardCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  MapPin,
  Phone,
  Edit,
  UserPlus,
  Plus,
  ChevronRight,
  BarChart3,
  FileText,
  Settings,
} from "lucide-react"

export default function WorkforcePage() {
  const [activePortal, setActivePortal] = useState<"admin" | "technician">("admin")
  const [activeTab, setActiveTab] = useState("dashboard")

  // Sample data
  const jobs = [
    {
      id: "#101",
      title: "HVAC Repair",
      technician: "John Smith",
      startDate: "Jan 15, 2025",
      endDate: "Jan 15, 2025",
      status: "In Progress",
    },
    {
      id: "#102",
      title: "Plumbing Check",
      technician: "Sarah Johnson",
      startDate: "Jan 16, 2025",
      endDate: "Jan 16, 2025",
      status: "Assigned",
    },
    {
      id: "#103",
      title: "Electrical Install",
      technician: "Mike Davis",
      startDate: "Jan 17, 2025",
      endDate: "Jan 17, 2025",
      status: "Completed",
    },
    {
      id: "#104",
      title: "Roof Inspection",
      technician: "John Smith",
      startDate: "Jan 18, 2025",
      endDate: "Jan 18, 2025",
      status: "Assigned",
    },
    {
      id: "#105",
      title: "Paint Job",
      technician: "Sarah Johnson",
      startDate: "Jan 19, 2025",
      endDate: "Jan 19, 2025",
      status: "Overdue",
    },
  ]

  const technicians = [
    { name: "John Smith", phone: "(555) 123-4567", activeJobs: 2, status: "Active" },
    { name: "Sarah Johnson", phone: "(555) 234-5678", activeJobs: 2, status: "Active" },
    { name: "Mike Davis", phone: "(555) 345-6789", activeJobs: 1, status: "Active" },
  ]

  const recentActivity = [
    "Job #103 completed by Mike Davis",
    "New job #104 assigned to John Smith",
    "Sarah Johnson started job #102",
    "Technician login: Mike Davis at 8:30 AM",
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Assigned":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "In Progress":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "Completed":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "Overdue":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  return (
    <div className="min-h-screen bg-background p-6 border-0">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 -mx-6 px-6 mb-6">
        <div className="py-6">
          <div className="flex items-center justify-between">
            <div>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <span className="hover:text-foreground cursor-pointer transition-colors">Home</span>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground">Workforce Management</span>
              </div>
              
              {/* Title with Icon */}
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2.5 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-3xl font-bold">Workforce Management</h1>
              </div>
              
              <p className="text-muted-foreground mt-2">TaskBeacon - Field service management</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant={activePortal === "admin" ? "default" : "outline"}
                onClick={() => setActivePortal("admin")}
              >
                <Settings className="h-4 w-4 mr-2" />
                Admin Console
              </Button>
              <Button
                variant={activePortal === "technician" ? "default" : "outline"}
                onClick={() => setActivePortal("technician")}
              >
                <Users className="h-4 w-4 mr-2" />
                Technician Portal
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Portal */}
      {activePortal === "admin" && (
        <div>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Briefcase className="h-5 w-5 text-muted-foreground" />
                  <span className="text-2xl font-bold">24</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium">Total Jobs</p>
                <p className="text-xs text-muted-foreground">All jobs in system</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="text-2xl font-bold">8</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium">Active Technicians</p>
                <p className="text-xs text-muted-foreground">Available field techs</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <ClipboardCheck className="h-5 w-5 text-muted-foreground" />
                  <span className="text-2xl font-bold">12</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium">Assigned Jobs</p>
                <p className="text-xs text-muted-foreground">Jobs ready to start</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span className="text-2xl font-bold">8</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium">In Progress</p>
                <p className="text-xs text-muted-foreground">Currently being worked</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                  <span className="text-2xl font-bold">15</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium">Completed This Week</p>
                <p className="text-xs text-muted-foreground">Finished jobs</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="text-2xl font-bold text-red-500">3</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium">Overdue Jobs</p>
                <p className="text-xs text-muted-foreground">Past due date</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="jobs">Jobs</TabsTrigger>
              <TabsTrigger value="technicians">Technicians</TabsTrigger>
              <TabsTrigger value="timesheets">Timesheets</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Jobs Management Table */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Jobs Management</CardTitle>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            New Job
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Create New Job</DialogTitle>
                            <DialogDescription>Add a new job to the system</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="job-title">Job Title</Label>
                              <Input id="job-title" placeholder="Enter job title" />
                            </div>
                            <div>
                              <Label htmlFor="job-description">Description</Label>
                              <Textarea id="job-description" placeholder="Enter job description" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="start-date">Start Date</Label>
                                <Input id="start-date" type="date" />
                              </div>
                              <div>
                                <Label htmlFor="end-date">End Date</Label>
                                <Input id="end-date" type="date" />
                              </div>
                            </div>
                            <Button className="w-full">Create Job</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Technician</TableHead>
                          <TableHead>Start Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {jobs.map((job) => (
                          <TableRow key={job.id}>
                            <TableCell className="font-medium">{job.id}</TableCell>
                            <TableCell>{job.title}</TableCell>
                            <TableCell>{job.technician}</TableCell>
                            <TableCell>{job.startDate}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getStatusColor(job.status)}>
                                {job.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Quick Stats */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Jobs This Week</span>
                        <span className="font-bold">15</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Jobs This Month</span>
                        <span className="font-bold">45</span>
                      </div>
                      <div className="pt-2 border-t">
                        <p className="text-sm font-medium mb-2">Top Performers</p>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div>Mike Davis (8 jobs)</div>
                          <div>Sarah Johnson (6 jobs)</div>
                        </div>
                      </div>
                      <div className="pt-2 border-t">
                        <div className="flex items-center gap-2 text-red-500">
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">3 jobs need attention</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {recentActivity.map((activity, index) => (
                          <div key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <div className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            <span>{activity}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="schedule">
              <Card>
                <CardHeader>
                  <CardTitle>Schedule Calendar</CardTitle>
                  <CardDescription>View and manage job schedules</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-64 text-muted-foreground">
                    <div className="text-center">
                      <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Calendar view coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="jobs">
              <Card>
                <CardHeader>
                  <CardTitle>All Jobs</CardTitle>
                  <CardDescription>Manage all jobs in the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Technician</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {jobs.map((job) => (
                        <TableRow key={job.id}>
                          <TableCell className="font-medium">{job.id}</TableCell>
                          <TableCell>{job.title}</TableCell>
                          <TableCell>{job.technician}</TableCell>
                          <TableCell>{job.startDate}</TableCell>
                          <TableCell>{job.endDate}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(job.status)}>
                              {job.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MapPin className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="technicians">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Technician Management</CardTitle>
                      <CardDescription>Manage your field technicians</CardDescription>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Add Technician
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Technician</DialogTitle>
                          <DialogDescription>Create a new technician account</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="tech-name">Full Name</Label>
                            <Input id="tech-name" placeholder="Enter full name" />
                          </div>
                          <div>
                            <Label htmlFor="tech-phone">Phone</Label>
                            <Input id="tech-phone" placeholder="(555) 123-4567" />
                          </div>
                          <div>
                            <Label htmlFor="tech-email">Email</Label>
                            <Input id="tech-email" type="email" placeholder="email@example.com" />
                          </div>
                          <Button className="w-full">Create Technician</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Active Jobs</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {technicians.map((tech, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{tech.name}</TableCell>
                          <TableCell>{tech.phone}</TableCell>
                          <TableCell>{tech.activeJobs}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                              {tech.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timesheets">
              <Card>
                <CardHeader>
                  <CardTitle>Time Tracking</CardTitle>
                  <CardDescription>Monitor technician hours and timesheets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-sm text-muted-foreground">Active Clock-ins</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">24.5</div>
                        <p className="text-sm text-muted-foreground">Hours Today</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">156</div>
                        <p className="text-sm text-muted-foreground">Hours This Week</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-yellow-500">2</div>
                        <p className="text-sm text-muted-foreground">Open Entries</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="flex items-center justify-center h-32 text-muted-foreground">
                    <div className="text-center">
                      <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Timesheet entries will appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Reports & Analytics</CardTitle>
                  <CardDescription>View performance metrics and export data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <BarChart3 className="h-8 w-8 mb-4 text-muted-foreground" />
                        <h3 className="font-semibold mb-2">Performance Metrics</h3>
                        <p className="text-sm text-muted-foreground">Job completion rates and efficiency</p>
                        <Button variant="outline" className="w-full mt-4 bg-transparent">
                          View Report
                        </Button>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <FileText className="h-8 w-8 mb-4 text-muted-foreground" />
                        <h3 className="font-semibold mb-2">Export Data</h3>
                        <p className="text-sm text-muted-foreground">Download CSV and PDF reports</p>
                        <Button variant="outline" className="w-full mt-4 bg-transparent">
                          Export
                        </Button>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <Calendar className="h-8 w-8 mb-4 text-muted-foreground" />
                        <h3 className="font-semibold mb-2">Scheduled Reports</h3>
                        <p className="text-sm text-muted-foreground">Automated daily and weekly reports</p>
                        <Button variant="outline" className="w-full mt-4 bg-transparent">
                          Configure
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* Technician Portal */}
      {activePortal === "technician" && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Briefcase className="h-5 w-5 text-muted-foreground" />
                  <span className="text-2xl font-bold">3</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium">Jobs Today</p>
                <p className="text-xs text-muted-foreground">Assigned to you</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-bold">HVAC Repair at 2:00 PM</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium">Next Job</p>
                <p className="text-xs text-muted-foreground">Starting soon</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                  <span className="text-2xl font-bold">32.5</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium">Hours This Week</p>
                <p className="text-xs text-muted-foreground">Time logged</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="today" className="space-y-6">
            <TabsList>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="map">Map</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="space-y-4">
              {jobs.slice(0, 3).map((job) => (
                <Card key={job.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{job.title}</CardTitle>
                        <CardDescription>
                          {job.id} • {job.startDate}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className={getStatusColor(job.status)}>
                        {job.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>123 Main St, City, State 12345</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>(555) 987-6543</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">Start Job</Button>
                      <Button variant="outline">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="upcoming">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Jobs</CardTitle>
                  <CardDescription>Your scheduled jobs for the next 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {jobs.map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{job.title}</p>
                          <p className="text-sm text-muted-foreground">{job.startDate}</p>
                        </div>
                        <Badge variant="outline" className={getStatusColor(job.status)}>
                          {job.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calendar">
              <Card>
                <CardHeader>
                  <CardTitle>Job Calendar</CardTitle>
                  <CardDescription>Monthly view of your assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-64 text-muted-foreground">
                    <div className="text-center">
                      <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Calendar view coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="map">
              <Card>
                <CardHeader>
                  <CardTitle>Job Locations</CardTitle>
                  <CardDescription>Map view of your assigned jobs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-64 text-muted-foreground">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Map view coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Manage your account information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="profile-name">Full Name</Label>
                    <Input id="profile-name" defaultValue="John Smith" />
                  </div>
                  <div>
                    <Label htmlFor="profile-phone">Phone</Label>
                    <Input id="profile-phone" defaultValue="(555) 123-4567" />
                  </div>
                  <div>
                    <Label htmlFor="profile-email">Email</Label>
                    <Input id="profile-email" type="email" defaultValue="john.smith@example.com" />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
