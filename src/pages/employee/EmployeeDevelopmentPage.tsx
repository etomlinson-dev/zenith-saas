import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { 
  BookOpen, 
  Award, 
  Search, 
  Play,
  CheckCircle2,
  Clock,
  TrendingUp,
  Star,
  Users,
  Calendar
} from "lucide-react"

export default function EmployeeDevelopmentPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const myCourses = [
    {
      id: "1",
      title: "Advanced React Patterns",
      provider: "Frontend Masters",
      progress: 75,
      status: "in-progress",
      dueDate: "2025-02-28",
      instructor: "Kent C. Dodds",
      duration: "8 hours"
    },
    {
      id: "2",
      title: "System Design Fundamentals",
      provider: "Udemy",
      progress: 40,
      status: "in-progress",
      dueDate: "2025-03-15",
      instructor: "Alex Xu",
      duration: "12 hours"
    },
    {
      id: "3",
      title: "TypeScript Deep Dive",
      provider: "LinkedIn Learning",
      progress: 100,
      status: "completed",
      completedDate: "2024-12-20",
      instructor: "Basarat Ali Syed",
      duration: "6 hours"
    },
  ]

  const catalog = [
    {
      id: "4",
      title: "Microservices Architecture",
      provider: "Pluralsight",
      rating: 4.8,
      students: 15234,
      duration: "10 hours",
      level: "Advanced",
      category: "Backend"
    },
    {
      id: "5",
      title: "AWS Solutions Architect",
      provider: "A Cloud Guru",
      rating: 4.9,
      students: 28442,
      duration: "20 hours",
      level: "Intermediate",
      category: "Cloud"
    },
    {
      id: "6",
      title: "Leadership Essentials",
      provider: "Internal",
      rating: 4.7,
      students: 543,
      duration: "4 hours",
      level: "All Levels",
      category: "Soft Skills"
    },
  ]

  const certifications = [
    {
      id: "1",
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      issueDate: "2024-06-15",
      expiryDate: "2027-06-15",
      status: "active"
    },
    {
      id: "2",
      name: "Professional Scrum Master I",
      issuer: "Scrum.org",
      issueDate: "2024-03-10",
      expiryDate: null,
      status: "active"
    },
  ]

  const skills = [
    { name: "React", level: 90, category: "Technical" },
    { name: "TypeScript", level: 85, category: "Technical" },
    { name: "Node.js", level: 80, category: "Technical" },
    { name: "System Design", level: 70, category: "Technical" },
    { name: "Leadership", level: 65, category: "Soft Skills" },
    { name: "Communication", level: 75, category: "Soft Skills" },
  ]

  return (
    <div className="min-h-screen bg-background p-6 my-16">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Learning & Development</h1>
        <p className="text-muted-foreground">Grow your skills and advance your career</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses In Progress</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{myCourses.filter(c => c.status === "in-progress").length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{myCourses.filter(c => c.status === "completed").length}</div>
            <p className="text-xs text-muted-foreground mt-1">This quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certifications</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{certifications.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Active credentials</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="my-courses" className="space-y-6">
        <TabsList>
          <TabsTrigger value="my-courses">My Courses</TabsTrigger>
          <TabsTrigger value="catalog">Course Catalog</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        {/* My Courses */}
        <TabsContent value="my-courses" className="space-y-4">
          {myCourses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      {course.title}
                      <Badge variant={course.status === "completed" ? "default" : "outline"}>
                        {course.status === "completed" ? "Completed" : "In Progress"}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {course.provider} • Instructor: {course.instructor} • {course.duration}
                    </CardDescription>
                  </div>
                  <Button size="sm">
                    {course.status === "completed" ? "Review" : "Continue"}
                    <Play className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {course.status === "in-progress" && (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm font-bold">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2 mb-2" />
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      Due {course.dueDate}
                    </div>
                  </>
                )}
                {course.status === "completed" && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle2 className="w-4 h-4" />
                    Completed on {course.completedDate}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Course Catalog */}
        <TabsContent value="catalog" className="space-y-4">
          {/* Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Catalog */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {catalog.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline">{course.category}</Badge>
                    <Badge variant="secondary">{course.level}</Badge>
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.provider}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        <span className="font-medium">{course.rating}</span>
                      </div>
                      <span className="text-muted-foreground">{course.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </div>
                    <Button className="w-full">
                      Enroll Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Certifications */}
        <TabsContent value="certifications" className="space-y-4">
          {certifications.map((cert) => (
            <Card key={cert.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      {cert.name}
                    </CardTitle>
                    <CardDescription>Issued by {cert.issuer}</CardDescription>
                  </div>
                  <Badge variant="outline" className="border-green-500 text-green-600 bg-green-500/10">
                    Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Issued: {cert.issueDate}</span>
                  {cert.expiryDate && (
                    <>
                      <span>•</span>
                      <span>Expires: {cert.expiryDate}</span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Skills */}
        <TabsContent value="skills" className="space-y-6">
          {["Technical", "Soft Skills"].map((category) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle>{category} Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skills.filter(s => s.category === category).map((skill, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm font-bold">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

