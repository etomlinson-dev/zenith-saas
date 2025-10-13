import { Link } from 'react-router-dom'
import { ChevronDown, FolderKanban, ChevronRight, Kanban, Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { mockProjects } from '@/lib/project-data'
import { useState } from 'react'

// Generate work items from actual project tasks
const recentWorkItems = [
  { id: 'WR-67', title: 'Design homepage mockup', project: 'Website Redesign', completed: true, date: 'Yesterday' },
  { id: 'WR-78', title: 'Implement responsive navigation', project: 'Website Redesign', completed: false, date: 'Yesterday' },
  { id: 'WR-89', title: 'Create product page templates', project: 'Website Redesign', completed: false, date: 'In the last week' },
  { id: 'WR-45', title: 'Setup analytics tracking', project: 'Website Redesign', completed: false, date: 'In the last week' },
  { id: 'WR-56', title: 'Optimize image loading', project: 'Website Redesign', completed: false, date: 'In the last week' },
]

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState('worked-on')
  const [workItems, setWorkItems] = useState(recentWorkItems)
  const assignedCount = workItems.filter(item => !item.completed).length

  const toggleItemComplete = (itemId: string) => {
    setWorkItems(items => 
      items.map(item => 
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    )
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
                <span className="text-foreground">Project Management</span>
              </div>
              
              {/* Title with Icon */}
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2.5 rounded-lg">
                  <Kanban className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-3xl font-bold">Project Management</h1>
              </div>
              
              <p className="text-muted-foreground mt-2">Track and manage your projects efficiently</p>
            </div>
            <div className="flex gap-2">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
      {/* For You Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">For you</h2>

        {/* Recent Spaces */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Recent spaces</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockProjects.slice(0, 3).map((project) => (
              <Card key={project.id} className="p-5 hover:shadow-lg transition-all border-border/50 hover:border-primary/30">
                <Link to={`/projects/${project.id}`}>
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded flex items-center justify-center flex-shrink-0">
                      <FolderKanban className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base truncate">{project.name}</h3>
                      <p className="text-xs text-muted-foreground">Company-managed software</p>
                    </div>
                  </div>

                  <div className="border-t border-border/50 pt-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Quick links</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between hover:bg-accent/50 -mx-2 px-2 py-1 rounded transition-colors">
                        <span className="text-foreground">My open work items</span>
                        <Badge variant="secondary" className="text-xs">
                          {Math.floor(Math.random() * 5) + 1}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between hover:bg-accent/50 -mx-2 px-2 py-1 rounded transition-colors">
                        <span className="text-foreground">Done work items</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border/50">
                      <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <span>1 board</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mb-6">
        <div className="flex gap-6 border-b border-border/10">
          <button
            onClick={() => setActiveTab('worked-on')}
            className={`pb-3 text-sm font-medium border-b-2 -mb-[1px] transition-colors ${
              activeTab === 'worked-on'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Worked on
          </button>
          <button
            onClick={() => setActiveTab('viewed')}
            className={`pb-3 text-sm font-medium border-b-2 -mb-[1px] transition-colors ${
              activeTab === 'viewed'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Viewed
          </button>
          <button
            onClick={() => setActiveTab('assigned')}
            className={`pb-3 text-sm font-medium border-b-2 -mb-[1px] transition-colors ${
              activeTab === 'assigned'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Assigned to me
            <Badge className="ml-2 bg-primary/20 text-primary hover:bg-primary/30 text-xs">{assignedCount}</Badge>
          </button>
          <button
            onClick={() => setActiveTab('starred')}
            className={`pb-3 text-sm font-medium border-b-2 -mb-[1px] transition-colors ${
              activeTab === 'starred'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Starred
          </button>
          <button
            onClick={() => setActiveTab('boards')}
            className={`pb-3 text-sm font-medium border-b-2 -mb-[1px] transition-colors ${
              activeTab === 'boards'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Boards
          </button>
        </div>
      </div>

      {/* Work Items List */}
      <div className="space-y-6">
        {/* Yesterday Section */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">YESTERDAY</h3>
          <div className="space-y-1">
            {workItems
              .filter((item) => item.date === 'Yesterday')
              .map((item) => (
                <div
                  key={item.id + item.title}
                  className="flex items-center gap-3 px-3 py-3 hover:bg-accent rounded-lg transition-colors group border border-transparent hover:border-border/50"
                >
                  <Checkbox 
                    checked={item.completed} 
                    onCheckedChange={() => toggleItemComplete(item.id)}
                    className="flex-shrink-0" 
                  />
                  <div className="flex-1 flex items-center gap-3 min-w-0">
                    <span className="text-sm text-foreground group-hover:text-primary cursor-pointer transition-colors truncate">
                      {item.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground flex-shrink-0">
                    <span className="font-mono bg-muted px-2 py-1 rounded">{item.id}</span>
                    <span>•</span>
                    <span>{item.project}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* In the Last Week Section */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">IN THE LAST WEEK</h3>
          <div className="space-y-1">
            {workItems
              .filter((item) => item.date === 'In the last week')
              .map((item, idx) => (
                <div
                  key={item.id + item.title + idx}
                  className="flex items-center gap-3 px-3 py-3 hover:bg-accent rounded-lg transition-colors group border border-transparent hover:border-border/50"
                >
                  <Checkbox 
                    checked={item.completed} 
                    onCheckedChange={() => toggleItemComplete(item.id)}
                    className="flex-shrink-0" 
                  />
                  <div className="flex-1 flex items-center gap-3 min-w-0">
                    <span className="text-sm text-foreground group-hover:text-primary cursor-pointer transition-colors truncate">
                      {item.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground flex-shrink-0">
                    <span className="font-mono bg-muted px-2 py-1 rounded">{item.id}</span>
                    <span>•</span>
                    <span>{item.project}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

