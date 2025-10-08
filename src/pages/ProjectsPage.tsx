import { Link } from 'react-router-dom'
import { Plus, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { mockProjects } from '@/lib/project-data'

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background p-6 my-16">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold">Project Management</h1>
            <p className="text-muted-foreground">AI-Powered Project Execution Engine</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockProjects.map((project) => (
          <Link key={project.id} to={`/projects/${project.id}`}>
            <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">{project.name}</h3>
                <Badge variant="outline" className="border-green-500/50 text-green-500">
                  {project.status}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{project.completedTasks}/{project.totalTasks} tasks</span>
                  <span>Due {project.deadline}</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

