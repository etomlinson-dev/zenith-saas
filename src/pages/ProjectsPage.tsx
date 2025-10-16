import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { CheckCircle2, Clock, AlertCircle, TrendingUp, Calendar, Users, Plus, Trash2 } from 'lucide-react'
import { mockProjects, updateTaskStatus, type Task } from '@/lib/project-data'

interface WorkItem {
  id: string
  title: string
  time: string
  status: Task['status']
  priority: 'high' | 'medium' | 'low'
  projectId: string
  projectName: string
  taskId: string
  completed: boolean
}

// Generate work items from projects
function generateWorkItemsFromProjects(): WorkItem[] {
  const workItems: WorkItem[] = []
  
  mockProjects.forEach(project => {
    project.tasks.forEach(task => {
      workItems.push({
        id: `${project.id}-${task.id}`,
        title: task.title,
        time: 'Today',
        status: task.status,
        priority: task.priority,
        projectId: project.id,
        projectName: project.name,
        taskId: task.id,
        completed: task.status === 'done'
      })
    })
  })
  
  return workItems.slice(0, 5)
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState(mockProjects)
  const [workItems, setWorkItems] = useState<WorkItem[]>(generateWorkItemsFromProjects())
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])

  // Listen for project data updates
  useEffect(() => {
    const handleProjectUpdate = () => {
      console.log('[ProjectsPage] Project data updated, refreshing...')
      setWorkItems(generateWorkItemsFromProjects())
    }

    window.addEventListener('projectDataUpdated', handleProjectUpdate)
    return () => window.removeEventListener('projectDataUpdated', handleProjectUpdate)
  }, [])

  const refreshProjects = () => {
    setProjects([...mockProjects])
    setWorkItems(generateWorkItemsFromProjects())
  }

  const toggleProjectSelection = (projectId: string) => {
    setSelectedProjects(prev =>
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    )
  }

  const toggleSelectAll = () => {
    setSelectedProjects(prev =>
      prev.length === projects.length
        ? []
        : projects.map(p => p.id)
    )
  }

  const deleteSelectedProjects = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedProjects.length} project(s)?`)) {
      // Filter out selected projects
      const updatedProjects = projects.filter(p => !selectedProjects.includes(p.id))
      setProjects(updatedProjects)
      setSelectedProjects([])
      // TODO: Update mockProjects to persist changes
      console.log('Deleted projects:', selectedProjects)
    }
  }

  const metrics = useMemo(() => ({
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'active').length,
    completedTasks: projects.reduce((acc, p) => acc + p.completedTasks, 0),
    totalTasks: projects.reduce((acc, p) => acc + p.totalTasks, 0),
    teamMembers: new Set(projects.flatMap(p => p.team.map(t => t.id))).size,
  }), [projects])

  const toggleItemComplete = (projectId: string, taskId: string) => {
    console.log('[ProjectsPage] Toggle task:', projectId, taskId)
    
    const project = mockProjects.find(p => p.id === projectId)
    if (!project) return
    
    const task = project.tasks.find(t => t.id === taskId)
    if (!task) return
    
    // Toggle between done and todo
    const newStatus: Task['status'] = task.status === 'done' ? 'todo' : 'done'
    updateTaskStatus(projectId, taskId, newStatus)
    
    // Refresh the work items
    setWorkItems(generateWorkItemsFromProjects())
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 pt-6 my-16">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Project Management</h2>
          <p className="text-sm text-muted-foreground">
            AI-Powered Project Execution Engine
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.activeProjects} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Task Completion</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((metrics.completedTasks / metrics.totalTasks) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {metrics.completedTasks} of {metrics.totalTasks} tasks
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              This week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.teamMembers}</div>
            <p className="text-xs text-muted-foreground">
              Across all projects
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="grid" className="space-y-4">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        <TabsContent value="grid" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link key={project.id} to={`/projects/${project.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                        {project.status}
                      </Badge>
                    </div>
                    <CardDescription>Due {project.deadline}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{project.completedTasks}/{project.totalTasks} tasks</span>
                        <span>{project.team.length} members</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <CardTitle>All Projects</CardTitle>
                  {selectedProjects.length > 0 && (
                    <Badge variant="secondary">
                      {selectedProjects.length} selected
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {selectedProjects.length > 0 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={deleteSelectedProjects}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete {selectedProjects.length === 1 ? 'Project' : `${selectedProjects.length} Projects`}
                    </Button>
                  )}
                  <div className="flex items-center gap-2 border rounded-md px-3 py-2">
                    <Checkbox
                      checked={selectedProjects.length === projects.length && projects.length > 0}
                      onCheckedChange={toggleSelectAll}
                      id="select-all"
                    />
                    <label htmlFor="select-all" className="text-sm cursor-pointer">
                      Select All
                    </label>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <Checkbox
                      checked={selectedProjects.includes(project.id)}
                      onCheckedChange={() => toggleProjectSelection(project.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Link to={`/projects/${project.id}`} className="flex-1 flex items-center justify-between cursor-pointer">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{project.name}</h3>
                          <Badge variant={project.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                            {project.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>Due {project.deadline}</span>
                          <span>{project.completedTasks}/{project.totalTasks} tasks</span>
                          <span>{project.team.length} members</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-2xl font-bold">{project.progress}%</div>
                          <div className="text-xs text-muted-foreground">Complete</div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates across your projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      item.priority === 'high'
                        ? 'bg-red-500'
                        : item.priority === 'medium'
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium leading-none">{item.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.projectName} • {item.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="capitalize">
                    {item.status.replace('-', ' ')}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleItemComplete(item.projectId, item.taskId)}
                  >
                    {item.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <Clock className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
