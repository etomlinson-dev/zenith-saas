import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { 
  Users, 
  Eye,
  EyeOff,
  Calendar,
  FileText,
  Star,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Download,
  UserX
} from "lucide-react"
import {
  getAllApplications,
  getApplicationStats,
  revealApplicantInfo,
  updateApplicationStatus,
  addApplicationNotes,
  rateApplication,
  scheduleInterview,
  type Application
} from "@/lib/recruitment-data"

export function RecruitmentDashboard() {
  const [applications, setApplications] = useState<Application[]>([])
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [stats, setStats] = useState(getApplicationStats())

  useEffect(() => {
    loadApplications()
    
    const handleUpdate = () => {
      loadApplications()
    }
    
    window.addEventListener('applicationSubmitted', handleUpdate)
    window.addEventListener('applicationUpdated', handleUpdate)
    
    return () => {
      window.removeEventListener('applicationSubmitted', handleUpdate)
      window.removeEventListener('applicationUpdated', handleUpdate)
    }
  }, [])

  const loadApplications = () => {
    const allApps = getAllApplications()
    setApplications(allApps)
    setStats(getApplicationStats())
  }

  const filteredApplications = applications.filter(app => {
    const matchesStatus = filterStatus === "all" || app.status === filterStatus
    const matchesSearch = 
      app.anonymousId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.department.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const handleRevealInfo = (app: Application) => {
    const recruiterName = "HR Manager" // In real app, get from auth context
    const result = revealApplicantInfo(app.id, recruiterName)
    
    if (!result) {
      alert("Cannot reveal identity. Candidate must be in 'interviewed' status or later to view personal information.")
      return
    }
    
    loadApplications()
    if (selectedApplication?.id === app.id) {
      const updated = applications.find(a => a.id === app.id)
      if (updated) setSelectedApplication(updated)
    }
  }
  
  const canRevealIdentity = (app: Application): boolean => {
    return app.status === 'interviewed' || app.status === 'offer'
  }

  const handleStatusChange = (appId: string, status: Application['status']) => {
    const app = applications.find(a => a.id === appId)
    const wasRevealed = app?.isRevealed
    const canReveal = status === 'interviewed' || status === 'offer'
    
    updateApplicationStatus(appId, status)
    
    // Show notification if identity was revealed but status changed to non-revealing
    if (wasRevealed && !canReveal) {
      alert("Status changed to '" + status + "'. Identity has been automatically hidden again for privacy protection.")
    }
    
    loadApplications()
    
    // Update selected application if it's the one being changed
    if (selectedApplication?.id === appId) {
      const updated = applications.find(a => a.id === appId)
      if (updated) {
        setSelectedApplication(updated)
      }
    }
  }

  const handleRating = (appId: string, rating: number) => {
    rateApplication(appId, rating)
    loadApplications()
  }

  const handleScheduleInterview = (appId: string, date: string) => {
    scheduleInterview(appId, date)
    loadApplications()
  }

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case "new": return "border-blue-500 text-blue-600 bg-blue-500/10"
      case "reviewing": return "border-yellow-500 text-yellow-600 bg-yellow-500/10"
      case "interview-scheduled": return "border-purple-500 text-purple-600 bg-purple-500/10"
      case "interviewed": return "border-indigo-500 text-indigo-600 bg-indigo-500/10"
      case "offer": return "border-green-500 text-green-600 bg-green-500/10"
      case "rejected": return "border-red-500 text-red-600 bg-red-500/10"
      case "withdrawn": return "border-gray-500 text-gray-600 bg-gray-500/10"
      default: return ""
    }
  }

  const getStatusIcon = (status: Application['status']) => {
    switch (status) {
      case "new": return <AlertCircle className="w-4 h-4" />
      case "reviewing": return <Clock className="w-4 h-4" />
      case "interview-scheduled": return <Calendar className="w-4 h-4" />
      case "interviewed": return <CheckCircle2 className="w-4 h-4" />
      case "offer": return <CheckCircle2 className="w-4 h-4" />
      case "rejected": return <XCircle className="w-4 h-4" />
      case "withdrawn": return <UserX className="w-4 h-4" />
      default: return null
    }
  }

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New</CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.new}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reviewing</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.reviewing}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interview</CardTitle>
            <Calendar className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.interviewScheduled}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviewed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.interviewed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offers</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.offers}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                placeholder="Search by ID, job title, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="reviewing">Reviewing</SelectItem>
                  <SelectItem value="interview-scheduled">Interview Scheduled</SelectItem>
                  <SelectItem value="interviewed">Interviewed</SelectItem>
                  <SelectItem value="offer">Offer</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((app) => (
          <Card key={app.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <CardTitle className="text-xl">
                      {app.isRevealed ? (
                        <span className="flex items-center gap-2">
                          <Eye className="w-5 h-5 text-green-500" />
                          {app.personalInfo.firstName} {app.personalInfo.lastName}
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <EyeOff className="w-5 h-5 text-muted-foreground" />
                          {app.anonymousId}
                        </span>
                      )}
                    </CardTitle>
                    <Badge variant="outline" className={getStatusColor(app.status)}>
                      {getStatusIcon(app.status)}
                      <span className="ml-1">{app.status.replace('-', ' ')}</span>
                    </Badge>
                    {app.rating && (
                      <div className="flex items-center gap-1">
                        {Array.from({ length: app.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                    )}
                  </div>
                  <CardDescription className="flex items-center gap-4 flex-wrap">
                    <span className="font-medium">{app.jobTitle}</span>
                    <span>•</span>
                    <span>{app.department}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Applied {app.appliedDate}
                    </span>
                    {app.interviewDate && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-purple-600">
                          <Calendar className="w-3 h-3" />
                          Interview: {app.interviewDate}
                        </span>
                      </>
                    )}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Show limited info for anonymous applicants */}
              {!app.isRevealed && (
                <div className="p-4 rounded-lg bg-muted/30 border border-dashed">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <EyeOff className="w-4 h-4" />
                    <span className="font-medium">Personal information hidden</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {canRevealIdentity(app) 
                      ? "Click 'Reveal Identity' to view the applicant's contact information."
                      : "Personal information will be available once the candidate reaches 'interviewed' status."}
                  </p>
                </div>
              )}

              {/* Show full info for revealed applicants */}
              {app.isRevealed && (
                <div className="grid md:grid-cols-2 gap-4 p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{app.personalInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{app.personalInfo.phone}</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{app.personalInfo.location}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Revealed by {app.revealedBy} on {app.revealedAt ? new Date(app.revealedAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                </div>
              )}

              {/* Professional info (always visible) */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm flex-wrap">
                  {app.professionalInfo.resumeFileName && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {app.professionalInfo.resumeFileName}
                    </Badge>
                  )}
                  {app.professionalInfo.linkedin && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={app.professionalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4 mr-1" />
                        LinkedIn
                      </a>
                    </Button>
                  )}
                  {app.professionalInfo.portfolio && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={app.professionalInfo.portfolio} target="_blank" rel="noopener noreferrer">
                        <Globe className="w-4 h-4 mr-1" />
                        Portfolio
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t flex-wrap">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedApplication(app)
                    setIsDetailsOpen(true)
                  }}
                >
                  View Details
                </Button>
                {!app.isRevealed && (
                  <Button
                    onClick={() => handleRevealInfo(app)}
                    disabled={!canRevealIdentity(app)}
                    className={canRevealIdentity(app) ? "bg-green-500 hover:bg-green-600" : ""}
                    title={canRevealIdentity(app) ? "Reveal identity" : "Candidate must be 'interviewed' or 'offer' status"}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Reveal Identity
                  </Button>
                )}
                <Select
                  value={app.status}
                  onValueChange={(value) => handleStatusChange(app.id, value as Application['status'])}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="reviewing">Reviewing</SelectItem>
                    <SelectItem value="interview-scheduled">Interview Scheduled</SelectItem>
                    <SelectItem value="interviewed">Interviewed</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredApplications.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No applications found</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Application Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedApplication && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-2">
                  {selectedApplication.isRevealed ? (
                    <>
                      <Eye className="w-6 h-6 text-green-500" />
                      {selectedApplication.personalInfo.firstName} {selectedApplication.personalInfo.lastName}
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-6 h-6 text-muted-foreground" />
                      {selectedApplication.anonymousId}
                    </>
                  )}
                </DialogTitle>
                <DialogDescription>
                  {selectedApplication.jobTitle} • {selectedApplication.department}
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="details" className="mt-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
                  <TabsTrigger value="notes">Notes & Rating</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  {!selectedApplication.isRevealed ? (
                    <div className="p-6 rounded-lg bg-muted/30 border border-dashed text-center">
                      <EyeOff className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="font-semibold mb-2">Identity Hidden</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {canRevealIdentity(selectedApplication)
                          ? "Personal information is hidden. You can now reveal the identity to view contact details."
                          : "Personal information is hidden until the candidate reaches 'interviewed' status. Update the candidate status to 'interviewed' or 'offer' to reveal identity."}
                      </p>
                      {canRevealIdentity(selectedApplication) ? (
                        <Button onClick={() => handleRevealInfo(selectedApplication)} className="bg-green-500 hover:bg-green-600">
                          <Eye className="w-4 h-4 mr-2" />
                          Reveal Identity
                        </Button>
                      ) : (
                        <Button disabled className="opacity-50">
                          <Eye className="w-4 h-4 mr-2" />
                          Reveal Identity (Requires Interviewed Status)
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-xs text-muted-foreground">First Name</Label>
                              <p className="font-medium">{selectedApplication.personalInfo.firstName}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Last Name</Label>
                              <p className="font-medium">{selectedApplication.personalInfo.lastName}</p>
                            </div>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Email</Label>
                            <p className="font-medium">{selectedApplication.personalInfo.email}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Phone</Label>
                            <p className="font-medium">{selectedApplication.personalInfo.phone}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Location</Label>
                            <p className="font-medium">{selectedApplication.personalInfo.location}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Professional Links</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {selectedApplication.professionalInfo.linkedin && (
                        <Button variant="outline" className="w-full justify-start" asChild>
                          <a href={selectedApplication.professionalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="w-4 h-4 mr-2" />
                            LinkedIn Profile
                          </a>
                        </Button>
                      )}
                      {selectedApplication.professionalInfo.portfolio && (
                        <Button variant="outline" className="w-full justify-start" asChild>
                          <a href={selectedApplication.professionalInfo.portfolio} target="_blank" rel="noopener noreferrer">
                            <Globe className="w-4 h-4 mr-2" />
                            Portfolio Website
                          </a>
                        </Button>
                      )}
                      {selectedApplication.professionalInfo.resumeFileName && (
                        <Button variant="outline" className="w-full justify-start">
                          <Download className="w-4 h-4 mr-2" />
                          {selectedApplication.professionalInfo.resumeFileName}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="cover-letter">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Cover Letter</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="whitespace-pre-wrap text-sm">
                        {selectedApplication.professionalInfo.coverLetter}
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notes" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Rating</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <Button
                            key={rating}
                            variant="outline"
                            size="icon"
                            onClick={() => handleRating(selectedApplication.id, rating)}
                          >
                            <Star
                              className={`w-5 h-5 ${
                                rating <= (selectedApplication.rating || 0)
                                  ? 'fill-yellow-500 text-yellow-500'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recruiter Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="Add notes about this candidate..."
                        value={selectedApplication.notes || ''}
                        onChange={(e) => addApplicationNotes(selectedApplication.id, e.target.value)}
                        rows={6}
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Schedule Interview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Interview Date</Label>
                        <Input
                          type="date"
                          value={selectedApplication.interviewDate || ''}
                          onChange={(e) => handleScheduleInterview(selectedApplication.id, e.target.value)}
                        />
                      </div>
                      {selectedApplication.interviewDate && (
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                          <p className="text-sm text-purple-600 font-medium">
                            Interview scheduled for {selectedApplication.interviewDate}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

