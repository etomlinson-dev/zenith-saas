import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  FileText,
  MessageSquare,
  FolderOpen,
  Zap,
  BarChart3,
  Settings,
  Upload,
  Play,
  History,
  Camera,
  MousePointer,
  Download,
  FileInput,
  Bot,
  User,
  Loader2,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
} from "lucide-react"

export default function AutomationPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hello! I'm AutomationBot. Upload documents to ask questions or run automation tasks." },
    { role: "user", content: "What can you help me with?" },
    {
      role: "bot",
      content:
        "I can help you with document Q&A, browser automation, web scraping, and task execution. Upload a document to get started!",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    setMessages([...messages, { role: "user", content: inputMessage }])
    setInputMessage("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "I understand your request. Let me process that for you..." },
      ])
      setIsTyping(false)
    }, 1500)
  }

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
                <span className="text-foreground">Automation</span>
              </div>
              
              {/* Title with Icon */}
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2.5 rounded-lg">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-3xl font-bold">Automation</h1>
              </div>
              
              <p className="text-muted-foreground mt-2">AutomationBot - Intelligent task automation</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
              <Button variant="outline">
                <Play className="mr-2 h-4 w-4" />
                Run Task
              </Button>
              <Button variant="outline">
                <History className="mr-2 h-4 w-4" />
                View History
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documents Indexed</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Files ready for querying</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">Automation jobs finished</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chat Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">Conversation history</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <Card className="col-span-12 lg:col-span-2">
            <CardContent className="p-4">
              <nav className="space-y-2">
                <Button
                  variant={activeTab === "dashboard" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("dashboard")}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <Button
                  variant={activeTab === "chat" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("chat")}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Chat Interface
                </Button>
                <Button
                  variant={activeTab === "documents" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("documents")}
                >
                  <FolderOpen className="mr-2 h-4 w-4" />
                  Documents
                </Button>
                <Button
                  variant={activeTab === "automation" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("automation")}
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Automation
                </Button>
                <Button
                  variant={activeTab === "analytics" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("analytics")}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Analytics
                </Button>
                <Button
                  variant={activeTab === "settings" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </nav>
            </CardContent>
          </Card>

          {/* Center Panel */}
          <div className="col-span-12 lg:col-span-7">
            {activeTab === "chat" && (
              <Card className="h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle>AI Chat Interface</CardTitle>
                  <CardDescription>Ask questions about your documents or run automation tasks</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ScrollArea className="flex-1 pr-4 mb-4">
                    <div className="space-y-4">
                      {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                          <div className={`flex gap-2 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.role === "user" ? "bg-primary" : "bg-muted"}`}
                            >
                              {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                            </div>
                            <div
                              className={`rounded-lg p-3 ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                            >
                              {msg.content}
                            </div>
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="flex gap-2 max-w-[80%]">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-muted">
                              <Bot className="h-4 w-4" />
                            </div>
                            <div className="rounded-lg p-3 bg-muted flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span className="text-sm">Typing...</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask a question or give a command..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>Send</Button>
                  </div>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    <Badge variant="outline" className="cursor-pointer">
                      Screenshot google.com
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer">
                      Summarize document
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer">
                      Extract text from page
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "documents" && (
              <Card>
                <CardHeader>
                  <CardTitle>Document Manager</CardTitle>
                  <CardDescription>Upload and manage documents for AI processing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed rounded-lg p-12 text-center mb-6">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Drag & Drop Files</h3>
                    <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
                    <Button>Select Files</Button>
                    <p className="text-xs text-muted-foreground mt-4">Supported: PDF, TXT, CSV, DOCX, XLSX</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold mb-3">Indexed Documents</h4>
                    {[
                      { name: "Contract_2024.pdf", size: "2.4 MB", status: "Indexed" },
                      { name: "Report_Q1.docx", size: "1.1 MB", status: "Indexed" },
                      { name: "Data_Analysis.xlsx", size: "856 KB", status: "Processing" },
                    ].map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium text-sm">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">{doc.size}</p>
                          </div>
                        </div>
                        <Badge variant={doc.status === "Indexed" ? "default" : "secondary"}>{doc.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "automation" && (
              <Card>
                <CardHeader>
                  <CardTitle>Browser Automation</CardTitle>
                  <CardDescription>Execute automated web tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="screenshot">
                    <TabsList className="grid w-full grid-cols-5">
                      <TabsTrigger value="screenshot">Screenshot</TabsTrigger>
                      <TabsTrigger value="text">Get Text</TabsTrigger>
                      <TabsTrigger value="form">Fill Form</TabsTrigger>
                      <TabsTrigger value="click">Click</TabsTrigger>
                      <TabsTrigger value="download">Download</TabsTrigger>
                    </TabsList>
                    <TabsContent value="screenshot" className="space-y-4">
                      <div>
                        <Label htmlFor="url">URL</Label>
                        <Input id="url" placeholder="https://example.com" />
                      </div>
                      <div>
                        <Label htmlFor="selector">Element Selector (optional)</Label>
                        <Input id="selector" placeholder=".main-content" />
                      </div>
                      <Button className="w-full">
                        <Camera className="mr-2 h-4 w-4" />
                        Take Screenshot
                      </Button>
                    </TabsContent>
                    <TabsContent value="text" className="space-y-4">
                      <div>
                        <Label htmlFor="url-text">URL</Label>
                        <Input id="url-text" placeholder="https://example.com" />
                      </div>
                      <div>
                        <Label htmlFor="selector-text">Element Selector</Label>
                        <Input id="selector-text" placeholder=".article-content" />
                      </div>
                      <Button className="w-full">
                        <FileInput className="mr-2 h-4 w-4" />
                        Extract Text
                      </Button>
                    </TabsContent>
                    <TabsContent value="form" className="space-y-4">
                      <div>
                        <Label htmlFor="url-form">URL</Label>
                        <Input id="url-form" placeholder="https://example.com/form" />
                      </div>
                      <div>
                        <Label htmlFor="form-data">Form Data (JSON)</Label>
                        <Input id="form-data" placeholder='{"name": "John", "email": "john@example.com"}' />
                      </div>
                      <Button className="w-full">
                        <MousePointer className="mr-2 h-4 w-4" />
                        Fill & Submit Form
                      </Button>
                    </TabsContent>
                    <TabsContent value="click" className="space-y-4">
                      <div>
                        <Label htmlFor="url-click">URL</Label>
                        <Input id="url-click" placeholder="https://example.com" />
                      </div>
                      <div>
                        <Label htmlFor="click-sequence">Click Sequence (selectors)</Label>
                        <Input id="click-sequence" placeholder=".button1, .button2, .submit" />
                      </div>
                      <Button className="w-full">
                        <MousePointer className="mr-2 h-4 w-4" />
                        Execute Clicks
                      </Button>
                    </TabsContent>
                    <TabsContent value="download" className="space-y-4">
                      <div>
                        <Label htmlFor="url-download">File URL</Label>
                        <Input id="url-download" placeholder="https://example.com/file.pdf" />
                      </div>
                      <div>
                        <Label htmlFor="save-path">Save Path</Label>
                        <Input id="save-path" placeholder="/downloads/file.pdf" />
                      </div>
                      <Button className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Download File
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {activeTab === "dashboard" && (
              <Card>
                <CardHeader>
                  <CardTitle>Dashboard Overview</CardTitle>
                  <CardDescription>Quick access to all features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="h-24 flex flex-col gap-2 bg-transparent"
                      onClick={() => setActiveTab("chat")}
                    >
                      <MessageSquare className="h-6 w-6" />
                      <span>Start Chat</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-24 flex flex-col gap-2 bg-transparent"
                      onClick={() => setActiveTab("documents")}
                    >
                      <Upload className="h-6 w-6" />
                      <span>Upload Document</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-24 flex flex-col gap-2 bg-transparent"
                      onClick={() => setActiveTab("automation")}
                    >
                      <Zap className="h-6 w-6" />
                      <span>Run Automation</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-24 flex flex-col gap-2 bg-transparent"
                      onClick={() => setActiveTab("analytics")}
                    >
                      <BarChart3 className="h-6 w-6" />
                      <span>View Analytics</span>
                    </Button>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-3">Recent Activity</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-2 border rounded">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Screenshot task completed</span>
                        <span className="text-xs text-muted-foreground ml-auto">2 min ago</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 border rounded">
                        <FileText className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Document indexed: Report_Q1.docx</span>
                        <span className="text-xs text-muted-foreground ml-auto">15 min ago</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 border rounded">
                        <MessageSquare className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">Chat conversation started</span>
                        <span className="text-xs text-muted-foreground ml-auto">1 hour ago</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "analytics" && (
              <Card>
                <CardHeader>
                  <CardTitle>Analytics & Insights</CardTitle>
                  <CardDescription>Usage statistics and performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Task Success Rate</p>
                      <p className="text-2xl font-bold">94.5%</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Avg Response Time</p>
                      <p className="text-2xl font-bold">1.2s</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Documents Processed</p>
                      <p className="text-2xl font-bold">47</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Total Queries</p>
                      <p className="text-2xl font-bold">312</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-3">Task Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Screenshots</span>
                        <Badge>12</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Text Extraction</span>
                        <Badge>8</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Form Submissions</span>
                        <Badge>3</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "settings" && (
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>Configure AI and automation settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">AI Configuration</h4>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="provider">LLM Provider</Label>
                        <Input id="provider" placeholder="OpenAI" />
                      </div>
                      <div>
                        <Label htmlFor="model">Model</Label>
                        <Input id="model" placeholder="gpt-4" />
                      </div>
                      <div>
                        <Label htmlFor="temperature">Temperature</Label>
                        <Input id="temperature" type="number" placeholder="0.7" step="0.1" />
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-3">Browser Settings</h4>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="viewport">Viewport Size</Label>
                        <Input id="viewport" placeholder="1920x1080" />
                      </div>
                      <div>
                        <Label htmlFor="timeout">Default Timeout (ms)</Label>
                        <Input id="timeout" type="number" placeholder="30000" />
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">Save Settings</Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Panel */}
          <Card className="col-span-12 lg:col-span-3">
            <CardHeader>
              <CardTitle>Activity Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-3">
                  {[
                    { type: "task", title: "Screenshot completed", time: "2 min ago", status: "success" },
                    { type: "document", title: "Report_Q1.docx indexed", time: "15 min ago", status: "success" },
                    { type: "task", title: "Form submission", time: "1 hour ago", status: "success" },
                    { type: "document", title: "Contract_2024.pdf uploaded", time: "2 hours ago", status: "success" },
                    { type: "task", title: "Text extraction", time: "3 hours ago", status: "success" },
                    { type: "system", title: "System update", time: "5 hours ago", status: "info" },
                    { type: "task", title: "Download task failed", time: "6 hours ago", status: "error" },
                  ].map((activity, idx) => (
                    <div key={idx} className="flex gap-3 p-2 border rounded-lg">
                      <div className="mt-1">
                        {activity.status === "success" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                        {activity.status === "info" && <AlertCircle className="h-4 w-4 text-blue-500" />}
                        {activity.status === "error" && <AlertCircle className="h-4 w-4 text-red-500" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
