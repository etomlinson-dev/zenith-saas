import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProjectDetail } from '@/components/projects/project-detail'
import { getProjectById } from '@/lib/project-data'

export default function ProjectDetailPage() {
  const { id } = useParams()

  if (!id) {
    return <div>Project not found</div>
  }

  const project = getProjectById(id)

  if (!project) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <Link to="/projects">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
          <p className="mt-4">Project not found</p>
        </div>
      </div>
    )
  }

  return <ProjectDetail projectId={id} />
}
