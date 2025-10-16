import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Star, 
  TrendingUp, 
  Download, 
  Calendar,
  Users,
  Target,
  ThumbsUp,
  MessageSquare,
  Award,
  TrendingDown,
  Minus
} from "lucide-react"

interface Review {
  id: string
  date: string
  reviewer: string
  score: number
  feedback: string
  goals: string[]
  strengths: string[]
  improvements: string[]
  type: "quarterly" | "annual" | "mid-year"
}

export default function EmployeePerformancePage() {
  const [selectedPeriod, setSelectedPeriod] = useState("all")

  // Mock performance data
  const currentScore = 4.5
  const previousScore = 4.2
  const trend = currentScore - previousScore

  const reviews: Review[] = [
    {
      id: "1",
      date: "2024-12-15",
      reviewer: "Michael Chen",
      score: 4.5,
      type: "quarterly",
      feedback: "Sarah has consistently delivered high-quality work and shown excellent technical leadership. Her contributions to the new architecture have been invaluable.",
      goals: ["Improve system architecture", "Mentor junior developers", "Lead major project"],
      strengths: ["Technical expertise", "Problem solving", "Team collaboration", "Code quality"],
      improvements: ["Public speaking", "Documentation", "Time estimation"]
    },
    {
      id: "2",
      date: "2024-09-15",
      reviewer: "Michael Chen",
      score: 4.3,
      type: "quarterly",
      feedback: "Excellent progress on all major initiatives. Sarah's ability to handle complex technical challenges continues to impress the team.",
      goals: ["Complete Q3 roadmap items", "Improve code review process", "Cross-team collaboration"],
      strengths: ["Technical depth", "Debugging skills", "Initiative", "Reliability"],
      improvements: ["Time management", "Meeting facilitation"]
    },
    {
      id: "3",
      date: "2024-06-15",
      reviewer: "Michael Chen",
      score: 4.2,
      type: "quarterly",
      feedback: "Strong performance across all areas. Sarah has become a key technical contributor and is ready for more leadership opportunities.",
      goals: ["Ship new feature set", "Reduce technical debt", "Improve test coverage"],
      strengths: ["Code quality", "Best practices", "Team player", "Quick learner"],
      improvements: ["Delegation", "Strategic thinking", "Public presentations"]
    },
  ]

  const peerFeedback = [
    { from: "Alex Kim", date: "2024-12-10", comment: "Always willing to help and provides great technical insights. A pleasure to work with!" },
    { from: "Emily Rodriguez", date: "2024-12-08", comment: "Sarah's code reviews are thorough and educational. She's raised the bar for our entire team." },
    { from: "David Park", date: "2024-11-25", comment: "Exceptional problem-solving skills. Sarah consistently finds elegant solutions to complex problems." },
  ]

  const achievements = [
    { title: "Top Performer Q4 2024", icon: Award, date: "Dec 2024", description: "Ranked in top 10% of department" },
    { title: "Innovation Award", icon: Star, date: "Nov 2024", description: "For new caching architecture design" },
    { title: "Mentor of the Quarter", icon: Users, date: "Oct 2024", description: "Successfully mentored 2 junior engineers" },
  ]

  const competencies = [
    { name: "Technical Skills", score: 4.8, category: "Core" },
    { name: "Problem Solving", score: 4.7, category: "Core" },
    { name: "Communication", score: 4.3, category: "Soft Skills" },
    { name: "Leadership", score: 4.2, category: "Soft Skills" },
    { name: "Collaboration", score: 4.6, category: "Soft Skills" },
    { name: "Innovation", score: 4.5, category: "Core" },
    { name: "Reliability", score: 4.8, category: "Core" },
    { name: "Time Management", score: 4.0, category: "Soft Skills" },
  ]

  const performanceHistory = [
    { quarter: "Q1 2024", score: 4.0 },
    { quarter: "Q2 2024", score: 4.2 },
    { quarter: "Q3 2024", score: 4.3 },
    { quarter: "Q4 2024", score: 4.5 },
  ]

  return (
    <div className="min-h-screen bg-background p-6 my-16">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">My Performance</h1>
            <p className="text-muted-foreground">Track your performance reviews and growth</p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Current Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{currentScore}/5.0</div>
            <div className="flex items-center gap-1 mt-1 text-xs">
              {trend > 0 ? (
                <>
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-green-500">+{trend.toFixed(1)} from last review</span>
                </>
              ) : trend < 0 ? (
                <>
                  <TrendingDown className="w-3 h-3 text-red-500" />
                  <span className="text-red-500">{trend.toFixed(1)} from last review</span>
                </>
              ) : (
                <>
                  <Minus className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground">No change</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{reviews.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Last review: {reviews[0].date}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peer Feedback</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{peerFeedback.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Received this quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{achievements.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              This year
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="reviews" className="space-y-6">
        <TabsList>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="competencies">Competencies</TabsTrigger>
          <TabsTrigger value="feedback">Peer Feedback</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-4">
          {/* Performance Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Trend</CardTitle>
              <CardDescription>Your performance scores over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceHistory.map((record, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{record.quarter}</span>
                      <span className="text-sm font-bold">{record.score}/5.0</span>
                    </div>
                    <Progress value={(record.score / 5) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Review History */}
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-3">
                      {review.date}
                      <Badge variant={review.type === "annual" ? "default" : "outline"}>
                        {review.type}
                      </Badge>
                    </CardTitle>
                    <CardDescription>Reviewed by {review.reviewer}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">{review.score}/5.0</div>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.round(review.score) ? 'fill-primary text-primary' : 'text-muted'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Feedback */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Manager Feedback
                  </h4>
                  <p className="text-sm text-muted-foreground">{review.feedback}</p>
                </div>

                {/* Strengths */}
                <div>
                  <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400 flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4" />
                    Strengths
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {review.strengths.map((strength, i) => (
                      <Badge key={i} variant="outline" className="border-green-500 text-green-600 bg-green-500/10">
                        {strength}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Areas for Improvement */}
                <div>
                  <h4 className="font-semibold mb-2 text-orange-600 dark:text-orange-400 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Areas for Improvement
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {review.improvements.map((improvement, i) => (
                      <Badge key={i} variant="outline" className="border-orange-500 text-orange-600 bg-orange-500/10">
                        {improvement}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Goals */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Goals for Next Period
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {review.goals.map((goal, i) => (
                      <li key={i}>{goal}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Competencies Tab */}
        <TabsContent value="competencies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Skills & Competencies</CardTitle>
              <CardDescription>Your ratings across key competencies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {["Core", "Soft Skills"].map((category) => (
                  <div key={category}>
                    <h3 className="font-semibold mb-4">{category}</h3>
                    <div className="space-y-4">
                      {competencies.filter(c => c.category === category).map((competency, index) => (
                        <div key={index}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">{competency.name}</span>
                            <span className="text-sm font-bold">{competency.score}/5.0</span>
                          </div>
                          <Progress value={(competency.score / 5) * 100} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Peer Feedback Tab */}
        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Peer Recognition</CardTitle>
              <CardDescription>Feedback from your colleagues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {peerFeedback.map((feedback, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border/40 bg-muted/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                        {feedback.from.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{feedback.from}</p>
                        <p className="text-xs text-muted-foreground">{feedback.date}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{feedback.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <achievement.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                    <Badge variant="outline">{achievement.date}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

